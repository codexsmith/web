"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import {
  activateBridge,
  archiveBridge,
  declineBridge,
  markBridgeReady,
  markBridgeSent,
  publishBridge,
  recordBridgeContact,
  recordBridgeResponse,
  reopenBridge,
  scopeBridge,
  unpublishBridge,
} from "@/lib/bridge-transitions";
import {
  clearBridgeOpsSession,
  createBridgeOpsSession,
  hasBridgeOpsSession,
  isBridgeOpsPassword,
} from "@/lib/bridge-ops-auth";
import {
  commitBridgeOpsTransaction,
  loadBridgeOpsManifest,
} from "@/lib/bridge-ops-store";
import {
  BRIDGE_EVENT_OPERATIONS,
  createBridgeEventRecord,
  type BridgeEventOperation,
} from "@/lib/bridge-event-ledger";
import { validateProductLandingManifest } from "@/lib/product-landing-routing";
import { startServerActionObservation } from "@/lib/server-observability";

type BridgeMutationOperation = Exclude<BridgeEventOperation, "register">;

const bridgeMutationOperations = BRIDGE_EVENT_OPERATIONS.filter(
  (operation): operation is BridgeMutationOperation => operation !== "register",
);
const bridgeMutationOperationSet = new Set<string>(bridgeMutationOperations);

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value || undefined;
}

function dateTime(formData: FormData, key: string) {
  const value = optionalText(formData, key);
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${key} must be a valid date-time`);
  }
  return parsed.toISOString();
}

function destination(message: string, error = false) {
  const key = error ? "error" : "notice";
  return `/ops/bridges?${key}=${encodeURIComponent(message)}`;
}

function operatorIdentity() {
  return process.env.BFL_BRIDGE_OPS_ACTOR?.trim() || "operator";
}

function requireBridgeMutationOperation(value: string): BridgeMutationOperation {
  if (!bridgeMutationOperationSet.has(value)) {
    throw new Error(`Unsupported Bridge operator mutation ${value}`);
  }
  return value as BridgeMutationOperation;
}

export async function loginBridgeOpsAction(formData: FormData) {
  const observation = startServerActionObservation("bridge.login");
  const candidate = text(formData, "password");
  if (!isBridgeOpsPassword(candidate)) {
    observation.done("rejected");
    redirect(destination("Invalid operator password", true));
  }
  await createBridgeOpsSession();
  observation.done("session_opened");
  redirect(destination("Operator session opened"));
}

export async function logoutBridgeOpsAction() {
  const observation = startServerActionObservation("bridge.logout");
  await clearBridgeOpsSession();
  observation.done("session_closed");
  redirect("/ops/bridges");
}

async function requireSession() {
  if (!(await hasBridgeOpsSession())) {
    console.log(JSON.stringify({
      level: "info",
      msg: "blocked",
      action: "bridge.mutate",
      outcome: "session_required",
    }));
    redirect(destination("Operator session required", true));
  }
}

export async function mutateBridgeAction(formData: FormData) {
  await requireSession();
  const observation = startServerActionObservation("bridge.mutate");

  const id = text(formData, "id");
  const operationText = text(formData, "operation");
  if (!id || !operationText) {
    observation.done("invalid_request");
    redirect(destination("Bridge id and operation are required", true));
  }

  let successMessage: string | undefined;
  let errorMessage: string | undefined;

  try {
    const operation = requireBridgeMutationOperation(operationText);
    const snapshot = await loadBridgeOpsManifest();
    const index = snapshot.manifest.pages.findIndex(
      (entry) => entry.id === id && entry.collection === "bridge",
    );
    if (index < 0) {
      throw new Error(`Bridge ${id} was not found in the current manifest`);
    }

    const current = snapshot.manifest.pages[index];
    const nextAction = optionalText(formData, "nextAction");
    const nextActionAt = dateTime(formData, "nextActionAt");
    const owner = optionalText(formData, "owner");
    const reason = optionalText(formData, "reason");
    const occurredAt = new Date().toISOString();

    let next = current;
    switch (operation) {
      case "ready":
        next = markBridgeReady(current, { nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "sent":
        next = markBridgeSent(current, { nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "response":
        next = recordBridgeResponse(current, { nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "contact":
        next = recordBridgeContact(current, { nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "scope":
        if (!owner) throw new Error("Scoping requires an owner");
        next = scopeBridge(current, { owner, nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "activate":
        next = activateBridge(current, { owner, nextAction, nextActionAt }, { at: occurredAt });
        break;
      case "decline":
        if (!reason) throw new Error("Declining requires a closure reason");
        next = declineBridge(current, { reason }, { at: occurredAt });
        break;
      case "archive":
        if (!reason) throw new Error("Archiving requires a closure reason");
        next = archiveBridge(current, { reason }, { at: occurredAt });
        break;
      case "reopen":
        next = reopenBridge(current);
        break;
      case "publish":
        next = publishBridge(current);
        break;
      case "unpublish":
        next = unpublishBridge(current);
        break;
    }

    const manifest = {
      ...snapshot.manifest,
      pages: snapshot.manifest.pages.map((entry, entryIndex) =>
        entryIndex === index ? next : entry,
      ),
    };

    const validationErrors = validateProductLandingManifest(manifest);
    if (validationErrors.length > 0) {
      throw new Error(
        `Manifest validation failed: ${validationErrors.join("; ")}`,
      );
    }

    const event = createBridgeEventRecord({
      eventId: randomUUID(),
      operation,
      occurredAt,
      actor: operatorIdentity(),
      parentCommit: snapshot.parentCommit,
      before: current,
      after: next,
    });

    const result = await commitBridgeOpsTransaction(
      snapshot,
      manifest,
      event,
      `Bridge ops: ${operation} ${id}`,
    );

    successMessage = `${id}: ${operation} committed (${result.commitSha.slice(0, 8)})`;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Bridge mutation failed";
  }

  if (errorMessage) {
    observation.failed(new Error("Bridge mutation failed"));
  } else {
    observation.done("committed");
  }

  redirect(destination(errorMessage ?? successMessage ?? "Bridge operation completed", Boolean(errorMessage)));
}

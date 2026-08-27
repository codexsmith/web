import {
  getBridgeLifecycle,
  type BridgeLifecycleStage,
  type BridgeOperationalMetadata,
  type BridgeRelationshipStatus,
} from "@/lib/bridge-governance";
import type {
  LandingVisibility,
  ProductLandingEntry,
  RoutingEligibility,
} from "@/lib/product-landing-routing";

export const BRIDGE_EVENT_OPERATIONS = [
  "ready",
  "sent",
  "response",
  "contact",
  "scope",
  "activate",
  "decline",
  "archive",
  "reopen",
  "publish",
  "unpublish",
] as const;

export type BridgeEventOperation = (typeof BRIDGE_EVENT_OPERATIONS)[number];

export type BridgeEventState = {
  lifecycle: BridgeLifecycleStage;
  visibility: LandingVisibility;
  routingEligibility: RoutingEligibility;
  relationshipStatus?: BridgeRelationshipStatus;
  operations?: BridgeOperationalMetadata;
};

export type BridgeEventEvidence = {
  owner?: string;
  lastContactAt?: string;
  nextAction?: string;
  nextActionAt?: string;
  closureReason?: string;
};

export type BridgeEventRecord = {
  schemaVersion: 1;
  eventId: string;
  bridgeId: string;
  operation: BridgeEventOperation;
  occurredAt: string;
  actor: string;
  source: "bridge-ops-control-surface";
  commit: "self";
  parentCommit: string;
  from: BridgeEventState;
  to: BridgeEventState;
  evidence: BridgeEventEvidence;
};

function stateFromEntry(entry: ProductLandingEntry): BridgeEventState {
  const lifecycle = getBridgeLifecycle(entry.status);
  if (!lifecycle) {
    throw new Error(`Bridge ${entry.id} has unsupported lifecycle ${entry.status}`);
  }

  return {
    lifecycle,
    visibility: entry.visibility,
    routingEligibility: entry.routingEligibility,
    relationshipStatus: entry.relationshipStatus,
    operations: entry.bridgeOperations,
  };
}

function evidenceFromEntry(entry: ProductLandingEntry): BridgeEventEvidence {
  const operations = entry.bridgeOperations;
  return {
    owner: operations?.owner,
    lastContactAt: operations?.lastContactAt,
    nextAction: operations?.nextAction,
    nextActionAt: operations?.nextActionAt,
    closureReason: operations?.closureReason,
  };
}

export function createBridgeEventRecord(input: {
  eventId: string;
  operation: BridgeEventOperation;
  occurredAt: string;
  actor: string;
  parentCommit: string;
  before: ProductLandingEntry;
  after: ProductLandingEntry;
}): BridgeEventRecord {
  if (input.before.id !== input.after.id) {
    throw new Error("Bridge event before/after records must have the same id");
  }

  return {
    schemaVersion: 1,
    eventId: input.eventId,
    bridgeId: input.after.id,
    operation: input.operation,
    occurredAt: input.occurredAt,
    actor: input.actor,
    source: "bridge-ops-control-surface",
    commit: "self",
    parentCommit: input.parentCommit,
    from: stateFromEntry(input.before),
    to: stateFromEntry(input.after),
    evidence: evidenceFromEntry(input.after),
  };
}

export function parseBridgeEventLedger(content: string): BridgeEventRecord[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line) as BridgeEventRecord;
      } catch {
        throw new Error(`Bridge event ledger contains invalid JSON on line ${index + 1}`);
      }
    });
}

export function appendBridgeEventLedger(
  content: string,
  event: BridgeEventRecord,
): string {
  const prefix = content && !content.endsWith("\n") ? `${content}\n` : content;
  return `${prefix}${JSON.stringify(event)}\n`;
}

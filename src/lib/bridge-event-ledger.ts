import {
  isBridgeLifecycleStage,
  isBridgeRelationshipStatus,
  validateBridgeGovernanceState,
  validateBridgeOperationalMetadata,
  type BridgeLifecycleStage,
  type BridgeOperationalMetadata,
  type BridgeRelationshipStatus,
} from "@/lib/bridge-governance";
import type {
  LandingVisibility,
  ProductLandingEntry,
  ProductLandingManifest,
  RoutingEligibility,
} from "@/lib/product-landing-routing";

export const BRIDGE_EVENT_OPERATIONS = [
  "register",
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
  relationshipStatus: BridgeRelationshipStatus;
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
  from: BridgeEventState | null;
  to: BridgeEventState;
  evidence: BridgeEventEvidence;
};

export type BridgeLedgerEpoch = {
  schemaVersion: 1;
  epochId: string;
  establishedAt: string;
  source: "bridge-ops-ledger-epoch";
  commit: "self";
  parentCommit: string;
  manifestVersion: string;
  states: Record<string, BridgeEventState>;
};

const eventOperationSet = new Set<string>(BRIDGE_EVENT_OPERATIONS);
const visibilitySet = new Set<string>(["public", "unlisted", "private"]);
const routingEligibilitySet = new Set<string>([
  "public-candidate",
  "unlisted-only",
  "hold",
]);
const operationalFields = [
  "owner",
  "lifecycleChangedAt",
  "lastContactAt",
  "nextAction",
  "nextActionAt",
  "closureReason",
] as const;
const evidenceFields = [
  "owner",
  "lastContactAt",
  "nextAction",
  "nextActionAt",
  "closureReason",
] as const;
const shaPattern = /^[0-9a-f]{40}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoDateTime(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.includes("T") &&
    !Number.isNaN(Date.parse(value))
  );
}

function stateFromEntry(entry: ProductLandingEntry): BridgeEventState {
  if (entry.collection !== "bridge") {
    throw new Error(`Landing ${entry.id} is not a Bridge record`);
  }
  if (!isBridgeLifecycleStage(entry.status)) {
    throw new Error(`Bridge ${entry.id} has unsupported lifecycle ${entry.status}`);
  }
  if (!entry.relationshipStatus || !isBridgeRelationshipStatus(entry.relationshipStatus)) {
    throw new Error(`Bridge ${entry.id} requires a supported relationship status`);
  }

  return {
    lifecycle: entry.status,
    visibility: entry.visibility,
    routingEligibility: entry.routingEligibility,
    relationshipStatus: entry.relationshipStatus,
    operations: entry.bridgeOperations,
  };
}

function evidenceFromState(state: BridgeEventState): BridgeEventEvidence {
  return {
    owner: state.operations?.owner,
    lastContactAt: state.operations?.lastContactAt,
    nextAction: state.operations?.nextAction,
    nextActionAt: state.operations?.nextActionAt,
    closureReason: state.operations?.closureReason,
  };
}

function sameOperations(
  left: BridgeOperationalMetadata | undefined,
  right: BridgeOperationalMetadata | undefined,
) {
  return operationalFields.every((field) => left?.[field] === right?.[field]);
}

export function bridgeEventStatesEqual(
  left: BridgeEventState,
  right: BridgeEventState,
): boolean {
  return (
    left.lifecycle === right.lifecycle &&
    left.visibility === right.visibility &&
    left.routingEligibility === right.routingEligibility &&
    left.relationshipStatus === right.relationshipStatus &&
    sameOperations(left.operations, right.operations)
  );
}

function sameStateOutsideVisibility(left: BridgeEventState, right: BridgeEventState) {
  return (
    left.lifecycle === right.lifecycle &&
    left.relationshipStatus === right.relationshipStatus &&
    sameOperations(left.operations, right.operations)
  );
}

function validateStringFieldObject(
  value: unknown,
  allowedFields: readonly string[],
  label: string,
): string[] {
  if (value === undefined) return [];
  if (!isRecord(value)) return [`${label} must be an object`];

  const errors: string[] = [];
  const allowed = new Set(allowedFields);
  for (const [key, fieldValue] of Object.entries(value)) {
    if (!allowed.has(key)) {
      errors.push(`${label}.${key} is not supported`);
    } else if (typeof fieldValue !== "string") {
      errors.push(`${label}.${key} must be a string when present`);
    }
  }
  return errors;
}

export function validateBridgeEventState(
  value: unknown,
  label = "state",
): string[] {
  if (!isRecord(value)) return [`${label} must be an object`];

  const errors: string[] = [];
  const lifecycle = value.lifecycle;
  const visibility = value.visibility;
  const routingEligibility = value.routingEligibility;
  const relationshipStatus = value.relationshipStatus;

  if (typeof lifecycle !== "string" || !isBridgeLifecycleStage(lifecycle)) {
    errors.push(`${label}.lifecycle is unsupported`);
  }
  if (typeof visibility !== "string" || !visibilitySet.has(visibility)) {
    errors.push(`${label}.visibility is unsupported`);
  }
  if (
    typeof routingEligibility !== "string" ||
    !routingEligibilitySet.has(routingEligibility)
  ) {
    errors.push(`${label}.routingEligibility is unsupported`);
  }
  if (
    typeof relationshipStatus !== "string" ||
    !isBridgeRelationshipStatus(relationshipStatus)
  ) {
    errors.push(`${label}.relationshipStatus is unsupported`);
  }

  errors.push(
    ...validateStringFieldObject(value.operations, operationalFields, `${label}.operations`),
  );

  if (
    typeof lifecycle === "string" &&
    isBridgeLifecycleStage(lifecycle) &&
    typeof visibility === "string" &&
    visibilitySet.has(visibility) &&
    typeof routingEligibility === "string" &&
    routingEligibilitySet.has(routingEligibility) &&
    typeof relationshipStatus === "string" &&
    isBridgeRelationshipStatus(relationshipStatus) &&
    (value.operations === undefined || isRecord(value.operations))
  ) {
    const operations = value.operations as BridgeOperationalMetadata | undefined;
    errors.push(
      ...validateBridgeGovernanceState({
        lifecycle,
        visibility: visibility as LandingVisibility,
        routingEligibility: routingEligibility as RoutingEligibility,
        relationshipStatus,
      }).map((error) => `${label}: ${error}`),
      ...validateBridgeOperationalMetadata(lifecycle, operations).map(
        (error) => `${label}: ${error}`,
      ),
    );
  }

  return errors;
}

function validateEvidence(value: unknown, to: BridgeEventState | undefined) {
  const errors = validateStringFieldObject(value, evidenceFields, "event.evidence");
  if (!isRecord(value) || !to) return errors;

  const expected = evidenceFromState(to);
  for (const field of evidenceFields) {
    const actual = value[field];
    if (actual !== expected[field]) {
      errors.push(`event.evidence.${field} must match event.to.operations.${field}`);
    }
  }
  return errors;
}

function validateTransitionSemantics(event: BridgeEventRecord): string[] {
  const errors: string[] = [];
  const from = event.from;
  const to = event.to;

  if (event.operation === "register") {
    if (from !== null) errors.push("register event requires from=null");
    if (to.lifecycle !== "draft") errors.push("register event must introduce a draft Bridge");
    if (to.operations) errors.push("register event draft cannot begin with operational metadata");
    return errors;
  }

  if (!from) {
    return [`${event.operation} event requires a from state`];
  }

  const unchangedVisibility =
    from.visibility === to.visibility &&
    from.routingEligibility === to.routingEligibility;

  switch (event.operation) {
    case "ready":
      if (from.lifecycle !== "draft" || to.lifecycle !== "ready") {
        errors.push("ready event must transition draft -> ready");
      }
      break;
    case "sent":
      if (from.lifecycle !== "ready" || to.lifecycle !== "sent") {
        errors.push("sent event must transition ready -> sent");
      }
      break;
    case "response":
      if (from.lifecycle !== "sent" || to.lifecycle !== "discussion") {
        errors.push("response event must transition sent -> discussion");
      }
      break;
    case "contact":
      if (
        (from.lifecycle !== "sent" && from.lifecycle !== "discussion") ||
        to.lifecycle !== from.lifecycle
      ) {
        errors.push("contact event must remain within sent or discussion lifecycle");
      }
      if (from.relationshipStatus !== to.relationshipStatus || !unchangedVisibility) {
        errors.push("contact event cannot change relationship or visibility state");
      }
      if (
        from.operations?.lifecycleChangedAt !== to.operations?.lifecycleChangedAt
      ) {
        errors.push("contact event cannot change lifecycleChangedAt");
      }
      if (to.operations?.lastContactAt !== event.occurredAt) {
        errors.push("contact event must record occurredAt as lastContactAt");
      }
      return errors;
    case "scope":
      if (from.lifecycle !== "discussion" || to.lifecycle !== "scoped") {
        errors.push("scope event must transition discussion -> scoped");
      }
      break;
    case "activate":
      if (from.lifecycle !== "scoped" || to.lifecycle !== "active") {
        errors.push("activate event must transition scoped -> active");
      }
      break;
    case "decline":
      if (
        !["draft", "ready", "sent", "discussion", "scoped"].includes(
          from.lifecycle,
        ) ||
        to.lifecycle !== "declined"
      ) {
        errors.push("decline event must close a pre-active Bridge");
      }
      break;
    case "archive":
      if (from.lifecycle !== "active" || to.lifecycle !== "historical") {
        errors.push("archive event must transition active -> historical");
      }
      break;
    case "reopen":
      if (from.lifecycle !== "declined" || to.lifecycle !== "draft") {
        errors.push("reopen event must transition declined -> draft");
      }
      if (
        to.visibility !== "unlisted" ||
        to.routingEligibility !== "unlisted-only" ||
        to.operations
      ) {
        errors.push("reopen event must reset to an unlisted draft without operations");
      }
      return errors;
    case "publish":
      if (from.lifecycle !== "active" && from.lifecycle !== "historical") {
        errors.push("publish event requires active or historical lifecycle");
      }
      if (from.visibility === "public") {
        errors.push("publish event cannot be a no-op from public visibility");
      }
      if (
        to.visibility !== "public" ||
        to.routingEligibility !== "public-candidate" ||
        !sameStateOutsideVisibility(from, to)
      ) {
        errors.push("publish event may only promote visibility/routing");
      }
      return errors;
    case "unpublish":
      if (from.visibility !== "public") {
        errors.push("unpublish event requires public visibility");
      }
      if (
        to.visibility !== "unlisted" ||
        to.routingEligibility !== "unlisted-only" ||
        !sameStateOutsideVisibility(from, to)
      ) {
        errors.push("unpublish event may only demote visibility/routing");
      }
      return errors;
  }

  if (!unchangedVisibility) {
    errors.push(`${event.operation} event cannot change visibility/routing state`);
  }

  return errors;
}

export function validateBridgeEventRecord(value: unknown): string[] {
  if (!isRecord(value)) return ["event must be an object"];

  const errors: string[] = [];
  if (value.schemaVersion !== 1) errors.push("event.schemaVersion must be 1");
  if (typeof value.eventId !== "string" || !value.eventId.trim()) {
    errors.push("event.eventId is required");
  }
  if (typeof value.bridgeId !== "string" || !value.bridgeId.trim()) {
    errors.push("event.bridgeId is required");
  }
  if (typeof value.operation !== "string" || !eventOperationSet.has(value.operation)) {
    errors.push("event.operation is unsupported");
  }
  if (!isIsoDateTime(value.occurredAt)) {
    errors.push("event.occurredAt must be an ISO date-time");
  }
  if (typeof value.actor !== "string" || !value.actor.trim()) {
    errors.push("event.actor is required");
  }
  if (value.source !== "bridge-ops-control-surface") {
    errors.push("event.source is unsupported");
  }
  if (value.commit !== "self") errors.push('event.commit must be "self"');
  if (typeof value.parentCommit !== "string" || !shaPattern.test(value.parentCommit)) {
    errors.push("event.parentCommit must be a 40-character Git SHA");
  }

  if (value.from !== null) {
    errors.push(...validateBridgeEventState(value.from, "event.from"));
  }
  errors.push(...validateBridgeEventState(value.to, "event.to"));

  const typedTo = isRecord(value.to) ? (value.to as unknown as BridgeEventState) : undefined;
  errors.push(...validateEvidence(value.evidence, typedTo));

  if (
    errors.length === 0 ||
    (typeof value.operation === "string" &&
      eventOperationSet.has(value.operation) &&
      isRecord(value.to) &&
      (value.from === null || isRecord(value.from)))
  ) {
    errors.push(...validateTransitionSemantics(value as unknown as BridgeEventRecord));
  }

  return [...new Set(errors)];
}

function assertValidBridgeEventRecord(value: unknown, label: string): BridgeEventRecord {
  const errors = validateBridgeEventRecord(value);
  if (errors.length > 0) {
    throw new Error(
      `${label} is invalid:\n${errors.map((error) => `- ${error}`).join("\n")}`,
    );
  }
  return value as BridgeEventRecord;
}

export function validateBridgeLedgerEpoch(value: unknown): string[] {
  if (!isRecord(value)) return ["epoch must be an object"];

  const errors: string[] = [];
  if (value.schemaVersion !== 1) errors.push("epoch.schemaVersion must be 1");
  if (typeof value.epochId !== "string" || !value.epochId.trim()) {
    errors.push("epoch.epochId is required");
  }
  if (!isIsoDateTime(value.establishedAt)) {
    errors.push("epoch.establishedAt must be an ISO date-time");
  }
  if (value.source !== "bridge-ops-ledger-epoch") {
    errors.push("epoch.source is unsupported");
  }
  if (value.commit !== "self") errors.push('epoch.commit must be "self"');
  if (typeof value.parentCommit !== "string" || !shaPattern.test(value.parentCommit)) {
    errors.push("epoch.parentCommit must be a 40-character Git SHA");
  }
  if (typeof value.manifestVersion !== "string" || !value.manifestVersion.trim()) {
    errors.push("epoch.manifestVersion is required");
  }
  if (!isRecord(value.states)) {
    errors.push("epoch.states must be an object");
  } else {
    for (const [bridgeId, state] of Object.entries(value.states)) {
      if (!bridgeId.trim()) errors.push("epoch state keys must be non-empty Bridge ids");
      errors.push(...validateBridgeEventState(state, `epoch.states.${bridgeId}`));
    }
  }

  return [...new Set(errors)];
}

export function parseBridgeLedgerEpoch(content: string): BridgeLedgerEpoch {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Bridge ledger epoch contains invalid JSON");
  }

  const errors = validateBridgeLedgerEpoch(parsed);
  if (errors.length > 0) {
    throw new Error(
      `Bridge ledger epoch is invalid:\n${errors.map((error) => `- ${error}`).join("\n")}`,
    );
  }
  return parsed as BridgeLedgerEpoch;
}

export function createBridgeEventRecord(input: {
  eventId: string;
  operation: Exclude<BridgeEventOperation, "register">;
  occurredAt: string;
  actor: string;
  parentCommit: string;
  before: ProductLandingEntry;
  after: ProductLandingEntry;
}): BridgeEventRecord {
  if (input.before.id !== input.after.id) {
    throw new Error("Bridge event before/after records must have the same id");
  }

  const event: BridgeEventRecord = {
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
    evidence: evidenceFromState(stateFromEntry(input.after)),
  };

  return assertValidBridgeEventRecord(event, `Bridge event ${input.eventId}`);
}

export function createBridgeRegistrationEventRecord(input: {
  eventId: string;
  occurredAt: string;
  actor: string;
  parentCommit: string;
  entry: ProductLandingEntry;
}): BridgeEventRecord {
  const event: BridgeEventRecord = {
    schemaVersion: 1,
    eventId: input.eventId,
    bridgeId: input.entry.id,
    operation: "register",
    occurredAt: input.occurredAt,
    actor: input.actor,
    source: "bridge-ops-control-surface",
    commit: "self",
    parentCommit: input.parentCommit,
    from: null,
    to: stateFromEntry(input.entry),
    evidence: evidenceFromState(stateFromEntry(input.entry)),
  };

  return assertValidBridgeEventRecord(event, `Bridge registration event ${input.eventId}`);
}

export function parseBridgeEventLedger(content: string): BridgeEventRecord[] {
  const events: BridgeEventRecord[] = [];
  const eventIds = new Set<string>();

  for (const [index, rawLine] of content.split("\n").entries()) {
    const line = rawLine.trim();
    if (!line) continue;

    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      throw new Error(`Bridge event ledger contains invalid JSON on line ${index + 1}`);
    }

    const event = assertValidBridgeEventRecord(
      parsed,
      `Bridge event ledger line ${index + 1}`,
    );
    if (eventIds.has(event.eventId)) {
      throw new Error(`Bridge event ledger contains duplicate eventId ${event.eventId}`);
    }
    eventIds.add(event.eventId);
    events.push(event);
  }

  return events;
}

export function appendBridgeEventLedger(
  content: string,
  event: BridgeEventRecord,
): string {
  const existing = parseBridgeEventLedger(content);
  assertValidBridgeEventRecord(event, `Bridge event ${event.eventId}`);
  if (existing.some((candidate) => candidate.eventId === event.eventId)) {
    throw new Error(`Bridge event ${event.eventId} already exists in the ledger`);
  }

  const prefix = content && !content.endsWith("\n") ? `${content}\n` : content;
  const next = `${prefix}${JSON.stringify(event)}\n`;
  if (!next.startsWith(content)) {
    throw new Error("Bridge event ledger append violated prefix continuity");
  }
  if (parseBridgeEventLedger(next).length !== existing.length + 1) {
    throw new Error("Bridge event ledger append must add exactly one valid event");
  }
  return next;
}

export function replayBridgeEventLedger(
  epoch: BridgeLedgerEpoch,
  events: readonly BridgeEventRecord[],
): Record<string, BridgeEventState> {
  const epochErrors = validateBridgeLedgerEpoch(epoch);
  if (epochErrors.length > 0) {
    throw new Error(
      `Cannot replay invalid Bridge ledger epoch:\n${epochErrors
        .map((error) => `- ${error}`)
        .join("\n")}`,
    );
  }

  const states: Record<string, BridgeEventState> = Object.fromEntries(
    Object.entries(epoch.states).map(([bridgeId, state]) => [
      bridgeId,
      {
        ...state,
        operations: state.operations ? { ...state.operations } : undefined,
      },
    ]),
  );
  const seenEventIds = new Set<string>();
  const epochTime = Date.parse(epoch.establishedAt);

  for (const event of events) {
    const eventErrors = validateBridgeEventRecord(event);
    if (eventErrors.length > 0) {
      throw new Error(
        `Cannot replay invalid Bridge event ${event.eventId}:\n${eventErrors
          .map((error) => `- ${error}`)
          .join("\n")}`,
      );
    }
    if (seenEventIds.has(event.eventId)) {
      throw new Error(`Cannot replay duplicate Bridge event ${event.eventId}`);
    }
    seenEventIds.add(event.eventId);
    if (Date.parse(event.occurredAt) < epochTime) {
      throw new Error(`Bridge event ${event.eventId} predates the ledger epoch`);
    }

    const current = states[event.bridgeId];
    if (event.operation === "register") {
      if (current) {
        throw new Error(`Bridge ${event.bridgeId} is already registered in the ledger`);
      }
      states[event.bridgeId] = event.to;
      continue;
    }

    if (!current) {
      throw new Error(`Bridge event ${event.eventId} references unknown Bridge ${event.bridgeId}`);
    }
    if (!event.from || !bridgeEventStatesEqual(current, event.from)) {
      throw new Error(
        `Bridge event ${event.eventId} does not continue from the replayed state of ${event.bridgeId}`,
      );
    }

    states[event.bridgeId] = event.to;
  }

  return states;
}

export function validateBridgeLedgerCoherence(
  epoch: BridgeLedgerEpoch,
  events: readonly BridgeEventRecord[],
  manifest: ProductLandingManifest,
): string[] {
  let replayed: Record<string, BridgeEventState>;
  try {
    replayed = replayBridgeEventLedger(epoch, events);
  } catch (error) {
    return [error instanceof Error ? error.message : "Bridge ledger replay failed"];
  }

  const errors: string[] = [];
  const manifestBridges = manifest.pages.filter((entry) => entry.collection === "bridge");
  const manifestIds = new Set(manifestBridges.map((entry) => entry.id));

  for (const entry of manifestBridges) {
    const replayedState = replayed[entry.id];
    if (!replayedState) {
      errors.push(`Bridge ${entry.id} exists in the manifest but is absent from ledger history`);
      continue;
    }

    let manifestState: BridgeEventState;
    try {
      manifestState = stateFromEntry(entry);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `Bridge ${entry.id} is invalid`);
      continue;
    }

    if (!bridgeEventStatesEqual(replayedState, manifestState)) {
      errors.push(`Bridge ${entry.id} manifest state does not match replayed ledger state`);
    }
  }

  for (const bridgeId of Object.keys(replayed)) {
    if (!manifestIds.has(bridgeId)) {
      errors.push(`Bridge ${bridgeId} exists in ledger history but is absent from the manifest`);
    }
  }

  return errors;
}

export function assertBridgeLedgerCoherence(
  epoch: BridgeLedgerEpoch,
  events: readonly BridgeEventRecord[],
  manifest: ProductLandingManifest,
) {
  const errors = validateBridgeLedgerCoherence(epoch, events, manifest);
  if (errors.length > 0) {
    throw new Error(
      `Bridge manifest/ledger coherence failure:\n${errors
        .map((error) => `- ${error}`)
        .join("\n")}`,
    );
  }
}

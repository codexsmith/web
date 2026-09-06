import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = "src/content/product-landing-pages/manifest.json";
const epochPath = "src/content/bridge-ops/epoch.json";
const ledgerPath = "src/content/bridge-ops/events.jsonl";

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoDateTime(value) {
  return typeof value === "string" && value.includes("T") && !Number.isNaN(Date.parse(value));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, stable(item)]),
  );
}

function equal(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

const lifecycleStages = new Set([
  "draft",
  "ready",
  "sent",
  "discussion",
  "scoped",
  "active",
  "declined",
  "historical",
]);
const relationshipStatuses = new Set([
  "exploratory-no-affiliation",
  "target-class-no-affiliation",
  "historical-project-no-current-affiliation",
  "scoped-collaboration",
  "active-collaboration",
  "historical-collaboration",
  "declined-no-current-affiliation",
]);
const visibilityRouting = new Map([
  ["public", "public-candidate"],
  ["unlisted", "unlisted-only"],
  ["private", "hold"],
]);
const eventOperations = new Set([
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
]);
const shaPattern = /^[0-9a-f]{40}$/i;

function validateOperations(lifecycle, operations, label) {
  if (operations === undefined) {
    requireValue(lifecycle === "draft", `${label}: ${lifecycle} requires operations metadata`);
    return;
  }
  requireValue(isObject(operations), `${label}.operations must be an object`);

  for (const field of ["lifecycleChangedAt", "lastContactAt", "nextActionAt"]) {
    if (operations[field] !== undefined) {
      requireValue(isIsoDateTime(operations[field]), `${label}.operations.${field} must be an ISO date-time`);
    }
  }
  requireValue(
    Boolean(operations.nextAction) === Boolean(operations.nextActionAt),
    `${label}: nextAction and nextActionAt must occur together`,
  );

  if (lifecycle !== "draft") {
    requireValue(Boolean(operations.lifecycleChangedAt), `${label}: ${lifecycle} requires lifecycleChangedAt`);
  }
  if (lifecycle === "sent" || lifecycle === "discussion") {
    requireValue(Boolean(operations.lastContactAt), `${label}: ${lifecycle} requires lastContactAt`);
  }
  if (lifecycle === "scoped" || lifecycle === "active") {
    requireValue(Boolean(operations.owner?.trim()), `${label}: ${lifecycle} requires owner`);
  }
  if (lifecycle === "declined" || lifecycle === "historical") {
    requireValue(Boolean(operations.closureReason?.trim()), `${label}: ${lifecycle} requires closureReason`);
    requireValue(!operations.nextAction && !operations.nextActionAt, `${label}: closed lifecycle cannot retain next action`);
  } else {
    requireValue(!operations.closureReason, `${label}: closureReason is only valid for closed lifecycle`);
  }
}

function validateState(state, label) {
  requireValue(isObject(state), `${label} must be an object`);
  requireValue(lifecycleStages.has(state.lifecycle), `${label}.lifecycle is unsupported`);
  requireValue(visibilityRouting.has(state.visibility), `${label}.visibility is unsupported`);
  requireValue(
    visibilityRouting.get(state.visibility) === state.routingEligibility,
    `${label}: visibility/routing tuple is invalid`,
  );
  requireValue(
    relationshipStatuses.has(state.relationshipStatus),
    `${label}.relationshipStatus is unsupported`,
  );

  if (state.lifecycle === "scoped") {
    requireValue(state.relationshipStatus === "scoped-collaboration", `${label}: scoped requires scoped-collaboration`);
  }
  if (state.lifecycle === "active") {
    requireValue(state.relationshipStatus === "active-collaboration", `${label}: active requires active-collaboration`);
  }
  if (state.lifecycle === "declined") {
    requireValue(
      state.relationshipStatus === "declined-no-current-affiliation",
      `${label}: declined requires declined-no-current-affiliation`,
    );
  }
  if (state.lifecycle === "historical") {
    requireValue(
      state.relationshipStatus === "historical-collaboration" ||
        state.relationshipStatus === "historical-project-no-current-affiliation",
      `${label}: historical relationship status is invalid`,
    );
  }
  if (state.relationshipStatus === "scoped-collaboration") {
    requireValue(state.lifecycle === "scoped", `${label}: scoped-collaboration is scoped-only`);
  }
  if (state.relationshipStatus === "active-collaboration") {
    requireValue(state.lifecycle === "active", `${label}: active-collaboration is active-only`);
  }
  if (state.relationshipStatus === "historical-collaboration") {
    requireValue(state.lifecycle === "historical", `${label}: historical-collaboration is historical-only`);
  }
  if (state.relationshipStatus === "declined-no-current-affiliation") {
    requireValue(state.lifecycle === "declined", `${label}: declined relationship is declined-only`);
  }
  if (state.visibility === "public") {
    requireValue(
      (state.lifecycle === "active" && state.relationshipStatus === "active-collaboration") ||
        (state.lifecycle === "historical" &&
          (state.relationshipStatus === "historical-collaboration" ||
            state.relationshipStatus === "historical-project-no-current-affiliation")),
      `${label}: public visibility requires an active or historical relationship`,
    );
  }

  validateOperations(state.lifecycle, state.operations, label);
}

function stateFromManifest(entry) {
  return {
    lifecycle: entry.status,
    visibility: entry.visibility,
    routingEligibility: entry.routingEligibility,
    relationshipStatus: entry.relationshipStatus,
    ...(entry.bridgeOperations ? { operations: entry.bridgeOperations } : {}),
  };
}

function parseLedger(content) {
  const events = [];
  const ids = new Set();
  for (const [index, rawLine] of content.split("\n").entries()) {
    const line = rawLine.trim();
    if (!line) continue;

    let event;
    try {
      event = JSON.parse(line);
    } catch {
      throw new Error(`Bridge ledger line ${index + 1} is not valid JSON`);
    }

    requireValue(event.schemaVersion === 1, `Bridge ledger line ${index + 1}: unsupported schemaVersion`);
    requireValue(typeof event.eventId === "string" && event.eventId.trim(), `Bridge ledger line ${index + 1}: eventId required`);
    requireValue(!ids.has(event.eventId), `Bridge ledger contains duplicate eventId ${event.eventId}`);
    ids.add(event.eventId);
    requireValue(typeof event.bridgeId === "string" && event.bridgeId.trim(), `Bridge event ${event.eventId}: bridgeId required`);
    requireValue(eventOperations.has(event.operation), `Bridge event ${event.eventId}: unsupported operation`);
    requireValue(isIsoDateTime(event.occurredAt), `Bridge event ${event.eventId}: invalid occurredAt`);
    requireValue(typeof event.actor === "string" && event.actor.trim(), `Bridge event ${event.eventId}: actor required`);
    requireValue(event.source === "bridge-ops-control-surface", `Bridge event ${event.eventId}: invalid source`);
    requireValue(event.commit === "self", `Bridge event ${event.eventId}: commit must be self`);
    requireValue(shaPattern.test(event.parentCommit ?? ""), `Bridge event ${event.eventId}: invalid parentCommit`);
    if (event.from !== null) validateState(event.from, `event ${event.eventId}.from`);
    validateState(event.to, `event ${event.eventId}.to`);

    const expectedEvidence = {
      owner: event.to.operations?.owner,
      lastContactAt: event.to.operations?.lastContactAt,
      nextAction: event.to.operations?.nextAction,
      nextActionAt: event.to.operations?.nextActionAt,
      closureReason: event.to.operations?.closureReason,
    };
    requireValue(equal(event.evidence ?? {}, expectedEvidence), `Bridge event ${event.eventId}: evidence does not match to.operations`);

    events.push(event);
  }
  return events;
}

const manifest = JSON.parse(read(manifestPath));
const epoch = JSON.parse(read(epochPath));
const events = parseLedger(read(ledgerPath));

requireValue(epoch.schemaVersion === 1, "Bridge ledger epoch schemaVersion must be 1");
requireValue(typeof epoch.epochId === "string" && epoch.epochId.trim(), "Bridge ledger epochId is required");
requireValue(isIsoDateTime(epoch.establishedAt), "Bridge ledger epoch establishedAt must be an ISO date-time");
requireValue(epoch.source === "bridge-ops-ledger-epoch", "Bridge ledger epoch source is invalid");
requireValue(epoch.commit === "self", "Bridge ledger epoch commit must be self");
requireValue(shaPattern.test(epoch.parentCommit ?? ""), "Bridge ledger epoch parentCommit is invalid");
requireValue(epoch.manifestVersion === manifest.version, "Bridge ledger epoch manifestVersion must match current manifest version until a version migration is explicitly modeled");
requireValue(isObject(epoch.states), "Bridge ledger epoch states must be an object");

const replayed = {};
for (const [bridgeId, state] of Object.entries(epoch.states)) {
  requireValue(bridgeId.trim(), "Bridge ledger epoch contains an empty Bridge id");
  validateState(state, `epoch state ${bridgeId}`);
  replayed[bridgeId] = structuredClone(state);
}

const epochTime = Date.parse(epoch.establishedAt);
for (const event of events) {
  requireValue(Date.parse(event.occurredAt) >= epochTime, `Bridge event ${event.eventId} predates the ledger epoch`);
  const current = replayed[event.bridgeId];

  if (event.operation === "register") {
    requireValue(!current, `Bridge ${event.bridgeId} cannot be registered twice`);
    requireValue(event.from === null, `Bridge registration ${event.eventId} requires from=null`);
    requireValue(event.to.lifecycle === "draft", `Bridge registration ${event.eventId} must start as draft`);
    replayed[event.bridgeId] = structuredClone(event.to);
    continue;
  }

  requireValue(current, `Bridge event ${event.eventId} references unknown Bridge ${event.bridgeId}`);
  requireValue(event.from !== null, `Bridge event ${event.eventId} requires a from state`);
  requireValue(equal(current, event.from), `Bridge event ${event.eventId} breaks replay continuity for ${event.bridgeId}`);
  replayed[event.bridgeId] = structuredClone(event.to);
}

const manifestBridges = manifest.pages.filter((entry) => entry.collection === "bridge");
const manifestIds = new Set(manifestBridges.map((entry) => entry.id));

for (const entry of manifestBridges) {
  const state = stateFromManifest(entry);
  validateState(state, `manifest Bridge ${entry.id}`);
  requireValue(replayed[entry.id], `Manifest Bridge ${entry.id} is absent from ledger history`);
  requireValue(
    equal(replayed[entry.id], state),
    `Manifest Bridge ${entry.id} does not match replayed ledger state`,
  );
}

for (const bridgeId of Object.keys(replayed)) {
  requireValue(manifestIds.has(bridgeId), `Ledger Bridge ${bridgeId} is absent from the manifest`);
}

const eventLedgerSource = read("src/lib/bridge-event-ledger.ts");
const storeSource = read("src/lib/bridge-ops-store.ts");
const packageJson = read("package.json");

requireValue(
  /parseBridgeLedgerEpoch/.test(eventLedgerSource) && /replayBridgeEventLedger/.test(eventLedgerSource),
  "Bridge event ledger must expose epoch parsing and replay machinery",
);
requireValue(
  /assertBridgeLedgerCoherence\(epoch, events, manifest\)/.test(storeSource),
  "Bridge ops load path must fail closed on manifest/ledger incoherence",
);
requireValue(
  /assertBridgeLedgerCoherence\(snapshot\.epoch, events, manifest\)/.test(storeSource),
  "Bridge ops commit path must validate candidate manifest/ledger coherence before writing",
);
requireValue(
  /ledgerContent\.startsWith\(snapshot\.ledgerContent\)/.test(storeSource),
  "Bridge ops transaction must enforce append-only ledger prefix continuity",
);
requireValue(
  /node scripts\/check_bridge_ledger_contracts\.mjs/.test(packageJson),
  "contracts:check must run the Bridge ledger contract checker",
);

console.log(`Bridge ledger contracts passed: ${manifestBridges.length} Bridges, ${events.length} events.`);

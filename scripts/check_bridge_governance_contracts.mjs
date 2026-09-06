import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing required file: ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function requireMatch(source, pattern, message) {
  requireValue(pattern.test(source), message);
}

function requireAbsent(source, pattern, message) {
  requireValue(!pattern.test(source), message);
}

const governance = read("src/lib/bridge-governance.ts");
const transitions = read("src/lib/bridge-transitions.ts");
const bridgeSystem = read("src/lib/bridge-system.ts");
const contentRegistry = read("src/lib/content-registry.ts");
const manifest = JSON.parse(read("src/content/product-landing-pages/manifest.json"));
const packageJson = read("package.json");

const expectedTransitions = {
  draft: ["ready", "declined"],
  ready: ["sent", "declined"],
  sent: ["discussion", "declined"],
  discussion: ["scoped", "declined"],
  scoped: ["active", "declined"],
  active: ["historical"],
  declined: ["draft"],
  historical: [],
};

for (const [from, targets] of Object.entries(expectedTransitions)) {
  const arrayPattern = targets.length
    ? targets.map((target) => `"${target}"`).join(",\\s*")
    : "";
  requireMatch(
    governance,
    new RegExp(`${from}:\\s*\\[${arrayPattern}\\]`),
    `Bridge lifecycle transition contract drifted for ${from}`,
  );
}

const lifecycleStages = new Set(Object.keys(expectedTransitions));
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

function validateOperations(entry) {
  const lifecycle = entry.status;
  const operations = entry.bridgeOperations;
  if (!operations) {
    requireValue(lifecycle === "draft", `${entry.id}: ${lifecycle} requires bridgeOperations`);
    return;
  }

  if (lifecycle !== "draft") {
    requireValue(Boolean(operations.lifecycleChangedAt), `${entry.id}: ${lifecycle} requires lifecycleChangedAt`);
  }
  if (lifecycle === "sent" || lifecycle === "discussion") {
    requireValue(Boolean(operations.lastContactAt), `${entry.id}: ${lifecycle} requires lastContactAt`);
  }
  if (lifecycle === "scoped" || lifecycle === "active") {
    requireValue(Boolean(operations.owner?.trim()), `${entry.id}: ${lifecycle} requires owner`);
  }
  if (lifecycle === "declined" || lifecycle === "historical") {
    requireValue(Boolean(operations.closureReason?.trim()), `${entry.id}: ${lifecycle} requires closureReason`);
    requireValue(!operations.nextAction && !operations.nextActionAt, `${entry.id}: closed lifecycle cannot retain a next action`);
  }
  requireValue(
    Boolean(operations.nextAction) === Boolean(operations.nextActionAt),
    `${entry.id}: nextAction and nextActionAt must be paired`,
  );
}

function validateBridge(entry) {
  requireValue(lifecycleStages.has(entry.status), `${entry.id}: unsupported lifecycle ${entry.status}`);
  requireValue(
    relationshipStatuses.has(entry.relationshipStatus),
    `${entry.id}: unsupported relationshipStatus ${entry.relationshipStatus}`,
  );
  requireValue(
    visibilityRouting.get(entry.visibility) === entry.routingEligibility,
    `${entry.id}: invalid visibility/routing tuple`,
  );

  if (entry.status === "scoped") {
    requireValue(entry.relationshipStatus === "scoped-collaboration", `${entry.id}: scoped requires scoped-collaboration`);
  }
  if (entry.status === "active") {
    requireValue(entry.relationshipStatus === "active-collaboration", `${entry.id}: active requires active-collaboration`);
  }
  if (entry.status === "declined") {
    requireValue(
      entry.relationshipStatus === "declined-no-current-affiliation",
      `${entry.id}: declined requires declined-no-current-affiliation`,
    );
  }
  if (entry.status === "historical") {
    requireValue(
      entry.relationshipStatus === "historical-collaboration" ||
        entry.relationshipStatus === "historical-project-no-current-affiliation",
      `${entry.id}: invalid historical relationship state`,
    );
  }
  if (entry.relationshipStatus === "scoped-collaboration") {
    requireValue(entry.status === "scoped", `${entry.id}: scoped-collaboration is scoped-only`);
  }
  if (entry.relationshipStatus === "active-collaboration") {
    requireValue(entry.status === "active", `${entry.id}: active-collaboration is active-only`);
  }
  if (entry.relationshipStatus === "historical-collaboration") {
    requireValue(entry.status === "historical", `${entry.id}: historical-collaboration is historical-only`);
  }
  if (entry.relationshipStatus === "declined-no-current-affiliation") {
    requireValue(entry.status === "declined", `${entry.id}: declined relationship is declined-only`);
  }
  if (entry.visibility === "public") {
    requireValue(
      (entry.status === "active" && entry.relationshipStatus === "active-collaboration") ||
        (entry.status === "historical" &&
          (entry.relationshipStatus === "historical-collaboration" ||
            entry.relationshipStatus === "historical-project-no-current-affiliation")),
      `${entry.id}: public Bridge lacks an active/historical relationship basis`,
    );
  }

  validateOperations(entry);
}

const bridges = manifest.pages.filter((entry) => entry.collection === "bridge");
requireValue(bridges.length > 0, "Bridge manifest collection must not be empty");
for (const bridge of bridges) validateBridge(bridge);

const requiredTransitionHelpers = [
  "markBridgeReady",
  "markBridgeSent",
  "recordBridgeResponse",
  "recordBridgeContact",
  "scopeBridge",
  "activateBridge",
  "declineBridge",
  "archiveBridge",
  "reopenBridge",
  "publishBridge",
  "unpublishBridge",
];
for (const helper of requiredTransitionHelpers) {
  requireMatch(
    transitions,
    new RegExp(`export function ${helper}\\s*\\(`),
    `Missing Bridge transition helper: ${helper}`,
  );
}

requireMatch(
  transitions,
  /if \(bridge\.visibility === "public"\)[\s\S]*already public/,
  "publishBridge must reject a public -> public no-op",
);
requireMatch(
  transitions,
  /if \(bridge\.visibility !== "public"\)[\s\S]*is not public/,
  "unpublishBridge must reject non-public no-op/demotion requests",
);
requireMatch(
  transitions,
  /status:\s*"draft"[\s\S]*visibility:\s*"unlisted"[\s\S]*routingEligibility:\s*"unlisted-only"[\s\S]*bridgeOperations:\s*undefined/,
  "reopenBridge must reset a declined Bridge to an unlisted draft without operations",
);

requireMatch(
  bridgeSystem,
  /const projectedSourceClassPairs = new Set<string>\(\)/,
  "Bridge graph projection must deduplicate source/class pairs",
);
requireMatch(
  bridgeSystem,
  /const key = `\$\{sourceNodeId\}::\$\{record\.bridgeClass\}`/,
  "Bridge graph deduplication key must be source node + generic Bridge class",
);
requireMatch(
  bridgeSystem,
  /to:\s*`bridges-\$\{record\.bridgeClass\}`/,
  "Bridge graph edges must terminate at generic public Bridge-class nodes",
);
requireAbsent(
  bridgeSystem,
  /to:\s*record\.entry\.(?:id|slug)/,
  "Recipient-specific Bridge records must never become public graph edge targets",
);
requireAbsent(
  bridgeSystem,
  /label:\s*record\.entry\.(?:id|slug|file)/,
  "Recipient-specific Bridge identifiers must never become public graph edge labels",
);
requireMatch(
  bridgeSystem,
  /export const bridgeSystemNodes:\s*ContentNode\[\]\s*=\s*\[bridgeSystemNode,\s*\.\.\.bridgeClassNodes\]/,
  "Public Bridge nodes must remain limited to the institutional node and generic class nodes",
);
requireMatch(
  bridgeSystem,
  /record\.entry\.visibility === "public"[\s\S]*record\.entry\.routingEligibility === "public-candidate"/,
  "Bridge discoverability must remain an explicit public/public-candidate tuple",
);
requireMatch(
  contentRegistry,
  /bridgeSystemEdges[\s\S]*bridgeSystemNodes/,
  "Content registry must consume the governed Bridge graph projection",
);

const publicBridges = bridges.filter(
  (entry) => entry.visibility === "public" && entry.routingEligibility === "public-candidate",
);
for (const bridge of bridges) {
  if (bridge.visibility === "unlisted") {
    requireValue(
      !publicBridges.some((publicBridge) => publicBridge.id === bridge.id),
      `${bridge.id}: unlisted Bridge leaked into public discovery set`,
    );
  }
}

requireMatch(
  packageJson,
  /node scripts\/check_bridge_governance_contracts\.mjs/,
  "contracts:check must run the Bridge governance contract checker",
);

console.log(
  `Bridge governance contracts passed: ${bridges.length} governed Bridges, ${publicBridges.length} public.`,
);

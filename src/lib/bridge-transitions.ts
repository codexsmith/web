import {
  canTransitionBridgeLifecycle,
  getBridgeLifecycle,
  validateBridgeGovernanceEntry,
  type BridgeLifecycleStage,
  type BridgeOperationalMetadata,
  type BridgeRelationshipStatus,
} from "@/lib/bridge-governance";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type BridgeEntry = ProductLandingEntry & { collection: "bridge" };

type TransitionContext = {
  at?: string;
};

function timestamp(context?: TransitionContext) {
  return context?.at ?? new Date().toISOString();
}

function requireBridge(entry: ProductLandingEntry): BridgeEntry {
  if (entry.collection !== "bridge") {
    throw new Error(`Landing ${entry.id} is not a bridge record`);
  }
  return entry as BridgeEntry;
}

function requireLifecycle(entry: BridgeEntry): BridgeLifecycleStage {
  const lifecycle = getBridgeLifecycle(entry.status);
  if (!lifecycle) {
    throw new Error(`Bridge ${entry.id} has unsupported lifecycle ${entry.status}`);
  }
  return lifecycle;
}

function requireTransition(
  entry: BridgeEntry,
  to: BridgeLifecycleStage,
): BridgeLifecycleStage {
  const from = requireLifecycle(entry);
  if (!canTransitionBridgeLifecycle(from, to)) {
    throw new Error(`Bridge ${entry.id} cannot transition ${from} -> ${to}`);
  }
  return from;
}

function assertValid(entry: BridgeEntry): BridgeEntry {
  const errors = validateBridgeGovernanceEntry(entry);
  if (errors.length > 0) {
    throw new Error(
      `Bridge ${entry.id} transition produced invalid governance state:\n${errors
        .map((error) => `- ${error}`)
        .join("\n")}`,
    );
  }
  return entry;
}

function transition(
  entry: ProductLandingEntry,
  to: BridgeLifecycleStage,
  relationshipStatus: BridgeRelationshipStatus,
  operations: BridgeOperationalMetadata,
): BridgeEntry {
  const bridge = requireBridge(entry);
  requireTransition(bridge, to);

  return assertValid({
    ...bridge,
    status: to,
    relationshipStatus,
    bridgeOperations: operations,
  });
}

function preservedNonAffiliationStatus(
  entry: BridgeEntry,
): BridgeRelationshipStatus {
  switch (entry.relationshipStatus) {
    case "target-class-no-affiliation":
      return "target-class-no-affiliation";
    case "historical-project-no-current-affiliation":
      return "historical-project-no-current-affiliation";
    default:
      return "exploratory-no-affiliation";
  }
}

export function markBridgeReady(
  entry: ProductLandingEntry,
  input: {
    nextAction?: string;
    nextActionAt?: string;
  } = {},
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(
    bridge,
    "ready",
    preservedNonAffiliationStatus(bridge),
    {
      ...bridge.bridgeOperations,
      lifecycleChangedAt: at,
      closureReason: undefined,
      nextAction: input.nextAction,
      nextActionAt: input.nextActionAt,
    },
  );
}

export function markBridgeSent(
  entry: ProductLandingEntry,
  input: {
    nextAction?: string;
    nextActionAt?: string;
  } = {},
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(
    bridge,
    "sent",
    preservedNonAffiliationStatus(bridge),
    {
      ...bridge.bridgeOperations,
      lifecycleChangedAt: at,
      lastContactAt: at,
      closureReason: undefined,
      nextAction: input.nextAction,
      nextActionAt: input.nextActionAt,
    },
  );
}

export function recordBridgeResponse(
  entry: ProductLandingEntry,
  input: {
    nextAction?: string;
    nextActionAt?: string;
  } = {},
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(
    bridge,
    "discussion",
    preservedNonAffiliationStatus(bridge),
    {
      ...bridge.bridgeOperations,
      lifecycleChangedAt: at,
      lastContactAt: at,
      closureReason: undefined,
      nextAction: input.nextAction,
      nextActionAt: input.nextActionAt,
    },
  );
}

export function recordBridgeContact(
  entry: ProductLandingEntry,
  input: {
    nextAction?: string;
    nextActionAt?: string;
  } = {},
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const lifecycle = requireLifecycle(bridge);
  if (lifecycle !== "sent" && lifecycle !== "discussion") {
    throw new Error(
      `Bridge ${bridge.id} contact can only be recorded during sent or discussion lifecycle`,
    );
  }

  const at = timestamp(context);
  return assertValid({
    ...bridge,
    bridgeOperations: {
      ...bridge.bridgeOperations,
      lastContactAt: at,
      nextAction: input.nextAction,
      nextActionAt: input.nextActionAt,
    },
  });
}

export function scopeBridge(
  entry: ProductLandingEntry,
  input: {
    owner: string;
    nextAction?: string;
    nextActionAt?: string;
  },
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(bridge, "scoped", "scoped-collaboration", {
    ...bridge.bridgeOperations,
    owner: input.owner,
    lifecycleChangedAt: at,
    closureReason: undefined,
    nextAction: input.nextAction,
    nextActionAt: input.nextActionAt,
  });
}

export function activateBridge(
  entry: ProductLandingEntry,
  input: {
    owner?: string;
    nextAction?: string;
    nextActionAt?: string;
  } = {},
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);
  const owner = input.owner ?? bridge.bridgeOperations?.owner;

  if (!owner) {
    throw new Error(`Bridge ${bridge.id} activation requires an owner`);
  }

  return transition(bridge, "active", "active-collaboration", {
    ...bridge.bridgeOperations,
    owner,
    lifecycleChangedAt: at,
    closureReason: undefined,
    nextAction: input.nextAction,
    nextActionAt: input.nextActionAt,
  });
}

export function declineBridge(
  entry: ProductLandingEntry,
  input: { reason: string },
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(bridge, "declined", "declined-no-current-affiliation", {
    ...bridge.bridgeOperations,
    lifecycleChangedAt: at,
    closureReason: input.reason,
    nextAction: undefined,
    nextActionAt: undefined,
  });
}

export function archiveBridge(
  entry: ProductLandingEntry,
  input: {
    reason: string;
    historicalRelationship?: "historical-collaboration" | "historical-project-no-current-affiliation";
  },
  context?: TransitionContext,
): BridgeEntry {
  const bridge = requireBridge(entry);
  const at = timestamp(context);

  return transition(
    bridge,
    "historical",
    input.historicalRelationship ?? "historical-collaboration",
    {
      ...bridge.bridgeOperations,
      lifecycleChangedAt: at,
      closureReason: input.reason,
      nextAction: undefined,
      nextActionAt: undefined,
    },
  );
}

export function reopenBridge(
  entry: ProductLandingEntry,
  input: {
    relationshipStatus?:
      | "exploratory-no-affiliation"
      | "target-class-no-affiliation"
      | "historical-project-no-current-affiliation";
  } = {},
): BridgeEntry {
  const bridge = requireBridge(entry);
  requireTransition(bridge, "draft");

  return assertValid({
    ...bridge,
    status: "draft",
    relationshipStatus:
      input.relationshipStatus ?? "exploratory-no-affiliation",
    visibility: "unlisted",
    routingEligibility: "unlisted-only",
    bridgeOperations: undefined,
  });
}

export function publishBridge(entry: ProductLandingEntry): BridgeEntry {
  const bridge = requireBridge(entry);
  const lifecycle = requireLifecycle(bridge);
  if (lifecycle !== "active" && lifecycle !== "historical") {
    throw new Error(
      `Bridge ${bridge.id} can only become public when active or historical`,
    );
  }

  return assertValid({
    ...bridge,
    visibility: "public",
    routingEligibility: "public-candidate",
  });
}

export function unpublishBridge(entry: ProductLandingEntry): BridgeEntry {
  const bridge = requireBridge(entry);
  return assertValid({
    ...bridge,
    visibility: "unlisted",
    routingEligibility: "unlisted-only",
  });
}

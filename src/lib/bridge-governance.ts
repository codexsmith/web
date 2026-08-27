export const BRIDGE_LIFECYCLE_STAGES = [
  "draft",
  "ready",
  "sent",
  "discussion",
  "scoped",
  "active",
  "declined",
  "historical",
] as const;

export type BridgeLifecycleStage = (typeof BRIDGE_LIFECYCLE_STAGES)[number];

export const BRIDGE_RELATIONSHIP_STATUSES = [
  "exploratory-no-affiliation",
  "target-class-no-affiliation",
  "historical-project-no-current-affiliation",
  "scoped-collaboration",
  "active-collaboration",
  "historical-collaboration",
  "declined-no-current-affiliation",
] as const;

export type BridgeRelationshipStatus =
  (typeof BRIDGE_RELATIONSHIP_STATUSES)[number];

export type BridgeVisibility = "public" | "unlisted" | "private";
export type BridgeRoutingEligibility =
  | "public-candidate"
  | "unlisted-only"
  | "hold";

export type BridgeOperationalMetadata = {
  owner?: string;
  lifecycleChangedAt?: string;
  lastContactAt?: string;
  nextAction?: string;
  nextActionAt?: string;
  closureReason?: string;
};

export type BridgeGovernanceState = {
  lifecycle: BridgeLifecycleStage;
  visibility: BridgeVisibility;
  routingEligibility: BridgeRoutingEligibility;
  relationshipStatus: BridgeRelationshipStatus;
};

const lifecycleStageSet = new Set<string>(BRIDGE_LIFECYCLE_STAGES);
const relationshipStatusSet = new Set<string>(BRIDGE_RELATIONSHIP_STATUSES);

const transitionMap: Record<BridgeLifecycleStage, BridgeLifecycleStage[]> = {
  draft: ["ready", "declined"],
  ready: ["sent", "declined"],
  sent: ["discussion", "declined"],
  discussion: ["scoped", "declined"],
  scoped: ["active", "declined"],
  active: ["historical"],
  declined: ["draft"],
  historical: [],
};

export function isBridgeLifecycleStage(
  value: string,
): value is BridgeLifecycleStage {
  return lifecycleStageSet.has(value);
}

export function isBridgeRelationshipStatus(
  value: string,
): value is BridgeRelationshipStatus {
  return relationshipStatusSet.has(value);
}

export function getAllowedBridgeLifecycleTransitions(
  lifecycle: BridgeLifecycleStage,
): readonly BridgeLifecycleStage[] {
  return transitionMap[lifecycle];
}

export function canTransitionBridgeLifecycle(
  from: BridgeLifecycleStage,
  to: BridgeLifecycleStage,
): boolean {
  return transitionMap[from].includes(to);
}

export function getBridgeLifecycle(
  status: string,
): BridgeLifecycleStage | undefined {
  return isBridgeLifecycleStage(status) ? status : undefined;
}

function isIsoDateTime(value: string) {
  return value.includes("T") && !Number.isNaN(Date.parse(value));
}

export function validateBridgeOperationalMetadata(
  lifecycle: BridgeLifecycleStage,
  metadata: BridgeOperationalMetadata | undefined,
): string[] {
  const errors: string[] = [];

  if (!metadata) {
    if (lifecycle !== "draft") {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.lifecycleChangedAt`);
    }
    if (lifecycle === "sent" || lifecycle === "discussion") {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.lastContactAt`);
    }
    if (lifecycle === "scoped" || lifecycle === "active") {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.owner`);
    }
    if (lifecycle === "declined" || lifecycle === "historical") {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.closureReason`);
    }
    return errors;
  }

  for (const [field, value] of [
    ["lifecycleChangedAt", metadata.lifecycleChangedAt],
    ["lastContactAt", metadata.lastContactAt],
    ["nextActionAt", metadata.nextActionAt],
  ] as const) {
    if (value && !isIsoDateTime(value)) {
      errors.push(`bridgeOperations.${field} must be an ISO date-time`);
    }
  }

  if (lifecycle !== "draft" && !metadata.lifecycleChangedAt) {
    errors.push(`${lifecycle} lifecycle requires bridgeOperations.lifecycleChangedAt`);
  }

  if (metadata.nextAction && !metadata.nextActionAt) {
    errors.push("bridgeOperations.nextAction requires nextActionAt");
  }
  if (metadata.nextActionAt && !metadata.nextAction) {
    errors.push("bridgeOperations.nextActionAt requires nextAction");
  }

  if (
    (lifecycle === "sent" || lifecycle === "discussion") &&
    !metadata.lastContactAt
  ) {
    errors.push(`${lifecycle} lifecycle requires bridgeOperations.lastContactAt`);
  }

  if (lifecycle === "scoped" || lifecycle === "active") {
    if (!metadata.owner?.trim()) {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.owner`);
    }
  }

  if (lifecycle === "declined" || lifecycle === "historical") {
    if (!metadata.closureReason?.trim()) {
      errors.push(`${lifecycle} lifecycle requires bridgeOperations.closureReason`);
    }
    if (metadata.nextAction || metadata.nextActionAt) {
      errors.push(`${lifecycle} lifecycle cannot retain a next action`);
    }
  } else if (metadata.closureReason) {
    errors.push("bridgeOperations.closureReason is only valid for declined or historical lifecycle");
  }

  return errors;
}

export function validateBridgeGovernanceState(
  state: BridgeGovernanceState,
): string[] {
  const errors: string[] = [];

  if (
    state.visibility === "public" &&
    state.routingEligibility !== "public-candidate"
  ) {
    errors.push("public visibility requires public-candidate routing");
  }

  if (
    state.visibility === "unlisted" &&
    state.routingEligibility !== "unlisted-only"
  ) {
    errors.push("unlisted visibility requires unlisted-only routing");
  }

  if (state.visibility === "private" && state.routingEligibility !== "hold") {
    errors.push("private visibility requires hold routing");
  }

  if (
    state.lifecycle === "scoped" &&
    state.relationshipStatus !== "scoped-collaboration"
  ) {
    errors.push("scoped lifecycle requires scoped-collaboration relationship status");
  }

  if (
    state.lifecycle === "active" &&
    state.relationshipStatus !== "active-collaboration"
  ) {
    errors.push("active lifecycle requires active-collaboration relationship status");
  }

  if (
    state.lifecycle === "historical" &&
    state.relationshipStatus !== "historical-collaboration" &&
    state.relationshipStatus !== "historical-project-no-current-affiliation"
  ) {
    errors.push(
      "historical lifecycle requires historical-collaboration or historical-project-no-current-affiliation relationship status",
    );
  }

  if (
    state.relationshipStatus === "scoped-collaboration" &&
    state.lifecycle !== "scoped"
  ) {
    errors.push("scoped-collaboration relationship status is only valid at scoped lifecycle");
  }

  if (
    state.relationshipStatus === "active-collaboration" &&
    state.lifecycle !== "active"
  ) {
    errors.push("active-collaboration relationship status is only valid at active lifecycle");
  }

  if (
    state.relationshipStatus === "historical-collaboration" &&
    state.lifecycle !== "historical"
  ) {
    errors.push("historical-collaboration relationship status is only valid at historical lifecycle");
  }

  if (
    state.relationshipStatus === "declined-no-current-affiliation" &&
    state.lifecycle !== "declined"
  ) {
    errors.push("declined-no-current-affiliation relationship status is only valid at declined lifecycle");
  }

  if (state.visibility === "public") {
    const publicActive =
      state.lifecycle === "active" &&
      state.relationshipStatus === "active-collaboration";
    const publicHistorical =
      state.lifecycle === "historical" &&
      (state.relationshipStatus === "historical-collaboration" ||
        state.relationshipStatus === "historical-project-no-current-affiliation");

    if (!publicActive && !publicHistorical) {
      errors.push(
        "public bridge visibility requires an active or historical lifecycle with a matching relationship status",
      );
    }
  }

  return errors;
}

export function validateBridgeGovernanceEntry(entry: {
  status: string;
  visibility: BridgeVisibility;
  routingEligibility: BridgeRoutingEligibility;
  relationshipStatus?: string;
  bridgeOperations?: BridgeOperationalMetadata;
}): string[] {
  const errors: string[] = [];
  const lifecycle = getBridgeLifecycle(entry.status);

  if (!lifecycle) {
    errors.push(`unsupported bridge lifecycle ${entry.status}`);
  }

  if (!entry.relationshipStatus) {
    errors.push("bridge entries require relationshipStatus");
  } else if (!isBridgeRelationshipStatus(entry.relationshipStatus)) {
    errors.push(`unsupported relationshipStatus ${entry.relationshipStatus}`);
  }

  if (!lifecycle || !entry.relationshipStatus || !isBridgeRelationshipStatus(entry.relationshipStatus)) {
    return errors;
  }

  return [
    ...errors,
    ...validateBridgeGovernanceState({
      lifecycle,
      visibility: entry.visibility,
      routingEligibility: entry.routingEligibility,
      relationshipStatus: entry.relationshipStatus,
    }),
    ...validateBridgeOperationalMetadata(lifecycle, entry.bridgeOperations),
  ];
}

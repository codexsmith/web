import type {
  AudienceDataset,
  AudienceNode,
  Depth,
  DoorwayNode,
  IntentNode,
} from "./types";

export const AUDIENCE_DEPTHS = [
  "recognize",
  "understand",
  "use",
  "build",
  "evaluate",
  "extend",
] as const satisfies readonly Depth[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireString(
  value: unknown,
  field: string,
  owner: string,
): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Audience node '${owner}' requires a non-empty '${field}'.`);
  }
}

function requireStringArray(
  value: unknown,
  field: string,
  owner: string,
): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(
      `Audience node '${owner}' requires '${field}' to contain only non-empty strings.`,
    );
  }
}

function isDepth(value: unknown): value is Depth {
  return AUDIENCE_DEPTHS.includes(value as Depth);
}

function validateAudienceShape(audience: AudienceNode) {
  const owner = audience.id;
  requireString(audience.shortTitle, "shortTitle", owner);
  requireString(audience.arrivalStatement, "arrivalStatement", owner);
  requireString(audience.trigger, "trigger", owner);
  requireString(audience.barrier, "barrier", owner);
  requireString(
    audience.desiredTransformation,
    "desiredTransformation",
    owner,
  );
  requireString(audience.successSignal, "successSignal", owner);
  requireStringArray(audience.useCases, "useCases", owner);
  requireStringArray(audience.doorwayIds, "doorwayIds", owner);
  requireStringArray(audience.coreConcepts, "coreConcepts", owner);
  requireStringArray(
    audience.recommendedNodeIds,
    "recommendedNodeIds",
    owner,
  );
  requireStringArray(audience.preferredFormats, "preferredFormats", owner);
  requireStringArray(audience.related, "related", owner);

  if (
    !isRecord(audience.depthRange) ||
    !isDepth(audience.depthRange.entry) ||
    !isDepth(audience.depthRange.maximum)
  ) {
    throw new Error(`Invalid depth range on audience '${owner}'.`);
  }

  const entryIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.entry);
  const maximumIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.maximum);
  if (entryIndex > maximumIndex) {
    throw new Error(
      `Audience '${owner}' has an entry depth beyond its maximum depth.`,
    );
  }

  if (
    !isRecord(audience.nextAction) ||
    typeof audience.nextAction.label !== "string" ||
    !audience.nextAction.label.trim() ||
    typeof audience.nextAction.href !== "string" ||
    !audience.nextAction.href.startsWith("/")
  ) {
    throw new Error(
      `Audience '${owner}' requires an internal next action with a label.`,
    );
  }

  if (!Array.isArray(audience.route) || audience.route.length === 0) {
    throw new Error(`Audience '${owner}' requires at least one route step.`);
  }

  const stepIds = new Set<string>();
  for (const step of audience.route) {
    requireString(step.id, "route.id", owner);
    requireString(step.title, "route.title", owner);
    requireString(step.summary, "route.summary", owner);
    if (stepIds.has(step.id)) {
      throw new Error(`Duplicate route step '${step.id}' on '${owner}'.`);
    }
    stepIds.add(step.id);

    if (!Array.isArray(step.nodeRefs) || step.nodeRefs.length === 0) {
      throw new Error(
        `Route step '${step.id}' on '${owner}' requires node references.`,
      );
    }
    for (const reference of step.nodeRefs) {
      requireString(reference.id, "route.nodeRefs.id", owner);
    }
  }
}

function validateIntentShape(intent: IntentNode) {
  requireString(intent.prompt, "prompt", intent.id);
  requireString(intent.summary, "summary", intent.id);
  requireString(intent.useCase, "useCase", intent.id);
  requireStringArray(intent.audienceIds, "audienceIds", intent.id);
  requireStringArray(intent.related, "related", intent.id);
  if (!isDepth(intent.recommendedDepth)) {
    throw new Error(`Invalid recommended depth on intent '${intent.id}'.`);
  }
}

function validateDoorwayShape(doorway: DoorwayNode) {
  requireString(doorway.summary, "summary", doorway.id);
  requireStringArray(doorway.domainNodeIds, "domainNodeIds", doorway.id);
  requireStringArray(doorway.audienceIds, "audienceIds", doorway.id);
  requireStringArray(doorway.related, "related", doorway.id);
}

export function validateAudienceDataset(
  value: unknown,
): asserts value is AudienceDataset {
  if (!isRecord(value)) {
    throw new Error("Audience dataset must be an object.");
  }
  if (value.schemaVersion !== "boundary-first.audience.v1") {
    throw new Error("Unsupported audience schema version.");
  }
  requireString(value.title, "title", "dataset");
  requireString(value.description, "description", "dataset");

  for (const key of ["audiences", "intents", "doorways"] as const) {
    if (!Array.isArray(value[key])) {
      throw new Error(`Audience dataset field '${key}' must be an array.`);
    }
  }

  const data = value as unknown as AudienceDataset;
  const ids = new Set<string>();
  const slugsByType = new Set<string>();
  const groups = [
    ["audience", data.audiences],
    ["intent", data.intents],
    ["doorway", data.doorways],
  ] as const;

  for (const [expectedType, items] of groups) {
    for (const item of items) {
      if (!isRecord(item)) {
        throw new Error(`Every ${expectedType} node must be an object.`);
      }
      requireString(item.id, "id", expectedType);
      requireString(item.slug, "slug", item.id);
      requireString(item.title, "title", item.id);
      if (item.type !== expectedType) {
        throw new Error(
          `Routing node '${item.id}' must have type '${expectedType}'.`,
        );
      }
      if (ids.has(item.id)) {
        throw new Error(`Duplicate routing node id: ${item.id}`);
      }
      const slugKey = `${expectedType}:${item.slug}`;
      if (slugsByType.has(slugKey)) {
        throw new Error(`Duplicate ${expectedType} slug: ${item.slug}`);
      }
      ids.add(item.id);
      slugsByType.add(slugKey);
    }
  }

  data.audiences.forEach(validateAudienceShape);
  data.intents.forEach(validateIntentShape);
  data.doorways.forEach(validateDoorwayShape);

  const audiencesById = new Map(
    data.audiences.map((audience) => [audience.id, audience]),
  );
  const doorwaysById = new Map(
    data.doorways.map((doorway) => [doorway.id, doorway]),
  );

  for (const audience of data.audiences) {
    for (const doorwayId of audience.doorwayIds) {
      const doorway = doorwaysById.get(doorwayId);
      if (!doorway) {
        throw new Error(
          `Unknown doorway '${doorwayId}' on audience '${audience.id}'.`,
        );
      }
    }
    for (const relatedId of audience.related) {
      if (!ids.has(relatedId)) {
        throw new Error(
          `Unknown related route node '${relatedId}' on '${audience.id}'.`,
        );
      }
    }
  }

  for (const doorway of data.doorways) {
    for (const audienceId of doorway.audienceIds) {
      const audience = audiencesById.get(audienceId);
      if (!audience) {
        throw new Error(
          `Unknown audience '${audienceId}' on doorway '${doorway.id}'.`,
        );
      }
    }
  }

  for (const intent of data.intents) {
    for (const audienceId of intent.audienceIds) {
      if (!audiencesById.has(audienceId)) {
        throw new Error(
          `Unknown audience '${audienceId}' on intent '${intent.id}'.`,
        );
      }
    }
  }
}

export function validateAudienceRelationshipReciprocity(
  dataset: AudienceDataset,
) {
  const audiencesById = new Map(
    dataset.audiences.map((audience) => [audience.id, audience]),
  );
  const doorwaysById = new Map(
    dataset.doorways.map((doorway) => [doorway.id, doorway]),
  );

  for (const audience of dataset.audiences) {
    for (const doorwayId of audience.doorwayIds) {
      const doorway = doorwaysById.get(doorwayId);
      if (!doorway?.audienceIds.includes(audience.id)) {
        throw new Error(
          `Doorway '${doorwayId}' does not reciprocate audience '${audience.id}'.`,
        );
      }
    }
  }

  for (const doorway of dataset.doorways) {
    for (const audienceId of doorway.audienceIds) {
      const audience = audiencesById.get(audienceId);
      if (!audience?.doorwayIds.includes(doorway.id)) {
        throw new Error(
          `Audience '${audienceId}' does not reciprocate doorway '${doorway.id}'.`,
        );
      }
    }
  }
}

export function validateCanonicalAudienceReferences(
  dataset: AudienceDataset,
  canonicalIds: ReadonlySet<string>,
) {
  const references = [
    ...dataset.audiences.flatMap((audience) => [
      ...audience.recommendedNodeIds.map((id) => ({
        id,
        owner: audience.id,
      })),
      ...audience.route.flatMap((step) =>
        step.nodeRefs.map((reference) => ({
          id: reference.id,
          owner: `${audience.id}/${step.id}`,
        })),
      ),
    ]),
    ...dataset.doorways.flatMap((doorway) =>
      doorway.domainNodeIds.map((id) => ({ id, owner: doorway.id })),
    ),
  ];

  for (const reference of references) {
    if (!canonicalIds.has(reference.id)) {
      throw new Error(
        `Unknown canonical node '${reference.id}' referenced by '${reference.owner}'.`,
      );
    }
  }
}

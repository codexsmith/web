import type { AudienceDataset, Depth } from "./types";

const depths: Depth[] = ["recognize", "understand", "use", "build", "evaluate", "extend"];

export function validateAudienceDataset(value: unknown): asserts value is AudienceDataset {
  if (!value || typeof value !== "object") throw new Error("Audience dataset must be an object.");
  const data = value as Partial<AudienceDataset>;
  if (data.schemaVersion !== "boundary-first.audience.v1") throw new Error("Unsupported audience schema version.");
  for (const key of ["audiences", "intents", "doorways"] as const) {
    if (!Array.isArray(data[key])) throw new Error(`Audience dataset field '${key}' must be an array.`);
  }

  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of [...data.audiences!, ...data.intents!, ...data.doorways!]) {
    if (!item.id || !item.slug || !item.type || !item.title) throw new Error("Every routing node requires id, slug, type, and title.");
    if (ids.has(item.id)) throw new Error(`Duplicate routing node id: ${item.id}`);
    if (slugs.has(`${item.type}:${item.slug}`)) throw new Error(`Duplicate ${item.type} slug: ${item.slug}`);
    ids.add(item.id);
    slugs.add(`${item.type}:${item.slug}`);
  }

  for (const audience of data.audiences!) {
    if (!depths.includes(audience.depthRange.entry) || !depths.includes(audience.depthRange.maximum)) {
      throw new Error(`Invalid depth range on audience: ${audience.id}`);
    }
    for (const doorwayId of audience.doorwayIds) {
      if (!ids.has(doorwayId)) throw new Error(`Unknown doorway '${doorwayId}' on audience '${audience.id}'.`);
    }
  }

  for (const intent of data.intents!) {
    for (const audienceId of intent.audienceIds) {
      if (!ids.has(audienceId)) throw new Error(`Unknown audience '${audienceId}' on intent '${intent.id}'.`);
    }
  }
}

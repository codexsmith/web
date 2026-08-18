import type { AudienceDataset, AudienceRouteConfig, Depth, RouteSelection } from "./types";

const depths: Depth[] = ["recognize", "understand", "use", "build", "evaluate", "extend"];

export function resolveSelection(
  dataset: AudienceDataset,
  path: string[] = [],
  requestedDepth?: string,
  config?: Pick<AudienceRouteConfig, "defaultDepth">,
): RouteSelection {
  const [intentSlug, audienceSlug, doorwaySlug] = path;
  return {
    intent: dataset.intents.find((item) => item.slug === intentSlug),
    audience: dataset.audiences.find((item) => item.slug === audienceSlug),
    doorway: dataset.doorways.find((item) => item.slug === doorwaySlug),
    depth: depths.includes(requestedDepth as Depth) ? (requestedDepth as Depth) : config?.defaultDepth ?? "recognize",
  };
}

export function compatibleAudiences(dataset: AudienceDataset, intentId?: string) {
  const intent = dataset.intents.find((item) => item.id === intentId);
  if (!intent) return dataset.audiences;
  const allowed = new Set(intent.audienceIds);
  return dataset.audiences.filter((item) => allowed.has(item.id));
}

export function compatibleDoorways(dataset: AudienceDataset, audienceId?: string) {
  const audience = dataset.audiences.find((item) => item.id === audienceId);
  if (!audience) return dataset.doorways;
  const allowed = new Set(audience.doorwayIds);
  return dataset.doorways.filter((item) => allowed.has(item.id));
}

export function routeHref(config: Pick<AudienceRouteConfig, "basePath">, parts: Array<string | undefined>, depth?: Depth) {
  const clean = parts.filter(Boolean).join("/");
  const path = clean ? `${config.basePath}/${clean}` : config.basePath;
  return depth ? `${path}?depth=${depth}` : path;
}

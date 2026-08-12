import { AUDIENCE_DEPTHS } from "./schema";
import type {
  AudienceDataset,
  AudienceNode,
  AudienceRouteConfig,
  Depth,
  RouteSelection,
} from "./types";

function isDepth(value: string | undefined): value is Depth {
  return AUDIENCE_DEPTHS.includes(value as Depth);
}

export function depthsForAudience(audience: AudienceNode): Depth[] {
  const entryIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.entry);
  const maximumIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.maximum);
  return AUDIENCE_DEPTHS.slice(entryIndex, maximumIndex + 1);
}

export function clampDepthToAudience(
  depth: Depth,
  audience: AudienceNode,
): Depth {
  const allowed = depthsForAudience(audience);
  const requestedIndex = AUDIENCE_DEPTHS.indexOf(depth);
  const entryIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.entry);
  const maximumIndex = AUDIENCE_DEPTHS.indexOf(audience.depthRange.maximum);

  if (requestedIndex < entryIndex) return audience.depthRange.entry;
  if (requestedIndex > maximumIndex) return audience.depthRange.maximum;
  return allowed.includes(depth) ? depth : audience.depthRange.entry;
}

export function resolveSelection(
  dataset: AudienceDataset,
  path: string[] = [],
  requestedDepth?: string,
  config?: Pick<AudienceRouteConfig, "defaultDepth">,
): RouteSelection {
  const [intentSlug, audienceSlug, doorwaySlug] = path;
  const intent = dataset.intents.find((item) => item.slug === intentSlug);
  const audience = dataset.audiences.find(
    (item) => item.slug === audienceSlug,
  );
  const doorway = dataset.doorways.find(
    (item) => item.slug === doorwaySlug,
  );
  const requested = isDepth(requestedDepth)
    ? requestedDepth
    : intent?.recommendedDepth ?? config?.defaultDepth ?? "recognize";

  return {
    intent,
    audience,
    doorway,
    depth: audience ? clampDepthToAudience(requested, audience) : requested,
  };
}

export function compatibleAudiences(
  dataset: AudienceDataset,
  intentId?: string,
) {
  const intent = dataset.intents.find((item) => item.id === intentId);
  if (!intent) return dataset.audiences;
  const allowed = new Set(intent.audienceIds);
  return dataset.audiences.filter((item) => allowed.has(item.id));
}

export function compatibleDoorways(
  dataset: AudienceDataset,
  audienceId?: string,
) {
  const audience = dataset.audiences.find(
    (item) => item.id === audienceId,
  );
  if (!audience) return dataset.doorways;
  const allowed = new Set(audience.doorwayIds);
  return dataset.doorways.filter((doorway) => allowed.has(doorway.id));
}

export function isSelectionCompatible(
  dataset: AudienceDataset,
  selection: RouteSelection,
  pathLength: number,
): boolean {
  if (pathLength > 3) return false;
  if (pathLength >= 1 && !selection.intent) return false;
  if (pathLength >= 2 && !selection.audience) return false;
  if (pathLength >= 3 && !selection.doorway) return false;

  if (
    selection.intent &&
    selection.audience &&
    !selection.intent.audienceIds.includes(selection.audience.id)
  ) {
    return false;
  }
  if (
    selection.audience &&
    selection.doorway &&
    (!selection.audience.doorwayIds.includes(selection.doorway.id) ||
      !selection.doorway.audienceIds.includes(selection.audience.id))
  ) {
    return false;
  }
  return true;
}

export function routeHref(
  config: Pick<AudienceRouteConfig, "basePath">,
  parts: Array<string | undefined>,
  depth?: Depth,
) {
  const clean = parts
    .filter((part): part is string => Boolean(part))
    .map(encodeURIComponent)
    .join("/");
  const path = clean ? `${config.basePath}/${clean}` : config.basePath;
  return depth ? `${path}?depth=${depth}` : path;
}

export function audienceStaticParams(dataset: AudienceDataset) {
  const params: Array<{ path?: string[] }> = [{ path: undefined }];
  for (const intent of dataset.intents) {
    params.push({ path: [intent.slug] });
    for (const audience of compatibleAudiences(dataset, intent.id)) {
      params.push({ path: [intent.slug, audience.slug] });
      for (const doorway of compatibleDoorways(dataset, audience.id)) {
        params.push({
          path: [intent.slug, audience.slug, doorway.slug],
        });
      }
    }
  }
  return params;
}

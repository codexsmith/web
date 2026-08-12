import type { MapProjection } from "./map-semantics";

export type MapMode = "atlas" | "focus" | "halo";

export const ATLAS_OVERVIEW_NODE_ID = "atlas-overview";

export type MapState = {
  mode: MapMode;
  nodeId: string;
  projection: MapProjection;
  relationId: string | null;
};

const projections: MapProjection[] = [
  "domains",
  "work",
  "evidence",
  "lineage",
  "governance",
  "collaboration",
];

function isProjectionId(value: string | null): value is MapProjection {
  return projections.includes(value as MapProjection);
}

function isMapMode(value: string | null): value is MapMode {
  return value === "atlas" || value === "focus" || value === "halo";
}

function relationForMode(
  mode: MapMode,
  nodeId: string,
  relationId: string | null,
): string | null {
  if (mode === "halo") return relationId;
  if (mode === "focus" && relationId?.startsWith(`facet-${nodeId}-`)) {
    return relationId;
  }
  return null;
}

export function parseMapState(
  searchParams: URLSearchParams,
  isValidNode: (id: string) => boolean,
): MapState {
  const requestedProjection = searchParams.get("view");
  const requestedNode = searchParams.get("node");
  const requestedMode = searchParams.get("mode");
  const requestedRelation = searchParams.get("relation");

  const mode = isMapMode(requestedMode) ? requestedMode : "atlas";
  const parsedProjection = isProjectionId(requestedProjection)
    ? requestedProjection
    : "domains";

  const nodeId =
    requestedNode === ATLAS_OVERVIEW_NODE_ID ||
    (requestedNode && isValidNode(requestedNode))
      ? requestedNode
      : ATLAS_OVERVIEW_NODE_ID;

  const projection = mode === "focus" ? "domains" : parsedProjection;

  const relationId = relationForMode(mode, nodeId, requestedRelation);

  return {
    mode,
    nodeId,
    projection,
    relationId,
  };
}

export function serializeMapState(
  state: MapState,
  currentHref: string,
): string {
  const url = new URL(currentHref, "http://localhost");
  const projection = state.mode === "focus" ? "domains" : state.projection;
  const relationId = relationForMode(
    state.mode,
    state.nodeId,
    state.relationId,
  );

  url.searchParams.set("view", projection);
  url.searchParams.set("mode", state.mode);

  if (state.nodeId && state.nodeId !== ATLAS_OVERVIEW_NODE_ID) {
    url.searchParams.set("node", state.nodeId);
  } else {
    url.searchParams.delete("node");
  }

  if (relationId) {
    url.searchParams.set("relation", relationId);
  } else {
    url.searchParams.delete("relation");
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

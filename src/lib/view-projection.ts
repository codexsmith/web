export const projectionModes = ["world", "record", "evidence", "gestalt"] as const;

export type ProjectionMode = (typeof projectionModes)[number];

export const projectionLabels: Record<ProjectionMode, string> = {
  world: "World",
  record: "Record",
  evidence: "Evidence",
  gestalt: "Process",
};

export const projectionDescriptions: Record<ProjectionMode, string> = {
  world: "Primary content, spatial context, containment, and ordinary traversal",
  record: "Read the focal object's exhaustive public record",
  evidence: "Standing, provenance, evidence, lineage, and typed relations",
  gestalt: "Place the focal object inside the Boundary First operating process",
};

export function isProjectionMode(value: string | undefined): value is ProjectionMode {
  return projectionModes.includes(value as ProjectionMode);
}

export function parseProjection(value: string | string[] | undefined): ProjectionMode | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (candidate === "process" || candidate === "timeline") return "gestalt";
  return isProjectionMode(candidate) ? candidate : undefined;
}

/**
 * World is the ordinary public surface for every content object. It carries enough
 * inline content and interaction to understand and traverse the subject without first
 * selecting a specialized projection. Publicly, Record, Evidence, and Process deepen
 * that state. Internal compatibility note: Record, Evidence, and Gestalt deepen that state
 * in the historical code vocabulary; `gestalt` remains the compatibility key while the
 * Boundary First Labs root presents the same projection as Timeline.
 */
export function defaultProjectionForNode(nodeId: string): ProjectionMode {
  void nodeId;
  return "world";
}

import { hasEvidenceProjection } from "@/lib/evidence-content";

export const projectionModes = ["world", "evidence", "gestalt"] as const;

export type ProjectionMode = (typeof projectionModes)[number];

export const projectionLabels: Record<ProjectionMode, string> = {
  world: "World",
  evidence: "Evidence",
  gestalt: "Process",
};

export const projectionPurposes: Record<ProjectionMode, string> = {
  world: "Content · context",
  evidence: "Standing · sources",
  gestalt: "Operating sequence",
};

export const projectionDescriptions: Record<ProjectionMode, string> = {
  world: "Primary content, spatial context, containment, and ordinary traversal",
  evidence: "Standing, provenance, evidence, lineage, and typed relations",
  gestalt: "Place the focal object inside the Boundary First operating process",
};

export function isProjectionMode(value: string | undefined): value is ProjectionMode {
  return projectionModes.includes(value as ProjectionMode);
}

export function parseProjection(value: string | string[] | undefined): ProjectionMode | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (candidate === "record") return "world";
  if (candidate === "process" || candidate === "timeline") return "gestalt";
  return isProjectionMode(candidate) ? candidate : undefined;
}

export function projectionModesForNode(nodeId: string): ProjectionMode[] {
  return hasEvidenceProjection(nodeId)
    ? [...projectionModes]
    : projectionModes.filter((mode) => mode !== "evidence");
}

export function normalizeProjectionForNode(nodeId: string, projection: ProjectionMode): ProjectionMode {
  return projection === "evidence" && !hasEvidenceProjection(nodeId) ? "world" : projection;
}

/**
 * World is the ordinary public surface for every content object. It carries enough
 * inline content and interaction to understand and traverse the subject without first
 * selecting a specialized projection. Evidence and Process deepen that state without
 * repeating its narrative content. `record` remains a URL compatibility alias for World;
 * `gestalt` remains the compatibility key while the Boundary First Labs root presents the
 * same projection as Timeline.
 */
export function defaultProjectionForNode(nodeId: string): ProjectionMode {
  void nodeId;
  return "world";
}

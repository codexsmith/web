import { getChildren } from "@/lib/content";

export const projectionModes = ["world", "record", "evidence", "gestalt"] as const;

export type ProjectionMode = (typeof projectionModes)[number];

export const projectionLabels: Record<ProjectionMode, string> = {
  world: "World",
  record: "Record",
  evidence: "Evidence",
  gestalt: "Gestalt",
};

export const projectionDescriptions: Record<ProjectionMode, string> = {
  world: "Spatial context, containment, and relations",
  record: "Read the focal object's public record",
  evidence: "Standing, provenance, evidence, lineage, and typed relations",
  gestalt: "Place the focal object inside the Boundary First operating loop",
};

export function isProjectionMode(value: string | undefined): value is ProjectionMode {
  return projectionModes.includes(value as ProjectionMode);
}

export function parseProjection(value: string | string[] | undefined): ProjectionMode | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return isProjectionMode(candidate) ? candidate : undefined;
}

export function defaultProjectionForNode(nodeId: string): ProjectionMode {
  return getChildren(nodeId).length > 0 ? "world" : "record";
}

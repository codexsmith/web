import {
  ATLAS_EVIDENCE_HREF,
  RELATION_INDEX_HREF,
} from "./site-navigation";

export const RELATION_PROJECTIONS = [
  "work",
  "evidence",
  "lineage",
  "governance",
  "collaboration",
] as const;

export type RelationProjection = (typeof RELATION_PROJECTIONS)[number];

export type RelationLensSurface = "relations" | "evidence";

export type ConventionalRelationRecord = {
  id: string;
  label: string;
  summary?: string;
  relationType?: string;
  authority?: string;
  evidence?: string;
  evidenceStatus?: string;
  status: string;
  closure: string;
  provenance: string;
  recordHref: string;
  actionLabel?: string;
};

export type RelationSourceNode = {
  id: string;
  label: string;
  short?: string;
  projectionRecords?: Partial<
    Record<RelationProjection, ConventionalRelationRecord[]>
  >;
};

export type ConventionalRelationGroup = {
  id: string;
  label: string;
  short?: string;
  records: ConventionalRelationRecord[];
};

export function conventionalRelationGroups(
  nodes: RelationSourceNode[],
  projection: RelationProjection,
): ConventionalRelationGroup[] {
  return nodes
    .map((node) => ({
      id: node.id,
      label: node.label,
      short: node.short,
      records: node.projectionRecords?.[projection] ?? [],
    }))
    .filter((group) => group.records.length > 0);
}

export function relationProjectionCount(
  nodes: RelationSourceNode[],
  projection: RelationProjection,
): number {
  return conventionalRelationGroups(nodes, projection).reduce(
    (total, group) => total + group.records.length,
    0,
  );
}

export function relationLensHref(
  projection: RelationProjection,
  surface: RelationLensSurface,
): string {
  if (surface === "evidence" && projection === "work") {
    return "#work";
  }
  if (surface === "relations") {
    return `#${projection}`;
  }
  return `${RELATION_INDEX_HREF}#${projection}`;
}

export function atlasEvidenceWorkHref(): string {
  return `${ATLAS_EVIDENCE_HREF}#work`;
}

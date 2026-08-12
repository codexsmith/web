export type DomainRecordNavigationItem = {
  id: string;
  label: string;
};

export const DOMAIN_RECORD_FIELD_DEFINITIONS = [
  { field: "claims", id: "claims", label: "Claims" },
  { field: "institution", id: "institution", label: "Institution" },
  { field: "positions", id: "positions", label: "Positions" },
  { field: "documents", id: "evidence-sources", label: "Evidence sources" },
] as const;

export function buildDomainRecordNavigation({
  hasArchitectureStage,
  hasRelationships,
  hasTakeaways,
  recordFields,
}: {
  hasArchitectureStage: boolean;
  hasRelationships: boolean;
  hasTakeaways: boolean;
  recordFields: DomainRecordNavigationItem[];
}): DomainRecordNavigationItem[] {
  return [
    { id: "overview", label: "Overview" },
    ...(hasTakeaways ? [{ id: "takeaways", label: "Takeaways" }] : []),
    ...(hasRelationships
      ? [{ id: "relationships", label: "Relations" }]
      : []),
    ...(hasArchitectureStage
      ? [{ id: "placement", label: "Placement" }]
      : []),
    ...recordFields,
  ];
}

export function resolveDomainRecordNavigationId(
  targetId: string,
  ancestorIds: string[],
  itemIds: string[],
) {
  const availableIds = new Set(itemIds);

  if (availableIds.has(targetId)) return targetId;

  return ancestorIds.find((id) => availableIds.has(id)) ?? itemIds[0] ?? "";
}

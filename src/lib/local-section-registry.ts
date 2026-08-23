export type LocalSectionDefinition = {
  key: string;
  id: string;
  label: string;
  ariaLabel?: string;
};

const localSectionsByNodeId: Record<string, LocalSectionDefinition[]> = {
  "public-interest": [
    {
      key: "overview",
      id: "public-interest-overview",
      label: "Overview",
      ariaLabel: "Go to Public Interest overview",
    },
    {
      key: "augusta",
      id: "public-interest-augusta",
      label: "Augusta Civic Infrastructure",
      ariaLabel: "Go to Augusta Civic Infrastructure",
    },
    {
      key: "context",
      id: "public-interest-context",
      label: "Supporting context",
      ariaLabel: "Go to Public Interest supporting context",
    },
  ],
};

export function getLocalSections(nodeId: string): LocalSectionDefinition[] {
  return localSectionsByNodeId[nodeId] ?? [];
}

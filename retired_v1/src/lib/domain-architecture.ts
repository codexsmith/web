export type ArchitectureStage = {
  id: string;
  title: string;
  description: string;
};

export type ArchitectureNode = {
  id: string;
  label?: string;
  title?: string;
  short?: string;
  role?: string;
  facets?: string[];
  architectureStage?: string;
  architectureOrder?: number;
};

export const DOMAIN_ARCHITECTURE_STAGES: ArchitectureStage[] = [
  {
    id: "foundations",
    title: "Foundations",
    description:
      "The formal object, theoretical architecture, and operational facets.",
  },
  {
    id: "processes",
    title: "Processes & formalization",
    description:
      "How the foundations are made explicit, examined, and put to work.",
  },
  {
    id: "programs",
    title: "Programs & practice",
    description:
      "Research lanes and professional practices that develop and test the method.",
  },
  {
    id: "applications",
    title: "Applications & public use",
    description:
      "Where the work meets institutions, infrastructure, culture, and public consequence.",
  },
  {
    id: "evidence",
    title: "Evidence",
    description:
      "How work earns standing, remains traceable, and retains a path to repair.",
  },
];

export function architectureStageFor(
  stageId: string | undefined,
): ArchitectureStage | null {
  if (!stageId) return null;
  return (
    DOMAIN_ARCHITECTURE_STAGES.find((stage) => stage.id === stageId) ?? null
  );
}

export function isArchitectureStageId(
  stageId: string | null | undefined,
): boolean {
  return DOMAIN_ARCHITECTURE_STAGES.some((stage) => stage.id === stageId);
}

export function nodesInArchitectureStage<T extends ArchitectureNode>(
  nodes: T[],
  stageId: string,
): T[] {
  return nodes
    .filter((node) => node.architectureStage === stageId)
    .sort(
      (a, b) =>
        (a.architectureOrder ?? Number.MAX_SAFE_INTEGER) -
      (b.architectureOrder ?? Number.MAX_SAFE_INTEGER),
    );
}

function normalizedSearchText(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesArchitectureQuery(
  node: ArchitectureNode,
  query: string,
): boolean {
  const normalizedQuery = normalizedSearchText(query);
  if (!normalizedQuery) return true;

  const searchableText = [
    node.label,
    node.title,
    node.short,
    node.role,
    ...(node.facets ?? []),
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLocaleLowerCase();

  return normalizedQuery
    .split(/\s+/)
    .every((term) => searchableText.includes(term));
}

export function filterArchitectureNodes<T extends ArchitectureNode>(
  nodes: T[],
  options: {
    query?: string;
    stageId?: string | null;
  },
): T[] {
  const stageId = isArchitectureStageId(options.stageId)
    ? options.stageId
    : null;

  return nodes.filter(
    (node) =>
      (!stageId || node.architectureStage === stageId) &&
      matchesArchitectureQuery(node, options.query ?? ""),
  );
}

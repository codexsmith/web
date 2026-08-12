import type { GraphNode } from "@/app/context/GraphContext";

export type MapProjection =
  | "domains"
  | "work"
  | "evidence"
  | "lineage"
  | "governance"
  | "collaboration";

export type EntityKind =
  | "institution"
  | "domain"
  | "theory"
  | "facet"
  | "program"
  | "project"
  | "product"
  | "artifact"
  | "service"
  | "testbed"
  | "policy"
  | "evidence"
  | "lineage"
  | "collaborator";

export type DomainPalette = {
  family: string;
  solid: string;
  soft: string;
  ink: string;
};

export const layerPalettes: Record<string, DomainPalette> = {
  center: {
    family: "Institution",
    solid: "#0B1F3A",
    soft: "#DCE3EC",
    ink: "#0B1F3A",
  },
  theory: {
    family: "Theory",
    solid: "#315F9B",
    soft: "#DDE9F5",
    ink: "#173858",
  },
  "public-spine": {
    family: "Public spine",
    solid: "#6A4D91",
    soft: "#E9E0F2",
    ink: "#402C5C",
  },
  research: {
    family: "Research",
    solid: "#14777B",
    soft: "#D8ECEA",
    ink: "#0B4B4E",
  },
  practice: {
    family: "Practice",
    solid: "#B46628",
    soft: "#F3E3D3",
    ink: "#6D3B18",
  },
  "public-policy": {
    family: "Public policy",
    solid: "#9F2D20",
    soft: "#F2DDD9",
    ink: "#681D15",
  },
  proof: {
    family: "Evidence",
    solid: "#4F7754",
    soft: "#DDE9DE",
    ink: "#2D4D31",
  },
  "public-interface": {
    family: "Public interface",
    solid: "#8A4B69",
    soft: "#EFDFE6",
    ink: "#572D42",
  },
  support: {
    family: "Operations",
    solid: "#596574",
    soft: "#E1E5E9",
    ink: "#35404B",
  },
};

export const CANONICAL_LINEAGE_NODE_IDS = [
  "formal-grammars",
  "mathematics",
  "physics",
  "computational-systems",
  "software-engineering-practice",
] as const;

const canonicalLineageNodeIds = new Set<string>(
  CANONICAL_LINEAGE_NODE_IDS,
);

export function isCanonicalLineageNode(
  node: Pick<GraphNode, "id">,
): boolean {
  return canonicalLineageNodeIds.has(node.id);
}

export const projectionLabels: Record<MapProjection, string> = {
  domains: "Domains",
  work: "Work",
  evidence: "Evidence",
  lineage: "Lineage",
  governance: "Governance",
  collaboration: "Collaboration",
};

export const entityKindLabels: Record<EntityKind, string> = {
  institution: "Institution",
  domain: "Domain",
  theory: "Theory",
  facet: "Facet",
  program: "Program",
  project: "Project",
  product: "Product",
  artifact: "Artifact",
  service: "Service",
  testbed: "Testbed",
  policy: "Policy",
  evidence: "Evidence",
  lineage: "Lineage source",
  collaborator: "Collaborator role",
};

export function paletteForLayer(layer?: string): DomainPalette {
  return layerPalettes[layer ?? ""] ?? layerPalettes.support;
}

export function paletteForNode(node?: Partial<GraphNode>): DomainPalette {
  return paletteForLayer(typeof node?.layer === "string" ? node.layer : "support");
}

export function inferEntityKind(value: unknown, fallback: EntityKind = "domain"): EntityKind {
  if (!value || typeof value !== "object") return fallback;
  const record = value as Record<string, unknown>;
  const explicitKind =
    typeof record.kind === "string" ? record.kind : "";
  if (
    Object.prototype.hasOwnProperty.call(entityKindLabels, explicitKind)
  ) {
    return explicitKind as EntityKind;
  }
  const id = typeof record.id === "string" ? record.id.toLowerCase() : "";
  const role =
    typeof record.role === "string" ? record.role.toLowerCase().trim() : "";
  const source = [
    record.role,
    record.type,
    record.class,
    record.productType,
    record.label,
    record.title,
    record.id,
  ]
    .filter((item): item is string => typeof item === "string")
    .join(" ")
    .toLowerCase();

  if (id === "identity" || role === "identity" || role === "institution") {
    return "institution";
  }
  if (/collaborator|reviewer|advisor|steward|partner|funder|rights holder/.test(source)) return "collaborator";
  if (/testbed|pilot/.test(source)) return "testbed";
  if (/product/.test(source)) return "product";
  if (/project/.test(source)) return "project";
  if (/program|research lane/.test(source)) return "program";
  if (/service|practice offering|consult/.test(source)) return "service";
  if (/artifact|document|paper|report|note|publication|release|dataset|model/.test(source)) return "artifact";
  if (/evidence|claim|result|proof|replication/.test(source)) return "evidence";
  if (/policy|principle|doctrine|governance/.test(source)) return "policy";
  if (/lineage|source|histor|tradition|neighbor/.test(source)) return "lineage";
  if (/facet/.test(source)) return "facet";
  if (/theory|formal object|formal apparatus|discipline/.test(source)) return "theory";
  return fallback;
}

export function projectionMatchesNode(
  node: GraphNode,
  projection: MapProjection,
): boolean {
  if (projection === "domains") return true;

  const searchable = [
    node.id,
    node.role,
    node.layer,
    node.label,
    node.short,
    ...Object.keys(node),
  ]
    .filter((item): item is string => typeof item === "string")
    .join(" ")
    .toLowerCase();

  if (projection === "work") {
    return /project|product|testbed|practice|engineering|software|service|forge|corpus/.test(searchable);
  }
  if (projection === "evidence") {
    return Boolean(node.claims?.length || node.documents?.length) || /evidence|proof|research|test|corpus/.test(searchable);
  }
  if (projection === "lineage") {
    return isCanonicalLineageNode(node);
  }
  if (projection === "governance") {
    return /governance|institution|law|policy|finance|infrastructure|position|criticism/.test(searchable);
  }
  return /collab|particip|product|practice|on-ramp|public-interface|institution/.test(searchable);
}

function polygonPath(points: Array<[number, number]>): string {
  return `${points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ")} Z`;
}

export function semanticShapePath(kind: EntityKind, size: number): string {
  const s = size;
  if (kind === "product" || kind === "testbed") {
    return polygonPath([
      [-s * 0.58, -s],
      [s * 0.58, -s],
      [s, 0],
      [s * 0.58, s],
      [-s * 0.58, s],
      [-s, 0],
    ]);
  }
  if (kind === "artifact" || kind === "evidence" || kind === "lineage") {
    return polygonPath([
      [0, -s],
      [s, 0],
      [0, s],
      [-s, 0],
    ]);
  }
  if (kind === "service") {
    return polygonPath([
      [-s * 0.68, -s * 0.8],
      [s, -s * 0.8],
      [s * 0.68, s * 0.8],
      [-s, s * 0.8],
    ]);
  }
  if (kind === "project" || kind === "policy") {
    return polygonPath([
      [-s, -s * 0.78],
      [s, -s * 0.78],
      [s, s * 0.78],
      [-s, s * 0.78],
    ]);
  }
  if (kind === "program") {
    const w = s;
    const h = s * 0.78;
    const r = Math.max(4, s * 0.25);
    return [
      `M ${-w + r} ${-h}`,
      `L ${w - r} ${-h}`,
      `Q ${w} ${-h} ${w} ${-h + r}`,
      `L ${w} ${h - r}`,
      `Q ${w} ${h} ${w - r} ${h}`,
      `L ${-w + r} ${h}`,
      `Q ${-w} ${h} ${-w} ${h - r}`,
      `L ${-w} ${-h + r}`,
      `Q ${-w} ${-h} ${-w + r} ${-h}`,
      "Z",
    ].join(" ");
  }

  return [
    `M 0 ${-s}`,
    `A ${s} ${s} 0 1 1 0 ${s}`,
    `A ${s} ${s} 0 1 1 0 ${-s}`,
    "Z",
  ].join(" ");
}

export function entityDashArray(kind: EntityKind): string | undefined {
  if (kind === "testbed") return "7 5";
  if (kind === "lineage") return "3 4";
  return undefined;
}

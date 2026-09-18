import type { LabObjectKind } from "../LabObjectIdentity";
import { programs } from "./research";
import { projects } from "./projects";
import { selectedPublications } from "./publications";
import { boundaryFirstChessProduct } from "./boundaryFirstChess";
import { boundaryFirstWeatherProduct } from "./boundaryFirstWeather";
import { youtubeKnowledgeExplorerProduct } from "./youtubeKnowledgeExplorer";
import { agenticScientificMethodProduct } from "./agenticScientificMethod";

export type AtlasNode = {
  atlasId: string;
  kind: LabObjectKind;
  title: string;
  href: string;
  identifier?: string;
  identifierLabel?: string;
  status: string;
  statusLabel?: string;
  secondary?: string;
  secondaryLabel?: string;
  summary: string;
};

export type AtlasEdge = {
  from: string;
  to: string;
  relation: string;
  note: string;
};

const productNodes: AtlasNode[] = [
  {
    atlasId: "product-chess",
    kind: "product",
    title: boundaryFirstChessProduct.name,
    href: "/v3/products/boundary-first-chess",
    status: boundaryFirstChessProduct.status,
    statusLabel: "PUBLIC STATUS",
    secondary: boundaryFirstChessProduct.family,
    secondaryLabel: "FAMILY",
    summary: boundaryFirstChessProduct.lead,
  },
  {
    atlasId: "product-youtube-explorer",
    kind: "product",
    title: youtubeKnowledgeExplorerProduct.name,
    href: "/v3/products/youtube-knowledge-explorer",
    status: youtubeKnowledgeExplorerProduct.status,
    statusLabel: "PUBLIC STATUS",
    secondary: youtubeKnowledgeExplorerProduct.family,
    secondaryLabel: "FAMILY",
    summary: youtubeKnowledgeExplorerProduct.lead,
  },
  {
    atlasId: "product-weather",
    kind: "product",
    title: boundaryFirstWeatherProduct.name,
    href: "/v3/products/boundary-first-weather",
    status: boundaryFirstWeatherProduct.status,
    statusLabel: "PUBLIC STATUS",
    secondary: boundaryFirstWeatherProduct.family,
    secondaryLabel: "FAMILY",
    summary: boundaryFirstWeatherProduct.lead,
  },
  {
    atlasId: "product-asm",
    kind: "product",
    title: agenticScientificMethodProduct.name,
    href: "/v3/products/agentic-scientific-method",
    status: agenticScientificMethodProduct.status,
    statusLabel: "PUBLIC STATUS",
    secondary: agenticScientificMethodProduct.family,
    secondaryLabel: "FAMILY",
    summary: agenticScientificMethodProduct.lead,
  },
];

const researchNodes: AtlasNode[] = programs.map((program) => ({
  atlasId: `research-${program.code.toLowerCase()}`,
  kind: "research",
  title: program.title,
  href: "/v3/research",
  identifier: program.code,
  identifierLabel: "CODE",
  status: program.state,
  statusLabel: "STATE",
  secondary: program.role,
  secondaryLabel: "ROLE",
  summary: program.summary,
}));

const projectNodes: AtlasNode[] = projects.map((project) => ({
  atlasId: `project-${project.code.toLowerCase()}`,
  kind: "project",
  title: project.title,
  href: project.href,
  identifier: project.code,
  identifierLabel: "CODE",
  status: project.status,
  statusLabel: "SOURCE STATUS",
  secondary: project.type,
  secondaryLabel: "TYPE",
  summary: project.result,
}));

const publicationNodes: AtlasNode[] = selectedPublications.map((publication) => ({
  atlasId: `publication-${publication.id}`,
  kind: "publication",
  title: publication.title,
  href: "/v3/publications",
  identifier: publication.id,
  identifierLabel: "RECORD",
  status: publication.recordState,
  statusLabel: "STATE",
  secondary: publication.lane,
  secondaryLabel: "LANE",
  summary: publication.abstract,
}));

export const atlasNodes = [
  ...researchNodes,
  ...productNodes,
  ...projectNodes,
  ...publicationNodes,
] as const satisfies readonly AtlasNode[];

const projectProductEdges: AtlasEdge[] = [
  {
    from: "project-chess",
    to: "product-chess",
    relation: "PROJECT CASE OF",
    note: "The Projects route treats Boundary-First Chess as a bounded project case while the immersive route presents the product object.",
  },
  {
    from: "project-projectr",
    to: "product-youtube-explorer",
    relation: "PROJECT CASE OF",
    note: "The project source retains the historical Projectr identifier while the public product surface uses YouTube Knowledge Explorer.",
  },
  {
    from: "project-weather",
    to: "product-weather",
    relation: "PROJECT CASE OF",
    note: "The Weather project case and immersive product page expose the same bounded computational research program from different public roles.",
  },
  {
    from: "project-asm",
    to: "product-asm",
    relation: "PROJECT CASE OF",
    note: "The ASM project case is the applied-project projection of the Agentic Scientific Method public research product.",
  },
];

const researchProductEdges: AtlasEdge[] = [
  {
    from: "research-asm",
    to: "product-asm",
    relation: "PUBLIC PRODUCT SURFACE",
    note: "The registered ASM research lane is projected publicly through the Agentic Scientific Method product experience without transferring scientific authority to the product UI.",
  },
];

const informationMechanicsPublicationEdges: AtlasEdge[] = selectedPublications
  .filter((publication) => publication.lane === "Information Mechanics")
  .map((publication) => ({
    from: "research-im",
    to: `publication-${publication.id}`,
    relation: "PUBLICATION RECORD",
    note: "The publication record declares Information Mechanics as its research lane.",
  }));

export const atlasEdges = [
  ...projectProductEdges,
  ...researchProductEdges,
  ...informationMechanicsPublicationEdges,
] as const satisfies readonly AtlasEdge[];

export const atlasKindOrder = [
  "research",
  "product",
  "project",
  "publication",
] as const satisfies readonly LabObjectKind[];

export const atlasKindLabels: Partial<Record<LabObjectKind, string>> = {
  research: "Research programs",
  product: "Products",
  project: "Project cases",
  publication: "Publication records",
};

export const atlasStats = {
  objects: atlasNodes.length,
  relationships: atlasEdges.length,
  kinds: atlasKindOrder.length,
} as const;

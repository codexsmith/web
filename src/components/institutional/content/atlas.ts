import type { LabObjectKind } from "../LabObjectIdentity";
import { programs } from "./research";
import { projects } from "./projects";
import { selectedPublications } from "./publications";
import { boundaryFirstChessProduct } from "./boundaryFirstChess";
import { boundaryFirstWeatherProduct } from "./boundaryFirstWeather";
import { youtubeKnowledgeExplorerProduct } from "./youtubeKnowledgeExplorer";
import { agenticScientificMethodProduct } from "./agenticScientificMethod";
import { priorExecution } from "./evidence";
import { experimentRecords } from "./experiments";
import { machineryRecords } from "./machinery";
import { claimProjection, claimRecords } from "./claims";

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
  searchTerms?: readonly string[];
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
  href: `/v3/publications#publication-${publication.id}`,
  identifier: publication.id,
  identifierLabel: "SOURCE ID",
  status: publication.recordState,
  statusLabel: publication.statusLabel,
  secondary: publication.lane,
  secondaryLabel: "LANE",
  summary: publication.orientation,
  searchTerms: [
    publication.sourceLabel,
    publication.sourceRegistryId,
    publication.sourceState,
    publication.claimCeiling,
    publication.sourceAuthority,
    publication.publicationGate ?? "",
    publication.claimRisk ?? "",
    ...(publication.dependencies ?? []).flatMap((dependency) => [
      dependency.id,
      dependency.title,
      dependency.status,
    ]),
    ...(publication.evidencePlan ?? []),
    ...(publication.feeds ?? []),
  ],
}));

const evidenceNodes: AtlasNode[] = priorExecution.map((record) => ({
  atlasId: `evidence-${record.surfaceKey}`,
  kind: "evidence",
  title: record.title,
  href: `/v3/evidence#evidence-${record.surfaceKey}`,
  status: record.status,
  statusLabel: "EVIDENCE CLASS",
  secondary: "Prior execution",
  secondaryLabel: "COHORT",
  summary: record.summary,
  searchTerms: [record.evidence, record.boundary],
}));

const experimentNodes: AtlasNode[] = experimentRecords.map((experiment) => ({
  atlasId: `experiment-${experiment.id.toLowerCase()}`,
  kind: "experiment",
  title: experiment.title,
  href: `/v3/experiments#experiment-${experiment.id.toLowerCase()}`,
  identifier: experiment.id,
  identifierLabel: "EXPERIMENT",
  status: experiment.status,
  statusLabel: "STATUS",
  secondary: experiment.resultPosture,
  secondaryLabel: "RESULT POSTURE",
  summary: experiment.questionOrPurpose,
  searchTerms: [
    experiment.program,
    experiment.resultPosture,
    experiment.carrierOrTestbed ?? "",
    experiment.control ?? "",
    experiment.method ?? "",
    experiment.acceptancePredicate ?? "",
    experiment.resultSummary ?? "",
    experiment.limitations ?? "",
    experiment.firewall,
    experiment.canonicalSource,
    ...experiment.researchLanes.flatMap((lane) => [lane.laneId, lane.label]),
  ],
}));

const apparatusNodes: AtlasNode[] = machineryRecords.map((machine) => ({
  atlasId: `machinery-${machine.machineId.toLowerCase()}`,
  kind: "apparatus",
  title: machine.name,
  href: `/v3/apparatus#machinery-${machine.machineId.toLowerCase()}`,
  identifier: machine.machineId,
  identifierLabel: "MACHINE",
  status: machine.maturity,
  statusLabel: "MATURITY",
  secondary: machine.integrationLevel,
  secondaryLabel: "INTEGRATION",
  summary: `Function roles: ${machine.functionRoles.join(", ")}.`,
  searchTerms: [
    machine.canonicalHome,
    machine.manifestStatus,
    machine.sideEffectClass,
    machine.authorityCeiling,
    machine.nextIntegrationStep,
    machine.projectionPolicy ?? "",
    ...machine.functionRoles,
    ...machine.durableProjections,
    ...machine.entrypoints.flatMap((entrypoint) => [entrypoint.kind, entrypoint.locator]),
  ],
}));

const claimNodes: AtlasNode[] = claimRecords.map((claim) => ({
  atlasId: `claim-${claim.id.toLowerCase()}`,
  kind: "claim",
  title: claim.claim,
  href: `/v3/claims#claim-${claim.id.toLowerCase()}`,
  identifier: claim.id,
  identifierLabel: "CLAIM",
  status: claim.status,
  statusLabel: "STATUS",
  secondary: claimProjection.ownerResearch.title,
  secondaryLabel: "OWNER PROGRAM",
  summary: claim.claim,
  searchTerms: [
    claimProjection.ledgerProgram,
    claimProjection.authority,
    claim.requiresValidation === true ? "validation required" : "",
    claim.noveltyClaim === false ? "novelty not claimed" : "",
    claim.source ?? "",
    ...claim.evidence,
  ],
}));

export const atlasNodes = [
  ...researchNodes,
  ...productNodes,
  ...projectNodes,
  ...publicationNodes,
  ...evidenceNodes,
  ...experimentNodes,
  ...apparatusNodes,
  ...claimNodes,
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

const experimentResearchEdges: AtlasEdge[] = experimentRecords.flatMap((experiment) =>
  experiment.researchLanes.map((lane) => ({
    from: `experiment-${experiment.id.toLowerCase()}`,
    to: lane.atlasId,
    relation: lane.role === "primary" ? "PRIMARY RESEARCH LANE" : "RELATED RESEARCH LANE",
    note: `The Lab-wide Experiment Register explicitly links ${experiment.id} to ${lane.laneId} — ${lane.label}.`,
  })),
);

const claimOwnerEdges: AtlasEdge[] = claimRecords.map((claim) => ({
  from: `claim-${claim.id.toLowerCase()}`,
  to: claimProjection.ownerResearch.atlasId,
  relation: "OWNER PROGRAM",
  note: `${claim.id} is owned by the Information Mechanics claim ledger; registrar authority remains owner-local claim/evidence state only.`,
}));

export const atlasEdges = [
  ...projectProductEdges,
  ...researchProductEdges,
  ...informationMechanicsPublicationEdges,
  ...experimentResearchEdges,
  ...claimOwnerEdges,
] as const satisfies readonly AtlasEdge[];

export const atlasKindOrder = [
  "research",
  "experiment",
  "claim",
  "apparatus",
  "product",
  "project",
  "publication",
  "evidence",
] as const satisfies readonly LabObjectKind[];

export const atlasKindLabels: Partial<Record<LabObjectKind, string>> = {
  research: "Research programs",
  experiment: "Experiment records",
  claim: "Claim records",
  apparatus: "Machinery components",
  product: "Products",
  project: "Project cases",
  publication: "Publication records",
  evidence: "Evidence records",
};

export const atlasProjection = {
  version: "0.1",
  status: "feature-frozen bounded public projection",
  closedDate: "2026-09-18",
  boundary:
    "Research, Experiments, Claims, Machinery, Products, Projects, Publications, and Evidence.",
  omissionRule:
    "Unmodeled object families and undeclared relationships remain absent until a later feature has a concrete need and a source-governed contract.",
} as const;

export const atlasStats = {
  objects: atlasNodes.length,
  relationships: atlasEdges.length,
  kinds: atlasKindOrder.length,
} as const;

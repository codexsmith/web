import portfolioData from "@/content/work_portfolio.json";
import projectIndex from "@/content/project_index.json";
import { phase12Launch } from "@/lib/phase12-launch";

export type WorkKind =
  | "service"
  | "product"
  | "product-family"
  | "project"
  | "program"
  | "artifact"
  | "practice"
  | "testbed"
  | "other";

export type WorkRecordAuthority = "governed" | "provisional";

export type WorkRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  kind: WorkKind;
  authority: WorkRecordAuthority;
  standing: string;
  operatingState?: string;
  lifecycleStage?: string;
  domain?: string;
  operation?: string;
  claimCeiling: string;
  evidenceBoundary: string;
  canonicalHref: string;
  sourceHref?: string;
  relationships: string[];
};

type PortfolioSeed = {
  sourceId: string;
  recommendedEntityType?: string;
  recommendedClass?: string;
  portfolioStanding?: string;
  recommendedLifecycleStage?: string;
  recommendedOperatingState?: string;
  sourceData?: {
    title?: string;
    productType?: string;
    description?: string;
    status?: string;
    stage?: string;
    shelf?: string;
    relationships?: string[];
  };
};

type ProjectSeed = {
  id: string;
  title: string;
  summary: string;
  projectType?: string;
  portfolioStanding?: string;
  operatingState?: string;
  projectPhase?: string;
  canonicalNodeRefs?: string[];
  producesEntityRefs?: string[];
  advancesEntityRefs?: string[];
  visibility?: string;
};

function slugify(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function kindFrom(value: string | undefined): WorkKind {
  switch (value) {
    case "service":
    case "product":
    case "product-family":
    case "project":
    case "program":
    case "artifact":
    case "practice":
    case "testbed":
      return value;
    default:
      return "other";
  }
}

const governedRecords: WorkRecord[] = [
  {
    id: phase12Launch.systemsAudit.id,
    slug: "boundary-first-systems-audit",
    title: phase12Launch.systemsAudit.title,
    summary: phase12Launch.systemsAudit.summary,
    kind: "service",
    authority: "governed",
    standing: phase12Launch.systemsAudit.status,
    operatingState: "available-on-request",
    lifecycleStage: "operational-practice",
    domain: "software-and-ai-systems",
    operation: "diagnose-understand-change",
    claimCeiling: "Professional application evidence within the declared engagement boundary.",
    evidenceBoundary: phase12Launch.systemsAudit.availabilityNote,
    canonicalHref: "/work/boundary-first-systems-audit",
    sourceHref: "/work#systems-audit",
    relationships: [phase12Launch.systemsAudit.relatedTrack.href],
  },
  {
    id: phase12Launch.boundaryFirstChess.id,
    slug: "boundary-first-chess",
    title: phase12Launch.boundaryFirstChess.title,
    summary: phase12Launch.boundaryFirstChess.summary,
    kind: "product",
    authority: "governed",
    standing: phase12Launch.boundaryFirstChess.status,
    operatingState: "available-launching",
    lifecycleStage: "bounded-public-product",
    domain: "education-and-analysis",
    operation: "learn-test-compare",
    claimCeiling: "Bounded demonstration and educational product; not evidence of universal transport.",
    evidenceBoundary: phase12Launch.boundaryFirstChess.claimBoundary,
    canonicalHref: "/work/boundary-first-chess",
    sourceHref: "/work#boundary-first-chess",
    relationships: [],
  },
  ...phase12Launch.featuredWork.map<WorkRecord>((item) => ({
    id: item.id,
    slug: slugify(item.id),
    title: item.title,
    summary: item.summary,
    kind: item.category.toLowerCase().includes("software") ? "product" : "artifact",
    authority: "governed",
    standing: item.status,
    lifecycleStage: "public-featured-work",
    claimCeiling: "Public portfolio description only; maturity remains exactly as declared by the approved launch binding.",
    evidenceBoundary: "Prominence on a public surface does not increase maturity, authority, or evidence standing.",
    canonicalHref: `/work/${slugify(item.id)}`,
    sourceHref: item.action.href,
    relationships: [],
  })),
];

const projectRecords = (projectIndex.projects as ProjectSeed[])
  .filter((project) => project.visibility !== "internal")
  .map<WorkRecord>((project) => ({
    id: project.id,
    slug: slugify(project.id.replace(/^project-/, "")),
    title: project.title,
    summary: project.summary,
    kind: "project",
    authority: "provisional",
    standing: project.portfolioStanding ?? "unadjudicated",
    operatingState: project.operatingState,
    lifecycleStage: project.projectPhase,
    domain: project.projectType,
    claimCeiling: "Seed project record. Review before canonical promotion or stronger public claim.",
    evidenceBoundary:
      "This record is projected from the seed project index; source references and project relations do not by themselves establish operational success or external verification.",
    canonicalHref: `/work/${slugify(project.id.replace(/^project-/, ""))}`,
    relationships: [
      ...(project.canonicalNodeRefs ?? []),
      ...(project.producesEntityRefs ?? []),
      ...(project.advancesEntityRefs ?? []),
    ],
  }));

const portfolioRecords = (portfolioData.items as PortfolioSeed[]).map<WorkRecord>((item) => ({
  id: item.sourceId,
  slug: slugify(item.sourceId),
  title: item.sourceData?.title ?? item.sourceId,
  summary: item.sourceData?.description ?? "Portfolio record awaiting fuller public projection.",
  kind: kindFrom(item.recommendedEntityType),
  authority: "provisional",
  standing: item.portfolioStanding ?? item.sourceData?.status ?? "unadjudicated",
  operatingState: item.recommendedOperatingState,
  lifecycleStage: item.recommendedLifecycleStage ?? item.sourceData?.stage,
  domain: item.recommendedClass ?? item.sourceData?.shelf,
  claimCeiling:
    "Migration-seed portfolio description. Classification requires human adjudication before canonical promotion.",
  evidenceBoundary:
    "The source payload is preserved non-destructively. Recommended entity type, lifecycle, and public standing remain migration recommendations rather than adoption records.",
  canonicalHref: `/work/${slugify(item.sourceId)}`,
  relationships: item.sourceData?.relationships ?? [],
}));

const bySlug = new Map<string, WorkRecord>();
for (const record of [...portfolioRecords, ...projectRecords, ...governedRecords]) {
  const existing = bySlug.get(record.slug);
  if (!existing || record.authority === "governed") bySlug.set(record.slug, record);
}

export const workRecords = [...bySlug.values()].sort((a, b) =>
  a.title.localeCompare(b.title),
);

export function getWorkRecord(slug: string): WorkRecord | undefined {
  return bySlug.get(slug);
}

export function getWorkKinds(): WorkKind[] {
  return [...new Set(workRecords.map((record) => record.kind))].sort();
}

export const capabilityPromotionStages = [
  {
    id: "artifact",
    label: "Artifact",
    question: "Does a durable record, implementation, analysis, or result exist?",
  },
  {
    id: "project",
    label: "Project",
    question: "Was the work pursued as a bounded effort with an objective and lifecycle?",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    question: "Is there an inspectable body of related work rather than a single isolated example?",
  },
  {
    id: "capability",
    label: "Capability",
    question: "Does the record support a bounded claim that BFL can perform this class of work again?",
  },
  {
    id: "program",
    label: "Program",
    question: "Are method, ownership, evidence, lifecycle, outputs, failure criteria, and governance sufficient for repeatable institutional action?",
  },
] as const;

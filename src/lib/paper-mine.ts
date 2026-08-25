import meta from "@/content/paper-mine/meta.json";
import summaryMeta from "@/content/paper-mine/summary-meta.json";
import summaryBoundaryNative1 from "@/content/paper-mine/summary-boundary-native-1.json";
import summaryBoundaryNative2 from "@/content/paper-mine/summary-boundary-native-2.json";
import summaryBoundaryNative3 from "@/content/paper-mine/summary-boundary-native-3.json";
import summaryComputerScience1 from "@/content/paper-mine/summary-computer-science-1.json";
import summaryComputerScience2 from "@/content/paper-mine/summary-computer-science-2.json";
import summaryComputerScience3 from "@/content/paper-mine/summary-computer-science-3.json";
import summaryCrossDomain1 from "@/content/paper-mine/summary-cross-domain-1.json";
import summaryCrossDomain2 from "@/content/paper-mine/summary-cross-domain-2.json";
import summaryMathematics1 from "@/content/paper-mine/summary-mathematics-1.json";
import summaryMathematics2 from "@/content/paper-mine/summary-mathematics-2.json";
import summaryOther1 from "@/content/paper-mine/summary-other-1.json";
import summaryPhilosophyOfScience1 from "@/content/paper-mine/summary-philosophy-of-science-1.json";
import summaryPhysics1 from "@/content/paper-mine/summary-physics-1.json";
import summaryPhysics2 from "@/content/paper-mine/summary-physics-2.json";
import summarySocialScience1 from "@/content/paper-mine/summary-social-science-1.json";
import summarySocialScience2 from "@/content/paper-mine/summary-social-science-2.json";
import controlledComputerScience from "@/content/paper-mine/controlled-computer-science.json";
import controlledMathematics from "@/content/paper-mine/controlled-mathematics.json";
import controlledPhysics from "@/content/paper-mine/controlled-physics.json";
import controlledCrossDomain from "@/content/paper-mine/controlled-cross-domain.json";
import controlledBoundaryNative1 from "@/content/paper-mine/controlled-boundary-native-1.json";
import controlledBoundaryNative2 from "@/content/paper-mine/controlled-boundary-native-2.json";
import minedPhilosophy from "@/content/paper-mine/mined-philosophy.json";
import minedSocial from "@/content/paper-mine/mined-social.json";
import minedOther from "@/content/paper-mine/mined-other.json";
import minedComputational from "@/content/paper-mine/mined-computational.json";

export type PaperMineRecordClass = "controlled_publication" | "mined_candidate";
export type PaperMineStage = "A" | "B" | "C" | "discovery";
export type PaperMineAbstractStatus =
  | "source_reading_priority"
  | "catalog_summary_complete_source_abstract_pending";
export type PaperMineSummaryKind = "controlled_catalog_summary" | "mined_candidate_summary";
export type PaperMineSummaryQuality = "structured_source_metadata";

export type PaperMineFrontierItem = {
  rank: number;
  candidate_id: string;
  source_candidate_id: string;
  paperization_state: string;
  question: string;
  baselines: string[];
  measures: string[];
  failure_outcomes: string[];
  claim_ceiling: string;
  local_artifacts: string[];
};

type PaperMinePaperCore = {
  id: string;
  title: string;
  record_class: PaperMineRecordClass;
  origins: string[];
  discipline: string;
  field_group: string;
  domain: string;
  lane: string | null;
  stage: PaperMineStage;
  readiness_hint: number;
  recommended_disposition: string;
  artifact_state: string;
  claim_ceiling: string;
  prior_art_requirement: string;
  evidence_requirement: string;
  risk: string | null;
  control_rank: number | null;
  program: string | null;
  source_paths: string[];
  aliases: string[];
};

export type PaperMinePaper = PaperMinePaperCore & {
  summary: string;
  summary_kind: PaperMineSummaryKind;
  summary_quality: PaperMineSummaryQuality;
  summary_basis: string[];
  abstract_status: PaperMineAbstractStatus;
};

export type PaperMineSummary = {
  raw_source_record_count: number;
  canonical_paper_count: number;
  controlled_publication_count: number;
  mined_candidate_count: number;
  frontier_count: number;
  alias_mapping_count: number;
  excluded_record_count: number;
  relation_count: number;
  counts_by_origin: Record<string, number>;
  counts_by_discipline: Record<string, number>;
  counts_by_stage: Record<string, number>;
  counts_by_record_class: Record<string, number>;
};

export type PaperMineSummaryCatalogMeta = {
  generated_on: string;
  lab_merge_revision: string;
  source_projection_sha256: string;
  source_summary_sha256: string;
  paper_count: number;
  source_reading_priority_count: number;
  method: string;
  public_projection_note: string;
  abstract_equivalence: boolean;
};

type PaperMineSummaryContentRecord = {
  paper_id: string;
  title: string;
  summary: string;
  summary_basis: string[];
  abstract_status: PaperMineAbstractStatus;
};

export type PaperMineSnapshot = {
  schema_version: string;
  generated_on: string;
  source_revision: string | null;
  source_content_sha256: string;
  authority: {
    scope: string;
    publication_promotion: boolean;
    scientific_authority: boolean;
    queue_insertion: boolean;
    human_gate_required: boolean;
    negative_results_are_valid: boolean;
    private_lab_remains_authoritative: boolean;
  };
  summary: PaperMineSummary;
  summary_catalog: PaperMineSummaryCatalogMeta;
  frontier: PaperMineFrontierItem[];
  aliases: Array<{
    source_id: string;
    canonical_id: string;
    relation: string;
    confidence: string;
    reason: string;
  }>;
  excluded_records: Array<{
    source_id: string;
    title: string;
    origin: string;
    reason: string;
    related_controlled_ids: string[];
  }>;
  papers: PaperMinePaper[];
};

type CompactPaper = Omit<PaperMinePaperCore, "record_class" | "origins" | "source_paths" | "aliases" | "lane"> & {
  lane?: string | null;
  origins?: string[];
  source_paths?: string[];
  extra_source_paths?: string[];
  aliases?: string[];
};

const CONTROLLED_PROVENANCE = "organized_library_curated/01_Daily_Operations/publication_graph/PUBLICATION_GRAPH.json";

function hydrateControlled(paper: CompactPaper): PaperMinePaperCore {
  return {
    ...paper,
    record_class: "controlled_publication",
    origins: paper.origins ?? ["publication_graph"],
    lane: paper.lane ?? null,
    source_paths: [CONTROLLED_PROVENANCE, ...(paper.extra_source_paths ?? [])],
    aliases: paper.aliases ?? [],
  };
}

function hydrateMined(paper: CompactPaper): PaperMinePaperCore {
  return {
    ...paper,
    record_class: "mined_candidate",
    origins: paper.origins ?? [],
    lane: paper.lane ?? null,
    source_paths: paper.source_paths ?? [],
    aliases: paper.aliases ?? [],
  };
}

const controlled = [
  ...(controlledComputerScience as CompactPaper[]),
  ...(controlledMathematics as CompactPaper[]),
  ...(controlledPhysics as CompactPaper[]),
  ...(controlledCrossDomain as CompactPaper[]),
  ...(controlledBoundaryNative1 as CompactPaper[]),
  ...(controlledBoundaryNative2 as CompactPaper[]),
].map(hydrateControlled);

const mined = [
  ...(minedPhilosophy as CompactPaper[]),
  ...(minedSocial as CompactPaper[]),
  ...(minedOther as CompactPaper[]),
  ...(minedComputational as CompactPaper[]),
].map(hydrateMined);

const paperCores = [...controlled, ...mined];
const labSummaries = [
  ...(summaryBoundaryNative1 as PaperMineSummaryContentRecord[]),
  ...(summaryBoundaryNative2 as PaperMineSummaryContentRecord[]),
  ...(summaryBoundaryNative3 as PaperMineSummaryContentRecord[]),
  ...(summaryComputerScience1 as PaperMineSummaryContentRecord[]),
  ...(summaryComputerScience2 as PaperMineSummaryContentRecord[]),
  ...(summaryComputerScience3 as PaperMineSummaryContentRecord[]),
  ...(summaryCrossDomain1 as PaperMineSummaryContentRecord[]),
  ...(summaryCrossDomain2 as PaperMineSummaryContentRecord[]),
  ...(summaryMathematics1 as PaperMineSummaryContentRecord[]),
  ...(summaryMathematics2 as PaperMineSummaryContentRecord[]),
  ...(summaryOther1 as PaperMineSummaryContentRecord[]),
  ...(summaryPhilosophyOfScience1 as PaperMineSummaryContentRecord[]),
  ...(summaryPhysics1 as PaperMineSummaryContentRecord[]),
  ...(summaryPhysics2 as PaperMineSummaryContentRecord[]),
  ...(summarySocialScience1 as PaperMineSummaryContentRecord[]),
  ...(summarySocialScience2 as PaperMineSummaryContentRecord[]),
];
const summaryById = new Map(labSummaries.map((summary) => [summary.paper_id, summary]));

if (summaryById.size !== labSummaries.length) {
  throw new Error(
    `Paper Mine summary catalog contains duplicate IDs: ${labSummaries.length} records; ${summaryById.size} unique`,
  );
}

const missingSummaryIds = paperCores.filter((paper) => !summaryById.has(paper.id)).map((paper) => paper.id);
const paperIds = new Set(paperCores.map((paper) => paper.id));
const orphanSummaryIds = labSummaries
  .filter((summary) => !paperIds.has(summary.paper_id))
  .map((summary) => summary.paper_id);

if (missingSummaryIds.length || orphanSummaryIds.length) {
  throw new Error(
    `Paper Mine summary identity mismatch: missing [${missingSummaryIds.join(", ")}]; orphaned [${orphanSummaryIds.join(", ")}]`,
  );
}

const papers = paperCores.map((paper): PaperMinePaper => {
  const labSummary = summaryById.get(paper.id);
  if (!labSummary) throw new Error(`Missing Paper Mine summary for ${paper.id}`);
  if (labSummary.title !== paper.title) {
    throw new Error(
      `Paper Mine summary title mismatch for ${paper.id}: projection “${paper.title}”; summary “${labSummary.title}”`,
    );
  }
  if (!labSummary.summary.trim()) throw new Error(`Paper Mine summary is empty for ${paper.id}`);

  return {
    ...paper,
    summary: labSummary.summary,
    summary_kind:
      paper.record_class === "controlled_publication" ? "controlled_catalog_summary" : "mined_candidate_summary",
    summary_quality: "structured_source_metadata",
    summary_basis: labSummary.summary_basis,
    abstract_status: labSummary.abstract_status,
  };
});

export const paperMineSnapshot: PaperMineSnapshot = {
  ...(meta as Omit<PaperMineSnapshot, "papers" | "summary_catalog">),
  summary_catalog: summaryMeta as PaperMineSummaryCatalogMeta,
  papers,
};

if (paperMineSnapshot.papers.length !== paperMineSnapshot.summary.canonical_paper_count) {
  throw new Error(
    `Paper Mine projection count mismatch: ${paperMineSnapshot.papers.length} records loaded; ${paperMineSnapshot.summary.canonical_paper_count} declared`,
  );
}

if (paperMineSnapshot.summary_catalog.paper_count !== paperMineSnapshot.papers.length) {
  throw new Error(
    `Paper Mine summary coverage mismatch: ${paperMineSnapshot.summary_catalog.paper_count} summaries declared; ${paperMineSnapshot.papers.length} papers loaded`,
  );
}

const sourceReadingPriorityCount = paperMineSnapshot.papers.filter(
  (paper) => paper.abstract_status === "source_reading_priority",
).length;

if (sourceReadingPriorityCount !== paperMineSnapshot.summary_catalog.source_reading_priority_count) {
  throw new Error(
    `Paper Mine source-reading priority mismatch: ${sourceReadingPriorityCount} imported; ${paperMineSnapshot.summary_catalog.source_reading_priority_count} declared`,
  );
}

export const paperMinePaperById = new Map(
  paperMineSnapshot.papers.map((paper) => [paper.id, paper]),
);

export const paperMineFrontierById = new Map(
  paperMineSnapshot.frontier.map((item) => [item.candidate_id, item]),
);

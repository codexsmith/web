import meta from "@/content/paper-mine/meta.json";
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

export type PaperMinePaper = {
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

type CompactPaper = Omit<PaperMinePaper, "record_class" | "origins" | "source_paths" | "aliases" | "lane"> & {
  lane?: string | null;
  origins?: string[];
  source_paths?: string[];
  extra_source_paths?: string[];
  aliases?: string[];
};

const CONTROLLED_PROVENANCE = "organized_library_curated/01_Daily_Operations/publication_graph/PUBLICATION_GRAPH.json";

function hydrateControlled(paper: CompactPaper): PaperMinePaper {
  return {
    ...paper,
    record_class: "controlled_publication",
    origins: paper.origins ?? ["publication_graph"],
    lane: paper.lane ?? null,
    source_paths: [CONTROLLED_PROVENANCE, ...(paper.extra_source_paths ?? [])],
    aliases: paper.aliases ?? [],
  };
}

function hydrateMined(paper: CompactPaper): PaperMinePaper {
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

export const paperMineSnapshot: PaperMineSnapshot = {
  ...(meta as Omit<PaperMineSnapshot, "papers">),
  papers: [...controlled, ...mined],
};

if (paperMineSnapshot.papers.length !== paperMineSnapshot.summary.canonical_paper_count) {
  throw new Error(
    `Paper Mine projection count mismatch: ${paperMineSnapshot.papers.length} records loaded; ${paperMineSnapshot.summary.canonical_paper_count} declared`,
  );
}

export const paperMinePaperById = new Map(
  paperMineSnapshot.papers.map((paper) => [paper.id, paper]),
);

export const paperMineFrontierById = new Map(
  paperMineSnapshot.frontier.map((item) => [item.candidate_id, item]),
);

import meta from "@/content/paper-mine/meta.json";
import summaryMeta from "@/content/paper-mine/summary-meta.json";
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
  summary_kind: "public_projection_catalog_summary";
  summary_quality: "bounded_public_metadata";
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

function normalizeSentence(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (!normalized) return normalized;
  return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
}

function lowerLead(text: string) {
  const normalized = text.trim();
  if (normalized.length > 1 && /[A-Z]/.test(normalized[0]) && /[a-z]/.test(normalized[1])) {
    return normalized[0].toLowerCase() + normalized.slice(1);
  }
  return normalized;
}

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

const frontierById = new Map(
  (meta.frontier as PaperMineFrontierItem[]).map((item) => [item.candidate_id, item]),
);

function abstractStatus(paper: PaperMinePaperCore): PaperMineAbstractStatus {
  const sourceRich =
    paper.readiness_hint >= 4 ||
    /abstract|manuscript/i.test(paper.artifact_state);
  return sourceRich
    ? "source_reading_priority"
    : "catalog_summary_complete_source_abstract_pending";
}

function buildPublicSummary(paper: PaperMinePaperCore) {
  const frontier = frontierById.get(paper.id);
  const parts: string[] = [];
  const basis = ["title", "domain", "claim_ceiling", "evidence_requirement", "prior_art_requirement"];

  if (paper.record_class === "mined_candidate") {
    if (frontier?.question) {
      parts.push(`This paper candidate takes as its central research question: “${frontier.question}”`);
      basis.push("frontier.question");
    } else {
      parts.push(
        normalizeSentence(
          `This paper candidate develops “${paper.title}” from material already identified in the Lab corpus`,
        ),
      );
    }
    parts.push(normalizeSentence(`Its current claim ceiling is ${lowerLead(paper.claim_ceiling)}`));
    parts.push(normalizeSentence(`The next evidence obligation is ${lowerLead(paper.evidence_requirement)}`));
    parts.push(normalizeSentence(`Prior to promotion, it requires review against ${lowerLead(paper.prior_art_requirement)}`));
  } else if (paper.stage === "A") {
    parts.push(
      normalizeSentence(
        `This paper develops “${paper.title}” as an interpretive Boundary First reading of ${paper.domain}`,
      ),
    );
    parts.push(
      "The underlying native theorem, algorithm, or construction remains authoritative; the paper asks what distinctions, interfaces, or closure obligations become clearer under the comparative reading.",
    );
    parts.push(normalizeSentence(`Its present claim ceiling is ${lowerLead(paper.claim_ceiling)}`));
    parts.push(normalizeSentence(`The proposed evidence is ${lowerLead(paper.evidence_requirement)}`));
  } else if (paper.stage === "B") {
    parts.push(
      normalizeSentence(
        `This cross-domain synthesis develops “${paper.title}” across ${paper.domain}`,
      ),
    );
    parts.push(
      "It tests whether a shared structural vocabulary survives translation without erasing domain-specific proof, model, or interpretation obligations.",
    );
    parts.push(normalizeSentence(`Its present claim ceiling is ${lowerLead(paper.claim_ceiling)}`));
    parts.push(normalizeSentence(`Before promotion, the evidence obligation is ${lowerLead(paper.evidence_requirement)}`));
  } else {
    parts.push(
      normalizeSentence(
        `This Boundary-native paper develops “${paper.title}” within ${paper.program ?? paper.domain}`,
      ),
    );
    parts.push(
      "It is presented as a candidate formal contribution rather than as an established theorem or general law.",
    );
    parts.push(normalizeSentence(`Its present claim ceiling is ${lowerLead(paper.claim_ceiling)}`));
    parts.push(normalizeSentence(`The next evidence obligation is ${lowerLead(paper.evidence_requirement)}`));
    parts.push(normalizeSentence(`Prior to promotion, it requires review against ${lowerLead(paper.prior_art_requirement)}`));
  }

  return {
    summary: parts.join(" "),
    summary_kind: "public_projection_catalog_summary" as const,
    summary_quality: "bounded_public_metadata" as const,
    summary_basis: basis,
    abstract_status: abstractStatus(paper),
  };
}

const papers = [...controlled, ...mined].map((paper): PaperMinePaper => ({
  ...paper,
  ...buildPublicSummary(paper),
}));

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
    `Paper Mine source-reading priority mismatch: ${sourceReadingPriorityCount} derived; ${paperMineSnapshot.summary_catalog.source_reading_priority_count} declared`,
  );
}

export const paperMinePaperById = new Map(
  paperMineSnapshot.papers.map((paper) => [paper.id, paper]),
);

export const paperMineFrontierById = new Map(
  paperMineSnapshot.frontier.map((item) => [item.candidate_id, item]),
);

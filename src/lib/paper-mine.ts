import snapshot from "@/content/paper-mine/paper-mine.snapshot.json";

export type PaperMineCandidate = {
  id: string;
  title: string;
  pass: "pass1" | "pass2";
  field_group: string;
  readiness_hint: number;
  recommended_disposition: string;
  artifact_state: string;
  claim_ceiling: string;
  prior_art_requirement: string;
  evidence_requirement: string;
  risk?: string;
  source_paths: string[];
};

export type PaperMineFrontierItem = {
  rank: number;
  candidate_id: string;
  paperization_state: string;
  question: string;
  baselines: string[];
  measures: string[];
  failure_outcomes: string[];
  claim_ceiling: string;
  local_artifacts: string[];
};

export type PaperMineSnapshot = {
  schema_version: string;
  generated_on: string;
  source: {
    repository: string;
    visibility: string;
    merge_commit: string;
    source_artifacts: string[];
    projection_note: string;
  };
  authority: {
    publication_promotion: boolean;
    scientific_authority: boolean;
    queue_insertion: boolean;
    human_gate_required: boolean;
    negative_results_are_valid: boolean;
  };
  readiness_scale: Record<string, string>;
  candidate_count: number;
  candidates: PaperMineCandidate[];
  frontier: PaperMineFrontierItem[];
};

export const paperMineSnapshot = snapshot as PaperMineSnapshot;

export const paperMineCandidateById = new Map(
  paperMineSnapshot.candidates.map((candidate) => [candidate.id, candidate]),
);

export const paperMineFrontierById = new Map(
  paperMineSnapshot.frontier.map((item) => [item.candidate_id, item]),
);

export type EpistemicClaimRecord = {
  id: string;
  claim: string;
  status: string;
  artifacts: readonly string[];
  sources: readonly string[];
};

export type EpistemicEvidenceArtifact = {
  ref: string;
  claimIds: readonly string[];
  sourceHref: string;
};

const sourceRevision = "3a8c984712ae1d87c7ec714876c356c20242cb15";
const sourceRoot =
  "organized_library_curated/999_Library/03_Domains/03_engineered_systems__domain_family/01_software_engineering__domain";

const publicationRoot = `${sourceRoot}/closure_driven_software`;
const integrationRoot = `${sourceRoot}/software_integration`;

function sourceHref(path: string) {
  return `https://github.com/codexsmith/boundary-first-labs/blob/${sourceRevision}/${path}`;
}

function resolveArtifactPath(ref: string) {
  if (ref.startsWith("software_worked_case_pack")) {
    return `${integrationRoot}/${ref}`;
  }
  if (ref.startsWith("software_matched_comparison")) {
    return `${integrationRoot}/${ref}`;
  }
  return `${publicationRoot}/${ref}`;
}

export const epistemicChainProjection = {
  sourceRepository: "codexsmith/boundary-first-labs",
  sourceRevision,
  sourceRevisionDate: "2026-09-18",
  publicationId: "PUB-001",
  publicationTitle: "Closure-Driven Software Development",
  authority:
    "Publication-local claim/evidence routing only. A declared artifact link records what the publication package cites for a claim; it does not by itself establish truth, generality, novelty, independent review, or an experiment-to-claim relation.",
  claimEvidenceMap: {
    artifactId: "PUB-001B-CLAIM-EVIDENCE-MAP",
    generatedAt: "2026-07-26",
    publicationState: "adversarially_tested",
    independentReviewCompleted: false,
    path: `${publicationRoot}/closure_driven_software_claim_evidence_map.json`,
    href: sourceHref(
      `${publicationRoot}/closure_driven_software_claim_evidence_map.json`,
    ),
  },
  lifecycle: {
    artifactId: "PUB-001",
    generatedAt: "2026-07-26",
    currentState: "source_complete",
    claimCeiling:
      "method proposal with a synthetic worked case and comparative analysis",
    researchQuestion:
      "Can a use-relative closure assessment and closure-bearing probe expose consequential defects that remain invisible when implementation completion is represented by local tests, workflow completion, or coarse status fields?",
    path: `${publicationRoot}/closure_driven_software_lifecycle.json`,
    href: sourceHref(
      `${publicationRoot}/closure_driven_software_lifecycle.json`,
    ),
    requiredEvidence: [
      "reference_implementation",
      "positive_and_negative_path_export",
      "seeded_defect_results",
      "method_burden_analysis",
      "reviewer_agreement",
      "independent_critic_report",
      "human_promotion_decision",
    ],
    openGates: [
      "neighbor_grounded",
      "carrier_ready",
      "adversarially_tested",
      "independently_reviewed",
      "promotion_candidate",
      "submitted_or_released",
      "stewarded",
    ],
    nonclaims: [
      "method novelty",
      "method superiority",
      "production validation",
      "legal or accounting authority",
      "validation of Boundary Theory",
      "submission readiness",
    ],
  },
} as const;

export const epistemicClaims: readonly EpistemicClaimRecord[] = [
  {
    id: "CLM-001",
    claim: "A coarse tracker can remain PAID after a later bank rejection.",
    status: "constructively_demonstrated",
    artifacts: [
      "software_carrier_results.json",
      "closure_driven_software_reference_carrier/tests/test_scenarios.py",
    ],
    sources: [],
  },
  {
    id: "CLM-002",
    claim: "Gateway acknowledgment is weaker than bank settlement in the declared case.",
    status: "constructively_demonstrated_and_domain_grounded",
    artifacts: ["software_carrier_results.json", "software_worked_case_pack.md"],
    sources: ["SW-N09", "SW-N10"],
  },
  {
    id: "CLM-003",
    claim: "Changed remittance invalidates the carrier's prior payment authorization.",
    status: "constructively_demonstrated_under_declared_policy",
    artifacts: ["software_carrier_results.json"],
    sources: ["SW-N08"],
  },
  {
    id: "CLM-004",
    claim: "Duplicate idempotency keys are rejected by the carrier.",
    status: "constructively_demonstrated",
    artifacts: [
      "software_carrier_results.json",
      "closure_driven_software_reference_carrier/tests/test_scenarios.py",
    ],
    sources: [],
  },
  {
    id: "CLM-005",
    claim: "The carrier's event hash chain detects the seeded tampering case.",
    status: "constructively_demonstrated",
    artifacts: ["software_carrier_results.json"],
    sources: ["SW-N07"],
  },
  {
    id: "CLM-006",
    claim: "Mature workflow/state methods can represent orthogonal states and recovery.",
    status: "literature_grounded",
    artifacts: ["closure_driven_software_reference_carrier/baselines/01_workflow_state_machine.md"],
    sources: ["SW-N01", "SW-N02"],
  },
  {
    id: "CLM-007",
    claim: "Information hiding can separate the volatile decisions in the invoice case.",
    status: "literature_grounded_and_constructively_encoded",
    artifacts: ["closure_driven_software_reference_carrier/baselines/02_information_hiding.md"],
    sources: ["SW-N03"],
  },
  {
    id: "CLM-008",
    claim: "Interface automata can represent acknowledgment, rejection, settlement, and status protocol obligations.",
    status: "literature_grounded_and_constructively_encoded",
    artifacts: ["closure_driven_software_reference_carrier/baselines/03_interface_automata.md"],
    sources: ["SW-N04"],
  },
  {
    id: "CLM-009",
    claim: "Assume-guarantee contracts can encode eight of the nine defects in the authored comparison.",
    status: "authored_constructive_comparison",
    artifacts: [
      "software_matched_comparison.json",
      "closure_driven_software_reference_carrier/baselines/04_assume_guarantee_contracts.md",
    ],
    sources: ["SW-N05"],
  },
  {
    id: "CLM-010",
    claim: "STPA-style analysis can encode eight of the nine defects in the authored comparison.",
    status: "authored_constructive_comparison",
    artifacts: [
      "software_matched_comparison.json",
      "closure_driven_software_reference_carrier/baselines/05_stpa_stamp.md",
    ],
    sources: ["SW-N06"],
  },
  {
    id: "CLM-011",
    claim: "No seeded defect is unique to the closure-driven package against the union of authored competent neighboring encodings.",
    status: "authored_constructive_negative_result_pending_independent_review",
    artifacts: ["software_matched_comparison.md", "software_matched_comparison.json"],
    sources: ["SW-N01", "SW-N02", "SW-N03", "SW-N04", "SW-N05", "SW-N06", "SW-N07"],
  },
  {
    id: "CLM-012",
    claim: "The closure-driven package assembles all nine defects in one declared artifact.",
    status: "constructively_demonstrated_for_authored_case",
    artifacts: ["software_matched_comparison.json", "software_worked_case_pack.md"],
    sources: [],
  },
  {
    id: "CLM-013",
    claim: "The package is easier, cheaper, more reliable, or more maintainable.",
    status: "unsupported_not_claimed",
    artifacts: [],
    sources: [],
  },
  {
    id: "CLM-014",
    claim: "The package is a novel software method.",
    status: "unsupported_not_claimed",
    artifacts: [],
    sources: [],
  },
  {
    id: "CLM-015",
    claim: "The findings generalize beyond the synthetic invoice case.",
    status: "unsupported_not_claimed",
    artifacts: [],
    sources: [],
  },
  {
    id: "CLM-016",
    claim: "Hidden repair and displaced responsibility are established sociotechnical concerns.",
    status: "literature_grounded",
    artifacts: ["software_worked_case_pack.md"],
    sources: ["SW-N11", "SW-N12"],
  },
  {
    id: "CLM-017",
    claim: "The manuscript is independently reviewed.",
    status: "false",
    artifacts: ["closure_driven_software_lifecycle.json"],
    sources: [],
  },
  {
    id: "CLM-018",
    claim: "The manuscript is submission-ready.",
    status: "false",
    artifacts: ["closure_driven_software_lifecycle.json"],
    sources: [],
  },
];

const artifactClaims = new Map<string, string[]>();
for (const claim of epistemicClaims) {
  for (const artifact of claim.artifacts) {
    const claimIds = artifactClaims.get(artifact) ?? [];
    claimIds.push(claim.id);
    artifactClaims.set(artifact, claimIds);
  }
}

export const epistemicEvidenceArtifacts: readonly EpistemicEvidenceArtifact[] =
  [...artifactClaims.entries()].map(([ref, claimIds]) => ({
    ref,
    claimIds,
    sourceHref: sourceHref(resolveArtifactPath(ref)),
  }));

export const epistemicChainGaps = [
  {
    id: "research-owner",
    label: "Research → publication",
    state: "not declared in this map",
    note:
      "The claim/evidence map is publication-local and does not declare a stable Research object identifier for PUB-001.",
  },
  {
    id: "claim-experiment",
    label: "Claim → experiment",
    state: "not declared",
    note:
      "CLM-* records cite artifacts and literature-source IDs, not Lab-wide EXP-* identifiers. No direct edge is projected.",
  },
  {
    id: "evidence-object",
    label: "Evidence artifact → durable Evidence object",
    state: "partial",
    note:
      "The map names files and source IDs. These are inspectable evidence references, but they are not assigned the public Evidence-object identity used by the Lab Atlas.",
  },
  {
    id: "publication-state",
    label: "Publication lifecycle state",
    state: "source discrepancy retained",
    note:
      "The claim/evidence map declares adversarially_tested while the lifecycle record declares source_complete. The website preserves both source statements rather than reconciling them.",
  },
] as const;

export const epistemicChainStats = {
  claims: epistemicClaims.length,
  supportedClaims: epistemicClaims.filter((claim) => claim.artifacts.length > 0).length,
  unsupportedOrNegativeClaims: epistemicClaims.filter(
    (claim) => claim.artifacts.length === 0,
  ).length,
  evidenceArtifacts: epistemicEvidenceArtifacts.length,
  declaredClaimArtifactEdges: epistemicClaims.reduce(
    (count, claim) => count + claim.artifacts.length,
    0,
  ),
} as const;

export type ExperimentLaneLink = {
  laneId: string;
  label: string;
  atlasId: string;
  role: "primary" | "secondary";
};

export type ExperimentRecord = {
  id: string;
  title: string;
  program: string;
  status: string;
  resultPosture: string;
  questionOrPurpose: string;
  researchLanes: readonly ExperimentLaneLink[];
  carrierOrTestbed?: string;
  control?: string;
  method?: string;
  acceptancePredicate?: string;
  resultSummary?: string;
  limitations?: string;
  firewall: string;
  canonicalSource: string;
  implementation?: string;
  evidence?: string;
  nextOperation?: string;
};

export const experimentProjection = {
  sourceRepository: "codexsmith/boundary-first-labs",
  sourcePath:
    "organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/experiment_register.md",
  sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15",
  sourceRevisionDate: "2026-09-18",
  sourceStatus: "active durable Lab register; seeded, not yet exhaustively recovered",
  authority:
    "Registration and evidence routing only. Experiment registration does not promote scientific claim status.",
  sourceHref:
    "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/02_pipeline_tooling__operations/02_registers_and_queues/experiment_register.md",
} as const;

const atlasLane: ExperimentLaneLink = {
  laneId: "RL-ATLAS-001",
  label: "Atlas Grammars / Schemathematics",
  atlasId: "research-ag",
  role: "primary",
};

const asmLane: ExperimentLaneLink = {
  laneId: "RL-ASM-001",
  label: "Agentic Scientific Method / Theory Transformation Machinery",
  atlasId: "research-asm",
  role: "primary",
};

const atlasSecondaryLane: ExperimentLaneLink = {
  ...atlasLane,
  role: "secondary",
};

export const experimentRecords: readonly ExperimentRecord[] = [
  {
    id: "EXP-ATLAS-001",
    title: "Proof-carrying mixed-regime atlas compiler",
    program: "Atlas Grammars / Schemathematics",
    status: "completed bounded computational experiment",
    resultPosture: "recorded finite diagnostic evidence; no general theorem promotion",
    questionOrPurpose:
      "Compile and verify bounded heterogeneous Boolean regimes with typed regions, interfaces, certificates, projection, and witness reconstruction.",
    researchLanes: [atlasLane],
    canonicalSource: "02_Core_Theory/04_atlas_grammars__formalism/",
    implementation:
      "02_implementations/proof_carrying_mixed_regime_atlas_compiler_v0_1.py",
    evidence: "Corresponding saved records under 03_experiment_results/.",
    firewall:
      "Finite compiler success does not establish the general Atlas Grammar program or mathematical novelty.",
  },
  {
    id: "EXP-ATLAS-002",
    title: "Adversarial atlas compilation and recovery",
    program: "Atlas Grammars / Schemathematics",
    status: "completed bounded computational experiment",
    resultPosture: "recorded finite diagnostic evidence",
    questionOrPurpose:
      "Perturb bounded synthetic mixed-regime representations and measure recovery under declared transforms.",
    researchLanes: [atlasLane],
    canonicalSource: "02_Core_Theory/04_atlas_grammars__formalism/",
    implementation: "02_implementations/adversarial_atlas_compilation_v0_2.py",
    evidence: "Corresponding saved records under 03_experiment_results/.",
    firewall:
      "Recovery under declared transforms does not establish invariance under arbitrary transforms.",
  },
  {
    id: "EXP-ATLAS-003",
    title: "Dynamic atlas maintenance versus full recomputation",
    program: "Atlas Grammars / Schemathematics",
    status: "completed bounded computational experiment",
    resultPosture: "recorded finite diagnostic evidence",
    questionOrPurpose:
      "Apply local edits and rollback operations to a bounded heterogeneous atlas, then compare incremental maintenance with exact full recomputation.",
    researchLanes: [atlasLane],
    canonicalSource: "02_Core_Theory/04_atlas_grammars__formalism/",
    implementation: "02_implementations/dynamic_atlas_maintenance_v0_6.py",
    evidence: "Corresponding saved records under 03_experiment_results/.",
    firewall:
      "Bounded incremental/full agreement does not establish correctness outside the declared carrier.",
  },
  {
    id: "EXP-ASM-001",
    title: "Theory Transformation ISA heterogeneous compilation series",
    program: "Agentic Scientific Method / Theory Transformation Machine",
    status: "completed bounded conceptual/formal comparative experiment",
    resultPosture: "positive but provisional architectural evidence",
    questionOrPurpose:
      "Can qualitatively different forms of scientific theory change be expressed as legal programs over the proposed nine-operation Theory Transformation ISA without adding event-specific primitive opcodes, while keeping mutation, execution, evaluation, representation change, and higher-order control distinct?",
    researchLanes: [asmLane],
    carrierOrTestbed:
      "Six reconstructed theory-transition cases: pendulum regime lift; temperature-aware gas-state refinement; harmonic-oscillator representation transport; geocentric/Copernican mixed transition; Newtonian mechanics to special-relativity covariance lift; SR/Newtonian gravity to general-relativity dynamical-background promotion.",
    control:
      "The harmonic-oscillator case is a representation-only control where presentation changes substantially while theory content should remain equivalent under admissible transport.",
    method:
      "Compile each case into Theory IR, localize the principal defect/change class, express the transition using primitive ISA operations and derived macros, then record forced changes to the IR, evaluator, defect taxonomy, equivalence obligations, or controller state.",
    acceptancePredicate:
      "No case should require an ad hoc historical-event primitive; representation-only change must remain distinguishable from substantive theory change; predecessor structure and reduction relations must remain explicit where applicable; evaluator/control actions must not be smuggled into mutation opcodes.",
    resultSummary:
      "All six cases were expressible using ADD, DROP, BOUND, REFINE, QUOTIENT, COMPOSE, FACTOR, TRANSPORT, and GROUND. The series also exposed required extensions to Theory IR, the defect taxonomy, grounding, reduction relations, controller state, and transport-residue handling.",
    limitations:
      "Conceptual/formal reconstruction only; no executable runtime was implemented. Historical examples are simplified architecture testbeds. Success does not establish minimality, independence, completeness, universality, or scientific novelty of the ISA.",
    canonicalSource:
      "03_Domains/03_engineered_systems__domain_family/02_ai_and_computation__domain/01_agentic_scientific_method__product/THEORY_TRANSFORMATION_VALIDATION_SERIES_v0_1.md",
    nextOperation:
      "EXP-ASM-002 — deterministic Theory Machine runtime/fixture conformance test.",
    firewall:
      "This experiment records architectural evidence only and does not promote ASM, the Theory Transform Conjecture, or any historical/physics claim to established status.",
  },
  {
    id: "EXP-ASM-002",
    title: "Theory Machine v0.2 deterministic runtime fixture conformance",
    program: "Agentic Scientific Method / Theory Machine v0.2",
    status: "planned bounded computational experiment",
    resultPosture: "not-yet-evaluated",
    questionOrPurpose:
      "Can a small deterministic runtime load the v0.2 Theory IR/evaluation schemas, apply the nine semantic theory-edit opcodes as bounded graph transactions, emit verification obligations and structural diffs, preserve a frozen evaluation context, replay regression evidence, and correctly handle the three seed fixtures?",
    researchLanes: [asmLane],
    carrierOrTestbed:
      "Theory Machine v0.2 schemas plus pendulum, gas-distinction, and harmonic-oscillator transport fixtures.",
    control:
      "The oscillator fixture must remain a representation-only transition; substantial presentation change must not be misclassified as substantive theory change.",
    method:
      "Implement the minimal runtime sequence load -> validate -> apply -> obligate -> verify -> diff; run candidate edit programs supplied by fixtures; compare emitted defects, obligations, and diffs with fixture expectations.",
    acceptancePredicate:
      "Schema validation succeeds; stale revisions are rejected; theory edits cannot mutate frozen evaluation context; all nine semantic opcodes emit typed structural changes and obligations; dependency, quotient, transport, regression, and promotion boundaries behave as declared; all three fixtures match expected structure.",
    limitations:
      "Does not test autonomous theory discovery, general scientific adequacy, historical reconstruction quality, LLM reasoning, public claim promotion, or completeness/minimality of the semantic ISA.",
    canonicalSource:
      "03_Domains/03_engineered_systems__domain_family/02_ai_and_computation__domain/01_agentic_scientific_method__product/theory_machine_v0_2/THEORY_MACHINE_SPEC_v0_2.md",
    firewall:
      "Passing the fixture suite will constitute bounded implementation evidence only. It will not validate the Theory Transform Conjecture or justify a BFL-MACH-* component identity by itself.",
  },
  {
    id: "EXP-ASM-003",
    title: "Boundary Graph cross-domain architecture and recovery stress test",
    program: "Representational Mechanics / Boundary Graph / Theory Machine integration",
    status: "planned / partially conceptual bounded formal-comparative experiment",
    resultPosture:
      "mixed provisional architectural evidence; executable and literature recovery gates not yet complete",
    questionOrPurpose:
      "Does the typed attributed graph/hypergraph carrier already present in Theory Machine v0.2 admit a disciplined Boundary Graph interpretation that conservatively recovers inherited graph/tensor/rewrite structures while adding useful explicit semantics for boundary contracts, grounding, defect/loss, provenance, and scientific graph repair?",
    researchLanes: [asmLane, atlasSecondaryLane],
    carrierOrTestbed:
      "Boundary Graph package plus the existing LP-gauge composition packet and Theory Machine v0.2 fixtures.",
    method:
      "Recover ordinary graph, open/boundary graph, finite tensor network, finite LP composition, typed attributed graph rewriting, and Theory IR round-trip behavior under one bounded carrier.",
    acceptancePredicate:
      "Inherited mathematics must be recovered without semantic distortion; Theory IR round trip must preserve required distinctions; semantic ISA instructions must compile to typed graph rewrites with obligations; interface mismatch must produce typed defects; grounding must not manufacture evidence; prior-art comparison must separate inherited from additional orchestration.",
    limitations:
      "No graph-theory novelty, tensor-generalization novelty, universal science formalism, ISA completeness, or physical theory follows from conceptual fit. Established literature may subsume substantial or all proposed structure.",
    canonicalSource:
      "02_Core_Theory/02_engine_core__theory/01_engine_modules/representational_mechanics/boundary_graph_2026_09_13/",
    nextOperation:
      "EXP-ASM-002 remains the immediate deterministic runtime control and must not be bypassed.",
    firewall:
      "This experiment may justify a useful synthesis/profile or implementation layer even if no new mathematics survives. It does not justify a BFL-MACH-* identity without separate component-boundary review.",
  },
  {
    id: "EXP-ASM-004",
    title: "Epistemic architecture compatibility and privilege-separation control",
    program: "Boundary Graph / Theory Machine architecture validation",
    status: "planned bounded computational/formal experiment",
    resultPosture: "not-yet-evaluated",
    questionOrPurpose:
      "Does Boundary Graph + Theory ISA define a meaningful architecture boundary such that the same semantic theory-edit program can be lowered through more than one lower-level realization while preserving declared semantic diffs and obligations, and can ordinary theory programs be prevented from mutating evaluation-context/authority state?",
    researchLanes: [asmLane, atlasSecondaryLane],
    carrierOrTestbed:
      "One or more v0.2 seed fixtures plus at least two lower-level graph/internal realizations or adapters, selected after EXP-ASM-002 exists.",
    method:
      "Execute one identical semantic EditProgram through realization A and realization B; preserve lowering traces; compare semantic Theory IR diffs, generated obligation sets, verification status, and execution consequences; separately attempt forbidden edits to evidence, tolerance, evaluator identity, measurement semantics, authority, and regression membership.",
    acceptancePredicate:
      "Lower-level realization may differ, but declared semantic result and obligation set must agree under the architecture contract; incompatible versions must fail explicitly; forbidden context/authority mutation must produce typed rejection or an explicit revision/escalation path.",
    limitations:
      "Even a positive result would establish bounded architecture compatibility only. It would not prove ISA completeness, scientific adequacy, autonomous discovery capability, or novelty relative to established modeling/metamodeling/graph-rewrite architectures.",
    canonicalSource:
      "02_Core_Theory/02_engine_core__theory/01_engine_modules/representational_mechanics/boundary_graph_2026_09_13/EPISTEMIC_COMPUTER_ARCHITECTURE_v0_1.md",
    nextOperation:
      "Do not execute before EXP-ASM-002 provides the minimal runtime control.",
    firewall:
      "No BFL-MACH-* promotion follows from compatibility success alone.",
  },
];

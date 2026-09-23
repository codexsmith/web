export const agenticScientificMethodProduct = {
  family: "RESEARCH METHOD / AGENTIC INFRASTRUCTURE",
  name: "Agentic Scientific Method",
  tagline: "Make the inquiry itself inspectable.",
  lead:
    "An operational research protocol that makes goals, boundaries, state, evidence, criticism, repair, authority, and closure explicit enough for humans and agents to work together.",
  status: "RESEARCH PRODUCT · OPERATIONAL SUITE V0.1",
  statusNote:
    "The protocol, authority model, templates, validation ladder, and transition contract exist. External user pilots, comparative benchmarks, cross-domain replication, and formal validation remain open.",
  theme: "asm",
} as const;

export const agenticScientificMethodNav = [
  { href: "#method", label: "Method" },
  { href: "#correspondence", label: "Correspondence" },
  { href: "#authority", label: "Authority" },
  { href: "#memory", label: "Memory" },
  { href: "#validation", label: "Validation" },
] as const;

export const asmPhases = [
  {
    id: "orient",
    label: "Orient",
    role: "Inquiry owner",
    artifact: "inquiry_charter.md",
    question: "Why is this inquiry open, who is affected, and what consequence justifies the work?",
  },
  {
    id: "declare",
    label: "Declare",
    role: "Owner",
    artifact: "Inquiry Manifest",
    question: "What is the purpose, intended use, claim ceiling, evidence boundary, and closure condition?",
  },
  {
    id: "bind",
    label: "Bind",
    role: "Owner + mapper",
    artifact: "boundary_declaration.md",
    question: "What is inside, outside, exchanged across the boundary, and capable of proving the boundary wrong?",
  },
  {
    id: "map",
    label: "Map",
    role: "Mapper",
    artifact: "state_space_map.md",
    question: "Which states, relations, variables, transitions, modalities, and consequences must be representable?",
  },
  {
    id: "constrain",
    label: "Constrain",
    role: "Mapper + owner",
    artifact: "constraints_and_invariants.md",
    question: "Which transitions are admissible, forbidden, required, protected, unsafe, or authority-limited?",
  },
  {
    id: "generate",
    label: "Generate",
    role: "Research agent / investigator",
    artifact: "candidate_model_register.md",
    question: "What competing models, explanations, hypotheses, or plans deserve to be distinguished?",
  },
  {
    id: "select",
    label: "Select",
    role: "Planner",
    artifact: "action_selection_record.md",
    question: "Which next action best separates alternatives while respecting cost, risk, reversibility, and authority?",
  },
  {
    id: "act",
    label: "Act",
    role: "Executor",
    artifact: "run_record.md",
    question: "Can the selected action be executed under frozen conditions without rewriting the test after the fact?",
  },
  {
    id: "trace",
    label: "Trace",
    role: "Observer / instrument",
    artifact: "observation_trace.md",
    question: "What actually happened, separated from interpretation, annotation, and later inference?",
  },
  {
    id: "compare",
    label: "Compare",
    role: "Analyst",
    artifact: "correspondence_report.md",
    question: "How do represented and observed states compare under the declared correspondence rule?",
  },
  {
    id: "diagnose",
    label: "Diagnose",
    role: "Diagnostician / falsifier",
    artifact: "defect_report.md",
    question: "Where is the mismatch: boundary, model, instrument, action, trace, comparison rule, or authority?",
  },
  {
    id: "repair",
    label: "Repair",
    role: "Repairer",
    artifact: "repair_record.md",
    question: "What must change without laundering the failure or silently widening the theory?",
  },
  {
    id: "close",
    label: "Close",
    role: "Critic + promotion authority",
    artifact: "closure_and_promotion_record.md",
    question: "What can be claimed for this purpose, under these conditions, with these remaining uncertainties?",
  },
  {
    id: "preserve",
    label: "Preserve",
    role: "Archivist + owner",
    artifact: "provenance bundle",
    question: "Can another person reconstruct the inquiry, resume it, criticize it, and reopen it when conditions change?",
  },
] as const;

export type AsmPhaseId = (typeof asmPhases)[number]["id"];

export const asmContributions = [
  {
    label: "SCIENTIFIC METHOD",
    title: "Answerability to evidence",
    description:
      "Hypotheses, observations, comparison, replication, criticism, and provisional rather than absolute closure.",
  },
  {
    label: "AGENTICS",
    title: "Goals, actions, state, and feedback",
    description:
      "Explicit objectives, state spaces, action options, planning under uncertainty, memory, stopping rules, and model updating.",
  },
  {
    label: "BOUNDARY FIRST",
    title: "Consequences, invariants, defect, and repair",
    description:
      "Declare what matters before optimizing, expose omitted distinctions, preserve invariants, localize mismatch, and keep a repair path.",
  },
  {
    label: "CORPUS FORGE",
    title: "Provenance, criticism, and promotion",
    description:
      "Stabilize sources, track claim status, preserve external memory, require critic passes, and separate work from promotion.",
  },
] as const;

export const asmDefectLocations = [
  "Purpose",
  "Boundary",
  "State distinctions",
  "Transition grammar",
  "Invariant",
  "Candidate model",
  "Action selection",
  "Intervention fidelity",
  "Instrument / observer",
  "Trace transformation",
  "Comparison rule",
  "Closure criterion",
  "Authority",
] as const;

export const asmRoles = [
  ["Inquiry owner", "Owns purpose, consequence boundary, resources, stopping authority, and accountability."],
  ["Generative research agent", "May propose mappings, models, searches, experiments, and repairs; may not promote its own consequential claims."],
  ["Procedural executor", "Runs frozen symbolic, numerical, search, benchmark, theorem-prover, test, or pipeline operations."],
  ["Observer / instrument", "Records raw or minimally transformed traces without silently changing the action after seeing results."],
  ["Falsifier", "Attempts to break the object with counterexamples, adversarial cases, ablations, perturbations, and dependency attacks."],
  ["Independent critic", "Audits the whole bounded inquiry, including provenance, compression, repair history, and requested closure."],
  ["Human promotion authority", "Causes consequential transitions such as canonical replacement, public claims, publication, deployment, or authoritative merge."],
] as const;

export const asmArtifacts = [
  ["Inquiry charter", "Purpose, trigger, affected parties, accountable owner, exclusions, and stop conditions."],
  ["Boundary declaration", "Included and excluded entities, scales, sources, interfaces, exchanges, and boundary-failure signals."],
  ["State-space map", "Entities, states, relations, temporal/modal states, uncertainties, and candidate transitions."],
  ["Candidate register", "Alternatives, null baselines, predictions, assumptions, and likely failure points."],
  ["Action + run record", "Why this test, which frozen specification, which tools, versions, parameters, operators, and deviations."],
  ["Observation trace", "Raw observations separated from transformed data, annotations, interpretations, and agent inference."],
  ["Correspondence + defect report", "Expected versus observed behavior, mismatch localization, and competing explanations."],
  ["Repair lineage", "What changed, why, which claims moved, what new degrees of freedom appeared, and what must be retested."],
  ["Closure + provenance", "Permitted claim, remaining uncertainty, reopening conditions, authority, critic findings, and preserved history."],
] as const;

export const asmValidationLevels = [
  ["L0", "Conceptual coherence", "Stable definition, separated vocabulary, explicit claim ceiling, no unresolved contradiction in the core protocol."],
  ["L1", "Self-hosting", "Use ASM to criticize and improve its own specification without allowing self-approval."],
  ["L2", "Internal domain implementation", "Apply the method across existing Lab work such as software, knowledge systems, games, audits, or formal experiments."],
  ["L3", "Comparative benchmark", "Compare ad hoc practice, classical hypothesis-test summaries, and ASM on defect discovery, provenance, rework, and reviewer agreement."],
  ["L4", "External user pilot", "Give the protocol to an independent user and measure learnability, ambiguity, completion, misuse, burden, and artifact quality."],
  ["L5", "Cross-domain replication", "Demonstrate useful transfer across discrete, continuous/noisy, and consequence-bearing human systems."],
  ["L6", "Formal + computational model", "Test state reachability, permissions, closure gates, repair transitions, provenance integrity, and unsafe self-promotion."],
] as const;

export const asmClaimFirewall = [
  "ASM is not a proven universal method for all knowledge.",
  "ASM does not replace the scientific method, experimental design, causal inference, cybernetics, Bayesian methods, philosophy of science, or scientific institutions.",
  "Recursive repair does not guarantee truth, safety, objectivity, or convergence.",
  "Automation does not remove the need for human authority, domain expertise, ethics, or independent criticism.",
  "Internal implementations are benchmark candidates, not proof of scientific universality.",
  "A candidate executable specification is not the same thing as an executed, validated research machine.",
] as const;

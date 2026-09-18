export const publicationFields = [
  ["01", "Status", "What stage has this work actually reached?"],
  ["02", "Claim ceiling", "What can this artifact responsibly support?"],
  ["03", "Key claims", "What is actually being asserted?"],
  ["04", "Evidence", "What supports or constrains those claims?"],
  ["05", "Dependencies", "What prior results, data, software, or literature does it require?"],
  ["06", "Open questions", "What remains unresolved?"],
  ["07", "Counterexamples / negative results", "What has resisted the claim?"],
  ["08", "Related artifacts", "What experiments, code, data, packets, or successor work belong with it?"],
  ["09", "Revision & correction", "What changed after release?"],
] as const;

export const publicationStates = [
  "Working note",
  "Working paper",
  "Experiment report",
  "Publication candidate",
  "Under review",
  "Published",
  "Revised",
  "Superseded",
  "Retracted / refuted",
] as const;

export const publicationTypes = [
  {
    code: "WP",
    title: "Working papers",
    description:
      "Formal or technical arguments developed far enough for focused external inspection but not necessarily final review.",
  },
  {
    code: "TR",
    title: "Technical reports",
    description:
      "Bounded methods, system designs, implementation results, infrastructure analyses, or formal engineering artifacts.",
  },
  {
    code: "RN",
    title: "Research notes",
    description:
      "Smaller objects preserving a question, derivation, comparison, conjecture, or conceptual repair that does not yet justify a full paper.",
  },
  {
    code: "ER",
    title: "Experiment reports",
    description:
      "Evidence-bearing descriptions of bounded tests, including null, negative, blocked, or inconclusive outcomes.",
  },
  {
    code: "FS",
    title: "Formal specifications",
    description:
      "Precise executable or mathematical contracts intended to make a system inspectable and implementable.",
  },
  {
    code: "PI",
    title: "Public-interest analyses",
    description:
      "Evidence-led analyses of civic or institutional systems with explicit provenance, uncertainty, and claim boundaries.",
  },
  {
    code: "RI",
    title: "Reference implementations",
    description:
      "Code or executable artifacts demonstrating a bounded mechanism without treating implementation success as automatic validation of a larger theory.",
  },
  {
    code: "RDP",
    title: "Research Deployment Packets",
    description:
      "Transferable research state for another person, institution, reviewer, or machine to inspect and continue.",
  },
] as const;

export const readerDistinctions = [
  "Observation",
  "Interpretation",
  "Inference",
  "Conjecture",
  "Formal result",
  "Empirical validation",
  "Deployment evidence",
] as const;

export const critiqueInputs = [
  "Publication or claim",
  "Exact passage / object",
  "Kind of defect",
  "Supporting source or argument",
  "Counterexample",
  "Failed reproduction",
  "Missing prior art",
  "Stronger neighboring literature",
  "Implementation defect",
  "Accessibility problem",
  "Overclaim concern",
] as const;

export const stewardshipQuestions = [
  "Is this still current?",
  "Has a stronger artifact superseded it?",
  "Has terminology changed?",
  "Have important counterexamples emerged?",
  "Has a correction been issued?",
  "Is the source material still available?",
  "Who owns the next revision?",
  "Should the work be archived or retired?",
] as const;

export const flagshipPattern = [
  "Identity",
  "Current status",
  "Claim ceiling",
  "Abstract / orientation",
  "Key claims",
  "Evidence",
  "Experiments",
  "Negative results",
  "Defects",
  "Open questions",
  "Related apparatus",
  "Revision",
  "Critique",
] as const;


/**
 * UI-only publication records.
 *
 * These objects exist to design the institutional publication catalog before
 * canonical documents are bound. They must not be interpreted as publication,
 * review, DOI, release, or scientific-status claims.
 */
export const publicationStubs = [
  {
    id: "PUB-STUB-001",
    featured: true,
    typeCode: "WP",
    type: "Working paper",
    lane: "Representational Mechanics",
    domain: "Representation / formal systems",
    title: "Representational Mechanics: State, Transport, Distortion, Defect",
    abstract:
      "Flagship-layout stub for a formal research argument that needs claims, evidence, experiments, revision state, and inspectable supporting machinery to travel together.",
    claimCeiling:
      "UI demonstration only. No scientific claim state is represented by this record.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Abstract shell", "Full text pending", "Evidence pending", "RDP pending"],
    tone: "blue",
  },
  {
    id: "PUB-STUB-002",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Boundary Theory",
    domain: "Formal systems",
    title: "Boundary, Admissibility, Closure, and Defect",
    abstract:
      "Stub treatment for a compact theoretical research object whose argument, open questions, counterexamples, and source relationships remain visible.",
    claimCeiling: "Placeholder record; canonical research status not yet attached.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Abstract shell", "Sources pending", "Revision pending"],
    tone: "gold",
  },
  {
    id: "PUB-STUB-003",
    featured: false,
    typeCode: "TR",
    type: "Technical report",
    lane: "Agentic Scientific Method",
    domain: "Scientific software / agentic systems",
    title: "Agentic Scientific Method: Theory Transformation Machinery",
    abstract:
      "Stub treatment for an engineering-heavy publication joining method, executable machinery, evaluation boundaries, and evidence-producing workflows.",
    claimCeiling: "Placeholder record; implementation and validation evidence not yet bound.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Method shell", "Code pending", "Validation pending"],
    tone: "green",
  },
  {
    id: "PUB-STUB-004",
    featured: false,
    typeCode: "FS",
    type: "Formal specification",
    lane: "Schemathematics / Atlas Grammars",
    domain: "Mathematics / representation",
    title: "Atlas Grammars: Schema, Transform, Invariant, Defect",
    abstract:
      "Stub treatment for a formal specification where notation, object grammar, invariants, transforms, and implementation-facing contracts must remain tightly aligned.",
    claimCeiling: "Placeholder record; no formal result is asserted by this UI stub.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Specification shell", "Notation pending", "Examples pending"],
    tone: "blue",
  },
  {
    id: "PUB-STUB-005",
    featured: false,
    typeCode: "ER",
    type: "Experiment report",
    lane: "Information Mechanics",
    domain: "Information / computation",
    title: "Bounded Possibility and Variational Capacity",
    abstract:
      "Stub treatment for an experiment-centered object connecting a theoretical question to computational probes, negative results, and bounded evidence.",
    claimCeiling: "Placeholder record; experiment results have not been attached.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Experiment shell", "Data pending", "Reproduction pending"],
    tone: "yellow",
  },
  {
    id: "PUB-STUB-006",
    featured: false,
    typeCode: "PI",
    type: "Public-interest analysis",
    lane: "Public Infrastructure Analysis",
    domain: "Civic / institutional systems",
    title: "Inspectable Public Infrastructure Systems",
    abstract:
      "Stub treatment for an evidence-led public-interest analysis with provenance, uncertainty, system boundaries, and a clear distinction between observed state and interpretation.",
    claimCeiling: "Placeholder record; no public-system finding is asserted by this UI stub.",
    sourceState: "NO DOCUMENT BOUND",
    recordState: "UI_STUB",
    surfaces: ["Analysis shell", "Sources pending", "Evidence pending"],
    tone: "orange",
  },
] as const;

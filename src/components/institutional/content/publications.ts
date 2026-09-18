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

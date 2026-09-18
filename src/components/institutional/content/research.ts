export const programs = [
  {
    code: "RM",
    title: "Representational Mechanics",
    role: "Theoretical-core discipline / active research surface",
    status: "Working discipline; claims remain evidence-bounded",
    tone: "working",
    question:
      "How do representations become load-bearing under consequential transformation, coupling, use, failure, repair, and reuse?",
    summary:
      "Constructs and tests typed representations under declared pressures, constraints, boundaries, invariants, closure conditions, and repair obligations.",
  },
  {
    code: "BT",
    title: "Boundary Theory",
    role: "Integrative research program",
    status: "Bounded internal synthesis; independent review pending",
    tone: "review",
    question:
      "Can distinctions, obligations, evidence, authority, defects, repair, composition, and closure be coordinated without erasing domain-native theories?",
    summary:
      "Studies how consequential distinctions and lawful variations are constituted, represented, transformed, composed, assessed, repaired, and promoted across bounded regimes.",
  },
  {
    code: "IM",
    title: "Information Mechanics",
    role: "Active engine-core working theory",
    status: "Internal research / working theory",
    tone: "internal",
    question:
      "What may a system safely forget while preserving the structure required for relevant behavior, observation, inference, and transformation?",
    summary:
      "Studies admissible configurations, reachability, preserved distinctions, safe forgetting, and how those claims can be tested.",
  },
  {
    code: "AG",
    title: "Schemathematics / Atlas Grammars",
    role: "Promoted research program / working formal-method surface",
    status: "Registered lane RL-ATLAS-001",
    tone: "registered",
    question:
      "How can formal structures be indexed, compared, reconstructed, transformed, and searched by what they do rather than only by what they are called?",
    summary:
      "Treats mathematical objects as operative profiles while preserving native mathematics as authoritative.",
  },
  {
    code: "ASM",
    title: "Agentic Scientific Method",
    role: "Active registered research lane and engineered research program",
    status: "Registered lane RL-ASM-001",
    tone: "registered",
    question:
      "What operational machinery is required to construct, test, localize defects in, and repair theories under empirical and structural pressure?",
    summary:
      "Connects theory reification, search, typed theory edits, evaluation, provenance, evidence handling, defect localization, and executable research workflows.",
  },
  {
    code: "CHA",
    title: "Constructive Humanist Agentics",
    role: "Institutional and social-science research concern",
    status: "Published institutional surface; broader formalization remains research",
    tone: "mixed",
    question:
      "How should systems be designed when the people represented by them are themselves agents capable of judgment, refusal, criticism, revision, and repair?",
    summary:
      "Develops agency-centered methods that preserve dignity, contestability, responsibility, and reachable action space.",
  },
  {
    code: "SCR",
    title: "Statistical–Computational Regime",
    role: "Active bounded cross-lane experiment / emerging research surface",
    status: "Routed through ASM + Atlas Grammars + Representational Mechanics",
    tone: "experiment",
    question:
      "Can statistical-mechanical and computational descriptions constrain one another without erasing their native meanings?",
    summary:
      "Uses state, ensemble, transition, coarse-graining, reachability, and representation as a bounded cross-domain experiment rather than a mature standalone lane.",
  },
] as const;

export const principles = [
  ["01", "Systematize before you speculate.", "Begin with machinery that already works. Name inheritance and prior art. Generalize only after comparison."],
  ["02", "Treat representations as operational objects.", "A representation determines which distinctions, operations, and failures are available to the system using it."],
  ["03", "Prefer inspectable artifacts.", "Definitions, experiments, schemas, code, claims, evidence, counterexamples, and status should remain connected where possible."],
  ["04", "Let counterexamples improve the machinery.", "A failed comparison or broken abstraction can identify the exact boundary where a representation stops being useful."],
  ["05", "Preserve agency under consequence.", "Where systems act on people, ask who can understand, choose, contest, refuse, correct, appeal, repair, and remain accountable."],
  ["06", "Leave capability behind.", "A mature research artifact should become increasingly continuable by someone other than its originator."],
] as const;

export const maturityStates = [
  ["Exploration", "A question or comparison is being investigated."],
  ["Conjecture", "A bounded proposition has been stated but not established."],
  ["Working model", "Formal, computational, or operational machinery exists."],
  ["Experimented", "Defined cases have been tested."],
  ["Corroborated", "Relevant evidence or literature materially supports the bounded result."],
  ["Publication candidate", "A bounded artifact is being prepared for external technical review."],
  ["Published", "A public artifact has been released."],
  ["Revised / Superseded / Refuted", "Later evidence changed its status."],
] as const;

export const researchObjectFields = [
  "Governing question",
  "Status",
  "Claims",
  "Evidence",
  "Dependencies",
  "Experiments",
  "Counterexamples & defects",
  "Open questions",
  "Agency / consequence",
  "Stewardship",
  "Related artifacts",
  "Revision history",
] as const;

export const artifactFamilies = [
  ["Working Papers", "Human-readable arguments, analyses, and bounded formal results."],
  ["Experiment Register", "Evidence-bearing attempts, including negative and null outcomes."],
  ["Claim-control ledgers", "Claims, statuses, dependencies, evidence, objections, and unresolved questions where the research object uses them."],
  ["Source & provenance registers", "Literature, evidence, provenance, and supporting material where the research object maintains them."],
  ["Research Deployment Packets", "Portable bundles for external inspection, reproduction, implementation, or handoff."],
  ["Executable Artifacts", "Reference implementations, formal schemas, checkers, transformation systems, and bounded demonstrations."],
] as const;

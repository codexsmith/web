export const programs = [
  {
    code: "RM",
    title: "Representational Mechanics",
    role: "Theoretical-core discipline / active research surface",
    state: "WORKING_DISCIPLINE",
    statusLabel: "PUBLIC POSTURE",
    status: "Working discipline; claims remain evidence-bounded",
    tone: "working",
    question:
      "How do representations become load-bearing under consequential transformation, coupling, use, failure, repair, and reuse?",
    summary:
      "Constructs and tests typed representations under declared pressures, constraints, boundaries, invariants, closure conditions, and repair obligations.",
    workingSurface: [
      "Representation & forgetting audits",
      "Admissibility & invariant testing",
      "Boundary & interface analysis",
      "Transport & composition tests",
      "Counterexamples & repair",
    ],
    boundary:
      "Claims remain evidence-bounded. Where represented systems affect people, adequacy must also account for reachable action, contestability, responsibility, and consequence.",
  },
  {
    code: "BT",
    title: "Boundary Theory",
    role: "Integrative research program",
    state: "INTERNAL_SYNTHESIS",
    statusLabel: "CURRENT SOURCE STATUS",
    status: "Bounded internal synthesis; independent review pending",
    tone: "review",
    question:
      "Can distinctions, obligations, evidence, authority, defects, repair, composition, and closure be coordinated without erasing domain-native theories?",
    summary:
      "Studies how consequential distinctions and lawful variations are constituted, represented, transformed, composed, assessed, repaired, and promoted across bounded regimes.",
    workingSurface: [
      "Distinctions & obligations",
      "Evidence & authority",
      "Defects & repair",
      "Composition & closure",
      "Successor use",
    ],
    boundary:
      "The program does not claim that every scientific, mathematical, engineered, social, or physical system is secretly the same. Useful integration, translation, bounded formal contribution, or failure of the stronger generalization are all admitted outcomes.",
  },
  {
    code: "IM",
    title: "Information Mechanics",
    role: "Active engine-core working theory",
    state: "WORKING_THEORY",
    statusLabel: "CURRENT SOURCE STATUS",
    status: "Internal research / working theory",
    tone: "internal",
    question:
      "What may a system safely forget while preserving the structure required for relevant behavior, observation, inference, and transformation?",
    summary:
      "Studies admissible configurations, reachability, preserved distinctions, safe forgetting, and how those claims can be tested.",
    workingSurface: [
      "Admissible configurations & paths",
      "Reachability",
      "Preserved distinctions",
      "Safe forgetting",
      "Testability",
    ],
    boundary:
      "Databases, automata, transition systems, quotient constructions, testing, and information-related formalisms are calibration and prior-art constraints. In human-facing systems, safe forgetting also carries a stewardship burden.",
  },
  {
    code: "AG",
    title: "Schemathematics / Atlas Grammars",
    role: "Promoted research program / working formal-method surface",
    state: "REGISTERED_LANE",
    statusLabel: "REGISTERED LANE",
    status: "RL-ATLAS-001 — Atlas Grammars / Schemathematics",
    tone: "registered",
    question:
      "How can formal structures be indexed, compared, reconstructed, transformed, and searched by what they do rather than only by what they are called?",
    summary:
      "Treats mathematical objects as operative profiles while preserving native mathematics as authoritative.",
    workingSurface: [
      "Entities & relations",
      "Admissibility",
      "Transforms & invariants",
      "Closure",
      "Information added / forgotten",
      "Failure & provenance",
    ],
    boundary:
      "Native mathematics remains authoritative. The schema is a working representation for a declared use, not proof that a new theorem or mathematical foundation has been established.",
  },
  {
    code: "ASM",
    title: "Agentic Scientific Method",
    role: "Active registered research lane and engineered research program",
    state: "REGISTERED_LANE",
    statusLabel: "REGISTERED LANE",
    status: "RL-ASM-001 — Agentic Scientific Method / Theory Transformation Machinery",
    tone: "registered",
    question:
      "What operational machinery is required to construct, test, localize defects in, and repair theories under empirical and structural pressure?",
    summary:
      "Connects theory reification, search, typed theory edits, evaluation, provenance, evidence handling, defect localization, and executable research workflows.",
    workingSurface: [
      "Theory reification",
      "Possibility-space search",
      "Typed theory edits",
      "Evaluation & defect localization",
      "Provenance & evidence",
      "Executable workflows",
    ],
    boundary:
      "Formal and executable specification work, comparative validation, and pre-runtime engineering exist; the program does not establish a universal architecture for science or a complete theory-transformation calculus. Candidate machinery never silently acquires authority to promote scientific truth.",
  },
  {
    code: "CHA",
    title: "Constructive Humanist Agentics",
    role: "Institutional and social-science research concern",
    state: "PUBLISHED_SURFACE",
    statusLabel: "CURRENT SOURCE POSTURE",
    status: "Published institutional surface; broader formalization remains research",
    tone: "mixed",
    question:
      "How should systems be designed when the people represented by them are themselves agents capable of judgment, refusal, criticism, revision, and repair?",
    summary:
      "Develops agency-centered methods that preserve dignity, contestability, responsibility, and reachable action space.",
    workingSurface: [
      "Human representation",
      "Reachable action & refusal",
      "Contestability & correction",
      "Authority & responsibility",
      "Consequence tracing",
      "Repair & stewardship",
    ],
    boundary:
      "Human agency is primary; agentic is not a synonym for autonomous AI. The program supplies a human-consequence layer to formal work without turning human dignity into a mathematical theorem.",
  },
  {
    code: "SCR",
    title: "Statistical–Computational Regime",
    role: "Active bounded cross-lane experiment / emerging research surface",
    state: "CROSS_LANE_EXPERIMENT",
    statusLabel: "CURRENT ROUTING",
    status: "Agentic Scientific Method + Atlas Grammars + Representational Mechanics",
    tone: "experiment",
    question:
      "Can statistical-mechanical and computational descriptions constrain one another without erasing their native meanings?",
    summary:
      "Uses state, ensemble, transition, coarse-graining, reachability, and representation as a bounded cross-domain experiment rather than a mature standalone lane.",
    workingSurface: [
      "State & ensemble",
      "Transition",
      "Coarse-graining",
      "Reachability",
      "Macrostate / microstate",
      "Distribution & representation",
    ],
    boundary:
      "The current question is mutual constraint and clarification, not whether computation and statistical mechanics are simply the same subject. This remains a bounded cross-lane experiment rather than a mature standalone research lane.",
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

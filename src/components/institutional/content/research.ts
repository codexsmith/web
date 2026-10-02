export const programs = [
  {
    code: "RM",
    title: "Representational Mechanics",
    role: "Core research program about how representations behave under use",
    state: "WORKING_DISCIPLINE",
    statusLabel: "PUBLIC POSTURE",
    status: "Active working program; claims are limited to what current evidence supports",
    tone: "working",
    question:
      "What must a representation preserve when people or systems actually use it, change it, combine it, break it, and repair it?",
    summary:
      "Studies how models, schemas, documents, software state, and other representations behave when they are put under real operational pressure."
    workingSurface: [
      "Representation & forgetting audits",
      "Admissibility & invariant testing",
      "Boundary & interface analysis",
      "Transport & composition tests",
      "Counterexamples & repair",
    ],
    boundary:
      "The program does not assume one representation works everywhere. Where systems affect people, adequacy also includes whether people can understand, challenge, correct, refuse, or appeal consequential outcomes."
  },
  {
    code: "BT",
    title: "Boundary Theory",
    role: "Integrative research program about boundaries, change, evidence, and repair",
    state: "INTERNAL_SYNTHESIS",
    statusLabel: "CURRENT SOURCE STATUS",
    status: "Bounded internal synthesis; independent review pending",
    tone: "review",
    question:
      "Can one small set of concepts help compare how different fields handle boundaries, change, evidence, error, and repair without pretending those fields are the same?",
    summary:
      "Tests whether a shared structural vocabulary can help compare systems across domains while keeping the mathematics, science, engineering, or institutional rules of each domain authoritative."
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
    role: "Working theory about information that can be preserved or safely discarded",
    state: "WORKING_THEORY",
    statusLabel: "CURRENT SOURCE STATUS",
    status: "Internal research / working theory",
    tone: "internal",
    question:
      "What information can a system discard without changing the behavior, observation, inference, or future action that matters?",
    summary:
      "Studies which distinctions must be preserved, which may be safely compressed or forgotten, and how to test those claims."
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
    role: "Formal-methods program for comparing mathematical and structural objects",
    state: "REGISTERED_LANE",
    statusLabel: "REGISTERED LANE",
    status: "RL-ATLAS-001 — Atlas Grammars / Schemathematics",
    tone: "registered",
    question:
      "Can mathematical structures be organized and compared by their operations and behavior, not only by their names or traditional categories?",
    summary:
      "Builds structured descriptions of mathematical objects for comparison, search, and transformation while leaving proofs and native mathematics fully authoritative."
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
    role: "Research program on AI-assisted scientific work and theory revision",
    state: "REGISTERED_LANE",
    statusLabel: "REGISTERED LANE",
    status: "RL-ASM-001 — Agentic Scientific Method / Theory Transformation Machinery",
    tone: "registered",
    question:
      "What tools and safeguards are needed for people and AI systems to build, test, criticize, and revise scientific theories responsibly?",
    summary:
      "Studies workflows for making theories explicit, searching alternatives, tracking evidence and sources, locating failure, and proposing revisions without giving automation authority to declare scientific truth."
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
    role: "Research program on human agency in consequential systems",
    state: "PUBLISHED_SURFACE",
    statusLabel: "CURRENT SOURCE POSTURE",
    status: "Published institutional surface; broader formalization remains research",
    tone: "mixed",
    question:
      "How should systems be designed when the people affected by them can judge, disagree, refuse, appeal, correct, and repair?",
    summary:
      "Develops methods for preserving human agency, dignity, contestability, responsibility, and meaningful choices in consequential systems."
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
    role: "Cross-domain experiment connecting statistical mechanics and computation",
    state: "CROSS_LANE_EXPERIMENT",
    statusLabel: "CURRENT ROUTING",
    status: "Agentic Scientific Method + Atlas Grammars + Representational Mechanics",
    tone: "experiment",
    question:
      "Can statistical mechanics and computation clarify or constrain one another without treating them as the same subject?",
    summary:
      "Runs a bounded comparison using ideas such as state, transition, coarse-graining, reachability, and representation rather than claiming a mature unified theory."
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
  ["01", "Start from what already works.", "Begin with established methods, prior art, and real examples. Generalize only after comparison."],
  ["02", "Treat representations as things that have consequences.", "A model, schema, interface, or document affects what a system can distinguish, do, and fail to notice."],
  ["03", "Keep the evidence close to the claim.", "Definitions, experiments, code, claims, evidence, counterexamples, and status should remain connected where possible."],
  ["04", "Let counterexamples improve the machinery.", "A failed comparison or broken abstraction can identify the exact boundary where a representation stops being useful."],
  ["05", "Preserve agency under consequence.", "Where systems act on people, ask who can understand, choose, contest, refuse, correct, appeal, repair, and remain accountable."],
  ["06", "Make the work continuable.", "Mature research should become easier for another qualified person to inspect, reproduce, criticize, and continue."],
] as const;

export const maturityStates = [
  ["Exploration", "A question or comparison is being investigated."],
  ["Conjecture", "A specific proposition has been stated but not established."],
  ["Working model", "A formal, computational, or operational version of the idea exists."],
  ["Experimented", "Defined cases have been tested."],
  ["Corroborated", "Relevant evidence or prior work materially supports the result within its stated scope."],
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
  ["Claim records", "Current claims, status, evidence, objections, dependencies, and unresolved questions where the research object uses them."],
  ["Source records", "Literature, data, evidence, software, standards, and other supporting material, with enough provenance to show where they came from."],
  ["Research Deployment Packets", "Portable research bundles designed for outside inspection, reproduction, implementation, or handoff."],
  ["Executable Artifacts", "Reference implementations, formal schemas, checkers, transformation systems, and bounded demonstrations."],
] as const;

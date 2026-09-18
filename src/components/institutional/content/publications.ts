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
 * Source-bound v3 publication selection.
 *
 * This is a curated first-contact projection, not a publication-status promotion.
 * Status, readiness, claim ceilings, and next gates are inherited from the Lab's
 * publication program, publication graph, systems-kernel publication candidates,
 * and the existing public publication portfolio.
 */
export const selectedPublications = [
  {
    id: "pub-closure-driven-development",
    featured: true,
    typeCode: "WP",
    type: "Working paper",
    lane: "Boundary First Engineering",
    domain: "Software engineering / delivery methodology",
    title: "Closure-Driven Software Development",
    abstract:
      "A Boundary First engineering method for turning uncertainty into executable evidence before unresolved assumptions harden into architecture. The manuscript organizes delivery as progressive closure: discover, bound, build the delivery skeleton, execute, witness, then repair or promote.",
    claimCeiling:
      "Advanced practitioner draft. The current source does not establish that the method outperforms established engineering practice; worked cases, literature comparison, and external practitioner review remain publication gates.",
    sourceState: "WEB PORTFOLIO + LAB PROGRAM",
    recordState: "SELECTED · DRAFT",
    sourceRef: "src/lib/publication-portfolio.ts + Lab publication_program.md",
    nextGate: "Worked cases, practitioner review, literature comparison, and release editing.",
    surfaces: ["Working manuscript", "Method source", "Worked cases pending", "External review pending"],
    tone: "blue",
  },
  {
    id: "pub-corpus-forge-provenance",
    featured: false,
    typeCode: "WP",
    type: "Working paper",
    lane: "Corpus Forge",
    domain: "Research methods / information science",
    title: "Corpus Forge: Provenance and Claim Discipline for AI-Assisted Knowledge Work",
    abstract:
      "A research-methods paper centered on the Operator–Critic–Human Gate workflow and durable source, claim, provenance, and promotion records for AI-assisted knowledge work.",
    claimCeiling:
      "Near-term publication candidate. The protocol is substantial, but publication still requires a live vertical-slice study; the machinery does not treat AI-generated fluency or execution as scientific validation.",
    sourceState: "LAB PUBLICATION PROGRAM",
    recordState: "SELECTED · CANDIDATE",
    sourceRef: "Lab publication_program.md §4.1 / submission Phase A",
    nextGate: "Execute and document a live Corpus Forge vertical slice with bounded evaluation and failure analysis.",
    surfaces: ["Protocol", "Claim / source records", "Vertical slice pending", "Human gate required"],
    tone: "green",
  },
  {
    id: "target-6a-interface-contracts",
    featured: false,
    typeCode: "WP",
    type: "Working paper",
    lane: "Boundary-First Systems Kernel",
    domain: "Formal methods / interface and contract theory",
    title: "Consequence- and Provenance-Aware Interface Contracts: A Translation Study from Boundary-First System Records",
    abstract:
      "A translation study that maps Boundary-First consequence, provenance, responsibility, repair, and forgetting records into an established interface or contract formalism, then tests what ordinary judgments are preserved and what the translation forgets.",
    claimCeiling:
      "Academic candidate, not a new generic interface theory. Conservative decoration, a non-reducibility witness, and full redundancy are all acceptable outcomes; the contribution must survive direct comparison with mature interface and contract semantics.",
    sourceState: "SYSTEM KERNEL CANDIDATE",
    recordState: "SELECTED · TARGET-6A",
    sourceRef: "Lab system_kernel/publication_candidates.md",
    nextGate: "Choose a mature interface or contract formalism, define the translation, and complete preservation / forgetting tests.",
    surfaces: ["Translation study", "Prior-art audit", "Preservation test", "Redundancy is valid"],
    tone: "gold",
  },
  {
    id: "im_database_calibration",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Information Mechanics",
    domain: "Databases / information / computation",
    title: "Relational Databases as Information Mechanics",
    abstract:
      "A Boundary-native Information Mechanics paper using relational databases as a calibration domain for retained and forgotten distinctions, reconstruction obligations, testing, reachability, and failure.",
    claimCeiling:
      "Controlled Stage C candidate. The current publication gate requires theorem audit, calibrated novelty posture, and external review; database-theory machinery is treated as calibration and prior art rather than re-invention.",
    sourceState: "PUBLICATION GRAPH · CONTROLLED",
    recordState: "SELECTED · C5",
    sourceRef: "PUBLICATION_GRAPH.json#im_database_calibration",
    nextGate: "Theorem audit, calibrated novelty posture, and external review.",
    surfaces: ["Stage C", "Readiness 5", "Source-read priority", "External review pending"],
    tone: "yellow",
  },
  {
    id: "im_admissible_forgetting",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Information Mechanics",
    domain: "Information / representation / computation",
    title: "Admissible Forgetting",
    abstract:
      "A Boundary-native Information Mechanics paper asking which distinctions a representation may safely forget relative to the testing, reachability, reconstruction, and consequence obligations that must survive.",
    claimCeiling:
      "Controlled Stage C candidate. The paper remains bounded by its static theorem audit and prior-art completion gate; it does not claim that ordinary quotient, abstraction, or reduction machinery is novel.",
    sourceState: "PUBLICATION GRAPH · CONTROLLED",
    recordState: "SELECTED · C5",
    sourceRef: "PUBLICATION_GRAPH.json#im_admissible_forgetting",
    nextGate: "Complete static theorem audit and prior-art review.",
    surfaces: ["Stage C", "Readiness 5", "Source-read priority", "Theorem audit pending"],
    tone: "orange",
  },
  {
    id: "math_quotient_spaces",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Classical mathematics calibration",
    domain: "Algebra / topology",
    title: "Quotient Spaces and Equivalence Relations as Admissible Forgetting",
    abstract:
      "A Boundary First reading of ordinary quotient mathematics: a quotient deliberately ceases to distinguish objects equivalent under a declared relation, with the universal property making the allowed forgetting explicit.",
    claimCeiling:
      "Controlled Stage A classical reading. The point is calibration and translation: forgetting distinctions here is ordinary quotient mathematics when the equivalence relation is justified, not a claim to a new quotient theory.",
    sourceState: "PUBLICATION GRAPH · CONTROLLED",
    recordState: "SELECTED · A4",
    sourceRef: "PUBLICATION_GRAPH.json#math_quotient_spaces",
    nextGate: "Complete source-read manuscript treatment and preserve the unsafe-identification counterexample.",
    surfaces: ["Stage A", "Readiness 4", "Classical calibration", "Counterexample retained"],
    tone: "blue",
  },
  {
    id: "phys_partial_trace",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Classical physics calibration",
    domain: "Quantum information",
    title: "Partial Trace as Admissible Forgetting",
    abstract:
      "A Boundary First reading of subsystem reduction in quantum information: global distinctions are erased while a declared class of local observables is preserved, and erased correlations cannot be inferred from the reduced state alone.",
    claimCeiling:
      "Controlled Stage A classical reading. Adequacy is relative to the observation algebra; successful subsystem reduction does not make discarded global correlations recoverable or establish new quantum theory.",
    sourceState: "PUBLICATION GRAPH · CONTROLLED",
    recordState: "SELECTED · A5",
    sourceRef: "PUBLICATION_GRAPH.json#phys_partial_trace",
    nextGate: "Complete source-read treatment around the Bell-state control, local expectations, contraction, and lost-correlation witness.",
    surfaces: ["Stage A", "Readiness 5", "Quantum information", "Lost-correlation witness"],
    tone: "green",
  },
  {
    id: "phys_maxwell_gauss",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Classical physics calibration",
    domain: "Electromagnetism",
    title: "Gauss’s Law and Maxwell Boundary Conditions",
    abstract:
      "A Boundary First reading of electromagnetism in which sources, fluxes, and interface matching are connected by exact field equations and jump conditions, making boundary structure literal rather than metaphorical.",
    claimCeiling:
      "Controlled Stage A classical reading. The governing equations and interface conditions are established electromagnetism; the contribution is a bounded translation and calibration, not a replacement or extension of Maxwell theory.",
    sourceState: "PUBLICATION GRAPH · CONTROLLED",
    recordState: "SELECTED · A4",
    sourceRef: "PUBLICATION_GRAPH.json#phys_maxwell_gauss",
    nextGate: "Complete source-read treatment of integral Gauss law, interface conditions, and surface charge/current examples.",
    surfaces: ["Stage A", "Readiness 4", "Electromagnetism", "Interface conditions"],
    tone: "gold",
  },
] as const;

/**
 * Supporting v3 publication rail.
 *
 * These records remain controlled Paper Mine/publication-graph objects. Their
 * inclusion here is editorial discovery only; it does not promote stage,
 * readiness, review state, or scientific authority.
 */
export const publicationStrip = [
  {
    id: "math_schur_dtn",
    stage: "A",
    readiness: 5,
    discipline: "Mathematics",
    domain: "Linear algebra / numerical analysis / PDE",
    title: "Schur Complements, Static Condensation, and Dirichlet-to-Neumann Reduction",
    summary:
      "Interior degrees of freedom may be eliminated while retaining the response required at an exposed boundary. Schur reduction becomes an exact calibration of obligation-relative forgetting.",
    sourceRef: "PUBLICATION_GRAPH.json#math_schur_dtn",
    signals: ["Exact reduction", "Boundary response", "Source-read priority"],
    tone: "blue",
  },
  {
    id: "phys_petz",
    stage: "A",
    readiness: 5,
    discipline: "Physics",
    domain: "Quantum information / operator algebras",
    title: "Petz Recovery: Recovery Is Not Inversion",
    summary:
      "Recovery depends on the channel, reference state, and sufficient family. Successful recovery is conditional and typed; it does not make coarse-graining globally invertible.",
    sourceRef: "PUBLICATION_GRAPH.json#phys_petz",
    signals: ["Recovery", "Sufficiency", "Source-read priority"],
    tone: "green",
  },
  {
    id: "math_poincare_perelman",
    stage: "A",
    readiness: 5,
    discipline: "Mathematics",
    domain: "Geometric topology / geometric analysis",
    title: "Poincaré–Perelman as a Boundary Repair Architecture",
    summary:
      "Ricci flow exposes continuation defects while surgery performs controlled local repair under global proof obligations, without altering the status or content of Perelman’s theorem.",
    sourceRef: "PUBLICATION_GRAPH.json#math_poincare_perelman",
    signals: ["Repair", "Monotone witness", "Proof-status firewall"],
    tone: "gold",
  },
  {
    id: "math_galerkin",
    stage: "A",
    readiness: 5,
    discipline: "Mathematics",
    domain: "Numerical analysis / PDE",
    title: "Galerkin Projection as Obligation-Preserving Reduction",
    summary:
      "Projection may forget degrees of freedom only relative to the quantity, norm, or proof obligation that must survive. Later obligations can require reopening the representation.",
    sourceRef: "PUBLICATION_GRAPH.json#math_galerkin",
    signals: ["Projection", "Error obligation", "Source-read priority"],
    tone: "yellow",
  },
  {
    id: "phys_cr3bp",
    stage: "A",
    readiness: 5,
    discipline: "Physics",
    domain: "Celestial mechanics / dynamical systems",
    title: "CR3BP: Hill Regions and Transport Boundaries",
    summary:
      "Integrals and invariant structures define admissible regions and transport channels in phase space, making boundary language concrete as reachable dynamical geometry.",
    sourceRef: "PUBLICATION_GRAPH.json#phys_cr3bp",
    signals: ["Transport", "Reachability", "Phase space"],
    tone: "orange",
  },
  {
    id: "phys_gauge",
    stage: "A",
    readiness: 4,
    discipline: "Physics",
    domain: "Classical / quantum gauge theory",
    title: "Gauge Symmetry: Redundant Representation versus Physical Distinction",
    summary:
      "Different mathematical descriptions may encode the same physical state. Representational difference must not be promoted to physical difference without gauge-invariant content.",
    sourceRef: "PUBLICATION_GRAPH.json#phys_gauge",
    signals: ["Gauge", "Equivalence", "Invariant content"],
    tone: "blue",
  },
  {
    id: "math_sheaves",
    stage: "A",
    readiness: 4,
    discipline: "Mathematics",
    domain: "Topology / algebraic geometry",
    title: "Sheaves and Gluing as Local-to-Global Closure",
    summary:
      "Local representations form a global object only when overlap and compatibility obligations close; failed gluing makes the local-to-global defect explicit.",
    sourceRef: "PUBLICATION_GRAPH.json#math_sheaves",
    signals: ["Gluing", "Compatibility", "Local → global"],
    tone: "green",
  },
  {
    id: "cs_cegar",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Formal methods / verification",
    title: "Abstract Interpretation and CEGAR as Distinction Forgetting and Repair",
    summary:
      "Abstraction forgets distinctions; spurious counterexamples witness harmful forgetting; refinement restores what the proof obligation requires.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_cegar",
    signals: ["Abstraction", "Witness", "Repair loop"],
    tone: "gold",
  },
] as const;

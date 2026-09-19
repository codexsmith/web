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
 * Source-governed v3 publication selection.
 *
 * These are curated first-contact records over three distinct publication-control
 * authorities. The website may select and orient records; it must not translate
 * routing/readiness/planning state into publication promotion or scientific authority.
 */
export type PublicationSourceKind =
  | "publication_sequence"
  | "publication_graph"
  | "publication_source_registry";

export type PublicationDependency = {
  id: string;
  title: string;
  status: string;
};

export type PublicationRecord = {
  id: string;
  featured: boolean;
  typeCode: string;
  type: string;
  lane: string;
  domain: string;
  title: string;
  orientation: string;
  claimCeiling: string;
  sourceKind: PublicationSourceKind;
  sourceRegistryId: string;
  sourceLabel: string;
  sourceState: string;
  recordState: string;
  statusLabel: string;
  sourceRef: string;
  sourceHref: string;
  sourceAuthority: string;
  stage?: string;
  readiness?: number;
  readinessHint?: number;
  wave?: number;
  claimRisk?: string;
  publicationGate?: string;
  priority?: string;
  dependencies?: readonly PublicationDependency[];
  evidencePlan?: readonly string[];
  feeds?: readonly string[];
  surfaces: readonly string[];
  tone: "blue" | "green" | "gold" | "yellow" | "orange";
};

export const publicationProjection = {
  sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15",
  sourceRevisionDate: "2026-09-18",
  authority:
    "The public catalog is a curated projection. Sequence position, graph readiness, source registration, and website selection do not establish publication, peer review, truth, novelty, or release authorization.",
  sources: [
    {
      registryId: "REG-PUBLICATION-SEQUENCE",
      label: "Publication Sequence",
      recordCount: 24,
      role: "Governance / dependency state",
      authority:
        "publication planning, sequence, and dependency-control state only; no scientific validity, readiness guarantee, publication promotion, truth, novelty, or release authorization",
      href:
        "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/04_publication_governance__operations/publication_program/publication_sequence.json",
    },
    {
      registryId: "REG-PUBLICATION-GRAPH",
      label: "Global Publication Graph",
      recordCount: 112,
      role: "Routing / readiness projection",
      authority:
        "operational publication routing, dependency, and readiness analysis only; no local scientific authority, publication promotion, institutional promotion, or source-state replacement",
      href:
        "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    },
    {
      registryId: "REG-PUBLICATION-SOURCES",
      label: "Publication Source Registry",
      recordCount: 10,
      role: "Identity / provenance routing",
      authority:
        "source identity, provenance, import decision, local/canonical correspondence, and routing metadata only; local publication-control artifacts remain authoritative and registration does not promote publication state",
      href:
        "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_SOURCE_REGISTRY.json",
    },
  ],
} as const;

const sequenceAuthority =
  publicationProjection.sources[0].authority;
const graphAuthority =
  publicationProjection.sources[1].authority;
const sourceRegistryAuthority =
  publicationProjection.sources[2].authority;

export const selectedPublications: readonly PublicationRecord[] = [
  {
    id: "PUB-001",
    featured: true,
    typeCode: "WP",
    type: "Working paper",
    lane: "Applied method",
    domain: "Software engineering / delivery methodology",
    title: "Closure-Driven Software Development",
    orientation:
      "A Boundary First engineering method for turning uncertainty into executable evidence before unresolved assumptions harden into architecture. The current public orientation follows the source sequence record without treating sequence state as external validation.",
    claimCeiling: "method proposal with worked case and comparative analysis",
    sourceKind: "publication_sequence",
    sourceRegistryId: "REG-PUBLICATION-SEQUENCE",
    sourceLabel: "Publication Sequence",
    sourceState: "adversarially_tested",
    recordState: "adversarially_tested",
    statusLabel: "SEQUENCE STATUS",
    sourceRef:
      "04_Operations/04_publication_governance__operations/publication_program/publication_sequence.json#PUB-001",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/04_publication_governance__operations/publication_program/publication_sequence.json",
    sourceAuthority: sequenceAuthority,
    wave: 1,
    dependencies: [
      { id: "EN-003", title: "Software Worked-Case Pack", status: "source_complete" },
      { id: "EN-005", title: "Independent Review Roster", status: "planned" },
      { id: "EN-006", title: "Publication Declaration Template", status: "complete_internal" },
    ],
    surfaces: ["Wave 1", "adversarially_tested", "EN-005 planned"],
    tone: "blue",
  },
  {
    id: "PUB-002",
    featured: false,
    typeCode: "WP",
    type: "Working paper",
    lane: "Research methods",
    domain: "Research methods / information science",
    title: "Corpus Forge: Provenance and Claim Discipline for AI-Assisted Knowledge Work",
    orientation:
      "A research-methods publication record centered on durable source, claim, provenance, criticism, and human-promotion controls for AI-assisted knowledge work.",
    claimCeiling: "protocol and case study",
    sourceKind: "publication_sequence",
    sourceRegistryId: "REG-PUBLICATION-SEQUENCE",
    sourceLabel: "Publication Sequence",
    sourceState: "adversarially_tested",
    recordState: "adversarially_tested",
    statusLabel: "SEQUENCE STATUS",
    sourceRef:
      "04_Operations/04_publication_governance__operations/publication_program/publication_sequence.json#PUB-002",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/04_publication_governance__operations/publication_program/publication_sequence.json",
    sourceAuthority: sequenceAuthority,
    wave: 1,
    dependencies: [
      { id: "EN-004", title: "Corpus Forge Vertical-Slice Pack", status: "adversarially_tested" },
      { id: "EN-005", title: "Independent Review Roster", status: "planned" },
      { id: "EN-006", title: "Publication Declaration Template", status: "complete_internal" },
    ],
    surfaces: ["Wave 1", "adversarially_tested", "EN-005 planned"],
    tone: "green",
  },
  {
    id: "systems_interface_contracts",
    featured: false,
    typeCode: "WP",
    type: "Working paper candidate",
    lane: "Boundary-First Systems Kernel",
    domain: "Formal methods / interface and contract theory",
    title:
      "Consequence- and Provenance-Aware Interface Contracts: A Translation Study from Boundary-First System Records",
    orientation:
      "A source-registered translation-study candidate asking what Boundary-First consequence and provenance records preserve, add, or forget when mapped into established interface or contract formalisms.",
    claimCeiling:
      "typed provenance-aware systems metamodel under translation testing; no new generic interface/contract/refinement/equivalence/substitutability theory",
    sourceKind: "publication_source_registry",
    sourceRegistryId: "REG-PUBLICATION-SOURCES",
    sourceLabel: "Publication Source Registry",
    sourceState: "post prior-art audit publication planning",
    recordState: "readiness_hint 3",
    statusLabel: "READINESS HINT",
    sourceRef:
      "PUBLICATION_SOURCE_REGISTRY.json#src_system_kernel_publications / canonical_id=systems_interface_contracts",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_SOURCE_REGISTRY.json",
    sourceAuthority: sourceRegistryAuthority,
    readinessHint: 3,
    priority: "highest",
    surfaces: ["Canonical candidate ID", "Readiness hint 3", "Priority highest"],
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
    orientation:
      "A Boundary-native Information Mechanics publication node using relational databases as a calibration domain for retained and forgotten distinctions, reconstruction obligations, testing, reachability, and failure.",
    claimCeiling:
      "candidate new formal contribution; requires full prior-art, theorem, countermodel, and review gates",
    sourceKind: "publication_graph",
    sourceRegistryId: "REG-PUBLICATION-GRAPH",
    sourceLabel: "Global Publication Graph",
    sourceState: "Stage C / readiness 5",
    recordState: "Stage C · readiness 5",
    statusLabel: "ROUTING STATE",
    sourceRef: "PUBLICATION_GRAPH.json#im_database_calibration",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    sourceAuthority: graphAuthority,
    stage: "C",
    readiness: 5,
    publicationGate: "theorem audit, calibrated novelty posture, external review",
    surfaces: ["Stage C", "Readiness 5", "External review gate"],
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
    orientation:
      "A Boundary-native Information Mechanics publication node asking which distinctions a representation may safely forget relative to testing, reachability, reconstruction, and consequence obligations.",
    claimCeiling:
      "candidate new formal contribution; requires full prior-art, theorem, countermodel, and review gates",
    sourceKind: "publication_graph",
    sourceRegistryId: "REG-PUBLICATION-GRAPH",
    sourceLabel: "Global Publication Graph",
    sourceState: "Stage C / readiness 5",
    recordState: "Stage C · readiness 5",
    statusLabel: "ROUTING STATE",
    sourceRef: "PUBLICATION_GRAPH.json#im_admissible_forgetting",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    sourceAuthority: graphAuthority,
    stage: "C",
    readiness: 5,
    publicationGate: "static theorem audit and prior-art completion",
    surfaces: ["Stage C", "Readiness 5", "Theorem audit gate"],
    tone: "orange",
  },
  {
    id: "math_quotient_spaces",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Boundary Readings of Classical Mathematics",
    domain: "Algebra / topology",
    title: "Quotient Spaces and Equivalence Relations as Admissible Forgetting",
    orientation:
      "A classical-mathematics calibration node: a quotient deliberately ceases to distinguish objects equivalent under a declared relation.",
    claimCeiling:
      "interpretive synthesis; underlying theorem or construction remains established native mathematics",
    sourceKind: "publication_graph",
    sourceRegistryId: "REG-PUBLICATION-GRAPH",
    sourceLabel: "Global Publication Graph",
    sourceState: "Stage A / readiness 4",
    recordState: "Stage A · readiness 4",
    statusLabel: "ROUTING STATE",
    sourceRef: "PUBLICATION_GRAPH.json#math_quotient_spaces",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    sourceAuthority: graphAuthority,
    stage: "A",
    readiness: 4,
    claimRisk: "low",
    evidencePlan: [
      "set/group/topological quotient examples",
      "universal property",
      "unsafe identification counterexample",
    ],
    feeds: ["syn_controlled_forgetting_math_physics", "schem_exact_quotients"],
    surfaces: ["Stage A", "Readiness 4", "Claim risk low"],
    tone: "blue",
  },
  {
    id: "phys_partial_trace",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Boundary Readings of Classical Physics",
    domain: "Quantum information",
    title: "Partial Trace as Admissible Forgetting",
    orientation:
      "A classical-physics calibration node in which subsystem reduction erases global distinctions while preserving a declared class of local observables.",
    claimCeiling:
      "interpretive synthesis; established mathematical structure must be separated from physical interpretation and empirical adequacy",
    sourceKind: "publication_graph",
    sourceRegistryId: "REG-PUBLICATION-GRAPH",
    sourceLabel: "Global Publication Graph",
    sourceState: "Stage A / readiness 5",
    recordState: "Stage A · readiness 5",
    statusLabel: "ROUTING STATE",
    sourceRef: "PUBLICATION_GRAPH.json#phys_partial_trace",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    sourceAuthority: graphAuthority,
    stage: "A",
    readiness: 5,
    claimRisk: "low",
    evidencePlan: [
      "Bell-state vs maximally mixed control",
      "local expectation preservation",
      "relative entropy contraction",
      "lost-correlation witness",
    ],
    feeds: [
      "syn_controlled_forgetting_math_physics",
      "syn_recovery_not_inverse",
      "rm_commuting_reductions",
    ],
    surfaces: ["Stage A", "Readiness 5", "Claim risk low"],
    tone: "green",
  },
  {
    id: "phys_maxwell_gauss",
    featured: false,
    typeCode: "RN",
    type: "Research note",
    lane: "Boundary Readings of Classical Physics",
    domain: "Electromagnetism",
    title: "Gauss’s Law and Maxwell Boundary Conditions",
    orientation:
      "A classical-physics calibration node connecting sources, fluxes, interface matching, exact field equations, and jump conditions.",
    claimCeiling:
      "interpretive synthesis; established mathematical structure must be separated from physical interpretation and empirical adequacy",
    sourceKind: "publication_graph",
    sourceRegistryId: "REG-PUBLICATION-GRAPH",
    sourceLabel: "Global Publication Graph",
    sourceState: "Stage A / readiness 4",
    recordState: "Stage A · readiness 4",
    statusLabel: "ROUTING STATE",
    sourceRef: "PUBLICATION_GRAPH.json#phys_maxwell_gauss",
    sourceHref:
      "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/04_Operations/01_daily_operations__operations/publication_graph/PUBLICATION_GRAPH.json",
    sourceAuthority: graphAuthority,
    stage: "A",
    readiness: 4,
    claimRisk: "low",
    evidencePlan: [
      "integral Gauss law",
      "interface boundary conditions",
      "surface charge/current examples",
    ],
    feeds: ["syn_bulk_boundary_transport"],
    surfaces: ["Stage A", "Readiness 4", "Claim risk low"],
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
    id: "cs_database_normalization",
    stage: "A",
    readiness: 4,
    discipline: "Computer science",
    domain: "Database theory",
    title: "Relational Normalization and Lossless Join as Admissible Forgetting",
    summary:
      "Decomposition forgets structure only when dependencies permit exact reconstruction without spurious tuples. Lossless join becomes a precise reconstruction obligation rather than a loose analogy.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_database_normalization",
    signals: ["Normalization", "Lossless join", "Source-read priority"],
    tone: "blue",
  },
  {
    id: "cs_myhill_nerode",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Automata / formal languages",
    title: "Myhill–Nerode as Admissible Forgetting",
    summary:
      "State distinctions may be forgotten exactly when no admissible future observation distinguishes them. Minimal DFA construction becomes an exact observational quotient preserving language behavior.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_myhill_nerode",
    signals: ["Automata", "State quotient", "Future observation"],
    tone: "green",
  },
  {
    id: "cs_dynamic_programming",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Algorithms / optimization",
    title: "Dynamic Programming as Sufficient State Retention",
    summary:
      "History may be forgotten only when the retained state preserves every distinction relevant to future optimal continuation. DP state design is therefore a concrete sufficiency problem.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_dynamic_programming",
    signals: ["State", "Sufficiency", "Bellman principle"],
    tone: "gold",
  },
  {
    id: "cs_compilers",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Compilers / programming languages",
    title: "Compiler Pipelines as Representation-Preserving Transport",
    summary:
      "Each intermediate representation is a representation boundary; compiler passes transport state while preserving declared semantics and forgetting only distinctions irrelevant to the target obligation.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_compilers",
    signals: ["IR", "Transport", "Semantics preservation"],
    tone: "yellow",
  },
  {
    id: "cs_mapreduce",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Distributed data processing",
    title: "MapReduce as Boundary Formation, Equivalence, and Closure",
    summary:
      "Shuffle forms intermediate equivalence classes, reduce closes each class, and combiner legality depends on composable local closure. Key design determines what the computation preserves or forgets.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_mapreduce",
    signals: ["Distributed systems", "Equivalence classes", "Closure"],
    tone: "orange",
  },
  {
    id: "cs_dijkstra",
    stage: "A",
    readiness: 3,
    discipline: "Computer science",
    domain: "Graph algorithms",
    title: "Dijkstra’s Algorithm as a Moving Closure Frontier",
    summary:
      "A settled vertex crosses a frontier when no remaining admissible path can improve its distance. Nonnegative weights are the condition that makes this finalization monotone and lawful.",
    sourceRef: "PUBLICATION_GRAPH.json#cs_dijkstra",
    signals: ["Graph algorithms", "Invariant", "Closure frontier"],
    tone: "blue",
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
    tone: "green",
  },
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
    tone: "gold",
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
    tone: "yellow",
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
    tone: "orange",
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
    tone: "blue",
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
    tone: "green",
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
    tone: "gold",
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
    tone: "yellow",
  },
] as const;

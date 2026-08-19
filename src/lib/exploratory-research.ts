import type { ContentNode, Inspection } from "@/lib/content";

export const exploratoryResearchInspections: Inspection[] = [
  {
    id: "exploratory-poincare",
    label: "Poincaré Reformulation",
    eyebrow: "Worked calibration example · solved target",
    summary:
      "Use a solved topological target to test whether a Boundary First / Schemathematics reformulation preserves the native problem, recovers the established result, and makes structure more reconstructable without being presented as a new proof.",
    bullets: [
      "The solved target is useful precisely because the representation cannot hide behind an unknown answer: the reformulation has to recover known mathematics rather than merely look suggestive.",
      "The native topological objects, hypotheses, and conclusion remain authoritative; Boundary First language is introduced only after the original problem is stated cleanly.",
      "The research task is to declare the map from the standard formulation into the proposed distinctions, boundaries, admissibility conditions, transformations, and invariants, then identify what survives and what is only explanatory language.",
      "A useful reformulation may expose structure or improve navigation without changing the theorem or constituting a new proof.",
      "Any claim of formal equivalence, independent proof, simplification of the accepted proof architecture, or mathematical novelty would require a complete argument and independent mathematical review.",
      "Current website role: worked calibration example for the reformulation method. The named retained source record still needs to be migrated into the public registry.",
    ],
    sourceRef:
      "Founder-directed v2 migration; named Poincaré reformulation source record pending linkage into the public registry.",
    links: [
      {
        label: "Schemathematics",
        href: "/schemathematics",
        eyebrow: "Operational mathematics research",
        summary: "The broader program for making mathematical objects, transformations, admissibility, invariants, and defects operationally inspectable.",
      },
      {
        label: "Formal Theory",
        href: "/research/formal-theory",
        eyebrow: "Claim and proof boundary",
        summary: "Where reformulations must cross into definitions, equivalence, theorem obligations, proof, and external checking.",
      },
    ],
  },
  {
    id: "exploratory-navier-stokes",
    label: "Navier–Stokes Regularity",
    eyebrow: "Interpretive + experimental PDE program",
    summary:
      "Boundary, flux, defect, and transform reformulations of flow are tested against standard PDE structure, numerical baselines, weather simulation, and explicit regularity proof obligations.",
    bullets: [
      "The retained flow program includes Navier–Stokes Mellin defect profiles, boundary/flux continuity, and flow-regime classification as candidate representational machinery.",
      "Weather provides a bounded empirical multiscale surface where transport, conservation, defect, prediction, and correction can be tested against real measurements and established numerical practice.",
      "The standard Navier–Stokes equations, accepted PDE results, and competent numerical baselines remain the reference objects; a new vocabulary does not replace them.",
      "Interpretive usefulness, stable simulations, or better diagnostic plots do not establish global regularity or resolve the Millennium problem.",
      "Any progress claim on the open regularity problem requires an exact relationship to the standard statement and a valid proof, not numerical evidence alone.",
    ],
    sourceRef:
      "src/content/nodes.json · flow/weather research program + deep-problem-target-register",
    links: [
      {
        label: "Boundary First Weather",
        href: "/research/applied-testbeds/weather",
        eyebrow: "Empirical testbed",
        summary: "The measurement and simulation surface closest to the flow reformulation work.",
      },
      {
        label: "Formal Theory",
        href: "/research/formal-theory",
        eyebrow: "Proof boundary",
      },
    ],
  },
  {
    id: "exploratory-yang-mills",
    label: "Yang–Mills Mass Gap",
    eyebrow: "Constrained mathematical-physics target",
    summary:
      "Gauge, particle, Clifford, spectral, and admissibility representations are compared as possible reformulation machinery around the Yang–Mills mass-gap target; no mass-gap solution is claimed.",
    bullets: [
      "The standard Yang–Mills target is stated first; the exploratory register does not redefine success around Boundary First terminology.",
      "The retained particle/gauge program compares gauge structures, Lie and Clifford algebras, spectral triples, noncommutative geometry, spin, charge, and particle representations as candidate structural bridges.",
      "Current standing is seed/constrained mathematical-physics research, not a completed construction of the required four-dimensional quantum Yang–Mills theory and mass gap.",
      "A mathematically coherent model does not inherit empirical physical standing merely because its structures resemble accepted gauge physics.",
      "Any progress claim on the mass-gap problem requires an exact new mathematical object or equivalence, the corresponding theorem obligations, proof, and independent expert review.",
    ],
    sourceRef:
      "src/content/nodes.json · deep-problem-target-register + particle-gauge-program",
    links: [
      {
        label: "Formal Theory",
        href: "/research/formal-theory",
        eyebrow: "Mathematical claim boundary",
      },
      {
        label: "Foundations",
        href: "/research/foundations",
        eyebrow: "Primitive structure",
      },
    ],
  },
  {
    id: "exploratory-p-vs-np",
    label: "P vs NP",
    eyebrow: "Conjectural complexity reformulation",
    summary:
      "Certificate boundaries, reconstruction cost, and candidate computational invariants are investigated as reformulation tools; none is treated as P vs NP progress until equivalence and theorem obligations are met.",
    bullets: [
      "The standard complexity-theoretic problem must be stated exactly before introducing a Boundary First or Schemathematics representation.",
      "A candidate certificate-boundary, reconstruction-cost, or computational-twist object has to be genuinely new or operationally useful rather than a restatement of known complexity language.",
      "Equivalence to the original P vs NP question must be proved before a result about the reformulation can be promoted as progress on the original problem.",
      "The retained computational-twist invariant is a theorem target, not an established theorem.",
      "Heuristics, simulations, empirical separations, solver behavior, or suggestive complexity diagrams cannot settle a complexity-class separation.",
    ],
    sourceRef:
      "src/content/nodes.json · deep-problem-target-register + complexity research registry",
    links: [
      {
        label: "Formal Theory",
        href: "/research/formal-theory",
        eyebrow: "Proof and equivalence boundary",
      },
      {
        label: "Schemathematics",
        href: "/schemathematics",
        eyebrow: "Representation research",
      },
    ],
  },
  {
    id: "exploratory-fine-structure-unification",
    label: "Fine-Structure Constant & GUT",
    eyebrow: "Restricted derivation audit · unification-adjacent physics",
    summary:
      "Geometric and spectral derivation candidates for the fine-structure constant are audited alongside gauge/particle and Planck-regime unification-adjacent programs, with mathematical consistency kept separate from physical evidence.",
    bullets: [
      "The fine-structure audit explores six-dimensional decompositions, boundary products, heat-kernel/zeta structures, Dirichlet-to-Neumann response, and spectral stiffness as candidate non-fitted derivation machinery.",
      "Its retained ledger is designed to expose assumptions, units, normalization, numerical sensitivity, competing explanations, failed routes, and relevant literature rather than hiding them behind a close numerical value.",
      "Numerical agreement with the measured fine-structure constant is not a first-principles derivation unless every dependency and audit gate survives.",
      "The particle/gauge program compares Standard Model, gauge, Clifford, Lie, and spectral structures; the Planck-regime program probes coupled quantum/spacetime closure and scale limits.",
      "These are unification-adjacent research programs, not a claimed Grand Unified Theory, completed unification, or experimentally validated extension of the Standard Model.",
      "Physical promotion requires dimensional consistency, recovery of known physics, numerical reproduction, literature comparison, observable consequences, empirical testing where possible, and external review.",
    ],
    sourceRef:
      "src/content/nodes.json · fine-structure-constant-program + fine-structure-ledger + particle-gauge-program + planck-regime-program",
    links: [
      {
        label: "Formal Theory",
        href: "/research/formal-theory",
        eyebrow: "Formal research boundary",
      },
      {
        label: "Foundations",
        href: "/research/foundations",
        eyebrow: "Mathematical foundations",
      },
    ],
  },
  {
    id: "exploratory-computational",
    label: "Computational Research",
    eyebrow: "AI · machine learning · graphs · knowledge · foundations",
    summary:
      "Computational research tests Boundary First representations where they can be benchmarked directly: graph admissibility, learning, computational epistemology, memory, knowledge systems, complexity, and machine reasoning.",
    bullets: [
      "Computational Epistemology studies how computation produces, represents, tests, transports, repairs, promotes, and closes knowledge while preserving provenance and claim status.",
      "Edge Admissibility treats a graph edge as a typed, potentially lossy boundary-transport claim carrying context, relation type, invariant, defect, confidence, provenance, and lifecycle.",
      "Boundary-Spectral Learning and Phase-Defect Graphs are candidate benchmarkable graph/ML programs rather than claims that conventional representations are already inferior.",
      "Memory and knowledge-system work tests boundary, scale, context, provenance, and reconstruction against competent vector, retrieval, graph, and hybrid baselines.",
      "Schemathematics and machine-reasoning hypotheses must demonstrate measurable navigation, proof, retrieval, or reasoning improvements rather than relying on conceptual elegance.",
      "Experiments require explicit baselines and ablations, matched policy access, raw outputs and traces, cost/latency/retry accounting, and visible failure paths; negative, no-difference, and baseline-absorption results are valid outcomes.",
    ],
    sourceRef: "src/content/nodes.json · computational research registry",
    links: [
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Executable research infrastructure",
        summary: "A current software surface for governed knowledge, provenance, criticism, promotion, and repair.",
      },
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Software foundation",
      },
      {
        label: "Schemathematics",
        href: "/schemathematics",
        eyebrow: "Machine reasoning hypothesis surface",
      },
    ],
  },
];

export function hydrateExploratoryResearchNode(node: ContentNode): ContentNode {
  if (node.id !== "research") return node;

  const inspections = node.inspection ?? [];
  const existingIds = new Set(inspections.map((inspection) => inspection.id));

  return {
    ...node,
    inspection: [
      ...inspections,
      ...exploratoryResearchInspections.filter((inspection) => !existingIds.has(inspection.id)),
    ],
  };
}

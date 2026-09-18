export const projectGrammar = [
  ["01", "System", "What bounded environment are we working in?"],
  ["02", "Problem", "What is difficult, opaque, inconsistent, inaccessible, or unresolved?"],
  ["03", "Representation", "How is the system actually represented?"],
  ["04", "Consequential distinction", "What distinction must remain visible for the task to work?"],
  ["05", "Intervention", "What did the Lab actually change, build, test, or introduce?"],
  ["06", "Artifact", "What inspectable thing now exists?"],
  ["07", "Result", "What can we responsibly say happened?"],
  ["08", "Research consequence", "What did the project teach the Lab?"],
  ["09", "Agency consequence", "Who becomes more or less capable afterward?"],
  ["10", "Stewardship consequence", "Who maintains, corrects, transfers, supersedes, or retires the result?"],
] as const;

export const projects = [
  {
    code: "CHESS",
    title: "Boundary-First Chess",
    type: "Registered research product / product family",
    status: "research_product",
    tone: "product",
    domain: "Game / education / media / analysis",
    stress: "Bounded state, explanation, pedagogy, audience legibility",
    transfer:
      "One domain producing book, video, tooling, commentary, and licensing candidates without pretending each is already a standalone product.",
    question:
      "Can a state-and-constraint-oriented grammar make chess reasoning more explicit, useful, and narratively legible without replacing established chess theory or engine evaluation?",
    result:
      "A substantial manuscript, developed pedagogy, explainable-analysis architecture, executable engine research, worked games, and deployment material exist.",
    agency:
      "Intended gains are learner inspectability and audience comprehension rather than greater obedience to an engine.",
    stewardship:
      "Useful surfaces should become teachable and operable by players, coaches, educators, creators, commentators, publishers, platforms, and production teams without hidden BFL interpretation.",
  },
  {
    code: "ASM",
    title: "Agentic Scientific Method",
    type: "Registered research product / active research lane",
    status: "research_product",
    tone: "research",
    domain: "Scientific research / AI",
    stress: "Theory representation, evaluation, repair, authority",
    transfer:
      "Research machinery becoming executable while preserving provenance, authority ceilings, human gates, and handoff context.",
    question:
      "What would it take to treat theory change as an inspectable, typed operation without confusing technical execution with scientific truth?",
    result:
      "Theory Transformation work completed a bounded six-case comparative series and produced a candidate v0.2 executable specification; the next control is a small deterministic runtime.",
    agency:
      "Automation is intended to expand search, comparison, and criticism while preserving human control over evidence, candidate transforms, schema revision, and promotion.",
    stewardship:
      "No executable operator should silently inherit scientific authority.",
  },
  {
    code: "PROJECTR",
    title: "Projectr / YouTube Knowledge Explorer",
    type: "Registered software product family",
    status: "active_build",
    tone: "build",
    domain: "Software / media knowledge",
    stress: "Representation change, navigation, provenance",
    transfer:
      "A bounded YouTube wedge nested inside a broader source-linked knowledge-exploration vision.",
    question:
      "Can source-linked derived structure make long-form knowledge easier to navigate and reuse without becoming an opaque substitute for the source?",
    result:
      "The current wedge is long-form YouTube → timestamped transcript → structured topic map → search → source return → persistent knowledge object.",
    agency:
      "The user gains search, orientation, retrieval, source return, and potentially portable organized knowledge.",
    stewardship:
      "Provenance, correction, export, persistence, migration, and user ownership become first-class as the product broadens.",
  },
  {
    code: "WEATHER",
    title: "Boundary-First Weather / WeatherSim",
    type: "Applied computational research scaffold / benchmark program / pilot candidate",
    status: "NO ADMITTED PROD-* IDENTITY",
    tone: "scaffold",
    domain: "Atmospheric computation / public science",
    stress: "Physical baselines, flux, multiscale closure, computational evidence",
    transfer:
      "Product-shaped research and pilot surfaces that remain research until benchmark evidence earns a stronger identity.",
    question:
      "Can boundary-aware representations improve selected diagnostics, adaptivity, compression, or forecast-relevant tasks under explicit conventional baselines?",
    result:
      "The program currently asks bounded benchmark questions. Candidate visualizations, simulation components, diagnostics, and public-science surfaces are not admitted products.",
    agency:
      "Public-facing work should improve understanding of model boundaries, uncertainty, repair, and atmospheric structure without pretending to hold operational forecast authority.",
    stewardship:
      "Useful results should move toward meteorological collaborators, reproducible benchmarks, maintained artifacts, and institutions with appropriate operational capacity.",
  },
  {
    code: "AUGUSTA",
    title: "Augusta Maintenance Debt Civic Case",
    type: "Active public-interest research case",
    status: "CASE_CANDIDATE / RESEARCH_ACTIVE / NOT_PROMOTED",
    tone: "civic",
    domain: "Public infrastructure / institutions",
    stress: "Provenance, accounting distinctions, uncertainty, public consequence",
    transfer:
      "Public analysis and lifecycle instrumentation designed for accountable handoff rather than a single rhetorical total.",
    question:
      "Can a lifecycle ledger make unresolved public obligations more visible without manufacturing a false single number?",
    result:
      "The current defensible result establishes documented lifecycle-obligation phenomena, but does not support one citywide maintenance-debt balance.",
    agency:
      "Residents, officials, journalists, researchers, and affected institutions should be able to distinguish obligations, uncertainty, funding state, and physical closure.",
    stewardship:
      "Provenance, uncertainty, corrections, and accounting rules must survive handoff; durable civic stewardship belongs with accountable public institutions and affected communities.",
  },
] as const;

export const capabilityOutcomes = [
  "A clearer model",
  "Usable software",
  "Maintainable data",
  "An inspectable decision process",
  "A reproducible experiment",
  "A curriculum another educator can teach",
  "A research packet another lab can continue",
  "A benchmark another collaborator can run",
  "An accounting schema another institution can maintain",
  "A documented repair path",
  "Stronger internal capability",
  "Transfer to a more appropriate steward",
] as const;

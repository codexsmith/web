export const projectGrammar = [
  ["01", "System", "What bounded environment are we working in?"],
  ["02", "Problem", "What is difficult, opaque, inconsistent, inaccessible, or unresolved?"],
  ["03", "Working model", "How is the system actually being described or modeled?"],
  ["04", "What must remain visible", "What distinction or condition matters enough that losing it would break the task?"],
  ["05", "Intervention", "What did the Lab actually change, build, test, or introduce?"],
  ["06", "Artifact", "What inspectable thing now exists?"],
  ["07", "Result", "What can we responsibly say happened?"],
  ["08", "What we learned", "What did the project teach the Lab?"],
  ["09", "Who gains capability", "Who becomes more or less capable afterward?"],
  ["10", "Who carries it forward", "Who maintains, corrects, transfers, replaces, or retires the result?"],
] as const;

export const projects = [
  {
    code: "CHESS",
    title: "Boundary-First Chess",
    type: "Learning product / research testbed",
    status: "research_product",
    tone: "product",
    href: "/products/boundary-first-chess",
    domain: "Game / education / media / analysis",
    stress: "Teaching clarity, learner understanding, and faithful chess explanation",
    transfer:
      "A developed teaching method that could support a book, video, software, commentary, or licensing only where outside use justifies those extensions.",
    question:
      "Can one consistent teaching language help players see what changed in a position without replacing established chess concepts or engine analysis?",
    result:
      "A substantial manuscript, developed pedagogy, explainable-analysis architecture, executable engine research, worked games, and deployment material exist.",
    agency:
      "The intended benefit is clearer learner understanding and explanation, not greater dependence on an engine or on BFL terminology.",
    stewardship:
      "Useful surfaces should become teachable and operable by players, coaches, educators, creators, commentators, publishers, platforms, and production teams without hidden BFL interpretation.",
  },
  {
    code: "ASM",
    title: "Agentic Scientific Method",
    type: "Research method / AI-assisted scientific workflow",
    status: "research_product",
    tone: "research",
    href: "/products/agentic-scientific-method",
    domain: "Scientific research / AI / research automation",
    stress: "Research transparency, testing, criticism, revision, and responsibility",
    transfer:
      "A research workflow becoming executable while preserving source history, human review, criticism, and handoff context.",
    question:
      "How can AI-assisted search and scientific testing work together without confusing fluent output or successful computation with scientific truth?",
    result:
      "Theory Transformation work completed a bounded six-case comparative series and produced a candidate v0.2 executable specification; the next control is a small deterministic runtime.",
    agency:
      "Automation is intended to expand search, comparison, and criticism while people remain responsible for evidence, changes to the method, and consequential conclusions.",
    stewardship:
      "No automated tool should gain scientific decision authority simply because it can perform the work.",
  },
  {
    code: "PROJECTR",
    title: "Projectr",
    type: "Knowledge-exploration software product",
    status: "active_build",
    tone: "build",
    href: "/products/youtube-knowledge-explorer",
    domain: "Software / media knowledge",
    stress: "Search, navigation, source traceability, and persistent knowledge",
    transfer:
      "YouTube Knowledge Explorer is the current implementation inside a broader source-linked knowledge product.",
    question:
      "Can long-form sources become easier to search, navigate, save, and reuse without losing the path back to the original?",
    result:
      "The current YouTube implementation supports timestamped transcripts, structured outlines, search, source return, and persistent exploration state.",
    agency:
      "The user gains search, orientation, retrieval, source return, and potentially portable organized knowledge.",
    stewardship:
      "Provenance, correction, export, persistence, migration, and user ownership become first-class as the product broadens.",
  },
  {
    code: "WEATHER",
    title: "Boundary First Weather",
    type: "Weather research testbed / pilot candidate",
    status: "NO ADMITTED PROD-* IDENTITY",
    tone: "scaffold",
    href: "/products/boundary-first-weather",
    domain: "Atmospheric computation / public science",
    stress: "Forecast change, model disagreement, computational cost, and scientific comparison",
    transfer:
      "A public research and pilot surface that remains a testbed until benchmark evidence justifies stronger product claims.",
    question:
      "Can boundary-aware diagnostics improve selected weather-analysis or computation tasks when compared with clear conventional baselines?",
    result:
      "The program currently defines benchmark questions, visualizations, simulation ideas, diagnostics, and a pilot path. Better forecast skill or efficiency has not yet been established.",
    agency:
      "Public-facing work should improve understanding of model boundaries, uncertainty, repair, and atmospheric structure without pretending to hold operational forecast authority.",
    stewardship:
      "Useful results should move toward meteorological collaborators, reproducible benchmarks, maintained artifacts, and institutions with appropriate operational capacity.",
  },
  {
    code: "AUGUSTA",
    title: "Augusta Maintenance Debt Civic Case",
    type: "Public-interest infrastructure research case",
    status: "CASE_CANDIDATE / RESEARCH_ACTIVE / NOT_PROMOTED",
    tone: "civic",
    href: "/projects/augusta-maintenance-debt",
    domain: "Public infrastructure / institutions",
    stress: "Public records, lifecycle obligations, accounting distinctions, uncertainty, and public consequence",
    transfer:
      "A source-grounded public analysis designed to make maintenance obligations visible without collapsing them into one unsupported headline number.",
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

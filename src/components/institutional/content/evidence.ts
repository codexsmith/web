export const evidenceClasses = [
  {
    label: "EXTERNALLY CORROBORATED",
    description:
      "A record outside BFL supports the factual claim: an award record, institutional report, public artifact, independent publication, or comparable source.",
  },
  {
    label: "PROFESSIONAL RECORD",
    description:
      "Prior employment, delivery history, education, or surviving work supports capability and provenance. It is not the same thing as BFL customer traction.",
  },
  {
    label: "BFL-NATIVE + INSPECTABLE",
    description:
      "The Lab can show the artifact now: code, research packets, methods, project records, prototypes, operating machinery, or public documentation.",
  },
  {
    label: "EMERGING / NOT YET ESTABLISHED",
    description:
      "The work exists, but external use, independent review, publication, replication, repeat revenue, or other stronger evidence still has to be earned.",
  },
] as const;

export const priorExecution = [
  {
    status: "EXTERNALLY CORROBORATED",
    title: "CityWatch — civic software delivered inside Augusta–Richmond County",
    summary:
      "CityWatch was a public transparency system for project status and finance information built during Nicholas T. Smith's Augusta–Richmond County application-development work.",
    evidence:
      "The recovered 2016 Augusta–Richmond County Information Technology annual-report record lists implementation of CityWatch among the department's major accomplishments. GMIS International's historical record lists Augusta–Richmond County, Georgia as the 2016 Government-to-Citizen award recipient.",
    boundary:
      "The award is presented here as recognition of the municipal project and institution. This page does not convert that institutional award into a personal award for the founder.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Georgia Tech undergraduate research — materials, HPC, and NUMA",
    summary:
      "The founder's undergraduate formation included four semesters of research spanning materials work and high-performance-computing / NUMA performance analysis, alongside the ordinary work of literature review, hypothesis formation, measurement, and interpreting results that did not support the starting hypothesis.",
    evidence:
      "The Lab's provenance archive records four semesters of Georgia Tech research across materials and HPC/NUMA, including literature synthesis, hypothesis formation, performance-oriented analysis, and a confirmed null result. This sits alongside the B.S. Computer Science program in Systems & Architecture and Artificial Intelligence.",
    boundary:
      "Undergraduate research experience establishes real research practice and exposure to experimental discipline. It does not transfer Georgia Tech authority to later BFL theories, papers, or scientific claims.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Lean, Agile, Kanban, and repeated delivery under constraint",
    summary:
      "From 2016–2018, Agile and Lean practice became an operating discipline rather than a vocabulary: make state visible, shorten the assumption-to-evidence loop, limit work in progress, expose capacity, demonstrate working increments, and repair from observed failure.",
    evidence:
      "The professional record covers repeated short-cycle consulting at Rural Sourcing Inc., roughly six client engagements, Agile/Kanban/Lean Startup practice, local Agile-community participation, project leadership, and the period in which the early Agile Diamond method was being formed. The provenance archive also preserves David Gentry as a named mentor and candidate historical witness to that developmental period.",
    boundary:
      "This establishes method lineage and professional practice. Founder recollections about mentorship, succession discussions, or particular leadership judgments remain recollections unless separately corroborated; Agile practice does not validate later Boundary First formal claims.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Global Web Advisors — early startup NLP product engineering",
    summary:
      "An early startup role put natural-language processing, cloud infrastructure, data systems, and product iteration into one operating environment rather than treating them as separate specialties.",
    evidence:
      "The career record lists Global Web Advisors (2014–2015) as a startup where the founder served as lead software engineer, developing an NLP-assisted authoring platform in Java, improving output through automation and data analysis, and operating MongoDB-backed infrastructure on AWS.",
    boundary:
      "This is evidence of early startup and NLP product work. It does not establish novelty of the underlying NLP methods or provide current BFL market traction.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Projectr.Live — solo founder, architecture through market testing",
    summary:
      "Projectr turned zero-to-one product work into full-system responsibility: product direction, architecture, implementation, infrastructure, deployment, budgets, user behavior, and repeated pivots all became one coupled engineering problem.",
    evidence:
      "The 2019–2022 career record identifies the founder as Projectr.Live's founder and lead software architect. It records a social platform with Kanban-style workflows, visualization and AI-assisted discovery, built with Next.js, Postgres, Redis, OAuth, and Docker, with ownership from product direction and architecture through deployment, market testing, and iteration.",
    boundary:
      "Founder-level execution is evidence of end-to-end product capability and exposure to market feedback. It does not imply product-market fit, durable company traction, or that later BFL products inherit Projectr's evidence.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "CarLabs.ai — startup cloud systems during an acquisition transition",
    summary:
      "A short startup engagement exercised a different part of the stack: chatbot architecture, integrations, serverless systems, and production debugging during a period of organizational change.",
    evidence:
      "The 2022 career record lists CarLabs.ai as a full-stack development engagement contributing to chatbot architecture and integrations using AWS Lambda and Node.js while maintaining and debugging production cloud infrastructure during the company's acquisition period.",
    boundary:
      "This supports breadth across startup stages and cloud operations. It does not imply ownership of the broader CarLabs product, acquisition outcome, or later Impel systems.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "More than a decade of production software and systems delivery",
    summary:
      "The founder's career record spans public-sector software, consulting, startups, education technology, cloud systems, and regulated or compliance-sensitive environments.",
    evidence:
      "The current career archive records work across Augusta–Richmond County, RSI, Projectr, CarLabs.ai, Hippo Education, and Crypton Mobile, with representative work in .NET, Java, React, Node, SQL, AWS, Azure, APIs, infrastructure, and production support.",
    boundary:
      "This is professional-capability evidence and founder provenance. Item-level employment and performance claims should be independently corroborated before being treated as third-party validation of BFL.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Repeated consulting, search systems, and cross-domain delivery",
    summary:
      "The systems method was sharpened in consulting environments where the code, domain, architecture, process, client communication, testing, and delivery boundary all had to close together.",
    evidence:
      "The founder's RSI record describes six short-term client engagements delivered across roughly eighteen months, enterprise work across .NET and Java ecosystems, natural-language search capability work for Cars.com, monolith-to-microservice transition work, technical interviewing, and surviving 2016–2018 engineering notes about architecture, requirements, complexity, and deployment.",
    boundary:
      "Historical consulting success supports the ancestry of Applied Work. It does not count as a Boundary First Labs client case study, current market validation, or independent confirmation of founder-recalled details about the Cars.com research structure.",
  },
] as const;

export const nativeEvidence = [
  {
    title: "Research corpus",
    description:
      "A large source-controlled body of research notes, formalizations, claim records, domain programs, literature work, and manuscript material can be inspected at artifact level rather than described only from memory.",
    href: "/v3/research",
    linkLabel: "Inspect Research",
  },
  {
    title: "Projects + prototypes",
    description:
      "The Lab maintains bounded projects that turn methods into software, experiments, simulations, public tools, and domain-specific demonstrations with explicit maturity states.",
    href: "/v3/projects",
    linkLabel: "Inspect Projects",
  },
  {
    title: "Product objects",
    description:
      "Product candidates are represented as concrete objects with audience, purpose, evidence needs, and commercialization boundaries rather than as a list of ideas.",
    href: "/v3/products",
    linkLabel: "Inspect Products",
  },
  {
    title: "Research apparatus",
    description:
      "Registries, source records, claim/evidence machinery, review loops, manifests, and executable tooling make the Lab's operating method more inspectable than a private notebook or founder narrative.",
    href: "/v3/apparatus",
    linkLabel: "Inspect Apparatus",
  },
  {
    title: "Applied offers",
    description:
      "Commercial work is packaged into bounded reviews, pilots, workshops, architecture work, governance analysis, and technical advisory—with explicit scope and claim boundaries.",
    href: "/v3/applied-work",
    linkLabel: "Inspect Applied Work",
  },
  {
    title: "Publication discipline",
    description:
      "The publication surface distinguishes manuscripts, stubs, release state, review state, and bound canonical documents rather than calling every substantial draft a publication.",
    href: "/v3/publications",
    linkLabel: "Inspect Publications",
  },
] as const;

export const evidenceLadder = [
  ["Documented", "A claim or artifact has a recoverable source inside the Lab's record."],
  ["Externally corroborated", "A source outside BFL independently supports the factual statement."],
  ["Inspectable artifact", "Another person can examine the code, document, model, method, or system itself."],
  ["External use / review", "Someone outside BFL has used, tested, criticized, piloted, bought, or formally reviewed it."],
  ["Repeated evidence", "The result survives more than one user, engagement, environment, or evaluation cycle."],
  ["Independent reproduction / adoption", "Others can reproduce, operate, extend, or adopt the result without depending on the founder's explanation."],
] as const;

export const evidenceToEarn = [
  {
    title: "BFL-native paid case studies",
    description:
      "The Applied Work offers are ready to scope, but the Lab still needs completed external engagements that can be described as BFL client evidence.",
  },
  {
    title: "Independent pilots",
    description:
      "Projects and methods need more tests in environments where outside users, data, constraints, and failure modes can disagree with the Lab.",
  },
  {
    title: "Bound publications + external review",
    description:
      "Substantial manuscript material exists, but canonical publication objects, review outcomes, and publication authority must be bound explicitly rather than inferred from volume.",
  },
  {
    title: "Repeat product-use evidence",
    description:
      "Working products and product candidates need durable evidence such as repeat use, retention, willingness to pay, institutional adoption, or other external behavior.",
  },
  {
    title: "Independent technical reproduction",
    description:
      "Strong technical and scientific claims become much more credible when another party can reproduce the result from the stated method and inputs.",
  },
  {
    title: "Transfer beyond the founder",
    description:
      "The Lab's strongest institutional evidence will be other people successfully operating, criticizing, repairing, or extending the machinery without long oral context transfer.",
  },
] as const;

export const evidenceNonImplications = [
  ["Prior career != BFL traction", "Earlier professional delivery supports capability; it does not create current BFL customers or revenue."],
  ["Institutional award != personal award", "CityWatch recognition belongs to the municipal project and institution unless a source establishes a narrower attribution."],
  ["Artifact exists != claim is true", "A large corpus, working prototype, or formal derivation proves existence and inspectability—not scientific correctness."],
  ["Prototype != product-market fit", "A working object is a prerequisite for market evidence, not a substitute for users, customers, retention, or adoption."],
  ["Named target != affiliation", "An organization appearing in the Collaboration map is a possible fit, not a partner, supporter, or endorser."],
  ["Funding != validation", "Capital can make experiments, reviews, and products possible; it cannot make the underlying claims more true."],
] as const;

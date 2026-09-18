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
    title: "Repeated short-cycle consulting and cross-domain delivery",
    summary:
      "The systems method was sharpened in consulting environments where the code, domain, architecture, process, client communication, testing, and delivery boundary all had to close together.",
    evidence:
      "The founder's RSI record describes six short-term client engagements delivered across roughly eighteen months, while surviving 2016–2018 engineering notes preserve contemporaneous thinking about architecture, change isolation, requirements, complexity, and deployment.",
    boundary:
      "Historical consulting success supports the ancestry of Applied Work. It does not count as a Boundary First Labs client case study or current market validation.",
  },
  {
    status: "PROFESSIONAL RECORD",
    title: "Georgia Tech computer-science and research formation",
    summary:
      "The founder's training joins computer science, systems, artificial intelligence, mathematics, physics, and laboratory research habits.",
    evidence:
      "The current provenance record identifies a Georgia Tech B.S. in Computer Science with Systems & Architecture and Artificial Intelligence concentrations, alongside multiple semesters of research experience.",
    boundary:
      "Education and research participation explain formation. They do not validate later Boundary First scientific or mathematical claims.",
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

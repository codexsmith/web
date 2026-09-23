export type NodeKind =
  | "root"
  | "branch"
  | "product"
  | "service"
  | "project"
  | "research"
  | "method"
  | "standard"
  | "foundation"
  | "theory"
  | "about"
  | "document";

export type EdgeType =
  | "contains"
  | "specializes"
  | "implements"
  | "demonstrates"
  | "grounds"
  | "derived-from"
  | "depends-on"
  | "applies-to"
  | "extends"
  | "contrasts-with"
  | "governs"
  | "measures"
  | "documents"
  | "instantiates";

export type DeliveryStage =
  | "shipped"
  | "developed"
  | "pilot"
  | "active-development"
  | "planned";

export type WorkStatus = {
  stage: DeliveryStage;
  label: string;
  detail: string;
  sourceStatus?: string;
  provenance?: string;
  historical?: boolean;
};

export type ContentLink = {
  label: string;
  href: string;
  eyebrow?: string;
  summary?: string;
};

export type Inspection = {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
  sourceRef?: string;
  links?: ContentLink[];
};

export type ContentNode = {
  id: string;
  label: string;
  shortLabel?: string;
  path: string;
  parentId?: string;
  kind: NodeKind;
  eyebrow: string;
  summary: string;
  body?: string[];
  status?: WorkStatus;
  links?: ContentLink[];
  inspection?: Inspection[];
};

export type GraphEdge = {
  from: string;
  to: string;
  type: EdgeType;
  label: string;
};

export const nodes: ContentNode[] = [
  {
    id: "root",
    label: "Boundary First Labs",
    path: "",
    kind: "root",
    eyebrow: "Software research and engineering lab",
    summary:
      "Software for difficult systems, public-interest projects, and research into executable representation.",
  },
  {
    id: "products",
    label: "Products",
    path: "products",
    parentId: "root",
    kind: "branch",
    eyebrow: "Built, developing, and planned work",
    summary:
      "Software products, services, shipped systems, and carefully labeled product concepts. Status is part of the representation: developed is not the same claim as shipped.",
    body: [
      "This portfolio separates current development, pilot work, historical shipped systems, and planned products rather than flattening them into one marketing category.",
      "Rich retained product records remain the deeper source. The spine provides the smaller public orientation layer and links into those records when they are public.",
    ],
  },
  {
    id: "current-work",
    label: "Current Work",
    path: "products/current",
    parentId: "products",
    kind: "branch",
    eyebrow: "Current product and service expressions",
    summary:
      "Work with a current public operating surface: active development programs and bounded pilot engagements.",
  },
  {
    id: "corpus-forge",
    label: "Corpus Forge",
    path: "products/current/corpus-forge",
    parentId: "current-work",
    kind: "product",
    eyebrow: "Research operations software and method",
    summary:
      "A governed memory and research-operations system for provenance, typed claims, contradiction, review, promotion, supersession, and repair.",
    status: {
      stage: "active-development",
      label: "Active development",
      detail:
        "A current research-operations program and software-development effort. The retained public record explicitly does not claim a complete or production-ready knowledge-management platform.",
      sourceStatus: "active-development",
      provenance: "Product landing manifest and Corpus Forge public record",
    },
    body: [
      "Corpus Forge treats a corpus as a governed memory system rather than a pile of documents. Sources, claims, evidence, contradictions, review decisions, and supersession remain distinguishable so consequential claims can be reconstructed and repaired.",
      "Its current lifecycle is explicit: ingest, extract, relate, review, promote, then supersede or repair. Human promotion gates remain part of the operating model where authority or evidence requires them.",
    ],
    links: [
      {
        label: "Open the full Corpus Forge record",
        href: "/corpus-forge",
        eyebrow: "Retained public product record",
        summary: "Method, lifecycle, worked example, validation targets, and claim boundary.",
      },
    ],
    inspection: [
      {
        id: "corpus-forge-status",
        label: "What exists now",
        eyebrow: "Development boundary",
        summary:
          "The current public claim is a developed research-operations method plus an active software program, not a claim of finished platform deployment.",
        bullets: [
          "The six-stage source-to-repair lifecycle is specified and public.",
          "The project index records an active Corpus Forge Agent Pipeline in validation.",
          "Corpus Forge Workbench is retained as a software/product expression but is not currently promoted as a public route.",
          "A Claim and Evidence Ledger is identified as a focused product surface inside the wider governance model.",
        ],
        sourceRef: "src/content/product-landing-pages/corpus-forge.json + src/content/project_index.json",
        links: [
          {
            label: "Inspect Corpus Forge",
            href: "/corpus-forge",
            eyebrow: "Public record",
          },
        ],
      },
    ],
  },
  {
    id: "agency-audit",
    label: "Agency & Representation Audit",
    shortLabel: "Agency Audit",
    path: "products/current/agency-representation-audit",
    parentId: "current-work",
    kind: "service",
    eyebrow: "Bounded professional service",
    summary:
      "A systems audit that reconstructs authority, representation, consequence, contestability, and repair around one consequential process.",
    status: {
      stage: "pilot",
      label: "Pilot intake",
      detail:
        "Available as a bounded pilot engagement. It is a systems audit, not legal advice, regulatory certification, fairness certification, or a security assessment.",
      sourceStatus: "pilot-intake",
      provenance: "Product landing manifest and Agency & Representation Audit public record",
    },
    body: [
      "The audit follows five passes: map authority, inspect representation, trace consequence, test contestability, and assign repair.",
      "The smallest useful engagement is one identifiable process with real artifacts, affected parties, enough access to reconstruct handoffs, and an owner willing to inspect defects rather than defend a predetermined conclusion.",
    ],
    links: [
      {
        label: "Open the full Agency Audit record",
        href: "/agency-audit",
        eyebrow: "Pilot service record",
        summary: "Scope, five-pass method, candidate work, deliverables, and claim firewall.",
      },
    ],
  },
  {
    id: "shipped-work",
    label: "Shipped Work",
    path: "products/shipped",
    parentId: "products",
    kind: "branch",
    eyebrow: "Delivered systems and professional standing",
    summary:
      "Systems that were actually delivered or operated. Historical work stays labeled historical rather than being presented as a current Lab engagement.",
  },
  {
    id: "citywatch",
    label: "CityWatch",
    path: "products/shipped/citywatch",
    parentId: "shipped-work",
    kind: "product",
    eyebrow: "Civic transparency software",
    summary:
      "Delivered Augusta-Richmond County civic software that joined project, spending, infrastructure, status, timeline, media, and map context into a citizen-facing representation.",
    status: {
      stage: "shipped",
      label: "Shipped work - historical",
      detail:
        "Historical delivered municipal work and professional standing. Boundary First Labs does not claim a current Augusta-Richmond County affiliation or engagement.",
      sourceStatus: "historical-project-no-current-affiliation",
      provenance: "Retained Augusta CityWatch bridge record",
      historical: true,
    },
    body: [
      "CityWatch is useful here because it demonstrates the software-first lineage directly: disparate operational, financial, status, timeline, media, and geographic records were reconciled into a public interface people could inspect.",
      "The retained bridge treats this as prior work and a source of standing for future civic engineering. It explicitly does not imply that Augusta currently sponsors, endorses, or participates in Boundary First Labs.",
    ],
    inspection: [
      {
        id: "citywatch-claim-boundary",
        label: "Historical claim boundary",
        eyebrow: "Provenance and standing",
        summary:
          "The retained record supports describing the implementation and delivery experience while keeping later claims about outcomes, awards, or institutional recognition behind evidence review.",
        bullets: [
          "Built: CityWatch civic transparency implementation.",
          "Built inside Augusta-Richmond County IT, not as a current Boundary First Labs contract.",
          "The record names project, spending, infrastructure status, timeline, media, and map context as part of the citizen-facing representation.",
          "Awards or external commendations should be attached only when retained or independently recoverable evidence is linked.",
        ],
        sourceRef: "src/content/product-landing-pages/augusta-citywatch.json",
      },
    ],
  },
  {
    id: "planned-products",
    label: "Product Pipeline",
    path: "products/pipeline",
    parentId: "products",
    kind: "branch",
    eyebrow: "Developed concepts and planned products",
    summary:
      "Product concepts with enough architecture or recurring definition to retain, but without a shipped-product claim.",
  },
  {
    id: "projectr",
    label: "Projectr",
    path: "products/pipeline/projectr",
    parentId: "planned-products",
    kind: "product",
    eyebrow: "Constructive media and knowledge platform",
    summary:
      "A structured knowledge platform for creating, sharing, revising, and coordinating projects, plans, learning paths, evidence, progress, and reusable public knowledge.",
    status: {
      stage: "developed",
      label: "Developed concept - not shipped",
      detail:
        "The portfolio records a developed concept and architecture. It remains concept-development work rather than a claim of a deployed product.",
      sourceStatus: "developed concept and architecture",
      provenance: "work_portfolio.json migration seed",
    },
    body: [
      "Projectr is the long-running constructive-media platform concept behind several related learning and knowledge products. Its primary objects are intended to be constructive and revisable rather than disposable posts.",
      "The retained portfolio identifies subscriptions, institutional hosting, and creator/education/community tooling as possible business models; these are opportunity hypotheses, not current revenue claims.",
    ],
  },
  {
    id: "youtube-knowledge-explorer",
    label: "YouTube Knowledge Explorer",
    shortLabel: "YouTube Explorer",
    path: "products/pipeline/youtube-knowledge-explorer",
    parentId: "planned-products",
    kind: "product",
    eyebrow: "Learning wrapper and educational media tool",
    summary:
      "A learning layer over YouTube that turns playlists, channels, and selected videos into structured learning paths with notes, dependencies, progress, summaries, and reasons for what to watch next.",
    status: {
      stage: "planned",
      label: "Planned - bounded product concept",
      detail:
        "A confirmed bounded product concept in the retained portfolio; no shipped or public-availability claim is made here.",
      sourceStatus: "bounded product concept",
      provenance: "work_portfolio.json migration seed",
    },
  },
  {
    id: "cross-platform-bookshelf",
    label: "Cross-Platform Bookshelf",
    shortLabel: "Bookshelf",
    path: "products/pipeline/cross-platform-bookshelf",
    parentId: "planned-products",
    kind: "product",
    eyebrow: "Personal knowledge and media organizer",
    summary:
      "A structured bookshelf for videos, articles, podcasts, books, documents, and courses that preserves why an item was saved, intended use, progress, relationships, and resulting knowledge or action.",
    status: {
      stage: "planned",
      label: "Planned - recurring concept",
      detail:
        "A recurring confirmed concept in the retained portfolio. It is included to preserve product lineage, not to imply current availability.",
      sourceStatus: "recurring concept",
      provenance: "work_portfolio.json migration seed",
    },
  },
  {
    id: "need-capacity-map",
    label: "Need & Capacity Map",
    path: "products/pipeline/need-capacity-map",
    parentId: "planned-products",
    kind: "product",
    eyebrow: "Public-interest coordination utility",
    summary:
      "A bounded tool for representing underused resources, unmet needs, matching constraints, and trusted organizations capable of closing the gap.",
    status: {
      stage: "planned",
      label: "Planned - candidate product wedge",
      detail:
        "The portfolio records this as a candidate first product wedge for a larger capacity-exchange system. It remains concept-development work.",
      sourceStatus: "candidate first product wedge",
      provenance: "work_portfolio.json migration seed",
    },
  },
  {
    id: "tools-experiments",
    label: "Tools & Experiments",
    path: "products/tools-experiments",
    parentId: "products",
    kind: "project",
    eyebrow: "Working artifacts and bounded probes",
    summary:
      "Small artifacts that test an interaction, representation, architecture, or domain model before the result earns promotion into a product or method.",
    body: [
      "The lab intentionally keeps experiments distinct from products. A demonstration can produce evidence without becoming a shipped claim.",
      "Current public testbeds live primarily under Research, where their validation ceiling and domain-specific assumptions remain visible.",
    ],
  },
  {
    id: "public-interest",
    label: "People",
    path: "people",
    parentId: "root",
    kind: "branch",
    eyebrow: "Public-purpose work",
    summary:
      "Projects, principles, aspirations, and open work that show what Boundary First Labs intends to use its technical capacity for.",
  },
  {
    id: "public-mission",
    label: "Mission",
    path: "people/mission",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Institutional purpose",
    summary:
      "Use technical and representational capacity to make difficult systems more legible, accountable, repairable, and usable without confusing aspiration with demonstrated capability.",
  },
  {
    id: "public-principles",
    label: "Principles",
    path: "people/principles",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Operating commitments",
    summary:
      "Accessibility, lifecycle responsibility, accountable systems, public legibility, maintainability, provenance, repair, and respect for real constraints.",
  },
  {
    id: "augusta-civic",
    label: "Augusta Civic Infrastructure",
    shortLabel: "Augusta Civic",
    path: "people/augusta-civic-infrastructure",
    parentId: "public-interest",
    kind: "project",
    eyebrow: "Public-interest project direction",
    summary:
      "A current project direction for software-enabled analysis of local historic and civic infrastructure, informed by prior CityWatch delivery without claiming a current municipal relationship.",
    status: {
      stage: "planned",
      label: "Planned public-interest project",
      detail:
        "The modern civic-infrastructure analysis is a Boundary First Labs project direction. CityWatch supplies historical standing; it does not establish current Augusta sponsorship or participation.",
      provenance: "Spine project definition + retained CityWatch historical bridge",
    },
    body: [
      "The public output does not need to be a conventional software product. Software can be the machinery used to assemble records, normalize evidence, model relationships, and produce useful civic knowledge.",
      "The smallest useful next step is one bounded municipal or historical infrastructure question with inspectable sources, a representation/consequence map, and a public-facing artifact such as a map, timeline, dataset, or analysis.",
    ],
  },
  {
    id: "public-aspirations",
    label: "Goals & Aspirations",
    shortLabel: "Aspirations",
    path: "people/goals-aspirations",
    parentId: "public-interest",
    kind: "document",
    eyebrow: "Future capacity",
    summary:
      "Ambitious directions the lab wants to become capable of addressing, clearly separated from current claims and delivered work.",
  },
  {
    id: "research",
    label: "Research",
    path: "research",
    parentId: "root",
    kind: "branch",
    eyebrow: "Methods, testbeds, and formal foundations",
    summary:
      "The research machinery behind the lab's software practice, from professional engineering doctrine through bounded applied testbeds to formal foundations.",
  },
  {
    id: "software",
    label: "Software",
    path: "research/software",
    parentId: "research",
    kind: "research",
    eyebrow: "Software doctrine",
    summary:
      "A coherent software lane: boundaries, ontology, executable representation, architecture, UX, state, verification, and governance.",
  },
  {
    id: "boundary-first-engineering",
    label: "Boundary First Engineering",
    shortLabel: "Engineering",
    path: "research/software/boundary-first-engineering",
    parentId: "software",
    kind: "method",
    eyebrow: "Engineering doctrine",
    summary:
      "Make boundaries, contracts, ownership, invariants, lifecycle, and failure behavior explicit before local implementation details dominate the design.",
    status: {
      stage: "developed",
      label: "Developed doctrine",
      detail:
        "The software lane has two substantial public practitioner expressions: Software Before Code is a working public method and Closure-Driven Software Development is an advanced practitioner draft.",
      provenance: "Software Before Code + Closure-Driven Software Development retained public records",
    },
    body: [
      "Boundary First Engineering treats architecture as an invariant-preserving representation problem. Interfaces, abstract classes, services, modules, and deployment boundaries are mechanisms; the primary question is whether the chosen representation is coherent and consistently enforced.",
      "It connects naturally to onion, clean, and hexagonal architecture while keeping domain meaning, dependency direction, executable evidence, and repair visible as first-class constraints.",
    ],
    links: [
      {
        label: "Open Software Before Code",
        href: "/software-before-code",
        eyebrow: "Working public method",
        summary: "Determine the object before selecting the mechanism.",
      },
      {
        label: "Open Closure-Driven Software Development",
        href: "/closure-driven-software-development",
        eyebrow: "Advanced practitioner draft",
        summary: "Turn uncertainty into executable evidence before it hardens into architecture.",
      },
    ],
  },
  {
    id: "ontological-software",
    label: "Ontological Software",
    shortLabel: "Ontology",
    path: "research/software/ontological-software",
    parentId: "software",
    kind: "method",
    eyebrow: "Ontology-driven software synthesis",
    summary:
      "Determine what exists, how it relates, what states are admissible, and what transitions preserve meaning before deciding how the code should be shaped.",
    body: [
      "A sufficiently explicit ontology can drive schemas, validation, APIs, workflows, state machines, tests, documentation, permissions, and portions of UI structure.",
      "The ambition is not code generation for its own sake. It is to reduce representational drift by deriving executable surfaces from a shared domain grammar.",
    ],
  },
  {
    id: "executable-representation",
    label: "Executable Representation",
    shortLabel: "Executable Rep.",
    path: "research/software/executable-representation",
    parentId: "software",
    kind: "method",
    eyebrow: "Software as formal representation",
    summary:
      "Software is an executable representation of a domain: primitives, admissible constructions, transitions, invariants, and operational semantics made runnable.",
    body: [
      "A representation is itself a boundary. It exposes distinctions, hides others, constrains what can be expressed, and determines which operations are lawful.",
      "This creates direct bridges to formal grammars, programming-language semantics, DSLs, schemas, protocols, parsers, compilers, interpreters, and model-driven systems.",
    ],
    inspection: [
      {
        id: "executable-distinctions-paper",
        label: "Executable Distinctions",
        eyebrow: "Working public argument",
        summary:
          "The retained paper makes the representation-to-consequence chain explicit: symbols become operational when an authorized interpreter recognizes a distinction and an executable path can change state.",
        bullets: [
          "Token, semantic, and operational layers remain distinct.",
          "The software class example ties specification to instances, state, admissible operations, and invariants.",
          "The paper's governing test is whether a system can name and preserve the distinctions its execution still needs.",
          "The claim is structural and comparative; it does not equate institutions, persons, and software objects.",
        ],
        sourceRef: "src/content/artifacts/executable-distinctions.md",
        links: [
          {
            label: "See Corpus Forge as an executable representation",
            href: "/corpus-forge",
            eyebrow: "Applied software bridge",
          },
        ],
      },
      {
        id: "visual-grammar-paper",
        label: "Original Visual Grammar",
        eyebrow: "Working explanatory model",
        summary:
          "A retained design/provenance note for class-to-consequence and symbol-to-consequence diagrams with authority, witness, contestability, and repair made explicit.",
        bullets: [
          "Class -> instance -> state -> admissible operation -> consequence -> invariant check.",
          "Symbol -> interpreter -> classification -> authority gate -> operation -> state transition -> consequence -> contestability.",
          "Failure routes through witness, responsibility, repair, and return to governable state.",
        ],
        sourceRef: "src/content/artifacts/original-visual-grammar.md",
      },
    ],
  },
  {
    id: "boundary-first-architecture",
    label: "Boundary First Architecture",
    shortLabel: "Architecture",
    path: "research/software/boundary-first-architecture",
    parentId: "software",
    kind: "method",
    eyebrow: "System structure",
    summary:
      "Architecture as controlled dependency, explicit ownership, semantic interfaces, lifecycle boundaries, and localized invariant maintenance.",
    body: [
      "Onion, clean, and hexagonal architectures are useful precedents because they make dependency direction and domain protection visible. Boundary First treats those mechanisms as means to a deeper end: preserving consequential distinctions under composition.",
      "The architecture question is therefore not which pattern name wins. It is which structure keeps meaning, authority, failure, observation, and repair from leaking across boundaries that cannot lawfully carry them.",
    ],
  },
  {
    id: "boundary-first-ux",
    label: "Boundary First UX",
    shortLabel: "UX",
    path: "research/software/boundary-first-ux",
    parentId: "software",
    kind: "standard",
    eyebrow: "Human-system boundary",
    summary:
      "Represent the domain faithfully enough that navigation and interaction correspond to intelligible traversal through the system.",
    status: {
      stage: "developed",
      label: "Developed standard - launch candidate",
      detail:
        "A working public standard with a substantial interaction grammar, flagship demonstration, accessibility requirements, and proposed conformance levels. The conformance levels are not yet canonical.",
      sourceStatus: "launch-candidate",
      provenance: "Boundary First UX public standard record",
    },
    body: [
      "Boundary First UX treats the interface as an operational boundary: it should expose state, afford lawful action, prevent invalid transitions, preserve identity and provenance through transformation, and make recovery obvious.",
      "This website is itself a live demonstration: tree orientation over a graph, typed transitions, a persistent boundary frame, through-inspection, and gestalt zoom. The retained standard adds a larger grammar of orient, traverse, inspect, reveal, reframe, trace, stress, repair, and promote.",
    ],
    links: [
      {
        label: "Open the full Boundary First UX standard",
        href: "/boundary-first-ux",
        eyebrow: "Working public standard",
        summary: "Flagship sequence, semantic stack, motion laws, accessibility, and conformance questions.",
      },
    ],
    inspection: [
      {
        id: "bfux-resolution-grammar",
        label: "Resolution and motion grammar",
        eyebrow: "Retained BFUX semantics",
        summary:
          "The existing BFUX record already defines motion as semantics rather than decoration, which directly grounds the new spine interaction model.",
        bullets: [
          "Lateral motion means Traverse.",
          "Through-screen motion means Reveal.",
          "World rotation means Reframe.",
          "Zoom beyond frame means Promote.",
          "Accessibility requires keyboard completeness, reduced-motion parity, screen-reader semantics, non-spatial alternatives, and no color- or position-only essential meaning.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-ux.json",
        links: [
          {
            label: "Inspect the BFUX standard",
            href: "/boundary-first-ux",
            eyebrow: "Full public record",
          },
        ],
      },
    ],
  },
  {
    id: "verification-governance",
    label: "Verification & Governance",
    shortLabel: "Verification",
    path: "research/software/verification-governance",
    parentId: "software",
    kind: "method",
    eyebrow: "Closure, authority, accountability",
    summary:
      "Testing, observability, provenance, permissions, auditability, and lifecycle responsibility as parts of the same executable system boundary.",
    body: [
      "Verification explores admissible and failure states, then traces defects back to missing contracts, boundary errors, violated invariants, or unobserved consequences.",
      "Governance asks who may cause which state transition, under what authority, with what evidence, which consequence channel can disagree, and who owns repair when the claim fails.",
    ],
    inspection: [
      {
        id: "consequence-bearing-development",
        label: "Consequence-Bearing Development",
        eyebrow: "Candidate operating framework",
        summary:
          "A retained software/AI operating framework keeps work open until an independent consequence channel can answer the claim, discrepancy is owned, repair occurs, and closure is earned.",
        bullets: [
          "Candidate circuit: Represent -> Bound -> Commit -> Execute -> Instrument -> Observe -> Compare -> Repair -> Verify -> Close.",
          "Generation, detection, diagnosis, repair design, authorization, execution, verification, and closure remain distinct even when AI contributes to several stages.",
          "The present claim ceiling is a candidate operating framework requiring worked cases, red-team review, field use, and comparison with established assurance disciplines.",
        ],
        sourceRef: "src/content/artifacts/consequence-bearing-development-and-ai-repair-loops.md",
        links: [
          {
            label: "See the Agency Audit pilot surface",
            href: "/agency-audit",
            eyebrow: "Applied governance service",
          },
          {
            label: "See Closure-Driven Software Development",
            href: "/closure-driven-software-development",
            eyebrow: "Practitioner method",
          },
        ],
      },
    ],
  },
  {
    id: "applied-testbeds",
    label: "Applied Testbeds",
    path: "research/applied-testbeds",
    parentId: "research",
    kind: "research",
    eyebrow: "Bounded domain experiments",
    summary:
      "Weather, games, sport, and law as bounded places to test transport of the method. A testbed is evidence-seeking work, not a claim of universal domain expertise.",
  },
  {
    id: "boundary-first-weather",
    label: "Boundary First Weather",
    shortLabel: "Weather",
    path: "research/applied-testbeds/weather",
    parentId: "applied-testbeds",
    kind: "research",
    eyebrow: "Weather simulation research",
    summary:
      "A boundary-aware computational research program testing diagnostics, structural error, compression, ensemble comparison, and selective refinement alongside established weather science.",
    status: {
      stage: "pilot",
      label: "Pilot-ready research",
      detail:
        "A research program with a planned computational demonstrator and bounded pilot question. It does not claim improved operational forecasts, speed, or external validation.",
      sourceStatus: "pilot-ready-research-program",
      provenance: "Boundary First Weather public research record",
    },
    links: [
      {
        label: "Open Boundary First Weather",
        href: "/weather",
        eyebrow: "Public research program",
        summary: "Hypothesis, demonstrator plan, validation ladder, pilot, and claim firewall.",
      },
    ],
  },
  {
    id: "boundary-first-chess",
    label: "Boundary First Chess",
    shortLabel: "Chess",
    path: "research/applied-testbeds/chess",
    parentId: "applied-testbeds",
    kind: "research",
    eyebrow: "Discrete strategy testbed",
    summary:
      "A practitioner-facing testbed for boundaries, state, admissible moves, possibility spaces, witness, consequence, and strategic closure in a familiar formal game.",
    status: {
      stage: "developed",
      label: "Developed working doctrine",
      detail: "A public working doctrine and testbed, not a claim of a new chess engine or competitive superiority.",
      sourceStatus: "working-public-doctrine",
      provenance: "Product landing manifest",
    },
    links: [
      { label: "Open Boundary First Chess", href: "/chess", eyebrow: "Public doctrine" },
    ],
  },
  {
    id: "boundary-first-soccer",
    label: "Boundary First Soccer",
    shortLabel: "Soccer",
    path: "research/applied-testbeds/soccer",
    parentId: "applied-testbeds",
    kind: "research",
    eyebrow: "Continuous multi-agent testbed",
    summary:
      "A continuous, noisy, multi-agent public on-ramp for testing whether boundary reasoning remains useful beyond discrete game state.",
    status: {
      stage: "developed",
      label: "Developed working doctrine",
      detail: "A public working doctrine and active theory-development project, not a shipped sports analytics product.",
      sourceStatus: "working-public-doctrine",
      provenance: "Product landing manifest + project index",
    },
    links: [
      { label: "Open Boundary First Soccer", href: "/soccer", eyebrow: "Public doctrine" },
    ],
  },
  {
    id: "constitutional-law",
    label: "Constitutional Law & Jurisprudence",
    shortLabel: "Law",
    path: "research/applied-testbeds/law",
    parentId: "applied-testbeds",
    kind: "research",
    eyebrow: "Legal research testbed",
    summary:
      "A public legal research program using representation, authority, admissibility, standing, consequence, contest, and repair as bounded comparative lenses.",
    status: {
      stage: "developed",
      label: "Developed working research program",
      detail: "A working public research program; it is not legal advice, a legal service, or an assertion of institutional legal authority.",
      sourceStatus: "working-public-research-program",
      provenance: "Product landing manifest",
    },
    links: [
      { label: "Open the law research program", href: "/law", eyebrow: "Public research program" },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    path: "research/foundations",
    parentId: "research",
    kind: "research",
    eyebrow: "Primitive structure",
    summary:
      "The deeper conceptual and mathematical primitives under executable representation and Boundary First software practice.",
  },
  {
    id: "distinction",
    label: "Distinction",
    path: "research/foundations/distinction",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Primitive difference",
    summary:
      "The primitive act or structure by which one admissible state, object, region, or value is made distinguishable from another.",
  },
  {
    id: "bound-distinction",
    label: "Bound Distinction",
    path: "research/foundations/bound-distinction",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Maintained distinction",
    summary:
      "A distinction carried inside a boundary or grammar that determines its admissible identity, complement, and operations.",
  },
  {
    id: "bit",
    label: "The Bit",
    path: "research/foundations/bit",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Calibration anchor",
    summary:
      "The bit serves as a calibration anchor: a minimal lawful distinction that can participate in compositional state-transition systems.",
  },
  {
    id: "distinction-space",
    label: "Distinction Space",
    path: "research/foundations/distinction-space",
    parentId: "foundations",
    kind: "foundation",
    eyebrow: "Formalization",
    summary:
      "A formal setting for studying distinctions, boundaries, admissible structure, relations, transformations, and the spaces those distinctions generate.",
  },
  {
    id: "formal-theory",
    label: "Formal Theory",
    path: "research/formal-theory",
    parentId: "research",
    kind: "research",
    eyebrow: "Formal research program",
    summary:
      "Higher-order formal work that generalizes the software doctrine beyond a single implementation domain.",
  },
  {
    id: "boundary-theory",
    label: "Boundary Theory",
    path: "research/formal-theory/boundary-theory",
    parentId: "formal-theory",
    kind: "theory",
    eyebrow: "Formal research",
    summary:
      "A research program seeking rigorous cross-domain primitives and structure-preserving relationships around boundaries, distinctions, representation, and closure.",
    inspection: [
      {
        id: "operational-homology-program",
        label: "Testing Cross-Domain Operational Homology",
        eyebrow: "Active bounded research program",
        summary:
          "A retained negative-capable research program tests whether recurring cross-domain vocabulary preserves linked operational structure rather than merely sharing words.",
        bullets: [
          "The unit of comparison is a tuple of roles, relations, state, transitions, invariants, boundaries, witnesses, failures, responsibility, and repair.",
          "Mappings are graded L0 through L5; token resemblance and semantic resemblance are explicitly weaker than operational homology.",
          "The program includes bounded invoice and research-provenance cases plus a counterexample ledger that rejects or limits mappings when structure breaks.",
          "A negative or bounded result counts as successful research when it blocks a stronger false claim.",
        ],
        sourceRef: "src/content/artifacts/testing-cross-domain-operational-homology.md",
      },
    ],
  },
  {
    id: "schemathematics",
    label: "Schemathematics",
    path: "research/formal-theory/schemathematics",
    parentId: "formal-theory",
    kind: "theory",
    eyebrow: "Operational mathematics",
    summary:
      "An operational atlas approach to mathematical structure: what objects do, which constraints they introduce, and how they transform across representations.",
    status: {
      stage: "active-development",
      label: "Research program draft",
      detail: "A current formal research program draft with a public retained record; publication maturity is intentionally distinct from product maturity.",
      sourceStatus: "research-program-draft",
      provenance: "Product landing manifest",
    },
    links: [
      { label: "Open Schemathematics", href: "/schemathematics", eyebrow: "Formal research record" },
    ],
  },
  {
    id: "moonshots",
    label: "Moonshots",
    path: "research/moonshots",
    parentId: "research",
    kind: "research",
    eyebrow: "Long-horizon research objectives",
    summary:
      "Eight long-horizon objectives that organize where the Lab's research machinery is pointed without treating ambition as present-tense capability.",
    body: [
      "Moonshots are long-horizon research objectives, not claims of completion. Each one must remain decomposable into bounded programs, measurable work, explicit open problems, and evidence that can survive criticism.",
      "The shared test is practical: current footholds should be visible now, progress should be measurable, and stronger capability claims should wait for prototypes, adversarial review, replication, and broader deployment evidence.",
    ],
    links: [
      {
        label: "How We Work",
        href: "/about/how-we-work",
        eyebrow: "Method and release discipline",
        summary: "How source, hypothesis, execution, observation, repair, and promotion remain distinct.",
      },
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "Present-tense operative surface",
        summary: "Where pieces of the longer-horizon architecture are already being turned into software and bounded services.",
      },
    ],
    inspection: [
      {
        id: "moonshots-evaluation",
        label: "How the moonshots are judged",
        eyebrow: "Evidence before rhetoric",
        summary:
          "The long-horizon program is useful only if it creates measurable intermediate capability rather than aspirational language.",
        bullets: [
          "Track accepted persistent work per unit of human supervisory effort.",
          "Measure repair rates, evidence validity, provenance completeness, and downstream reuse.",
          "Test whether independent agents can continue prior work without reconstructing hidden conversational context.",
          "Compare cross-domain transfer against native disciplinary baselines rather than conceptual resemblance.",
          "Treat negative results, demotions, and exposed limits as successful research when they block stronger false claims.",
          "Keep technical ambition separate from claims about scientific validation, market value, external adoption, or inevitability.",
        ],
        sourceRef:
          "Boundary First Labs — Moonshots: Long-Horizon Research Strategy, 2026-09-20",
      },
    ],
  },
  {
    id: "research-operating-system",
    label: "Research Operating System",
    shortLabel: "Research OS",
    path: "research/moonshots/research-operating-system",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Hybrid research infrastructure",
    summary:
      "A durable research substrate where humans, neural models, symbolic state, formal tools, experiments, and computation can accumulate coherent work over time.",
    body: [
      "The target is not an AI that does research by itself. It is an operating environment in which heterogeneous actors can inherit explicit state, execute bounded work, attach evidence and provenance, and leave the institution in a better inspectable state.",
      "Current footholds include Corpus Forge, recursive research-system architecture, durable registers and queues, work transactions, evidence surfaces, and sustained human-agent repository construction. Open work includes a rigorous symbolic state model, cross-agent continuation, auditability, failure repair, and measurable supervision cost.",
    ],
    links: [
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Current foothold",
        summary: "Governed research memory, claim state, criticism, promotion, supersession, and repair.",
      },
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Closure discipline",
        summary: "Evidence, authority, discrepancy, repair, and earned closure for executable claims.",
      },
    ],
    inspection: [
      {
        id: "research-os-progress",
        label: "What would count as progress",
        eyebrow: "Operational test",
        summary:
          "The Research OS earns credibility when work can persist and compose across actors without relying on hidden conversational reconstruction.",
        bullets: [
          "Typed shared research state survives model and session changes.",
          "Independent workers can inherit bounded state and produce reusable additions.",
          "Work units retain inputs, constraints, transforms, outputs, evidence, and validation status.",
          "Human review cost decreases without hiding failure or authority boundaries.",
          "Accepted outputs remain useful to later work instead of evaporating as one-shot generations.",
        ],
      },
    ],
  },
  {
    id: "distributed-scientific-intelligence",
    label: "Distributed Scientific Intelligence",
    shortLabel: "Distributed Science",
    path: "research/moonshots/distributed-scientific-intelligence",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Networked bounded contribution",
    summary:
      "A distributed research network where people, agents, formal solvers, simulations, instruments, and institutions can contribute bounded work to shared state.",
    body: [
      "A node should not need the entire Lab in context. It should receive a typed work unit with relevant state, goal, constraints, authority, evidence requirements, and a validation contract, then return a result that can be evaluated independently.",
      "The unresolved problems are coordination problems as much as intelligence problems: identity, synchronization, conflict reconciliation, evidence transport, reproducible execution, authority across institutions, and governance for open contribution.",
    ],
    inspection: [
      {
        id: "distributed-science-contract",
        label: "Minimum distributed contract",
        eyebrow: "Candidate interface",
        summary:
          "A distributed contribution becomes meaningful when the receiving system can determine what was authorized, what changed, and what evidence supports the change.",
        bullets: [
          "Relevant input state is explicit.",
          "Goal and constraints are bounded.",
          "Authority is carried with the work rather than inferred.",
          "Evidence and provenance requirements are known before execution.",
          "Validation can occur independently of the worker that produced the result.",
        ],
      },
    ],
  },
  {
    id: "mathematical-interoperability",
    label: "Mathematical Interoperability",
    shortLabel: "Math Interoperability",
    path: "research/moonshots/mathematical-interoperability",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Formal tools across disciplinary boundaries",
    summary:
      "Make more of the mathematics and formal machinery that already exists across disciplines practically translatable, composable, and testable.",
    body: [
      "The working premise is narrower than a universal mathematics: difficult problems are often blocked not only by missing tools, but by disciplinary separation, incompatible vocabularies, inaccessible representations, and the cost of recognizing which existing formal machinery applies.",
      "AI is useful here as a search and translation layer across formal dialects, but the mathematics remains the constraint. The research burden is to state what a translation preserves, weakens, strengthens, introduces, forgets, or breaks.",
    ],
    links: [
      {
        label: "Boundary Theory",
        href: "/research/formal-theory/boundary-theory",
        eyebrow: "Formal bridge",
        summary: "Structure-preserving comparison under explicit claim control.",
      },
      {
        label: "Distinction Space",
        href: "/research/foundations/distinction-space",
        eyebrow: "Formal substrate",
        summary: "A candidate setting for path-dependent possibility, admissibility, and transformation.",
      },
    ],
    inspection: [
      {
        id: "math-interoperability-burden",
        label: "Interoperability burden",
        eyebrow: "Translation must expose loss",
        summary:
          "A useful crossing should say more than that two disciplines use similar words or diagrams.",
        bullets: [
          "Declare the native objects on both sides before translating.",
          "Name preserved invariants and any structure that is weakened or forgotten.",
          "Distinguish equivalence, compatibility, reduction, analogy, and convenience.",
          "Test composition rather than isolated pairwise resemblance.",
          "Compare against competent native methods and retain counterexamples.",
        ],
      },
    ],
  },
  {
    id: "executable-science",
    label: "Executable Science",
    path: "research/moonshots/executable-science",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Machine-addressable scientific work",
    summary:
      "Move more claims, assumptions, evidence, experiments, theories, contradictions, and proof obligations into inspectable machine-addressable research objects.",
    body: [
      "The objective is not to reduce science to software. It is to make more of the scientific process executable where execution is appropriate while preserving uncertainty, domain expertise, peer criticism, negative results, and human judgment.",
      "Current footholds include executable-representation research, machine-addressable artifact contracts, experiment registers, research-state review, evidence/provenance machinery, and bounded execution queues.",
    ],
    links: [
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Nearest operational bridge",
        summary: "Representation, state, admissible transitions, invariants, and execution made explicit.",
      },
      {
        label: "Paper Mine",
        href: "/research/paper-mine",
        eyebrow: "Publication workbench",
        summary: "A controlled field for candidate papers, evidence obligations, readiness, and promotion state.",
      },
    ],
    inspection: [
      {
        id: "executable-science-open-problems",
        label: "Open problems",
        eyebrow: "What remains unsolved",
        summary:
          "Executable research objects become scientifically useful only if they preserve the differences among proof, simulation, measurement, inference, and narrative argument.",
        bullets: [
          "Formal semantics for machine-addressable theories and evidence.",
          "Interoperability among proofs, simulations, measurements, datasets, and prose arguments.",
          "Reproducibility as tools, models, and environments change.",
          "Explicit preservation of uncertainty, negative results, and unresolved contradictions.",
          "Interfaces between executable machinery and ordinary scientific peer review.",
        ],
      },
    ],
  },
  {
    id: "formal-representation-mechanics",
    label: "Formal Representation Mechanics",
    shortLabel: "Representation Mechanics",
    path: "research/moonshots/formal-representation-mechanics",
    parentId: "moonshots",
    kind: "theory",
    eyebrow: "Categorical-algebraic formalization",
    summary:
      "Develop Boundary Theory into a rigorous grammar-centered framework for decomposition, admissible transformation, closure, defect, and lawful recomposition of representations.",
    body: [
      "The current direction is categorical-algebraic. Formal grammars define representational regimes; states inhabit path-dependent possibility spaces; admissibility determines lawful states and transforms; categorical structure governs composition; algebraic structure governs operations inside particular regimes; closure and defect track completion, mismatch, loss, obstruction, and repair.",
      "The in-house Distinction Space term is provisionally grounded as a path-dependent possibility space: lawful continuation can depend on the path or history by which a represented state was reached. The open burden is to connect that formulation cleanly to established mathematics and produce nontrivial witness results without renaming existing structure unnecessarily.",
    ],
    links: [
      {
        label: "Boundary Theory",
        href: "/research/formal-theory/boundary-theory",
        eyebrow: "Core formal program",
        summary: "Cross-domain formal research under adversarial claim control.",
      },
      {
        label: "Schemathematics",
        href: "/research/formal-theory/schemathematics",
        eyebrow: "Algebraic and atlas machinery",
        summary: "Operational structure, constraints, and transforms across representations.",
      },
      {
        label: "Distinction Space",
        href: "/research/foundations/distinction-space",
        eyebrow: "Core object",
        summary: "The path-dependent possibility-space direction underlying the current formalization.",
      },
    ],
    inspection: [
      {
        id: "representation-mechanics-compression",
        label: "Current formal compression",
        eyebrow: "Working grammar",
        summary:
          "One useful compression of the emerging mechanics is a sequence of bounded construction, lawful transformation, and tested recomposition.",
        bullets: [
          "Bound: establish the representational regime.",
          "Distinguish: expose the state-bearing differences that matter.",
          "Grammarize: declare admissible constructions and operations.",
          "Transform: apply lawful state or representation changes.",
          "Close: test the declared completion or stabilization conditions.",
          "Recompose: return the transformed local result to a larger regime without silently losing required structure.",
        ],
      },
    ],
  },
  {
    id: "self-improving-research-infrastructure",
    label: "Self-Improving Research Infrastructure",
    shortLabel: "Self-Improving Infrastructure",
    path: "research/moonshots/self-improving-research-infrastructure",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Research that improves its own machinery",
    summary:
      "A governed feedback loop where successful research can improve the representations, methods, tools, and infrastructure used by later research.",
    body: [
      "The target is institutional learning, not an autonomous self-modification mandate. Research should be able to produce validated improvements to its own routing, formalization, evidence handling, execution, review, and repair machinery.",
      "Any such change remains bounded by provenance, validation, rollback, authority, and human consequence gates. The central risk is self-confirming drift: machinery that optimizes for its own internal signals while degrading contact with external evidence.",
    ],
    links: [
      {
        label: "How We Work",
        href: "/about/how-we-work",
        eyebrow: "Institutional discipline",
        summary: "The release and correction boundaries that keep improvement separate from uncontrolled promotion.",
      },
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Repair and closure",
        summary: "Independent consequence channels, discrepancy ownership, repair, and earned closure.",
      },
    ],
    inspection: [
      {
        id: "self-improving-infrastructure-guardrails",
        label: "Required guardrails",
        eyebrow: "Improvement must remain reversible and inspectable",
        summary:
          "The machinery should be able to learn from use without making its own success criteria unchallengeable.",
        bullets: [
          "Separate genuine process improvement from local metric optimization.",
          "Promote new machinery through explicit review rather than silent replacement.",
          "Regression-test new machinery against prior successful and failed cases.",
          "Preserve provenance across versions so changed behavior remains reconstructable.",
          "Retain rollback and human authority for consequential changes.",
        ],
      },
    ],
  },
  {
    id: "millennium-problems-research",
    label: "Millennium Problems Research",
    shortLabel: "Millennium Problems",
    path: "research/moonshots/millennium-problems-research",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Adversarial theorem and proof-program calibration",
    summary:
      "Use the seven Clay Millennium Prize Problems as heterogeneous stress tests for theorem-facing derivation, proof-program analysis, computational probes, and explicit closure and defect machinery.",
    body: [
      "The program does not treat the Millennium Problems as one problem or one proof technique. It maintains a seven-problem research instrument, problem-specific branches, specialist computational packages, and a comparative layer for studying representations, proof grammars, closure obligations, persistent defects, candidate repairs, and possible regime transitions.",
      "The Lab's working label Millennium Problem Theory names the comparative study of attempted proof grammars. It is internal research-program vocabulary, not a recognized external field and never a substitute for theorem-level proof. For every open Millennium Prize Problem, terminal success remains a valid mathematical proof of the exact theorem statement together with appropriate external verification.",
    ],
    links: [
      {
        label: "Formal Representation Mechanics",
        href: "/research/moonshots/formal-representation-mechanics",
        eyebrow: "Cross-problem formal machinery",
        summary:
          "The grammar, admissibility, closure, defect, and recomposition machinery being stress-tested against resistant theorem obligations.",
      },
      {
        label: "Mathematical Interoperability",
        href: "/research/moonshots/mathematical-interoperability",
        eyebrow: "Cross-disciplinary formal translation",
        summary:
          "A neighboring objective for making mathematical structure more explicitly translatable without collapsing equivalence, analogy, or reduction.",
      },
    ],
    inspection: [
      {
        id: "millennium-problems-claim-firewall",
        label: "What would count as progress",
        eyebrow: "Proof authority remains external to the Lab machinery",
        summary:
          "The research program can produce useful comparative structure without promoting analysis, computation, or candidate repair into a solved-problem claim.",
        bullets: [
          "Maintain the exact theorem statement and native mathematical validation standard for each problem.",
          "Use the solved Poincare case as a calibration environment rather than evidence that the same machinery solves the open cases.",
          "Separate finite computation, structural correspondence, closure analysis, defect localization, and candidate repair from theorem-level proof.",
          "Treat failed proof programs and negative results as useful only when their obstruction is localized and typed.",
          "Require a valid proof and appropriate external mathematical verification before any solved-problem claim.",
        ],
        sourceRef:
          "Boundary First Labs — 03_Domains/01_formal_systems__domain_family/03_millennium_problems__research_program/README.md + 00_MILLENNIUM_PROBLEMS_INDEX.md",
      },
    ],
  },
  {
    id: "fine-structure-constant",
    label: "Fine-Structure Constant Program",
    shortLabel: "Fine-Structure Constant",
    path: "research/moonshots/fine-structure-constant",
    parentId: "moonshots",
    kind: "research",
    eyebrow: "Fundamental-constant derivation under falsification pressure",
    summary:
      "Use the fine-structure constant as a stringent calibration problem for whether geometric and representational hypotheses can become a parameter prediction without hiding normalization freedom, scale dependence, or fitted structure.",
    body: [
      "The current corpus contains an exact variational parameterization of electromagnetic coupling, sensitivity and identifiability results, several numerical conjectures, and strong negative results. It does not yet contain a zero-free-parameter, first-principles derivation of the low-energy fine-structure constant.",
      "The research target has therefore moved from finding a compact expression near 137 to a harder question: whether the electromagnetic direction can cease to be independently free on a globally admissible trajectory in coupling space, with the low-energy coupling appearing as an infrared projection of that deeper structure.",
    ],
    links: [
      {
        label: "Formal Representation Mechanics",
        href: "/research/moonshots/formal-representation-mechanics",
        eyebrow: "Reduction, observability, and admissible forgetting",
        summary:
          "The alpha program supplies concrete tests for exact versus projected reductions, universality, and representation-induced defect.",
      },
      {
        label: "Mathematical Interoperability",
        href: "/research/moonshots/mathematical-interoperability",
        eyebrow: "Physics / geometry / RG translation",
        summary:
          "The program requires disciplined translation among gauge theory, renormalization-group flow, geometry, and the Lab's internal representational vocabulary.",
      },
    ],
    inspection: [
      {
        id: "fine-structure-constant-claim-firewall",
        label: "Current claim ceiling",
        eyebrow: "A difficult calibration target, not a derived constant",
        summary:
          "The strongest present result is a sharper statement of what a successful derivation would have to remove or determine, together with explicit branches that have already failed.",
        bullets: [
          "Retain the exact Coulomb-plus-surface parameterization and its identifiability and sensitivity results.",
          "Preserve the normalization obstruction: isolated U(1) cover, topology, and charge data do not fix the positive gauge-metric normalization modulus.",
          "Treat compact expressions and correction series near the measured value as numerical conjectures until generated by a declared action or operator model.",
          "Do not promote truncation residuals, cover cardinalities, or numerical proximity into fundamental-constant derivations.",
          "Require a declared scale, renormalization prescription, closure mechanism, and independently constrained parameter-selection rule for a first-principles claim.",
        ],
        sourceRef:
          "Boundary First Labs — 03_Domains/02_natural_systems__domain_family/01_physics__domain/fine_structure_alpha_vertical_slice/finestructurealpha-README.md + finestructurealpha-canonical_position.md",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    path: "about",
    parentId: "root",
    kind: "branch",
    eyebrow: "Institution and provenance",
    summary:
      "Who the lab is, how it works, where the methods came from, and how to get in touch.",
  },
  {
    id: "the-lab",
    label: "The Lab",
    path: "about/the-lab",
    parentId: "about",
    kind: "about",
    eyebrow: "Institution",
    summary:
      "Boundary First Labs as a software research and engineering lab whose primary medium is executable systems and computational analysis.",
  },
  {
    id: "how-we-work",
    label: "How We Work",
    path: "about/how-we-work",
    parentId: "about",
    kind: "about",
    eyebrow: "Practice",
    summary:
      "Start from the domain boundary, make state and constraints explicit, build the smallest coherent representation, then test it against reality.",
  },
  {
    id: "provenance",
    label: "Provenance",
    path: "about/provenance",
    parentId: "about",
    kind: "about",
    eyebrow: "History and sources",
    summary:
      "The professional, computational, mathematical, scientific, and public-interest lineage behind the lab's methods and artifacts.",
  },
  {
    id: "contact",
    label: "Contact",
    path: "about/contact",
    parentId: "about",
    kind: "about",
    eyebrow: "Work with the lab",
    summary:
      "Contact and engagement details for software engineering, pilot audits, research collaboration, and public-interest work.",
    links: [
      {
        label: "Email Boundary First Labs",
        href: "mailto:contact@boundaryfirstlabs.com",
        eyebrow: "Contact",
      },
    ],
  },
];

export const edges: GraphEdge[] = [
  { from: "distinction-space", to: "executable-representation", type: "grounds", label: "grounds" },
  { from: "bit", to: "bound-distinction", type: "instantiates", label: "calibrates" },
  { from: "ontological-software", to: "executable-representation", type: "depends-on", label: "depends on" },
  { from: "boundary-first-engineering", to: "boundary-first-architecture", type: "contains", label: "contains" },
  { from: "boundary-first-ux", to: "executable-representation", type: "applies-to", label: "applies" },
  { from: "corpus-forge", to: "executable-representation", type: "demonstrates", label: "demonstrates" },
  { from: "corpus-forge", to: "verification-governance", type: "depends-on", label: "requires" },
  { from: "agency-audit", to: "verification-governance", type: "applies-to", label: "applies" },
  { from: "citywatch", to: "executable-representation", type: "demonstrates", label: "demonstrates" },
  { from: "augusta-civic", to: "citywatch", type: "derived-from", label: "informed by" },
  { from: "tools-experiments", to: "applied-testbeds", type: "applies-to", label: "continues in" },
  { from: "projectr", to: "ontological-software", type: "applies-to", label: "would apply" },
  { from: "need-capacity-map", to: "augusta-civic", type: "applies-to", label: "related public-interest pattern" },
  { from: "boundary-first-weather", to: "executable-representation", type: "demonstrates", label: "tests transport of" },
  { from: "boundary-theory", to: "distinction-space", type: "extends", label: "extends" },
  { from: "schemathematics", to: "boundary-theory", type: "applies-to", label: "formal apparatus for" },
  { from: "research-operating-system", to: "corpus-forge", type: "extends", label: "builds toward" },
  { from: "research-operating-system", to: "verification-governance", type: "depends-on", label: "requires" },
  { from: "mathematical-interoperability", to: "boundary-theory", type: "applies-to", label: "tests through" },
  { from: "executable-science", to: "executable-representation", type: "extends", label: "extends" },
  { from: "formal-representation-mechanics", to: "boundary-theory", type: "extends", label: "formalizes" },
  { from: "formal-representation-mechanics", to: "distinction-space", type: "depends-on", label: "develops from" },
  { from: "self-improving-research-infrastructure", to: "verification-governance", type: "depends-on", label: "requires" },
];

const nodeById = new Map(nodes.map((node) => [node.id, node]));
const nodeByPath = new Map(nodes.map((node) => [node.path, node]));

export function getNode(id: string): ContentNode {
  return nodeById.get(id) ?? nodeById.get("root")!;
}

export function getNodeByPath(pathSegments: string[]): ContentNode {
  const path = pathSegments.join("/");
  return nodeByPath.get(path) ?? nodeById.get("root")!;
}

export function getChildren(id: string): ContentNode[] {
  return nodes.filter((node) => node.parentId === id);
}

export function getParent(id: string): ContentNode | undefined {
  const node = getNode(id);
  return node.parentId ? getNode(node.parentId) : undefined;
}

export function getAncestors(id: string): ContentNode[] {
  const result: ContentNode[] = [];
  let cursor = getNode(id);

  while (cursor.parentId) {
    cursor = getNode(cursor.parentId);
    result.unshift(cursor);
  }

  return result;
}

export function getSiblings(id: string): ContentNode[] {
  const node = getNode(id);
  if (!node.parentId) return [];
  return getChildren(node.parentId);
}

export function getPathForNode(id: string): string {
  const node = getNode(id);
  return node.path ? `/${node.path}` : "/";
}

export function isDescendantOf(descendantId: string, ancestorId: string): boolean {
  if (descendantId === ancestorId) return true;
  let cursor = getNode(descendantId);

  while (cursor.parentId) {
    if (cursor.parentId === ancestorId) return true;
    cursor = getNode(cursor.parentId);
  }

  return false;
}

export function getImmediateChildTowardFocus(
  gestaltId: string,
  focusId: string,
): ContentNode | undefined {
  if (gestaltId === focusId) return undefined;
  const children = getChildren(gestaltId);
  return children.find((child) => isDescendantOf(focusId, child.id));
}

export function getCrossEdges(id: string): Array<GraphEdge & { node: ContentNode }> {
  return edges.flatMap((edge) => {
    if (edge.from === id) {
      return [{ ...edge, node: getNode(edge.to) }];
    }

    if (edge.to === id) {
      return [{ ...edge, node: getNode(edge.from) }];
    }

    return [];
  });
}

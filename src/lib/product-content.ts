import type { ContentNode } from "@/lib/content";

type ProductOverride = Partial<
  Pick<ContentNode, "eyebrow" | "summary" | "body" | "links" | "inspection">
>;

const productOverrides: Record<string, ProductOverride> = {
  products: {
    body: [
      "The visible product spine is a curated projection over a larger work graph. Grouping something under Current Work, Shipped Work, Product Pipeline, or Tools & Experiments does not change the underlying artifact's identity, provenance, maturity, or evidence boundary.",
      "The retained work corpus contains programs, products, product families, professional instruments, protocols, utilities, and research-heavy opportunities at different stages. The public spine promotes only the distinctions useful for navigation while keeping richer adjacent work available as inspectable context.",
    ],
    links: [
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "Operating surface",
        summary: "Active development and bounded pilot work with explicit maturity boundaries.",
      },
      {
        label: "Shipped Work",
        href: "/products/shipped",
        eyebrow: "Delivered standing",
        summary: "Historical systems that were actually delivered or operated.",
      },
      {
        label: "Product Pipeline",
        href: "/products/pipeline",
        eyebrow: "Governed concepts",
        summary: "Developed, recurring, and emerging concepts that have not earned a shipped-product claim.",
      },
    ],
    inspection: [
      {
        id: "products-reading-the-portfolio",
        label: "How to read the portfolio",
        eyebrow: "Promotion and claim boundary",
        summary:
          "The portfolio is intentionally typed so architectural richness does not get flattened into implied availability or maturity.",
        bullets: [
          "Public grouping is a projection over one work graph; it does not silently upgrade standing, lifecycle, or provenance.",
          "A developed concept may contain substantial architecture without being a shipped product.",
          "An active-development program may have working internal machinery without being production-ready for outside use.",
          "A pilot means a bounded engagement surface exists; it does not mean the method has been generally validated.",
          "A historical shipped system supports delivery standing without implying a current client, sponsor, or institutional relationship.",
          "The retained public projection does not promote a case study until a bounded case record and evidence gate are present.",
        ],
        sourceRef: "src/content/public-projections/work.json + src/content/work_portfolio.json",
      },
    ],
  },
  "current-work": {
    body: [
      "Current means there is a present operating surface, not that every current item has the same maturity. Corpus Forge is an active software and research-operations program; the Agency & Representation Audit is a bounded pilot service. Their claims remain deliberately different.",
      "The deeper work graph also retains product expressions around these programs: an Integrated Corpus Forge Workbench, a Claim and Evidence Ledger, a Boundary-First Engineering Workbench, and an Agency Audit Platform. Those adjacent artifacts remain context until their own public product boundaries are strong enough to deserve separate promotion.",
    ],
    links: [
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Active development",
        summary: "Governed corpus, claim, provenance, review, supersession, and repair infrastructure.",
      },
      {
        label: "Agency & Representation Audit",
        href: "/products/current/agency-representation-audit",
        eyebrow: "Pilot intake",
        summary: "A bounded audit of authority, representation, consequence, contestability, and repair.",
      },
    ],
    inspection: [
      {
        id: "current-work-adjacent-artifacts",
        label: "Adjacent artifacts in the work graph",
        eyebrow: "Rich corpus, bounded promotion",
        summary:
          "Several concrete software expressions already exist in the retained work model without being promoted into separate public navigation claims.",
        bullets: [
          "Integrated Corpus Forge Workbench: an AI-assisted research and authoring environment where chat, sources, claims, citations, and durable corpus transformations stay connected.",
          "Claim and Evidence Ledger: a focused surface for claims, sources, assumptions, counterevidence, maturity, ownership, review, supersession, and permitted public wording.",
          "Boundary-First Engineering Workbench: a professional environment for extracting actors, permissions, boundaries, invariants, failure modes, interfaces, closure conditions, and repair ownership before architecture hardens.",
          "Agency Audit Platform: a structured assessment product concept around authority, remaining options, challenge, consequence, and repair.",
          "These are retained product expressions and opportunities; their presence in the graph is not a claim of public availability or independent deployment.",
        ],
        sourceRef: "src/content/public-projections/work.json#programs-methods",
      },
    ],
  },
  "shipped-work": {
    body: [
      "Shipped Work is the strongest delivery category in the public product spine because it is reserved for systems that actually crossed from representation into operation. Historical delivery remains evidence of professional standing even when the original institutional relationship is no longer current.",
      "The historical label is part of the evidence model, not a demotion. It prevents past delivery from being rhetorically converted into a present client relationship while preserving what the work demonstrates about implementation, constraints, maintenance, and public consequence.",
    ],
    inspection: [
      {
        id: "shipped-work-standing",
        label: "What historical shipped work establishes",
        eyebrow: "Delivery without affiliation laundering",
        summary:
          "Historical work may establish implementation and delivery standing while later outcomes, awards, adoption, and present relationships require their own evidence.",
        bullets: [
          "Delivery standing concerns what was actually built or operated.",
          "Historical provenance remains attached to the organization and context in which the work occurred.",
          "Current sponsorship, endorsement, partnership, or maintenance is never inferred from historical delivery.",
          "Outcome claims stronger than the retained record remain behind evidence review.",
        ],
        sourceRef: "src/content/product-landing-pages/augusta-citywatch.json + v2 shipped-work projection",
      },
    ],
  },
  "planned-products": {
    body: [
      "The pipeline preserves product ideas once they are coherent enough to have a durable problem boundary, architecture, recurring definition, or relationship to other work. It is intentionally broader than the small set of concepts promoted as navigation nodes.",
      "Confirmed, emerging, and candidate standing in the retained portfolio describe the source corpus, not market availability. Product-family relationships are useful because they show which concepts share infrastructure or invariants; they do not turn neighboring concepts into launched products.",
    ],
    inspection: [
      {
        id: "pipeline-retained-families",
        label: "Retained directions beyond the visible spine",
        eyebrow: "Not promoted as available products",
        summary:
          "The richer work graph contains several adjacent product families that remain behind the public promotion gate.",
        bullets: [
          "Constructive Media Protocol: infrastructure for attribution, versioning, relation, transport, correction, and preservation of constructive public knowledge.",
          "Barter and Capacity Exchange: a civic-economic exchange concept for matching underused goods, services, time, tools, space, care, expertise, and productive capacity to represented need.",
          "Barter Ledger: an exploratory accounting and settlement layer where the ledger technology is selected by the invariant of the exchange rather than treated as the purpose.",
          "Child-Safe Video Calling: a bounded communication utility designed so a child can receive a live human connection without receiving general control of the device.",
          "Family Presence Mode and Single-Purpose Phone Modes extend the same bounded-interaction idea toward caregiving, accessibility, elder support, medical instruction, navigation, appointments, and other trusted single-purpose contexts.",
          "These records preserve product lineage and architectural possibility; they are not claims of present availability, deployment, or committed roadmap scope.",
        ],
        sourceRef: "src/content/public-projections/work.json#public-products",
      },
      {
        id: "pipeline-relational-families",
        label: "Why the concepts are related",
        eyebrow: "Product graph",
        summary:
          "The pipeline contains coherent families rather than a bag of unrelated ideas, which makes shared infrastructure and promotion paths easier to inspect.",
        bullets: [
          "Projectr, YouTube Knowledge Explorer, Cross-Platform Bookshelf, and Constructive Media Protocol share a durable-knowledge and constructive-media lineage.",
          "Need & Capacity Map, Barter and Capacity Exchange, and Barter Ledger share a capacity, matching, reciprocity, and accounting lineage.",
          "Child-Safe Video Calling, Family Presence Mode, and Single-Purpose Phone Modes share a bounded-interaction and accessibility lineage.",
          "Relations are retained because they constrain future design choices; they are not evidence that every related concept should be built.",
        ],
        sourceRef: "src/content/public-projections/work.json + src/content/work_portfolio.json",
      },
    ],
  },
  "corpus-forge": {
    body: [
      "The richer work projection describes Corpus Forge as a workbench for turning notes, documents, conversations, models, and experiments into a traceable, versioned research system through source preservation, claim extraction, artifact classification, contradiction tracking, maturity control, provenance, review gates, and replacement documents.",
      "The underlying source intentionally separates the Corpus Forge method/program from possible maintained product surfaces. The Workbench is the integrated research environment; the Claim and Evidence Ledger is a smaller focused module. Neither distinction is used here to imply an independently shipped product.",
      "The practical value is reconstructibility: unstructured work can become criticizable knowledge without erasing where claims came from, how mature they are, what contradicts them, which artifacts depend on them, or which later record superseded them.",
    ],
    links: [
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Supporting research",
        summary: "The evidence, discrepancy, repair, authority, and earned-closure discipline beneath governed research operations.",
      },
    ],
    inspection: [
      {
        id: "corpus-forge-product-shape",
        label: "Program, Workbench, and Ledger",
        eyebrow: "Source-model distinction",
        summary:
          "The retained work graph separates an operating method/program from two useful software product shapes without pretending those shapes have the same delivery standing.",
        bullets: [
          "Corpus Forge is the wider research-operations and corpus-stewardship program.",
          "Integrated Corpus Forge Workbench is the workspace where chat, sources, documents, claims, citations, and structured transformations remain connected.",
          "The Workbench design constraint is explicit: the chatbot is not the product; durable and governed transformation of the corpus is the product.",
          "Claim and Evidence Ledger is a narrower surface for evidence maturity, ownership, review, counterevidence, supersession, and permitted wording.",
          "The public claim remains active development; this structure is not evidence of production readiness or external adoption.",
        ],
        sourceRef: "src/content/public-projections/work.json#programs-methods",
      },
    ],
  },
  "agency-audit": {
    body: [
      "The retained work graph also describes a possible software product expression of the audit: a structured assessment environment for determining who can act, who authorized the action, what meaningful options remain, who can challenge or reverse it, who bears the consequence, and who owns repair.",
      "That platform concept does not change the current public offer. The operative surface remains a bounded professional pilot because the hard part is not filling out a scorecard; it is reconstructing a real consequential process with enough evidence, authority, affected-party context, and implementation access to discover where responsibility actually breaks.",
    ],
    inspection: [
      {
        id: "agency-audit-service-platform-boundary",
        label: "Service now, platform as retained product shape",
        eyebrow: "Promotion boundary",
        summary:
          "The source corpus contains both a developed audit framework and a software-product opportunity, while the public claim remains deliberately narrower: pilot intake for a bounded audit engagement.",
        bullets: [
          "The service is organized around authority, representation, consequence, contestability, and repair.",
          "The platform concept would make delegated agency and responsibility chains inspectable across software, AI, organizations, and institutional processes.",
          "A repeatable software representation could support the method, but software does not substitute for domain access, evidence, accountable judgment, or repair authority.",
          "The current pilot label does not imply regulatory certification, legal advice, fairness certification, security assurance, or general validation.",
        ],
        sourceRef: "src/content/public-projections/work.json#programs-methods + src/content/product-landing-pages/agency-representation-audit.json",
      },
    ],
  },
  projectr: {
    body: [
      "The retained product projection frames the public value more specifically: turn attention into structured agency and reusable knowledge, support collaborative planning and learning, and create a durable home for constructive media rather than engagement-only media.",
      "Projectr sits in a small product family rather than standing alone. YouTube Knowledge Explorer and Cross-Platform Bookshelf are narrower entry surfaces; Constructive Media Protocol is the adjacent infrastructure idea for attribution, versioning, correction, portability, and lineage across systems.",
    ],
    links: [
      {
        label: "YouTube Knowledge Explorer",
        href: "/products/pipeline/youtube-knowledge-explorer",
        eyebrow: "Related product concept",
        summary: "A narrower learning surface for turning selected video into explicit learning paths.",
      },
      {
        label: "Cross-Platform Bookshelf",
        href: "/products/pipeline/cross-platform-bookshelf",
        eyebrow: "Related product concept",
        summary: "A personal knowledge organizer that preserves learning intent across media formats.",
      },
    ],
    inspection: [
      {
        id: "projectr-constructive-media-family",
        label: "Constructive-media product family",
        eyebrow: "Relationship context",
        summary:
          "Projectr is the broad platform concept; the surrounding records test smaller ways of making durable, revisable knowledge useful before a platform claim is earned.",
        bullets: [
          "Primary objects are projects, plans, goals, procedures, learning paths, evidence, progress, and reusable knowledge rather than disposable engagement posts.",
          "YouTube Knowledge Explorer narrows the problem to structured learning over selected video.",
          "Cross-Platform Bookshelf narrows the problem to preserving why media was saved and what it produced.",
          "Constructive Media Protocol asks how attribution, lineage, forking, correction, and transport could survive across platform boundaries.",
          "The retained architecture is developed; none of these relationships imply current public deployment.",
        ],
        sourceRef: "src/content/public-projections/work.json#public-products",
      },
    ],
  },
  "youtube-knowledge-explorer": {
    body: [
      "The core product idea is not another recommendation feed. It is to convert selected video into a navigable learning environment where sequence, prerequisites, notes, progress, summaries, and the reason for the next item remain explicit.",
      "The retained public projection identifies teachers, creators, families, and independent learners as candidate users because each has the same structural problem: useful video knowledge is abundant, but the learning path and durable context around it are usually weak or scattered.",
    ],
    links: [
      {
        label: "Projectr",
        href: "/products/pipeline/projectr",
        eyebrow: "Wider platform lineage",
        summary: "The broader constructive-media and structured-knowledge platform concept.",
      },
      {
        label: "Cross-Platform Bookshelf",
        href: "/products/pipeline/cross-platform-bookshelf",
        eyebrow: "Adjacent utility",
        summary: "A cross-format organizer for preserving learning intent and resulting knowledge.",
      },
    ],
    inspection: [
      {
        id: "youtube-explorer-product-boundary",
        label: "What the concept is trying to preserve",
        eyebrow: "Bounded product concept",
        summary:
          "The product boundary is the learning structure around selected media, not ownership of the underlying video platform or a claim of replacing educators.",
        bullets: [
          "Preserve why a video belongs in the path.",
          "Make dependencies and sequence inspectable rather than leaving them implicit in a playlist order.",
          "Connect notes, progress, summaries, and next-step reasoning to the learner's durable context.",
          "Provide a narrow on-ramp into the larger Projectr knowledge environment without requiring the larger platform first.",
          "Current standing is a confirmed bounded concept; no public availability or adoption claim is made.",
        ],
        sourceRef: "src/content/public-projections/work.json#public-products",
      },
    ],
  },
  "cross-platform-bookshelf": {
    body: [
      "The problem is not saving another link. It is preserving learning intent across videos, articles, podcasts, books, documents, and courses: why the item mattered, where it belongs, what the person meant to do with it, what progress was made, what it relates to, and what knowledge or action resulted.",
      "That makes the Bookshelf a small information-mechanics problem. A useful representation should reduce fragmentation across formats without forgetting the distinctions that make the saved material actionable later.",
    ],
    links: [
      {
        label: "Projectr",
        href: "/products/pipeline/projectr",
        eyebrow: "Wider platform lineage",
        summary: "The constructive-media platform that can turn retained knowledge into coordinated projects and plans.",
      },
      {
        label: "YouTube Knowledge Explorer",
        href: "/products/pipeline/youtube-knowledge-explorer",
        eyebrow: "Adjacent learning utility",
        summary: "A narrower path-oriented representation for selected video learning.",
      },
    ],
    inspection: [
      {
        id: "bookshelf-information-boundary",
        label: "From saved media to usable memory",
        eyebrow: "Representation problem",
        summary:
          "A bookmark stores location. The richer concept stores enough context to reconstruct why the material belonged in the person's knowledge system.",
        bullets: [
          "Preserve learning intent instead of merely accumulating references.",
          "Connect consumption to projects, goals, questions, and later action.",
          "Keep relationships across media formats visible without forcing them into one source platform.",
          "Treat resulting knowledge or action as part of the record rather than assuming consumption was the endpoint.",
          "Current standing is a recurring confirmed concept, not an available product claim.",
        ],
        sourceRef: "src/content/public-projections/work.json#public-products",
      },
    ],
  },
  "need-capacity-map": {
    body: [
      "The retained product record deliberately starts smaller than an alternative economic system. First represent underused resources, unmet needs, matching constraints, and trusted organizations well enough to create coordination value without requiring a new currency or settlement architecture.",
      "That bounded wedge can also produce evidence. If a larger exchange or ledger is ever justified, the map should reveal which distinctions, obligations, trust relationships, constraints, and failure modes the larger system actually needs to preserve instead of beginning with a preferred financial technology.",
    ],
    inspection: [
      {
        id: "need-capacity-map-first-wedge",
        label: "Why start with the map",
        eyebrow: "Smallest coherent public-interest product",
        summary:
          "The map is useful precisely because coordination can be tested before committing to a currency, ledger, or complete exchange architecture.",
        bullets: [
          "Immediate value can come from making capacity and need mutually legible.",
          "Candidate contexts include neighborhoods, nonprofits, schools, disaster response, and mutual-aid coordination; these are use hypotheses, not deployment claims.",
          "Matching constraints and trusted organizations remain first-class because available capacity alone does not make a match admissible.",
          "Observed use can generate evidence about what a later Barter and Capacity Exchange would need to preserve.",
          "A future ledger should be selected by the invariant of the exchange system rather than inventing an economic invariant to justify a favored ledger technology.",
        ],
        sourceRef: "src/content/public-projections/work.json#public-products",
      },
      {
        id: "need-capacity-map-related-architecture",
        label: "Related exchange architecture",
        eyebrow: "Retained, not promoted",
        summary:
          "The wider corpus connects the map to a Barter and Capacity Exchange and a Barter Ledger, but the relationship is architectural rather than a roadmap promise.",
        bullets: [
          "Barter and Capacity Exchange broadens the matching problem to goods, services, time, tools, space, transport, care, expertise, inventory, and productive capacity.",
          "Barter Ledger explores durable accounting for reciprocal obligation, contribution, mutual credit, portable reputation, and settlement.",
          "Blockchain is retained as one possible implementation choice, not as the product purpose.",
          "The map remains the candidate first wedge because it can test coordination assumptions with less infrastructure and fewer invented commitments.",
        ],
        sourceRef: "src/content/public-projections/work.json + src/content/work_portfolio.json",
      },
    ],
  },
  "tools-experiments": {
    inspection: [
      {
        id: "tools-experiments-promotion",
        label: "What experiments are for",
        eyebrow: "Evidence before promotion",
        summary:
          "An experiment earns value by exposing structure, breakpoints, or implementation constraints; it does not need to become a product to justify its existence.",
        bullets: [
          "A testbed can reject transport from another domain and still be useful.",
          "A prototype can establish an interaction or architectural constraint without establishing product demand.",
          "A worked example can reveal a missing state, relation, permission, or invariant before a larger implementation hardens around the omission.",
          "Promotion requires a stronger public object and claim boundary than the experiment itself.",
        ],
        sourceRef: "src/content/public-projections/work.json + v2 research/testbed policy",
      },
    ],
  },
};

export function hydrateProductNode(node: ContentNode): ContentNode {
  const override = productOverrides[node.id];
  if (!override) return node;

  return {
    ...node,
    ...override,
    body: override.body ? [...(node.body ?? []), ...override.body] : node.body,
    links: override.links ? [...(node.links ?? []), ...override.links] : node.links,
    inspection: override.inspection
      ? [...(node.inspection ?? []), ...override.inspection]
      : node.inspection,
  };
}

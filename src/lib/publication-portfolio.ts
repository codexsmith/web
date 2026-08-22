import type { ContentNode as BaseContentNode, GraphEdge } from "@/lib/content";
import type { PublicationMetadata } from "@/lib/publication-types";

export type PublicationContentNode = BaseContentNode & {
  publication?: PublicationMetadata;
};

type PublicationItem = {
  id: string;
  label: string;
  shortLabel?: string;
  path: string;
  parentId: string;
  eyebrow: string;
  summary: string;
  body: string[];
  publication: PublicationMetadata;
  links?: BaseContentNode["links"];
  related: Array<{ to: string; type: GraphEdge["type"]; label: string }>;
};

const publicationItems: PublicationItem[] = [
  {
    id: "pub-executable-distinctions",
    label: "Executable Distinctions",
    path: "publications/essays/executable-distinctions",
    parentId: "publication-essays",
    eyebrow: "Long-form public argument",
    summary:
      "A working essay on how symbols become consequential through interpreters, authority, rules, records, executable paths, state transition, contestability, and repair.",
    body: [
      "The manuscript separates token, semantic, and operational layers so a symbolic distinction is not mistaken for consequence by itself. Its central claim is that words become operators when a system recognizes the distinction and is authorized to act on it.",
      "The current publication object is a working v0.1 artifact. Its existence establishes a substantive manuscript and argument, not external validation of every cross-domain comparison it proposes.",
    ],
    publication: {
      stage: "review",
      label: "Working publication · review pending",
      documentClass: "Working long-form publication essay",
      version: "v0.1",
      claimMaturity: "conceptual-public-argument",
      audience: "general / technical",
      nextGate: "Founder and research review; tighten cross-domain claim ceilings before stable release.",
      sourceRef: "src/content/artifacts/executable-distinctions.md",
    },
    links: [
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Research context",
        summary: "The software research object that the publication makes public-facing and operational.",
      },
    ],
    related: [{ to: "executable-representation", type: "documents", label: "publishes argument for" }],
  },
  {
    id: "pub-people-are-not-overhead",
    label: "People Make the Value. People Are Not Overhead.",
    shortLabel: "People Are Not Overhead",
    path: "publications/essays/people-are-not-overhead",
    parentId: "publication-essays",
    eyebrow: "Public doctrine seed",
    summary:
      "A public doctrine and inquiry into human value, accounting boundaries, hidden repair labor, delegated institutional agency, and the difference between reducing cost and relocating consequence.",
    body: [
      "The essay argues against a category error rather than against accounting: a person may appear as an expense, liability, role, or cost-center assignment inside a local ledger without that representation exhausting the person or the productive system that sustains them.",
      "The publication remains a doctrine seed. Its economic and institutional claims should continue to be separated from stronger empirical claims and tested through bounded cases rather than promoted by rhetoric alone.",
    ],
    publication: {
      stage: "seed",
      label: "Public doctrine seed",
      documentClass: "Working public doctrine essay",
      claimMaturity: "public-doctrine-seed",
      audience: "general",
      nextGate: "Bound the economic and labor claims through domain review and worked institutional cases.",
      sourceRef: "src/content/artifacts/people-make-the-value-people-are-not-overhead.md",
    },
    links: [
      {
        label: "Public Interest Principles",
        href: "/public-interest/principles",
        eyebrow: "Institutional context",
      },
    ],
    related: [{ to: "public-principles", type: "documents", label: "develops doctrine for" }],
  },
  {
    id: "pub-social-lawfulness",
    label: "Social Lawfulness, Consequence, and Repair",
    shortLabel: "Social Lawfulness",
    path: "publications/essays/social-lawfulness-consequence-repair",
    parentId: "publication-essays",
    eyebrow: "Program survey",
    summary:
      "A first survey of a developing program connecting social order, economic consequence, digital agency, scientific inquiry, and public access through a repair-oriented systems grammar.",
    body: [
      "The manuscript asks what makes a social, economic, digital, or scientific structure lawful in the Boundary First sense: whether power, authority, standing, evidence, consequence, and repair are represented clearly enough to inspect and contest.",
      "Its breadth is explicitly provisional. The program must continue to show where shared structure helps and where domain-specific knowledge or counterexamples break the analogy.",
    ],
    publication: {
      stage: "draft",
      label: "Program preview · in development",
      documentClass: "Cross-domain program survey",
      claimMaturity: "program-preview",
      audience: "general / interdisciplinary",
      nextGate: "Split broad claims into bounded domain contributions and obtain domain-specific criticism.",
      sourceRef: "src/content/artifacts/social-lawfulness-consequence-and-repair.md",
    },
    links: [
      {
        label: "Public Mission",
        href: "/public-interest/mission",
        eyebrow: "Public-interest context",
      },
    ],
    related: [{ to: "public-mission", type: "documents", label: "extends public program around" }],
  },
  {
    id: "pub-world-class-capacity",
    label: "World Class Is a Capacity We Give",
    shortLabel: "World Class",
    path: "publications/essays/world-class-capacity",
    parentId: "publication-essays",
    eyebrow: "Working public manifesto",
    summary:
      "A working manifesto defining world class as public capacity, responsibility, answerability, and repair rather than prestige or human rank.",
    body: [
      "The piece deliberately treats world class as a contribution standard: what useful distinctions, instruments, capabilities, repair paths, and public goods an institution leaves in the world.",
      "Because the language is rhetorically strong and easily misread as self-certification or human ranking, the current manuscript remains under explicit founder review and retains a high misuse boundary.",
    ],
    publication: {
      stage: "review",
      label: "Recommended language · founder review pending",
      documentClass: "Working public manifesto",
      version: "v0.1",
      claimMaturity: "project-language-candidate",
      audience: "general",
      nextGate: "Founder review and final safeguard language before any stable canonical promotion.",
      sourceRef: "src/content/artifacts/world-class-is-a-capacity-we-give.md",
    },
    links: [
      {
        label: "Public Interest Principles",
        href: "/public-interest/principles",
        eyebrow: "Contribution standard",
      },
    ],
    related: [{ to: "public-principles", type: "documents", label: "states contribution standard for" }],
  },
  {
    id: "pub-software-before-code",
    label: "Software Before Code",
    path: "publications/methods/software-before-code",
    parentId: "publication-methods",
    eyebrow: "Practitioner method",
    summary:
      "A working public engineering method for determining the represented domain, distinctions, invariants, boundaries, witnesses, and closure conditions before implementation mechanisms dominate the design.",
    body: [
      "Software Before Code is one of the most mature practitioner expressions of Boundary First Engineering. It treats code as the operational material of a computational representation rather than the entire engineered object.",
      "The publication is already public as a working method, but working-public status remains distinct from a frozen standard or evidence that the method outperforms established engineering practice in every setting.",
    ],
    publication: {
      stage: "working-public",
      label: "Working Public Method",
      documentClass: "Public engineering method / practitioner guide",
      claimMaturity: "working-public-method",
      audience: "software practitioners",
      nextGate: "External practitioner review, worked cases, and stabilization of the release boundary.",
      sourceRef: "src/content/product-landing-pages/software-before-code.json",
    },
    links: [
      {
        label: "Open Software Before Code",
        href: "/software-before-code",
        eyebrow: "Working public method",
      },
      {
        label: "Boundary First Engineering",
        href: "/research/software/boundary-first-engineering",
        eyebrow: "Research / method context",
      },
    ],
    related: [{ to: "boundary-first-engineering", type: "documents", label: "practitioner publication for" }],
  },
  {
    id: "pub-closure-driven-development",
    label: "Closure-Driven Software Development",
    shortLabel: "Closure-Driven Development",
    path: "publications/methods/closure-driven-software-development",
    parentId: "publication-methods",
    eyebrow: "Advanced practitioner draft",
    summary:
      "A Boundary First engineering method for turning uncertainty into executable evidence before unresolved assumptions harden into architecture.",
    body: [
      "The manuscript organizes delivery as progressive closure under uncertainty: discover, bound, build the delivery skeleton, execute, witness, then repair or promote.",
      "Its current state is explicitly an advanced practitioner draft. The next publication burden is not simply more prose; it is stronger worked cases, external practitioner criticism, and evidence that the method adds clarity without creating process theater.",
    ],
    publication: {
      stage: "draft",
      label: "Advanced practitioner draft",
      documentClass: "Public engineering method / advanced practitioner draft",
      claimMaturity: "advanced-practitioner-draft",
      audience: "software practitioners / delivery leads",
      nextGate: "Worked cases, practitioner review, and release editing.",
      sourceRef: "src/content/product-landing-pages/closure-driven-software-development.json",
    },
    links: [
      {
        label: "Open Closure-Driven Software Development",
        href: "/closure-driven-software-development",
        eyebrow: "Advanced practitioner draft",
      },
      {
        label: "Boundary First Engineering",
        href: "/research/software/boundary-first-engineering",
        eyebrow: "Research / method context",
      },
    ],
    related: [{ to: "boundary-first-engineering", type: "documents", label: "delivery discipline for" }],
  },
  {
    id: "pub-boundary-first-ux",
    label: "Boundary First UX",
    path: "publications/methods/boundary-first-ux",
    parentId: "publication-methods",
    eyebrow: "Working public standard",
    summary:
      "A semantic interaction and representation standard for making complex systems navigable while preserving identity, provenance, context, consequence, and repair across changing views.",
    body: [
      "Boundary First UX is already a substantial working standard with a flagship sequence, semantic stack, motion laws, accessibility obligations, renderer independence, and proposed conformance structure.",
      "Its source explicitly labels it a launch candidate. Stable release still requires conformance decisions, responsive/accessibility validation, and evidence that the interaction grammar works for people beyond the authoring context.",
    ],
    publication: {
      stage: "launch-candidate",
      label: "Working Public Standard · Launch Candidate",
      documentClass: "Public representation / interaction standard",
      claimMaturity: "launch-candidate",
      audience: "UX, product, software, complex-systems practitioners",
      nextGate: "Stabilize conformance language and complete accessibility/human validation before stable launch.",
      sourceRef: "src/content/product-landing-pages/boundary-first-ux.json",
    },
    links: [
      {
        label: "Open Boundary First UX",
        href: "/boundary-first-ux",
        eyebrow: "Working public standard",
      },
      {
        label: "Boundary First UX research object",
        href: "/research/software/boundary-first-ux",
        eyebrow: "Research context",
      },
    ],
    related: [{ to: "boundary-first-ux", type: "documents", label: "public standard for" }],
  },
  {
    id: "pub-consequence-bearing-development",
    label: "Consequence-Bearing Development and AI Repair Loops",
    shortLabel: "Consequence-Bearing Development",
    path: "publications/methods/consequence-bearing-development-ai-repair",
    parentId: "publication-methods",
    eyebrow: "Candidate operating framework",
    summary:
      "A practical introduction to keeping AI-assisted work open until an independent consequence channel exposes discrepancy, repair is owned, and closure is earned.",
    body: [
      "The framework distinguishes persuasive representation from demonstrated effect and makes consequence channels, discrepancy, repair ownership, verification, and closure explicit.",
      "Its status is candidate operating framework, not settled engineering standard. The publication needs bounded operational use, adversarial examples, and practitioner criticism before promotion.",
    ],
    publication: {
      stage: "draft",
      label: "Candidate operating framework",
      documentClass: "Working practitioner framework",
      claimMaturity: "candidate-operating-framework",
      audience: "software / AI practitioners",
      nextGate: "Bounded operational pilots, adversarial examples, and practitioner review.",
      sourceRef: "src/content/artifacts/consequence-bearing-development-and-ai-repair-loops.md",
    },
    links: [
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Research context",
      },
    ],
    related: [{ to: "verification-governance", type: "documents", label: "develops operating framework for" }],
  },
  {
    id: "pub-bounded-consequence-circuit",
    label: "The Bounded Consequence Circuit",
    shortLabel: "Bounded Consequence Circuit",
    path: "publications/methods/bounded-consequence-circuit",
    parentId: "publication-methods",
    eyebrow: "Candidate protocol preview",
    summary:
      "A candidate operational protocol for moving a bounded claim through action, independent consequence, owned repair, verification, and earned closure.",
    body: [
      "The circuit preserves the distinction among what was claimed, authorized, done, observed, inferred, repaired, and left open. It proposes a ten-step diagnostic grammar from representation through closure.",
      "The current object is a protocol preview. Existing engineering workflows may already implement several stages; the research burden is whether making the missing distinctions explicit improves reliability without merely adding ceremony.",
    ],
    publication: {
      stage: "draft",
      label: "Candidate protocol preview",
      documentClass: "Operational protocol preview",
      claimMaturity: "candidate-protocol-preview",
      audience: "software / AI / research operations practitioners",
      nextGate: "Apply in bounded workflows, measure discrepancy/repair usefulness, and revise the minimum circuit.",
      sourceRef: "src/content/artifacts/bounded-consequence-circuit-protocol-preview.md",
    },
    links: [
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Research context",
      },
    ],
    related: [{ to: "verification-governance", type: "documents", label: "proposes protocol for" }],
  },
  {
    id: "pub-people-review-worksheet",
    label: "People Are Not Overhead: Review Worksheet",
    shortLabel: "People Review Worksheet",
    path: "publications/methods/people-are-not-overhead-worksheet",
    parentId: "publication-methods",
    eyebrow: "Candidate review instrument",
    summary:
      "A non-scored worksheet for tracing value, human capacity, hidden repair labor, delegated agency, displaced consequence, standing, and actionable repair in one bounded institutional decision or workflow.",
    body: [
      "The worksheet turns the People Are Not Overhead doctrine into a bounded review instrument rather than an organization-wide moral score.",
      "Its publication burden is practical: use the worksheet on real bounded decisions, record where it produces or fails to produce actionable distinctions, and revise before presenting it as a stable institutional instrument.",
    ],
    publication: {
      stage: "draft",
      label: "Candidate instrument · v0.1",
      documentClass: "Review worksheet / institutional instrument",
      version: "v0.1",
      claimMaturity: "candidate-instrument-v0.1",
      audience: "institutional / operations practitioners",
      nextGate: "Pilot on bounded institutional cases and revise for ambiguity, burden, and actionable repair.",
      sourceRef: "src/content/artifacts/people-are-not-overhead-review-worksheet.md",
    },
    links: [
      {
        label: "Public Interest Principles",
        href: "/public-interest/principles",
        eyebrow: "Governance context",
      },
    ],
    related: [{ to: "public-principles", type: "documents", label: "operationalizes principle for" }],
  },
  {
    id: "pub-language-garden",
    label: "Governing the Language Garden",
    shortLabel: "Language Garden",
    path: "publications/methods/governing-language-garden",
    parentId: "publication-methods",
    eyebrow: "Working public operations note",
    summary:
      "An operating policy for keeping public, research, campaign, and safeguard language reusable without semantic drift or provenance loss.",
    body: [
      "The note treats language itself as governed state: promoted phrases carry meaning, intended context, source path, claim ceiling, known ambiguity, and a replacement path.",
      "The policy is already adopted for the local website implementation while founder approval remains open. That mixed state is precisely why publication status is tracked separately from mere file existence.",
    ],
    publication: {
      stage: "working-public",
      label: "Working policy · locally adopted",
      documentClass: "Working public operations note",
      version: "v0.1",
      claimMaturity: "proposed-operating-policy",
      audience: "research / editorial / institutional operations",
      nextGate: "Founder approval and continued observation of semantic drift/replacement behavior.",
      sourceRef: "src/content/artifacts/governing-the-language-garden.md",
    },
    links: [
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Research operations context",
      },
    ],
    related: [{ to: "corpus-forge", type: "documents", label: "governs public language around" }],
  },
  {
    id: "pub-operational-homology",
    label: "Testing Cross-Domain Operational Homology",
    shortLabel: "Operational Homology",
    path: "publications/research/operational-homology",
    parentId: "publication-research",
    eyebrow: "Working public research note",
    summary:
      "A negative-capable research program with a source-backed starter lexicon, an L0-L5 mapping scale, bounded comparative cases, and an explicit counterexample ledger.",
    body: [
      "The paper asks whether selected cross-domain mappings preserve linked operational structure rather than merely sharing vocabulary. Token or semantic resemblance is intentionally weaker than operational homology.",
      "The program is active and explicitly capable of negative results. External domain review remains a required next gate before stronger cross-domain claims are promoted.",
    ],
    publication: {
      stage: "draft",
      label: "Active bounded research note",
      documentClass: "Working public research note",
      version: "v0.1",
      claimMaturity: "active-bounded-research-program",
      audience: "technical / interdisciplinary research",
      nextGate: "External domain review, additional counterexamples, and stronger bounded comparisons.",
      sourceRef: "src/content/artifacts/testing-cross-domain-operational-homology.md",
    },
    links: [
      {
        label: "Boundary Theory",
        href: "/research/formal-theory/boundary-theory",
        eyebrow: "Formal research context",
      },
    ],
    related: [{ to: "boundary-theory", type: "documents", label: "tests comparison program for" }],
  },
  {
    id: "pub-digital-non-aggression",
    label: "Digital Non-Aggression, Non-Destruction, and Non-Interference",
    shortLabel: "Digital Non-Aggression",
    path: "publications/research/digital-non-aggression",
    parentId: "publication-research",
    eyebrow: "Research-program introduction",
    summary:
      "An introduction to a developing research program on automated digital aggression, authorized-purpose integrity, responsibility continuity, and repair.",
    body: [
      "The publication asks what minimum prohibitions, duties, technical controls, accountability rules, and repair guarantees are required when connected digital systems can propagate consequential operations across boundaries.",
      "It explicitly does not announce a treaty or claim that all connected AI systems are imminent autonomous weapons. The next work is to make the threat model, exceptions, responsibility, and technical controls specific enough to test.",
    ],
    publication: {
      stage: "draft",
      label: "Concept-stage program preview",
      documentClass: "Research-program introduction",
      claimMaturity: "concept-stage-program-preview",
      audience: "security / AI governance / general technical",
      nextGate: "Security and governance review; formalize threat model, exceptions, accountability, and repair tests.",
      sourceRef: "src/content/artifacts/digital-non-aggression-program-introduction.md",
    },
    links: [
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Related governance research",
      },
    ],
    related: [{ to: "verification-governance", type: "extends", label: "extends governance questions from" }],
  },
  {
    id: "pub-schemathematics",
    label: "Schemathematics",
    path: "publications/research/schemathematics",
    parentId: "publication-research",
    eyebrow: "Formal research-program draft",
    summary:
      "A research-program draft studying schemas as lawful generators and carriers of objects, transformations, admissibility conditions, invariants, defects, provenance, and repair.",
    body: [
      "The publication asks what a mathematical object does and which operative profile makes its structure available for comparison, navigation, translation, pedagogy, or machine reasoning.",
      "Its own discipline is conservative: prefer established mathematics wherever it already carries the required structure, and require the added schema representation to earn its cost through concrete explanatory or computational value.",
    ],
    publication: {
      stage: "draft",
      label: "Research program draft",
      documentClass: "Public formal research program",
      claimMaturity: "research-program-draft",
      audience: "mathematics / formal methods / machine reasoning",
      nextGate: "Known-math calibration, formal tightening, and external mathematical review.",
      sourceRef: "src/content/product-landing-pages/schemathematics.json",
    },
    links: [
      {
        label: "Open Schemathematics",
        href: "/schemathematics",
        eyebrow: "Formal research record",
      },
      {
        label: "Schemathematics research object",
        href: "/research/formal-theory/schemathematics",
        eyebrow: "Research context",
      },
    ],
    related: [{ to: "schemathematics", type: "documents", label: "publication program for" }],
  },
  {
    id: "pub-civilizational-first-passage",
    label: "From Externality to Civilizational Repair",
    shortLabel: "Externality to Repair",
    path: "publications/learning/from-externality-to-civilizational-repair",
    parentId: "publication-learning",
    eyebrow: "Learning pathway draft",
    summary:
      "A Boundary First learning pathway from familiar displaced consequences through abstraction without return, operational mechanics, representational evolution, and repair.",
    body: [
      "The pathway is designed as a first passage rather than a single omnibus essay. It moves through Grok, Navigate, Dive, and Apply modes so readers can acquire only the distinctions needed for the next step while preserving location and source access.",
      "Its status is implementation-guidance draft: public copy and canonical promotion are still pending. The pathway can guide experience design without being treated as proof of the formal or empirical claims it explains.",
    ],
    publication: {
      stage: "draft",
      label: "Implementation-guidance draft",
      documentClass: "Learning pathway / public doctrine sequence",
      version: "v0.1",
      claimMaturity: "public doctrine and operational orientation",
      audience: "general / educational",
      nextGate: "Public copy edit, pathway implementation, usability review, and canonical promotion decision.",
      sourceRef: "src/content/publication_pathway.json",
    },
    links: [
      {
        label: "Public Mission",
        href: "/public-interest/mission",
        eyebrow: "Public-purpose context",
      },
      {
        label: "Research",
        href: "/research",
        eyebrow: "Evidence and formal context",
      },
    ],
    related: [{ to: "public-mission", type: "documents", label: "teaching pathway for" }],
  },
  {
    id: "pub-original-visual-grammar",
    label: "Original Visual Grammar: From Distinction to Consequence",
    shortLabel: "Original Visual Grammar",
    path: "publications/learning/original-visual-grammar",
    parentId: "publication-learning",
    eyebrow: "Working design and provenance note",
    summary:
      "A working design and provenance note for accessible diagrams connecting class and symbol declarations to state, consequence, authority, contestability, witness, and repair.",
    body: [
      "The visual grammar is intended to make the executable-distinction argument inspectable rather than merely decorative. Each diagram contains a primary consequence path, a gate that tests the result, and a repair route.",
      "The v0.1 artifact is pending founder, research, and visual review. Publication maturity depends both on conceptual correctness and on whether the visual representation remains accessible and semantically faithful across renderers.",
    ],
    publication: {
      stage: "review",
      label: "Working visual note · review pending",
      documentClass: "Working public design and provenance note",
      version: "v0.1",
      claimMaturity: "working-explanatory-model",
      audience: "general / visual / technical",
      nextGate: "Founder, research, visual, and accessibility review.",
      sourceRef: "src/content/artifacts/original-visual-grammar.md",
    },
    links: [
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Research context",
      },
    ],
    related: [{ to: "executable-representation", type: "documents", label: "visualizes argument around" }],
  },
];

const categoryNodes: PublicationContentNode[] = [
  {
    id: "publications",
    label: "Publications",
    path: "publications",
    parentId: "root",
    kind: "branch",
    eyebrow: "Written work and publication pipeline",
    summary:
      "A first-class portfolio of essays, methods, standards, research notes, learning paths, and public instruments with their manuscript development state kept explicit.",
    body: [
      "Publication status is tracked separately from the maturity of the underlying research, product, or method. A polished manuscript does not validate its subject, and an important research program may still have only a draft public artifact.",
      "The portfolio is therefore a development surface rather than a bibliography. Each publication record names what kind of document exists, what claim maturity it currently carries, who it is for, where its source lives, and which gate remains before stronger public release.",
    ],
    inspection: [
      {
        id: "publications-stage-vocabulary",
        label: "How publication status works",
        eyebrow: "Development state is part of the record",
        summary:
          "The publication pipeline distinguishes document maturity from research validity and from product delivery status.",
        bullets: [
          "Seed: a retained thesis, doctrine, or artifact has enough substance to preserve but is not yet a complete manuscript.",
          "Draft: a substantive written artifact exists and is still under construction, testing, or restructuring.",
          "Working public: the artifact is already public and usable while remaining explicitly revisable.",
          "Review: the artifact is coherent enough for focused founder, editorial, visual, practitioner, or domain review.",
          "Launch candidate: the public object is nearing a stable release boundary but still has named hardening or validation gates.",
          "Published: a stable public version has been released. Publication does not imply proof, empirical validation, endorsement, or permanence.",
          "Superseded: the artifact remains available for provenance while a newer representation carries the current standing.",
        ],
        sourceRef:
          "src/content/artifacts/* + src/content/publication_pathway.json + retained public method/standard records",
      },
      {
        id: "publications-not-validation",
        label: "Publication is not validation",
        eyebrow: "Claim firewall",
        summary:
          "Written maturity and epistemic standing move on different axes and should never be silently collapsed.",
        bullets: [
          "A publication can be well edited while its strongest research claim remains conjectural or unvalidated.",
          "A research result can be technically strong while its public explanation remains immature.",
          "A working method can be useful before comparative evidence establishes superiority over alternatives.",
          "A published public doctrine can state an institutional commitment without becoming an empirical theorem.",
          "Review status names the next publication gate; it does not manufacture external review that has not occurred.",
        ],
        sourceRef: "Boundary First Labs publication and claim-discipline doctrine",
      },
    ],
  },
  {
    id: "publication-essays",
    label: "Essays & Arguments",
    path: "publications/essays",
    parentId: "publications",
    kind: "branch",
    eyebrow: "Long-form public arguments and doctrine",
    summary:
      "Written arguments that translate Boundary First ideas into public, institutional, and cross-domain prose while keeping claim ceilings visible.",
  },
  {
    id: "publication-methods",
    label: "Methods & Standards",
    path: "publications/methods",
    parentId: "publications",
    kind: "branch",
    eyebrow: "Practitioner methods, protocols, standards, and instruments",
    summary:
      "Written artifacts intended to guide construction, review, governance, delivery, interaction, or repair in bounded practice.",
  },
  {
    id: "publication-research",
    label: "Research Programs",
    path: "publications/research",
    parentId: "publications",
    kind: "branch",
    eyebrow: "Formal and cross-domain research manuscripts",
    summary:
      "Research-program notes and formal-development drafts whose public maturity is tracked independently from their underlying proof or validation burden.",
  },
  {
    id: "publication-learning",
    label: "Learning & Visuals",
    path: "publications/learning",
    parentId: "publications",
    kind: "branch",
    eyebrow: "Learning pathways and explanatory representations",
    summary:
      "Educational sequences, visual grammars, and explanatory artifacts designed to make difficult structure legible without flattening the source or its uncertainty.",
  },
];

function toContentNode(item: PublicationItem): PublicationContentNode {
  return {
    id: item.id,
    label: item.label,
    shortLabel: item.shortLabel,
    path: item.path,
    parentId: item.parentId,
    kind: "document",
    eyebrow: item.eyebrow,
    summary: item.summary,
    body: item.body,
    publication: item.publication,
    links: item.links,
    inspection: [
      {
        id: `${item.id}-publication-state`,
        label: "Publication development record",
        eyebrow: item.publication.label,
        summary:
          "This record describes manuscript/publication maturity only. It does not silently promote the evidence or validation standing of the underlying subject.",
        bullets: [
          `Document class: ${item.publication.documentClass}.`,
          `Claim maturity: ${item.publication.claimMaturity}.`,
          `Audience: ${item.publication.audience}.`,
          item.publication.version ? `Version: ${item.publication.version}.` : "Version: source does not declare a stable public version.",
          `Next gate: ${item.publication.nextGate}`,
          `Source: ${item.publication.sourceRef}.`,
        ],
        sourceRef: item.publication.sourceRef,
      },
    ],
  };
}

export const publicationNodes: PublicationContentNode[] = [
  ...categoryNodes,
  ...publicationItems.map(toContentNode),
];

export const publicationEdges: GraphEdge[] = publicationItems.flatMap((item) =>
  item.related.map((relation) => ({
    from: item.id,
    to: relation.to,
    type: relation.type,
    label: relation.label,
  })),
);

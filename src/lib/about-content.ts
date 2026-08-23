import type { ContentNode } from "@/lib/content";

type AboutOverride = Pick<
  ContentNode,
  "eyebrow" | "summary" | "body" | "links" | "inspection"
>;

const aboutOverrides: Record<string, AboutOverride> = {
  about: {
    eyebrow: "Institution, method, and provenance",
    summary:
      "A formation-stage software research and engineering lab turning a long-running body of practice and independent research into inspectable methods, products, public-interest work, and bounded research.",
    body: [
      "Boundary First Labs exists because the work now requires stewardship as well as invention: provenance must be preserved, claims separated by maturity and evidence, released artifacts maintained, criticism made possible, and founder-held structure progressively converted into inspectable institutional structure.",
    ],
    links: [
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "See the work",
        summary: "Active development and bounded pilot work with explicit maturity boundaries.",
      },
      {
        label: "Public Interest",
        href: "/public-interest",
        eyebrow: "Institutional commitments",
        summary: "The public-purpose principles and work the lab expects to be judged against.",
      },
    ],
  },
  "the-lab": {
    eyebrow: "Formation-stage institution",
    summary:
      "A founder-led software research and engineering lab converting mature private practice into products, public goods, bounded research, and an institution capable of criticism, maintenance, and continuity.",
    body: [
      "Boundary First Labs currently operates as a founder-led, AI-enabled micro-lab. The word lab describes the mode of work: build instruments, test representations, preserve evidence, expose defects, and revise what does not survive contact with reality. It is not a claim of institutional scale or a hidden staff.",
      "The institution exists because the underlying corpus has become too interconnected to represent responsibly as unrelated documents. Methods, products, experiments, software, public-interest projects, and formal research carry different maturity levels, evidence standards, dependencies, and maintenance obligations.",
      "The public surface therefore starts where competence is easiest to inspect: software, engineering method, bounded pilots, delivered work, and concrete artifacts. Deeper theory remains available without being made a prerequisite for understanding or working with the lab.",
      "The long-term institutional goal is not founder indispensability. It is to make the strongest parts of the work understandable, criticizable, testable, improvable, teachable, operable, and stewardable by other capable people without losing provenance or responsibility.",
    ],
    inspection: [
      {
        id: "about-formation-stage",
        label: "What exists now",
        eyebrow: "Institutional claim boundary",
        summary:
          "Boundary First Labs is a real operating research and engineering practice at formation stage, not a claim of large-institute scale.",
        bullets: [
          "Founder-led and presently small by design.",
          "AI assists synthesis, comparison, coding, and research operations; it is not presented as an authorizing authority.",
          "Collaborators, reviewers, customers, sponsors, and institutional partners are named only when those relationships actually exist.",
          "Current credibility should rest on inspectable work rather than institutional theater.",
        ],
        sourceRef: "Retained sources: 03_The_Institute.md + 05_founders_note.md",
      },
      {
        id: "about-why-institution",
        label: "Why build an institution around the work?",
        eyebrow: "Stewardship problem",
        summary:
          "A private corpus becomes an institutional problem when continuity, criticism, maintenance, claim separation, and transfer can no longer be carried responsibly by informal personal memory alone.",
        bullets: [
          "The founder supplies provenance and present responsibility.",
          "The work supplies definitions, methods, artifacts, experiments, products, and claims.",
          "The institution supplies review, correction, promotion, maintenance, retirement, transfer, and continuity.",
          "Biography explains origin; it does not validate theory or substitute for evidence.",
        ],
        sourceRef: "Retained source: 03_The_Institute.md",
      },
    ],
  },
  "how-we-work": {
    eyebrow: "Operating discipline",
    summary:
      "Find the boundary, name what must survive, expose the defect, build the smallest coherent artifact, test whether reality closes, then refine without hiding the failed cases.",
    body: [
      "The recurring operating loop is simple: find the hidden boundary -> name the invariant -> expose the defect -> build the smallest useful artifact -> test whether reality closes -> refine. That pattern comes as much from software testing, architecture, Lean delivery, and debugging as from formal research.",
      "Boundary First work begins before implementation. It asks what exists in the domain, what states and transitions are admissible, who owns which decisions, what must remain invariant, where responsibility changes, what failure looks like, and how repair occurs. Implementation follows once those distinctions are coherent enough to carry the work.",
      "Different outputs are held to different standards. A software method, a theorem, a physical conjecture, a governance proposal, and a public essay do not share one validation regime. Analogy can motivate inquiry; it cannot certify the target domain.",
      "Negative results, contradictions, revisions, supersessions, and failed approaches remain part of the record. A framework earns territory only where it improves the map.",
    ],
    inspection: [
      {
        id: "about-ai-forge",
        label: "How the lab uses AI",
        eyebrow: "Instrument, not authority",
        summary:
          "Language models accelerate transformation of the corpus, but generated fluency is not treated as evidence and responsibility does not move into the model.",
        bullets: [
          "AI can compare artifacts, expose buried structure, generate candidate formulations, inspect code, reorganize corpora, and accelerate prototypes.",
          "AI output can become a hypothesis, draft, implementation candidate, or critic input; it does not become proof or external validation by generation alone.",
          "Provenance, claim status, testing, domain review, criticism, and accountable human judgment remain part of release.",
          "The working metaphor is: AI is a forge, not an oracle.",
        ],
        sourceRef: "Retained sources: 03_The_Institute.md + 05_founders_note.md",
      },
      {
        id: "about-release-discipline",
        label: "Research and release discipline",
        eyebrow: "Claim governance",
        summary:
          "Breadth increases the need to separate claims rather than letting one success silently validate another domain.",
        bullets: [
          "Source before synthesis.",
          "One bounded contribution at a time.",
          "Analogy is not proof.",
          "Negative results and contradictions remain visible.",
          "Corrections and supersessions preserve why the representation changed.",
          "External reviewers are invited to find where the work fails, not merely to lend status to it.",
        ],
        sourceRef: "Retained source: 03_The_Institute.md",
      },
    ],
  },
  provenance: {
    eyebrow: "Founder and method lineage",
    summary:
      "A long-running software, systems, human-factors, AI, and independent research practice that predates the current generative-AI era and became progressively formalized through repeated testing and representation work.",
    body: [
      "Boundary First Labs did not begin as a recent response to generative AI or as a top-down attempt to invent a universal theory. The current work is the legible institutional form of a longer software, research, and systems-analysis practice.",
      "Nicholas 'Nick' Smith is a Georgia Tech-trained computer scientist and senior software engineer whose training combined computer science, artificial intelligence, systems architecture, human factors, and cognition. His later professional work spans web applications, APIs, databases, cloud infrastructure, mobile systems, consulting, regulated environments, inherited systems, and delivery under real budget and operational constraints.",
      "Software became the practical laboratory because representation becomes executable there. Omitted distinctions return quickly as defects: broken workflows, invalid states, hidden manual processes, brittle integrations, contradictory requirements, or people forced to absorb work the system failed to represent.",
      "Two habits became especially important. Formal grammar asks what the primitives are, which compositions are valid, and which semantic distinctions must survive. Testing traverses state space, seeks edge cases, exposes failure, reconstructs the missing boundary or contract, and tests again.",
      "The broader research corpus grew by carrying those habits into mathematics, physics, AI, institutions, public systems, cognition, and other bounded domains while repeatedly tightening claim ceilings. The continuity is methodological, not a claim that the domains are identical.",
      "Capable language models greatly accelerated indexing, comparison, criticism, recomposition, and prototyping. They accelerated the assembly of the current corpus; they did not originate the underlying professional practice or become evidence for its claims.",
      "Boundary First Labs is the current institutional phase of that work: converting founder-held methods, decisions, and research into durable products, public goods, independently testable claims, and structures other capable people can inspect, challenge, improve, operate, and eventually steward. Founder provenance explains origin and present responsibility; it does not validate the work by biography.",
    ],
    links: [
      {
        label: "Inspect Boundary First Engineering",
        href: "/research/software/boundary-first-engineering",
        eyebrow: "Applied method",
        summary: "The professional software lane where the method is easiest to inspect directly.",
      },
      {
        label: "Inspect CityWatch",
        href: "/products/shipped/citywatch",
        eyebrow: "Historical shipped work",
        summary: "A delivered civic-software example from the professional lineage.",
      },
    ],
    inspection: [
      {
        id: "about-founder-standing",
        label: "Founder standing",
        eyebrow: "Accountable authorship",
        summary:
          "Founder provenance matters because the work has a real origin and responsibility should not be hidden behind an artificial institutional 'we'.",
        bullets: [
          "Georgia Tech-trained computer scientist with AI, systems, human-factors, and cognition study in the formative period.",
          "Professional software practice across application, integration, data, cloud, mobile, consulting, and regulated environments.",
          "Long-running independent research practice predating current generative AI systems.",
          "Founder experience supplies provenance and accountable authorship; it does not validate formal or scientific claims by biography.",
        ],
        sourceRef: "Retained sources: 02_Ethos_and_Origin.md + 05_founders_note.md",
      },
      {
        id: "about-method-genealogy",
        label: "Where the method came from",
        eyebrow: "Operational genealogy",
        summary:
          "Boundary First emerged iteratively from practical techniques that repeatedly paid rent across difficult domains.",
        bullets: [
          "Software architecture made boundaries, ownership, contracts, dependencies, and state explicit.",
          "Formal grammars supplied primitives, admissible composition, parsing, semantics, and transformation rules.",
          "Testing and debugging supplied defect-guided reconstruction of missing contracts and edge conditions.",
          "Human factors and cognition kept representation tied to real users, perception, embodiment, and non-normative states.",
          "Scientific method supplied falsification, comparison, negative capability, and promotion only after evidence.",
          "Lean and Agile practice supplied bounded experiments, smallest coherent artifacts, feedback, and revision under constraint.",
        ],
        sourceRef: "Retained sources: 02_Ethos_and_Origin.md + 05_founders_note.md",
      },
    ],
  },
  contact: {
    eyebrow: "Work with the lab",
    summary:
      "Contact Boundary First Labs for software and systems work, bounded audits and pilots, research collaboration, external review, public-interest projects, or support for turning mature work into maintained public artifacts.",
    body: [
      "The best engagements are bounded enough to inspect. A useful first conversation identifies the system or artifact in question, the consequence or failure that matters, who has authority and access, what evidence is available, and what would count as a useful next decision.",
      "Collaboration works best through complementarity. Boundary First Labs should bring developed methods, representations, software judgment, research infrastructure, or prototypes; collaborators should bring domain authority, practical experience, implementation capacity, distribution, infrastructure, capital, stewardship, or access that the lab cannot responsibly substitute for.",
      "The aim is the smallest relationship that can evaluate, improve, apply, distribute, fund, or responsibly place the work. Prospective organizations are not presented as partners until a real relationship exists.",
    ],
    links: [
      {
        label: "Email Boundary First Labs",
        href: "mailto:contact@boundaryfirstlabs.com",
        eyebrow: "Direct contact",
        summary: "Start with the problem, boundary, or artifact you want to inspect.",
      },
      {
        label: "Inspect the Agency Audit",
        href: "/agency-audit",
        eyebrow: "Bounded pilot",
        summary: "A concrete engagement shape for consequential software and institutional systems.",
      },
      {
        label: "Inspect Corpus Forge",
        href: "/corpus-forge",
        eyebrow: "Research infrastructure",
        summary: "A current software and research-operations program with an explicit development boundary.",
      },
    ],
    inspection: [
      {
        id: "about-contact-scope",
        label: "What makes a useful first inquiry?",
        eyebrow: "Engagement boundary",
        summary:
          "A specific system, decision, artifact, or research question is much easier to evaluate than a request for generalized transformation.",
        bullets: [
          "Name the system, artifact, or decision boundary.",
          "Describe what is difficult, failing, uncertain, or worth building.",
          "Identify who owns the relevant authority, evidence, and implementation access.",
          "State the practical constraint: time, budget, regulation, maintenance, safety, or organizational capacity.",
          "Define what a useful next decision would look like even if the result is negative.",
        ],
        sourceRef: "Retained collaboration doctrine and Agency Audit engagement model",
      },
    ],
  },
};

export function hydrateAboutNode(node: ContentNode): ContentNode {
  const override = aboutOverrides[node.id];
  return override ? { ...node, ...override } : node;
}

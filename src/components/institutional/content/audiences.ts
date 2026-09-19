export type AudienceJourneyStep = {
  label: string;
  title: string;
  href: string;
  reason: string;
};

export type AudienceJourney = {
  id:
    | "researcher"
    | "engineer"
    | "funder"
    | "collaborator"
    | "client"
    | "critic"
    | "curious";
  label: string;
  shortLabel: string;
  question: string;
  description: string;
  tone:
    | "research"
    | "practice"
    | "funding"
    | "collaboration"
    | "client"
    | "critique"
    | "curious";
  steps: readonly AudienceJourneyStep[];
  action: {
    label: string;
    href: string;
  };
};

export const audienceTraversalPrinciples = [
  {
    label: "SAME LAB",
    title: "Different order, same underlying objects.",
    description:
      "Audience paths reorder the existing public surfaces. They do not create separate versions of the research, evidence, products, or institutional state.",
  },
  {
    label: "START WITH INTENT",
    title: "The first useful question is why you came.",
    description:
      "A reviewer, client, funder, collaborator, and curious visitor should not all be forced through the same explanatory sequence before they can find what matters.",
  },
  {
    label: "BRANCH FREELY",
    title: "A path is guidance, not a tunnel.",
    description:
      "Every step remains an ordinary public page. You can leave the suggested sequence whenever another object, relationship, or question becomes more relevant.",
  },
] as const;

export const audienceJourneys: readonly AudienceJourney[] = [
  {
    id: "researcher",
    label: "Researcher / technical reviewer",
    shortLabel: "Researcher",
    question: "I want to evaluate the research.",
    description:
      "Start with the program boundaries, then inspect claims, experiments, publication state, and evidence before deciding what deserves deeper review.",
    tone: "research",
    steps: [
      {
        label: "01 · ORIENT",
        title: "Research",
        href: "/v3/research",
        reason: "See active programs, states, boundaries, and the method braid before evaluating individual claims.",
      },
      {
        label: "02 · ASSERTIONS",
        title: "Claims",
        href: "/v3/claims",
        reason: "Inspect what is actually being asserted, including native validation and authority posture.",
      },
      {
        label: "03 · TESTS",
        title: "Experiments",
        href: "/v3/experiments",
        reason: "Follow tests, controls, acceptance predicates, results, and limitations where the source register provides them.",
      },
      {
        label: "04 · RELEASE",
        title: "Publications",
        href: "/v3/publications",
        reason: "See which research objects have been shaped into bounded publication records and what state they are in.",
      },
      {
        label: "05 · SUPPORT",
        title: "Evidence",
        href: "/v3/evidence",
        reason: "Separate prior execution, current Lab-native evidence, and what the evidence still does not establish.",
      },
    ],
    action: {
      label: "Offer technical review",
      href: "/v3/contact?type=research-review&source=start-researcher",
    },
  },
  {
    id: "engineer",
    label: "Engineer / practitioner",
    shortLabel: "Engineer",
    question: "I want to see how this behaves as engineering.",
    description:
      "Begin with things that run or can be applied, then inspect the project cases and machinery that make the work operational.",
    tone: "practice",
    steps: [
      {
        label: "01 · USE",
        title: "Products",
        href: "/v3/products",
        reason: "Start with concrete interfaces and tools rather than the theory vocabulary.",
      },
      {
        label: "02 · CASES",
        title: "Projects",
        href: "/v3/projects",
        reason: "Inspect bounded project cases, implementation context, and what each case actually demonstrated.",
      },
      {
        label: "03 · MACHINERY",
        title: "Apparatus",
        href: "/v3/apparatus",
        reason: "See the registered components, entrypoints, side effects, integration state, and authority ceilings behind the work.",
      },
      {
        label: "04 · APPLY",
        title: "Applied Work",
        href: "/v3/applied-work",
        reason: "Understand how the Lab turns representational and systems methods into bounded outside engagements.",
      },
      {
        label: "05 · CHECK",
        title: "Evidence",
        href: "/v3/evidence",
        reason: "Compare implementation capability with the actual evidence available today.",
      },
    ],
    action: {
      label: "Bring an engineering problem",
      href: "/v3/contact?type=applied-work&source=start-engineer",
    },
  },
  {
    id: "funder",
    label: "Funder / sponsor",
    shortLabel: "Funder",
    question: "I want to know what support would accelerate.",
    description:
      "Start with the funding model, then inspect current priorities, evidence, and project surfaces before deciding whether a bounded conversion is worth supporting.",
    tone: "funding",
    steps: [
      {
        label: "01 · MODEL",
        title: "Funding",
        href: "/v3/funding",
        reason: "See what kinds of support the Lab is asking for and what funding is not allowed to imply.",
      },
      {
        label: "02 · PRIORITY",
        title: "Now / Roadmap",
        href: "/v3/now",
        reason: "See where current capacity is being allocated and what would count as meaningful closure.",
      },
      {
        label: "03 · EVIDENCE",
        title: "Evidence",
        href: "/v3/evidence",
        reason: "Inspect demonstrated capability separately from future promise.",
      },
      {
        label: "04 · DEPLOYMENT",
        title: "Projects",
        href: "/v3/projects",
        reason: "See the concrete work that funding, sponsorship, or partnership could help move across a boundary.",
      },
    ],
    action: {
      label: "Discuss funding",
      href: "/v3/contact?type=funding&source=start-funder",
    },
  },
  {
    id: "collaborator",
    label: "Collaborator / institutional partner",
    shortLabel: "Collaborator",
    question: "I want to work with the Lab on something real.",
    description:
      "Start with the collaboration contract, then inspect what is active and where your domain, capability, or audience could intersect with existing work.",
    tone: "collaboration",
    steps: [
      {
        label: "01 · CONTRACT",
        title: "Collaboration",
        href: "/v3/collaboration",
        reason: "See the Lab's preferred shapes for review, pilots, co-development, distribution, and transfer.",
      },
      {
        label: "02 · TIMING",
        title: "Now / Roadmap",
        href: "/v3/now",
        reason: "Find the lanes where an outside relationship could matter now rather than someday.",
      },
      {
        label: "03 · DOMAIN",
        title: "Research",
        href: "/v3/research",
        reason: "Locate the research programs and questions that overlap with your expertise or institution.",
      },
      {
        label: "04 · OBJECT",
        title: "Projects",
        href: "/v3/projects",
        reason: "Choose a bounded object or case around which a first collaboration could be scoped.",
      },
    ],
    action: {
      label: "Propose a collaboration",
      href: "/v3/contact?type=collaboration&source=start-collaborator",
    },
  },
  {
    id: "client",
    label: "Prospective client / applied-work buyer",
    shortLabel: "Client",
    question: "I have a consequential system that is expensive to misunderstand.",
    description:
      "Start with how the Lab works on outside systems, then inspect relevant products, evidence, and project cases before deciding whether there is a practical fit.",
    tone: "client",
    steps: [
      {
        label: "01 · FIT",
        title: "Applied Work",
        href: "/v3/applied-work",
        reason: "See the kinds of systems problems the Lab is prepared to scope and the boundaries around an engagement.",
      },
      {
        label: "02 · CAPABILITY",
        title: "Products",
        href: "/v3/products",
        reason: "Inspect reusable tools and productized capabilities that may shorten the path to a useful intervention.",
      },
      {
        label: "03 · PROOF",
        title: "Evidence",
        href: "/v3/evidence",
        reason: "Separate historical execution, current BFL evidence, and claims that still need external proof.",
      },
      {
        label: "04 · CASES",
        title: "Projects",
        href: "/v3/projects",
        reason: "Look for adjacent project cases without assuming that similarity guarantees transfer.",
      },
    ],
    action: {
      label: "Scope applied work",
      href: "/v3/contact?type=applied-work&source=start-client",
    },
  },
  {
    id: "critic",
    label: "Critic / adversarial reviewer",
    shortLabel: "Critic",
    question: "I think something here may be wrong, overstated, or incomplete.",
    description:
      "Start with the participation boundary, identify the specific claim or evidence surface, then trace it back into the research before sending a critique.",
    tone: "critique",
    steps: [
      {
        label: "01 · BOUNDARY",
        title: "Open Lab",
        href: "/v3/open-lab",
        reason: "See how criticism, counterexamples, failed reproductions, and unusual submissions are meant to enter the institution.",
      },
      {
        label: "02 · TARGET",
        title: "Claims",
        href: "/v3/claims",
        reason: "Identify the exact assertion and its native status rather than arguing against a broad description of the Lab.",
      },
      {
        label: "03 · SUPPORT",
        title: "Evidence",
        href: "/v3/evidence",
        reason: "Inspect what support exists and, equally importantly, what the Lab says that support does not prove.",
      },
      {
        label: "04 · CONTEXT",
        title: "Research",
        href: "/v3/research",
        reason: "Trace the claim back to its owning program, methods, and surrounding questions before escalating the critique.",
      },
    ],
    action: {
      label: "Send a technical critique",
      href: "/v3/contact?type=research-review&source=start-critic",
    },
  },
  {
    id: "curious",
    label: "Curious visitor",
    shortLabel: "Curious",
    question: "I am interested, but I do not know the Lab vocabulary yet.",
    description:
      "Take the shortest explanatory path: what the institution is, what it builds, how the pieces relate, and what is changing now.",
    tone: "curious",
    steps: [
      {
        label: "01 · WHAT",
        title: "About",
        href: "/v3/about",
        reason: "Get the plain-language institutional frame before encountering the formal research machinery.",
      },
      {
        label: "02 · SHOW ME",
        title: "Products",
        href: "/v3/products",
        reason: "Meet the Lab through concrete things it builds rather than through abstract taxonomy.",
      },
      {
        label: "03 · MAP",
        title: "Lab Atlas",
        href: "/v3/atlas",
        reason: "See how research, experiments, claims, machinery, products, projects, publications, and evidence connect.",
      },
      {
        label: "04 · NOW",
        title: "What changed?",
        href: "/v3/changes",
        reason: "See recent material state changes rather than reading a generic news feed.",
      },
    ],
    action: {
      label: "See what the Lab is doing now",
      href: "/v3/now",
    },
  },
] as const;

export const homeAudienceJourneys = audienceJourneys;

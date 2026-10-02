import { publicContactMailto } from "@/lib/site-contact";

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
    label: "Researcher or technical reviewer",
    shortLabel: "Researcher",
    question: "I want to evaluate the research.",
    description:
      "Start with the active research programs, then inspect claims, experiments, publications, and evidence before deciding what deserves deeper review.",
    tone: "research",
    steps: [
      {
        label: "01 · ORIENT",
        title: "Research",
        href: "/research",
        reason: "See active programs, states, boundaries, and the method braid before evaluating individual claims.",
      },
      {
        label: "02 · CLAIMS",
        title: "Claims",
        href: "/claims",
        reason: "Inspect what is actually being asserted, how mature each claim is, and what testing remains open.",
      },
      {
        label: "03 · TESTS",
        title: "Experiments",
        href: "/experiments",
        reason: "Follow tests, controls, acceptance predicates, results, and limitations where the source register provides them.",
      },
      {
        label: "04 · RELEASE",
        title: "Publications",
        href: "/publications",
        reason: "See which research objects have become publication records and what status they currently have.",
      },
      {
        label: "05 · SUPPORT",
        title: "Evidence",
        href: "/evidence",
        reason: "Separate prior execution, current Lab-native evidence, and what the evidence still does not establish.",
      },
    ],
    action: {
      label: "Offer technical review",
      href: publicContactMailto("Boundary First Labs — Research review"),
    },
  },
  {
    id: "engineer",
    label: "Engineer / practitioner",
    shortLabel: "Engineer",
    question: "I want to see how this behaves as engineering.",
    description:
      "Begin with things that run or can be applied, then inspect project cases and the tools that make the work operational.",
    tone: "practice",
    steps: [
      {
        label: "01 · USE",
        title: "Products",
        href: "/products",
        reason: "Start with concrete interfaces and tools rather than the theory vocabulary.",
      },
      {
        label: "02 · CASES",
        title: "Projects",
        href: "/projects",
        reason: "Inspect bounded project cases, implementation context, and what each case actually demonstrated.",
      },
      {
        label: "03 · TOOLS",
        title: "Apparatus",
        href: "/apparatus",
        reason: "See what Lab tools exist, what they do, how mature they are, and what decisions they may or may not make.",
      },
      {
        label: "04 · APPLY",
        title: "Applied Work",
        href: "/applied-work",
        reason: "Understand how the Lab turns representational and systems methods into bounded outside engagements.",
      },
      {
        label: "05 · CHECK",
        title: "Evidence",
        href: "/evidence",
        reason: "Compare implementation capability with the actual evidence available today.",
      },
    ],
    action: {
      label: "Bring an engineering problem",
      href: publicContactMailto("Boundary First Labs — Applied Work"),
    },
  },
  {
    id: "funder",
    label: "Funder / sponsor",
    shortLabel: "Funder",
    question: "I want to know what support would accelerate.",
    description:
      "Start with what the Lab is trying to fund, then inspect current priorities, evidence, and concrete work before deciding whether a specific effort is worth supporting.",
    tone: "funding",
    steps: [
      {
        label: "01 · SUPPORT",
        title: "Funding",
        href: "/funding",
        reason: "See what kinds of work can be supported, what funding would enable, and what support does not imply.",
      },
      {
        label: "02 · PRIORITY",
        title: "Now / Roadmap",
        href: "/now",
        reason: "See what the Lab is prioritizing now and what would count as real progress.",
      },
      {
        label: "03 · EVIDENCE",
        title: "Evidence",
        href: "/evidence",
        reason: "Inspect demonstrated capability separately from future promise.",
      },
      {
        label: "04 · WORK",
        title: "Projects",
        href: "/projects",
        reason: "See concrete projects that funding, sponsorship, or partnership could help move forward.",
      },
    ],
    action: {
      label: "Discuss funding",
      href: publicContactMailto("Boundary First Labs — Funding"),
    },
  },
  {
    id: "collaborator",
    label: "Collaborator / institutional partner",
    shortLabel: "Collaborator",
    question: "I want to work with the Lab on something real.",
    description:
      "Start with the ways collaboration can work, then inspect current priorities and the research or projects that overlap with your expertise, users, infrastructure, or audience.",
    tone: "collaboration",
    steps: [
      {
        label: "01 · OPTIONS",
        title: "Collaboration",
        href: "/collaboration",
        reason: "See practical ways to begin: review, pilot, workshop, co-development, distribution, funding, or transfer.",
      },
      {
        label: "02 · NOW",
        title: "Now / Roadmap",
        href: "/now",
        reason: "Find the work where an outside relationship could matter now rather than someday.",
      },
      {
        label: "03 · DOMAIN",
        title: "Research",
        href: "/research",
        reason: "Locate the research programs and questions that overlap with your expertise or institution.",
      },
      {
        label: "04 · OBJECT",
        title: "Projects",
        href: "/projects",
        reason: "Choose a bounded object or case around which a first collaboration could be scoped.",
      },
    ],
    action: {
      label: "Propose a collaboration",
      href: publicContactMailto("Boundary First Labs — Collaboration"),
    },
  },
  {
    id: "client",
    label: "Prospective client",
    shortLabel: "Client",
    question: "I have a consequential system that is expensive to misunderstand.",
    description:
      "Start with the kinds of outside systems problems BFL can help with, then inspect evidence and adjacent work before deciding whether there is a practical fit.",
    tone: "client",
    steps: [
      {
        label: "01 · FIT",
        title: "Applied Work",
        href: "/applied-work",
        reason: "See the kinds of systems problems the Lab is prepared to scope and what a first engagement can look like.",
      },
      {
        label: "02 · CAPABILITY",
        title: "Products",
        href: "/products",
        reason: "Inspect reusable products and tools that may shorten the path to a useful result.",
      },
      {
        label: "03 · PROOF",
        title: "Evidence",
        href: "/evidence",
        reason: "Separate historical execution, current BFL evidence, and claims that still need external proof.",
      },
      {
        label: "04 · CASES",
        title: "Projects",
        href: "/projects",
        reason: "Look for adjacent project cases without assuming that similarity guarantees transfer.",
      },
    ],
    action: {
      label: "Scope applied work",
      href: publicContactMailto("Boundary First Labs — Applied Work"),
    },
  },
  {
    id: "critic",
    label: "Critic or skeptical reviewer",
    shortLabel: "Critic",
    question: "I think something here may be wrong, overstated, or incomplete.",
    description:
      "Start with how criticism enters the Lab, identify the specific claim or evidence at issue, then trace it back into the research before sending a critique.",
    tone: "critique",
    steps: [
      {
        label: "01 · START",
        title: "Open Lab",
        href: "/open-lab",
        reason: "See how criticism, counterexamples, failed reproductions, and other challenges can be sent to the Lab.",
      },
      {
        label: "02 · TARGET",
        title: "Claims",
        href: "/claims",
        reason: "Identify the exact statement and its current status rather than arguing against a broad description of the Lab.",
      },
      {
        label: "03 · SUPPORT",
        title: "Evidence",
        href: "/evidence",
        reason: "Inspect what support exists and, equally importantly, what the Lab says that support does not prove.",
      },
      {
        label: "04 · CONTEXT",
        title: "Research",
        href: "/research",
        reason: "Trace the claim back to its owning program, methods, and surrounding questions before escalating the critique.",
      },
    ],
    action: {
      label: "Send a technical critique",
      href: publicContactMailto("Boundary First Labs — Technical critique"),
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
        href: "/about",
        reason: "Get the plain-language institutional frame before encountering the formal research machinery.",
      },
      {
        label: "02 · SHOW ME",
        title: "Products",
        href: "/products",
        reason: "Meet the Lab through concrete things it builds rather than through abstract taxonomy.",
      },
      {
        label: "03 · MAP",
        title: "Lab Atlas",
        href: "/atlas",
        reason: "See how research, experiments, claims, tools, products, projects, publications, and evidence connect.",
      },
      {
        label: "04 · NOW",
        title: "What changed?",
        href: "/changes",
        reason: "See the latest material changes rather than a generic news feed.",
      },
    ],
    action: {
      label: "See what the Lab is doing now",
      href: "/now",
    },
  },
] as const;

export const homeAudienceJourneys = audienceJourneys;

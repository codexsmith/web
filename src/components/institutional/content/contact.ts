export const inquiryTypes = [
  {
    id: "applied-work",
    label: "Applied work / consulting",
    short: "A software, systems, AI-governance, architecture, workshop, or advisory problem.",
    prompt: "What system or decision is expensive to misunderstand, and what would a useful first step change?",
  },
  {
    id: "collaboration",
    label: "Collaboration / pilot / partnership",
    short: "A bounded review, pilot, co-development effort, institutional relationship, or introduction.",
    prompt: "What does each side bring, and what is the smallest useful thing we could do together?",
  },
  {
    id: "funding",
    label: "Funding / sponsorship",
    short: "Grant, philanthropic, patronage, sponsorship, or other support for a defined conversion of existing capacity.",
    prompt: "What kind of work are you interested in supporting, and what evidence or decision would you need next?",
  },
  {
    id: "research-review",
    label: "Research review / technical critique",
    short: "Domain review, adversarial criticism, replication, prior-art correction, or technical discussion.",
    prompt: "Which specific claim, artifact, method, or research lane should we look at together?",
  },
  {
    id: "product",
    label: "Product / licensing / distribution",
    short: "A product, teaching tool, software surface, licensing path, distribution opportunity, or user channel.",
    prompt: "Which product or audience is relevant, and what would you like to test, license, distribute, or evaluate?",
  },
  {
    id: "media",
    label: "Media / speaking / education",
    short: "Interview, podcast, event, classroom, workshop, public explanation, or educational collaboration.",
    prompt: "Who is the audience, what should they leave understanding, and what format are you considering?",
  },
  {
    id: "open-lab",
    label: "Open Lab / unusual submission",
    short: "A criticism, consequential system, strange artifact, or piece of work that does not fit the ordinary categories.",
    prompt: "What are you bringing, why does it matter, and what kind of response are you hoping for?",
  },
  {
    id: "general",
    label: "General / not sure",
    short: "Use this when the reason for contact is real but the institutional lane is not obvious yet.",
    prompt: "Why are you reaching out, and what would make a reply useful?",
  },
] as const;

export type InquiryTypeId = (typeof inquiryTypes)[number]["id"];

export function isInquiryTypeId(value: string): value is InquiryTypeId {
  return inquiryTypes.some((item) => item.id === value);
}

export const inquiryFamilies = [
  {
    code: "01",
    title: "Build, use, or deploy something",
    description:
      "For organizations with a practical system, product, implementation, distribution, or delivery problem.",
    types: ["applied-work", "product", "collaboration"] as const,
    tone: "build",
  },
  {
    code: "02",
    title: "Evaluate, challenge, or support the work",
    description:
      "For reviewers, researchers, funders, institutions, and people deciding whether a bounded BFL object deserves more attention.",
    types: ["research-review", "funding"] as const,
    tone: "evaluate",
  },
  {
    code: "03",
    title: "Bring an audience, observation, or unusual case",
    description:
      "For public explanation, education, Open Lab conversations, or a message that genuinely does not fit the other routes.",
    types: ["media", "open-lab", "general"] as const,
    tone: "public",
  },
] as const;

export const inquiryProcess = [
  [
    "Context arrives with the message",
    "The inquiry type and source page travel with the message so the reason for contact does not have to be reconstructed from memory.",
  ],
  [
    "Fit is reviewed before commitment",
    "The first question is whether there is a real exchange of value and a bounded next step—not how to turn every message into a relationship.",
  ],
  [
    "The next response should name a state",
    "Where possible, the answer should be a concrete next action, a request for missing information, a referral, a pause, or a clean no.",
  ],
  [
    "Serious relationships leave the inbox",
    "If contact becomes a pilot, collaboration, funding process, review, or client engagement, its durable state belongs in the appropriate Lab pipeline rather than email memory.",
  ],
] as const;

export const inquiryBoundaries = [
  {
    label: "DO NOT SEND SECRETS FIRST",
    description:
      "Do not send credentials, private keys, patient data, protected personal information, export-controlled material, or confidential proprietary content through first contact.",
  },
  {
    label: "CONTACT != ENDORSEMENT",
    description:
      "A reply, conversation, review, or meeting does not imply partnership, funding, authorship, validation, or endorsement.",
  },
  {
    label: "CONTEXT SHOULD SURVIVE ROUTING",
    description:
      "The inquiry should keep the source page and reason for contact attached so it can move between research, product, funding, collaboration, or applied-work lanes without losing meaning.",
  },
  {
    label: "NO LEAD-GEN THEATER",
    description:
      "The form asks only for information needed to understand and route the message. It is not a disguised mailing-list or sales qualification funnel.",
  },
] as const;

export const inquiryHelpfulContext = [
  "What are you trying to do, understand, test, fund, repair, publish, or distribute?",
  "Why does Boundary First Labs appear relevant?",
  "What would a useful first response or next step look like?",
  "Is there a real deadline, event, dependency, or decision window?",
  "What public material should BFL read before replying?",
] as const;

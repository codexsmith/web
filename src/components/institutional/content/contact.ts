export const inquiryTypes = [
  {
    id: "applied-work",
    label: "Applied work / consulting",
    short: "A software, systems, AI-governance, architecture, workshop, or advisory problem.",
    prompt: "What are you working on, and where do you think Boundary First Labs could help?",
  },
  {
    id: "collaboration",
    label: "Collaboration / pilot / partnership",
    short: "A bounded review, pilot, co-development effort, institutional relationship, or introduction.",
    prompt: "What are you imagining, and what might a useful first step look like?",
  },
  {
    id: "funding",
    label: "Funding / sponsorship",
    short: "Grant, philanthropic, patronage, sponsorship, or other support for a defined conversion of existing capacity.",
    prompt: "What work are you interested in supporting or learning more about?",
  },
  {
    id: "research-review",
    label: "Research review / technical critique",
    short: "Domain review, adversarial criticism, replication, prior-art correction, or technical discussion.",
    prompt: "What claim, artifact, method, or research lane caught your attention? Critique is welcome.",
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
    prompt: "What are you thinking about making or discussing, and who is it for?",
  },
  {
    id: "open-lab",
    label: "Open Lab / unusual submission",
    short: "A criticism, consequential system, strange artifact, or piece of work that does not fit the ordinary categories.",
    prompt: "What are you bringing, and what would be useful from us?",
  },
  {
    id: "general",
    label: "General / not sure",
    short: "Use this when the reason for contact is real but the institutional lane is not obvious yet.",
    prompt: "What brought you here, and what would make a reply useful?",
  },
] as const;

export type InquiryTypeId = (typeof inquiryTypes)[number]["id"];

export function isInquiryTypeId(value: string): value is InquiryTypeId {
  return inquiryTypes.some((item) => item.id === value);
}

export const inquiryFamilies = [
  {
    code: "01",
    title: "Build, test, or use something",
    description:
      "A practical problem, product idea, implementation question, or possible collaboration.",
    types: ["applied-work", "product", "collaboration"] as const,
    tone: "build",
  },
  {
    code: "02",
    title: "Evaluate, challenge, or support the work",
    description:
      "Technical criticism, research discussion, funding, sponsorship, or institutional support.",
    types: ["research-review", "funding"] as const,
    tone: "evaluate",
  },
  {
    code: "03",
    title: "Something else",
    description:
      "Media, education, Open Lab, introductions, or anything that does not fit neatly elsewhere.",
    types: ["media", "open-lab", "general"] as const,
    tone: "public",
  },
] as const;

export const inquiryProcess = [
  [
    "We read it in context",
    "The reason for contact and the page you came from stay attached so you do not have to reconstruct the whole story.",
  ],
  [
    "We look for a real fit",
    "Not every message needs to become a project. The useful question is whether there is something concrete worth doing next.",
  ],
  [
    "We make the next step clear",
    "That might be a reply, a question, a conversation, a review, a referral, a pilot, or a straightforward no.",
  ],
  [
    "Real work moves somewhere durable",
    "If the conversation becomes a project, collaboration, funding process, review, or client engagement, it moves into the appropriate Lab workflow instead of living only in email.",
  ],
] as const;

export const inquiryBoundaries = [
  {
    label: "PLEASE DO NOT SEND SECRETS YET",
    description:
      "Do not send credentials, private keys, patient data, protected personal information, export-controlled material, or confidential proprietary content through first contact.",
  },
  {
    label: "CONTACT IS NOT ENDORSEMENT",
    description:
      "A reply, conversation, review, or meeting does not imply partnership, funding, authorship, validation, or endorsement.",
  },
  {
    label: "WE KEEP THE CONTEXT",
    description:
      "The page you came from and the reason you wrote stay attached so the conversation can move to the right place without losing what you meant.",
  },
  {
    label: "NO HIDDEN SALES FUNNEL",
    description:
      "Contact is for conversation, not a disguised mailing list or sales-qualification funnel.",
  },
] as const;

export const inquiryHelpfulContext = [
  "What brought you here?",
  "What are you working on, considering, or trying to understand?",
  "Is there a particular page, project, product, or research artifact you mean?",
  "What kind of response would be useful?",
  "Are there any public links or real timing constraints we should know about?",
] as const;

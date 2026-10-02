import { publicContactMailto } from "@/lib/site-contact";

export const capabilityStrip = [
  ["01", "Scientific software modeling"],
  ["02", "Research & experiments"],
  ["03", "Products & working systems"],
  ["04", "Measurement, verification & transfer"],
] as const;

export const methodSteps = [
  ["01", "Bound the obligation", "Domain", "Name the real system, bounded change, and consequence the model must preserve."],
  ["02", "Represent lawful continuation", "State", "Retain the distinctions, invariants, and boundary contracts required for the next valid move."],
  ["03", "Execute under authority", "Transform", "Run a bounded transition while keeping authority, provenance, projection, and observation visible."],
  ["04", "Let consequence answer", "Witness + repair", "Use evidence and affected state to criticize the model, localize defects, repair it, and transfer what survives."],
] as const;

export const featuredWork = [
  {
    tag: "METHOD + ENGINEERING DOCTRINE",
    title: "Software Before Code",
    description: "A scientific software-modeling doctrine for constructing executable models that remain adequate under real-world consequence.",
    href: "/software-before-code",
  },
  {
    tag: "ACTIVE-BUILD PRODUCT FAMILY",
    title: "Projectr",
    description: "Public knowledge infrastructure for durable, source-linked knowledge; YouTube Knowledge Explorer is the current bounded implementation.",
    href: "/products/youtube-knowledge-explorer",
  },
  {
    tag: "RESEARCH INFRASTRUCTURE",
    title: "Corpus Forge",
    description: "Executable scientific and research-operations machinery for bounded work, evidence, criticism, verification, repair, and promotion.",
    href: "/products/current/corpus-forge",
  },
  {
    tag: "RESEARCH PRODUCT",
    title: "Boundary-First Chess",
    description: "A book-length teaching asset and developed pedagogy for making structural change on the board more legible.",
    href: "/products/boundary-first-chess",
  },
] as const;


export const homeAppliedWorkFeature = {
  eyebrow: "CONSULTING / APPLIED WORK",
  title: "Bring one system that is expensive to misunderstand.",
  summary:
    "Three bounded entry points grounded in scientific software modeling: systems architecture, agency / AI governance, and knowledge / representation infrastructure.",
  offers: [
    {
      code: "01",
      title: "Systems / Architecture Review",
      detail: "Reconstruct the system · expose defects and invariants · compare repair / migration paths",
    },
    {
      code: "02",
      title: "Agency / AI Governance Audit",
      detail: "Map decision rights · define human / agent gates · repair authority and provenance gaps",
    },
    {
      code: "03",
      title: "Knowledge / Representation Infrastructure Diagnostic",
      detail: "Map source / claim / evidence state · find representation loss · design durable handoff infrastructure",
    },
  ],
  note:
    "Systems / Architecture Review is the current first-engagement focus. The other two offers remain available when authority/governance or knowledge/provenance is the primary problem.",
  href: "/applied-work",
  cta: "Explore Applied Work",
  contactHref: publicContactMailto("Boundary First Labs — Applied Work"),
  contactCta: "Start a conversation",
} as const;


export const homeNowSnapshot = {
  eyebrow: "NOW / ROADMAP",
  status: "OCTOBER 2026 · CURRENT CYCLE",
  title: "Externalize the clarified doctrine, test it, and close the obvious gaps.",
  thesis: "Observe → bound → represent → execute → witness → criticize → repair → transfer.",
  href: "/now",
  lanes: [
    "Public institutional interface",
    "BFL-native external evidence",
    "Representational laboratory program",
    "Bounded publications + criticism",
    "Relationships, funding + distribution",
    "One coherent body of work",
  ],
} as const;

export const homeInstitutionalFrontDoors = [
  {
    eyebrow: "COLLABORATION",
    title: "Bring a real problem, capability, audience, or resource.",
    note: "Review · test · build · distribute · transfer",
    href: "/collaboration",
    cta: "Explore Collaboration",
    tone: "collaboration",
  },
  {
    eyebrow: "FUNDING / CAPITALIZATION",
    title: "Capitalize the conversion engine, not the theory.",
    note: "Runway · earned services · product capital · research capital · evidence-gated credit",
    href: "/funding",
    cta: "See the Funding model",
    tone: "funding",
  },
] as const;

export const postureCommitments = [
  {
    eyebrow: "INSPECTABILITY",
    title: "Show enough of the machinery to be challenged.",
    description:
      "Claims should travel with their representations, evidence, uncertainty, dependencies, and repair paths so another person can inspect more than the conclusion.",
    href: "/about",
    linkLabel: "Why representation and repair matter",
    tone: "inspect",
  },
  {
    eyebrow: "CONTESTABILITY",
    title: "Criticism should be able to change institutional state.",
    description:
      "Counterexamples, missing distinctions, implementation defects, accessibility failures, and stronger evidence should have a route into revision rather than disappearing into a generic inbox.",
    href: "/open-lab",
    linkLabel: "See the Open Lab participation model",
    tone: "contest",
  },
  {
    eyebrow: "CAPABILITY TRANSFER",
    title: "Useful work should leave more capability behind.",
    description:
      "The preferred outcome is not permanent dependence on the Lab. It is clearer models, reusable tools, repair paths, documented processes, and handoff to people who can carry the work forward.",
    href: "/about",
    linkLabel: "Read the stewardship posture",
    tone: "transfer",
  },
  {
    eyebrow: "AI GOVERNANCE",
    title: "Forge what helps. Certify what acts. Forbid what dominates.",
    description:
      "AI makes the agency question concrete: bounded assistance can accelerate, while consequential delegated authority needs explicit boundaries, contestability, repair, and accountable ownership.",
    href: "/ai-governance",
    linkLabel: "How we govern AI",
    tone: "governance",
  },
] as const;

export const practiceLineage = [
  {
    label: "Lean–Agile",
    description:
      "Brings visible work, bounded work in progress, short feedback loops, and respect for real capacity.",
  },
  {
    label: "Scientific Method",
    description:
      "Brings discriminating questions, bounded tests, evidence, falsification, and revision when observation disagrees.",
  },
  {
    label: "Agentic Reasoning",
    description:
      "Brings decomposition, search, tool selection, comparison, and critique across human and computational agents.",
  },
  {
    label: "Boundary First",
    description:
      "Synthesizes those practices through scientific software modeling and executable representation: make consequential state explicit, track lawful change, preserve authority and provenance, localize defect, repair representations, and leave enough state for the next handoff.",
  },
] as const;

export const stewardshipFacets = [
  {
    label: "Intellectual Stewardship",
    title: "Knowledge should remain attributable, criticizable, and recoverable.",
  },
  {
    label: "Humanist Stewardship",
    title: "Capability should accumulate with people, not above them.",
  },
  {
    label: "Ecological Stewardship",
    title: "Local success must not erase the wider substrate.",
  },
] as const;

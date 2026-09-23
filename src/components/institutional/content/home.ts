export const capabilityStrip = [
  ["01", "Research & experiments"],
  ["02", "Tools & working systems"],
  ["03", "Analysis for public systems"],
  ["04", "Measurement & verification"],
] as const;

export const methodSteps = [
  ["01", "Show the structure", "Representation", "Make the important parts, relationships, and boundaries visible."],
  ["02", "Track what changes", "State", "Know where the system is now, what can change, and what must remain true."],
  ["03", "Follow the change", "Transform", "See how one valid condition becomes another, and what rules govern the move."],
  ["04", "Find where it fails", "Defect", "Expose breakdowns, missing cases, and places where the model or system stops working."],
] as const;

export const featuredWork = [
  {
    tag: "PRODUCT",
    title: "Boundary-First Chess",
    description: "A book-length teaching asset and developed pedagogy for making structural change on the board more legible.",
    href: "/products/boundary-first-chess",
  },
  {
    tag: "PRODUCT",
    title: "YouTube Knowledge Explorer",
    description: "A source-linked software tool for turning long-form video into searchable, timestamped, structured knowledge.",
    href: "/products/youtube-knowledge-explorer",
  },
  {
    tag: "RESEARCH PRODUCT",
    title: "Agentic Scientific Method",
    description: "An operational inquiry protocol for research, evidence, criticism, defect localization, repair, authority, and closure.",
    href: "/products/agentic-scientific-method",
  },
  {
    tag: "RESEARCH PRODUCT",
    title: "Boundary First Weather",
    description: "A pilot-ready computational testbed for boundary-aware diagnostics, forecast disagreement, and selective refinement.",
    href: "/products/boundary-first-weather",
  },
] as const;


export const homeNowSnapshot = {
  eyebrow: "NOW / ROADMAP",
  status: "SEPTEMBER 2026 · CURRENT CYCLE",
  title: "Externalize, test, and close the obvious gaps.",
  thesis: "Externalize → test → repair → repeat → transfer.",
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
    eyebrow: "APPLIED WORK",
    title: "Bring one system that is expensive to misunderstand.",
    note: "Ready to scope · case-study evidence still growing",
    href: "/applied-work",
    cta: "See Applied Work",
    tone: "applied",
  },
  {
    eyebrow: "COLLABORATION",
    title: "Bring a real problem, capability, audience, or resource.",
    note: "Review · test · build · distribute · transfer",
    href: "/collaboration",
    cta: "Explore Collaboration",
    tone: "collaboration",
  },
  {
    eyebrow: "FUNDING",
    title: "Fund the conversion, not the theory.",
    note: "Capital can change capacity. It does not change truth.",
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
      "Synthesizes those practices through state-based and dynamical-systems reasoning: make state explicit, track lawful change, preserve consequential boundaries, localize defect, repair representations, and leave enough state for the next handoff.",
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

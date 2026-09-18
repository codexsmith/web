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
    href: "/v3/products/boundary-first-chess",
  },
  {
    tag: "PRODUCT",
    title: "Projectr / YouTube Knowledge Explorer",
    description: "A source-linked software tool for turning long-form video into searchable, timestamped, structured knowledge.",
    href: null,
  },
  {
    tag: "RESEARCH TOOL",
    title: "Agentic Scientific Method",
    description: "Executable machinery for research, evidence handling, critique, verification, defect localization, and repair.",
    href: null,
  },
  {
    tag: "RESEARCH PRODUCT",
    title: "Boundary First Weather",
    description: "A pilot-ready computational testbed for boundary-aware diagnostics, forecast disagreement, and selective refinement.",
    href: "/v3/products/boundary-first-weather",
  },
] as const;


export const postureCommitments = [
  {
    eyebrow: "INSPECTABILITY",
    title: "Show enough of the machinery to be challenged.",
    description:
      "Claims should travel with their representations, evidence, uncertainty, dependencies, and repair paths so another person can inspect more than the conclusion.",
    href: "/v3/about",
    linkLabel: "Why representation and repair matter",
    tone: "inspect",
  },
  {
    eyebrow: "CONTESTABILITY",
    title: "Criticism should be able to change institutional state.",
    description:
      "Counterexamples, missing distinctions, implementation defects, accessibility failures, and stronger evidence should have a route into revision rather than disappearing into a generic inbox.",
    href: "/v3/open-lab",
    linkLabel: "See the Open Lab participation model",
    tone: "contest",
  },
  {
    eyebrow: "CAPABILITY TRANSFER",
    title: "Useful work should leave more capability behind.",
    description:
      "The preferred outcome is not permanent dependence on the Lab. It is clearer models, reusable tools, repair paths, documented processes, and handoff to people who can carry the work forward.",
    href: "/v3/about",
    linkLabel: "Read the stewardship posture",
    tone: "transfer",
  },
] as const;

export const practiceLineage = [
  {
    label: "LEAN–AGILE",
    title: "Flow, capacity, and feedback.",
    description:
      "Make state visible. Bound work in progress. Respect real capacity. Deliver the smallest coherent increment that can teach something, then let observed results change the next state.",
  },
  {
    label: "SCIENTIFIC METHOD",
    title: "Questions, tests, and evidence.",
    description:
      "State a discriminating question, make assumptions and alternatives visible, run a bounded test, separate observation from interpretation, preserve null results, and revise when evidence disagrees.",
  },
  {
    label: "AGENTIC REASONING",
    title: "Search, decomposition, and critique.",
    description:
      "Let human, computational, or hybrid agents explore alternatives, decompose problems, choose tools, compare representations, localize defects, and propose next moves without silently inheriting authority.",
  },
  {
    label: "BOUNDARY FIRST",
    title: "Representation, consequence, and repair.",
    description:
      "Make the system boundary explicit, preserve consequential distinctions, track lawful change, expose what was lost or omitted, repair the representation, and leave enough state for another agent to continue.",
  },
] as const;

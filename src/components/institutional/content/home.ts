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
  },
  {
    tag: "PRODUCT",
    title: "Projectr / YouTube Knowledge Explorer",
    description: "A source-linked software tool for turning long-form video into searchable, timestamped, structured knowledge.",
  },
  {
    tag: "RESEARCH TOOL",
    title: "Agentic Scientific Method",
    description: "Executable machinery for research, evidence handling, critique, verification, defect localization, and repair.",
  },
  {
    tag: "APPLIED WORK",
    title: "Public Infrastructure Analysis",
    description: "Applied systems analysis for public records, workflows, institutions, uncertainty, and consequence-bearing processes.",
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
    label: "VISIBLE STATE",
    title: "Make the work and the system observable.",
    description:
      "Agile and Kanban sharpened a habit that remains central to BFL: externalize current state, blockers, assumptions, queues, ownership, and next decisions instead of hiding them in memory.",
  },
  {
    label: "BOUNDED FLOW",
    title: "Capacity constrains what is actually reachable.",
    description:
      "Work in progress, time, attention, dependencies, and consequence are real constraints. Scope is treated as a state-space problem, not a wish list.",
  },
  {
    label: "SHORT EVIDENCE LOOPS",
    title: "Turn assumptions into working evidence quickly.",
    description:
      "Prototypes, demos, tests, and small coherent increments shorten the distance between a model of the system and what the system actually does.",
  },
  {
    label: "INSPECT + REPAIR",
    title: "Feedback should be allowed to change the plan.",
    description:
      "A defect, counterexample, failed increment, or changed condition is new state. Preserve it, revise the representation, and run the loop again.",
  },
] as const;

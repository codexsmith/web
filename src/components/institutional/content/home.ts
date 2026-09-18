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

export const founderRoles = [
  {
    label: "COMPUTER SCIENTIST",
    title: "Computation as a way of making structure executable.",
    description:
      "Georgia Tech training in computer science, with emphasis in artificial intelligence, systems, architecture, and research practice. The recurring question is how a representation becomes operational without losing what matters.",
  },
  {
    label: "SYSTEMS ENGINEER",
    title: "Build and repair systems under real constraints.",
    description:
      "More than a decade of software work across applications, APIs, cloud infrastructure, databases, consulting, startup delivery, and consequence-bearing environments shaped a practice centered on state, interfaces, invariants, failure, and repair.",
  },
  {
    label: "FOUNDER-RESEARCHER",
    title: "Turn a private method into public infrastructure.",
    description:
      "Boundary First Labs exists to make a long-running systems method inspectable, testable, useful, criticizable, and transferable beyond the person who developed it.",
  },
] as const;

export const founderTimeline = [
  {
    period: "GEORGIA TECH",
    title: "Computer science became experimental practice.",
    description:
      "Formal study joined AI, systems architecture, mathematics, physics, cognition, and multiple semesters of research. Literature, hypothesis, experiment, measurement, and null results became working habits rather than abstractions.",
  },
  {
    period: "SOFTWARE + SYSTEMS",
    title: "Representation met production reality.",
    description:
      "Professional engineering work repeatedly turned vague domain language into schemas, state models, interfaces, services, deployments, and maintained systems. Many apparent coding problems proved to be upstream representation problems.",
  },
  {
    period: "CONSULTING + DELIVERY",
    title: "Lean–Agile practice made state, capacity, and feedback operational.",
    description:
      "Agile, Lean, Kanban, Lean Startup, prototypes, demos, and repeated project leadership turned abstract ideas about uncertainty into daily operating constraints: make work visible, limit work in progress, respect real capacity, deliver a coherent increment, inspect the result, and let feedback change the next state.",
  },
  {
    period: "INDEPENDENT LAB",
    title: "The questions stayed alive across domains.",
    description:
      "Years of independent study and a dedicated research environment accumulated work across computation, mathematics, physics, cognition, institutions, and formal systems. The workspace itself became an instrument for externalizing and repairing representations.",
  },
  {
    period: "BOUNDARY FIRST LABS",
    title: "The private method became a public laboratory.",
    description:
      "The current institution turns that accumulated practice into research objects, software, publications, products, experiments, and public-interest systems that other people can inspect, criticize, use, and improve.",
  },
] as const;

export const founderMethod = [
  "Encounter mismatch",
  "Study the system",
  "Make distinctions",
  "Construct a representation",
  "Build or derive",
  "Observe what fails",
  "Preserve the defect",
  "Repair and test again",
] as const;

export const founderPrinciples = [
  {
    label: "PRACTICE-BORN",
    description:
      "The method was sharpened first in software, systems delivery, research work, and the repeated need to repair models that did not survive contact with reality.",
  },
  {
    label: "LEAN–AGILE LINEAGE",
    description:
      "Years of Agile, Lean, Kanban, and startup practice supplied an empirical operating grammar: visible state, bounded flow, short feedback loops, capacity-aware planning, working increments, and revision when reality disagrees.",
  },
  {
    label: "RESEARCH-BACKED",
    description:
      "Claims are compared against established disciplines, prior art, experiments, external criticism, and the strongest available neighboring machinery.",
  },
  {
    label: "SCIENTIFIC METHOD",
    description:
      "Research apprenticeship and later independent work supplied the evidence discipline: literature, explicit hypotheses, measurement, controls, null results, competing explanations, falsification conditions, and conclusions bounded by what was actually tested.",
  },
  {
    label: "AGENTIC REASONING",
    description:
      "AI and systems training supplied a search-and-action grammar: agents perceive bounded state, choose among admissible actions, use tools, compare alternatives, evaluate results, and revise policy. Later human–AI work makes that loop explicit while preserving authority boundaries.",
  },
  {
    label: "FORMALLY GENERALIZED",
    description:
      "Patterns are promoted only when they can be stated precisely enough to recover prior cases, expose assumptions, preserve invariants, and fail under test.",
  },
] as const;

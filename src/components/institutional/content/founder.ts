export const founderRoles = [
  {
    label: "COMPUTER SCIENTIST",
    title: "Computation as a way of making structure executable.",
    description:
      "Georgia Tech training in computer science, including artificial intelligence, systems, architecture, and research practice. The recurring question is how to turn a model of a problem into working software without losing the distinctions that matter."
  },
  {
    label: "SYSTEMS ENGINEER",
    title: "Build and repair systems under real constraints.",
    description:
      "More than a decade of software work across applications, APIs, cloud infrastructure, databases, consulting, startups, and high-consequence environments shaped a practice centered on understanding what a system must preserve, where it can fail, and how it can be repaired."
  },
  {
    label: "FOUNDER-RESEARCHER",
    title: "Turn a private method into public infrastructure.",
    description:
      "Boundary First Labs exists to make a long-running systems method visible, testable, useful, open to criticism, and transferable beyond the person who developed it."
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
    title: "Models met production reality.",
    description:
      "Professional engineering work repeatedly turned vague domain language into schemas, workflows, interfaces, services, deployments, and maintained systems. Many apparent coding problems turned out to begin earlier, with an incomplete or misleading model of the problem."
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
      "Years of independent study included mathematical physics—Einstein’s framework, statistical mechanics, and the fine-structure constant—alongside computation, mathematics, cognition, institutions, and formal systems. A dedicated research environment became an instrument for externalizing and repairing representations.",
  },
  {
    period: "BOUNDARY FIRST LABS",
    title: "The private method became a public laboratory.",
    description:
      "The current institution turns that accumulated practice into research, software, publications, products, experiments, and public-interest systems that other people can inspect, criticize, use, and improve."
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
    label: "AI-ASSISTED REASONING",
    description:
      "AI and systems work supplied a disciplined search-and-action loop: understand the current situation, consider allowed actions, use tools, compare alternatives, inspect results, and revise the next move. Human–AI work at the Lab keeps that loop explicit while preserving human responsibility for consequential decisions.",
  },
  {
    label: "STEWARDSHIP",
    description:
      "The work is treated as something held in trust rather than merely produced: steward the intellectual record, preserve human agency and capability, and follow material and ecological consequence far enough that success is not purchased by invisible externalities.",
  },
  {
    label: "FORMALLY GENERALIZED",
    description:
      "Patterns are generalized only when they can be stated precisely enough to explain earlier cases, expose assumptions, preserve what matters, and fail under a meaningful test."
  },
] as const;

export type PublicShellWorkKind = "project" | "method" | "artifact" | "practice";

export type PublicShellWork = {
  id: string;
  title: string;
  kind: PublicShellWorkKind;
  summary: string;
  href: string;
  status: "Recorded" | "Operational" | "Externally verified";
  period?: string;
  role: string;
};

export const institutionalRoutes = [
  {
    title: "Software",
    label: "Start here",
    description:
      "Begin with familiar software failures and learn the Boundary First practice through concrete examples.",
    href: "/software",
  },
  {
    title: "Work & evidence",
    label: "Inspect the record",
    description:
      "Browse projects, products, services, artifacts, and the evidence boundaries attached to them.",
    href: "/work",
  },
  {
    title: "Research & method",
    label: "Go deeper",
    description:
      "Follow the practical method into the research program, Atlas, and formal architecture beneath it.",
    href: "/research",
  },
  {
    title: "Institute",
    label: "Who governs this",
    description:
      "Mission, provenance, governance, participation, standards, and the current institutional state.",
    href: "/about",
  },
] as const;

export const softwarePaths = [
  {
    id: "diagnose",
    prompt: "Something is wrong here.",
    verb: "Diagnose",
    description:
      "Separate the visible symptom from the actual defect. Trace state, boundaries, dependencies, and missing evidence before choosing a repair.",
    vocabulary: ["Boundary", "Defect", "Observability"],
    href: "/methods#practice-cycle",
  },
  {
    id: "understand",
    prompt: "I need to understand this system.",
    verb: "Understand",
    description:
      "Map what exists, what crosses between parts, who owns which obligations, and which representations no longer match reality.",
    vocabulary: ["State", "Boundary", "Contract"],
    href: "/domains",
  },
  {
    id: "build",
    prompt: "I need to build something that holds together.",
    verb: "Build",
    description:
      "Name what must remain true, define admissible states and interfaces, and make failure and repair observable before implementation outruns understanding.",
    vocabulary: ["Invariant", "Contract", "State"],
    href: "/artifact/consequence-bearing-development-and-ai-repair-loops",
  },
  {
    id: "change",
    prompt: "I need to change a failing system.",
    verb: "Change",
    description:
      "Intervene without destroying the properties that need to survive the transition. Keep consequence, ownership, and repair paths visible.",
    vocabulary: ["Invariant", "Repair", "Closure"],
    href: "/work#systems-audit",
  },
  {
    id: "learn",
    prompt: "Teach me the method.",
    verb: "Learn",
    description:
      "Move from examples into the reusable Boundary First vocabulary and practice cycle without requiring the formal theory first.",
    vocabulary: ["Boundary", "Invariant", "Closure"],
    href: "/methods",
  },
] as const;

export const featuredPublicWork: PublicShellWork[] = [
  {
    id: "systems-audit",
    title: "Systems Audit",
    kind: "practice",
    summary:
      "A bounded practice for making system structure, obligations, defects, and repair paths inspectable before intervention.",
    href: "/work#systems-audit",
    status: "Operational",
    role: "Transformation / repeatable practice",
  },
  {
    id: "consequence-bearing-development",
    title: "Consequence-Bearing Development and AI Repair Loops",
    kind: "artifact",
    summary:
      "A software-facing artifact connecting development practice, evidence, repair, and responsibility to the wider Boundary First program.",
    href: "/artifact/consequence-bearing-development-and-ai-repair-loops",
    status: "Recorded",
    role: "Communication / method bridge",
  },
  {
    id: "civilizational-mechanics",
    title: "Civilizational Mechanics",
    kind: "artifact",
    summary:
      "A public learning pathway from displaced consequence and institutional agency into Boundary First mechanics and routes to repair.",
    href: "/publications/civilizational-mechanics",
    status: "Recorded",
    role: "Communication / research bridge",
  },
] as const;

export const publicVocabulary = [
  ["Boundary", "Where responsibility, state, representation, or consequence changes context."],
  ["Invariant", "What must remain true while the system operates or changes."],
  ["State", "A configuration the system can actually occupy."],
  ["Contract", "What one part promises another across an interface."],
  ["Observability", "The evidence available to determine what happened."],
  ["Closure", "The condition that shows an operation, obligation, or repair has actually completed."],
] as const;

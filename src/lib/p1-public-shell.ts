import { phase12Launch } from "@/lib/phase12-launch";

export type PublicShellWork = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  href: string;
  status: string;
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
    href: phase12Launch.systemsAudit.relatedTrack.href,
  },
  {
    id: "change",
    prompt: "I need to change a failing system.",
    verb: "Change",
    description:
      "Intervene without destroying the properties that need to survive the transition. Keep consequence, ownership, and repair paths visible.",
    vocabulary: ["Invariant", "Repair", "Closure"],
    href: phase12Launch.systemsAudit.secondaryAction.href,
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

const civilizationalMechanics = phase12Launch.featuredWork.find(
  (item) => item.id === "civilizational-mechanics",
);

if (!civilizationalMechanics) {
  throw new Error("Phase 12 launch binding must expose Civilizational Mechanics.");
}

export const featuredPublicWork: PublicShellWork[] = [
  {
    id: phase12Launch.systemsAudit.id,
    title: phase12Launch.systemsAudit.title,
    kind: phase12Launch.systemsAudit.category,
    summary: phase12Launch.systemsAudit.summary,
    href: phase12Launch.systemsAudit.secondaryAction.href,
    status: phase12Launch.systemsAudit.status,
    role: "Transformation / repeatable practice",
  },
  {
    id: "ai-consequence-loop-audit",
    title: phase12Launch.systemsAudit.relatedTrack.title,
    kind: "Artifact · software practice",
    summary: phase12Launch.systemsAudit.relatedTrack.description,
    href: phase12Launch.systemsAudit.relatedTrack.href,
    status: phase12Launch.systemsAudit.relatedTrack.status,
    role: "Communication / method bridge",
  },
  {
    id: civilizationalMechanics.id,
    title: civilizationalMechanics.title,
    kind: civilizationalMechanics.category,
    summary: civilizationalMechanics.summary,
    href: civilizationalMechanics.action.href,
    status: civilizationalMechanics.status,
    role: "Communication / research bridge",
  },
];

export const publicVocabulary = [
  ["Boundary", "Where responsibility, state, representation, or consequence changes context."],
  ["Invariant", "What must remain true while the system operates or changes."],
  ["State", "A configuration the system can actually occupy."],
  ["Contract", "What one part promises another across an interface."],
  ["Observability", "The evidence available to determine what happened."],
  ["Closure", "The condition that shows an operation, obligation, or repair has actually completed."],
] as const;

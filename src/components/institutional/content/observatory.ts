export type ObservatoryRole = {
  label: string;
  verb: string;
  summary: string;
  current?: boolean;
};

export const observatoryRoles: readonly ObservatoryRole[] = [
  {
    label: "Institution",
    verb: "exists",
    summary:
      "The Lab itself: people, programs, products, research, operations, governance, and public responsibilities.",
  },
  {
    label: "Registrar",
    verb: "identifies + routes",
    summary:
      "Keeps durable objects addressable: what exists, what kind of thing it is, where it belongs, and where authority remains.",
  },
  {
    label: "Apparatus",
    verb: "operates",
    summary:
      "The tools that search, test, transform, validate structurally, record, publish, and otherwise work on bounded Lab state.",
  },
  {
    label: "Atlases",
    verb: "map",
    summary:
      "Different structural views for different questions. No single map is allowed to silently become the institution.",
  },
  {
    label: "Observatory",
    verb: "lets people look",
    summary:
      "A public inspection layer over selected institutional state, relationships, evidence, machinery, and history.",
    current: true,
  },
  {
    label: "Open Lab",
    verb: "lets people answer back",
    summary:
      "The governed participation boundary for critique, counterexamples, collaboration, and unusual work brought into the Lab.",
  },
] as const;

export const observatoryLensGroups = [
  {
    id: "maps",
    eyebrow: "MAPS",
    title: "See structure from more than one angle.",
    description:
      "Use different maps for different questions rather than treating one graph as the whole institution.",
    links: [
      { label: "Lab Atlas", href: "/atlas" },
      { label: "Representation Atlas", href: "/representation-atlas" },
      { label: "Formal theory", href: "/research/formal-theory" },
    ],
  },
  {
    id: "evidence",
    eyebrow: "EVIDENCE",
    title: "Follow what was claimed, tested, and supported.",
    description:
      "Claims, experiments, evidence, and publications remain distinct objects with different authority ceilings.",
    links: [
      { label: "Experiments", href: "/experiments" },
      { label: "Claims", href: "/claims" },
      { label: "Evidence", href: "/evidence" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    id: "time",
    eyebrow: "TIME",
    title: "Read the Lab at three time scales.",
    description:
      "Recent change, current posture, and long memory are different views of institutional state.",
    links: [
      { label: "Recent changes", href: "/changes" },
      { label: "Current priorities", href: "/now" },
      { label: "Lab history", href: "/lab-through-time" },
    ],
  },
  {
    id: "machinery",
    eyebrow: "MACHINERY",
    title: "Inspect the instruments without mistaking them for authority.",
    description:
      "The apparatus exposes how work is made addressable, testable, reconstructible, and transferable.",
    links: [
      { label: "Apparatus", href: "/apparatus" },
      { label: "Research", href: "/research" },
      { label: "Paper Mine", href: "/research/paper-mine" },
    ],
  },
  {
    id: "institution",
    eyebrow: "INSTITUTION",
    title: "Understand who is responsible for the work.",
    description:
      "Mission, founder provenance, governance posture, and participation remain visible without being mixed into scientific evidence.",
    links: [
      { label: "About the Lab", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "AI Governance", href: "/ai-governance" },
      { label: "Open Lab", href: "/open-lab" },
    ],
  },
] as const;

export const observatoryBoundary = {
  eyebrow: "INSPECTION / PARTICIPATION",
  title: "Observatory lets you inspect the Lab. Open Lab lets you answer back.",
  description:
    "Inspection should lead to a source, status, relationship, or evidence surface. Critique and collaboration cross a different boundary: they become new input and must be routed deliberately.",
} as const;

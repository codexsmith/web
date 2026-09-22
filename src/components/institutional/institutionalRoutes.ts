export const institutionalRoutes = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Open Lab", href: "/open-lab" },
] as const;


const institutionalChildPages = {
  funding: {
    label: "Funding",
    href: "/funding",
    relation: "SUPPORT",
    kind: "support",
    tone: "gold",
  },
  appliedWork: {
    label: "Applied Work",
    href: "/applied-work",
    relation: "APPLICATION",
    kind: "application",
    tone: "orange",
  },
  evidence: {
    label: "Evidence",
    href: "/evidence",
    relation: "EVIDENCE",
    kind: "evidence",
    tone: "green",
  },
  experiments: {
    label: "Experiments",
    href: "/experiments",
    relation: "EXPERIMENTS",
    kind: "experiment",
    tone: "orange",
  },
  claims: {
    label: "Claims",
    href: "/claims",
    relation: "CLAIMS",
    kind: "claim",
    tone: "gold",
  },
  now: {
    label: "Now",
    href: "/now",
    relation: "STATUS",
    kind: "status",
    tone: "blue",
  },
  changes: {
    label: "What changed",
    href: "/changes",
    relation: "DELTA",
    kind: "status",
    tone: "green",
  },
  collaboration: {
    label: "Collaboration",
    href: "/collaboration",
    relation: "PARTICIPATION",
    kind: "participation",
    tone: "teal",
  },
  founder: {
    label: "Founder",
    href: "/founder",
    relation: "PROVENANCE",
    kind: "provenance",
    tone: "slate",
  },
  labThroughTime: {
    label: "Lab Through Time",
    href: "/lab-through-time",
    relation: "HISTORY",
    kind: "provenance",
    tone: "slate",
  },
  aiGovernance: {
    label: "AI Governance",
    href: "/ai-governance",
    relation: "GOVERNANCE",
    kind: "governance",
    tone: "orange",
  },
  apparatus: {
    label: "Apparatus",
    href: "/apparatus",
    relation: "APPARATUS",
    kind: "apparatus",
    tone: "indigo",
  },
  atlas: {
    label: "Lab Atlas",
    href: "/atlas",
    relation: "MAP",
    kind: "atlas",
    tone: "indigo",
  },
  representationAtlas: {
    label: "Representation Atlas",
    href: "/representation-atlas",
    relation: "LENS",
    kind: "atlas",
    tone: "teal",
  },
} as const;

export const institutionalChildRoutes = {
  about: [
    institutionalChildPages.founder,
    institutionalChildPages.labThroughTime,
    institutionalChildPages.aiGovernance,
    institutionalChildPages.now,
    institutionalChildPages.funding,
    institutionalChildPages.collaboration,
    institutionalChildPages.appliedWork,
  ],
  research: [
    institutionalChildPages.atlas,
    institutionalChildPages.representationAtlas,
    institutionalChildPages.aiGovernance,
    institutionalChildPages.experiments,
    institutionalChildPages.claims,
    institutionalChildPages.apparatus,
  ],
  products: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.collaboration,
    institutionalChildPages.now,
  ],
  projects: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.aiGovernance,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
    institutionalChildPages.apparatus,
  ],
  publications: [
    institutionalChildPages.evidence,
    institutionalChildPages.claims,
    institutionalChildPages.experiments,
    institutionalChildPages.atlas,
    institutionalChildPages.apparatus,
  ],
  funding: [
    institutionalChildPages.now,
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.collaboration,
  ],
  collaboration: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.funding,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
  ],
  appliedWork: [
    institutionalChildPages.aiGovernance,
    institutionalChildPages.evidence,
    institutionalChildPages.collaboration,
    institutionalChildPages.funding,
    institutionalChildPages.now,
  ],
  aiGovernance: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.collaboration,
    institutionalChildPages.apparatus,
  ],
  founder: [
    institutionalChildPages.labThroughTime,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
  ],
  evidence: [
    institutionalChildPages.claims,
    institutionalChildPages.experiments,
    institutionalChildPages.atlas,
    institutionalChildPages.now,
  ],
  now: [
    institutionalChildPages.changes,
    institutionalChildPages.labThroughTime,
    institutionalChildPages.funding,
    institutionalChildPages.appliedWork,
    institutionalChildPages.collaboration,
  ],
  changes: [
    institutionalChildPages.now,
    institutionalChildPages.labThroughTime,
    institutionalChildPages.atlas,
    institutionalChildPages.evidence,
    institutionalChildPages.apparatus,
  ],
  labThroughTime: [
    institutionalChildPages.founder,
    institutionalChildPages.now,
    institutionalChildPages.changes,
    institutionalChildPages.evidence,
  ],
  apparatus: [
    institutionalChildPages.experiments,
    institutionalChildPages.atlas,
    institutionalChildPages.evidence,
    institutionalChildPages.claims,
  ],
  experiments: [
    institutionalChildPages.evidence,
    institutionalChildPages.claims,
    institutionalChildPages.apparatus,
    institutionalChildPages.atlas,
    institutionalChildPages.representationAtlas,
  ],
  claims: [
    institutionalChildPages.evidence,
    institutionalChildPages.experiments,
    institutionalChildPages.atlas,
    institutionalChildPages.representationAtlas,
  ],
  atlas: [
    institutionalChildPages.representationAtlas,
    institutionalChildPages.apparatus,
    institutionalChildPages.experiments,
    institutionalChildPages.claims,
    institutionalChildPages.evidence,
  ],
  representationAtlas: [
    institutionalChildPages.atlas,
    institutionalChildPages.apparatus,
    institutionalChildPages.experiments,
    institutionalChildPages.collaboration,
  ],
  openLab: [
    institutionalChildPages.collaboration,
    institutionalChildPages.aiGovernance,
    institutionalChildPages.experiments,
    institutionalChildPages.claims,
    institutionalChildPages.evidence,
    institutionalChildPages.apparatus,
  ],
  contact: [
    institutionalChildPages.collaboration,
    institutionalChildPages.appliedWork,
    institutionalChildPages.funding,
  ],
  start: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.funding,
    institutionalChildPages.collaboration,
    institutionalChildPages.evidence,
    institutionalChildPages.atlas,
    institutionalChildPages.now,
  ],
} as const;


export const institutionalFooterGroups = [
  {
    label: "Institution",
    routes: [
      { label: "About", href: "/about" },
      { label: "AI Governance", href: "/ai-governance" },
      { label: "Start here", href: "/start" },
      { label: "Founder", href: "/founder" },
      { label: "Lab Through Time", href: "/lab-through-time" },
      { label: "Now", href: "/now" },
      { label: "What changed", href: "/changes" },
    ],
  },
  {
    label: "Research",
    routes: [
      { label: "Research", href: "/research" },
      { label: "Moonshots", href: "/research/moonshots" },
      { label: "Lab Atlas", href: "/atlas" },
      { label: "Representation Atlas", href: "/representation-atlas" },
      { label: "Experiments", href: "/experiments" },
      { label: "Claims", href: "/claims" },
      { label: "Publications", href: "/publications" },
      { label: "Evidence", href: "/evidence" },
      { label: "Apparatus", href: "/apparatus" },
    ],
  },
  {
    label: "Work",
    routes: [
      { label: "Products", href: "/products" },
      { label: "Projects", href: "/projects" },
      { label: "Applied Work", href: "/applied-work" },
    ],
  },
  {
    label: "Participate",
    routes: [
      { label: "Open Lab", href: "/open-lab" },
      { label: "Collaboration", href: "/collaboration" },
      { label: "Funding", href: "/funding" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const institutionalFooterRoutes = institutionalFooterGroups.flatMap<{
  readonly label: string;
  readonly href: string;
}>((group) => group.routes);

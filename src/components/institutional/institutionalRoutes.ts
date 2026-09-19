export const institutionalRoutes = [
  { label: "About", href: "/v3/about" },
  { label: "Research", href: "/v3/research" },
  { label: "Products", href: "/v3/products" },
  { label: "Projects", href: "/v3/projects" },
  { label: "Publications", href: "/v3/publications" },
  { label: "Open Lab", href: "/v3/open-lab" },
] as const;


const institutionalChildPages = {
  funding: {
    label: "Funding",
    href: "/v3/funding",
    relation: "SUPPORT",
    kind: "support",
    tone: "gold",
  },
  appliedWork: {
    label: "Applied Work",
    href: "/v3/applied-work",
    relation: "APPLICATION",
    kind: "application",
    tone: "orange",
  },
  evidence: {
    label: "Evidence",
    href: "/v3/evidence",
    relation: "EVIDENCE",
    kind: "evidence",
    tone: "green",
  },
  experiments: {
    label: "Experiments",
    href: "/v3/experiments",
    relation: "EXPERIMENTS",
    kind: "experiment",
    tone: "orange",
  },
  claims: {
    label: "Claims",
    href: "/v3/claims",
    relation: "CLAIMS",
    kind: "claim",
    tone: "gold",
  },
  now: {
    label: "Now",
    href: "/v3/now",
    relation: "STATUS",
    kind: "status",
    tone: "blue",
  },
  changes: {
    label: "What changed",
    href: "/v3/changes",
    relation: "DELTA",
    kind: "status",
    tone: "green",
  },
  collaboration: {
    label: "Collaboration",
    href: "/v3/collaboration",
    relation: "PARTICIPATION",
    kind: "participation",
    tone: "teal",
  },
  founder: {
    label: "Founder",
    href: "/v3/founder",
    relation: "PROVENANCE",
    kind: "provenance",
    tone: "slate",
  },
  aiGovernance: {
    label: "AI Governance",
    href: "/v3/ai-governance",
    relation: "GOVERNANCE",
    kind: "governance",
    tone: "orange",
  },
  apparatus: {
    label: "Apparatus",
    href: "/v3/apparatus",
    relation: "APPARATUS",
    kind: "apparatus",
    tone: "indigo",
  },
  atlas: {
    label: "Lab Atlas",
    href: "/v3/atlas",
    relation: "MAP",
    kind: "atlas",
    tone: "indigo",
  },
  representationAtlas: {
    label: "Representation Atlas",
    href: "/v3/representation-atlas",
    relation: "LENS",
    kind: "atlas",
    tone: "teal",
  },
} as const;

export const institutionalChildRoutes = {
  about: [
    institutionalChildPages.founder,
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
    institutionalChildPages.funding,
    institutionalChildPages.appliedWork,
    institutionalChildPages.collaboration,
  ],
  changes: [
    institutionalChildPages.now,
    institutionalChildPages.atlas,
    institutionalChildPages.evidence,
    institutionalChildPages.apparatus,
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
      { label: "About", href: "/v3/about" },
      { label: "AI Governance", href: "/v3/ai-governance" },
      { label: "Start here", href: "/v3/start" },
      { label: "Founder", href: "/v3/founder" },
      { label: "Now", href: "/v3/now" },
      { label: "What changed", href: "/v3/changes" },
    ],
  },
  {
    label: "Research",
    routes: [
      { label: "Research", href: "/v3/research" },
      { label: "Lab Atlas", href: "/v3/atlas" },
      { label: "Representation Atlas", href: "/v3/representation-atlas" },
      { label: "Experiments", href: "/v3/experiments" },
      { label: "Claims", href: "/v3/claims" },
      { label: "Publications", href: "/v3/publications" },
      { label: "Evidence", href: "/v3/evidence" },
      { label: "Apparatus", href: "/v3/apparatus" },
    ],
  },
  {
    label: "Work",
    routes: [
      { label: "Products", href: "/v3/products" },
      { label: "Projects", href: "/v3/projects" },
      { label: "Applied Work", href: "/v3/applied-work" },
    ],
  },
  {
    label: "Participate",
    routes: [
      { label: "Open Lab", href: "/v3/open-lab" },
      { label: "Collaboration", href: "/v3/collaboration" },
      { label: "Funding", href: "/v3/funding" },
      { label: "Contact", href: "/v3/contact" },
    ],
  },
] as const;

export const institutionalFooterRoutes = institutionalFooterGroups.flatMap<{
  readonly label: string;
  readonly href: string;
}>((group) => group.routes);

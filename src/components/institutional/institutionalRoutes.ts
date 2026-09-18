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
  now: {
    label: "Now",
    href: "/v3/now",
    relation: "STATUS",
    kind: "status",
    tone: "blue",
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
} as const;

export const institutionalChildRoutes = {
  about: [
    institutionalChildPages.funding,
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
    institutionalChildPages.founder,
  ],
  research: [
    institutionalChildPages.atlas,
    institutionalChildPages.apparatus,
    institutionalChildPages.funding,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
  ],
  products: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.collaboration,
  ],
  projects: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
  ],
  funding: [
    institutionalChildPages.appliedWork,
    institutionalChildPages.evidence,
    institutionalChildPages.now,
  ],
  collaboration: [
    institutionalChildPages.appliedWork,
  ],
  appliedWork: [
    institutionalChildPages.evidence,
  ],
  founder: [
    institutionalChildPages.evidence,
  ],
  evidence: [
    institutionalChildPages.now,
  ],
  openLab: [
    institutionalChildPages.apparatus,
    institutionalChildPages.funding,
    institutionalChildPages.now,
    institutionalChildPages.collaboration,
  ],
} as const;


export const institutionalFooterGroups = [
  {
    label: "Institution",
    routes: [
      { label: "About", href: "/v3/about" },
      { label: "Founder", href: "/v3/founder" },
      { label: "Now", href: "/v3/now" },
    ],
  },
  {
    label: "Research",
    routes: [
      { label: "Research", href: "/v3/research" },
      { label: "Lab Atlas", href: "/v3/atlas" },
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

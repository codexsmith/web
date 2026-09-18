export const institutionalRoutes = [
  { label: "About", href: "/v3/about" },
  { label: "Research", href: "/v3/research" },
  { label: "Products", href: "/v3/products" },
  { label: "Projects", href: "/v3/projects" },
  { label: "Publications", href: "/v3/publications" },
  { label: "Open Lab", href: "/v3/open-lab" },
] as const;


export const institutionalChildRoutes = {
  about: [
    { label: "Funding", href: "/v3/funding" },
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Evidence", href: "/v3/evidence" },
    { label: "Now", href: "/v3/now" },
    { label: "Collaboration", href: "/v3/collaboration" },
    { label: "Founder", href: "/v3/founder" },
  ],
  research: [
    { label: "Apparatus", href: "/v3/apparatus" },
    { label: "Funding", href: "/v3/funding" },
    { label: "Now", href: "/v3/now" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  products: [
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Evidence", href: "/v3/evidence" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  projects: [
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Evidence", href: "/v3/evidence" },
    { label: "Now", href: "/v3/now" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  funding: [
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Evidence", href: "/v3/evidence" },
    { label: "Now", href: "/v3/now" },
  ],
  collaboration: [
    { label: "Applied Work", href: "/v3/applied-work" },
  ],
  appliedWork: [
    { label: "Evidence", href: "/v3/evidence" },
  ],
  founder: [
    { label: "Evidence", href: "/v3/evidence" },
  ],
  evidence: [
    { label: "Now", href: "/v3/now" },
  ],
  openLab: [
    { label: "Apparatus", href: "/v3/apparatus" },
    { label: "Funding", href: "/v3/funding" },
    { label: "Now", href: "/v3/now" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
} as const;


export const institutionalFooterRoutes = [
  ...institutionalRoutes,
  { label: "Funding", href: "/v3/funding" },
  { label: "Applied Work", href: "/v3/applied-work" },
  { label: "Evidence", href: "/v3/evidence" },
  { label: "Now", href: "/v3/now" },
  { label: "Apparatus", href: "/v3/apparatus" },
  { label: "Collaboration", href: "/v3/collaboration" },
  { label: "Founder", href: "/v3/founder" },
] as const;

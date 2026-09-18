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
    { label: "Collaboration", href: "/v3/collaboration" },
    { label: "Founder", href: "/v3/founder" },
  ],
  research: [
    { label: "Apparatus", href: "/v3/apparatus" },
    { label: "Funding", href: "/v3/funding" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  products: [
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  projects: [
    { label: "Applied Work", href: "/v3/applied-work" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
  funding: [
    { label: "Applied Work", href: "/v3/applied-work" },
  ],
  collaboration: [
    { label: "Applied Work", href: "/v3/applied-work" },
  ],
  openLab: [
    { label: "Apparatus", href: "/v3/apparatus" },
    { label: "Funding", href: "/v3/funding" },
    { label: "Collaboration", href: "/v3/collaboration" },
  ],
} as const;


export const institutionalFooterRoutes = [
  ...institutionalRoutes,
  { label: "Funding", href: "/v3/funding" },
  { label: "Applied Work", href: "/v3/applied-work" },
  { label: "Apparatus", href: "/v3/apparatus" },
  { label: "Collaboration", href: "/v3/collaboration" },
  { label: "Founder", href: "/v3/founder" },
] as const;

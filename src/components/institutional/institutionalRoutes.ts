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
  ],
  research: [
    { label: "Apparatus", href: "/v3/apparatus" },
  ],
  openLab: [
    { label: "Apparatus", href: "/v3/apparatus" },
  ],
} as const;

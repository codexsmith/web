export const institutionalRoutes = [
  { label: "About", href: "/v3/about" },
  { label: "Research", href: "/v3/research" },
  { label: "Products", href: "/v3/products" },
  { label: "Projects", href: "/v3/projects" },
  { label: "Apparatus", href: "/v3/apparatus" },
  { label: "Publications", href: "/v3/publications" },
  { label: "Open Lab", href: "/v3/open-lab" },
] as const;

export type InstitutionalRouteKey =
  | "about"
  | "research"
  | "products"
  | "projects"
  | "apparatus"
  | "publications"
  | "open-lab";

export type InstitutionalRouteFrontDoor = {
  eyebrow: string;
  title: string;
  lead: string;
  support: string;
  sourcePath: string;
};

export const institutionalRouteFrontDoors: Record<InstitutionalRouteKey, InstitutionalRouteFrontDoor> = {
  about: {
    eyebrow: "ABOUT",
    title: "A laboratory for the machinery beneath knowledge.",
    lead:
      "Every technical discipline depends on representations. Boundary First Labs studies that layer — and what happens to human agency when those representations become operational.",
    support:
      "The Lab develops methods and instruments for making knowledge infrastructure more explicit, inspectable, and repairable.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/about_v3_v0_1.md",
  },
  research: {
    eyebrow: "RESEARCH",
    title: "Research as inspectable machinery.",
    lead:
      "Boundary First Labs develops theories, experiments, computational models, formal artifacts, and working systems.",
    support:
      "The recurring question is whether the machinery used to reason about complex systems can itself be made more explicit, testable, comparable, and operational.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/research_v3_v0_1.md",
  },
  products: {
    eyebrow: "PRODUCTS",
    title: "Research should sometimes become something a person can use.",
    lead:
      "Boundary First Labs is a research laboratory. It is also a place that makes things.",
    support:
      "Some work becomes products that a person can directly use, learn from, buy, subscribe to, support, license, or carry elsewhere.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/products_v3_v0_1.md",
  },
  projects: {
    eyebrow: "PROJECTS",
    title: "Theory should travel.",
    lead:
      "A method becomes more interesting when it survives outside the environment in which it was developed.",
    support:
      "Projects put ideas, representations, instruments, and workflows under different kinds of pressure in bounded real systems.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/projects_v3_v0_1.md",
  },
  apparatus: {
    eyebrow: "APPARATUS",
    title: "Operational tools for knowledge infrastructure.",
    lead:
      "Research creates more structure than a paper can hold.",
    support:
      "Boundary First Labs builds apparatus for preserving, inspecting, and transferring claims, experiments, sources, representations, criticism, and research state without erasing local authority.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/apparatus_v3_v0_1.md",
  },
  publications: {
    eyebrow: "PUBLICATIONS",
    title: "Read the argument. Inspect the machinery behind it.",
    lead:
      "Boundary First Labs publishes papers, technical reports, research notes, formal specifications, experiment reports, public-interest analyses, reference implementations, and Research Deployment Packets.",
    support:
      "A publication is an important artifact, but it is not automatically the whole research object.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/publications_v3_v0_1.md",
  },
  "open-lab": {
    eyebrow: "OPEN LAB",
    title: "A research institution should have a permeable boundary.",
    lead:
      "The public should be able to inspect the Lab, challenge it, bring consequential systems to its attention, contribute expertise, and bring work that does not yet fit a familiar institutional category.",
    support:
      "The participation surface preserves distinct contracts for public-system inspection, critique, collaboration, and unusual submissions.",
    sourcePath:
      "organized_library_curated/06_Website_Content/0602_Public_Projection/open_lab_participation_v3_v0_1.md",
  },
};

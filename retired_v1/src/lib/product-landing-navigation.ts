export type ProductLandingNavigationGroup = "software" | "work" | "research";

export type ProductLandingNavigationPlacement = {
  id: string;
  href: string;
  group: ProductLandingNavigationGroup;
  label: string;
};

export const PRODUCT_LANDING_NAVIGATION: readonly ProductLandingNavigationPlacement[] = [
  {
    id: "boundary-first-ux",
    href: "/boundary-first-ux",
    group: "software",
    label: "Boundary First UX",
  },
  {
    id: "software-before-code",
    href: "/software-before-code",
    group: "software",
    label: "Software Before Code",
  },
  {
    id: "closure-driven-software-development",
    href: "/closure-driven-software-development",
    group: "software",
    label: "Closure-Driven Software Development",
  },
  {
    id: "boundary-first-weather",
    href: "/weather",
    group: "research",
    label: "Boundary First Weather",
  },
  {
    id: "constitutional-law-and-jurisprudence",
    href: "/law",
    group: "research",
    label: "Constitutional Law & Jurisprudence",
  },
  {
    id: "schemathematics",
    href: "/schemathematics",
    group: "research",
    label: "Schemathematics",
  },
  {
    id: "boundary-first-chess",
    href: "/chess",
    group: "work",
    label: "Boundary-First Chess",
  },
  {
    id: "boundary-first-soccer",
    href: "/soccer",
    group: "work",
    label: "Boundary-First Soccer",
  },
  {
    id: "corpus-forge",
    href: "/corpus-forge",
    group: "work",
    label: "Corpus Forge",
  },
  {
    id: "agency-representation-audit",
    href: "/agency-audit",
    group: "work",
    label: "Agency & Representation Audit",
  },
] as const;

export function getProductLandingNavigationForGroup(
  group: ProductLandingNavigationGroup,
): ProductLandingNavigationPlacement[] {
  return PRODUCT_LANDING_NAVIGATION.filter((item) => item.group === group);
}

export function getProductLandingNavigationGroup(
  pathname: string,
): ProductLandingNavigationGroup | null {
  return (
    PRODUCT_LANDING_NAVIGATION.find((item) => item.href === pathname)?.group ?? null
  );
}

import { getProductLandingNavigationGroup } from "@/lib/product-landing-navigation";

export type SiteNavigationItem = {
  label: string;
  href: string;
};

export const ATLAS_HREF = "/map?mode=atlas&view=domains";
export const ATLAS_LIST_HREF = "/map/refined";
export const ATLAS_EVIDENCE_HREF =
  "/map/refined?filter=evidence&stage=evidence";
export const DOMAINS_HREF = "/domains";
export const LANGUAGE_HREF = "/language";
export const START_HREF = "/software";
export const RELATION_INDEX_HREF = "/relations";
export const RELATIONS_HREF =
  "/map?mode=halo&node=boundary-theory&view=domains";

// One menu per visitor action: use an output, inspect the work, or engage the Lab.
// Website v3's institutional and immersive headers consume this same list.
export const PRIMARY_NAV_ITEMS: SiteNavigationItem[] = [
  { label: "Products", href: "/products" },
  { label: "Observatory", href: "/observatory" },
  { label: "Work With Us", href: "/collaboration" },
];

export const IMMERSIVE_NAV_ITEMS = PRIMARY_NAV_ITEMS;

export function destinationPath(href: string): string {
  return href.split(/[?#]/, 1)[0] || "/";
}

// Deep URLs do not move when their public navigation owner changes.
// Keep each prefix in exactly one group: a visitor with a specific action
// should never see two active primary navigation items.
export const PRIMARY_NAV_ROUTE_GROUPS: Readonly<Record<string, readonly string[]>> = {
  "/products": [
    "/products", "/software", "/learn", "/audience", "/problem",
    "/practice", "/methods",
  ],
  "/observatory": [
    "/observatory", "/research", "/publications", "/projects",
    "/atlas", "/representation-atlas", "/experiments", "/claims",
    "/evidence", "/apparatus", "/now", "/changes", "/lab-through-time",
    "/about", "/founder", "/ai-governance", "/people", "/mission",
    "/governance", "/trust", "/accessibility", "/labs", "/theory",
    "/sandbox", "/domains", "/domain", "/map", "/relations", LANGUAGE_HREF,
  ],
  "/collaboration": [
    "/collaboration", "/applied-work", "/open-lab", "/funding", "/contact",
    "/work", "/help", "/business", "/artifact", "/inquire", "/outreach",
  ],
};

function matchesPublicRoute(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function primaryNavigationOwner(pathname: string): string | undefined {
  for (const [owner, routes] of Object.entries(PRIMARY_NAV_ROUTE_GROUPS)) {
    if (routes.some((route) => matchesPublicRoute(pathname, route))) {
      return owner;
    }
  }

  // Compatibility for older immersive product landing pages not in the
  // Website v3 route matrix. Canonical public routes always win above.
  const landingGroup = getProductLandingNavigationGroup(pathname);
  // The older "work" group contains Chess, Corpus Forge, and other product
  // landings; it did not mean "contact the Lab for custom work".
  if (landingGroup === "work" || pathname === "/weather") return "/products";
  if (landingGroup === "software" || landingGroup === "research") {
    return "/observatory";
  }
  return undefined;
}

export function isNavigationItemActive(pathname: string, href: string): boolean {
  return primaryNavigationOwner(pathname) === destinationPath(href);
}

export function domainHref(nodeId: string, domainsReturnHref?: string): string {
  const pathname = `/domain/${encodeURIComponent(nodeId)}`;
  if (!domainsReturnHref) return pathname;

  const params = new URLSearchParams({ returnTo: domainsReturnHref });
  return `${pathname}?${params.toString()}`;
}

export function domainMapHref(nodeId: string): string {
  const params = new URLSearchParams({
    mode: "focus",
    node: nodeId,
    view: "domains",
  });
  return `/map?${params.toString()}`;
}

export function domainsStageHref(stageId: string, nodeId?: string): string {
  return domainsReturnHref("", stageId, nodeId);
}

export type ArchitectureListPath =
  | typeof DOMAINS_HREF
  | typeof ATLAS_LIST_HREF;

export function architectureListHref(
  basePath: ArchitectureListPath,
  currentQuery: string,
  stageId: string,
  nodeId?: string,
): string {
  const params = new URLSearchParams(currentQuery);
  const openStages = params.getAll("stage");
  if (!openStages.includes(stageId)) {
    params.append("stage", stageId);
  }
  if (nodeId) {
    params.set("node", nodeId);
  } else {
    params.delete("node");
  }

  const query = params.toString();
  const hash = nodeId ? `#domain-${encodeURIComponent(nodeId)}` : "";
  return `${basePath}${query ? `?${query}` : ""}${hash}`;
}

export function domainsReturnHref(
  currentQuery: string,
  stageId: string,
  nodeId?: string,
): string {
  return architectureListHref(
    DOMAINS_HREF,
    currentQuery,
    stageId,
    nodeId,
  );
}

export function atlasListHref(nodeId?: string, stageId?: string): string {
  const params = new URLSearchParams();
  if (stageId) params.append("stage", stageId);
  if (nodeId) params.set("node", nodeId);
  const query = params.toString();
  return `${ATLAS_LIST_HREF}${query ? `?${query}` : ""}`;
}

export function resolveArchitectureReturnHref(
  requestedHref: string | null,
  fallbackStageId: string,
  nodeId: string,
): string {
  if (!requestedHref) {
    return domainsStageHref(fallbackStageId, nodeId);
  }

  try {
    const url = new URL(requestedHref, "https://boundaryfirst.local");
    const isAllowedPath =
      url.pathname === DOMAINS_HREF || url.pathname === ATLAS_LIST_HREF;
    if (url.origin !== "https://boundaryfirst.local" || !isAllowedPath) {
      return domainsStageHref(fallbackStageId, nodeId);
    }
    return architectureListHref(
      url.pathname as ArchitectureListPath,
      url.search,
      fallbackStageId,
      nodeId,
    );
  } catch {
    return domainsStageHref(fallbackStageId, nodeId);
  }
}

export function resolveDomainsReturnHref(
  requestedHref: string | null,
  fallbackStageId: string,
  nodeId: string,
): string {
  const resolved = resolveArchitectureReturnHref(
    requestedHref,
    fallbackStageId,
    nodeId,
  );
  if (!resolved.startsWith(DOMAINS_HREF)) {
    return domainsStageHref(fallbackStageId, nodeId);
  }
  return resolved;
}

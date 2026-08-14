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

export const PRIMARY_NAV_ITEMS: SiteNavigationItem[] = [
  { label: "Software", href: "/software" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "Institute", href: "/about" },
  { label: "Collaborate", href: "/collaborate" },
];

export const IMMERSIVE_NAV_ITEMS = PRIMARY_NAV_ITEMS;

export function destinationPath(href: string): string {
  return href.split(/[?#]/, 1)[0] || "/";
}

export function isNavigationItemActive(
  pathname: string,
  href: string,
): boolean {
  const destination = destinationPath(href);
  if (pathname === destination) return true;

  const routeGroups: Record<string, string[]> = {
    "/software": ["/software", "/learn", "/audience", "/problem", "/practice", "/methods"],
    "/work": ["/work", "/help", "/business", "/artifact", "/publications"],
    "/research": ["/research", "/evidence", "/theory", "/domains", "/domain", "/map", "/relations", LANGUAGE_HREF],
    "/about": ["/about", "/mission", "/governance", "/people"],
    "/collaborate": ["/collaborate"],
  };
  const group = routeGroups[destination];
  return Boolean(
    group?.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ),
  );
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

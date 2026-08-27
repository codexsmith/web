import manifestData from "../content/product-landing-pages/manifest.json";
import {
  BRIDGE_RELATIONSHIP_STATUSES,
  validateBridgeGovernanceEntry,
  type BridgeOperationalMetadata,
  type BridgeRelationshipStatus,
} from "@/lib/bridge-governance";

export const RELATIONSHIP_STATUSES = BRIDGE_RELATIONSHIP_STATUSES;

export type RelationshipStatus = BridgeRelationshipStatus;
export type LandingVisibility = "public" | "unlisted" | "private";
export type RoutingEligibility = "public-candidate" | "unlisted-only" | "hold";
export type LandingCollection =
  | "active"
  | "bridge"
  | "legacy-recovered"
  | "reconciliation";

export type ProductLandingEntry = {
  id: string;
  slug: string;
  pageType: string;
  visibility: LandingVisibility;
  status: string;
  collection: LandingCollection;
  routingEligibility: RoutingEligibility;
  file: string;
  relationshipStatus?: RelationshipStatus;
  bridgeOperations?: BridgeOperationalMetadata;
};

export type ProductLandingManifest = {
  version: string;
  kind: "product-landing-page-registry";
  root: string;
  description: string;
  pages: ProductLandingEntry[];
  routingPolicy: {
    implemented: boolean;
    rulesImplemented?: boolean;
    routesImplemented?: boolean;
    rendererImplemented?: boolean;
    publicRule: string;
    unlistedRule: string;
    privateRule: string;
    relationshipRule: string;
    lifecycleRule?: string;
    activationRule?: string;
    notes: string;
  };
};

export type ProductLandingVisibilityPolicy = {
  routeEligible: boolean;
  directLinkOnly: boolean;
  indexable: boolean;
  sitemapEligible: boolean;
  navigationEligible: boolean;
  robots: {
    index: boolean;
    follow: boolean;
  };
};

export type ProductLandingRouteDecision = {
  entry: ProductLandingEntry;
  policy: ProductLandingVisibilityPolicy;
  routeKind: "public" | "unlisted" | "blocked";
  relationshipNotice: string | null;
};

const relationshipStatusSet = new Set<string>(RELATIONSHIP_STATUSES);

const relationshipNotices: Record<RelationshipStatus, string> = {
  "exploratory-no-affiliation":
    "Exploratory collaboration bridge. No affiliation, endorsement, sponsorship, review, adoption, or current partnership is implied.",
  "target-class-no-affiliation":
    "Target-class collaboration bridge. It describes a class of potential collaborators and does not imply a named institutional affiliation, endorsement, sponsorship, review, adoption, or partnership.",
  "historical-project-no-current-affiliation":
    "Historical project relationship only. No current affiliation, endorsement, sponsorship, review, adoption, or partnership is implied.",
  "scoped-collaboration":
    "A bounded collaboration scope has been established. This status describes only the agreed scope and does not imply endorsement of Boundary First Labs or its wider research program.",
  "active-collaboration":
    "An active bounded collaboration exists. Public description is limited to the actual collaboration scope and does not imply broader endorsement, adoption, or institutional sponsorship.",
  "historical-collaboration":
    "A documented collaboration occurred historically and is no longer active. Historical description must not imply a current relationship or continuing endorsement.",
  "declined-no-current-affiliation":
    "The proposed bridge is closed without a current collaboration. No affiliation, endorsement, sponsorship, review, adoption, or partnership is implied.",
};

export const productLandingManifest = manifestData as ProductLandingManifest;
export const productLandingPages: readonly ProductLandingEntry[] =
  productLandingManifest.pages;

export function normalizeProductLandingSlug(
  value: string | readonly string[],
): string {
  const raw = typeof value === "string" ? value : value.join("/");
  return raw
    .split(/[?#]/, 1)[0]
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/");
}

export function buildProductLandingPath(entry: ProductLandingEntry): string {
  return `/${entry.slug}`;
}

export function validateProductLandingManifest(
  manifest: ProductLandingManifest = productLandingManifest,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  if (manifest.kind !== "product-landing-page-registry") {
    errors.push("manifest kind must remain product-landing-page-registry");
  }

  for (const entry of manifest.pages) {
    if (ids.has(entry.id)) errors.push(`duplicate landing id: ${entry.id}`);
    ids.add(entry.id);

    if (slugs.has(entry.slug)) errors.push(`duplicate landing slug: ${entry.slug}`);
    slugs.add(entry.slug);

    if (
      !entry.slug ||
      entry.slug.startsWith("/") ||
      entry.slug.endsWith("/") ||
      entry.slug.includes("\\") ||
      entry.slug.split("/").some((segment) => segment === "." || segment === "..")
    ) {
      errors.push(`invalid landing slug: ${entry.slug || "<empty>"}`);
    }

    if (!entry.file.endsWith(".json")) {
      errors.push(`${entry.id}: landing content file must be JSON`);
    }

    if (
      entry.visibility === "public" &&
      entry.routingEligibility !== "public-candidate"
    ) {
      errors.push(`${entry.id}: public visibility requires public-candidate routing`);
    }

    if (
      entry.visibility === "unlisted" &&
      entry.routingEligibility !== "unlisted-only"
    ) {
      errors.push(`${entry.id}: unlisted visibility requires unlisted-only routing`);
    }

    if (
      entry.visibility === "private" &&
      entry.routingEligibility !== "hold"
    ) {
      errors.push(`${entry.id}: private visibility requires hold routing`);
    }

    if (entry.collection === "bridge") {
      errors.push(
        ...validateBridgeGovernanceEntry(entry).map(
          (error) => `${entry.id}: ${error}`,
        ),
      );
    } else if (
      entry.relationshipStatus &&
      !relationshipStatusSet.has(entry.relationshipStatus)
    ) {
      errors.push(
        `${entry.id}: unsupported relationshipStatus ${entry.relationshipStatus}`,
      );
    }

    if (
      (entry.collection === "legacy-recovered" ||
        entry.collection === "reconciliation") &&
      (entry.visibility !== "private" || entry.routingEligibility !== "hold")
    ) {
      errors.push(`${entry.id}: held collections must remain private and hold`);
    }
  }

  return errors;
}

const manifestErrors = validateProductLandingManifest();
if (manifestErrors.length > 0) {
  throw new Error(
    `Invalid product landing manifest:\n${manifestErrors
      .map((error) => `- ${error}`)
      .join("\n")}`,
  );
}

const entriesBySlug = new Map(
  productLandingPages.map((entry) => [entry.slug, entry] as const),
);
const entriesById = new Map(
  productLandingPages.map((entry) => [entry.id, entry] as const),
);

export function getProductLandingEntry(
  value: string | readonly string[],
): ProductLandingEntry | undefined {
  return entriesBySlug.get(normalizeProductLandingSlug(value));
}

export function getProductLandingEntryById(
  id: string,
): ProductLandingEntry | undefined {
  return entriesById.get(id);
}

export function getProductLandingVisibilityPolicy(
  entry: ProductLandingEntry,
): ProductLandingVisibilityPolicy {
  const publicRoute =
    entry.visibility === "public" &&
    entry.routingEligibility === "public-candidate";
  const unlistedRoute =
    entry.visibility === "unlisted" &&
    entry.routingEligibility === "unlisted-only";
  const routeEligible = publicRoute || unlistedRoute;

  return {
    routeEligible,
    directLinkOnly: unlistedRoute,
    indexable: publicRoute,
    sitemapEligible: publicRoute,
    navigationEligible: publicRoute,
    robots: {
      index: publicRoute,
      follow: publicRoute,
    },
  };
}

export function getProductLandingRelationshipNotice(
  entry: ProductLandingEntry,
): string | null {
  if (!entry.relationshipStatus) return null;
  return relationshipNotices[entry.relationshipStatus];
}

export function resolveProductLandingRoute(
  value: string | readonly string[],
): ProductLandingRouteDecision | null {
  const entry = getProductLandingEntry(value);
  if (!entry) return null;

  const policy = getProductLandingVisibilityPolicy(entry);
  return {
    entry,
    policy,
    routeKind: policy.routeEligible
      ? policy.directLinkOnly
        ? "unlisted"
        : "public"
      : "blocked",
    relationshipNotice: getProductLandingRelationshipNotice(entry),
  };
}

export function getRouteEligibleProductLandingEntries(): ProductLandingEntry[] {
  return productLandingPages.filter(
    (entry) => getProductLandingVisibilityPolicy(entry).routeEligible,
  );
}

export function getPublicProductLandingEntries(): ProductLandingEntry[] {
  return productLandingPages.filter(
    (entry) => getProductLandingVisibilityPolicy(entry).indexable,
  );
}

export function getUnlistedProductLandingEntries(): ProductLandingEntry[] {
  return productLandingPages.filter(
    (entry) => getProductLandingVisibilityPolicy(entry).directLinkOnly,
  );
}

export function getHeldProductLandingEntries(): ProductLandingEntry[] {
  return productLandingPages.filter(
    (entry) => !getProductLandingVisibilityPolicy(entry).routeEligible,
  );
}

export function getProductLandingSitemapPaths(): string[] {
  if (!productLandingManifest.routingPolicy.routesImplemented) return [];

  return getPublicProductLandingEntries()
    .filter((entry) => getProductLandingVisibilityPolicy(entry).sitemapEligible)
    .map(buildProductLandingPath);
}

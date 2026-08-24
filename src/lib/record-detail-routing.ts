import { nodes, type ContentNode } from "@/lib/content-registry";
import {
  buildProductLandingPath,
  getProductLandingEntry,
  getProductLandingEntryById,
  getProductLandingVisibilityPolicy,
  type ProductLandingEntry,
} from "@/lib/product-landing-routing";

export type RecordDetailResolution = {
  entry: ProductLandingEntry;
  owner: ContentNode;
};

const RECORD_DETAIL_PREFIX = "record:";

function nodePath(node: ContentNode) {
  return node.path ? `/${node.path}` : "/";
}

function normalizedPath(value: string) {
  return value.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

function linksToLanding(node: ContentNode, entry: ProductLandingEntry) {
  const landingPath = buildProductLandingPath(entry);
  return Boolean(
    node.links?.some((link) => normalizedPath(link.href) === landingPath),
  );
}

function publicationOwnsLanding(node: ContentNode, entry: ProductLandingEntry) {
  const sourceRef = node.publication?.sourceRef;
  if (!sourceRef) return false;
  return sourceRef === entry.file || sourceRef.endsWith(`/${entry.file}`);
}

export function getCanonicalRecordOwner(
  entry: ProductLandingEntry,
): ContentNode | undefined {
  if (entry.collection !== "active") return undefined;
  if (!getProductLandingVisibilityPolicy(entry).navigationEligible) return undefined;

  // Publication provenance is the strongest ownership declaration: if the publication
  // explicitly names this manifest file as its source, the record belongs to that object
  // even when research/method nodes also link to the public landing alias.
  const publicationOwners = nodes.filter((node) => publicationOwnsLanding(node, entry));
  if (publicationOwners.length === 1) return publicationOwners[0];
  if (publicationOwners.length > 1) return undefined;

  // Exact semantic identity is next strongest for product/research objects whose node ID
  // and retained-record ID intentionally coincide.
  const identityOwners = nodes.filter((node) => node.id === entry.id);
  if (identityOwners.length === 1) return identityOwners[0];
  if (identityOwners.length > 1) return undefined;

  // A unique explicit record link is a lawful fallback. Multiple links are relations,
  // not permission for array order to silently choose an owner.
  const linkedOwners = nodes.filter((node) => linksToLanding(node, entry));
  return linkedOwners.length === 1 ? linkedOwners[0] : undefined;
}

export function buildRecordDetailPath(
  owner: ContentNode,
  entry: ProductLandingEntry,
): string {
  return `${nodePath(owner)}?detail=${RECORD_DETAIL_PREFIX}${encodeURIComponent(entry.id)}`;
}

export function getRecordDetailHrefForLink(
  context: ContentNode,
  href: string,
): string | undefined {
  const entry = getProductLandingEntry(href);
  if (!entry || !linksToLanding(context, entry)) return undefined;
  if (entry.collection !== "active") return undefined;
  if (!getProductLandingVisibilityPolicy(entry).navigationEligible) return undefined;

  const canonicalOwner = getCanonicalRecordOwner(entry);
  return canonicalOwner ? buildRecordDetailPath(canonicalOwner, entry) : undefined;
}

export function parseRecordDetailEntry(
  value: string | undefined,
): ProductLandingEntry | undefined {
  if (!value?.startsWith(RECORD_DETAIL_PREFIX)) return undefined;
  const id = decodeURIComponent(value.slice(RECORD_DETAIL_PREFIX.length));
  const entry = getProductLandingEntryById(id);
  if (!entry || entry.collection !== "active") return undefined;
  if (!getProductLandingVisibilityPolicy(entry).navigationEligible) return undefined;
  return entry;
}

export function resolveRecordDetailForNode(
  node: ContentNode,
  value: string | undefined,
): RecordDetailResolution | undefined {
  const entry = parseRecordDetailEntry(value);
  if (!entry) return undefined;

  const owner = getCanonicalRecordOwner(entry);
  if (!owner || owner.id !== node.id) return undefined;
  return { entry, owner };
}

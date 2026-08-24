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

function ownsLanding(node: ContentNode, entry: ProductLandingEntry) {
  const landingPath = buildProductLandingPath(entry);
  return Boolean(
    node.links?.some((link) => {
      const pathname = link.href.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
      return pathname === landingPath;
    }),
  );
}

export function getCanonicalRecordOwner(
  entry: ProductLandingEntry,
): ContentNode | undefined {
  if (entry.collection !== "active") return undefined;
  if (!getProductLandingVisibilityPolicy(entry).navigationEligible) return undefined;
  return nodes.find((node) => ownsLanding(node, entry));
}

export function buildRecordDetailPath(
  owner: ContentNode,
  entry: ProductLandingEntry,
): string {
  return `${nodePath(owner)}?detail=${RECORD_DETAIL_PREFIX}${encodeURIComponent(entry.id)}`;
}

export function getRecordDetailHrefForLink(
  owner: ContentNode,
  href: string,
): string | undefined {
  const entry = getProductLandingEntry(href);
  if (!entry || !ownsLanding(owner, entry)) return undefined;
  if (entry.collection !== "active") return undefined;
  if (!getProductLandingVisibilityPolicy(entry).navigationEligible) return undefined;
  return buildRecordDetailPath(owner, entry);
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
  if (!entry || !ownsLanding(node, entry)) return undefined;
  return { entry, owner: node };
}

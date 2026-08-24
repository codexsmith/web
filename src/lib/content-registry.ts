import {
  edges as baseEdges,
  nodes as baseNodes,
  type ContentNode as BaseContentNode,
  type GraphEdge,
} from "@/lib/content";
import { getLocalSections, type LocalSectionDefinition } from "@/lib/local-section-registry";
import { publicationEdges, publicationNodes } from "@/lib/publication-portfolio";
import type { PublicationMetadata } from "@/lib/publication-types";
import {
  getDirectedRelationLabel,
  getRelationDirection,
  getRelationLabels,
  type RelationDirection,
} from "@/lib/relation-semantics";

export type ContentNode = BaseContentNode & {
  publication?: PublicationMetadata;
  localSections?: LocalSectionDefinition[];
};

export type DirectedGraphEdge = Omit<GraphEdge, "label"> & {
  label: string;
  declaredLabel: string;
  forwardLabel: string;
  inverseLabel: string;
  direction: RelationDirection;
  node: ContentNode;
  sourceNode: ContentNode;
  targetNode: ContentNode;
};

export type {
  ContentLink,
  DeliveryStage,
  EdgeType,
  GraphEdge,
  Inspection,
  NodeKind,
  WorkStatus,
} from "@/lib/content";
export type { LocalSectionDefinition } from "@/lib/local-section-registry";
export type { PublicationMetadata, PublicationStage } from "@/lib/publication-types";
export type { RelationDirection } from "@/lib/relation-semantics";

const paperMineNavigation: Partial<Record<"research" | "publications", NonNullable<ContentNode["links"]>[number]>> = {
  research: {
    label: "Paper Mine",
    href: "/research/paper-mine",
    eyebrow: "Featured research workbench",
    summary:
      "Inspect paper-shaped research across the corpus by field, discovery pass, readiness, claim ceiling, evidence obligation, provenance, and paperization frontier.",
  },
  publications: {
    label: "Paper Mine",
    href: "/research/paper-mine",
    eyebrow: "Featured publication discovery",
    summary:
      "See the discovery and paperization layer upstream of the controlled publication portfolio, including readiness, claim ceilings, provenance, and human promotion gates.",
  },
};

function withPaperMineNavigation(node: ContentNode): ContentNode {
  const paperMineLink = node.id === "research" || node.id === "publications"
    ? paperMineNavigation[node.id]
    : undefined;
  if (!paperMineLink) return node;

  return {
    ...node,
    links: [
      paperMineLink,
      ...(node.links ?? []).filter((link) => link.href !== paperMineLink.href),
    ],
  };
}

const rawNodes: ContentNode[] = [...baseNodes, ...publicationNodes];

export const nodes: ContentNode[] = rawNodes.map((node) => {
  const localSections = getLocalSections(node.id);
  const enrichedNode = withPaperMineNavigation(node);
  return localSections.length ? { ...enrichedNode, localSections } : enrichedNode;
});
export const edges: GraphEdge[] = [...baseEdges, ...publicationEdges];

const nodeById = new Map(nodes.map((node) => [node.id, node]));
const nodeByPath = new Map(nodes.map((node) => [node.path, node]));

const canonicalChildOrder: Record<string, string[]> = {
  root: ["public-interest", "products", "publications", "about", "research"],
};

function orderChildren(parentId: string, children: ContentNode[]) {
  const order = canonicalChildOrder[parentId];
  if (!order) return children;

  const position = new Map(order.map((id, index) => [id, index]));
  return [...children].sort((a, b) => {
    const aIndex = position.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = position.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });
}

export function getNode(id: string): ContentNode {
  return nodeById.get(id) ?? nodeById.get("root")!;
}

export function getNodeByPath(pathSegments: string[]): ContentNode {
  const path = pathSegments.join("/");
  return nodeByPath.get(path) ?? nodeById.get("root")!;
}

export function getChildren(id: string): ContentNode[] {
  return orderChildren(id, nodes.filter((node) => node.parentId === id));
}

export function getParent(id: string): ContentNode | undefined {
  const node = getNode(id);
  return node.parentId ? getNode(node.parentId) : undefined;
}

export function getAncestors(id: string): ContentNode[] {
  const result: ContentNode[] = [];
  let cursor = getNode(id);

  while (cursor.parentId) {
    cursor = getNode(cursor.parentId);
    result.unshift(cursor);
  }

  return result;
}

export function getSiblings(id: string): ContentNode[] {
  const node = getNode(id);
  if (!node.parentId) return [];
  return getChildren(node.parentId);
}

export function getPathForNode(id: string): string {
  const node = getNode(id);
  return node.path ? `/${node.path}` : "/";
}

export function isDescendantOf(descendantId: string, ancestorId: string): boolean {
  if (descendantId === ancestorId) return true;
  let cursor = getNode(descendantId);

  while (cursor.parentId) {
    if (cursor.parentId === ancestorId) return true;
    cursor = getNode(cursor.parentId);
  }

  return false;
}

export function getImmediateChildTowardFocus(
  gestaltId: string,
  focusId: string,
): ContentNode | undefined {
  if (gestaltId === focusId) return undefined;
  return getChildren(gestaltId).find((child) => isDescendantOf(focusId, child.id));
}

export function getCrossEdges(id: string): DirectedGraphEdge[] {
  return edges.flatMap((edge) => {
    const direction = getRelationDirection(edge, id);
    if (!direction) return [];

    const labels = getRelationLabels(edge);
    const sourceNode = getNode(edge.from);
    const targetNode = getNode(edge.to);

    return [{
      ...edge,
      label: getDirectedRelationLabel(edge, direction),
      declaredLabel: edge.label,
      forwardLabel: labels.forward,
      inverseLabel: labels.inverse,
      direction,
      node: direction === "outgoing" ? targetNode : sourceNode,
      sourceNode,
      targetNode,
    }];
  });
}

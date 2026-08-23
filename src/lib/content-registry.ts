import {
  edges as baseEdges,
  nodes as baseNodes,
  type ContentNode as BaseContentNode,
  type GraphEdge,
} from "@/lib/content";
import { publicationEdges, publicationNodes } from "@/lib/publication-portfolio";
import type { PublicationMetadata } from "@/lib/publication-types";

export type ContentNode = BaseContentNode & {
  publication?: PublicationMetadata;
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
export type { PublicationMetadata, PublicationStage } from "@/lib/publication-types";

export const nodes: ContentNode[] = [...baseNodes, ...publicationNodes];
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

export function getCrossEdges(id: string): Array<GraphEdge & { node: ContentNode }> {
  return edges.flatMap((edge) => {
    if (edge.from === id) return [{ ...edge, node: getNode(edge.to) }];
    if (edge.to === id) return [{ ...edge, node: getNode(edge.from) }];
    return [];
  });
}

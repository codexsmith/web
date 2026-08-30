import { getNode } from "@/lib/content-registry";

export type TraversalState = {
  ids: string[];
  cursor: number;
};

export function normalizeTraversalCursor(path: string[], cursor: number | undefined) {
  if (!path.length) return -1;
  if (typeof cursor !== "number" || Number.isNaN(cursor)) return path.length - 1;
  return Math.min(Math.max(0, cursor), path.length - 1);
}

export function bootstrapTraversal(targetId: string): TraversalState {
  const ids: string[] = [];
  let cursor = getNode(targetId);

  while (cursor.id !== "root") {
    ids.unshift(cursor.id);
    if (!cursor.parentId) break;
    cursor = getNode(cursor.parentId);
  }

  return { ids, cursor: ids.length - 1 };
}

export function branchTraversal(path: string[], cursor: number, targetId: string): TraversalState {
  const normalizedCursor = normalizeTraversalCursor(path, cursor);
  const activePath = normalizedCursor >= 0 ? path.slice(0, normalizedCursor + 1) : [];

  if (activePath[activePath.length - 1] === targetId) {
    return { ids: activePath, cursor: activePath.length - 1 };
  }

  const ids = [...activePath, targetId];
  return { ids, cursor: ids.length - 1 };
}

export function resolveAdjacentTraversalCursor(path: string[], cursor: number, targetId: string) {
  const normalizedCursor = normalizeTraversalCursor(path, cursor);
  if (normalizedCursor < 0) return -1;
  if (path[normalizedCursor] === targetId) return normalizedCursor;
  if (normalizedCursor > 0 && path[normalizedCursor - 1] === targetId) return normalizedCursor - 1;
  if (normalizedCursor < path.length - 1 && path[normalizedCursor + 1] === targetId) return normalizedCursor + 1;
  return -1;
}

export function sameTraversalState(left: TraversalState, right: TraversalState) {
  return left.cursor === right.cursor
    && left.ids.length === right.ids.length
    && left.ids.every((id, index) => id === right.ids[index]);
}

import graphNodesData from "@/app/context/graphNodes.json";
import type { GraphNode } from "@/app/context/GraphContext";

export function getIdentityNode(): GraphNode {
  return (graphNodesData as unknown as GraphNode[]).find((node) => node.id === "identity") ?? (graphNodesData[0] as unknown as GraphNode);
}

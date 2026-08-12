import { describe, expect, test } from "vitest";
import graphNodesData from "../app/context/graphNodes.json";
import {
  DOMAIN_ARCHITECTURE_STAGES,
  nodesInArchitectureStage,
  type ArchitectureNode,
} from "./domain-architecture";

type AtlasListNode = ArchitectureNode & { id: string };

const publicNodes = (graphNodesData as AtlasListNode[]).filter(
  (node) => node.id !== "identity",
);

describe("Atlas list-view coverage", () => {
  test("lists every public graph record exactly once across architecture stages", () => {
    const listedIds = DOMAIN_ARCHITECTURE_STAGES.flatMap((stage) =>
      nodesInArchitectureStage(publicNodes, stage.id).map((node) => node.id),
    );

    expect(new Set(listedIds).size).toBe(listedIds.length);
    expect(new Set(listedIds)).toEqual(
      new Set(publicNodes.map((node) => node.id)),
    );
  });

  test("keeps every architecture stage represented in the public record set", () => {
    for (const stage of DOMAIN_ARCHITECTURE_STAGES) {
      expect(
        nodesInArchitectureStage(publicNodes, stage.id).length,
      ).toBeGreaterThan(0);
    }
  });
});

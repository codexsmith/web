import { describe, expect, test } from "vitest";
import {
  filterArchitectureNodes,
  isArchitectureStageId,
  matchesArchitectureQuery,
  nodesInArchitectureStage,
  type ArchitectureNode,
} from "./domain-architecture";

const nodes: ArchitectureNode[] = [
  {
    id: "boundary-theory",
    label: "Boundary Theory",
    title: "How do boundaries specify coherent variation?",
    short: "A bounded theoretical research program.",
    role: "theory",
    facets: ["Distinction", "Admissibility", "Emergence"],
    architectureStage: "foundations",
    architectureOrder: 20,
  },
  {
    id: "distinction-space",
    label: "Distinction Space",
    role: "formal object",
    architectureStage: "foundations",
    architectureOrder: 10,
  },
  {
    id: "corpus-forge",
    label: "Corpus Forge",
    role: "research operations protocol",
    architectureStage: "processes",
    architectureOrder: 10,
  },
];

describe("domain architecture filtering", () => {
  test("matches labels, roles, descriptions, and facets", () => {
    expect(matchesArchitectureQuery(nodes[0], "boundary")).toBe(true);
    expect(matchesArchitectureQuery(nodes[0], "theoretical program")).toBe(
      true,
    );
    expect(matchesArchitectureQuery(nodes[0], "admissibility")).toBe(true);
    expect(matchesArchitectureQuery(nodes[0], "finance")).toBe(false);
  });

  test("combines query and stage filters", () => {
    expect(
      filterArchitectureNodes(nodes, {
        query: "research",
        stageId: "processes",
      }).map((node) => node.id),
    ).toEqual(["corpus-forge"]);
  });

  test("ignores unknown stage filter values", () => {
    expect(isArchitectureStageId("not-a-stage")).toBe(false);
    expect(
      filterArchitectureNodes(nodes, { stageId: "not-a-stage" }),
    ).toHaveLength(3);
  });

  test("sorts stage nodes by canonical architecture order", () => {
    expect(
      nodesInArchitectureStage(nodes, "foundations").map((node) => node.id),
    ).toEqual(["distinction-space", "boundary-theory"]);
  });
});

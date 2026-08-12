import { describe, expect, test } from "vitest";
import type { GraphNode } from "@/app/context/GraphContext";
import {
  CANONICAL_LINEAGE_NODE_IDS,
  projectionMatchesNode,
} from "./map-semantics";

const TestIcon = () => null;

function node(id: string): GraphNode {
  return {
    id,
    label: id,
    title: id,
    short: "",
    body: "",
    icon: TestIcon,
    mapIcon: "",
    homeX: 0,
    homeY: 0,
    homeR: 1,
    role: "domain",
    layer: "theory",
    mapX: 0,
    mapY: 0,
    mapR: 1,
    facets: [],
    relatedTo: [],
    pairedWith: [],
    dependsOn: [],
    claims: [],
    documents: [],
    positions: [],
    takeaways: [],
  } as GraphNode;
}

describe("atlas projection semantics", () => {
  test("limits the global lineage emphasis to canonical academic foundations", () => {
    for (const id of CANONICAL_LINEAGE_NODE_IDS) {
      expect(projectionMatchesNode(node(id), "lineage")).toBe(true);
    }

    for (const id of [
      "boundary-theory",
      "public-philosophy-satire",
      "identity",
      "governance-institutions",
    ]) {
      expect(projectionMatchesNode(node(id), "lineage")).toBe(false);
    }
  });
});

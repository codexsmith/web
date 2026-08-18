import { describe, expect, test } from "vitest";
import canonicalNodes from "../content/nodes.json";
import {
  atlasContextNodeId,
  atlasHierarchyBinding,
  atlasHierarchyBranches,
  atlasHierarchyBranchForNode,
  atlasTheoryRootId,
  validateAtlasHierarchyBinding,
  type AtlasHierarchyBinding,
} from "./atlas-hierarchy";

const canonicalIds = new Set(
  (canonicalNodes as Array<{ id: string }>).map((node) => node.id),
);

function cloneBinding(): AtlasHierarchyBinding {
  return structuredClone(atlasHierarchyBinding);
}

describe("Atlas hierarchy binding", () => {
  test("places Boundary Theory at the root and the laboratory in stewardship", () => {
    expect(atlasTheoryRootId).toBe("boundary-theory");
    expect(atlasContextNodeId).toBe("identity");
    expect(atlasHierarchyBranchForNode(atlasContextNodeId)?.id).toBe(
      "evidence-stewardship",
    );
  });

  test("gathers formal foundations and research lineages into named branches", () => {
    expect(atlasHierarchyBranches.map((branch) => branch.id)).toContain(
      "formal-foundations",
    );
    expect(atlasHierarchyBranches.map((branch) => branch.id)).toContain(
      "research-lineages",
    );
    expect(atlasHierarchyBranchForNode("distinction-space")?.id).toBe(
      "formal-foundations",
    );
    expect(atlasHierarchyBranchForNode("mathematics")?.id).toBe(
      "research-lineages",
    );
  });

  test("covers every canonical node exactly once outside the root", () => {
    const assignedNodeIds = atlasHierarchyBranches.flatMap(
      (branch) => branch.nodeIds,
    );
    expect(new Set(assignedNodeIds).size).toBe(assignedNodeIds.length);
    expect(new Set([atlasTheoryRootId, ...assignedNodeIds])).toEqual(
      canonicalIds,
    );
  });

  test("rejects unknown, duplicate, and unassigned canonical references", () => {
    const unknown = cloneBinding();
    unknown.projection.branches[0].nodeIds.push("unknown-node");
    expect(() => validateAtlasHierarchyBinding(unknown, canonicalIds)).toThrow(
      /unknown canonical node/i,
    );

    const duplicate = cloneBinding();
    duplicate.projection.branches[1].nodeIds.push(
      duplicate.projection.branches[0].nodeIds[0],
    );
    expect(() =>
      validateAtlasHierarchyBinding(duplicate, canonicalIds),
    ).toThrow(/duplicate branch membership/i);

    const missing = cloneBinding();
    missing.projection.branches[0].nodeIds.shift();
    expect(() => validateAtlasHierarchyBinding(missing, canonicalIds)).toThrow(
      /missing canonical nodes/i,
    );
  });
});

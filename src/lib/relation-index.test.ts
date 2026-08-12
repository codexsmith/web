import { describe, expect, test } from "vitest";
import graphNodesData from "../app/context/graphNodes.json";
import {
  atlasEvidenceWorkHref,
  conventionalRelationGroups,
  relationLensHref,
  relationProjectionCount,
  RELATION_PROJECTIONS,
  type RelationSourceNode,
} from "./relation-index";

const nodes = graphNodesData as RelationSourceNode[];

describe("conventional relation index", () => {
  test("exposes every generated atlas projection record", () => {
    const total = RELATION_PROJECTIONS.reduce(
      (count, projection) => count + relationProjectionCount(nodes, projection),
      0,
    );
    expect(total).toBe(879);
  });

  test("retains status, provenance, closure, and a conventional destination", () => {
    for (const projection of RELATION_PROJECTIONS) {
      for (const group of conventionalRelationGroups(nodes, projection)) {
        for (const record of group.records) {
          expect(record.id).toBeTruthy();
          expect(record.label).toBeTruthy();
          expect(record.status).toBeTruthy();
          expect(record.provenance).toBeTruthy();
          expect(record.closure).toBeTruthy();
          expect(record.recordHref).toMatch(/^\//);
        }
      }
    }
  });

  test("places the Work lens in the Atlas evidence view", () => {
    expect(relationProjectionCount(nodes, "work")).toBe(142);
    expect(atlasEvidenceWorkHref()).toBe(
      "/map/refined?filter=evidence&stage=evidence#work",
    );
    expect(relationLensHref("work", "evidence")).toBe("#work");
    expect(relationLensHref("governance", "evidence")).toBe(
      "/relations#governance",
    );
  });
});

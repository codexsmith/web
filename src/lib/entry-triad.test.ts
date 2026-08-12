import { describe, expect, test } from "vitest";
import canonicalNodes from "../content/nodes.json";
import {
  entryTriadBinding,
  entryTriadRoutes,
  validateEntryTriadBinding,
  type EntryTriadBinding,
} from "./entry-triad";

const canonicalIds = new Set(
  (canonicalNodes as Array<{ id: string }>).map((node) => node.id),
);

function cloneBinding(): EntryTriadBinding {
  return structuredClone(entryTriadBinding);
}

describe("entry triad binding", () => {
  test("binds people, problem, and repair to distinct internal journeys", () => {
    expect(entryTriadRoutes.map((route) => route.id)).toEqual([
      "people",
      "problem",
      "repair",
    ]);
    expect(entryTriadRoutes.map((route) => route.bridge)).toEqual([
      "who",
      "what",
      "how",
    ]);
    expect(new Set(entryTriadRoutes.map((route) => route.href)).size).toBe(3);
  });

  test("validates every canonical reference", () => {
    expect(() =>
      validateEntryTriadBinding(entryTriadBinding, canonicalIds),
    ).not.toThrow();
  });

  test("rejects an unknown node or external destination", () => {
    const unknownNode = cloneBinding();
    unknownNode.routes[0].canonicalNodeIds.push("unknown-node");
    expect(() => validateEntryTriadBinding(unknownNode, canonicalIds)).toThrow(
      /unknown canonical node/i,
    );

    const externalRoute = cloneBinding();
    externalRoute.routes[0].href = "https://example.com";
    expect(() =>
      validateEntryTriadBinding(externalRoute, canonicalIds),
    ).toThrow(/internal destination/i);
  });
});

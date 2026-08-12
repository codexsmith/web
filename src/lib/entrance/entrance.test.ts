import { describe, expect, test } from "vitest";
import {
  ENTRANCE_INVARIANT,
  ENTRANCE_ROUTES,
  getEntranceRoute,
  siblingEntrances,
} from "./registry";
import { resolveEntrancePath } from "./resolve";

describe("shared entrance registry", () => {
  test("declares three ordered sibling lenses over one corpus", () => {
    expect(ENTRANCE_ROUTES.map((route) => route.id)).toEqual([
      "people",
      "problem",
      "repair",
    ]);
    expect(ENTRANCE_ROUTES.map((route) => route.presentationOrder)).toEqual([
      0, 1, 2,
    ]);
    expect(new Set(ENTRANCE_ROUTES.map((route) => route.rootHref)).size).toBe(
      3,
    );
    expect(ENTRANCE_INVARIANT).toMatch(/same body of work/i);
  });

  test("resolves current deep URLs into shared milestones", () => {
    expect(resolveEntrancePath("/audience")?.milestone).toBe("orientation");
    expect(resolveEntrancePath("/audience/apply")?.milestone).toBe(
      "selection",
    );
    expect(
      resolveEntrancePath("/audience/apply/working-practitioner")?.milestone,
    ).toBe("route");
    expect(
      resolveEntrancePath(
        "/audience/apply/working-practitioner/software",
      )?.milestone,
    ).toBe("arrival");
    expect(resolveEntrancePath("/problem/software")?.milestone).toBe(
      "selection",
    );
    expect(
      resolveEntrancePath("/problem/software/interface")?.milestone,
    ).toBe("arrival");
    expect(resolveEntrancePath("/learn/boundary-first")?.milestone).toBe(
      "route",
    );
    expect(resolveEntrancePath("/learn/atlas-reveal")?.milestone).toBe(
      "arrival",
    );
  });

  test("always exposes the two other entrances", () => {
    expect(siblingEntrances("people").map((route) => route.id)).toEqual([
      "problem",
      "repair",
    ]);
    expect(getEntranceRoute("repair").rootHref).toBe("/learn");
  });
});

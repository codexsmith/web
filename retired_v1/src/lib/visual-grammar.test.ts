import { describe, expect, it } from "vitest";
import {
  VISUAL_GRAMMAR_PATH,
  validateVisualGrammar,
  visualGrammar,
  type VisualGrammar,
} from "./visual-grammar";

describe("original visual grammar", () => {
  it("publishes both diagrams at one stable route", () => {
    expect(visualGrammar.diagrams.map((diagram) => diagram.id)).toEqual([
      "class-to-consequence",
      "symbol-to-consequence",
    ]);
    expect(VISUAL_GRAMMAR_PATH).toBe("/language/visuals");
  });

  it("carries class through instance, state, operation, and consequence", () => {
    expect(visualGrammar.diagrams[0].path.map((node) => node.role)).toEqual([
      "class",
      "instance",
      "state",
      "operation",
      "consequence",
    ]);
  });

  it("returns a broken invariant through witnessed repair", () => {
    const feedback = visualGrammar.diagrams[0].feedback;
    expect(feedback.gateLabel).toMatch(/invariant/i);
    expect(feedback.contested.steps.join(" ")).toMatch(/witness/i);
    expect(feedback.contested.steps.join(" ")).toMatch(/responsibility/i);
    expect(feedback.contested.steps.join(" ")).toMatch(/repair/i);
    expect(feedback.returnToRole).toBe("state");
  });

  it("places interpreter and authority between symbol and action", () => {
    expect(visualGrammar.diagrams[1].path.map((node) => node.role)).toEqual([
      "symbol",
      "interpreter",
      "classification",
      "authority",
      "operation",
      "state-transition",
      "consequence",
    ]);
  });

  it("makes institutional consequence contestable and repairable", () => {
    const feedback = visualGrammar.diagrams[1].feedback;
    expect(feedback.gateLabel).toMatch(/contest/i);
    expect(feedback.contested.steps).toEqual([
      "Appeal",
      "Witness",
      "Responsibility",
      "Repair",
    ]);
  });

  it("keeps unidentified references internal-only and uncopied", () => {
    expect(visualGrammar.sourceImagePolicy).toMatchObject({
      bibliographicStatus: "unresolved",
      publicationStatus: "internal-only",
      copiedAssets: false,
      designOrigin: "project-native-abstract-structure",
    });
  });

  it("rejects a word-power path that bypasses authority", () => {
    const invalid = structuredClone(visualGrammar);
    invalid.diagrams[1].path = invalid.diagrams[1].path.filter(
      (node) => node.role !== "authority",
    );

    expect(() => validateVisualGrammar(invalid as VisualGrammar)).toThrow(
      /incomplete consequence path/i,
    );
  });
});

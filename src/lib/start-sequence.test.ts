import { describe, expect, test } from "vitest";
import canonicalNodeData from "../content/nodes.json";
import introConfig from "../content/introductory_experience_v0_5.json";
import {
  collectStartSceneReferenceIds,
  START_LAYOUT_PRESETS,
  START_VIRTUAL_NODES,
  type StartSceneStep,
  validateStartSequence,
} from "./start-sequence";

const steps = introConfig.experiences[0].steps as StartSceneStep[];
const canonicalIds = new Set(canonicalNodeData.map((node) => node.id));

describe("v2 Start sequence contract", () => {
  test("forms one complete, ordered, internally valid passage", () => {
    expect(() => validateStartSequence(steps, canonicalIds)).not.toThrow();
    expect(steps).toHaveLength(15);
    expect(steps[11]?.id).toBe("work-enters-relation");
    expect(steps.map((step) => step.order)).toEqual(
      Array.from({ length: steps.length }, (_, index) => index),
    );
  });

  test("has concise explanatory copy for every scene", () => {
    for (const step of steps) {
      expect(step.summary.trim().length).toBeGreaterThan(80);
    }
  });

  test("supports every declared visual preset without a silent fallback", () => {
    const declaredPresets = new Set(steps.map((step) => step.layoutPreset));
    expect(declaredPresets).toEqual(START_LAYOUT_PRESETS);
  });

  test("resolves every visual reference as canonical or explicitly conceptual", () => {
    for (const step of steps) {
      for (const referenceId of collectStartSceneReferenceIds(step)) {
        expect(
          canonicalIds.has(referenceId) ||
            Boolean(START_VIRTUAL_NODES[referenceId]),
          `${step.id} -> ${referenceId}`,
        ).toBe(true);
      }
    }
  });

  test("ends with one explicit Atlas destination", () => {
    const finalScene = steps.at(-1);
    expect(finalScene?.id).toBe("atlas-reveal");
    expect(finalScene?.action).toEqual({
      href: "/map?mode=atlas&view=domains",
      label: "Enter the full atlas",
    });
  });

  test("rejects incomplete or unknown scene contracts", () => {
    const malformed = structuredClone(steps);
    malformed[2].virtualNodes = ["unregistered-lineage"];
    expect(() => validateStartSequence(malformed, canonicalIds)).toThrow(
      /unknown node/i,
    );

    const missingCopy = structuredClone(steps);
    missingCopy[0].summary = "";
    expect(() => validateStartSequence(missingCopy, canonicalIds)).toThrow(
      /requires id, title, headline, and summary/i,
    );
  });
});

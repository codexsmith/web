import { describe, expect, test } from "vitest";
import {
  canonicalCyoaNodeIndex,
  cyoaBinding,
  cyoaConceptIndex,
  cyoaHref,
  cyoaOnramps,
  cyoaStaticParams,
  isCyoaPathValid,
  resolveCyoaRoutePath,
  resolveCyoaPath,
  validateCyoaBinding,
  validateCyoaCanonicalReferences,
} from "./cyoa";
import type { CyoaBinding } from "./cyoa";
import fixtures from "../content/fixtures/cyoa-binding.fixtures.json";

function cloneBinding(): CyoaBinding {
  return structuredClone(cyoaBinding);
}

describe("cyoa route model", () => {
  test("provides the six adaptive entrances required by the plan", () => {
    expect(cyoaOnramps).toHaveLength(6);
    expect(new Set(cyoaOnramps.map((item) => item.slug)).size).toBe(6);
  });

  test("gives every entrance complete, distinct choices", () => {
    for (const onramp of cyoaOnramps) {
      expect(onramp.choices.length).toBeGreaterThanOrEqual(2);
      expect(new Set(onramp.choices.map((item) => item.slug)).size).toBe(
        onramp.choices.length,
      );
      for (const choice of onramp.choices) {
        expect(choice.destination.href).toMatch(/^\//);
        expect(choice.concepts.length).toBeGreaterThanOrEqual(3);
        expect(choice.firewall.length).toBeGreaterThan(0);
        expect(choice.canonicalNodeIds).toContain(choice.destination.id);
        for (const concept of choice.concepts) {
          expect(cyoaConceptIndex[concept.id]).toBe(concept);
          expect(concept.canonicalNodeIds.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test("validates the governed binding and all canonical references", () => {
    expect(() => validateCyoaBinding(cyoaBinding)).not.toThrow();
    expect(() =>
      validateCyoaCanonicalReferences(
        cyoaBinding,
        new Set(Object.keys(canonicalCyoaNodeIndex)),
      ),
    ).not.toThrow();
  });

  test("rejects content that exceeds or omits its declared governance contract", () => {
    const unsupportedClaim = cloneBinding();
    (unsupportedClaim.bindingProtocol.claimCeiling as string) = "theorem";
    expect(() => validateCyoaBinding(unsupportedClaim)).toThrow(/claim ceiling/i);

    const missingFirewall = cloneBinding();
    missingFirewall.semantics.onramps[0].choices[0].metaphorFirewall = "";
    expect(() => validateCyoaBinding(missingFirewall)).toThrow(/metaphorFirewall/i);

    const unknownConcept = cloneBinding();
    unknownConcept.semantics.onramps[0].choices[0].conceptIds.push("not-canonical");
    expect(() => validateCyoaBinding(unknownConcept)).toThrow(/unknown concept/i);
  });

  test("rejects broken canonical destinations and unknown nodes", () => {
    const detachedDestination = cloneBinding();
    detachedDestination.semantics.onramps[0].choices[0].destinationNodeId = "bfe";
    expect(() => validateCyoaBinding(detachedDestination)).toThrow(/destination node/i);

    const unknownNode = cloneBinding();
    unknownNode.semantics.onramps[0].canonicalNodeIds.push("missing-node");
    expect(() =>
      validateCyoaCanonicalReferences(
        unknownNode,
        new Set(Object.keys(canonicalCyoaNodeIndex)),
      ),
    ).toThrow(/unknown canonical node/i);
  });

  test("declares renderer, workflow, accessibility, and fallback contracts", () => {
    expect(cyoaBinding.workflow.states.map((state) => state.id)).toEqual([
      "choose-world",
      "name-trouble",
      "cross-bridge",
    ]);
    expect(cyoaBinding.projection.components.destination).toBe(
      "canonical-node-link",
    );
    expect(cyoaBinding.interactions.fallbacks).toContain(
      "native-browser-history",
    );
    expect(cyoaBinding.validation.accessibilityConstraints).toContain(
      "native-link-keyboard-operation",
    );
  });

  test("resolves only choices belonging to the selected entrance", () => {
    expect(resolveCyoaPath(["software", "interface"]).choice?.slug).toBe(
      "interface",
    );
    expect(isCyoaPathValid(["software", "ruler"])).toBe(false);
    expect(isCyoaPathValid(["unknown"])).toBe(false);
    expect(isCyoaPathValid(["software", "interface", "extra"])).toBe(false);
  });

  test("creates a unique static route for every stage", () => {
    const paths = cyoaStaticParams().map((item) =>
      (item.path ?? []).join("/"),
    );
    expect(new Set(paths).size).toBe(paths.length);
    expect(cyoaHref("research", "ruler")).toBe(
      "/problem/research/ruler",
    );
  });

  test("separates the triad hub, problem projection, and legacy paths", () => {
    expect(resolveCyoaRoutePath([]).kind).toBe("hub");
    expect(resolveCyoaRoutePath(["problem"]).kind).toBe("problem");
    expect(
      resolveCyoaRoutePath(["problem", "engineering", "handoff"]),
    ).toMatchObject({
      kind: "problem",
      contentPath: ["engineering", "handoff"],
    });
    expect(resolveCyoaRoutePath(["engineering", "handoff"]).kind).toBe(
      "legacy-problem",
    );
    expect(resolveCyoaRoutePath(["problem", "unknown"]).kind).toBe(
      "invalid",
    );
  });

  test("resolves declared renderer fixtures and rejects invalid fixtures", () => {
    for (const fixture of fixtures.validRoutes) {
      const { onramp, choice } = resolveCyoaPath(fixture.path);
      expect(isCyoaPathValid(fixture.path)).toBe(true);
      expect(onramp?.id ?? null).toBe(fixture.expectedOnrampId);
      expect(choice?.id ?? null).toBe(fixture.expectedChoiceId);
      if (fixture.expectedConceptIds) {
        expect(choice?.concepts.map((concept) => concept.id)).toEqual(
          fixture.expectedConceptIds,
        );
      }
      if (fixture.expectedDestinationNodeId) {
        expect(choice?.destination.id).toBe(fixture.expectedDestinationNodeId);
      }
    }

    for (const path of fixtures.invalidRoutes) {
      expect(isCyoaPathValid(path)).toBe(false);
    }
  });
});

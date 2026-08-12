import { describe, expect, test } from "vitest";
import { audienceRouteConfig } from "./config";
import {
  audienceCompatibilityAliases,
  audienceDataset,
  canonicalNodeIndex,
  publicationRecommendations,
} from "./data";
import {
  audienceStaticParams,
  compatibleAudiences,
  compatibleDoorways,
  depthsForAudience,
  isSelectionCompatible,
  resolveSelection,
  routeHref,
} from "./resolve";
import {
  validateAudienceDataset,
  validateAudienceRelationshipReciprocity,
  validateCanonicalAudienceReferences,
} from "./schema";
import type { AudienceDataset } from "./types";

function cloneDataset(): AudienceDataset {
  return structuredClone(audienceDataset);
}

describe("audience dataset contract", () => {
  test("validates the normalized reference dataset", () => {
    expect(() => validateAudienceDataset(audienceDataset)).not.toThrow();
    expect(() =>
      validateAudienceRelationshipReciprocity(audienceDataset),
    ).not.toThrow();
  });

  test("resolves every displayed content reference to a canonical node", () => {
    expect(() =>
      validateCanonicalAudienceReferences(
        audienceDataset,
        new Set(Object.keys(canonicalNodeIndex)),
      ),
    ).not.toThrow();
  });

  test("bridges legacy identifiers without leaking them into route content", () => {
    const legacyIds = new Set(
      Object.keys(audienceCompatibilityAliases.canonicalIds),
    );
    const displayedIds = [
      ...audienceDataset.audiences.flatMap((audience) => [
        ...audience.recommendedNodeIds,
        ...audience.route.flatMap((step) =>
          step.nodeRefs.map((reference) => reference.id),
        ),
      ]),
      ...audienceDataset.doorways.flatMap(
        (doorway) => doorway.domainNodeIds,
      ),
    ];

    expect(displayedIds.some((id) => legacyIds.has(id))).toBe(false);
  });

  test("rejects reversed depth ranges", () => {
    const malformed = cloneDataset();
    malformed.audiences[0].depthRange = {
      entry: "extend",
      maximum: "recognize",
    };

    expect(() => validateAudienceDataset(malformed)).toThrow(
      /entry depth beyond its maximum/i,
    );
  });

  test("rejects one-sided audience and doorway relationships", () => {
    const malformed = cloneDataset();
    malformed.doorways[0].audienceIds = malformed.doorways[0].audienceIds
      .filter((id) => id !== "audience-curious");

    expect(() =>
      validateAudienceRelationshipReciprocity(malformed),
    ).toThrow(
      /does not reciprocate audience/i,
    );
  });
});

describe("audience route resolution", () => {
  test("filters audiences and doorways through compatible relationships", () => {
    const intent = audienceDataset.intents.find(
      (item) => item.slug === "evaluate",
    )!;
    const audiences = compatibleAudiences(audienceDataset, intent.id);
    expect(audiences.map((item) => item.slug)).toEqual([
      "formal-researcher",
      "critic-reviewer",
    ]);

    const critic = audiences.find(
      (item) => item.slug === "critic-reviewer",
    )!;
    expect(
      compatibleDoorways(audienceDataset, critic.id).map(
        (item) => item.slug,
      ),
    ).toEqual(["institutions", "formal"]);
  });

  test("clamps requested depth to the selected audience's declared range", () => {
    const selection = resolveSelection(
      audienceDataset,
      ["understand", "curious-recognizer", "software"],
      "evaluate",
      audienceRouteConfig,
    );

    expect(selection.depth).toBe("understand");
    expect(depthsForAudience(selection.audience!)).toEqual([
      "recognize",
      "understand",
    ]);
  });

  test("identifies incompatible intent and audience combinations", () => {
    const selection = resolveSelection(
      audienceDataset,
      ["understand", "working-practitioner"],
      "use",
      audienceRouteConfig,
    );

    expect(
      isSelectionCompatible(audienceDataset, selection, 2),
    ).toBe(false);
  });

  test("generates only complete, unique compatible static routes", () => {
    const params = audienceStaticParams(audienceDataset);
    const expectedCount =
      1 +
      audienceDataset.intents.length +
      audienceDataset.intents.reduce((intentTotal, intent) => {
        const audiences = compatibleAudiences(
          audienceDataset,
          intent.id,
        );
        return (
          intentTotal +
          audiences.length +
          audiences.reduce(
            (doorwayTotal, audience) =>
              doorwayTotal +
              compatibleDoorways(audienceDataset, audience.id).length,
            0,
          )
        );
      }, 0);
    const paths = params.map((item) => (item.path ?? []).join("/"));

    expect(params).toHaveLength(expectedCount);
    expect(new Set(paths).size).toBe(paths.length);
  });

  test("preserves route state in generated links", () => {
    expect(
      routeHref(
        audienceRouteConfig,
        ["apply", "builder-product-user", "software"],
        "build",
      ),
    ).toBe(
      "/audience/apply/builder-product-user/software?depth=build",
    );
  });
});

describe("publication route bridge", () => {
  test("gives every audience one valid publication passage", () => {
    for (const audience of audienceDataset.audiences) {
      const recommendation = publicationRecommendations[audience.id];
      expect(recommendation).toBeDefined();
      expect(recommendation.href).toBe(
        `/publications/civilizational-mechanics#step-${recommendation.cardId}`,
      );
    }
  });

  test("rewrites obsolete next actions to existing site destinations", () => {
    for (const audience of audienceDataset.audiences) {
      expect(audience.nextAction.href).toMatch(/^\//);
      expect(
        Object.keys(audienceCompatibilityAliases.nextActions),
      ).not.toContain(audience.nextAction.href);
    }
  });
});

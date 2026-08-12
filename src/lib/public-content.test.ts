import { describe, expect, test } from "vitest";
import manifest from "../content/public-projections/manifest.json";
import navigation from "../content/public-projections/navigation.json";
import home from "../content/public-projections/home.json";
import work from "../content/public-projections/work.json";
import atlas from "../content/public-projections/atlas.json";

function assertMaterializedRefs(value: unknown) {
  if (Array.isArray(value)) {
    value.forEach(assertMaterializedRefs);
    return;
  }
  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  for (const [key, item] of Object.entries(record)) {
    if (key.endsWith("Refs")) {
      const materialized = record[key.slice(0, -4)];
      expect(Array.isArray(materialized)).toBe(true);
      expect((materialized as unknown[]).length).toBe(
        Array.isArray(item) ? item.length : -1,
      );
    }
    assertMaterializedRefs(item);
  }
}

describe("public content projections", () => {
  test("retains one normalized source across every projection", () => {
    for (const projection of [navigation, home, work, atlas]) {
      expect(projection.source.sha256).toBe(manifest.source.sha256);
      expect(projection.source.schemaVersion).toBe("0.3.0");
    }
    expect(manifest.policy.changeType).toBe("expansion-and-refinement");
    expect(manifest.policy.reorganization).toBe(false);
  });

  test("materializes phrase references without discarding provenance", () => {
    assertMaterializedRefs(home.payload);
    assertMaterializedRefs(work.payload);
    assertMaterializedRefs(atlas.payload);
  });

  test("projects all work entities exactly once", () => {
    const groups = work.payload.groups;
    const ids = groups.flatMap((group) =>
      group.entities.map((entity) => entity.id),
    );
    expect(ids).toHaveLength(work.payload.entityCount);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("preserves the current Atlas beside the refined route", () => {
    expect(atlas.payload.versionPolicy.current).toBe("/map");
    expect(atlas.payload.versionPolicy.refined).toBe("/map/refined");
  });
});

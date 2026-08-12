import { describe, expect, test } from "vitest";
import projectIndex from "../content/project_index.json";
import adjudicationData from "../content/work_adjudication.json";
import collaborationRegistry from "../content/collaboration_instances.json";
import governanceBindings from "../content/governance_bindings.json";
import portfolioData from "../content/work_portfolio.json";

describe("work-layer migration contracts", () => {
  test("preserves all source portfolio records non-destructively", () => {
    expect(portfolioData.status).toMatch(/requires-human-adjudication/);
    expect(portfolioData.items).toHaveLength(24);
    for (const item of portfolioData.items) {
      expect(item.sourceId).toBeTruthy();
      expect(item.sourceData).toBeTruthy();
      expect(item.migrationStatus).toMatch(/canonical source retained/);
    }
  });

  test("exposes six provisional projects without inventing stewardship", () => {
    expect(projectIndex.status).toMatch(/review before canonical promotion/);
    expect(projectIndex.projects).toHaveLength(6);
    for (const project of projectIndex.projects) {
      expect(project.entityType).toBe("project");
      expect(project.objective).toBeTruthy();
      expect(project.projectPhase).toBeTruthy();
      expect(project.producesEntityRefs).toBeInstanceOf(Array);
      expect(project.steward).toBeNull();
    }
  });

  test("records one bounded adjudication for every migrated work item", () => {
    expect(adjudicationData.records).toHaveLength(24);
    expect(new Set(adjudicationData.records.map((record) => record.sourceId))).toEqual(
      new Set(portfolioData.items.map((item) => item.sourceId)),
    );
    for (const record of adjudicationData.records) {
      expect(record.decision).toBeTruthy();
      expect(record.entityType).toBeTruthy();
      expect(record.rationale).toBeTruthy();
    }
  });

  test("keeps governance bindings explicit and collaboration instances empty", () => {
    expect(governanceBindings.records).toHaveLength(4);
    for (const binding of governanceBindings.records) {
      expect(binding.sourcePaths.length).toBeGreaterThan(0);
      expect(binding.authorityBoundary).toBeTruthy();
      expect(binding.requiredClosure).toBeTruthy();
    }
    expect(collaborationRegistry.status).toBe(
      "no-public-operational-instances-recorded",
    );
    expect(collaborationRegistry.instances).toEqual([]);
  });
});

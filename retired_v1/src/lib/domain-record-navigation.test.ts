import { describe, expect, test } from "vitest";
import {
  buildDomainRecordNavigation,
  DOMAIN_RECORD_FIELD_DEFINITIONS,
  resolveDomainRecordNavigationId,
} from "./domain-record-navigation";

describe("domain record navigation", () => {
  test("orders reading sections before placement, claims, and evidence", () => {
    expect(
      buildDomainRecordNavigation({
        hasArchitectureStage: true,
        hasRelationships: true,
        hasTakeaways: true,
        recordFields: [
          { id: "claims", label: "Claims" },
          { id: "evidence-sources", label: "Evidence sources" },
        ],
      }).map((item) => item.id),
    ).toEqual([
      "overview",
      "takeaways",
      "relationships",
      "placement",
      "claims",
      "evidence-sources",
    ]);
  });

  test("omits unavailable optional sections without changing record order", () => {
    expect(
      buildDomainRecordNavigation({
        hasArchitectureStage: false,
        hasRelationships: false,
        hasTakeaways: false,
        recordFields: [
          { id: "claims", label: "Claims" },
          { id: "evidence-sources", label: "Evidence sources" },
          { id: "positions", label: "Positions" },
        ],
      }).map((item) => item.id),
    ).toEqual(["overview", "claims", "evidence-sources", "positions"]);
  });

  test("keeps evidence last when auxiliary record fields are present", () => {
    expect(DOMAIN_RECORD_FIELD_DEFINITIONS.map(({ id }) => id)).toEqual([
      "claims",
      "institution",
      "positions",
      "evidence-sources",
    ]);
  });

  test("maps nested facet anchors back to the overview navigation item", () => {
    expect(
      resolveDomainRecordNavigationId(
        "representation-instrument",
        ["representation-instrument", "facets", "overview"],
        ["overview", "takeaways", "relationships"],
      ),
    ).toBe("overview");
  });
});

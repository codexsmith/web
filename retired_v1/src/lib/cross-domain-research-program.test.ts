import { describe, expect, it } from "vitest";
import {
  CROSS_DOMAIN_RESEARCH_PROGRAM_PATH,
  crossDomainResearchProgram,
  validateCrossDomainResearchProgram,
  type CrossDomainResearchProgram,
} from "./cross-domain-research-program";

describe("cross-domain operational-homology research program", () => {
  it("declares the complete L0-L5 evidence ladder", () => {
    expect(
      crossDomainResearchProgram.mappingGrades.map((grade) => grade.level),
    ).toEqual(["L0", "L1", "L2", "L3", "L4", "L5"]);
  });

  it("binds a source-backed, multi-domain starter lexicon", () => {
    const domains = new Set(
      crossDomainResearchProgram.lexicon.map((entry) => entry.domain),
    );
    expect(crossDomainResearchProgram.lexicon.length).toBeGreaterThanOrEqual(10);
    expect(domains.size).toBeGreaterThanOrEqual(4);
    expect(
      crossDomainResearchProgram.sources.filter(
        (source) => source.kind === "external-primary",
      ).length,
    ).toBeGreaterThanOrEqual(4);
  });

  it("completes two bounded comparisons in three representations", () => {
    expect(crossDomainResearchProgram.caseStudies).toHaveLength(2);
    crossDomainResearchProgram.caseStudies.forEach((caseStudy) => {
      expect(caseStudy.status).toBe("bounded-comparative-reading-complete");
      expect(
        caseStudy.representations.map((representation) => representation.id),
      ).toEqual([
        "ordinary-process",
        "software-model",
        "boundary-first-model",
      ]);
    });
  });

  it("records both promoted and rejected mapping decisions", () => {
    expect(
      crossDomainResearchProgram.caseStudies.some((caseStudy) =>
        caseStudy.mappingDecision.decision.startsWith("promoted-"),
      ),
    ).toBe(true);
    expect(
      crossDomainResearchProgram.counterexamples.some(
        (counterexample) => counterexample.decision === "rejected",
      ),
    ).toBe(true);
    expect(crossDomainResearchProgram.counterexamples.length).toBeGreaterThanOrEqual(
      10,
    );
  });

  it("rejects operational-homology language below L4", () => {
    const invalid = structuredClone(crossDomainResearchProgram);
    invalid.caseStudies[1].mappingDecision.grade = "L3";

    expect(() =>
      validateCrossDomainResearchProgram(
        invalid as CrossDomainResearchProgram,
      ),
    ).toThrow(/L4 or higher/i);
  });

  it("uses one stable public program route", () => {
    expect(CROSS_DOMAIN_RESEARCH_PROGRAM_PATH).toBe(
      "/artifact/testing-cross-domain-operational-homology",
    );
  });
});

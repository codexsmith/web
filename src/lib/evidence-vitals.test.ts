import { describe, expect, it } from "vitest";
import {
  claimEvidenceVitals,
  corpusEvidenceVitals,
  evidenceSnapshot,
  researchEvidenceVitals,
} from "./evidence-vitals";
import { crossDomainResearchProgram } from "./cross-domain-research-program";

function valueFor(
  items: typeof corpusEvidenceVitals,
  id: string,
): string | number | undefined {
  return items.find((item) => item.id === id)?.value;
}

describe("evidence-vitals snapshot", () => {
  it("keeps source presence separate from operational verification", () => {
    expect(valueFor(corpusEvidenceVitals, "core-records")).toBe(651);
    expect(valueFor(corpusEvidenceVitals, "source-stated")).toBe(630);
    expect(valueFor(corpusEvidenceVitals, "operationally-verified")).toBe(0);
  });

  it("binds research figures to the governed research program", () => {
    expect(valueFor(researchEvidenceVitals, "bounded-cases")).toBe(
      crossDomainResearchProgram.caseStudies.length,
    );
    expect(valueFor(researchEvidenceVitals, "breakpoints")).toBe(
      crossDomainResearchProgram.counterexamples.length,
    );
    expect(valueFor(researchEvidenceVitals, "strongest-grade")).toBe("L4");
  });

  it("carries the decisive veracity figures into compact claim contexts", () => {
    expect(claimEvidenceVitals.map((item) => item.id)).toEqual([
      "source-stated",
      "operationally-verified",
      "bounded-cases",
      "breakpoints",
    ]);
    expect(
      claimEvidenceVitals.filter((item) => item.mobilePriority),
    ).toHaveLength(4);
  });

  it("preserves the snapshot date and corpus boundary", () => {
    expect(evidenceSnapshot.generated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(evidenceSnapshot.boundary).toMatch(/does not establish/i);
  });
});

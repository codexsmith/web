import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const instrumentedPublicIds = [
  "software-before-code",
  "closure-driven-software-development",
  "boundary-first-weather",
  "constitutional-law-and-jurisprudence",
  "boundary-first-chess",
  "boundary-first-soccer",
  "corpus-forge",
  "agency-representation-audit",
  "schemathematics",
] as const;

describe("contextual public page instruments", () => {
  it("keeps the operating bench mounted where the field guide invocation lives", () => {
    const railSource = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/product-landing/PublicLandingRail.tsx",
      ),
      "utf8",
    );

    expect(railSource).toContain("PublicPageInstrument");
    expect(railSource).toContain("<PublicPageInstrument currentId={currentId} />");
    expect(railSource).toContain("createPortal");
    expect(railSource).toContain("public-field-guide-slot");
  });

  it("registers a bounded interactive instrument for every current public projection except BFUX, which already has its own apparatus", () => {
    const source = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/product-landing/PublicPageInstrument.tsx",
      ),
      "utf8",
    );

    for (const id of instrumentedPublicIds) {
      expect(source, id).toContain(`case "${id}"`);
    }

    expect(source).not.toContain('case "boundary-first-ux"');
  });

  it("keeps the Law instrument downstream of the authored legal notice", () => {
    const lawSource = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/product-landing/LawLanding.tsx",
      ),
      "utf8",
    );

    const noticeIndex = lawSource.indexOf('id="legal-notice"');
    const railIndex = lawSource.indexOf(
      '<PublicLandingRail currentId="constitutional-law-and-jurisprudence" />',
    );

    expect(noticeIndex).toBeGreaterThan(-1);
    expect(railIndex).toBeGreaterThan(noticeIndex);
  });
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function source(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("progressive public journey contracts", () => {
  it("gives the homepage one intent console instead of repeated equal-weight route grids", () => {
    const home = source("src/components/entrance/InstitutionalVestibuleHome.tsx");

    expect(home).toContain("EntranceIntentConsole");
    expect(home).toContain("How the work deepens");
    expect(home).toContain("PublicLandingCarousel");
    expect(home).not.toContain("institutionalRoutes.map");
    expect(home).not.toContain("capabilityCards.map");
  });

  it("routes software visitors from a problem statement before exposing the public program directory", () => {
    const software = source("src/app/software/page.tsx");
    const routerIndex = software.indexOf("<SoftwareProblemRouter />");
    const directoryIndex = software.indexOf(
      '<ProductLandingDirectory group="software" variant="rail" />',
    );

    expect(routerIndex).toBeGreaterThan(-1);
    expect(directoryIndex).toBeGreaterThan(routerIndex);
    expect(software).toContain("<details");
    expect(software).toContain("Optional working vocabulary");
  });

  it("keeps the method stack active while making the glossary optional depth", () => {
    const methods = source("src/app/methods/page.tsx");

    expect(methods).toContain("<MethodStackNavigator />");
    expect(methods).toContain("Public glossary · optional depth");
    expect(methods).toContain("<details");
  });

  it("makes evidence an inspectable claim reader before the abstract standing ladder", () => {
    const evidence = source("src/app/evidence/page.tsx");
    const readerIndex = evidence.indexOf("<EvidenceClaimReader />");
    const ladderIndex = evidence.indexOf("Standing ladder");

    expect(readerIndex).toBeGreaterThan(-1);
    expect(ladderIndex).toBeGreaterThan(readerIndex);
  });

  it("teaches a research operating sequence before exposing public programs and formal depth", () => {
    const research = source("src/app/research/page.tsx");
    const journeyIndex = research.indexOf("<ResearchJourneyRail />");
    const directoryIndex = research.indexOf(
      '<ProductLandingDirectory group="research" variant="rail" />',
    );
    const theoryIndex = research.indexOf("Formal core · optional depth");

    expect(journeyIndex).toBeGreaterThan(-1);
    expect(directoryIndex).toBeGreaterThan(journeyIndex);
    expect(theoryIndex).toBeGreaterThan(directoryIndex);
  });

  it("keeps the Work overview editorial while routing exhaustive discovery into the Work Index", () => {
    const work = source("src/app/work/page.tsx");
    const workIndex = source("src/app/work/index/page.tsx");

    expect(work).toContain("Current proof surfaces");
    expect(work).toContain("Full inventory · separate surface");
    expect(work).toContain('href="/work/index"');
    expect(work).not.toContain("projectIndex.projects");
    expect(work).not.toContain("portfolioData.items");
    expect(workIndex).toContain("workRecords.filter");
    expect(workIndex).toContain("Portfolio inventory");
  });

  it("uses rail directories on canonical journeys but preserves the dense Work Index inventory", () => {
    const directory = source(
      "src/components/product-landing/ProductLandingDirectory.tsx",
    );
    const workIndex = source("src/app/work/index/page.tsx");

    expect(directory).toContain('variant?: "grid" | "rail"');
    expect(directory).toContain('variant === "rail"');
    expect(workIndex).toContain('<ProductLandingDirectory group="work" />');
  });
});

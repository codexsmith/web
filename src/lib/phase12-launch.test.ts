import { describe, expect, it } from "vitest";
import {
  phase12Launch,
  validatePhase12Launch,
  type Phase12Launch,
} from "./phase12-launch";

describe("Phase 12 launch binding", () => {
  it("uses one concise public-interest laboratory identity", () => {
    expect(phase12Launch.identity.fullStatement).toContain(
      "independent public-interest research and engineering laboratory",
    );
    expect(
      [
        phase12Launch.identity.fullStatement,
        phase12Launch.identity.heroLead,
        phase12Launch.identity.compactStatement,
      ].join(" "),
    ).not.toMatch(/\binstitute\b/i);
    expect(phase12Launch.identity.domains).toEqual([
      "Software",
      "AI",
      "Mathematics",
      "Scientific computation",
      "Institutional systems",
    ]);
  });

  it("publishes the two approved portfolio maturity decisions", () => {
    expect(phase12Launch.systemsAudit.status).toBe("Available on request");
    expect(phase12Launch.systemsAudit.availabilityNote).toMatch(
      /rather than sold as a static, off-the-shelf report/i,
    );
    expect(phase12Launch.boundaryFirstChess.status).toBe(
      "Available / Launching",
    );
    expect(phase12Launch.boundaryFirstChess.currentForms).not.toHaveLength(0);
    expect(phase12Launch.boundaryFirstChess.launchingForms).not.toHaveLength(0);
    expect(phase12Launch.boundaryFirstChess.futureBoundary).toMatch(
      /distinct future product track/i,
    );
  });

  it("rejects the retired Institute self-description", () => {
    const legacyIdentity = structuredClone(phase12Launch) as Phase12Launch;
    legacyIdentity.identity.heroLead =
      "Boundary First Labs is building a public-interest research institute.";

    expect(() => validatePhase12Launch(legacyIdentity)).toThrow(
      /Laboratory terminology/i,
    );
  });

  it("rejects accidental promotion of supporting work", () => {
    const promoted = structuredClone(phase12Launch) as Phase12Launch;
    promoted.featuredWork[0].status = "Available";

    expect(() => validatePhase12Launch(promoted)).toThrow(
      /promoted beyond its recorded maturity/i,
    );
  });
});

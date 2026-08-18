import { describe, expect, it } from "vitest";
import {
  validateWorldClassLanguage,
  WORLD_CLASS_MANIFESTO_PATH,
  worldClassLanguage,
  type WorldClassLanguage,
} from "./world-class-language";

describe("world-class public language", () => {
  it("keeps the recommended language visibly pending founder review", () => {
    expect(worldClassLanguage.promotionStatus).toBe(
      "recommended-default-pending-founder-review",
    );
    expect(worldClassLanguage.publicTriad).toHaveLength(3);
    expect(worldClassLanguage.firewalls).toContain(
      "Class without caste. Distinction without domination.",
    );
  });

  it("routes the public statement to one stable manifesto artifact", () => {
    expect(WORLD_CLASS_MANIFESTO_PATH).toBe(
      "/artifact/world-class-is-a-capacity-we-give",
    );
  });

  it("rejects accidental promotion before review", () => {
    const promoted = {
      ...worldClassLanguage,
      promotionStatus: "canonical",
    } as unknown as WorldClassLanguage;

    expect(() => validateWorldClassLanguage(promoted)).toThrow(
      /pending review/i,
    );
  });
});

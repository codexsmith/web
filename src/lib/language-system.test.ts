import { describe, expect, it } from "vitest";
import {
  LANGUAGE_REGISTRY_PATH,
  languageSystem,
  validateLanguageSystem,
  type LanguageSystem,
} from "./language-system";
import { worldClassLanguage } from "./world-class-language";

describe("governed reusable language system", () => {
  it("tracks every phrase currently bound to the website", () => {
    const phraseText = languageSystem.phrases.map((phrase) => phrase.phrase);
    expect(phraseText).toEqual(
      expect.arrayContaining([
        worldClassLanguage.headline,
        ...worldClassLanguage.publicTriad,
      ]),
    );
    expect(languageSystem.canonicalMeaning).toBe(
      worldClassLanguage.publicTriad[0],
    );
  });

  it("separates public, research, restricted, and safeguard uses", () => {
    expect(new Set(languageSystem.phrases.map((phrase) => phrase.useClass))).toEqual(
      new Set(["public", "research", "restricted", "safeguard"]),
    );
    languageSystem.phrases
      .filter((phrase) => phrase.useClass === "research")
      .forEach((phrase) => {
        expect(phrase.registerId).toBe("formal-research");
        expect(phrase.reviewGates).toContain("GATE-B");
      });
  });

  it("keeps provenance and a replacement path on every phrase", () => {
    languageSystem.phrases.forEach((phrase) => {
      expect(phrase.sourceIds.length).toBeGreaterThan(0);
      expect(phrase.replacement.trigger.length).toBeGreaterThan(0);
      expect(phrase.explainerRoute.startsWith("/")).toBe(true);
    });
    expect(languageSystem.replacementPolicy.appendOnly).toBe(true);
    expect(languageSystem.replacementPolicy.preserveSourceWording).toBe(true);
  });

  it("keeps playful copy out of claim, abstract, and safety contexts", () => {
    languageSystem.phrases
      .filter((phrase) => phrase.registerId === "playful")
      .forEach((phrase) => {
        expect(phrase.restrictedContexts).toEqual(
          expect.arrayContaining([
            "Claim boxes",
            "Academic abstracts",
            "Safety statements",
          ]),
        );
      });
  });

  it("adopts all editorial and promotion gates", () => {
    expect(languageSystem.reviewGates.map((gate) => gate.id)).toEqual([
      "GATE-A",
      "GATE-B",
      "GATE-C",
    ]);
    expect(languageSystem.editorialChecklist).toHaveLength(8);
    expect(languageSystem.lifecycle.map((stage) => stage.id)).toEqual(
      expect.arrayContaining(["approved-canonical", "retired"]),
    );
  });

  it("rejects a research phrase that bypasses research review", () => {
    const invalid = structuredClone(languageSystem);
    const researchPhrase = invalid.phrases.find(
      (phrase) => phrase.useClass === "research",
    );
    if (!researchPhrase) throw new Error("Research fixture missing.");
    researchPhrase.reviewGates = researchPhrase.reviewGates.filter(
      (gate) => gate !== "GATE-B",
    );

    expect(() => validateLanguageSystem(invalid as LanguageSystem)).toThrow(
      /requires the formal register and Gate B/i,
    );
  });

  it("publishes the registry at one stable route", () => {
    expect(LANGUAGE_REGISTRY_PATH).toBe("/language");
  });
});

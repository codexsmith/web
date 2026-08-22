import { describe, expect, it } from "vitest";
import {
  CIVILIZATIONAL_MECHANICS_PATH,
  publicationMechanicsHref,
} from "./publication-navigation";

describe("publicationMechanicsHref", () => {
  it("creates a directly linkable mechanic state", () => {
    expect(
      publicationMechanicsHref("", {
        mechanic: "repair-router",
      }),
    ).toBe(
      `${CIVILIZATIONAL_MECHANICS_PATH}?mechanic=repair-router#interactive-mechanics`,
    );
  });

  it("preserves lens state while changing the mechanic", () => {
    expect(
      publicationMechanicsHref("?lens=knowledge-provenance", {
        mechanic: "root-lenses",
      }),
    ).toBe(
      `${CIVILIZATIONAL_MECHANICS_PATH}?lens=knowledge-provenance&mechanic=root-lenses#interactive-mechanics`,
    );
  });

  it("removes an obsolete route when the root lens changes", () => {
    expect(
      publicationMechanicsHref(
        "mechanic=repair-router&lens=knowledge-provenance&route=provenance-witness",
        {
          lens: "construction-stewardship",
          route: null,
        },
      ),
    ).toBe(
      `${CIVILIZATIONAL_MECHANICS_PATH}?mechanic=repair-router&lens=construction-stewardship#interactive-mechanics`,
    );
  });

  it("returns the clean publication anchor when state is cleared", () => {
    expect(
      publicationMechanicsHref("mechanic=boundary-accounting", {
        mechanic: null,
      }),
    ).toBe(`${CIVILIZATIONAL_MECHANICS_PATH}#interactive-mechanics`);
  });
});

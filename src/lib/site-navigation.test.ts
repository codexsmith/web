import { describe, expect, test } from "vitest";
import {
  ATLAS_HREF,
  ATLAS_EVIDENCE_HREF,
  ATLAS_LIST_HREF,
  DOMAINS_HREF,
  RELATIONS_HREF,
  START_HREF,
  IMMERSIVE_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  atlasListHref,
  destinationPath,
  domainHref,
  domainMapHref,
  domainsReturnHref,
  domainsStageHref,
  isNavigationItemActive,
  resolveArchitectureReturnHref,
  resolveDomainsReturnHref,
} from "./site-navigation";

describe("site navigation contract", () => {
  test("keeps the primary navigation small and routes advanced exploration through Explore", () => {
    expect(
      PRIMARY_NAV_ITEMS.find((item) => item.label === "Explore")?.href,
    ).toBe(DOMAINS_HREF);
    expect(PRIMARY_NAV_ITEMS).toHaveLength(5);
    expect(
      PRIMARY_NAV_ITEMS.find((item) => item.label === "Start")?.href,
    ).toBe(START_HREF);
    expect(START_HREF).toBe("/audience");
    expect(PRIMARY_NAV_ITEMS.some((item) => item.href === ATLAS_HREF)).toBe(
      false,
    );
    expect(ATLAS_HREF).toBe("/map?mode=atlas&view=domains");
    expect(ATLAS_LIST_HREF).toBe("/map/refined");
    expect(RELATIONS_HREF).toBe(
      "/map?mode=halo&node=boundary-theory&view=domains",
    );
  });

  test("derives immersive navigation from the canonical configuration", () => {
    for (const item of IMMERSIVE_NAV_ITEMS) {
      expect(PRIMARY_NAV_ITEMS).toContainEqual(item);
    }
    expect(IMMERSIVE_NAV_ITEMS.some((item) => item.label === "Work")).toBe(
      true,
    );
  });

  test("matches active navigation by destination and grouped routes", () => {
    expect(destinationPath(ATLAS_HREF)).toBe("/map");
    expect(isNavigationItemActive("/map", ATLAS_HREF)).toBe(true);
    expect(isNavigationItemActive("/domains", ATLAS_HREF)).toBe(false);
    expect(isNavigationItemActive("/map", DOMAINS_HREF)).toBe(true);
    expect(isNavigationItemActive("/publications", "/learn")).toBe(true);
    expect(isNavigationItemActive("/language", "/learn")).toBe(true);
    expect(isNavigationItemActive("/audience", START_HREF)).toBe(true);
    expect(isNavigationItemActive("/problem", START_HREF)).toBe(true);
    expect(isNavigationItemActive("/audience", "/learn")).toBe(false);
    expect(isNavigationItemActive("/collaborate", "/work")).toBe(true);
    expect(isNavigationItemActive("/help", "/work")).toBe(true);
    expect(isNavigationItemActive("/methods", "/work")).toBe(true);
    expect(isNavigationItemActive("/mission", "/about")).toBe(true);
    expect(isNavigationItemActive(ATLAS_EVIDENCE_HREF, "/about")).toBe(true);
  });

  test("builds deterministic focus and architecture round-trip links", () => {
    expect(domainMapHref("boundary theory")).toBe(
      "/map?mode=focus&node=boundary+theory&view=domains",
    );
    expect(domainsStageHref("foundations", "boundary theory")).toBe(
      "/domains?stage=foundations&node=boundary+theory#domain-boundary%20theory",
    );
    expect(atlasListHref("boundary theory", "foundations")).toBe(
      "/map/refined?stage=foundations&node=boundary+theory",
    );
  });

  test("preserves architecture filters through a content-page round trip", () => {
    const returnTo = domainsReturnHref(
      "stage=processes&q=boundary&filter=foundations",
      "foundations",
      "boundary-theory",
    );

    expect(returnTo).toBe(
      "/domains?stage=processes&q=boundary&filter=foundations&stage=foundations&node=boundary-theory#domain-boundary-theory",
    );
    expect(domainHref("boundary-theory", returnTo)).toContain(
      "returnTo=%2Fdomains%3Fstage%3Dprocesses",
    );
    expect(
      resolveDomainsReturnHref(returnTo, "foundations", "boundary-theory"),
    ).toBe(returnTo);
  });

  test("rejects external architecture return destinations", () => {
    expect(
      resolveDomainsReturnHref(
        "https://example.com/domains?q=private",
        "foundations",
        "boundary-theory",
      ),
    ).toBe(
      "/domains?stage=foundations&node=boundary-theory#domain-boundary-theory",
    );
  });

  test("preserves the Atlas list-view return path", () => {
    expect(
      resolveArchitectureReturnHref(
        "/map/refined?filter=foundations&stage=foundations",
        "foundations",
        "boundary-theory",
      ),
    ).toBe(
      "/map/refined?filter=foundations&stage=foundations&node=boundary-theory#domain-boundary-theory",
    );
  });
});

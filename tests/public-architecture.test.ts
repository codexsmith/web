import { describe, expect, it } from "vitest";
import {
  PRIMARY_NAV_ITEMS,
  START_HREF,
  destinationPath,
  isNavigationItemActive,
} from "../src/lib/site-navigation";
import {
  getHeldProductLandingEntries,
  getProductLandingSitemapPaths,
  getPublicProductLandingEntries,
  getUnlistedProductLandingEntries,
  productLandingManifest,
  resolveProductLandingRoute,
  validateProductLandingManifest,
} from "../src/lib/product-landing-routing";
import fs from "node:fs";
import path from "node:path";

describe("public architecture navigation contracts", () => {
  it("keeps Software as the preferred start route and preserves the five-item shell", () => {
    expect(START_HREF).toBe("/software");
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Software",
      "Work",
      "Research",
      "Laboratory",
      "Collaborate",
    ]);
  });

  it("keeps experimental and evidence surfaces oriented inside Research", () => {
    for (const pathname of [
      "/research",
      "/evidence",
      "/theory",
      "/domains",
      "/sandbox",
      "/sandbox/representation-lab",
      "/sandbox/interaction-research",
    ]) {
      expect(isNavigationItemActive(pathname, "/research"), pathname).toBe(true);
    }

    expect(isNavigationItemActive("/outreach", "/research")).toBe(false);
  });

  it("keeps outreach and inquiry oriented inside Collaborate", () => {
    for (const pathname of ["/collaborate", "/outreach", "/inquire"]) {
      expect(isNavigationItemActive(pathname, "/collaborate"), pathname).toBe(true);
    }

    expect(isNavigationItemActive("/sandbox", "/collaborate")).toBe(false);
  });

  it("preserves the supporting section groupings used by progressive disclosure", () => {
    expect(isNavigationItemActive("/methods", "/software")).toBe(true);
    expect(isNavigationItemActive("/learn", "/software")).toBe(true);
    expect(isNavigationItemActive("/learn/boundary-first", "/software")).toBe(true);
    expect(isNavigationItemActive("/learn/distinction-space", "/software")).toBe(true);
    expect(isNavigationItemActive("/work/index", "/work")).toBe(true);
    expect(isNavigationItemActive("/publications", "/work")).toBe(true);
    expect(isNavigationItemActive("/trust/architecture", "/about")).toBe(true);
    expect(isNavigationItemActive("/accessibility", "/about")).toBe(true);
  });

  it("keeps the homepage depth map connected to guided learning scenes", () => {
    const home = fs.readFileSync(
      path.join(process.cwd(), "src/components/entrance/InstitutionalVestibuleHome.tsx"),
      "utf8",
    );
    expect(home).toContain('href: "/learn/boundary-first"');
    expect(home).toContain('entrance: "guided method"');
    expect(home).toContain('href: "/learn/distinction-space"');
    expect(home).toContain('entrance: "Distinction Space"');
    expect(home).toContain("Learn carries you between depths.");
  });

  it("normalizes query and hash destinations before active-route comparison", () => {
    expect(destinationPath("/map?mode=atlas&view=domains#node")).toBe("/map");
    expect(destinationPath("/software#practice")).toBe("/software");
  });
});

describe("product landing routing and visibility contracts", () => {
  it("keeps the landing manifest internally coherent", () => {
    expect(validateProductLandingManifest()).toEqual([]);
    expect(productLandingManifest.routingPolicy.rulesImplemented).toBe(true);
  });

  it("admits public candidates as indexable routes", () => {
    const decision = resolveProductLandingRoute("weather");
    expect(decision?.routeKind).toBe("public");
    expect(decision?.policy).toMatchObject({
      routeEligible: true,
      directLinkOnly: false,
      indexable: true,
      sitemapEligible: true,
      navigationEligible: true,
      robots: { index: true, follow: true },
    });
  });

  it("keeps collaboration bridges direct-link-only and non-indexable", () => {
    const decision = resolveProductLandingRoute("/bridge/ground-news?from=test#pilot");
    expect(decision?.routeKind).toBe("unlisted");
    expect(decision?.policy).toMatchObject({
      routeEligible: true,
      directLinkOnly: true,
      indexable: false,
      sitemapEligible: false,
      navigationEligible: false,
      robots: { index: false, follow: false },
    });
    expect(decision?.relationshipNotice).toContain("No affiliation");
  });

  it("blocks private and hold records from the public router", () => {
    const decision = resolveProductLandingRoute("learning-navigator");
    expect(decision?.routeKind).toBe("blocked");
    expect(decision?.policy.routeEligible).toBe(false);
    expect(decision?.policy.indexable).toBe(false);
  });

  it("preserves the three visibility populations", () => {
    expect(getPublicProductLandingEntries().every((entry) => entry.visibility === "public")).toBe(true);
    expect(getUnlistedProductLandingEntries().every((entry) => entry.visibility === "unlisted")).toBe(true);
    expect(getHeldProductLandingEntries().every((entry) => entry.visibility === "private")).toBe(true);
  });

  it("does not emit landing sitemap URLs before renderer route activation", () => {
    expect(productLandingManifest.routingPolicy.routesImplemented).toBe(false);
    expect(getProductLandingSitemapPaths()).toEqual([]);
  });
});

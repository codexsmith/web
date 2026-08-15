import { describe, expect, it } from "vitest";
import {
  PRIMARY_NAV_ITEMS,
  START_HREF,
  destinationPath,
  isNavigationItemActive,
} from "../src/lib/site-navigation";
import {
  PRODUCT_LANDING_NAVIGATION,
  getProductLandingNavigationForGroup,
} from "../src/lib/product-landing-navigation";
import { getPublicLandingCarouselItems } from "../src/lib/product-landing-carousel";
import {
  getHeldProductLandingEntries,
  getProductLandingSitemapPaths,
  getPublicProductLandingEntries,
  getRouteEligibleProductLandingEntries,
  getUnlistedProductLandingEntries,
  productLandingManifest,
  resolveProductLandingRoute,
  validateProductLandingManifest,
} from "../src/lib/product-landing-routing";
import { validateProductLandingContentRegistry } from "../src/lib/product-landing-content";
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

  it("orients public landing routes to Software, Work, or Research without exposing bridges", () => {
    expect(PRODUCT_LANDING_NAVIGATION).toHaveLength(10);
    expect(getProductLandingNavigationForGroup("software")).toHaveLength(3);
    expect(getProductLandingNavigationForGroup("research")).toHaveLength(3);
    expect(getProductLandingNavigationForGroup("work")).toHaveLength(4);
    expect(PRODUCT_LANDING_NAVIGATION.some((item) => item.href.startsWith("/bridge/"))).toBe(false);

    for (const item of PRODUCT_LANDING_NAVIGATION) {
      expect(isNavigationItemActive(item.href, `/${item.group}`), item.href).toBe(true);
    }
  });

  it("builds the reusable carousel from exactly the public landing boundary", () => {
    const items = getPublicLandingCarouselItems();
    expect(items).toHaveLength(10);
    expect(items.map((item) => item.href)).toEqual(
      PRODUCT_LANDING_NAVIGATION.map((item) => item.href),
    );
    expect(items.every((item) => !item.href.startsWith("/bridge/"))).toBe(true);
    expect(items.every((item) => item.total === 10)).toBe(true);
    expect(items.map((item) => item.ordinal)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("places the public landing carousel on the homepage before What we work on and hides Selected work", () => {
    const component = path.join(
      process.cwd(),
      "src/components/product-landing/PublicLandingCarousel.tsx",
    );
    expect(fs.existsSync(component)).toBe(true);

    const home = fs.readFileSync(
      path.join(process.cwd(), "src/components/entrance/InstitutionalVestibuleHome.tsx"),
      "utf8",
    );
    const choosePathIndex = home.indexOf("Choose a path.");
    const carouselIndex = home.indexOf("<PublicLandingCarousel");
    const whatWeWorkOnIndex = home.indexOf("What we work on.");

    expect(choosePathIndex).toBeGreaterThan(-1);
    expect(carouselIndex).toBeGreaterThan(choosePathIndex);
    expect(whatWeWorkOnIndex).toBeGreaterThan(carouselIndex);
    expect(home).not.toContain("Selected work.");
    expect(home).not.toContain("featuredPublicWork");

    for (const file of [
      "src/app/software/page.tsx",
      "src/app/research/page.tsx",
      "src/app/work/index/page.tsx",
    ]) {
      const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source, file).not.toContain("PublicLandingCarousel");
    }
  });

  it("mounts the public landing directory in the three parent discovery surfaces", () => {
    const surfaces = [
      ["src/app/software/page.tsx", 'group="software"'],
      ["src/app/research/page.tsx", 'group="research"'],
      ["src/app/work/index/page.tsx", 'group="work"'],
    ] as const;

    for (const [file, marker] of surfaces) {
      const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source, file).toContain("ProductLandingDirectory");
      expect(source, file).toContain(marker);
    }
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

describe("product landing routing, rendering, and visibility contracts", () => {
  it("keeps the landing manifest and route content registry coherent", () => {
    expect(validateProductLandingManifest()).toEqual([]);
    expect(validateProductLandingContentRegistry()).toEqual([]);
    expect(productLandingManifest.routingPolicy.rulesImplemented).toBe(true);
    expect(productLandingManifest.routingPolicy.routesImplemented).toBe(true);
    expect(productLandingManifest.routingPolicy.rendererImplemented).toBe(true);
  });

  it("has one physical catch-all route for manifest-backed landing pages", () => {
    const route = path.join(process.cwd(), "src/app/[...landing]/page.tsx");
    const renderer = path.join(
      process.cwd(),
      "src/components/product-landing/ProductLandingRenderer.tsx",
    );
    expect(fs.existsSync(route)).toBe(true);
    expect(fs.existsSync(renderer)).toBe(true);
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

  it("preserves the visibility populations and route inventory", () => {
    expect(getPublicProductLandingEntries().every((entry) => entry.visibility === "public")).toBe(true);
    expect(getUnlistedProductLandingEntries().every((entry) => entry.visibility === "unlisted")).toBe(true);
    expect(getHeldProductLandingEntries().every((entry) => entry.visibility === "private")).toBe(true);
    expect(getRouteEligibleProductLandingEntries()).toHaveLength(20);
    expect(getHeldProductLandingEntries()).toHaveLength(9);
  });

  it("emits only public landing pages into the sitemap after activation", () => {
    const sitemapPaths = getProductLandingSitemapPaths();
    expect(sitemapPaths).toHaveLength(10);
    expect(sitemapPaths).toContain("/weather");
    expect(sitemapPaths).toContain("/schemathematics");
    expect(sitemapPaths.some((pathname) => pathname.startsWith("/bridge/"))).toBe(false);
    expect(sitemapPaths).not.toContain("/learning-navigator");
  });
});
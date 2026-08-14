import { describe, expect, it } from "vitest";
import {
  PRIMARY_NAV_ITEMS,
  START_HREF,
  destinationPath,
  isNavigationItemActive,
} from "../src/lib/site-navigation";
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

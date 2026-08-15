import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getProductLandingContent,
  type ProductLandingContent,
} from "../src/lib/product-landing-content";
import { getPublicProductLandingEntries } from "../src/lib/product-landing-routing";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function sectionAnchor(key: string): string {
  return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function collectDeclaredAnchors(content: ProductLandingContent): Set<string> {
  const anchors = new Set<string>();

  for (const key of Object.keys(content)) {
    anchors.add(sectionAnchor(key));
  }

  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const record = asRecord(value);
    if (!record) return;

    if (typeof record.id === "string" && record.id.trim()) {
      anchors.add(record.id);
    }

    Object.values(record).forEach(visit);
  };

  visit(content);
  return anchors;
}

function assertCta(
  pageId: string,
  ctaName: string,
  value: unknown,
  anchors: Set<string>,
) {
  const cta = asRecord(value);
  expect(cta, `${pageId}: ${ctaName} must be an object`).not.toBeNull();
  if (!cta) return;

  expect(typeof cta.label, `${pageId}: ${ctaName} needs a label`).toBe(
    "string",
  );

  const href = typeof cta.href === "string" ? cta.href : null;
  const target = typeof cta.target === "string" ? cta.target : null;
  expect(
    Boolean(href || target),
    `${pageId}: ${ctaName} needs href or target`,
  ).toBe(true);

  if (href) {
    expect(
      href.startsWith("/"),
      `${pageId}: ${ctaName} href must remain an internal public path`,
    ).toBe(true);
  }

  if (target) {
    expect(
      anchors.has(target),
      `${pageId}: ${ctaName} target #${target} must resolve to a governed content anchor`,
    ).toBe(true);
  }
}

const customProjections = {
  "agency-representation-audit": "AgencyAuditLanding.tsx",
  "boundary-first-ux": "BoundaryFirstUxLanding.tsx",
  "boundary-first-chess": "ChessLanding.tsx",
  "boundary-first-soccer": "SoccerLanding.tsx",
  "boundary-first-weather": "WeatherLanding.tsx",
  "closure-driven-software-development": "ClosureDrivenLanding.tsx",
  "constitutional-law-and-jurisprudence": "LawLanding.tsx",
  "corpus-forge": "CorpusForgeLanding.tsx",
  schemathematics: "SchemathematicsLanding.tsx",
  "software-before-code": "SoftwareBeforeCodeLanding.tsx",
} as const;

describe("product landing governed-content contracts", () => {
  it("keeps public content identity, route, visibility, and maturity aligned with the manifest", () => {
    for (const entry of getPublicProductLandingEntries()) {
      const content = getProductLandingContent(entry);
      expect(content, entry.id).toBeDefined();
      if (!content) continue;

      expect(content.id, `${entry.id}: content id`).toBe(entry.id);
      expect(content.slug, `${entry.id}: content slug`).toBe(entry.slug);
      expect(content.visibility, `${entry.id}: visibility`).toBe("public");
      expect(content.status, `${entry.id}: maturity`).toBe(entry.status);
    }
  });

  it("requires every public hero CTA to resolve to a real internal path or governed anchor", () => {
    for (const entry of getPublicProductLandingEntries()) {
      const content = getProductLandingContent(entry);
      expect(content, entry.id).toBeDefined();
      if (!content) continue;

      const hero = asRecord(content.hero);
      expect(hero, `${entry.id}: public hero`).not.toBeNull();
      if (!hero) continue;

      const anchors = collectDeclaredAnchors(content);
      const heroCtas = [hero.primaryCta, hero.secondaryCta].filter(Boolean);
      const fallbackCta = content.cta;

      expect(
        heroCtas.length > 0 || Boolean(fallbackCta),
        `${entry.id}: public page needs a usable CTA`,
      ).toBe(true);

      heroCtas.forEach((cta, index) =>
        assertCta(entry.id, `hero CTA ${index + 1}`, cta, anchors),
      );

      if (fallbackCta) {
        assertCta(entry.id, "fallback CTA", fallbackCta, anchors);
      }
    }
  });
});

describe("product landing projection contracts", () => {
  it("routes every current public landing through an explicit authored projection", () => {
    const routeSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[...landing]/page.tsx"),
      "utf8",
    );

    for (const id of Object.keys(customProjections)) {
      expect(routeSource, id).toContain(`decision.entry.id === "${id}"`);
    }
  });

  it("keeps every authored public projection connected to the shared public field guide", () => {
    for (const [id, file] of Object.entries(customProjections)) {
      const source = fs.readFileSync(
        path.join(process.cwd(), "src/components/product-landing", file),
        "utf8",
      );

      expect(source, file).toContain("PublicLandingRail");
      expect(source, file).toContain(`currentId="${id}"`);
    }
  });

  it("keeps public maturity visible on every authored projection", () => {
    for (const [id, file] of Object.entries(customProjections)) {
      const source = fs.readFileSync(
        path.join(process.cwd(), "src/components/product-landing", file),
        "utf8",
      );

      if (id === "boundary-first-ux") {
        expect(source, file).toContain("Launch candidate");
      } else {
        expect(source, file).toContain("content.status");
      }
    }
  });

  it("keeps the authored Law legal notice directly below the hero and before the public field guide", () => {
    const law = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/product-landing/LawLanding.tsx",
      ),
      "utf8",
    );

    const noticeIndex = law.indexOf('id="legal-notice"');
    const railIndex = law.indexOf(
      '<PublicLandingRail currentId="constitutional-law-and-jurisprudence" />',
    );

    expect(noticeIndex).toBeGreaterThan(-1);
    expect(railIndex).toBeGreaterThan(noticeIndex);
  });

  it("keeps the fallback renderer legally ordered and strategy metadata out of body sections", () => {
    const renderer = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/product-landing/ProductLandingRenderer.tsx",
      ),
      "utf8",
    );

    const legalNoticeIndex = renderer.indexOf(
      "<PriorityLegalNotice value={legalNotice} />",
    );
    const railIndex = renderer.indexOf(
      "<PublicLandingRail currentId={entry.id} />",
    );

    expect(legalNoticeIndex).toBeGreaterThan(-1);
    expect(railIndex).toBeGreaterThan(legalNoticeIndex);
    expect(renderer).toContain('"audience"');
    expect(renderer).toContain('"pageIntent"');
    expect(renderer).toContain("return Object.entries(presentation).filter");
    expect(renderer).not.toContain("available.sort");
  });
});

import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getProductLandingDescription,
  getProductLandingPresentationContent,
  getProductLandingTitle,
  type ProductLandingContent,
} from "@/lib/product-landing-content";
import type {
  ProductLandingEntry,
  ProductLandingRouteDecision,
} from "@/lib/product-landing-routing";

const hiddenKeys = new Set([
  "id",
  "slug",
  "status",
  "visibility",
  "pageType",
  "version",
  "renderPolicy",
  "notes",
  "internal",
  "metadata",
  "sourceKeys",
  "relationshipStatus",
]);

const preferredSectionOrder = [
  "legalNotice",
  "opening",
  "openingClaim",
  "executiveBrief",
  "definition",
  "problem",
  "sharedProblem",
  "whyThisBridge",
  "whyGroundNews",
  "whyYou",
  "coreObject",
  "coreQuestions",
  "program",
  "method",
  "flagship",
  "flagshipDemo",
  "bridge",
  "candidateWork",
  "whatBFLBrings",
  "whatTheInstitutionCouldBring",
  "validation",
  "researchHypotheses",
  "claimBoundary",
  "claimRegimes",
  "collaboration",
  "firstAsk",
  "cta",
  "closing",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function humanize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function heroValue(
  hero: Record<string, unknown> | null,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = hero?.[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}

function resolveHref(value: unknown): string | null {
  if (!isRecord(value)) return null;
  if (typeof value.href === "string" && value.href.startsWith("/")) return value.href;
  if (typeof value.target === "string" && value.target.trim()) return `#${value.target}`;
  return null;
}

function resolveLabel(value: unknown): string | null {
  if (!isRecord(value)) return null;
  return typeof value.label === "string" ? value.label : null;
}

export function ProductLandingRenderer({
  decision,
  content,
}: {
  decision: ProductLandingRouteDecision;
  content: ProductLandingContent;
}) {
  const { entry, policy, relationshipNotice } = decision;
  const presentation = getProductLandingPresentationContent(content);
  const hero = isRecord(presentation.hero) ? presentation.hero : null;
  const title = getProductLandingTitle(entry, content);
  const description = getProductLandingDescription(entry, content);
  const eyebrow = heroValue(hero, "eyebrow") ?? humanize(entry.pageType);
  const heroTitle = heroValue(hero, "title", "headline") ?? title;
  const heroDeck = heroValue(hero, "deck", "support") ?? description;
  const primaryCta = hero?.primaryCta ?? presentation.cta;
  const secondaryCta = hero?.secondaryCta;
  const bridge = entry.collection === "bridge";

  const sections = orderedSections(presentation);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {bridge ? <BridgeMasthead /> : <SiteHeader />}

      <section className="border-b border-border px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              {eyebrow}
            </span>
            {policy.directLinkOnly ? (
              <span className="border border-border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                Direct-link brief
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            {heroTitle}
          </h1>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-foreground-muted sm:text-xl">
            {heroDeck}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta value={primaryCta} />
            <Cta secondary value={secondaryCta} />
          </div>
        </div>
      </section>

      {relationshipNotice ? (
        <section className="border-b border-border bg-card/55 px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl gap-4">
            <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-foreground-muted" />
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Relationship boundary
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-7">{relationshipNotice}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          {sections.map(([key, value]) => (
            <LandingSection key={key} sectionKey={key} value={value} />
          ))}
        </div>
      </section>

      {bridge ? <BridgeFooter entry={entry} /> : <SiteFooter />}
    </main>
  );
}

function orderedSections(
  presentation: Record<string, unknown>,
): [string, unknown][] {
  const available = Object.entries(presentation).filter(
    ([key, value]) =>
      key !== "hero" &&
      !hiddenKeys.has(key) &&
      value !== null &&
      value !== undefined &&
      value !== "",
  );
  const rank = new Map(preferredSectionOrder.map((key, index) => [key, index]));
  return available.sort(([left], [right]) => {
    const leftRank = rank.get(left) ?? Number.MAX_SAFE_INTEGER;
    const rightRank = rank.get(right) ?? Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return left.localeCompare(right);
  });
}

function LandingSection({
  sectionKey,
  value,
}: {
  sectionKey: string;
  value: unknown;
}) {
  const record = isRecord(value) ? value : null;
  const heading =
    (typeof record?.title === "string" && record.title) || humanize(sectionKey);
  const anchor =
    (typeof record?.id === "string" && record.id) || sectionKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  return (
    <article className="scroll-mt-28 border border-border bg-card p-6 sm:p-8" id={anchor}>
      <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{heading}</h2>
      <div className="mt-5">
        <Value value={record ? stripPresentationKeys(record) : value} depth={0} />
      </div>
    </article>
  );
}

function stripPresentationKeys(record: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(record).filter(
      ([key]) => key !== "title" && key !== "id" && !hiddenKeys.has(key),
    ),
  );
}

function Value({ value, depth }: { value: unknown; depth: number }) {
  if (typeof value === "string") {
    return <p className="max-w-4xl text-base leading-8 text-foreground-muted">{value}</p>;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <p className="font-mono text-sm">{String(value)}</p>;
  }
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return (
        <ul className="grid gap-3 md:grid-cols-2">
          {value.map((item, index) => (
            <li className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={`${item}-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {value.map((item, index) => (
          <div className="border border-border bg-background p-4" key={index}>
            <Value depth={depth + 1} value={item} />
          </div>
        ))}
      </div>
    );
  }
  if (isRecord(value)) {
    const entries = Object.entries(value).filter(
      ([key, item]) => !hiddenKeys.has(key) && item !== null && item !== undefined && item !== "",
    );
    if (entries.length === 0) return null;
    return (
      <div className={depth === 0 ? "grid gap-5 md:grid-cols-2" : "space-y-4"}>
        {entries.map(([key, item]) => (
          <div className={depth === 0 ? "border border-border bg-background p-5" : ""} key={key}>
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {humanize(key)}
            </h3>
            <div className="mt-3">
              <Value depth={depth + 1} value={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function Cta({ value, secondary = false }: { value: unknown; secondary?: boolean }) {
  const label = resolveLabel(value);
  const href = resolveHref(value);
  if (!label || !href) return null;
  return (
    <Link
      className={`inline-flex min-h-11 items-center px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${
        secondary
          ? "border border-border bg-background text-foreground"
          : "bg-primary text-primary-foreground"
      }`}
      href={href}
    >
      {label}
      <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
    </Link>
  );
}

function BridgeMasthead() {
  return (
    <header className="border-b border-border px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link className="font-serif text-lg font-semibold" href="/">
          Boundary First Labs
        </Link>
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Bounded collaboration brief
        </span>
      </div>
    </header>
  );
}

function BridgeFooter({ entry }: { entry: ProductLandingEntry }) {
  return (
    <footer className="border-t border-border bg-card/55 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
        <div>
          <p className="font-serif text-lg font-semibold">Boundary First Labs</p>
          <p className="mt-1 text-sm text-foreground-muted">
            This direct-link page is scoped to {entry.id.replace(/-/g, " ")}.
          </p>
        </div>
        <Link className="inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]" href="/collaborate">
          Collaboration context <FlaskConical aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
        </Link>
      </div>
    </footer>
  );
}

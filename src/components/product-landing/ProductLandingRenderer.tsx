import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FlaskConical,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "@/components/product-landing/PublicLandingRail";
import {
  getProductLandingDescription,
  getProductLandingPresentationContent,
  getProductLandingTitle,
  type ProductLandingContent,
} from "@/lib/product-landing-content";
import { getProductLandingNavigationGroup } from "@/lib/product-landing-navigation";
import type {
  ProductLandingEntry,
  ProductLandingRouteDecision,
} from "@/lib/product-landing-routing";

const hiddenKeys = new Set([
  "id",
  "slug",
  "status",
  "statusLabel",
  "visibility",
  "pageType",
  "version",
  "renderPolicy",
  "notes",
  "internal",
  "metadata",
  "sourceKeys",
  "relationshipStatus",
  "audience",
  "pageIntent",
  "cta",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function humanize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function firstString(...values: unknown[]): string | undefined {
  return values.find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
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
  if (typeof value.href === "string" && value.href.startsWith("/")) {
    return value.href;
  }
  if (typeof value.target === "string" && value.target.trim()) {
    return `#${value.target}`;
  }
  return null;
}

function resolveLabel(value: unknown): string | null {
  if (!isRecord(value)) return null;
  return typeof value.label === "string" ? value.label : null;
}

function resolveStatusLabel(
  presentation: Record<string, unknown>,
  entry: ProductLandingEntry,
): string {
  const product = isRecord(presentation.product) ? presentation.product : null;
  const program = isRecord(presentation.program) ? presentation.program : null;

  return (
    firstString(product?.statusLabel, program?.statusLabel) ?? humanize(entry.status)
  );
}

function publicFrame(entry: ProductLandingEntry) {
  const group = getProductLandingNavigationGroup(`/${entry.slug}`);
  if (group === "software") {
    return {
      group,
      label: "Software / public method",
      href: "/software",
      heroClass: "bg-primary text-primary-foreground",
      eyebrowClass: "text-primary-foreground-muted",
      bodyClass: "text-primary-foreground-secondary",
      icon: Code2,
    } as const;
  }
  if (group === "research") {
    return {
      group,
      label: "Research / active program",
      href: "/research",
      heroClass: "bg-card/55 text-foreground",
      eyebrowClass: "text-foreground-muted",
      bodyClass: "text-foreground-muted",
      icon: Microscope,
    } as const;
  }
  return {
    group: "work",
    label: "Work / applied program",
    href: "/work/index",
    heroClass: "bg-background text-foreground",
    eyebrowClass: "text-foreground-muted",
    bodyClass: "text-foreground-muted",
    icon: BriefcaseBusiness,
  } as const;
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
  const frame = publicFrame(entry);
  const FrameIcon = frame.icon;
  const legalNotice = presentation.legalNotice;
  const sections = orderedSections(presentation).filter(
    ([key]) => key !== "legalNotice",
  );
  const statusLabel = resolveStatusLabel(presentation, entry);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {bridge ? <BridgeMasthead /> : <SiteHeader />}

      {!bridge ? (
        <div className="border-b border-border bg-card/45 px-5 py-3 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <Link
              className="inline-flex min-h-9 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted hover:text-foreground"
              href={frame.href}
            >
              <ArrowLeft aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
              {frame.label}
            </Link>
            <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              <FrameIcon aria-hidden="true" className="h-3.5 w-3.5" />
              Governed public landing
            </span>
          </div>
        </div>
      ) : null}

      <section
        className={`border-b border-border px-5 py-16 sm:px-8 sm:py-24 ${
          bridge ? "bg-background text-foreground" : frame.heroClass
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.58fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  bridge ? "text-foreground-muted" : frame.eyebrowClass
                }`}
              >
                {eyebrow}
              </span>
              {!bridge ? (
                <span className="border border-current/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-75">
                  {statusLabel}
                </span>
              ) : null}
              {policy.directLinkOnly ? (
                <span className="border border-border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Direct-link brief
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              {heroTitle}
            </h1>
            <p
              className={`mt-7 max-w-4xl text-lg leading-8 sm:text-xl ${
                bridge ? "text-foreground-muted" : frame.bodyClass
              }`}
            >
              {heroDeck}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta
                fallbackHref={bridge ? "/collaborate" : frame.href}
                inverted={!bridge && frame.group === "software"}
                value={primaryCta}
              />
              <Cta
                inverted={!bridge && frame.group === "software"}
                secondary
                value={secondaryCta}
              />
            </div>
          </div>
          {!bridge ? (
            <aside
              className={`border p-6 ${
                frame.group === "software"
                  ? "border-primary-foreground/20 bg-primary-foreground/5"
                  : "border-border bg-background/65"
              }`}
            >
              <p
                className={`font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${frame.eyebrowClass}`}
              >
                Representation class
              </p>
              <p className="mt-4 font-serif text-2xl font-semibold leading-8">
                {humanize(entry.pageType)}
              </p>
              <dl className={`mt-5 grid gap-4 text-sm ${frame.bodyClass}`}>
                <div>
                  <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-70">
                    Public maturity
                  </dt>
                  <dd className="mt-1 leading-6">{statusLabel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-70">
                    Projection rule
                  </dt>
                  <dd className="mt-1 leading-6">
                    Claims and scope remain bounded by the governed content object;
                    public visibility does not erase draft, pilot, or research status.
                  </dd>
                </div>
              </dl>
            </aside>
          ) : null}
        </div>
      </section>

      <PriorityLegalNotice value={legalNotice} />

      {!bridge ? <PublicLandingRail currentId={entry.id} /> : null}

      {relationshipNotice ? (
        <section className="border-b border-border bg-card/55 px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl gap-4">
            <ShieldCheck
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-foreground-muted"
            />
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Relationship boundary
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-7">
                {relationshipNotice}
              </p>
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
  return Object.entries(presentation).filter(
    ([key, value]) =>
      key !== "hero" &&
      !hiddenKeys.has(key) &&
      value !== null &&
      value !== undefined &&
      value !== "",
  );
}

function PriorityLegalNotice({ value }: { value: unknown }) {
  if (!isRecord(value)) return null;
  const title = firstString(value.title) ?? "Legal notice";
  const body = firstString(value.body);
  const rules = Array.isArray(value.rules)
    ? value.rules.filter((item): item is string => typeof item === "string")
    : [];

  return (
    <section
      className="border-b border-foreground bg-card/70 px-5 py-7 sm:px-8"
      id="legal-notice"
    >
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)]">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Legal notice · research boundary
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
        </div>
        <div>
          {body ? (
            <p className="max-w-4xl text-sm leading-7 text-foreground-muted">
              {body}
            </p>
          ) : null}
          {rules.length > 0 ? (
            <ul className="mt-5 grid gap-2 md:grid-cols-2">
              {rules.map((rule) => (
                <li
                  className="border-l-2 border-foreground/40 pl-4 text-xs leading-6 text-foreground-muted"
                  key={rule}
                >
                  {rule}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function isNarrativeSection(
  value: unknown,
): value is { heading: string; body?: unknown } {
  return isRecord(value) && typeof value.heading === "string";
}

function LandingSection({
  sectionKey,
  value,
}: {
  sectionKey: string;
  value: unknown;
}) {
  if (
    sectionKey === "sections" &&
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(isNarrativeSection)
  ) {
    return (
      <>
        {value.map((section, index) => (
          <article
            className="scroll-mt-28 border border-border bg-card p-6 sm:p-8"
            id={slugify(section.heading) || `section-${index + 1}`}
            key={`${section.heading}-${index}`}
          >
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              {section.heading}
            </h2>
            {section.body !== undefined ? (
              <div className="mt-5">
                <Value depth={0} value={section.body} />
              </div>
            ) : null}
          </article>
        ))}
      </>
    );
  }

  const record = isRecord(value) ? value : null;
  const heading =
    (typeof record?.title === "string" && record.title) || humanize(sectionKey);
  const anchor =
    (typeof record?.id === "string" && record.id) ||
    sectionKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const consequential =
    sectionKey === "legalNotice" ||
    sectionKey === "claimBoundary" ||
    sectionKey === "claimRegimes";

  return (
    <article
      className={`scroll-mt-28 border p-6 sm:p-8 ${
        consequential ? "border-foreground bg-card/70" : "border-border bg-card"
      }`}
      id={anchor}
    >
      {consequential ? (
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Claim boundary
        </p>
      ) : null}
      <h2
        className={`${
          consequential ? "mt-2" : ""
        } font-serif text-2xl font-semibold sm:text-3xl`}
      >
        {heading}
      </h2>
      <div className="mt-5">
        <Value value={record ? stripPresentationKeys(record) : value} depth={0} />
      </div>
    </article>
  );
}

function stripPresentationKeys(
  record: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(record).filter(
      ([key]) => key !== "title" && key !== "id" && !hiddenKeys.has(key),
    ),
  );
}

function Value({ value, depth }: { value: unknown; depth: number }) {
  if (typeof value === "string") {
    return (
      <p className="max-w-4xl text-base leading-8 text-foreground-muted">
        {value}
      </p>
    );
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <p className="font-mono text-sm">{String(value)}</p>;
  }
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return (
        <ul className="grid gap-3 md:grid-cols-2">
          {value.map((item, index) => (
            <li
              className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted"
              key={`${item}-${index}`}
            >
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
      ([key, item]) =>
        !hiddenKeys.has(key) &&
        item !== null &&
        item !== undefined &&
        item !== "",
    );
    if (entries.length === 0) return null;
    return (
      <div className={depth === 0 ? "grid gap-5 md:grid-cols-2" : "space-y-4"}>
        {entries.map(([key, item]) => (
          <div
            className={depth === 0 ? "border border-border bg-background p-5" : ""}
            key={key}
          >
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

function Cta({
  value,
  secondary = false,
  inverted = false,
  fallbackHref = null,
}: {
  value: unknown;
  secondary?: boolean;
  inverted?: boolean;
  fallbackHref?: string | null;
}) {
  const label = resolveLabel(value);
  const href = resolveHref(value) ?? fallbackHref;
  if (!label || !href) return null;
  const className = secondary
    ? inverted
      ? "border border-primary-foreground/25 bg-transparent text-primary-foreground"
      : "border border-border bg-background text-foreground"
    : inverted
      ? "bg-primary-foreground text-primary"
      : "bg-primary text-primary-foreground";
  return (
    <Link
      className={`inline-flex min-h-11 items-center px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${className}`}
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
        <Link
          className="inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"
          href="/collaborate"
        >
          Collaboration context
          <FlaskConical aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
        </Link>
      </div>
    </footer>
  );
}
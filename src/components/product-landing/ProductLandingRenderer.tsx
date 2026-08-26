import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FlaskConical,
  GitBranch,
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

const proseKeys = new Set([
  "body",
  "intro",
  "support",
  "supporting",
  "description",
  "definition",
  "proposition",
  "statement",
  "diagnosis",
  "rule",
  "qualityRule",
  "publicPromise",
  "northStar",
  "claimBoundary",
  "claimRule",
  "implication",
  "important",
  "warning",
  "premise",
  "ask",
  "primaryQuestion",
  "researchQuestion",
  "boundaryFirstQuestion",
  "boundaryFirstExtension",
  "criticalBoundary",
  "candidateDoctrine",
  "statusOfCandidate",
  "promotionRule",
  "compact",
  "compactObject",
  "notation",
  "publicationLine",
  "finalLine",
  "line",
  "desiredReaction",
]);

const sequenceKeys = new Set([
  "chain",
  "sequence",
  "loop",
  "stages",
  "steps",
  "levels",
  "scenes",
  "architecture",
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
      gridClass:
        "[background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)]",
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
      gridClass:
        "[background-image:linear-gradient(rgba(11,31,58,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,.045)_1px,transparent_1px)]",
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
    gridClass:
      "[background-image:linear-gradient(rgba(11,31,58,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,.045)_1px,transparent_1px)]",
    icon: BriefcaseBusiness,
  } as const;
}

function frameTrace(group: "software" | "research" | "work"): string[] {
  if (group === "software") {
    return ["Domain", "Representation", "Execution", "Witness"];
  }
  if (group === "research") {
    return ["Observation", "Structure", "Hypothesis", "Test"];
  }
  return ["Context", "Action", "Evidence", "Repair"];
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
  const heroSupport = heroValue(hero, "support", "supporting", "pullQuote");
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
  const trace = frameTrace(frame.group);
  const softwareHero = !bridge && frame.group === "software";

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
        className={`relative isolate overflow-hidden border-b border-border px-5 py-16 sm:px-8 sm:py-24 ${
          bridge ? "bg-background text-foreground" : frame.heroClass
        }`}
      >
        {!bridge ? (
          <div
            className={`pointer-events-none absolute inset-0 -z-20 opacity-80 [background-size:46px_46px] ${frame.gridClass}`}
          />
        ) : null}
        <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-96 w-96 rounded-full border border-current opacity-[0.08]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.62fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
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
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.035em] sm:text-7xl">
              {heroTitle}
            </h1>
            <p
              className={`mt-7 max-w-4xl text-lg leading-8 sm:text-xl ${
                bridge ? "text-foreground-muted" : frame.bodyClass
              }`}
            >
              {heroDeck}
            </p>
            {heroSupport && heroSupport !== heroDeck ? (
              <p
                className={`mt-5 max-w-3xl border-l-2 border-current/35 pl-5 text-sm leading-7 ${
                  bridge ? "text-foreground-muted" : frame.bodyClass
                }`}
              >
                {heroSupport}
              </p>
            ) : null}
            <div className="mt-9 flex flex-wrap gap-3">
              <Cta
                fallbackHref={bridge ? "/about/bridges" : frame.href}
                inverted={softwareHero}
                value={primaryCta}
              />
              <Cta inverted={softwareHero} secondary value={secondaryCta} />
            </div>
          </div>
          {!bridge ? (
            <aside
              className={`border p-6 sm:p-7 ${
                softwareHero
                  ? "border-primary-foreground/20 bg-primary-foreground/[0.045]"
                  : "border-border bg-background/75"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p
                  className={`font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${frame.eyebrowClass}`}
                >
                  Reading frame
                </p>
                <GitBranch aria-hidden="true" className="h-4 w-4 opacity-60" />
              </div>
              <div className="mt-6 grid gap-0">
                {trace.map((item, index) => (
                  <div
                    className="grid grid-cols-[2.4rem_1fr] items-stretch"
                    key={item}
                  >
                    <div className="relative flex justify-center">
                      <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-current/30 bg-inherit font-mono text-[8px] font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {index < trace.length - 1 ? (
                        <span className="absolute bottom-0 top-7 w-px bg-current opacity-20" />
                      ) : null}
                    </div>
                    <div className="min-h-16 pb-5">
                      <p className="font-serif text-lg font-semibold">{item}</p>
                      <p className={`mt-1 text-xs leading-5 ${frame.bodyClass}`}>
                        {index === trace.length - 1
                          ? "Close the claim against an observable consequence."
                          : "Preserve the distinctions needed by the next transition."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t border-current/15 pt-5">
                <p
                  className={`font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${frame.eyebrowClass}`}
                >
                  Public maturity
                </p>
                <p className="mt-2 font-serif text-xl font-semibold">{statusLabel}</p>
                <p className={`mt-2 text-xs leading-6 ${frame.bodyClass}`}>
                  Public visibility does not promote a draft, pilot, or research claim beyond its governed status.
                </p>
              </div>
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

      <div>
        {sections.map(([key, value], index) => (
          <LandingSection
            index={index}
            key={key}
            sectionKey={key}
            value={value}
          />
        ))}
      </div>

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
  index,
}: {
  sectionKey: string;
  value: unknown;
  index: number;
}) {
  if ((sectionKey === "product" || sectionKey === "program") && isRecord(value)) {
    return (
      <IdentitySection index={index} record={value} sectionKey={sectionKey} />
    );
  }

  if (sectionKey === "closing" && isRecord(value)) {
    return <ClosingSection index={index} record={value} />;
  }

  if (
    sectionKey === "sections" &&
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(isNarrativeSection)
  ) {
    return (
      <>
        {value.map((section, sectionIndex) => (
          <SectionShell
            anchor={slugify(section.heading) || `section-${sectionIndex + 1}`}
            heading={section.heading}
            index={index + sectionIndex}
            key={`${section.heading}-${sectionIndex}`}
            sectionKey="section"
          >
            {section.body !== undefined ? (
              <Value depth={0} value={section.body} valueKey="body" />
            ) : null}
          </SectionShell>
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
    sectionKey === "claimRegimes" ||
    sectionKey === "claimFirewall";

  return (
    <SectionShell
      anchor={anchor}
      consequential={consequential}
      heading={heading}
      index={index}
      sectionKey={sectionKey}
    >
      <Value
        depth={0}
        value={record ? stripPresentationKeys(record) : value}
        valueKey={sectionKey}
      />
    </SectionShell>
  );
}

function SectionShell({
  anchor,
  children,
  consequential = false,
  heading,
  index,
  sectionKey,
}: {
  anchor: string;
  children: React.ReactNode;
  consequential?: boolean;
  heading: string;
  index: number;
  sectionKey: string;
}) {
  const shaded = index % 2 === 1;

  return (
    <section
      className={`scroll-mt-28 border-b border-border px-5 py-14 sm:px-8 sm:py-20 ${
        consequential
          ? "bg-card/70"
          : shaded
            ? "bg-card/35"
            : "bg-background"
      }`}
      id={anchor}
    >
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(13rem,0.4fr)_minmax(0,1.6fr)] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {consequential ? "Claim boundary" : humanize(sectionKey)}
            </span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.05] sm:text-4xl">
            {heading}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function IdentitySection({
  index,
  record,
  sectionKey,
}: {
  index: number;
  record: Record<string, unknown>;
  sectionKey: string;
}) {
  const name = firstString(record.name) ?? humanize(sectionKey);
  const shortName = firstString(record.shortName);
  const primaryLine = firstString(record.primaryLine);
  const secondaryLine = firstString(record.secondaryLine);
  const proposition = firstString(
    record.coreProposition,
    record.publicPromise,
    record.coreQuestion,
  );
  const highlight = firstString(
    record.engineeringMaxim,
    record.northStar,
    record.claimBoundary,
  );
  const highlightLabel = record.engineeringMaxim
    ? "Engineering maxim"
    : record.northStar
      ? "North star"
      : "Claim boundary";
  const classification = Array.isArray(record.classification)
    ? record.classification.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  return (
    <section className="border-b border-border bg-card/35 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            {sectionKey === "product" ? "Method profile" : "Research profile"}
          </span>
        </div>

        <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-end gap-4">
              <h2 className="font-serif text-4xl font-semibold leading-[0.98] sm:text-5xl">
                {name}
              </h2>
              {shortName ? (
                <span className="mb-1 border border-border bg-background px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  {shortName}
                </span>
              ) : null}
            </div>
            {secondaryLine ? (
              <p className="mt-5 max-w-xl text-base leading-8 text-foreground-muted">
                {secondaryLine}
              </p>
            ) : null}
            {classification.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {classification.map((item) => (
                  <span
                    className="border border-border bg-background px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-4">
            {primaryLine ? (
              <article className="border border-border bg-background p-6 sm:p-8">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Primary line
                </p>
                <p className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.08] sm:text-4xl">
                  {primaryLine}
                </p>
              </article>
            ) : null}
            {proposition ? (
              <article className="border border-border bg-background p-6 sm:p-8">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  {record.coreQuestion ? "Core question" : "Core proposition"}
                </p>
                <p className="mt-4 max-w-4xl text-base leading-8 text-foreground-muted">
                  {proposition}
                </p>
              </article>
            ) : null}
            {highlight ? (
              <article className="border-l-2 border-accent bg-background px-6 py-5 sm:px-8">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  {highlightLabel}
                </p>
                <p className="mt-3 font-serif text-xl font-semibold leading-8">
                  {highlight}
                </p>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingSection({
  index,
  record,
}: {
  index: number;
  record: Record<string, unknown>;
}) {
  const title = firstString(record.title) ?? "Close the loop.";
  const eyebrow = firstString(record.eyebrow) ?? "Boundary First";
  const finalLine = firstString(record.finalLine, record.line);

  return (
    <section className="border-b border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 text-primary-foreground-muted">
          <span className="font-mono text-[9px] font-semibold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-primary-foreground opacity-25" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-6 max-w-5xl font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-6xl">
          {title}
        </h2>
        {finalLine ? (
          <p className="mt-7 max-w-4xl border-l-2 border-accent pl-5 text-lg leading-8 text-primary-foreground-secondary sm:text-xl">
            {finalLine}
          </p>
        ) : null}
      </div>
    </section>
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

function Value({
  value,
  depth,
  valueKey,
}: {
  value: unknown;
  depth: number;
  valueKey?: string;
}) {
  if (typeof value === "string") {
    const formal = valueKey === "notation" || valueKey === "compactObject";
    return formal ? (
      <div className="border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Formal carrier
        </p>
        <p className="mt-4 break-words font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          {value}
        </p>
      </div>
    ) : (
      <p
        className={`max-w-4xl leading-8 text-foreground-muted ${
          depth === 0 ? "text-base sm:text-lg" : "text-sm"
        }`}
      >
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
        <StringArrayValue
          items={value as string[]}
          valueKey={valueKey ?? "items"}
        />
      );
    }
    return <ObjectArrayValue items={value} valueKey={valueKey} />;
  }

  if (isRecord(value)) {
    return <RecordValue depth={depth} record={value} />;
  }

  return null;
}

function StringArrayValue({
  items,
  valueKey,
}: {
  items: string[];
  valueKey: string;
}) {
  if (valueKey === "classification") {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            className="border border-border bg-card px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (valueKey === "body") {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <p className="max-w-4xl text-base leading-8 text-foreground-muted" key={item}>
            {item}
          </p>
        ))}
      </div>
    );
  }

  if (sequenceKeys.has(valueKey)) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {items.map((item, index) => (
          <div className="contents" key={`${item}-${index}`}>
            <div className="min-w-0 border border-border bg-card px-4 py-3 sm:max-w-52 sm:flex-1">
              <span className="font-mono text-[8px] font-semibold text-foreground-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-semibold leading-6">{item}</p>
            </div>
            {index < items.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="hidden h-4 w-4 shrink-0 text-foreground-muted sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <li className="min-h-28 bg-card p-5" key={`${item}-${index}`}>
          <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-4 text-sm leading-7 text-foreground-muted">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function ObjectArrayValue({
  items,
  valueKey,
}: {
  items: unknown[];
  valueKey?: string;
}) {
  return (
    <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        if (!isRecord(item)) {
          return (
            <div className="bg-card p-5" key={index}>
              <Value depth={1} value={item} />
            </div>
          );
        }

        const headingKey = ["title", "name", "label", "smell", "symbol", "id"].find(
          (key) => typeof item[key] === "string" && String(item[key]).trim(),
        );
        const heading = headingKey ? String(item[headingKey]) : null;
        const body = Object.fromEntries(
          Object.entries(item).filter(
            ([key, entry]) =>
              key !== headingKey &&
              !hiddenKeys.has(key) &&
              entry !== null &&
              entry !== undefined &&
              entry !== "",
          ),
        );

        return (
          <article className="min-h-56 bg-card p-5 sm:p-6" key={index}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {valueKey ? (
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">
                  {humanize(valueKey)}
                </span>
              ) : null}
            </div>
            {heading ? (
              <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight">
                {heading}
              </h3>
            ) : null}
            {Object.keys(body).length > 0 ? (
              <div className="mt-5">
                <RecordValue depth={1} record={body} />
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function RecordValue({
  record,
  depth,
}: {
  record: Record<string, unknown>;
  depth: number;
}) {
  const entries = Object.entries(record).filter(
    ([key, item]) =>
      !hiddenKeys.has(key) &&
      item !== null &&
      item !== undefined &&
      item !== "",
  );
  if (entries.length === 0) return null;

  return (
    <div className={depth === 0 ? "grid gap-4 md:grid-cols-2" : "space-y-5"}>
      {entries.map(([key, item]) => {
        const prose = typeof item === "string" && proseKeys.has(key);
        const formal = key === "notation" || key === "compactObject";

        if (prose || formal) {
          return (
            <div
              className={`${
                depth === 0 ? "md:col-span-2" : ""
              } ${
                formal
                  ? "border border-border bg-card p-6 sm:p-8"
                  : "border-l-2 border-accent pl-5"
              }`}
              key={key}
            >
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {formal ? "Formal carrier" : humanize(key)}
              </p>
              <div className="mt-3">
                <Value depth={depth + 1} value={item} valueKey={key} />
              </div>
            </div>
          );
        }

        return (
          <div
            className={
              depth === 0
                ? "border border-border bg-card p-5 sm:p-6"
                : "border-t border-border pt-4 first:border-t-0 first:pt-0"
            }
            key={key}
          >
            <h3 className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {humanize(key)}
            </h3>
            <div className="mt-3">
              <Value depth={depth + 1} value={item} valueKey={key} />
            </div>
          </div>
        );
      })}
    </div>
  );
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
          href="/about/bridges"
        >
          Bridge context
          <FlaskConical aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
        </Link>
      </div>
    </footer>
  );
}

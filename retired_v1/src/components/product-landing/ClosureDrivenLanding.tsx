import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Code2,
  Eye,
  GitBranch,
  PlayCircle,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/closure-driven-software-development.json";

const loopIcons = [Search, ShieldCheck, GitBranch, PlayCircle, Eye, Wrench] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function ClosureDrivenLanding() {
  const {
    hero,
    definition,
    loop,
    certainty,
    deliverySkeleton,
    workedExample,
    validation,
    claimBoundary,
    closing,
  } = content;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="border-b border-border bg-card/45 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex min-h-9 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted hover:text-foreground"
            href="/software"
          >
            Software / public method
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <Code2 aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.62fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
                {hero.eyebrow}
              </span>
              <span className="border border-primary-foreground/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
                {displayStatus(content.status)}
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.035em] sm:text-7xl">
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-primary-foreground-secondary sm:text-xl">
              {hero.support}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary"
                href={`#${hero.primaryCta.target}`}
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </a>
              <Link
                className="inline-flex min-h-12 items-center border border-primary-foreground/25 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                href={hero.secondaryCta.href}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="border border-primary-foreground/20 bg-primary-foreground/[0.045] p-6 sm:p-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
              Commitment zone
            </p>
            <div className="relative mt-7 h-64 overflow-hidden border border-primary-foreground/15">
              <div className="absolute -left-8 top-8 flex h-44 w-44 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/[0.035] p-6 text-center">
                <span className="font-serif text-lg font-semibold">Domain certainty</span>
              </div>
              <div className="absolute -right-8 bottom-8 flex h-44 w-44 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/[0.035] p-6 text-center">
                <span className="font-serif text-lg font-semibold">Executable certainty</span>
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-primary-foreground/45 bg-primary p-3 text-center shadow-[0_0_0_10px_rgba(255,255,255,.035)]">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Safe next commitment</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-primary-foreground-secondary">
              Readiness is not complete knowledge. It is enough overlap to make the next expensive or irreversible commitment responsibly.
            </p>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="closure-driven-software-development" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Operating thesis
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">{definition.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{definition.body}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold leading-8">
              {definition.maxim}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {loop.steps.map((step, index) => {
              const Icon = loopIcons[index];
              return (
                <article className="min-h-64 bg-card p-6" key={step.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] font-semibold text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-semibold">{step.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">{step.question}</p>
                  <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">
                    Witness · {step.witness}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20" id={loop.id}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Readiness
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{certainty.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{certainty.body}</p>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <article className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Domain cone</p>
              <ul className="mt-5 grid gap-3">
                {certainty.domainCone.map((item) => (
                  <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <div className="flex min-h-20 items-center justify-center px-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Meet</span>
            </div>
            <article className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Executable cone</p>
              <ul className="mt-5 grid gap-3">
                {certainty.executableCone.map((item) => (
                  <li className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <Boxes aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Delivery skeleton</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{deliverySkeleton.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{deliverySkeleton.body}</p>
          </div>
          <ol className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {deliverySkeleton.requirements.map((item, index) => (
              <li className="grid grid-cols-[2.5rem_1fr] gap-3 bg-card p-5 text-sm leading-7 text-foreground-muted" key={item}>
                <span className="font-mono text-[9px] font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-[#0f2138] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20" id={workedExample.id}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Worked delivery loop</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{workedExample.title}</h2>
            <p className="mt-5 text-base leading-8 text-white/60">{workedExample.request}</p>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-2">
            <article className="border border-white/15 bg-white/[0.035] p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Hidden distinctions</p>
              <ul className="mt-5 grid gap-3">
                {workedExample.hiddenDistinctions.map((item) => (
                  <li className="border-l-2 border-brand-gold/55 pl-4 text-sm leading-7 text-white/60" key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="border border-white/15 bg-white/[0.035] p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Smallest truthful skeleton</p>
              <ul className="mt-5 grid gap-3">
                {workedExample.smallestSkeleton.map((item, index) => (
                  <li className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-white/60" key={item}>
                    <span className="font-mono text-[9px] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="border border-brand-gold/35 p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">Closure check</p>
              <p className="mt-3 text-sm leading-7 text-white/62">{workedExample.closureCheck}</p>
            </div>
            <div className="border border-white/15 p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Lesson</p>
              <p className="mt-3 font-serif text-xl font-semibold leading-8">{workedExample.lesson}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Validation</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{validation.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{validation.comparisonShape}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-sm font-semibold leading-7">{validation.claimRule}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {validation.evidenceTargets.map((item) => (
              <div className="border border-border bg-card p-5 text-sm leading-7 text-foreground-muted" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Claim boundary</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimBoundary.title}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <article className="border border-border bg-background p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Safe public claims</p>
              <ul className="mt-5 grid gap-3">
                {claimBoundary.safe.map((item) => (
                  <li className="text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="border border-foreground bg-background p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Not established</p>
              <ul className="mt-5 grid gap-3">
                {claimBoundary.notEstablished.map((item) => (
                  <li className="text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">{closing.eyebrow}</p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl">{closing.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted">{closing.finalLine}</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground" href={content.cta.href}>
            {content.cta.label}
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

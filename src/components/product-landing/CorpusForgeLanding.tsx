import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleDot,
  Database,
  FileText,
  GitMerge,
  History,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/corpus-forge.json";

const lifecycleIcons = [Database, FileText, GitMerge, UserCheck, BadgeCheck, History] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function CorpusForgeLanding() {
  const {
    hero,
    definition,
    lifecycle,
    objects,
    workedExample,
    promotionGrammar,
    validation,
    relationship,
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
            href="/work/index"
          >
            Work / research operations
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-[#111827] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(248,243,232,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.045)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -right-24 top-14 -z-10 h-80 w-80 rounded-full border border-brand-gold/15" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.62fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                {hero.eyebrow}
              </span>
              <span className="border border-white/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
                {displayStatus(content.status)}
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.035em] sm:text-7xl">
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-white/68 sm:text-xl">
              {hero.support}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center bg-brand-gold px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-black"
                href={`#${hero.primaryCta.target}`}
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </a>
              <Link
                className="inline-flex min-h-12 items-center border border-white/20 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white hover:border-white/45"
                href={hero.secondaryCta.href}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="border border-white/15 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Knowledge lifecycle
            </p>
            <ol className="mt-7 grid gap-0">
              {lifecycle.stages.map((stage, index) => {
                const Icon = lifecycleIcons[index];
                return (
                  <li className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-5 last:pb-0" key={stage.name}>
                    {index < lifecycle.stages.length - 1 ? (
                      <span className="absolute bottom-0 left-[1.2rem] top-8 w-px bg-white/15" />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#111827]">
                      <Icon aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                    </span>
                    <div className="pt-1">
                      <p className="font-serif text-lg font-semibold text-white/90">{stage.name.replace(/^\d+\.\s*/, "")}</p>
                      <p className="mt-1 text-xs leading-5 text-white/48">{stage.artifact}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="corpus-forge" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Operating definition</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">{definition.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{definition.body}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">{definition.rule}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {objects.types.map((object, index) => (
              <article className="min-h-44 bg-card p-6" key={object.name}>
                <span className="font-mono text-[10px] font-semibold text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{object.name}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{object.purpose}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20" id="method">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Corpus method</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{lifecycle.title}</h2>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {lifecycle.stages.map((stage, index) => {
              const Icon = lifecycleIcons[index];
              return (
                <article className="border border-border bg-background p-6" key={stage.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 font-serif text-2xl font-semibold">{stage.name.replace(/^\d+\.\s*/, "")}</h3>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">{stage.question}</p>
                  <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Artifact · {stage.artifact}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="worked-example">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Illustrative corpus trace</p>
          <h2 className="mt-4 max-w-5xl font-serif text-4xl font-semibold sm:text-6xl">{workedExample.title}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-foreground-muted">{workedExample.setup}</p>
          <ol className="mt-10 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {workedExample.trace.map((step, index) => (
              <li className="bg-card p-6" key={step.stage}>
                <span className="font-mono text-[9px] font-semibold text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{step.stage}</h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{step.state}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">{workedExample.lesson}</p>
          <p className="mt-3 text-xs leading-6 text-foreground-muted">{workedExample.scopeNote}</p>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">Promotion grammar</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{promotionGrammar.title}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">States</p>
              <ol className="mt-5 grid gap-2">
                {promotionGrammar.states.map((state, index) => (
                  <li className="grid grid-cols-[2rem_1fr] gap-3 border border-primary-foreground/20 p-3 text-sm" key={state}>
                    <span className="font-mono text-[9px] text-primary-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span>{state}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">Promotion gates</p>
              <ul className="mt-5 grid gap-3">
                {promotionGrammar.gates.map((gate) => (
                  <li className="flex gap-3 text-sm leading-7 text-primary-foreground-secondary" key={gate}>
                    <CircleDot aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0" />
                    <span>{gate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Validation</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold">{validation.title}</h2>
            <ul className="mt-6 grid gap-3">
              {validation.targets.map((item) => (
                <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={item}>
                  <CircleDot aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted">{validation.claimRule}</p>
          </article>
          <article className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Program relationships</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold">{relationship.title}</h2>
            <div className="mt-6 grid gap-4">
              <p className="text-sm leading-7 text-foreground-muted">{relationship.workbench}</p>
              <p className="text-sm leading-7 text-foreground-muted">{relationship.ledger}</p>
              <p className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted">{relationship.boundary}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-border bg-[#18212f] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-brand-gold" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Claim boundary</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimBoundary.title}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Safe to claim</p>
              <ul className="mt-4 grid gap-3">{claimBoundary.safe.map((item) => <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Not established</p>
              <ul className="mt-4 grid gap-3">{claimBoundary.notEstablished.map((item) => <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>)}</ul>
            </div>
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

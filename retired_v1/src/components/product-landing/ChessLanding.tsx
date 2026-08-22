import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Crosshair,
  GitBranch,
  ShieldCheck,
  Swords,
  Target,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/boundary-first-chess.json";

const passIcons = [ShieldCheck, Crosshair, GitBranch, Target, Swords] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function ChessLanding() {
  const {
    hero,
    definition,
    positionLens,
    method,
    workedExample,
    validation,
    proof,
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
            Work / practitioner doctrine
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-[#17130d] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08] [background-image:linear-gradient(45deg,currentColor_25%,transparent_25%),linear-gradient(-45deg,currentColor_25%,transparent_25%),linear-gradient(45deg,transparent_75%,currentColor_75%),linear-gradient(-45deg,transparent_75%,currentColor_75%)] [background-position:0_0,0_22px,22px_-22px,-22px_0] [background-size:44px_44px]" />
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
              Position lens
            </p>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15">
              {positionLens.dimensions.map((dimension, index) => (
                <div className="bg-[#17130d] p-4" key={dimension.name}>
                  <span className="font-mono text-[9px] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-serif text-lg font-semibold text-white/90">
                    {dimension.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/55">{definition.rule}</p>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="boundary-first-chess" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Operating definition
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {definition.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{definition.body}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {positionLens.dimensions.map((dimension, index) => (
              <article className="min-h-44 bg-card p-6" key={dimension.name}>
                <span className="font-mono text-[10px] font-semibold text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{dimension.name}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{dimension.question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20" id="method">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Reading method
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{method.title}</h2>
          </div>
          <div className="mt-10 grid gap-3 lg:grid-cols-5">
            {method.passes.map((pass, index) => {
              const Icon = passIcons[index];
              return (
                <article className="border border-border bg-background p-5" key={pass.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 font-serif text-2xl font-semibold leading-8">
                    {pass.name.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">{pass.question}</p>
                  <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                    Output · {pass.output}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="worked-example">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
            Constructed teaching pattern
          </p>
          <h2 className="mt-4 max-w-5xl font-serif text-4xl font-semibold sm:text-6xl">{workedExample.title}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-foreground-muted">{workedExample.setup}</p>
          <div className="mt-9 grid gap-3 lg:grid-cols-[0.65fr_1.35fr]">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Naive read
              </p>
              <p className="mt-5 font-serif text-3xl font-semibold leading-10">{workedExample.naiveRead}</p>
            </article>
            <article className="border border-border bg-primary p-6 text-primary-foreground sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
                Boundary read
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {workedExample.boundaryRead.map((item) => (
                  <li className="border-l border-primary-foreground/30 pl-4 text-sm leading-7 text-primary-foreground-secondary" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-5 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">
            {workedExample.lesson}
          </p>
          <p className="mt-3 text-xs leading-6 text-foreground-muted">{workedExample.scopeNote}</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="border border-border bg-background p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Validation
            </p>
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
          <article className="border border-border bg-background p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Built so far
            </p>
            <ul className="mt-6 grid gap-3">
              {proof.built.map((item) => (
                <li className="border border-border bg-card p-4 text-sm font-medium" key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-foreground-muted">{proof.claimBoundary}</p>
          </article>
        </div>
      </section>

      <section className="border-b border-border bg-[#211c14] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-brand-gold" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Claim boundary</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimBoundary.title}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Safe to claim</p>
              <ul className="mt-4 grid gap-3">
                {claimBoundary.safe.map((item) => <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Not established</p>
              <ul className="mt-4 grid gap-3">
                {claimBoundary.notEstablished.map((item) => <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>)}
              </ul>
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

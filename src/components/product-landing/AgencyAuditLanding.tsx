import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  FileSearch,
  GitBranch,
  Network,
  RotateCcw,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/agency-representation-audit.json";

const traceIcons = [Network, FileSearch, GitBranch, Scale, RotateCcw] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function AgencyAuditLanding() {
  const {
    hero,
    executiveBrief,
    problem,
    method,
    candidateWork,
    firstAsk,
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
            Work / applied program
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-[#101820] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(248,243,232,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.045)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full border border-brand-gold/20" />
        <div className="pointer-events-none absolute right-16 top-36 -z-10 h-64 w-64 rounded-full border border-brand-blue/20" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.62fr)] lg:items-end">
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
              <Link
                className="inline-flex min-h-12 items-center bg-brand-gold px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-black"
                href={hero.primaryCta.href}
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
              <a
                className="inline-flex min-h-12 items-center border border-white/20 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white hover:border-white/45"
                href={`#${hero.secondaryCta.target}`}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="border border-white/15 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
                Consequence trace
              </span>
              <CircleDot aria-hidden="true" className="h-5 w-5 text-brand-gold" />
            </div>
            <ol className="mt-7 grid gap-0">
              {method.passes.map((pass, index) => {
                const Icon = traceIcons[index];
                return (
                  <li
                    className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-5 last:pb-0"
                    key={pass.name}
                  >
                    {index < method.passes.length - 1 ? (
                      <span className="absolute bottom-0 left-[1.2rem] top-8 w-px bg-white/15" />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#101820]">
                      <Icon aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                    </span>
                    <div className="pt-1">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
                        Pass {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-serif text-lg font-semibold text-white/90">
                        {pass.name.replace(/^\d+\.\s*/, "")}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/48">{pass.output}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="agency-representation-audit" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Executive brief
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {executiveBrief.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              {executiveBrief.summary}
            </p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">
              {executiveBrief.decisionUse}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {executiveBrief.questions.map((question, index) => (
              <article className="min-h-44 bg-card p-6" key={question}>
                <span className="font-mono text-[10px] font-semibold text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-7 font-serif text-xl font-semibold leading-7">{question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Why audit the chain
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
                {problem.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">{problem.body}</p>
            </div>
            <div className="grid gap-2">
              {problem.failureModes.map((failure, index) => (
                <div
                  className="grid grid-cols-[2.5rem_1fr] items-start gap-3 border border-border bg-background p-4"
                  key={failure}
                >
                  <span className="font-mono text-[9px] font-semibold text-foreground-muted">
                    F{String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-foreground-muted">{failure}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="method">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Audit method
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{method.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted">
              Each pass preserves the prior path. The goal is not five disconnected checklists; it is one reconstructable chain from permission to consequence and back through repair.
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-5">
            {method.passes.map((pass, index) => {
              const Icon = traceIcons[index];
              return (
                <article className="border border-border bg-card p-5" key={pass.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] font-semibold text-foreground-muted">
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

          <div className="mt-4 border border-foreground bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
              Closure test
            </p>
            <p className="mt-3 max-w-5xl font-serif text-2xl font-semibold leading-9">{method.closureTest}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Pilot boundary
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{candidateWork.title}</h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                The first engagement should be narrow enough to reconstruct, consequential enough to matter, and concrete enough to leave an evidence trail.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <article className="border border-border bg-background p-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Strong fit
                </p>
                <ul className="mt-5 grid gap-3">
                  {candidateWork.goodFit.map((item) => (
                    <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="border border-border bg-background p-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Example processes
                </p>
                <ul className="mt-5 grid gap-3">
                  {candidateWork.examples.map((item) => (
                    <li className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="border border-border bg-background p-6 md:col-span-2">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Not the right starting shape
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {candidateWork.notYetFit.map((item) => (
                    <p className="text-sm leading-7 text-foreground-muted" key={item}>
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Pilot intake
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{firstAsk.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{firstAsk.shape}</p>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-2">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                What you bring
              </p>
              <ul className="mt-5 grid gap-3">
                {firstAsk.whatYouBring.map((item) => (
                  <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={item}>
                    <CircleDot aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                What the pilot returns
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {firstAsk.whatYouReceive.map((item) => (
                  <li className="border border-border bg-background p-4 text-sm font-medium" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <p className="mt-4 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">
            <strong className="font-semibold text-foreground">Evidence rule:</strong> {firstAsk.evidenceRule}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-[#18232d] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-brand-gold" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Claim boundary
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimBoundary.title}</h2>
            <p className="mt-5 text-sm leading-7 text-white/60">{claimBoundary.body}</p>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
              {claimBoundary.doesNotProvide.map((item) => (
                <div className="bg-[#18232d] p-5" key={item}>
                  <p className="text-sm leading-7 text-white/62">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-brand-gold pl-5 text-sm leading-7 text-white/62">
              {claimBoundary.claimRule}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              {closing.eyebrow}
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl">
              {closing.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted">{closing.finalLine}</p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
            href={content.cta.href}
          >
            {content.cta.label}
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

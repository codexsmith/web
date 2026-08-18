import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Braces,
  CircleDot,
  GitBranch,
  Network,
  ScanSearch,
  ShieldCheck,
  Sigma,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/schemathematics.json";

const profileIcons = [Boxes, ShieldCheck, GitBranch, CircleDot, Network, ScanSearch, Braces, Sigma] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function SchemathematicsLanding() {
  const {
    hero,
    definition,
    operativeProfile,
    coreQuestions,
    program,
    workedExample,
    validation,
    researchHypotheses,
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
            href="/research"
          >
            Research / active program
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <Sigma aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-[#111b2b] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(248,243,232,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.04)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-96 w-96 rotate-12 border border-brand-gold/15" />
        <div className="pointer-events-none absolute right-20 top-32 -z-10 h-56 w-56 -rotate-6 border border-brand-blue/20" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.62fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">{hero.eyebrow}</span>
              <span className="border border-white/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
                {displayStatus(content.status)}
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-8xl">{hero.headline}</h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-white/68 sm:text-xl">{hero.support}</p>
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

          <aside className="border border-white/15 bg-white/[0.04] p-6 sm:p-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Operative profile</p>
            <div className="mt-6 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
              {["ENTITY", "CONDITIONS", "OPERATIONS", "INVARIANTS", "CLOSURE", "BOUNDARY", "PROVENANCE", "REPAIR"].map((label, index) => (
                <div className="bg-[#111b2b] p-4" key={label}>
                  <span className="font-mono text-[8px] text-white/30">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-4 font-mono text-[9px] font-semibold tracking-[0.12em] text-white/70">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 font-serif text-xl font-semibold leading-8">Name the object, then make its available structure inspectable.</p>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="schemathematics" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Definition</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">{definition.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{definition.body}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">{definition.discipline}</p>
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {coreQuestions.map((question, index) => (
              <article className="min-h-40 bg-card p-6" key={question}>
                <span className="font-mono text-[9px] font-semibold text-foreground-muted">Q{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-serif text-xl font-semibold leading-7">{question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Schema anatomy</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{operativeProfile.title}</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {operativeProfile.fields.map((field, index) => {
              const Icon = profileIcons[index];
              return (
                <article className="min-h-56 bg-background p-5" key={field.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-semibold">{field.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">{field.question}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id={workedExample.id}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Worked formal comparison</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{workedExample.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{workedExample.purpose}</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Schema A</p>
                  <h3 className="mt-3 font-serif text-4xl font-semibold">Monoid</h3>
                </div>
                <Braces aria-hidden="true" className="h-7 w-7 text-foreground-muted" />
              </div>
              <p className="mt-6 text-sm leading-7 text-foreground-muted">{workedExample.monoid.entity}</p>
              <div className="mt-7 grid gap-5">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Required conditions</p>
                  <ul className="mt-3 grid gap-2">
                    {workedExample.monoid.admissibility.map((item) => (
                      <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Guaranteed</p>
                  <ul className="mt-3 grid gap-2">
                    {workedExample.monoid.guaranteedOperations.map((item) => (
                      <li className="text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Not guaranteed in a general monoid</p>
                  <ul className="mt-3 grid gap-2">
                    {workedExample.monoid.notGuaranteed.map((item) => (
                      <li className="text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="border border-foreground bg-primary p-6 text-primary-foreground sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">Schema B · promoted structure</p>
                  <h3 className="mt-3 font-serif text-4xl font-semibold">Group</h3>
                </div>
                <Network aria-hidden="true" className="h-7 w-7 text-primary-foreground-muted" />
              </div>
              <p className="mt-6 text-sm leading-7 text-primary-foreground-secondary">{workedExample.group.entity}</p>
              <div className="mt-7 border border-primary-foreground/20 bg-primary-foreground/[0.045] p-5">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">Added condition</p>
                <p className="mt-3 font-serif text-xl font-semibold leading-8">{workedExample.group.addedCondition}</p>
              </div>
              <div className="mt-7">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">Newly guaranteed</p>
                <ul className="mt-3 grid gap-3">
                  {workedExample.group.newlyGuaranteed.map((item) => (
                    <li className="border-l-2 border-primary-foreground/35 pl-4 text-sm leading-7 text-primary-foreground-secondary" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Boundary distinction</p>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{workedExample.boundaryDistinction}</p>
            </div>
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Schema lesson</p>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{workedExample.schemaLesson}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Research program</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Six things the atlas should make easier to inspect.</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(program).map(([key, value], index) => (
                <article className="bg-background p-5" key={key}>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-serif text-xl font-semibold capitalize">{key}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">{value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div>
            <ScanSearch aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Validation</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{validation.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{validation.comparisonShape}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 text-sm font-semibold leading-7">{validation.claimRule}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {validation.tests.map((item) => (
              <div className="border border-border bg-card p-5 text-sm leading-7 text-foreground-muted" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Hypotheses under test</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Research claims stay hypotheses until evidence promotes them.</h2>
            </div>
            <div className="grid gap-2">
              {researchHypotheses.map((item, index) => (
                <div className="grid grid-cols-[2.5rem_1fr] gap-3 border border-border bg-background p-5" key={item}>
                  <span className="font-mono text-[9px] font-semibold text-foreground-muted">H{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-7 text-foreground-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[#18232d] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-brand-gold" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Claim boundary</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimBoundary.title}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <article className="border border-white/15 bg-white/[0.035] p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Safe public claims</p>
              <ul className="mt-5 grid gap-3">
                {claimBoundary.safe.map((item) => (
                  <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="border border-brand-gold/35 p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">Not yet established</p>
              <ul className="mt-5 grid gap-3">
                {claimBoundary.notYetEstablished.map((item) => (
                  <li className="text-sm leading-7 text-white/62" key={item}>{item}</li>
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

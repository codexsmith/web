import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CloudSun,
  Crosshair,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers3,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  Waves,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/boundary-first-weather.json";

const mappingIcons = [Layers3, ScanLine, Waves, Gauge, ShieldCheck, Crosshair, Radar] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function WeatherLanding() {
  const {
    program,
    hero,
    openingClaim,
    scientificPosture,
    paradigm,
    forecastPipeline,
    weatherClosureObject,
    coreHypothesis,
    researchProgram,
    flagshipDemo,
    adaptiveRefinement,
    ensembleAnalysis,
    validationLadder,
    pilot,
    partners,
    claimFirewall,
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
            Research / computational program
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <CloudSun aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="pointer-events-none absolute -right-36 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full border border-primary-foreground/10" />
        <div className="pointer-events-none absolute -right-12 top-16 -z-10 h-80 w-80 rounded-full border border-primary-foreground/10" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.65fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
                {hero.eyebrow}
              </span>
              <span className="border border-primary-foreground/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
                {displayStatus(content.status)}
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-[5.4rem]">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-primary-foreground-secondary sm:text-xl">
              {hero.deck}
            </p>
            <p className="mt-5 max-w-3xl border-l-2 border-primary-foreground/30 pl-5 text-sm leading-7 text-primary-foreground-secondary">
              {hero.supporting}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary"
                href={`#${hero.primaryCta.target}`}
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </a>
              <a
                className="inline-flex min-h-12 items-center border border-primary-foreground/25 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                href={`#${hero.secondaryCta.target}`}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="border border-primary-foreground/20 bg-primary-foreground/[0.045] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
                Boundary-selective field
              </p>
              <Radar aria-hidden="true" className="h-4 w-4 text-primary-foreground-muted" />
            </div>
            <div className="relative mt-6 h-72 overflow-hidden border border-primary-foreground/15 bg-primary">
              <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-full border border-primary-foreground/20" />
              <div className="absolute left-[18%] top-[33%] h-36 w-52 rotate-[-9deg] rounded-[50%] border border-primary-foreground/15" />
              <div className="absolute right-[7%] top-[12%] h-40 w-40 rounded-full border border-primary-foreground/15" />
              <div className="absolute bottom-[17%] left-[6%] right-[7%] h-px rotate-[-10deg] bg-primary-foreground/25" />
              <div className="absolute bottom-[29%] left-[12%] right-[4%] h-px rotate-[-10deg] bg-primary-foreground/20" />
              <div className="absolute left-[42%] top-[28%] h-3 w-3 rounded-full border border-primary-foreground/55 bg-primary-foreground/15" />
              <div className="absolute left-[51%] top-[40%] h-2.5 w-2.5 rounded-full bg-primary-foreground/50" />
              <div className="absolute left-[60%] top-[48%] h-2 w-2 rounded-full bg-primary-foreground/35" />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                {['field', 'boundary', 'defect'].map((label, index) => (
                  <div className="border border-primary-foreground/15 bg-primary px-3 py-2" key={label}>
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-1 font-serif text-sm font-semibold capitalize">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-primary-foreground-secondary">
              {program.northStar}
            </p>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="boundary-first-weather" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Research posture</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">{openingClaim.title}</h2>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold leading-8">{openingClaim.callout}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {openingClaim.body.map((item, index) => (
              <article className="min-h-48 bg-card p-6 sm:p-7" key={item}>
                <span className="font-mono text-[9px] font-semibold text-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-5 text-sm leading-7 text-foreground-muted">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Scientific relationship</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{scientificPosture.title}</h2>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <article className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Established base layer</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {scientificPosture.baseLayer.map((item) => <li className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>)}
              </ul>
            </article>
            <article className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Boundary First layer</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {scientificPosture.boundaryFirstLayer.map((item) => <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
          <p className="mt-5 max-w-5xl border-l-2 border-foreground/30 pl-5 text-sm leading-7 text-foreground-muted">{scientificPosture.rule}</p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Volumetric mapping</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{paradigm.title}</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {paradigm.mapping.map((item, index) => {
                const Icon = mappingIcons[index];
                return (
                  <article className="bg-card p-6" key={item.boundaryFirst}>
                    <div className="flex items-center justify-between gap-4">
                      <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                      <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-semibold">{item.boundaryFirst}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.weather}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <GitBranch aria-hidden="true" className="h-6 w-6 text-primary-foreground-muted" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">Forecast chain</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{forecastPipeline.title}</h2>
              <p className="mt-5 text-base leading-8 text-primary-foreground-secondary">{forecastPipeline.boundaryFirstQuestion}</p>
            </div>
            <div className="border border-primary-foreground/20 bg-primary-foreground/[0.045] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase leading-7 tracking-[0.12em] text-primary-foreground-secondary">{forecastPipeline.compact}</p>
              <div className="mt-7 border-t border-primary-foreground/15 pt-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">Bounded simulation object</p>
                <p className="mt-3 font-serif text-3xl font-semibold">{weatherClosureObject.notation}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {weatherClosureObject.plainLanguage.map((item) => (
                    <div className="border border-primary-foreground/15 p-3" key={item.symbol}>
                      <span className="font-serif text-xl font-semibold">{item.symbol}</span>
                      <p className="mt-1 text-xs leading-5 text-primary-foreground-secondary">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <FlaskConical aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Core hypothesis</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{coreHypothesis.title}</h2>
          </div>
          <div className="grid gap-4">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="text-lg leading-8 text-foreground-muted">{coreHypothesis.statement}</p>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">{coreHypothesis.implication}</p>
            </article>
            <article className="border-l-2 border-accent bg-card/55 px-6 py-5 sm:px-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Falsifiable test</p>
              <p className="mt-3 font-serif text-xl font-semibold leading-8">{coreHypothesis.test}</p>
            </article>
            <div className="grid gap-2 sm:grid-cols-2">
              {coreHypothesis.doesNotClaim.map((item) => (
                <div className="border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground-muted" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20" id={researchProgram.id}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Research ladder</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{researchProgram.title}</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {researchProgram.levels.map((level) => (
              <article className="bg-background p-6" key={level.id}>
                <span className="font-mono text-[10px] font-semibold text-foreground-muted">{level.id}</span>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{level.name}</h3>
                <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">Claim ceiling · {level.claimCeiling}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id={flagshipDemo.id}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Activity aria-hidden="true" className="h-6 w-6 text-primary-foreground-muted" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">Planned demonstrator</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{flagshipDemo.title}</h2>
              <p className="mt-5 text-base leading-8 text-primary-foreground-secondary">{flagshipDemo.subtitle}</p>
              <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold">{flagshipDemo.desiredReaction}</p>
            </div>
            <div className="border border-primary-foreground/20 bg-primary-foreground/[0.045] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">{flagshipDemo.model}</p>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary-foreground-muted">{displayStatus(flagshipDemo.status)}</span>
              </div>
              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {flagshipDemo.scenes.map((scene, index) => (
                  <div className="border border-primary-foreground/15 p-4" key={scene}>
                    <span className="font-mono text-[8px] text-primary-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-2 font-serif text-lg font-semibold">{scene}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <Target aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Adaptive computation</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{adaptiveRefinement.title}</h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">{adaptiveRefinement.claimRule}</p>
            </div>
            <div>
              <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                {adaptiveRefinement.loop.map((item, index) => (
                  <div className="bg-card p-5" key={item}>
                    <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-3 font-serif text-lg font-semibold capitalize">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {adaptiveRefinement.evaluation.map((item) => <span className="border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted" key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <article className="border border-border bg-background p-6 sm:p-8">
            <Sparkles aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-5 font-serif text-3xl font-semibold">{ensembleAnalysis.title}</h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {ensembleAnalysis.possibleOutputs.map((item) => <div className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</div>)}
            </div>
            <p className="mt-6 text-sm leading-7 text-foreground-muted">{ensembleAnalysis.claimBoundary}</p>
          </article>
          <article className="border border-border bg-background p-6 sm:p-8">
            <ShieldCheck aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-5 font-serif text-3xl font-semibold">{validationLadder.title}</h2>
            <ol className="mt-6 grid gap-2">
              {validationLadder.stages.map((item, index) => (
                <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border pb-3 text-sm leading-7 text-foreground-muted" key={item}>
                  <span className="font-mono text-[9px]">{String(index + 1).padStart(2, '0')}</span><span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-serif text-lg font-semibold">{validationLadder.promotionRule}</p>
          </article>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Pilot boundary</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{pilot.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{pilot.primaryQuestion}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold">{pilot.important}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {pilot.deliverables.map((item, index) => (
              <div className="bg-card p-5" key={item}><span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span><p className="mt-3 text-sm leading-7 text-foreground-muted">{item}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{partners.title}</h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">{partners.principle}</p>
              <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold">{partners.ask}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.categories.map((item) => <div className="border border-border bg-background p-5 font-serif text-lg font-semibold" key={item}>{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground bg-background px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Claim firewall</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">{claimFirewall.title}</h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Supported now</p>
              <ul className="mt-5 grid gap-3">{claimFirewall.allowed.map((item) => <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>)}</ul>
            </article>
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Not established</p>
              <ul className="mt-5 grid gap-3">{claimFirewall.notAllowedYet.map((item) => <li className="border-l-2 border-foreground/30 pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">Boundary First Weather</p>
          <h2 className="mt-6 max-w-5xl font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-6xl">{closing.title}</h2>
          <p className="mt-7 max-w-4xl border-l-2 border-accent pl-5 text-lg leading-8 text-primary-foreground-secondary sm:text-xl">{closing.finalLine}</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Eye,
  FileSearch,
  Gavel,
  GitBranch,
  Landmark,
  Network,
  RotateCcw,
  Scale,
  ScanSearch,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/constitutional-law-and-jurisprudence.json";

const processIcons = [Landmark, FileSearch, ShieldCheck, Gavel, Scale, Eye, ScanSearch, RotateCcw, Network] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function LawLanding() {
  const {
    program,
    legalNotice,
    hero,
    openingClaim,
    constitutionalBaseline,
    claimRegimes,
    boundaryFirstJurisprudence,
    legalProcessModel,
    distinctionSystem,
    controlledCompression,
    dueProcessBridge,
    standingBridge,
    privatePower,
    proposedJustificationTest,
    flagshipDemo,
    repair,
    researchLanes,
    legalDiagnostic,
    lawyerCollaboration,
    claimFirewall,
    citations,
    notThis,
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
            Research / jurisprudence
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            <Scale aria-hidden="true" className="h-3.5 w-3.5" />
            Governed public landing
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[40rem] w-[40rem] rounded-full border border-primary-foreground/10" />

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
            <p className="mt-5 max-w-3xl border-l-2 border-primary-foreground/30 pl-5 font-serif text-xl font-semibold leading-8 text-primary-foreground-secondary">
              {hero.pullQuote}
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
                Consequence trace
              </p>
              <GitBranch aria-hidden="true" className="h-4 w-4 text-primary-foreground-muted" />
            </div>
            <div className="mt-7 grid gap-0">
              {legalProcessModel.chain.slice(0, 5).map((item, index) => (
                <div className="grid grid-cols-[2.5rem_1fr] items-stretch" key={item}>
                  <div className="relative flex justify-center">
                    <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary font-mono text-[8px] font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {index < 4 ? <span className="absolute bottom-0 top-7 w-px bg-primary-foreground/20" /> : null}
                  </div>
                  <div className="min-h-14 pb-4">
                    <p className="font-serif text-lg font-semibold">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-primary-foreground-secondary">
                      {index === 4 ? 'Where does the consequence actually land?' : 'Keep authority and representation reconstructable.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-primary-foreground/15 pt-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">Core question</p>
              <p className="mt-3 text-sm leading-7 text-primary-foreground-secondary">{program.coreQuestion}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-foreground bg-card/70 px-5 py-7 sm:px-8" id="legal-notice">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <div className="flex items-center gap-3">
              <TriangleAlert aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Legal notice · research boundary</p>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">{legalNotice.title}</h2>
          </div>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-foreground-muted">{legalNotice.body}</p>
            <ul className="mt-5 grid gap-2 md:grid-cols-2">
              {legalNotice.rules.map((rule) => <li className="border-l-2 border-foreground/35 pl-4 text-xs leading-6 text-foreground-muted" key={rule}>{rule}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <PublicLandingRail currentId="constitutional-law-and-jurisprudence" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Operating premise</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">{openingClaim.title}</h2>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold leading-8">{openingClaim.closing}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {openingClaim.body.map((item, index) => (
              <article className="min-h-40 bg-card p-6" key={item}>
                <span className="font-mono text-[9px] font-semibold text-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-5 font-serif text-xl font-semibold leading-8">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Current-law baseline</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{constitutionalBaseline.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{constitutionalBaseline.intro}</p>
          </div>
          <div className="mt-9 grid gap-3 lg:grid-cols-2">
            {constitutionalBaseline.anchors.map((anchor) => (
              <article className="border border-border bg-background p-6" id={anchor.id} key={anchor.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{displayStatus(anchor.status)}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-muted">{anchor.sourceKeys.join(' · ')}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{anchor.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{anchor.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-lg font-semibold leading-8">{constitutionalBaseline.rule}</p>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id={claimRegimes.id}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <BookOpen aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Claim discipline</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{claimRegimes.title}</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{claimRegimes.displayRule}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {claimRegimes.types.map((type, index) => (
              <div className="min-h-36 bg-card p-5" key={type.id}>
                <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-5 font-serif text-lg font-semibold leading-7">{type.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <Scale aria-hidden="true" className="h-6 w-6 text-primary-foreground-muted" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">Proposed jurisprudence</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{boundaryFirstJurisprudence.title}</h2>
              <p className="mt-5 text-base leading-8 text-primary-foreground-secondary">{boundaryFirstJurisprudence.definition}</p>
            </div>
            <div>
              <div className="grid gap-2 sm:grid-cols-2">
                {boundaryFirstJurisprudence.questions.map((question, index) => (
                  <div className="border border-primary-foreground/15 bg-primary-foreground/[0.035] p-4" key={question}>
                    <span className="font-mono text-[8px] text-primary-foreground-muted">Q{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-sm leading-6 text-primary-foreground-secondary">{question}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {boundaryFirstJurisprudence.maxims.map((maxim) => <span className="border border-primary-foreground/20 px-3 py-2 font-mono text-[9px] uppercase leading-5 tracking-[0.1em] text-primary-foreground-secondary" key={maxim}>{maxim}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Process model</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{legalProcessModel.title}</h2>
            <p className="mt-5 font-serif text-2xl font-semibold">{legalProcessModel.compactObject}</p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {legalProcessModel.chain.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <article className="bg-card p-6" key={item}>
                  <div className="flex items-center justify-between gap-4"><Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" /><span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span></div>
                  <h3 className="mt-7 font-serif text-2xl font-semibold">{item}</h3>
                </article>
              );
            })}
          </div>
          <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold">{legalProcessModel.closureRule}</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <article className="border border-border bg-background p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">{distinctionSystem.title}</h2>
            <div className="mt-6 flex flex-wrap gap-2">{distinctionSystem.examples.map((item) => <span className="border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted" key={item}>{item}</span>)}</div>
            <p className="mt-6 text-sm leading-7 text-foreground-muted">{distinctionSystem.researchQuestion}</p>
          </article>
          <article className="border border-border bg-background p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">{controlledCompression.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{controlledCompression.body}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold leading-8">{controlledCompression.candidateDoctrine}</p>
            <p className="mt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">{controlledCompression.statusOfCandidate}</p>
          </article>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          <article className="border border-border bg-card p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Doctrine bridge</p>
            <h2 className="mt-4 font-serif text-2xl font-semibold">{dueProcessBridge.title}</h2>
            <ol className="mt-5 grid gap-2">{dueProcessBridge.mathewsFactors.map((item, index) => <li className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-7 text-foreground-muted" key={item}><span className="font-mono text-[9px]">{index + 1}</span><span>{item}</span></li>)}</ol>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{dueProcessBridge.boundaryFirstExtension}</p>
          </article>
          <article className="border border-border bg-card p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Limited analogy</p>
            <h2 className="mt-4 font-serif text-2xl font-semibold">{standingBridge.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{standingBridge.currentDoctrine}</p>
            <div className="mt-5 grid gap-2">{Object.entries(standingBridge.analogy).map(([key, value]) => <div className="flex items-center justify-between gap-4 border-b border-border pb-2 text-sm" key={key}><span className="font-mono text-[9px] uppercase text-foreground-muted">{key}</span><span>{value}</span></div>)}</div>
            <p className="mt-5 text-xs leading-6 text-foreground-muted">{standingBridge.criticalBoundary}</p>
          </article>
          <article className="border border-border bg-card p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Private power</p>
            <h2 className="mt-4 font-serif text-2xl font-semibold">{privatePower.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{privatePower.currentLaw}</p>
            <div className="mt-5 border-l-2 border-accent pl-4"><p className="font-serif text-xl font-semibold">{privatePower.proposedConcept.name}</p><p className="mt-2 text-sm leading-7 text-foreground-muted">{privatePower.proposedConcept.definition}</p></div>
            <p className="mt-5 text-xs leading-6 text-foreground-muted">{privatePower.warning}</p>
          </article>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Proposed test</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{proposedJustificationTest.title}</h2>
            <p className="mt-5 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">{displayStatus(proposedJustificationTest.status)}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {proposedJustificationTest.questions.map((item, index) => <div className="min-h-32 bg-background p-4" key={item}><span className="font-mono text-[8px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span><p className="mt-4 font-serif text-lg font-semibold">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id={flagshipDemo.id}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">{flagshipDemo.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{flagshipDemo.title}</h2>
              <p className="mt-5 text-base leading-8 text-primary-foreground-secondary">{flagshipDemo.subtitle}</p>
              <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl font-semibold">{flagshipDemo.desiredReaction}</p>
            </div>
            <div>
              <div className="grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-5">
                {flagshipDemo.sequence.map((item, index) => <div className="bg-primary p-4" key={item}><span className="font-mono text-[8px] text-primary-foreground-muted">{String(index + 1).padStart(2, '0')}</span><p className="mt-3 font-serif text-lg font-semibold">{item}</p></div>)}
              </div>
              <p className="mt-5 border border-primary-foreground/15 bg-primary-foreground/[0.035] p-5 text-xs leading-6 text-primary-foreground-secondary">{flagshipDemo.legalBoundary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <RotateCcw aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Repair</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{repair.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{repair.important}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{repair.classes.map((item, index) => <div className="min-h-32 bg-card p-5" key={item}><span className="font-mono text-[8px] text-foreground-muted">{String(index + 1).padStart(2, '0')}</span><p className="mt-4 font-serif text-xl font-semibold">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <article className="border border-border bg-background p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">{researchLanes.title}</h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">{researchLanes.lanes.map((item) => <div className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={item}>{item}</div>)}</div>
          </article>
          <article className="border border-border bg-background p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">{legalDiagnostic.title}</h2>
            <div className="mt-6 grid max-h-[30rem] gap-2 overflow-auto pr-2">{legalDiagnostic.questions.map((item, index) => <div className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border pb-2 text-sm leading-7 text-foreground-muted" key={item}><span className="font-mono text-[8px]">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></div>)}</div>
            <div className="mt-6 flex flex-wrap gap-2">{legalDiagnostic.output.map((item) => <span className="border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted" key={item}>{item}</span>)}</div>
          </article>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Users aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Adversarial review</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{lawyerCollaboration.title}</h2>
          </div>
          <div className="border border-border bg-card p-6 sm:p-8">
            <p className="text-base leading-8 text-foreground-muted">{lawyerCollaboration.premise}</p>
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-2xl font-semibold">{lawyerCollaboration.primaryAsk.label}</p>
            <p className="mt-3 pl-5 text-sm leading-7 text-foreground-muted">{lawyerCollaboration.primaryAsk.description}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground bg-card/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3"><TriangleAlert aria-hidden="true" className="h-5 w-5 text-foreground-muted" /><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Claim firewall</p></div>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">{claimFirewall.title}</h2>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">{claimFirewall.items.map((item) => <div className="border border-border bg-background p-5 text-sm leading-7 text-foreground-muted" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <BookOpen aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Source discipline</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Primary law before analogy.</h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">{citations.strategy}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">{Object.entries(citations.sourceKeys).map(([key, value]) => <div className="border border-border bg-card p-4" key={key}><p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{key}</p><p className="mt-2 text-sm leading-6">{value}</p></div>)}</div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{notThis.title}</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{notThis.items.map((item) => <div className="bg-background p-5 font-mono text-[10px] uppercase leading-6 tracking-[0.1em] text-foreground-muted" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">{closing.eyebrow}</p>
          <h2 className="mt-6 max-w-5xl font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-6xl">{closing.title}</h2>
          <p className="mt-7 max-w-4xl text-base leading-8 text-primary-foreground-secondary">{closing.body}</p>
          <p className="mt-7 max-w-4xl border-l-2 border-accent pl-5 font-serif text-2xl font-semibold">{closing.finalLine}</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

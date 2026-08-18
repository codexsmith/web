import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Boxes,
  Braces,
  CheckCircle2,
  Code2,
  Eye,
  GitBranch,
  Layers3,
  Network,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Split,
  TriangleAlert,
  Wrench,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicLandingRail } from "./PublicLandingRail";
import content from "@/content/product-landing-pages/software-before-code.json";

const questionIcons = [
  Layers3,
  Split,
  Network,
  ShieldCheck,
  GitBranch,
  CheckCircle2,
  TriangleAlert,
  Eye,
  RefreshCw,
] as const;

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function SoftwareBeforeCodeLanding() {
  const {
    product,
    hero,
    opening,
    coreObject,
    problem,
    notBigDesignUpFront,
    nineQuestions,
    method,
    deliverySkeleton,
    controlledForgetting,
    flagship,
    booleanChallenge,
    diagnostics,
    architecture,
    agile,
    closure,
    ai,
    validation,
    practiceLevels,
    workbench,
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
        <div className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[34rem] w-[34rem] rounded-full border border-primary-foreground/10" />
        <div className="pointer-events-none absolute -right-4 top-8 -z-10 h-72 w-72 rounded-full border border-primary-foreground/10" />

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
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-[5.4rem]">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-primary-foreground-secondary sm:text-xl">
              {hero.deck}
            </p>
            <p className="mt-5 max-w-3xl border-l-2 border-primary-foreground/30 pl-5 text-sm leading-7 text-primary-foreground-secondary">
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
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
                Software object trace
              </p>
              <GitBranch aria-hidden="true" className="h-4 w-4 text-primary-foreground-muted" />
            </div>
            <div className="mt-7 grid gap-0">
              {coreObject.chain.map((item, index) => (
                <div className="grid grid-cols-[2.5rem_1fr] items-stretch" key={item}>
                  <div className="relative flex justify-center">
                    <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary font-mono text-[8px] font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < coreObject.chain.length - 1 ? (
                      <span className="absolute bottom-0 top-7 w-px bg-primary-foreground/20" />
                    ) : null}
                  </div>
                  <div className="min-h-16 pb-5">
                    <p className="font-serif text-lg font-semibold">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-primary-foreground-secondary">
                      {index === coreObject.chain.length - 1
                        ? "The claim closes against a recognizable consequence."
                        : "Preserve what the next transition still needs to know."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-primary-foreground/15 pt-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
                Engineering maxim
              </p>
              <p className="mt-3 font-serif text-xl font-semibold leading-8">
                {product.engineeringMaxim}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="software-before-code" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Method profile
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {opening.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-foreground-muted">
              {opening.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {product.classification.map((item) => (
                <span
                  className="border border-border bg-card px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Primary line
              </p>
              <p className="mt-4 font-serif text-3xl font-semibold leading-[1.08] sm:text-4xl">
                {product.primaryLine}
              </p>
              <p className="mt-5 text-base leading-8 text-foreground-muted">
                {product.secondaryLine}
              </p>
            </article>
            <article className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Core proposition
              </p>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-foreground-muted">
                {product.coreProposition}
              </p>
            </article>
            <article className="border-l-2 border-accent bg-card/55 px-6 py-5 sm:px-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Quality rule
              </p>
              <p className="mt-3 font-serif text-xl font-semibold leading-8">
                {coreObject.qualityRule}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Representation before mechanism
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {problem.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              {problem.diagnosis}
            </p>
          </div>

          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {problem.examples.map((item, index) => (
              <div className="min-h-28 bg-background p-5" key={item}>
                <span className="font-mono text-[9px] font-semibold text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 font-serif text-xl font-semibold">{item}</p>
              </div>
            ))}
          </div>

          <article className="mt-6 grid gap-6 border border-border bg-background p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
            <ScanSearch aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {notBigDesignUpFront.title}
              </p>
              <p className="mt-3 max-w-4xl text-base leading-8 text-foreground-muted">
                {notBigDesignUpFront.body}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Boundary questions
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
                Nine questions before architecture hardens.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-foreground-muted">
              These questions locate the object the software is supposed to preserve before implementation choices turn uncertainty into structure.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {nineQuestions.map((item, index) => {
              const Icon = questionIcons[index];
              return (
                <article className="min-h-60 bg-card p-6" key={item.name}>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] font-semibold text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">{item.question}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20" id={method.id}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1.42fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              The method
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {method.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              Move from domain uncertainty toward executable closure without pretending implementation is the first form of understanding.
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2">
            {method.steps.map((item, index) => (
              <li
                className="group grid min-h-36 grid-cols-[3rem_1fr] gap-4 border border-border bg-background p-5"
                key={item}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border font-mono text-[9px] font-semibold text-foreground-muted transition-colors group-hover:border-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-xl font-semibold leading-7">{item}</p>
                  <span className="mt-4 block h-px w-10 bg-border" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <Boxes aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Delivery skeleton
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              {deliverySkeleton.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              The first executable path should be small enough to change and real enough to reveal whether the representation survives contact with the domain.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {deliverySkeleton.requirements.map((item, index) => (
              <li
                className="grid min-h-28 grid-cols-[2.5rem_1fr] gap-3 bg-card p-5 text-sm leading-7 text-foreground-muted"
                key={item}
              >
                <span className="font-mono text-[9px] font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
              Controlled forgetting
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {controlledForgetting.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-primary-foreground-secondary">
              {controlledForgetting.body}
            </p>
            <p className="mt-7 border-l-2 border-accent pl-5 font-serif text-xl font-semibold leading-8">
              {controlledForgetting.line}
            </p>
          </div>

          <div className="border border-primary-foreground/20 bg-primary-foreground/[0.035] p-6 sm:p-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
              Compression path
            </p>
            <div className="mt-7 grid gap-3">
              {["World", "Domain", "Representation", "Interface", "Witness"].map((item, index) => (
                <div
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border border-primary-foreground/15 px-4 py-4"
                  key={item}
                >
                  <span className="font-mono text-[9px] font-semibold text-primary-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg font-semibold">{item}</span>
                  {index < 4 ? <ArrowRight aria-hidden="true" className="h-4 w-4 text-primary-foreground-muted" /> : <Eye aria-hidden="true" className="h-4 w-4 text-primary-foreground-muted" />}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-primary-foreground-secondary">
              {controlledForgetting.rule}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Worked example
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{flagship.title}</h2>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold">{flagship.challenge}</p>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">{flagship.publicationLine}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
            <article className="border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Binary aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Naive representation
                </p>
              </div>
              <div className="mt-6 grid gap-3">
                {flagship.naiveRepresentations.map((item) => (
                  <div className="border border-border bg-background px-4 py-4 font-mono text-xs" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-7 text-sm leading-7 text-foreground-muted">{booleanChallenge.body}</p>
            </article>

            <article className="border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                    Hidden distinctions
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold">The state machine the boolean forgot.</h3>
                </div>
                <Braces aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {flagship.hiddenDistinctions.map((item) => (
                  <span className="border border-border bg-card px-3 py-2 text-xs leading-5 text-foreground-muted" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <article className="mt-4 border border-border bg-card/45 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Protected invariants
              </p>
            </div>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {flagship.protectedInvariants.map((item) => (
                <li className="border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Diagnostic grammar
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Defects are clues about representation.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              Recurring implementation smells often point upward toward an omitted state, authority, transition rule, witness, or repair path.
            </p>
          </div>

          <div className="mt-9 overflow-hidden border border-border">
            <div className="hidden grid-cols-[0.7fr_1fr_1fr] gap-px bg-border font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted md:grid">
              <div className="bg-card px-5 py-4">Smell</div>
              <div className="bg-card px-5 py-4">Likely defect</div>
              <div className="bg-card px-5 py-4">Repair</div>
            </div>
            {diagnostics.map((item, index) => (
              <article
                className="grid gap-4 border-t border-border bg-background p-5 first:border-t-0 md:grid-cols-[0.7fr_1fr_1fr] md:gap-8"
                key={item.smell}
              >
                <div>
                  <span className="font-mono text-[9px] font-semibold text-foreground-muted md:hidden">SMELL</span>
                  <p className="mt-1 font-serif text-lg font-semibold md:mt-0">{item.smell}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] font-semibold text-foreground-muted md:hidden">DEFECT</span>
                  <p className="mt-1 text-sm leading-7 text-foreground-muted md:mt-0">{item.likelyDefect}</p>
                </div>
                <div className="flex gap-3">
                  <Wrench aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground-muted" />
                  <p className="text-sm leading-7 text-foreground-muted">{item.repair}</p>
                </div>
                <span className="sr-only">Diagnostic {index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {[architecture, agile, ai].map((item, index) => {
              const Icon = [Network, RefreshCw, Sparkles][index];
              return (
                <article className="bg-background p-6 sm:p-8" key={item.title}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                  <h2 className="mt-7 font-serif text-3xl font-semibold leading-[1.08]">{item.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-foreground-muted">{item.body}</p>
                </article>
              );
            })}
            <article className="bg-primary p-6 text-primary-foreground sm:p-8">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-primary-foreground-muted" />
              <h2 className="mt-7 font-serif text-3xl font-semibold leading-[1.08]">{closure.title}</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {closure.tests.map((item) => (
                  <li className="border-l-2 border-primary-foreground/25 pl-4 text-sm leading-7 text-primary-foreground-secondary" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Validation posture
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Make the method earn stronger claims.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{validation.claimRule}</p>
            <article className="mt-7 border-l-2 border-accent bg-background px-6 py-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Immediate experiment
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{validation.immediateExperiment}</p>
            </article>
          </div>

          <div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {validation.ladder.map((item, index) => (
                <li className="grid min-h-24 grid-cols-[2.5rem_1fr] items-start gap-3 border border-border bg-background p-5" key={item}>
                  <span className="font-mono text-[9px] font-semibold text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-lg font-semibold">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 border border-border bg-background p-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Practice levels</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {practiceLevels.levels.map((item) => (
                  <span className="border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em]" key={item}>{item}</span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-foreground-muted">{practiceLevels.status}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Workbench artifacts
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {workbench.artifacts.map((item) => (
                  <div className="border border-border bg-background px-4 py-3 font-mono text-[10px] text-foreground-muted" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Future tools
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {workbench.futureTools.map((item) => (
                  <li className="text-sm leading-7 text-foreground-muted" key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <X aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  What this is not
                </p>
              </div>
              <ul className="mt-6 grid gap-3">
                {notThis.map((item) => (
                  <li className="border-l-2 border-border pl-4 text-sm leading-7 text-foreground-muted" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
            {closing.eyebrow}
          </p>
          <h2 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] sm:text-7xl">
            {closing.title}
          </h2>
          <p className="mt-7 max-w-4xl border-l-2 border-accent pl-5 text-lg leading-8 text-primary-foreground-secondary sm:text-xl">
            {closing.finalLine}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary"
              href={`#${method.id}`}
            >
              Read the method again
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </a>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/25 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
              href="/software"
            >
              Software overview
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

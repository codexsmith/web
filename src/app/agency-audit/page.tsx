import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  ShieldCheck,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import audit from "@/content/product-landing-pages/agency-representation-audit.json";

export const metadata: Metadata = {
  title: "Agency & Representation Audit | Boundary First Labs",
  description:
    "A bounded systems audit for reconstructing authority, representation, consequence, contestability, and repair in consequential software, AI, and institutional processes.",
};

const auditOutputs = audit.method.passes.map((pass) => pass.output);

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
      {children}
    </span>
  );
}

export default function AgencyAuditPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="border-b border-border bg-card/40 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex min-h-9 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
            href="/products/current/agency-representation-audit"
          >
            <ArrowLeft aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
            Products / current work
          </Link>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            Pilot service · one bounded process
          </span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.55fr)] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <MonoLabel>{audit.hero.eyebrow}</MonoLabel>
              <span className="border border-accent/60 bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground">
                Pilot intake
              </span>
            </div>

            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.04em] sm:text-7xl">
              {audit.hero.headline}
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-foreground-muted sm:text-xl">
              {audit.hero.support}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                href={audit.hero.primaryCta.href}
              >
                {audit.hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center border border-border bg-card/45 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground"
                href={`#${audit.hero.secondaryCta.target}`}
              >
                {audit.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="border border-border bg-card/55">
            <div className="border-b border-border px-5 py-4">
              <MonoLabel>Audit instrument</MonoLabel>
            </div>
            <dl className="divide-y divide-border">
              <div className="grid gap-2 px-5 py-5 sm:grid-cols-[8.5rem_1fr]">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Unit of analysis
                </dt>
                <dd className="font-serif text-lg font-semibold leading-6">
                  One bounded consequential process
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-5 sm:grid-cols-[8.5rem_1fr]">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Evidence rule
                </dt>
                <dd className="text-sm leading-6 text-foreground-muted">
                  Artifact, declared rule, executable behavior, stakeholder account, or labeled inference.
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-5 sm:grid-cols-[8.5rem_1fr]">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Primary result
                </dt>
                <dd className="text-sm leading-6 text-foreground-muted">
                  Reconstructable maps plus a prioritized defect register with ownership gaps made explicit.
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14">
          <div>
            <MonoLabel>At a glance</MonoLabel>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.03] sm:text-4xl">
              {audit.executiveBrief.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              {audit.executiveBrief.summary}
            </p>
          </div>

          <div>
            <div className="grid border border-border md:grid-cols-2">
              {audit.executiveBrief.questions.map((question, index) => (
                <div
                  className="min-h-32 border-b border-border p-5 last:border-b-0 md:border-r md:[&:nth-child(even)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                  key={question}
                >
                  <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
                    Q{String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-serif text-lg font-semibold leading-6">{question}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">
              {audit.executiveBrief.decisionUse}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/35 px-5 py-14 sm:px-8 sm:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
            <div>
              <MonoLabel>Why audit the chain</MonoLabel>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.03] sm:text-4xl">
                {audit.problem.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-foreground-muted">
                {audit.problem.body}
              </p>
            </div>

            <div className="border border-border bg-background">
              <div className="border-b border-border px-5 py-4">
                <MonoLabel>Typical defect signatures</MonoLabel>
              </div>
              <ul className="grid md:grid-cols-2">
                {audit.problem.failureModes.map((mode) => (
                  <li
                    className="flex gap-3 border-b border-border px-5 py-4 text-sm leading-6 text-foreground-muted md:border-r md:[&:nth-child(even)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                    key={mode}
                  >
                    <CircleDot aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{mode}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id={audit.method.id}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <MonoLabel>Method</MonoLabel>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
                {audit.method.title}
              </h2>
            </div>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Authority → representation → consequence → contest → repair
            </span>
          </div>

          <ol className="mt-9 grid border border-border lg:grid-cols-5">
            {audit.method.passes.map((pass, index) => (
              <li
                className="relative min-h-72 border-b border-border p-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
                key={pass.name}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] font-semibold tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight">
                  {pass.name.replace(/^\d+\.\s*/, "")}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{pass.question}</p>
                <div className="mt-7 border-t border-border pt-4">
                  <MonoLabel>Output</MonoLabel>
                  <p className="mt-2 text-sm font-semibold leading-6">{pass.output}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 border-l-2 border-accent bg-card/35 px-5 py-5 sm:grid-cols-[9rem_1fr] sm:px-6">
            <MonoLabel>Closure test</MonoLabel>
            <p className="text-sm leading-7 text-foreground-muted">{audit.method.closureTest}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/35 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <MonoLabel>Pilot fit</MonoLabel>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">
            {audit.candidateWork.title}
          </h2>

          <div className="mt-9 grid border border-border bg-background lg:grid-cols-2">
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r sm:p-7">
              <div className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-accent" />
                <MonoLabel>Good fit</MonoLabel>
              </div>
              <ul className="mt-5 space-y-3">
                {audit.candidateWork.goodFit.map((item) => (
                  <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={item}>
                    <span className="mt-[0.72rem] h-1 w-1 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <X aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                <MonoLabel>Not yet a fit</MonoLabel>
              </div>
              <ul className="mt-5 space-y-3">
                {audit.candidateWork.notYetFit.map((item) => (
                  <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={item}>
                    <span className="mt-[0.72rem] h-1 w-1 shrink-0 bg-foreground-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {audit.candidateWork.examples.map((example) => (
              <span
                className="border border-border bg-background px-3 py-2 font-mono text-[9px] uppercase tracking-[0.08em] text-foreground-muted"
                key={example}
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[minmax(14rem,0.52fr)_minmax(0,1.48fr)] lg:gap-14">
            <div>
              <MonoLabel>Pilot engagement</MonoLabel>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02]">
                {audit.firstAsk.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">{audit.firstAsk.shape}</p>
            </div>

            <div>
              <div className="grid border border-border md:grid-cols-2">
                <div className="border-b border-border p-6 md:border-b-0 md:border-r sm:p-7">
                  <MonoLabel>What you bring</MonoLabel>
                  <ul className="mt-5 space-y-3">
                    {audit.firstAsk.whatYouBring.map((item) => (
                      <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={item}>
                        <span className="mt-[0.72rem] h-1 w-1 shrink-0 bg-foreground-muted" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card/45 p-6 sm:p-7">
                  <MonoLabel>What you receive</MonoLabel>
                  <ul className="mt-5 space-y-3">
                    {audit.firstAsk.whatYouReceive.map((item) => (
                      <li className="flex gap-3 text-sm leading-7" key={item}>
                        <Check aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 border-l-2 border-accent pl-5">
                <MonoLabel>Evidence rule</MonoLabel>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">{audit.firstAsk.evidenceRule}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1.38fr)] lg:gap-14">
          <div>
            <div className="flex items-center gap-2 text-primary-foreground-muted">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em]">
                Claim boundary
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.03] sm:text-4xl">
              {audit.claimBoundary.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-primary-foreground-secondary">
              {audit.claimBoundary.body}
            </p>
          </div>

          <div>
            <div className="grid border border-primary-foreground/20 sm:grid-cols-2">
              {audit.claimBoundary.doesNotProvide.map((item) => (
                <div
                  className="border-b border-primary-foreground/20 p-4 text-sm leading-6 text-primary-foreground-secondary sm:border-r sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-primary-foreground/45 pl-5 text-sm leading-7 text-primary-foreground-secondary">
              {audit.claimBoundary.claimRule}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl border border-border bg-card/40 p-7 sm:p-10 lg:p-12">
          <MonoLabel>{audit.closing.eyebrow}</MonoLabel>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.55fr)] lg:items-end">
            <div>
              <h2 className="max-w-5xl font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-6xl">
                {audit.closing.title}
              </h2>
              <p className="mt-6 max-w-4xl border-l-2 border-accent pl-5 text-lg leading-8 text-foreground-muted">
                {audit.closing.finalLine}
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                href={audit.cta.href}
              >
                {audit.cta.label}
                <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
              </Link>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted">
                {auditOutputs.length} mapped outputs · one declared scope
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

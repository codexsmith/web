import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Network } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import acceptance from "@/content/architecture_acceptance_v0_1.json";

export const metadata: Metadata = {
  title: "Architecture Acceptance",
  description:
    "Boundary First Labs outer-architecture acceptance criteria, structural invariants, runtime verification, review status, and human validation boundaries.",
  alternates: { canonical: "/trust/architecture" },
};

type EvidenceLink = { label: string; href: string };
type Criterion = {
  id: string;
  outcome: string;
  state: string;
  note: string;
  evidence: EvidenceLink[];
};

export default function ArchitectureAcceptancePage() {
  const criteria = acceptance.criteria as Criterion[];
  const runtimeStatus = acceptance.validation.runtimeStatus;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
            Architecture acceptance
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Inspect the architecture against the promise it is meant to keep.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground-secondary">
            {acceptance.statement}
          </p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Visitor disclosure
            </p>
            <ol className="mt-5 space-y-3">
              {acceptance.visitorDisclosureSequence.map((item, index) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="grid h-7 w-7 place-items-center border border-border font-mono text-[9px]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Institutional promotion
            </p>
            <ol className="mt-5 space-y-3">
              {acceptance.institutionalPromotionSequence.map((item, index) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="grid h-7 w-7 place-items-center border border-border font-mono text-[9px]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Definition of done
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">Runtime verified; human acceptance still open.</h2>
            </div>
            <span className="hidden border border-border bg-background px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] md:block">
              {acceptance.status.replaceAll("-", " ")}
            </span>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {criteria.map((criterion) => (
              <article className="bg-background p-6" key={criterion.id}>
                <div className="flex items-start gap-3">
                  <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-foreground-muted">
                      {criterion.state.replaceAll("-", " ")}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold leading-8">{criterion.outcome}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground-muted">{criterion.note}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  {criterion.evidence.map((item) => (
                    <Link
                      className="inline-flex min-h-9 items-center border border-border bg-card px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] hover:bg-background"
                      href={item.href}
                      key={`${criterion.id}-${item.href}`}
                    >
                      {item.label}
                      <ArrowRight className="ml-2 h-3 w-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Structural invariants
            </p>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {acceptance.invariants.map((item, index) => (
                <div className="bg-card p-5" key={item}>
                  <p className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-sm leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <article className="border border-border bg-card p-6 sm:p-8">
              <CheckCircle2 className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
              <p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Runtime evidence · {runtimeStatus}</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold">The production path is exercised in CI.</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">{acceptance.validation.runtimeEvidence}</p>
              <p className="mt-5 border-l border-border pl-3 font-mono text-[10px] leading-6">{acceptance.validation.runtimeGate}</p>
            </article>

            <article className="border border-border bg-card p-6 sm:p-8">
              <Network className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-semibold">Automation is deliberately limited.</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">{acceptance.validation.scope}</p>
              <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Human review still required</p>
              <ul className="mt-3 space-y-3 text-sm leading-6">
                {acceptance.validation.humanReviewRequired.map((item) => (
                  <li className="border-l border-border pl-3" key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

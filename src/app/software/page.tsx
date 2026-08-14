import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Bug,
  GitBranch,
  RefreshCcw,
  Route,
} from "lucide-react";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  featuredPublicWork,
  publicVocabulary,
  softwarePaths,
} from "@/lib/p1-public-shell";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Start with familiar software failures and learn the Boundary First practice through diagnosis, mapping, invariants, contracts, observability, repair, and worked evidence.",
  alternates: { canonical: "/software" },
};

const pathIcons = [Bug, Route, Braces, RefreshCcw, GitBranch];

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LayerContext
        layer={{ index: 1, label: "Software / practice" }}
        outward={{ label: "Institution", href: "/" }}
        inward={{ label: "Learn the method", href: "/methods" }}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              Boundary First software practice
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              Real software problems. A method for making them legible.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted sm:text-xl sm:leading-9">
              Start with the failure you already recognize. Trace the system until the hidden boundary, state, obligation, or missing evidence becomes visible enough to act on.
            </p>
          </div>
          <div className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Familiar failure states
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7">
              <li>The bug is somewhere in here.</li>
              <li>Nobody understands the whole system.</li>
              <li>Every change breaks something else.</li>
              <li>The documentation describes a system that no longer exists.</li>
              <li>Everyone owns part of the problem. Nobody owns the outcome.</li>
            </ul>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted">
              These often look unrelated until the system's boundaries, states, contracts, and evidence are made explicit.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">What do you need to do?</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Enter through the problem state, not the theory name.</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-5">
            {softwarePaths.map((path, index) => {
              const Icon = pathIcons[index];
              return (
                <Link className="group bg-background p-5 transition-colors hover:bg-card" href={path.href} key={path.id}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                  <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{String(index + 1).padStart(2, "0")} · {path.verb}</p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold">{path.prompt}</h3>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">{path.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {path.vocabulary.map((term) => (
                      <span className="border border-border bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em]" key={term}>{term}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Open path <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Small reusable vocabulary</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Name the thing only after you can see it.</h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">Boundary First terminology is meant to compress recognizable engineering phenomena, not replace them with a prerequisite ontology.</p>
            </div>
            <dl className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {publicVocabulary.map(([term, definition]) => (
                <div className="bg-card p-5" key={term}>
                  <dt className="font-serif text-xl font-semibold">{term}</dt>
                  <dd className="mt-2 text-sm leading-7 text-foreground-muted">{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">Practice cycle</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Recognize → diagnose → understand → define → change → observe → repair.</h2>
          <div className="mt-9 grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 md:grid-cols-4 lg:grid-cols-7">
            {["Recognize", "Diagnose", "Understand", "Define", "Build / change", "Observe", "Repair / close"].map((step, index) => (
              <div className="bg-primary p-4" key={step}>
                <p className="font-mono text-[9px] text-primary-foreground-muted">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary" href="/methods">Learn the full method <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
            <Link className="inline-flex min-h-12 items-center border border-primary-foreground/30 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]" href="/work#systems-audit">See it in practice</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Proof & provenance</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Do not accept the method on assertion.</h2>
              <p className="mt-4 text-base leading-8 text-foreground-muted">Follow each practice claim into the work, artifact, evidence state, and deeper record that supports or limits it.</p>
            </div>
            <Link className="inline-flex min-h-11 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.13em] hover:underline" href="/evidence">How evidence works <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {featuredPublicWork.map((item) => (
              <Link className="group bg-card p-6" href={item.href} key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{item.kind}</span>
                  <span className="border border-border bg-background px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">{item.status}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.summary}</p>
                <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Inspect <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Broader framework</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Software is where the pattern is easiest to see, not where it stops.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">The same questions about boundaries, invariants, state, evidence, consequence, and repair recur in organizations, institutions, infrastructure, governance, scientific models, and formal systems.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/research">Explore the research <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

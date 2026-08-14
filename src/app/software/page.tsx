import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, Bug, GitBranch, Layers3, RefreshCcw, Search, ShieldCheck } from "lucide-react";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { softwarePaths, softwareVocabulary, featuredPublicWork } from "@/lib/p1-public-shell";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Boundary First applied to real software problems: diagnose, understand, build, change, and learn without losing the system properties that matter.",
  alternates: { canonical: "/software" },
};

const pathIcons = [Bug, Search, Braces, RefreshCcw, Layers3] as const;

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LayerContext
        layer={{ index: 1, label: "Software / practice" }}
        outward={{ label: "Why Boundary First Labs", href: "/" }}
        inward={{ label: "See the method", href: "/methods" }}
      />

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Preferred practical entrance
            </p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              Real software problems. A method for making them legible.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground-secondary">
              Start with the problem you already recognize. Boundary First makes ownership, state, contracts, evidence, failure paths, and preserved properties explicit before implementation choices bury them.
            </p>
          </div>
          <div className="border border-primary-foreground/20 bg-primary-foreground/5 p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
              Practice rule
            </p>
            <p className="mt-4 font-serif text-2xl font-semibold leading-8">
              Implementation comes after the boundary, the invariant, and the observable state are understood well enough to constrain it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Recognize the problem</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">You have probably heard some version of these sentences.</h2>
            </div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Common failure language</p>
              <ul className="mt-5 space-y-4 text-sm leading-7">
                <li>The bug is somewhere in here.</li>
                <li>Nobody understands the whole system.</li>
                <li>Every change breaks something else.</li>
                <li>The documentation describes a system that no longer exists.</li>
                <li>Everyone owns part of the problem. Nobody owns the outcome.</li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground-muted">
                These often look unrelated until the system&apos;s boundaries, states, contracts, and evidence are made explicit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Choose the job to be done</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-5">
            {softwarePaths.map((path, index) => {
              const Icon = pathIcons[index] ?? GitBranch;
              return (
                <Link className="group bg-background p-5" href={path.href} key={path.title}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                  <p className="mt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">{path.label}</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{path.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">{path.description}</p>
                  <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Follow path <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Working vocabulary</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Use the terms only as far as they help you operate.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-foreground-muted">The formal core sits deeper in the site. At the software layer, these words are practical handles for finding hidden assumptions before code turns them into defects.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {softwareVocabulary.map((item) => (
                <article className="bg-card p-5" key={item.term}>
                  <h3 className="font-serif text-xl font-semibold">{item.term}</h3>
                  <p className="mt-3 text-sm leading-6 text-foreground-muted">{item.definition}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">Practice → proof</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">See the method against work that already exists.</h2>
            </div>
            <Link className="inline-flex min-h-11 items-center border border-primary-foreground/25 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]" href="/work">Browse all work <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 lg:grid-cols-3">
            {featuredPublicWork.map((item) => (
              <Link className="group bg-primary p-6" href={item.href} key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-primary-foreground-muted">{item.kind}</span>
                  <span className="border border-primary-foreground/20 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">{item.status}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary-foreground-secondary">{item.summary}</p>
                <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Inspect evidence <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <Link className="group border border-border bg-card p-6" href="/methods">
            <GitBranch aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 font-serif text-2xl font-semibold">How the method works</h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">Move one layer inward from recognizable practice to the repeatable method underneath it.</p>
            <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Methods <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </Link>
          <Link className="group border border-border bg-card p-6" href="/evidence">
            <ShieldCheck aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 font-serif text-2xl font-semibold">What supports the claims</h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">Inspect standing, claim ceilings, provenance, replication status, and open evidence gates.</p>
            <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Evidence <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </Link>
          <Link className="group border border-border bg-card p-6" href="/research">
            <Layers3 aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Where the broader research goes</h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">Software is one demonstration domain inside a wider program of representational, institutional, mathematical, and scientific work.</p>
            <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Research <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

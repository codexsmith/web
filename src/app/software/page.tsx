import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers3, ShieldCheck } from "lucide-react";
import { SoftwareProblemRouter } from "@/components/journey/SoftwareProblemRouter";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { ProductLandingDirectory } from "@/components/product-landing/ProductLandingDirectory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { featuredPublicWork, publicVocabulary } from "@/lib/p1-public-shell";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Boundary First applied to real software problems: diagnose, understand, build, change, and learn without losing the system properties that matter.",
  alternates: { canonical: "/software" },
};

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

      <SoftwareProblemRouter />

      <section className="border-b border-border bg-card/45 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:items-start">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Public methods & instruments
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Go deeper after the job is clear.
              </h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                The public software projections make particular parts of the practice inspectable. They are not prerequisites for beginning with a concrete problem.
              </p>
            </div>
            <div id="software-public-directory">
              <ProductLandingDirectory group="software" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer list-none p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                    Optional working vocabulary
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                    Open the terms when they help you operate.
                  </h2>
                </div>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Expand vocabulary
                </span>
              </div>
            </summary>
            <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {publicVocabulary.map(([term, definition]) => (
                <article className="bg-background p-5" key={term}>
                  <h3 className="font-serif text-xl font-semibold">{term}</h3>
                  <p className="mt-3 text-sm leading-6 text-foreground-muted">{definition}</p>
                </article>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
                Practice → proof
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                See the method against work that already exists.
              </h2>
            </div>
            <Link className="inline-flex min-h-11 items-center border border-primary-foreground/25 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]" href="/work">
              Browse work overview
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 border-y border-primary-foreground/20">
            {featuredPublicWork.map((item, index) => (
              <Link
                className="group grid gap-4 border-b border-primary-foreground/15 py-6 last:border-b-0 lg:grid-cols-[3rem_14rem_minmax(0,1fr)_auto] lg:items-center"
                href={item.href}
                key={item.id}
              >
                <span className="font-mono text-[9px] text-primary-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">{item.kind}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm leading-7 text-primary-foreground-secondary">{item.summary}</p>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <GitBranch aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Next decision
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Do you need the method—or the evidence behind it?
            </h2>
          </div>
          <div className="border-y border-border">
            <Link className="group grid gap-3 border-b border-border py-5 sm:grid-cols-[2rem_12rem_1fr_auto] sm:items-center" href="/methods">
              <Layers3 aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
              <span className="font-serif text-xl font-semibold">Methods</span>
              <span className="text-sm leading-6 text-foreground-muted">Inspect the repeatable stack and practice cycle underneath the software work.</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link className="group grid gap-3 py-5 sm:grid-cols-[2rem_12rem_1fr_auto] sm:items-center" href="/evidence">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
              <span className="font-serif text-xl font-semibold">Evidence</span>
              <span className="text-sm leading-6 text-foreground-muted">Inspect standing, claim ceilings, provenance, and open promotion gates.</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

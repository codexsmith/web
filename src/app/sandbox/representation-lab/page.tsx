import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Layers3, ShieldCheck } from "lucide-react";
import { RepresentationLab } from "@/components/representation-lab";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Representation Laboratory",
  description:
    "A Boundary First Labs sandbox for comparing visual grammars while preserving the same underlying objects and claim boundaries.",
  alternates: { canonical: "/sandbox/representation-lab" },
};

export default function RepresentationLabPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Representation laboratory</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Change the representation. Keep the object accountable.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            This interface promotes the existing scene renderer into an explicit testbed. The question is not which visualization looks best; it is which distinctions survive transport between visual grammars and which defects become visible only in one representation.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <RepresentationLab />
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Same referents",
              body: "The preset changes while the example object set stays fixed. Differences therefore belong to the representation rather than a hidden swap in subject matter.",
            },
            {
              icon: Eye,
              title: "Different observability",
              body: "A cycle, convergence map, hub, or pipeline can make different relations easier or harder to inspect. That is a property to test, not an aesthetic preference to hide.",
            },
            {
              icon: ShieldCheck,
              title: "No maturity inflation",
              body: "Visual coherence is not evidence maturity. A clean diagram does not raise a working hypothesis, portfolio record, or bounded result to stronger standing.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article className="bg-card p-6" key={title}>
              <Icon className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border border-border bg-card p-6 sm:p-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Related interfaces</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground-muted">
              Use the guided sequence for a curated camera path or the Atlas when you need the broader canonical graph rather than a controlled representation comparison.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" href="/learn">Guided sequence <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground" href="/map?mode=atlas&view=domains">Open Atlas <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

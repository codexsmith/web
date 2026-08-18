import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical, ShieldCheck } from "lucide-react";
import { BoundaryFirstUxObjectLab } from "@/components/product-landing/BoundaryFirstUxObjectLab";
import { BoundaryFirstUxSandboxSession } from "@/components/product-landing/BoundaryFirstUxSandboxSession";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sandboxPromotionRule } from "@/lib/sandbox-registry";

export const metadata: Metadata = {
  title: "Boundary First UX Laboratory",
  description:
    "Interactive Boundary First UX pattern proofs for semantic objects, temporal boundaries, semantic resolution, context admission, reversible state, and visible partiality.",
  alternates: { canonical: "/sandbox/boundary-first-ux" },
};

export default function BoundaryFirstUxSandboxPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border bg-[#0f2138] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/boundary-first-ux" className="inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55 hover:text-white">
            <ArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Boundary First UX
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Experimental lab · semantic instruments</p>
              <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">Operate the boundary.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
                Boundary First UX is not a stack of panels. Vessels, ports, valves, gauges, lenses, defects, traces, and repairs become operational objects whose behavior is tied to the semantic state they represent.
              </p>
            </div>
            <div className="border border-white/15 bg-white/[0.035] p-5">
              <FlaskConical className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">Promotion boundary</p>
              <p className="mt-3 text-sm leading-7 text-white/62">{sandboxPromotionRule}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
          <Principle index="01" title="Objects carry semantics" body="A vessel bounds state, a pipe carries a relation, a valve gates admission, a gauge exposes an observable, and a leak denotes a defect." />
          <Principle index="02" title="Transformations stay lawful" body="Reveal, Reframe, Stress, Repair, and Promote visibly change the apparatus while preserving identity and causal continuity." />
          <Principle index="03" title="Panels become instruments" body="Boxes remain useful for labels and controls, but the represented world is built from meaningful objects rather than containers alone." />
        </div>
      </section>

      <section className="px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <BoundaryFirstUxObjectLab />
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <BoundaryFirstUxSandboxSession />
        </div>
      </section>

      <section className="border-t border-border bg-card/55 px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="border border-border bg-background p-6">
            <ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Semantic invariants</h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">The Cedar Pump object keeps stable identity while temporal boundary, admitted structure, active frame, and semantic resolution change. The experiment is wrong if a renderer silently changes the underlying object.</p>
          </article>
          <article className="border border-border bg-background p-6">
            <ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Accessibility parity</h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">Every apparatus state also has ordinary controls, status text, and recoverable history. Meaning is not available only through motion, position, color, or visual metaphor.</p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Principle({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <article className="border border-border bg-background p-4">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{index} · sandbox rule</p>
      <h2 className="mt-2 font-serif text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs leading-6 text-foreground-muted">{body}</p>
    </article>
  );
}

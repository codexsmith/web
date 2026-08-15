import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FlaskConical, ShieldCheck } from "lucide-react";
import { BoundaryFirstUxSandboxLab } from "@/components/product-landing/BoundaryFirstUxSandboxLab";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sandboxPromotionRule } from "@/lib/sandbox-registry";

export const metadata: Metadata = {
  title: "Boundary First UX Laboratory",
  description: "Interactive Boundary First UX pattern proofs for temporal boundaries, resolution navigation, and context admission.",
  alternates: { canonical: "/sandbox/boundary-first-ux" },
};

export default function BoundaryFirstUxSandboxPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border bg-[#0f2138] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/boundary-first-ux" className="inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55 hover:text-white"><ArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden="true" />Boundary First UX</Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] lg:items-end">
            <div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Experimental lab · bounded pattern proofs</p><h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">Operate the boundary.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">These instruments test whether Boundary First semantics remain legible when users inspect a temporal edge, change semantic resolution, or ask whether a transition is admissible.</p></div>
            <div className="border border-white/15 bg-white/[0.035] p-5"><FlaskConical className="h-5 w-5 text-brand-gold" aria-hidden="true" /><p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">Promotion boundary</p><p className="mt-3 text-sm leading-7 text-white/62">{sandboxPromotionRule}</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {[['Timeline', '#timeline'], ['Resolution navigation', '#resolution'], ['Context admission + Gate', '#gate']].map(([label, href]) => <a key={href} href={href} className="inline-flex min-h-10 items-center border border-border bg-card px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] hover:bg-background">{label}<ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></a>)}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl"><BoundaryFirstUxSandboxLab /></div>
      </section>

      <section className="border-t border-border bg-card/55 px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="border border-border bg-background p-6"><ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" /><h2 className="mt-4 font-serif text-2xl font-semibold">Semantic invariants</h2><p className="mt-3 text-sm leading-7 text-foreground-muted">The Cedar Pump object keeps stable identity while the represented time boundary, admitted structure, and semantic resolution change. The experiment is wrong if a renderer silently changes the underlying object.</p></article>
          <article className="border border-border bg-background p-6"><ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" /><h2 className="mt-4 font-serif text-2xl font-semibold">Accessibility parity</h2><p className="mt-3 text-sm leading-7 text-foreground-muted">Every state transition is exposed through ordinary controls and explanatory text. Meaning is not available only through motion, position, color, or visual surprise.</p></article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Eye,
  Layers3,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
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

      <section className="relative isolate overflow-hidden border-b border-border bg-[#0f2138] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.2] [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="pointer-events-none absolute right-8 top-12 -z-10 h-64 w-64 rounded-full border border-brand-gold/20" />
        <div className="pointer-events-none absolute right-28 top-32 -z-10 h-24 w-24 rounded-full border border-brand-gold/20" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.6fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-2 w-2 bg-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Representation laboratory · RLAB-02
              </p>
              <span className="border border-white/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
                operational interface testbed
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] sm:text-7xl">
              Change the representation. Keep the object accountable.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">
              The lab now compares two visual grammars at once over the same referent set. The experiment is not which view looks best; it is what each view exposes, what each suppresses, and whether identity survives the transport.
            </p>
          </div>

          <aside className="border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex items-center gap-3">
              <ScanSearch className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Experiment contract
              </p>
            </div>
            <ol className="mt-5 grid gap-3">
              <ContractLine index="01" title="Lock referents" body="The underlying object set does not change between A and B." />
              <ContractLine index="02" title="Vary projection" body="Only the representation grammar is allowed to move." />
              <ContractLine index="03" title="Inspect loss" body="Record what becomes easier to see and what becomes easier to forget." />
            </ol>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Same referents",
              body: "Both projections receive the same six named objects. A difference in legibility therefore belongs to the representation, not a hidden subject swap.",
            },
            {
              icon: Eye,
              title: "Different observability",
              body: "A cycle, hub, convergence field, or pipeline makes different relations salient. That is a measurable interface property, not merely taste.",
            },
            {
              icon: ShieldCheck,
              title: "No maturity inflation",
              body: "A compelling rendering may improve comprehension. It still cannot raise the evidence maturity or standing of the underlying claim.",
            },
          ].map(({ icon: Icon, title, body }, index) => (
            <article className="relative bg-background p-6" key={title}>
              <div className="flex items-center justify-between gap-4">
                <Icon className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
                <span className="font-mono text-[9px] text-foreground-muted">0{index + 1}</span>
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Live comparator
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Put two grammars under the same load.
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
              A/B object identity preserved
            </div>
          </div>
          <RepresentationLab />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border border-border bg-card p-6 shadow-[7px_7px_0_rgba(15,33,56,0.06)] sm:p-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Related interfaces
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground-muted">
              Use the guided sequence for a curated camera path, or the Atlas when you need the broader canonical graph rather than a controlled A/B representation comparison.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" href="/learn">
              Guided sequence <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground" href="/map?mode=atlas&view=domains">
              Open Atlas <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContractLine({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-[2rem_1fr] gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
      <span className="font-mono text-[9px] font-semibold text-brand-gold">{index}</span>
      <div>
        <strong className="font-serif text-lg text-white/90">{title}</strong>
        <p className="mt-1 text-xs leading-5 text-white/50">{body}</p>
      </div>
    </li>
  );
}

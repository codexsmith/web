import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot, Layers3 } from "lucide-react";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilityPromotionStages, workRecords } from "@/lib/work-records";

export const metadata: Metadata = {
  title: "Capabilities & Program Promotion",
  description:
    "How Boundary First Labs distinguishes an artifact, project, portfolio, capability, and institutionally governed program.",
  alternates: { canonical: "/work/capabilities" },
};

const governed = workRecords.filter((record) => record.authority === "governed");
const provisional = workRecords.length - governed.length;

export default function CapabilityPromotionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Capability → program promotion grammar</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">A body of work becomes a program only after repeatability itself is governed.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">Boundary First Labs does not treat several related projects as proof that a mature program already exists. Promotion requires a stronger institutional claim at each step.</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <ol className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-5">
            {capabilityPromotionStages.map((stage, index) => (
              <li className="bg-background p-6" key={stage.id}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 font-serif text-2xl font-semibold">{stage.label}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{stage.question}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <Layers3 aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Program gate</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Repeatable action needs more than repeated artifacts.</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">A public program claim should name the problem class, method, owner, evidence basis, lifecycle, outputs, failure criteria, repair obligations, and governance boundary that make the action repeatable.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {[
              "Defined problem class",
              "Reusable method or operating procedure",
              "Named ownership and responsibility",
              "Evidence and provenance",
              "Lifecycle and retirement conditions",
              "Outputs and success/failure criteria",
              "Repair and escalation path",
              "Public representation and governance rules",
            ].map((item) => (
              <div className="flex gap-3 bg-card p-5 text-sm leading-6" key={item}>
                <CircleDot aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-foreground-muted" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">Current record state</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">The portfolio is ahead of the program taxonomy.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">The public Work projection currently contains {governed.length} governed records and {provisional} provisional records. This surface deliberately does not create a `/programs` namespace or promote provisional clusters merely because related records exist.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground" href="/work/index">Inspect the work index <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

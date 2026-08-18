import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "How Boundary First Labs records standing, claim ceilings, provenance, verification, and open evidence gates.",
  alternates: { canonical: "/evidence" },
};

export default function EvidencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LayerContext
        layer={{ index: 3, label: "Proof / provenance" }}
        outward={{ label: "Back to methods", href: "/methods" }}
        inward={{ label: "Research program", href: "/research" }}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Proof & provenance</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">Believe exactly what the record supports. No more, no less.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">Boundary First separates what exists in the record from what has operated, what has been independently verified, and what still has an open evidence gate.</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <EvidenceVitalsBar
            description="Source presence, operating verification, bounded cases, and recorded breakpoints remain distinct measures."
            items={claimEvidenceVitals}
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Current claim-evidence context"
          />
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {[
            {
              title: "Standing",
              icon: FileCheck2,
              body: "Recorded, Operational, Externally verified, or Withdrawn describe the present standing of the specific proposition being asserted.",
            },
            {
              title: "Claim ceiling",
              icon: Scale,
              body: "Evidence status never silently upgrades the kind of claim. An operational engineering result does not become a theorem by acquiring more evidence.",
            },
            {
              title: "Provenance",
              icon: ShieldCheck,
              body: "The audit trail stays complete internally while public surfaces expose named, external, or materially necessary sources instead of citation machinery.",
            },
          ].map(({ title, icon: Icon, body }) => (
            <article className="bg-card p-6 sm:p-8" key={title}>
              <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Next layer</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">What research program generates and tests these claims?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">Move inward to the research architecture, domains, Atlas, and active investigations without losing the evidence boundary you came through.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/research">Explore research <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

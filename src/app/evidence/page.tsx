import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EvidenceClaimReader } from "@/components/journey/EvidenceClaimReader";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
  EVIDENCE_STANDING_LABELS,
  EVIDENCE_STANDING_MEANINGS,
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
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Proof & provenance
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Believe exactly what the record supports. No more, no less.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            Boundary First separates what exists in the record from what has operated, what has been independently verified, and what still has an open evidence gate.
          </p>
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

      <EvidenceClaimReader />

      <section className="border-b border-border bg-card/45 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(14rem,0.5fr)_minmax(0,1.5fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Standing ladder
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Stronger standing does not erase scope.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              These labels describe evidence standing. They do not turn an engineering result into a theorem, a bounded case into a universal law, or an internal record into independent validation.
            </p>
          </div>

          <dl className="border-y border-border">
            {Object.entries(EVIDENCE_STANDING_LABELS).map(([standing, label], index) => (
              <div className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[2.5rem_11rem_minmax(0,1fr)]" key={standing}>
                <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                <dt className="font-serif text-xl font-semibold">{label}</dt>
                <dd className="text-sm leading-7 text-foreground-muted">
                  {EVIDENCE_STANDING_MEANINGS[standing as keyof typeof EVIDENCE_STANDING_MEANINGS]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Next layer
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              What research program generates and tests these claims?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">
              Move inward to the research architecture, public programs, domains, and formal tools without losing the evidence boundary you came through.
            </p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/research">
            Explore research
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

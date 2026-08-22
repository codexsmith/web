import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageOff, ShieldCheck } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VisualGrammarDiagram } from "@/components/visual-grammar/VisualGrammarDiagram";
import { visualGrammar } from "@/lib/visual-grammar";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
  type EvidenceVital,
} from "@/lib/evidence-vitals";

export const metadata: Metadata = {
  title: "Original Visual Grammar",
  description:
    "Follow class through instance, state, operation, consequence, and repair; then follow a symbol through interpreter, authority, state transition, consequence, and contestability.",
  alternates: {
    canonical: "/language/visuals",
  },
};

export default function VisualGrammarPage() {
  const visualVitals: EvidenceVital[] = [
    {
      id: "original-diagrams",
      label: "Original diagrams",
      value: visualGrammar.diagrams.length,
      detail: "Project-native explanatory diagrams in the governed set.",
      tone: "standard",
      mobilePriority: true,
    },
    {
      id: "copied-assets",
      label: "Copied source assets",
      value: 0,
      detail: "No source pixels, illustrations, or layouts are reproduced.",
      tone: "bounded",
    },
    {
      id: "repair-gates",
      label: "Public repair gates",
      value: visualGrammar.diagrams.length,
      detail: "Every public path exposes its contest or repair branch.",
      tone: "bounded",
    },
    ...claimEvidenceVitals.filter((item) =>
      ["operationally-verified", "breakpoints"].includes(item.id),
    ),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageMasthead
        actions={
          <>
            <a
              className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
              href="#class-to-consequence"
            >
              Follow class
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center border border-border px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
              href="#symbol-to-consequence"
            >
              Follow words
            </a>
          </>
        }
        deck="Representation matters when a system can act on it. Repair matters when that action is wrong."
        description={visualGrammar.summary}
        eyebrow="Governed public diagrams"
        title="Two paths from distinction to consequence."
      />

      <section className="border-b border-border bg-card/55 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              How to read the set
            </p>
            <p className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-snug sm:text-4xl">
              Read left to right for the primary path. Then follow the lower
              gate to see whether the result closes or must return through
              witness, responsibility, and repair.
            </p>
          </div>
          <EvidenceVitalsBar
            description="Visual integrity and evidence maturity remain separate: original design does not raise the claim ceiling."
            eyebrow="Visual and evidence context"
            items={visualVitals}
            layout="stacked"
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Diagram-set vitals"
          />
        </div>
      </section>

      {visualGrammar.diagrams.map((diagram) => (
        <VisualGrammarDiagram diagram={diagram} key={diagram.id} />
      ))}

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div>
            <ImageOff aria-hidden="true" className="h-7 w-7 text-foreground-muted" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Source and design status
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
              Original structure. Unresolved references remain internal.
            </h2>
          </div>
          <div className="border border-border bg-background p-6 sm:p-8">
            <p className="text-base leading-8 text-foreground-muted">
              {visualGrammar.sourceImagePolicy.note}
            </p>
            <dl className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {[
                ["Bibliographic status", "Unresolved"],
                ["Reference publication", "Internal only"],
                ["Copied assets", "None"],
                ["Design origin", "Project-native structure"],
              ].map(([term, detail]) => (
                <div className="bg-card/55 p-5" key={term}>
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                    {term}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              className="mt-7 inline-flex min-h-11 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.15em] underline decoration-border underline-offset-8"
              href={visualGrammar.routes.visualArtifact}
            >
              Read the design and provenance note
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end">
          <div>
            <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Semantic firewalls
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              The diagram carries its own limits.
            </h2>
          </div>
          <div>
            <ul className="space-y-3 text-sm leading-7 text-primary-foreground-secondary">
              {visualGrammar.safeguards.map((safeguard) => (
                <li
                  className="border-l border-primary-foreground/30 pl-4"
                  key={safeguard}
                >
                  {safeguard}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-primary-foreground/20 pt-7 text-base leading-8 text-primary-foreground-secondary">
              {visualGrammar.claimCeiling}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary"
                href={visualGrammar.routes.registry}
              >
                Browse governed language
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-primary-foreground/40 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
                href={visualGrammar.routes.researchProgram}
              >
                Inspect the evidence boundary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

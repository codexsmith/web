import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { ResearchJourneyRail } from "@/components/journey/ResearchJourneyRail";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { ProductLandingDirectory } from "@/components/product-landing/ProductLandingDirectory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Research",
  description:
    "A readable entrance to the Boundary First Labs research architecture, domains, Atlas, methods, formal core, and active public research programs.",
  alternates: { canonical: "/research" },
};

const recurringQuestions = [
  "What is inside the system, and what crosses its boundaries?",
  "What must persist while the system operates or changes?",
  "Which states or representations are admissible?",
  "What evidence survives transformation?",
  "What proves an obligation or repair has actually completed?",
  "What happens when the model cannot close on reality?",
] as const;

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LayerContext
        layer={{ index: 4, label: "Mechanics / research" }}
        outward={{ label: "Back to evidence", href: "/evidence" }}
        inward={{ label: "Formal core", href: "/theory" }}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Research architecture
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            The mechanics beneath the practice.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            Research is where Boundary First asks why the practical techniques keep fitting together: what boundaries do, what representations preserve, how defects become visible, and what conditions allow repair or closure.
          </p>
        </div>
      </section>

      <ResearchJourneyRail />

      <div id="research-programs">
        <ProductLandingDirectory group="research" variant="rail" />
      </div>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(14rem,0.52fr)_minmax(0,1.48fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Recurring research questions
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Different domains can share a question without sharing an answer.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              These questions organize investigation. Cross-domain resemblance is a reason to compare boundaries and operations, not permission to collapse distinct fields into one vocabulary.
            </p>
          </div>

          <ol className="border-y border-border">
            {recurringQuestions.map((question, index) => (
              <li className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[2.5rem_1fr]" key={question}>
                <span className="font-mono text-[9px] text-foreground-muted">Q{String(index + 1).padStart(2, "0")}</span>
                <p className="font-serif text-xl font-semibold leading-8">{question}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <CircleDot aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Formal core · optional depth
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              What formal architecture is underneath this?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">
              Enter the formal layer when a research question requires theorem-level, definitional, or derivational machinery. It remains reachable without becoming the front door for applied work.
            </p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/theory">
            Enter the formal core
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

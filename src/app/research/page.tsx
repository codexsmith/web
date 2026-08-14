import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Map, Network } from "lucide-react";
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
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Research architecture</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">The mechanics beneath the practice.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">Research is where Boundary First asks why the practical techniques keep fitting together: what boundaries do, what representations preserve, how defects become visible, and what conditions allow repair or closure.</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {[
            {
              title: "Research domains",
              description: "Browse the governed domain architecture and see how individual research objects relate without entering the spatial Atlas first.",
              href: "/domains",
              action: "Browse domains",
              icon: BookOpen,
            },
            {
              title: "Research Atlas",
              description: "Inspect the same governed record set spatially once the legend and research context are already clear.",
              href: "/map?mode=atlas&view=domains",
              action: "Open the Atlas",
              icon: Map,
            },
            {
              title: "Methods",
              description: "See the public method stack that translates deeper mechanics into usable practice and governed investigation.",
              href: "/methods",
              action: "Open methods",
              icon: FlaskConical,
            },
            {
              title: "Relations",
              description: "Inspect the recorded relationships among domains, artifacts, methods, and the broader public graph.",
              href: "/relations",
              action: "Inspect relations",
              icon: Network,
            },
          ].map(({ title, description, href, action, icon: Icon }) => (
            <Link className="group bg-background p-6 sm:p-8" href={href} key={title}>
              <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">{description}</p>
              <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">{action} <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <ProductLandingDirectory group="research" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Recurring research questions</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {[
              "What is inside the system, and what crosses its boundaries?",
              "What must persist while the system operates or changes?",
              "Which states or representations are admissible?",
              "What evidence survives transformation?",
              "What proves an obligation or repair has actually completed?",
              "What happens when the model cannot close on reality?",
            ].map((question, index) => (
              <div className="bg-card p-6" key={question}>
                <p className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-serif text-xl font-semibold leading-8">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Formal core</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">What formal architecture is underneath this?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">The formal layer keeps theorem-level, definitional, and derivational material deeper than the practical on-ramp while preserving a direct path for readers who need it.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/theory">Enter the formal core <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

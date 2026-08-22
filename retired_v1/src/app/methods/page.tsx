import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { MethodStackNavigator } from "@/components/journey/MethodStackNavigator";
import { PageMasthead } from "@/components/page-masthead";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { SectionJumpNavigation } from "@/components/public-interface/SectionJumpNavigation";
import { asRecord, asRecordArray, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import practiceProjection from "@/content/public-projections/practice.json";

export const metadata: Metadata = {
  title: "Methods",
  description:
    "The Boundary First method stack for governing boundaries, learning from reality, building navigable knowledge, and keeping action answerable.",
  alternates: { canonical: "/methods" },
};

const payload = asRecord(practiceProjection.payload);
const methodsPage = asRecord(payload.methodsPage);
const stack = asRecord(payload.publicMethodStack);
const glossary = asRecordArray(payload.glossary);

export default function MethodsPage() {
  return (
    <PublicPageFrame group="work">
      <LayerContext
        layer={{ index: 2, label: "Method" }}
        outward={{ label: "Back to software", href: "/software" }}
        inward={{ label: "Inspect proof & provenance", href: "/evidence" }}
      />

      <PageMasthead
        deck={firstText(methodsPage.headline)}
        description={firstText(methodsPage.dek)}
        eyebrow="Public method stack"
        title="Methods"
      />

      <ProjectionProvenance
        boundary="Method names have different maturity and authority. Each layer below retains its recorded status; proximity on this page does not make every term settled doctrine."
        source={practiceProjection.source}
      />

      <SectionJumpNavigation
        label="Methods contents"
        items={[
          { label: "Method stack", href: "#method-stack" },
          { label: "Practice cycle", href: "#practice-cycle" },
          { label: "Glossary", href: "#glossary" },
          { label: "Next step", href: "#next-step" },
        ]}
      />

      <MethodStackNavigator />

      <section className="scroll-mt-32 border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="practice-cycle">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.52fr)_minmax(0,1.48fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
                Recursive practice cycle
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Stabilize only what has survived the declared test.
              </h2>
              <p className="mt-5 text-sm leading-7 text-primary-foreground-secondary">
                The cycle is a sequence of increasingly accountable claims, not six independent techniques to adopt at once.
              </p>
            </div>
            <ol className="border-l border-primary-foreground/25">
              {asStringArray(stack.cycle).map((step, index) => {
                const [verb, ...body] = step.split(" — ");
                return (
                  <li className="relative border-b border-primary-foreground/20 py-5 pl-7 last:border-b-0" key={step}>
                    <span aria-hidden="true" className="absolute -left-1 top-7 h-2 w-2 bg-primary-foreground" />
                    <p className="font-mono text-[9px] text-primary-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold capitalize">{verb.toLowerCase()}</h3>
                    <p className="mt-2 text-xs leading-6 text-primary-foreground-secondary">{body.join(" — ")}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="glossary">
        <div className="mx-auto max-w-7xl">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer list-none p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                    Public glossary · optional depth
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                    Open terminology when the distinction matters.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">
                    Working language remains available without requiring every visitor to traverse the whole glossary before reaching the evidence layer.
                  </p>
                </div>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  Expand {glossary.length} terms
                </span>
              </div>
            </summary>
            <dl className="divide-y divide-border border-t border-border px-6 sm:px-8">
              {glossary.map((item) => (
                <div className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr]" key={firstText(item.term)}>
                  <dt>
                    <span className="block font-serif text-xl font-semibold">{firstText(item.term)}</span>
                    <span className="mt-2 block font-mono text-[8px] font-semibold uppercase leading-4 tracking-[0.11em] text-foreground-muted">
                      {humanizeStatus(item.status)}
                    </span>
                  </dt>
                  <dd className="text-sm leading-7 text-foreground-muted">{firstText(item.definition)}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </section>

      <section className="scroll-mt-32 px-5 py-14 sm:px-8 sm:py-20" id="next-step">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <CircleDot aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 max-w-4xl font-serif text-3xl font-semibold sm:text-4xl">
              What supports or limits the method?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">
              Follow the method into its evidence standing, claim ceilings, provenance, and open promotion gates before moving deeper into the research architecture.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            href="/evidence"
          >
            Inspect proof & provenance
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}

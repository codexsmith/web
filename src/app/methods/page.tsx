import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
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
const layers = asRecordArray(stack.publicCompression);
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

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="method-stack">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              {firstText(stack.title)}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">
              {firstText(stack.headline)}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-foreground-muted">
              {firstText(stack.purpose)}
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {layers.map((layer, index) => (
              <article className="bg-card p-6 sm:p-8" id={firstText(layer.id)} key={firstText(layer.id)}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                      {String(index + 1).padStart(2, "0")} · {firstText(layer.role)}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold">
                      {firstText(layer.label)}
                    </h3>
                  </div>
                  <span className="border border-border bg-background px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em]">
                    {firstText(layer.publicVerb)}
                  </span>
                </div>
                <p className="mt-6 font-serif text-xl font-semibold leading-8">
                  {firstText(layer.question)}
                </p>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">
                  {firstText(layer.oneLine)}
                </p>
                <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-foreground-muted">
                  Status · {firstText(layer.status)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="practice-cycle">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Recursive practice cycle
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Stabilize only what has survived the declared test.
            </h2>
          </div>
          <ol className="mt-9 grid gap-px overflow-hidden border border-primary-foreground/35 bg-primary-foreground/35 md:grid-cols-2 xl:grid-cols-3">
            {asStringArray(stack.cycle).map((step, index) => {
              const [verb, ...body] = step.split(" — ");
              return (
                <li className="bg-primary p-5" key={step}>
                  <span className="font-mono text-[9px] text-primary-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold capitalize">
                    {verb.toLowerCase()}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-primary-foreground-muted">
                    {body.join(" — ")}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="glossary">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Public glossary
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Terms carry their status with them.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              A working term may be useful without being complete. The public interface keeps core language, working language, and provisional formalization distinguishable.
            </p>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {glossary.map((item) => (
              <div className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr]" key={firstText(item.term)}>
                <dt>
                  <span className="block font-serif text-xl font-semibold">
                    {firstText(item.term)}
                  </span>
                  <span className="mt-2 block font-mono text-[8px] font-semibold uppercase leading-4 tracking-[0.11em] text-foreground-muted">
                    {humanizeStatus(item.status)}
                  </span>
                </dt>
                <dd className="text-sm leading-7 text-foreground-muted">
                  {firstText(item.definition)}
                </dd>
              </div>
            ))}
          </dl>
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

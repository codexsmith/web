import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { asRecord, asRecordArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";
import practiceProjection from "@/content/public-projections/practice.json";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "A transparent Boundary First practice: declare, observe, trace, test, repair, verify, and revise.",
  alternates: { canonical: "/practice" },
};

const payload = asRecord(practiceProjection.payload);
const howWeWork = asRecord(payload.howWeWork);
const steps = asRecordArray(howWeWork.steps);
const method = asRecord(payload.boundaryFirstMethod);
const methodCards = asRecordArray(method.methodCards);

export default function PracticePage() {
  return (
    <PublicPageFrame group="work">
      <PageMasthead
        deck={firstText(howWeWork.headline)}
        description="The practice makes boundaries, assumptions, authority, evidence, defects, and repair obligations visible before closure is claimed."
        eyebrow="Transparent practice"
        inverse
        title="How we work"
      />

      <ProjectionProvenance
        boundary="This sequence is a public operating grammar. The exact evidence, review, and safety gates remain proportional to the domain and consequence of each engagement."
        source={practiceProjection.source}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-7">
            {steps.map((step, index) => (
              <li className="bg-background p-5" key={firstText(step.verb)}>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-serif text-2xl font-semibold">
                  {firstText(step.verb)}
                </h2>
                <p className="mt-3 text-xs leading-6 text-foreground-muted">
                  {firstText(step.body)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Related layers, distinct jobs
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              {firstText(method.headline)}
            </h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
            {methodCards.map((card, index) => (
              <article className="bg-background p-6" key={firstText(card.label)}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    {firstText(card.verb)}
                  </span>
                  <CircleDot aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold">
                  {firstText(card.label)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">
                  {firstText(card.line)}
                </p>
                <span className="mt-6 block font-mono text-[9px] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")} / {methodCards.length}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Public impact rule
            </p>
            <p className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight">
              {firstText(payload.impactRule)}
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            href="/methods"
          >
            Explore the methods
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}

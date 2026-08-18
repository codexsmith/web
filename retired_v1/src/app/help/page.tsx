import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { asRecord, asRecordArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";
import missionProjection from "@/content/public-projections/mission.json";
import practiceProjection from "@/content/public-projections/practice.json";

export const metadata: Metadata = {
  title: "How We Help",
  description:
    "Entry points for people, practitioners, communities, and institutions working with consequential systems.",
  alternates: { canonical: "/help" },
};

const mission = asRecord(missionProjection.payload);
const socialMission = asRecord(mission.socialMission);
const scales = asRecordArray(socialMission.scalesOfHelp);
const missions = asRecordArray(socialMission.missions);
const practice = asRecord(practiceProjection.payload);
const howWeHelp = asRecord(practice.howWeHelp);

export default function HelpPage() {
  return (
    <PublicPageFrame group="work">
      <PageMasthead
        deck={firstText(howWeHelp.headline)}
        description={firstText(howWeHelp.body)}
        eyebrow="Bounded entry points"
        title="How we help"
      />

      <ProjectionProvenance
        boundary="These are public entry points, not claims that every listed intervention is currently offered or proven. Scope and standing are established before work begins."
        source={practiceProjection.source}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Begin at the scale carrying the consequence
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {scales.map((scale, index) => (
              <article className="bg-card p-6 sm:p-8" key={firstText(scale.id)}>
                <p className="font-mono text-[9px] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold">
                  {firstText(scale.label)}
                </h2>
                <p className="mt-4 text-sm font-medium leading-7 text-foreground-muted">
                  {firstText(scale.promise)}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-foreground-muted">
                  {firstText(scale.publicLine)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Mission-aligned problem spaces
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Help begins by naming the promise and the structural defect.
            </h2>
          </div>
          <div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((item) => (
              <Link
                className="group flex min-h-56 flex-col border border-border bg-background p-5 transition-colors hover:bg-card"
                href={`/mission#${firstText(item.id)}`}
                key={firstText(item.id)}
              >
                <CircleDot aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">
                  {firstText(item.label)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">
                  {firstText(item.humanPromise)}
                </p>
                <span className="mt-auto inline-flex items-center pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted group-hover:text-foreground">
                  Inspect the mission record
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              A bounded next step
            </p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
              Start with one consequential system, one reachable boundary, and one explicit repair question.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
              href="/collaborate"
            >
              Discuss a bounded problem
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/30 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
              href="/practice"
            >
              See how we work
            </Link>
          </div>
        </div>
      </section>
    </PublicPageFrame>
  );
}

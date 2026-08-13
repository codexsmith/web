import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, UsersRound } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { asRecord, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import governanceProjection from "@/content/public-projections/governance.json";

export const metadata: Metadata = {
  title: "People",
  description:
    "The current formation status, participation boundary, and people-centered institutional commitments of Boundary First Labs.",
  alternates: { canonical: "/people" },
};

const payload = asRecord(governanceProjection.payload);
const formation = asRecord(payload.formation);

export default function PeoplePage() {
  return (
    <PublicPageFrame group="laboratory">
      <PageMasthead
        deck="People remain more than their category."
        description={firstText(formation.publicPosition)}
        eyebrow={`Institutional status · ${humanizeStatus(formation.status)}`}
        title="People"
      />

      <ProjectionProvenance
        boundary="This page states the present institutional reality directly. It does not infer a mature team, independent governance, or external validation where those records do not yet exist."
        source={governanceProjection.source}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <UsersRound aria-hidden="true" className="h-8 w-8 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Present reality
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              {firstText(formation.currentReality)}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">
              {firstText(formation.nearTermInstitutionalGoal)}
            </p>
          </div>

          <div className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Not yet claimed
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {asStringArray(formation.notYetClaimed).map((item) => (
                <li className="flex gap-3 border border-border bg-background p-4 text-sm leading-6" key={item}>
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground-muted" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-l-2 border-accent pl-5 font-serif text-2xl font-semibold leading-9">
              {firstText(formation.longTermInstitutionalGoal)}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Participation posture
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Roles, authority, credit, consequence, and exit conditions should be explicit.
            </h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              [
                "Contributors",
                "Work should retain authorship, provenance, scope, and the conditions under which it may be reused.",
              ],
              [
                "Affected parties",
                "People carrying consequence require standing that is more durable than consultation theater.",
              ],
              [
                "Stewards and reviewers",
                "Authority should remain coupled to evidence access, responsibility, correction, and repair capacity.",
              ],
            ].map(([title, body]) => (
              <article className="bg-background p-6" key={title}>
                <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
              href="/collaborate"
            >
              See participation paths
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center border border-border bg-background px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
              href="/governance"
            >
              Inspect governance
            </Link>
          </div>
        </div>
      </section>
    </PublicPageFrame>
  );
}

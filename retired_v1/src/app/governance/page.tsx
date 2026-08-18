import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { StewardshipPanel } from "@/components/public-interface/StewardshipPanel";
import { asRecord, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import { ATLAS_EVIDENCE_HREF } from "@/lib/site-navigation";
import governanceBindings from "@/content/governance_bindings.json";
import governanceProjection from "@/content/public-projections/governance.json";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How Boundary First Labs binds authority, evidence, criticism, correction, stewardship, and repair in its own work.",
  alternates: { canonical: "/governance" },
};

const payload = asRecord(governanceProjection.payload);
const governance = asRecord(payload.governance);
const stewardship = asRecord(payload.stewardship);
const formation = asRecord(payload.formation);
const firewalls = asRecord(payload.claimFirewalls);
const challenge = asRecord(governance.publicChallenge);

export default function GovernancePage() {
  return (
    <PublicPageFrame group="laboratory">
      <PageMasthead
        deck={firstText(governance.title)}
        description={firstText(governance.lead)}
        eyebrow="Authority · evidence · repair"
        inverse
        title="Governance"
      />

      <ProjectionProvenance
        boundary="Governance statements describe the institution's working commitments. Formation status and not-yet-built capabilities remain visible rather than being implied by institutional language."
        source={governanceProjection.source}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)]">
            <div>
              <Scale aria-hidden="true" className="h-7 w-7 text-foreground-muted" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Institutional commitments
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                The doctrine governs the laboratory first.
              </h2>
              <blockquote className="mt-6 border-l-2 border-accent pl-5 font-serif text-2xl font-semibold leading-9">
                {firstText(governance.humaneTest)}
              </blockquote>
            </div>

            <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
              {asStringArray(governance.commitments).map((commitment, index) => (
                <li className="bg-card p-5" key={commitment}>
                  <span className="font-mono text-[9px] text-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm font-medium leading-7">
                    {commitment}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20" id="stewardship">
        <div className="mx-auto max-w-7xl">
          <StewardshipPanel stewardship={stewardship} />
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            <article className="bg-background p-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                Present reality
              </p>
              <p className="mt-3 text-sm font-medium leading-7">
                {firstText(formation.currentReality)}
              </p>
            </article>
            <article className="bg-background p-5 md:col-span-2">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                Public position
              </p>
              <p className="mt-3 text-sm font-medium leading-7">
                {firstText(formation.publicPosition)}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="border-b border-border px-5 py-14 sm:px-8 sm:py-20"
        id="bindings"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            <ShieldCheck
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-foreground-muted"
            />
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Durable governance bindings
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Every work type keeps an explicit authority boundary.
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-foreground-muted">
                These bindings name which canonical governance sources apply.
                They do not manufacture adoption, ownership, evidence, or
                operation records.
              </p>
            </div>
          </div>
          <div className="mt-7 grid gap-3 lg:grid-cols-2">
            {governanceBindings.records.map((binding) => (
              <article
                className="border border-border bg-card p-5"
                key={binding.id}
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  {binding.status}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">
                  {binding.appliesToType.replace(/-/g, " ")}
                </h3>
                <dl className="mt-4 grid gap-3 text-sm leading-6">
                  <div>
                    <dt className="font-semibold">Canonical sources</dt>
                    <dd>{binding.sourcePaths.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Authority boundary</dt>
                    <dd>{binding.authorityBoundary}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Required closure</dt>
                    <dd>{binding.requiredClosure}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Claim discipline
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Consequence changes the review gate.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(firewalls).map(([domain, boundary]) => (
              <article className="border border-border bg-card p-5" key={domain}>
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  {humanizeStatus(domain)}
                </h3>
                <p className="mt-3 text-xs leading-6 text-foreground-muted">
                  {firstText(boundary)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="challenge">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Criticism is maintenance
            </p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
              {firstText(challenge.headline)}
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">
              {firstText(challenge.body)}
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
            href={`${ATLAS_EVIDENCE_HREF}#challenges`}
          >
            Open the challenge record
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}

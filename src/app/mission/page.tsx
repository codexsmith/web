import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot, ShieldCheck } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { CosmicShore } from "@/components/public-interface/CosmicShore";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { PublicPageFrame } from "@/components/public-interface/PublicPageFrame";
import { StewardshipPanel } from "@/components/public-interface/StewardshipPanel";
import { asRecord, asRecordArray, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import { ATLAS_EVIDENCE_HREF } from "@/lib/site-navigation";
import missionProjection from "@/content/public-projections/mission.json";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Boundary First Labs' social mission: expand agency, keep power coupled to consequence, and build reachable paths to repair.",
  alternates: { canonical: "/mission" },
};

const payload = asRecord(missionProjection.payload);
const missionPage = asRecord(payload.missionPage);
const socialMission = asRecord(payload.socialMission);
const scales = asRecordArray(socialMission.scalesOfHelp);
const missions = asRecordArray(socialMission.missions);
const stewardship = asRecord(payload.stewardship);
const claimFirewalls = asRecord(socialMission.claimFirewalls);

export default function MissionPage() {
  return (
    <PublicPageFrame group="laboratory">
      <PageMasthead
        deck={firstText(missionPage.headline)}
        description={firstText(missionPage.intro)}
        eyebrow="Public mission · institutional quality"
        inverse
        title="Mission"
      />

      <ProjectionProvenance
        boundary="This page is a public projection of the normalized corpus. Mission expresses institutional commitments; it does not by itself prove practical effectiveness."
        source={missionProjection.source}
      />

      <section
        className="border-b border-border px-5 py-14 sm:px-8 sm:py-20"
        id="social-mission"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Human consequence
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              {firstText(socialMission.headline)}
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-foreground/74">
              {firstText(socialMission.coreProposition)}
            </p>
            <blockquote className="mt-7 border-l-2 border-accent pl-5 text-base leading-8 text-foreground/68">
              {firstText(socialMission.humanTranslationOfPrimaryHeadline)}
            </blockquote>
          </div>
          <CosmicShore compact />
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Three scales of help
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {scales.map((scale, index) => (
              <article className="bg-background p-6 sm:p-7" key={firstText(scale.id)}>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
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

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Mission ledger
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Human promise, structural defect, public response.
              </h2>
              <p className="mt-5 text-sm leading-7 text-foreground/68">
                {firstText(socialMission.impactRule)}
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {missions.map((mission, index) => (
                <details
                  className="group py-1"
                  id={firstText(mission.id)}
                  key={firstText(mission.id)}
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="grid grid-cols-[2rem_1fr] items-center gap-3">
                      <span className="font-mono text-[9px] text-foreground-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-xl font-semibold sm:text-2xl">
                        {firstText(mission.label)}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-lg text-foreground-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="grid gap-6 pb-8 pl-11 lg:grid-cols-2">
                    <div>
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                        Human promise
                      </p>
                      <p className="mt-2 text-sm font-medium leading-7">
                        {firstText(mission.humanPromise)}
                      </p>
                      <p className="mt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                        Failure pattern
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground/68">
                        {firstText(mission.failurePattern)}
                      </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                          Operations
                        </p>
                        <ul className="mt-3 space-y-2 text-xs leading-6 text-foreground-muted">
                          {asStringArray(mission.boundaryFirstOperation).map(
                            (operation) => (
                              <li className="flex gap-2" key={operation}>
                                <CircleDot
                                  aria-hidden="true"
                                  className="mt-1.5 h-3 w-3 shrink-0"
                                />
                                {operation}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                          Public outputs
                        </p>
                        <ul className="mt-3 space-y-2 text-xs leading-6 text-foreground-muted">
                          {asStringArray(mission.publicOutputs).map((output) => (
                            <li className="flex gap-2" key={output}>
                              <ShieldCheck
                                aria-hidden="true"
                                className="mt-1.5 h-3 w-3 shrink-0"
                              />
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="border-l-2 border-accent pl-4 text-xs leading-6 text-foreground-muted lg:col-span-2">
                      Claim posture · {firstText(mission.claimPosture)}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="stewardship">
        <div className="mx-auto max-w-7xl">
          <StewardshipPanel inverse stewardship={stewardship} />
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Claim boundaries
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Mission does not substitute for evidence.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(claimFirewalls).map(([domain, boundary]) => (
              <article className="border border-border bg-background p-5" key={domain}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  {humanizeStatus(domain)}
                </p>
                <p className="mt-3 text-xs leading-6 text-foreground/68">
                  {firstText(boundary)}
                </p>
              </article>
            ))}
          </div>
          <Link
            className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            href={ATLAS_EVIDENCE_HREF}
          >
            Inspect the public record
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}

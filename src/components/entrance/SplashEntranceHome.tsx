import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CircleAlert,
  LibraryBig,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FeaturedLaunchWork } from "@/components/featured-launch-work";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import { CosmicShore } from "@/components/public-interface/CosmicShore";
import { StewardshipPanel } from "@/components/public-interface/StewardshipPanel";
import {
  ENTRANCE_INVARIANT,
  ENTRANCE_ROUTES,
} from "@/lib/entrance/registry";
import type { EntranceId } from "@/lib/entrance/types";
import { crossDomainResearchProgram } from "@/lib/cross-domain-research-program";
import { executableDistinctions } from "@/lib/executable-distinctions";
import { LANGUAGE_HREF } from "@/lib/site-navigation";
import { worldClassLanguage } from "@/lib/world-class-language";
import { phase12Launch } from "@/lib/phase12-launch";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";
import { asRecord, asRecordArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";
import homeProjection from "@/content/public-projections/home.json";

const homePayload = asRecord(homeProjection.payload);
const socialMission = asRecord(homePayload.socialMission);
const missionScales = asRecordArray(socialMission.scalesOfHelp);
const stewardship = asRecord(homePayload.stewardship);
const missionSection = asRecord(
  asRecord(homePayload.sections)["social-mission"],
);

const entranceIcons: Record<EntranceId, LucideIcon> = {
  people: UsersRound,
  problem: CircleAlert,
  repair: Wrench,
};

const recognitionRoutes = [
  {
    statement: "People make the value; people are not overhead.",
    context: "Public doctrine seed",
    href: "/artifact/people-make-the-value-people-are-not-overhead",
  },
  {
    statement: "An AI system can act without being authorized to decide.",
    context: "Research and repair",
    href: "/work",
  },
  {
    statement: "A policy can exist without a reachable path to repair.",
    context: "Institutional question",
    href: "/problem",
  },
  {
    statement: "A system can satisfy local rules and still fail between parts.",
    context: "Familiar problem",
    href: "/problem",
  },
];

export function SplashEntranceHome() {
  const { identity } = phase12Launch;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        aria-labelledby="splash-title"
        className="relative flex min-h-[75svh] items-center overflow-hidden border-b border-border bg-primary px-5 py-8 text-primary-foreground sm:px-8 sm:py-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:4rem_4rem]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:items-center">
          <div className="relative mx-auto aspect-square w-[72vw] max-w-[17rem] text-primary-foreground sm:w-full sm:max-w-[28rem]">
            <CosmicShoreMark
              className="relative h-full w-full drop-shadow-[0_0_2.4rem_rgba(59,104,110,0.18)]"
              label="The Cosmic Shoreline circle logo: a broken celestial ring, star, planet, and layered shoreline waves."
              surface="dark"
            />
          </div>

          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground-muted">
              Boundary First Labs
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-semibold leading-[0.93] tracking-tight sm:mt-5 sm:text-7xl lg:text-[5.8rem]"
              id="splash-title"
            >
              {identity.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-primary-foreground/84 sm:mt-7 sm:text-xl sm:leading-9">
              {identity.heroLead}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-primary-foreground/68 sm:text-base sm:leading-8">
              {identity.heroSupport} {identity.domainLine}
            </p>
            <p className="mt-4 max-w-3xl font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.13em] text-primary-foreground/58">
              {identity.methodTriad.join(" ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary transition-transform hover:-translate-y-0.5"
                href="/domains"
              >
                Explore the research
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                href="/work#systems-audit"
              >
                Work with BFL
              </Link>
              <a
                className="inline-flex min-h-12 items-center px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/72 hover:text-primary-foreground"
                href="#featured-work"
              >
                See featured work
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="entrances">
        <SiteHeader />
        <FeaturedLaunchWork />

        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] lg:items-end">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  Three interchangeable beginnings
                </p>
                <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
                  Start with what is already clearest.
                </h2>
              </div>
              <div>
                <p className="text-base font-medium leading-8 text-foreground-muted">
                  People, Problem, and Repair are different views into the same
                  body of work. Each unfolds in sequence, and you can change
                  lenses at every layer.
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">
                  {ENTRANCE_INVARIANT}
                </p>
              </div>
            </div>

            <nav
              aria-label="Choose where to begin"
              className="mt-9 grid overflow-hidden border border-border bg-border md:grid-cols-3"
            >
              {ENTRANCE_ROUTES.map((route, index) => {
                const Icon = entranceIcons[route.id];
                return (
                  <Link
                    className="group min-h-[23rem] bg-background p-5 transition-colors duration-500 hover:bg-card sm:p-7"
                    href={route.rootHref}
                    key={route.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                        {String(index + 1).padStart(2, "0")} · {route.bridge}
                      </span>
                      <Icon className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
                    </div>
                    <p className="mt-10 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                      {route.label}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold">
                      {route.question}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-foreground/68">
                      {route.description}
                    </p>
                    <p className="mt-7 border-t border-border pt-4 text-sm font-medium leading-6 text-foreground-secondary">
                      {route.promise}
                    </p>
                    <span className="mt-3 block font-mono text-[10px] uppercase leading-5 tracking-[0.11em] text-foreground-muted">
                      {route.effort}
                    </span>
                    <span className="mt-7 inline-flex items-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                      Enter through {route.label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link className="inline-flex min-h-11 items-center gap-2 hover:underline" href="/publications/civilizational-mechanics">
                <LibraryBig className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
                Read Civilizational Mechanics
              </Link>
              <Link className="inline-flex min-h-11 items-center gap-2 hover:underline" href="/work">
                <BriefcaseBusiness className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
                See the work
              </Link>
            </div>

            <section className="mt-14 border-t border-border pt-7" aria-labelledby="recognition-title">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  You may be here because...
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl" id="recognition-title">
                  A question is already carrying weight.
                </h2>
              </div>
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {recognitionRoutes.map((item) => (
                  <Link className="group bg-background p-5 transition-colors hover:bg-card" href={item.href} key={item.statement}>
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                      {item.context}
                    </span>
                    <p className="mt-4 text-sm font-medium leading-6">
                      {item.statement}
                    </p>
                    <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted group-hover:text-foreground">
                      Follow this question
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground-muted">
                Your starting point changes the route, not what you may reach.
              </p>
            </section>
          </div>
        </section>

        <section
          aria-labelledby="social-mission-title"
          className="border-b border-border px-5 py-14 sm:px-8 sm:py-20"
          id="social-mission"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,1.1fr)] lg:items-stretch">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                    Social mission · institutional consequence
                  </p>
                  <h2
                    className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
                    id="social-mission-title"
                  >
                    {firstText(
                      socialMission.headline,
                      "Better systems should leave people with more agency, not more invisible burden.",
                    )}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-foreground-muted sm:text-lg">
                    {firstText(socialMission.coreProposition)}
                  </p>
                  <p className="mt-5 max-w-2xl border-l-2 border-accent pl-5 text-sm leading-7 text-foreground/66">
                    {firstText(socialMission.humanTranslationOfPrimaryHeadline)}
                  </p>
                </div>

                <Link
                  className="mt-8 inline-flex min-h-12 w-fit items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                  href="/mission"
                >
                  {firstText(
                    asRecord(missionSection.cta).label,
                    "Explore our social mission",
                  )}
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <CosmicShore />
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {missionScales.map((scale, index) => (
                <article className="bg-card p-5 sm:p-6" key={firstText(scale.id)}>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-foreground-muted">
                    {String(index + 1).padStart(2, "0")} · Scale of help
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-semibold">
                    {firstText(scale.label)}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-foreground-muted">
                    {firstText(scale.promise)}
                  </p>
                  <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-foreground-muted">
                    {firstText(scale.publicLine)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <StewardshipPanel stewardship={stewardship} />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="world-class-title"
          className="border-b border-primary-foreground/20 bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/58">
                {worldClassLanguage.websiteSection.eyebrow}
              </p>
              <h2
                className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
                id="world-class-title"
              >
                {worldClassLanguage.websiteSection.title}
              </h2>
            </div>

            <div>
              <blockquote className="border-l-2 border-accent pl-5 text-xl font-medium leading-8 text-primary-foreground-secondary sm:text-2xl sm:leading-9">
                {worldClassLanguage.publicTriad[0]}
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/72">
                {worldClassLanguage.websiteSection.description}
              </p>
              <p className="mt-5 max-w-2xl font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-primary-foreground/56">
                {worldClassLanguage.claimCeiling}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary transition-transform hover:-translate-y-0.5"
                  href={worldClassLanguage.routes.manifesto}
                >
                  Read the working manifesto
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  href={executableDistinctions.routes.essay}
                >
                  Follow words into consequence
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  href={crossDomainResearchProgram.routes.program}
                >
                  Test the correspondence
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  href={LANGUAGE_HREF}
                >
                  Browse governed language
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  href={worldClassLanguage.routes.doctrine}
                >
                  Trace it into Boundary First
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/55 px-5 py-5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <EvidenceVitalsBar
              description="These corpus-wide figures sit beside the public claim ceiling; they are context, not proof of the institutional proposition."
              items={claimEvidenceVitals}
              stamp={EVIDENCE_SNAPSHOT_STAMP}
              title="Current claim-evidence context"
            />
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

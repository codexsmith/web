import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleDot,
  Compass,
  GitBranch,
  Route,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicationMechanicsLab } from "@/components/publication-mechanics-lab";
import { PublicationSectionLead } from "@/components/publication-section-lead";
import {
  publicationContent,
  publicationPhases,
  type PublicationCard,
} from "@/lib/publication-suite";
import { ATLAS_HREF } from "@/lib/site-navigation";
import { getSiteOrigin } from "@/lib/site";
import {
  CIVILIZATIONAL_MECHANICS_PATH,
  PUBLICATION_MECHANICS,
  publicationMechanicsHref,
} from "@/lib/publication-navigation";

export const metadata: Metadata = {
  title: "Civilizational Mechanics",
  description:
    "A Boundary First Labs public learning pathway from externalized consequence and institutional agency to representational revision and civilizational repair.",
  alternates: {
    canonical: "/publications/civilizational-mechanics",
  },
  openGraph: {
    title: "Civilizational Mechanics",
    description:
      "Civilization is an executable representation that must learn to revise itself before it fails beneath its own model.",
    type: "article",
    url: "/publications/civilizational-mechanics",
  },
};

function StepCard({ card, order }: { card: PublicationCard; order: number }) {
  return (
    <article
      className="scroll-mt-24 border border-border bg-background"
      id={`step-${card.id}`}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {card.kicker}
          </span>
          <span className="font-mono text-[11px] font-semibold text-muted-foreground">
            {String(order + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight">
          {card.title}
        </h3>
        <blockquote className="mt-4 border-l-2 border-accent pl-4 text-base font-medium leading-7 text-foreground/82">
          {card.quote}
        </blockquote>
        <p className="mt-5 text-sm leading-7 text-foreground/70">
          {card.summary}
        </p>
      </div>

      <details className="group border-t border-border bg-card/65">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-7">
          Inspect the mechanics
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
          {[
            ["Mechanism", card.mechanism],
            ["Consequence", card.consequence],
            ["Repair", card.repair],
            [
              "Accessible visual form",
              `${card.visualization.mobileFallback} ${card.visualization.reducedMotionFallback}`,
            ],
          ].map(([label, body]) => (
            <div className="bg-card p-5 sm:p-6" key={label}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/72">
                {body}
              </p>
            </div>
          ))}
        </div>
      </details>
    </article>
  );
}

export default async function CivilizationalMechanicsPage({
  searchParams,
}: PageProps<"/publications/civilizational-mechanics">) {
  const params = await searchParams;
  const requestedMechanic = Array.isArray(params.mechanic)
    ? params.mechanic[0]
    : params.mechanic;
  const activeMechanic = PUBLICATION_MECHANICS.some(
    ({ id }) => id === requestedMechanic,
  )
    ? requestedMechanic
    : "nested-interiors";
  const { hero, featuredCards, rootCards, repairRoutes, claimCeiling } =
    publicationContent;
  const siteOrigin = getSiteOrigin();
  const cardOrder = new Map(
    featuredCards.map((card, index) => [card.id, index]),
  );
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Civilizational Mechanics",
    description: hero.subhead,
    version: "0.1",
    mainEntityOfPage: `${siteOrigin}${CIVILIZATIONAL_MECHANICS_PATH}`,
    publisher: {
      "@id": `${siteOrigin}/#organization`,
    },
    isPartOf: {
      "@id": `${siteOrigin}/#website`,
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="border-b border-border px-5 py-9 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground underline-offset-4 hover:underline"
              href="/publications"
            >
              Publications
            </Link>
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
              Doctrine · version 0.1
            </span>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end">
            <div>
              <h1 className="font-serif text-4xl font-semibold leading-none tracking-tight sm:text-6xl">
                Civilizational Mechanics
              </h1>
              <p className="mt-3 max-w-3xl font-serif text-xl font-semibold leading-snug text-foreground/76 sm:text-2xl">
                {hero.headline}
              </p>
            </div>
            <p className="max-w-2xl text-sm font-medium leading-7 text-foreground/70 sm:text-base">
              Trace displaced consequence, diagnose broken return paths, and
              select bounded repairs through a public learning route.
            </p>
          </div>
          <div className="mt-7 grid overflow-hidden border border-primary bg-primary text-primary-foreground lg:grid-cols-[minmax(0,0.85fr)_minmax(20rem,1.15fr)] lg:items-center">
            <div className="p-4 sm:p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                Root pattern
              </p>
              <p className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                Capacity to act − required return path = exported consequence
              </p>
            </div>
            <p className="border-t border-primary-foreground/20 p-4 text-xs leading-6 text-primary-foreground/70 sm:p-5 sm:text-sm lg:border-l lg:border-t-0">
              {claimCeiling}
            </p>
          </div>
        </div>
      </section>

      <nav
        aria-label="Publication contents"
        className="sticky top-16 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur-xl sm:top-20"
      >
        <div className="mx-auto flex min-h-12 max-w-[90rem] snap-x items-center gap-2 overflow-x-auto px-5 py-1.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            ...PUBLICATION_MECHANICS.map(({ id, label }) => ({
              label,
              href: publicationMechanicsHref("", { mechanic: id }),
              active: id === activeMechanic,
            })),
            {
              active: false,
              label: "Learning pathway",
              href: "#learning-pathway",
            },
            { active: false, label: "Repair routes", href: "#repair-routes" },
            {
              active: false,
              label: "Research context",
              href: "#research-context",
            },
          ].map(({ active, href, label }) => (
            <Link
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 snap-start items-center rounded-sm border px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-4 ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <Suspense
        fallback={
          <section
            aria-busy="true"
            className="border-b border-border bg-card/55 px-5 py-10 sm:px-8 sm:py-14"
          >
            <div className="mx-auto h-80 max-w-7xl border border-border bg-background" />
          </section>
        }
      >
        <PublicationMechanicsLab />
      </Suspense>

      <section
        className="scroll-mt-20 px-5 py-10 sm:px-8 sm:py-14"
        id="learning-pathway"
      >
        <div className="mx-auto max-w-7xl">
          <PublicationSectionLead
            description="Twelve steps from a recognizable transfer of consequence to a bounded repair and an explicit test of return."
            eyebrow="Twelve steps"
            icon={GitBranch}
            title="Learning pathway"
          />

          <div className="mt-8 grid gap-10">
            {publicationPhases.map((phase, phaseIndex) => {
              const phaseCards = phase.stepIds
                .map((stepId) =>
                  featuredCards.find((card) => card.id === stepId),
                )
                .filter((card): card is PublicationCard => Boolean(card));

              return (
                <section
                  className="scroll-mt-24"
                  id={`phase-${phase.id}`}
                  key={phase.id}
                >
                  <div className="mb-5 grid gap-3 border-b border-border pb-5 sm:grid-cols-[4rem_minmax(0,1fr)]">
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                      Phase {String(phaseIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">
                        {phase.label}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/68">
                        {phase.purpose}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {phaseCards.map((card) => (
                      <StepCard
                        card={card}
                        key={card.id}
                        order={cardOrder.get(card.id) ?? 0}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-20 border-y border-border bg-card/55 px-5 py-10 sm:px-8 sm:py-14"
        id="root-lenses"
      >
        <div className="mx-auto max-w-7xl">
          <PublicationSectionLead
            description="Ten distinct ways a return path can fail. Similar structure does not make their evidence, authority, or remedies interchangeable."
            eyebrow="Ten diagnostic frames"
            icon={Compass}
            title="Root lenses"
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {rootCards.map((card, index) => (
              <article className="bg-background p-6 sm:p-8" key={card.id}>
                <div className="flex items-center justify-between gap-4">
                  <CircleDot className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold">
                  {card.title}
                </h3>
                <blockquote className="mt-4 text-sm font-medium leading-7 text-foreground/76">
                  {card.quote}
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-20 px-5 py-10 sm:px-8 sm:py-14"
        id="repair-routes"
      >
        <div className="mx-auto max-w-7xl">
          <PublicationSectionLead
            description="Eight typed responses, chosen by the broken return path and closed by an explicit test—not by whichever intervention is most familiar."
            eyebrow="Eight response types"
            icon={Route}
            title="Repair routes"
          />

          <div className="mt-8 grid gap-3">
            {repairRoutes.map((route, index) => (
              <details
                className="group border border-border bg-background"
                key={route.id}
              >
                <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[2.25rem_minmax(0,1fr)_1.5rem] items-center gap-3 px-5 py-4 sm:px-6">
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl font-semibold sm:text-2xl">
                    {route.title}
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
                  {[
                    ["Use when", route.useWhen],
                    ["Required inputs", route.requiredInputs],
                    ["Operations", route.operations],
                    ["Outputs", route.outputs],
                  ].map(([label, values]) => (
                    <div className="bg-card p-5 sm:p-6" key={label as string}>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {label as string}
                      </p>
                      <ul className="mt-4 grid gap-2">
                        {(values as string[]).map((value) => (
                          <li
                            className="grid grid-cols-[1rem_1fr] gap-2 text-sm leading-6 text-foreground/72"
                            key={value}
                          >
                            <span aria-hidden="true">·</span>
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-primary p-5 text-primary-foreground sm:p-6">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
                    Closure test
                  </p>
                  <p className="mt-3 text-sm leading-7 text-primary-foreground/78">
                    {route.closureTest}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-20 border-t border-border bg-primary px-5 py-10 text-primary-foreground sm:px-8 sm:py-14"
        id="research-context"
      >
        <div className="mx-auto max-w-7xl">
          <PublicationSectionLead
            description="The publication provides orientation. Domain records retain source context, claim status, limits, and the distinction between theory, method, program, and doctrine."
            eyebrow="Source boundaries"
            inverse
            title="Research context and records"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
              href="/domain/boundary-first"
            >
              Boundary First record
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/40 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
              href="/domain/representational-mechanics"
            >
              Representational Mechanics
            </Link>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/40 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
              href={ATLAS_HREF}
            >
              Open the Atlas
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

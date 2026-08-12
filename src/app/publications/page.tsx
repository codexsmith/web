import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Network,
  Radar,
  ShieldCheck,
  Tags,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageMasthead } from "@/components/page-masthead";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { crossDomainResearchProgram } from "@/lib/cross-domain-research-program";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
  researchEvidenceVitals,
} from "@/lib/evidence-vitals";
import { executableDistinctions } from "@/lib/executable-distinctions";
import { languageSystem } from "@/lib/language-system";
import { publicationContent } from "@/lib/publication-suite";
import { worldClassLanguage } from "@/lib/world-class-language";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Read Boundary First Labs public doctrine, learning pathways, and repair routes with explicit claim ceilings and links back to the research corpus.",
  alternates: {
    canonical: "/publications",
  },
};

const publicationForms = [
  {
    title: "Doctrine",
    description:
      "A bounded public statement of the framework, its governing propositions, and its present claim ceiling.",
    icon: BookOpen,
  },
  {
    title: "Learning pathway",
    description:
      "An ordered route from familiar consequence problems into mechanics, diagnosis, and repair.",
    icon: GitBranch,
  },
  {
    title: "Repair routes",
    description:
      "Typed operational responses with required inputs, outputs, and an explicit closure test.",
    icon: ShieldCheck,
  },
];

const programPreviews = [
  {
    eyebrow: "Social, economic, and digital systems",
    title: "Social Lawfulness, Consequence, and Repair",
    description:
      "A first survey of how social order, economic accounting, delegated agency, privacy, scientific inquiry, and public access meet in one repair-oriented systems program.",
    claim:
      "Research and publication program; its domain claims remain evidence-dependent.",
    href: "/artifact/social-lawfulness-consequence-and-repair",
    icon: Network,
  },
  {
    eyebrow: "AI governance and security",
    title: "Digital Non-Aggression, Non-Destruction, and Non-Interference",
    description:
      "An introduction to automated digital aggression, authorized-purpose integrity, responsibility continuity, bounded defensive exceptions, and repair.",
    claim:
      "Concept-stage governance and engineering program; not a completed treaty or statement of law.",
    href: "/artifact/digital-non-aggression-program-introduction",
    icon: Radar,
  },
  {
    eyebrow: "Software, evidence, and AI operations",
    title: "Consequence-Bearing Development and AI Repair Loops",
    description:
      "A practical introduction to keeping AI-assisted work open until independent evidence exposes discrepancy, repair is owned, and closure is earned.",
    claim:
      "Candidate operating framework; the protocol and service still require worked cases, field use, and external comparison.",
    href: "/artifact/consequence-bearing-development-and-ai-repair-loops",
    secondaryHref: "/artifact/bounded-consequence-circuit-protocol-preview",
    secondaryLabel: "Inspect the protocol",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Language governance and editorial operations",
    title: "The Governed Language Garden",
    description:
      "A public registry separating institutional language, research hypotheses, campaign variants, and semantic firewalls while preserving source and replacement paths.",
    claim: languageSystem.claimCeiling,
    href: languageSystem.routes.registry,
    secondaryHref: languageSystem.routes.governanceNote,
    secondaryLabel: "Read the operating policy",
    icon: Tags,
  },
];

const publicPositions = [
  {
    eyebrow: "Institutional language and public capacity",
    title: "World Class Is a Capacity We Give",
    description: worldClassLanguage.websiteSection.description,
    claim: worldClassLanguage.claimCeiling,
    href: worldClassLanguage.routes.manifesto,
    instrumentHref: worldClassLanguage.routes.doctrine,
    instrumentLabel: "Trace the doctrine",
  },
  {
    eyebrow: "Institutional value and delegated agency",
    title: "People Make the Value. People Are Not Overhead.",
    description:
      "A public doctrine about accounting boundaries, human capacity, hidden repair labor, B2B agency depth, and the difference between reducing a cost and relocating its consequence.",
    claim:
      "Public doctrine seed and inquiry frame; not an accounting standard, universal economic theory, or claim that every efficiency or B2B relationship is extractive.",
    href: "/artifact/people-make-the-value-people-are-not-overhead",
    instrumentHref: "/artifact/people-are-not-overhead-review-worksheet",
    instrumentLabel: "Use the worksheet",
  },
];

export default function PublicationsPage() {
  const { featuredCards, rootCards, repairRoutes, claimCeiling } =
    publicationContent;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageMasthead
        deck="Public doctrine should remain bounded, navigable, and repairable."
        description="Publications are public learning objects. They interpret and route the research corpus without silently promoting doctrine into empirical or formal proof."
        eyebrow="Public learning objects"
        title="Publications"
      />

      <section className="border-b border-border bg-card/55 px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <EvidenceVitalsBar
            description="The public collection exposes source presence, operating verification, bounded comparisons, and negative results before asking a reader to trust a claim."
            items={claimEvidenceVitals}
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Current claim-evidence context"
          />
        </div>
      </section>

      <section
        aria-labelledby="executable-distinctions-title"
        className="border-b border-primary-foreground/20 bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/58">
                Working public argument · Version {executableDistinctions.version}
              </p>
              <h2
                className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
                id="executable-distinctions-title"
              >
                {executableDistinctions.title}
              </h2>
              <blockquote className="mt-7 border-l-2 border-accent pl-5 text-xl font-medium leading-8 text-primary-foreground-secondary sm:text-2xl sm:leading-9">
                {executableDistinctions.thesis}
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/72">
                {executableDistinctions.summary}
              </p>
              <Link
                className="mt-8 inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary transition-transform hover:-translate-y-0.5"
                href={executableDistinctions.routes.essay}
              >
                Read the working essay
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="grid overflow-hidden border border-primary-foreground/24 bg-primary-foreground/15 sm:grid-cols-3">
              {executableDistinctions.layers.map((layer, index) => (
                <li
                  className="border-b border-primary-foreground/20 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                  key={layer.id}
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground-muted">
                    {String(index + 1).padStart(2, "0")} · {layer.label}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold">
                    {layer.question}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-primary-foreground-secondary">
                    {layer.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 border-t border-primary-foreground/20 pt-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
              From symbol to repair
            </p>
            <ol className="mt-4 grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
              {executableDistinctions.consequencePath.map((step, index) => (
                <li
                  className="bg-primary px-4 py-4 text-sm font-medium leading-6 text-primary-foreground/82"
                  key={step}
                >
                  <span className="mr-2 font-mono text-[10px] text-primary-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-4xl font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-primary-foreground/56">
              {executableDistinctions.claimCeiling}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cross-domain-research-title"
        className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Active bounded research program · Version {crossDomainResearchProgram.version}
              </p>
              <h2
                className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl"
                id="cross-domain-research-title"
              >
                {crossDomainResearchProgram.title}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/74">
                {crossDomainResearchProgram.objective}
              </p>
              <blockquote className="mt-7 max-w-3xl border-l-2 border-accent pl-5 text-base leading-8 text-foreground-muted">
                {crossDomainResearchProgram.negativeResultRule}
              </blockquote>
              <Link
                className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-85"
                href={crossDomainResearchProgram.routes.program}
              >
                Inspect the research note
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <EvidenceVitalsBar
              description="Counts describe the current bounded program; they do not promote its candidate mappings into proof."
              eyebrow="Working research body"
              items={researchEvidenceVitals}
              layout="stacked"
              stamp={EVIDENCE_SNAPSHOT_STAMP}
              title="Research program vitals"
            />
          </div>

          <div className="mt-10">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              Evidence ladder
            </p>
            <ol className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {crossDomainResearchProgram.mappingGrades.map((grade) => (
                <li className="bg-background p-5" key={grade.level}>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    {grade.level}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">
                    {grade.label}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-foreground/66">
                    {grade.criterion}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {crossDomainResearchProgram.caseStudies.map((caseStudy) => (
              <article className="bg-background p-6 sm:p-8" key={caseStudy.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    Completed bounded comparison
                  </span>
                  <span className="border border-border bg-card px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                    {caseStudy.mappingDecision.grade}
                  </span>
                </div>
                <h3 className="mt-5 max-w-xl font-serif text-3xl font-semibold">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">
                  {caseStudy.result}
                </p>
                <div className="mt-6 border-l-2 border-accent pl-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                    False collapse exposed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground-muted">
                    {caseStudy.falseCollapse}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-5xl font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-foreground-muted">
            {crossDomainResearchProgram.claimCeiling}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden border border-border bg-border lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
            <article className="bg-background p-6 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-border bg-card px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]">
                  Public doctrine
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                  Version 0.1
                </span>
              </div>
              <h2 className="mt-7 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">
                Civilizational Mechanics
              </h2>
              <blockquote className="mt-6 max-w-3xl border-l-2 border-accent pl-5 text-xl font-medium leading-8 text-foreground/82 sm:text-2xl sm:leading-9">
                Civilization is an executable representation that must learn to
                revise itself before it fails beneath its own model.
              </blockquote>
              <p className="mt-6 max-w-3xl text-base leading-8 text-foreground-muted">
                A twelve-step pathway from displaced consequence and
                institutional agency through Boundary First mechanics,
                representational evolution, and typed routes to repair.
              </p>
              <Link
                className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-85"
                href="/publications/civilizational-mechanics"
              >
                Read the publication
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>

            <aside className="grid bg-card">
              {[
                ["Learning steps", featuredCards.length],
                ["Root lenses", rootCards.length],
                ["Repair routes", repairRoutes.length],
              ].map(([label, value]) => (
                <div
                  className="flex items-center justify-between border-b border-border p-6 last:border-b-0 sm:p-8"
                  key={label}
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    {label}
                  </span>
                  <span className="font-serif text-4xl font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Program previews
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
                More work is entering public view.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-foreground-muted lg:justify-self-end">
              These introductions survey developing programs, connect them to
              the existing research corpus, and expose their present limits.
              They are invitations into work in progress, not announcements of
              finished doctrine.
            </p>
          </div>

          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {programPreviews.map(
              ({
                eyebrow,
                title,
                description,
                claim,
                href,
                secondaryHref,
                secondaryLabel,
                icon: Icon,
              }) => (
                <article
                  className="flex min-h-full flex-col bg-background p-6 sm:p-9"
                  key={title}
                >
                  <div className="flex items-center gap-3 text-foreground-muted">
                    <Icon className="h-5 w-5" />
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
                      {eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-6 max-w-xl font-serif text-3xl font-semibold sm:text-4xl">
                    {title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-foreground-muted">
                    {description}
                  </p>
                  <div className="mt-7 border-l-2 border-accent pl-4">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                      Present claim ceiling
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground-muted">
                      {claim}
                    </p>
                  </div>
                  <Link
                    className="mt-8 inline-flex min-h-11 items-center self-start font-mono text-[11px] font-semibold uppercase tracking-[0.15em] underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
                    href={href}
                  >
                    Read the introduction
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  {secondaryHref && secondaryLabel && (
                    <Link
                      className="mt-4 inline-flex min-h-8 items-center self-start font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted underline decoration-border underline-offset-6 transition-colors hover:text-foreground"
                      href={secondaryHref}
                    >
                      {secondaryLabel}
                    </Link>
                  )}
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Public positions
          </p>
          {publicPositions.map(
            ({
              eyebrow,
              title,
              description,
              claim,
              href,
              instrumentHref,
              instrumentLabel,
            }) => (
              <article
                className="mt-7 grid overflow-hidden border border-border bg-border lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                key={title}
              >
                <div className="bg-primary p-6 text-primary-foreground sm:p-9 lg:p-12">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
                    {eyebrow}
                  </p>
                  <h2 className="mt-5 max-w-2xl font-serif text-4xl font-semibold sm:text-5xl">
                    {title}
                  </h2>
                </div>
                <div className="bg-background p-6 sm:p-9 lg:p-12">
                  <p className="text-base leading-8 text-foreground/74">
                    {description}
                  </p>
                  <div className="mt-7 border-l-2 border-accent pl-4">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                      Present claim ceiling
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground-muted">
                      {claim}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
                      href={href}
                    >
                      Read the position
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      className="inline-flex min-h-12 items-center border border-border bg-card px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                      href={instrumentHref}
                    >
                      {instrumentLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Publication grammar
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {publicationForms.map(({ title, description, icon: Icon }) => (
              <article className="bg-background p-6 sm:p-8" key={title}>
                <Icon className="h-6 w-6 text-foreground-muted" />
                <h2 className="mt-5 font-serif text-3xl font-semibold">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Claim ceiling
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Orientation is not proof.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-primary-foreground/76">
              {claimCeiling}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary"
                href="/work"
              >
                Inspect work and evidence
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-primary-foreground/40 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                href="/domains"
              >
                Browse the research corpus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  CircleDot,
  Diamond,
  FlaskConical,
  Hexagon,
  Layers3,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useGraph } from "../context/GraphContext";
import {
  asRecord,
  asRecordArray,
  asString,
  asStringArray,
} from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { EngagementHeroes } from "@/components/engagement-heroes";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { SectionJumpNavigation } from "@/components/public-interface/SectionJumpNavigation";
import { WorkProjectionGroups } from "@/components/public-interface/WorkProjectionGroups";
import {
  ProjectCard,
  WorkCard,
  type SeedProject,
  type WorkAdjudication,
  type WorkPortfolioItem,
} from "@/components/work-layer-cards";
import portfolioData from "@/content/work_portfolio.json";
import adjudicationData from "@/content/work_adjudication.json";
import projectIndex from "@/content/project_index.json";
import { ATLAS_HREF, ATLAS_LIST_HREF } from "@/lib/site-navigation";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";
import { phase12Launch } from "@/lib/phase12-launch";

const objectGrammar = [
  {
    label: "Program",
    description: "A governed line of inquiry or development.",
    icon: Layers3,
    href: "#work-programs-methods",
    action: "Browse programs",
  },
  {
    label: "Project",
    description: "Bounded work with a current objective and lifecycle.",
    icon: Box,
    href: "#projects",
    action: "Open project index",
  },
  {
    label: "Product",
    description: "A maintained instrument that has passed stewardship gates.",
    icon: Hexagon,
    href: "#work-public-products",
    action: "Browse products",
  },
  {
    label: "Artifact",
    description: "A durable record, release, paper, model, or implementation.",
    icon: Diamond,
    href: "/publications",
    action: "Browse publications",
  },
  {
    label: "Service",
    description: "A bounded professional or institutional practice.",
    icon: Wrench,
    href: "#systems-audit",
    action: "View current service",
  },
  {
    label: "Testbed",
    description: "A controlled environment for contact, failure, and evidence.",
    icon: FlaskConical,
    href: "/methods#practice-cycle",
    action: "Open practice cycle",
  },
];

export default function WorkPage() {
  const { nodes } = useGraph();
  const identity = nodes.find((node) => node.id === "identity");
  const evidence = asRecord(identity?.evidenceArchitecture);
  const portfolio = asRecord(identity?.portfolioGovernance);
  const stages = asRecordArray(evidence.stages);
  const lifecycle = asRecordArray(portfolio.lifecycle);
  const requiredRecords = asStringArray(portfolio.requiredRecords);
  const workItems = portfolioData.items as WorkPortfolioItem[];
  const adjudications = new Map(
    (adjudicationData.records as WorkAdjudication[]).map((record) => [
      record.sourceId,
      record,
    ]),
  );
  const projects = projectIndex.projects as SeedProject[];
  const systemsAudit = phase12Launch.systemsAudit;
  const boundaryFirstChess = phase12Launch.boundaryFirstChess;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <PageMasthead
        deck="Work earns promotion through contact with reality."
        description={asString(evidence.principle)}
        eyebrow="Evidence, stewardship, and release"
        title="Work & evidence"
      />

      <SectionJumpNavigation
        label="Work contents"
        items={[
          { label: "Snapshot", href: "#snapshot" },
          { label: "Systems Audit", href: "#systems-audit" },
          { label: "Chess", href: "#boundary-first-chess" },
          { label: "Work types", href: "#work-types" },
          { label: "Promotion", href: "#promotion" },
          { label: "Portfolio", href: "#portfolio" },
          { label: "Projects", href: "#projects" },
          { label: "Active work", href: "#active-work" },
          { label: "Engage", href: "#engage" },
        ]}
      />

      <section className="scroll-mt-32 border-b border-border bg-card/55 px-5 py-5 sm:px-8" id="snapshot">
        <div className="mx-auto max-w-7xl">
          <EvidenceVitalsBar
            description="Source presence, operating verification, bounded cases, and recorded breakpoints remain distinct measures."
            items={claimEvidenceVitals}
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Current claim-evidence context"
          />
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <BookOpen className="h-7 w-7 text-muted-foreground" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Publication · v0.1
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Civilizational Mechanics
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-foreground/70">
              A public learning pathway from displaced consequence and
              institutional agency through Boundary First mechanics,
              representational evolution, and eight typed routes to repair.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
                href="/publications/civilizational-mechanics"
              >
                Read the publication
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-border bg-background px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                href="/publications"
              >
                Publication index
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-border bg-background px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                href={ATLAS_LIST_HREF}
              >
                Browse Atlas list
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="systems-audit">
        <span aria-hidden="true" className="block scroll-mt-32" id="current-offer" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="bg-primary p-6 text-primary-foreground sm:p-9 lg:p-12">
              <Wrench className="h-7 w-7" />
              <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                {systemsAudit.status}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                {systemsAudit.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-primary-foreground/76">
                {systemsAudit.summary}
              </p>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7 text-primary-foreground/68">
                {systemsAudit.availabilityNote}
              </p>
            </div>

            <div className="bg-background p-6 sm:p-9 lg:p-12">
              <p className="max-w-3xl text-lg leading-8 text-foreground/76">
                {systemsAudit.idealFor}
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Working inputs
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {systemsAudit.inputs.map((input) => (
                      <li className="flex gap-3 text-sm leading-6" key={input}>
                        <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Engagement boundaries
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {systemsAudit.boundaries.map((boundary) => (
                      <li className="flex gap-3 text-sm leading-6" key={boundary}>
                        <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        {boundary}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="mt-9 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Concrete outputs
              </h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {systemsAudit.deliverables.map((deliverable) => (
                  <div
                    className="flex gap-3 border border-border bg-card p-4 text-sm leading-6"
                    key={deliverable}
                  >
                    <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    {deliverable}
                  </div>
                ))}
              </div>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground/68">
                <span className="font-semibold text-foreground">Success condition: </span>
                {systemsAudit.successCondition}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
                  href={systemsAudit.primaryAction.href}
                >
                  {systemsAudit.primaryAction.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  className="inline-flex min-h-12 items-center border border-border bg-card px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                  href="/business"
                >
                  See enterprise practice
                </Link>
              </div>
            </div>
          </div>

          <aside className="grid border-x border-b border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10" aria-labelledby="ai-audit-track-title">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {systemsAudit.relatedTrack.status}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold" id="ai-audit-track-title">
                {systemsAudit.relatedTrack.title}
              </h3>
            </div>
            <div>
              <p className="text-sm leading-7 text-foreground/70">
                {systemsAudit.relatedTrack.description}
              </p>
              <Link className="mt-5 inline-flex min-h-10 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.13em] hover:underline" href={systemsAudit.relatedTrack.href}>
                Read the focused framework
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20" id="boundary-first-chess">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="bg-background p-6 sm:p-9 lg:p-12">
              <Layers3 className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
              <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {boundaryFirstChess.status}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                {boundaryFirstChess.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-foreground/74">
                {boundaryFirstChess.summary}
              </p>
              <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground/68">
                {boundaryFirstChess.availabilityNote}
              </p>
            </div>

            <div className="bg-primary p-6 text-primary-foreground sm:p-9 lg:p-12">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/58">
                    Current forms
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {boundaryFirstChess.currentForms.map((form) => (
                      <li className="flex gap-3 text-sm leading-6 text-primary-foreground/78" key={form}>
                        <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {form}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/58">
                    Launching forms
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {boundaryFirstChess.launchingForms.map((form) => (
                      <li className="flex gap-3 text-sm leading-6 text-primary-foreground/78" key={form}>
                        <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {form}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-8 border-t border-primary-foreground/20 pt-6 text-sm leading-7 text-primary-foreground/72">
                {boundaryFirstChess.futureBoundary}
              </p>
              <p className="mt-4 text-xs leading-6 text-primary-foreground/58">
                {boundaryFirstChess.claimBoundary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary"
                  href={boundaryFirstChess.primaryAction.href}
                >
                  {boundaryFirstChess.primaryAction.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                  href="#work-research-programs"
                >
                  Inspect related work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border bg-card/50 px-5 py-12 sm:px-8 sm:py-16" id="work-types">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Typed work objects
          </p>
          <nav
            aria-label="Browse typed work objects"
            className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {objectGrammar.map(({ label, description, icon: Icon, href, action }) => (
              <Link
                aria-label={`${action}: ${label}`}
                className="group flex min-h-56 flex-col bg-background p-5 transition-colors hover:bg-muted/55 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:p-6"
                href={href}
                key={label}
              >
                <span className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </span>
                <h2 className="mt-4 font-serif text-2xl font-semibold">
                  {label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-foreground/68">
                  {description}
                </p>
                <span className="mt-auto pt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground">
                  {action}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="scroll-mt-32 px-5 py-14 sm:px-8 sm:py-20" id="promotion">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Promotion sequence
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              One ladder, domain-specific gates.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/70">
              {asString(evidence.promotionRule)}
            </p>
          </div>
          <ol className="mt-10 grid border-l border-t border-border md:grid-cols-3">
            {stages.map((stage, index) => (
              <li
                className="border-b border-r border-border bg-card p-5 sm:p-6"
                key={asString(stage.id)}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Gate {String(index + 1).padStart(2, "0")}
                  </span>
                  <CircleDot className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">
                  {asString(stage.label)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/68">
                  {asString(stage.description)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-32 border-y border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="stewardship">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <ShieldCheck className="h-8 w-8" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Product stewardship gate
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              No product without stewardship and closure.
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {(requiredRecords.length
              ? requiredRecords
              : [
                  "Named steward",
                  "Public-value thesis",
                  "Maintenance path",
                  "Support boundary",
                  "Funding path",
                  "Correction process",
                  "Retirement, transfer, or open-release condition",
                ]
            ).map((record) => (
              <div
                className="flex gap-3 border border-primary-foreground/35 bg-primary-foreground/[0.08] p-4 text-sm leading-6"
                key={record}
              >
                <span className="font-mono text-primary-foreground/45">+</span>
                {record}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lifecycle.length > 0 && (
        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio lifecycle
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {lifecycle.map((stage, index) => (
                <article
                  className="border border-border bg-card p-5"
                  key={asString(stage.id)}
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    {asString(stage.label)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-foreground/68">
                    {asString(stage.description)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <WorkProjectionGroups />

      <section className="scroll-mt-32 border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20" id="projects">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Provisional project index
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Six bounded projects, with missing records left visible.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/70">
              These records come from the reviewed migration seed. They are
              useful for navigation, but they are not promoted as complete
              operational records: stewardship and next-gate decisions remain
              explicitly unrecorded.
            </p>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 px-5 py-14 sm:px-8 sm:py-20" id="active-work">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Active work context
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">
                Navigate work through theory, evidence, and governance.
              </h2>
            </div>
            <Link
              className="inline-flex min-h-11 items-center border border-border bg-card px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
              href={ATLAS_HREF}
            >
              Open atlas filters <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workItems.map((item) => (
              <WorkCard
                adjudication={adjudications.get(item.sourceId)}
                key={item.sourceId}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      <EngagementHeroes context="work" />
      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleDot,
  Layers3,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { EngagementHeroes } from "@/components/engagement-heroes";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { SectionJumpNavigation } from "@/components/public-interface/SectionJumpNavigation";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";
import { phase12Launch } from "@/lib/phase12-launch";
import { ATLAS_HREF } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Work & Evidence",
  description:
    "A public overview of Boundary First Labs work, evidence standing, current promoted surfaces, stewardship, and the route into the full Work Index.",
  alternates: { canonical: "/work" },
};

const civilizationalMechanics = phase12Launch.featuredWork.find(
  (item) => item.id === "civilizational-mechanics",
);

if (!civilizationalMechanics) {
  throw new Error("Phase 12 launch binding must expose Civilizational Mechanics.");
}

const proofSurfaces = [
  {
    id: "civilizational-mechanics",
    eyebrow: "Publication",
    title: civilizationalMechanics.title,
    status: civilizationalMechanics.status,
    summary: civilizationalMechanics.summary,
    href: civilizationalMechanics.action.href,
    action: civilizationalMechanics.action.label,
    icon: BookOpen,
  },
  {
    id: "systems-audit",
    eyebrow: phase12Launch.systemsAudit.category,
    title: phase12Launch.systemsAudit.title,
    status: phase12Launch.systemsAudit.status,
    summary: phase12Launch.systemsAudit.summary,
    href: phase12Launch.systemsAudit.secondaryAction.href,
    action: phase12Launch.systemsAudit.secondaryAction.label,
    icon: Wrench,
  },
  {
    id: "boundary-first-chess",
    eyebrow: phase12Launch.boundaryFirstChess.category,
    title: phase12Launch.boundaryFirstChess.title,
    status: phase12Launch.boundaryFirstChess.status,
    summary: phase12Launch.boundaryFirstChess.summary,
    href: phase12Launch.boundaryFirstChess.primaryAction.href,
    action: phase12Launch.boundaryFirstChess.primaryAction.label,
    icon: Layers3,
  },
] as const;

const promotionSequence = [
  {
    label: "Record the object",
    body: "Keep the artifact, claim, project, service, or program distinguishable enough that its source, scope, owner, and current state can be reconstructed.",
  },
  {
    label: "Attach the evidence",
    body: "Operational contact, bounded cases, external verification, counterexamples, and open gates remain attached to the particular claim they support.",
  },
  {
    label: "Earn stewardship",
    body: "A maintained public surface needs an owner, correction path, support boundary, maintenance logic, and a retirement or transfer condition—not just a successful launch.",
  },
  {
    label: "Promote only what survived",
    body: "Stronger standing applies only inside the tested boundary. Neighboring records do not inherit authority simply because they sit in the same portfolio.",
  },
] as const;

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <PageMasthead
        actions={
          <Link
            className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
            href="/work/index"
          >
            Open Work Index
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        }
        deck="Work earns promotion through contact with reality."
        description="This page is the evidence overview. The full portfolio inventory lives in the Work Index so the main reading path can stay focused on standing, promoted surfaces, and stewardship."
        eyebrow="Evidence, stewardship, and release"
        title="Work & evidence"
      />

      <SectionJumpNavigation
        label="Work overview"
        items={[
          { label: "Snapshot", href: "#snapshot" },
          { label: "Promoted surfaces", href: "#promoted-surfaces" },
          { label: "Promotion", href: "#promotion" },
          { label: "Full index", href: "#full-index" },
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

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="promoted-surfaces">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(14rem,0.48fr)_minmax(0,1.52fr)]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Current proof surfaces
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Start with the work that has a clear public role now.
              </h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                These are not the entire portfolio. They are current public surfaces with explicit status and a concrete route for inspection or use.
              </p>
            </div>

            <div className="border-y border-border">
              {proofSurfaces.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    className="group grid gap-4 border-b border-border py-6 last:border-b-0 lg:grid-cols-[2.5rem_3rem_14rem_minmax(0,1fr)_auto] lg:items-center"
                    href={item.href}
                    id={item.id}
                    key={item.id}
                  >
                    <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span className="grid h-10 w-10 place-items-center border border-border bg-card">
                      <Icon aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                    </span>
                    <div>
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-foreground-muted">{item.eyebrow}</span>
                      <h3 className="mt-1 font-serif text-xl font-semibold">{item.title}</h3>
                      <span className="mt-2 inline-block border border-border px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">{item.status}</span>
                    </div>
                    <p className="text-sm leading-7 text-foreground-muted">{item.summary}</p>
                    <span className="inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.11em]">
                      {item.action}
                      <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="promotion">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(14rem,0.5fr)_minmax(0,1.5fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Promotion discipline
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              The portfolio is not a pile. It is a sequence of earned public commitments.
            </h2>
            <p className="mt-5 text-sm leading-7 text-primary-foreground-secondary">
              Presence in the corpus, usefulness in practice, external verification, public release, and maintained stewardship are different states. The interface should keep them different.
            </p>
          </div>

          <ol className="border-l border-primary-foreground/25">
            {promotionSequence.map((step, index) => (
              <li className="relative border-b border-primary-foreground/20 py-5 pl-7 last:border-b-0" key={step.label}>
                <span aria-hidden="true" className="absolute -left-1 top-7 h-2 w-2 bg-primary-foreground" />
                <p className="font-mono text-[9px] text-primary-foreground-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold">{step.label}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="full-index">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.56fr)] lg:items-center">
          <div>
            <Search aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Full inventory · separate surface
            </p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
              Need the projects, products, services, artifacts, provisional records, and active programs?
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted">
              Use the Work Index when the task is discovery. It keeps filters, work kinds, record authority, maturity, and the complete retained inventory without turning this evidence overview into a catalog.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Choose the inspection tool
            </p>
            <Link className="mt-5 flex min-h-12 items-center justify-between border-b border-border py-3 font-semibold" href="/work/index">
              Filterable Work Index
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link className="flex min-h-12 items-center justify-between py-3 font-semibold" href={ATLAS_HREF}>
              Atlas relationship view
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div id="engage">
        <EngagementHeroes context="work" />
      </div>
      <SiteFooter />
    </main>
  );
}

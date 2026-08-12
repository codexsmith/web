import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
  Network,
  Layers3,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { ATLAS_HREF } from "@/lib/site-navigation";
import { phase12Launch } from "@/lib/phase12-launch";

export default function BusinessLandingPage() {
  const { systemsAudit } = phase12Launch;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />

      <main>
        <PageMasthead
          actions={
            <>
              <a
                href={systemsAudit.primaryAction.href}
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-foreground px-5 font-mono text-[11px] uppercase tracking-widest text-background transition-opacity hover:opacity-90"
              >
                Request a Systems Audit <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="#solutions"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-border px-5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-muted"
              >
                View Capabilities
              </Link>
            </>
          }
          deck="Make the actual system around the code visible."
          description="The Boundary First Systems Audit is available on request, alongside scoped architecture and engineering work for organizations operating under consequential constraints."
          eyebrow="Systems Audit · Available on request"
          title="Systems audit & enterprise practice"
        />

        {/* Value Proposition */}
        <section
          id="solutions"
          className="bg-card/55 border-b border-border/50 px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Enterprise capabilities
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Delivering precision across critical infrastructure.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <article className="rounded-sm border border-border border-t-2 border-t-accent bg-background p-6 sm:p-8">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-serif text-xl font-semibold">
                  Risk Mitigation
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Identify and secure failure modes before they manifest in
                  production environments.
                </p>
              </article>

              <article className="rounded-sm border border-border border-t-2 border-t-accent bg-background p-6 sm:p-8">
                <Zap className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-serif text-xl font-semibold">
                  Performance Scaling
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Optimize systems for high-throughput and low-latency under
                  extreme load conditions.
                </p>
              </article>

              <article className="rounded-sm border border-border border-t-2 border-t-accent bg-background p-6 sm:p-8">
                <BarChart3 className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-serif text-xl font-semibold">
                  Strategic Alignment
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Align technical architecture directly with core business
                  objectives and constraints.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden border border-border bg-border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div className="bg-primary p-6 text-primary-foreground sm:p-9 lg:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60">
                  Institutional position
                </p>
                <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
                  People make the value. People are not overhead.
                </h2>
                <p className="mt-6 text-base leading-8 text-primary-foreground/74">
                  People are the source. People are the destination.
                  Institutions are the means.
                </p>
              </div>
              <div className="bg-background p-6 sm:p-9 lg:p-12">
                <p className="text-base leading-8 text-foreground/74">
                  Enterprise practice should distinguish a legitimate cost
                  category from a complete account of the people and capacities
                  that make operation possible. A local saving is incomplete
                  when the burden simply moves to workers, customers,
                  operations, public systems, or future repair.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Who made and sustained the value?",
                    "Who receives usable value?",
                    "Who carries the displaced cost?",
                    "Who can contest and demand repair?",
                  ].map((question) => (
                    <div
                      className="border border-border bg-card p-4 text-sm leading-6"
                      key={question}
                    >
                      {question}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex min-h-12 items-center border border-border bg-card px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                    href="/artifact/people-make-the-value-people-are-not-overhead"
                  >
                    Read the public position
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
                    href="/artifact/people-are-not-overhead-review-worksheet"
                  >
                    Open the review worksheet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                What sets this apart
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Research-grade foundations. Production-grade delivery.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
              <p>
                Enterprise consulting from Boundary First Labs is backed by a
                working research program spanning mathematics, systems theory,
                governance, software, and AI. Engagements draw on explicit
                methods and inspectable structures while keeping observations,
                analysis, assumptions, and recommendations distinct.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-border bg-card p-5">
                  <Network className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Method
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                    Every system is modeled as a boundary graph — failure modes,
                    dependencies, and repair paths become first-class objects.
                  </p>
                </div>
                <div className="rounded-sm border border-border bg-card p-5">
                  <Layers3 className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Deliverable
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                    Architecture documents, risk matrices, working prototypes,
                    and operator training — not slide decks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="border-t border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-24"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/65">
                Get started
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
                Bring one consequential system into view.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-primary-foreground/70">
                The method and working material are developed; the audit is
                configured around your actual system, access boundary, and
                decision need when requested.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={systemsAudit.primaryAction.href}
                className="inline-flex items-center justify-center rounded-sm bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-90"
              >
                Request a Systems Audit <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/work#systems-audit"
                className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/40 px-5 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors hover:bg-primary-foreground/10"
              >
                Review Scope
              </Link>
              <Link
                href={ATLAS_HREF}
                className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/40 px-5 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors hover:bg-primary-foreground/10"
              >
                Research Map
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

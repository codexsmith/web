import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import { EntranceIntentConsole } from "@/components/journey/EntranceIntentConsole";
import { PublicLandingCarousel } from "@/components/product-landing/PublicLandingCarousel";
import { getPublicLandingCarouselItems } from "@/lib/product-landing-carousel";

const disclosureLayers = [
  {
    label: "Laboratory",
    question: "What is this, who is responsible, and how is the work governed?",
    entrance: "Laboratory",
    href: "/about",
  },
  {
    label: "Practice",
    question: "What does this look like in a real system?",
    entrance: "Software",
    href: "/software",
  },
  {
    label: "Method",
    question: "How is the practice structured?",
    entrance: "Methods",
    href: "/methods",
  },
  {
    label: "Evidence",
    question: "What supports or limits the claim?",
    entrance: "Evidence",
    href: "/evidence",
  },
  {
    label: "Research",
    question: "Why might the pattern generalize?",
    entrance: "Research",
    href: "/research",
  },
  {
    label: "Formal core",
    question: "What is the underlying structure?",
    entrance: "Theory",
    href: "/theory",
  },
] as const;

const inspectability = [
  {
    label: "Work & evidence",
    body: "See what has actually been built, recorded, operated, or bounded—and the claim ceilings attached to it.",
    href: "/work",
  },
  {
    label: "Governance & standards",
    body: "Inspect how stewardship, criticism, public claims, correction, and institutional limits are handled.",
    href: "/governance",
  },
  {
    label: "Collaborate",
    body: "Choose a declared operating relationship with explicit authority, evidence, and closure boundaries.",
    href: "/collaborate",
  },
] as const;

export function InstitutionalVestibuleHome() {
  const publicLandingCarouselItems = getPublicLandingCarouselItems();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(23rem,0.96fr)] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              Independent research & engineering lab
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
              Understand what holds a system together. Change it without losing what matters.
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-foreground-muted sm:text-xl sm:leading-9">
              Boundary First Labs studies how complex systems are structured, how their parts depend on one another, and how they can be changed without losing what matters.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-foreground-muted">
              We develop practical methods for making boundaries, obligations, evidence, and repair paths explicit—then use them to diagnose, build, test, and change real systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                href="/software"
              >
                Start with a real problem
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-border bg-card px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
                href="/work"
              >
                Inspect the record
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden border border-border bg-primary p-5 text-primary-foreground sm:p-6 lg:p-7">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3.5rem_3.5rem]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div className="max-w-md">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
                    How the work deepens
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    One body of work. Different depths.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground-secondary">
                    Enter at the depth your question requires. The deeper layers remain available without becoming prerequisites.
                  </p>
                </div>
                <CosmicShoreMark className="h-16 w-16 shrink-0" surface="dark" variant="compact" />
              </div>

              <div className="mt-5 border-y border-primary-foreground/20">
                {disclosureLayers.map((layer, index) => (
                  <div
                    className="grid grid-cols-[2rem_6.75rem_minmax(0,1fr)] gap-3 border-b border-primary-foreground/15 py-3 last:border-b-0 sm:grid-cols-[2.25rem_7.5rem_minmax(0,1fr)]"
                    key={layer.label}
                  >
                    <span className="font-mono text-[9px] text-primary-foreground-muted">
                      {String(index).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em]">
                      {layer.label}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs leading-5 text-primary-foreground-secondary">
                        {layer.question}
                      </span>
                      <Link
                        className="mt-1 inline-flex items-center font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-primary-foreground hover:underline"
                        href={layer.href}
                      >
                        Enter through {layer.entrance}
                        <ArrowRight aria-hidden="true" className="ml-1.5 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EntranceIntentConsole />

      <section className="border-b border-border bg-primary px-5 py-12 text-primary-foreground sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
              Inspect the laboratory
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              The machinery around the work is part of the public surface.
            </h2>
            <p className="mt-4 text-sm leading-7 text-primary-foreground-secondary">
              Provenance, standards, limits, correction paths, and collaboration boundaries should be inspectable without forcing every visitor through them first.
            </p>
          </div>

          <div className="border-y border-primary-foreground/20">
            {inspectability.map((item, index) => (
              <Link
                className="group grid gap-3 border-b border-primary-foreground/15 py-5 last:border-b-0 sm:grid-cols-[2.5rem_12rem_minmax(0,1fr)_auto] sm:items-center"
                href={item.href}
                key={item.label}
              >
                <span className="font-mono text-[9px] text-primary-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-xl font-semibold">{item.label}</h3>
                <p className="text-sm leading-6 text-primary-foreground-secondary">{item.body}</p>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PublicLandingCarousel
        description="Browse the current governed public projections after choosing a general entrance. Each lens keeps its maturity and claim boundary attached."
        eyebrow="Boundary First Labs · Public work"
        items={publicLandingCarouselItems}
        title="Go sideways through the work when you are ready."
      />

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Code2,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import {
  featuredPublicWork,
  institutionalRoutes,
} from "@/lib/p1-public-shell";

const capabilityCards = [
  {
    title: "Software & systems",
    description:
      "Diagnose, understand, build, and change complex software and socio-technical systems without losing the properties that matter.",
    href: "/software",
    icon: Code2,
  },
  {
    title: "Research & method",
    description:
      "Develop and test reusable methods for boundaries, evidence, representation, repair, and systemic change.",
    href: "/research",
    icon: FlaskConical,
  },
  {
    title: "Institutions & governance",
    description:
      "Study accountability, lifecycle, authority, public consequence, and repair where responsibility crosses organizational boundaries.",
    href: "/governance",
    icon: Building2,
  },
  {
    title: "Modeling & theory",
    description:
      "Investigate the deeper formal structure beneath the applied work without requiring that formalism at the front door.",
    href: "/theory",
    icon: BookOpen,
  },
] as const;

export function InstitutionalVestibuleHome() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              Independent research & engineering lab
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              Make complex systems legible before they fail us.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-foreground-muted sm:text-xl sm:leading-9">
              Boundary First Labs studies how complex systems hold together, fail, and can be changed without losing what matters.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-foreground-muted">
              We develop practical methods for diagnosing systems, understanding their structure, building reliable replacements, and changing them safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                href="/software"
              >
                Start with software
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-border bg-card px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
                href="/about"
              >
                Explore the institute
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden border border-border bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3.5rem_3.5rem]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
                  One corpus · controlled projections
                </p>
                <CosmicShoreMark className="h-16 w-16" surface="dark" variant="compact" />
              </div>
              <div className="mt-8 space-y-3">
                {["Institution", "Practice", "Method", "Evidence", "Research", "Formal core"].map((label, index) => (
                  <div className="flex items-center gap-4" key={label}>
                    <span className="w-8 font-mono text-[9px] text-primary-foreground-muted">
                      {String(index).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-primary-foreground/20" />
                    <span className="w-28 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-primary-foreground/20 pt-5 text-sm leading-7 text-primary-foreground-secondary">
                Complexity is not removed. It is progressively disclosed at the depth where it becomes useful.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Choose a path</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Start at the layer that matches your question.</h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {institutionalRoutes.map((route, index) => (
              <Link className="group bg-background p-6 transition-colors hover:bg-card" href={route.href} key={route.title}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">{String(index + 1).padStart(2, "0")} · {route.label}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{route.title}</h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{route.description}</p>
                <span className="mt-7 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Enter <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">What we work on</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Different domains. The same demand for legibility, evidence, and repair.</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {capabilityCards.map(({ title, description, href, icon: Icon }) => (
              <Link className="group bg-background p-6 sm:p-8" href={href} key={title}>
                <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">{description}</p>
                <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Explore <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="featured-work">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Selected work</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Inspect the work, not just the claim.</h2>
            </div>
            <Link className="inline-flex min-h-11 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.13em] hover:underline" href="/work">Browse the portfolio <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {featuredPublicWork.map((item) => (
              <Link className="group bg-card p-6" href={item.href} key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{item.kind}</span>
                  <span className="border border-border bg-background px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">{item.status}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.summary}</p>
                <p className="mt-6 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.11em] text-foreground-muted">{item.role}</p>
                <span className="mt-5 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Inspect record <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">Institute & trust</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Make the institution inspectable.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground-secondary">Boundary First Labs is being built around a retained portfolio and provenance corpus. Governance, evidence status, institutional limits, and public claims remain visible rather than being hidden behind branding.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2">
            {[
              ["History & provenance", "Where the work came from and how present methods relate to prior practice.", "/about"],
              ["Governance & standards", "How claims, stewardship, criticism, and institutional responsibility are bounded.", "/governance"],
              ["Work & evidence", "What has actually been built, operated, investigated, or recorded.", "/work"],
              ["Collaborate", "Ways to inquire, contribute, test, challenge, or work with the lab.", "/collaborate"],
            ].map(([title, description, href]) => (
              <Link className="group bg-primary p-5" href={href} key={title}>
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary-foreground-secondary">{description}</p>
                <span className="mt-5 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Inspect <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">There is a deeper framework</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Software is a demonstration domain, not the project boundary.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">The same mechanics are investigated across institutions, governance, scientific models, infrastructure, mathematics, and other systems whose behavior depends on what their representations preserve, omit, permit, and repair.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground" href="/research">Explore the research <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleDot,
  Database,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers3,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  sandboxEntries,
  sandboxPromotionRule,
  civicChangeBoundary,
  type SandboxKind,
} from "@/lib/sandbox-registry";

export const metadata: Metadata = {
  title: "Sandbox Registry",
  description:
    "Boundary First Labs testbeds, representation experiments, and bounded operational sandboxes with explicit promotion boundaries.",
  alternates: { canonical: "/sandbox" },
};

const kindIcons: Record<SandboxKind, LucideIcon> = {
  "representation-lab": Layers3,
  "interaction-research": Activity,
  "guided-sequence": GitBranch,
  "bounded-testbed": Gauge,
  "research-operations": Database,
  "evidence-infrastructure": ScanSearch,
};

const operatingLoop = [
  ["01", "Specify", "Declare the represented object and its boundary."],
  ["02", "Operate", "Change state through explicit controls or lawful transforms."],
  ["03", "Observe", "Expose consequence, defect, evidence, and missing structure."],
  ["04", "Repair", "Change the representation or system without laundering the defect."],
  ["05", "Promote", "Advance standing only through a separate review gate."],
] as const;

export default function SandboxRegistryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-border bg-[#0f2138] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.22] [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full border border-brand-gold/20" />
        <div className="pointer-events-none absolute -right-4 top-28 -z-10 h-48 w-48 rounded-full border border-brand-gold/15" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.65fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-2 w-2 bg-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Sandbox registry · instrument bay
              </p>
              <span className="border border-white/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
                R&amp;D / bounded contact
              </span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] sm:text-7xl">
              Contact with reality without automatic promotion.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">
              These are working instruments, not showroom mockups. A sandbox should make a representation do something, expose what changes, and preserve the boundary between an interesting result and a stronger public claim.
            </p>
          </div>

          <aside className="border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">
                  Operating loop
                </p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                SBX / 05
              </span>
            </div>
            <ol className="mt-5 grid gap-2">
              {operatingLoop.map(([index, title, body]) => (
                <li className="grid grid-cols-[2.2rem_1fr] gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0" key={title}>
                  <span className="font-mono text-[9px] font-semibold text-brand-gold">{index}</span>
                  <div>
                    <strong className="font-serif text-lg text-white/92">{title}</strong>
                    <p className="mt-1 text-xs leading-5 text-white/50">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Active apparatus
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Choose an instrument. Make the boundary move.
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {sandboxEntries.length} registered surfaces
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {sandboxEntries.map((entry, index) => {
              const Icon = kindIcons[entry.kind];
              return (
                <article
                  className="group relative overflow-hidden border border-border bg-background p-6 shadow-[7px_7px_0_rgba(15,33,56,0.06)] transition-transform hover:-translate-y-1"
                  key={entry.id}
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-foreground/15 transition-colors group-hover:bg-accent" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center border border-border bg-card">
                      <Icon className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                        SB-{String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">
                          {entry.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                    {entry.kind.replaceAll("-", " ")}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-[1.05]">{entry.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">{entry.purpose}</p>

                  <div className="mt-6 border-y border-border bg-card/45 px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-foreground-muted" aria-hidden="true" />
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                        Test signal
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-foreground-muted">{entry.tests}</p>
                  </div>

                  <div className="mt-5 grid grid-cols-[1.4rem_1fr] gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-foreground-muted" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                        Promotion boundary
                      </p>
                      <p className="mt-2 text-xs leading-6 text-foreground-muted">{entry.boundary}</p>
                    </div>
                  </div>

                  <Link
                    className="mt-7 inline-flex min-h-11 items-center border border-foreground bg-foreground px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-background hover:text-foreground"
                    href={entry.href}
                  >
                    Operate sandbox
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-[#18212f] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Promotion gate
              </p>
            </div>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              A compelling toy can still be wrong.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/60">
              The sandbox layer exists to generate contact, evidence, defects, and better questions—not to launder visual coherence into authority.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="border border-white/15 bg-white/[0.035] p-6">
              <div className="flex items-center gap-3">
                <CircleDot className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                  Sandbox promotion rule
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">{sandboxPromotionRule}</p>
            </article>
            <article className="border border-white/15 bg-white/[0.035] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                  Civic/change boundary
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">{civicChangeBoundary}</p>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sandboxEntries, sandboxPromotionRule, civicChangeBoundary } from "@/lib/sandbox-registry";

export const metadata: Metadata = {
  title: "Sandbox Registry",
  description:
    "Boundary First Labs testbeds, representation experiments, and bounded operational sandboxes with explicit promotion boundaries.",
  alternates: { canonical: "/sandbox" },
};

export default function SandboxRegistryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Sandbox registry</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Contact with reality without automatic promotion.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            BFL sandboxes are places where representations, methods, tools, and bounded practices can fail visibly enough to teach us something. Their status remains separate from the maturity of the claims or programs they touch.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {sandboxEntries.map((entry) => (
              <article className="bg-background p-6" key={entry.id}>
                <div className="flex items-start justify-between gap-4">
                  <FlaskConical className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
                  <span className="border border-border bg-card px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">
                    {entry.status}
                  </span>
                </div>
                <p className="mt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  {entry.kind.replaceAll("-", " ")}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold">{entry.title}</h2>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{entry.purpose}</p>
                <dl className="mt-6 space-y-4 border-t border-border pt-5 text-sm leading-6">
                  <div>
                    <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">What it tests</dt>
                    <dd className="mt-1">{entry.tests}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Promotion boundary</dt>
                    <dd className="mt-1 text-foreground-muted">{entry.boundary}</dd>
                  </div>
                </dl>
                <Link className="mt-6 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline" href={entry.href}>
                  Open sandbox <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 sm:p-8">
            <ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Promotion rule</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">{sandboxPromotionRule}</p>
          </article>
          <article className="border border-border bg-card p-6 sm:p-8">
            <ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Civic/change boundary</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">{civicChangeBoundary}</p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

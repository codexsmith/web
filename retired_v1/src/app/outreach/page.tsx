import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { outreachProjections } from "@/lib/outreach-projections";

export const metadata: Metadata = {
  title: "Outreach",
  description:
    "Audience-specific Boundary First Labs projections over one governed corpus.",
  alternates: { canonical: "/outreach" },
};

export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Reusable outreach projections</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Different entrances. The same governed body of work.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            These projections adapt emphasis and route order for different audiences without creating separate claims, evidence states, or canonical descriptions.
          </p>
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {outreachProjections.map((projection) => (
            <article className="bg-card p-6 sm:p-8" key={projection.id}>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{projection.audience}</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold">{projection.headline}</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">{projection.summary}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {projection.proofPoints.map((point) => <li key={point}>• {point}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground" href={projection.primaryAction.href}>{projection.primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" href={projection.secondaryAction.href}>{projection.secondaryAction.label}</Link>
              </div>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-foreground-muted">Boundary: {projection.boundary}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

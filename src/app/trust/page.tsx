import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, CircleDashed, Network, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import governanceProjection from "@/content/public-projections/governance.json";
import { asRecord, asRecordArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Institutional Trust",
  description:
    "A compact register of Boundary First Labs governance, formation, evidence, accessibility, citation, and public-record surfaces.",
  alternates: { canonical: "/trust" },
};

const payload = asRecord(governanceProjection.payload);
const publicRecord = asRecord(payload.publicRecord);
const formation = asRecord(payload.formation);
const items = asRecordArray(publicRecord.items);

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">Institutional trust register</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">Make the institution inspectable without pretending it is finished.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground-secondary">{firstText(publicRecord.purpose)}</p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Formation state</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Current institutional reality.</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">{firstText(formation.currentReality)}</p>
            <p className="mt-5 border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">{firstText(formation.publicPosition)}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {items.map((item) => {
              const status = firstText(item.status);
              const published = status.includes("published");
              return (
                <article className="bg-card p-5" key={firstText(item.id)}>
                  {published ? <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-foreground-muted" /> : <CircleDashed aria-hidden="true" className="h-4 w-4 text-foreground-muted" />}
                  <h3 className="mt-4 font-serif text-xl font-semibold">{firstText(item.label)}</h3>
                  <p className="mt-2 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.11em] text-foreground-muted">{status}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          <TrustLink title="Governance" body="Authority, evidence, criticism, stewardship, correction, and formation boundaries." href="/governance" />
          <TrustLink title="Evidence grammar" body="Standing, claim ceilings, boundary conditions, provenance, and open evidence gates." href="/evidence" />
          <TrustLink title="Accessibility" body="The semantic accessibility commitments governing public interaction and visual representations." href="/accessibility" />
          <TrustLink title="Work index" body="The governed and provisional portfolio records currently exposed through the public Work schema." href="/work/index" />
          <TrustLink title="Architecture acceptance" body="The outer architecture's invariants, definition-of-done criteria, structural checks, and remaining human review gates." href="/trust/architecture" />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <BookOpen aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Known trust surfaces still under construction stay named.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">The public register already names AI-use disclosure, publication and claim discipline, corrections/supersessions/retractions, institutional changelog, formation status, and challenge-response infrastructure as incomplete or not-yet-published. This page does not silently fill those gaps.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground" href="/governance">Inspect governance <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function TrustLink({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link className="group bg-background p-6" href={href}>
      <h2 className="font-serif text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
      <span className="mt-5 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Inspect <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

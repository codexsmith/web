import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleDot, ShieldCheck } from "lucide-react";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildInquiryHref } from "@/lib/inquiry";
import { getWorkRecord, workRecords } from "@/lib/work-records";

type WorkRecordPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: WorkRecordPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getWorkRecord(slug);
  if (!record) return { title: "Work record" };
  return {
    title: record.title,
    description: record.summary,
    alternates: { canonical: record.canonicalHref },
  };
}

export default async function WorkRecordPage({ params }: WorkRecordPageProps) {
  const { slug } = await params;
  const record = getWorkRecord(slug);
  if (!record) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted hover:text-foreground" href="/work/index">
            <ArrowLeft aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
            Work index
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">{record.kind.replace(/-/g, " ")}</span>
            <span className={`border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${record.authority === "governed" ? "border-foreground" : "border-border text-foreground-muted"}`}>{record.authority}</span>
          </div>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">{record.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">{record.summary}</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          <Metric label="Standing" value={record.standing} />
          <Metric label="Operating state" value={record.operatingState ?? "Not separately recorded"} />
          <Metric label="Lifecycle" value={record.lifecycleStage ?? "Not separately recorded"} />
          <Metric label="Domain / class" value={record.domain ?? "Cross-domain / unclassified"} />
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 sm:p-8">
            <ShieldCheck aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Claim ceiling</p>
            <p className="mt-4 text-base leading-8">{record.claimCeiling}</p>
          </article>
          <article className="border border-border bg-card p-6 sm:p-8">
            <CircleDot aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Evidence boundary</p>
            <p className="mt-4 text-base leading-8">{record.evidenceBoundary}</p>
          </article>
        </div>
      </section>

      {record.relationships.length ? (
        <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Recorded relationships</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {record.relationships.map((relation) => (
                <span className="border border-border bg-background px-3 py-2 text-xs" key={relation}>{relation}</span>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-6 text-foreground-muted">Relationship presence is descriptive. It does not imply endorsement, adoption, operational success, or equivalent maturity between linked records.</p>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border border-border bg-card p-6 sm:p-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Continue from this record.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted">Inspect its original public surface when one exists, or preserve this record as context in an inquiry.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {record.sourceHref ? <Link className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]" href={record.sourceHref}>Original surface <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" /></Link> : null}
            <Link className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground" href={buildInquiryHref({ intent: "work", source: record.canonicalHref, topic: record.title, record: record.id })}>Inquire about this work <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-5">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6">{value.replace(/-/g, " ")}</p>
    </div>
  );
}

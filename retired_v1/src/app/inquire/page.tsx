import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Route, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildInquiryMailto,
  normalizeInquiryContext,
  type InquiryIntent,
} from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Contact Boundary First Labs while preserving the work, research, or collaboration context that brought you here.",
  alternates: { canonical: "/inquire" },
};

type InquiryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function intent(value: string | undefined): InquiryIntent {
  switch (value) {
    case "work":
    case "collaboration":
    case "research":
    case "evidence":
    case "accessibility":
      return value;
    default:
      return "general";
  }
}

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const params = await searchParams;
  const context = normalizeInquiryContext({
    source: first(params.source),
    topic: first(params.topic),
    record: first(params.record),
    intent: intent(first(params.intent)),
  });
  const mailto = buildInquiryMailto(context);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.65fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Context-preserving inquiry
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Keep the question attached to the system it came from.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
              Boundary First Labs uses one inquiry path across software, research, evidence, collaboration, and institutional questions. The route preserves enough context to continue the conversation without making you restate where you started.
            </p>
          </div>

          <aside className="border border-border bg-card p-6 sm:p-8">
            <Route aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              Preserved context
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <ContextRow label="Intent" value={context.intent} />
              <ContextRow label="Topic" value={context.topic} />
              <ContextRow label="Record" value={context.record} />
              <ContextRow label="Source" value={context.source} />
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <Mail aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
              Open a pre-contextualized message.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">
              The current release uses a generated email handoff rather than a server-side contact database. That preserves source context immediately without introducing collection or retention machinery that has not yet been governed.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
            href={mailto}
          >
            Start the inquiry
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          <TrustCard
            title="Small intake"
            body="The first contact should identify the purpose and system context, not force a lead-generation questionnaire."
          />
          <TrustCard
            title="No silent authority"
            body="An inquiry, collaboration, funding conversation, or review request does not imply affiliation, endorsement, authorship, or adoption."
          />
          <TrustCard
            title="Governed next step"
            body="If a relationship proceeds, collaboration boundaries, evidence expectations, roles, and closure conditions are declared separately."
          />
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-wrap gap-4 text-sm">
          <Link className="inline-flex min-h-10 items-center hover:underline" href="/collaborate">
            Collaboration doctrine
          </Link>
          <Link className="inline-flex min-h-10 items-center hover:underline" href="/governance">
            Governance commitments
          </Link>
          <Link className="inline-flex min-h-10 items-center hover:underline" href="/trust">
            Institutional trust surfaces
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function ContextRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
        {label}
      </dt>
      <dd className="mt-1 leading-6">{value ?? "Not specified"}</dd>
    </div>
  );
}

function TrustCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="bg-card p-6">
      <ShieldCheck aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
      <h2 className="mt-4 font-serif text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
    </article>
  );
}

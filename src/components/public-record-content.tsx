import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { asRecord, asRecordArray, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import recordProjection from "@/content/public-projections/record.json";

const payload = asRecord(recordProjection.payload);
const publicRecord = asRecord(payload.publicRecord);
const citation = asRecord(payload.citationPolicy);
const formation = asRecord(payload.formation);
const records = asRecordArray(publicRecord.items);

function statusClass(status: string) {
  if (status === "published") return "border-emerald-800/25 bg-emerald-900/[0.06]";
  if (status.includes("working")) return "border-accent/45 bg-accent/[0.08]";
  return "border-border bg-card";
}

export function PublicRecordContent() {
  return (
    <div className="mt-8 border-t border-border pt-12 xl:mt-12 xl:pt-16">
      <PageMasthead
        deck={firstText(publicRecord.purpose)}
        description={firstText(formation.publicPosition)}
        eyebrow="Status · provenance · correction"
        inverse
        title="Public record"
      />

      <ProjectionProvenance
        boundary="A listed record may be published, working, queued, or not yet built. The status label is part of the record and must not be separated from its title."
        source={recordProjection.source}
      />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Institutional record index
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                What exists, what is working, and what remains to be built.
              </h2>
            </div>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {records.length} declared records
            </span>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record, index) => {
              const status = firstText(record.status);
              return (
                <article
                  className={`min-h-44 border p-5 ${statusClass(status)}`}
                  id={firstText(record.id)}
                  key={firstText(record.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[9px] text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-44 text-right font-mono text-[8px] font-semibold uppercase leading-4 tracking-[0.11em] text-foreground-muted">
                      {humanizeStatus(status)}
                    </span>
                  </div>
                  <h3 className="mt-7 font-serif text-2xl font-semibold">
                    {firstText(record.label)}
                  </h3>
                </article>
              );
            })}
          </div>

          <div className="mt-8 border border-border bg-card p-5 sm:p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              Required record metadata
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {asStringArray(publicRecord.metadataFields).map((field) => (
                <li className="border border-border bg-background px-3 py-2 text-xs" key={field}>
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <CircleDot aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Citation policy
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              {firstText(citation.headline)}
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              {firstText(citation.purpose)}
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {asStringArray(citation.rules).map((rule, index) => (
              <li className="bg-background p-4" key={rule}>
                <span className="font-mono text-[8px] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-xs font-medium leading-6">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20" id="challenges">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Challenge and correction route
            </p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
              A criticism needs somewhere durable to land.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">
              The full challenge-and-response register remains to be built. Until then, submissions should identify the affected page or record, the disputed claim or omission, and the evidence or consequence that warrants review.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
            href="mailto:contact@boundaryfirstlabs.com?subject=Public%20record%20challenge"
          >
            Submit a challenge
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

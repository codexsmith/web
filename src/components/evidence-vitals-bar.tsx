import type { EvidenceStatus, EvidenceVital } from "@/lib/evidence-vitals";
import {
  claimEvidenceStatus,
  claimEvidenceVitals,
  corpusEvidenceStatus,
  corpusEvidenceVitals,
  evidenceSnapshot,
  EVIDENCE_STANDING_LABELS,
  EVIDENCE_STANDING_MEANINGS,
  researchEvidenceVitals,
  researchProgramEvidenceStatus,
} from "@/lib/evidence-vitals";

type EvidenceVitalsBarProps = {
  className?: string;
  description?: string;
  eyebrow?: string;
  items: readonly EvidenceVital[];
  layout?: "inline" | "stacked";
  stamp?: string;
  status?: EvidenceStatus;
  title: string;
};

function boundStatusFor(items: readonly EvidenceVital[]): EvidenceStatus {
  if (items === claimEvidenceVitals) return claimEvidenceStatus;
  if (items === researchEvidenceVitals) return researchProgramEvidenceStatus;
  if (items === corpusEvidenceVitals) return corpusEvidenceStatus;
  return {
    standing: "recorded",
    appliesTo: "Contextual and supporting metrics.",
    claimCeiling:
      "Descriptive figures only; not formal proof or operational standing.",
    boundaryConditions: [
      "Metrics provide contextual boundaries for the current page surface.",
    ],
    provenanceRecords: [{ id: "institutional-register-summary" }],
    lastReviewed: evidenceSnapshot.generated,
  };
}

export function EvidenceVitalsBar({
  className = "",
  description,
  eyebrow = "Evidence status",
  items,
  stamp,
  status: statusOverride,
  title,
}: EvidenceVitalsBarProps) {
  const status = statusOverride ?? boundStatusFor(items);
  const standingLabel = EVIDENCE_STANDING_LABELS[status.standing];
  const standingMeaning = EVIDENCE_STANDING_MEANINGS[status.standing];

  return (
    <details className={`group border border-border bg-card ${className}`}>
      <summary className="flex min-h-14 cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden sm:px-5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
            {eyebrow}
          </span>
          <span className="border border-border bg-background px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
            {standingLabel}
          </span>
          {status.pending ? (
            <span className="border border-border bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
              Evidence pending
            </span>
          ) : null}
          <span className="text-xs font-medium text-foreground-muted">
            {title}
          </span>
        </span>
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          <span className="group-open:hidden">Inspect boundaries +</span>
          <span className="hidden group-open:inline">Close boundaries -</span>
        </span>
      </summary>
      <div className="border-t border-border px-4 py-5 sm:px-5">
        {description ? (
          <p className="max-w-4xl text-xs leading-6 text-foreground-muted">
            {description}
          </p>
        ) : null}
        <dl className="mt-4 grid gap-4 text-xs leading-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Standing
            </dt>
            <dd className="mt-1 text-foreground-muted">
              {standingLabel}. {standingMeaning}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Applies to
            </dt>
            <dd className="mt-1 text-foreground-muted">
              {status.appliesTo}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Claim ceiling
            </dt>
            <dd className="mt-1 text-foreground-muted">
              {status.claimCeiling}
            </dd>
          </div>
          {status.boundaryConditions?.length ? (
            <div className="sm:col-span-2">
              <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                Boundary conditions
              </dt>
              <dd className="mt-1">
                <ul className="list-disc space-y-1 pl-4 text-foreground-muted">
                  {status.boundaryConditions.map((condition) => (
                    <li key={condition}>{condition}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {status.pending ? (
            <div className="sm:col-span-2">
              <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                Pending gate · {EVIDENCE_STANDING_LABELS[status.pending.target]}
              </dt>
              <dd className="mt-1 text-foreground-muted">
                {status.pending.gate}
              </dd>
            </div>
          ) : null}
        </dl>
        <dl className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div className="bg-background p-4" key={item.id}>
              <dt className="font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.12em] text-foreground-muted">
                {item.label}
              </dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">
                {item.value}
              </dd>
              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </dl>
        {status.publicReferences?.length ? (
          <div className="mt-5 border-t border-border pt-4">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Named / external references
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {status.publicReferences.map((reference) => (
                <li key={`${reference.kind}:${reference.label}`}>
                  {reference.href ? (
                    <a
                      className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                      href={reference.href}
                      rel={reference.kind === "external" ? "noreferrer" : undefined}
                      target={reference.kind === "external" ? "_blank" : undefined}
                    >
                      {reference.label}
                    </a>
                  ) : (
                    reference.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {status.lastReviewed || stamp ? (
          <p className="mt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-foreground-muted">
            {[status.lastReviewed ? `Reviewed ${status.lastReviewed}` : null, stamp]
              .filter(Boolean)
              .join(" · ")}
          </p>
        ) : null}
      </div>
    </details>
  );
}

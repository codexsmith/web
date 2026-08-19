'use client';

import { useState } from "react";
import {
  claimEvidenceStatus,
  corpusEvidenceStatus,
  EVIDENCE_STANDING_LABELS,
  EVIDENCE_STANDING_MEANINGS,
  researchProgramEvidenceStatus,
  type EvidenceStatus,
} from "@/lib/evidence-vitals";
import { ArrowRight, CircleDot, ShieldCheck } from "lucide-react";

const records = [
  {
    id: "corpus",
    label: "Institutional corpus",
    description: "What the retained register can establish about source presence and status tracking.",
    status: corpusEvidenceStatus,
  },
  {
    id: "collection",
    label: "Aggregate public claim context",
    description: "What the Work and Publications evidence summary can establish at collection level.",
    status: claimEvidenceStatus,
  },
  {
    id: "research",
    label: "Cross-domain research program",
    description: "What the current first-party comparative research program has actually operated and what remains externally unverified.",
    status: researchProgramEvidenceStatus,
  },
] as const;

function nextGate(status: EvidenceStatus) {
  if (status.standing === "withdrawn") return "No promotion gate: this assertion has been withdrawn.";
  if (status.pending) return status.pending.gate;
  if (status.standing === "externally-verified") return "No stronger standing is implied by this model. The claim ceiling still applies.";
  return "No promotion gate is declared on this aggregate record.";
}

export function EvidenceClaimReader() {
  const [activeId, setActiveId] = useState<(typeof records)[number]["id"]>("research");
  const active = records.find((record) => record.id === activeId) ?? records[2];
  const status = active.status;

  return (
    <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-[minmax(15rem,0.58fr)_minmax(0,1.42fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Read a claim record
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Standing answers one question. The claim ceiling answers another.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              Select a real public evidence object. The reader keeps referent, standing, scope, boundary conditions, and the next evidence gate together so stronger evidence cannot silently change the kind of claim being made.
            </p>

            <div className="mt-7 grid gap-1" role="tablist" aria-label="Evidence records">
              {records.map((record, index) => {
                const selected = record.id === active.id;
                return (
                  <button
                    aria-selected={selected}
                    className={`grid grid-cols-[2rem_1fr] gap-3 border px-3 py-3 text-left ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent hover:border-border hover:bg-card"
                    }`}
                    key={record.id}
                    onClick={() => setActiveId(record.id)}
                    role="tab"
                    type="button"
                  >
                    <span className="font-mono text-[9px]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-sm font-semibold">{record.label}</span>
                      <span className={`mt-1 block text-xs leading-5 ${selected ? "text-background/65" : "text-foreground-muted"}`}>
                        {record.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="overflow-hidden border border-border bg-card" role="tabpanel">
            <div className="bg-primary p-6 text-primary-foreground sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-primary-foreground-muted">
                    Current standing
                  </p>
                  <h3 className="mt-3 font-serif text-4xl font-semibold">
                    {EVIDENCE_STANDING_LABELS[status.standing]}
                  </h3>
                </div>
                <ShieldCheck aria-hidden="true" className="h-6 w-6 text-primary-foreground-muted" />
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">
                {EVIDENCE_STANDING_MEANINGS[status.standing]}
              </p>
            </div>

            <div className="grid gap-px bg-border md:grid-cols-2">
              <div className="bg-background p-6 sm:p-7">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Applies to
                </p>
                <p className="mt-3 text-sm leading-7">{status.appliesTo}</p>
              </div>
              <div className="bg-background p-6 sm:p-7">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Claim ceiling
                </p>
                <p className="mt-3 text-sm font-semibold leading-7">{status.claimCeiling}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Boundary conditions
              </p>
              <ul className="mt-4 grid gap-3">
                {(status.boundaryConditions ?? []).map((condition) => (
                  <li className="flex gap-3 text-sm leading-7 text-foreground-muted" key={condition}>
                    <CircleDot aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-l-2 border-accent pl-5">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  Next evidence gate
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">{nextGate(status)}</p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-xs text-foreground-muted">
                <span className="font-mono font-semibold uppercase tracking-[0.12em]">Provenance retained</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{status.provenanceRecords.map((record) => record.id).join(" · ")}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

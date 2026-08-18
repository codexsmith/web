'use client';

import { useMemo, useState } from "react";
import {
  Archive,
  CheckCircle2,
  CircleDot,
  GitBranch,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import content from "@/content/product-landing-pages/corpus-forge.json";

type GateKey = "provenance" | "scope" | "evidence" | "inference" | "review" | "repair";

type GateState = Record<GateKey, boolean>;

const initialGates: GateState = {
  provenance: true,
  scope: true,
  evidence: true,
  inference: false,
  review: false,
  repair: false,
};

const gateMeta: Array<{ key: GateKey; label: string }> = [
  { key: "provenance", label: content.promotionGrammar.gates[0] },
  { key: "scope", label: content.promotionGrammar.gates[1] },
  { key: "evidence", label: content.promotionGrammar.gates[2] },
  { key: "inference", label: content.promotionGrammar.gates[3] },
  { key: "review", label: content.promotionGrammar.gates[4] },
  { key: "repair", label: content.promotionGrammar.gates[5] },
];

export function CorpusPromotionLab() {
  const [gates, setGates] = useState<GateState>(initialGates);
  const [newContradiction, setNewContradiction] = useState(true);

  const readout = useMemo(() => {
    const count = Object.values(gates).filter(Boolean).length;
    let stateIndex = 0;

    if (gates.provenance) stateIndex = 1;
    if (gates.provenance && gates.scope) stateIndex = 2;
    if (gates.provenance && gates.scope && gates.evidence) stateIndex = 2;
    if (
      gates.provenance &&
      gates.scope &&
      gates.evidence &&
      gates.inference &&
      gates.review
    ) {
      stateIndex = 3;
    }
    if (stateIndex === 3 && gates.repair && !newContradiction) stateIndex = 4;
    if (stateIndex >= 3 && newContradiction) stateIndex = 5;

    const state = content.promotionGrammar.states[stateIndex];
    const missing = gateMeta.filter((gate) => !gates[gate.key]);

    if (newContradiction && stateIndex === 5) {
      return {
        state,
        code: "REPAIR QUEUE OPEN",
        body: "A contradictory source has arrived after review. The old representation is not deleted; the disagreement must be related, re-reviewed, and any dependent public object may need supersession or repair.",
        tone: "danger" as const,
        count,
        missing,
        stateIndex,
      };
    }

    if (stateIndex === 4) {
      return {
        state,
        code: "PUBLIC CLAIM ADMISSIBLE",
        body: "The synthetic claim has provenance, declared scope, represented support and tension, labeled inference, attributable review, and visible replacement obligations. Promotion is represented as a governed transition rather than a formatting choice.",
        tone: "good" as const,
        count,
        missing,
        stateIndex,
      };
    }

    if (stateIndex === 3) {
      return {
        state,
        code: "REVIEWED / NOT YET PUBLIC",
        body: "The claim has survived attributable review, but the replacement and repair boundary remains incomplete. It can be durable internally without being promoted to the strongest public state.",
        tone: "warn" as const,
        count,
        missing,
        stateIndex,
      };
    }

    return {
      state,
      code: "PROMOTION BLOCKED",
      body: "The claim remains below public promotion because one or more material gates are absent. Missing structure should stay visible instead of being papered over by polished prose.",
      tone: "neutral" as const,
      count,
      missing,
      stateIndex,
    };
  }, [gates, newContradiction]);

  return (
    <section
      className="border-b border-border bg-[#20160f] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="corpus-promotion-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Archive className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                FORGE-LAB-01 · claim promotion gate
              </p>
            </div>
            <h2
              className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="corpus-promotion-lab-title"
            >
              Promotion should be a state transition you can reconstruct later.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Operate the governed promotion gates on a synthetic claim. Then introduce a contradiction and watch the corpus retain history instead of silently rewriting the past.
            </p>

            <div className="mt-6 grid gap-2">
              {gateMeta.map((gate, index) => {
                const active = gates[gate.key];
                return (
                  <button
                    aria-pressed={active}
                    className={`grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 border px-3 py-3 text-left transition-colors ${
                      active
                        ? "border-brand-gold/42 bg-brand-gold/[0.065]"
                        : "border-white/11 bg-white/[0.025] hover:border-white/24"
                    }`}
                    key={gate.key}
                    onClick={() =>
                      setGates((current) => ({
                        ...current,
                        [gate.key]: !current[gate.key],
                      }))
                    }
                    type="button"
                  >
                    {active ? (
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                    ) : (
                      <CircleDot className="h-4 w-4 text-white/28" aria-hidden="true" />
                    )}
                    <span className={`text-xs leading-5 ${active ? "text-white/68" : "text-white/42"}`}>{gate.label}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-white/30">G{String(index + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            <button
              className="mt-4 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:text-white"
              onClick={() => {
                setGates(initialGates);
                setNewContradiction(true);
              }}
              type="button"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              Reset claim
            </button>
          </div>

          <div className="grid gap-4">
            <article className="relative overflow-hidden border border-white/15 bg-white/[0.035] p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">Maturity rail</p>
                    <p className="mt-2 text-sm leading-6 text-white/48">State identity remains attached while the claim moves or is superseded.</p>
                  </div>
                  <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/45">{readout.count}/6 gates represented</span>
                </div>

                <ol className="mt-6 grid gap-2 md:grid-cols-6">
                  {content.promotionGrammar.states.map((state, index) => {
                    const active = index === readout.stateIndex;
                    const passed = index < readout.stateIndex && readout.stateIndex !== 5;
                    return (
                      <li className={`border p-3 ${active ? "border-brand-gold bg-brand-gold/[0.08]" : passed ? "border-brand-green/30 bg-brand-green/[0.035]" : "border-white/10 bg-black/10"}`} key={state}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-mono text-[8px] ${active ? "text-brand-gold" : "text-white/28"}`}>{String(index + 1).padStart(2, "0")}</span>
                          {active ? <CircleDot className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" /> : null}
                        </div>
                        <p className={`mt-3 font-serif text-sm font-semibold leading-5 ${active ? "text-white/90" : "text-white/45"}`}>{state}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
              <article
                className={`border p-5 sm:p-6 ${
                  readout.tone === "danger"
                    ? "border-brand-red/45 bg-brand-red/[0.06]"
                    : readout.tone === "good"
                      ? "border-brand-green/45 bg-brand-green/[0.06]"
                      : readout.tone === "warn"
                        ? "border-brand-gold/42 bg-brand-gold/[0.055]"
                        : "border-white/15 bg-white/[0.03]"
                }`}
                aria-live="polite"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/36">Current corpus state</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold capitalize">{readout.state}</h3>
                  </div>
                  <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/46">{readout.code}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/56">{readout.body}</p>
                <div className="mt-5 border-t border-white/12 pt-4">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/32">Missing gates</p>
                  <p className="mt-2 text-xs leading-6 text-white/48">{readout.missing.length > 0 ? readout.missing.map((gate) => gate.label).join(" · ") : "None inside this toy grammar"}</p>
                </div>
              </article>

              <aside className="grid gap-3">
                <button
                  aria-pressed={newContradiction}
                  className={`border p-4 text-left transition-colors ${newContradiction ? "border-brand-red/45 bg-brand-red/[0.065]" : "border-white/12 bg-white/[0.025]"}`}
                  onClick={() => setNewContradiction((current) => !current)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/48">
                      <TriangleAlert className={`h-4 w-4 ${newContradiction ? "text-brand-red" : "text-white/30"}`} aria-hidden="true" />
                      New contradiction arrives
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-white/28">{newContradiction ? "present" : "absent"}</span>
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-white/45">The incident review now conflicts with the earlier design claim. Keep both source records and reopen the relationship rather than editing history into apparent consistency.</p>
                </button>

                <div className="border border-brand-gold/30 bg-brand-gold/[0.05] p-4">
                  <div className="flex items-start gap-3">
                    <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Replacement rule</p>
                      <p className="mt-2 text-[11px] leading-5 text-white/50">{content.definition.rule}</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="flex items-start gap-3 border-t border-white/12 pt-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              <p className="max-w-5xl text-[11px] leading-5 text-white/42">{content.workedExample.scopeNote} This instrument models the governance logic only; it is not evidence that a production Corpus Forge system currently enforces these gates automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

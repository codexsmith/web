'use client';

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Crosshair,
  RotateCcw,
  ShieldCheck,
  Swords,
} from "lucide-react";
import content from "@/content/product-landing-pages/boundary-first-chess.json";

type ConditionKey =
  | "materialGain"
  | "movesDefender"
  | "forcingReply"
  | "flightSquare"
  | "interpose";

const conditionMeta: Array<{
  key: ConditionKey;
  label: string;
  note: string;
}> = [
  {
    key: "materialGain",
    label: "Material gain exists",
    note: "The candidate move wins material immediately.",
  },
  {
    key: "movesDefender",
    label: "Only defender leaves",
    note: "The move removes a piece carrying a king-safety obligation.",
  },
  {
    key: "forcingReply",
    label: "Forcing check appears",
    note: "The opponent gains a forcing continuation after the boundary moves.",
  },
  {
    key: "flightSquare",
    label: "Flight square survives",
    note: "The king retains a legal escape route after the candidate move.",
  },
  {
    key: "interpose",
    label: "Defensive reply survives",
    note: "A block, capture, or equivalent defensive answer remains available.",
  },
];

const initialState: Record<ConditionKey, boolean> = {
  materialGain: true,
  movesDefender: true,
  forcingReply: true,
  flightSquare: false,
  interpose: false,
};

export function ChessBoundaryLab() {
  const [conditions, setConditions] = useState(initialState);

  const analysis = useMemo(() => {
    const kingClosure =
      conditions.movesDefender &&
      conditions.forcingReply &&
      !conditions.flightSquare &&
      !conditions.interpose;

    const materialIsRelevant = conditions.materialGain && !kingClosure;
    const needsCalculation =
      conditions.forcingReply &&
      (conditions.flightSquare || conditions.interpose) &&
      conditions.materialGain;

    if (kingClosure) {
      return {
        status: "Candidate fails boundary test",
        code: "REJECT / FALSIFY",
        body: "The material gain is downstream of a king-safety closure failure. Calculation should first try to falsify the forcing sequence, not celebrate the material count.",
        tone: "danger" as const,
      };
    }

    if (needsCalculation) {
      return {
        status: "Candidate remains live",
        code: "CALCULATE REPLY",
        body: "The move changes the boundary, but at least one defensive continuation survives. Deep calculation now has a concrete job: test whether that continuation actually holds.",
        tone: "warn" as const,
      };
    }

    if (materialIsRelevant) {
      return {
        status: "Conversion question is admissible",
        code: "TEST CONVERSION",
        body: "No immediate synthetic king-safety closure is represented. The material gain can now be tested for stabilization, continuation, and conversion cost.",
        tone: "good" as const,
      };
    }

    return {
      status: "No material claim to convert",
      code: "REASSESS OBJECTIVE",
      body: "The represented move does not currently earn a material-conversion story. Re-evaluate what boundary the candidate is supposed to change.",
      tone: "neutral" as const,
    };
  }, [conditions]);

  const stages = [
    {
      label: "Current position",
      detail: "Defensive obligation represented",
      active: true,
    },
    {
      label: "Candidate move",
      detail: conditions.movesDefender
        ? "Defender leaves its post"
        : "Defensive post preserved",
      active: true,
    },
    {
      label: "Best reply",
      detail: conditions.forcingReply
        ? "Forcing check enters the tree"
        : "No forcing reply represented",
      active: conditions.forcingReply,
    },
    {
      label: "Continuation",
      detail:
        conditions.flightSquare || conditions.interpose
          ? "At least one defensive path survives"
          : "Defensive continuation collapses",
      active: conditions.flightSquare || conditions.interpose,
    },
  ];

  return (
    <section
      className="border-b border-border bg-[#17130d] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="chess-boundary-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Crosshair className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                CHESS-LAB-01 · synthetic candidate stress test
              </p>
            </div>
            <h2
              className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="chess-boundary-lab-title"
            >
              Win the material. Then ask what future disappeared.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
              Toggle the represented facts in the constructed teaching pattern. The instrument does not calculate chess; it exposes which boundary conditions must be tested before the material claim becomes meaningful.
            </p>

            <div className="mt-6 grid gap-2">
              {conditionMeta.map((condition) => {
                const active = conditions[condition.key];
                return (
                  <button
                    aria-pressed={active}
                    className={`grid min-h-16 grid-cols-[2.25rem_1fr_auto] items-center gap-3 border px-3 py-3 text-left transition-colors ${
                      active
                        ? "border-brand-gold/45 bg-brand-gold/[0.08]"
                        : "border-white/12 bg-white/[0.025] hover:border-white/25"
                    }`}
                    key={condition.key}
                    onClick={() =>
                      setConditions((current) => ({
                        ...current,
                        [condition.key]: !current[condition.key],
                      }))
                    }
                    type="button"
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center border ${
                        active
                          ? "border-brand-gold text-brand-gold"
                          : "border-white/15 text-white/35"
                      }`}
                      aria-hidden="true"
                    >
                      {active ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <CircleDot className="h-4 w-4" />
                      )}
                    </span>
                    <span>
                      <strong className="block font-serif text-base text-white/90">
                        {condition.label}
                      </strong>
                      <span className="mt-1 block text-[11px] leading-5 text-white/45">
                        {condition.note}
                      </span>
                    </span>
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">
                      {active ? "present" : "absent"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              className="mt-4 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:text-white"
              onClick={() => setConditions(initialState)}
              type="button"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              Reset teaching pattern
            </button>
          </div>

          <div className="grid gap-4">
            <div className="relative overflow-hidden border border-white/15 bg-white/[0.035] p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/45">
                    Reachable-state trace
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">
                    <Swords className="h-3.5 w-3.5" aria-hidden="true" />
                    adversarial reply included
                  </span>
                </div>

                <ol className="mt-6 grid gap-0 md:grid-cols-4">
                  {stages.map((stage, index) => (
                    <li className="relative" key={stage.label}>
                      {index < stages.length - 1 ? (
                        <span
                          className={`absolute left-5 top-5 h-px w-[calc(100%-1rem)] md:left-[calc(50%+1.25rem)] md:w-[calc(100%-2.5rem)] ${
                            stage.active ? "bg-brand-gold/45" : "bg-white/12"
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative z-10 flex gap-3 pb-5 md:block md:pb-0 md:text-center">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border md:mx-auto ${
                            stage.active
                              ? "border-brand-gold bg-[#17130d] text-brand-gold"
                              : "border-white/15 bg-[#17130d] text-white/30"
                          }`}
                        >
                          {index === 3 && !stage.active ? (
                            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <span className="font-mono text-[9px]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          )}
                        </span>
                        <div className="md:mt-4">
                          <strong className="font-serif text-base text-white/90">
                            {stage.label}
                          </strong>
                          <p className="mt-1 text-[11px] leading-5 text-white/45">
                            {stage.detail}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div
              className={`border p-5 sm:p-6 ${
                analysis.tone === "danger"
                  ? "border-brand-red/55 bg-brand-red/[0.08]"
                  : analysis.tone === "warn"
                    ? "border-brand-gold/45 bg-brand-gold/[0.07]"
                    : analysis.tone === "good"
                      ? "border-brand-green/45 bg-brand-green/[0.07]"
                      : "border-white/15 bg-white/[0.03]"
              }`}
              aria-live="polite"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/40">
                    Boundary verdict
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {analysis.status}
                  </h3>
                </div>
                <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-white/55">
                  {analysis.code}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/60">{analysis.body}</p>
              <div className="mt-5 border-t border-white/12 pt-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                  <p className="text-xs leading-6 text-white/48">
                    {content.workedExample.scopeNote} This instrument demonstrates the reading discipline only; it is not a chess engine or validated board position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

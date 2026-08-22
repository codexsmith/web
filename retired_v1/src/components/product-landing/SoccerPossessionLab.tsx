'use client';

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  MoveLeft,
  MoveRight,
  Radar,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import content from "@/content/product-landing-pages/boundary-first-soccer.json";

type ActionId = "force-forward" | "central-reset" | "hold-width";

type ActionProfile = {
  id: ActionId;
  label: string;
  short: string;
  read: string;
  reachable: number;
  continuation: string;
  risk: string;
  promoted: boolean;
  repaired: boolean;
  path: string;
};

const actions: ActionProfile[] = [
  {
    id: "force-forward",
    label: "Force the forward lane",
    short: "Forward",
    read: "The pass enters the lane the inside-out presser is trying to make predictable.",
    reachable: 2,
    continuation: "Receiver arrives under pressure with weak support and a narrow second action.",
    risk: "The apparent territorial gain may be a trap-completion event rather than promotion.",
    promoted: false,
    repaired: false,
    path: "M 18 44 C 34 34, 48 30, 65 25",
  },
  {
    id: "central-reset",
    label: "Reset through the central support",
    short: "Reset",
    read: "The ball moves backward and inward to change the pressure orientation before the next attack.",
    reachable: 6,
    continuation: "The central receiver can access both sides and re-open the far-side progression lane.",
    risk: "The reset earns value only if the next action uses the restored structure rather than circulating without purpose.",
    promoted: true,
    repaired: true,
    path: "M 18 44 C 32 49, 45 45, 49 35 C 58 26, 70 20, 84 17",
  },
  {
    id: "hold-width",
    label: "Hold the ball and wait",
    short: "Hold",
    read: "The receiver delays without materially changing the opponent's pressure geometry.",
    reachable: 3,
    continuation: "A recycle may remain available, but the touchline and presser continue shrinking the local action set.",
    risk: "Delay can convert a manageable pressure state into a forced transition if support arrives too late.",
    promoted: false,
    repaired: false,
    path: "M 18 44 C 23 41, 27 42, 30 40",
  },
];

export function SoccerPossessionLab() {
  const [actionId, setActionId] = useState<ActionId>("central-reset");
  const [farSideOpen, setFarSideOpen] = useState(true);

  const action = useMemo(
    () => actions.find((candidate) => candidate.id === actionId) ?? actions[1],
    [actionId],
  );

  const adjustedReachability = Math.max(
    1,
    action.reachable + (action.id === "central-reset" && farSideOpen ? 1 : 0),
  );
  const boundaryState =
    action.id === "central-reset" && farSideOpen
      ? "Repair creates a larger next-action set"
      : action.id === "force-forward"
        ? "Pressure authors the next action"
        : action.id === "central-reset"
          ? "Repair succeeds locally; far-side promotion remains closed"
          : "Boundary continues to contract";

  return (
    <section
      className="border-b border-border bg-[#0d2117] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="soccer-possession-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)]">
          <div className="relative overflow-hidden border border-white/15 bg-white/[0.03] p-4 sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3rem_3rem]" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Radar className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      SOCCER-LAB-01 · synthetic possession phase
                    </p>
                  </div>
                  <h2
                    className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
                    id="soccer-possession-lab-title"
                  >
                    Change the action. Watch the reachable field change with it.
                  </h2>
                </div>
                <span className="border border-white/15 px-3 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  same synthetic phase
                </span>
              </div>

              <div className="mt-6 overflow-hidden border border-white/15 bg-[#102b1e]">
                <div className="relative aspect-[5/3] min-h-[20rem] w-full">
                  <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(248,243,232,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.18)_1px,transparent_1px)] [background-size:20%_20%]" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                  <div className="absolute inset-y-[16%] left-0 w-[14%] border-y border-r border-white/20" />
                  <div className="absolute inset-y-[16%] right-0 w-[14%] border-y border-l border-white/20" />

                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 60"
                  >
                    <path
                      d="M 20 43 C 24 36, 28 31, 34 27"
                      fill="none"
                      opacity="0.55"
                      stroke="rgba(238,93,76,.9)"
                      strokeDasharray="2.5 2.5"
                      strokeWidth="1.4"
                    />
                    <path
                      d={action.path}
                      fill="none"
                      stroke={action.id === "central-reset" ? "rgba(230,189,84,.95)" : "rgba(248,243,232,.65)"}
                      strokeLinecap="round"
                      strokeWidth="1.8"
                    />
                    {action.id === "central-reset" && farSideOpen ? (
                      <path
                        d="M 84 17 C 88 15, 91 13, 95 12"
                        fill="none"
                        stroke="rgba(83,168,119,.95)"
                        strokeLinecap="round"
                        strokeWidth="1.8"
                      />
                    ) : null}
                  </svg>

                  <FieldNode x="18%" y="73%" label="FB" tone="ball" />
                  <FieldNode x="31%" y="48%" label="P" tone="pressure" />
                  <FieldNode x="51%" y="58%" label="CM" tone="support" />
                  <FieldNode x="66%" y="40%" label="W" tone="neutral" />
                  <FieldNode x="84%" y="28%" label="FS" tone={farSideOpen ? "support" : "neutral"} />

                  <div className="absolute bottom-3 left-3 border border-white/15 bg-[#0d2117]/90 px-3 py-2 backdrop-blur-sm">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/38">
                      pressure vector
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">inside → touchline</p>
                  </div>
                  <div className="absolute right-3 top-3 border border-white/15 bg-[#0d2117]/90 px-3 py-2 text-right backdrop-blur-sm">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/38">
                      reachable continuations
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-brand-gold">
                      {adjustedReachability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {actions.map((candidate) => {
                  const selected = candidate.id === action.id;
                  const Icon =
                    candidate.id === "force-forward"
                      ? MoveRight
                      : candidate.id === "central-reset"
                        ? MoveLeft
                        : CircleDot;
                  return (
                    <button
                      aria-pressed={selected}
                      className={`min-h-24 border p-4 text-left transition-colors ${
                        selected
                          ? "border-brand-gold bg-brand-gold/[0.08]"
                          : "border-white/12 bg-white/[0.025] hover:border-white/25"
                      }`}
                      key={candidate.id}
                      onClick={() => setActionId(candidate.id)}
                      type="button"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Icon
                          className={`h-4 w-4 ${selected ? "text-brand-gold" : "text-white/35"}`}
                          aria-hidden="true"
                        />
                        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">
                          {selected ? "selected" : candidate.short}
                        </span>
                      </div>
                      <strong className="mt-4 block font-serif text-base text-white/90">
                        {candidate.label}
                      </strong>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <div className="border border-white/15 bg-white/[0.035] p-5 sm:p-6">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/40">
                Team-state readout
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">{boundaryState}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{action.read}</p>

              <dl className="mt-6 grid gap-4 border-t border-white/12 pt-5">
                <div>
                  <dt className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">
                    Continuation
                  </dt>
                  <dd className="mt-2 text-xs leading-6 text-white/55">{action.continuation}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">
                    Failure mode
                  </dt>
                  <dd className="mt-2 text-xs leading-6 text-white/55">{action.risk}</dd>
                </div>
              </dl>
            </div>

            <button
              aria-pressed={farSideOpen}
              className={`border p-4 text-left transition-colors ${
                farSideOpen
                  ? "border-brand-green/50 bg-brand-green/[0.08]"
                  : "border-white/12 bg-white/[0.025]"
              }`}
              onClick={() => setFarSideOpen((current) => !current)}
              type="button"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/55">
                  {farSideOpen ? (
                    <CheckCircle2 className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  ) : (
                    <CircleDot className="h-4 w-4" aria-hidden="true" />
                  )}
                  Far-side lane
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">
                  {farSideOpen ? "available" : "closed"}
                </span>
              </div>
              <span className="mt-3 block text-xs leading-6 text-white/48">
                Toggle whether the reset actually re-opens the opposite-side progression lane. Repair is not promotion unless a consequential continuation becomes available.
              </span>
            </button>

            <div className="border border-brand-gold/35 bg-brand-gold/[0.055] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">
                    Promotion test
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/55">
                    {content.workedExample.promotionTest}
                  </p>
                </div>
              </div>
            </div>

            <button
              className="inline-flex min-h-10 items-center self-start font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:text-white"
              onClick={() => {
                setActionId("central-reset");
                setFarSideOpen(true);
              }}
              type="button"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              Reset phase
            </button>
          </aside>
        </div>

        <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-5">
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
          <p className="max-w-5xl text-xs leading-6 text-white/45">
            {content.workedExample.scopeNote} The field diagram is an explanatory state machine, not tracking data or a claim about a real team.
          </p>
        </div>
      </div>
    </section>
  );
}

function FieldNode({
  x,
  y,
  label,
  tone,
}: {
  x: string;
  y: string;
  label: string;
  tone: "ball" | "pressure" | "support" | "neutral";
}) {
  const classes =
    tone === "ball"
      ? "border-brand-gold bg-brand-gold text-brand-black"
      : tone === "pressure"
        ? "border-brand-red bg-brand-red/20 text-white"
        : tone === "support"
          ? "border-brand-green bg-brand-green/15 text-white"
          : "border-white/25 bg-[#0d2117] text-white/65";

  return (
    <div
      className={`absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-[8px] font-bold ${classes}`}
      style={{ left: x, top: y }}
    >
      {label}
    </div>
  );
}

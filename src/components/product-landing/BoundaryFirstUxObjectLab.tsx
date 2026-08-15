'use client';

import { ArrowRight, Eye, Gauge, RotateCw, ShieldAlert, Wrench } from "lucide-react";
import { useState } from "react";
import { BoundaryApparatus, type ApparatusState } from "./BoundaryFirstUxApparatus";

const initialState: ApparatusState = {
  revealed: false,
  reframed: false,
  stressed: false,
  repaired: false,
  promoted: false,
};

const operations = [
  { key: "revealed" as const, verb: "Reveal", icon: Eye, description: "Open the valve and admit the maintenance obligation." },
  { key: "reframed" as const, verb: "Reframe", icon: RotateCw, description: "Rotate salience from delivery milestones to lifecycle consequence." },
  { key: "stressed" as const, verb: "Stress", icon: ShieldAlert, description: "Load the handoff and expose an unlanded obligation as a leak." },
  { key: "repaired" as const, verb: "Repair", icon: Wrench, description: "Clamp and reroute the failing interface with an executable path." },
  { key: "promoted" as const, verb: "Promote", icon: ArrowRight, description: "Place the project vessel inside its larger lifecycle context." },
];

export function BoundaryFirstUxObjectLab() {
  const [state, setState] = useState<ApparatusState>(initialState);

  function reveal() {
    setState((current) => ({ ...current, revealed: !current.revealed, reframed: current.revealed ? false : current.reframed, stressed: current.revealed ? false : current.stressed, repaired: current.revealed ? false : current.repaired, promoted: current.revealed ? false : current.promoted }));
  }

  function reframe() {
    setState((current) => current.revealed ? ({ ...current, reframed: !current.reframed, stressed: current.reframed ? false : current.stressed, repaired: current.reframed ? false : current.repaired, promoted: current.reframed ? false : current.promoted }) : current);
  }

  function stress() {
    setState((current) => current.reframed ? ({ ...current, stressed: !current.stressed, repaired: false }) : current);
  }

  function repair() {
    setState((current) => current.stressed ? ({ ...current, repaired: !current.repaired }) : current);
  }

  function promote() {
    setState((current) => current.revealed && current.reframed ? ({ ...current, promoted: !current.promoted }) : current);
  }

  const actions = { reveal, reframe, stress, repair, promote };
  const defect = state.stressed && !state.repaired;

  function isDisabled(key: keyof ApparatusState) {
    if (key === "reframed") return !state.revealed;
    if (key === "stressed") return !state.reframed;
    if (key === "repaired") return !state.stressed;
    if (key === "promoted") return !(state.revealed && state.reframed);
    return false;
  }

  function invoke(key: keyof ApparatusState) {
    if (key === "revealed") reveal();
    if (key === "reframed") reframe();
    if (key === "stressed") stress();
    if (key === "repaired") repair();
    if (key === "promoted") promote();
  }

  return (
    <section className="border border-border bg-[#09182b] p-5 text-brand-ivory sm:p-7" id="object-lab">
      <div className="grid gap-8 xl:grid-cols-[minmax(17rem,.42fr)_minmax(0,1.58fr)]">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-brand-gold">Functional object laboratory</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight">Operate the semantic apparatus.</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">The visual grammar is not a skin. Each physical object is bound to an actual Boundary First operation or state, and blocked operations expose why they are unavailable.</p>

          <div className="mt-6 grid gap-2">
            {operations.map((operation) => {
              const Icon = operation.icon;
              const active = state[operation.key];
              const disabled = isDisabled(operation.key);
              return (
                <button
                  key={operation.key}
                  type="button"
                  disabled={disabled}
                  onClick={() => invoke(operation.key)}
                  className={`group border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${active ? "border-brand-gold bg-brand-gold/10" : "border-white/12 bg-white/[.025] hover:border-white/30"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${active ? "border-brand-gold text-brand-gold" : "border-white/15 text-white/45"}`}><Icon className="h-4 w-4" aria-hidden="true" /></div>
                    <div>
                      <strong className="font-serif text-xl">{operation.verb}</strong>
                      <span className="mt-1 block text-xs leading-5 text-white/50">{operation.description}</span>
                      {disabled ? <span className="mt-2 block font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-brand-gold">Blocked · {blockedReason(operation.key)}</span> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => setState(initialState)} className="mt-3 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[.1em] text-white/55 hover:text-white">Reset apparatus <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></button>

          <div className={`mt-6 border p-4 ${defect ? "border-brand-red/70 bg-brand-red/10" : state.repaired ? "border-brand-green/60 bg-brand-green/10" : "border-white/10 bg-white/[.025]"}`} aria-live="polite">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[.12em] text-white/45"><Gauge className="h-3.5 w-3.5" aria-hidden="true" />World state</div>
            <p className="mt-2 font-serif text-xl">{defect ? "Leak at lifecycle handoff" : state.repaired ? "Repaired operating path" : state.promoted ? "Lifecycle context active" : state.reframed ? "Consequence frame active" : state.revealed ? "Lifecycle obligation admitted" : "Project representation stable"}</p>
            <p className="mt-2 text-xs leading-5 text-white/55">{defect ? "A consequence crosses the project boundary without a landed ownership/funding route." : state.repaired ? "The repair now occupies the same interval as the obligation it claims to satisfy." : state.promoted ? "The project remains visible as a nested bounded representation inside the larger lifecycle." : "Use either the analytic controls or the apparatus objects. Both execute the same semantic operations."}</p>
          </div>
        </div>

        <BoundaryApparatus state={state} actions={actions} />
      </div>
    </section>
  );
}

function blockedReason(key: keyof ApparatusState) {
  if (key === "reframed") return "Reveal the lifecycle obligation first";
  if (key === "stressed") return "Reframe toward consequence first";
  if (key === "repaired") return "Reproduce the defect with Stress first";
  if (key === "promoted") return "Reveal + Reframe establish containment failure";
  return "Missing prerequisite";
}

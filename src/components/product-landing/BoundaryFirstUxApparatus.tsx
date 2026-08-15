'use client';

import { Eye, Gauge, Maximize2, RotateCw, ShieldAlert, Wrench } from "lucide-react";

export type ApparatusState = {
  revealed: boolean;
  reframed: boolean;
  stressed: boolean;
  repaired: boolean;
  promoted: boolean;
};

export type ApparatusActions = {
  reveal: () => void;
  reframe: () => void;
  stress: () => void;
  repair: () => void;
  promote: () => void;
};

export function BoundaryApparatus({ state, actions }: { state: ApparatusState; actions: ApparatusActions }) {
  const pressure = state.stressed && !state.repaired ? 86 : state.repaired ? 42 : 58;
  const consequence = state.revealed ? 72 : 38;
  const gateReady = state.revealed && state.reframed;

  return (
    <div className="relative overflow-hidden border border-white/15 bg-[#071321] p-4 text-brand-ivory shadow-[inset_0_0_80px_rgba(0,0,0,.28)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative grid gap-4 xl:grid-cols-[11.5rem_minmax(0,1fr)] xl:items-start">
        <aside className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <GaugeReadout label="System pressure" value={pressure} suffix="%" danger={pressure > 75} />
          <GaugeReadout label="Visible consequence" value={consequence} suffix="%" />
          <LoadRig active={state.stressed} disabled={!state.reframed} onClick={actions.stress} />
        </aside>

        <div className={`relative min-w-0 border p-4 transition-colors sm:p-5 ${state.promoted ? "border-brand-blue/60 bg-brand-blue/[.04] shadow-[inset_0_0_40px_rgba(37,99,235,.08)]" : "border-white/12 bg-white/[.02]"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/40">Containing context</p>
              <p className="mt-1 text-sm font-semibold">{state.promoted ? "Infrastructure lifecycle" : "Project delivery"}</p>
            </div>
            <button
              type="button"
              disabled={!gateReady}
              onClick={actions.promote}
              className={`inline-flex min-h-9 items-center border px-3 font-mono text-[8px] font-semibold uppercase tracking-[.1em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${state.promoted ? "border-brand-blue bg-brand-blue/15 text-white" : "border-white/15 bg-black/10 text-white/60 hover:border-brand-blue hover:text-white"}`}
              title={gateReady ? "Promote into the containing lifecycle context" : "Reveal maintenance and Reframe before Promote becomes admissible"}
            >
              <Maximize2 className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              {state.promoted ? "Lifecycle frame active" : "Promote frame"}
            </button>
          </div>

          <div className="mx-auto mt-6 grid max-w-[46rem] grid-cols-[minmax(6.5rem,9rem)_minmax(12rem,18rem)_minmax(6.5rem,9rem)] grid-rows-[auto_7.5rem_auto] items-center gap-x-4 gap-y-4">
            <PortRail side="left" label="Capital" detail="funding input" active />
            <Vessel title="Project" subtitle="current bounded representation" active={!state.reframed} />
            <PortRail side="right" label="Service" detail="downstream effect" active={state.reframed} />

            <div className="flex h-full items-center justify-center border-y border-dashed border-white/10 px-2 text-center">
              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-white/35">Handoff</p>
                <p className="mt-1 text-[10px] leading-4 text-white/45">Stress is applied<br />across this interface.</p>
              </div>
            </div>
            <VerticalTransfer state={state} onReveal={actions.reveal} onRepair={actions.repair} />
            <Prism active={state.reframed} disabled={!state.revealed} onClick={actions.reframe} />

            <PortRail side="left" label="Evidence" detail="condition record" active={state.revealed} />
            <Vessel title="Lifecycle" subtitle="persistent maintenance obligation" active={state.revealed} muted={!state.revealed} compact />
            <PortRail side="right" label="Maintenance" detail="owned obligation" active={state.repaired} />
          </div>

          <ProvenanceTape state={state} />
        </div>

        <div className="xl:col-span-2">
          <p className="mb-2 font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/35">Semantic material key</p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            <LegendTile icon={<Eye />} label="Transparent vessel" meaning="Inspectable bounded state" />
            <LegendTile icon={<RotateCw />} label="Prism / world shift" meaning="Reframe without changing identity" />
            <LegendTile icon={<Wrench />} label="Clamp / reroute" meaning="Repair the failing interface" />
            <LegendTile icon={<Gauge />} label="Gauge / recorder" meaning="Observable state and remembered path" />
          </div>
          <p className="mt-3 text-[11px] leading-5 text-white/45">Every object is semantic. If an object has no operational meaning, it does not belong in the apparatus.</p>
        </div>
      </div>
    </div>
  );
}

function Vessel({ title, subtitle, active, muted, compact }: { title: string; subtitle: string; active?: boolean; muted?: boolean; compact?: boolean }) {
  return (
    <div className={`relative mx-auto w-full max-w-[17rem] overflow-hidden rounded-[2.8rem_2.8rem_1.2rem_1.2rem] border-2 text-center transition-all ${compact ? "min-h-32" : "min-h-40"} ${active ? "border-brand-gold bg-white/[.08] shadow-[inset_0_-35px_65px_rgba(37,99,235,.13)]" : "border-white/20 bg-white/[.03]"} ${muted ? "opacity-35" : ""}`}>
      <div className="absolute left-1/2 top-0 h-4 w-16 -translate-x-1/2 rounded-b border-x border-b border-white/20 bg-[#071321]" />
      <div className="relative z-10 px-5 pb-5 pt-7">
        <span className="font-mono text-[8px] uppercase tracking-[.14em] text-white/40">Vessel</span>
        <strong className="mt-3 block font-serif text-2xl leading-none">{title}</strong>
        <span className="mx-auto mt-2 block max-w-40 text-xs leading-5 text-white/55">{subtitle}</span>
      </div>
      <div className={`absolute bottom-0 left-3 right-3 rounded-t-[50%] transition-all ${active ? compact ? "h-9 bg-brand-blue/25" : "h-11 bg-brand-blue/25" : "h-5 bg-white/[.04]"}`} aria-hidden="true" />
    </div>
  );
}

function PortRail({ side, label, detail, active }: { side: "left" | "right"; label: string; detail: string; active: boolean }) {
  const text = <div className={side === "left" ? "text-right" : "text-left"}><span className="block font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-white/55">{label}</span><span className="mt-1 block text-[10px] leading-4 text-white/35">{detail}</span></div>;
  const port = <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${active ? "border-brand-gold bg-brand-gold/15" : "border-white/20 bg-[#071321]"}`} />;
  const pipe = <span className={`h-2 min-w-5 flex-1 rounded-full border border-black/25 ${active ? "bg-brand-gold shadow-[0_0_14px_rgba(200,162,74,.22)]" : "bg-white/12"}`} />;
  return <div className="flex min-w-0 items-center gap-2">{side === "left" ? <>{text}{port}{pipe}</> : <>{pipe}{port}{text}</>}</div>;
}

function VerticalTransfer({ state, onReveal, onRepair }: { state: ApparatusState; onReveal: () => void; onRepair: () => void }) {
  const defect = state.stressed && !state.repaired;
  return (
    <div className="relative mx-auto flex h-full min-h-28 w-full max-w-48 items-center justify-center">
      <div className={`absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 rounded-full border border-black/25 ${state.revealed ? "bg-brand-gold" : "bg-white/12"}`} aria-hidden="true" />
      <button type="button" onClick={onReveal} className="relative z-10 text-center" aria-pressed={state.revealed}>
        <span className={`relative mx-auto grid h-12 w-12 place-items-center rounded-full border-2 transition-transform ${state.revealed ? "rotate-45 border-brand-green bg-brand-green/20 text-brand-green" : "border-brand-red bg-[#071321] text-brand-red"}`}>
          <span className="absolute h-1 w-8 bg-current" /><span className="absolute h-8 w-1 bg-current" />
        </span>
        <span className="mt-2 block font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-white/45">Reveal valve</span>
      </button>

      {defect ? (
        <button type="button" onClick={onRepair} className="absolute left-[calc(50%+2rem)] top-[54%] flex min-w-max items-center" aria-label="Repair boundary leak">
          <span className="h-1 w-7 bg-brand-red shadow-[0_0_14px_rgba(159,45,32,.6)]" />
          <span className="h-7 w-1 rotate-12 bg-brand-red shadow-[0_0_16px_rgba(159,45,32,.7)]" />
          <span className="ml-2 font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-brand-red">Leak · repair</span>
        </button>
      ) : null}

      {state.repaired ? (
        <button type="button" onClick={onRepair} className="absolute left-[calc(50%+2rem)] top-[54%] flex min-w-max items-center text-brand-green" aria-label="Remove repair clamp">
          <span className="h-1 w-7 bg-brand-green" />
          <span className="grid h-8 w-7 place-items-center rounded border-4 border-brand-green bg-brand-green/10"><Wrench className="h-3 w-3" aria-hidden="true" /></span>
          <span className="ml-2 font-mono text-[8px] font-semibold uppercase tracking-[.1em]">Repaired</span>
        </button>
      ) : null}
    </div>
  );
}

function Prism({ active, disabled, onClick }: { active: boolean; disabled: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} aria-pressed={active} className="mx-auto text-center disabled:cursor-not-allowed disabled:opacity-25">
      <span className={`mx-auto block h-0 w-0 border-b-[52px] border-l-[30px] border-r-[30px] border-l-transparent border-r-transparent transition-all ${active ? "border-b-brand-blue drop-shadow-[0_0_16px_rgba(37,99,235,.4)]" : "border-b-white/20"}`} />
      <span className="mt-3 block font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-white/45">Reframe prism</span>
      <span className="mt-1 block text-[10px] text-white/35">{active ? "consequence frame" : "delivery frame"}</span>
    </button>
  );
}

function LoadRig({ active, disabled, onClick }: { active: boolean; disabled: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} aria-pressed={active} className={`w-full border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${active ? "border-brand-red/70 bg-brand-red/10" : "border-white/12 bg-white/[.035] hover:border-white/30"}`}>
      <div className="flex items-center gap-3"><ShieldAlert className={`h-5 w-5 shrink-0 ${active ? "text-brand-red" : "text-brand-gold"}`} aria-hidden="true" /><div><span className="font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/40">Load rig</span><strong className="mt-1 block text-sm">{active ? "Stress applied" : "Apply stress"}</strong></div></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full transition-all ${active ? "w-[86%] bg-brand-red" : "w-[28%] bg-brand-gold"}`} /></div>
    </button>
  );
}

function GaugeReadout({ label, value, suffix, danger }: { label: string; value: number; suffix: string; danger?: boolean }) {
  const rotation = -120 + Math.min(100, Math.max(0, value)) * 2.4;
  return <div className="border border-white/12 bg-white/[.035] p-3"><div className="flex items-center gap-3"><div className="relative h-16 w-16 shrink-0 rounded-full border-2 border-white/25 bg-black/20"><div className="absolute left-1/2 top-1/2 h-1 w-6 origin-left bg-brand-gold" style={{ transform: `rotate(${rotation}deg)` }} /><span className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[8px]">{value}{suffix}</span></div><div><span className="font-mono text-[8px] uppercase tracking-[.12em] text-white/40">Gauge</span><strong className={`mt-1 block text-xs leading-5 ${danger ? "text-brand-red" : "text-white"}`}>{label}</strong></div></div></div>;
}

function ProvenanceTape({ state }: { state: ApparatusState }) {
  const events = ["ORIENT", state.revealed && "REVEAL", state.reframed && "REFRAME", state.stressed && "STRESS", state.repaired && "REPAIR", state.promoted && "PROMOTE"].filter(Boolean) as string[];
  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/35">Recorded state / provenance tape</p><span className="font-mono text-[8px] text-white/30">{events.length} marks</span></div>
      <div className="mt-3 flex min-h-10 flex-wrap items-center gap-y-2 rounded-2xl border border-white/15 bg-black/20 px-3 py-2">
        {events.map((event, index) => <span key={event} className="inline-flex items-center font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-white/55"><span className="mr-2 h-2 w-2 rounded-full bg-brand-gold" />{event}{index < events.length - 1 ? <span className="mx-3 h-px w-6 bg-white/20" aria-hidden="true" /> : null}</span>)}
      </div>
    </div>
  );
}

function LegendTile({ icon, label, meaning }: { icon: React.ReactNode; label: string; meaning: string }) {
  return <div className="flex min-h-20 items-start gap-3 bg-[#071321] p-3"><span className="mt-0.5 text-brand-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><strong className="block text-xs">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-white/45">{meaning}</span></div></div>;
}

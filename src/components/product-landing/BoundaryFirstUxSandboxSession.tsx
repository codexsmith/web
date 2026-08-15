'use client';

import {
  ArrowRight,
  Braces,
  CircleDot,
  CornerUpLeft,
  CornerUpRight,
  Eye,
  History,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BoundaryFirstUxTimeline } from "./BoundaryFirstUxTimeline";

type InstrumentId = "timeline" | "resolution" | "gate";
type Resolution = "system" | "project" | "pump";
type Snapshot = {
  instrument: InstrumentId;
  resolution: Resolution;
  maintenanceRevealed: boolean;
  reframed: boolean;
  promoted: boolean;
};

const initialSnapshot: Snapshot = {
  instrument: "timeline",
  resolution: "system",
  maintenanceRevealed: false,
  reframed: false,
  promoted: false,
};

const resolutionData: Record<Resolution, { label: string; objects: string[]; ports: string[]; deferred: string[] }> = {
  system: {
    label: "System resolution",
    objects: ["Cedar Pump Upgrade"],
    ports: ["Capital funding", "Delivery", "Acceptance evidence", "Operational authority", "Maintenance obligation", "Household consequence"],
    deferred: ["Project internals", "Pump subsystem components"],
  },
  project: {
    label: "Project internals",
    objects: ["Pump Package", "Controls Package", "Site Interface", "Acceptance Package"],
    ports: ["Contractor delivery → Pump Package", "Operations authority → Controls Package", "Acceptance evidence → Acceptance Package"],
    deferred: ["Motor", "Impeller", "Seal + Bearing Set", "Condition Sensor"],
  },
  pump: {
    label: "Pump subsystem",
    objects: ["Motor", "Impeller", "Seal + Bearing Set", "Condition Sensor"],
    ports: ["Maintenance → Seal + Bearing Set", "Inspection evidence → Condition Sensor", "Service consequence → Pump Package"],
    deferred: [],
  },
};

const instruments = [
  { id: "timeline" as const, index: "01", label: "Boundary Timeline", action: "Inspect temporal extent", icon: History },
  { id: "resolution" as const, index: "02", label: "Resolution Navigation", action: "Open detail without losing world", icon: ScanSearch },
  { id: "gate" as const, index: "03", label: "Context Admission + Gate", action: "Test whether Promote is admissible", icon: Waypoints },
];

export function BoundaryFirstUxSandboxSession() {
  const [history, setHistory] = useState<Snapshot[]>([initialSnapshot]);
  const [cursor, setCursor] = useState(0);
  const state = history[cursor];
  const resolutionState = resolutionData[state.resolution];
  const gateReady = state.maintenanceRevealed && state.reframed;

  const path = useMemo(() => history.slice(0, cursor + 1).map(describeTransition).filter(Boolean), [history, cursor]);

  function commit(next: Snapshot) {
    const nextHistory = [...history.slice(0, cursor + 1), next];
    setHistory(nextHistory);
    setCursor(nextHistory.length - 1);
  }

  function patch(patchValue: Partial<Snapshot>) {
    commit({ ...state, ...patchValue });
  }

  function switchInstrument(instrument: InstrumentId) {
    if (instrument === state.instrument) return;
    patch({ instrument });
  }

  function undo() {
    setCursor((value) => Math.max(0, value - 1));
  }

  function redo() {
    setCursor((value) => Math.min(history.length - 1, value + 1));
  }

  function reset() {
    setHistory([initialSnapshot]);
    setCursor(0);
  }

  return (
    <div className="space-y-6">
      <section className="sticky top-0 z-20 border border-border bg-background/95 shadow-[0_18px_45px_rgba(11,31,58,.08)] backdrop-blur" aria-label="Boundary First UX sandbox session">
        <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,.75fr)]">
          <div className="border-b border-border p-3 lg:border-b-0 lg:border-r">
            <div className="flex gap-2 overflow-x-auto">
              {instruments.map((item) => {
                const Icon = item.icon;
                const active = state.instrument === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => switchInstrument(item.id)}
                    className={`group min-w-[14rem] border p-3 text-left transition-colors ${active ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-card hover:bg-background"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${active ? "text-primary-foreground/60" : "text-foreground-muted"}`}>{item.index} · instrument</span>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <strong className="mt-3 block font-serif text-lg leading-6">{item.label}</strong>
                    <span className={`mt-1 block text-xs leading-5 ${active ? "text-primary-foreground/65" : "text-foreground-muted"}`}>{item.action}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Session controls</p>
                <p className="mt-1 text-xs text-foreground-muted">Every representational transition is recoverable.</p>
              </div>
              <div className="flex gap-1">
                <IconButton label="Undo" disabled={cursor === 0} onClick={undo}><CornerUpLeft /></IconButton>
                <IconButton label="Redo" disabled={cursor === history.length - 1} onClick={redo}><CornerUpRight /></IconButton>
                <IconButton label="Repairable reset" onClick={reset}><RotateCcw /></IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid border-t border-border md:grid-cols-2 xl:grid-cols-4">
          <StateCell label="Stable identity" value="Cedar Pump Upgrade" icon={<CircleDot />} />
          <StateCell label="Containing context" value={state.promoted ? "Infrastructure lifecycle" : "Project delivery"} icon={<Braces />} />
          <StateCell label="Active frame" value={state.reframed ? "Consequence / lifecycle" : "Delivery / milestone"} icon={<Eye />} />
          <StateCell label="Semantic resolution" value={resolutionState.label} icon={<ScanSearch />} />
        </div>

        <div className="border-t border-border bg-card/60 px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted"><History className="h-3.5 w-3.5" aria-hidden="true" />Semantic path</span>
            <span className="font-mono text-[9px] text-foreground-muted">ORIENT</span>
            {path.map((item, index) => <span key={`${item}-${index}`} className="inline-flex items-center gap-2 font-mono text-[9px]"><ArrowRight className="h-3 w-3 text-foreground-muted" aria-hidden="true" />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          {state.instrument === "timeline" ? <BoundaryFirstUxTimeline compact /> : null}
          {state.instrument === "resolution" ? <ResolutionInstrument state={state} resolutionState={resolutionState} onChange={(resolution) => patch({ resolution })} /> : null}
          {state.instrument === "gate" ? <GateInstrument state={state} gateReady={gateReady} patch={patch} /> : null}
        </div>

        <aside className="border border-border bg-card p-5 lg:sticky lg:top-[15rem] lg:self-start">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Visible partiality</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">What this view does not show.</h2>
          <p className="mt-3 text-sm leading-6 text-foreground-muted">Boundary First views stay useful by being partial—but the partiality itself must remain visible.</p>
          <dl className="mt-5 space-y-4 border-t border-border pt-5 text-sm leading-6">
            <div><dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">Deferred structure</dt><dd className="mt-1">{resolutionState.deferred.length ? resolutionState.deferred.join(", ") : "No finer structural distinctions deferred at this resolution."}</dd></div>
            <div><dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">Outside current context</dt><dd className="mt-1">{state.promoted ? "Post-year-10 renewal, regional growth, and extreme-weather regimes." : "Lifecycle obligations and downstream consequence remain outside the project-delivery container until admitted or promoted."}</dd></div>
            <div><dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">Protected invariant</dt><dd className="mt-1">Object identity, external relation ports, prior findings, and return path survive representation changes.</dd></div>
          </dl>
          <div className="mt-5 border border-border bg-background p-4"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" /><p className="text-xs leading-5 text-foreground-muted">The sandbox changes representation state only. It does not mutate the fictional domain object.</p></div></div>
        </aside>
      </section>
    </div>
  );
}

function ResolutionInstrument({ state, resolutionState, onChange }: { state: Snapshot; resolutionState: (typeof resolutionData)[Resolution]; onChange: (resolution: Resolution) => void }) {
  return (
    <section id="resolution" className="border border-border bg-card p-5 sm:p-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,.58fr)_minmax(0,1.42fr)]">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Resolution navigation</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">Open the object. Keep the world.</h2>
          <p className="mt-4 text-sm leading-7 text-foreground-muted">Resolve In changes semantic resolution inside the current containing context. Finer distinctions appear; external relations and ancestry remain recoverable.</p>
          <div className="mt-6 grid gap-2">
            {(["system", "project", "pump"] as const).map((level, index) => (
              <button key={level} type="button" onClick={() => onChange(level)} className={`flex min-h-14 items-center justify-between border px-4 text-left ${state.resolution === level ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-background"}`}>
                <span><span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">0{index + 1} · {resolutionData[level].label}</span><span className={`mt-1 block text-xs ${state.resolution === level ? "text-primary-foreground/65" : "text-foreground-muted"}`}>{index === 0 ? "Whole project as one stable object" : index === 1 ? "Differentiate project packages" : "Resolve the pump carrier itself"}</span></span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden border border-border bg-background p-5">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,31,58,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Containing world remains visible</p><p className="mt-1 font-serif text-xl font-semibold">Cedar Pump Upgrade</p></div><span className="border border-border bg-card px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em]">{resolutionState.label}</span></div>
            <div className="mt-5 border border-dashed border-foreground/30 p-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Current boundary · internal distinctions admitted</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">{resolutionState.objects.map((object) => <div className="min-h-28 border border-foreground/40 bg-card p-4" key={object}><ScanSearch className="h-4 w-4 text-foreground-muted" aria-hidden="true" /><strong className="mt-5 block font-serif text-lg">{object}</strong><span className="mt-1 block text-xs text-foreground-muted">Stable semantic carrier</span></div>)}</div>
            </div>
            <div className="mt-4 border border-border bg-card/70 p-4"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">External ports preserved across Resolve</p><div className="mt-3 flex flex-wrap gap-2">{resolutionState.ports.map((port) => <span className="border border-border bg-background px-3 py-2 text-xs" key={port}>{port}</span>)}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GateInstrument({ state, gateReady, patch }: { state: Snapshot; gateReady: boolean; patch: (value: Partial<Snapshot>) => void }) {
  const status = state.promoted ? "admitted" : gateReady ? "ready" : "blocked";
  return (
    <section id="gate" className="border border-border bg-[#09182b] p-5 text-brand-ivory sm:p-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,.62fr)_minmax(0,1.38fr)]">
        <div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-gold">Context admission + Gate</p><h2 className="mt-3 font-serif text-3xl font-semibold">Nothing is merely hidden.</h2><p className="mt-4 text-sm leading-7 text-white/60">Gate evaluates whether a requested transition is admissible. When blocked, it must expose the missing semantic conditions and useful remedies.</p><div className="mt-6 border border-white/10 bg-white/[0.035] p-4"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">Requested transition</p><p className="mt-2 font-serif text-xl">Promote · Project Delivery → Infrastructure Lifecycle</p></div></div>
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ConditionCard label="01 · Reveal" active={state.maintenanceRevealed} title={state.maintenanceRevealed ? "Maintenance admitted" : "Maintenance deferred"} body={state.maintenanceRevealed ? "The lifecycle obligation is now admitted by the representation." : "The obligation exists, but the delivery representation currently defers it."} onClick={() => patch({ maintenanceRevealed: !state.maintenanceRevealed, promoted: false })} />
            <ConditionCard label="02 · Reframe" active={state.reframed} title={state.reframed ? "Consequence frame active" : "Delivery frame active"} body={state.reframed ? "The same project is now projected through lifecycle consequence." : "Promotion still lacks an established reason that delivery-only salience is insufficient."} onClick={() => patch({ reframed: !state.reframed, promoted: false })} />
          </div>
          <div className={`mt-4 border p-5 ${status === "admitted" ? "border-brand-green bg-brand-green/15" : status === "ready" ? "border-brand-gold bg-brand-gold/10" : "border-brand-red/70 bg-brand-red/10"}`} aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">Gate decision</p><h3 className="mt-2 font-serif text-3xl font-semibold capitalize">{status === "ready" ? "Ready to admit" : status}</h3></div><span className="border border-white/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">{Number(state.maintenanceRevealed) + Number(state.reframed)} / 2 conditions</span></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><GateList label="Satisfied" items={[state.maintenanceRevealed ? "Lifecycle obligation exposed" : null, state.reframed ? "Consequence reframe established" : null].filter(Boolean) as string[]} empty="No promotion conditions satisfied yet." /><GateList label="Missing / remedy" items={[!state.maintenanceRevealed ? "Reveal maintenance obligation" : null, !state.reframed ? "Reframe toward consequence" : null].filter(Boolean) as string[]} empty="All declared conditions are satisfied." /></div>
            <p className="mt-5 text-sm leading-6 text-white/62">{state.promoted ? "The prior project view is preserved as a nested object inside the lifecycle context. Return or Undo does not erase the larger context from history." : gateReady ? "The current path now demonstrates why the smaller context is insufficient. Promotion may lawfully execute." : "Promotion is blocked because the current semantic path has not yet established containment failure."}</p>
            <button type="button" disabled={!gateReady || state.promoted} onClick={() => patch({ promoted: true })} className="mt-5 inline-flex min-h-11 items-center bg-brand-gold px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-black disabled:cursor-not-allowed disabled:opacity-35">Promote context <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConditionCard({ label, active, title, body, onClick }: { label: string; active: boolean; title: string; body: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`border p-4 text-left ${active ? "border-brand-gold bg-white/[0.07]" : "border-white/15 bg-white/[0.025]"}`}><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">{label}</span><strong className="mt-2 block font-serif text-xl">{title}</strong><span className="mt-2 block text-xs leading-5 text-white/55">{body}</span></button>;
}

function GateList({ label, items, empty }: { label: string; items: string[]; empty: string }) {
  return <div className="border border-white/10 bg-black/10 p-4"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">{label}</p><ul className="mt-3 space-y-2 text-xs leading-5 text-white/65">{items.length ? items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">→</span><span>{item}</span></li>) : <li>{empty}</li>}</ul></div>;
}

function StateCell({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="border-b border-border px-4 py-3 last:border-b-0 md:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground-muted"><span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>{label}</div><p className="mt-1 text-sm font-semibold">{value}</p></div>;
}

function IconButton({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" title={label} aria-label={label} disabled={disabled} onClick={onClick} className="grid h-9 w-9 place-items-center border border-border bg-background text-foreground disabled:opacity-30 [&>svg]:h-3.5 [&>svg]:w-3.5">{children}</button>;
}

function describeTransition(snapshot: Snapshot, index: number, array: Snapshot[]) {
  if (index === 0) return "";
  const previous = array[index - 1];
  if (snapshot.instrument !== previous.instrument) return `TRAVERSE · ${snapshot.instrument.toUpperCase()}`;
  if (snapshot.resolution !== previous.resolution) return `RESOLVE · ${snapshot.resolution.toUpperCase()}`;
  if (snapshot.maintenanceRevealed !== previous.maintenanceRevealed) return snapshot.maintenanceRevealed ? "REVEAL · MAINTENANCE" : "DEFER · MAINTENANCE";
  if (snapshot.reframed !== previous.reframed) return snapshot.reframed ? "REFRAME · CONSEQUENCE" : "REFRAME · DELIVERY";
  if (snapshot.promoted !== previous.promoted) return snapshot.promoted ? "PROMOTE · LIFECYCLE" : "RETURN · PROJECT";
  return "STATE CHANGE";
}

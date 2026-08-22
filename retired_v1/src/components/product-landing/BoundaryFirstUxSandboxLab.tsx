'use client';

import { ArrowRight, CircleAlert, CircleCheck, LockKeyhole, ScanSearch } from "lucide-react";
import { useState } from "react";
import { BoundaryFirstUxTimeline } from "./BoundaryFirstUxTimeline";

type Resolution = "system" | "project" | "pump";

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

export function BoundaryFirstUxSandboxLab() {
  const [resolution, setResolution] = useState<Resolution>("system");
  const [maintenanceRevealed, setMaintenanceRevealed] = useState(false);
  const [reframed, setReframed] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const gateReady = maintenanceRevealed && reframed;
  const resolutionState = resolutionData[resolution];

  return (
    <div className="space-y-10">
      <section id="timeline">
        <BoundaryFirstUxTimeline compact />
      </section>

      <section id="resolution" className="border border-border bg-card p-5 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Resolution navigation</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Open the object. Keep the world.</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">Resolve In changes semantic resolution inside the current context. It should introduce meaningful distinctions without teleporting the user away from the containing system or dropping external relations.</p>
            <div className="mt-6 grid gap-2">
              {(["system", "project", "pump"] as const).map((level, index) => (
                <button key={level} type="button" onClick={() => setResolution(level)} className={`flex min-h-12 items-center justify-between border px-4 text-left ${resolution === level ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-background"}`}>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">0{index + 1} · {resolutionData[level].label}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden border border-border bg-background p-5">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,31,58,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">Stable identity</p><p className="mt-1 font-serif text-xl font-semibold">Cedar Pump Upgrade</p></div><span className="border border-border bg-card px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em]">{resolutionState.label}</span></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {resolutionState.objects.map((object) => <div className="min-h-24 border border-foreground/40 bg-card p-4" key={object}><ScanSearch className="h-4 w-4 text-foreground-muted" aria-hidden="true" /><strong className="mt-5 block font-serif text-lg">{object}</strong></div>)}
              </div>
              <div className="mt-5 border border-border bg-card/70 p-4"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">External ports preserved</p><div className="mt-3 flex flex-wrap gap-2">{resolutionState.ports.map((port) => <span className="border border-border bg-background px-3 py-2 text-xs" key={port}>{port}</span>)}</div></div>
              {resolutionState.deferred.length ? <div className="mt-3 p-4 text-xs leading-6 text-foreground-muted"><strong className="font-mono text-[9px] uppercase tracking-[0.12em]">Deferred at this resolution:</strong> {resolutionState.deferred.join(", ")}</div> : null}
            </div>
          </div>
        </div>
      </section>

      <section id="gate" className="border border-border bg-[#09182b] p-5 text-brand-ivory sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-gold">Context admission + Gate</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Nothing is merely hidden.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">A subject can be admitted, deferred by the current representation, or blocked because a transition lacks a required condition. Gate should expose the reason and the remedy.</p>
          </div>

          <div className="border border-white/12 bg-white/[0.035] p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setMaintenanceRevealed((value) => !value)} className={`border p-4 text-left ${maintenanceRevealed ? "border-brand-green bg-brand-green/15" : "border-white/15"}`}><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">Representation state</span><strong className="mt-2 block font-serif text-xl">{maintenanceRevealed ? "Maintenance admitted" : "Maintenance deferred"}</strong><span className="mt-2 block text-xs leading-5 text-white/55">{maintenanceRevealed ? "The current frame now admits the lifecycle obligation." : "The obligation is real and recoverable, but outside the current delivery representation."}</span></button>
              <button type="button" onClick={() => setReframed((value) => !value)} className={`border p-4 text-left ${reframed ? "border-brand-blue bg-brand-blue/15" : "border-white/15"}`}><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">Semantic path</span><strong className="mt-2 block font-serif text-xl">{reframed ? "Reframe established" : "Delivery frame active"}</strong><span className="mt-2 block text-xs leading-5 text-white/55">Promotion requires evidence that the current frame cannot contain what matters.</span></button>
            </div>

            <div className={`mt-4 border p-5 ${promoted ? "border-brand-green bg-brand-green/15" : gateReady ? "border-brand-gold bg-brand-gold/10" : "border-brand-red/70 bg-brand-red/10"}`}>
              <div className="flex items-start gap-3">
                {promoted ? <CircleCheck className="mt-0.5 h-5 w-5 text-brand-green" aria-hidden="true" /> : gateReady ? <LockKeyhole className="mt-0.5 h-5 w-5 text-brand-gold" aria-hidden="true" /> : <CircleAlert className="mt-0.5 h-5 w-5 text-brand-red" aria-hidden="true" />}
                <div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">Gate result · Promote to infrastructure lifecycle</p><h3 className="mt-2 font-serif text-2xl font-semibold">{promoted ? "Admitted" : gateReady ? "Ready to admit" : "Blocked"}</h3><p className="mt-2 text-sm leading-6 text-white/60">{promoted ? "The project is now represented inside the larger lifecycle context. The prior project view remains recoverable." : gateReady ? "The representation has exposed the lifecycle obligation and established the reframe that demonstrates why the current boundary is insufficient." : "Promotion cannot execute yet. Reveal the maintenance obligation and Reframe away from delivery-only salience first."}</p></div>
              </div>
              <button type="button" disabled={!gateReady || promoted} onClick={() => setPromoted(true)} className="mt-5 inline-flex min-h-11 items-center bg-brand-gold px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-black disabled:cursor-not-allowed disabled:opacity-35">Promote context <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

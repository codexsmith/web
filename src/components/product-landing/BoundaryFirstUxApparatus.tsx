'use client';

import { Eye, RotateCw, Wrench } from "lucide-react";

export type ApparatusState = {
  revealed: boolean;
  reframed: boolean;
  stressed: boolean;
  repaired: boolean;
  promoted: boolean;
};

export function BoundaryApparatus({ state }: { state: ApparatusState }) {
  const pressure = state.stressed && !state.repaired ? 86 : state.repaired ? 42 : 58;
  const flow = state.revealed ? 72 : 38;

  return (
    <div className="relative min-h-[34rem] overflow-hidden border border-white/15 bg-[#071321] p-5 text-brand-ivory shadow-[inset_0_0_80px_rgba(0,0,0,.28)]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(248,243,232,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.08)_1px,transparent_1px)] [background-size:26px_26px]" />

      {state.promoted ? <div className="absolute inset-4 border border-brand-blue/50"><span className="absolute -top-3 right-5 bg-[#071321] px-2 font-mono text-[9px] uppercase tracking-[.12em] text-brand-blue">Infrastructure lifecycle</span></div> : null}

      <div className="relative grid min-h-[31rem] gap-5 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.25fr)_minmax(0,.75fr)] lg:items-center">
        <div className="space-y-5">
          <Gauge label="System pressure" value={pressure} suffix="%" danger={pressure > 75} />
          <Gauge label="Visible consequence" value={flow} suffix="%" />
          <div className="rounded-full border border-white/15 bg-white/[.035] p-3 text-center font-mono text-[9px] uppercase tracking-[.12em] text-white/55">Recorded state / provenance tape</div>
        </div>

        <div className="relative mx-auto h-[28rem] w-full max-w-[34rem]">
          <Pipe className="left-[8%] top-[24%] w-[30%]" active />
          <Pipe className="right-[8%] top-[24%] w-[30%]" active={state.revealed} />
          <Pipe className="left-[49%] top-[48%] h-[18%] w-2 -translate-x-1/2" vertical active={state.reframed} />
          <Pipe className="left-[49%] top-[68%] w-[35%]" active={state.repaired} />

          <Vessel title="Project" subtitle="current bounded representation" className="left-[28%] top-[10%] h-48 w-48" active={!state.reframed} />
          <Vessel title="Lifecycle" subtitle="persistent obligation" className="left-[38%] top-[51%] h-36 w-36" active={state.revealed} muted={!state.revealed} />

          <Valve className="left-[45%] top-[21%]" open={state.revealed} label="Reveal" />
          <Prism className="right-[12%] top-[43%]" active={state.reframed} />

          <Port className="left-[3%] top-[19%]" label="Capital" />
          <Port className="right-[1%] top-[19%]" label="Service" />
          <Port className="right-[6%] top-[70%]" label="Maintenance" />

          {state.stressed && !state.repaired ? <Leak className="left-[47%] top-[61%]" /> : null}
          {state.repaired ? <RepairClamp className="left-[46%] top-[62%]" /> : null}
        </div>

        <div className="space-y-3">
          <LegendRow icon={<Eye />} label="Transparent vessel" meaning="Inspectable bounded state" />
          <LegendRow icon={<RotateCw />} label="Prism / world shift" meaning="Reframe without changing identity" />
          <LegendRow icon={<Wrench />} label="Clamp / reroute" meaning="Repair the failing interface" />
          <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-white/55">Every object is semantic. Removing its meaning should also remove the object.</div>
        </div>
      </div>
    </div>
  );
}

function Vessel({ title, subtitle, className, active, muted }: { title: string; subtitle: string; className: string; active?: boolean; muted?: boolean }) {
  return <div className={`absolute rounded-[2.5rem_2.5rem_1.2rem_1.2rem] border-2 p-5 text-center shadow-[inset_0_-30px_60px_rgba(37,99,235,.12)] ${active ? "border-brand-gold bg-white/[.08]" : "border-white/20 bg-white/[.03]"} ${muted ? "opacity-35" : ""} ${className}`}><div className="absolute left-1/2 top-[-12px] h-4 w-14 -translate-x-1/2 rounded-t border border-white/20 bg-[#071321]" /><span className="font-mono text-[9px] uppercase tracking-[.12em] text-white/45">Vessel</span><strong className="mt-8 block font-serif text-2xl">{title}</strong><span className="mt-2 block text-xs leading-5 text-white/55">{subtitle}</span><div className={`absolute bottom-0 left-3 right-3 rounded-t-full ${active ? "h-12 bg-brand-blue/25" : "h-7 bg-white/[.04]"}`} /></div>;
}

function Pipe({ className, active, vertical }: { className: string; active?: boolean; vertical?: boolean }) {
  return <div aria-hidden="true" className={`absolute ${vertical ? "rounded-full" : "h-2 rounded-full"} ${active ? "bg-brand-gold shadow-[0_0_16px_rgba(200,162,74,.28)]" : "bg-white/15"} ${className}`}><span className="absolute inset-0 rounded-full border border-black/25" /></div>;
}

function Valve({ className, open, label }: { className: string; open: boolean; label: string }) {
  return <div className={`absolute ${className}`}><div className={`grid h-12 w-12 place-items-center rounded-full border-2 ${open ? "border-brand-green bg-brand-green/20 rotate-45" : "border-brand-red bg-brand-red/15"}`}><div className="h-1 w-8 bg-current" /><div className="absolute h-8 w-1 bg-current" /></div><span className="mt-1 block text-center font-mono text-[8px] uppercase tracking-[.1em] text-white/45">{label}</span></div>;
}

function Prism({ className, active }: { className: string; active: boolean }) {
  return <div className={`absolute ${className}`}><div className={`h-0 w-0 border-b-[58px] border-l-[34px] border-r-[34px] border-l-transparent border-r-transparent ${active ? "border-b-brand-blue drop-shadow-[0_0_14px_rgba(37,99,235,.35)]" : "border-b-white/20"}`} /><span className="mt-2 block text-center font-mono text-[8px] uppercase tracking-[.1em] text-white/45">Reframe</span></div>;
}

function Port({ className, label }: { className: string; label: string }) {
  return <div className={`absolute flex items-center gap-2 ${className}`}><span className="h-4 w-4 rounded-full border-2 border-brand-gold bg-[#071321]" /><span className="font-mono text-[8px] uppercase tracking-[.1em] text-white/50">{label}</span></div>;
}

function Leak({ className }: { className: string }) {
  return <div className={`absolute ${className}`} role="status" aria-label="Boundary leak"><div className="h-12 w-1 rotate-12 bg-brand-red shadow-[0_0_18px_rgba(159,45,32,.65)]" /><span className="mt-1 block -translate-x-5 font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-brand-red">Leak</span></div>;
}

function RepairClamp({ className }: { className: string }) {
  return <div className={`absolute ${className}`} role="status" aria-label="Interface repaired"><div className="h-9 w-7 rounded border-4 border-brand-green bg-brand-green/10" /><span className="mt-1 block -translate-x-4 font-mono text-[8px] font-semibold uppercase tracking-[.1em] text-brand-green">Repair</span></div>;
}

function Gauge({ label, value, suffix, danger }: { label: string; value: number; suffix: string; danger?: boolean }) {
  const rotation = -120 + Math.min(100, Math.max(0, value)) * 2.4;
  return <div className="border border-white/12 bg-white/[.035] p-4"><div className="flex items-center gap-4"><div className="relative h-20 w-20 rounded-full border-2 border-white/25 bg-black/20"><div className="absolute left-1/2 top-1/2 h-1 w-7 origin-left bg-brand-gold" style={{ transform: `rotate(${rotation}deg)` }} /><span className="absolute inset-x-0 bottom-2 text-center font-mono text-[9px]">{value}{suffix}</span></div><div><span className="font-mono text-[8px] uppercase tracking-[.12em] text-white/40">Gauge</span><strong className={`mt-1 block text-sm ${danger ? "text-brand-red" : "text-white"}`}>{label}</strong></div></div></div>;
}

function LegendRow({ icon, label, meaning }: { icon: React.ReactNode; label: string; meaning: string }) {
  return <div className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0"><span className="mt-0.5 text-brand-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><strong className="block text-sm">{label}</strong><span className="mt-1 block text-xs leading-5 text-white/50">{meaning}</span></div></div>;
}

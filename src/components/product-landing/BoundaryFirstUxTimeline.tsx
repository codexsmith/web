'use client';

import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Compass,
  Eye,
  Gauge,
  Maximize2,
  RotateCw,
  Route,
  Search,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

const stages = [
  { verb: "Orient", title: "Read the project as presented.", icon: Compass },
  { verb: "Inspect", title: "Ask what the right edge actually means.", icon: Search },
  { verb: "Reveal", title: "Expose the obligation already outside the frame.", icon: Eye },
  { verb: "Reframe", title: "Shift from milestone salience to consequence salience.", icon: RotateCw },
  { verb: "Stress", title: "Test the handoff where accountability changes.", icon: ShieldAlert },
  { verb: "Trace", title: "Follow consequence past nominal closeout.", icon: Route },
  { verb: "Promote", title: "Place the project inside its lifecycle.", icon: Maximize2 },
  { verb: "Repair", title: "Land an executable path across the obligation.", icon: Wrench },
  { verb: "Closure", title: "Declare a scoped interval that actually reconciles.", icon: CircleCheck },
] as const;

const phaseGroups = [
  { label: "Trust", note: "Locate before diagnosing", indices: [0, 1] as const },
  { label: "Discovery", note: "Expose consequence and defect", indices: [2, 3, 4, 5] as const },
  { label: "Reconstruction", note: "Expand, repair, reconcile", indices: [6, 7, 8] as const },
] as const;

const delivery = [
  ["Authorization", 4],
  ["Design", 20],
  ["Install", 44],
  ["Acceptance", 67],
  ["Closeout", 76],
] as const;

const tracePath = ["Grant rules", "Capital project", "Acceptance", "Unlanded maintenance", "Household consequence"] as const;

export function BoundaryFirstUxTimeline({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState(0);
  const state = useMemo(
    () => ({
      inspect: stage >= 1,
      reveal: stage >= 2,
      reframe: stage >= 3,
      stress: stage >= 4,
      trace: stage >= 5,
      promote: stage >= 6,
      repair: stage >= 7,
      closure: stage >= 8,
    }),
    [stage],
  );

  const current = stages[stage];
  const StageIcon = current.icon;
  const next = () => setStage((value) => (value === stages.length - 1 ? 0 : value + 1));
  const previous = () => setStage((value) => Math.max(0, value - 1));

  const projectBoundary = state.promote ? 24 : 78;
  const acceptance = state.promote ? 17 : 67;
  const maintenanceEnd = state.promote ? 86 : 98;
  const serviceStart = state.promote ? 18 : 70;
  const closureEnd = 86;
  const cadencePoints = state.promote ? [29, 40, 51, 62, 73, 84] : [73, 79, 85, 91, 96];

  return (
    <div className="overflow-hidden border border-primary-foreground/15 bg-[#09182b] text-brand-ivory shadow-[0_24px_80px_rgba(11,31,58,0.25)]">
      <header className="border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Timeline reference instrument</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">The project ends. The system does not.</h3>
            {!compact ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">
                Inspect what a temporal edge means, reveal intervals that cross it, reproduce a handoff defect, and only then promote the project into its containing lifecycle.
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <span className="border border-white/15 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60">Cedar Pump · fictional</span>
            <span className={`h-2.5 w-2.5 rounded-full ${state.closure ? "bg-brand-green" : state.stress && !state.repair ? "bg-brand-red" : "bg-brand-gold"}`} aria-hidden="true" />
          </div>
        </div>
      </header>

      <div className="border-b border-white/10 p-3 sm:p-4">
        <div className="grid gap-2 xl:grid-cols-[2fr_4fr_3fr]" aria-label="Boundary First timeline stages">
          {phaseGroups.map((group) => (
            <div className="border border-white/10 bg-white/[0.02] p-2" key={group.label}>
              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/45">{group.label}</span>
                <span className="text-[10px] text-white/30">{group.note}</span>
              </div>
              <div className={`grid gap-1 ${group.indices.length === 2 ? "grid-cols-2" : group.indices.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                {group.indices.map((index) => {
                  const item = stages[index];
                  const Icon = item.icon;
                  const active = index === stage;
                  const complete = index < stage;
                  return (
                    <button
                      key={item.verb}
                      type="button"
                      onClick={() => setStage(index)}
                      aria-current={active ? "step" : undefined}
                      className={`flex min-h-10 items-center justify-center gap-2 border px-2 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] transition-colors ${active ? "border-brand-gold bg-brand-gold text-brand-black" : complete ? "border-white/20 bg-white/10 text-white" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"}`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{String(index + 1).padStart(2, "0")} · {item.verb}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.65fr)_minmax(17rem,.35fr)]">
        <div className="relative overflow-hidden border-b border-white/10 p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(248,243,232,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.10)_1px,transparent_1px)] [background-size:30px_30px]" />

          <div className="relative">
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <Readout label="Containing time" value={state.promote ? "Infrastructure lifecycle" : "Project delivery"} />
              <Readout label="Represented extent" value={state.promote ? "2025 → 2036" : "2025 → 2027"} />
              <Readout label="Active salience" value={state.reframe ? "Consequence / obligation" : "Milestone / completion"} />
            </div>

            <div className="relative border border-white/12 bg-[#071321] p-3 sm:p-4">
              <TemporalScale promoted={state.promote} />

              <div className="relative mt-3 min-h-[27rem] overflow-hidden border border-white/8 bg-white/[0.018] px-3 pb-5 pt-9 sm:px-4">
                {!state.promote ? <DeferredExterior left={projectBoundary} revealed={state.reveal} /> : null}
                {state.closure ? <ClosureFrame end={closureEnd} /> : null}
                <BoundaryMarker left={projectBoundary} active={state.inspect} promoted={state.promote} />
                <HandoffMarker left={acceptance} active={state.stress} />

                <div className="relative z-10 space-y-5">
                  <TimelineLane label="Delivery milestones" note="events / completion">
                    <div className="relative h-16">
                      <div className="absolute left-0 right-0 top-3 h-px bg-white/20" />
                      <div className="absolute left-0 top-[10px] h-[5px] rounded-full bg-white/40" style={{ width: `${projectBoundary}%` }} />
                      {delivery.map(([label, rawPosition]) => {
                        const position = state.promote ? 2 + rawPosition * 0.22 : rawPosition;
                        const showLabel = !state.promote || label === "Acceptance";
                        return (
                          <div className="absolute top-0 -translate-x-1/2" style={{ left: `${position}%` }} key={label} title={label}>
                            <span className={`block h-7 w-px ${label === "Acceptance" ? "bg-brand-gold" : "bg-white/60"}`} />
                            <span className={`mt-1 block -translate-x-1/2 whitespace-nowrap font-mono text-[8px] leading-4 ${showLabel ? "text-white/55" : "sr-only"}`}>{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </TimelineLane>

                  <TimelineLane label="Accountability carrier" note="who can execute">
                    <div className="relative h-12">
                      <Interval left={0} right={acceptance} tone="neutral" label="project authority" />
                      {state.repair ? (
                        <Interval left={acceptance} right={maintenanceEnd} tone="repair" label="owner + reserve" />
                      ) : state.stress ? (
                        <TemporalGap left={acceptance} right={maintenanceEnd} />
                      ) : (
                        <Interval left={acceptance} right={maintenanceEnd} tone="latent" label="ownership unresolved" />
                      )}
                    </div>
                  </TimelineLane>

                  <TimelineLane label="Maintenance obligation" note="persistent interval" muted={!state.reveal}>
                    <div className="relative h-14">
                      {state.reveal ? (
                        <>
                          <Interval left={acceptance} right={maintenanceEnd} tone={state.stress && !state.repair ? "defect" : state.repair ? "repair" : "obligation"} label="10-year maintenance" />
                          {cadencePoints.map((point, index) => (
                            <span key={point} className={`absolute top-8 h-3 w-px ${state.repair ? "bg-brand-green" : "bg-brand-gold/50"}`} style={{ left: `${point}%` }} title={`Inspection cadence ${index + 1}`} />
                          ))}
                        </>
                      ) : (
                        <DeferredRail />
                      )}
                    </div>
                  </TimelineLane>

                  <TimelineLane label="Service consequence" note="felt downstream" muted={!state.reframe}>
                    <div className="relative h-12">
                      {state.reframe ? <ConsequenceRail left={serviceStart} right={state.promote ? 94 : 99} /> : <DeferredRail />}
                    </div>
                  </TimelineLane>

                  <TimelineLane label="Repair mechanism" note="must span obligation" muted={!state.repair}>
                    <div className="relative h-12">
                      {state.repair ? <Interval left={acceptance} right={maintenanceEnd} tone="repair" label="owner · reserve · inspection cadence" /> : <DeferredRail />}
                    </div>
                  </TimelineLane>
                </div>

                {state.inspect && !state.reveal ? (
                  <button
                    type="button"
                    onClick={() => setStage(2)}
                    className="absolute bottom-4 right-4 z-20 w-56 border border-brand-gold bg-[#09182b] p-3 text-left shadow-xl"
                  >
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-gold">Boundary probe · project edge</span>
                    <strong className="mt-1 block font-serif text-lg">What ends here?</strong>
                    <span className="mt-1 block text-xs leading-5 text-white/55">Reporting? Funding? Contract ownership? Or the actual system?</span>
                  </button>
                ) : null}
              </div>

              {state.trace ? <TraceRecorder /> : null}
            </div>
          </div>
        </div>

        <aside className="bg-white/[0.035] p-5 sm:p-6" aria-live="polite">
          <div className="flex items-center gap-3">
            <div className={`grid h-11 w-11 place-items-center border ${state.closure ? "border-brand-green text-brand-green" : state.stress && !state.repair ? "border-brand-red text-brand-red" : "border-brand-gold text-brand-gold"}`}>
              <StageIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">{String(stage + 1).padStart(2, "0")} · {current.verb}</p>
              <p className="mt-1 text-[11px] text-white/40">Temporal operation</p>
            </div>
          </div>

          <h4 className="mt-5 font-serif text-2xl font-semibold leading-8">{current.title}</h4>
          <p className="mt-4 text-sm leading-7 text-white/62">{stageCopy(stage)}</p>

          <div className="mt-6 grid gap-2">
            <InspectorReadout label="Boundary operation" value={operationCopy(stage)} />
            <InspectorReadout label="Invariant" value="Cedar Pump Upgrade remains the same semantic object." />
            <InspectorReadout label="World condition" value={worldCondition(stage)} tone={state.stress && !state.repair ? "defect" : state.closure ? "closure" : undefined} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" disabled={stage === 0} onClick={previous} className="inline-flex min-h-11 items-center justify-center border border-white/15 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-30"><ArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden="true" />Back</button>
            <button type="button" onClick={next} className="inline-flex min-h-11 items-center justify-center bg-brand-gold px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-black">{stage === 8 ? "Restart" : stages[stage + 1].verb}<ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></button>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-start gap-2 text-[11px] leading-5 text-white/42">
              <Gauge className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{state.repair ? "Repair occupies the duration of the obligation; it is not a one-time milestone." : "Reveal changes what the representation admits. It does not create the interval it reveals."}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/10 bg-white/[0.025] px-3 py-2"><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/35">{label}</span><strong className="mt-1 block text-xs font-semibold text-white/75">{value}</strong></div>;
}

function InspectorReadout({ label, value, tone }: { label: string; value: string; tone?: "defect" | "closure" }) {
  return <div className={`border p-3 ${tone === "defect" ? "border-brand-red/60 bg-brand-red/10" : tone === "closure" ? "border-brand-green/50 bg-brand-green/10" : "border-white/10 bg-black/10"}`}><p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">{label}</p><p className="mt-1 text-xs leading-5 text-white/68">{value}</p></div>;
}

function TemporalScale({ promoted }: { promoted: boolean }) {
  const ticks = promoted
    ? [[2, "2025"], [24, "2027"], [48, "2030"], [70, "2033"], [88, "2036"]] as const
    : [[3, "2025"], [38, "2026"], [76, "2027"], [94, "outside frame"]] as const;

  return (
    <div className="relative h-7 border-b border-white/15" aria-label={promoted ? "Infrastructure lifecycle scale 2025 to 2036" : "Project delivery scale ending in 2027 with an outside-frame reveal zone"}>
      {ticks.map(([left, label]) => <div key={label} className="absolute bottom-0 -translate-x-1/2" style={{ left: `${left}%` }}><span className="block h-2 w-px bg-white/30" /><span className={`mt-1 block whitespace-nowrap font-mono text-[8px] ${label === "outside frame" ? "text-brand-blue/70" : "text-white/40"}`}>{label}</span></div>)}
    </div>
  );
}

function DeferredExterior({ left, revealed }: { left: number; revealed: boolean }) {
  return (
    <div className={`absolute inset-y-0 right-0 transition-opacity ${revealed ? "opacity-100" : "opacity-25"}`} style={{ left: `${left}%` }} aria-hidden="true">
      <div className="absolute inset-0 bg-brand-blue/[0.035] [background-image:repeating-linear-gradient(135deg,rgba(37,99,235,.12)_0,rgba(37,99,235,.12)_1px,transparent_1px,transparent_9px)]" />
      <span className="absolute right-3 top-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-blue/65">Outside represented project time</span>
    </div>
  );
}

function ClosureFrame({ end }: { end: number }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-2 left-2 border border-brand-green/45" style={{ width: `calc(${end}% - .5rem)` }} aria-hidden="true">
        <span className="absolute -top-3 left-3 bg-[#071321] px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-green">Scoped closure</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 bg-white/[0.025]" style={{ left: `${end}%` }} aria-hidden="true"><span className="absolute bottom-3 right-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/30">remainder outside closure</span></div>
    </>
  );
}

function BoundaryMarker({ left, active, promoted }: { left: number; active: boolean; promoted: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 z-[5]" style={{ left: `${left}%` }} aria-hidden="true">
      <div className={`h-full border-l ${active ? "border-brand-gold" : "border-white/25"}`} />
      <span className={`absolute left-0 top-2 -translate-x-1/2 whitespace-nowrap bg-[#071321] px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${active ? "text-brand-gold" : "text-white/40"}`}>{promoted ? "nested project edge" : "project edge"}</span>
      <span className={`absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border ${active ? "border-brand-gold bg-brand-gold/20" : "border-white/30 bg-[#071321]"}`} />
    </div>
  );
}

function HandoffMarker({ left, active }: { left: number; active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-y-8 z-[4] border-l border-dashed border-white/18" style={{ left: `${left}%` }} aria-hidden="true">
      <span className={`absolute -left-2 top-[39%] h-4 w-4 rounded-full border-2 ${active ? "border-brand-red bg-brand-red/25 shadow-[0_0_16px_rgba(159,45,32,.45)]" : "border-brand-gold/70 bg-[#071321]"}`} />
    </div>
  );
}

function TimelineLane({ label, note, muted, children }: { label: string; note: string; muted?: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] ${muted ? "opacity-35" : "opacity-100"}`}>
      <div className="pt-1"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white/68">{label}</div><div className="mt-1 text-[10px] leading-4 text-white/30">{note}</div></div>
      <div>{children}</div>
    </div>
  );
}

function Interval({ left, right, tone, label }: { left: number; right: number; tone: "neutral" | "latent" | "obligation" | "defect" | "repair"; label: string }) {
  const toneClass = tone === "repair" ? "border-brand-green bg-brand-green/15 text-brand-green" : tone === "defect" ? "border-brand-red bg-brand-red/15 text-brand-red" : tone === "obligation" ? "border-brand-gold/70 bg-brand-gold/10 text-brand-gold" : tone === "neutral" ? "border-white/25 bg-white/[0.07] text-white/55" : "border-white/15 bg-white/[0.025] text-white/30";
  return <div className={`absolute top-1 h-7 overflow-hidden border px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.07em] ${toneClass}`} style={{ left: `${left}%`, right: `${100 - right}%` }}><span className="block truncate">{label}</span></div>;
}

function TemporalGap({ left, right }: { left: number; right: number }) {
  return (
    <div className="absolute top-1 h-7 border-y border-brand-red/50 bg-brand-red/[0.06]" style={{ left: `${left}%`, right: `${100 - right}%` }} role="status" aria-label="Temporal leak: maintenance obligation lacks an executable accountability path">
      <div className="absolute inset-y-0 left-0 w-px bg-brand-red" />
      <div className="absolute left-2 top-1/2 h-8 w-px -translate-y-1/2 rotate-[18deg] bg-brand-red shadow-[0_0_10px_rgba(159,45,32,.55)]" />
      <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-brand-red">Temporal leak · no executable carrier</span>
    </div>
  );
}

function ConsequenceRail({ left, right }: { left: number; right: number }) {
  return <div className="absolute top-3 h-2 rounded-full bg-brand-blue/60 shadow-[0_0_14px_rgba(37,99,235,.22)]" style={{ left: `${left}%`, right: `${100 - right}%` }}><span className="absolute -right-1 -top-[3px] h-0 w-0 border-b-[7px] border-l-[10px] border-t-[7px] border-b-transparent border-l-brand-blue border-t-transparent" /><span className="absolute left-2 top-3 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.08em] text-brand-blue/80">service consequence continues</span></div>;
}

function DeferredRail() {
  return <div className="absolute left-0 right-0 top-3 h-px border-t border-dashed border-white/15"><span className="absolute right-0 top-2 font-mono text-[8px] uppercase tracking-[0.08em] text-white/20">deferred by current representation</span></div>;
}

function TraceRecorder() {
  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between gap-3"><p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/35">Causal trace recorder</p><span className="font-mono text-[8px] text-white/25">chronology ≠ causality</span></div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 border border-white/10 bg-black/15 px-3 py-3">
        {tracePath.map((item, index) => <span key={item} className="inline-flex items-center gap-2 text-xs text-white/65"><span className={`h-2 w-2 rounded-full ${index === tracePath.length - 1 ? "bg-brand-blue" : "bg-brand-gold"}`} aria-hidden="true" /><span>{item}</span>{index < tracePath.length - 1 ? <ArrowRight className="h-3 w-3 text-white/25" aria-hidden="true" /> : null}</span>)}
      </div>
    </div>
  );
}

function stageCopy(stage: number) {
  return [
    "The opening view is intentionally useful. Boundary First begins by locating its scope rather than declaring it false.",
    "The project edge is now an inspectable object. Reporting closeout, funding closeout, contract transfer, and actual system termination are different claims.",
    "Maintenance crosses the project edge. Reveal exposes an interval that already existed outside the represented project time; the containing frame has not expanded yet.",
    "The dates remain fixed while consequence and obligation become the salient temporal relations instead of milestone completion.",
    "Stress the acceptance handoff. The obligation begins, but the executable accountability carrier does not continue across the same interval.",
    "Trace reconstructs how grant rules and capital delivery constrain the later maintenance and household consequence path.",
    "Promotion changes the containing temporal context. The project becomes a nested interval inside the infrastructure lifecycle instead of merely shrinking on screen.",
    "Repair lands owner, reserve, observable state, and inspection cadence across the duration of the maintenance obligation.",
    "Closure is a declared interval whose required paths reconcile. The interface still exposes the temporal remainder outside that closure.",
  ][stage];
}

function operationCopy(stage: number) {
  return [
    "Orient within declared project time",
    "Inspect the semantic meaning of the project edge",
    "Reveal an interval that crosses represented scope",
    "Reframe milestone time as consequence time",
    "Stress the acceptance / responsibility handoff",
    "Trace causal continuity across project closeout",
    "Promote into the containing lifecycle interval",
    "Repair with a coextensive accountability mechanism",
    "Declare scoped temporal closure with visible remainder",
  ][stage];
}

function worldCondition(stage: number) {
  return [
    "Locally coherent project representation",
    "Temporal edge under inspection",
    "Maintenance interval admitted across the edge",
    "Consequence frame active; dates preserved",
    "Temporal leak reproduced at the handoff",
    "Consequence path reconstructed across contexts",
    "Project nested inside lifecycle context",
    "Executable accountability path spans obligation",
    "Required ten-year paths reconcile; later renewal remains outside scope",
  ][stage];
}

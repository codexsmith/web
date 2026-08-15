'use client';

import { ArrowLeft, ArrowRight, CircleAlert, CircleCheck, Search, Wrench } from "lucide-react";
import { useMemo, useState } from "react";

const stages = [
  { verb: "Orient", title: "Read the project as presented." },
  { verb: "Inspect", title: "Ask what the right edge actually means." },
  { verb: "Reveal", title: "Expose the obligation already outside the frame." },
  { verb: "Reframe", title: "Shift from milestone salience to consequence salience." },
  { verb: "Stress", title: "Test the handoff where accountability changes." },
  { verb: "Trace", title: "Follow consequence past nominal closeout." },
  { verb: "Promote", title: "Place the project inside its lifecycle." },
  { verb: "Repair", title: "Land an executable path across the obligation." },
  { verb: "Closure", title: "Declare a scoped interval that actually reconciles." },
] as const;

const delivery = [
  ["Authorization", 2],
  ["Design", 18],
  ["Install", 43],
  ["Acceptance", 67],
  ["Closeout", 76],
] as const;

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
  const next = () => setStage((value) => (value === stages.length - 1 ? 0 : value + 1));
  const previous = () => setStage((value) => Math.max(0, value - 1));

  return (
    <div className="border border-primary-foreground/15 bg-[#09182b] text-brand-ivory shadow-[0_24px_80px_rgba(11,31,58,0.25)]">
      <div className="border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Timeline reference instrument</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">The project ends. The system does not.</h3>
            {!compact ? <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">A familiar project timeline becomes a Boundary First instrument when its edge can be inspected, excluded duration can be revealed, and the project can be promoted into a larger lifecycle without losing its identity.</p> : null}
          </div>
          <span className="border border-white/15 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60">Fictional demonstration</span>
        </div>
      </div>

      <div className="border-b border-white/10 p-3 sm:p-4">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Boundary First timeline stages">
          {stages.map((item, index) => (
            <button
              key={item.verb}
              type="button"
              onClick={() => setStage(index)}
              aria-current={index === stage ? "step" : undefined}
              className={`min-w-max border px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors ${index === stage ? "border-brand-gold bg-brand-gold text-brand-black" : index < stage ? "border-white/20 bg-white/10 text-white" : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"}`}
            >
              {String(index + 1).padStart(2, "0")} · {item.verb}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,0.5fr)]">
        <div className="relative overflow-hidden border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(248,243,232,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Current temporal boundary</p>
                <p className="mt-1 text-sm font-semibold">{state.promote ? "2025 → 2036 · infrastructure lifecycle" : "2025 → 2027 · project delivery"}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">represented extent</p>
                <p className="mt-1 font-serif text-xl font-semibold">{state.promote ? "12 years" : "2 years"}</p>
              </div>
            </div>

            <div className={`relative min-h-[25rem] border border-white/10 bg-white/[0.025] p-4 transition-[padding] duration-500 ${state.promote ? "sm:p-6" : "sm:p-5"}`}>
              <div className={`absolute inset-y-3 left-3 border border-dashed transition-all duration-500 ${state.inspect ? "border-brand-gold/70" : "border-white/20"}`} style={{ width: state.promote ? "24%" : "calc(100% - 1.5rem)" }}>
                <span className="absolute -top-3 left-3 bg-[#09182b] px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45">Project delivery boundary</span>
              </div>

              {state.promote ? (
                <div className="absolute inset-3 border border-brand-blue/40">
                  <span className="absolute -top-3 right-3 bg-[#09182b] px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-blue">Containing lifecycle context</span>
                </div>
              ) : null}

              <div className="relative space-y-7 pt-8">
                <TimelineLane label="Project delivery" emphasized={!state.reframe}>
                  <div className="relative h-16 border-t border-white/20">
                    {delivery.map(([label, left]) => (
                      <div key={label} className="absolute top-0 -translate-x-1/2" style={{ left: state.promote ? `${left * 0.24}%` : `${left}%` }}>
                        <span className="block h-3 w-px bg-white/70" />
                        <span className="mt-2 block max-w-20 -translate-x-1/2 text-center font-mono text-[8px] leading-4 text-white/55">{label}</span>
                      </div>
                    ))}
                  </div>
                </TimelineLane>

                {state.reveal ? (
                  <TimelineLane label="Maintenance obligation" emphasized={state.reframe}>
                    <div className="relative h-12">
                      <div className={`absolute top-2 h-7 border px-3 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${state.stress && !state.repair ? "border-brand-red bg-brand-red/20 text-white" : state.repair ? "border-brand-green bg-brand-green/20 text-white" : "border-brand-gold/70 bg-brand-gold/10 text-brand-gold"}`} style={{ left: state.promote ? "16%" : "67%", width: state.promote ? "70%" : "31%" }}>
                        <span className="truncate">10-year maintenance</span>
                      </div>
                    </div>
                  </TimelineLane>
                ) : null}

                {state.reframe ? (
                  <TimelineLane label="Household service consequence" emphasized>
                    <div className="relative h-12">
                      <div className="absolute top-2 h-7 border border-brand-blue/60 bg-brand-blue/10 px-3 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white" style={{ left: state.promote ? "17%" : "70%", width: state.promote ? "77%" : "28%" }}>
                        <span className="truncate">service continues</span>
                      </div>
                    </div>
                  </TimelineLane>
                ) : null}

                {state.repair ? (
                  <TimelineLane label="Lifecycle repair" emphasized>
                    <div className="relative h-12">
                      <div className="absolute top-2 h-7 border border-brand-green bg-brand-green/20 px-3 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white" style={{ left: "17%", width: "68%" }}>
                        owner + reserve + inspection cadence
                      </div>
                    </div>
                  </TimelineLane>
                ) : null}
              </div>

              {state.inspect && !state.reveal ? (
                <button type="button" onClick={() => setStage(2)} className="absolute bottom-5 right-5 max-w-52 border border-brand-gold bg-[#09182b] p-3 text-left shadow-xl">
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-gold">Inspect edge</span>
                  <strong className="mt-1 block font-serif text-lg">What ends here?</strong>
                  <span className="mt-1 block text-xs leading-5 text-white/55">Reporting, funding, ownership—or the actual system?</span>
                </button>
              ) : null}

              {state.stress && !state.repair ? (
                <div className="absolute bottom-5 left-5 right-5 flex items-start gap-3 border border-brand-red bg-[#2b1114] p-4" role="status">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  <div><strong className="font-mono text-[9px] uppercase tracking-[0.12em]">Leak detected</strong><p className="mt-1 text-xs leading-5 text-white/65">Project reporting reaches closeout while the maintenance obligation persists without a landed ownership and funding path.</p></div>
                </div>
              ) : null}

              {state.closure ? (
                <div className="absolute bottom-5 left-5 right-5 flex items-start gap-3 border border-brand-green bg-[#10271d] p-4" role="status">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                  <div><strong className="font-mono text-[9px] uppercase tracking-[0.12em]">Scoped closure</strong><p className="mt-1 text-xs leading-5 text-white/65">Delivery, maintenance, funding, inspection, and downstream service now share an executable ten-year frame. Post-year-10 renewal remains outside scope.</p></div>
                </div>
              ) : null}
            </div>

            {state.trace ? (
              <div className="mt-4 border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">Consequence trace</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                  {['Grant rules', 'Capital project', 'Acceptance', 'Unlanded maintenance', 'Household consequence'].map((item, index) => (
                    <span className="inline-flex items-center gap-2" key={item}><span>{item}</span>{index < 4 ? <ArrowRight className="h-3 w-3 text-brand-gold" aria-hidden="true" /> : null}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="bg-white/[0.035] p-5 sm:p-7" aria-live="polite">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">{String(stage + 1).padStart(2, "0")} · {current.verb}</p>
          <h4 className="mt-3 font-serif text-2xl font-semibold leading-8">{current.title}</h4>
          <p className="mt-4 text-sm leading-7 text-white/62">{stageCopy(stage)}</p>

          <dl className="mt-6 space-y-4 border-t border-white/10 pt-5 text-xs leading-5">
            <div><dt className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">Boundary operation</dt><dd className="mt-1 text-white/72">{operationCopy(stage)}</dd></div>
            <div><dt className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">Invariant</dt><dd className="mt-1 text-white/72">Cedar Pump Upgrade remains the same semantic object.</dd></div>
          </dl>

          <div className="mt-7 grid grid-cols-2 gap-2">
            <button type="button" disabled={stage === 0} onClick={previous} className="inline-flex min-h-11 items-center justify-center border border-white/15 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-30"><ArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden="true" />Back</button>
            <button type="button" onClick={next} className="inline-flex min-h-11 items-center justify-center bg-brand-gold px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-black">{stage === 8 ? "Restart" : stages[stage + 1].verb}<ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] leading-5 text-white/42">
            {state.repair ? <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> : <Search className="h-3.5 w-3.5" aria-hidden="true" />}
            <span>{state.repair ? "Repair occupies the duration of the obligation." : "No information is created by Reveal; the representation changes what it admits."}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TimelineLane({ label, emphasized, children }: { label: string; emphasized?: boolean; children: React.ReactNode }) {
  return <div className={`grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] ${emphasized ? "text-white" : "text-white/55"}`}><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">{label}</div><div>{children}</div></div>;
}

function stageCopy(stage: number) {
  return [
    "The opening view is intentionally useful. Boundary First does not begin by declaring the project view false; it begins by locating its scope.",
    "A visual endpoint can mean reporting closeout, funding closeout, contract transfer, or actual system termination. Those meanings are not interchangeable.",
    "Maintenance begins immediately after acceptance. Reveal exposes a real interval that was already outside the represented project boundary.",
    "The dates do not change. The representation changes which relationships matter: obligations and downstream service become salient.",
    "Stress the exact handoff. The date lines up; the executable path for ownership and funding does not.",
    "Trace preserves causality across the nominal edge instead of allowing chronology to stop at closeout.",
    "Promote changes the containing context. The two-year project remains visible as a nested interval inside a twelve-year lifecycle.",
    "Repair lands owner, funding, inspection cadence, observable state, and consequence path across the duration they must actually cover.",
    "Closure is earned under declared scope. The interface still shows what remains outside that closure rather than pretending the world ended.",
  ][stage];
}

function operationCopy(stage: number) {
  return [
    "Orient within declared project time",
    "Inspect the semantic meaning of the edge",
    "Reveal an excluded persistent interval",
    "Reframe milestone time as consequence time",
    "Stress a temporal handoff",
    "Trace causal continuity across closeout",
    "Promote into a containing lifecycle context",
    "Repair with coextensive obligation paths",
    "Declare scoped temporal closure",
  ][stage];
}

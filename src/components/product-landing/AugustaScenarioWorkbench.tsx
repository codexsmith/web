'use client';

import { AlertTriangle, RotateCcw, SlidersHorizontal, Waves } from "lucide-react";
import { augustaConsequenceEdges, augustaMapNodes } from "@/lib/augusta-economic-cross-section";
import {
  augustaScenarioContract,
  augustaScenarioControls,
  type AugustaScenarioOptionPosture,
} from "@/lib/augusta-scenario-transitions";
import { formatWaterRatio, highlandAvenueWaterCalibration } from "@/lib/augusta-water-calibration";
import { useAugustaScenario } from "./AugustaScenarioContext";

const optionTone: Record<AugustaScenarioOptionPosture, string> = {
  baseline: "border-white/12 bg-black/10 text-white/40",
  intervention: "border-brand-green/40 bg-brand-green/[0.06] text-brand-green",
  stress: "border-brand-gold/45 bg-brand-gold/[0.06] text-brand-gold",
};

function nodeLabel(id: string) {
  return augustaMapNodes.find((node) => node.id === id)?.label ?? id;
}

function edgeLabel(id: string) {
  const edge = augustaConsequenceEdges.find((candidate) => candidate.id === id);
  if (!edge) return id;
  return `${edge.label}: ${nodeLabel(edge.from)} -> ${nodeLabel(edge.to)}`;
}

export function AugustaScenarioWorkbench() {
  const {
    selections,
    evaluation,
    waterAddedAverageFlowMgd,
    waterTransition,
    selectOption,
    setWaterAddedAverageFlowMgd,
    reset,
  } = useAugustaScenario();

  return (
    <section className="border border-brand-gold/35 bg-brand-gold/[0.035] p-5" aria-labelledby="augusta-scenario-workbench-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-brand-gold" aria-hidden="true" />
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">{augustaScenarioContract.id}</p>
          </div>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-white/88" id="augusta-scenario-workbench-title">Scenario transition workbench</h2>
          <p className="mt-2 text-xs leading-6 text-white/48">Declare intervention assumptions without fabricating a future city state. Semantic controls compile consequence bookkeeping; the Highland Avenue water module below is the first narrow calibrated arithmetic transition.</p>
        </div>
        <button className="inline-flex min-h-8 items-center border border-white/12 px-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-white/38 hover:border-white/28 hover:text-white/58" onClick={reset} type="button">
          <RotateCcw className="mr-1.5 h-3 w-3" aria-hidden="true" />Reset
        </button>
      </div>

      <div className="mt-5 border border-brand-blue/30 bg-brand-blue/[0.035] p-4" aria-labelledby="highland-water-calibration-title">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-blue">{highlandAvenueWaterCalibration.id} · calibrated arithmetic</p>
            </div>
            <h3 className="mt-2 font-serif text-lg font-semibold text-white/82" id="highland-water-calibration-title">Highland Avenue plant flow / design-capacity transition</h3>
            <p className="mt-2 max-w-4xl text-[10px] leading-5 text-white/40">{highlandAvenueWaterCalibration.scope}</p>
          </div>
          <a className="font-mono text-[7px] uppercase tracking-[0.08em] text-brand-blue/70 underline decoration-brand-blue/25 underline-offset-2" href={highlandAvenueWaterCalibration.sourceHref} rel="noreferrer" target="_blank">official source</a>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <label className="border border-white/10 bg-black/10 p-3">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/38">Hypothetical input · ΔQ average daily flow</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                aria-label="Hypothetical added average daily Highland Avenue plant flow in MGD"
                className="min-w-0 flex-1 border border-white/14 bg-[#11150f] px-3 py-2 font-mono text-sm text-white/78 outline-none focus:border-brand-blue/55"
                inputMode="decimal"
                min="0"
                onChange={(event) => setWaterAddedAverageFlowMgd(event.target.value)}
                placeholder="e.g. 6"
                step="0.1"
                type="number"
                value={waterAddedAverageFlowMgd}
              />
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/34">MGD</span>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-white/26">User-declared scenario input. Not a demand forecast.</p>
          </label>

          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
            <CalibrationCell label="Observed avg flow" value={`${waterTransition.baselineFlowMgd} MGD`} />
            <CalibrationCell label="Reported design" value={`${waterTransition.designCapacityMgd} MGD`} />
            <CalibrationCell label="Baseline ratio" value={formatWaterRatio(waterTransition.baselineRatio)} />
            <CalibrationCell label="Scenario ratio" value={formatWaterRatio(waterTransition.scenarioRatio)} />
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <div className={`border p-3 ${waterTransition.status === "reported-design-boundary-crossed" || waterTransition.status === "inadmissible-input" ? "border-brand-red/35 bg-brand-red/[0.04]" : waterTransition.executed ? "border-brand-green/30 bg-brand-green/[0.035]" : "border-white/10 bg-black/10"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/32">Transition state</span>
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/68">{waterTransition.status.replaceAll("-", " ")}</span>
            </div>
            <p className="mt-2 text-[10px] leading-5 text-white/40">{waterTransition.interpretation}</p>
            {waterTransition.executed ? <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.07em] text-white/32">Q1 = {waterTransition.scenarioAverageFlowMgd?.toFixed(1)} MGD · arithmetic headroom = {waterTransition.arithmeticHeadroomMgd?.toFixed(1)} MGD</p> : null}
          </div>
          <div className="border border-white/10 bg-black/10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.07em] text-white/34">ρ₁ = (Q₀ + ΔQ) / Cdesign</div>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-brand-gold">Still unresolved before operational capacity claims</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {highlandAvenueWaterCalibration.unresolvedObservables.map((item) => <span className="border border-white/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.06em] text-white/28" key={item}>{item}</span>)}
          </div>
          <p className="mt-3 text-[9px] leading-4 text-white/26">{highlandAvenueWaterCalibration.claimBoundary}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {augustaScenarioControls.map((control) => {
          const selectedId = selections[control.id];
          const selected = control.options.find((option) => option.id === selectedId) ?? control.options[0];
          return (
            <div className="border border-white/10 bg-black/10 p-4" key={control.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/58">{control.shortLabel}</p>
                  <p className="mt-1 text-[11px] leading-5 text-white/38">{control.question}</p>
                </div>
                <span className={`border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em] ${optionTone[selected.posture]}`}>{selected.posture}</span>
              </div>
              <div className="mt-3 grid gap-1.5 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                {control.options.map((option) => (
                  <button
                    aria-pressed={selectedId === option.id}
                    className={`min-h-11 border px-2.5 py-2 text-left font-mono text-[7px] font-semibold uppercase leading-4 tracking-[0.07em] ${selectedId === option.id ? optionTone[option.posture] : "border-white/8 text-white/28 hover:border-white/18"}`}
                    key={option.id}
                    onClick={() => selectOption(control.id, option.id)}
                    title={option.description}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-5 text-white/34">{selected.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border border-white/12 bg-[#11150f] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/52">Compiled transition ledger</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="border border-brand-gold/30 px-2 py-1 font-mono text-[7px] font-semibold uppercase tracking-[0.07em] text-brand-gold">{evaluation.transitionStatus}</span>
            <span className="border border-brand-red/30 px-2 py-1 font-mono text-[7px] font-semibold uppercase tracking-[0.07em] text-brand-red">{evaluation.forecastStatus}</span>
          </div>
        </div>

        {evaluation.activeOptions.length ? (
          <div className="mt-4 grid gap-4">
            <div>
              <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/30">Declared inputs</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {evaluation.activeOptions.map(({ control, option }) => <span className={`border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em] ${optionTone[option.posture]}`} key={control.id}>{control.shortLabel} · {option.label}</span>)}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <LedgerList label="Affected objects" items={evaluation.affectedNodeIds.map(nodeLabel)} />
              <LedgerList label="Affected consequence paths" items={evaluation.affectedEdgeIds.map(edgeLabel)} />
              <LedgerList label="Admissibility / preconditions" items={evaluation.admissibility} />
              <LedgerList label="Required observables" items={evaluation.observables} />
            </div>

            <div className="border border-brand-gold/20 bg-brand-gold/[0.025] p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-brand-gold">Unresolved remainder</p>
                  <ul className="mt-2 grid gap-1.5 text-[10px] leading-5 text-white/38 sm:grid-cols-2">
                    {evaluation.unresolved.map((item) => <li key={item}>— {item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 border border-white/8 bg-black/10 p-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.09em] text-white/34">Baseline only · no semantic transition declared</p>
            <p className="mt-2 text-[10px] leading-5 text-white/28">The calibrated Highland Avenue arithmetic transition can execute independently above. Choose a non-baseline semantic posture to compile broader affected objects, paths, evidence requirements, and unresolved quantities.</p>
          </div>
        )}
      </div>

      <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[7px] uppercase leading-4 tracking-[0.07em] text-white/28">{augustaScenarioContract.rule} {augustaScenarioContract.executionBoundary}</p>
    </section>
  );
}

function CalibrationCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#11150f] p-3">
      <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.07em] text-white/28">{label}</p>
      <p className="mt-2 font-mono text-sm font-semibold text-white/70">{value}</p>
    </div>
  );
}

function LedgerList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/30">{label}</p>
      {items.length ? (
        <ul className="mt-2 grid gap-1.5 text-[10px] leading-5 text-white/38">
          {items.map((item) => <li key={item}>— {item}</li>)}
        </ul>
      ) : <p className="mt-2 text-[10px] text-white/24">None declared.</p>}
    </div>
  );
}

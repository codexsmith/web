'use client';

import { Route } from "lucide-react";
import { augustaResurfacingCalibration } from "@/lib/augusta-transport-calibration";
import { useAugustaScenario } from "./AugustaScenarioContext";

export function AugustaTransportCalibrationPanel() {
  const {
    transportAddedResurfacingMiles,
    transportTransition,
    setTransportAddedResurfacingMiles,
  } = useAugustaScenario();

  const alert = transportTransition.status === "inadmissible-input" || transportTransition.status === "contract-invalid";

  return (
    <section className="border border-brand-gold/28 bg-brand-gold/[0.025] p-5" aria-labelledby="augusta-transport-calibration-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 text-brand-gold" aria-hidden="true" />
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">{augustaResurfacingCalibration.id} · additive stock</p>
          </div>
          <h3 className="mt-2 font-serif text-xl font-semibold text-white/84" id="augusta-transport-calibration-title">Roadway resurfacing maintenance-output transition</h3>
          <p className="mt-2 max-w-4xl text-[10px] leading-5 text-white/42">{augustaResurfacingCalibration.scope}</p>
        </div>
        <a className="font-mono text-[7px] uppercase tracking-[0.08em] text-brand-gold/70 underline decoration-brand-gold/25 underline-offset-2" href={augustaResurfacingCalibration.sourceHref} rel="noreferrer" target="_blank">official source</a>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <label className="border border-white/10 bg-black/10 p-3">
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/38">Hypothetical input · ΔM additional resurfacing</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              aria-label="Hypothetical additional Augusta roadway resurfacing mileage"
              className="min-w-0 flex-1 border border-white/14 bg-[#11150f] px-3 py-2 font-mono text-sm text-white/78 outline-none focus:border-brand-gold/55"
              inputMode="decimal"
              min="0"
              onChange={(event) => setTransportAddedResurfacingMiles(event.target.value)}
              placeholder="e.g. 12"
              step="0.1"
              type="number"
              value={transportAddedResurfacingMiles}
            />
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/34">road-mi</span>
          </div>
          <p className="mt-2 text-[9px] leading-4 text-white/26">Declared maintenance output only. Not a pavement-condition forecast.</p>
        </label>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          <CalibrationCell label="Published stock" value={`${transportTransition.baselineValue.toFixed(1)} mi`} />
          <CalibrationCell label="Declared addition" value={transportTransition.inputValue == null ? "—" : `${transportTransition.inputValue.toFixed(1)} mi`} />
          <CalibrationCell label="Scenario stock" value={transportTransition.scenarioValue == null ? "—" : `${transportTransition.scenarioValue.toFixed(1)} mi`} />
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div className={`border p-3 ${alert ? "border-brand-red/35 bg-brand-red/[0.04]" : transportTransition.executed ? "border-brand-green/30 bg-brand-green/[0.035]" : "border-white/10 bg-black/10"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-white/32">Transition state</span>
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/68">{transportTransition.status.replaceAll("-", " ")}</span>
          </div>
          <p className="mt-2 text-[10px] leading-5 text-white/40">{transportTransition.interpretation}</p>
        </div>
        <div className="border border-white/10 bg-black/10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.07em] text-white/34">M₁ = M₀ + ΔM</div>
      </div>

      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.08em] text-brand-gold">Missing denominator stays missing</p>
        <p className="mt-2 text-[10px] leading-5 text-white/38">Augusta publishes 119.60 miles resurfaced under the Sales Tax Program and says it uses a GDOT-like road-condition rating system to prioritize treatment. The public program page does not publish total eligible road mileage or a citywide condition score, so this instrument does not invent either one.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {augustaResurfacingCalibration.unresolvedObservables.map((item) => <span className="border border-white/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.06em] text-white/28" key={item}>{item}</span>)}
        </div>
        <p className="mt-3 text-[9px] leading-4 text-white/26">{augustaResurfacingCalibration.claimBoundary}</p>
      </div>
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

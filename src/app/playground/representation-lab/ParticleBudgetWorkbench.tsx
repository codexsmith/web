"use client";

import { BayesModelWorkbench } from "./BayesModelWorkbench";
import type { LabFrame } from "./engine";
import {
  PARTICLE_BUDGETS,
  type ParticleBudget,
  type ParticleFrame,
} from "./particle-filter";
import s from "./representation-lab-particle.module.css";

function budgetLabel(budget: ParticleBudget) {
  return budget === "exact" ? "EXACT" : String(budget);
}

export function ParticleBudgetWorkbench({
  budget,
  onBudgetChange,
  exactFrame,
  particleFrame,
}: {
  budget: ParticleBudget;
  onBudgetChange: (budget: ParticleBudget) => void;
  exactFrame: LabFrame;
  particleFrame: ParticleFrame | null;
}) {
  const exactSupport = exactFrame.beliefs.filter((cell) => cell.probability > 0).length;
  const approximate = budget !== "exact" && particleFrame;

  return (
    <section className={s.workbench} aria-label="Belief representation budget">
      <div className={s.header}>
        <div>
          <span>REPRESENTATION BUDGET · BELIEF STATE</span>
          <strong>Spend fewer samples. Measure what the representation loses.</strong>
          <p>The hidden pursuer and noisy observations stay fixed. Only the carrier used to represent the posterior changes.</p>
        </div>
        <div className={s.status} data-mode={budget === "exact" ? "exact" : "approximate"}>
          <span>ACTIVE CARRIER</span>
          <strong>{budget === "exact" ? "FULL POSTERIOR" : `${budget} PARTICLES`}</strong>
        </div>
      </div>

      <div className={s.rail} role="group" aria-label="Particle budget">
        {PARTICLE_BUDGETS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={budget === item}
            onClick={() => onBudgetChange(item)}
          >
            <span>{budgetLabel(item)}</span>
            <small>{item === "exact" ? "distribution" : "samples"}</small>
          </button>
        ))}
      </div>

      <div className={s.metrics}>
        <div>
          <span>APPROXIMATION DEFECT</span>
          <strong>{approximate ? `${(particleFrame.totalVariation * 100).toFixed(1)}% TV` : "0.0% TV"}</strong>
          <small>Total-variation distance from the exact posterior.</small>
        </div>
        <div>
          <span>REPRESENTED SUPPORT</span>
          <strong>{approximate ? `${particleFrame.support} cells` : `${exactSupport} cells`}</strong>
          <small>{approximate ? "Cells occupied after resampling." : "Every nonzero posterior cell remains explicit."}</small>
        </div>
        <div>
          <span>EFFECTIVE SAMPLE SIZE</span>
          <strong>{approximate ? particleFrame.effectiveSampleSize.toFixed(1) : "N/A"}</strong>
          <small>{approximate ? `of ${budget} particles before resampling` : "Exact inference does not sample."}</small>
        </div>
        <div>
          <span>BOUND</span>
          <strong>{budget === "exact" ? "STATE SPACE" : `${budget} TOKENS`}</strong>
          <small>The computational carrier is now an explicit resource constraint.</small>
        </div>
      </div>

      <div className={s.note}>
        <span>REFERENCE BOUNDARY</span>
        <p>The exact posterior is retained only as a laboratory reference for measuring defect. It is outside the active finite-particle representation.</p>
      </div>

      <BayesModelWorkbench />
    </section>
  );
}

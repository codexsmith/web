"use client";

import { BayesModelWorkbench } from "./BayesModelWorkbench";
import { MAZE_ROWS, WORLD } from "./engine";
import {
  PARTICLE_BUDGETS,
  particlePhaseView,
  totalVariationDistance,
  type ParticleBudget,
  type ParticleFrame,
} from "./particle-filter";
import type { BayesSubphase, SemanticLabFrame } from "./semantic-trace";
import s from "./representation-lab-particle.module.css";

function budgetLabel(budget: ParticleBudget) {
  return budget === "exact" ? "EXACT" : String(budget);
}

function carrierSubphase(frame: SemanticLabFrame): BayesSubphase | undefined {
  if (frame.subphase) return frame.subphase;
  if (frame.phase === "WORLD" || frame.phase === "REPRESENT") return "PREDICT";
  if (frame.phase === "CONSEQUENCE") return "UPDATE";
  return undefined;
}

function jitter(index: number) {
  const slot = index % 25;
  return {
    x: ((slot % 5) - 2) * 0.055,
    y: (Math.floor(slot / 5) - 2) * 0.055,
  };
}

export function ParticleBudgetWorkbench({
  budget,
  onBudgetChange,
  exactFrame,
  particleFrame,
}: {
  budget: ParticleBudget;
  onBudgetChange: (budget: ParticleBudget) => void;
  exactFrame: SemanticLabFrame;
  particleFrame: ParticleFrame | null;
}) {
  const exactSupport = exactFrame.beliefs.filter((cell) => cell.probability > 0).length;
  const approximate = budget !== "exact" && particleFrame !== null;
  const subphase = carrierSubphase(exactFrame);
  const phaseView = approximate && particleFrame ? particlePhaseView(particleFrame, subphase) : null;
  const phaseDefect = phaseView && particleFrame
    ? totalVariationDistance(
        exactFrame.beliefs,
        phaseView.phase === "OBSERVE" ? particleFrame.predictedBeliefs : phaseView.beliefs,
      )
    : 0;
  const showEss = phaseView?.phase === "OBSERVE" || phaseView?.phase === "UPDATE";

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

      {phaseView && particleFrame ? (
        <div className={s.phaseChamber}>
          <div className={s.phaseHeader}>
            <div>
              <span>CAUSAL PARTICLE CHAMBER</span>
              <strong>{phaseView.phase === "CARRIER" ? "FINITE BELIEF CARRIER" : phaseView.phase}</strong>
              <p>{phaseView.operation}</p>
            </div>
            <code>{exactFrame.subphase ? `cycle ${String(exactFrame.cycle ?? 1).padStart(2, "0")}` : exactFrame.phase.toLowerCase()}</code>
          </div>

          <div className={s.phaseRail} aria-label="Finite Bayesian carrier operations">
            {(["PREDICT", "OBSERVE", "UPDATE"] as const).map((phase, index) => (
              <div key={phase} data-active={phaseView.phase === phase ? "true" : "false"}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{phase === "PREDICT" ? "TRANSPORT" : phase === "OBSERVE" ? "WEIGHT" : "RESAMPLE"}</strong>
                <small>{phase === "PREDICT" ? "transition model" : phase === "OBSERVE" ? "sensor likelihood" : "bounded posterior"}</small>
              </div>
            ))}
          </div>

          <div className={s.cloudRack}>
            <svg className={s.particleMap} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} role="img" aria-labelledby="particle-phase-title particle-phase-desc">
              <title id="particle-phase-title">Finite particle carrier during {phaseView.phase.toLowerCase()}</title>
              <desc id="particle-phase-desc">Particle locations are transported during predict, weighted in place during observe, and duplicated or removed by resampling during update.</desc>
              {MAZE_ROWS.flatMap((row, y) => [...row].map((cell, x) => cell === "#" ? <rect key={`${x},${y}`} x={x} y={y} width={1} height={1} className={s.phaseWall} /> : null))}
              {phaseView.particles.map((particle, index) => {
                const offset = jitter(index);
                const rawWeight = phaseView.weights?.[index];
                const maxWeight = phaseView.weights ? Math.max(...phaseView.weights, Number.EPSILON) : 1;
                const relativeWeight = typeof rawWeight === "number" ? rawWeight / maxWeight : 1;
                return (
                  <circle
                    key={`${particle[0]}-${particle[1]}-${index}`}
                    cx={particle[0] + 0.5 + offset.x}
                    cy={particle[1] + 0.5 + offset.y}
                    r={phaseView.phase === "OBSERVE" ? 0.045 + relativeWeight * 0.11 : 0.065}
                    className={s.phaseParticle}
                    opacity={phaseView.phase === "OBSERVE" ? 0.12 + relativeWeight * 0.88 : 0.72}
                  />
                );
              })}
            </svg>
            <div className={s.cloudReadout}>
              <span>VISIBLE CARRIER STATE</span>
              <strong>{phaseView.particles.length} tokens · {phaseView.support} occupied cells</strong>
              <p>{phaseView.phase === "PREDICT"
                ? "Particles move before the ping is admitted. Every token still carries equal mass."
                : phaseView.phase === "OBSERVE"
                  ? "Locations do not move. Token size and intensity encode normalized sensor weight before resampling."
                  : "High-weight hypotheses replicate; low-weight hypotheses disappear. The token budget stays fixed."}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.exactPhaseNote}>
          <span>CAUSAL PARTICLE CHAMBER</span>
          <strong>FINITE CARRIER INACTIVE</strong>
          <p>Select a particle budget to expose transport, weighting, and resampling as separate causal states.</p>
        </div>
      )}

      <div className={s.metrics}>
        <div>
          <span>PHASE DEFECT</span>
          <strong>{approximate ? `${(phaseDefect * 100).toFixed(1)}% TV` : "0.0% TV"}</strong>
          <small>{phaseView?.phase === "OBSERVE" ? "Compared before resampling; weights are visible but the carrier has not yet updated." : "Total-variation distance from the exact belief at this semantic phase."}</small>
        </div>
        <div>
          <span>REPRESENTED SUPPORT</span>
          <strong>{phaseView ? `${phaseView.support} cells` : `${exactSupport} cells`}</strong>
          <small>{phaseView ? "Cells currently occupied by the finite carrier." : "Every nonzero posterior cell remains explicit."}</small>
        </div>
        <div>
          <span>EFFECTIVE SAMPLE SIZE</span>
          <strong>{approximate && showEss && particleFrame ? particleFrame.effectiveSampleSize.toFixed(1) : "N/A"}</strong>
          <small>{approximate && showEss ? `of ${budget} particles after evidence weighting, before resampling` : "ESS becomes meaningful when evidence assigns unequal particle weights."}</small>
        </div>
        <div>
          <span>BOUND</span>
          <strong>{budget === "exact" ? "STATE SPACE" : `${budget} TOKENS`}</strong>
          <small>The computational carrier is an explicit resource constraint through every causal phase.</small>
        </div>
      </div>

      <div className={s.note}>
        <span>REFERENCE BOUNDARY</span>
        <p>The exact belief remains outside the finite carrier and is used only to measure phase-relative defect. Transport, weighting, and resampling are now separately inspectable rather than collapsed into one posterior snapshot.</p>
      </div>

      <BayesModelWorkbench />
    </section>
  );
}

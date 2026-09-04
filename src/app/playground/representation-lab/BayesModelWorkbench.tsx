"use client";

import { useMemo, useState } from "react";
import { MAZE_ROWS } from "./engine";
import {
  BAYES_MODEL_PRESETS,
  SENSOR_MODELS,
  TRANSITION_MODELS,
  buildBayesModelMismatch,
  type BayesModelConfig,
} from "./bayes-model";
import s from "./representation-lab-bayes-model.module.css";

const MATCHED_CONFIG: BayesModelConfig = { sensor: "calibrated", transition: "random-walk" };
const pointKey = ([x, y]: readonly [number, number]) => `${x},${y}`;

function sameConfig(left: BayesModelConfig, right: BayesModelConfig) {
  return left.sensor === right.sensor && left.transition === right.transition;
}

export function BayesModelWorkbench() {
  const [config, setConfig] = useState<BayesModelConfig>(MATCHED_CONFIG);
  const [tick, setTick] = useState(5);
  const frames = useMemo(() => buildBayesModelMismatch(config), [config]);
  const frame = frames[Math.min(tick, frames.length - 1)];
  const activePreset = BAYES_MODEL_PRESETS.find((preset) => sameConfig(preset.config, config));
  const matched = sameConfig(config, MATCHED_CONFIG);

  return (
    <section className={s.workbench} aria-label="Bayesian model mismatch experiment">
      <div className={s.header}>
        <div>
          <span>MODEL ASSUMPTION BAY · BAYES</span>
          <strong>Keep the evidence. Change the model that explains it.</strong>
          <p>The hidden trajectory and noisy range tape are fixed. Only the assumed sensor and transition mechanisms change.</p>
        </div>
        <div className={s.status} data-state={matched ? "matched" : frame.confidenceUpTruthDown ? "pathology" : "mismatch"}>
          <span>MODEL STATE</span>
          <strong>{matched ? "MATCHED" : frame.confidenceUpTruthDown ? "CONFIDENCE ↑ / TRUTH ↓" : "MISMATCH"}</strong>
        </div>
      </div>

      <div className={s.presets} aria-label="Model mismatch presets">
        {BAYES_MODEL_PRESETS.map((preset) => (
          <button key={preset.id} type="button" aria-pressed={activePreset?.id === preset.id} onClick={() => setConfig(preset.config)}>
            <strong>{preset.label}</strong>
            <small>{preset.detail}</small>
          </button>
        ))}
      </div>

      <div className={s.modelBanks}>
        <div className={s.modelBank}>
          <span>SENSOR MODEL</span>
          <div role="group" aria-label="Sensor likelihood model">
            {SENSOR_MODELS.map((model) => (
              <button key={model.id} type="button" aria-pressed={config.sensor === model.id} onClick={() => setConfig((current) => ({ ...current, sensor: model.id }))}>
                <strong>{model.label}</strong><small>{model.detail}</small>
              </button>
            ))}
          </div>
        </div>
        <div className={s.modelBank}>
          <span>TRANSITION MODEL</span>
          <div role="group" aria-label="Hidden-state transition model">
            {TRANSITION_MODELS.map((model) => (
              <button key={model.id} type="button" aria-pressed={config.transition === model.id} onClick={() => setConfig((current) => ({ ...current, transition: model.id }))}>
                <strong>{model.label}</strong><small>{model.detail}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.tape}>
        <div><span>FIXED OBSERVATION TAPE</span><code>{frames.map((item) => item.ping).join(" · ")}</code></div>
        <div className={s.tickRail} role="group" aria-label="Observation frame">
          {frames.map((item) => (
            <button key={item.tick} type="button" aria-pressed={tick === item.tick} onClick={() => setTick(item.tick)}>
              <span>{item.tick + 1}</span><small>ping {item.ping}</small>
            </button>
          ))}
        </div>
      </div>

      <div className={s.mapRack}>
        <BeliefMap label="CALIBRATED REFERENCE" beliefs={frame.referenceBeliefs} truth={frame.truth} peak={frame.referencePeak} />
        <BeliefMap label="ACTIVE MODEL" beliefs={frame.beliefs} truth={frame.truth} peak={frame.peak} />
      </div>

      <div className={s.metrics}>
        <Metric label="PEAK CONFIDENCE" reference={frame.referencePeakProbability} active={frame.peakProbability} format="percent" />
        <Metric label="MASS ON TRUTH" reference={frame.referenceTruthProbability} active={frame.truthProbability} format="percent" invert />
        <Metric label="ENTROPY" reference={frame.referenceEntropy} active={frame.entropy} format="number" />
        <div className={s.metric} data-defect={frame.peakMissDistance > 0 ? "true" : "false"}>
          <span>PEAK MISS</span>
          <strong>{frame.peakMissDistance} cells</strong>
          <small>active peak ({frame.peak[0]},{frame.peak[1]}) · truth ({frame.truth[0]},{frame.truth[1]})</small>
        </div>
        <div className={s.metric} data-defect={frame.totalVariationFromReference > 0.25 ? "true" : "false"}>
          <span>MODEL DEFECT</span>
          <strong>{(frame.totalVariationFromReference * 100).toFixed(1)}% TV</strong>
          <small>Distance from the calibrated posterior on the same evidence.</small>
        </div>
      </div>

      <div className={s.diagnostic} data-state={frame.confidenceUpTruthDown ? "pathology" : matched ? "matched" : "mismatch"}>
        <span>EPISTEMIC DIAGNOSTIC</span>
        {frame.confidenceUpTruthDown ? (
          <>
            <strong>The posterior became more certain while becoming less faithful to world truth.</strong>
            <p>Peak confidence rose from {(frame.referencePeakProbability * 100).toFixed(1)}% to {(frame.peakProbability * 100).toFixed(1)}%, while probability assigned to the actual hidden state fell from {(frame.referenceTruthProbability * 100).toFixed(2)}% to {(frame.truthProbability * 100).toFixed(2)}%.</p>
          </>
        ) : matched ? (
          <>
            <strong>MODEL AND REFERENCE AGREE</strong>
            <p>The inference mechanism matches the assumptions used by the canonical Bayesian trace.</p>
          </>
        ) : (
          <>
            <strong>MODEL MISMATCH DETECTED</strong>
            <p>The active posterior has diverged from the calibrated reference even though the observation tape is unchanged.</p>
          </>
        )}
      </div>

      <div className={s.note}>
        <span>DEFECT CLASSIFICATION</span>
        <p>Observation noise says the evidence is uncertain. Model mismatch says the inference machinery is wrong about how evidence or hidden state is generated. More computation cannot repair a wrong generative assumption.</p>
      </div>
    </section>
  );
}

function Metric({ label, reference, active, format, invert = false }: { label: string; reference: number; active: number; format: "percent" | "number"; invert?: boolean }) {
  const delta = active - reference;
  const harmful = invert ? delta < 0 : false;
  const render = (value: number) => format === "percent" ? `${(value * 100).toFixed(1)}%` : value.toFixed(2);
  return (
    <div className={s.metric} data-defect={harmful ? "true" : "false"}>
      <span>{label}</span>
      <strong>{render(active)}</strong>
      <small>reference {render(reference)} · Δ {delta >= 0 ? "+" : ""}{format === "percent" ? `${(delta * 100).toFixed(1)} pp` : delta.toFixed(2)}</small>
    </div>
  );
}

function BeliefMap({ label, beliefs, truth, peak }: { label: string; beliefs: Array<{ point: readonly [number, number]; probability: number }>; truth: readonly [number, number]; peak: readonly [number, number] }) {
  const probabilities = new Map(beliefs.map((cell) => [pointKey(cell.point), cell.probability]));
  return (
    <article className={s.mapPanel}>
      <span>{label}</span>
      <div className={s.map} aria-label={`${label} belief field`}>
        {MAZE_ROWS.flatMap((row, y) => [...row].map((character, x) => {
          const key = `${x},${y}`;
          const wall = character === "#";
          const probability = probabilities.get(key) ?? 0;
          return (
            <i key={key} className={wall ? s.wall : s.cell} data-truth={key === pointKey(truth) ? "true" : "false"} data-peak={key === pointKey(peak) ? "true" : "false"}>
              {!wall ? <b style={{ opacity: Math.min(1, 0.06 + probability * 5) }} /> : null}
            </i>
          );
        }))}
      </div>
      <small>square = truth · inset = posterior peak</small>
    </article>
  );
}

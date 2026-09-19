"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getVisualMathSpecimen } from "./specimen-definitions";
import { buildVisualMathRecord, saveVisualMathRecord } from "./recording";
import type { VisualMathCommand } from "./specimen-types";
import {
  VisualMathConstructionPath,
  VisualMathMetric,
  VisualMathPanelHeading,
  VisualMathRange,
  VisualMathSpecimenFrame,
} from "./VisualMathSpecimenFrame";
import styles from "./visual-mathematics-workstation.module.css";

const API = "/api/simulate";
const TAU = Math.PI * 2;
const WORK_LIMIT = 36_000;
const definition = getVisualMathSpecimen("boundary-attractor");

type PresetName = "cathedral" | "defect-flame" | "hopf-like" | "chaos-storm";
type Parameters = {
  preset: PresetName;
  seed: number;
  particles: number;
  frames: number;
  dt: number;
  damping: number;
  radius: number;
  closure_strength: number;
  shell_amplitude: number;
  harmonic: number;
  selectivity: number;
  twist: number;
  braid_strength: number;
  flow_rate: number;
};

type Result = {
  engine_version: string;
  run_id: string;
  claim_status: string;
  parameters: Parameters;
  bounds: { work_units: number; work_units_max: number };
  metrics: {
    mean_closure: number;
    max_closure: number;
    mean_defect: number;
    strongly_admissible_last_frame: number;
    extent_99_6: number;
  };
  persistent_ids: number[];
  positions: number[][][];
  scores: number[][];
  phases: number[][];
};

type Preset = {
  label: string;
  description: string;
  values: Pick<Parameters, "damping" | "closure_strength" | "shell_amplitude" | "harmonic" | "selectivity" | "twist" | "braid_strength" | "flow_rate">;
};

const defaults: Parameters = {
  preset: "cathedral",
  seed: 17,
  particles: 420,
  frames: 60,
  dt: 0.026,
  damping: 0.215,
  radius: 2.15,
  closure_strength: 1.15,
  shell_amplitude: 0.34,
  harmonic: 6,
  selectivity: 3.4,
  twist: 0.62,
  braid_strength: 0.42,
  flow_rate: 0.55,
};

const presets: Record<PresetName, Preset> = {
  cathedral: {
    label: "Closure Cathedral",
    description: "Stronger repair with moderate harmonic deformation.",
    values: { damping: 0.215, closure_strength: 1.15, shell_amplitude: 0.34, harmonic: 6, selectivity: 3.4, twist: 0.62, braid_strength: 0.42, flow_rate: 0.55 },
  },
  "defect-flame": {
    label: "Defect Flame",
    description: "Weaker repair, stronger braid, and sharper closure selection.",
    values: { damping: 0.175, closure_strength: 0.46, shell_amplitude: 0.58, harmonic: 9, selectivity: 5.2, twist: 0.92, braid_strength: 0.86, flow_rate: 0.82 },
  },
  "hopf-like": {
    label: "Hopf-Like Braid",
    description: "Twist-dominant experimental winding; this preset is not the Hopf specimen.",
    values: { damping: 0.255, closure_strength: 1.48, shell_amplitude: 0.16, harmonic: 3, selectivity: 2.5, twist: 1.18, braid_strength: 0.24, flow_rate: 0.46 },
  },
  "chaos-storm": {
    label: "Chaos Storm",
    description: "High deformation and low damping expose the chaos/closure competition.",
    values: { damping: 0.145, closure_strength: 0.28, shell_amplitude: 0.76, harmonic: 11, selectivity: 6.2, twist: 0.66, braid_strength: 1.02, flow_rate: 1.05 },
  },
};

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function rotate(point: number[], yaw: number, pitch: number) {
  const [x, y, z] = point;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const x1 = cy * x - sy * y;
  const y1 = sy * x + cy * y;
  return [x1, cp * y1 - sp * z, sp * y1 + cp * z] as const;
}

function phaseColor(phase: number, alpha = 1) {
  const hue = ((phase / TAU) * 330 + 345) % 360;
  return `hsla(${hue}, 92%, 67%, ${alpha})`;
}

export function BoundaryAttractorSpecimen({ active, command }: { active: boolean; command: VisualMathCommand }) {
  const [parameters, setParameters] = useState<Parameters>(defaults);
  const [result, setResult] = useState<Result | null>(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trailLength, setTrailLength] = useState(10);
  const [camera, setCamera] = useState(18);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [note, setNote] = useState("");
  const [selectedStage, setSelectedStage] = useState("closure");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const workUnits = parameters.particles * parameters.frames;
  const frameCount = result?.positions.length ?? 0;
  const currentClosure = result ? average(result.scores[Math.min(frame, result.scores.length - 1)]) : null;

  useEffect(() => {
    if (!active || !playing || !result) return;
    let animationFrame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!last || now - last >= 1000 / 18) {
        last = now;
        setFrame((current) => (current + 1) % result.positions.length);
      }
      animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [active, playing, result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !viewport || !context || !result) return;

    const draw = () => {
      const rect = viewport.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(320, rect.width);
      const height = Math.max(330, rect.height);
      const pixelWidth = Math.floor(width * dpr);
      const pixelHeight = Math.floor(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = "#030609";
      context.fillRect(0, 0, width, height);
      const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.min(width, height) * 0.48);
      glow.addColorStop(0, "rgba(84, 43, 126, .28)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const safeFrame = Math.max(0, Math.min(frame, result.positions.length - 1));
      const total = Math.max(1, result.positions.length - 1);
      const extent = result.metrics.extent_99_6 || 4;
      const project = (point: number[], atFrame: number) => {
        const t = atFrame / total;
        const yaw = ((camera + 300 * t) * Math.PI) / 180;
        const pitch = ((16 + 7 * Math.sin(TAU * t)) * Math.PI) / 180;
        const [x, y, z] = rotate(point, yaw, pitch);
        const cameraDistance = extent * 4.4;
        const perspective = cameraDistance / Math.max(extent * 1.7, cameraDistance + z);
        const scale = Math.min(width, height) * 0.38 / extent;
        return [width / 2 + x * scale * perspective, height / 2 - y * scale * perspective, z] as const;
      };

      const start = Math.max(0, safeFrame - trailLength);
      context.lineWidth = Math.max(0.8, width / 1100);
      result.persistent_ids.slice(0, 64).forEach((id) => {
        context.beginPath();
        let moved = false;
        for (let atFrame = start; atFrame <= safeFrame; atFrame += 1) {
          const point = project(result.positions[atFrame][id], atFrame);
          if (moved) context.lineTo(point[0], point[1]);
          else {
            context.moveTo(point[0], point[1]);
            moved = true;
          }
        }
        context.strokeStyle = phaseColor(result.phases[safeFrame][id], 0.14 + 0.22 * result.scores[safeFrame][id]);
        context.stroke();
      });

      result.positions[safeFrame]
        .map((point, index) => {
          const projected = project(point, safeFrame);
          return { x: projected[0], y: projected[1], z: projected[2], score: result.scores[safeFrame][index], phase: result.phases[safeFrame][index] };
        })
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          const radius = 0.65 + 3.9 * Math.pow(point.score, 0.72);
          if (point.score > 0.82) {
            context.beginPath();
            context.fillStyle = phaseColor(point.phase, 0.09);
            context.arc(point.x, point.y, radius * 2.8, 0, TAU);
            context.fill();
          }
          context.beginPath();
          context.fillStyle = phaseColor(point.phase, 0.34 + 0.62 * point.score);
          context.arc(point.x, point.y, radius, 0, TAU);
          context.fill();
        });
    };

    const observer = new ResizeObserver(draw);
    observer.observe(viewport);
    draw();
    return () => observer.disconnect();
  }, [camera, frame, result, trailLength]);

  const applyPreset = (name: PresetName) => {
    setParameters((current) => ({ ...current, preset: name, ...presets[name].values }));
  };

  const reset = () => {
    setParameters(defaults);
    setResult(null);
    setFrame(0);
    setPlaying(false);
    setTrailLength(10);
    setCamera(18);
    setNotice("");
  };

  const randomizeSeed = () => {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    setParameters((current) => ({ ...current, seed: values[0] }));
  };

  const run = async () => {
    if (workUnits > WORK_LIMIT) {
      setNotice("Run exceeds the bounded compute budget.");
      return;
    }
    setLoading(true);
    setPlaying(false);
    setNotice("");
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parameters),
      });
      const body = await response.json() as ({ ok?: boolean; error?: string } & Partial<Result>);
      if (!response.ok || !body.ok || !body.positions || !body.metrics || !body.run_id) throw new Error(body.error ?? `Simulation failed (${response.status})`);
      setResult(body as Result);
      setFrame(0);
      setNotice(`Run complete · ${body.run_id}`);
    } catch (error: unknown) {
      setNotice(error instanceof Error ? error.message : "Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  const stateUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("specimen", "boundary-attractor");
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(`ba_${key}`, String(value)));
    url.searchParams.set("ba_camera", String(camera));
    url.searchParams.set("ba_trails", String(trailLength));
    return url.toString();
  };

  const preview = useMemo(() => ({
    schema_version: "bfl_visual_math_record_v0.1",
    specimen_id: definition.id,
    specimen_version: definition.version,
    run_id: result?.run_id ?? null,
    claim_status: result?.claim_status ?? definition.status,
    engine_version: result?.engine_version ?? definition.version,
    state: result ? { parameters: result.parameters, metrics: result.metrics, bounds: result.bounds } : { parameters },
    presentation: { frame: result ? frame : null, trail_length: trailLength, camera_offset_deg: camera, rendering: "browser_canvas_2d_projection" },
    provenance: definition.provenance,
  }), [camera, frame, parameters, result, trailLength]);

  const saveRecord = () => {
    const record = buildVisualMathRecord({
      definition,
      state: preview.state as Record<string, unknown>,
      presentation: preview.presentation,
      stateUrl: stateUrl(),
      note: note.trim(),
    });
    saveVisualMathRecord(record);
    setNotice(`Recorded ${result?.run_id ?? "unrun parameter state"}.`);
  };

  const copyStateLink = async () => {
    try {
      await window.navigator.clipboard.writeText(stateUrl());
      setNotice("Boundary Attractor state link copied.");
    } catch {
      setNotice("Clipboard access is unavailable in this browser.");
    }
  };

  const selectedStageDefinition = definition.construction.find((stage) => stage.id === selectedStage) ?? definition.construction[0];
  const preset = presets[parameters.preset];

  const inspection = command === "record" ? (
    <div className={styles.inspectionGrid}>
      <div>
        <span className={styles.inspectionLabel}>RECORD · REPRODUCIBLE RUN RECIPE</span>
        <h3>Preserve inputs, returned observables, and presentation state.</h3>
        <p>The trajectory payload remains runtime data. The durable record captures the exact specimen identity, parameter regime, run metrics when present, projection settings, implementation, and provenance.</p>
        <label className={styles.noteField}><span>RECORD NOTE</span><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="What is interesting about this state?" /></label>
        <div className={styles.inspectionActions}>
          <button type="button" className={styles.primaryButton} onClick={saveRecord}>SAVE BROWSER RECORD</button>
          <button type="button" className={styles.secondaryButton} onClick={() => void copyStateLink()}>COPY STATE LINK</button>
        </div>
        {notice ? <p aria-live="polite">{notice}</p> : null}
      </div>
      <pre>{JSON.stringify(preview, null, 2)}</pre>
    </div>
  ) : command === "explain" ? (
    <div>
      <span className={styles.inspectionLabel}>OPEN THE HOOD · REPRESENTATION PATH</span>
      <h3>{selectedStageDefinition.label}</h3>
      <p>{selectedStageDefinition.detail}</p>
      <VisualMathConstructionPath stages={definition.construction} selectedStage={selectedStage} onSelect={setSelectedStage} />
      <p><strong>Claim boundary.</strong> {definition.claimBoundary}</p>
    </div>
  ) : undefined;

  return (
    <VisualMathSpecimenFrame
      controls={(
        <>
          <VisualMathPanelHeading eyebrow="INPUT RACK" title="Dynamics controls" action={<button type="button" onClick={reset}>RESET</button>} />
          <label className={styles.selectField}>
            <span>Preset</span>
            <select value={parameters.preset} onChange={(event) => applyPreset(event.target.value as PresetName)}>
              {(Object.keys(presets) as PresetName[]).map((name) => <option key={name} value={name}>{presets[name].label}</option>)}
            </select>
            <small>{preset.description}</small>
          </label>
          <div className={styles.controlGroup}>
            <header><span>SAMPLING</span><i /></header>
            <label className={styles.numberField}><span>Seed</span><input type="number" min={0} step={1} value={parameters.seed} onChange={(event) => setParameters((current) => ({ ...current, seed: Math.max(0, Number(event.target.value) || 0) }))} /></label>
            <VisualMathRange label="Particles" min={80} max={600} step={10} value={parameters.particles} output={String(parameters.particles)} onChange={(value) => setParameters((current) => ({ ...current, particles: value }))} />
            <VisualMathRange label="Frames" min={12} max={72} step={1} value={parameters.frames} output={String(parameters.frames)} onChange={(value) => setParameters((current) => ({ ...current, frames: value }))} />
            <VisualMathRange label="dt" min={0.008} max={0.05} step={0.001} value={parameters.dt} output={parameters.dt.toFixed(3)} onChange={(value) => setParameters((current) => ({ ...current, dt: value }))} />
          </div>
          <div className={styles.controlGroup}>
            <header><span>BOUNDARY</span><i /></header>
            <VisualMathRange label="Closure force" min={0} max={2.8} step={0.01} value={parameters.closure_strength} output={parameters.closure_strength.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, closure_strength: value }))} />
            <VisualMathRange label="Shell amplitude" min={0} max={0.95} step={0.01} value={parameters.shell_amplitude} output={parameters.shell_amplitude.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, shell_amplitude: value }))} />
            <VisualMathRange label="Harmonic" min={1} max={16} step={1} value={parameters.harmonic} output={String(parameters.harmonic)} onChange={(value) => setParameters((current) => ({ ...current, harmonic: value }))} />
            <VisualMathRange label="Selectivity" min={0.2} max={10} step={0.1} value={parameters.selectivity} output={parameters.selectivity.toFixed(1)} onChange={(value) => setParameters((current) => ({ ...current, selectivity: value }))} />
          </div>
          <div className={styles.controlGroup}>
            <header><span>TRANSPORT</span><i /></header>
            <VisualMathRange label="Damping" min={0.08} max={0.38} step={0.01} value={parameters.damping} output={parameters.damping.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, damping: value }))} />
            <VisualMathRange label="Twist" min={0} max={1.8} step={0.01} value={parameters.twist} output={parameters.twist.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, twist: value }))} />
            <VisualMathRange label="Braid" min={0} max={1.5} step={0.01} value={parameters.braid_strength} output={parameters.braid_strength.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, braid_strength: value }))} />
            <VisualMathRange label="Flow" min={0} max={1.8} step={0.01} value={parameters.flow_rate} output={parameters.flow_rate.toFixed(2)} onChange={(value) => setParameters((current) => ({ ...current, flow_rate: value }))} />
          </div>
        </>
      )}
      chamber={(
        <div ref={viewportRef} style={{ width: "100%", height: "100%", minHeight: 420 }}>
          <canvas ref={canvasRef} aria-label="Boundary Attractor visualization" />
          {!result && !loading ? <div className={styles.chamberEmpty}><div><strong>Build a Boundary Attractor</strong><p>Choose a bounded regime, adjust the dynamics, and execute the existing simulation contract.</p><button type="button" className={styles.primaryButton} onClick={() => void run()}>RUN DEFAULT</button></div></div> : null}
          {loading ? <div className={styles.chamberEmpty}><div><strong>Integrating state trajectories…</strong></div></div> : null}
          <span className={styles.chamberBadge}>{result?.run_id ?? "NO RUN"}</span>
          <span className={`${styles.chamberBadge} ${styles.chamberBadgeRight}`}>{result ? `FRAME ${frame + 1} · CLOSURE ${currentClosure?.toFixed(3)}` : command === "explain" ? selectedStageDefinition.label : "AWAITING EXECUTION"}</span>
        </div>
      )}
      transport={(
        <>
          <button type="button" className={styles.secondaryButton} disabled={!result} onClick={() => setPlaying((value) => !value)}>{playing ? "Ⅱ" : "▶"}</button>
          <input type="range" min={0} max={Math.max(0, frameCount - 1)} value={Math.min(frame, Math.max(0, frameCount - 1))} disabled={!result} onChange={(event) => { setPlaying(false); setFrame(Number(event.target.value)); }} aria-label="Boundary Attractor frame" />
          <output>{result ? `${frame + 1} / ${frameCount}` : "0 / 0"}</output>
          <label><span>TRAILS</span><input type="range" min={0} max={24} value={trailLength} onChange={(event) => setTrailLength(Number(event.target.value))} /></label>
        </>
      )}
      telemetry={(
        <>
          <VisualMathPanelHeading eyebrow="OBSERVABLES" title="Run telemetry" action={<button type="button" onClick={randomizeSeed}>NEW SEED</button>} />
          <div className={styles.metricGrid}>
            <VisualMathMetric label="MEAN CLOSURE" value={result ? result.metrics.mean_closure.toFixed(3) : "—"} />
            <VisualMathMetric label="MEAN DEFECT" value={result ? result.metrics.mean_defect.toFixed(3) : "—"} />
            <VisualMathMetric label="STRONG CLOSURE" value={result ? result.metrics.strongly_admissible_last_frame : "—"} />
            <VisualMathMetric label="EXTENT" value={result ? result.metrics.extent_99_6.toFixed(2) : "—"} />
          </div>
          <dl className={styles.definitionList}>
            <div><dt>Compute</dt><dd>{workUnits.toLocaleString()} / {WORK_LIMIT.toLocaleString()}</dd></div>
            <div><dt>Status</dt><dd>{definition.statusLabel}</dd></div>
            <div><dt>Engine</dt><dd>{result?.engine_version ?? definition.version}</dd></div>
            <div><dt>Camera</dt><dd>{camera}°</dd></div>
          </dl>
          <div className={styles.inspectionActions}>
            <button type="button" className={styles.primaryButton} disabled={loading || workUnits > WORK_LIMIT} onClick={() => void run()}>{loading ? "INTEGRATING…" : "RUN EXPERIMENT"}</button>
          </div>
          <div className={styles.claimCard}><small>CLAIM BOUNDARY</small><p>{definition.claimBoundary}</p></div>
          {notice ? <p aria-live="polite">{notice}</p> : null}
        </>
      )}
      inspection={inspection}
    />
  );
}

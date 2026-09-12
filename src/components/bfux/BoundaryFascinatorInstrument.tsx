"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./BoundaryFascinatorInstrument.module.css";

const API = "/api/simulate";
const STORE = "bfl-fascinator-captures-v1";
const TAU = Math.PI * 2;

type Tab = "explore" | "capture" | "method";
type PresetName = "cathedral" | "defect-flame" | "hopf-like" | "chaos-storm";
type NumericControl =
  | "particles"
  | "frames"
  | "dt"
  | "damping"
  | "closure_strength"
  | "shell_amplitude"
  | "harmonic"
  | "selectivity"
  | "twist"
  | "braid_strength"
  | "flow_rate";

type Bound = { min: number; max: number; default: number };
type Preset = {
  label: string;
  description: string;
  damping: number;
  closure_strength: number;
  shell_amplitude: number;
  harmonic: number;
  selectivity: number;
  twist: number;
  braid_strength: number;
  flow_rate: number;
};

type SimulationParameters = {
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

type NumericParameter = Exclude<keyof SimulationParameters, "preset">;

type SimulationMeta = {
  engine_version: string;
  claim_status: string;
  bounds: Record<NumericControl | "radius", Bound> & { work_units_max: number };
  defaults: SimulationParameters;
  presets: Record<PresetName, Preset>;
};

type SimulationResult = {
  schema_version: string;
  engine_version: string;
  run_id: string;
  claim_status: string;
  parameters: SimulationParameters;
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

type CaptureManifest = {
  schema_version: "browser_capture_v0.2";
  run_id: string;
  engine_version: string;
  captured_at: string;
  claim_status: string;
  parameters: SimulationParameters;
  metrics: SimulationResult["metrics"];
  bounds: SimulationResult["bounds"];
  presentation: {
    trail_length: number;
    camera_offset_deg: number;
    color_encoding: string;
    prominence_encoding: string;
    rendering: string;
  };
  share_url: string;
  note: string;
};

const fallbackMeta: SimulationMeta = {
  engine_version: "boundary-attractor-web-0.1.0",
  claim_status: "prototype_dynamics",
  bounds: {
    particles: { min: 80, max: 600, default: 420 },
    frames: { min: 12, max: 72, default: 60 },
    work_units_max: 36000,
    dt: { min: 0.008, max: 0.05, default: 0.026 },
    damping: { min: 0.08, max: 0.38, default: 0.215 },
    radius: { min: 0.8, max: 4, default: 2.15 },
    closure_strength: { min: 0, max: 2.8, default: 1.15 },
    shell_amplitude: { min: 0, max: 0.95, default: 0.34 },
    harmonic: { min: 1, max: 16, default: 6 },
    selectivity: { min: 0.2, max: 10, default: 3.4 },
    twist: { min: 0, max: 1.8, default: 0.62 },
    braid_strength: { min: 0, max: 1.5, default: 0.42 },
    flow_rate: { min: 0, max: 1.8, default: 0.55 },
  },
  defaults: {
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
  },
  presets: {
    cathedral: {
      label: "Closure Cathedral",
      description: "Stronger repair with moderate harmonic deformation.",
      damping: 0.215,
      closure_strength: 1.15,
      shell_amplitude: 0.34,
      harmonic: 6,
      selectivity: 3.4,
      twist: 0.62,
      braid_strength: 0.42,
      flow_rate: 0.55,
    },
    "defect-flame": {
      label: "Defect Flame",
      description: "Weaker repair, stronger braid, and sharper closure selection.",
      damping: 0.175,
      closure_strength: 0.46,
      shell_amplitude: 0.58,
      harmonic: 9,
      selectivity: 5.2,
      twist: 0.92,
      braid_strength: 0.86,
      flow_rate: 0.82,
    },
    "hopf-like": {
      label: "Hopf-Like Braid",
      description: "Twist-dominant winding with lower shell deformation.",
      damping: 0.255,
      closure_strength: 1.48,
      shell_amplitude: 0.16,
      harmonic: 3,
      selectivity: 2.5,
      twist: 1.18,
      braid_strength: 0.24,
      flow_rate: 0.46,
    },
    "chaos-storm": {
      label: "Chaos Storm",
      description: "High deformation and low damping expose the chaos/closure competition.",
      damping: 0.145,
      closure_strength: 0.28,
      shell_amplitude: 0.76,
      harmonic: 11,
      selectivity: 6.2,
      twist: 0.66,
      braid_strength: 1.02,
      flow_rate: 1.05,
    },
  },
};

const controlSteps: Record<NumericControl, number> = {
  particles: 10,
  frames: 1,
  dt: 0.001,
  damping: 0.01,
  closure_strength: 0.01,
  shell_amplitude: 0.01,
  harmonic: 1,
  selectivity: 0.1,
  twist: 0.01,
  braid_strength: 0.01,
  flow_rate: 0.01,
};

const shareKeys: Record<keyof SimulationParameters, string> = {
  preset: "vf_preset",
  seed: "vf_seed",
  particles: "vf_particles",
  frames: "vf_frames",
  dt: "vf_dt",
  damping: "vf_damping",
  radius: "vf_radius",
  closure_strength: "vf_closure",
  shell_amplitude: "vf_shell",
  harmonic: "vf_harmonic",
  selectivity: "vf_selectivity",
  twist: "vf_twist",
  braid_strength: "vf_braid",
  flow_rate: "vf_flow",
};

function formatControl(name: NumericControl, value: number) {
  if (name === "particles" || name === "frames" || name === "harmonic") return String(Math.round(value));
  if (name === "dt") return value.toFixed(3);
  return value.toFixed(2);
}

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

function loadCaptureRegistry(): CaptureManifest[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORE) ?? "[]") as unknown;
    return Array.isArray(value) ? (value as CaptureManifest[]) : [];
  } catch {
    return [];
  }
}

function RangeControl({
  name,
  label,
  value,
  bound,
  onChange,
}: {
  name: NumericControl;
  label: string;
  value: number;
  bound: Bound;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.rangeField}>
      <span><b>{label}</b><output>{formatControl(name, value)}</output></span>
      <input
        type="range"
        min={bound.min}
        max={bound.max}
        step={controlSteps[name]}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function BoundaryFascinatorInstrument({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>("explore");
  const [meta, setMeta] = useState<SimulationMeta>(fallbackMeta);
  const [parameters, setParameters] = useState<SimulationParameters>(fallbackMeta.defaults);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trailLength, setTrailLength] = useState(10);
  const [camera, setCamera] = useState(18);
  const [loading, setLoading] = useState(false);
  const [apiState, setApiState] = useState<"checking" | "ready" | "fallback">("checking");
  const [captureNote, setCaptureNote] = useState("");
  const [captures, setCaptures] = useState<CaptureManifest[]>([]);
  const [notice, setNotice] = useState("");
  const restoredShareRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setCaptures(loadCaptureRegistry());
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setApiState("checking");
    fetch(API, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const body = await response.json() as { ok?: boolean } & Partial<SimulationMeta>;
        if (!response.ok || !body.ok || !body.bounds || !body.defaults || !body.presets) throw new Error("API metadata unavailable");
        const nextMeta: SimulationMeta = {
          engine_version: body.engine_version ?? fallbackMeta.engine_version,
          claim_status: body.claim_status ?? fallbackMeta.claim_status,
          bounds: body.bounds as SimulationMeta["bounds"],
          defaults: body.defaults as SimulationParameters,
          presets: body.presets as Record<PresetName, Preset>,
        };
        setMeta(nextMeta);
        setApiState("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMeta(fallbackMeta);
        setApiState("fallback");
      });
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (!open || restoredShareRef.current) return;
    const query = new URLSearchParams(window.location.search);
    if (query.get("fascinator") !== "boundary-attractor") return;
    const next = { ...fallbackMeta.defaults };
    const presetValue = query.get(shareKeys.preset);
    if (presetValue && presetValue in fallbackMeta.presets) next.preset = presetValue as PresetName;
    const numericKeys = (Object.keys(shareKeys) as Array<keyof SimulationParameters>)
      .filter((key): key is NumericParameter => key !== "preset");
    numericKeys.forEach((key) => {
      const value = query.get(shareKeys[key]);
      if (value === null) return;
      const parsed = Number(value);
      if (Number.isFinite(parsed)) next[key] = parsed;
    });
    const cameraValue = Number(query.get("vf_camera"));
    const trailValue = Number(query.get("vf_trails"));
    if (Number.isFinite(cameraValue)) setCamera(Math.max(-180, Math.min(180, cameraValue)));
    if (Number.isFinite(trailValue)) setTrailLength(Math.max(0, Math.min(24, trailValue)));
    setParameters(next);
    restoredShareRef.current = true;
  }, [open]);

  useEffect(() => {
    if (!playing || !result) return;
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
  }, [playing, result]);

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

      const points = result.positions[safeFrame]
        .map((point, index) => {
          const projected = project(point, safeFrame);
          return {
            x: projected[0],
            y: projected[1],
            z: projected[2],
            score: result.scores[safeFrame][index],
            phase: result.phases[safeFrame][index],
          };
        })
        .sort((a, b) => a.z - b.z);

      points.forEach((point) => {
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

  const selectedPreset = meta.presets[parameters.preset] ?? fallbackMeta.presets.cathedral;
  const workUnits = parameters.particles * parameters.frames;
  const workLimit = meta.bounds.work_units_max;
  const workRatio = workUnits / workLimit;
  const budgetState = workRatio > 0.88 ? "heavy" : workRatio > 0.62 ? "medium" : "light";
  const frameCount = result?.positions.length ?? 0;
  const currentClosure = result ? average(result.scores[Math.min(frame, result.scores.length - 1)]) : null;

  const updateNumber = (key: NumericControl, value: number) => {
    setParameters((current) => ({ ...current, [key]: value }));
  };

  const applyPreset = (name: PresetName) => {
    const preset = meta.presets[name] ?? fallbackMeta.presets[name];
    setParameters((current) => ({
      ...current,
      preset: name,
      damping: preset.damping,
      closure_strength: preset.closure_strength,
      shell_amplitude: preset.shell_amplitude,
      harmonic: preset.harmonic,
      selectivity: preset.selectivity,
      twist: preset.twist,
      braid_strength: preset.braid_strength,
      flow_rate: preset.flow_rate,
    }));
  };

  const reset = () => {
    setParameters(meta.defaults);
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

  const run = async (override?: SimulationParameters) => {
    const nextParameters = override ?? parameters;
    if (nextParameters.particles * nextParameters.frames > workLimit) {
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
        body: JSON.stringify(nextParameters),
      });
      const body = await response.json() as ({ ok?: boolean; error?: string } & Partial<SimulationResult>);
      if (!response.ok || !body.ok || !body.positions || !body.metrics || !body.run_id) {
        throw new Error(body.error ?? `Simulation failed (${response.status})`);
      }
      setParameters(nextParameters);
      setResult(body as SimulationResult);
      setFrame(0);
      setNotice(`Run complete · ${body.run_id}`);
    } catch (error: unknown) {
      setNotice(error instanceof Error ? error.message : "Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = (source = result?.parameters ?? parameters) => {
    const url = new URL(window.location.href);
    url.searchParams.set("fascinator", "boundary-attractor");
    (Object.keys(shareKeys) as Array<keyof SimulationParameters>).forEach((key) => {
      url.searchParams.set(shareKeys[key], String(source[key]));
    });
    url.searchParams.set("vf_camera", String(camera));
    url.searchParams.set("vf_trails", String(trailLength));
    return url.toString();
  };

  const manifest = (): CaptureManifest | null => {
    if (!result) return null;
    return {
      schema_version: "browser_capture_v0.2",
      run_id: result.run_id,
      engine_version: result.engine_version,
      captured_at: new Date().toISOString(),
      claim_status: result.claim_status,
      parameters: result.parameters,
      metrics: result.metrics,
      bounds: result.bounds,
      presentation: {
        trail_length: trailLength,
        camera_offset_deg: camera,
        color_encoding: "phase_hsl",
        prominence_encoding: "closure_score",
        rendering: "browser_canvas_2d_projection",
      },
      share_url: shareUrl(result.parameters),
      note: captureNote.trim(),
    };
  };

  const saveCapture = () => {
    const next = manifest();
    if (!next) {
      setNotice("Run an experiment before capturing it.");
      return;
    }
    const registry = [next, ...captures].slice(0, 30);
    window.localStorage.setItem(STORE, JSON.stringify(registry));
    setCaptures(registry);
    setNotice(`Captured ${next.run_id} in this browser.`);
  };

  const downloadManifest = () => {
    const next = manifest();
    if (!next) {
      setNotice("Run an experiment before exporting a manifest.");
      return;
    }
    const blob = new Blob([JSON.stringify(next, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${next.run_id}.manifest.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 1500);
  };

  const exportSnapshot = () => {
    if (!result || !canvasRef.current) {
      setNotice("Run an experiment before exporting a snapshot.");
      return;
    }
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `${result.run_id}-frame-${frame + 1}.png`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(href), 1500);
    }, "image/png");
  };

  const copyPermalink = async () => {
    try {
      await window.navigator.clipboard.writeText(shareUrl());
      setNotice("Deterministic state link copied.");
    } catch {
      setNotice("Clipboard access is unavailable in this browser.");
    }
  };

  const loadCapture = async (capture: CaptureManifest) => {
    setParameters(capture.parameters);
    setTrailLength(capture.presentation.trail_length);
    setCamera(capture.presentation.camera_offset_deg);
    setCaptureNote(capture.note);
    setTab("explore");
    await run(capture.parameters);
  };

  const deleteCapture = (runId: string) => {
    const registry = captures.filter((capture) => capture.run_id !== runId);
    window.localStorage.setItem(STORE, JSON.stringify(registry));
    setCaptures(registry);
  };

  const clearCaptures = () => {
    window.localStorage.removeItem(STORE);
    setCaptures([]);
  };

  const manifestPreview = result ? JSON.stringify({
    schema_version: "browser_capture_v0.2",
    run_id: result.run_id,
    engine_version: result.engine_version,
    captured_at: "generated on capture",
    claim_status: result.claim_status,
    parameters: result.parameters,
    metrics: result.metrics,
    bounds: result.bounds,
    presentation: {
      trail_length: trailLength,
      camera_offset_deg: camera,
      color_encoding: "phase_hsl",
      prominence_encoding: "closure_score",
      rendering: "browser_canvas_2d_projection",
    },
    share_url: "generated from current page state",
    note: captureNote.trim(),
  }, null, 2) : "Run an experiment to generate a capture manifest.";

  if (!mounted || !open) return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={styles.instrument} role="dialog" aria-modal="true" aria-label="Boundary First Visual Mathematics instrument">
        <span className={styles.fasteners} aria-hidden="true"><i /><i /><i /><i /></span>
        <header className={styles.instrumentHeader}>
          <div className={styles.titleBlock}>
            <small>INSTRUMENT · VISUAL MATHEMATICS</small>
            <h2>Boundary Attractor</h2>
            <p>Control the dynamics. Inspect the observables. Preserve the recipe.</p>
          </div>
          <div className={styles.statusBus}>
            <span data-state="active"><small>STATE</small>ACTIVE</span>
            <span><small>CLAIM</small>{meta.claim_status.replaceAll("_", " ")}</span>
            <span data-api={apiState}><small>ENGINE</small>{apiState === "ready" ? "CONNECTED" : apiState === "checking" ? "CHECKING" : "LOCAL META"}</span>
          </div>
          <button ref={closeButtonRef} className={styles.returnButton} type="button" onClick={onClose}>RETURN</button>
        </header>

        <nav className={styles.tabs} aria-label="Fascinator instrument sections">
          {(["explore", "capture", "method"] as Tab[]).map((name) => (
            <button key={name} type="button" aria-pressed={tab === name} onClick={() => setTab(name)}>
              <small>{name === "explore" ? "OPERATE" : name === "capture" ? "RECORD" : "EXPLAIN"}</small>
              {name === "explore" ? "Run" : name === "capture" ? "Capture" : "Method"}
            </button>
          ))}
          <span className={styles.engineReadout}>{meta.engine_version}</span>
        </nav>

        <div className={styles.body}>
          {tab === "explore" ? (
            <div className={styles.explorer}>
              <aside className={`${styles.panel} ${styles.controls}`}>
                <div className={styles.panelHeading}>
                  <div><small>INPUT GRAMMAR</small><strong>Run controls</strong></div>
                  <button type="button" onClick={reset}>RESET</button>
                </div>

                <label className={styles.selectField}>
                  <span>Preset</span>
                  <select value={parameters.preset} onChange={(event) => applyPreset(event.target.value as PresetName)}>
                    {(Object.keys(meta.presets) as PresetName[]).map((name) => <option key={name} value={name}>{meta.presets[name].label}</option>)}
                  </select>
                  <small>{selectedPreset.description}</small>
                </label>

                <div className={styles.controlGroup}>
                  <header><span>SAMPLING</span><i /></header>
                  <label className={styles.numberField}>
                    <span>Seed</span>
                    <input type="number" min={0} step={1} value={parameters.seed} onChange={(event) => setParameters((current) => ({ ...current, seed: Math.max(0, Number(event.target.value) || 0) }))} />
                  </label>
                  <RangeControl name="particles" label="Particles" value={parameters.particles} bound={meta.bounds.particles} onChange={(value) => updateNumber("particles", value)} />
                  <RangeControl name="frames" label="Frames" value={parameters.frames} bound={meta.bounds.frames} onChange={(value) => updateNumber("frames", value)} />
                  <RangeControl name="dt" label="dt" value={parameters.dt} bound={meta.bounds.dt} onChange={(value) => updateNumber("dt", value)} />
                </div>

                <div className={styles.controlGroup}>
                  <header><span>BOUNDARY DYNAMICS</span><i /></header>
                  <RangeControl name="closure_strength" label="Closure force" value={parameters.closure_strength} bound={meta.bounds.closure_strength} onChange={(value) => updateNumber("closure_strength", value)} />
                  <RangeControl name="shell_amplitude" label="Shell amplitude" value={parameters.shell_amplitude} bound={meta.bounds.shell_amplitude} onChange={(value) => updateNumber("shell_amplitude", value)} />
                  <RangeControl name="harmonic" label="Harmonic" value={parameters.harmonic} bound={meta.bounds.harmonic} onChange={(value) => updateNumber("harmonic", value)} />
                  <RangeControl name="selectivity" label="Selectivity" value={parameters.selectivity} bound={meta.bounds.selectivity} onChange={(value) => updateNumber("selectivity", value)} />
                </div>

                <div className={styles.controlGroup}>
                  <header><span>TRANSPORT</span><i /></header>
                  <RangeControl name="damping" label="Chaos damping" value={parameters.damping} bound={meta.bounds.damping} onChange={(value) => updateNumber("damping", value)} />
                  <RangeControl name="twist" label="Twist" value={parameters.twist} bound={meta.bounds.twist} onChange={(value) => updateNumber("twist", value)} />
                  <RangeControl name="braid_strength" label="Braid" value={parameters.braid_strength} bound={meta.bounds.braid_strength} onChange={(value) => updateNumber("braid_strength", value)} />
                  <RangeControl name="flow_rate" label="Flow" value={parameters.flow_rate} bound={meta.bounds.flow_rate} onChange={(value) => updateNumber("flow_rate", value)} />
                </div>
              </aside>

              <section className={styles.viewportStack}>
                <div className={`${styles.panel} ${styles.runStrip}`}>
                  <div className={styles.budget} data-budget={budgetState}>
                    <i />
                    <span><small>BOUNDED COMPUTE</small><strong>{workUnits.toLocaleString()} / {workLimit.toLocaleString()} work units</strong></span>
                  </div>
                  <div>
                    <button className={styles.secondaryAction} type="button" onClick={randomizeSeed}>NEW SEED</button>
                    <button className={styles.primaryAction} type="button" disabled={loading || workUnits > workLimit} onClick={() => void run()}>{loading ? "INTEGRATING…" : "RUN EXPERIMENT"}</button>
                  </div>
                </div>

                <div className={`${styles.panel} ${styles.viewport}`} ref={viewportRef}>
                  <canvas ref={canvasRef} aria-label="Boundary attractor visualization" />
                  {!result && !loading ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyOrbit} aria-hidden="true"><span /><i /><b /></div>
                      <h3>Build a boundary attractor</h3>
                      <p>Choose a regime, adjust the dynamics, then run a bounded simulation.</p>
                      <button className={styles.primaryAction} type="button" onClick={() => void run()}>RUN DEFAULT</button>
                    </div>
                  ) : null}
                  {loading ? <div className={styles.loadingState}><i /><span>INTEGRATING STATE TRAJECTORIES</span></div> : null}
                  <span className={`${styles.viewportBadge} ${styles.viewportBadgeLeft}`}>{result?.run_id ?? "NO RUN"}</span>
                  <span className={`${styles.viewportBadge} ${styles.viewportBadgeRight}`}>{result ? `FRAME ${frame + 1} · CLOSURE ${currentClosure?.toFixed(3)}` : "FRAME —"}</span>
                </div>

                <div className={`${styles.panel} ${styles.transport}`}>
                  <button type="button" disabled={!result} aria-label={playing ? "Pause animation" : "Play animation"} onClick={() => setPlaying((current) => !current)}>{playing ? "Ⅱ" : "▶"}</button>
                  <input type="range" min={0} max={Math.max(0, frameCount - 1)} value={Math.min(frame, Math.max(0, frameCount - 1))} disabled={!result} onChange={(event) => { setPlaying(false); setFrame(Number(event.target.value)); }} aria-label="Animation frame" />
                  <output>{result ? `${frame + 1} / ${frameCount}` : "0 / 0"}</output>
                  <label><span>TRAILS</span><input type="range" min={0} max={24} value={trailLength} onChange={(event) => setTrailLength(Number(event.target.value))} /></label>
                  <label><span>CAMERA</span><input type="range" min={-180} max={180} value={camera} onChange={(event) => setCamera(Number(event.target.value))} /></label>
                </div>
              </section>

              <aside className={`${styles.panel} ${styles.telemetry}`}>
                <div className={styles.panelHeading}><div><small>OBSERVABLES</small><strong>Telemetry</strong></div></div>
                <div className={styles.metricGrid}>
                  <article><span>MEAN CLOSURE</span><strong>{result ? result.metrics.mean_closure.toFixed(3) : "—"}</strong></article>
                  <article><span>MEAN DEFECT</span><strong>{result ? result.metrics.mean_defect.toFixed(3) : "—"}</strong></article>
                  <article><span>STRONG CLOSURE</span><strong>{result ? result.metrics.strongly_admissible_last_frame : "—"}</strong></article>
                  <article><span>EXTENT</span><strong>{result ? result.metrics.extent_99_6.toFixed(2) : "—"}</strong></article>
                </div>
                <div className={styles.legendBlock}>
                  <small>ENCODING</small>
                  <div className={styles.phaseRamp} />
                  <p><span>PHASE</span><span>0 → 2π</span></p>
                  <p><i className={styles.brightDot} />prominence ∝ closure score</p>
                  <p><i className={styles.lineSwatch} />trails = persistent witnesses</p>
                </div>
                <div className={styles.claimCard}>
                  <small>CLAIM BOUNDARY</small>
                  <p>This is a reproducible computational exhibit. Visual structure can suggest questions; it does not establish a theorem by appearance alone.</p>
                </div>
                <button className={styles.secondaryAction} type="button" disabled={!result} onClick={() => setTab("capture")}>CAPTURE THIS RUN</button>
              </aside>
            </div>
          ) : null}

          {tab === "capture" ? (
            <div className={styles.captureLayout}>
              <section className={`${styles.panel} ${styles.captureCurrent}`}>
                <div className={styles.panelHeading}><div><small>CURRENT STATE</small><strong>Capture a reproducible run</strong></div></div>
                <p className={styles.lede}>A capture freezes the exact dynamics inputs, returned metrics, presentation settings, deterministic run ID, and state link. Trajectory data remains transient; the manifest is the durable recipe.</p>
                <label className={styles.noteField}><span>CAPTURE NOTE</span><textarea rows={3} value={captureNote} onChange={(event) => setCaptureNote(event.target.value)} placeholder="What is interesting about this run?" /></label>
                <div className={styles.captureActions}>
                  <button className={styles.primaryAction} type="button" onClick={saveCapture}>SAVE CAPTURE</button>
                  <button className={styles.secondaryAction} type="button" onClick={downloadManifest}>MANIFEST</button>
                  <button className={styles.secondaryAction} type="button" onClick={exportSnapshot}>PNG</button>
                  <button className={styles.secondaryAction} type="button" onClick={() => void copyPermalink()}>COPY STATE LINK</button>
                </div>
                <pre className={styles.manifestPreview}>{manifestPreview}</pre>
              </section>
              <section className={`${styles.panel} ${styles.captureHistory}`}>
                <div className={styles.panelHeading}>
                  <div><small>BROWSER REGISTRY</small><strong>Captured runs</strong></div>
                  <button type="button" onClick={clearCaptures}>CLEAR</button>
                </div>
                <div className={styles.historyList}>
                  {captures.length ? captures.map((capture) => (
                    <article key={`${capture.run_id}-${capture.captured_at}`}>
                      <header><strong>{meta.presets[capture.parameters.preset]?.label ?? capture.parameters.preset}</strong><small>{capture.run_id}</small></header>
                      <p>{capture.note || "Captured Boundary Attractor run"}</p>
                      <span>closure {capture.metrics.mean_closure.toFixed(3)} · {new Date(capture.captured_at).toLocaleString()}</span>
                      <div>
                        <button type="button" onClick={() => void loadCapture(capture)}>LOAD</button>
                        <button type="button" onClick={() => deleteCapture(capture.run_id)}>DELETE</button>
                      </div>
                    </article>
                  )) : <p className={styles.emptyRegistry}>No browser captures yet.</p>}
                </div>
              </section>
            </div>
          ) : null}

          {tab === "method" ? (
            <div className={styles.methodGrid}>
              <article className={`${styles.panel} ${styles.methodHero}`}>
                <small>ARCHITECTURE</small>
                <h3>Dynamics → measurement → presentation</h3>
                <p>The instrument preserves a strict boundary between what evolves mathematically, what is measured from that evolution, and how those measurements are rendered.</p>
                <div className={styles.flowDiagram}>
                  <div><strong>DYNAMICS</strong><span>chaos + closure + twist + braid</span></div><i>→</i>
                  <div><strong>MEASUREMENT</strong><span>defect + score + phase + persistence</span></div><i>→</i>
                  <div><strong>PRESENTATION</strong><span>projection + trails + color + camera</span></div>
                </div>
              </article>
              <article className={styles.panel}><small>CARRIER</small><h3>Chaotic transport</h3><code>ẋ = sin(ωy) − bx<br />ẏ = sin(ωz) − by<br />ż = sin(ωx) − bz</code></article>
              <article className={styles.panel}><small>BOUNDARY</small><h3>Moving closure shell</h3><code>R*(θ, φ, t) = R[1 + a cos(hθ + Ωt) cos((h−1)φ − 0.63Ωt)]</code></article>
              <article className={styles.panel}><small>OBSERVABLE</small><h3>Closure score</h3><code>A(x) = exp[−s Δ(x)²]</code><p>States closer to the active boundary condition become more visually prominent.</p></article>
              <article className={styles.panel}><small>RESEARCH USE</small><h3>What to test</h3><p>Seed robustness, term ablation, parameter transitions, recurrence, projection sensitivity, and eventual replacement of prototype terms by exact Boundary Theory / Information Mechanics operators.</p></article>
            </div>
          ) : null}
        </div>

        <footer className={styles.footerBus}>
          <span>BOUNDARY FIRST VISUAL MATHEMATICS</span>
          <span>{notice || "THE IMAGE MAY INVITE ATTENTION; THE MATHEMATICS MUST SURVIVE INSPECTION."}</span>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

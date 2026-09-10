import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENGINE_VERSION = "boundary-attractor-web-0.2.0";
const WORK_UNITS_MAX = 36_000;
const TAU = Math.PI * 2;

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

type Preset = Omit<Parameters, "preset" | "seed" | "particles" | "frames" | "dt" | "radius"> & {
  label: string;
  description: string;
};

type Bound = { min: number; max: number; default: number };

const BOUNDS = {
  particles: { min: 80, max: 600, default: 420 },
  frames: { min: 12, max: 72, default: 60 },
  work_units_max: WORK_UNITS_MAX,
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
} satisfies Record<string, Bound | number>;

const PRESETS: Record<PresetName, Preset> = {
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
};

const DEFAULTS: Parameters = {
  preset: "cathedral",
  seed: 17,
  particles: 420,
  frames: 60,
  dt: 0.026,
  radius: 2.15,
  damping: PRESETS.cathedral.damping,
  closure_strength: PRESETS.cathedral.closure_strength,
  shell_amplitude: PRESETS.cathedral.shell_amplitude,
  harmonic: PRESETS.cathedral.harmonic,
  selectivity: PRESETS.cathedral.selectivity,
  twist: PRESETS.cathedral.twist,
  braid_strength: PRESETS.cathedral.braid_strength,
  flow_rate: PRESETS.cathedral.flow_rate,
};

function clampNumber(value: unknown, name: keyof Parameters, bound: Bound, integer = false) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${name} must be a number`);
  const normalized = integer ? Math.trunc(number) : number;
  if (normalized < bound.min || normalized > bound.max) {
    throw new Error(`${name} must be between ${bound.min} and ${bound.max}`);
  }
  return normalized;
}

function normalize(input: unknown): Parameters {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("request must be a JSON object");
  const body = input as Record<string, unknown>;
  const preset = String(body.preset ?? DEFAULTS.preset) as PresetName;
  if (!(preset in PRESETS)) throw new Error(`unknown preset: ${preset}`);
  const base = { ...DEFAULTS, ...PRESETS[preset], preset } as Parameters;
  const merged = { ...base, ...body, preset } as Record<keyof Parameters, unknown>;
  const parameters: Parameters = {
    preset,
    seed: Math.max(0, Math.trunc(Number(merged.seed) || 0)),
    particles: clampNumber(merged.particles, "particles", BOUNDS.particles, true),
    frames: clampNumber(merged.frames, "frames", BOUNDS.frames, true),
    dt: clampNumber(merged.dt, "dt", BOUNDS.dt),
    damping: clampNumber(merged.damping, "damping", BOUNDS.damping),
    radius: clampNumber(merged.radius, "radius", BOUNDS.radius),
    closure_strength: clampNumber(merged.closure_strength, "closure_strength", BOUNDS.closure_strength),
    shell_amplitude: clampNumber(merged.shell_amplitude, "shell_amplitude", BOUNDS.shell_amplitude),
    harmonic: clampNumber(merged.harmonic, "harmonic", BOUNDS.harmonic, true),
    selectivity: clampNumber(merged.selectivity, "selectivity", BOUNDS.selectivity),
    twist: clampNumber(merged.twist, "twist", BOUNDS.twist),
    braid_strength: clampNumber(merged.braid_strength, "braid_strength", BOUNDS.braid_strength),
    flow_rate: clampNumber(merged.flow_rate, "flow_rate", BOUNDS.flow_rate),
  };
  if (parameters.particles * parameters.frames > WORK_UNITS_MAX) {
    throw new Error(`run is too large: particles x frames = ${parameters.particles * parameters.frames}; maximum is ${WORK_UNITS_MAX}`);
  }
  return parameters;
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normalPair(random: () => number) {
  const u1 = Math.max(1e-12, random());
  const u2 = random();
  const radius = Math.sqrt(-2 * Math.log(u1));
  const theta = TAU * u2;
  return [radius * Math.cos(theta), radius * Math.sin(theta)] as const;
}

function targetRadius(x: number, y: number, z: number, time: number, p: Parameters) {
  const rho = Math.hypot(x, y);
  const az = Math.atan2(y, x);
  const el = Math.atan2(z, Math.max(rho, 1e-7));
  const phase = p.flow_rate * time;
  const modulation = Math.cos(p.harmonic * az + phase) * Math.cos((p.harmonic - 1) * el - 0.63 * phase);
  return p.radius * (1 + p.shell_amplitude * modulation);
}

function field(x: number, y: number, z: number, time: number, p: Parameters) {
  const radius = Math.hypot(x, y, z);
  const safeRadius = Math.max(radius, 1e-7);
  const tx = x / safeRadius;
  const ty = y / safeRadius;
  const tz = z / safeRadius;
  const target = targetRadius(x, y, z, time, p);
  const closureScale = -p.closure_strength * Math.tanh(radius - target);
  const swirlScale = p.twist / (1 + 0.35 * radius);
  const rho = Math.hypot(x, y);
  const az = Math.atan2(y, x);
  const phase = p.harmonic * az + p.flow_rate * time;
  const braidZ = Math.sin(phase - 0.7 * Math.atan2(z, Math.max(rho, 1e-7))) * rho / (1 + rho);
  return [
    Math.sin(y) - p.damping * x + closureScale * tx + swirlScale * -y + p.braid_strength * Math.cos(phase) * z,
    Math.sin(z) - p.damping * y + closureScale * ty + swirlScale * x + p.braid_strength * Math.sin(phase) * z,
    Math.sin(x) - p.damping * z + closureScale * tz + p.braid_strength * braidZ,
  ] as const;
}

function observables(x: number, y: number, z: number, time: number, p: Parameters) {
  const radius = Math.hypot(x, y, z);
  const defect = Math.abs(radius - targetRadius(x, y, z, time, p));
  const score = Math.exp(-p.selectivity * defect * defect);
  const rho = Math.hypot(x, y);
  const az = Math.atan2(y, x);
  const el = Math.atan2(z, Math.max(rho, 1e-7));
  const rawPhase = p.harmonic * az + 0.75 * el + p.flow_rate * time;
  const phase = ((rawPhase % TAU) + TAU) % TAU;
  return { defect, score, phase };
}

function percentile(values: number[], q: number) {
  if (!values.length) return 1;
  values.sort((a, b) => a - b);
  const index = (values.length - 1) * q;
  const low = Math.floor(index);
  const high = Math.ceil(index);
  if (low === high) return values[low];
  const fraction = index - low;
  return values[low] * (1 - fraction) + values[high] * fraction;
}

async function hashRun(parameters: Parameters) {
  const canonical = JSON.stringify(Object.fromEntries(Object.entries(parameters).sort(([a], [b]) => a.localeCompare(b))));
  const bytes = new TextEncoder().encode(`${ENGINE_VERSION}${canonical}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `ba-${Array.from(new Uint8Array(digest)).slice(0, 8).map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

async function simulate(p: Parameters) {
  const random = mulberry32(p.seed);
  const n = p.particles;
  const frames = p.frames;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const z = new Float64Array(n);
  let spareNormal: number | null = null;
  const nextNormal = () => {
    if (spareNormal !== null) {
      const value = spareNormal;
      spareNormal = null;
      return value;
    }
    const pair = normalPair(random);
    spareNormal = pair[1];
    return pair[0];
  };

  for (let i = 0; i < n; i += 1) {
    let nx = nextNormal();
    let ny = nextNormal();
    let nz = nextNormal();
    const length = Math.max(Math.hypot(nx, ny, nz), 1e-7);
    nx /= length;
    ny /= length;
    nz /= length;
    const shellRadius = p.radius * (0.22 + 1.38 * Math.pow(Math.max(1e-12, random()), 1 / 1.75));
    x[i] = nx * shellRadius + 0.08 * p.radius * nextNormal();
    y[i] = ny * shellRadius + 0.08 * p.radius * nextNormal();
    z[i] = nz * shellRadius + 0.08 * p.radius * nextNormal();
  }

  const positions: number[][][] = new Array(frames);
  const scores: number[][] = new Array(frames);
  const phases: number[][] = new Array(frames);
  const scoreTotals = new Float64Array(n);
  const absoluteCoordinates: number[] = [];
  let scoreSum = 0;
  let scoreMax = 0;
  let defectSum = 0;
  let strongLastFrame = 0;
  const maxRadius = 5.5 * p.radius;

  for (let frame = 0; frame < frames; frame += 1) {
    const time = frame * p.dt;
    const framePositions: number[][] = new Array(n);
    const frameScores: number[] = new Array(n);
    const framePhases: number[] = new Array(n);
    const k1x = new Float64Array(n);
    const k1y = new Float64Array(n);
    const k1z = new Float64Array(n);

    for (let i = 0; i < n; i += 1) {
      framePositions[i] = [Number(x[i].toFixed(4)), Number(y[i].toFixed(4)), Number(z[i].toFixed(4))];
      absoluteCoordinates.push(Math.abs(x[i]), Math.abs(y[i]), Math.abs(z[i]));
      const measurement = observables(x[i], y[i], z[i], time, p);
      const roundedScore = Number(measurement.score.toFixed(4));
      const roundedPhase = Number(measurement.phase.toFixed(4));
      frameScores[i] = roundedScore;
      framePhases[i] = roundedPhase;
      scoreTotals[i] += measurement.score;
      scoreSum += measurement.score;
      scoreMax = Math.max(scoreMax, measurement.score);
      defectSum += measurement.defect;
      if (frame === frames - 1 && measurement.score > 0.72) strongLastFrame += 1;
      const first = field(x[i], y[i], z[i], time, p);
      k1x[i] = first[0];
      k1y[i] = first[1];
      k1z[i] = first[2];
    }

    positions[frame] = framePositions;
    scores[frame] = frameScores;
    phases[frame] = framePhases;

    for (let i = 0; i < n; i += 1) {
      const second = field(
        x[i] + 0.5 * p.dt * k1x[i],
        y[i] + 0.5 * p.dt * k1y[i],
        z[i] + 0.5 * p.dt * k1z[i],
        time + 0.5 * p.dt,
        p,
      );
      x[i] += p.dt * second[0];
      y[i] += p.dt * second[1];
      z[i] += p.dt * second[2];
      const radius = Math.hypot(x[i], y[i], z[i]);
      if (radius > maxRadius) {
        const scale = maxRadius / radius;
        x[i] *= scale;
        y[i] *= scale;
        z[i] *= scale;
      }
    }
  }

  const persistentIds = Array.from({ length: n }, (_, id) => id)
    .sort((a, b) => scoreTotals[b] - scoreTotals[a])
    .slice(0, Math.min(80, n));
  const extent = Math.max(percentile(absoluteCoordinates, 0.996), 1);
  const totalSamples = n * frames;
  const runId = await hashRun(p);

  return {
    ok: true,
    schema_version: "web_run_v0.2",
    engine_version: ENGINE_VERSION,
    run_id: runId,
    claim_status: "prototype_dynamics",
    parameters: p,
    bounds: { work_units: totalSamples, work_units_max: WORK_UNITS_MAX },
    metrics: {
      mean_closure: Number((scoreSum / totalSamples).toFixed(6)),
      max_closure: Number(scoreMax.toFixed(6)),
      mean_defect: Number((defectSum / totalSamples).toFixed(6)),
      strongly_admissible_last_frame: strongLastFrame,
      extent_99_6: Number(extent.toFixed(5)),
    },
    persistent_ids: persistentIds,
    positions,
    scores,
    phases,
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    engine_version: ENGINE_VERSION,
    claim_status: "prototype_dynamics",
    bounds: BOUNDS,
    defaults: DEFAULTS,
    presets: PRESETS,
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (!text.length || text.length > 65_536) throw new Error("request body must be between 1 byte and 64 KB");
    const parameters = normalize(JSON.parse(text));
    return NextResponse.json(await simulate(parameters), { headers: { "Cache-Control": "no-store" } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "simulation failed";
    const status = message.includes("must") || message.includes("unknown preset") || message.includes("too large") || message.includes("request body") ? 422 : 500;
    return NextResponse.json({ ok: false, error: status === 500 ? "simulation failed" : message, detail: status === 500 ? message.slice(0, 180) : undefined }, { status });
  }
}

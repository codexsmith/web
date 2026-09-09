"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./BoundaryFascinator.module.css";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type FascinatorScene = "hopf" | "clifford" | "tesseract" | "lp-morph";
type HopfSeed = {
  base: Vec3;
  phase: number;
  strength: number;
};
type DrawEnvironment = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  phase: number;
  reduced: boolean;
};

const TAU = Math.PI * 2;
const loopDurationMs = 10_000;
const fiberSamples = 76;
const latitudeBands = [-0.72, -0.36, 0, 0.36, 0.72];
const azimuthCounts = [3, 4, 5, 4, 3];
const rackScenes: FascinatorScene[] = ["hopf", "clifford", "tesseract", "lp-morph"];

const sceneMeta: Record<FascinatorScene, { label: string; aria: string }> = {
  hopf: {
    label: "HOPF",
    aria: "animated Hopf fibration projected from four-dimensional sphere coordinates",
  },
  clifford: {
    label: "CLIFFORD",
    aria: "animated Clifford torus in the three-sphere under four-dimensional rotation and stereographic projection",
  },
  tesseract: {
    label: "TESSERACT",
    aria: "animated four-dimensional hypercube projected into three dimensions",
  },
  "lp-morph": {
    label: "LP MORPH",
    aria: "animated unit L p sphere morphing continuously across p norms",
  },
};

function multiplyPhase(z: Vec4, phase: number): Vec4 {
  const [a, b, c, d] = z;
  const cos = Math.cos(phase);
  const sin = Math.sin(phase);
  return [
    a * cos - b * sin,
    a * sin + b * cos,
    c * cos - d * sin,
    c * sin + d * cos,
  ];
}

function hopfSection(nx: number, ny: number, nz: number): Vec4 {
  const a = Math.sqrt(Math.max(1e-6, (1 + nz) / 2));
  return [a, 0, nx / (2 * a), -ny / (2 * a)];
}

function stereographicS3([a, b, c, d]: Vec4): Vec3 | null {
  const denominator = 1 - d;
  if (Math.abs(denominator) < 0.075) return null;
  const scale = 1 / denominator;
  const point: Vec3 = [a * scale, b * scale, c * scale];
  return Math.hypot(...point) < 8.5 ? point : null;
}

function rotate3([x, y, z]: Vec3, yaw: number, pitch: number, roll: number): Vec3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);

  const x1 = cy * x - sy * z;
  const z1 = sy * x + cy * z;
  const y2 = cp * y - sp * z1;
  const z2 = sp * y + cp * z1;

  return [cr * x1 - sr * y2, sr * x1 + cr * y2, z2];
}

function rotate4Plane(point: Vec4, a: number, b: number, angle: number): Vec4 {
  const next: Vec4 = [...point];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  next[a] = point[a] * cos - point[b] * sin;
  next[b] = point[a] * sin + point[b] * cos;
  return next;
}

function rotate4(point: Vec4, phase: number, reduced = false): Vec4 {
  const primary = reduced ? Math.sin(phase) * 0.22 : phase;
  const secondary = reduced
    ? 0.42 + Math.sin(phase * 2) * 0.18
    : phase * 2 + 0.42;
  const tertiary = Math.sin(phase) * (reduced ? 0.09 : 0.32);

  let next = rotate4Plane(point, 0, 3, primary);
  next = rotate4Plane(next, 1, 2, secondary);
  next = rotate4Plane(next, 0, 2, tertiary);
  return next;
}

function project3(
  point: Vec3,
  environment: DrawEnvironment,
  scaleFactor: number,
  rotation: [number, number, number],
  orbit = 0,
): [number, number, number] {
  const { width, height, phase } = environment;
  const rotated = rotate3(point, rotation[0], rotation[1], rotation[2]);
  const camera = 8.4;
  const perspective = camera / Math.max(3.2, camera + rotated[2]);
  const scale = Math.min(width, height) * scaleFactor;
  return [
    width * 0.5 + Math.sin(phase) * width * orbit + rotated[0] * scale * perspective,
    height * 0.54 + Math.sin(phase * 2) * height * orbit * 0.42 - rotated[1] * scale * perspective,
    rotated[2],
  ];
}

function sceneColor(scene: FascinatorScene, phase: number, alpha: number) {
  const baseHue: Record<FascinatorScene, number> = {
    hopf: 288,
    clifford: 258,
    tesseract: 316,
    "lp-morph": 236,
  };
  const hue = baseHue[scene] + 16 * Math.sin(phase);
  return `hsla(${hue}, 96%, 68%, ${alpha})`;
}

function drawGlow(environment: DrawEnvironment, scene: FascinatorScene) {
  const { context, width, height, phase, reduced } = environment;
  const orbit = reduced ? 0.015 : 0.055;
  const x = width * 0.5 + Math.sin(phase) * width * orbit;
  const y = height * 0.54 + Math.sin(phase * 2) * height * orbit * 0.5;
  const glow = context.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.54);
  glow.addColorStop(0, sceneColor(scene, phase, 0.16));
  glow.addColorStop(0.46, sceneColor(scene, phase + 0.8, 0.035));
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function buildHopfSeeds(): HopfSeed[] {
  const seeds: HopfSeed[] = [];
  latitudeBands.forEach((z, bandIndex) => {
    const count = azimuthCounts[bandIndex];
    const radius = Math.sqrt(1 - z * z);
    const offset = bandIndex % 2 ? Math.PI / count : 0;
    for (let index = 0; index < count; index += 1) {
      const azimuth = offset + (index / count) * TAU;
      seeds.push({
        base: [radius * Math.cos(azimuth), radius * Math.sin(azimuth), z],
        phase: (azimuth + (z + 1) * Math.PI * 0.42) % TAU,
        strength: 0.58 + 0.42 * (1 - Math.abs(z)),
      });
    }
  });
  return seeds;
}

const hopfSeeds = buildHopfSeeds();

function sampleHopfFiber(seed: HopfSeed, phase: number, reduced: boolean): Vec3[] {
  const animatedBase = reduced
    ? rotate3(seed.base, Math.sin(phase) * 0.24, Math.sin(phase) * 0.08, Math.sin(phase * 2) * 0.05)
    : rotate3(seed.base, phase, Math.sin(phase) * 0.24, Math.sin(phase * 2) * 0.16);
  const section = hopfSection(animatedBase[0], animatedBase[1], animatedBase[2]);
  const points: Vec3[] = [];
  for (let sample = 0; sample <= fiberSamples; sample += 1) {
    const fiberPhase = (sample / fiberSamples) * TAU;
    const point = stereographicS3(multiplyPhase(section, fiberPhase));
    if (point) points.push(point);
  }
  return points;
}

function drawHopf(environment: DrawEnvironment) {
  const { context, phase, reduced, dpr } = environment;
  const rotation: [number, number, number] = reduced
    ? [0.42 + Math.sin(phase) * 0.18, -0.32 + Math.sin(phase) * 0.08, Math.sin(phase * 2) * 0.06]
    : [phase + 0.42, -0.32 + Math.sin(phase) * 0.22, Math.sin(phase * 2) * 0.2];

  const ordered = hopfSeeds
    .map((seed) => {
      const points = sampleHopfFiber(seed, phase, reduced);
      const depth = points.length
        ? points.reduce((sum, point) => sum + rotate3(point, ...rotation)[2], 0) / points.length
        : 0;
      return { seed, points, depth };
    })
    .filter(({ points }) => points.length > 18)
    .sort((a, b) => a.depth - b.depth);

  ordered.forEach(({ seed, points }, fiberIndex) => {
    const projected = points.map((point) => project3(point, environment, 0.18, rotation, reduced ? 0.012 : 0.045));
    context.beginPath();
    projected.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
    context.strokeStyle = sceneColor("hopf", seed.phase + phase, 0.2 + seed.strength * 0.3);
    context.lineWidth = (0.72 + seed.strength * 0.66) * Math.max(1, dpr * 0.7);
    context.shadowBlur = 5 * seed.strength;
    context.shadowColor = sceneColor("hopf", seed.phase, 0.32);
    context.stroke();

    const travel = (2 * phase / TAU + fiberIndex / ordered.length) % 1;
    const markerIndex = Math.floor(travel * (projected.length - 1));
    const tailLength = 10;

    context.beginPath();
    for (let offset = tailLength; offset >= 0; offset -= 1) {
      const index = (markerIndex - offset + projected.length) % projected.length;
      const point = projected[index];
      if (!point) continue;
      if (offset === tailLength) context.moveTo(point[0], point[1]);
      else context.lineTo(point[0], point[1]);
    }
    context.strokeStyle = sceneColor("hopf", seed.phase + phase, 0.88);
    context.lineWidth = 1.3 * Math.max(1, dpr * 0.66);
    context.shadowBlur = 10;
    context.shadowColor = sceneColor("hopf", seed.phase + phase, 0.68);
    context.stroke();
  });
}

type CliffordLine = Vec4[];

function buildCliffordLines(): CliffordLine[] {
  const lines: CliffordLine[] = [];
  const fixedCount = 8;
  const samples = 70;
  const r = Math.SQRT1_2;

  for (let fixed = 0; fixed < fixedCount; fixed += 1) {
    const u = (fixed / fixedCount) * TAU;
    const uLine: Vec4[] = [];
    const vLine: Vec4[] = [];
    for (let sample = 0; sample <= samples; sample += 1) {
      const t = (sample / samples) * TAU;
      uLine.push([r * Math.cos(u), r * Math.sin(u), r * Math.cos(t), r * Math.sin(t)]);
      vLine.push([r * Math.cos(t), r * Math.sin(t), r * Math.cos(u), r * Math.sin(u)]);
    }
    lines.push(uLine, vLine);
  }
  return lines;
}

const cliffordLines = buildCliffordLines();

function drawProjectedSegments(
  context: CanvasRenderingContext2D,
  projected: Array<[number, number, number] | null>,
) {
  let drawing = false;
  context.beginPath();
  projected.forEach((point) => {
    if (!point) {
      drawing = false;
      return;
    }
    if (!drawing) {
      context.moveTo(point[0], point[1]);
      drawing = true;
    } else {
      context.lineTo(point[0], point[1]);
    }
  });
}

function drawClifford(environment: DrawEnvironment) {
  const { context, phase, reduced, dpr } = environment;
  const rotation3: [number, number, number] = reduced
    ? [0.52 + Math.sin(phase) * 0.12, -0.36 + Math.sin(phase) * 0.08, 0.08 * Math.sin(phase * 2)]
    : [phase + 0.52, -0.36 + Math.sin(phase) * 0.12, 0.12 * Math.sin(phase * 2)];

  cliffordLines.forEach((line, index) => {
    const projected = line.map((point) => {
      const spatial = stereographicS3(rotate4(point, phase + index * 0.018, reduced));
      return spatial ? project3(spatial, environment, 0.17, rotation3, reduced ? 0.008 : 0.026) : null;
    });
    drawProjectedSegments(context, projected);
    context.strokeStyle = sceneColor("clifford", phase + index * 0.33, index % 2 ? 0.42 : 0.64);
    context.lineWidth = (index % 2 ? 0.72 : 1.02) * Math.max(1, dpr * 0.62);
    context.shadowBlur = index % 2 ? 3 : 7;
    context.shadowColor = sceneColor("clifford", phase + index * 0.2, 0.48);
    context.stroke();
  });
}

const tesseractVertices: Vec4[] = Array.from({ length: 16 }, (_, index) => [
  index & 1 ? 1 : -1,
  index & 2 ? 1 : -1,
  index & 4 ? 1 : -1,
  index & 8 ? 1 : -1,
]);

const tesseractEdges: Array<[number, number]> = [];
for (let vertex = 0; vertex < 16; vertex += 1) {
  for (let dimension = 0; dimension < 4; dimension += 1) {
    const neighbor = vertex ^ (1 << dimension);
    if (vertex < neighbor) tesseractEdges.push([vertex, neighbor]);
  }
}

function project4To3(point: Vec4): Vec3 {
  const depth = 3.35;
  const perspective = depth / Math.max(1.15, depth - point[3] * 0.88);
  return [point[0] * perspective, point[1] * perspective, point[2] * perspective];
}

function drawTesseract(environment: DrawEnvironment) {
  const { context, phase, reduced, dpr } = environment;
  const rotated4 = tesseractVertices.map((point) => rotate4(point, phase + 0.3, reduced));
  const rotation3: [number, number, number] = reduced
    ? [0.54 + Math.sin(phase) * 0.1, -0.34 + 0.08 * Math.sin(phase), 0.08 * Math.sin(phase * 2)]
    : [phase + 0.54, -0.34 + 0.12 * Math.sin(phase), 0.16 * Math.sin(phase * 2)];
  const projected = rotated4.map((point) => project3(project4To3(point), environment, 0.24, rotation3, reduced ? 0.006 : 0.018));

  tesseractEdges.forEach(([a, b], index) => {
    const start = projected[a];
    const end = projected[b];
    const w = (rotated4[a][3] + rotated4[b][3]) * 0.5;
    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.strokeStyle = sceneColor("tesseract", phase + w * 0.7, 0.38 + 0.22 * ((w + 1.6) / 3.2));
    context.lineWidth = (index % 4 === 3 ? 1.25 : 0.82) * Math.max(1, dpr * 0.62);
    context.shadowBlur = index % 4 === 3 ? 7 : 3;
    context.shadowColor = sceneColor("tesseract", phase + w, 0.46);
    context.stroke();
  });

  projected.forEach(([x, y], index) => {
    const w = rotated4[index][3];
    context.beginPath();
    context.fillStyle = sceneColor("tesseract", phase + w, 0.82);
    context.shadowBlur = 8;
    context.shadowColor = sceneColor("tesseract", phase + w, 0.72);
    context.arc(x, y, 1.3 + (w + 1.5) * 0.28, 0, TAU);
    context.fill();
  });
}

function lpPoint(theta: number, phi: number, p: number): Vec3 {
  const direction: Vec3 = [
    Math.sin(theta) * Math.cos(phi),
    Math.sin(theta) * Math.sin(phi),
    Math.cos(theta),
  ];
  const norm = Math.pow(
    Math.pow(Math.abs(direction[0]), p) +
    Math.pow(Math.abs(direction[1]), p) +
    Math.pow(Math.abs(direction[2]), p),
    1 / p,
  );
  return [direction[0] / norm, direction[1] / norm, direction[2] / norm];
}

function drawLpMorph(environment: DrawEnvironment) {
  const { context, phase, reduced, dpr } = environment;
  const mix = 0.5 - 0.5 * Math.cos(phase);
  const p = 1.18 + mix * 6.7;
  const rotation: [number, number, number] = reduced
    ? [0.62 + Math.sin(phase) * 0.1, -0.42 + 0.1 * Math.sin(phase), 0.07 * Math.sin(phase * 2)]
    : [phase + 0.62, -0.42 + 0.16 * Math.sin(phase), 0.12 * Math.sin(phase * 2)];
  const latitudeCount = 7;
  const longitudeCount = 10;
  const samples = 54;

  for (let latitude = 1; latitude < latitudeCount; latitude += 1) {
    const theta = (latitude / latitudeCount) * Math.PI;
    const points: Vec3[] = [];
    for (let sample = 0; sample <= samples; sample += 1) {
      points.push(lpPoint(theta, (sample / samples) * TAU, p));
    }
    const projected = points.map((point) => project3(point, environment, 0.36, rotation, reduced ? 0.004 : 0.014));
    context.beginPath();
    projected.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
    context.strokeStyle = sceneColor("lp-morph", phase + latitude * 0.3, 0.42);
    context.lineWidth = 0.76 * Math.max(1, dpr * 0.62);
    context.shadowBlur = 4;
    context.shadowColor = sceneColor("lp-morph", phase, 0.36);
    context.stroke();
  }

  for (let longitude = 0; longitude < longitudeCount; longitude += 1) {
    const phi = (longitude / longitudeCount) * TAU;
    const points: Vec3[] = [];
    for (let sample = 0; sample <= samples; sample += 1) {
      points.push(lpPoint((sample / samples) * Math.PI, phi, p));
    }
    const projected = points.map((point) => project3(point, environment, 0.36, rotation, reduced ? 0.004 : 0.014));
    context.beginPath();
    projected.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
    context.strokeStyle = sceneColor("lp-morph", phase + longitude * 0.24, longitude % 2 ? 0.34 : 0.58);
    context.lineWidth = (longitude % 2 ? 0.7 : 0.98) * Math.max(1, dpr * 0.62);
    context.shadowBlur = longitude % 2 ? 3 : 6;
    context.shadowColor = sceneColor("lp-morph", phase + longitude * 0.2, 0.42);
    context.stroke();
  }
}

function drawScene(scene: FascinatorScene, environment: DrawEnvironment) {
  drawGlow(environment, scene);
  switch (scene) {
    case "hopf":
      drawHopf(environment);
      break;
    case "clifford":
      drawClifford(environment);
      break;
    case "tesseract":
      drawTesseract(environment);
      break;
    case "lp-morph":
      drawLpMorph(environment);
      break;
  }
  environment.context.shadowBlur = 0;
}

export function BoundaryFascinator({
  scene,
  resolution,
  onInspect,
}: {
  scene: FascinatorScene;
  resolution: LabMachineResolution;
  onInspect?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meta = sceneMeta[scene];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      resize();
      context.clearRect(0, 0, width, height);
      drawScene(scene, {
        context,
        width,
        height,
        dpr,
        phase: ((time % loopDurationMs) / loopDurationMs) * TAU,
        reduced: reducedMotion.matches,
      });
    };

    const animate = (time: number) => {
      draw(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(() => draw(performance.now()));
    observer.observe(canvas);
    draw(performance.now());
    animationFrame = window.requestAnimationFrame(animate);

    const onMotionChange = () => draw(performance.now());
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [scene]);

  const inspect = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onInspect?.();
  };

  return (
    <aside
      className={styles.fascinator}
      data-scene={scene}
      data-resolution={resolution}
      data-loop-duration-ms={loopDurationMs}
      aria-label={`Fascinator visualization: ${meta.aria}`}
    >
      <span className={styles.mounts} aria-hidden="true"><i /><i /><i /><i /></span>
      <header className={styles.header}>
        <span className={styles.sceneName}>{meta.label}</span>
        <span className={styles.headerActions}>
          <span className={styles.liveStatus}>LIVE</span>
          {onInspect ? <button className={styles.inspectButton} type="button" onClick={inspect}>INSPECT</button> : null}
        </span>
      </header>
      <div className={styles.viewport}>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className={styles.reticle} aria-hidden="true"><i /><i /></div>
        <div className={styles.scanline} aria-hidden="true" />
      </div>
    </aside>
  );
}

export function BoundaryFascinatorRack({
  resolution,
  onInspect,
}: {
  resolution: LabMachineResolution;
  onInspect?: () => void;
}) {
  return (
    <div className={styles.rack} data-resolution={resolution} aria-label="Visual mathematics Fascinator rack">
      {rackScenes.map((scene) => (
        <BoundaryFascinator
          key={scene}
          scene={scene}
          resolution={resolution}
          onInspect={scene === "hopf" ? onInspect : undefined}
        />
      ))}
    </div>
  );
}

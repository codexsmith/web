"use client";

import { useEffect, useRef } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./CardMathVisualization.module.css";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type CardMathScene = "clifford" | "tesseract";

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

function rotate4Loop(point: Vec4, phase: number, offset = 0, reduced = false): Vec4 {
  const amplitude = reduced ? 0.34 : 1;
  const primary = Math.sin(phase + offset) * 1.08 * amplitude;
  const secondary = 0.42 + Math.sin(phase * 2 + offset * 0.7) * 0.82 * amplitude;
  const tertiary = Math.cos(phase - offset * 0.4) * 0.42 * amplitude;

  let next = rotate4Plane(point, 0, 3, primary);
  next = rotate4Plane(next, 1, 2, secondary);
  next = rotate4Plane(next, 0, 2, tertiary);
  return next;
}

function stereographicS3([a, b, c, d]: Vec4): Vec3 | null {
  const denominator = 1 - d;
  if (Math.abs(denominator) < 0.085) return null;
  const scale = 1 / denominator;
  const point: Vec3 = [a * scale, b * scale, c * scale];
  return Math.hypot(...point) < 7.4 ? point : null;
}

function project3(
  point: Vec3,
  environment: DrawEnvironment,
  scaleFactor: number,
  rotation: [number, number, number],
): [number, number, number] {
  const { width, height } = environment;
  const rotated = rotate3(point, rotation[0], rotation[1], rotation[2]);
  const camera = 8.4;
  const perspective = camera / Math.max(3.2, camera + rotated[2]);
  const scale = Math.min(width, height) * scaleFactor;
  return [
    width * 0.5 + rotated[0] * scale * perspective,
    height * 0.52 - rotated[1] * scale * perspective,
    rotated[2],
  ];
}

function sceneColor(scene: CardMathScene, phase: number, alpha: number) {
  const baseHue = scene === "clifford" ? 212 : 4;
  const hue = baseHue + 9 * Math.sin(phase);
  return `hsla(${hue}, 96%, 67%, ${alpha})`;
}

function drawGlow(environment: DrawEnvironment, scene: CardMathScene) {
  const { context, width, height, phase } = environment;
  const glow = context.createRadialGradient(
    width * 0.5,
    height * 0.52,
    0,
    width * 0.5,
    height * 0.52,
    Math.max(width, height) * 0.58,
  );
  glow.addColorStop(0, sceneColor(scene, phase, 0.17));
  glow.addColorStop(0.5, sceneColor(scene, phase + 0.8, 0.035));
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

type CliffordLine = Vec4[];

function buildCliffordLines(): CliffordLine[] {
  const lines: CliffordLine[] = [];
  const fixedCount = 8;
  const samples = 64;
  const radius = Math.SQRT1_2;

  for (let fixed = 0; fixed < fixedCount; fixed += 1) {
    const u = (fixed / fixedCount) * TAU;
    const uLine: Vec4[] = [];
    const vLine: Vec4[] = [];

    for (let sample = 0; sample <= samples; sample += 1) {
      const t = (sample / samples) * TAU;
      uLine.push([
        radius * Math.cos(u),
        radius * Math.sin(u),
        radius * Math.cos(t),
        radius * Math.sin(t),
      ]);
      vLine.push([
        radius * Math.cos(t),
        radius * Math.sin(t),
        radius * Math.cos(u),
        radius * Math.sin(u),
      ]);
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
  const amplitude = reduced ? 0.34 : 1;
  const rotation3: [number, number, number] = [
    0.52 + Math.sin(phase) * 0.68 * amplitude,
    -0.36 + Math.sin(phase * 2) * 0.18 * amplitude,
    Math.cos(phase) * 0.16 * amplitude,
  ];

  cliffordLines.forEach((line, index) => {
    const projected = line.map((point) => {
      const spatial = stereographicS3(rotate4Loop(point, phase, index * 0.11, reduced));
      return spatial ? project3(spatial, environment, 0.145, rotation3) : null;
    });

    drawProjectedSegments(context, projected);
    context.strokeStyle = sceneColor("clifford", phase + index * 0.33, index % 2 ? 0.38 : 0.68);
    context.lineWidth = (index % 2 ? 0.66 : 0.98) * Math.max(1, dpr * 0.62);
    context.shadowBlur = index % 2 ? 3 : 7;
    context.shadowColor = sceneColor("clifford", phase + index * 0.2, 0.5);
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
  const amplitude = reduced ? 0.34 : 1;
  const rotated4 = tesseractVertices.map((point) => rotate4Loop(point, phase, 0.64, reduced));
  const rotation3: [number, number, number] = [
    0.54 + Math.sin(phase) * 0.72 * amplitude,
    -0.34 + Math.sin(phase * 2) * 0.18 * amplitude,
    Math.cos(phase) * 0.18 * amplitude,
  ];
  const projected = rotated4.map((point) => project3(project4To3(point), environment, 0.215, rotation3));

  tesseractEdges.forEach(([a, b], index) => {
    const start = projected[a];
    const end = projected[b];
    const w = (rotated4[a][3] + rotated4[b][3]) * 0.5;

    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.strokeStyle = sceneColor("tesseract", phase + w * 0.7, 0.4 + 0.24 * ((w + 1.6) / 3.2));
    context.lineWidth = (index % 4 === 3 ? 1.18 : 0.76) * Math.max(1, dpr * 0.62);
    context.shadowBlur = index % 4 === 3 ? 7 : 3;
    context.shadowColor = sceneColor("tesseract", phase + w, 0.5);
    context.stroke();
  });

  projected.forEach(([x, y], index) => {
    const w = rotated4[index][3];
    context.beginPath();
    context.fillStyle = sceneColor("tesseract", phase + w, 0.88);
    context.shadowBlur = 8;
    context.shadowColor = sceneColor("tesseract", phase + w, 0.75);
    context.arc(x, y, 1.2 + (w + 1.5) * 0.24, 0, TAU);
    context.fill();
  });
}

export function CardMathVisualization({
  scene,
  resolution,
}: {
  scene: CardMathScene;
  resolution: LabMachineResolution;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      const environment: DrawEnvironment = {
        context,
        width,
        height,
        dpr,
        phase: ((time % loopDurationMs) / loopDurationMs) * TAU,
        reduced: reducedMotion.matches,
      };

      drawGlow(environment, scene);
      if (scene === "clifford") drawClifford(environment);
      else drawTesseract(environment);
      context.shadowBlur = 0;
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

  return (
    <div className={styles.field} data-scene={scene} data-resolution={resolution} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LabMachineResolution } from "./LabMachine";
import { DistinctionSpaceSandboxCard } from "./DistinctionSpaceSandboxCard";
import styles from "./ResearchHopfVisualization.module.css";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type HopfSeed = {
  base: Vec3;
  phase: number;
  strength: number;
};

const TAU = Math.PI * 2;
const loopDurationMs = 10_000;
const fiberSamples = 76;
const latitudeBands = [-0.72, -0.36, 0, 0.36, 0.72];
const azimuthCounts = [3, 4, 5, 4, 3];

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

function stereographic([a, b, c, d]: Vec4): Vec3 | null {
  const denominator = 1 - d;
  if (Math.abs(denominator) < 0.075) return null;
  const scale = 1 / denominator;
  const point: Vec3 = [a * scale, b * scale, c * scale];
  return Math.hypot(...point) < 7.2 ? point : null;
}

function rotate([x, y, z]: Vec3, yaw: number, pitch: number, roll: number): Vec3 {
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

function buildSeeds(): HopfSeed[] {
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

const seeds = buildSeeds();

function sampleFiber(seed: HopfSeed, phase: number, reduced: boolean): Vec3[] {
  const amplitude = reduced ? 0.34 : 1;
  const animatedBase = rotate(
    seed.base,
    Math.sin(phase) * 0.9 * amplitude,
    Math.sin(phase * 2) * 0.24 * amplitude,
    Math.cos(phase) * 0.16 * amplitude,
  );
  const section = hopfSection(animatedBase[0], animatedBase[1], animatedBase[2]);
  const points: Vec3[] = [];

  for (let sample = 0; sample <= fiberSamples; sample += 1) {
    const fiberPhase = (sample / fiberSamples) * TAU;
    const point = stereographic(multiplyPhase(section, fiberPhase));
    if (point) points.push(point);
  }

  return points;
}

function color(phase: number, alpha: number) {
  const hue = 286 + 18 * Math.sin(phase);
  return `hsla(${hue}, 98%, 67%, ${alpha})`;
}

export function ResearchHopfVisualization({
  resolution,
}: {
  resolution: LabMachineResolution;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [researchHost, setResearchHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setResearchHost(
        fieldRef.current?.closest<HTMLElement>('.bf-machine-node[data-node-id="research"]') ?? null,
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [resolution]);

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

      const phase = ((time % loopDurationMs) / loopDurationMs) * TAU;
      const reduced = reducedMotion.matches;
      const amplitude = reduced ? 0.34 : 1;
      const rotation: [number, number, number] = [
        0.42 + Math.sin(phase) * 0.82 * amplitude,
        -0.32 + Math.sin(phase * 2) * 0.22 * amplitude,
        Math.cos(phase) * 0.2 * amplitude,
      ];

      const glowX = width * 0.5 + Math.sin(phase) * width * 0.035 * amplitude;
      const glowY = height * 0.5 + Math.sin(phase * 2) * height * 0.025 * amplitude;
      const glow = context.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        Math.max(width, height) * 0.48,
      );
      glow.addColorStop(0, "rgba(176, 70, 255, 0.19)");
      glow.addColorStop(0.44, "rgba(123, 46, 194, 0.055)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const project = (point: Vec3): [number, number, number] => {
        const rotated = rotate(point, ...rotation);
        const camera = 9.2;
        const perspective = camera / Math.max(3.3, camera + rotated[2]);
        const scale = Math.min(width, height) * 0.165;
        return [
          width * 0.5 + rotated[0] * scale * perspective,
          height * 0.5 - rotated[1] * scale * perspective,
          rotated[2],
        ];
      };

      const ordered = seeds
        .map((seed) => {
          const points = sampleFiber(seed, phase, reduced);
          const depth = points.length
            ? points.reduce((sum, point) => sum + rotate(point, ...rotation)[2], 0) / points.length
            : 0;
          return { seed, points, depth };
        })
        .filter(({ points }) => points.length > 18)
        .sort((a, b) => a.depth - b.depth);

      ordered.forEach(({ seed, points }, fiberIndex) => {
        const projected = points.map(project);

        context.beginPath();
        projected.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.strokeStyle = color(seed.phase + phase, 0.24 + seed.strength * 0.33);
        context.lineWidth = (0.72 + seed.strength * 0.72) * Math.max(1, dpr * 0.68);
        context.shadowBlur = 6 * seed.strength;
        context.shadowColor = color(seed.phase, 0.42);
        context.stroke();

        const travel = 0.5 - 0.5 * Math.cos(phase + fiberIndex * 0.11);
        const markerIndex = Math.floor(travel * Math.max(1, projected.length - 1));
        const tailLength = 10;

        context.beginPath();
        for (let offset = tailLength; offset >= 0; offset -= 1) {
          const index = (markerIndex - offset + projected.length) % projected.length;
          const point = projected[index];
          if (!point) continue;
          if (offset === tailLength) context.moveTo(point[0], point[1]);
          else context.lineTo(point[0], point[1]);
        }
        context.strokeStyle = color(seed.phase + phase, 0.92);
        context.lineWidth = 1.28 * Math.max(1, dpr * 0.66);
        context.shadowBlur = 11;
        context.shadowColor = color(seed.phase + phase, 0.76);
        context.stroke();
      });

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
  }, []);

  return (
    <>
      <div
        ref={fieldRef}
        className={styles.field}
        data-resolution={resolution}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} />
      </div>
      {researchHost
        ? createPortal(
            <DistinctionSpaceSandboxCard resolution={resolution} />,
            researchHost,
            `distinction-space-sandbox-card-${resolution}`,
          )
        : null}
    </>
  );
}

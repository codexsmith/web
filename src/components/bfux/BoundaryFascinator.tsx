"use client";

import { useEffect, useRef } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./BoundaryFascinator.module.css";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type Fiber = {
  base: Vec3;
  phase: number;
  strength: number;
};

const TAU = Math.PI * 2;
const fiberSamples = 92;
const loopDurationMs = 10_000;
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
  const radius = Math.hypot(...point);
  return radius < 8.5 ? point : null;
}

function buildFibers(): Fiber[] {
  const fibers: Fiber[] = [];

  latitudeBands.forEach((z, bandIndex) => {
    const count = azimuthCounts[bandIndex];
    const radius = Math.sqrt(1 - z * z);
    const offset = bandIndex % 2 ? Math.PI / count : 0;

    for (let index = 0; index < count; index += 1) {
      const azimuth = offset + (index / count) * TAU;
      fibers.push({
        base: [radius * Math.cos(azimuth), radius * Math.sin(azimuth), z],
        phase: (azimuth + (z + 1) * Math.PI * 0.42) % TAU,
        strength: 0.58 + 0.42 * (1 - Math.abs(z)),
      });
    }
  });

  return fibers;
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

function phaseColor(phase: number, alpha: number) {
  const hue = 262 + 42 * (0.5 + 0.5 * Math.sin(phase));
  return `hsla(${hue}, 96%, 68%, ${alpha})`;
}

function sceneRotation(loopPhase: number, reduced: boolean): [number, number, number] {
  if (reduced) {
    return [
      0.42 + Math.sin(loopPhase) * 0.18,
      -0.32 + Math.sin(loopPhase) * 0.08,
      Math.sin(loopPhase * 2) * 0.06,
    ];
  }

  return [
    loopPhase + 0.42,
    -0.32 + Math.sin(loopPhase) * 0.22,
    Math.sin(loopPhase * 2) * 0.2,
  ];
}

function sampleFiber(fiber: Fiber, loopPhase: number, reduced: boolean): Vec3[] {
  const animatedBase = reduced
    ? rotate(
        fiber.base,
        Math.sin(loopPhase) * 0.24,
        Math.sin(loopPhase) * 0.08,
        Math.sin(loopPhase * 2) * 0.05,
      )
    : rotate(
        fiber.base,
        loopPhase,
        Math.sin(loopPhase) * 0.24,
        Math.sin(loopPhase * 2) * 0.16,
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

export function BoundaryFascinator({
  resolution,
  onInspect,
}: {
  resolution: LabMachineResolution;
  onInspect?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const fibers = buildFibers();
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

    const project = (point: Vec3, loopPhase: number, reduced: boolean): [number, number, number] => {
      const [yaw, pitch, roll] = sceneRotation(loopPhase, reduced);
      const rotated = rotate(point, yaw, pitch, roll);
      const camera = 9.4;
      const perspective = camera / Math.max(3.4, camera + rotated[2]);
      const pulseAmount = reduced ? 0.015 : 0.05;
      const orbitAmountX = reduced ? 0.022 : 0.085;
      const orbitAmountY = reduced ? 0.014 : 0.055;
      const pulse = 1 - pulseAmount + pulseAmount * Math.cos(loopPhase * 2);
      const scale = Math.min(width, height) * 0.158 * pulse;
      const orbitX = Math.sin(loopPhase) * width * orbitAmountX;
      const orbitY = Math.sin(loopPhase * 2) * height * orbitAmountY;
      return [
        width * 0.5 + orbitX + rotated[0] * scale * perspective,
        height * 0.52 + orbitY - rotated[1] * scale * perspective,
        rotated[2],
      ];
    };

    const draw = (time: number) => {
      resize();
      context.clearRect(0, 0, width, height);

      const reduced = reducedMotion.matches;
      const loopPhase = ((time % loopDurationMs) / loopDurationMs) * TAU;
      const orbitAmountX = reduced ? 0.022 : 0.085;
      const orbitAmountY = reduced ? 0.014 : 0.055;
      const orbitX = Math.sin(loopPhase) * width * orbitAmountX;
      const orbitY = Math.sin(loopPhase * 2) * height * orbitAmountY;
      const glowX = width * 0.5 + orbitX;
      const glowY = height * 0.52 + orbitY;
      const glow = context.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        Math.max(width, height) * 0.5,
      );
      glow.addColorStop(0, "rgba(150, 58, 226, 0.16)");
      glow.addColorStop(0.42, "rgba(96, 39, 158, 0.045)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const [yaw, pitch, roll] = sceneRotation(loopPhase, reduced);
      const ordered = fibers
        .map((fiber) => {
          const points = sampleFiber(fiber, loopPhase, reduced);
          const depth = points.length
            ? points.reduce((sum, point) => sum + rotate(point, yaw, pitch, roll)[2], 0) / points.length
            : 0;
          return { fiber, points, depth };
        })
        .filter(({ points }) => points.length > 18)
        .sort((a, b) => a.depth - b.depth);

      ordered.forEach(({ fiber, points }, fiberIndex) => {
        const projected = points.map((point) => project(point, loopPhase, reduced));
        const alpha = 0.2 + fiber.strength * 0.3;

        context.beginPath();
        projected.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.strokeStyle = phaseColor(fiber.phase + loopPhase, alpha);
        context.lineWidth = (0.8 + fiber.strength * 0.78) * Math.max(1, dpr * 0.72);
        context.shadowBlur = 5 * fiber.strength;
        context.shadowColor = phaseColor(fiber.phase, 0.34);
        context.stroke();

        const travelUnit = (2 * (loopPhase / TAU) + fiberIndex / fibers.length) % 1;
        const markerIndex = Math.floor(travelUnit * (projected.length - 1));
        const tailLength = Math.min(16, markerIndex);
        if (tailLength > 2) {
          context.beginPath();
          for (let offset = tailLength; offset >= 0; offset -= 1) {
            const point = projected[markerIndex - offset];
            if (!point) continue;
            if (offset === tailLength) context.moveTo(point[0], point[1]);
            else context.lineTo(point[0], point[1]);
          }
          context.strokeStyle = phaseColor(fiber.phase + loopPhase, 0.88);
          context.lineWidth = (1.3 + fiber.strength) * Math.max(1, dpr * 0.68);
          context.shadowBlur = 12;
          context.shadowColor = phaseColor(fiber.phase + loopPhase, 0.74);
          context.stroke();
        }

        const marker = projected[markerIndex];
        if (marker) {
          context.beginPath();
          context.fillStyle = phaseColor(fiber.phase + loopPhase, 0.98);
          context.shadowBlur = 14;
          context.shadowColor = phaseColor(fiber.phase, 0.88);
          context.arc(marker[0], marker[1], 1.7 + fiber.strength * 1.05, 0, TAU);
          context.fill();
        }
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
    <div className={styles.directMount} data-resolution={resolution}>
      <span className={styles.dockClamps} aria-hidden="true"><i /><i /></span>
      <aside
        className={styles.fascinator}
        data-scene="hopf-fibration"
        data-loop-duration-ms={loopDurationMs}
        aria-label="Fascinator visualization: animated Hopf fibration projected from four-dimensional sphere coordinates into three-dimensional space"
      >
        <span className={styles.mounts} aria-hidden="true"><i /><i /><i /><i /></span>
        <header className={styles.header}>
          <span><b>FASCINATOR</b> · VISUAL MATHEMATICS</span>
          <span className={styles.headerActions}>
            <span>LIVE LOOP</span>
            {onInspect ? <button className={styles.inspectButton} type="button" onClick={onInspect}>INSPECT</button> : null}
          </span>
        </header>
        <div className={styles.viewport}>
          <canvas ref={canvasRef} aria-hidden="true" />
          <div className={styles.reticle} aria-hidden="true"><i /><i /></div>
          <div className={styles.scanline} aria-hidden="true" />
        </div>
        <footer className={styles.footer}>
          <span>HOPF FIBRATION</span>
          <span>S³ → S² · 10 S CLOSED LOOP</span>
        </footer>
      </aside>
    </div>
  );
}

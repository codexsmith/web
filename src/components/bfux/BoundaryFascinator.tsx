"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./BoundaryFascinator.module.css";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type Fiber = {
  points: Vec3[];
  phase: number;
  strength: number;
};
type TrackingState = {
  x: number;
  label: string;
};

const TAU = Math.PI * 2;
const fiberSamples = 92;
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
      const section = hopfSection(
        radius * Math.cos(azimuth),
        radius * Math.sin(azimuth),
        z,
      );
      const points: Vec3[] = [];

      for (let sample = 0; sample <= fiberSamples; sample += 1) {
        const phase = (sample / fiberSamples) * TAU;
        const point = stereographic(multiplyPhase(section, phase));
        if (point) points.push(point);
      }

      if (points.length > 18) {
        fibers.push({
          points,
          phase: (azimuth + (z + 1) * Math.PI * 0.42) % TAU,
          strength: 0.58 + 0.42 * (1 - Math.abs(z)),
        });
      }
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

export function BoundaryFascinator({
  resolution,
  onInspect,
}: {
  resolution: LabMachineResolution;
  onInspect?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carriageRef = useRef<HTMLDivElement>(null);
  const shuttleRef = useRef<HTMLDivElement>(null);
  const [tracking, setTracking] = useState<TrackingState | null>(null);

  useEffect(() => {
    const carriage = carriageRef.current;
    const shuttle = shuttleRef.current;
    const apparatus = carriage?.closest<HTMLElement>(".bf-machine__apparatus") ?? null;
    if (!carriage || !shuttle || !apparatus) return;

    const trackTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      if (target.closest('[data-fascinator-carriage="true"]')) return;

      const node = target.closest(".bf-machine-node[data-node-id]") as HTMLElement | null;
      if (!node || !apparatus.contains(node)) return;

      const railRect = carriage.getBoundingClientRect();
      const shuttleRect = shuttle.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const maxX = Math.max(0, railRect.width - shuttleRect.width);
      const desiredX = nodeRect.left + nodeRect.width / 2 - railRect.left - shuttleRect.width / 2;
      const x = Math.max(0, Math.min(maxX, desiredX));
      const rawLabel = node.querySelector("header strong")?.textContent?.trim() || node.dataset.nodeId || "apparatus";
      const label = rawLabel.toUpperCase();

      setTracking((current) => {
        if (current && Math.abs(current.x - x) < 0.5 && current.label === label) return current;
        return { x: Number(x.toFixed(2)), label };
      });
    };

    const onPointerOver = (event: PointerEvent) => trackTarget(event.target);
    const onFocusIn = (event: FocusEvent) => trackTarget(event.target);

    apparatus.addEventListener("pointerover", onPointerOver);
    apparatus.addEventListener("focusin", onFocusIn);
    return () => {
      apparatus.removeEventListener("pointerover", onPointerOver);
      apparatus.removeEventListener("focusin", onFocusIn);
    };
  }, [resolution]);

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

    const project = (point: Vec3, time: number): [number, number, number] => {
      const rotated = rotate(
        point,
        time * 0.000095 + 0.42,
        -0.36 + Math.sin(time * 0.000071) * 0.08,
        0.16 * Math.sin(time * 0.000053),
      );
      const camera = 9.4;
      const perspective = camera / Math.max(3.4, camera + rotated[2]);
      const scale = Math.min(width, height) * 0.152;
      return [
        width * 0.5 + rotated[0] * scale * perspective,
        height * 0.52 - rotated[1] * scale * perspective,
        rotated[2],
      ];
    };

    const draw = (time: number) => {
      resize();
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        width * 0.5,
        height * 0.52,
        0,
        width * 0.5,
        height * 0.52,
        Math.max(width, height) * 0.48,
      );
      glow.addColorStop(0, "rgba(129, 50, 202, 0.12)");
      glow.addColorStop(0.45, "rgba(86, 36, 146, 0.035)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const ordered = fibers
        .map((fiber) => ({
          fiber,
          depth: fiber.points.reduce((sum, point) => sum + rotate(point, time * 0.000095 + 0.42, -0.36, 0)[2], 0) / fiber.points.length,
        }))
        .sort((a, b) => a.depth - b.depth);

      ordered.forEach(({ fiber }, fiberIndex) => {
        const projected = fiber.points.map((point) => project(point, time));
        const alpha = 0.18 + fiber.strength * 0.28;

        context.beginPath();
        projected.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.strokeStyle = phaseColor(fiber.phase + time * 0.00008, alpha);
        context.lineWidth = (0.72 + fiber.strength * 0.72) * Math.max(1, dpr * 0.72);
        context.shadowBlur = 5 * fiber.strength;
        context.shadowColor = phaseColor(fiber.phase, 0.32);
        context.stroke();

        const travel = ((time * 0.000055 + fiberIndex / fibers.length) % 1) * (projected.length - 1);
        const marker = projected[Math.floor(travel)];
        if (marker) {
          context.beginPath();
          context.fillStyle = phaseColor(fiber.phase + time * 0.00018, 0.82);
          context.shadowBlur = 10;
          context.shadowColor = phaseColor(fiber.phase, 0.75);
          context.arc(marker[0], marker[1], 1.25 + fiber.strength * 0.75, 0, TAU);
          context.fill();
        }
      });

      context.shadowBlur = 0;
    };

    const animate = (time: number) => {
      draw(time);
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(() => draw(performance.now()));
    observer.observe(canvas);
    draw(performance.now());
    if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);

    const onMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);
      draw(performance.now());
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const shuttleStyle = tracking
    ? ({ "--fascinator-x": `${tracking.x}px` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={carriageRef}
      className={styles.carriage}
      data-fascinator-carriage="true"
      data-resolution={resolution}
      data-tracking={tracking ? "true" : "false"}
    >
      <span className={styles.rail} aria-hidden="true"><i /><i /><i /></span>
      <div ref={shuttleRef} className={styles.shuttle} style={shuttleStyle}>
        <span className={styles.mast} aria-hidden="true" />
        <aside
          className={styles.fascinator}
          data-scene="hopf-fibration"
          aria-label="Fascinator visualization: Hopf fibration projected from four-dimensional sphere coordinates into three-dimensional space"
        >
          <span className={styles.mounts} aria-hidden="true"><i /><i /><i /><i /></span>
          <header className={styles.header}>
            <span><b>FASCINATOR</b> · VISUAL MATHEMATICS</span>
            <span className={styles.headerActions}>
              <span className={styles.liveLabel}>{tracking ? `TRACK · ${tracking.label}` : "LIVE MODEL"}</span>
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
            <span>S³ → S² · STEREOGRAPHIC PROJECTION</span>
          </footer>
        </aside>
      </div>
    </div>
  );
}

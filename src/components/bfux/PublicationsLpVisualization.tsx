"use client";

import { useEffect, useRef } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./PublicationsLpVisualization.module.css";

type Vec3 = [number, number, number];

const TAU = Math.PI * 2;
const loopDurationMs = 10_000;

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

function color(phase: number, alpha: number) {
  const hue = 88 + 12 * Math.sin(phase);
  return `hsla(${hue}, 96%, 60%, ${alpha})`;
}

export function PublicationsLpVisualization({
  resolution,
}: {
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

      const phase = ((time % loopDurationMs) / loopDurationMs) * TAU;
      const reduced = reducedMotion.matches;
      const amplitude = reduced ? 0.34 : 1;
      const mix = 0.5 - 0.5 * Math.cos(phase);
      const p = 1.18 + mix * 6.7;
      const rotation: [number, number, number] = [
        0.62 + Math.sin(phase) * 0.68 * amplitude,
        -0.42 + Math.sin(phase * 2) * 0.18 * amplitude,
        Math.cos(phase) * 0.14 * amplitude,
      ];

      const glow = context.createRadialGradient(
        width * 0.5,
        height * 0.52,
        0,
        width * 0.5,
        height * 0.52,
        Math.max(width, height) * 0.58,
      );
      glow.addColorStop(0, "rgba(147, 211, 55, 0.16)");
      glow.addColorStop(0.52, "rgba(104, 166, 34, 0.035)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const project = (point: Vec3): [number, number] => {
        const rotated = rotate(point, ...rotation);
        const camera = 7.4;
        const perspective = camera / Math.max(3.5, camera + rotated[2]);
        const scale = Math.min(width, height) * 0.34;
        return [
          width * 0.5 + rotated[0] * scale * perspective,
          height * 0.52 - rotated[1] * scale * perspective,
        ];
      };

      const latitudeCount = 7;
      const longitudeCount = 10;
      const samples = 48;

      for (let latitude = 1; latitude < latitudeCount; latitude += 1) {
        const theta = (latitude / latitudeCount) * Math.PI;
        context.beginPath();
        for (let sample = 0; sample <= samples; sample += 1) {
          const point = project(lpPoint(theta, (sample / samples) * TAU, p));
          if (sample === 0) context.moveTo(point[0], point[1]);
          else context.lineTo(point[0], point[1]);
        }
        context.strokeStyle = color(phase + latitude * 0.28, 0.34);
        context.lineWidth = 0.7 * Math.max(1, dpr * 0.62);
        context.shadowBlur = 4;
        context.shadowColor = color(phase, 0.34);
        context.stroke();
      }

      for (let longitude = 0; longitude < longitudeCount; longitude += 1) {
        const phi = (longitude / longitudeCount) * TAU;
        context.beginPath();
        for (let sample = 0; sample <= samples; sample += 1) {
          const point = project(lpPoint((sample / samples) * Math.PI, phi, p));
          if (sample === 0) context.moveTo(point[0], point[1]);
          else context.lineTo(point[0], point[1]);
        }
        context.strokeStyle = color(phase + longitude * 0.22, longitude % 2 ? 0.32 : 0.58);
        context.lineWidth = (longitude % 2 ? 0.68 : 0.96) * Math.max(1, dpr * 0.62);
        context.shadowBlur = longitude % 2 ? 3 : 6;
        context.shadowColor = color(phase + longitude * 0.18, 0.42);
        context.stroke();
      }

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
    <div className={styles.field} data-resolution={resolution} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

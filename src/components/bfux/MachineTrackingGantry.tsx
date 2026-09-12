"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { LabMachineResolution } from "./LabMachine";
import styles from "./MachineTrackingGantry.module.css";

export type MachineTrackingState = {
  x: number;
  label: string;
};

export function MachineTrackingGantry({
  resolution,
  children,
}: {
  resolution: LabMachineResolution;
  children: (tracking: MachineTrackingState | null) => ReactNode;
}) {
  const carriageRef = useRef<HTMLDivElement>(null);
  const shuttleRef = useRef<HTMLDivElement>(null);
  const [tracking, setTracking] = useState<MachineTrackingState | null>(null);

  useEffect(() => {
    const carriage = carriageRef.current;
    const shuttle = shuttleRef.current;
    const apparatus = carriage?.closest<HTMLElement>(".bf-machine__apparatus") ?? null;
    if (!carriage || !shuttle || !apparatus) return;

    const trackTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      if (target.closest('[data-machine-tracking-gantry="true"]')) return;

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

  const shuttleStyle = tracking
    ? ({ "--tracking-gantry-x": `${tracking.x}px` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={carriageRef}
      className={styles.carriage}
      data-machine-tracking-gantry="true"
      data-resolution={resolution}
      data-tracking={tracking ? "true" : "false"}
    >
      <span className={styles.rail} aria-hidden="true"><i /><i /><i /></span>
      <div ref={shuttleRef} className={styles.shuttle} style={shuttleStyle}>
        <span className={styles.mast} aria-hidden="true" />
        <div className={styles.payload}>{children(tracking)}</div>
      </div>
    </div>
  );
}

"use client";

import type { LabMachineResolution } from "./LabMachine";
import styles from "./DistinctionSpaceSandboxCard.module.css";

export function DistinctionSpaceSandboxCard({
  resolution,
}: {
  resolution: LabMachineResolution;
}) {
  return (
    <a
      className={styles.card}
      data-resolution={resolution}
      href="/sandbox/distinction-space?fascinator=boundary-attractor"
      aria-label="Open the Distinction Space visual sandbox"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <span className={styles.signal} aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className={styles.copy}>
        <small>EXPERIMENT · VISUAL MATH</small>
        <span className={styles.action}>OPEN SANDBOX <b>↗</b></span>
      </span>
    </a>
  );
}

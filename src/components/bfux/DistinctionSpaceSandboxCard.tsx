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
      href="/sandbox/distinction-space?specimen=hopf"
      aria-label="Open the Hopf specimen in the Visual Mathematics workstation"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <span className={styles.signal} aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className={styles.copy}>
        <span className={styles.eyebrow}>SPECIMEN</span>
        <span className={styles.eyebrow}>VISUAL MATH</span>
        <span className={styles.action}>OPEN WORKSTATION <b>↗</b></span>
      </span>
    </a>
  );
}

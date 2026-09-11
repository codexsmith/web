"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LabMachineResolution } from "./LabMachine";
import { DistinctionSpaceSandboxCard } from "./DistinctionSpaceSandboxCard";
import { HopfFiberCanvas } from "@/components/visual-mathematics/HopfFiberCanvas";
import styles from "./ResearchHopfVisualization.module.css";

export function ResearchHopfVisualization({
  resolution,
}: {
  resolution: LabMachineResolution;
}) {
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

  return (
    <>
      <div
        ref={fieldRef}
        className={styles.field}
        data-resolution={resolution}
        aria-hidden="true"
      >
        <HopfFiberCanvas />
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

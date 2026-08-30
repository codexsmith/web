"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BfuxIcon } from "@/components/bfux-icons";
import { LabMachine, type LabMachineResolution } from "./LabMachine";
import "./physical-machine-experience.css";

const resolutionLabels: Record<LabMachineResolution, string> = {
  mid: "Full loop",
  focus: "Core set",
};

const resolutionStorageKey = "bfl_lab_machine_resolution";

function readStoredResolution() {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = window.sessionStorage.getItem(resolutionStorageKey);
    return stored === "mid" || stored === "focus" ? stored : undefined;
  } catch {
    return undefined;
  }
}

function writeStoredResolution(resolution: LabMachineResolution) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(resolutionStorageKey, resolution);
  } catch {
    // The Lab remains usable when browser storage is unavailable.
  }
}

export function PhysicalMachineExperience({
  showSchematic = false,
  initialResolution = "focus",
  sectionLabel,
  sectionSurface,
  onCloseSection,
  onOpenNode,
  onOpenCoreNode,
}: {
  showSchematic?: boolean;
  initialResolution?: LabMachineResolution;
  sectionLabel?: string;
  sectionSurface?: ReactNode;
  onCloseSection?: () => void;
  onOpenNode?: (nodeId: string) => void;
  onOpenCoreNode?: (nodeId: string) => void;
}) {
  const [resolution, setResolution] = useState<LabMachineResolution>(initialResolution);
  const activeResolution = sectionSurface ? "mid" : resolution;
  const openNode = activeResolution === "focus" ? onOpenCoreNode ?? onOpenNode : onOpenNode;

  const rememberResolution = (nextResolution: LabMachineResolution) => {
    setResolution(nextResolution);
    writeStoredResolution(nextResolution);
  };

  const narrowProcessContext = () => {
    rememberResolution("focus");
    if (sectionSurface) onCloseSection?.();
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextResolution = sectionLabel ? "mid" : readStoredResolution() ?? initialResolution;
      setResolution(nextResolution);
      writeStoredResolution(nextResolution);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialResolution, sectionLabel]);

  return (
    <div className="physical-machine-experience">
      <div className="world-machine-resolution" aria-label="Lab Machine resolution controls">
        <span className="world-machine-resolution__label">
          <small>LAB MACHINE</small>
          <strong>{sectionLabel ? `${sectionLabel} · ${resolutionLabels[activeResolution]}` : resolutionLabels[activeResolution]}</strong>
        </span>
        <span className="world-machine-resolution__hint">Machine-local context</span>
        <div className="world-machine-resolution__controls">
          <button
            type="button"
            onClick={() => rememberResolution("mid")}
            disabled={activeResolution === "mid"}
            aria-label="Show the full Lab Machine loop"
            title="Show the full Lab Machine loop"
          >
            <BfuxIcon name="widen" />
            <span>Full loop</span>
          </button>
          <button
            type="button"
            onClick={narrowProcessContext}
            disabled={activeResolution === "focus" && !sectionSurface}
            aria-label="Narrow to the core Lab set"
            title="Narrow to the core Lab set"
          >
            <BfuxIcon name="narrow" />
            <span>Core set</span>
          </button>
        </div>
      </div>

      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <LabMachine skin="physical" showSchematic={showSchematic} resolution={activeResolution} onOpenNode={openNode} />
      )}
    </div>
  );
}

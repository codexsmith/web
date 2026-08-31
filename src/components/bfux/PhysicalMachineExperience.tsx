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
  resolution: controlledResolution,
  onResolutionChange,
  showResolutionControls = true,
  sectionLabel,
  sectionSurface,
  onCloseSection,
  onOpenNode,
  onOpenCoreNode,
}: {
  showSchematic?: boolean;
  initialResolution?: LabMachineResolution;
  resolution?: LabMachineResolution;
  onResolutionChange?: (resolution: LabMachineResolution) => void;
  showResolutionControls?: boolean;
  sectionLabel?: string;
  sectionSurface?: ReactNode;
  onCloseSection?: () => void;
  onOpenNode?: (nodeId: string) => void;
  onOpenCoreNode?: (nodeId: string) => void;
}) {
  const [internalResolution, setInternalResolution] = useState<LabMachineResolution>(initialResolution);
  const resolution = controlledResolution ?? internalResolution;
  const activeResolution = sectionSurface ? "mid" : resolution;
  const openNode = activeResolution === "focus" ? onOpenCoreNode ?? onOpenNode : onOpenNode;

  const rememberResolution = (nextResolution: LabMachineResolution) => {
    if (controlledResolution === undefined) setInternalResolution(nextResolution);
    onResolutionChange?.(nextResolution);
    writeStoredResolution(nextResolution);
  };

  const narrowProcessContext = () => {
    rememberResolution("focus");
    if (sectionSurface) onCloseSection?.();
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextResolution = sectionLabel ? "mid" : readStoredResolution() ?? initialResolution;
      if (controlledResolution === undefined) setInternalResolution(nextResolution);
      onResolutionChange?.(nextResolution);
      writeStoredResolution(nextResolution);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialResolution, onResolutionChange, sectionLabel]);

  return (
    <div className="physical-machine-experience">


      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <LabMachine skin="physical" showSchematic={showSchematic} resolution={activeResolution} onOpenNode={openNode} />
      )}
    </div>
  );
}

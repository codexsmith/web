"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LabMachine, type LabMachineResolution } from "./LabMachine";
import { FiveMinuteTourCard } from "./FiveMinuteTourCard";
import "./physical-machine-experience.css";
import "./five-minute-tour-card.css";
import "./five-minute-tour-growth.css";
import "./five-minute-tour-compact.css";
import "./five-minute-tour-about-attachment.css";
import "./five-minute-tour-compact-polish.css";
import "./five-minute-tour-eyebrow-polish.css";

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
  const [apparatusHost, setApparatusHost] = useState<HTMLElement | null>(null);
  const [aboutHost, setAboutHost] = useState<HTMLElement | null>(null);
  const machineHostRef = useRef<HTMLDivElement>(null);
  const resolution = controlledResolution ?? internalResolution;
  const activeResolution = sectionSurface ? "mid" : resolution;
  const openNode = activeResolution === "focus" ? onOpenCoreNode ?? onOpenNode : onOpenNode;

  const rememberResolution = (nextResolution: LabMachineResolution) => {
    if (controlledResolution === undefined) setInternalResolution(nextResolution);
    onResolutionChange?.(nextResolution);
    writeStoredResolution(nextResolution);
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

  useEffect(() => {
    if (sectionSurface) {
      setApparatusHost(null);
      setAboutHost(null);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const apparatus = machineHostRef.current?.querySelector<HTMLElement>(".bf-machine__apparatus") ?? null;
      const about = machineHostRef.current?.querySelector<HTMLElement>(
        '.bf-machine__apparatus > .bf-machine-node[data-node-id="about"]',
      ) ?? null;
      setApparatusHost(apparatus);
      setAboutHost(about);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeResolution, sectionSurface]);

  void showResolutionControls;
  void onCloseSection;
  void rememberResolution;

  return (
    <div className="physical-machine-experience" ref={machineHostRef}>
      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <div className="physical-machine-experience__machine-stack">
          <LabMachine
            skin="physical"
            showSchematic={showSchematic}
            resolution={activeResolution}
            onOpenNode={openNode}
          />
        </div>
      )}

      {!sectionSurface && activeResolution === "focus" && apparatusHost
        ? createPortal(
            <FiveMinuteTourCard resolution={activeResolution} />,
            apparatusHost,
            "five-minute-tour-core",
          )
        : null}

      {!sectionSurface && activeResolution === "mid" && aboutHost
        ? createPortal(
            <>
              <div className="bf-machine-tour-about-dock" aria-hidden="true">
                <i />
                <i />
              </div>
              <FiveMinuteTourCard resolution={activeResolution} />
            </>,
            aboutHost,
            "five-minute-tour-full",
          )
        : null}
    </div>
  );
}

"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BfuxIcon } from "@/components/bfux-icons";
import { LabMachine, type LabMachineResolution } from "./LabMachine";

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

function PhysicalFrameHeader({
  resolution,
  sectionLabel,
  machinePath,
  onZoomOut,
  onZoomIn,
}: {
  resolution: LabMachineResolution;
  sectionLabel?: string;
  machinePath: string;
  onZoomOut: () => void;
  onZoomIn: () => void;
}) {
  const backHref = sectionLabel ? machinePath : "/";
  const backLabel = sectionLabel ? "Back to the Lab Machine" : "Back to the main site";

  return (
    <header className="world-machine-frame">
      <div className="world-machine-frame__brand">
        {machinePath === "/world" ? (
          <Link href="/world" aria-label="Boundary First Labs home">
            <span className="world-machine-frame__mark"><BfuxIcon name="root" /></span>
            <strong>BOUNDARY FIRST LABS</strong>
          </Link>
        ) : (
          <Link href={machinePath} aria-label="Boundary First Labs home">
            <span className="world-machine-frame__mark"><BfuxIcon name="root" /></span>
            <strong>BOUNDARY FIRST LABS</strong>
          </Link>
        )}
        <Link className="world-machine-frame__back" href={backHref} aria-label={backLabel}><BfuxIcon name="back" /></Link>
      </div>

      <div className="world-machine-frame__path-zone">
        <nav className="world-machine-frame__path" aria-label="Current public path">
          {sectionLabel ? (
            <>
              <Link href={machinePath}>Lab Machine</Link><span>›</span>
              <strong>{sectionLabel}</strong>
            </>
          ) : (
            <>
              <Link href="/?focus=public-interest">Public Interest</Link><span>›</span>
              <Link href="/?focus=publications">Publications</Link><span>›</span>
              <Link href="/about">About</Link><span>›</span>
              <strong>Boundary First Labs</strong>
            </>
          )}
        </nav>

        <div className="frame-process-zoom world-machine-frame__process-zoom" aria-label="Process context controls">
          <span className="frame-process-zoom__label" aria-live="polite">
            <span>Process</span>
            <strong>{resolutionLabels[resolution]}</strong>
          </span>
          <button
            type="button"
            className="frame-tool"
            onClick={onZoomOut}
            disabled={resolution === "mid"}
            aria-label="Widen process context"
            title="Widen the process context"
          >
            <BfuxIcon name="widen" />
            <span className="frame-tool__label">Widen process context</span>
          </button>
          <button
            type="button"
            className="frame-tool"
            onClick={onZoomIn}
            disabled={resolution === "focus"}
            aria-label="Narrow process context"
            title="Narrow to the core Lab set"
          >
            <BfuxIcon name="narrow" />
            <span className="frame-tool__label">Narrow process context</span>
          </button>
        </div>
      </div>

      <div className="world-machine-frame__tools">
        <Link className="world-machine-frame__search" href="/?search=1" aria-label="Search"><BfuxIcon name="inspect" /></Link>
        <span className="world-machine-frame__view-label">VIEW</span>
        <nav className="world-machine-frame__views" aria-label="Boundary First Labs views">
          <Link className="is-active" href="/world?skin=physical" aria-current="page">
            <BfuxIcon name="world" /><span><strong>WORLD</strong><small>Public regions</small></span>
          </Link>
          <Link href="/?projection=evidence">
            <BfuxIcon name="evidence" /><span><strong>EVIDENCE</strong><small>Founder provenance</small></span>
          </Link>
          <Link href="/?projection=gestalt">
            <BfuxIcon name="process" /><span><strong>TIMELINE</strong><small>Development history</small></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PhysicalMachineExperience({
  showSchematic = false,
  initialResolution = "focus",
  sectionLabel,
  sectionSurface,
  onCloseSection,
  onOpenNode,
  onOpenCoreNode,
  machinePath = "/world",
}: {
  showSchematic?: boolean;
  initialResolution?: LabMachineResolution;
  sectionLabel?: string;
  sectionSurface?: ReactNode;
  onCloseSection?: () => void;
  onOpenNode?: (nodeId: string) => void;
  onOpenCoreNode?: (nodeId: string) => void;
  machinePath?: string;
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
    <>
      <PhysicalFrameHeader
        resolution={activeResolution}
        sectionLabel={sectionLabel}
        machinePath={machinePath}
        onZoomOut={() => rememberResolution("mid")}
        onZoomIn={narrowProcessContext}
      />
      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <LabMachine skin="physical" showSchematic={showSchematic} resolution={activeResolution} onOpenNode={openNode} />
      )}
    </>
  );
}

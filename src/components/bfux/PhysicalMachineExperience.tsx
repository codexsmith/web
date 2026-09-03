"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LabMachine, type LabMachineResolution } from "./LabMachine";
import { FiveMinuteTourCard } from "./FiveMinuteTourCard";
import "./physical-machine-experience.css";
import "./five-minute-tour.css";
import "./five-minute-tour-fit.css";

const resolutionStorageKey = "bfl_lab_machine_resolution";
const desktopFitQuery = "(min-width: 1025px)";
const targetMachineWidthRatio = 0.88;

type MachineFit = {
  enabled: boolean;
  scale: number;
  collapse: number;
};

const defaultMachineFit: MachineFit = {
  enabled: false,
  scale: 1,
  collapse: 0,
};

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
  const [machineFit, setMachineFit] = useState<MachineFit>(defaultMachineFit);
  const machineHostRef = useRef<HTMLDivElement>(null);
  const machineStackRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    if (sectionSurface) {
      setMachineFit(defaultMachineFit);
      return;
    }

    const host = machineHostRef.current;
    const stack = machineStackRef.current;
    const board = stack?.querySelector<HTMLElement>(".bf-machine__board") ?? null;
    if (!host || !stack || !board) return;

    let frame = 0;

    const updateFit = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!window.matchMedia(desktopFitQuery).matches) {
          setMachineFit((current) => current.enabled ? defaultMachineFit : current);
          return;
        }

        const hostWidth = host.clientWidth;
        const sourceWidth = board.offsetWidth;
        const sourceHeight = board.offsetHeight;
        if (!hostWidth || !sourceWidth || !sourceHeight) return;

        /* The board is the machine object. The legend below it is page context,
         * so it deliberately stays outside the fitted transform. */
        const targetWidth = hostWidth * targetMachineWidthRatio;
        const horizontalScale = targetWidth / sourceWidth;
        const scale = Math.max(0.72, Math.min(0.96, horizontalScale));
        const collapse = Math.max(0, sourceHeight * (1 - scale));

        setMachineFit((current) => {
          if (
            current.enabled
            && Math.abs(current.scale - scale) < 0.002
            && Math.abs(current.collapse - collapse) < 2
          ) {
            return current;
          }

          return { enabled: true, scale, collapse };
        });
      });
    };

    updateFit();
    window.addEventListener("resize", updateFit, { passive: true });

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateFit);
    observer?.observe(host);
    observer?.observe(board);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateFit);
      observer?.disconnect();
    };
  }, [activeResolution, sectionSurface]);

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

  const fitStyle = machineFit.enabled ? ({
    "--machine-fit-scale": machineFit.scale,
    "--machine-fit-margin-bottom": `${-machineFit.collapse}px`,
  } as CSSProperties) : undefined;

  return (
    <div className="physical-machine-experience" ref={machineHostRef}>
      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <div
          className="physical-machine-experience__fit-stage"
          data-auto-fit={machineFit.enabled ? "true" : undefined}
          style={fitStyle}
        >
          <div
            className="physical-machine-experience__machine-stack"
            ref={machineStackRef}
          >
            <LabMachine
              skin="physical"
              showSchematic={showSchematic}
              resolution={activeResolution}
              onOpenNode={openNode}
            />
          </div>
        </div>
      )}

      {!sectionSurface && activeResolution === "focus" && aboutHost
        ? createPortal(
            <div className="bf-machine-tour-about-dock" aria-hidden="true">
              <i />
              <i />
            </div>,
            aboutHost,
            "five-minute-tour-core-dock",
          )
        : null}

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
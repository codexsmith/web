"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LabMachine, type LabMachineResolution } from "./LabMachine";
import { FiveMinuteTourCard } from "./FiveMinuteTourCard";
import { MobileMachineStructureLayer } from "./MobileMachineStructureLayer";
import { startMachineCardFlight } from "./MachineCardFlightLayer";
import "./physical-machine-experience.css";
import "./five-minute-tour.css";
import "./five-minute-tour-fit.css";
import "./mobile-machine-card-flow.css";
import "./mobile-machine-card-scale.css";
import "./mobile-machine-full-flow.css";

const resolutionStorageKey = "bfl_lab_machine_resolution";
const desktopFitQuery = "(min-width: 1025px)";
const mobileProjectionQuery = "(max-width: 1024px)";
const targetMachineWidthRatio = 0.88;
const machineWidthInUnits = 100;
// Let the first outline register before routing, but do not make the animation
// itself a gate: the global flight layer persists across the page transition.
const cardFlightNavigationDelay =45;
const reducedCardFlightNavigationDelay=15;

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
  const [initialMachineUnit, setInitialMachineUnit] = useState<number | null>(null);
  const [isMobileProjection, setIsMobileProjection] = useState(false);
  const machineHostRef = useRef<HTMLDivElement>(null);
  const machineStackRef = useRef<HTMLDivElement>(null);
  const hasMeasuredInitialFitRef = useRef(false);
  const cardFlightNavigateTimerRef = useRef<number | null>(null);
  const resolution = controlledResolution ?? internalResolution;
  const activeResolution = sectionSurface ? "mid" : resolution;
  const openNode = activeResolution === "focus" ? onOpenCoreNode ?? onOpenNode : onOpenNode;
  const tourHost = activeResolution === "focus" || isMobileProjection ? apparatusHost : aboutHost;

  const openNodeWithFlight = (nodeId: string, source: HTMLElement) => {
    if (!openNode || cardFlightNavigateTimerRef.current !== null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!startMachineCardFlight(source)) {
      openNode(nodeId);
      return;
    }

    cardFlightNavigateTimerRef.current = window.setTimeout(() => {
      cardFlightNavigateTimerRef.current = null;
      openNode(nodeId);
    }, reducedMotion ? reducedCardFlightNavigationDelay : cardFlightNavigationDelay);
  };

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

  useEffect(() => () => {
    if (cardFlightNavigateTimerRef.current !== null) {
      window.clearTimeout(cardFlightNavigateTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const query = window.matchMedia(mobileProjectionQuery);
    const syncProjection = () => setIsMobileProjection(query.matches);

    syncProjection();
    query.addEventListener("change", syncProjection);
    return () => query.removeEventListener("change", syncProjection);
  }, []);

  useLayoutEffect(() => {
    /* Auto-fit chooses the machine's fixed CSS-pixel ruler once. It must not
     * leave a transform behind: browser zoom then scales the board and its UI
     * together, while apparatus translation remains a one-to-one drag. */
    if (sectionSurface || hasMeasuredInitialFitRef.current) return;

    const host = machineHostRef.current;
    const stack = machineStackRef.current;
    const board = stack?.querySelector<HTMLElement>(".bf-machine__board") ?? null;
    if (!host || !stack || !board) return;

    let frame = window.requestAnimationFrame(() => {
      if (!window.matchMedia(desktopFitQuery).matches) {
        hasMeasuredInitialFitRef.current = true;
        return;
      }

      const hostWidth = host.clientWidth;
      const sourceWidth = board.offsetWidth;
      if (!hostWidth || !sourceWidth) return;

      const targetWidth = hostWidth * targetMachineWidthRatio;
      const horizontalScale = targetWidth / sourceWidth;
      const scale = Math.max(0.72, Math.min(0.96, horizontalScale));
      const machineUnit = Number(((sourceWidth * scale) / machineWidthInUnits).toFixed(3));

      setInitialMachineUnit(machineUnit);
      hasMeasuredInitialFitRef.current = true;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
  }, [sectionSurface]);

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

  useEffect(() => {
    if (sectionSurface) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (!window.matchMedia(mobileProjectionQuery).matches) return;

        const host = machineHostRef.current;
        const preview = host?.closest<HTMLElement>(".world-machine-preview") ?? null;
        const shell = host?.closest<HTMLElement>(".site-shell") ?? null;
        const scrollingElement = document.scrollingElement as HTMLElement | null;

        preview?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        shell?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        scrollingElement?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [activeResolution, sectionSurface]);

  void showResolutionControls;
  void onCloseSection;
  void rememberResolution;

  const fitStyle = initialMachineUnit === null ? undefined : ({
    "--world-machine-u": `${initialMachineUnit}px`,
  } as CSSProperties);

  return (
    <div className="physical-machine-experience" ref={machineHostRef}>
      {sectionSurface ? (
        <div className="world-machine-section">{sectionSurface}</div>
      ) : (
        <div
          className="physical-machine-experience__fit-stage"
          style={fitStyle}
        >
          <MobileMachineStructureLayer resolution={activeResolution} />
          <div
            className="physical-machine-experience__machine-stack"
            ref={machineStackRef}
          >
            <LabMachine
              skin="physical"
              showSchematic={showSchematic}
              resolution={activeResolution}
              onOpenNode={openNodeWithFlight}
            />
          </div>
        </div>
      )}

      {!sectionSurface && aboutHost
        ? createPortal(
            <div className="bf-machine-tour-about-dock" aria-hidden="true">
              <i />
              <i />
            </div>,
            aboutHost,
            activeResolution === "focus" ? "five-minute-tour-core-dock" : "five-minute-tour-full-dock",
          )
        : null}

      {!sectionSurface && tourHost
        ? createPortal(
            <FiveMinuteTourCard resolution={activeResolution} />,
            tourHost,
            activeResolution === "focus" ? "five-minute-tour-core" : "five-minute-tour-full",
          )
        : null}

    </div>
  );
}

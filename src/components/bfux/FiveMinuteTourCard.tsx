"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Clock3, Map, Play, X } from "lucide-react";
import { labMachineRevealEvent, type LabMachineResolution } from "./LabMachine";

const tourSteps = [
  {
    eyebrow: "01 / Problem",
    title: "Systems hide consequential distinctions.",
    body: "Assumptions disappear into interfaces, models, procedures, institutions, and software — while continuing to shape behavior.",
    takeaway: "Invisible assumptions still have consequences.",
  },
  {
    eyebrow: "02 / Insight",
    title: "Representation governs action.",
    body: "What a system makes visible determines what people can distinguish, reason about, and change.",
    takeaway: "Change the representation to change what becomes possible.",
  },
  {
    eyebrow: "03 / Method",
    title: "Start with consequential boundaries.",
    body: "Specify what may cross them and what must remain invariant. Build from those constraints.",
    takeaway: "Make consequential structure explicit.",
  },
  {
    eyebrow: "04 / Machinery",
    title: "Make the method executable.",
    body: "Encode the research in procedures, representations, workflows, interfaces, and experiments.",
    takeaway: "Build machinery, not slogans.",
  },
  {
    eyebrow: "05 / Recurrence",
    title: "The pattern recurs.",
    body: "Across software, AI, science, law, education, and organizations, boundaries shape what information can move and change.",
    takeaway: "Different domains can share representational mechanics.",
  },
  {
    eyebrow: "06 / Purpose",
    title: "Make abstraction accountable.",
    body: "Build inspectable, testable, usable systems that increase capacity, agency, accessibility, and competence.",
    takeaway: "Abstraction should answer to reality.",
  },
] as const;

const mapColumns = [
  {
    target: "people",
    text: "Clear representation expands agency.",
  },
  {
    target: "products",
    text: "Exposed assumptions improve solutions.",
  },
  {
    target: "publications",
    text: "Recurring structure refines knowledge.",
  },
] as const;

const mapArmRightInset = 6;
const mapArmSafeAnchorTop = 64;

type MapGeometry = Record<string, { left: number; top: number; width: number }>;
type MapArmGeometry = {
  left: number;
  top: number;
  width: number;
  connectorSide: "left" | "right";
} | null;

function measureWithinHost(element: HTMLElement, host: HTMLElement) {
  const hostRect = host.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scaleX = host.offsetWidth > 0 ? hostRect.width / host.offsetWidth : 1;
  const scaleY = host.offsetHeight > 0 ? hostRect.height / host.offsetHeight : scaleX;

  return {
    left: (elementRect.left - hostRect.left) / (scaleX || 1),
    top: (elementRect.top - hostRect.top) / (scaleY || 1),
    width: elementRect.width / (scaleX || 1),
  };
}

export function FiveMinuteTourCard({ resolution }: { resolution: LabMachineResolution }) {
  const [expanded, setExpanded] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mapHost, setMapHost] = useState<HTMLElement | null>(null);
  const [mapGeometry, setMapGeometry] = useState<MapGeometry>({});
  const [mapArmGeometry, setMapArmGeometry] = useState<MapArmGeometry>(null);
  const tourRef = useRef<HTMLElement>(null);
  const current = tourSteps[activeStep];

  useEffect(() => {
    setMapHost(tourRef.current?.closest<HTMLElement>(".bf-machine__apparatus") ?? null);
  }, [resolution]);

  useEffect(() => {
    if (!mapOpen || !mapHost) return;

    let frame = 0;
    const targets: HTMLElement[] = [];

    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const next: MapGeometry = {};

        for (const column of mapColumns) {
          const target = mapHost.querySelector<HTMLElement>(
            `.bf-machine-node[data-node-id="${column.target}"]`,
          );
          if (!target) continue;
          next[column.target] = measureWithinHost(target, mapHost);
        }

        setMapGeometry(next);

        const measuredTargets = mapColumns
          .map((column) => next[column.target])
          .filter((geometry): geometry is { left: number; top: number; width: number } => Boolean(geometry));

        if (!tourRef.current || measuredTargets.length !== mapColumns.length) {
          setMapArmGeometry(null);
          return;
        }

        const tourGeometry = measureWithinHost(tourRef.current, mapHost);
        const targetLeft = Math.min(...measuredTargets.map((geometry) => geometry.left));
        const targetTop = Math.min(...measuredTargets.map((geometry) => geometry.top));
        const targetRight = Math.max(...measuredTargets.map((geometry) => geometry.left + geometry.width));
        const tourLeft = tourGeometry.left;
        const tourRight = tourGeometry.left + tourGeometry.width;
        const tourIsLeft = tourRight <= targetLeft;
        const armLeft = tourIsLeft ? tourRight : targetLeft;
        const armRight = tourIsLeft ? targetRight : Math.max(targetRight, tourLeft);

        setMapArmGeometry({
          left: armLeft,
          top: resolution === "mid" ? targetTop : Math.max(targetTop, mapArmSafeAnchorTop),
          width: Math.max(0, armRight - armLeft - (tourIsLeft ? mapArmRightInset : 0)),
          connectorSide: tourIsLeft ? "left" : "right",
        });
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(mapHost);
    if (tourRef.current) observer.observe(tourRef.current);

    for (const column of mapColumns) {
      const target = mapHost.querySelector<HTMLElement>(
        `.bf-machine-node[data-node-id="${column.target}"]`,
      );
      if (!target) continue;
      targets.push(target);
      observer.observe(target);
    }

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      if (tourRef.current) observer.unobserve(tourRef.current);
      for (const target of targets) observer.unobserve(target);
      observer.disconnect();
    };
  }, [mapHost, mapOpen, resolution]);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mapOpen) setMapOpen(false);
        else setExpanded(false);
      }
      if (event.key === "ArrowLeft") setActiveStep((step) => Math.max(0, step - 1));
      if (event.key === "ArrowRight") setActiveStep((step) => Math.min(tourSteps.length - 1, step + 1));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, mapOpen]);

  useEffect(() => {
    if (!expanded) return;

    const frame = window.requestAnimationFrame(() => {
      tourRef.current?.dispatchEvent(new CustomEvent(labMachineRevealEvent, { bubbles: true }));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [expanded, resolution]);

  const open = () => {
    setActiveStep(0);
    setMapOpen(false);
    setExpanded(true);
  };

  const close = () => {
    setMapOpen(false);
    setExpanded(false);
  };

  const toggleMap = () => setMapOpen((openState) => !openState);

  return (
    <>
      <article
        ref={tourRef}
        className="bf-machine-node bf-machine-tour-card"
        data-machine-layer="node"
        data-node-id="tour"
        data-expanded={expanded ? "true" : "false"}
        data-map-open={mapOpen ? "true" : "false"}
        data-attached-to={resolution === "mid" ? "about" : undefined}
        data-machine-node-interactive="true"
        aria-expanded={expanded}
        aria-label={expanded ? "Five-minute Boundary First Labs tour and takeaways" : "Open five-minute Boundary First Labs tour and takeaways"}
        role={expanded ? "region" : "button"}
        tabIndex={expanded ? -1 : 0}
        onClick={(event) => {
          event.stopPropagation();
          if (!expanded) open();
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (!expanded && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            open();
          }
        }}
      >
        <div className="bf-machine-node__mount" aria-hidden="true" />
        <div className="bf-machine-node__shell" aria-hidden="true" />
        <span className="bf-machine-node__fasteners" aria-hidden="true">
          <i /><i /><i /><i />
        </span>

        <div className="bf-machine-node__face">
          <div className="bf-machine-tour-card__compact" aria-hidden={expanded}>
            <div className="bf-machine-node__icon-plate" aria-hidden="true">
              <span className="bf-machine-node__icon-well">
                <Clock3 />
              </span>
            </div>

            <header>
              <span>START HERE · 05:00</span>
              <strong>Tour &amp; takeaways</strong>
            </header>

            <div className="bf-machine-node__boundary">
              <small>BOUNDARY</small>
              <p>A guided compression of the whole Lab: problem → representation → method → machinery → application → purpose.</p>
            </div>
          </div>

          <div className="bf-machine-tour-card__expanded" aria-hidden={!expanded} data-map-open={mapOpen ? "true" : "false"}>
            <div className="bf-machine-tour-card__topbar">
              <div>
                <strong>{current.title}</strong>
              </div>
              <div className="bf-machine-tour-card__topbar-actions">
                <button
                  type="button"
                  className="bf-machine-tour-card__map-trigger bf-machine-tour-card__map-trigger--icon"
                  onClick={toggleMap}
                  aria-label="Toggle tour map"
                  aria-controls="five-minute-tour-map-layer"
                  aria-expanded={mapOpen}
                  title="Toggle tour map"
                >
                  <Map aria-hidden="true" />
                </button>
                <button type="button" onClick={close} aria-label="Close five-minute tour">
                  <X aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bf-machine-tour-card__body">
              <div className="bf-machine-tour-card__main">
                <div className="bf-machine-tour-card__stage">
                  <section className="bf-machine-tour-card__current" aria-live="polite">
                    <p>{current.body}</p>
                    <div className="bf-machine-tour-card__takeaway">
                      <small>TAKEAWAY</small>
                      <strong>{current.takeaway}</strong>
                    </div>
                  </section>
                </div>

                <div className="bf-machine-tour-card__controls">
                  <div className="bf-machine-tour-card__progress" aria-label={`Tour progress: step ${activeStep + 1} of ${tourSteps.length}`}>
                    {tourSteps.map((step, index) => (
                      <i key={step.eyebrow} data-active={index <= activeStep ? "true" : undefined} />
                    ))}
                  </div>
                  <div className="bf-machine-tour-card__control-buttons">
                    <button
                      type="button"
                      onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
                      disabled={activeStep === 0}
                    >
                      <ArrowLeft aria-hidden="true" />
                      Back
                    </button>
                    {activeStep < tourSteps.length - 1 ? (
                      <button type="button" onClick={() => setActiveStep((step) => Math.min(tourSteps.length - 1, step + 1))}>
                        Next
                        <ArrowRight aria-hidden="true" />
                      </button>
                    ) : (
                      <button type="button" onClick={close}>
                        Return to machine
                        <Play aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {mapHost
        ? createPortal(
            <aside
              id="five-minute-tour-map-layer"
              className="bf-machine-tour-map-layer"
              data-open={mapOpen ? "true" : "false"}
              aria-label="Tour map"
              aria-hidden={!mapOpen}
            >
              {mapArmGeometry ? (
                <section
                  className="bf-machine-tour-map-layer__arm"
                  data-ready="true"
                  data-connector-side={mapArmGeometry.connectorSide}
                  style={{
                    left: mapArmGeometry.left,
                    top: mapArmGeometry.top,
                    width: mapArmGeometry.width,
                  }}
                >
                  {mapColumns.map((column, index) => {
                    const geometry = mapGeometry[column.target];
                    if (!geometry) return null;
                    const isLast = index === mapColumns.length - 1;

                    return (
                      <article
                        key={column.target}
                        className="bf-machine-tour-map-layer__item"
                        data-map-target={column.target}
                        style={{
                          left: geometry.left - mapArmGeometry.left,
                          width: Math.max(0, geometry.width - (isLast ? mapArmRightInset : 0)),
                        }}
                      >
                        <strong>{column.text}</strong>
                      </article>
                    );
                  })}
                </section>
              ) : null}
            </aside>,
            mapHost,
          )
        : null}
    </>
  );
}

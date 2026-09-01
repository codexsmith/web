"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Clock3, Map, Play, X } from "lucide-react";
import type { LabMachineResolution } from "./LabMachine";

const tourSteps = [
  {
    eyebrow: "01 / Problem",
    title: "Difficult systems hide consequential distinctions.",
    body: "Important assumptions disappear into interfaces, models, procedures, institutions, and software. The system still acts on them even when the people using it can no longer see them.",
    takeaway: "Hidden assumptions become operational consequences.",
  },
  {
    eyebrow: "02 / Insight",
    title: "Representation is the control.",
    body: "A representation is not merely a picture of a system. It determines what the system — or the person using it — can distinguish, reason about, change, and act upon.",
    takeaway: "What can be represented constrains what can be done.",
  },
  {
    eyebrow: "03 / Method",
    title: "Start with the distinctions that actually matter.",
    body: "Find the boundaries. Make them explicit. Determine what can cross them. Preserve what must remain invariant. Then build outward from there.",
    takeaway: "Boundary First is a method for making consequential structure explicit.",
  },
  {
    eyebrow: "04 / Machinery",
    title: "Turn the method into inspectable apparatus.",
    body: "Foundational research becomes engineering procedure, then executable representations, research systems, formal workflows, interfaces, and computational experiments.",
    takeaway: "The work is meant to become machinery, not remain a slogan.",
  },
  {
    eyebrow: "05 / Recurrence",
    title: "One structural move appears across many domains.",
    body: "Software, AI, science, mathematics, education, law, civic systems, and organizations all create boundaries, admit distinctions, transform information, and hide structure.",
    takeaway: "The domains differ. The representational mechanics recur.",
  },
  {
    eyebrow: "06 / Purpose",
    title: "Make abstraction accountable to the structure it preserves.",
    body: "Boundary First Labs builds toward systems that are more inspectable, testable, executable, understandable, and usable — increasing capacity, agency, accessibility, and competence.",
    takeaway: "Do not eliminate abstraction. Make it answerable to reality.",
  },
] as const;

const mapColumns = [
  {
    target: "people",
    index: "01",
    text: "Clear representation expands agency.",
  },
  {
    target: "products",
    index: "02",
    text: "Exposed assumptions improve solutions.",
  },
  {
    target: "publications",
    index: "03",
    text: "Recurring structure refines knowledge.",
  },
] as const;

type MapGeometry = Record<string, { left: number; top: number; width: number }>;

export function FiveMinuteTourCard({ resolution }: { resolution: LabMachineResolution }) {
  const [expanded, setExpanded] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mapHost, setMapHost] = useState<HTMLElement | null>(null);
  const [mapGeometry, setMapGeometry] = useState<MapGeometry>({});
  const tourRef = useRef<HTMLElement>(null);
  const current = tourSteps[activeStep];
  const contextLabel = resolution === "focus" ? "Core set" : "Full loop";

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
          next[column.target] = {
            left: target.offsetLeft,
            top: target.offsetTop,
            width: target.offsetWidth,
          };
        }

        setMapGeometry(next);
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(mapHost);
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
        data-node-id="tour"
        data-expanded={expanded ? "true" : "false"}
        data-map-open={mapOpen ? "true" : "false"}
        data-attached-to="about"
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

            <footer>
              <span className="bf-machine-node__state"><small>STATE</small>Ready</span>
              <span><small>FORMAT</small>6 steps</span>
              <span><small>VIEW</small>{contextLabel}</span>
            </footer>
          </div>

          <div className="bf-machine-tour-card__expanded" aria-hidden={!expanded} data-map-open={mapOpen ? "true" : "false"}>
            <div className="bf-machine-tour-card__topbar">
              <div>
                <span>{current.eyebrow} · {activeStep + 1} / {tourSteps.length} · GUIDED TOUR · ~05:00</span>
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
              {mapColumns.map((column) => {
                const geometry = mapGeometry[column.target];
                return (
                  <section
                    key={column.target}
                    className="bf-machine-tour-map-layer__column"
                    data-map-target={column.target}
                    data-ready={geometry ? "true" : undefined}
                    style={geometry ? {
                      left: geometry.left,
                      top: geometry.top,
                      width: geometry.width,
                    } : undefined}
                  >
                    <article className="bf-machine-tour-map-layer__item">
                      <span>{column.index}</span>
                      <strong>{column.text}</strong>
                    </article>
                  </section>
                );
              })}
            </aside>,
            mapHost,
          )
        : null}
    </>
  );
}

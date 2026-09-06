"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Network } from "lucide-react";
import { useMobileStructureHoldReveal } from "./useMobileStructureHoldReveal";
import "./mobile-capital-structure.css";

type CapitalStage = {
  id: string;
  number: string;
  label: string;
  operation: string;
};

const stages: CapitalStage[] = [
  { id: "capital", number: "01", label: "Capital", operation: "inlet" },
  { id: "coherent-capacity", number: "02", label: "Coherent capacity", operation: "bind" },
  { id: "bounded-work", number: "03", label: "Bounded work", operation: "close" },
  { id: "validation", number: "04", label: "Validation", operation: "gate" },
  { id: "transfer", number: "05", label: "Transfer", operation: "egress" },
  { id: "retained-capability", number: "06", label: "Retained capability", operation: "return" },
];

function stageById(id: string | undefined) {
  return stages.find((stage) => stage.id === id) ?? stages[0];
}

export function MobileCapitalStructureLayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [transientOpen, setTransientOpen] = useState(false);
  const [activeStageId, setActiveStageId] = useState(stages[0].id);
  const open = latchedOpen || transientOpen;

  useMobileStructureHoldReveal({
    targetSelector: '.capital-prototype-page[data-machine-surface="capital"]',
    enabled: !latchedOpen,
    onTransientChange: setTransientOpen,
  });

  useEffect(() => {
    if (!open) return;

    const capitalPage = document.querySelector<HTMLElement>('.capital-prototype-page[data-machine-surface="capital"]');
    if (!capitalPage) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const stageElements = Array.from(
        capitalPage.querySelectorAll<HTMLElement>(".capital-frame__conversion-stage[data-stage-id]"),
      ).filter((stage) => stage.getClientRects().length > 0);
      if (stageElements.length === 0) return;

      const shell = capitalPage.closest<HTMLElement>(".site-shell");
      const frameTop = shell
        ? Number.parseFloat(window.getComputedStyle(shell).getPropertyValue("--frame-top")) || 0
        : 0;
      const anchorY = Math.max(frameTop + 112, Math.min(window.innerHeight * 0.43, window.innerHeight - 120));

      let nextId = stageElements[0].dataset.stageId ?? stages[0].id;
      let nextDistance = Number.POSITIVE_INFINITY;

      stageElements.forEach((stage) => {
        const id = stage.dataset.stageId;
        if (!id) return;
        const rect = stage.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - anchorY);
        if (distance < nextDistance) {
          nextDistance = distance;
          nextId = id;
        }
      });

      setActiveStageId((current) => current === nextId ? current : nextId);
    };

    const scheduleMeasure = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true, capture: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.removeEventListener("scroll", scheduleMeasure, { capture: true });
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [open]);

  const activeIndex = Math.max(0, stages.findIndex((stage) => stage.id === activeStageId));
  const active = stageById(activeStageId);
  const previous = activeIndex === 0 ? null : stages[activeIndex - 1];
  const next = active.id === "retained-capability" ? stages[1] : stages[activeIndex + 1] ?? null;
  const nextLabel = active.id === "retained-capability" ? "feeds next cycle" : "becomes";
  const revealMode = latchedOpen ? "latched" : transientOpen ? "transient" : "closed";

  return (
    <div
      className="bf-mobile-capital-structure"
      data-open={open ? "true" : "false"}
      data-reveal-mode={revealMode}
      data-active-stage={active.id}
      ref={rootRef}
    >
      <button
        className="bf-mobile-capital-structure__toggle"
        type="button"
        aria-expanded={open}
        aria-pressed={latchedOpen}
        aria-controls={panelId}
        aria-label={latchedOpen
          ? "Hide the mobile capital conversion gutter"
          : "Reveal the mobile capital conversion gutter. Press and hold the Capital surface to reveal it transiently."}
        onClick={() => {
          setTransientOpen(false);
          setLatchedOpen((value) => !value);
        }}
      >
        <Network aria-hidden="true" />
        <span>
          <small>CAPITAL · HOLD</small>
          <strong>Conversion</strong>
        </span>
        <b>{latchedOpen ? "Hide" : transientOpen ? "Pin" : "Reveal"}</b>
      </button>

      <aside
        className="bf-mobile-capital-structure__gutter"
        id={panelId}
        aria-label={`Capital conversion structure at ${active.label}`}
        aria-hidden={!open}
      >
        <header>
          <small>LOCAL CONVERSION</small>
          <strong>{active.number} · {active.label}</strong>
          <span>Scroll the rail to inspect how capital becomes capability.</span>
        </header>

        <div className="bf-mobile-capital-structure__flow">
          {previous ? (
            <div className="bf-mobile-capital-structure__neighbor" data-position="before">
              <small>FROM</small>
              <strong>{previous.label}</strong>
            </div>
          ) : (
            <div className="bf-mobile-capital-structure__neighbor" data-position="before">
              <small>INPUT</small>
              <strong>Resource boundary</strong>
            </div>
          )}

          <div className="bf-mobile-capital-structure__operation">
            <small>OPERATION</small>
            <strong>{active.operation}</strong>
            <span>{active.label}</span>
          </div>

          {next ? (
            <div className="bf-mobile-capital-structure__neighbor" data-position="after">
              <small>{nextLabel}</small>
              <strong>{next.label}</strong>
            </div>
          ) : null}
        </div>

        <footer>
          <span>{active.number} / {String(stages.length).padStart(2, "0")}</span>
          {active.id === "retained-capability" ? <strong>↺ return closes the cycle</strong> : <strong>↓ conversion continues</strong>}
        </footer>
      </aside>
    </div>
  );
}

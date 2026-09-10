"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PanelTargets = {
  controls: HTMLElement | null;
  controlsHeading: HTMLElement | null;
  telemetry: HTMLElement | null;
  telemetryHeading: HTMLElement | null;
};

const EMPTY_TARGETS: PanelTargets = {
  controls: null,
  controlsHeading: null,
  telemetry: null,
  telemetryHeading: null,
};

export function DistinctionSpacePanelCollapseController() {
  const [targets, setTargets] = useState<PanelTargets>(EMPTY_TARGETS);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [telemetryCollapsed, setTelemetryCollapsed] = useState(false);

  useEffect(() => {
    const resolveTargets = () => {
      const instrument = document.querySelector<HTMLElement>(
        'section[role="dialog"][aria-label="Boundary First Visual Mathematics instrument"]',
      );
      const controls = instrument?.querySelector<HTMLElement>("aside:has(select)") ?? null;
      const telemetry = instrument?.querySelector<HTMLElement>("aside:has(article)") ?? null;
      const controlsHeading = controls?.firstElementChild instanceof HTMLElement ? controls.firstElementChild : null;
      const telemetryHeading = telemetry?.firstElementChild instanceof HTMLElement ? telemetry.firstElementChild : null;

      setTargets((current) => {
        if (
          current.controls === controls &&
          current.controlsHeading === controlsHeading &&
          current.telemetry === telemetry &&
          current.telemetryHeading === telemetryHeading
        ) {
          return current;
        }
        return { controls, controlsHeading, telemetry, telemetryHeading };
      });
    };

    resolveTargets();
    const observer = new MutationObserver(resolveTargets);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!targets.controls) return;
    targets.controls.dataset.bflCollapsed = String(controlsCollapsed);
    return () => {
      delete targets.controls?.dataset.bflCollapsed;
    };
  }, [controlsCollapsed, targets.controls]);

  useEffect(() => {
    if (!targets.telemetry) return;
    targets.telemetry.dataset.bflCollapsed = String(telemetryCollapsed);
    return () => {
      delete targets.telemetry?.dataset.bflCollapsed;
    };
  }, [telemetryCollapsed, targets.telemetry]);

  return (
    <>
      {targets.controlsHeading
        ? createPortal(
            <button
              className="bfl-panel-collapse-toggle"
              type="button"
              aria-expanded={!controlsCollapsed}
              aria-label={controlsCollapsed ? "Expand input panel" : "Collapse input panel"}
              title={controlsCollapsed ? "Expand input panel" : "Collapse input panel"}
              onClick={() => setControlsCollapsed((value) => !value)}
            >
              {controlsCollapsed ? "+" : "−"}
            </button>,
            targets.controlsHeading,
          )
        : null}

      {targets.telemetryHeading
        ? createPortal(
            <button
              className="bfl-panel-collapse-toggle"
              type="button"
              aria-expanded={!telemetryCollapsed}
              aria-label={telemetryCollapsed ? "Expand telemetry panel" : "Collapse telemetry panel"}
              title={telemetryCollapsed ? "Expand telemetry panel" : "Collapse telemetry panel"}
              onClick={() => setTelemetryCollapsed((value) => !value)}
            >
              {telemetryCollapsed ? "+" : "−"}
            </button>,
            targets.telemetryHeading,
          )
        : null}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, PanelLeftOpen, PanelRightOpen, X } from "lucide-react";

type CapitalRail = "inputs" | "criteria" | null;

type SectionTarget = {
  element: HTMLElement;
  id: string;
  eyebrow: string;
  label: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

type CapitalTargets = {
  page: HTMLElement;
  cycle: HTMLElement | null;
  core: HTMLElement | null;
  retained: HTMLElement | null;
  institution: HTMLElement | null;
};

function sameTargets(current: CapitalTargets | null, next: CapitalTargets | null) {
  if (current === next) return true;
  if (!current || !next) return false;
  return current.page === next.page
    && current.cycle === next.cycle
    && current.core === next.core
    && current.retained === next.retained
    && current.institution === next.institution;
}

function SectionToggle({ target }: { target: SectionTarget }) {
  const control = (
    <button
      className="capital-frame__mobile-section-toggle"
      type="button"
      data-open={target.open ? "true" : "false"}
      aria-expanded={target.open}
      aria-controls={target.id}
      onClick={() => target.setOpen(!target.open)}
    >
      <span>
        <small>{target.eyebrow}</small>
        <strong>{target.label}</strong>
      </span>
      <ChevronDown aria-hidden="true" />
    </button>
  );

  return createPortal(control, target.element);
}

export function MobileCapitalProjectionControls() {
  const [targets, setTargets] = useState<CapitalTargets | null>(null);
  const [openRail, setOpenRail] = useState<CapitalRail>(null);
  const [cycleOpen, setCycleOpen] = useState(true);
  const [coreOpen, setCoreOpen] = useState(true);
  const [retainedOpen, setRetainedOpen] = useState(false);
  const [institutionOpen, setInstitutionOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measureTargets = () => {
      frame = 0;
      const page = document.querySelector<HTMLElement>('.capital-prototype-page[data-machine-surface="capital"]');
      if (!page) {
        setTargets((current) => current === null ? current : null);
        return;
      }

      const next: CapitalTargets = {
        page,
        cycle: page.querySelector<HTMLElement>(".capital-frame__engine-heading"),
        core: page.querySelector<HTMLElement>(".capital-frame__machine-bed"),
        retained: page.querySelector<HTMLElement>(".capital-frame__return-manifold"),
        institution: page.querySelector<HTMLElement>(".capital-frame__institutional-rail"),
      };

      setTargets((current) => sameTargets(current, next) ? current : next);
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measureTargets);
    };

    measureTargets();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!targets) {
      setOpenRail(null);
      return;
    }

    targets.page.dataset.mobileCapitalRail = openRail ?? "none";

    const sections = [
      [targets.cycle, "capital-mobile-cycle", cycleOpen],
      [targets.core, "capital-mobile-core", coreOpen],
      [targets.retained, "capital-mobile-retained", retainedOpen],
      [targets.institution, "capital-mobile-institution", institutionOpen],
    ] as const;

    sections.forEach(([element, id, open]) => {
      if (!element) return;
      element.id ||= id;
      element.dataset.mobileCapitalOpen = open ? "true" : "false";
    });

    return () => {
      delete targets.page.dataset.mobileCapitalRail;
      sections.forEach(([element]) => {
        if (element) delete element.dataset.mobileCapitalOpen;
      });
    };
  }, [coreOpen, cycleOpen, institutionOpen, openRail, retainedOpen, targets]);

  if (!targets) return null;

  const sectionTargets: SectionTarget[] = [];

  if (targets.cycle) {
    sectionTargets.push({
      element: targets.cycle,
      id: targets.cycle.id || "capital-mobile-cycle",
      eyebrow: "Cycle",
      label: "Conversion rail",
      open: cycleOpen,
      setOpen: (open) => setCycleOpen(open),
    });
  }

  if (targets.core) {
    sectionTargets.push({
      element: targets.core,
      id: targets.core.id || "capital-mobile-core",
      eyebrow: "Core machine",
      label: "Lab engine",
      open: coreOpen,
      setOpen: (open) => setCoreOpen(open),
    });
  }

  if (targets.retained) {
    sectionTargets.push({
      element: targets.retained,
      id: targets.retained.id || "capital-mobile-retained",
      eyebrow: "Return",
      label: "Retained capacity",
      open: retainedOpen,
      setOpen: (open) => setRetainedOpen(open),
    });
  }

  if (targets.institution) {
    sectionTargets.push({
      element: targets.institution,
      id: targets.institution.id || "capital-mobile-institution",
      eyebrow: "Institution",
      label: "Lab conversion",
      open: institutionOpen,
      setOpen: (open) => setInstitutionOpen(open),
    });
  }

  return (
    <div className="capital-mobile-projection-controls" data-open-rail={openRail ?? "none"}>
      <button
        className="capital-mobile-bumper capital-mobile-bumper--inputs"
        type="button"
        aria-expanded={openRail === "inputs"}
        aria-controls="capital-mobile-input-rail"
        aria-label={openRail === "inputs" ? "Close Lab inputs rail" : "Open Lab inputs rail"}
        onClick={() => setOpenRail((current) => current === "inputs" ? null : "inputs")}
      >
        {openRail === "inputs" ? <X aria-hidden="true" /> : <PanelLeftOpen aria-hidden="true" />}
        <span>Inputs</span>
      </button>

      <button
        className="capital-mobile-bumper capital-mobile-bumper--criteria"
        type="button"
        aria-expanded={openRail === "criteria"}
        aria-controls="capital-mobile-criteria-rail"
        aria-label={openRail === "criteria" ? "Close funding criteria rail" : "Open funding criteria rail"}
        onClick={() => setOpenRail((current) => current === "criteria" ? null : "criteria")}
      >
        {openRail === "criteria" ? <X aria-hidden="true" /> : <PanelRightOpen aria-hidden="true" />}
        <span>Criteria</span>
      </button>

      {openRail ? (
        <button
          className="capital-mobile-bumper-scrim"
          type="button"
          aria-label="Close Capital side rail"
          onClick={() => setOpenRail(null)}
        />
      ) : null}

      {sectionTargets.map((target) => (
        <SectionToggle key={target.id} target={target} />
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Map, Play, X } from "lucide-react";

type Region =
  | "all"
  | "problem"
  | "representation"
  | "method"
  | "machinery"
  | "applications"
  | "purpose";

type TourStop = {
  eyebrow: string;
  title: string;
  body: string;
  region: Region;
};

const tourStops: TourStop[] = [
  {
    eyebrow: "00 / Map",
    title: "The whole machine",
    body: "Boundary First Labs works on one recurring structure: difficult systems hide consequential distinctions, representations govern what can be seen and done, and better machinery can restore inspectability and agency.",
    region: "all",
  },
  {
    eyebrow: "01 / Problem",
    title: "Difficult systems hide consequential distinctions.",
    body: "Assumptions disappear into interfaces, models, procedures, institutions, and software. Those hidden assumptions eventually become operational consequences.",
    region: "problem",
  },
  {
    eyebrow: "02 / Insight",
    title: "Representation is the control.",
    body: "A representation is not merely a picture of a system. It determines what the system — or the person using it — is capable of distinguishing, reasoning about, and acting upon.",
    region: "representation",
  },
  {
    eyebrow: "03 / Method",
    title: "Start with the distinctions that actually matter.",
    body: "Find the boundaries. Make them explicit. Determine what can cross them. Preserve what must remain invariant. Then build outward from there.",
    region: "method",
  },
  {
    eyebrow: "04 / Machinery",
    title: "Turn the method into executable apparatus.",
    body: "Boundary First turns the method into inspectable software, formal workflows, claim systems, research machinery, interfaces, and computational experiments.",
    region: "machinery",
  },
  {
    eyebrow: "05 / Applications",
    title: "One structural move, many domains.",
    body: "The same representational mechanics recur across software, AI, science, mathematics, education, law, civic systems, and organizational processes.",
    region: "applications",
  },
  {
    eyebrow: "06 / Purpose",
    title: "Increase capacity by making abstraction accountable.",
    body: "The goal is not to eliminate abstraction. It is to make difficult systems more inspectable, testable, executable, understandable, and usable — so people and institutions can act with greater agency and competence.",
    region: "purpose",
  },
  {
    eyebrow: "07 / Return",
    title: "Now read the same map again.",
    body: "The representation did not change. Your ability to read it did. The orientation closes on the same map it opened with, then releases you back into the full apparatus.",
    region: "all",
  },
];

const overviewNodes: Array<{
  region: Exclude<Region, "all">;
  index: string;
  title: string;
  body: string;
  detail: string;
}> = [
  {
    region: "problem",
    index: "01",
    title: "Difficult systems",
    body: "Consequential distinctions disappear inside abstraction.",
    detail: "Hidden assumptions become operational consequences.",
  },
  {
    region: "representation",
    index: "02",
    title: "Representation",
    body: "What can be represented constrains what can be observed and done.",
    detail: "Model → representation → observe → act → evidence.",
  },
  {
    region: "method",
    index: "03",
    title: "Boundary-First method",
    body: "Expose the boundaries and preserve the distinctions that matter.",
    detail: "Find → bind → admit → preserve → build outward.",
  },
  {
    region: "machinery",
    index: "04",
    title: "Executable machinery",
    body: "Turn the method into inspectable procedures and software.",
    detail: "Research systems, interfaces, workflows, experiments.",
  },
  {
    region: "applications",
    index: "05",
    title: "Cross-domain application",
    body: "Apply the same mechanics wherever representation controls action.",
    detail: "Software · AI · Science · Law · Education · Civic systems.",
  },
  {
    region: "purpose",
    index: "06",
    title: "Purpose",
    body: "Increase capacity, agency, accessibility, and competence.",
    detail: "Make difficult systems inspectable, testable, executable, and usable.",
  },
];

function OverviewNode({
  node,
  activeRegion,
  last,
}: {
  node: (typeof overviewNodes)[number];
  activeRegion: Region;
  last: boolean;
}) {
  const active = activeRegion === "all" || activeRegion === node.region;
  const focused = activeRegion !== "all" && activeRegion === node.region;

  return (
    <li
      className={`relative min-h-[11.5rem] rounded-xl border bg-[#f5f1e8] p-4 transition-[opacity,transform,box-shadow,border-color] duration-300 ${
        active ? "opacity-100" : "opacity-40"
      } ${focused ? "-translate-y-1 shadow-[0_10px_24px_rgba(53,95,63,0.14)]" : "shadow-[0_3px_10px_rgba(54,50,43,0.06)]"}`}
      style={{ borderColor: focused ? "var(--apparatus-green)" : "#c8c2b6" }}
    >
      {!last ? (
        <span
          aria-hidden="true"
          className="absolute left-[calc(100%+0.15rem)] top-1/2 hidden h-px w-[0.45rem] -translate-y-1/2 lg:block"
          style={{ backgroundColor: "var(--apparatus-green)" }}
        />
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <span
          className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--apparatus-green)" }}
        >
          {node.index}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#7d796f]">
          {node.region}
        </span>
      </div>
      <h4 className="mt-5 font-serif text-xl leading-tight tracking-[-0.025em] text-[#292c28]">
        {node.title}
      </h4>
      <p className="mt-3 text-xs leading-5 text-[#454842]">{node.body}</p>
      <p className="mt-4 border-t border-[#d9d3c7] pt-3 font-mono text-[9px] leading-4 uppercase tracking-[0.06em] text-[#77746c]">
        {node.detail}
      </p>
    </li>
  );
}

function OverviewMap({ activeRegion }: { activeRegion: Region }) {
  return (
    <div className="rounded-[0.95rem] border border-[#c7c1b5] bg-[#ece7dc] p-3 sm:p-5">
      <div className="flex flex-col gap-4 border-b border-[#cbc5b9] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Map aria-hidden="true" className="h-4 w-4" style={{ color: "var(--apparatus-green)" }} />
            <p
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--apparatus-green)" }}
            >
              Single-page overview // causal map
            </p>
          </div>
          <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em] text-[#292c28] sm:text-3xl">
            Boundary First Labs
          </h3>
        </div>
        <p className="max-w-2xl text-xs leading-5 text-[#56584f] sm:text-right">
          Software for difficult systems. The domains differ; the underlying representational problem frequently does not.
        </p>
      </div>

      <ol className="mt-4 grid gap-3 lg:grid-cols-6">
        {overviewNodes.map((node, index) => (
          <OverviewNode
            activeRegion={activeRegion}
            key={node.region}
            last={index === overviewNodes.length - 1}
            node={node}
          />
        ))}
      </ol>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-[#c8c2b6] bg-[#f5f1e8] p-5">
          <p
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--apparatus-green)" }}
          >
            The Boundary-First move
          </p>
          <p className="mt-3 font-serif text-xl leading-snug text-[#292c28] sm:text-2xl">
            Find the distinctions that actually matter. Make the boundaries explicit. Determine what can cross them. Preserve what must remain invariant. Then build outward.
          </p>
        </div>

        <div className="rounded-xl border border-[#c8c2b6] bg-[#f5f1e8] p-5">
          <p
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--apparatus-green)" }}
          >
            If you remember one thing
          </p>
          <p className="mt-3 font-serif text-2xl tracking-[-0.025em] text-[#292c28]">
            Representation is the control.
          </p>
          <p className="mt-3 text-xs leading-5 text-[#56584f]">
            What a system can distinguish constrains what it can know. What it can represent constrains what it can do. Boundary First begins there.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FiveMinuteOrientationPanel() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stop = activeStep === null ? null : tourStops[activeStep];

  function startTour() {
    setActiveStep(0);
  }

  function closeTour() {
    setActiveStep(null);
  }

  function previousStop() {
    setActiveStep((current) => (current === null ? 0 : Math.max(0, current - 1)));
  }

  function nextStop() {
    setActiveStep((current) => {
      if (current === null) return 0;
      return Math.min(tourStops.length - 1, current + 1);
    });
  }

  if (activeStep === null || !stop) {
    return (
      <div className="grid min-h-[9rem] items-center gap-5 px-8 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-12">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--apparatus-green)" }}
            >
              Guided tour
            </span>
            <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: "var(--apparatus-green)" }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#77746c]">
              Runtime ~05:00
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-serif text-2xl tracking-[-0.025em] text-[#292c28] sm:text-3xl">
              Five-minute orientation
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#77746c]">
              Prerequisites: none
            </span>
          </div>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-[#4b4e48]">
            A guided compression of the whole Lab: problem → representation → method → machinery → application → purpose.
          </p>
        </div>

        <button
          className="group flex min-h-14 items-center justify-between gap-5 rounded-lg border border-[#c4beb2] bg-[#f5f1e8] px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] shadow-[0_4px_10px_rgba(54,50,43,0.08)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(54,50,43,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--apparatus-green)]"
          onClick={startTour}
          type="button"
        >
          <span style={{ color: "var(--apparatus-green)" }}>Start tour</span>
          <Play aria-hidden="true" className="h-4 w-4 fill-current" style={{ color: "var(--apparatus-green)" }} />
        </button>
      </div>
    );
  }

  const atStart = activeStep === 0;
  const atEnd = activeStep === tourStops.length - 1;

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-5 border-b border-[#cbc5b9] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl" aria-live="polite">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--apparatus-green)" }}
            >
              Guided tour // {stop.eyebrow}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#77746c]">
              {activeStep + 1} / {tourStops.length}
            </span>
          </div>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.035em] text-[#292c28] sm:text-4xl">
            {stop.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4b4e48] sm:text-base sm:leading-7">
            {stop.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label="Previous tour stop"
            className="grid h-11 w-11 place-items-center rounded-md border border-[#c8c2b6] bg-[#f5f1e8] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={atStart}
            onClick={previousStop}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            className="flex h-11 items-center gap-3 rounded-md border border-[#c8c2b6] bg-[#f5f1e8] px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={atEnd}
            onClick={nextStop}
            type="button"
          >
            Next
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            aria-label="Exit guided tour"
            className="grid h-11 w-11 place-items-center rounded-md border border-[#c8c2b6] bg-[#eee9df]"
            onClick={closeTour}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <OverviewMap activeRegion={stop.region} />
      </div>

      {atEnd ? (
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#b9c4b6] bg-[#eef1e9] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--apparatus-green)" }}
            >
              Orientation complete
            </p>
            <p className="mt-2 text-sm leading-6 text-[#454842]">
              The tour now releases you back into the full apparatus. Explore from whichever part of the map caught your attention.
            </p>
          </div>
          <button
            className="min-h-11 rounded-md border border-[#8da08a] bg-[#f5f1e8] px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]"
            onClick={closeTour}
            style={{ color: "var(--apparatus-green)" }}
            type="button"
          >
            Return to apparatus
          </button>
        </div>
      ) : null}
    </div>
  );
}

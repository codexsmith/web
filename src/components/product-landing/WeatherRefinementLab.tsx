'use client';

import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  CircleDot,
  Gauge,
  Radar,
  RotateCcw,
  ShieldCheck,
  Waves,
} from "lucide-react";
import content from "@/content/product-landing-pages/boundary-first-weather.json";

type AllocationMode = "uniform" | "boundary";
type Sensitivity = "low" | "medium" | "high";

const sensitivityRadius: Record<Sensitivity, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const rows = 7;
const columns = 12;
const totalCells = rows * columns;

function frontColumn(row: number, phase: number) {
  return 3 + ((row + phase) % 5);
}

export function WeatherRefinementLab() {
  const [mode, setMode] = useState<AllocationMode>("boundary");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("medium");
  const [phase, setPhase] = useState(1);

  const cells = useMemo(() => {
    const radius = sensitivityRadius[sensitivity];
    return Array.from({ length: totalCells }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      const boundaryColumn = frontColumn(row, phase);
      const distance = Math.abs(column - boundaryColumn);
      const boundary = distance === 0;
      const consequence = distance <= radius;
      const refined = mode === "uniform" ? true : consequence;
      return { index, row, column, boundary, consequence, refined };
    });
  }, [mode, phase, sensitivity]);

  const refinedCount = cells.filter((cell) => cell.refined).length;
  const activeCount = cells.filter((cell) => cell.consequence).length;
  const offBoundarySpend = cells.filter(
    (cell) => cell.refined && !cell.consequence,
  ).length;
  const coverage = activeCount === 0
    ? 0
    : Math.round(
        (cells.filter((cell) => cell.refined && cell.consequence).length /
          activeCount) *
          100,
      );

  return (
    <section
      className="border-b border-border bg-[#0b1f2d] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="weather-refinement-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)]">
          <div className="relative overflow-hidden border border-white/15 bg-white/[0.03] p-4 sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3rem_3rem]" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Radar className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      BFW-LAB-01 · illustrative refinement allocator
                    </p>
                  </div>
                  <h2
                    className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
                    id="weather-refinement-lab-title"
                  >
                    Spend synthetic compute where the represented boundary is moving.
                  </h2>
                </div>
                <span className="border border-white/15 px-3 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/42">
                  toy field · no forecast skill claim
                </span>
              </div>

              <div className="mt-6 grid grid-cols-12 gap-1 border border-white/12 bg-black/10 p-2" aria-label="Synthetic weather field allocation map">
                {cells.map((cell) => {
                  const className = cell.boundary
                    ? "border-brand-red/65 bg-brand-red/35"
                    : cell.refined && cell.consequence
                      ? "border-brand-gold/45 bg-brand-gold/20"
                      : cell.refined
                        ? "border-brand-blue/30 bg-brand-blue/10"
                        : "border-white/8 bg-white/[0.025]";
                  return (
                    <div
                      aria-label={`row ${cell.row + 1}, column ${cell.column + 1}${cell.boundary ? ", boundary" : cell.consequence ? ", consequence region" : ""}${cell.refined ? ", compute allocated" : ", coarse"}`}
                      className={`aspect-square min-h-5 border ${className}`}
                      key={cell.index}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/38">
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 border border-brand-red/65 bg-brand-red/35" />front / boundary</span>
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 border border-brand-gold/45 bg-brand-gold/20" />selected consequence region</span>
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 border border-brand-blue/30 bg-brand-blue/10" />allocated outside active region</span>
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <div className="border border-white/15 bg-white/[0.035] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Gauge className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Allocation controls
                </p>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {([
                  ["uniform", "Uniform refinement", "Allocate to every represented cell"],
                  ["boundary", "Boundary-selective", "Allocate only near the detected consequence region"],
                ] as const).map(([id, label, note]) => {
                  const active = mode === id;
                  return (
                    <button
                      aria-pressed={active}
                      className={`border p-4 text-left transition-colors ${
                        active
                          ? "border-brand-gold bg-brand-gold/[0.075]"
                          : "border-white/12 bg-white/[0.025] hover:border-white/25"
                      }`}
                      key={id}
                      onClick={() => setMode(id)}
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        {active ? (
                          <CheckCircle2 className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                        ) : (
                          <CircleDot className="h-4 w-4 text-white/30" aria-hidden="true" />
                        )}
                        <strong className="font-serif text-base text-white/88">{label}</strong>
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-white/42">{note}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-white/12 pt-5">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">Defect sensitivity</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as const).map((value) => (
                    <button
                      aria-pressed={sensitivity === value}
                      className={`min-h-10 border px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.09em] ${
                        sensitivity === value
                          ? "border-brand-gold bg-brand-gold/[0.08] text-brand-gold"
                          : "border-white/12 text-white/38 hover:border-white/25"
                      }`}
                      key={value}
                      onClick={() => setSensitivity(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-white/12 pt-5">
                <button
                  className="inline-flex min-h-10 flex-1 items-center justify-center border border-white/15 bg-white/[0.025] font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/48 hover:border-white/28"
                  onClick={() => setPhase((current) => (current + 1) % 5)}
                  type="button"
                >
                  <Waves className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                  Advance front
                </button>
                <button
                  className="grid h-10 w-10 place-items-center border border-white/15 text-white/45 hover:border-white/28 hover:text-white"
                  onClick={() => {
                    setMode("boundary");
                    setSensitivity("medium");
                    setPhase(1);
                  }}
                  type="button"
                  aria-label="Reset refinement lab"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/12 bg-white/10">
              <Metric label="Allocated cells" value={`${refinedCount}/${totalCells}`} />
              <Metric label="Active-region coverage" value={`${coverage}%`} />
              <Metric label="Off-region spend" value={String(offBoundarySpend)} />
              <Metric label="Front phase" value={String(phase + 1)} />
            </div>

            <div className="border border-brand-gold/30 bg-brand-gold/[0.05] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Claim boundary</p>
                  <p className="mt-2 text-xs leading-6 text-white/54">{content.adaptiveRefinement.claimRule}</p>
                  <p className="mt-3 text-[11px] leading-5 text-white/40">The numbers above are illustrative allocation units, not measured wall-clock, forecast error, or operational performance.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-5">
          <Activity className="mt-1 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
          <p className="max-w-5xl text-xs leading-6 text-white/46">{content.coreHypothesis.test}</p>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0b1f2d] p-4">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/34">{label}</p>
      <p className="mt-2 font-serif text-2xl font-semibold text-white/88">{value}</p>
    </div>
  );
}

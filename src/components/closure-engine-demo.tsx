"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Gauge,
  RotateCcw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { closureEngineDemo } from "@/lib/interaction-research";

const DEFAULT_CHECKS: Record<string, boolean> = {
  owner: true,
  evidence: false,
  rollback: true,
};

export function ClosureEngineDemo() {
  const [checks, setChecks] = useState<Record<string, boolean>>({ ...DEFAULT_CHECKS });
  const [residualLeak, setResidualLeak] = useState(true);

  const readiness = useMemo(() => {
    const satisfiedConditions = closureEngineDemo.conditions.filter(
      (condition) => checks[condition.id],
    );
    const missingConditions = closureEngineDemo.conditions.filter(
      (condition) => !checks[condition.id],
    );
    const allSatisfied = satisfiedConditions.length === closureEngineDemo.conditions.length;

    return {
      satisfied: satisfiedConditions.length,
      missingConditions,
      allSatisfied,
      admitted: allSatisfied && !residualLeak,
    };
  }, [checks, residualLeak]);

  const readinessPercent = Math.round(
    (readiness.satisfied / closureEngineDemo.conditions.length) * 100,
  );

  const resetScenario = () => {
    setChecks({ ...DEFAULT_CHECKS });
    setResidualLeak(true);
  };

  return (
    <div className="overflow-hidden border border-border bg-background shadow-[10px_10px_0_rgba(15,33,56,0.08)]">
      <div className="border-b border-border bg-[#0f2138] p-5 text-brand-ivory sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                CE-01 · bounded release apparatus
              </p>
            </div>
            <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {closureEngineDemo.title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                readiness.admitted ? "bg-emerald-400" : "bg-amber-400"
              }`}
              aria-hidden="true"
            />
            <div className="text-right">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Release state
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">
                {readiness.admitted ? "Admitted" : "Held at boundary"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <section className="relative overflow-hidden bg-[#0f2138] p-5 text-brand-ivory sm:p-7" aria-label="Release apparatus">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(248,243,232,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.09)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
                Live transport diagram
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                invariant-preserving release path
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,0.72fr)] lg:items-center">
              <div className="relative border border-white/20 bg-white/[0.045] p-5">
                <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-brand-gold" aria-hidden="true" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      Vessel · change context
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/50">
                      Declared obligations remain attached to the production change while it approaches the release boundary.
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-white/35">V-01</span>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {closureEngineDemo.conditions.map((condition, index) => {
                    const active = Boolean(checks[condition.id]);
                    return (
                      <div
                        className={`border p-3 ${
                          active
                            ? "border-emerald-400/40 bg-emerald-400/[0.08]"
                            : "border-white/15 bg-black/10"
                        }`}
                        key={condition.id}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${active ? "bg-emerald-400" : "bg-white/20"}`}
                            aria-hidden="true"
                          />
                          <span className="font-mono text-[8px] text-white/35">
                            P{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-[8px] font-semibold uppercase leading-4 tracking-[0.1em] text-white/70">
                          {condition.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-36 lg:min-h-52" aria-label="Transport line and release valve">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20 lg:left-0 lg:top-1/2 lg:h-px lg:w-full lg:translate-x-0 lg:-translate-y-1/2" />
                <div
                  className={`absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 text-center shadow-[0_0_0_8px_rgba(255,255,255,0.025)] ${
                    readiness.admitted
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-brand-gold/70 bg-[#0f2138]"
                  }`}
                >
                  <ShieldCheck
                    className={`h-5 w-5 ${readiness.admitted ? "text-emerald-300" : "text-brand-gold"}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55">
                    Valve
                  </span>
                  <strong className="font-mono text-[10px] uppercase tracking-[0.1em]">
                    {readiness.admitted ? "Open" : "Closed"}
                  </strong>
                </div>

                <div className="absolute left-[calc(50%+3rem)] top-[calc(50%+2.7rem)] z-20 lg:left-1/2 lg:top-[calc(50%+3rem)] lg:-translate-x-1/2">
                  <div className={`h-10 w-px ${residualLeak ? "bg-destructive" : "bg-emerald-400/50"}`} />
                  <div
                    className={`-ml-16 w-32 border p-2 text-center ${
                      residualLeak
                        ? "border-destructive/60 bg-destructive/10"
                        : "border-emerald-400/35 bg-emerald-400/[0.07]"
                    }`}
                  >
                    <p className={`font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${residualLeak ? "text-red-200" : "text-emerald-200"}`}>
                      {residualLeak ? "Leak / external dependency" : "Dependency captured"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`border p-5 ${readiness.admitted ? "border-emerald-400/45 bg-emerald-400/[0.07]" : "border-white/20 bg-white/[0.035]"}`}>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60">
                    Destination · production
                  </p>
                  <span className="font-mono text-[9px] text-white/35">D-01</span>
                </div>
                <div className="mt-7 flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center border ${readiness.admitted ? "border-emerald-400/50" : "border-white/15"}`}>
                    <ArrowRight className={`h-5 w-5 ${readiness.admitted ? "text-emerald-300" : "text-white/30"}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-semibold">
                      {readiness.admitted ? "Transport admitted" : "Transport blocked"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/45">
                      The destination cannot override the boundary state.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-white/15 pt-5">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Condenser · invariant
              </p>
              <p className="mt-2 max-w-4xl font-serif text-lg font-semibold leading-7 text-white/85">
                {closureEngineDemo.invariant}
              </p>
            </div>
          </div>
        </section>

        <aside className="bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Evidence readiness
              </p>
            </div>
            <span className="font-mono text-[9px] font-semibold">{readinessPercent}%</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden border border-border bg-background">
            <div
              className={`h-full transition-[width] ${readiness.allSatisfied ? "bg-emerald-500" : "bg-foreground"}`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="font-serif text-5xl font-semibold">
              {readiness.satisfied}/{closureEngineDemo.conditions.length}
            </p>
            <p className="max-w-40 text-right text-xs leading-5 text-foreground-muted">
              represented release conditions satisfied
            </p>
          </div>

          <div className="mt-7 border-t border-border pt-5">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Event trace
            </p>
            <ol className="mt-4 grid gap-3">
              {closureEngineDemo.conditions.map((condition, index) => {
                const active = Boolean(checks[condition.id]);
                return (
                  <li className="grid grid-cols-[1.6rem_1fr_auto] items-start gap-3 text-xs" key={condition.id}>
                    <span className="font-mono text-[8px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span>{condition.label}</span>
                    <span className={`font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${active ? "text-emerald-700" : "text-foreground-muted"}`}>
                      {active ? "latched" : "missing"}
                    </span>
                  </li>
                );
              })}
              <li className="grid grid-cols-[1.6rem_1fr_auto] items-start gap-3 border-t border-border pt-3 text-xs">
                <span className="font-mono text-[8px] text-foreground-muted">04</span>
                <span>Residual dependency</span>
                <span className={`font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${residualLeak ? "text-destructive" : "text-emerald-700"}`}>
                  {residualLeak ? "leaking" : "captured"}
                </span>
              </li>
              <li className="grid grid-cols-[1.6rem_1fr_auto] items-start gap-3 border-t border-border pt-3 text-xs">
                <span className="font-mono text-[8px] text-foreground-muted">05</span>
                <strong>Release gate</strong>
                <span className={`font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${readiness.admitted ? "text-emerald-700" : "text-foreground"}`}>
                  {readiness.admitted ? "open" : "closed"}
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-7 border-t border-border pt-5" aria-live="polite">
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Accessible state readout
            </p>
            <p className="mt-2 text-xs leading-6 text-foreground-muted">
              Release gate {readiness.admitted ? "open" : "closed"}. Conditions satisfied: {readiness.satisfied} of {closureEngineDemo.conditions.length}. Residual dependency {residualLeak ? "remains outside the represented boundary" : "has been brought inside the represented boundary"}.
            </p>
          </div>
        </aside>
      </div>

      <section className="border-t border-border bg-background p-5 sm:p-7" aria-label="Closure engine controls">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Control bank
            </p>
            <h4 className="mt-2 font-serif text-2xl font-semibold">
              Change represented conditions. Watch the apparatus answer back.
            </h4>
          </div>
          <button
            className="inline-flex min-h-10 items-center border border-border bg-card px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] hover:border-foreground-muted"
            onClick={resetScenario}
            type="button"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Reset scenario
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {closureEngineDemo.conditions.map((condition) => {
            const active = Boolean(checks[condition.id]);
            return (
              <button
                aria-pressed={active}
                className={`min-h-36 border p-4 text-left transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card hover:border-foreground-muted"
                }`}
                key={condition.id}
                onClick={() =>
                  setChecks((current) => ({
                    ...current,
                    [condition.id]: !current[condition.id],
                  }))
                }
                type="button"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                    {active ? (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span className="h-4 w-4 border border-current" aria-hidden="true" />
                    )}
                    {condition.label}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.08em]">
                    {active ? "latched" : "open"}
                  </span>
                </span>
                <span className={`mt-4 block text-xs leading-5 ${active ? "text-background/75" : "text-foreground-muted"}`}>
                  {condition.description}
                </span>
              </button>
            );
          })}

          <button
            aria-pressed={!residualLeak}
            className={`min-h-36 border p-4 text-left transition-colors ${
              residualLeak
                ? "border-destructive/50 bg-destructive/5"
                : "border-emerald-600/40 bg-emerald-500/[0.06]"
            }`}
            onClick={() => setResidualLeak((current) => !current)}
            type="button"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                {residualLeak ? (
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Wrench className="h-4 w-4" aria-hidden="true" />
                )}
                Residual dependency
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.08em]">
                {residualLeak ? "leak" : "repaired"}
              </span>
            </span>
            <span className="mt-4 block text-xs leading-5 text-foreground-muted">
              {residualLeak
                ? "A known dependency remains outside the release model. Bring it inside the represented boundary before transport."
                : "The dependency is represented. Toggle again to reintroduce the defect and observe the valve close."}
            </span>
          </button>
        </div>

        {readiness.missingConditions.length > 0 || residualLeak ? (
          <div className="mt-5 flex items-start gap-3 border-l-2 border-accent bg-card/45 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" />
            <p className="text-xs leading-6 text-foreground-muted">
              Gate remains closed because {[
                ...readiness.missingConditions.map((condition) => condition.label.toLowerCase()),
                ...(residualLeak ? ["the residual dependency is still outside the boundary"] : []),
              ].join(", ")}.
            </p>
          </div>
        ) : (
          <div className="mt-5 flex items-start gap-3 border-l-2 border-emerald-500 bg-emerald-500/[0.06] px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <p className="text-xs leading-6 text-foreground-muted">
              The declared boundary closes under the represented conditions. The release valve can open without suppressing a known defect.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

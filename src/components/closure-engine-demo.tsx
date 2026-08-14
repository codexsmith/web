"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import { closureEngineDemo } from "@/lib/interaction-research";

export function ClosureEngineDemo() {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    owner: true,
    evidence: false,
    rollback: true,
  });
  const [residualLeak, setResidualLeak] = useState(true);

  const readiness = useMemo(() => {
    const satisfied = closureEngineDemo.conditions.filter(
      (condition) => checks[condition.id],
    ).length;
    const allSatisfied = satisfied === closureEngineDemo.conditions.length;
    return {
      satisfied,
      allSatisfied,
      admitted: allSatisfied && !residualLeak,
    };
  }, [checks, residualLeak]);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
      <div className="border border-border bg-background p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              Closure Engine · bounded demo
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              {closureEngineDemo.title}
            </h2>
          </div>
          <span className="border border-border bg-card px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
            {closureEngineDemo.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)] lg:items-center">
          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Vessel · change context
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              A production change is moving toward release with obligations that must remain represented.
            </p>
          </div>

          <div className="grid justify-items-center gap-2 py-2">
            <div className="h-8 w-px bg-border lg:h-px lg:w-12" />
            <div
              className={`border px-4 py-3 text-center ${
                readiness.admitted
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card"
              }`}
            >
              <ShieldCheck className="mx-auto h-4 w-4" aria-hidden="true" />
              <span className="mt-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                Valve · release gate
              </span>
              <strong className="mt-1 block text-sm">
                {readiness.admitted ? "Open" : "Closed"}
              </strong>
            </div>
            <div className="h-8 w-px bg-border lg:h-px lg:w-12" />
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Destination · production
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              Transport is admissible only if the release boundary closes under the declared invariant.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {closureEngineDemo.conditions.map((condition) => {
            const active = Boolean(checks[condition.id]);
            return (
              <button
                aria-pressed={active}
                className={`min-h-32 border p-4 text-left transition-colors ${
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
                <span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                  {active ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span className="h-4 w-4 border border-current" aria-hidden="true" />
                  )}
                  {condition.label}
                </span>
                <span className={`mt-3 block text-xs leading-5 ${active ? "text-background/75" : "text-foreground-muted"}`}>
                  {condition.description}
                </span>
              </button>
            );
          })}
        </div>

        <button
          aria-pressed={residualLeak}
          className={`mt-3 flex w-full items-start gap-3 border p-4 text-left ${
            residualLeak
              ? "border-destructive/50 bg-destructive/5"
              : "border-border bg-card"
          }`}
          onClick={() => setResidualLeak((current) => !current)}
          type="button"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
              Leak · unrepresented dependency
            </span>
            <span className="mt-2 block text-xs leading-5 text-foreground-muted">
              {residualLeak
                ? "A known dependency remains outside the release model. The valve must stay closed even if every checklist condition is otherwise present."
                : "The residual dependency has been brought back inside the represented boundary."}
            </span>
          </span>
        </button>
      </div>

      <aside className="border border-border bg-card p-5 sm:p-7">
        <Gauge className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
        <p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Gauge · evidence readiness
        </p>
        <p className="mt-2 font-serif text-4xl font-semibold">
          {readiness.satisfied}/{closureEngineDemo.conditions.length}
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          The gauge reports represented conditions. It does not decide what the invariant should be and it cannot erase a known leak.
        </p>

        <div className="mt-6 border-t border-border pt-5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            Condenser · invariant
          </p>
          <p className="mt-3 text-sm font-medium leading-7">
            {closureEngineDemo.invariant}
          </p>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            Accessible equivalent
          </p>
          <p className="mt-3 text-xs leading-6 text-foreground-muted">
            Release gate: {readiness.admitted ? "open" : "closed"}. Conditions satisfied: {readiness.satisfied} of {closureEngineDemo.conditions.length}. Residual dependency: {residualLeak ? "present" : "represented"}.
          </p>
        </div>
      </aside>
    </div>
  );
}

'use client';

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDot,
  GitBranch,
  Play,
  RotateCcw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import content from "@/content/product-landing-pages/closure-driven-software-development.json";

type DomainKey = "outcome" | "distinctions" | "authority" | "failures";
type ExecutableKey = "path" | "interfaces" | "environment" | "repair";

type ReadinessState = {
  domain: Record<DomainKey, boolean>;
  executable: Record<ExecutableKey, boolean>;
};

const initialState: ReadinessState = {
  domain: {
    outcome: true,
    distinctions: false,
    authority: false,
    failures: false,
  },
  executable: {
    path: true,
    interfaces: false,
    environment: true,
    repair: false,
  },
};

const domainItems: Array<{ key: DomainKey; label: string }> = [
  { key: "outcome", label: content.certainty.domainCone[0] },
  { key: "distinctions", label: content.certainty.domainCone[1] },
  { key: "authority", label: content.certainty.domainCone[2] },
  { key: "failures", label: content.certainty.domainCone[3] },
];

const executableItems: Array<{ key: ExecutableKey; label: string }> = [
  { key: "path", label: content.certainty.executableCone[0] },
  { key: "interfaces", label: content.certainty.executableCone[1] },
  { key: "environment", label: content.certainty.executableCone[2] },
  { key: "repair", label: content.certainty.executableCone[3] },
];

export function ClosureReadinessLab() {
  const [state, setState] = useState<ReadinessState>(initialState);

  const readout = useMemo(() => {
    const domainCount = Object.values(state.domain).filter(Boolean).length;
    const executableCount = Object.values(state.executable).filter(Boolean).length;
    const domainReady = domainCount >= 3;
    const executableReady = executableCount >= 3;
    const ready = domainReady && executableReady;

    if (ready) {
      return {
        status: "Commitment enters the overlap",
        code: "BUILD THE SKELETON",
        body: "Enough domain and executable certainty is represented for a bounded implementation commitment. The next move is not more planning by default; it is to build the smallest path that can falsify the remaining assumptions.",
        tone: "good" as const,
        domainCount,
        executableCount,
      };
    }

    if (domainReady && !executableReady) {
      return {
        status: "Domain understood better than delivery path",
        code: "PROBE EXECUTION",
        body: "The team can describe what must be preserved, but the executable path is still too uncertain. A delivery skeleton or environment probe should answer the next question sooner than more domain prose.",
        tone: "warn" as const,
        domainCount,
        executableCount,
      };
    }

    if (!domainReady && executableReady) {
      return {
        status: "Delivery path exists before the object is stable",
        code: "BOUND THE DOMAIN",
        body: "The team can probably ship something, but the represented outcome, distinctions, authority, or failure modes remain too weak to know whether that thing is the right thing to ship.",
        tone: "danger" as const,
        domainCount,
        executableCount,
      };
    }

    return {
      status: "The next commitment is still too coarse",
      code: "REDUCE GRANULARITY",
      body: "Neither cone is sufficiently represented at the current commitment size. Shrink the work until one bounded question can be answered by a real artifact or witness.",
      tone: "neutral" as const,
      domainCount,
      executableCount,
    };
  }, [state]);

  return (
    <section
      className="border-b border-border bg-[#101d2b] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="closure-readiness-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <GitBranch className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                CDSD-LAB-01 · readiness intersection
              </p>
            </div>
            <h2
              className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="closure-readiness-lab-title"
            >
              Readiness is the overlap between what the domain needs and what execution can currently prove.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">{content.certainty.body}</p>
          </div>
          <button
            className="inline-flex min-h-10 items-center border border-white/15 bg-white/[0.03] px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/48 hover:border-white/28 hover:text-white"
            onClick={() => setState(initialState)}
            type="button"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Reset readiness
          </button>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <ReadinessCone
            title="Domain cone"
            code="WHAT MUST SURVIVE"
            count={readout.domainCount}
            items={domainItems.map((item) => ({
              ...item,
              active: state.domain[item.key],
              toggle: () =>
                setState((current) => ({
                  ...current,
                  domain: {
                    ...current.domain,
                    [item.key]: !current.domain[item.key],
                  },
                })),
            }))}
          />
          <ReadinessCone
            title="Executable cone"
            code="WHAT CAN RUN + REPAIR"
            count={readout.executableCount}
            items={executableItems.map((item) => ({
              ...item,
              active: state.executable[item.key],
              toggle: () =>
                setState((current) => ({
                  ...current,
                  executable: {
                    ...current.executable,
                    [item.key]: !current.executable[item.key],
                  },
                })),
            }))}
          />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <article
            className={`border p-5 sm:p-6 ${
              readout.tone === "good"
                ? "border-brand-green/45 bg-brand-green/[0.065]"
                : readout.tone === "warn"
                  ? "border-brand-gold/45 bg-brand-gold/[0.06]"
                  : readout.tone === "danger"
                    ? "border-brand-red/45 bg-brand-red/[0.06]"
                    : "border-white/15 bg-white/[0.03]"
            }`}
            aria-live="polite"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">Intersection verdict</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">{readout.status}</h3>
              </div>
              <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/48">{readout.code}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/58">{readout.body}</p>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-white/12 bg-white/10">
              <Metric label="Domain certainty" value={`${readout.domainCount}/4`} />
              <Metric label="Executable certainty" value={`${readout.executableCount}/4`} />
            </div>
          </article>

          <aside className="border border-brand-gold/30 bg-brand-gold/[0.05] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Smallest truth-telling path</p>
            </div>
            <ul className="mt-4 grid gap-2">
              {content.deliverySkeleton.requirements.slice(0, 5).map((requirement, index) => (
                <li className="grid grid-cols-[1.5rem_1fr] gap-2 text-[11px] leading-5 text-white/50" key={requirement}>
                  <span className="font-mono text-[8px] text-white/28">{String(index + 1).padStart(2, "0")}</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-3 border-t border-white/12 pt-4">
              {readout.tone === "good" ? (
                <Play className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
              ) : (
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              )}
              <p className="text-[11px] leading-5 text-white/42">Synthetic planning instrument only. The threshold is illustrative and does not define a universal readiness score.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ReadinessCone({
  title,
  code,
  count,
  items,
}: {
  title: string;
  code: string;
  count: number;
  items: Array<{ key: string; label: string; active: boolean; toggle: () => void }>;
}) {
  return (
    <article className="relative overflow-hidden border border-white/15 bg-white/[0.03] p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/8" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">{code}</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">{title}</h3>
          </div>
          <span className="font-serif text-3xl font-semibold text-brand-gold">{count}/4</span>
        </div>
        <div className="mt-5 grid gap-2">
          {items.map((item) => (
            <button
              aria-pressed={item.active}
              className={`flex min-h-14 items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                item.active
                  ? "border-brand-gold/40 bg-brand-gold/[0.06]"
                  : "border-white/10 bg-black/10 hover:border-white/22"
              }`}
              key={item.key}
              onClick={item.toggle}
              type="button"
            >
              {item.active ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              ) : (
                <CircleDot className="h-4 w-4 shrink-0 text-white/25" aria-hidden="true" />
              )}
              <span className={`text-xs leading-5 ${item.active ? "text-white/72" : "text-white/42"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#101d2b] p-4">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/32">{label}</p>
      <p className="mt-2 font-serif text-2xl font-semibold">{value}</p>
    </div>
  );
}

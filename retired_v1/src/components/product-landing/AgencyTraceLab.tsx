'use client';

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDot,
  FileSearch,
  GitBranch,
  Network,
  RotateCcw,
  Scale,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import content from "@/content/product-landing-pages/agency-representation-audit.json";

type LinkKey =
  | "authority"
  | "representation"
  | "consequence"
  | "contest"
  | "correction"
  | "repair";

type LinkState = Record<LinkKey, boolean>;

const initialState: LinkState = {
  authority: true,
  representation: true,
  consequence: true,
  contest: false,
  correction: false,
  repair: false,
};

const linkMeta: Array<{
  key: LinkKey;
  label: string;
  actor: string;
  question: string;
  icon: typeof Network;
}> = [
  {
    key: "authority",
    label: "Authority",
    actor: "Policy + operator",
    question: "Can the permission to act be reconstructed?",
    icon: Network,
  },
  {
    key: "representation",
    label: "Representation",
    actor: "Case record + model output",
    question: "Can the affected condition be inspected rather than merely accepted?",
    icon: FileSearch,
  },
  {
    key: "consequence",
    label: "Consequence",
    actor: "Eligibility state",
    question: "Is the downstream change visible and attributable?",
    icon: GitBranch,
  },
  {
    key: "contest",
    label: "Contest",
    actor: "Affected party",
    question: "Can the action be challenged through an executable path?",
    icon: Scale,
  },
  {
    key: "correction",
    label: "Correction",
    actor: "Source-of-truth owner",
    question: "Does a corrected representation propagate to downstream state?",
    icon: ShieldCheck,
  },
  {
    key: "repair",
    label: "Repair",
    actor: "Named consequence owner",
    question: "Who fixes harm already produced after the source is corrected?",
    icon: Wrench,
  },
];

export function AgencyTraceLab() {
  const [links, setLinks] = useState<LinkState>(initialState);

  const result = useMemo(() => {
    const missing = linkMeta.filter((item) => !links[item.key]);
    const upstreamVisible =
      links.authority && links.representation && links.consequence;
    const reversible = links.contest && links.correction;
    const closes = missing.length === 0;

    if (closes) {
      return {
        status: "Scoped chain closes",
        code: "TRACE RECONSTRUCTABLE",
        body: "Authority, representation, consequence, contest, correction, and repair are all represented in the synthetic process. That does not prove the process is good; it means the audit can now evaluate the chain rather than stop at missing ownership.",
        tone: "good" as const,
      };
    }

    if (upstreamVisible && !reversible) {
      return {
        status: "Decision visible; recourse does not close",
        code: "CONTEST DEFECT",
        body: "The system can explain how it acted, but the affected party still lacks an executable route to challenge or propagate correction. Explanation without reversibility is not closure.",
        tone: "danger" as const,
      };
    }

    if (upstreamVisible && reversible && !links.repair) {
      return {
        status: "Record can be corrected; consequence remains orphaned",
        code: "REPAIR OWNER MISSING",
        body: "The representation can be challenged and corrected, but no named actor owns the consequences already produced. Source repair and consequence repair are distinct obligations.",
        tone: "warn" as const,
      };
    }

    return {
      status: "Trace cannot yet be reconstructed",
      code: "CHAIN INCOMPLETE",
      body: "At least one upstream link is absent. The audit cannot safely infer the missing authority, representation, or consequence path from downstream behavior alone.",
      tone: "neutral" as const,
    };
  }, [links]);

  const missingLabels = linkMeta
    .filter((item) => !links[item.key])
    .map((item) => item.label);

  return (
    <section
      className="border-b border-border bg-[#101820] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="agency-trace-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                ARA-LAB-01 · synthetic consequence trace
              </p>
            </div>
            <h2
              className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="agency-trace-lab-title"
            >
              A system is not closed merely because it can explain the decision.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">
              Toggle which links are actually executable in a synthetic AI-assisted eligibility workflow. The point is not to grade the example; it is to show where authority, representation, consequence, contest, correction, and repair stop being one reconstructable chain.
            </p>
          </div>
          <button
            className="inline-flex min-h-10 items-center border border-white/15 bg-white/[0.035] px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:border-white/30 hover:text-white"
            onClick={() => setLinks(initialState)}
            type="button"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Reset trace
          </button>
        </div>

        <div className="mt-7 overflow-hidden border border-white/15 bg-white/[0.025]">
          <ol className="grid gap-px bg-white/10 md:grid-cols-3 xl:grid-cols-6">
            {linkMeta.map((item, index) => {
              const active = links[item.key];
              const Icon = item.icon;
              return (
                <li className="relative bg-[#101820] p-4" key={item.key}>
                  {index < linkMeta.length - 1 ? (
                    <span
                      className={`absolute right-[-1px] top-[2.35rem] z-10 hidden h-px w-4 translate-x-1/2 xl:block ${
                        active && links[linkMeta[index + 1].key]
                          ? "bg-brand-gold"
                          : "bg-white/15"
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full border ${
                        active
                          ? "border-brand-gold text-brand-gold"
                          : "border-brand-red/45 text-brand-red"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/32">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-white/90">
                    {item.label}
                  </h3>
                  <p className="mt-1 font-mono text-[8px] uppercase leading-4 tracking-[0.08em] text-white/35">
                    {item.actor}
                  </p>
                  <p className="mt-3 text-[11px] leading-5 text-white/48">
                    {item.question}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {linkMeta.map((item) => {
            const active = links[item.key];
            return (
              <button
                aria-pressed={active}
                className={`grid min-h-14 grid-cols-[1.75rem_1fr_auto] items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "border-brand-green/40 bg-brand-green/[0.055]"
                    : "border-brand-red/35 bg-brand-red/[0.055]"
                }`}
                key={item.key}
                onClick={() =>
                  setLinks((current) => ({
                    ...current,
                    [item.key]: !current[item.key],
                  }))
                }
                type="button"
              >
                {active ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-green" aria-hidden="true" />
                ) : (
                  <CircleDot className="h-4 w-4 text-brand-red" aria-hidden="true" />
                )}
                <span className="font-serif text-sm font-semibold text-white/85">
                  {item.label} path
                </span>
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/35">
                  {active ? "executable" : "missing"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <article
            className={`border p-5 sm:p-6 ${
              result.tone === "danger"
                ? "border-brand-red/55 bg-brand-red/[0.075]"
                : result.tone === "warn"
                  ? "border-brand-gold/45 bg-brand-gold/[0.065]"
                  : result.tone === "good"
                    ? "border-brand-green/45 bg-brand-green/[0.065]"
                    : "border-white/15 bg-white/[0.03]"
            }`}
            aria-live="polite"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">
                  Closure readout
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">{result.status}</h3>
              </div>
              <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/50">
                {result.code}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/58">{result.body}</p>
            <div className="mt-5 border-t border-white/12 pt-4">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">
                Unresolved links
              </p>
              <p className="mt-2 text-xs leading-6 text-white/52">
                {missingLabels.length > 0
                  ? missingLabels.join(" · ")
                  : "None inside the declared synthetic scope"}
              </p>
            </div>
          </article>

          <aside className="border border-brand-gold/30 bg-brand-gold/[0.05] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-gold">
                Audit closure rule
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/58">
              {content.method.closureTest}
            </p>
            <p className="mt-5 border-t border-white/12 pt-4 text-[11px] leading-5 text-white/42">
              Synthetic teaching process only. This instrument does not make a legal, regulatory, fairness, safety, or compliance determination.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useMemo, useState } from "react";
import {
  BookOpen,
  CircleDot,
  FileWarning,
  Scale,
  ShieldCheck,
} from "lucide-react";
import content from "@/content/product-landing-pages/constitutional-law-and-jurisprudence.json";

type ExampleId = "state-action" | "standing-analogy" | "authority-maxim" | "consequential-actor";

type ClaimExample = {
  id: ExampleId;
  label: string;
  regime: string;
  statement: string;
  handling: string;
};

const stateActionAnchor = content.constitutionalBaseline.anchors.find(
  (anchor) => anchor.id === "state-action",
);

const examples: ClaimExample[] = [
  {
    id: "state-action",
    label: "State-action baseline",
    regime: "Current doctrine",
    statement:
      stateActionAnchor?.summary ??
      "Constitutional state-action analysis ordinarily distinguishes governmental action from purely private conduct.",
    handling:
      "Treat as a current-law proposition that requires current primary authority and jurisdiction-aware verification before reliance.",
  },
  {
    id: "standing-analogy",
    label: "Standing comparison",
    regime: "Doctrinal analogy",
    statement:
      "Injury → consequence; traceability → causal and responsibility path; redressability → repair.",
    handling:
      content.standingBridge.criticalBoundary,
  },
  {
    id: "authority-maxim",
    label: "Authority maxim",
    regime: "Proposed jurisprudence",
    statement: content.boundaryFirstJurisprudence.maxims.at(-1) ?? "Authority must close in responsibility.",
    handling:
      "Present as a Boundary First jurisprudential proposition, not as a generally binding rule of United States law.",
  },
  {
    id: "consequential-actor",
    label: "Consequential Actor",
    regime: "Law-reform proposal",
    statement: content.privatePower.proposedConcept.definition,
    handling: content.privatePower.warning,
  },
];

export function LawClaimRegimeLab() {
  const [selectedId, setSelectedId] = useState<ExampleId>("state-action");
  const selected = useMemo(
    () => examples.find((example) => example.id === selectedId) ?? examples[0],
    [selectedId],
  );

  return (
    <section
      className="border-b border-border bg-[#15191f] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="law-claim-regime-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                LAW-LAB-01 · claim-status firewall
              </p>
            </div>
            <h2
              className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="law-claim-regime-lab-title"
            >
              Before arguing the proposition, say what kind of proposition it is.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Switch among examples already present in the governed legal-research page. The instrument keeps current doctrine, analogy, proposed jurisprudence, and law reform visually distinct before any deeper argument begins.
            </p>

            <div className="mt-6 grid gap-2">
              {examples.map((example, index) => {
                const active = selected.id === example.id;
                return (
                  <button
                    aria-pressed={active}
                    className={`grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 border px-3 py-3 text-left transition-colors ${
                      active
                        ? "border-brand-gold/50 bg-brand-gold/[0.07]"
                        : "border-white/12 bg-white/[0.025] hover:border-white/25"
                    }`}
                    key={example.id}
                    onClick={() => setSelectedId(example.id)}
                    type="button"
                  >
                    <span className={`font-mono text-[8px] ${active ? "text-brand-gold" : "text-white/30"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong className="block font-serif text-sm text-white/88">{example.label}</strong>
                      <span className="mt-1 block font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/34">
                        {example.regime}
                      </span>
                    </span>
                    <CircleDot className={`h-3.5 w-3.5 ${active ? "text-brand-gold" : "text-white/25"}`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="relative overflow-hidden border border-white/15 bg-white/[0.035] p-5 sm:p-7" aria-live="polite">
              <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">Selected proposition</p>
                    <h3 className="mt-3 max-w-3xl font-serif text-2xl font-semibold leading-9">{selected.statement}</h3>
                  </div>
                  <span className="border border-brand-gold/45 bg-brand-gold/[0.07] px-3 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">
                    {selected.regime}
                  </span>
                </div>

                <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
                  <div className="border-l-2 border-brand-gold/50 pl-5">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">Required handling</p>
                    <p className="mt-3 text-sm leading-7 text-white/58">{selected.handling}</p>
                  </div>
                  <div className="border border-white/12 bg-black/10 p-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/36">Display rule</p>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-white/52">{content.claimRegimes.displayRule}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              <aside className="border border-brand-red/35 bg-brand-red/[0.055] p-5">
                <div className="flex items-start gap-3">
                  <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/42">Legal boundary</p>
                    <p className="mt-2 text-xs leading-6 text-white/54">Research and educational classification interface only. It does not provide legal advice, determine the law governing a real dispute, or create rights, defenses, remedies, or an attorney-client relationship.</p>
                  </div>
                </div>
              </aside>
              <aside className="border border-brand-gold/30 bg-brand-gold/[0.05] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Verification rule</p>
                    <p className="mt-2 text-xs leading-6 text-white/54">{content.legalNotice.rules[2]}</p>
                    <p className="mt-3 text-[11px] leading-5 text-white/40">The page&apos;s current-law material remains subject to the legal notice above and must be re-verified when used for an actual legal question.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

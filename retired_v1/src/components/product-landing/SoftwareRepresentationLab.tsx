'use client';

import { useMemo, useState } from "react";
import {
  Binary,
  CheckCircle2,
  CircleDot,
  Database,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import content from "@/content/product-landing-pages/software-before-code.json";

type RepresentationMode = "boolean" | "status" | "explicit";
type FactKey = "budget" | "compliance" | "payment" | "revoked";

const initialFacts: Record<FactKey, boolean> = {
  budget: true,
  compliance: false,
  payment: false,
  revoked: false,
};

const factMeta: Array<{ key: FactKey; label: string; detail: string }> = [
  {
    key: "budget",
    label: "Budget owner approval",
    detail: "Independent authority has approved the spend.",
  },
  {
    key: "compliance",
    label: "Compliance approval",
    detail: "A separate policy gate has been satisfied.",
  },
  {
    key: "payment",
    label: "Payment authorization",
    detail: "Release authority has been granted.",
  },
  {
    key: "revoked",
    label: "Approval revoked",
    detail: "A previously valid approval has been withdrawn while history must remain reconstructable.",
  },
];

export function SoftwareRepresentationLab() {
  const [mode, setMode] = useState<RepresentationMode>("boolean");
  const [facts, setFacts] = useState(initialFacts);

  const readout = useMemo(() => {
    const fullyApproved =
      facts.budget && facts.compliance && facts.payment && !facts.revoked;
    const partial =
      [facts.budget, facts.compliance, facts.payment].filter(Boolean).length;

    if (mode === "boolean") {
      return {
        encoded: `isApproved = ${fullyApproved ? "true" : "false"}`,
        visible: fullyApproved ? 1 : 1,
        lost: [
          !fullyApproved && partial > 0
            ? `${partial} satisfied approval dimension${partial === 1 ? "" : "s"}`
            : null,
          facts.revoked ? "revocation history" : null,
          "which authority acted",
          "which evidence satisfied each gate",
        ].filter(Boolean) as string[],
        diagnosis:
          "The boolean answers one downstream question by collapsing several independent conditions. That compression is safe only if no later operation needs the distinctions it removed.",
      };
    }

    if (mode === "status") {
      const status = facts.revoked
        ? "revoked"
        : fullyApproved
          ? "payment-authorized"
          : facts.compliance && facts.budget
            ? "awaiting-payment-authorization"
            : facts.budget
              ? "awaiting-compliance"
              : "received";
      return {
        encoded: `status = "${status}"`,
        visible: 2,
        lost: [
          "independent authority provenance",
          "parallel versus sequential approval semantics",
          "evidence attached to each transition",
        ],
        diagnosis:
          "A status string preserves more state than a boolean, but one label can still hide independent dimensions, authority, and the path by which the state was reached.",
      };
    }

    const explicit = [
      `budget:${facts.budget ? "approved" : "pending"}`,
      `compliance:${facts.compliance ? "approved" : "pending"}`,
      `payment:${facts.payment ? "authorized" : "blocked"}`,
      `revoked:${facts.revoked ? "yes" : "no"}`,
    ];
    return {
      encoded: explicit.join(" · "),
      visible: 4,
      lost: ["full real-world context outside the declared invoice grammar"],
      diagnosis:
        "The explicit representation costs more structure, but the independent conditions remain available to transition rules, audit, reversal, and repair. It is still a model, not the world itself.",
    };
  }, [facts, mode]);

  return (
    <section
      className="border-b border-border bg-[#0f2138] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="software-representation-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Binary className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                SBC-LAB-01 · representation loss debugger
              </p>
            </div>
            <h2
              className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="software-representation-lab-title"
            >
              Every representation forgets. Choose what you are willing to lose.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Use the governed Invoice Approval example as a small state model. Change the independent facts, then switch representations and inspect which distinctions remain available to execution.
            </p>

            <div className="mt-6 grid gap-2">
              {factMeta.map((fact) => {
                const active = facts[fact.key];
                return (
                  <button
                    aria-pressed={active}
                    className={`grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 border px-3 py-3 text-left transition-colors ${
                      active
                        ? "border-brand-gold/45 bg-brand-gold/[0.07]"
                        : "border-white/12 bg-white/[0.025] hover:border-white/25"
                    }`}
                    key={fact.key}
                    onClick={() =>
                      setFacts((current) => ({
                        ...current,
                        [fact.key]: !current[fact.key],
                      }))
                    }
                    type="button"
                  >
                    {active ? (
                      <CheckCircle2 className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                    ) : (
                      <CircleDot className="h-4 w-4 text-white/32" aria-hidden="true" />
                    )}
                    <span>
                      <strong className="block font-serif text-sm text-white/88">{fact.label}</strong>
                      <span className="mt-1 block text-[11px] leading-5 text-white/42">{fact.detail}</span>
                    </span>
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/32">
                      {active ? "true" : "false"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              className="mt-4 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:text-white"
              onClick={() => {
                setMode("boolean");
                setFacts(initialFacts);
              }}
              type="button"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              Reset invoice state
            </button>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Representation mode">
              {([
                ["boolean", "Boolean", "1 bit-like claim"],
                ["status", "Status string", "single state label"],
                ["explicit", "Explicit grammar", "independent dimensions"],
              ] as const).map(([id, label, note]) => {
                const active = mode === id;
                return (
                  <button
                    aria-selected={active}
                    className={`border p-4 text-left transition-colors ${
                      active
                        ? "border-brand-gold bg-brand-gold/[0.08]"
                        : "border-white/12 bg-white/[0.025] hover:border-white/25"
                    }`}
                    key={id}
                    onClick={() => setMode(id)}
                    role="tab"
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Database className={`h-4 w-4 ${active ? "text-brand-gold" : "text-white/30"}`} aria-hidden="true" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-white/30">{note}</span>
                    </div>
                    <strong className="mt-4 block font-serif text-lg text-white/90">{label}</strong>
                  </button>
                );
              })}
            </div>

            <article className="relative overflow-hidden border border-white/15 bg-white/[0.035] p-5 sm:p-6" aria-live="polite">
              <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">Encoded state</p>
                    <p className="mt-3 break-words font-mono text-sm leading-7 text-brand-gold">{readout.encoded}</p>
                  </div>
                  <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/45">
                    {readout.visible} visible dimension{readout.visible === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)]">
                  <div>
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/32">Representation diagnosis</p>
                    <p className="mt-3 text-sm leading-7 text-white/58">{readout.diagnosis}</p>
                  </div>
                  <div className="border border-brand-red/30 bg-brand-red/[0.055] p-4">
                    <div className="flex items-center gap-2">
                      <TriangleAlert className="h-4 w-4 text-brand-red" aria-hidden="true" />
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/40">Forgotten / compressed</p>
                    </div>
                    <ul className="mt-3 grid gap-2">
                      {readout.lost.map((item) => (
                        <li className="text-[11px] leading-5 text-white/50" key={item}>— {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <aside className="border border-brand-gold/30 bg-brand-gold/[0.05] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Controlled forgetting rule</p>
                  <p className="mt-2 text-xs leading-6 text-white/55">{content.controlledForgetting.rule}</p>
                  <p className="mt-3 text-[11px] leading-5 text-white/40">Synthetic invoice model only. The instrument demonstrates representation adequacy; it is not an accounts-payable product specification.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

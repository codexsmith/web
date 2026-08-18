'use client';

import { useMemo, useState } from "react";
import {
  Braces,
  CheckCircle2,
  CircleDot,
  RotateCcw,
  ShieldCheck,
  Sigma,
  XCircle,
} from "lucide-react";
import content from "@/content/product-landing-pages/schemathematics.json";

type ConditionKey = "closure" | "associativity" | "identity" | "invertibility";

type Conditions = Record<ConditionKey, boolean>;

const initialConditions: Conditions = {
  closure: true,
  associativity: true,
  identity: true,
  invertibility: false,
};

const conditionMeta: Array<{
  key: ConditionKey;
  label: string;
  role: string;
}> = [
  {
    key: "closure",
    label: "Closure",
    role: "a · b remains inside the represented carrier",
  },
  {
    key: "associativity",
    label: "Associativity",
    role: "parenthesization does not change a finite product",
  },
  {
    key: "identity",
    label: "Identity",
    role: "an element e leaves every element unchanged",
  },
  {
    key: "invertibility",
    label: "Universal invertibility",
    role: "every element has an inverse inside the structure",
  },
];

export function SchemaPromotionLab() {
  const [conditions, setConditions] = useState<Conditions>(initialConditions);

  const profile = useMemo(() => {
    const monoidConditions =
      conditions.closure && conditions.associativity && conditions.identity;
    const groupConditions = monoidConditions && conditions.invertibility;

    const guarantees = [
      {
        label: "Finite internal composition",
        available: conditions.closure && conditions.associativity,
      },
      {
        label: "Identity insertion / removal",
        available: monoidConditions,
      },
      {
        label: "Left and right cancellation",
        available: groupConditions,
      },
      {
        label: "Reversible multiplication",
        available: groupConditions,
      },
      {
        label: "Unique solution of a · x = b",
        available: groupConditions,
      },
      {
        label: "Unique solution of x · a = b",
        available: groupConditions,
      },
    ];

    if (groupConditions) {
      return {
        classification: "Group profile admitted",
        code: "PROMOTED STRUCTURE",
        boundary: content.workedExample.group.addedCondition,
        guarantees,
        tone: "group" as const,
      };
    }

    if (monoidConditions) {
      return {
        classification: "Monoid profile admitted",
        code: "BASE STRUCTURE",
        boundary:
          "Add universal invertibility to cross the represented boundary from monoid to group.",
        guarantees,
        tone: "monoid" as const,
      };
    }

    return {
      classification: "Monoid profile not admitted",
      code: "REQUIRED CONDITION MISSING",
      boundary:
        "At least one condition required by the governed monoid profile is absent. Do not promote the object by name while its required structure is missing.",
      guarantees,
      tone: "invalid" as const,
    };
  }, [conditions]);

  const activeCount = Object.values(conditions).filter(Boolean).length;

  return (
    <section
      className="border-b border-border bg-[#111b2b] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12"
      aria-labelledby="schema-promotion-lab-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Sigma className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                SCHEMA-LAB-01 · operative promotion test
              </p>
            </div>
            <h2
              className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              id="schema-promotion-lab-title"
            >
              Change one condition. Watch the licensed operations change with it.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              This instrument uses the page&apos;s standard monoid → group comparison. Toggle the conditions rather than relying on the names alone; the available guarantees are derived from the represented structure.
            </p>

            <div className="mt-6 grid gap-2">
              {conditionMeta.map((condition, index) => {
                const active = conditions[condition.key];
                return (
                  <button
                    aria-pressed={active}
                    className={`grid min-h-20 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border p-3 text-left transition-colors ${
                      active
                        ? "border-brand-gold/45 bg-brand-gold/[0.07]"
                        : "border-brand-red/35 bg-brand-red/[0.055]"
                    }`}
                    key={condition.key}
                    onClick={() =>
                      setConditions((current) => ({
                        ...current,
                        [condition.key]: !current[condition.key],
                      }))
                    }
                    type="button"
                  >
                    <span
                      className={`grid h-9 w-9 place-items-center border ${
                        active
                          ? "border-brand-gold text-brand-gold"
                          : "border-brand-red/50 text-brand-red"
                      }`}
                    >
                      {active ? (
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                    <span>
                      <span className="flex items-baseline gap-2">
                        <strong className="font-serif text-base text-white/90">
                          {condition.label}
                        </strong>
                        <span className="font-mono text-[8px] text-white/28">
                          C{String(index + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-1 block text-[11px] leading-5 text-white/45">
                        {condition.role}
                      </span>
                    </span>
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/35">
                      {active ? "admitted" : "removed"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              className="mt-4 inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-white/50 hover:text-white"
              onClick={() => setConditions(initialConditions)}
              type="button"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              Reset to monoid
            </button>
          </div>

          <div className="grid gap-4">
            <article
              className={`relative overflow-hidden border p-5 sm:p-6 ${
                profile.tone === "group"
                  ? "border-brand-green/45 bg-brand-green/[0.065]"
                  : profile.tone === "monoid"
                    ? "border-brand-gold/40 bg-brand-gold/[0.055]"
                    : "border-brand-red/45 bg-brand-red/[0.065]"
              }`}
              aria-live="polite"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">
                      Operative classification
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-semibold">
                      {profile.classification}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/50">
                      {profile.code}
                    </span>
                    <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.09em] text-white/30">
                      {activeCount}/4 conditions represented
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-px overflow-hidden border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                  {profile.guarantees.map((guarantee) => (
                    <div className="bg-[#111b2b] p-4" key={guarantee.label}>
                      <div className="flex items-center justify-between gap-3">
                        {guarantee.available ? (
                          <CheckCircle2 className="h-4 w-4 text-brand-green" aria-hidden="true" />
                        ) : (
                          <CircleDot className="h-4 w-4 text-white/25" aria-hidden="true" />
                        )}
                        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/30">
                          {guarantee.available ? "licensed" : "not guaranteed"}
                        </span>
                      </div>
                      <p
                        className={`mt-4 font-serif text-base font-semibold ${
                          guarantee.available ? "text-white/90" : "text-white/38"
                        }`}
                      >
                        {guarantee.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
              <article className="border border-white/15 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Braces className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-gold">
                    Boundary statement
                  </p>
                </div>
                <p className="mt-4 font-serif text-xl font-semibold leading-8">
                  {profile.boundary}
                </p>
                <p className="mt-4 text-xs leading-6 text-white/48">
                  {content.workedExample.boundaryDistinction}
                </p>
              </article>

              <aside className="border border-white/15 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Fidelity rule
                  </p>
                </div>
                <p className="mt-4 text-xs leading-6 text-white/52">
                  This lab demonstrates an established algebraic distinction. It does not claim that monoids, groups, invertibility, or their consequences are new mathematics.
                </p>
                <p className="mt-4 border-t border-white/12 pt-4 text-[11px] leading-5 text-white/40">
                  The research question is whether making the operative boundary explicit improves comparison, reconstruction, or machine/human navigation.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

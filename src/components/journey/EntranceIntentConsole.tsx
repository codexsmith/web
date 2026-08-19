'use client';

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FlaskConical,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const intents = [
  {
    id: "problem",
    label: "I have a system problem",
    title: "Start where the failure is already visible.",
    description:
      "Use a familiar software or socio-technical problem to expose hidden state, ownership, boundaries, evidence, and repair paths before moving into deeper method or theory.",
    href: "/software",
    action: "Start with practice",
    next: "Recognize the symptom → choose the job → inspect a bounded method → follow evidence if needed.",
    icon: Code2,
  },
  {
    id: "record",
    label: "I want to inspect the record",
    title: "Begin with what has actually been built, recorded, or tested.",
    description:
      "Enter through the retained work and evidence surfaces. Claims keep their standing, claim ceilings, provenance, and open gates attached instead of inheriting authority from the rest of the corpus.",
    href: "/work",
    action: "Inspect work & evidence",
    next: "Current evidence context → promoted work → bounded records → full Work Index only when you need inventory.",
    icon: ShieldCheck,
  },
  {
    id: "research",
    label: "I want to understand the research",
    title: "Follow the recurring mechanics inward.",
    description:
      "Start with bounded public programs and the questions they test, then move into domains, relations, the Atlas, and the formal core only as the question demands.",
    href: "/research",
    action: "Enter research",
    next: "Question → bounded program → evidence → relation or Atlas view → formal core.",
    icon: FlaskConical,
  },
  {
    id: "collaborate",
    label: "I want to work with the lab",
    title: "Declare the relationship before doing consequential work together.",
    description:
      "Choose a collaboration mode with explicit purpose, authority, evidence expectations, promotion boundaries, and closure conditions instead of beginning from an ambiguous partnership label.",
    href: "/collaborate",
    action: "Choose a collaboration mode",
    next: "Purpose → mode → role and authority → evidence package → closure or next gate.",
    icon: Handshake,
  },
] as const;

export function EntranceIntentConsole() {
  const [activeId, setActiveId] = useState<(typeof intents)[number]["id"]>(
    "problem",
  );
  const active = intents.find((intent) => intent.id === activeId) ?? intents[0];
  const ActiveIcon = active.icon;

  return (
    <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.58fr)_minmax(0,1.42fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Choose why you are here
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              One decision first. The rest can wait.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-foreground-muted">
              Boundary First has several public depths, but you should not need to understand the site architecture before you can enter it.
            </p>

            <div className="mt-7 grid gap-1" role="tablist" aria-label="Choose an entrance by intent">
              {intents.map((intent, index) => {
                const selected = intent.id === active.id;
                return (
                  <button
                    aria-selected={selected}
                    className={`grid min-h-12 grid-cols-[2rem_1fr] items-center gap-3 border px-3 py-2 text-left transition-colors ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent hover:border-border hover:bg-card"
                    }`}
                    key={intent.id}
                    onClick={() => setActiveId(intent.id)}
                    role="tab"
                    type="button"
                  >
                    <span className="font-mono text-[9px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold">{intent.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className="relative overflow-hidden border border-border bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10"
            role="tabpanel"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3rem_3rem]"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground-muted">
                    Recommended entrance
                  </p>
                  <h3 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
                    {active.title}
                  </h3>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-primary-foreground/25 bg-primary-foreground/[0.05]">
                  <ActiveIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-primary-foreground-secondary">
                {active.description}
              </p>

              <div className="mt-8 border-y border-primary-foreground/20 py-5">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">
                  What happens next
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">
                  {active.next}
                </p>
              </div>

              <Link
                className="mt-8 inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
                href={active.href}
              >
                {active.action}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Bug,
  GitBranch,
  Layers3,
  RefreshCcw,
  Search,
} from "lucide-react";
import { useState } from "react";
import { softwarePaths } from "@/lib/p1-public-shell";

const icons = {
  diagnose: Bug,
  understand: Search,
  build: Braces,
  change: RefreshCcw,
  learn: Layers3,
} as const;

const symptoms = [
  { path: "diagnose", label: "The bug is somewhere in here." },
  { path: "understand", label: "Nobody understands the whole system." },
  { path: "change", label: "Every change breaks something else." },
  { path: "build", label: "We need to build this without creating another mess." },
  { path: "learn", label: "Teach me the method before I apply it." },
] as const;

type PathId = (typeof softwarePaths)[number]["id"];

export function SoftwareProblemRouter() {
  const [activeId, setActiveId] = useState<PathId>("diagnose");
  const active = softwarePaths.find((path) => path.id === activeId) ?? softwarePaths[0];
  const Icon = icons[active.id] ?? GitBranch;

  return (
    <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1.38fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Recognize the problem
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Start with the sentence you are already saying.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              The first job is not to learn new vocabulary. It is to choose the investigation that best matches the failure already in front of you.
            </p>

            <div className="mt-7 grid gap-1" role="tablist" aria-label="Common software problem statements">
              {symptoms.map((symptom, index) => {
                const selected = symptom.path === active.id;
                return (
                  <button
                    aria-selected={selected}
                    className={`grid grid-cols-[2rem_1fr] gap-3 border px-3 py-3 text-left text-sm leading-6 ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent hover:border-border hover:bg-card"
                    }`}
                    key={symptom.path}
                    onClick={() => setActiveId(symptom.path)}
                    role="tab"
                    type="button"
                  >
                    <span className="font-mono text-[9px]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{symptom.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="border border-border bg-card p-6 sm:p-8 lg:p-10" role="tabpanel">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                  Recommended job · {active.verb}
                </p>
                <h3 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  {active.prompt}
                </h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-background">
                <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-foreground-muted">
              {active.description}
            </p>

            <div className="mt-7 border-y border-border py-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Useful handles, not prerequisites
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.vocabulary.map((term) => (
                  <span className="border border-border bg-background px-3 py-2 text-xs font-semibold" key={term}>
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <Link
              className="mt-7 inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
              href={active.href}
            >
              Follow this path
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Or jump directly
          </span>
          {softwarePaths.map((path) => (
            <Link className="inline-flex items-center text-sm font-semibold hover:underline" href={path.href} key={path.id}>
              {path.verb}
              <ArrowRight aria-hidden="true" className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

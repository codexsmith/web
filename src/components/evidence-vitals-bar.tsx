"use client";

import { useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { EvidenceVital, EvidenceVitalTone } from "@/lib/evidence-vitals";

type EvidenceVitalsBarProps = {
  className?: string;
  description?: string;
  eyebrow?: string;
  items: readonly EvidenceVital[];
  layout?: "inline" | "stacked";
  stamp?: string;
  title: string;
};

const toneClasses: Record<EvidenceVitalTone, string> = {
  standard: "bg-background",
  bounded: "bg-card/70",
  caution: "bg-accent/10",
};

export function EvidenceVitalsBar({
  className = "",
  description,
  eyebrow = "Evidence context",
  items,
  layout = "inline",
  stamp,
  title,
}: EvidenceVitalsBarProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const mobileSummary = useMemo(() => {
    const prioritized = items.filter((item) => item.mobilePriority);
    return (prioritized.length > 0 ? prioritized : items)
      .slice(0, 2)
      .map((item) => `${item.value} ${item.label.toLocaleLowerCase()}`)
      .join(" / ");
  }, [items]);
  const layoutClasses =
    layout === "inline"
      ? "md:grid-cols-[minmax(13rem,0.72fr)_minmax(0,2.28fr)]"
      : "grid-cols-1";

  return (
    <section
      aria-label={title}
      className={`overflow-hidden border border-border bg-border ${className}`}
    >
      <div className={`grid gap-px ${layoutClasses}`}>
        <header className="bg-card/70 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold leading-tight">
                {title}
              </h2>
            </div>
            <button
              aria-controls={panelId}
              aria-expanded={expanded}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-border bg-background md:hidden"
              onClick={() => setExpanded((current) => !current)}
              type="button"
            >
              <span className="sr-only">
                {expanded ? "Collapse" : "Expand"} {title}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <p className="mt-2 font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.11em] text-foreground-muted md:hidden">
            {mobileSummary}
          </p>
          {description ? (
            <p className="mt-3 hidden text-xs leading-6 text-foreground-muted md:block">
              {description}
            </p>
          ) : null}
          {stamp ? (
            <p className="mt-3 hidden font-mono text-[10px] uppercase leading-5 tracking-[0.11em] text-foreground-muted md:block">
              {stamp}
            </p>
          ) : null}
        </header>

        <dl
          className={`${
            expanded ? "grid" : "hidden"
          } grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-px bg-border md:grid`}
          id={panelId}
        >
          {items.map((item) => (
            <div className={`p-4 sm:p-5 ${toneClasses[item.tone]}`} key={item.id}>
              <dt className="font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.13em] text-foreground-muted">
                {item.label}
              </dt>
              <dd className="mt-2 font-serif text-3xl font-semibold leading-none">
                {item.value}
              </dd>
              <p className="mt-3 text-xs leading-5 text-foreground-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

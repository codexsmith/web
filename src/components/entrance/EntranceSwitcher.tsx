"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import {
  ENTRANCE_INVARIANT,
  ENTRANCE_ROUTES,
} from "@/lib/entrance/registry";
import { ENTRANCE_SESSION_KEY } from "@/lib/entrance/session";
import {
  ENTRANCE_MILESTONE_LABELS,
} from "@/lib/entrance/resolve";
import type {
  EntranceId,
  EntranceMilestone,
} from "@/lib/entrance/types";

export function EntranceSwitcher({
  current,
  milestone,
}: {
  current: EntranceId;
  milestone: EntranceMilestone;
}) {
  useEffect(() => {
    const value = JSON.stringify({
      entranceId: current,
      timestamp: Date.now(),
    });
    window.sessionStorage.setItem(ENTRANCE_SESSION_KEY, value);
  }, [current]);

  return (
    <section className="border-b border-border bg-card/55 text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          <p className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
            Boundary First entrance · {ENTRANCE_MILESTONE_LABELS[milestone]}
          </p>
          <p className="hidden whitespace-nowrap text-right font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted xl:block">
            {ENTRANCE_INVARIANT}
          </p>
        </div>

        <nav
          aria-label="Switch Boundary First entrance"
          className="mt-3 grid snap-x snap-mandatory auto-cols-[minmax(14rem,1fr)] grid-flow-col gap-px overflow-x-auto border border-border bg-border [scrollbar-width:none] md:grid-flow-row md:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {ENTRANCE_ROUTES.map((route) => {
            const active = route.id === current;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`group min-h-24 snap-start p-3 transition-colors sm:p-4 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted"
                }`}
                href={route.rootHref}
                key={route.id}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      active
                        ? "text-primary-foreground/62"
                        : "text-foreground-muted"
                    }`}
                  >
                    {String(route.presentationOrder + 1).padStart(2, "0")} · {route.bridge}
                  </span>
                  {active ? (
                    <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                      <CircleDot className="h-3.5 w-3.5" /> Current
                    </span>
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
                <strong className="mt-2 block font-serif text-xl font-semibold">
                  {route.label}
                </strong>
                <span
                  className={`mt-1 block text-xs leading-5 ${
                    active
                      ? "text-primary-foreground/72"
                      : "text-foreground/68"
                  }`}
                >
                  {route.question}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

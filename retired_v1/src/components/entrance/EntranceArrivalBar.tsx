"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENTRANCE_ROUTES, getEntranceRoute } from "@/lib/entrance/registry";
import {
  ENTRANCE_SESSION_KEY,
  isEntranceId,
  type EntranceSessionRecord,
} from "@/lib/entrance/session";
import type { EntranceId } from "@/lib/entrance/types";

const MAX_CONTEXT_AGE_MS = 30 * 60 * 1000;

export function EntranceArrivalBar() {
  const [entranceId, setEntranceId] = useState<EntranceId | null>(null);

  useEffect(() => {
    let frameId: number | null = null;
    try {
      const raw = window.sessionStorage.getItem(ENTRANCE_SESSION_KEY);
      if (!raw) return;
      const record = JSON.parse(raw) as Partial<EntranceSessionRecord>;
      if (
        isEntranceId(record.entranceId) &&
        typeof record.timestamp === "number" &&
        Date.now() - record.timestamp <= MAX_CONTEXT_AGE_MS
      ) {
        frameId = window.requestAnimationFrame(() => {
          setEntranceId(record.entranceId as EntranceId);
        });
      }
    } catch {
      window.sessionStorage.removeItem(ENTRANCE_SESSION_KEY);
    }
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!entranceId) return null;
  const current = getEntranceRoute(entranceId);

  return (
    <aside className="border-b border-border bg-card/60" aria-label="Entrance context">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
            You arrived through {current.label}
          </p>
          <p className="mt-1 text-sm text-foreground-muted">
            This record belongs to the shared corpus. Continue through the same
            lens or try another beginning.
          </p>
        </div>
        <nav
          aria-label="Continue through an entrance"
          className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ENTRANCE_ROUTES.map((route) => (
            <Link
              className={`inline-flex min-h-11 shrink-0 snap-start items-center border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-muted ${
                route.id === entranceId
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background"
              }`}
              href={route.rootHref}
              key={route.id}
            >
              {route.label}
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

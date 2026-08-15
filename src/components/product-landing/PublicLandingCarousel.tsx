"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicLandingCarouselItem } from "@/lib/product-landing-carousel";

export function PublicLandingCarousel({
  items,
  eyebrow = "Boundary First UX · Traverse / Inspect",
  title = "Move across the public work without losing where you are.",
  description = "Each card is one bounded public representation. Traverse the sequence, inspect a page, or keep the larger set visible as context.",
}: {
  items: PublicLandingCarouselItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeItem = items[activeIndex];
  const displayEyebrow =
    eyebrow === "Boundary First UX · Public landing pages"
      ? "Boundary First Labs · Public work"
      : eyebrow;

  const moveTo = useCallback(
    (nextIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(items.length - 1, nextIndex));
      setActiveIndex(boundedIndex);
      itemRefs.current[boundedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (activeIndex >= items.length && items.length > 0) {
      setActiveIndex(items.length - 1);
    }
  }, [activeIndex, items.length]);

  if (items.length === 0 || !activeItem) return null;

  return (
    <section
      aria-labelledby="public-landing-carousel-title"
      className="border-y border-border bg-card/55 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              {displayEyebrow}
            </p>
            <h2
              className="mt-3 max-w-4xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
              id="public-landing-carousel-title"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3" aria-label="Carousel controls">
            <p className="min-w-20 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted" aria-live="polite">
              {String(activeItem.ordinal).padStart(2, "0")} / {String(activeItem.total).padStart(2, "0")}
            </p>
            <button
              aria-label="Previous public landing page"
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeIndex === 0}
              onClick={() => moveTo(activeIndex - 1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              aria-label="Next public landing page"
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeIndex === items.length - 1}
              onClick={() => moveTo(activeIndex + 1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 border border-border bg-background p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-border px-1 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                Current boundary
              </span>
              <span className="border border-border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.11em]">
                {activeItem.groupLabel}
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-muted">
              finite sequence · no autoplay · no wrap
            </span>
          </div>

          <ol
            aria-label="Public landing pages"
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveTo(activeIndex - 1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveTo(activeIndex + 1);
              }
            }}
            tabIndex={0}
          >
            {items.map((item, index) => {
              const active = index === activeIndex;
              return (
                <li
                  aria-current={active ? "true" : undefined}
                  className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[42%] xl:w-[34%]"
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                >
                  <article
                    className={`flex min-h-80 h-full flex-col border p-5 sm:p-6 ${
                      active ? "border-foreground bg-card" : "border-border bg-background"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                        {item.groupLabel}
                      </span>
                      <span className="font-mono text-[9px] font-semibold tabular-nums text-foreground-muted">
                        {String(item.ordinal).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-foreground-muted">
                      {item.description}
                    </p>
                    <Link
                      className="mt-auto inline-flex min-h-11 items-center pt-8 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"
                      href={item.href}
                    >
                      Inspect page
                      <CornerDownRight aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

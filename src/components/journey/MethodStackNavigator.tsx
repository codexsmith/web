'use client';

import { ArrowLeft, ArrowRight, CircleDot } from "lucide-react";
import { useState } from "react";
import { asRecord, asRecordArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";
import practiceProjection from "@/content/public-projections/practice.json";

const payload = asRecord(practiceProjection.payload);
const stack = asRecord(payload.publicMethodStack);
const layers = asRecordArray(stack.publicCompression);

export function MethodStackNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = layers[activeIndex] ?? layers[0] ?? {};

  const move = (offset: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + offset;
      return Math.max(0, Math.min(layers.length - 1, next));
    });
  };

  return (
    <section className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="method-stack">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            {firstText(stack.title)}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">
            {firstText(stack.headline)}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-foreground-muted">
            {firstText(stack.purpose)}
          </p>
        </div>

        <div className="mt-10 grid gap-0 border border-border lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="border-b border-border bg-card/65 p-3 lg:border-b-0 lg:border-r">
            <p className="px-2 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Select the layer your question requires
            </p>
            <div className="mt-1 grid gap-1" role="tablist" aria-label="Boundary First method stack">
              {layers.map((layer, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    aria-selected={selected}
                    className={`grid grid-cols-[2rem_1fr] gap-3 border px-3 py-3 text-left ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent hover:border-border hover:bg-background"
                    }`}
                    key={firstText(layer.id) || String(index)}
                    onClick={() => setActiveIndex(index)}
                    role="tab"
                    type="button"
                  >
                    <span className="font-mono text-[9px]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-serif text-lg font-semibold">{firstText(layer.label)}</span>
                      <span className={`mt-1 block font-mono text-[8px] font-semibold uppercase tracking-[0.11em] ${selected ? "text-background/60" : "text-foreground-muted"}`}>
                        {firstText(layer.publicVerb)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="relative overflow-hidden bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10" role="tabpanel">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3rem_3rem]" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-primary-foreground-muted">
                    {String(activeIndex + 1).padStart(2, "0")} · {firstText(active.role)}
                  </p>
                  <h3 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                    {firstText(active.label)}
                  </h3>
                </div>
                <span className="border border-primary-foreground/25 bg-primary-foreground/[0.05] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em]">
                  {firstText(active.publicVerb)}
                </span>
              </div>

              <p className="mt-7 max-w-4xl font-serif text-2xl font-semibold leading-9 sm:text-3xl sm:leading-10">
                {firstText(active.question)}
              </p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-primary-foreground-secondary">
                {firstText(active.oneLine)}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/20 pt-5">
                <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
                  <CircleDot aria-hidden="true" className="h-3.5 w-3.5" />
                  Status · {firstText(active.status)}
                </span>
                <div className="flex gap-2">
                  <button
                    aria-label="Previous method layer"
                    className="grid h-10 w-10 place-items-center border border-primary-foreground/25 disabled:opacity-30"
                    disabled={activeIndex === 0}
                    onClick={() => move(-1)}
                    type="button"
                  >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Next method layer"
                    className="grid h-10 w-10 place-items-center border border-primary-foreground/25 disabled:opacity-30"
                    disabled={activeIndex === layers.length - 1}
                    onClick={() => move(1)}
                    type="button"
                  >
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

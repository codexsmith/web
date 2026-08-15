'use client';

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { PRODUCT_LANDING_NAVIGATION } from "@/lib/product-landing-navigation";

const descriptions: Record<string, string> = {
  "boundary-first-ux": "Interaction and representation for complex systems.",
  "software-before-code": "Model the domain before implementation machinery.",
  "closure-driven-software-development": "Delivery as progressive, witnessed closure.",
  "boundary-first-weather": "Boundary and regime reasoning for forecast diagnosis.",
  "constitutional-law-and-jurisprudence": "Authority, consequence, contest, and repair.",
  schemathematics: "Schemas as consequential mathematical objects.",
  "boundary-first-chess": "Reachable states, pressure, closure, and repair in chess.",
  "boundary-first-soccer": "Temporary closures constructed through an adversarial field.",
  "corpus-forge": "Governed knowledge transformation with provenance intact.",
  "agency-representation-audit": "Inspect authority, action, consequence, and accountability.",
};

export function PublicLandingRail({ currentId }: { currentId?: string }) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="border-b border-border bg-card/55 px-5 py-8 sm:px-8" aria-label="Explore public Boundary First pages">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Public field guide</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Choose another lens.</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button className="grid h-10 w-10 place-items-center border border-border bg-background hover:bg-card" type="button" onClick={() => move(-1)} aria-label="Previous public pages">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-border bg-background hover:bg-card" type="button" onClick={() => move(1)} aria-label="Next public pages">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={railRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
          {PRODUCT_LANDING_NAVIGATION.map((item, index) => {
            const current = item.id === currentId;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`group min-h-44 w-[17rem] shrink-0 snap-start border p-5 transition-transform hover:-translate-y-1 sm:w-[20rem] ${current ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-background"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${current ? "text-primary-foreground-muted" : "text-foreground-muted"}`}>
                    {item.group}
                  </span>
                  <span className={`font-mono text-[9px] ${current ? "text-primary-foreground-muted" : "text-foreground-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold leading-7">{item.label}</h3>
                <p className={`mt-3 text-sm leading-6 ${current ? "text-primary-foreground-secondary" : "text-foreground-muted"}`}>
                  {descriptions[item.id]}
                </p>
                <span className="mt-5 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                  {current ? "Current lens" : "Open lens"}
                  {!current ? <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

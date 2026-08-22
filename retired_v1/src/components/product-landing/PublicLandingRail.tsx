'use client';

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PRODUCT_LANDING_NAVIGATION } from "@/lib/product-landing-navigation";
import { PublicPageInstrument } from "./PublicPageInstrument";

const FIELD_GUIDE_SLOT_ID = "public-field-guide-slot";

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

function subscribe() {
  return () => {};
}

function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function PublicLandingRail({ currentId }: { currentId?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  const target = hydrated
    ? document.getElementById(FIELD_GUIDE_SLOT_ID)
    : null;

  const fieldGuide = target
    ? createPortal(
        <aside
          className="mb-12 border-b border-primary-foreground/15 pb-10"
          aria-label="Explore public Boundary First pages"
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-brand-gold" aria-hidden="true" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  Public field guide · continuation surface
                </p>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-foreground sm:text-4xl">
                Choose another lens.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-primary-foreground-secondary">
                You have reached the end of this projection. Continue through another governed view of the same Boundary First corpus.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                className="grid h-10 w-10 place-items-center border border-primary-foreground/20 bg-primary-foreground/[0.04] text-primary-foreground transition-colors hover:border-primary-foreground/45 hover:bg-primary-foreground/[0.08]"
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous public pages"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                className="grid h-10 w-10 place-items-center border border-primary-foreground/20 bg-primary-foreground/[0.04] text-primary-foreground transition-colors hover:border-primary-foreground/45 hover:bg-primary-foreground/[0.08]"
                type="button"
                onClick={() => move(1)}
                aria-label="Next public pages"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-color:rgba(248,243,232,.25)_transparent] [scrollbar-width:thin]"
          >
            {PRODUCT_LANDING_NAVIGATION.map((item, index) => {
              const current = item.id === currentId;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`group relative min-h-44 w-[17rem] shrink-0 snap-start overflow-hidden border p-5 transition-all hover:-translate-y-1 sm:w-[20rem] ${
                    current
                      ? "border-brand-gold/65 bg-brand-gold/[0.09] text-primary-foreground"
                      : "border-primary-foreground/15 bg-primary-foreground/[0.035] text-primary-foreground hover:border-primary-foreground/35 hover:bg-primary-foreground/[0.065]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-0.5 ${current ? "bg-brand-gold" : "bg-primary-foreground/20 group-hover:bg-brand-gold/60"}`}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${
                        current ? "text-brand-gold" : "text-primary-foreground-muted"
                      }`}
                    >
                      {item.group}
                    </span>
                    <span className="font-mono text-[9px] text-primary-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold leading-7">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground-secondary">
                    {descriptions[item.id]}
                  </p>
                  <span className="mt-5 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                    {current ? "Current lens" : "Open lens"}
                    {!current ? (
                      <ArrowRight
                        className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>,
        target,
      )
    : null;

  return (
    <>
      <PublicPageInstrument currentId={currentId} />
      {fieldGuide}
    </>
  );
}

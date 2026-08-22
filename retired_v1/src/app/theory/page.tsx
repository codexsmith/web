import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, CircleDot, Layers3, Sigma } from "lucide-react";
import { LayerContext } from "@/components/public-interface/LayerContext";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Theory",
  description:
    "Orientation to the Boundary First Labs formal core: Boundary Theory, Distinction Space, Formal Grammars, and Representational Mechanics.",
  alternates: { canonical: "/theory" },
};

const formalObjects = [
  {
    title: "Boundary Theory",
    description:
      "The formal context for what boundaries distinguish, contain, expose, and constrain across representations and systems.",
    href: "/domain/boundary-theory",
    icon: CircleDot,
  },
  {
    title: "Distinction Space",
    description:
      "A formal context for distinctions, admissibility, neighboring states, and the structured space in which representations can differ.",
    href: "/domain/distinction-space",
    icon: Layers3,
  },
  {
    title: "Formal Grammars",
    description:
      "The production rules, admissible forms, parsing boundaries, and promotion rules by which representations become generative.",
    href: "/domain/formal-grammars",
    icon: Braces,
  },
  {
    title: "Representational Mechanics",
    description:
      "The bridge between formal structure and the mechanics of changing, comparing, transporting, and testing representations.",
    href: "/domain/representational-mechanics",
    icon: Sigma,
  },
] as const;

export default function TheoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LayerContext
        layer={{ index: 5, label: "Formal core" }}
        outward={{ label: "Back to research", href: "/research" }}
      />

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">Formal core</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">The deepest representation is available without becoming the front door.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground-secondary">This layer orients readers toward definitions, derivations, formal objects, and theorem-level material. The public practice can be used and evaluated without requiring this layer first.</p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {formalObjects.map(({ title, description, href, icon: Icon }) => (
              <Link className="group bg-card p-6 sm:p-8" href={href} key={title}>
                <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">{description}</p>
                <span className="mt-6 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Open canonical object <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Return outward</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Need the practical consequence instead?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">Move back outward through research, evidence, method, and software. The same corpus remains underneath; only the representation changes.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center border border-border bg-background px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]" href="/software">Start with software <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

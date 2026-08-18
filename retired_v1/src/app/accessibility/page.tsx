import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Keyboard, Route, ScanText } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildInquiryHref } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Boundary First Labs accessibility commitments for semantic equivalence, legible states, keyboard access, motion, and alternate representations.",
  alternates: { canonical: "/accessibility" },
};

const commitments = [
  {
    title: "Equivalent legible states",
    body: "Interactive, spatial, diagrammatic, and visual interfaces must expose an equivalent readable state rather than making the visual representation the only route to meaning.",
    icon: ScanText,
  },
  {
    title: "Keyboard and focus",
    body: "Core navigation and actions must remain reachable without pointer-only interaction, with visible focus and meaningful control labels.",
    icon: Keyboard,
  },
  {
    title: "Motion is not meaning",
    body: "Motion may reinforce structure but should not carry information that disappears for people who reduce or disable animation.",
    icon: Route,
  },
  {
    title: "Legibility before decoration",
    body: "Contrast, text weight, hierarchy, metadata, and evidence states should remain readable at ordinary brightness, zoom, and viewport sizes.",
    icon: Eye,
  },
] as const;

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Accessibility statement · working public commitment</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">Accessibility is part of the representation, not a decorative layer applied afterward.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">Boundary First Labs treats accessibility as a systems constraint: the public meaning of an interface should survive differences in vision, input method, motion tolerance, device, viewport, and representational form.</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {commitments.map(({ title, body, icon: Icon }) => (
            <article className="bg-background p-6 sm:p-8" key={title}>
              <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Found an accessibility defect?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground-muted">Treat it as a system defect worth recording, not as a personal preference. Include the route, device or interaction constraint, what became unreachable or unclear, and the repair you expected if you know it.</p>
          </div>
          <Link className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground" href={buildInquiryHref({ intent: "accessibility", source: "/accessibility", topic: "Accessibility defect or feedback" })}>Report an accessibility issue <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

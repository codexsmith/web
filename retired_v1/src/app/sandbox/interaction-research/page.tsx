import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck } from "lucide-react";
import { ClosureEngineDemo } from "@/components/closure-engine-demo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  antiCharismaControls,
  boundaryTimelineStages,
  depthSemantics,
  interactionGraduationRule,
  interactionResearchStatus,
  lexiconDistinction,
  motionLaws,
  motionSemantics,
  syntheticTimelineExample,
  systemEvents,
  universalActions,
  workbenchOperators,
} from "@/lib/interaction-research";

export const metadata: Metadata = {
  title: "Interaction Research",
  description:
    "Boundary First Labs experiential R&D packets for physical notation, interaction language, representational motion, timeline semantics, and anti-charisma governance.",
  alternates: { canonical: "/sandbox/interaction-research" },
};

const researchPackets = [
  {
    id: "closure-engine",
    label: "P4.1 · Closure Engine",
    title: "Physical notation only when the object carries semantics.",
    body: "The bounded demonstration below uses vessel, pipe, valve, gauge, leak, and condenser as operational objects in a synthetic software release decision. The metaphor is rejected anywhere it stops doing real representational work.",
  },
  {
    id: "lexicon",
    label: "P4.2 · Interaction lexicon",
    title: "Name who acts, what transforms, and what pushes back.",
    body: "The candidate lexicon separates investigator actions from apparatus operators and system events so interface verbs do not silently collapse agency, transformation, and consequence into one animation vocabulary.",
  },
  {
    id: "motion",
    label: "P4.3 · Motion laws",
    title: "Movement should preserve meaning, not decorate navigation.",
    body: "Representational depth and motion are treated as semantic transforms. The conservation laws below are design tests for any future spatial interface, not a mandate that the site become three-dimensional.",
  },
  {
    id: "timeline",
    label: "P4.4 · Boundary Timeline",
    title: "History should expose both sequence and intersecting systems.",
    body: "The candidate causal chronology is tested against one synthetic release path so longitudinal history can retain latitudinal context: ownership, evidence, consequence, adaptation, and repair remain addressable at each step.",
  },
  {
    id: "doge-test",
    label: "P4.5 · Anti-charisma test",
    title: "A method must be able to refuse the person using it.",
    body: "The DOGE-style diagnostic asks whether a persuasive operator can select the intervention first and perform analysis afterward. These controls make that failure mode inspectable without claiming that a checklist can solve governance by itself.",
  },
] as const;

export default function InteractionResearchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Experiential R&D · P4
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Interaction language must earn its semantics.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            This surface preserves and tests the more experimental Boundary First interaction ideas without promoting them into production standards. Each packet is tied to a concrete object, a declared semantic role, an accessibility equivalent, and a bounded user-journey reason.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <div className="border border-border bg-card p-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Current standing</p>
              <p className="mt-3 text-sm leading-7">{interactionResearchStatus}</p>
            </div>
            <div className="border border-border bg-card p-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Graduation rule</p>
              <p className="mt-3 text-sm leading-7">{interactionGraduationRule}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-5">
            {researchPackets.map((packet) => (
              <a className="bg-background p-5 hover:bg-card" href={`#${packet.id}`} key={packet.id}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{packet.label}</p>
                <h2 className="mt-3 font-serif text-xl font-semibold leading-7">{packet.title}</h2>
                <p className="mt-3 text-xs leading-6 text-foreground-muted">{packet.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="closure-engine">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">P4.1 · one bounded demonstration</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Closure Engine</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">Toggle the represented release conditions and residual leak. The physical vocabulary is valid here only because every object maps to a declared system function.</p>
          </div>
          <ClosureEngineDemo />
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20" id="lexicon">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">P4.2 · candidate canonical lexicon</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Action, operator, event.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["Investigator actions", universalActions],
              ["Workbench operators", workbenchOperators],
              ["System events", systemEvents],
            ].map(([label, items]) => (
              <article className="border border-border bg-background p-5" key={label as string}>
                <h3 className="font-serif text-2xl font-semibold">{label as string}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(items as readonly string[]).map((item) => (
                    <span className="border border-border bg-card px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]" key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {lexiconDistinction.map((item) => (
              <div className="bg-background p-5" key={item.term}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{item.term}</p>
                <p className="mt-3 text-sm leading-6">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="motion">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">P4.3 · representational depth</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Motion carries a contract.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {depthSemantics.map((item) => (
              <article className="border border-border bg-card p-5" key={item.position}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{item.position}</p>
                <p className="mt-3 text-sm leading-7">{item.meaning}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {motionSemantics.map((item) => (
              <div className="bg-background p-5" key={item.motion}>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-muted">{item.motion}</p>
                <p className="mt-2 font-serif text-xl font-semibold">{item.operation}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {motionLaws.map((item) => (
              <article className="border border-border p-5" key={item.law}>
                <h3 className="font-serif text-xl font-semibold">{item.law}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground-muted">{item.question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20" id="timeline">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">P4.4 · Boundary Timeline</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Longitudinal sequence, latitudinal context.</h2>
          <div className="mt-8 overflow-x-auto pb-3">
            <ol className="flex min-w-max items-stretch gap-2">
              {boundaryTimelineStages.map((stage, index) => (
                <li className="w-44 border border-border bg-background p-4" key={stage}>
                  <span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="mt-3 block font-serif text-lg">{stage}</strong>
                  <p className="mt-2 text-xs leading-5 text-foreground-muted">{syntheticTimelineExample[index]?.[1]}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-foreground-muted">Accessible equivalent: the chronology above remains a normal ordered list; future spatial or animated timeline views must preserve the same stage identity, event description, and cross-system relations.</p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20" id="doge-test">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <ShieldCheck className="h-6 w-6 text-foreground-muted" aria-hidden="true" />
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">P4.5 · anti-charisma governance</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Could the method be used to perform a predetermined answer?</h2>
              <p className="mt-5 text-sm leading-7 text-foreground-muted">If a persuasive actor can choose the intervention first and make the interface look analytical afterward, the method or interface still needs stronger epistemic governance.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {antiCharismaControls.map((control) => (
                <article className="border border-border bg-card p-5" key={control.id}>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">{control.label}</p>
                  <p className="mt-3 text-sm leading-7">{control.question}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 sm:p-8">
            <FlaskConical className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Return to the sandbox registry</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">These packets live beside the representation lab and bounded testbeds rather than inside the production method stack.</p>
            <Link className="mt-6 inline-flex min-h-11 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline" href="/sandbox">Open sandbox registry <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </article>
          <article className="border border-border bg-card p-6 sm:p-8">
            <ShieldCheck className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Compare against governed evidence</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">A compelling interaction pattern is still only a representation until evidence, provenance, and claim standing support something stronger.</p>
            <Link className="mt-6 inline-flex min-h-11 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline" href="/evidence">Open evidence layer <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, Boxes, CircleDotDashed, FlaskConical, Gauge, Layers3, Move3d, ScanSearch } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BoundaryFirstUxTimeline } from "./BoundaryFirstUxTimeline";
import { PublicLandingRail } from "./PublicLandingRail";

const principles = [
  ["01", "Bound every view", "Every representation is useful under a declared scope—and visibly partial outside it."],
  ["02", "Preserve identity", "Objects keep semantic identity and provenance while representation, resolution, or perspective changes."],
  ["03", "Make hidden structure tangible", "Reveal what was excluded without pretending it began existing when the interface exposed it."],
  ["04", "Preserve consequence and path", "Cost, obligation, evidence, responsibility, and consequence remain traceable across boundaries."],
  ["05", "Closure is earned", "Closure is a scoped system state, not a button, animation, or final milestone."],
] as const;

const grammar = ["Orient", "Traverse", "Inspect", "Reveal", "Reframe", "Trace", "Gate", "Stress", "Repair", "Promote"] as const;

const projections = [
  { icon: Move3d, label: "World / experiential", title: "Make structure physically imaginable.", body: "A coherent conceptual world can use depth, cutaways, instruments, motion, and game-like mechanics when every visual operation carries semantic meaning." },
  { icon: Layers3, label: "Guided / public", title: "Let people operate the idea before learning the vocabulary.", body: "Familiar patterns, progressive disclosure, and explicit context let ordinary inquiry retain the same semantic world without requiring expert notation." },
  { icon: Gauge, label: "Research / workbench", title: "Expose the instrument panel.", body: "Expert projections preserve provenance, comparison, defects, construction, validation, maintenance, and repair as inspectable professional instruments." },
] as const;

export function BoundaryFirstUxLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-border bg-[#09182b] px-5 py-16 text-brand-ivory sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 [background-image:linear-gradient(rgba(248,243,232,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,232,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -right-36 top-14 -z-10 h-[34rem] w-[34rem] rounded-full border border-brand-gold/25" />
        <div className="pointer-events-none absolute -right-12 top-40 -z-10 h-[22rem] w-[22rem] rounded-full border border-brand-blue/30" />
        <div className="pointer-events-none absolute right-24 top-72 -z-10 h-3 w-3 rounded-full bg-brand-gold shadow-[0_0_0_24px_rgba(200,162,74,.07),0_0_0_72px_rgba(200,162,74,.035)]" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.55fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Boundary First UX · working public standard</span>
              <span className="border border-white/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">Launch candidate</span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-8xl">Design the boundary,<br />not the screen.</h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-white/70 sm:text-xl">Every interface is a bounded representation of a larger system. Boundary First UX makes that boundary operable so people can change resolution, perspective, and context without losing identity, provenance, consequence, or closure.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="inline-flex min-h-12 items-center bg-brand-gold px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-black" href="#flagship">Perform the flagship <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
              <Link className="inline-flex min-h-12 items-center border border-white/20 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white hover:border-white/45" href="/sandbox/boundary-first-ux">Enter the laboratory <FlaskConical className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>

          <aside className="border border-white/15 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Current representation</span>
              <CircleDotDashed className="h-5 w-5 text-brand-gold" aria-hidden="true" />
            </div>
            <div className="mt-7 border border-white/15 p-5">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-white/42"><span>Inside</span><span>Outside</span></div>
              <div className="relative mt-5 h-28 overflow-hidden border border-brand-gold/55 bg-brand-gold/[0.06]">
                <div className="absolute inset-y-0 right-0 w-[34%] border-l border-dashed border-white/25 bg-white/[0.025]" />
                <span className="absolute left-4 top-4 font-serif text-xl font-semibold">Useful local view</span>
                <span className="absolute bottom-4 left-4 max-w-52 text-xs leading-5 text-white/55">What does this frame admit, defer, or hide?</span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">boundary</span>
              </div>
            </div>
            <p className="mt-5 font-serif text-2xl font-semibold leading-8">“Oh. I can see the system now.”</p>
            <p className="mt-3 text-sm leading-7 text-white/55">That is the north star. Not novelty. Not visual density. Legibility across consequential boundaries.</p>
          </aside>
        </div>
      </section>

      <PublicLandingRail currentId="boundary-first-ux" />

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">The paradigm</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl">Every interface is a boundary instrument.</h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">The design problem is not only what appears on a screen. It is what the representation admits, excludes, compresses, reveals, makes actionable, and preserves when context changes.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {principles.map(([number, title, body], index) => (
                <article className={`min-h-56 bg-card p-6 ${index === principles.length - 1 ? "sm:col-span-2" : ""}`} key={title}>
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-semibold text-foreground-muted">{number}</span><ScanSearch className="h-4 w-4 text-foreground-muted" aria-hidden="true" /></div>
                  <h3 className="mt-8 font-serif text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-foreground-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20" id="flagship">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Flagship demonstration</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] sm:text-6xl">The Green Project Was Inside a Larger System.</h2>
            <p className="mt-5 text-base leading-8 text-foreground-muted">Begin with a credible, successful capital-delivery view. Then let the user discover the seam: a ten-year maintenance obligation exists beyond the celebrated project boundary. The experience should teach the paradigm by operation before explaining it by doctrine.</p>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-3">
            {[
              ["Act I · Trust", "Orient → Inspect", "Accept the local view as useful, then make its scope inspectable without accusing it of being false."],
              ["Act II · Discovery", "Reveal → Reframe → Stress → Trace", "Expose the omitted obligation, shift toward consequence, test the handoff, and preserve the causal path."],
              ["Act III · Reconstruction", "Promote → Repair → Closure", "Place the project inside the lifecycle it actually inhabits, repair the obligation path, and declare scoped closure."],
            ].map(([label, steps, body]) => (
              <article className="border border-border bg-background p-6" key={label}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{label}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{steps}</h3>
                <p className="mt-4 text-sm leading-7 text-foreground-muted">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10"><BoundaryFirstUxTimeline /></div>
        </div>
      </section>

      <section className="border-b border-border bg-[#0f2138] px-5 py-14 text-brand-ivory sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Renderer independence</p><h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">One semantic world. Different instruments.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-white/58">Boundary First semantics belong to the represented world, not to any one renderer. The projection can change while identity, provenance, consequence, and operation remain intact.</p>
          </div>
          <div className="mt-9 grid gap-3 lg:grid-cols-3">
            {projections.map(({ icon: Icon, label, title, body }) => (
              <article className="border border-white/12 bg-white/[0.035] p-6" key={label}><Icon className="h-5 w-5 text-brand-gold" aria-hidden="true" /><p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">{label}</p><h3 className="mt-3 font-serif text-2xl font-semibold leading-8">{title}</h3><p className="mt-4 text-sm leading-7 text-white/58">{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div><Boxes className="h-6 w-6 text-foreground-muted" aria-hidden="true" /><p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Interaction grammar</p><h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">A small grammar beneath a wild world.</h2><p className="mt-5 text-sm leading-7 text-foreground-muted">The visual apparatus can be cinematic, physical, playful, or instrument-like. The universal vocabulary should stay compact enough to transfer across renderers and domains.</p></div>
          <div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">{grammar.map((verb, index) => <div className="border border-border bg-card p-4" key={verb}><span className="font-mono text-[9px] text-foreground-muted">{String(index + 1).padStart(2, "0")}</span><strong className="mt-6 block font-serif text-xl">{verb}</strong></div>)}</div>
            <div className="mt-4 border border-border bg-primary p-5 text-primary-foreground"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted">State, not command</p><p className="mt-2 font-serif text-2xl font-semibold">Closure is not a world action.</p><p className="mt-2 text-sm leading-7 text-primary-foreground-secondary">Closure is achieved when the required paths reconcile under declared scope and conditions.</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20" id="sandbox">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Now break it</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6"><h2 className="max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">The standard is not the sandbox.</h2><p className="max-w-xl text-sm leading-7 text-foreground-muted">Experimentation can produce evidence, defects, or reusable methods. It does not silently promote an experiment into canon.</p></div>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {[
              ["Boundary First UX Laboratory", "/sandbox/boundary-first-ux", "Timeline, resolution navigation, and context admission as interactive pattern proofs."],
              ["Representation Laboratory", "/sandbox/representation-lab", "Compare visual grammars while keeping the governed object and claim boundary fixed."],
              ["Interaction Research", "/sandbox/interaction-research", "Test physical notation, motion laws, system events, and other experiential R&D."],
            ].map(([title, href, body], index) => (
              <Link className="group min-h-64 border border-border bg-background p-6 hover:bg-card" href={href} key={title}><div className="flex items-center justify-between"><FlaskConical className="h-5 w-5 text-foreground-muted" aria-hidden="true" /><span className="font-mono text-[9px] text-foreground-muted">0{index + 1}</span></div><h3 className="mt-8 font-serif text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-foreground-muted">{body}</p><span className="mt-7 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">Open experiment <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl border-y border-border py-12 sm:py-16"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Boundary First UX</p><h2 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] sm:text-7xl">Local simplicity without global amnesia.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-muted">Make complex systems tangible without erasing the larger system that gives the local view meaning.</p></div>
      </section>

      <SiteFooter />
    </main>
  );
}

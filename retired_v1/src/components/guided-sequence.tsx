"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleDot,
  GitBranch,
  Network,
  ShieldCheck,
} from "lucide-react";
import { useGraph } from "@/app/context/GraphContext";
import { asRecord, asString, asStringArray } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StartAudienceOnramp } from "@/components/start-audience-onramp";
import { ATLAS_HREF } from "@/lib/site-navigation";

type Scene = {
  number: number;
  eyebrow: string;
  title: string;
  body: string;
  nodeIds: string[];
  terms?: string[];
  action?: { href: string; label: string };
};

const SCENE_COUNT = 15;

export function GuidedSequence({ initialScene = 0 }: { initialScene?: number }) {
  const { nodes, setActiveNodeId } = useGraph();
  const [activeScene, setActiveScene] = useState(
    initialScene >= 0 && initialScene < SCENE_COUNT ? initialScene : 0,
  );
  const identity = nodes.find((node) => node.id === "identity");
  const mission = asRecord(identity?.mission);
  const vision = asRecord(identity?.vision);

  const scenes: Scene[] = [
      {
        number: 0,
        eyebrow: "The problem",
        title: "Every consequential system draws a boundary.",
        body:
          "What the system includes becomes visible and governable. What it excludes returns as defect, risk, contradiction, burden, or harm.",
        nodeIds: ["identity"],
        terms: ["Consequence", "Representation", "Standing"],
      },
      {
        number: 1,
        eyebrow: "Boundary First",
        title: asString(mission.method, "Declare the boundary. Preserve the invariant. Expose the defect. Restore the path to repair."),
        body:
          "Boundary First is the operating method: make the operative boundary explicit, name what must survive, expose where the system breaks, and preserve a lawful route back.",
        nodeIds: ["boundary-first"],
        terms: ["Boundary", "Invariant", "Defect", "Repair"],
      },
      {
        number: 2,
        eyebrow: "The roots",
        title: "The work begins in established disciplines.",
        body:
          "Information, computation, practical mechanics, physics, mathematics, and scientific method supply the roots. Lineage provides context and constraint, not borrowed authority.",
        nodeIds: ["mathematics", "physics", "computational-systems"],
        terms: ["Information", "Computation", "Mechanics", "Scientific method"],
      },
      {
        number: 3,
        eyebrow: "The synthesis",
        title: "Formal ideas meet the practices that make them answerable.",
        body:
          "Agentic computation, research methods, formal grammar, Agile and Lean practice, and systems engineering converge around representation, consequence, and closure.",
        nodeIds: ["constructive-humanist-agentics", "formal-grammars", "software-engineering-practice"],
      },
      {
        number: 4,
        eyebrow: "Lived convergence",
        title: "Recurring failures revealed a common mechanical shape.",
        body:
          "Professional software practice and independent research repeatedly met the same problem: systems fail when important relations, obligations, and repair paths fall outside the model.",
        nodeIds: ["software-engineering-practice", "systems-criticism"],
      },
      {
        number: 5,
        eyebrow: "On-ramps",
        title: "Enter through something you already know.",
        body:
          "Chess, soccer, software, maps, institutions, geometry, and physical boundaries are familiar doors into the same deeper questions.",
        nodeIds: ["on-ramps"],
        action: { href: "/domain/on-ramps", label: "Browse the on-ramps" },
      },
      {
        number: 6,
        eyebrow: "The formal object",
        title: "Distinction Space",
        body:
          "Before the full theory, meet the central formal object: a structured space in which distinctions, relations, admissibility, persistence, and change can be made explicit.",
        nodeIds: ["distinction-space"],
      },
      {
        number: 7,
        eyebrow: "The theoretical architecture",
        title: "Boundary Theory",
        body:
          "Distinction Theory, Admissibility Theory, and Emergence Theory form complementary facets around Distinction Space. They remain distinct so each claim keeps the right burden of proof.",
        nodeIds: ["boundary-theory", "distinction-theory", "admissibility-theory", "emergence-theory"],
      },
      {
        number: 8,
        eyebrow: "The applied discipline",
        title: "Representational Mechanics",
        body:
          "Representational Mechanics turns the theoretical architecture into an explicit discipline. Formal Grammars make its objects, transformations, constraints, and failure modes inspectable.",
        nodeIds: ["representational-mechanics", "formal-grammars"],
      },
      {
        number: 9,
        eyebrow: "Choose a path",
        title: "Follow the question that matters to you.",
        body:
          "Move through theory, computation, engineering, institutions, infrastructure, law, finance, criticism, public communication, or research operations without losing the shared context.",
        nodeIds: ["bfe", "governance-institutions", "infrastructure-repair", "corpus"],
        action: { href: ATLAS_HREF, label: "Open the atlas" },
      },
      {
        number: 10,
        eyebrow: "The work takes form",
        title: "Research is not a product, and a project is not a promise.",
        body:
          "Programs, projects, products, artifacts, services, and testbeds remain visibly distinct. Each advances under its own lifecycle, evidence, maintenance, and closure conditions.",
        nodeIds: ["products-testbeds", "bfe", "ai-forge"],
        action: { href: "/work", label: "See work and evidence" },
      },
      {
        number: 11,
        eyebrow: "The work enters relation",
        title: "Boundaries make collaboration coherent.",
        body:
          "Participation, advice, review, funding, contribution, authorship, ownership, endorsement, and institutional authority are different relations. Collaboration begins by declaring which relation actually exists.",
        nodeIds: ["identity", "products-testbeds"],
        action: { href: "/collaborate", label: "Explore collaboration" },
      },
      {
        number: 12,
        eyebrow: "Work earns promotion",
        title: "Appearance in the corpus does not create authority.",
        body:
          "Claims and instruments advance through source lineage, formalization, testing, negative cases, external contact, criticism, limitation, and repair—under gates proportionate to their domain.",
        nodeIds: ["corpus", "products-testbeds"],
        action: { href: "/work", label: "Inspect the promotion path" },
      },
      {
        number: 13,
        eyebrow: "The institution binds itself",
        title: "Purpose → invariants → authority → gates → standing → repair → continuity",
        body:
          "The lab applies the same scrutiny inward. Its present formation-stage reality, declared commitments, missing evidence, governance gaps, and repair obligations remain visible.",
        nodeIds: ["identity"],
        action: { href: "/about", label: "Open purpose, power, and repair" },
      },
      {
        number: 14,
        eyebrow: "Atlas reveal",
        title: asString(vision.compact, "A civilization in which growing power is matched by growing consequence literacy."),
        body:
          "The complete graph is now visible with its legend intact. Explore any record, return to this sequence, or switch to a direct conventional page whenever you need a plain answer.",
        nodeIds: nodes.filter((node) => node.id !== "identity").slice(0, 6).map((node) => node.id),
        action: { href: ATLAS_HREF, label: "Enter the full atlas" },
      },
    ];

  const scene = scenes[activeScene];
  const sceneNodes = scene.nodeIds
    .map((id) => nodes.find((node) => node.id === id))
    .filter(Boolean);
  const methodTerms = asStringArray(identity?.takeaways).slice(0, 4);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeScene === 0) {
      url.searchParams.delete("scene");
    } else {
      url.searchParams.set("scene", String(activeScene));
    }
    window.history.replaceState(
      { ...(window.history.state ?? {}), scene: activeScene },
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [activeScene]);

  function changeScene(nextScene: number) {
    setActiveScene(Math.max(0, Math.min(SCENE_COUNT - 1, nextScene)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border/60">
        <div className="mx-auto grid min-h-[38rem] w-full min-w-0 max-w-[96rem] grid-cols-[minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="min-w-0 overflow-hidden border-b border-border/60 px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
            <StartAudienceOnramp />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              Guided first passage
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-foreground-muted">
              Learn the legend before revealing the atlas.
            </p>
            <ol className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {scenes.map((item) => (
                <li className="shrink-0 snap-start" key={item.number}>
                  <button
                    aria-current={item.number === activeScene ? "step" : undefined}
                    aria-label={`${String(item.number).padStart(2, "0")} ${item.eyebrow}`}
                    className={`flex min-h-10 min-w-10 items-center gap-3 rounded-sm border px-3 text-left transition-colors lg:w-full ${
                      item.number === activeScene
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent text-foreground-muted hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                    onClick={() => changeScene(item.number)}
                    type="button"
                  >
                    <span className="font-mono text-[11px] font-semibold">
                      {String(item.number).padStart(2, "0")}
                    </span>
                    <span className="hidden text-xs font-semibold lg:block">{item.eyebrow}</span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div className="grid min-w-0 lg:grid-rows-[1fr_auto]">
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
              <article className="min-h-[30rem] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 xl:px-14">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card font-mono text-[11px] font-semibold">
                      {String(scene.number).padStart(2, "0")}
                    </span>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                      {scene.eyebrow}
                    </p>
                  </div>
                  <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                    {scene.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-foreground-muted sm:text-xl sm:leading-9">
                    {scene.body}
                  </p>
                  {scene.terms && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="New terms introduced">
                      {scene.terms.map((term) => (
                        <li className="rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" key={term}>
                          {term}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {scene.action && (
                    <Link
                      className="inline-flex min-h-12 items-center rounded-sm bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                      href={scene.action.href}
                      onClick={() => {
                        const firstNode = scene.nodeIds[0];
                        if (firstNode) setActiveNodeId(firstNode);
                      }}
                    >
                      {scene.action.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    className="inline-flex min-h-12 items-center rounded-sm border border-border bg-card px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                    href={ATLAS_HREF}
                  >
                    Skip to atlas
                  </Link>
                </div>
              </article>

              <div className="relative overflow-hidden border-t border-border bg-primary p-5 text-primary-foreground sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_1.5rem,currentColor_1.55rem,transparent_1.65rem)] [background-size:5rem_5rem]" />
                <div className="relative flex min-h-[30rem] flex-col justify-between">
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-secondary">
                    <span>Context at this scale</span>
                    <span>{sceneNodes.length} records</span>
                  </div>
                  <div className="my-10 space-y-3">
                    {sceneNodes.map((node, index) => {
                      if (!node) return null;
                      const Icon = node.icon ?? CircleDot;
                      return (
                        <Link
                          className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-4 border border-primary-foreground/25 bg-primary-foreground/[0.06] p-4 backdrop-blur-sm transition-colors hover:bg-primary-foreground/[0.12]"
                          href={`/domain/${node.id}`}
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                        >
                          <span className="flex h-11 w-11 items-center justify-center border border-primary-foreground/25">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-secondary">
                              {asString(node.role, `Record ${index + 1}`)}
                            </span>
                            <span className="mt-1 block font-serif text-lg font-semibold">{node.label}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-1" />
                        </Link>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-4 gap-2" aria-label="Boundary First method">
                    {(methodTerms.length === 4
                      ? methodTerms
                      : ["Boundary", "Invariant", "Defect", "Repair"]
                    ).map((term, index) => {
                      const icons = [CircleDot, ShieldCheck, GitBranch, Network];
                      const Icon = icons[index];
                      return (
                        <div className="border-t border-primary-foreground/30 pt-3" key={term}>
                          <Icon className="h-4 w-4" />
                          <span className="mt-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground-secondary">
                            {term}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <nav aria-label="Sequence controls" className="flex items-center justify-between border-t border-border bg-card px-5 py-4 sm:px-10">
              <button
                className="inline-flex min-h-11 items-center px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] disabled:opacity-30"
                disabled={activeScene === 0}
                onClick={() => changeScene(activeScene - 1)}
                type="button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              <span className="hidden items-center gap-2 text-sm text-foreground-muted sm:flex">
                <BookOpen className="h-4 w-4" />
                Scene {activeScene + 1} of {scenes.length}
              </span>
              <button
                className="inline-flex min-h-11 items-center rounded-sm bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground disabled:opacity-30"
                disabled={activeScene === scenes.length - 1}
                onClick={() => changeScene(activeScene + 1)}
                type="button"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

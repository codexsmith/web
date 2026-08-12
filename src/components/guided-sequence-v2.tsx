"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useGraph } from "@/app/context/GraphContext";
import { EntranceSwitcher } from "@/components/entrance/EntranceSwitcher";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SceneVisualizer } from "@/components/scene-visualizer";
import introConfig from "@/content/introductory_experience_v0_5.json";
import { ATLAS_HREF, START_HREF } from "@/lib/site-navigation";
import {
  collectStartSceneReferenceIds,
  START_VIRTUAL_NODES,
  type StartSceneStep,
} from "@/lib/start-sequence";

type Scene = {
  id: string;
  number: number;
  eyebrow: string;
  title: string;
  body: string;
  nodeIds: string[];
  terms?: string[];
  action?: { href: string; label: string };
  question?: string;
  visualMode?: string;
  layoutPreset?: string;
};

const SCENE_COUNT = introConfig.experiences[0].steps.length;

function normalizeScene(scene: number) {
  return scene >= 0 && scene < SCENE_COUNT ? scene : 0;
}

export function GuidedSequenceV2({
  initialScene = 0,
}: {
  initialScene?: number;
}) {
  const router = useRouter();
  const { nodes, setActiveNodeId } = useGraph();
  const normalizedInitialScene = normalizeScene(initialScene);
  const [activeScene, setActiveScene] = useState(normalizedInitialScene);
  const [routeScene, setRouteScene] = useState(normalizedInitialScene);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[aria-current="step"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeScene]);

  if (routeScene !== normalizedInitialScene) {
    setRouteScene(normalizedInitialScene);
    setActiveScene(normalizedInitialScene);
  }

  const steps = introConfig.experiences[0].steps as StartSceneStep[];

  const scenes: Scene[] = steps.map((step) => ({
    id: step.id,
    number: step.order,
    eyebrow: step.title,
    title: step.headline,
    body: step.summary,
    nodeIds: collectStartSceneReferenceIds(step),
    terms: step.newTerms ?? [],
    action: step.action,
    question: step.transitionQuestion,
    visualMode: step.visualMode,
    layoutPreset: step.layoutPreset,
  }));

  const scene = scenes[activeScene];
  const sceneNodes = scene.nodeIds
    .map(
      (id) => nodes.find((node) => node.id === id) ?? START_VIRTUAL_NODES[id],
    )
    .filter(Boolean);

  function changeScene(nextScene: number) {
    const boundedScene = Math.max(0, Math.min(SCENE_COUNT - 1, nextScene));
    setActiveScene(boundedScene);
    router.push(
      boundedScene === 0 ? "/learn" : `/learn/${scenes[boundedScene].id}`,
      { scroll: false },
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <EntranceSwitcher
        current="repair"
        milestone={
          activeScene === 0
            ? "orientation"
            : activeScene === SCENE_COUNT - 1
              ? "arrival"
              : "route"
        }
      />
      <section className="border-b border-border/60">
        <div className="mx-auto min-h-[34rem] w-full min-w-0 max-w-[96rem]">
          <div className="min-w-0 overflow-hidden border-b border-border/60 px-5 py-3 sm:px-8 sm:py-4 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Guided introduction
                </p>
                <p className="text-sm leading-6 text-foreground/70">
                  Fifteen short scenes from consequence to repair.
                </p>
              </div>
              <p className="hidden">
                About 8-10 minutes · every scene has a stable URL
              </p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                8-10 minutes
              </p>
            </div>
            <ol
              ref={listRef}
              className="mt-2 flex scroll-smooth snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {scenes.map((item) => (
                <li className="shrink-0 snap-center" key={item.number}>
                  <button
                    aria-current={
                      item.number === activeScene ? "step" : undefined
                    }
                    aria-label={`${String(item.number).padStart(2, "0")} ${
                      item.eyebrow
                    }`}
                    className={`flex min-h-10 items-center gap-2 whitespace-nowrap rounded-sm border px-3 text-left transition-colors ${
                      item.number === activeScene
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                    onClick={() => changeScene(item.number)}
                    type="button"
                  >
                    <span className="font-mono text-[11px] font-semibold">
                      {String(item.number).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold">
                      {item.eyebrow}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid min-w-0 lg:grid-rows-[1fr_auto]">
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
              <article className="min-h-[26rem] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 xl:px-14">
                <div aria-atomic="true" aria-live="polite">
                  <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                    {scene.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-foreground/70 sm:text-xl sm:leading-9">
                    {scene.body}
                  </p>
                  {scene.question && (
                    <p className="mt-5 max-w-3xl border-t border-border/60 pt-4 text-sm leading-6 text-foreground/65">
                      <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Next question
                      </span>
                      {scene.question}
                    </p>
                  )}
                  {scene.terms && scene.terms.length > 0 && (
                    <ul
                      className="mt-5 flex flex-wrap gap-2"
                      aria-label="New terms introduced"
                    >
                      {scene.terms.map((term) => (
                        <li
                          className="rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
                          key={term}
                        >
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
                  {scene.action?.href !== ATLAS_HREF && (
                    <Link
                      className="inline-flex min-h-12 items-center rounded-sm border border-border bg-card px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                      href={ATLAS_HREF}
                    >
                      Skip to atlas
                    </Link>
                  )}
                  <Link
                    className="inline-flex min-h-12 items-center rounded-sm border border-border bg-background px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                    href={START_HREF}
                  >
                    Choose another path
                  </Link>
                </div>
              </article>

              <div className="relative overflow-hidden border-t border-border bg-primary p-5 text-primary-foreground sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_1.5rem,currentColor_1.55rem,transparent_1.65rem)] [background-size:5rem_5rem]" />
                <div className="relative z-10">
                  <SceneVisualizer
                    scene={scene}
                    sceneNodes={sceneNodes}
                    onNodeClick={setActiveNodeId}
                  />
                </div>
              </div>
            </div>

            <nav
              aria-label="Sequence controls"
              className="flex items-center justify-between border-t border-border bg-card px-5 py-4 sm:px-10"
            >
              <button
                className="inline-flex min-h-11 items-center px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] disabled:opacity-30"
                disabled={activeScene === 0}
                onClick={() => changeScene(activeScene - 1)}
                type="button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              <span className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <BookOpen className="h-4 w-4" />
                Scene {activeScene + 1} of {scenes.length}
              </span>
              <button
                className="inline-flex min-h-11 items-center rounded-sm bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground disabled:opacity-30"
                disabled={activeScene === scenes.length - 1}
                onClick={() => changeScene(activeScene + 1)}
                type="button"
              >
                {activeScene === scenes.length - 1 ? "Complete" : "Next"}
                {activeScene < scenes.length - 1 && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

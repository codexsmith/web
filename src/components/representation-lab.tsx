"use client";

import { useMemo, useState } from "react";
import { SceneVisualizer } from "@/components/scene-visualizer";

const PRESETS = [
  "single-consequence",
  "four-question-wheel",
  "many-to-one-convergence",
  "dual-node-overlap",
  "on-ramp-chooser",
  "formal-object-explorer",
  "faceted-object",
  "mechanics-cycle",
  "program-project-product-evidence-loop",
  "collaboration-relations",
  "evidence-pipeline",
  "purpose-power-repair-cycle",
] as const;

const sampleNodes = [
  { id: "boundary-theory", label: "Boundary Theory", role: "Formal object" },
  { id: "distinction-space", label: "Distinction Space", role: "Formal object" },
  { id: "formal-grammars", label: "Formal Grammars", role: "Apparatus" },
  { id: "representational-mechanics", label: "Representational Mechanics", role: "Discipline" },
  { id: "boundary-first", label: "Boundary First", role: "Method" },
  { id: "bfe", label: "Boundary-First Engineering", role: "Practice" },
];

export function RepresentationLab() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>("four-question-wheel");
  const scene = useMemo(
    () => ({
      id: "representation-lab",
      number: 0,
      eyebrow: "Representation lab",
      visualMode: "comparison",
      layoutPreset: preset,
      terms: ["Boundary", "Invariant", "Defect", "Repair"],
    }),
    [preset],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">Representation grammar</p>
        <div className="mt-4 grid gap-1" role="tablist" aria-label="Representation presets">
          {PRESETS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={preset === item}
              onClick={() => setPreset(item)}
              className={`border px-3 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.11em] ${
                preset === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-transparent hover:border-border hover:bg-card"
              }`}
            >
              {item.replaceAll("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden border border-border bg-primary p-6 text-primary-foreground sm:p-8">
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:3rem_3rem]" />
        <div className="relative">
          <SceneVisualizer
            scene={scene}
            sceneNodes={sampleNodes}
            onNodeClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

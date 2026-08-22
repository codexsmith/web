"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  CircleDot,
  Eye,
  Layers3,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
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

type Preset = (typeof PRESETS)[number];

type PresetProfile = {
  family: string;
  reveals: string;
  risk: string;
};

const PRESET_PROFILES: Record<Preset, PresetProfile> = {
  "single-consequence": {
    family: "direct consequence",
    reveals: "A single before/after consequence with very low representational overhead.",
    risk: "Parallel causes, feedback, and competing boundaries disappear almost completely.",
  },
  "four-question-wheel": {
    family: "radial diagnostic",
    reveals: "A stable center with four equally available questions around it.",
    risk: "Sequence and asymmetry can look weaker than they really are.",
  },
  "many-to-one-convergence": {
    family: "convergence field",
    reveals: "Multiple inputs becoming consequential at one shared boundary.",
    risk: "Downstream divergence is visually suppressed once the paths converge.",
  },
  "dual-node-overlap": {
    family: "overlap / intersection",
    reveals: "Shared structure and the distinction between two adjacent practices.",
    risk: "The overlap can imply stronger equivalence than the evidence supports.",
  },
  "on-ramp-chooser": {
    family: "hub / chooser",
    reveals: "Multiple legitimate entrances organized around one common mechanism.",
    risk: "Distance from the hub can be mistaken for importance or maturity.",
  },
  "formal-object-explorer": {
    family: "object-centered hub",
    reveals: "A formal object as the stable referent across multiple related structures.",
    risk: "The center can visually overstate authority or ontological priority.",
  },
  "faceted-object": {
    family: "faceted hub",
    reveals: "Different faces of one object without splitting it into unrelated topics.",
    risk: "Facet boundaries can look cleaner than the underlying conceptual seams.",
  },
  "mechanics-cycle": {
    family: "operational cycle",
    reveals: "Repeated method flow and the return path from repair to inspection.",
    risk: "A cycle can imply inevitability where real work may terminate or branch.",
  },
  "program-project-product-evidence-loop": {
    family: "promotion cycle",
    reveals: "The dependency between work, evidence, and institutional promotion.",
    risk: "The loop can hide failed promotion gates and abandoned branches.",
  },
  "collaboration-relations": {
    family: "role relation cycle",
    reveals: "Different collaboration relationships as separate accountable roles.",
    risk: "Circular placement can imply symmetry between roles that carry unequal authority.",
  },
  "evidence-pipeline": {
    family: "directed pipeline",
    reveals: "Order, transformation, and explicit passage through evidence gates.",
    risk: "Iteration, rollback, and parallel criticism are compressed into a line.",
  },
  "purpose-power-repair-cycle": {
    family: "governance cycle",
    reveals: "Purpose, authority, standing, and repair as one accountable loop.",
    risk: "The representation can make institutional repair look easier than it is.",
  },
};

const sampleNodes = [
  { id: "boundary-theory", label: "Boundary Theory", role: "Formal object" },
  { id: "distinction-space", label: "Distinction Space", role: "Formal object" },
  { id: "formal-grammars", label: "Formal Grammars", role: "Apparatus" },
  { id: "representational-mechanics", label: "Representational Mechanics", role: "Discipline" },
  { id: "boundary-first", label: "Boundary First", role: "Method" },
  { id: "bfe", label: "Boundary-First Engineering", role: "Practice" },
];

function displayPreset(value: Preset) {
  return value.replaceAll("-", " ");
}

export function RepresentationLab() {
  const [referencePreset, setReferencePreset] = useState<Preset>("four-question-wheel");
  const [candidatePreset, setCandidatePreset] = useState<Preset>("evidence-pipeline");
  const [selectedNode, setSelectedNode] = useState("distinction-space");

  const referenceScene = useMemo(
    () => ({
      id: "representation-lab-reference",
      number: 0,
      eyebrow: "Reference projection",
      visualMode: "reference projection",
      layoutPreset: referencePreset,
      terms: ["Boundary", "Invariant", "Defect", "Repair"],
    }),
    [referencePreset],
  );

  const candidateScene = useMemo(
    () => ({
      id: "representation-lab-candidate",
      number: 1,
      eyebrow: "Candidate projection",
      visualMode: "candidate projection",
      layoutPreset: candidatePreset,
      terms: ["Boundary", "Invariant", "Defect", "Repair"],
    }),
    [candidatePreset],
  );

  const selected = sampleNodes.find((node) => node.id === selectedNode) ?? sampleNodes[0];
  const referenceProfile = PRESET_PROFILES[referencePreset];
  const candidateProfile = PRESET_PROFILES[candidatePreset];

  const swap = () => {
    const previousReference = referencePreset;
    setReferencePreset(candidatePreset);
    setCandidatePreset(previousReference);
  };

  return (
    <div className="overflow-hidden border border-border bg-background shadow-[10px_10px_0_rgba(15,33,56,0.07)]">
      <div className="border-b border-border bg-[#0f2138] p-5 text-brand-ivory sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layers3 className="h-5 w-5 text-brand-gold" aria-hidden="true" />
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                RLAB-02 · live representation comparator
              </p>
              <p className="mt-1 text-sm text-white/60">
                One object set. Two projections. Differences belong to the representation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            object set locked · 06 referents
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-[1fr_auto_1fr]">
        <ProjectionControl
          label="A / reference"
          preset={referencePreset}
          onChange={setReferencePreset}
          profile={referenceProfile}
        />

        <div className="hidden w-px bg-border lg:block" aria-hidden="true" />

        <ProjectionControl
          label="B / candidate"
          preset={candidatePreset}
          onChange={setCandidatePreset}
          profile={candidateProfile}
        />
      </div>

      <div className="border-y border-border bg-card/45 px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            Compare simultaneously — do not rely on visual memory
          </p>
          <button
            className="inline-flex min-h-9 items-center border border-border bg-background px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-foreground"
            onClick={swap}
            type="button"
          >
            <ArrowLeftRight className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Swap A / B
          </button>
        </div>
      </div>

      <div className="grid gap-4 bg-[#0f2138] p-4 lg:grid-cols-2 lg:p-5">
        <section className="relative overflow-hidden border border-white/15 bg-white/[0.035] p-4 text-primary-foreground sm:p-5" aria-label="Reference representation">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
          <div className="relative">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
              <span>A · {referenceProfile.family}</span>
              <span>reference</span>
            </div>
            <SceneVisualizer
              scene={referenceScene}
              sceneNodes={sampleNodes}
              onNodeClick={setSelectedNode}
            />
          </div>
        </section>

        <section className="relative overflow-hidden border border-brand-gold/35 bg-white/[0.035] p-4 text-primary-foreground sm:p-5" aria-label="Candidate representation">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
          <div className="relative">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground-muted">
              <span>B · {candidateProfile.family}</span>
              <span className="text-brand-gold">candidate</span>
            </div>
            <SceneVisualizer
              scene={candidateScene}
              sceneNodes={sampleNodes}
              onNodeClick={setSelectedNode}
            />
          </div>
        </section>
      </div>

      <div className="grid gap-px border-t border-border bg-border lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <ScanSearch className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Referent inspector
            </p>
          </div>
          <p className="mt-4 font-serif text-2xl font-semibold">{selected.label}</p>
          <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">
            {selected.role} · {selected.id}
          </p>
          <p className="mt-4 text-xs leading-6 text-foreground-muted">
            Selecting a referent in either projection changes this inspector only. Its identity is shared across both visual grammars.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {sampleNodes.map((node) => (
              <button
                className={`border px-2.5 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${
                  node.id === selected.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground-muted hover:border-foreground-muted"
                }`}
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                type="button"
              >
                {node.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="grid gap-px bg-border md:grid-cols-2">
          <ProfileReadout label="A / reference observability" profile={referenceProfile} icon={Eye} />
          <ProfileReadout label="B / candidate observability" profile={candidateProfile} icon={ShieldCheck} />
        </div>
      </div>
    </div>
  );
}

function ProjectionControl({
  label,
  preset,
  onChange,
  profile,
}: {
  label: string;
  preset: Preset;
  onChange: (preset: Preset) => void;
  profile: PresetProfile;
}) {
  return (
    <div className="bg-background p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <CircleDot className="h-3.5 w-3.5 text-foreground-muted" aria-hidden="true" />
        <label className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          {label}
        </label>
      </div>
      <select
        aria-label={`${label} representation preset`}
        className="mt-3 min-h-11 w-full border border-border bg-card px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] outline-none focus:border-foreground"
        onChange={(event) => onChange(event.target.value as Preset)}
        value={preset}
      >
        {PRESETS.map((item) => (
          <option key={item} value={item}>
            {displayPreset(item)}
          </option>
        ))}
      </select>
      <div className="mt-4 border-l-2 border-border pl-4">
        <p className="font-serif text-lg font-semibold">{profile.family}</p>
        <p className="mt-1 text-xs leading-5 text-foreground-muted">{profile.reveals}</p>
      </div>
    </div>
  );
}

function ProfileReadout({
  label,
  profile,
  icon: Icon,
}: {
  label: string;
  profile: PresetProfile;
  icon: LucideIcon;
}) {
  return (
    <article className="bg-background p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          {label}
        </p>
      </div>
      <p className="mt-4 text-sm leading-7">{profile.reveals}</p>
      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          Representation risk
        </p>
        <p className="mt-2 text-xs leading-6 text-foreground-muted">{profile.risk}</p>
      </div>
    </article>
  );
}

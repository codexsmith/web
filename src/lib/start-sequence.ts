export type StartSceneAction = {
  href: string;
  label: string;
};

export type StartSceneStep = {
  id: string;
  order: number;
  title: string;
  headline: string;
  summary: string;
  visualMode: string;
  layoutPreset: string;
  focusNodes?: string[];
  contextNodes?: string[];
  virtualNodes?: string[];
  options?: string[];
  pathwayOptions?: string[];
  newTerms?: string[];
  transitionQuestion?: string;
  action?: StartSceneAction;
};

export type StartVirtualNode = {
  id: string;
  label: string;
  role: string;
  virtual: true;
};

export const START_VIRTUAL_NODES: Readonly<
  Record<string, StartVirtualNode>
> = {
  information: {
    id: "information",
    label: "Information",
    role: "Foundational lineage",
    virtual: true,
  },
  computation: {
    id: "computation",
    label: "Computation",
    role: "Foundational lineage",
    virtual: true,
  },
  "practical-mechanics": {
    id: "practical-mechanics",
    label: "Practical Mechanics",
    role: "Foundational lineage",
    virtual: true,
  },
  "physics-lineage": {
    id: "physics-lineage",
    label: "Physics",
    role: "Foundational lineage",
    virtual: true,
  },
  "mathematics-lineage": {
    id: "mathematics-lineage",
    label: "Mathematics",
    role: "Foundational lineage",
    virtual: true,
  },
  "scientific-method": {
    id: "scientific-method",
    label: "Scientific Method",
    role: "Methodological lineage",
    virtual: true,
  },
  "agentic-computation": {
    id: "agentic-computation",
    label: "Agentic Computation",
    role: "Contributing practice",
    virtual: true,
  },
  "research-methods": {
    id: "research-methods",
    label: "Research Methods",
    role: "Contributing practice",
    virtual: true,
  },
  "agile-lean": {
    id: "agile-lean",
    label: "Agile & Lean",
    role: "Contributing practice",
    virtual: true,
  },
  "systems-engineering": {
    id: "systems-engineering",
    label: "Systems Engineering",
    role: "Contributing practice",
    virtual: true,
  },
  "independent-research": {
    id: "independent-research",
    label: "Independent Research",
    role: "Lived research practice",
    virtual: true,
  },
  chess: {
    id: "chess",
    label: "Chess",
    role: "Familiar doorway",
    virtual: true,
  },
  soccer: {
    id: "soccer",
    label: "Soccer",
    role: "Familiar doorway",
    virtual: true,
  },
  "classical-geometry": {
    id: "classical-geometry",
    label: "Classical Geometry",
    role: "Familiar doorway",
    virtual: true,
  },
  "physical-boundaries": {
    id: "physical-boundaries",
    label: "Physical Boundaries",
    role: "Familiar doorway",
    virtual: true,
  },
};

const START_REFERENCE_ALIASES: Readonly<Record<string, string>> = {
  software: "software-engineering-practice",
  institutions: "governance-institutions",
  theory: "boundary-theory",
  engineering: "bfe",
  science: "computational-systems",
  "build-use": "products-testbeds",
  "public-consequence": "governance-institutions",
  "public-translation": "public-philosophy-satire",
  evidence: "corpus",
  lineage: "mathematics",
  "how-lab-operates": "identity",
};

export const START_LAYOUT_PRESETS = new Set([
  "single-consequence",
  "four-question-wheel",
  "lineage-roots",
  "many-to-one-convergence",
  "dual-node-overlap",
  "on-ramp-chooser",
  "formal-object-explorer",
  "faceted-object",
  "mechanics-cycle",
  "path-chooser",
  "program-project-product-evidence-loop",
  "collaboration-relations",
  "evidence-pipeline",
  "purpose-power-repair-cycle",
  "canonical-atlas",
]);

function nonEmptyStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && item.trim())
  );
}

export function resolveStartReferenceId(referenceId: string): string {
  return START_REFERENCE_ALIASES[referenceId] ?? referenceId;
}

export function collectStartSceneReferenceIds(
  step: StartSceneStep,
): string[] {
  const references = [
    ...(step.focusNodes ?? []),
    ...(step.contextNodes ?? []),
    ...(step.virtualNodes ?? []),
    ...(step.options ?? []),
    ...(step.pathwayOptions ?? []),
  ].map(resolveStartReferenceId);
  return [...new Set(references)];
}

export function validateStartSequence(
  steps: StartSceneStep[],
  canonicalIds: ReadonlySet<string>,
) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error("The Start sequence requires at least one scene.");
  }

  const ids = new Set<string>();
  for (const [index, step] of steps.entries()) {
    if (!step.id || !step.title || !step.headline || !step.summary) {
      throw new Error(
        `Start scene at index ${index} requires id, title, headline, and summary.`,
      );
    }
    if (ids.has(step.id)) {
      throw new Error(`Duplicate Start scene id '${step.id}'.`);
    }
    ids.add(step.id);

    if (step.order !== index) {
      throw new Error(
        `Start scene '${step.id}' has order ${step.order}; expected ${index}.`,
      );
    }
    if (!step.visualMode || !START_LAYOUT_PRESETS.has(step.layoutPreset)) {
      throw new Error(
        `Start scene '${step.id}' uses an unsupported visual contract.`,
      );
    }
    if (
      index < steps.length - 1 &&
      (!step.transitionQuestion || !step.transitionQuestion.trim())
    ) {
      throw new Error(
        `Start scene '${step.id}' requires a transition question.`,
      );
    }
    if (
      step.newTerms !== undefined &&
      !nonEmptyStrings(step.newTerms)
    ) {
      throw new Error(
        `Start scene '${step.id}' has an invalid vocabulary list.`,
      );
    }
    if (
      step.action &&
      (!step.action.label.trim() || !step.action.href.startsWith("/"))
    ) {
      throw new Error(
        `Start scene '${step.id}' requires an internal, labelled action.`,
      );
    }

    const references = collectStartSceneReferenceIds(step);
    if (
      references.length === 0 &&
      step.layoutPreset !== "single-consequence"
    ) {
      throw new Error(
        `Start scene '${step.id}' requires at least one visual reference.`,
      );
    }
    for (const reference of references) {
      if (
        !canonicalIds.has(reference) &&
        !START_VIRTUAL_NODES[reference]
      ) {
        throw new Error(
          `Start scene '${step.id}' references unknown node '${reference}'.`,
        );
      }
    }
  }

  const finalScene = steps.at(-1);
  if (!finalScene?.action?.href.includes("/map")) {
    throw new Error("The final Start scene must provide an Atlas action.");
  }
}

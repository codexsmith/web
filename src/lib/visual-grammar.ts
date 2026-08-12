import visualGrammarData from "../content/visual_grammar.binding.json";

export type VisualGrammarDiagramId =
  | "class-to-consequence"
  | "symbol-to-consequence";

export type VisualGrammarRole =
  | "class"
  | "instance"
  | "state"
  | "symbol"
  | "interpreter"
  | "classification"
  | "authority"
  | "operation"
  | "state-transition"
  | "consequence";

export type VisualGrammarDiagram = {
  id: VisualGrammarDiagramId;
  number: string;
  eyebrow: string;
  title: string;
  proposition: string;
  description: string;
  accessibleSummary: string;
  path: Array<{
    id: string;
    role: VisualGrammarRole;
    label: string;
    description: string;
  }>;
  feedback: {
    gateLabel: string;
    question: string;
    preserved: {
      label: string;
      steps: string[];
    };
    contested: {
      label: string;
      steps: string[];
    };
    returnLabel: string;
    returnToRole: VisualGrammarRole;
    returnDescription: string;
  };
};

export type VisualGrammar = {
  schemaVersion: "boundary-first.visual-grammar.v1";
  version: string;
  promotionStatus: "working-original-visuals-pending-founder-and-research-review";
  sourceSuite: string;
  title: string;
  summary: string;
  sourceImagePolicy: {
    bibliographicStatus: "unresolved";
    publicationStatus: "internal-only";
    copiedAssets: false;
    designOrigin: "project-native-abstract-structure";
    note: string;
  };
  diagrams: VisualGrammarDiagram[];
  safeguards: string[];
  routes: {
    gallery: string;
    registry: string;
    visualArtifact: string;
    manifesto: string;
    executableArgument: string;
    researchProgram: string;
  };
  claimCeiling: string;
};

const REQUIRED_DIAGRAM_ORDER: VisualGrammarDiagramId[] = [
  "class-to-consequence",
  "symbol-to-consequence",
];

const REQUIRED_ROLE_ORDER: Record<
  VisualGrammarDiagramId,
  VisualGrammarRole[]
> = {
  "class-to-consequence": [
    "class",
    "instance",
    "state",
    "operation",
    "consequence",
  ],
  "symbol-to-consequence": [
    "symbol",
    "interpreter",
    "classification",
    "authority",
    "operation",
    "state-transition",
    "consequence",
  ],
};

function validateInternalRoute(name: string, value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    throw new Error(`Visual-grammar route ${name} must be internal.`);
  }
}

function requireTerms(
  context: string,
  values: string[],
  requiredTerms: string[],
) {
  const normalized = values.join(" ").toLocaleLowerCase();
  requiredTerms.forEach((term) => {
    if (!normalized.includes(term.toLocaleLowerCase())) {
      throw new Error(`${context} must include ${term}.`);
    }
  });
}

export function validateVisualGrammar(value: VisualGrammar): VisualGrammar {
  if (value.schemaVersion !== "boundary-first.visual-grammar.v1") {
    throw new Error("Unsupported visual-grammar schema.");
  }
  if (
    value.promotionStatus !==
    "working-original-visuals-pending-founder-and-research-review"
  ) {
    throw new Error(
      "Visual grammar must retain its pending founder-and-research-review state.",
    );
  }
  if (
    value.sourceImagePolicy.bibliographicStatus !== "unresolved" ||
    value.sourceImagePolicy.publicationStatus !== "internal-only" ||
    value.sourceImagePolicy.copiedAssets !== false ||
    value.sourceImagePolicy.designOrigin !==
      "project-native-abstract-structure"
  ) {
    throw new Error(
      "Unresolved source images must remain internal-only and uncopied.",
    );
  }

  const diagramIds = value.diagrams.map((diagram) => diagram.id);
  if (diagramIds.join("|") !== REQUIRED_DIAGRAM_ORDER.join("|")) {
    throw new Error("Visual grammar requires both diagrams in canonical order.");
  }

  value.diagrams.forEach((diagram) => {
    const nodeIds = diagram.path.map((node) => node.id);
    if (new Set(nodeIds).size !== nodeIds.length) {
      throw new Error(`Diagram ${diagram.id} has duplicate node identifiers.`);
    }
    const roles = diagram.path.map((node) => node.role);
    if (roles.join("|") !== REQUIRED_ROLE_ORDER[diagram.id].join("|")) {
      throw new Error(`Diagram ${diagram.id} has an incomplete consequence path.`);
    }
    if (
      !diagram.accessibleSummary.trim() ||
      !diagram.feedback.question.trim() ||
      !diagram.feedback.returnDescription.trim() ||
      diagram.feedback.preserved.steps.length === 0 ||
      diagram.feedback.contested.steps.length === 0 ||
      diagram.path.some(
        (node) => !node.label.trim() || !node.description.trim(),
      )
    ) {
      throw new Error(`Diagram ${diagram.id} is missing explanatory content.`);
    }
    if (!roles.includes(diagram.feedback.returnToRole)) {
      throw new Error(`Diagram ${diagram.id} returns to an unknown role.`);
    }
  });

  const classDiagram = value.diagrams[0];
  if (!classDiagram.feedback.gateLabel.toLocaleLowerCase().includes("invariant")) {
    throw new Error("The class diagram requires an invariant check.");
  }
  requireTerms(
    "The class repair path",
    classDiagram.feedback.contested.steps,
    ["witness", "responsibility", "repair"],
  );
  if (classDiagram.feedback.returnToRole !== "state") {
    throw new Error("The class repair path must return to state.");
  }

  const symbolDiagram = value.diagrams[1];
  requireTerms(
    "The symbol repair path",
    symbolDiagram.feedback.contested.steps,
    ["appeal", "witness", "responsibility", "repair"],
  );
  if (!symbolDiagram.feedback.gateLabel.toLocaleLowerCase().includes("contest")) {
    throw new Error("The symbol diagram requires a contestability check.");
  }

  if (value.safeguards.length < 4) {
    throw new Error(
      "Visual grammar requires non-reduction, non-equivalence, authority, and repair safeguards.",
    );
  }
  Object.entries(value.routes).forEach(([name, route]) =>
    validateInternalRoute(name, route),
  );
  return value;
}

export const visualGrammar = validateVisualGrammar(
  visualGrammarData as VisualGrammar,
);

export const VISUAL_GRAMMAR_PATH = visualGrammar.routes.gallery;

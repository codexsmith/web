import argumentData from "../content/executable_distinctions.binding.json";

export type ExecutableDistinctionLayerId =
  | "token"
  | "semantic"
  | "operational";

export type ExecutableDistinctionsArgument = {
  schemaVersion: "boundary-first.public-argument.executable-distinctions.v1";
  version: string;
  promotionStatus: "working-public-essay-pending-founder-review";
  sourceSuite: string;
  title: string;
  thesis: string;
  summary: string;
  layers: Array<{
    id: ExecutableDistinctionLayerId;
    label: string;
    question: string;
    description: string;
  }>;
  consequencePath: string[];
  safeguards: string[];
  claimCeiling: string;
  routes: {
    essay: string;
    manifesto: string;
    research: string;
    software: string;
    institutions: string;
  };
};

const REQUIRED_LAYER_ORDER: ExecutableDistinctionLayerId[] = [
  "token",
  "semantic",
  "operational",
];

const REQUIRED_PATH_STEPS = [
  "interpreter or procedure",
  "authorized operation",
  "state transition",
  "consequence",
  "contestability and repair",
];

function validateInternalRoute(name: string, value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    throw new Error(`Executable-distinctions route ${name} must be internal.`);
  }
}

export function validateExecutableDistinctions(
  value: ExecutableDistinctionsArgument,
): ExecutableDistinctionsArgument {
  if (
    value.schemaVersion !==
    "boundary-first.public-argument.executable-distinctions.v1"
  ) {
    throw new Error("Unsupported executable-distinctions schema.");
  }
  if (
    value.promotionStatus !== "working-public-essay-pending-founder-review"
  ) {
    throw new Error(
      "Executable distinctions must retain its pending founder-review state.",
    );
  }

  const layerIds = value.layers.map((layer) => layer.id);
  if (layerIds.join("|") !== REQUIRED_LAYER_ORDER.join("|")) {
    throw new Error(
      "Executable distinctions requires token, semantic, and operational layers in order.",
    );
  }

  REQUIRED_PATH_STEPS.forEach((step) => {
    if (!value.consequencePath.includes(step)) {
      throw new Error(`Executable-distinction path is missing ${step}.`);
    }
  });
  if (value.safeguards.length < 3) {
    throw new Error(
      "Executable distinctions requires non-reduction and non-mystical safeguards.",
    );
  }
  Object.entries(value.routes).forEach(([name, route]) =>
    validateInternalRoute(name, route),
  );
  return value;
}

export const executableDistinctions = validateExecutableDistinctions(
  argumentData as ExecutableDistinctionsArgument,
);

export const EXECUTABLE_DISTINCTIONS_PATH =
  executableDistinctions.routes.essay;

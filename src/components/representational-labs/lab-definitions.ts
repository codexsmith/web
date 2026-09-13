import type { RepresentationalLabDefinition } from "./lab-patterns";

export const CANTOR_CLOSURE_LAB: RepresentationalLabDefinition = {
  id: "cantor-closure-defect",
  version: "0.1.0",
  suiteOrder: 2,
  route: "/sandbox/cantor",
  status: "calibration",
  layout: "instrument-inspector",
  eyebrow: "BOUNDARY FIRST LABS // REPRESENTATIONAL LAB 02",
  title: "Cantor Closure & Defect",
  question:
    "What happens when a closure operation constructs a witness outside the currently admitted representation?",
  description:
    "Construct a row that differs from every currently admitted row by changing the diagonal, then decide whether to extend the represented space to admit what the operation produced.",
  claimBoundary: {
    label: "FINITE CALIBRATION FIXTURE",
    detail:
      "This instrument demonstrates the diagonal construction mechanism on bounded 8-bit rows. It does not by itself prove Cantor's uncountability theorem or a transfinite extension claim.",
    tone: "caution",
  },
  operations: [
    "represent",
    "execute",
    "observe",
    "detect",
    "trace",
    "repair",
    "promote",
    "reset",
  ],
};

export const REPRESENTATIONAL_LAB_DEFINITIONS: RepresentationalLabDefinition[] = [
  CANTOR_CLOSURE_LAB,
];

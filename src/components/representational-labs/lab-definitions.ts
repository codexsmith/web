import type { RepresentationalLabDefinition } from "./lab-patterns";

export const CANTOR_CLOSURE_LAB: RepresentationalLabDefinition = {
  id: "cantor-closure-defect",
  version: "0.4.0",
  suiteOrder: 2,
  route: "/sandbox/cantor",
  status: "calibration",
  layout: "comparison",
  eyebrow: "BOUNDARY FIRST LABS // REPRESENTATIONAL LAB 02",
  title: "Cantor Closure & Defect",
  question:
    "What happens when a closure operation constructs a witness outside the currently admitted representation?",
  description:
    "Construct and compare rows that differ from every currently admitted row under a declared finite symbol grammar, inspect the certified escape family, preview how different valid admissions produce different successor representations, then choose which verified witness to admit.",
  claimBoundary: {
    label: "FINITE CALIBRATION FIXTURE",
    detail:
      "This instrument executes bounded diagonal-substitution fixtures over declared finite alphabets. It separates the finite mechanism, Cantor's established infinite theorem, and BFL's experimental closure/defect interpretation; it does not by itself prove a novel transfinite claim.",
    tone: "caution",
  },
  operations: [
    "admit",
    "represent",
    "execute",
    "observe",
    "stress",
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

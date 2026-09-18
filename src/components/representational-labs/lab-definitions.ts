import type { RepresentationalLabDefinition } from "./lab-patterns";

export const CANTOR_CLOSURE_LAB: RepresentationalLabDefinition = {
  id: "cantor-closure-defect",
  version: "0.7.0",
  suiteOrder: 2,
  route: "/sandbox/cantor",
  status: "calibration",
  layout: "control-stage",
  eyebrow: "BOUNDARY FIRST LABS // REPRESENTATIONAL LAB 02",
  title: "Cantor Closure & Defect",
  question:
    "When does diagonal escape force a new representation boundary, and when can the existing coordinates still certify outside members?",
  description:
    "A self-playing finite Cantor fixture that begins 4×4. STEP exposes scan/escape/admit mechanics; PLAY fast-forwards to the next list-shape change. Coordinates may be reused while the list becomes rectangular, and width changes only at an explicit exhaustion breakpoint.",
  claimBoundary: {
    label: "FINITE CALIBRATION FIXTURE",
    detail:
      "This bounded teaching instrument separates the classical identity diagonal from a selector-based finite exclusion view. Coordinate reuse and finite width growth are pedagogical representations of the declared finite grammar; they do not replace or extend Cantor's established infinite theorem by themselves.",
    tone: "caution",
  },
  operations: [
    "admit",
    "represent",
    "execute",
    "observe",
    "detect",
    "compare",
    "promote",
    "reset",
  ],
};

export const REPRESENTATIONAL_LAB_DEFINITIONS: RepresentationalLabDefinition[] = [
  CANTOR_CLOSURE_LAB,
];

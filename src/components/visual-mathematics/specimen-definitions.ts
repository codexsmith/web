import type { VisualMathSpecimenDefinition, VisualMathSpecimenId } from "./specimen-types";

export const visualMathSpecimens: Record<VisualMathSpecimenId, VisualMathSpecimenDefinition> = {
  hopf: {
    id: "hopf",
    version: "hopf-web-0.1.0",
    label: "Hopf Fibration",
    shortLabel: "HOPF",
    status: "established-control",
    statusLabel: "ESTABLISHED CONTROL",
    question: "How does a familiar classical construction change as we inspect its base, fiber action, total space, and visible projection?",
    description:
      "A classical Hopf-fibration specimen rendered through the same fiber construction used by the Research object on the public Lab Machine.",
    claimBoundary:
      "The Hopf fibration and stereographic projection are established mathematics. This workstation is a BFL implementation and representational inspection instrument; its visual treatment is not a new mathematical result.",
    implementation: "browser_canvas_2d / shared HopfFiberCanvas",
    provenance: [
      "ResearchHopfVisualization homepage specimen",
      "classical Hopf fibration S3 -> S2",
      "stereographic projection into visible R3",
    ],
    construction: [
      {
        id: "base",
        label: "S² BASE",
        detail: "Choose a bounded sample of points on the two-sphere that will index visible fibers.",
      },
      {
        id: "lift",
        label: "SECTION / LIFT",
        operation: "lift",
        detail: "Map each sampled base point to a representative state in S³.",
      },
      {
        id: "fiber",
        label: "S¹ FIBER ACTION",
        operation: "phase",
        detail: "Apply the circle action to sweep the full fiber associated with each base point.",
      },
      {
        id: "total",
        label: "S³ STATE",
        detail: "The lifted point and fiber phase define states in the three-sphere.",
      },
      {
        id: "project",
        label: "STEREOGRAPHIC PROJECTION",
        operation: "project",
        detail: "Project S³ into three-dimensional Euclidean coordinates for inspection.",
      },
      {
        id: "visible",
        label: "VISIBLE R³ OBJECT",
        detail: "Render the projected fibers, camera transform, phase encoding, and motion on screen.",
      },
    ],
    capabilities: ["operate", "record", "explain"],
  },
  "boundary-attractor": {
    id: "boundary-attractor",
    version: "boundary-attractor-web-0.1.0",
    label: "Boundary Attractor",
    shortLabel: "BOUNDARY ATTRACTOR",
    status: "experimental-bfl-dynamics",
    statusLabel: "EXPERIMENTAL BFL DYNAMICS",
    question: "How do closure, defect, transport, and deformation compete in a bounded computational dynamics fixture?",
    description:
      "A reproducible experimental dynamics specimen driven by the existing bounded simulation API and inspected through closure, defect, persistence, and extent observables.",
    claimBoundary:
      "This is a reproducible computational exhibit and experimental BFL dynamics object. Visual structure can suggest questions; appearance alone does not establish a theorem or validate a physical model.",
    implementation: "api/simulate + browser_canvas_2d_projection",
    provenance: [
      "BoundaryFascinatorInstrument",
      "boundary-attractor-web-0.1.0 simulation contract",
      "browser capture manifest v0.2 predecessor",
    ],
    construction: [
      {
        id: "initial",
        label: "INITIAL STATE",
        detail: "Seed a bounded set of state points under a declared parameter regime.",
      },
      {
        id: "dynamics",
        label: "DYNAMICS",
        operation: "integrate",
        detail: "Execute transport, damping, twist, braid, and moving closure-shell terms through time.",
      },
      {
        id: "closure",
        label: "CLOSURE / DEFECT",
        operation: "measure",
        detail: "Measure relation to the active boundary condition and derive closure/defect observables.",
      },
      {
        id: "measurement",
        label: "MEASUREMENT",
        detail: "Retain run metrics, persistent witnesses, phase, extent, and bounded-compute evidence.",
      },
      {
        id: "projection",
        label: "PROJECTION",
        operation: "render",
        detail: "Project state trajectories into the browser chamber using camera, trail, color, and prominence encodings.",
      },
    ],
    capabilities: ["operate", "record", "explain"],
  },
};

export const visualMathSpecimenOrder: VisualMathSpecimenId[] = ["hopf", "boundary-attractor"];

export function getVisualMathSpecimen(id: VisualMathSpecimenId) {
  return visualMathSpecimens[id];
}

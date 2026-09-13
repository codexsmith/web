import type { EconomicPlane } from "@/lib/economic-instrumentation";
import type { AugustaSystemLayer } from "@/lib/augusta-economic-cross-section";

export type AugustaSurfacePlane = Exclude<EconomicPlane, "reference">;
export type AugustaSurfaceTargetKind = "route" | "zone" | "node";
export type AugustaSurfaceSignalClass = "observed" | "gap" | "open" | "interpretive" | "seeded";

export type AugustaSurfaceSignal = {
  id: string;
  plane: AugustaSurfacePlane;
  targetKind: AugustaSurfaceTargetKind;
  targetId: string;
  layer: AugustaSystemLayer;
  signalClass: AugustaSurfaceSignalClass;
  label: string;
  evidence: string;
  description: string;
};

export const augustaSurfaceSignals: AugustaSurfaceSignal[] = [
  {
    id: "r-water-surface",
    plane: "referent",
    targetKind: "route",
    targetId: "savannah-river",
    layer: "material",
    signalClass: "observed",
    label: "LOCAL WATER CAPACITY + FLOW",
    evidence: "official local source",
    description: "Augusta Utilities reports approximately 24 MGD average daily flow and 60 MGD design capacity at the Highland Avenue surface-water treatment plant. The river curve remains schematic geometry.",
  },
  {
    id: "r-rcss",
    plane: "referent",
    targetKind: "node",
    targetId: "rcss",
    layer: "civic",
    signalClass: "observed",
    label: "DISTRICT SCALE OBSERVED",
    evidence: "official district source",
    description: "RCSS public reporting supplies district-scale student, school/program, and graduation-rate signals. These are not a complete measure of capability or quality.",
  },
  {
    id: "r-black-augusta",
    plane: "referent",
    targetKind: "zone",
    targetId: "laney-walker",
    layer: "historical",
    signalClass: "interpretive",
    label: "CAPABILITY ECOLOGY UNDER STUDY",
    evidence: "source-bound research synthesis",
    description: "The historical district is highlighted as a research frame for capability-producing civic infrastructure, not as a quantified causal field.",
  },
  {
    id: "r-historical-seed-paine",
    plane: "referent",
    targetKind: "node",
    targetId: "paine-college",
    layer: "historical",
    signalClass: "seeded",
    label: "ENTITY SEEDED",
    evidence: "noncanonical research seed",
    description: "Named historical entity exists in the Black Augusta seed; inclusion does not establish a causal edge.",
  },
  {
    id: "r-historical-seed-haines",
    plane: "referent",
    targetKind: "node",
    targetId: "haines-institute",
    layer: "historical",
    signalClass: "seeded",
    label: "ENTITY SEEDED",
    evidence: "noncanonical research seed",
    description: "Named historical entity exists in the Black Augusta seed; inclusion does not establish a causal edge.",
  },
  {
    id: "r-historical-seed-tabernacle",
    plane: "referent",
    targetKind: "node",
    targetId: "tabernacle-baptist",
    layer: "historical",
    signalClass: "seeded",
    label: "ENTITY SEEDED",
    evidence: "noncanonical research seed",
    description: "Named historical entity exists in the Black Augusta seed; inclusion does not establish a causal edge.",
  },
  {
    id: "r-historical-seed-ct-walker",
    plane: "referent",
    targetKind: "node",
    targetId: "ct-walker-school",
    layer: "historical",
    signalClass: "seeded",
    label: "ENTITY SEEDED",
    evidence: "noncanonical research seed",
    description: "Named historical entity exists in the Black Augusta seed; inclusion does not establish a causal edge.",
  },
  {
    id: "k-broad",
    plane: "maintenance",
    targetKind: "route",
    targetId: "broad-street",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-15th",
    plane: "maintenance",
    targetKind: "route",
    targetId: "fifteenth-street",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-walton",
    plane: "maintenance",
    targetKind: "route",
    targetId: "walton-way",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-washington",
    plane: "maintenance",
    targetKind: "route",
    targetId: "washington-road",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-gordon",
    plane: "maintenance",
    targetKind: "route",
    targetId: "gordon-highway",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-i520",
    plane: "maintenance",
    targetKind: "route",
    targetId: "i520",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL CONDITION SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "No local road-condition series is wired. The route is hatched as unknown rather than inheriting national pavement condition.",
  },
  {
    id: "k-water",
    plane: "maintenance",
    targetKind: "node",
    targetId: "savannah-water",
    layer: "material",
    signalClass: "gap",
    label: "LOCAL MAINTENANCE SERIES REQUIRED",
    evidence: "instrumentation gap",
    description: "National EPA needs estimates remain comparison instruments; they are not painted onto Augusta as a local backlog.",
  },
  {
    id: "k-power",
    plane: "maintenance",
    targetKind: "node",
    targetId: "georgia-power-system",
    layer: "material",
    signalClass: "open",
    label: "LIFECYCLE AUDIT OPEN",
    evidence: "Boundary First research state",
    description: "Risk, return, maintenance, repair, capital, ownership, and public support remain under reconstruction. This is not a finding of improper conduct.",
  },
  {
    id: "c-water",
    plane: "closure",
    targetKind: "node",
    targetId: "savannah-water",
    layer: "material",
    signalClass: "open",
    label: "MAINTENANCE CLOSURE OPEN",
    evidence: "illustrative closure instrument",
    description: "The current closure lamp is illustrative: financial completion and verified maintenance completion are represented as separable states.",
  },
  {
    id: "c-power",
    plane: "closure",
    targetKind: "node",
    targetId: "georgia-power-system",
    layer: "material",
    signalClass: "open",
    label: "AUDIT OPEN",
    evidence: "Boundary First research state",
    description: "The Georgia Power lifecycle reconstruction has not reached research closure.",
  },
  {
    id: "c-households",
    plane: "closure",
    targetKind: "node",
    targetId: "augusta-households",
    layer: "household",
    signalClass: "gap",
    label: "NO HOUSEHOLD SIGNAL",
    evidence: "instrumentation gap",
    description: "Absence of a household-burden instrument is shown as missing observation, not zero burden.",
  },
  {
    id: "c-golden-blocks",
    plane: "closure",
    targetKind: "node",
    targetId: "golden-blocks",
    layer: "historical",
    signalClass: "open",
    label: "HISTORICAL REVIEW REQUIRED",
    evidence: "explicit research review flag",
    description: "The seed explicitly marks the Golden Blocks / Laney-Walker label for historical review before stronger public use.",
  },
];

export const augustaSurfaceLegend: Record<AugustaSurfaceSignalClass, { label: string; description: string }> = {
  observed: { label: "Observed", description: "Scoped source-backed signal is available." },
  gap: { label: "No signal", description: "Required local observation or transformation is not wired." },
  open: { label: "Open", description: "A declared maintenance, research, or review closure remains open." },
  interpretive: { label: "Interpretive", description: "Research framing is visible without being promoted to causal fact." },
  seeded: { label: "Seeded", description: "Entity is present in a research seed without stronger relation claims." },
};

export function getAugustaSurfaceSignals(
  plane: EconomicPlane | "all",
  activeLayer: AugustaSystemLayer | "all" = "all",
) {
  if (plane === "all" || plane === "reference") return [];
  return augustaSurfaceSignals.filter(
    (signal) => signal.plane === plane && (activeLayer === "all" || signal.layer === activeLayer),
  );
}

export function getAugustaNodeSurfaceSignal(
  nodeId: string,
  plane: EconomicPlane | "all",
  activeLayer: AugustaSystemLayer | "all" = "all",
) {
  return getAugustaSurfaceSignals(plane, activeLayer).find(
    (signal) => signal.targetKind === "node" && signal.targetId === nodeId,
  );
}

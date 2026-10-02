export type AugustaTemporalMode = "historical" | "current" | "scenario";

export type AugustaTemporalFrameId =
  | "formation"
  | "segregated-institutions"
  | "civil-rights-transition"
  | "redevelopment-consolidation"
  | "current"
  | "scenario";

export type AugustaTemporalFrame = {
  id: AugustaTemporalFrameId;
  index: string;
  label: string;
  shortLabel: string;
  timeLabel: string;
  mode: AugustaTemporalMode;
  description: string;
  claimPosture: string;
  sourceLabel: string;
  sourceHref?: string;
};

const blackAugustaConceptUrl =
  "https://github.com/codexsmith/boundary-first-labs/blob/main/organized_library_curated/999_Library/03_Domains/0701_public_engagement_and_media/Black_Augusta_Excellence/01_PUBLIC_CONCEPT_NOTE.md";

export const augustaTemporalFrames: AugustaTemporalFrame[] = [
  {
    id: "formation",
    index: "T0",
    label: "Reconstruction + institution formation",
    shortLabel: "Formation",
    timeLabel: "RECONSTRUCTION ERA",
    mode: "historical",
    description:
      "A research frame for civic and institutional construction after emancipation. It does not assert that every historical object shown in the atlas was simultaneously active or connected during this frame.",
    claimPosture:
      "Source-bound historical frame. Current infrastructure measurements are not backcast into this period.",
    sourceLabel: "Boundary First Labs — Black Augusta: An Ecology of Excellence",
    sourceHref: blackAugustaConceptUrl,
  },
  {
    id: "segregated-institutions",
    index: "T1",
    label: "Jim Crow + segregated institution-building",
    shortLabel: "Segregated institutions",
    timeLabel: "JIM CROW ERA",
    mode: "historical",
    description:
      "A research frame for Black educational, religious, professional, business, cultural, and civic capacity built under exclusion and segregation.",
    claimPosture:
      "Ecology-level framing only. Specific participation, affiliation, mentorship, or causal edges still require their own evidence.",
    sourceLabel: "Boundary First Labs — Black Augusta: An Ecology of Excellence",
    sourceHref: blackAugustaConceptUrl,
  },
  {
    id: "civil-rights-transition",
    index: "T2",
    label: "Civil-rights + desegregation transition",
    shortLabel: "Civil-rights transition",
    timeLabel: "DESEGREGATION / CIVIL-RIGHTS TRANSITION",
    mode: "historical",
    description:
      "A research frame for civil-rights struggle, desegregation, and institutional transition. Distinct local events are not collapsed into a single causal sequence.",
    claimPosture:
      "Historical transition frame, not a complete chronology or claim that every displayed institution changed in the same way or at the same time.",
    sourceLabel: "Boundary First Labs — Black Augusta: An Ecology of Excellence",
    sourceHref: blackAugustaConceptUrl,
  },
  {
    id: "redevelopment-consolidation",
    index: "T3",
    label: "Redevelopment + institutional consolidation",
    shortLabel: "Redevelopment",
    timeLabel: "REDEVELOPMENT / ECONOMIC TRANSFORMATION",
    mode: "historical",
    description:
      "A research frame for urban redevelopment, economic transformation, migration, institutional consolidation, relocation, closure, and function migration.",
    claimPosture:
      "Research frame only. It does not infer that a named redevelopment process caused a specific institutional outcome without separate evidence.",
    sourceLabel: "Boundary First Labs — Black Augusta: An Ecology of Excellence",
    sourceHref: blackAugustaConceptUrl,
  },
  {
    id: "current",
    index: "T4",
    label: "Current source-contract state",
    shortLabel: "Current",
    timeLabel: "CURRENT OBSERVATION FRAME",
    mode: "current",
    description:
      "The present prototype frame. Current Augusta Utilities, Richmond County School System, and other explicitly scoped source contracts may render here.",
    claimPosture:
      "Current observations are displayed only at their declared scope and as-of state. Missing local measurements remain missing.",
    sourceLabel: "Boundary First current instrument contracts",
  },
  {
    id: "scenario",
    index: "T5",
    label: "Scenario workspace",
    shortLabel: "Scenario",
    timeLabel: "HYPOTHETICAL TRANSITION SPACE",
    mode: "scenario",
    description:
      "A bounded workspace for future what-if transitions. Current observations may appear only as baseline context; no scenario state is a forecast.",
    claimPosture:
      "HYPOTHETICAL / NOT FORECAST. Future values require explicit scenario inputs, transformation rules, and consequence accounting before they may change the modeled state.",
    sourceLabel: "Boundary First scenario contract",
  },
];

export const augustaTemporalContract = {
  label: "State trajectory contract",
  description:
    "Temporal frames change the evidence context of the same Augusta system. Historical frames are research lenses, current is an observation frame, and scenario is a hypothetical transition space. The interface must not silently backcast current measurements or present scenarios as predictions.",
} as const;

export function getAugustaTemporalFrame(id: AugustaTemporalFrameId) {
  return augustaTemporalFrames.find((frame) => frame.id === id) ?? augustaTemporalFrames[4];
}

const historicalResearchInstrumentIds = new Set([
  "black-augusta-ecology-state",
  "black-augusta-entity-seed",
  "black-augusta-review-flag",
]);

export type AugustaTemporalInstrumentDisposition = "active" | "research-index" | "baseline" | "withheld";

export function getTemporalInstrumentDisposition(
  instrumentId: string,
  frame: AugustaTemporalFrame,
): AugustaTemporalInstrumentDisposition {
  if (frame.mode === "current") return "active";
  if (frame.mode === "scenario") return "baseline";
  if (historicalResearchInstrumentIds.has(instrumentId)) return "research-index";
  return "withheld";
}

export function getTemporalMapPosture(frame: AugustaTemporalFrame) {
  switch (frame.mode) {
    case "historical":
      return {
        label: "HISTORICAL RESEARCH FRAME",
        description: "Current material and civic measurements are withheld rather than backcast. Historical nodes remain a research index unless a period-specific source contract is attached.",
      };
    case "scenario":
      return {
        label: "SCENARIO · NOT FORECAST",
        description: "Current signals are baseline context only. No hypothetical state changes until scenario inputs and transformations are explicitly wired.",
      };
    default:
      return {
        label: "CURRENT OBSERVATION FRAME",
        description: "Source-scoped present observations may alter the surface; missing local state remains visibly missing.",
      };
  }
}

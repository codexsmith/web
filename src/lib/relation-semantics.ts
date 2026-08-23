import type { EdgeType, GraphEdge } from "@/lib/content";

export type RelationDirection = "outgoing" | "incoming";

export type RelationLabelPair = {
  forward: string;
  inverse: string;
  symmetric?: boolean;
};

const relationTypeSemantics: Record<EdgeType, RelationLabelPair> = {
  contains: { forward: "contains", inverse: "contained by" },
  specializes: { forward: "specializes", inverse: "specialized by" },
  implements: { forward: "implements", inverse: "implemented by" },
  demonstrates: { forward: "demonstrates", inverse: "demonstrated by" },
  grounds: { forward: "grounds", inverse: "grounded by" },
  "derived-from": { forward: "derived from", inverse: "source for" },
  "depends-on": { forward: "depends on", inverse: "dependency of" },
  "applies-to": { forward: "applies to", inverse: "applied by" },
  extends: { forward: "extends", inverse: "extended by" },
  "contrasts-with": { forward: "contrasts with", inverse: "contrasts with", symmetric: true },
  governs: { forward: "governs", inverse: "governed by" },
  measures: { forward: "measures", inverse: "measured by" },
  documents: { forward: "documents", inverse: "documented by" },
  instantiates: { forward: "instantiates", inverse: "instantiated by" },
};

function edgeKey(edge: GraphEdge) {
  return `${edge.from}::${edge.to}::${edge.type}`;
}

// These edges deliberately use vocabulary that is more specific than their broad edge type.
// The inverse phrase lives here so every renderer preserves that specificity in both directions.
const edgeLabelOverrides: Record<string, Partial<RelationLabelPair>> = {
  "bit::bound-distinction::instantiates": {
    inverse: "calibrated by",
  },
  "boundary-first-ux::executable-representation::applies-to": {
    forward: "applies to",
  },
  "corpus-forge::verification-governance::depends-on": {
    inverse: "required by",
  },
  "agency-audit::verification-governance::applies-to": {
    forward: "applies to",
  },
  "augusta-civic::citywatch::derived-from": {
    inverse: "informs",
  },
  "tools-experiments::applied-testbeds::applies-to": {
    inverse: "continues from",
  },
  "projectr::ontological-software::applies-to": {
    forward: "would apply to",
    inverse: "would be applied by",
  },
  "need-capacity-map::augusta-civic::applies-to": {
    forward: "related public-interest pattern",
    inverse: "related public-interest pattern",
    symmetric: true,
  },
  "boundary-first-weather::executable-representation::demonstrates": {
    inverse: "transport tested by",
  },
  "schemathematics::boundary-theory::applies-to": {
    inverse: "formal apparatus in",
  },
};

export function getRelationLabels(edge: GraphEdge): RelationLabelPair {
  const typeSemantics = relationTypeSemantics[edge.type];
  const override = edgeLabelOverrides[edgeKey(edge)];

  return {
    forward: override?.forward ?? edge.label ?? typeSemantics.forward,
    inverse: override?.inverse ?? typeSemantics.inverse,
    symmetric: override?.symmetric ?? typeSemantics.symmetric,
  };
}

export function getRelationDirection(edge: GraphEdge, focusId: string): RelationDirection | undefined {
  if (edge.from === focusId) return "outgoing";
  if (edge.to === focusId) return "incoming";
  return undefined;
}

export function getDirectedRelationLabel(edge: GraphEdge, direction: RelationDirection) {
  const labels = getRelationLabels(edge);
  return direction === "outgoing" ? labels.forward : labels.inverse;
}

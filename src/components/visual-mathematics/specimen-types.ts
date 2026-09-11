export type VisualMathSpecimenId = "boundary-attractor" | "hopf";

export type VisualMathSpecimenStatus =
  | "established-control"
  | "experimental-bfl-dynamics";

export type VisualMathCommand = "operate" | "record" | "explain";

export type VisualMathConstructionStage = {
  id: string;
  label: string;
  operation?: string;
  detail: string;
};

export type VisualMathSpecimenDefinition = {
  id: VisualMathSpecimenId;
  version: string;
  label: string;
  shortLabel: string;
  status: VisualMathSpecimenStatus;
  statusLabel: string;
  question: string;
  description: string;
  claimBoundary: string;
  implementation: string;
  provenance: string[];
  construction: VisualMathConstructionStage[];
  capabilities: Array<"operate" | "record" | "explain" | "compare">;
};

export function isVisualMathSpecimenId(value: string | undefined): value is VisualMathSpecimenId {
  return value === "boundary-attractor" || value === "hopf";
}

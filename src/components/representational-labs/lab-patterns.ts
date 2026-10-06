import type { ReactNode } from "react";

export type RepresentationalLabLayout =
  | "control-stage"
  | "instrument-inspector"
  | "comparison";

export type RepresentationalLabTone =
  | "neutral"
  | "info"
  | "change"
  | "warning"
  | "defect"
  | "repair"
  | "success";

export type RepresentationalLabOperation =
  | "distinguish"
  | "bound"
  | "admit"
  | "represent"
  | "execute"
  | "observe"
  | "stress"
  | "detect"
  | "trace"
  | "repair"
  | "compare"
  | "promote"
  | "reset";

export type RepresentationalLabTraceEvent = {
  seq: number;
  label: string;
  detail: string;
  tone?: RepresentationalLabTone;
};

export type RepresentationalLabClaimBoundary = {
  label: string;
  detail: ReactNode;
  tone?: "caution" | "neutral";
};

export type RepresentationalLabMetric = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

export type RepresentationalLabIdentity = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
};

/**
 * Serializable catalog/routing contract for a representational laboratory.
 *
 * Keep this descriptor free of React nodes and experiment state so it can be
 * reused by routes, catalogs, registries, telemetry, or a later Schemathematics
 * apparatus without importing the lab implementation itself.
 */
export type RepresentationalLabDefinition = {
  id: string;
  version: string;
  suiteOrder?: number;
  route: string;
  status: "prototype" | "calibration" | "experimental" | "public";
  layout: RepresentationalLabLayout;
  eyebrow: string;
  title: string;
  question: string;
  description: string;
  claimBoundary: {
    label: string;
    detail: string;
    tone?: "caution" | "neutral";
  };
  operations: RepresentationalLabOperation[];
};

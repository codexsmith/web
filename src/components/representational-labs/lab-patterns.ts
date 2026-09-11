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

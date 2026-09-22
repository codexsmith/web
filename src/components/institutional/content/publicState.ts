import projectionData from "@/generated/lab-public-state/public-state.json";

export type TemporalViewId = "changes" | "now" | "timeline";

export type TemporalView = {
  id: TemporalViewId;
  label: string;
  href: string;
  relation: string;
  question: string;
  description: string;
};

export type PublicTimelineEvent = {
  id: string;
  sourceEventId: string;
  period: string;
  category: "Provenance" | "Method" | "Institution";
  title: string;
  summary: string;
  temporalStatus: string;
  epistemicStatus: string;
  affectedSystems: string[];
  unresolved: string | null;
};

export type PublicStateProjection = {
  schemaVersion: string;
  projectionStatus: string;
  generatedDate: string;
  labRevision: string;
  webBaseRevision: string;
  authority: string;
  automation: {
    status: string;
    note: string;
  };
  temporalViews: TemporalView[];
  timeline: {
    registerId: string;
    registerStatus: string;
    authorityStatus: string;
    authorityCeiling: string;
    events: PublicTimelineEvent[];
  };
};

export const publicStateProjection = projectionData as PublicStateProjection;
export const temporalViews = publicStateProjection.temporalViews;
export const labTimelineEvents = publicStateProjection.timeline.events;

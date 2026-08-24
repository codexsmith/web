import type { Metadata } from "next";
import timelineData from "@/content/founder-intellectual-provenance-timeline.json";
import {
  FounderProvenanceTimeline,
  type FounderProvenanceTimelineData,
} from "@/components/founder-provenance-timeline";

export const metadata: Metadata = {
  title: "Founder & Intellectual Provenance Timeline",
  description:
    "A Boundary First chronology of founder formation, research genealogy, theory development, evidence classes, and unresolved provenance work.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FounderProvenanceTimelinePage() {
  return (
    <FounderProvenanceTimeline
      data={timelineData as unknown as FounderProvenanceTimelineData}
    />
  );
}

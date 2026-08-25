import type { Metadata } from "next";
import { BoundedStandaloneSurface } from "@/components/bounded-standalone-surface";
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
    <BoundedStandaloneSurface
      parentNodeId="provenance"
      sectionTheme="about"
      focus={{
        id: "founder-provenance-timeline",
        label: "Founder & Intellectual Provenance Timeline",
        shortLabel: "Founder Timeline",
        path: "about/provenance/timeline",
        kind: "document",
        eyebrow: "Interactive provenance chronology",
        summary:
          "A source-aware chronology of founder formation, research genealogy, theory development, evidence classes, and unresolved provenance work.",
      }}
    >
      <FounderProvenanceTimeline
        data={timelineData as unknown as FounderProvenanceTimelineData}
      />
    </BoundedStandaloneSurface>
  );
}

"use client";

import timelineData from "@/content/founder-intellectual-provenance-timeline.json";
import {
  FounderProvenanceTimeline,
  type FounderProvenanceTimelineData,
} from "@/components/founder-provenance-timeline";

export function FounderProvenanceTimelineEmbedded() {
  return (
    <div id="founder-provenance">
      <FounderProvenanceTimeline
        data={timelineData as unknown as FounderProvenanceTimelineData}
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ProjectionMode } from "@/lib/view-projection";

const mobileTimelineViewport = "(max-width: 760px)";
const canonicalTimelinePath = "/about/provenance/timeline";

type Props = {
  projection: ProjectionMode;
};

export function MobileTimelineProjectionRedirect({ projection }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (projection !== "gestalt") return;

    const media = window.matchMedia(mobileTimelineViewport);
    const redirectToCanonicalTimeline = () => {
      if (media.matches) router.replace(canonicalTimelinePath, { scroll: false });
    };

    redirectToCanonicalTimeline();
    media.addEventListener("change", redirectToCanonicalTimeline);
    return () => media.removeEventListener("change", redirectToCanonicalTimeline);
  }, [projection, router]);

  return null;
}

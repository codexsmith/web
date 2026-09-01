import type { Metadata } from "next";
import { ApparatusLandingWithTour } from "@/components/entrance/ApparatusLandingWithTour";

export const metadata: Metadata = {
  title: "Apparatus Landing · Boundary First Labs",
  description: "Design preview for the Boundary First Labs apparatus landing page and five-minute guided orientation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApparatusLandingPreviewPage() {
  return <ApparatusLandingWithTour />;
}

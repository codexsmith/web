import type { Metadata } from "next";
import { AtlasListExperience } from "@/components/public-interface/AtlasListExperience";

export const metadata: Metadata = {
  title: "Research Atlas — List View",
  description:
    "Browse the complete Boundary First Labs public research Atlas as a traditional, non-graph list organized by architecture stage.",
  alternates: { canonical: "/map/refined" },
};

export default function AtlasListPage() {
  return <AtlasListExperience />;
}

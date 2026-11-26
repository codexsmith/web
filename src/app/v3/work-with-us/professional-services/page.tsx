import type { Metadata } from "next";
import { EngagementGuidePage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Professional Services · Boundary First Labs",
  description: "Bring a system that is expensive to misunderstand. We help reconstruct how it works, where it fails, what must be preserved, and which intervention is worth undertaking.",
  alternates: { canonical: "/work-with-us/professional-services" },
};

export default function Page() {
  return <EngagementGuidePage slug="work-with-us/professional-services" />;
}

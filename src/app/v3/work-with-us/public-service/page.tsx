import type { Metadata } from "next";
import { EngagementGuidePage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Government and Public Service · Boundary First Labs",
  description: "We seek collaborations with public agencies, civic organizations, researchers and communities to investigate consequential failures and support practical, lawful improvements.",
  alternates: { canonical: "/work-with-us/public-service" },
};

export default function Page() {
  return <EngagementGuidePage slug="work-with-us/public-service" />;
}

import type { Metadata } from "next";
import { EngagementGuidePage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Funding, Investment and Sponsorship · Boundary First Labs",
  description: "Boundary First Labs seeks to sustain a digital-native research institution through useful applied work, independent research support and responsibly developed computational capabilities.",
  alternates: { canonical: "/work-with-us/funding" },
};

export default function Page() {
  return <EngagementGuidePage slug="work-with-us/funding" />;
}

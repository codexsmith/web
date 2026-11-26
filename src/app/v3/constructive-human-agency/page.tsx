import type { Metadata } from "next";
import { DoctrineLandingPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Constructive Human Agency",
  description: "Epistemic independence, constructive collaboration, access to capabilities and personal responsibility.",
  alternates: { canonical: "/constructive-human-agency" },
};

export default function Page() {
  return <DoctrineLandingPage slug="constructive-human-agency" />;
}

import type { Metadata } from "next";
import { DoctrineLandingPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "AI Governance · Boundary First Labs",
  description:
    "Boundary First Labs' practical doctrine for bounded AI assistance, consequential artificial agency, authority, contestability, repair, and accountable deployment.",
  alternates: { canonical: "/ai-governance" },
};

export default function Page() {
  return <DoctrineLandingPage slug="ai-governance" />;
}

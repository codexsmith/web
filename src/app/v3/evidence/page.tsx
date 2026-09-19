import type { Metadata } from "next";
import { InstitutionalEvidencePage } from "@/components/institutional/InstitutionalEvidencePage";

export const metadata: Metadata = {
  title: "Evidence · Boundary First Labs",
  description:
    "Track record and evidence for Boundary First Labs: externally corroborated work, founder professional provenance, inspectable BFL artifacts, and the proof points still to be earned.",
  alternates: { canonical: "/evidence" },
};

export default function Page() {
  return <InstitutionalEvidencePage />;
}

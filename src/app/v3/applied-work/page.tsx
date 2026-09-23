import type { Metadata } from "next";
import { InstitutionalAppliedWorkPage } from "@/components/institutional/InstitutionalAppliedWorkPage";

export const metadata: Metadata = {
  title: "Applied Work & Consulting · Boundary First Labs",
  description:
    "Systems consulting from Boundary First Labs for software architecture, AI and operational governance, research infrastructure, technical diagnosis, bounded pilots, workshops, and fractional advisory.",
  alternates: { canonical: "/applied-work" },
};

export default function Page() {
  return <InstitutionalAppliedWorkPage />;
}

import type { Metadata } from "next";
import { InstitutionalAppliedWorkPage } from "@/components/institutional/InstitutionalAppliedWorkPage";

export const metadata: Metadata = {
  title: "Applied Work · Boundary First Labs",
  description:
    "Applied systems work from Boundary First Labs: software and architecture review, AI governance, bounded pilots, systems diagnosis, research infrastructure, workshops, and technical advisory.",
  alternates: { canonical: "/v3/applied-work" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalAppliedWorkPage />;
}

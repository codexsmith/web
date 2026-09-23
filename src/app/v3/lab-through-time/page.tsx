import type { Metadata } from "next";
import { InstitutionalLabThroughTimePage } from "@/components/institutional/InstitutionalLabThroughTimePage";

export const metadata: Metadata = {
  title: "Lab Through Time · Boundary First Labs",
  description:
    "A source-bound public timeline of consequential milestones in the work that became Boundary First Labs.",
  alternates: { canonical: "/lab-through-time" },
};

export default function Page() {
  return <InstitutionalLabThroughTimePage />;
}

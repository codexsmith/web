import type { Metadata } from "next";
import { InstitutionalResearchPage } from "@/components/institutional/InstitutionalResearchPage";

export const metadata: Metadata = {
  title: "Research · Boundary First Labs",
  description: "Research programs, scientific models, experiments, executable representations, and inspectable research machinery at Boundary First Labs.",
  alternates: { canonical: "/research" },
};

export default function Page() {
  return <InstitutionalResearchPage />;
}

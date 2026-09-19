import type { Metadata } from "next";
import { InstitutionalResearchPage } from "@/components/institutional/InstitutionalResearchPage";

export const metadata: Metadata = {
  title: "Research · Boundary First Labs",
  description: "Research programs, working theories, experiments, and inspectable research machinery at Boundary First Labs.",
  alternates: { canonical: "/v3/research" },
};

export default function Page() {
  return <InstitutionalResearchPage />;
}

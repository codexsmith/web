import type { Metadata } from "next";
import { InstitutionalAiGovernancePage } from "@/components/institutional/InstitutionalAiGovernancePage";

export const metadata: Metadata = {
  title: "AI Governance · Boundary First Labs",
  description:
    "Boundary First Labs' practical doctrine for bounded AI assistance, consequential artificial agency, authority, contestability, repair, and accountable deployment.",
  alternates: { canonical: "/v3/ai-governance" },
};

export default function Page() {
  return <InstitutionalAiGovernancePage />;
}

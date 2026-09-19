import type { Metadata } from "next";
import { InstitutionalFundingPage } from "@/components/institutional/InstitutionalFundingPage";

export const metadata: Metadata = {
  title: "Funding · Boundary First Labs",
  description:
    "How Boundary First Labs uses funding to convert existing research capacity into inspectable evidence, useful artifacts, external review, and sustainable operations.",
  alternates: { canonical: "/funding" },
};

export default function Page() {
  return <InstitutionalFundingPage />;
}

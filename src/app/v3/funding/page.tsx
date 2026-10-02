import type { Metadata } from "next";
import { InstitutionalFundingPage } from "@/components/institutional/InstitutionalFundingPage";

export const metadata: Metadata = {
  title: "Funding · Boundary First Labs",
  description:
    "Ways to support specific Boundary First Labs research, products, services, and public-interest work, with clear uses, milestones, evidence, and limits.",
  alternates: { canonical: "/funding" },
};

export default function Page() {
  return <InstitutionalFundingPage />;
}

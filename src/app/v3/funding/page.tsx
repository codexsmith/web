import type { Metadata } from "next";
import { InstitutionalFundingPage } from "@/components/institutional/InstitutionalFundingPage";

export const metadata: Metadata = {
  title: "Funding · Boundary First Labs",
  description:
    "Boundary First Labs funding and capitalization: how runway, earned services, product capital, research funding, and later credit convert existing capacity into external evidence and durable operations.",
  alternates: { canonical: "/funding" },
};

export default function Page() {
  return <InstitutionalFundingPage />;
}

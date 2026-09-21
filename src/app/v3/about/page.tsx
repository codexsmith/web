import type { Metadata } from "next";
import { InstitutionalAboutPage } from "@/components/institutional/InstitutionalAboutPage";

export const metadata: Metadata = {
  title: "About · Boundary First Labs",
  description: "What Boundary First Labs is: a founder-led solopreneur operation, a single-person computationally leveraged applied systems laboratory and business, plus the method and stewardship commitments that guide the work.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <InstitutionalAboutPage />;
}

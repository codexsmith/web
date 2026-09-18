import type { Metadata } from "next";
import { InstitutionalAboutPage } from "@/components/institutional/InstitutionalAboutPage";

export const metadata: Metadata = {
  title: "About · Boundary First Labs",
  description: "What Boundary First Labs is, how the method developed, and the agency and stewardship commitments that guide the work.",
  alternates: { canonical: "/v3/about" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalAboutPage />;
}

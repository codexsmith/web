import type { Metadata } from "next";
import { InstitutionalOpenLabPage } from "@/components/institutional/InstitutionalOpenLabPage";

export const metadata: Metadata = {
  title: "Open Lab · Boundary First Labs",
  description: "The public participation boundary for critique, collaboration, public-system inspection, and unusual work at Boundary First Labs.",
  alternates: { canonical: "/v3/open-lab" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalOpenLabPage />;
}

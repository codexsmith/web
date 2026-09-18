import type { Metadata } from "next";
import { InstitutionalProjectsPage } from "@/components/institutional/InstitutionalProjectsPage";

export const metadata: Metadata = {
  title: "Projects · Boundary First Labs",
  description: "Bounded projects, transfer evidence, and applied work from Boundary First Labs.",
  alternates: { canonical: "/v3/projects" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalProjectsPage />;
}

import type { Metadata } from "next";
import { InstitutionalProjectsPage } from "@/components/institutional/InstitutionalProjectsPage";

export const metadata: Metadata = {
  title: "Projects · Boundary First Labs",
  description: "Concrete Boundary First Labs projects showing what was built or tested, what exists now, what has been learned, and what remains uncertain.",
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <InstitutionalProjectsPage />;
}

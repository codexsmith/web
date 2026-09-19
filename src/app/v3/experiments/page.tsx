import type { Metadata } from "next";
import { InstitutionalExperimentsPage } from "@/components/institutional/InstitutionalExperimentsPage";

export const metadata: Metadata = {
  title: "Experiments · Boundary First Labs",
  description:
    "Experiments, reproductions, witnesses, and bounded tests used to challenge and refine Boundary First Labs research.",
  alternates: { canonical: "/v3/experiments" },
};

export default function ExperimentsPage() {
  return <InstitutionalExperimentsPage />;
}

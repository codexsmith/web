import type { Metadata } from "next";
import { InstitutionalExperimentsPage } from "@/components/institutional/InstitutionalExperimentsPage";

export const metadata: Metadata = {
  title: "Experiments · Boundary First Labs",
  description:
    "A public orientation to the Boundary First Labs experiment register: computational tests, comparisons, simulations, falsification attempts, operational experiments, and their result boundaries.",
  alternates: { canonical: "/experiments" },
};

export default function ExperimentsPage() {
  return <InstitutionalExperimentsPage />;
}

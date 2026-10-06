import type { Metadata } from "next";
import { InstitutionalObservatoryPage } from "@/components/institutional/InstitutionalObservatoryPage";

export const metadata: Metadata = {
  title: "Observatory · Boundary First Labs",
  description:
    "A public inspection surface for Boundary First Labs research, maps, experiments, evidence, machinery, institutional state, and history.",
  alternates: { canonical: "/observatory" },
};

export default function Page() {
  return <InstitutionalObservatoryPage />;
}

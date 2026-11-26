import type { Metadata } from "next";
import { InstitutionalObservatoryPage } from "@/components/institutional/InstitutionalObservatoryPage";

export const metadata: Metadata = {
  title: "Observatory · Boundary First Labs",
  description:
    "A curated exhibition of Boundary First Labs research foundations, architecture, methods, and selected public demonstrations.",
  alternates: { canonical: "/observatory" },
};

export default function Page() {
  return <InstitutionalObservatoryPage />;
}

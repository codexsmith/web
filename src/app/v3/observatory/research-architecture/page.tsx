import type { Metadata } from "next";
import { PublicObservatoryExhibitPage } from "@/components/institutional/PublicObservatoryExhibitPage";

export const metadata: Metadata = {
  title: "Research architecture \u00b7 Observatory",
  description: "The laboratory investigates the relationships between representation, transformation and consequence through several interacting research directions. The aim is to develop reusable understanding without erasing the distinct requirements of each domain.",
  alternates: { canonical: "/observatory/research-architecture" },
};

export default function Page() {
  return <PublicObservatoryExhibitPage slug="observatory/research-architecture" />;
}

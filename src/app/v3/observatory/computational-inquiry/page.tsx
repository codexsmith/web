import type { Metadata } from "next";
import { PublicObservatoryExhibitPage } from "@/components/institutional/PublicObservatoryExhibitPage";

export const metadata: Metadata = {
  title: "Computationally leveraged inquiry \u00b7 Observatory",
  description: "Boundary First Labs is currently a solo-operated institution. Its computational leverage is intended to extend the capacity for research, construction and verification while preserving human direction and responsibility.",
  alternates: { canonical: "/observatory/computational-inquiry" },
};

export default function Page() {
  return <PublicObservatoryExhibitPage slug="observatory/computational-inquiry" />;
}

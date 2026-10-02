import type { Metadata } from "next";
import { BoundaryFirstWeatherExperience } from "@/components/institutional/products/BoundaryFirstWeatherExperience";

export const metadata: Metadata = {
  title: "Boundary First Weather · Boundary First Labs",
  description:
    "Boundary First Weather is a research testbed for showing forecast change and model disagreement, and for testing whether boundary-aware diagnostics can improve weather analysis or computation.",
  alternates: { canonical: "/products/boundary-first-weather" },
};

export default function Page() {
  return <BoundaryFirstWeatherExperience />;
}

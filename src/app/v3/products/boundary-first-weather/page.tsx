import type { Metadata } from "next";
import { BoundaryFirstWeatherExperience } from "@/components/institutional/products/BoundaryFirstWeatherExperience";

export const metadata: Metadata = {
  title: "Boundary First Weather · Boundary First Labs",
  description:
    "Boundary First Weather is a computational research and decision-support product for testing boundary-aware diagnostics, forecast disagreement, and selective refinement.",
  alternates: { canonical: "/v3/products/boundary-first-weather" },
};

export default function Page() {
  return <BoundaryFirstWeatherExperience />;
}

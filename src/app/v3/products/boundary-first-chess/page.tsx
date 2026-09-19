import type { Metadata } from "next";
import { BoundaryFirstChessExperience } from "@/components/institutional/products/BoundaryFirstChessExperience";

export const metadata: Metadata = {
  title: "Boundary-First Chess · Boundary First Labs",
  description:
    "Boundary-First Chess is a visual teaching framework and explainable-analysis research product for helping chess learners see structural change on the board.",
  alternates: { canonical: "/products/boundary-first-chess" },
};

export default function Page() {
  return <BoundaryFirstChessExperience />;
}

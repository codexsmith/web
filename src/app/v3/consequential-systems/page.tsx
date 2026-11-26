import type { Metadata } from "next";
import { DoctrineLandingPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Consequential Systems",
  description: "Consequence accounting, maintenance, repair, lifecycle economics and sustainable systems engineering.",
  alternates: { canonical: "/consequential-systems" },
};

export default function Page() {
  return <DoctrineLandingPage slug="consequential-systems" />;
}

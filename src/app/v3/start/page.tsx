import type { Metadata } from "next";
import { InstitutionalStartPage } from "@/components/institutional/InstitutionalStartPage";

export const metadata: Metadata = {
  title: "Start Here · Boundary First Labs",
  description:
    "Choose a path through Boundary First Labs based on what you want to understand, inspect, build, fund, challenge, or use.",
  alternates: { canonical: "/v3/start" },
};

export default function StartPage() {
  return <InstitutionalStartPage />;
}

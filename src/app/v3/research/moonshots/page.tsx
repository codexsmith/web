import type { Metadata } from "next";
import { InstitutionalMoonshotsPage } from "@/components/institutional/InstitutionalMoonshotsPage";

export const metadata: Metadata = {
  title: "Moonshots · Boundary First Labs",
  description:
    "Six long-horizon research objectives that make Boundary First Labs' longer capability direction explicit without presenting ambition as achieved capability.",
  alternates: { canonical: "/research/moonshots" },
};

export default function Page() {
  return <InstitutionalMoonshotsPage />;
}

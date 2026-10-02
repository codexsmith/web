import type { Metadata } from "next";
import { InstitutionalMoonshotsPage } from "@/components/institutional/InstitutionalMoonshotsPage";

export const metadata: Metadata = {
  title: "Moonshots · Boundary First Labs",
  description:
    "Eight long-horizon Boundary First Labs research goals, each kept separate from claims of completed capability, scientific validation, adoption, or inevitability.",
  alternates: { canonical: "/research/moonshots" },
};

export default function Page() {
  return <InstitutionalMoonshotsPage />;
}

import type { Metadata } from "next";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Paper Mine",
  description:
    "A corpus-wide bounded public projection of controlled publication objects and mined paper candidates across Boundary First Labs, with visible provenance, readiness, claim ceilings, evidence obligations, and paperization gates.",
  alternates: { canonical: "/research/paper-mine" },
};

export default function PaperMinePage() {
  return <PaperMineView data={paperMineSnapshot} />;
}

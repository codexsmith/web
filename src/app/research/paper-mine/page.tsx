import type { Metadata } from "next";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Paper Mine",
  description:
    "A bounded public projection of paper-shaped research discovered across the Boundary First Labs corpus, with visible provenance, readiness, claim ceilings, evidence obligations, and paperization gates.",
  alternates: { canonical: "/research/paper-mine" },
};

export default function PaperMinePage() {
  return <PaperMineView data={paperMineSnapshot} />;
}

import type { Metadata } from "next";
import { BoundedStandaloneSurface } from "@/components/bounded-standalone-surface";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Paper Mine",
  description:
    "A corpus-wide bounded public projection of controlled publication objects and mined paper candidates across Boundary First Labs, with visible provenance, readiness, claim ceilings, evidence obligations, and paperization gates.",
  alternates: { canonical: "/research/paper-mine" },
};

export default function PaperMinePage() {
  return (
    <BoundedStandaloneSurface
      parentNodeId="research"
      sectionTheme="research"
      focus={{
        id: "paper-mine",
        label: "Paper Mine",
        path: "research/paper-mine",
        kind: "research",
        eyebrow: "Corpus-wide publication discovery",
        summary:
          "A bounded public workbench for controlled publication objects and paper-shaped candidates already present across the Lab corpus.",
      }}
    >
      <PaperMineView data={paperMineSnapshot} />
    </BoundedStandaloneSurface>
  );
}

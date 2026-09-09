import type { Metadata } from "next";
import { BoundedStandaloneSurface } from "@/components/bounded-standalone-surface";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "The Boundary First Labs Paper Mine: a corpus-wide bounded public projection of controlled publication objects and mined paper candidates, with visible provenance, readiness, claim ceilings, evidence obligations, and paperization gates.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsPage() {
  return (
    <BoundedStandaloneSurface
      parentNodeId="root"
      sectionTheme="publications"
      focus={{
        id: "publications",
        label: "Publications",
        path: "publications",
        kind: "branch",
        eyebrow: "Corpus-wide publication discovery",
        summary:
          "The Paper Mine is the public publication field: controlled publication objects and paper-shaped candidates already present across the Lab corpus.",
      }}
    >
      <PaperMineView data={paperMineSnapshot} />
    </BoundedStandaloneSurface>
  );
}

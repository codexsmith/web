import type { Metadata } from "next";
import { InstitutionalInstrumentShell } from "@/components/institutional/InstitutionalInstrumentShell";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Paper Mine · Boundary First Labs",
  description:
    "A searchable August 24, 2026 snapshot of Boundary First Labs publication records and paper candidates, preserved as a discovery workbench rather than a live publication count.",
  alternates: { canonical: "/research/paper-mine" },
};

export default function PaperMinePage() {
  return (
    <InstitutionalInstrumentShell>
      <PaperMineView data={paperMineSnapshot} />
    </InstitutionalInstrumentShell>
  );
}

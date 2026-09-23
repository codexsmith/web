import type { Metadata } from "next";
import { InstitutionalInstrumentShell } from "@/components/institutional/InstitutionalInstrumentShell";
import { PaperMineView } from "@/components/paper-mine/paper-mine-view";
import { paperMineSnapshot } from "@/lib/paper-mine";

export const metadata: Metadata = {
  title: "Paper Mine · Boundary First Labs",
  description:
    "A bounded public workbench for controlled publication objects and paper-shaped candidates across Boundary First Labs.",
  alternates: { canonical: "/research/paper-mine" },
};

export default function PaperMinePage() {
  return (
    <InstitutionalInstrumentShell>
      <PaperMineView data={paperMineSnapshot} />
    </InstitutionalInstrumentShell>
  );
}

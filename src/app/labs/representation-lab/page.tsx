import type { Metadata } from "next";
import { RepresentationLab } from "@/app/playground/representation-lab/RepresentationLab";
import { InstitutionalInstrumentShell } from "@/components/institutional/InstitutionalInstrumentShell";
import "../../playground/representation-lab/representation-lab-physical.css";
import "../../playground/representation-lab/representation-lab-density.css";
import "../../playground/representation-lab/representation-lab-instrument-sync.css";
import "../../playground/representation-lab/representation-lab-drawers.css";
import "../../playground/representation-lab/representation-lab-wizard-global.css";

export const metadata: Metadata = {
  title: "Same World, Different Reasoner · Boundary First Labs",
  description:
    "Interactive representation laboratory: keep one grid world fixed while changing the task, reasoning method, information boundary, and representational carrier.",
  alternates: { canonical: "/labs/representation-lab" },
};

export default function RepresentationLabPage() {
  return (
    <InstitutionalInstrumentShell>
      <div
        className="representation-lab-physical-shell"
        data-bfux-skin="physical"
        data-section-theme="research"
      >
        <RepresentationLab />
      </div>
    </InstitutionalInstrumentShell>
  );
}

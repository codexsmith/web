import type { Metadata } from "next";
import { DistinctionSpacePanelCollapseController } from "@/components/bfux/DistinctionSpacePanelCollapseController";
import { DistinctionSpaceSandboxSurface } from "@/components/bfux/DistinctionSpaceSandboxSurface";
import { InstitutionalInstrumentShell } from "@/components/institutional/InstitutionalInstrumentShell";
import "../../sandbox/distinction-space/instrument-lab.css";
import "../../sandbox/distinction-space/specimen-canvas-fix.css";
import "../../sandbox/distinction-space/instrument-layout.css";
import "../../sandbox/distinction-space/instrument-trim.css";
import "../../sandbox/distinction-space/instrument-command-pods.css";
import "../../sandbox/distinction-space/instrument-collapse.css";

export const metadata: Metadata = {
  title: "Distinction Space Visual Lab · Boundary First Labs",
  description:
    "Interactive Boundary First visual-mathematics laboratory for exploring bounded dynamics, closure, defect, and higher-dimensional structure.",
  alternates: { canonical: "/labs/distinction-space" },
};

export default function DistinctionSpaceLabPage() {
  return (
    <InstitutionalInstrumentShell>
      <DistinctionSpaceSandboxSurface closeHref="/experiments" />
      <DistinctionSpacePanelCollapseController />
    </InstitutionalInstrumentShell>
  );
}

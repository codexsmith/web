import type { Metadata } from "next";
import { LabMachineHomeBoundary } from "@/components/bfux/LabMachineHomeBoundary";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import "./capital-frame.css";
import "./capital-frame-canonical-connectors.css";
import "./capital-frame-zoom-resilience.css";
import "./capital-frame-conversion-iconography.css";
import "./capital-frame-engine-core.css";
import "./capital-frame-surface-system.css";
import "./capital-frame-machine-function-control-flags.css";
import "./capital-frame-stewardship-polish.css";
import "./capital-frame-cycle-loop.css";

export const metadata: Metadata = {
  title: "Boundary First Labs · Capital Economics Prototype",
  description: "Prototype institutional economics and capital projection for Boundary First Labs.",
  robots: { index: false, follow: false },
};

export default function CapitalPrototypePage() {
  return (
    <LabMachineHomeBoundary resetTraversal>
      <LabMachineWorld
        initialProjection="world"
        initialProcessScope="full"
        initialSurface="capital"
        initialResolution="focus"
        machinePath="/"
      />
    </LabMachineHomeBoundary>
  );
}

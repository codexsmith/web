import type { Metadata } from "next";
import { Suspense } from "react";
import { LabMachineHomeExperience } from "@/components/bfux/LabMachineHomeExperience";
import { LabMachineHomeRoute } from "@/components/bfux/LabMachineHomeRoute";
import "./world/world-machine-preview.css";
import "./world/world-machine-grid-contract.css";
import "./lab-machine-responsive.css";
import "./lab-machine-responsive-pass2.css";
import "./lab-machine-frame.css";
import "./lab-machine-composition.css";
import "./bfux-grid-composition-bridge.css";
import "./lab-machine-type-step.css";
import "./proto/capital/capital-frame.css";
import "./proto/capital/capital-frame-canonical-connectors.css";
import "./proto/capital/capital-frame-zoom-resilience.css";
import "./proto/capital/capital-frame-conversion-iconography.css";
import "./proto/capital/capital-frame-engine-core.css";
import "./proto/capital/capital-frame-surface-system.css";
import "./proto/capital/capital-frame-machine-function-control-flags.css";
import "./proto/capital/capital-frame-stewardship-polish.css";
import "./proto/capital/capital-frame-cycle-loop.css";
import "./mobile-capital-projection-v2.css";
import "./mobile-apparatus-layering.css";
import "./mobile-machine-row-projection.css";
import "./mobile-machine-noncrossing-pipes.css";
import "./mobile-machine-scroll-projection.css";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Software for difficult systems, public-interest projects, publications, and research into executable representation.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

function HomeFallback() {
  return (
    <LabMachineHomeExperience
      projection="world"
      processScope="full"
      initialSurface="machine"
      initialResolution="focus"
      showSchematic={false}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <LabMachineHomeRoute />
    </Suspense>
  );
}

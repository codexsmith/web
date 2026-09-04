import type { Metadata } from "next";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import { LabMachineHomeBoundary } from "@/components/bfux/LabMachineHomeBoundary";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import "./world/world-machine-preview.css";
import "./lab-machine-responsive.css";
import "./lab-machine-responsive-pass2.css";
import "./lab-machine-frame.css";
import "./lab-machine-composition.css";
import "./proto/capital/capital-frame.css";
import "./proto/capital/capital-frame-canonical-connectors.css";
import "./proto/capital/capital-frame-zoom-resilience.css";
import "./proto/capital/capital-frame-conversion-iconography.css";
import "./proto/capital/capital-frame-engine-core.css";
import "./proto/capital/capital-frame-surface-system.css";
import "./proto/capital/capital-frame-machine-function-control-flags.css";
import "./proto/capital/capital-frame-stewardship-polish.css";
import "./proto/capital/capital-frame-cycle-loop.css";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Software for difficult systems, public-interest projects, publications, and research into executable representation.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

type Props = {
  searchParams: Promise<{
    section?: string | string[];
    view?: string | string[];
    scope?: string | string[];
    schematic?: string | string[];
    mode?: string | string[];
    resolution?: string | string[];
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: Props) {
  const query = await searchParams;
  const section = one(query.section);
  const projection = parseProjection(one(query.view)) ?? "world";
  const processScope = parseProcessScope(one(query.scope)) ?? "full";
  const showSchematic = one(query.schematic) === "1";
  const initialSurface = one(query.mode) === "capital" ? "capital" : "machine";
  const initialResolution = section || one(query.resolution) === "full" ? "mid" : "focus";

  return (
    <LabMachineHomeBoundary resetTraversal={!section}>
      <LabMachineWorld
        section={section}
        initialProjection={projection}
        initialProcessScope={processScope}
        initialSurface={initialSurface}
        initialResolution={initialResolution}
        showSchematic={showSchematic}
        machinePath="/"
      />
    </LabMachineHomeBoundary>
  );
}

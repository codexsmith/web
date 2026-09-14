"use client";

import type { ProcessScope } from "@/lib/bfl-process";
import type { ProjectionMode } from "@/lib/view-projection";
import { BfuxCardGeometryNormalizer } from "./BfuxCardGeometryNormalizer";
import { BfuxLayoutStudio } from "./BfuxLayoutStudio";
import { LabMachineHomeBoundary } from "./LabMachineHomeBoundary";
import { LabMachineWorld } from "./LabMachineWorld";
import { MobileCapitalProjectionControls } from "./MobileCapitalProjectionControls";
import { MobileMachineNonCrossingPipeLayer } from "./MobileMachineNonCrossingPipeLayer";
import { MobileTimelineProjectionRedirect } from "./MobileTimelineProjectionRedirect";
import { RepresentationLabBillboardCardMount } from "./RepresentationLabBillboardCardMount";
import type { LabMachineResolution } from "./LabMachine";

type Props = {
  section?: string;
  projection: ProjectionMode;
  processScope: ProcessScope;
  initialSurface: "machine" | "capital";
  initialResolution: LabMachineResolution;
  showSchematic: boolean;
};

export function LabMachineHomeExperience({
  section,
  projection,
  processScope,
  initialSurface,
  initialResolution,
  showSchematic,
}: Props) {
  return (
    <LabMachineHomeBoundary resetTraversal={!section}>
      <MobileTimelineProjectionRedirect projection={projection} />
      <MobileCapitalProjectionControls />
      <MobileMachineNonCrossingPipeLayer />
      <RepresentationLabBillboardCardMount />
      <BfuxCardGeometryNormalizer />
      <BfuxLayoutStudio />
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

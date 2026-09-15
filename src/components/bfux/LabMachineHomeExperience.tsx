"use client";

import dynamic from "next/dynamic";
import type { ProcessScope } from "@/lib/bfl-process";
import type { ProjectionMode } from "@/lib/view-projection";
import { BfuxAuthoredLayoutLayer } from "./BfuxAuthoredLayoutLayer";
import { BfuxCardGeometryNormalizer } from "./BfuxCardGeometryNormalizer";
import { LabMachineHomeBoundary } from "./LabMachineHomeBoundary";
import { LabMachineWorld } from "./LabMachineWorld";
import { MobileCapitalProjectionControls } from "./MobileCapitalProjectionControls";
import { MobileMachineNonCrossingPipeLayer } from "./MobileMachineNonCrossingPipeLayer";
import { MobileTimelineProjectionRedirect } from "./MobileTimelineProjectionRedirect";
import { RepresentationLabBillboardCardMount } from "./RepresentationLabBillboardCardMount";
import type { LabMachineResolution } from "./LabMachine";

const BfuxLayoutStudio = dynamic(
  () => import("./BfuxLayoutStudio").then((module) => module.BfuxLayoutStudio),
  { ssr: false },
);

type Props = {
  section?: string;
  projection: ProjectionMode;
  processScope: ProcessScope;
  initialSurface: "machine" | "capital";
  initialResolution: LabMachineResolution;
  showSchematic: boolean;
  enableLayoutStudio?: boolean;
};

export function LabMachineHomeExperience({
  section,
  projection,
  processScope,
  initialSurface,
  initialResolution,
  showSchematic,
  enableLayoutStudio = false,
}: Props) {
  return (
    <LabMachineHomeBoundary resetTraversal={!section}>
      <MobileTimelineProjectionRedirect projection={projection} />
      <MobileCapitalProjectionControls />
      <MobileMachineNonCrossingPipeLayer />
      <RepresentationLabBillboardCardMount />
      <BfuxCardGeometryNormalizer />
      {enableLayoutStudio ? <BfuxLayoutStudio /> : <BfuxAuthoredLayoutLayer />}
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

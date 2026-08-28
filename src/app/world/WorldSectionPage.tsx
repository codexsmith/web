"use client";

import { useRouter } from "next/navigation";
import { LabMachine } from "@/components/bfux/LabMachine";
import { LabMachineAboutProjection } from "@/components/bfux/LabMachineAboutProjection";
import { LabMachineApplicationsProjection } from "@/components/bfux/LabMachineApplicationsProjection";
import { LabMachineGovernanceProjection } from "@/components/bfux/LabMachineGovernanceProjection";
import { LabMachineMethodProjection } from "@/components/bfux/LabMachineMethodProjection";
import { LabMachinePeopleProjection } from "@/components/bfux/LabMachinePeopleProjection";
import { LabMachinePipelineProjection } from "@/components/bfux/LabMachinePipelineProjection";
import { LabMachineProductsProjection } from "@/components/bfux/LabMachineProductsProjection";
import { LabMachinePublicValueProjection } from "@/components/bfux/LabMachinePublicValueProjection";
import { LabMachineResearchProjection } from "@/components/bfux/LabMachineResearchProjection";
import { LabMachineServiceProjection } from "@/components/bfux/LabMachineServiceProjection";
import { LabMachineTimelineProjection } from "@/components/bfux/LabMachineTimelineProjection";

export function WorldSectionPage({ section, skin, showSchematic }: { section: string; skin: "apparatus" | "physical"; showSchematic: boolean }) {
  const router = useRouter();
  const close = () => {
    const params = new URLSearchParams({ skin });
    if (showSchematic) params.set("schematic", "1");
    router.push(`/world?${params.toString()}`);
  };

  switch (section) {
    case "research":
      return <LabMachineResearchProjection initialMode="program-map" onBack={close} onClose={close} />;
    case "products":
      return <LabMachineProductsProjection initialMode="experimental-portfolio" onBack={close} onClose={close} />;
    case "applications":
      return <LabMachineApplicationsProjection initialMode="domain-map" onBack={close} onClose={close} />;
    case "service":
      return <LabMachineServiceProjection initialMode="distribution-map" onBack={close} onClose={close} />;
    case "public-value":
      return <LabMachinePublicValueProjection initialMode="capability-map" onBack={close} onClose={close} />;
    case "people":
      return <LabMachinePeopleProjection initialMode="participation-network" onBack={close} onClose={close} />;
    case "method":
      return <LabMachineMethodProjection initialMode="method-stack" onBack={close} onClose={close} />;
    case "pipeline":
      return <LabMachinePipelineProjection initialMode="flow-map" onBack={close} onClose={close} />;
    case "governance":
      return <LabMachineGovernanceProjection initialMode="authority-map" onBack={close} onClose={close} />;
    case "about":
      return <LabMachineAboutProjection initialMode="institutional-profile" onBack={close} onClose={close} />;
    case "timeline":
      return <LabMachineTimelineProjection initialMode="institutional-timeline" onBack={close} onClose={close} />;
    default:
      return <LabMachine skin={skin} showSchematic={showSchematic} initialNodeId={section} />;
  }
}

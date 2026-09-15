"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import { LabMachineHomeExperience } from "./LabMachineHomeExperience";

const machineStateKeys = ["section", "view", "scope", "schematic", "mode", "resolution"] as const;

function DefaultExperience() {
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

export function LabMachineHomeRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasMachineState = machineStateKeys.some((key) => Boolean(searchParams.get(key)));
  const shouldCanonicalize = searchParams.get("skin") === "physical" && !hasMachineState;
  const enableLayoutStudio = searchParams.get("bfux") === "edit";

  useEffect(() => {
    if (shouldCanonicalize) router.replace("/", { scroll: false });
  }, [router, shouldCanonicalize]);

  if (shouldCanonicalize) return <DefaultExperience />;

  const section = searchParams.get("section") || undefined;
  const projection = parseProjection(searchParams.get("view") ?? undefined) ?? "world";
  const processScope = parseProcessScope(searchParams.get("scope") ?? undefined) ?? "full";
  const showSchematic = searchParams.get("schematic") === "1";
  const initialSurface = searchParams.get("mode") === "capital" ? "capital" : "machine";
  const initialResolution = section || searchParams.get("resolution") === "full" ? "mid" : "focus";

  return (
    <LabMachineHomeExperience
      section={section}
      projection={projection}
      processScope={processScope}
      initialSurface={initialSurface}
      initialResolution={initialResolution}
      showSchematic={showSchematic}
      enableLayoutStudio={enableLayoutStudio}
    />
  );
}

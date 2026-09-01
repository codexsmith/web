"use client";

import { useState } from "react";
import { HeroScreen } from "@/components/hero-screen";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import type { ProcessScope } from "@/lib/bfl-process";
import type { ProjectionMode } from "@/lib/view-projection";

type HomeEntryExperienceProps = {
  section?: string;
  initialProjection: ProjectionMode;
  initialProcessScope: ProcessScope;
  showSchematic?: boolean;
  forceMachine?: boolean;
};

export function HomeEntryExperience({
  section,
  initialProjection,
  initialProcessScope,
  showSchematic = false,
  forceMachine = false,
}: HomeEntryExperienceProps) {
  const [entered, setEntered] = useState(forceMachine);

  if (!entered) {
    return <HeroScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <LabMachineWorld
      section={section}
      initialProjection={initialProjection}
      initialProcessScope={initialProcessScope}
      showSchematic={showSchematic}
      machinePath="/"
    />
  );
}

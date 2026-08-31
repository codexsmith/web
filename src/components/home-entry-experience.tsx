"use client";

import { useEffect, useState } from "react";
import { HeroScreen } from "@/components/hero-screen";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import type { ProcessScope } from "@/lib/bfl-process";
import type { ProjectionMode } from "@/lib/view-projection";

const enteredSessionKey = "bfl_entered_lab";

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

  useEffect(() => {
    if (forceMachine) {
      setEntered(true);
      return;
    }

    try {
      if (window.sessionStorage.getItem(enteredSessionKey) === "1") {
        setEntered(true);
      }
    } catch {
      // The threshold still works when storage is unavailable.
    }
  }, [forceMachine]);

  if (!entered) {
    return (
      <HeroScreen
        onEnter={() => {
          try {
            window.sessionStorage.setItem(enteredSessionKey, "1");
          } catch {
            // Entering the Lab does not depend on storage.
          }
          setEntered(true);
        }}
      />
    );
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

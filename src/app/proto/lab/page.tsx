import type { Metadata } from "next";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import "../../world/world-machine-preview.css";

export const metadata: Metadata = {
  title: "Boundary First Labs · Intermediate Grammar Prototype",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{
    section?: string | string[];
    view?: string | string[];
    scope?: string | string[];
    schematic?: string | string[];
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LabPrototypePage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <LabMachineWorld
      section={one(query.section)}
      initialProjection={parseProjection(one(query.view)) ?? "world"}
      initialProcessScope={parseProcessScope(one(query.scope)) ?? "full"}
      showSchematic={one(query.schematic) === "1"}
      machinePath="/proto/lab"
      intermediateLayer
    />
  );
}

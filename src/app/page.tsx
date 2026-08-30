import type { Metadata } from "next";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import { LabMachineHomeBoundary } from "@/components/bfux/LabMachineHomeBoundary";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";
import "./world/world-machine-preview.css";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Software for difficult systems, public-interest projects, publications, and research into executable representation.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

type Props = {
  searchParams: Promise<{
    skin?: string | string[];
    section?: string | string[];
    view?: string | string[];
    scope?: string | string[];
    schematic?: string | string[];
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

  return (
    <LabMachineHomeBoundary resetTraversal={!section}>
      <LabMachineWorld
        section={section}
        initialProjection={projection}
        initialProcessScope={processScope}
        showSchematic={one(query.schematic) === "1"}
        machinePath="/"
      />
    </LabMachineHomeBoundary>
  );
}

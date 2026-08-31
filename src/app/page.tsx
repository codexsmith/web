import type { Metadata } from "next";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import { LabMachineHomeBoundary } from "@/components/bfux/LabMachineHomeBoundary";
import { HomeEntryExperience } from "@/components/home-entry-experience";
import "./world/world-machine-preview.css";
import "./lab-machine-responsive.css";
import "./lab-machine-responsive-pass2.css";
import "./lab-machine-frame-polish.css";
import "./lab-machine-frame-resolution.css";
import "./lab-machine-home-final.css";

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
  const showSchematic = one(query.schematic) === "1";
  const forceMachine = Boolean(
    one(query.skin)
      || section
      || one(query.view)
      || one(query.scope)
      || one(query.schematic),
  );

  return (
    <LabMachineHomeBoundary resetTraversal={!section}>
      <HomeEntryExperience
        section={section}
        initialProjection={projection}
        initialProcessScope={processScope}
        showSchematic={showSchematic}
        forceMachine={forceMachine}
      />
    </LabMachineHomeBoundary>
  );
}

import type { Metadata } from "next";
import { parseProcessScope } from "@/lib/bfl-process";
import { parseProjection } from "@/lib/view-projection";
import { LabMachineWorld } from "@/components/bfux/LabMachineWorld";

export const metadata: Metadata = {
  title: "Boundary First Labs · Lab Machine",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{
    skin?: string | string[];
    section?: string | string[];
    view?: string | string[];
    scope?: string | string[];
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WorldPage({ searchParams }: Props) {
  const query = await searchParams;
  const section = one(query.section);
  const projection = parseProjection(one(query.view)) ?? "world";
  const processScope = parseProcessScope(one(query.scope)) ?? "full";

  return (
    <LabMachineWorld
      section={section}
      initialProjection={projection}
      initialProcessScope={processScope}
    />
  );
}

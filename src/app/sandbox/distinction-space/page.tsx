import type { Metadata } from "next";
import { DistinctionSpaceSandboxSurface } from "@/components/bfux/DistinctionSpaceSandboxSurface";
import { isVisualMathSpecimenId } from "@/components/visual-mathematics/specimen-types";

export const metadata: Metadata = {
  title: "Visual Mathematics Workstation | Boundary First Labs",
  description:
    "A Boundary First mathematical workstation for operating, recording, and inspecting established and experimental executable mathematical specimens.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{
    specimen?: string | string[];
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DistinctionSpaceSandboxPage({ searchParams }: Props) {
  const query = await searchParams;
  const requested = one(query.specimen);
  const initialSpecimen = isVisualMathSpecimenId(requested) ? requested : "boundary-attractor";

  return <DistinctionSpaceSandboxSurface initialSpecimen={initialSpecimen} />;
}

"use client";

import { useRouter } from "next/navigation";
import { VisualMathematicsWorkstation } from "@/components/visual-mathematics/VisualMathematicsWorkstation";
import type { VisualMathSpecimenId } from "@/components/visual-mathematics/specimen-types";

export function DistinctionSpaceSandboxSurface({
  initialSpecimen,
}: {
  initialSpecimen: VisualMathSpecimenId;
}) {
  const router = useRouter();

  return (
    <VisualMathematicsWorkstation
      initialSpecimen={initialSpecimen}
      onClose={() => router.push("/")}
    />
  );
}

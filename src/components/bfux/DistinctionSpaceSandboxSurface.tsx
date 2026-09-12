"use client";

import { useRouter } from "next/navigation";
import { BoundaryFascinatorInstrument } from "./BoundaryFascinatorInstrument";

export function DistinctionSpaceSandboxSurface() {
  const router = useRouter();

  return (
    <main
      aria-label="Distinction Space visual mathematics sandbox"
      style={{ minHeight: "100vh", background: "#06080a" }}
    >
      <BoundaryFascinatorInstrument open onClose={() => router.push("/")} />
    </main>
  );
}

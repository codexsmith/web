"use client";

import { useSearchParams } from "next/navigation";
import { EvidenceWorkRecords } from "./relation-record-index";

export function AtlasEvidenceWorkSurface() {
  const searchParams = useSearchParams();

  if (searchParams.get("filter") !== "evidence") return null;

  return <EvidenceWorkRecords />;
}

import type { Metadata } from "next";
import { InstitutionalRepresentationAtlasPage } from "@/components/institutional/InstitutionalRepresentationAtlasPage";

export const metadata: Metadata = {
  title: "Representation Atlas · Boundary First Labs",
  description:
    "Trace recurring representation, state, transformation, boundary, defect, evidence, agency, and stewardship patterns across Lab work.",
  alternates: { canonical: "/v3/representation-atlas" },
};

export default function RepresentationAtlasPage() {
  return <InstitutionalRepresentationAtlasPage />;
}

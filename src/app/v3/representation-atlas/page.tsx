import type { Metadata } from "next";
import { InstitutionalRepresentationAtlasPage } from "@/components/institutional/InstitutionalRepresentationAtlasPage";

export const metadata: Metadata = {
  title: "Representation Atlas · Boundary First Labs",
  description:
    "Compare six recurring representation questions across five different domains without treating structural similarity as proof of equivalence.",
  alternates: { canonical: "/representation-atlas" },
};

export default function RepresentationAtlasPage() {
  return <InstitutionalRepresentationAtlasPage />;
}

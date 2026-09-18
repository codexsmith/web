import type { Metadata } from "next";
import { InstitutionalAtlasPage } from "@/components/institutional/InstitutionalAtlasPage";

export const metadata: Metadata = {
  title: "Lab Atlas | Boundary First Labs",
  description:
    "A bounded public relationship atlas across Boundary First Labs research, products, projects, and publication records.",
};

export default function AtlasPage() {
  return <InstitutionalAtlasPage />;
}

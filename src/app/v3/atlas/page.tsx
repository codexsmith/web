import type { Metadata } from "next";
import { InstitutionalAtlasPage } from "@/components/institutional/InstitutionalAtlasPage";

export const metadata: Metadata = {
  title: "Lab Atlas | Boundary First Labs",
  description:
    "A curated public map of selected Boundary First Labs research programs, experiments, claims, tools, products, projects, publications, evidence, and their declared connections.",
  alternates: { canonical: "/atlas" },
};

export default async function AtlasPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string | string[] }>;
}) {
  const params = await searchParams;
  const focus = Array.isArray(params.focus) ? params.focus[0] : params.focus;

  return <InstitutionalAtlasPage initialFocus={focus} />;
}

import type { Metadata } from "next";
import { InstitutionalAtlasPage } from "@/components/institutional/InstitutionalAtlasPage";

export const metadata: Metadata = {
  title: "Lab Atlas | Boundary First Labs",
  description:
    "A bounded public relationship atlas across Boundary First Labs research, products, projects, and publication records.",
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

import type { Metadata } from "next";
import { InstitutionalChangesPage } from "@/components/institutional/InstitutionalChangesPage";

export const metadata: Metadata = {
  title: "What Changed · Boundary First Labs",
  description:
    "Material state changes across Boundary First Labs: new work, revised claims, changed status, and consequential institutional updates.",
  alternates: { canonical: "/v3/changes" },
};

export default function ChangesPage() {
  return <InstitutionalChangesPage />;
}

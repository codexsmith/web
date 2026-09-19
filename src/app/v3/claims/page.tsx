import type { Metadata } from "next";
import { InstitutionalClaimsPage } from "@/components/institutional/InstitutionalClaimsPage";

export const metadata: Metadata = {
  title: "Claims · Boundary First Labs",
  description:
    "Inspect public Boundary First Labs claims with status, scope, evidence relationships, and unresolved boundaries kept visible.",
  alternates: { canonical: "/claims" },
};

export default function ClaimsPage() {
  return <InstitutionalClaimsPage />;
}

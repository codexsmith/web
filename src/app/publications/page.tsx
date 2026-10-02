import type { Metadata } from "next";
import { InstitutionalPublicationsPage } from "@/components/institutional/InstitutionalPublicationsPage";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Papers, research notes, reports, specifications, and publication candidates from Boundary First Labs, with claim scope, evidence, review state, and uncertainty kept visible.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsPage() {
  return <InstitutionalPublicationsPage />;
}

import type { Metadata } from "next";
import { InstitutionalPublicationsPage } from "@/components/institutional/InstitutionalPublicationsPage";

export const metadata: Metadata = {
  title: "Publications · Boundary First Labs",
  description: "Papers, reports, specifications, experiment reports, and inspectable publication state from Boundary First Labs.",
  alternates: { canonical: "/publications" },
};

export default function Page() {
  return <InstitutionalPublicationsPage />;
}

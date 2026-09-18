import type { Metadata } from "next";
import { InstitutionalPublicationsPage } from "@/components/institutional/InstitutionalPublicationsPage";

export const metadata: Metadata = {
  title: "Publications · Boundary First Labs",
  description: "Papers, reports, specifications, experiment reports, and inspectable publication state from Boundary First Labs.",
  alternates: { canonical: "/v3/publications" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalPublicationsPage />;
}

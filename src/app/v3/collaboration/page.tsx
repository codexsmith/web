import type { Metadata } from "next";
import { InstitutionalCollaborationPage } from "@/components/institutional/InstitutionalCollaborationPage";

export const metadata: Metadata = {
  title: "Collaboration · Boundary First Labs",
  description:
    "How Boundary First Labs works with researchers, institutions, businesses, critics, creators, funders, and other collaborators through bounded, evidence-producing relationships.",
  alternates: { canonical: "/v3/collaboration" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalCollaborationPage />;
}

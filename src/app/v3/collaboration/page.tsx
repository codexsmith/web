import type { Metadata } from "next";
import { InstitutionalCollaborationPage } from "@/components/institutional/InstitutionalCollaborationPage";

export const metadata: Metadata = {
  title: "Collaboration · Boundary First Labs",
  description:
    "Ways researchers, businesses, funders, creators, institutions, and domain experts can work with Boundary First Labs—from review and pilots to funding, distribution, and co-development.",
  alternates: { canonical: "/v3/collaboration" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalCollaborationPage />;
}

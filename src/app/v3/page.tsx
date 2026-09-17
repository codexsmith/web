import type { Metadata } from "next";
import { InstitutionalHomePreview } from "@/components/institutional/InstitutionalHomePreview";

export const metadata: Metadata = {
  title: "Boundary First Labs · Website v3",
  description: "Boundary First Labs institutional product surface.",
  alternates: { canonical: "/v3" },
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return <InstitutionalHomePreview />;
}

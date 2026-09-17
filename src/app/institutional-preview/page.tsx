import type { Metadata } from "next";
import { InstitutionalHomePreview } from "@/components/institutional/InstitutionalHomePreview";

export const metadata: Metadata = {
  title: "Institutional preview",
  description: "Boundary First Labs Website v3 institutional face preview.",
  robots: { index: false, follow: false },
};

export default function InstitutionalPreviewPage() {
  return <InstitutionalHomePreview />;
}

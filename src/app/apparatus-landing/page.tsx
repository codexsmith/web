import type { Metadata } from "next";
import { ApparatusLandingHome } from "@/components/entrance/ApparatusLandingHome";

export const metadata: Metadata = {
  title: "Apparatus Landing · Boundary First Labs",
  description: "Design preview for the Boundary First Labs apparatus landing page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApparatusLandingPreviewPage() {
  return <ApparatusLandingHome />;
}

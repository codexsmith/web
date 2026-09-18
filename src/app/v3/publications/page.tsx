import type { Metadata } from "next";
import { InstitutionalRoutePreview } from "@/components/institutional/InstitutionalRoutePreview";
import { institutionalRouteFrontDoors } from "@/components/institutional/institutionalRoutes";

export const metadata: Metadata = {
  title: "Publications · Boundary First Labs",
  alternates: { canonical: "/v3/publications" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalRoutePreview route={institutionalRouteFrontDoors["publications"]} />;
}

import type { Metadata } from "next";
import { InstitutionalRoutePreview } from "@/components/institutional/InstitutionalRoutePreview";
import { institutionalRouteFrontDoors } from "@/components/institutional/institutionalRoutes";

export const metadata: Metadata = {
  title: "Open Lab · Boundary First Labs",
  alternates: { canonical: "/v3/open-lab" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalRoutePreview route={institutionalRouteFrontDoors["open-lab"]} />;
}

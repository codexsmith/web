import type { Metadata } from "next";
import { InstitutionalNowPage } from "@/components/institutional/InstitutionalNowPage";

export const metadata: Metadata = {
  title: "Now / Roadmap · Boundary First Labs",
  description:
    "What Boundary First Labs is working on now, what comes next, what must be demonstrated before later-stage work begins, and the evidence gates that can change the roadmap.",
  alternates: { canonical: "/v3/now" },
};

export default function Page() {
  return <InstitutionalNowPage />;
}

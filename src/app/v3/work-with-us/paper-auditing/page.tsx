import type { Metadata } from "next";
import { EngagementGuidePage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Scientific Paper Auditing · Boundary First Labs",
  description: "We are developing an independent, computationally assisted research review practice that traces claims to their definitions, assumptions, evidence and dependencies.",
  alternates: { canonical: "/work-with-us/paper-auditing" },
};

export default function Page() {
  return <EngagementGuidePage slug="work-with-us/paper-auditing" />;
}

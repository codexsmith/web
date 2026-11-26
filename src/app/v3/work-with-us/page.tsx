import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Work With Us · Boundary First Labs",
  description: "Commission bounded systems and research work, collaborate on public-interest investigations, support independent inquiry, and learn how Boundary First Labs works.",
  alternates: { canonical: "/work-with-us" },
};

export default function Page() {
  return <WorkWithUsPage />;
}

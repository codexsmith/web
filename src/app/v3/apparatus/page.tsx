import type { Metadata } from "next";
import { InstitutionalApparatusPage } from "@/components/institutional/InstitutionalApparatusPage";

export const metadata: Metadata = {
  title: "Apparatus · Boundary First Labs",
  description: "Operational research instruments, authority boundaries, and knowledge infrastructure at Boundary First Labs.",
  alternates: { canonical: "/v3/apparatus" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InstitutionalApparatusPage />;
}

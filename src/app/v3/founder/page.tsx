import type { Metadata } from "next";
import { InstitutionalFounderPage } from "@/components/institutional/InstitutionalFounderPage";

export const metadata: Metadata = {
  title: "Founder · Boundary First Labs",
  description:
    "Nicholas T. Smith — computer scientist, systems engineer, independent researcher, and founder of Boundary First Labs.",
  alternates: { canonical: "/v3/founder" },
};

export default function Page() {
  return <InstitutionalFounderPage />;
}

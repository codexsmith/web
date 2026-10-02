import type { Metadata } from "next";
import { InstitutionalStartPage } from "@/components/institutional/InstitutionalStartPage";

export const metadata: Metadata = {
  title: "Start Here · Boundary First Labs",
  description:
    "Start with what you want to do: understand Boundary First Labs, evaluate the research, solve a systems problem, collaborate, fund specific work, or challenge a claim.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return <InstitutionalStartPage />;
}

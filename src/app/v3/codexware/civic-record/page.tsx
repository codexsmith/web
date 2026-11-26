import type { Metadata } from "next";
import { CodexwareCivicRecordPage } from "@/components/institutional/CodexwareCivicRecordPage";

export const metadata: Metadata = {
  title: "Civic Record · Codexware · Boundary First Labs",
  description: "A private prototype of an individual-first local evidence workspace. Learn about the intended uses, development status and design boundaries.",
  alternates: { canonical: "/codexware/civic-record" },
};

export default function Page() { return <CodexwareCivicRecordPage />; }

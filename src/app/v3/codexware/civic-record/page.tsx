import type { Metadata } from "next";
import { CodexwareCivicRecordPage } from "@/components/institutional/CodexwareCivicRecordPage";

export const metadata: Metadata = {
  title: "Codexware Civic · Boundary First Labs",
  description: "The first intended Codexware application: capture records, keep information locally and prepare source-linked form values. In development; no approved real-data intake.",
  alternates: { canonical: "/codexware/civic-record" },
};

export default function Page() { return <CodexwareCivicRecordPage />; }

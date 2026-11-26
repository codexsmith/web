import type { Metadata } from "next";
import { EvidenceTrustPage } from "@/components/institutional/EvidenceTrustPage";
export const metadata: Metadata = { title: "Evidence & Trust · Boundary First Labs", description: "Examine the Lab's institutional provenance, research methodology, AI assistance, evidence and verification standards, and correction commitments.", alternates: { canonical: "/evidence-and-trust" } };
export default function Page() { return <EvidenceTrustPage />; }

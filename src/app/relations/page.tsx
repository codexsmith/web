import type { Metadata } from "next";
import { PageMasthead } from "@/components/page-masthead";
import {
  RecordLensesNavigation,
  RelationProjectionSection,
  relationSourceNodes,
} from "@/components/relation-record-index";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { RELATION_PROJECTIONS } from "@/lib/relation-index";

export const metadata: Metadata = {
  title: "Record index",
  description:
    "A conventional, accessible text index of work, evidence, lineage, governance, and collaboration records attached to the Boundary First domain graph.",
  alternates: { canonical: "/relations" },
};

export default function RelationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <RecordLensesNavigation surface="relations" />

      <PageMasthead
        deck="Supporting records from the same graph, without the spatial interface."
        description={`Domains organizes ${relationSourceNodes.length} canonical domain records by stage. This page expands those domains into conventional lists of generated work, evidence, lineage, governance, and collaboration records. Counts describe record volume, not evidentiary support.`}
        eyebrow="Accessible text projection"
        title="Record index"
      />

      {RELATION_PROJECTIONS.map((projection) => (
        <RelationProjectionSection
          key={projection}
          projection={projection}
        />
      ))}

      <SiteFooter />
    </main>
  );
}

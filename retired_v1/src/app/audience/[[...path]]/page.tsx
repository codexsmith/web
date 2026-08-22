import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudienceRouteOutlet } from "@/components/audience/AudienceRouteOutlet";
import { audienceRouteConfig } from "@/lib/audience/config";
import { audienceDataset } from "@/lib/audience/data";
import {
  audienceStaticParams,
  isSelectionCompatible,
  resolveSelection,
} from "@/lib/audience/resolve";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "People-first entrance",
  description:
    "Enter the Boundary First corpus through what you need now and one useful starting point.",
  alternates: {
    canonical: "/audience",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{
    depth?: string | string[];
  }>;
};

export function generateStaticParams() {
  return audienceStaticParams(audienceDataset);
}

export default async function AudiencePage({
  params,
  searchParams,
}: PageProps) {
  const [{ path = [] }, query] = await Promise.all([params, searchParams]);
  const requestedDepth = Array.isArray(query.depth)
    ? query.depth[0]
    : query.depth;
  const selection = resolveSelection(
    audienceDataset,
    path,
    requestedDepth,
    audienceRouteConfig,
  );

  if (!isSelectionCompatible(audienceDataset, selection, path.length)) {
    notFound();
  }

  return (
    <AudienceRouteOutlet
      dataset={audienceDataset}
      config={audienceRouteConfig}
      selection={selection}
    />
  );
}

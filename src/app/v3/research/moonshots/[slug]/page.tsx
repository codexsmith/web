import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalMoonshotDetailPage } from "@/components/institutional/InstitutionalMoonshotDetailPage";
import {
  getMoonshotObjectiveBySlug,
  moonshotObjectives,
  moonshotSlug,
} from "@/components/institutional/content/moonshots";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return moonshotObjectives.map((objective) => ({
    slug: moonshotSlug(objective),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const objective = getMoonshotObjectiveBySlug(slug);
  if (!objective) notFound();

  return {
    title: `${objective.label} · Moonshots · Boundary First Labs`,
    description: objective.summary,
    alternates: {
      canonical: `/research/moonshots/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const objective = getMoonshotObjectiveBySlug(slug);
  if (!objective) notFound();

  return <InstitutionalMoonshotDetailPage objective={objective} />;
}

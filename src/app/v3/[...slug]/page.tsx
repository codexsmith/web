import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalContentNodePage } from "@/components/institutional/InstitutionalContentNodePage";
import { nodes } from "@/lib/content";
import { institutionalContentNodeRoutes } from "@/lib/site-release";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const admitted = new Set<string>(institutionalContentNodeRoutes);

function resolveNode(slug: string[] = []) {
  const route = `/${slug.join("/")}`;
  if (!admitted.has(route)) return undefined;
  return nodes.find((node) => node.path === slug.join("/"));
}

export function generateStaticParams() {
  return institutionalContentNodeRoutes.map((route) => ({
    slug: route.slice(1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const node = resolveNode(slug);
  if (!node) notFound();

  return {
    title: `${node.label} · Boundary First Labs`,
    description: node.summary,
    alternates: { canonical: `/${node.path}` },
  };
}

export default async function InstitutionalContentNodeRoute({ params }: PageProps) {
  const { slug = [] } = await params;
  const node = resolveNode(slug);
  if (!node) notFound();

  return <InstitutionalContentNodePage node={node} />;
}

import type { Metadata } from "next";
import graphNodesData from "../../context/graphNodes.json";

type PublicGraphNode = {
  id: string;
  label: string;
  short: string;
};

type DomainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

type DomainMetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DomainMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const node = (graphNodesData as PublicGraphNode[]).find(
    (candidate) => candidate.id === slug,
  );

  if (!node) {
    return {
      title: "Domain not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: node.label,
    description: node.short,
    alternates: {
      canonical: `/domain/${encodeURIComponent(node.id)}`,
    },
  };
}

export default function DomainLayout({ children }: DomainLayoutProps) {
  return children;
}

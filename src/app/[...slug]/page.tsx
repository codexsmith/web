import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLandingRenderer } from "@/components/product-landing/ProductLandingRenderer";
import {
  getProductLandingContent,
  getProductLandingDescription,
  getProductLandingTitle,
} from "@/lib/product-landing-content";
import {
  buildProductLandingPath,
  getRouteEligibleProductLandingEntries,
  productLandingManifest,
  resolveProductLandingRoute,
} from "@/lib/product-landing-routing";

type ProductLandingPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  if (!productLandingManifest.routingPolicy.routesImplemented) return [];

  return getRouteEligibleProductLandingEntries().map((entry) => ({
    slug: entry.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: ProductLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decision = resolveProductLandingRoute(slug);
  if (!decision || decision.routeKind === "blocked") {
    return { title: "Boundary First Labs" };
  }

  const content = getProductLandingContent(decision.entry);
  if (!content) return { title: "Boundary First Labs" };

  const title = getProductLandingTitle(decision.entry, content);
  const description = getProductLandingDescription(decision.entry, content);
  const canonical = buildProductLandingPath(decision.entry);

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: decision.policy.robots.index,
      follow: decision.policy.robots.follow,
    },
    openGraph: decision.policy.indexable
      ? {
          title,
          description,
          type: "website",
          url: canonical,
        }
      : undefined,
  };
}

export default async function ProductLandingPage({
  params,
}: ProductLandingPageProps) {
  const { slug } = await params;

  if (
    !productLandingManifest.routingPolicy.routesImplemented ||
    !productLandingManifest.routingPolicy.rendererImplemented
  ) {
    notFound();
  }

  const decision = resolveProductLandingRoute(slug);
  if (!decision || decision.routeKind === "blocked") notFound();

  const content = getProductLandingContent(decision.entry);
  if (!content) notFound();

  return <ProductLandingRenderer content={content} decision={decision} />;
}

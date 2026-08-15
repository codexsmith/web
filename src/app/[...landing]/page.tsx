import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoundaryFirstUxLanding } from "@/components/product-landing/BoundaryFirstUxLanding";
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
  params: Promise<{ landing: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  if (
    !productLandingManifest.routingPolicy.routesImplemented ||
    !productLandingManifest.routingPolicy.rendererImplemented
  ) {
    return [];
  }

  return getRouteEligibleProductLandingEntries().map((entry) => ({
    landing: entry.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: ProductLandingPageProps): Promise<Metadata> {
  const { landing } = await params;
  const decision = resolveProductLandingRoute(landing);

  if (
    !decision ||
    decision.routeKind === "blocked" ||
    !productLandingManifest.routingPolicy.routesImplemented ||
    !productLandingManifest.routingPolicy.rendererImplemented
  ) {
    return {
      title: "Not available",
      robots: { index: false, follow: false },
    };
  }

  const content = getProductLandingContent(decision.entry);
  if (!content) {
    return {
      title: "Not available",
      robots: { index: false, follow: false },
    };
  }

  const title = getProductLandingTitle(decision.entry, content);
  const description = getProductLandingDescription(decision.entry, content);
  const pathname = buildProductLandingPath(decision.entry);

  return {
    title,
    description,
    alternates: decision.policy.indexable ? { canonical: pathname } : undefined,
    robots: decision.policy.robots,
    openGraph: decision.policy.indexable
      ? {
          title,
          description,
          type: "website",
          url: pathname,
        }
      : undefined,
    twitter: decision.policy.indexable
      ? {
          card: "summary_large_image",
          title,
          description,
        }
      : undefined,
  };
}

export default async function ProductLandingPage({ params }: ProductLandingPageProps) {
  const { landing } = await params;

  if (
    !productLandingManifest.routingPolicy.routesImplemented ||
    !productLandingManifest.routingPolicy.rendererImplemented
  ) {
    notFound();
  }

  const decision = resolveProductLandingRoute(landing);
  if (!decision || decision.routeKind === "blocked" || !decision.policy.routeEligible) {
    notFound();
  }

  const content = getProductLandingContent(decision.entry);
  if (!content) notFound();

  if (decision.entry.id === "boundary-first-ux" && decision.entry.collection !== "bridge") {
    return <BoundaryFirstUxLanding />;
  }

  return <ProductLandingRenderer content={content} decision={decision} />;
}

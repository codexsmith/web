import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgencyAuditLanding } from "@/components/product-landing/AgencyAuditLanding";
import { BoundaryFirstUxLanding } from "@/components/product-landing/BoundaryFirstUxLanding";
import { ChessLanding } from "@/components/product-landing/ChessLanding";
import { ClosureDrivenLanding } from "@/components/product-landing/ClosureDrivenLanding";
import { CorpusForgeLanding } from "@/components/product-landing/CorpusForgeLanding";
import { ProductLandingRenderer } from "@/components/product-landing/ProductLandingRenderer";
import { SchemathematicsLanding } from "@/components/product-landing/SchemathematicsLanding";
import { SoccerLanding } from "@/components/product-landing/SoccerLanding";
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

  if (decision.entry.id === "agency-representation-audit" && decision.entry.collection !== "bridge") {
    return <AgencyAuditLanding />;
  }

  if (decision.entry.id === "boundary-first-ux" && decision.entry.collection !== "bridge") {
    return <BoundaryFirstUxLanding />;
  }

  if (decision.entry.id === "boundary-first-chess" && decision.entry.collection !== "bridge") {
    return <ChessLanding />;
  }

  if (decision.entry.id === "boundary-first-soccer" && decision.entry.collection !== "bridge") {
    return <SoccerLanding />;
  }

  if (decision.entry.id === "closure-driven-software-development" && decision.entry.collection !== "bridge") {
    return <ClosureDrivenLanding />;
  }

  if (decision.entry.id === "corpus-forge" && decision.entry.collection !== "bridge") {
    return <CorpusForgeLanding />;
  }

  if (decision.entry.id === "schemathematics" && decision.entry.collection !== "bridge") {
    return <SchemathematicsLanding />;
  }

  return <ProductLandingRenderer content={content} decision={decision} />;
}

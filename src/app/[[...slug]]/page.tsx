import type { Metadata } from "next";
import { permanentRedirect, redirect } from "next/navigation";
import { WorldApp } from "@/components/world-app";
import { hydrateContentNode } from "@/lib/content-projections";
import { getNodeByPath, nodes } from "@/lib/content-registry";
import { parseProcessScope } from "@/lib/bfl-process";
import { defaultProjectionForNode, parseProjection } from "@/lib/view-projection";
import { parseUiShell } from "@/lib/ui-shell";
import { hasEvidenceProjection } from "@/lib/evidence-content";
import { AgencyAuditLanding } from "@/components/product-landing/AgencyAuditLanding";
import { BoundaryFirstUxLanding } from "@/components/product-landing/BoundaryFirstUxLanding";
import { ChessLanding } from "@/components/product-landing/ChessLanding";
import { ClosureDrivenLanding } from "@/components/product-landing/ClosureDrivenLanding";
import { CorpusForgeLanding } from "@/components/product-landing/CorpusForgeLanding";
import { LandingEngineeringChrome } from "@/components/product-landing/LandingEngineeringChrome";
import { LawLanding } from "@/components/product-landing/LawLanding";
import { ProductLandingRenderer } from "@/components/product-landing/ProductLandingRenderer";
import { SchemathematicsLanding } from "@/components/product-landing/SchemathematicsLanding";
import { SoccerLanding } from "@/components/product-landing/SoccerLanding";
import { SoftwareBeforeCodeLanding } from "@/components/product-landing/SoftwareBeforeCodeLanding";
import { WeatherLanding } from "@/components/product-landing/WeatherLanding";
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

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    view?: string | string[];
    scope?: string | string[];
    world?: string | string[];
    ui?: string | string[];
  }>;
};

export const dynamicParams = true;

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function legacyRecordDestination(slug: string[], query: Awaited<PageProps["searchParams"]>) {
  if (firstQueryValue(query.view) !== "record") return undefined;

  const pathname = slug.length
    ? `/${slug.map((segment) => encodeURIComponent(segment)).join("/")}`
    : "/about/provenance";
  const params = new URLSearchParams();

  for (const key of ["scope", "world", "ui"] as const) {
    const value = firstQueryValue(query[key]);
    if (value) params.set(key, value);
  }

  return params.size ? `${pathname}?${params}` : pathname;
}

function unsupportedEvidenceDestination(
  slug: string[],
  query: Awaited<PageProps["searchParams"]>,
  nodeId: string,
) {
  if (firstQueryValue(query.view) !== "evidence" || hasEvidenceProjection(nodeId)) return undefined;

  const pathname = slug.length
    ? `/${slug.map((segment) => encodeURIComponent(segment)).join("/")}`
    : "/";
  const params = new URLSearchParams();

  for (const key of ["scope", "world", "ui"] as const) {
    const value = firstQueryValue(query[key]);
    if (value) params.set(key, value);
  }

  return params.size ? `${pathname}?${params}` : pathname;
}

export async function generateStaticParams() {
  const landingParams =
    productLandingManifest.routingPolicy.routesImplemented &&
    productLandingManifest.routingPolicy.rendererImplemented
      ? getRouteEligibleProductLandingEntries().map((entry) => ({ slug: entry.slug.split("/") }))
      : [];

  const nodeParams = nodes.map((node) => ({ slug: node.path ? node.path.split("/") : [] }));
  return [...landingParams, ...nodeParams];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams]);
  const decision = resolveProductLandingRoute(slug);

  if (
    decision &&
    decision.routeKind !== "blocked" &&
    productLandingManifest.routingPolicy.routesImplemented &&
    productLandingManifest.routingPolicy.rendererImplemented
  ) {
    const content = getProductLandingContent(decision.entry);
    if (content) {
      const title = getProductLandingTitle(decision.entry, content);
      const description = getProductLandingDescription(decision.entry, content);
      const pathname = buildProductLandingPath(decision.entry);

      return {
        title,
        description,
        alternates: decision.policy.indexable ? { canonical: pathname } : undefined,
        robots: decision.policy.robots,
        openGraph: decision.policy.indexable ? { title, description, type: "website", url: pathname } : undefined,
        twitter: decision.policy.indexable ? { card: "summary_large_image", title, description } : undefined,
      };
    }
  }

  const node = hydrateContentNode(getNodeByPath(slug));
  const uiShell = parseUiShell(query.ui);

  return {
    title: uiShell === "apparatus" ? `${node.label} · Apparatus prototype` : node.label,
    description: node.summary,
    robots: uiShell === "apparatus" ? { index: false, follow: false } : undefined,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams]);
  const recordDestination = legacyRecordDestination(slug, query);
  if (recordDestination) permanentRedirect(recordDestination);

  if (
    productLandingManifest.routingPolicy.routesImplemented &&
    productLandingManifest.routingPolicy.rendererImplemented
  ) {
    const decision = resolveProductLandingRoute(slug);
    if (decision && decision.routeKind !== "blocked" && decision.policy.routeEligible) {
      const content = getProductLandingContent(decision.entry);
      if (content) {
        if (decision.entry.id === "agency-representation-audit" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><AgencyAuditLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "boundary-first-ux" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><BoundaryFirstUxLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "boundary-first-chess" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><ChessLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "boundary-first-soccer" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><SoccerLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "closure-driven-software-development" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><ClosureDrivenLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "corpus-forge" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><CorpusForgeLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "schemathematics" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><SchemathematicsLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "software-before-code" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><SoftwareBeforeCodeLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "boundary-first-weather" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><WeatherLanding /></LandingEngineeringChrome>;
        }
        if (decision.entry.id === "constitutional-law-and-jurisprudence" && decision.entry.collection !== "bridge") {
          return <LandingEngineeringChrome pageId={decision.entry.id} status={decision.entry.status}><LawLanding /></LandingEngineeringChrome>;
        }

        return <ProductLandingRenderer content={content} decision={decision} />;
      }
    }
  }

  const node = getNodeByPath(slug);
  const evidenceDestination = unsupportedEvidenceDestination(slug, query, node.id);
  if (evidenceDestination) redirect(evidenceDestination);
  const initialProjection = parseProjection(query.view) ?? defaultProjectionForNode(node.id);
  const initialProcessScope = parseProcessScope(query.scope) ?? "full";
  const initialUiShell = parseUiShell(query.ui);
  const worldState = Array.isArray(query.world) ? query.world[0] : query.world;
  const initialHeroVisible = node.id === "root" && worldState !== "1";

  return (
    <WorldApp
      initialNodeId={node.id}
      initialProjection={initialProjection}
      initialProcessScope={initialProcessScope}
      initialHeroVisible={initialHeroVisible}
      initialUiShell={initialUiShell}
    />
  );
}

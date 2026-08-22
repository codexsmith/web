import type { MetadataRoute } from "next";
import artifactsIndexData from "./context/artifactsIndex.json";
import graphNodesData from "./context/graphNodes.json";
import introConfig from "@/content/introductory_experience_v0_5.json";
import { getProductLandingSitemapPaths } from "@/lib/product-landing-routing";
import { getSiteOrigin } from "@/lib/site";
import { ATLAS_EVIDENCE_HREF } from "@/lib/site-navigation";

type PublicGraphNode = {
  id: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteOrigin();
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/learn", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/language", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/language/visuals",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/domains", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/map", priority: 0.8, changeFrequency: "weekly" as const },
    {
      path: "/map/refined",
      priority: 0.75,
      changeFrequency: "weekly" as const,
    },
    { path: "/relations", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mission", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/governance", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/people", priority: 0.7, changeFrequency: "monthly" as const },
    {
      path: ATLAS_EVIDENCE_HREF,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    { path: "/work", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/help", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/practice", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/methods", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/publications",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/publications/civilizational-mechanics",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/collaborate",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    { path: "/business", priority: 0.6, changeFrequency: "monthly" as const },
  ];
  const domainRoutes = (graphNodesData as PublicGraphNode[])
    .filter((node) => node.id !== "identity")
    .map((node) => ({
      url: `${baseUrl}/domain/${encodeURIComponent(node.id)}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    }));
  const learnSceneRoutes = introConfig.experiences[0].steps
    .slice(1)
    .map((step) => ({
      url: `${baseUrl}/learn/${encodeURIComponent(step.id)}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    }));
  const artifactRoutes = Object.keys(artifactsIndexData).map((slug) => ({
    url: `${baseUrl}/artifact/${encodeURIComponent(slug)}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
  const productLandingRoutes = getProductLandingSitemapPaths().map((pathname) => ({
    url: `${baseUrl}${pathname}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    })),
    ...learnSceneRoutes,
    ...domainRoutes,
    ...artifactRoutes,
    ...productLandingRoutes,
  ];
}

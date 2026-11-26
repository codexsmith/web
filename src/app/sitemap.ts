import type { MetadataRoute } from "next";
import {
  institutionalIndexingEnabled,
  institutionalDiscoveryRoutes,
  siteOrigin,
} from "@/lib/site-release";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = institutionalIndexingEnabled
    ? institutionalDiscoveryRoutes
    : ["/"];

  return routes.map((route) => ({
    url: new URL(route, siteOrigin).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

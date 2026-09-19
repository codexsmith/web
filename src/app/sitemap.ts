import type { MetadataRoute } from "next";
import {
  institutionalIndexingEnabled,
  institutionalPublicRoutes,
  siteOrigin,
} from "@/lib/site-release";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = institutionalIndexingEnabled
    ? institutionalPublicRoutes
    : ["/"];

  return routes.map((route) => ({
    url: new URL(route, siteOrigin).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

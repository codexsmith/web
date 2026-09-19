import type { MetadataRoute } from "next";
import {
  institutionalIndexingEnabled,
  siteOrigin,
} from "@/lib/site-release";

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/api/",
    "/ops/",
    "/proto/",
    "/sandbox/",
    "/playground/",
    "/institutional-preview/",
  ];

  if (!institutionalIndexingEnabled) {
    disallow.push("/v3/");
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: new URL("/sitemap.xml", siteOrigin).toString(),
    host: siteOrigin.origin,
  };
}

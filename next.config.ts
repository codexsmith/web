import type { NextConfig } from "next";
import { institutionalPublicRoutes } from "./src/lib/site-release";

const institutionalChildRoutes = institutionalPublicRoutes.filter(
  (route) => route !== "/",
);

const nativeInstitutionalRoutes = new Set<string>([
  "/labs/distinction-space",
  "/labs/representation-lab",
]);

const rewrittenInstitutionalRoutes = institutionalChildRoutes.filter(
  (route) => !nativeInstitutionalRoutes.has(route),
);

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/v3", destination: "/", permanent: true },
      ...institutionalChildRoutes.map((route) => ({
        source: `/v3${route}`,
        destination: route,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: rewrittenInstitutionalRoutes.map((route) => ({
        source: route,
        destination: `/v3${route}`,
      })),
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://boundaryfirstlabs.com",
);

export const institutionalIndexingEnabled =
  process.env.BFL_V3_INDEXABLE?.trim().toLowerCase() === "true";

export const institutionalPublicRoutes = [
  "/",
  "/v3/about",
  "/v3/apparatus",
  "/v3/applied-work",
  "/v3/ai-governance",
  "/v3/atlas",
  "/v3/changes",
  "/v3/claims",
  "/v3/collaboration",
  "/v3/contact",
  "/v3/evidence",
  "/v3/experiments",
  "/v3/founder",
  "/v3/funding",
  "/v3/now",
  "/v3/open-lab",
  "/v3/products",
  "/v3/products/agentic-scientific-method",
  "/v3/products/boundary-first-chess",
  "/v3/products/boundary-first-weather",
  "/v3/products/youtube-knowledge-explorer",
  "/v3/projects",
  "/v3/projects/augusta-maintenance-debt",
  "/v3/publications",
  "/v3/representation-atlas",
  "/v3/research",
  "/v3/start",
] as const;

export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://boundaryfirstlabs.com",
);

const vercelEnvironment = process.env.VERCEL_ENV?.trim().toLowerCase();
const indexingOverride =
  process.env.BFL_V3_INDEXABLE?.trim().toLowerCase() === "true";

export const institutionalIndexingEnabled =
  vercelEnvironment === "production" || indexingOverride;

export const institutionalPublicRoutes = [
  "/",
  "/about",
  "/apparatus",
  "/applied-work",
  "/ai-governance",
  "/atlas",
  "/changes",
  "/claims",
  "/collaboration",
  "/contact",
  "/evidence",
  "/experiments",
  "/founder",
  "/funding",
  "/now",
  "/open-lab",
  "/products",
  "/products/agentic-scientific-method",
  "/products/boundary-first-chess",
  "/products/boundary-first-weather",
  "/products/youtube-knowledge-explorer",
  "/projects",
  "/projects/augusta-maintenance-debt",
  "/publications",
  "/representation-atlas",
  "/research",
  "/start",
] as const;

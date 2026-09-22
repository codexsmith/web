export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://boundaryfirstlabs.com",
);

export const institutionalIndexingEnabled =
  process.env.BFL_V3_INDEXABLE?.trim().toLowerCase() === "true";

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
  "/lab-through-time",
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
  "/research/moonshots",
  "/research/moonshots/research-operating-system",
  "/research/moonshots/distributed-scientific-intelligence",
  "/research/moonshots/mathematical-interoperability",
  "/research/moonshots/executable-science",
  "/research/moonshots/formal-representation-mechanics",
  "/research/moonshots/self-improving-research-infrastructure",
  "/start",
] as const;

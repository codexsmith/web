export const DEFAULT_SITE_ORIGIN = "https://boundaryfirstlabs.com";

export function getSiteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN
  ).replace(/\/+$/, "");
}

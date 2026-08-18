export const DEFAULT_SITE_ORIGIN = "https://boundaryfirstlabs.com";

export const PUBLIC_CONTACT_EMAIL = "contact@boundaryfirstlabs.com";
export const PUBLIC_CONTACT_MAILTO = `mailto:${PUBLIC_CONTACT_EMAIL}`;

export function getSiteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN
  ).replace(/\/+$/, "");
}

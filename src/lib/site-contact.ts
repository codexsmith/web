export const PUBLIC_CONTACT_EMAIL = "admin@boundaryfirstlabs.com";
export const PUBLIC_CONTACT_MAILTO = `mailto:${PUBLIC_CONTACT_EMAIL}`;

export function publicContactMailto(subject?: string) {
  if (!subject) return PUBLIC_CONTACT_MAILTO;
  return `${PUBLIC_CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}`;
}

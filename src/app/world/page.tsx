import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    section?: string | string[];
    view?: string | string[];
    scope?: string | string[];
    schematic?: string | string[];
  }>;
};

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LegacyWorldPage({ searchParams }: Props) {
  const query = await searchParams;
  const params = new URLSearchParams();

  for (const key of ["section", "view", "scope", "schematic"] as const) {
    const value = one(query[key]);
    if (value) params.set(key, value);
  }

  permanentRedirect(params.size ? `/?${params.toString()}` : "/");
}

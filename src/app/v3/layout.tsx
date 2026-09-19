import type { Metadata } from "next";
import { institutionalIndexingEnabled } from "@/lib/site-release";

export const metadata: Metadata = {
  robots: {
    index: institutionalIndexingEnabled,
    follow: institutionalIndexingEnabled,
    googleBot: {
      index: institutionalIndexingEnabled,
      follow: institutionalIndexingEnabled,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function InstitutionalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

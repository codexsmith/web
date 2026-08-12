import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GraphProvider } from "./context/GraphContext";
import { getSiteOrigin } from "@/lib/site";
import { phase12Launch } from "@/lib/phase12-launch";

const siteOrigin = getSiteOrigin();

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Boundary First Labs",
    template: "%s · Boundary First Labs",
  },
  description: phase12Launch.identity.compactStatement,
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Boundary First Labs",
    description: `${phase12Launch.identity.headline} ${phase12Launch.identity.compactStatement}`,
    type: "website",
    siteName: "Boundary First Labs",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boundary First Labs",
    description: phase12Launch.identity.compactStatement,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F8F3E8",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: "Boundary First Labs",
      url: siteOrigin,
      email: "contact@boundaryfirst.com",
      description: phase12Launch.identity.fullStatement,
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: "Boundary First Labs",
      url: siteOrigin,
      publisher: {
        "@id": `${siteOrigin}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
        <GraphProvider>{children}</GraphProvider>
      </body>
    </html>
  );
}

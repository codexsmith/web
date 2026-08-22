import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boundary First Labs — Find Your Path",
  description: "An audience-aware routing surface for the Boundary First Labs corpus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

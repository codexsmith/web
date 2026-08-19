import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./portfolio.css";
import "./boundary-frame.css";
import "./boundary-frame-controls.css";
import "./industrial-design.css";
import "./world-morphology.css";
import "./world-ecology.css";
import "./industrial-interaction.css";

export const metadata: Metadata = {
  title: {
    default: "Boundary First Labs",
    template: "%s | Boundary First Labs",
  },
  description:
    "Software for difficult systems, public-interest projects, and research into executable representation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

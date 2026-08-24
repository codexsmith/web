import type { Metadata, Viewport } from "next";
import { activeUiShell } from "@/lib/ui-shell";
import "./globals.css";
import "./bf-industrial-tokens.css";
import "./portfolio.css";
import "./boundary-frame.css";
import "./boundary-frame-controls.css";
import "./industrial-design.css";
import "./world-morphology.css";
import "./semantic-event-ledger.css";
import "./industrial-interaction.css";
import "./frame-detail-stability.css";
import "./projection-views.css";
import "./navigation-topology.css";
import "./gestalt-process.css";
import "./root-founder-projections.css";
import "./navigation-interaction.css";
import "./root-world-and-content-stability.css";
import "./hero-screen.css";
import "./traversal-history.css";
import "./publication-portfolio.css";
import "./content-first-world.css";
import "./industrial-card-ui.css";
import "./landing-bfux-refinement.css";
import "./card-world-viewport-fit.css";
import "./public-interest-world.css";
import "./frame-spatial-contract.css";
import "./trace-nav-refinement.css";
import "./card-root-control-board.css";
import "./card-secondary-control-board.css";
import "./local-nav-instrument.css";
import "./navigation-apparatus-sections.css";
import "./desktop-spatial-flow-refinement.css";
import "./mobile-editorial-flow.css";
import "./apparatus-prototype.css";
import "./apparatus-prototype-hardening.css";
import "./apparatus-sleek-refinement.css";
import "./apparatus-world-root-refinement.css";
import "./section-hero-organization.css";
import "./evidence-projection-refinement.css";
import "./p0-boundary-navigation.css";
import "./p1-boundary-topology.css";
import "./p1-world-orientation.css";
import "./p1-search-traversal.css";
import "./p2-projection-legibility.css";
import "./p3-industrial-control-panel.css";
import "./p3-semantic-action-glyphs.css";
import "./p3-industrial-responsive.css";

export const metadata: Metadata = {
  title: {
    default: "Boundary First Labs",
    template: "%s | Boundary First Labs",
  },
  description:
    "Software for difficult systems, public-interest projects, publications, and research into executable representation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body data-ui-shell={activeUiShell}>{children}</body>
    </html>
  );
}

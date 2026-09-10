import type { Metadata } from "next";
import { DistinctionSpacePanelCollapseController } from "@/components/bfux/DistinctionSpacePanelCollapseController";
import { DistinctionSpaceSandboxSurface } from "@/components/bfux/DistinctionSpaceSandboxSurface";
import "./instrument-lab.css";
import "./specimen-canvas-fix.css";
import "./instrument-layout.css";
import "./instrument-trim.css";
import "./instrument-command-pods.css";
import "./instrument-collapse.css";

export const metadata: Metadata = {
  title: "Distinction Space Visual Sandbox | Boundary First Labs",
  description:
    "Interactive Boundary First visual-mathematics sandbox for exploring bounded dynamics, closure, defect, and higher-dimensional structure.",
  robots: { index: false, follow: false },
};

export default function DistinctionSpaceSandboxPage() {
  return (
    <>
      <DistinctionSpaceSandboxSurface />
      <DistinctionSpacePanelCollapseController />
    </>
  );
}

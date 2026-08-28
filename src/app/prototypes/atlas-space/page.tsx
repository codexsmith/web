import type { Metadata } from "next";
import { AtlasSpace } from "@/components/atlas-space/AtlasSpace";

export const metadata: Metadata = {
  title: "Atlas Space Prototype",
  description:
    "Prototype Boundary First visualization for layered domain atlases and typed cross-domain correspondences.",
  robots: { index: false, follow: false },
};

export default function AtlasSpacePrototypePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "clamp(12px, 2vw, 28px)",
        background: "#cfc9bd",
      }}
    >
      <AtlasSpace />
    </main>
  );
}

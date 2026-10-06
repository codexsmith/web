import type { Metadata } from "next";
import { AtlasSpaceNavigator } from "@/components/atlas-space/AtlasSpaceNavigator";

export const metadata: Metadata = {
  title: "Atlas Space Prototype",
  description:
    "Prototype Boundary First visualization for layered domain atlases, recursive local charts, and typed cross-domain correspondences.",
  robots: { index: false, follow: false },
};

export default function AtlasSpacePrototypePage() {
  return <AtlasSpaceNavigator />;
}

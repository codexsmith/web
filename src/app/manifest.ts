import type { MetadataRoute } from "next";
import { phase12Launch } from "@/lib/phase12-launch";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boundary First Labs",
    short_name: "Boundary First",
    description: phase12Launch.identity.compactStatement,
    start_url: "/",
    display: "standalone",
    background_color: "#F8F3E8",
    theme_color: "#F8F3E8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

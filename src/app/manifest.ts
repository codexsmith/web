import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boundary First Labs",
    short_name: "BFL",
    description:
      "Applied research, research apparatus, products, projects, and public-interest systems work.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f7",
    theme_color: "#102036",
  };
}

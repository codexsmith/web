import type { Metadata } from "next";
import { ScreenWallCatalog } from "@/components/playground/ScreenWallCatalog";

export const metadata: Metadata = {
  title: "Playground · Screen Wall",
  description: "A spatial catalog of Boundary First Labs interactive environments.",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <ScreenWallCatalog />;
}

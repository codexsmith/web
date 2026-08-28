import type { Metadata } from "next";
import { ScreenWallCatalog } from "@/components/playground/ScreenWallCatalog";
import "@/components/playground/screen-wall-chassis.css";
import "@/components/playground/screen-wall-activity.css";
import "@/components/playground/screen-wall-focus.css";
import "@/components/playground/screen-wall-lab-machine.css";

export const metadata: Metadata = {
  title: "Playground · Screen Wall",
  description: "A spatial catalog of Boundary First Labs interactive environments.",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <ScreenWallCatalog />;
}

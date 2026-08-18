import type { AudienceRouteConfig } from "./types";

export const audienceRouteConfig: AudienceRouteConfig = {
  basePath: "/audience",
  defaultDepth: "recognize",
  showAtlasEscape: true,
  atlasHref: "/atlas",
  labels: {
    eyebrow: "Boundary First Labs",
    title: "What brings you here?",
    intro: "Choose the pressure, question, or responsibility that brought you. We will route you through the smallest useful part of the corpus first.",
    restart: "Start over",
    atlas: "Open the full atlas",
  },
};

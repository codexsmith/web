import { ATLAS_HREF } from "../site-navigation";
import type { AudienceRouteConfig } from "./types";

export const audienceRouteConfig: AudienceRouteConfig = {
  basePath: "/audience",
  defaultDepth: "recognize",
  atlasHref: ATLAS_HREF,
  publicationHref: "/publications/civilizational-mechanics",
  labels: {
    eyebrow: "People-first entrance",
    title: "Start with the people in view.",
    intro:
      "Choose what is active now. We will reveal the smallest useful part of the corpus first.",
    restart: "Start over",
    atlas: "Open the atlas",
    publication: "Read Civilizational Mechanics",
  },
};

import {
  getProductLandingContent,
  getProductLandingDescription,
  getProductLandingTitle,
} from "./product-landing-content";
import {
  PRODUCT_LANDING_NAVIGATION,
  type ProductLandingNavigationGroup,
} from "./product-landing-navigation";
import { getPublicProductLandingEntries } from "./product-landing-routing";

export type PublicLandingCarouselItem = {
  id: string;
  href: string;
  group: ProductLandingNavigationGroup;
  groupLabel: string;
  title: string;
  description: string;
  ordinal: number;
  total: number;
};

const groupLabels: Record<ProductLandingNavigationGroup, string> = {
  software: "Software",
  research: "Research",
  work: "Work",
};

export function getPublicLandingCarouselItems(): PublicLandingCarouselItem[] {
  const entries = new Map(
    getPublicProductLandingEntries().map((entry) => [entry.id, entry]),
  );
  const placements = PRODUCT_LANDING_NAVIGATION.filter((placement) =>
    entries.has(placement.id),
  );
  const total = placements.length;

  return placements.map((placement, index) => {
    const entry = entries.get(placement.id);
    if (!entry) {
      throw new Error(`Missing public landing entry for ${placement.id}`);
    }
    const content = getProductLandingContent(entry);
    if (!content) {
      throw new Error(`Missing public landing content for ${placement.id}`);
    }

    return {
      id: placement.id,
      href: placement.href,
      group: placement.group,
      groupLabel: groupLabels[placement.group],
      title: getProductLandingTitle(entry, content),
      description: getProductLandingDescription(entry, content),
      ordinal: index + 1,
      total,
    };
  });
}

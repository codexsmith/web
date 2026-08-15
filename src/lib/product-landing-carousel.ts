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
  title
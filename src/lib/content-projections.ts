import type { ContentNode } from "@/lib/content";
import { hydrateAboutNode } from "@/lib/about-content";
import { hydratePublicInterestNode } from "@/lib/public-interest-content";

export function hydrateContentNode(node: ContentNode): ContentNode {
  return hydratePublicInterestNode(hydrateAboutNode(node));
}

import type { ContentNode } from "@/lib/content";
import { hydrateAboutNode } from "@/lib/about-content";
import { hydratePublicInterestNode } from "@/lib/public-interest-content";
import { hydrateResearchNode } from "@/lib/research-content";

export function hydrateContentNode(node: ContentNode): ContentNode {
  return hydrateResearchNode(hydratePublicInterestNode(hydrateAboutNode(node)));
}

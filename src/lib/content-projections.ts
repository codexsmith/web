import type { ContentNode } from "@/lib/content";
import { hydrateAboutNode } from "@/lib/about-content";
import { hydrateExploratoryResearchNode } from "@/lib/exploratory-research";
import { hydrateProcessNode } from "@/lib/process-content";
import { hydratePublicInterestNode } from "@/lib/public-interest-content";
import { hydrateResearchNode } from "@/lib/research-content";

export function hydrateContentNode(node: ContentNode): ContentNode {
  return hydrateProcessNode(
    hydrateExploratoryResearchNode(
      hydrateResearchNode(hydratePublicInterestNode(hydrateAboutNode(node))),
    ),
  );
}

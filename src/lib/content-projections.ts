import type { ContentNode } from "@/lib/content-registry";
import { hydrateAboutNode } from "@/lib/about-content";
import { hydrateExploratoryResearchNode } from "@/lib/exploratory-research";
import { hydrateProcessNode } from "@/lib/process-content";
import { hydrateProductNode } from "@/lib/product-content";
import { hydratePublicDepthNode } from "@/lib/public-depth-content";
import { hydratePublicInterestNode } from "@/lib/public-interest-content";
import { hydrateResearchNode } from "@/lib/research-content";
import { hydrateResearchDepthNode } from "@/lib/research-depth-content";
import { hydrateRootNode } from "@/lib/root-content";

type HydratedContentNode = ContentNode & {
  _isHydrated?: true;
};

export function hydrateContentNode(node: ContentNode): ContentNode {
  if ((node as HydratedContentNode)._isHydrated) return node;

  const hydrated = hydrateProcessNode(
    hydrateExploratoryResearchNode(
      hydrateResearchDepthNode(
        hydrateResearchNode(
          hydratePublicDepthNode(
            hydratePublicInterestNode(
              hydrateAboutNode(hydrateProductNode(hydrateRootNode(node))),
            ),
          ),
        ),
      ),
    ),
  ) as ContentNode;

  const hydratedNode: HydratedContentNode = {
    ...hydrated,
    _isHydrated: true,
  };

  return hydratedNode;
}

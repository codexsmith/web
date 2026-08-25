"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { SearchPanel } from "@/components/search-panel";
import {
  getAncestors,
  getChildren,
  getNode,
  getPathForNode,
  type ContentNode,
} from "@/lib/content-registry";

type StandaloneFocus = {
  id: string;
  label: string;
  shortLabel?: string;
  path: string;
  kind: ContentNode["kind"];
  eyebrow: string;
  summary: string;
};

type BoundedStandaloneSurfaceProps = {
  children: ReactNode;
  focus: StandaloneFocus;
  parentNodeId: string;
  sectionTheme: string;
};

function routeForNode(node: ContentNode) {
  return node.id === "root" ? "/?world=1" : `/${node.path}`;
}

export function BoundedStandaloneSurface({
  children,
  focus,
  parentNodeId,
  sectionTheme,
}: BoundedStandaloneSurfaceProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const parentNode = getNode(parentNodeId);
  const focusNode: ContentNode = { ...focus, parentId: parentNode.id };
  const traversalPath = [...getAncestors(parentNode.id), parentNode, focusNode];
  const traversalCursor = traversalPath.length - 1;
  const siblings = getChildren(parentNode.id);
  const hasSiblings = siblings.length > 0;

  function navigateNode(id: string) {
    setSearchOpen(false);
    router.push(getPathForNode(id));
  }

  function navigateParent() {
    router.push(routeForNode(parentNode));
  }

  return (
    <div
      className="site-shell site-shell--bounded-standalone"
      data-standalone-surface="true"
      data-projection="world"
      data-projection-intent="world"
      data-projection-fallback="false"
      data-ui-renderer="cards"
      data-root-focus="false"
      data-section-theme={sectionTheme}
      data-has-siblings={hasSiblings ? "true" : "false"}
      data-show-traversal="true"
    >
      <BoundaryFrame
        visible
        focusNode={focusNode}
        parentNode={parentNode}
        traversalPath={traversalPath}
        traversalCursor={traversalCursor}
        siblings={siblings}
        projection="world"
        processScope="full"
        canTraceBack={traversalCursor > 0}
        canTraceForward={false}
        canProcessZoomOut={false}
        canProcessZoomIn={false}
        onHome={() => router.push("/?world=1")}
        onUp={navigateParent}
        onBack={navigateParent}
        onForward={() => undefined}
        onLocalNavigate={navigateNode}
        onTraversalPath={(_id, index) => {
          const target = traversalPath[index];
          if (target) router.push(routeForNode(target));
        }}
        onProcessZoomOut={() => undefined}
        onProcessZoomIn={() => undefined}
        onSearch={() => setSearchOpen(true)}
      />

      <div className="bounded-standalone-page__surface">{children}</div>

      {searchOpen ? (
        <SearchPanel
          onClose={() => setSearchOpen(false)}
          onNavigate={navigateNode}
        />
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { InspectionPanel } from "@/components/inspection-panel";
import { LandingSequence } from "@/components/landing-sequence";
import { SearchPanel } from "@/components/search-panel";
import { TransitionDirection, WorldView } from "@/components/world-view";
import { hydrateContentNode } from "@/lib/content-projections";
import {
  getAncestors,
  getChildren,
  getImmediateChildTowardFocus,
  getNode,
  getParent,
  getPathForNode,
  getSiblings,
} from "@/lib/content";

type WorldAppProps = {
  initialNodeId: string;
  skipLanding: boolean;
};

function inferDirection(fromId: string, toId: string): TransitionDirection {
  if (fromId === toId) return "none";
  const from = getNode(fromId);
  const to = getNode(toId);

  if (from.parentId === to.id) return "up";
  if (to.parentId === from.id) return "down";

  if (from.parentId && from.parentId === to.parentId) {
    const siblings = getSiblings(from.id);
    const fromIndex = siblings.findIndex((node) => node.id === from.id);
    const toIndex = siblings.findIndex((node) => node.id === to.id);
    return toIndex < fromIndex ? "left" : "right";
  }

  return "cross";
}

export function WorldApp({ initialNodeId, skipLanding }: WorldAppProps) {
  const router = useRouter();
  const [focusId, setFocusId] = useState(initialNodeId);
  const [gestaltId, setGestaltId] = useState(initialNodeId);
  const [introEnabled, setIntroEnabled] = useState(initialNodeId === "root" && !skipLanding);
  const [landingProgress, setLandingProgress] = useState(skipLanding ? 1 : 0);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("none");
  const [transitionKey, setTransitionKey] = useState(0);
  const [inspectionId, setInspectionId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const focusNode = hydrateContentNode(getNode(focusId));
  const gestaltNode = hydrateContentNode(getNode(gestaltId));
  const breadcrumbs = getAncestors(focusId).map(hydrateContentNode);
  const rootBranches = getChildren("root").map(hydrateContentNode);
  const canZoomOut = Boolean(getParent(gestaltId));
  const canZoomIn = gestaltId !== focusId && Boolean(getImmediateChildTowardFocus(gestaltId, focusId));

  const activeInspection = useMemo(() => {
    if (!inspectionId) return undefined;
    return focusNode.inspection?.find((inspection) => inspection.id === inspectionId);
  }, [focusNode, inspectionId]);

  useEffect(() => {
    setFocusId(initialNodeId);
    setGestaltId(initialNodeId);
    setIntroEnabled(initialNodeId === "root" && !skipLanding);
    setLandingProgress(initialNodeId === "root" && !skipLanding ? 0 : 1);
    setInspectionId(null);
  }, [initialNodeId, skipLanding]);

  useEffect(() => {
    const locked = !introEnabled;
    document.documentElement.classList.toggle("world-locked", locked);
    document.body.classList.toggle("world-locked", locked);

    return () => {
      document.documentElement.classList.remove("world-locked");
      document.body.classList.remove("world-locked");
    };
  }, [introEnabled]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if (event.key === "Escape") {
        setInspectionId(null);
        setSearchOpen(false);
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (targetId: string, direction?: TransitionDirection) => {
      const nextDirection = direction ?? inferDirection(focusId, targetId);
      setTransitionDirection(nextDirection);
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setGestaltId(targetId);
      setInspectionId(null);
      setIntroEnabled(false);
      setLandingProgress(1);

      if (targetId === "root") {
        router.push("/?world=1");
      } else {
        router.push(getPathForNode(targetId));
      }
    },
    [focusId, router],
  );

  const zoomOut = useCallback(() => {
    const parent = getParent(gestaltId);
    if (!parent) return;
    setTransitionDirection("zoom-out");
    setTransitionKey((value) => value + 1);
    setGestaltId(parent.id);
  }, [gestaltId]);

  const zoomIn = useCallback(() => {
    if (gestaltId === focusId) return;
    const child = getImmediateChildTowardFocus(gestaltId, focusId);
    if (!child) return;
    setTransitionDirection("zoom-in");
    setTransitionKey((value) => value + 1);
    setGestaltId(child.id);
  }, [focusId, gestaltId]);

  const openInspection = useCallback((nextInspectionId: string) => {
    setInspectionId(nextInspectionId);
  }, []);

  const frameVisible = !introEnabled || landingProgress > 0.48;

  return (
    <div className="site-shell">
      <BoundaryFrame
        visible={frameVisible}
        focusNode={focusNode}
        gestaltNode={gestaltNode}
        breadcrumbs={breadcrumbs}
        rootBranches={rootBranches}
        canZoomOut={canZoomOut}
        canZoomIn={canZoomIn}
        onHome={() => navigate("root", "zoom-out")}
        onBack={() => router.back()}
        onNavigate={navigate}
        onZoomOut={zoomOut}
        onZoomIn={zoomIn}
        onSearch={() => setSearchOpen(true)}
      />

      {introEnabled ? (
        <LandingSequence branches={rootBranches} onNavigate={navigate} onProgress={setLandingProgress} />
      ) : (
        <WorldView
          gestaltNode={gestaltNode}
          focusNode={focusNode}
          transitionDirection={transitionDirection}
          transitionKey={transitionKey}
          onNavigate={navigate}
          onInspect={openInspection}
        />
      )}

      {activeInspection ? (
        <InspectionPanel inspection={activeInspection} onClose={() => setInspectionId(null)} />
      ) : null}

      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigate} /> : null}
    </div>
  );
}

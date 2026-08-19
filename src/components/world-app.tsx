"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { EvidenceView } from "@/components/evidence-view";
import { GestaltView } from "@/components/gestalt-view";
import { HeroScreen } from "@/components/hero-screen";
import { InspectionPanel } from "@/components/inspection-panel";
import { SearchPanel } from "@/components/search-panel";
import { RecordView, TransitionDirection, WorldView } from "@/components/world-view";
import { hydrateContentNode } from "@/lib/content-projections";
import { getNode, getNodeByPath, getPathForNode, getSiblings } from "@/lib/content-registry";
import { parseProcessScope, processScopes, type ProcessScope } from "@/lib/bfl-process";
import { defaultProjectionForNode, parseProjection, type ProjectionMode } from "@/lib/view-projection";

type WorldAppProps = {
  initialNodeId: string;
  initialProjection?: ProjectionMode;
  initialProcessScope?: ProcessScope;
  initialHeroVisible?: boolean;
};

type TraversalWindow = Window & {
  __bflFocusTraversal?: string[];
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

function stateUrl(focusId: string, projection: ProjectionMode, processScope: ProcessScope) {
  const focusPath = getPathForNode(focusId);
  const params = new URLSearchParams();

  if (focusId === "root") params.set("world", "1");
  if (projection !== defaultProjectionForNode(focusId)) params.set("view", projection);
  if (projection === "gestalt" && processScope !== "full") params.set("scope", processScope);

  const query = params.toString();
  return query ? `${focusPath}?${query}` : focusPath;
}

function appendTraversal(path: string[], targetId: string) {
  if (path[path.length - 1] === targetId) return path;
  return [...path, targetId];
}

function rewindTraversal(path: string[], targetId: string, targetIndex?: number) {
  if (typeof targetIndex === "number" && path[targetIndex] === targetId) {
    return path.slice(0, targetIndex + 1);
  }

  const index = path.lastIndexOf(targetId);
  if (index < 0) return appendTraversal(path, targetId);
  return path.slice(0, index + 1);
}

function readTraversalMemory() {
  if (typeof window === "undefined") return [];
  const remembered = (window as TraversalWindow).__bflFocusTraversal;
  return Array.isArray(remembered) ? [...remembered] : [];
}

function writeTraversalMemory(path: string[]) {
  if (typeof window === "undefined") return;
  (window as TraversalWindow).__bflFocusTraversal = [...path];
}

function traversalBase(localPath: string[], focusId: string) {
  const remembered = readTraversalMemory();
  if (remembered.length && remembered[remembered.length - 1] === focusId) return remembered;
  return localPath;
}

function readBrowserState() {
  const segments = window.location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  const node = getNodeByPath(segments);
  const params = new URLSearchParams(window.location.search);
  const projection = parseProjection(params.get("view") ?? undefined) ?? defaultProjectionForNode(node.id);
  const processScope = parseProcessScope(params.get("scope") ?? undefined) ?? "full";
  const heroVisible = node.id === "root" && params.get("world") !== "1";

  return { node, projection, processScope, heroVisible };
}

export function WorldApp({
  initialNodeId,
  initialProjection,
  initialProcessScope = "full",
  initialHeroVisible = false,
}: WorldAppProps) {
  const router = useRouter();
  const resolvedInitialProjection = initialProjection ?? defaultProjectionForNode(initialNodeId);
  const [focusId, setFocusId] = useState(initialNodeId);
  const [projection, setProjection] = useState<ProjectionMode>(resolvedInitialProjection);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
  const [heroVisible, setHeroVisible] = useState(initialHeroVisible);
  const [traversalIds, setTraversalIds] = useState<string[]>([initialNodeId]);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("none");
  const [transitionKey, setTransitionKey] = useState(0);
  const [inspectionId, setInspectionId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const focusNode = hydrateContentNode(getNode(focusId));
  const traversalPath = useMemo(
    () => traversalIds.map((id) => hydrateContentNode(getNode(id))),
    [traversalIds],
  );
  const siblings = getSiblings(focusId).map(hydrateContentNode);
  const hasSiblings = siblings.some((node) => node.id !== focusId);
  const showTraversalPath = focusId !== "root" || traversalIds.length > 1;
  const worldMode = projection === "record" ? "detail" : projection;
  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = projection === "gestalt" && processScopeIndex > 0;
  const canProcessZoomIn = projection === "gestalt" && processScopeIndex < processScopes.length - 1;

  const activeInspection = useMemo(() => {
    if (!inspectionId) return undefined;
    return focusNode.inspection?.find((inspection) => inspection.id === inspectionId);
  }, [focusNode, inspectionId]);

  useEffect(() => {
    const remembered = readTraversalMemory();
    const restored = remembered.length ? appendTraversal(remembered, initialNodeId) : [initialNodeId];
    writeTraversalMemory(restored);
    setTraversalIds(restored);
  }, [initialNodeId]);

  useEffect(() => {
    const onPopState = () => {
      const next = readBrowserState();
      const remembered = readTraversalMemory();
      const nextTraversal = remembered.length ? appendTraversal(remembered, next.node.id) : [next.node.id];

      writeTraversalMemory(nextTraversal);
      setFocusId(next.node.id);
      setProjection(next.projection);
      setProcessScope(next.processScope);
      setHeroVisible(next.heroVisible);
      setTraversalIds(nextTraversal);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      setInspectionId(null);
      setSearchOpen(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (heroVisible) return;

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
  }, [heroVisible]);

  const enterLab = useCallback(() => {
    const rootTraversal = ["root"];
    writeTraversalMemory(rootTraversal);
    setHeroVisible(false);
    setFocusId("root");
    setProjection("world");
    setProcessScope("full");
    setTraversalIds(rootTraversal);
    setTransitionDirection("none");
    setTransitionKey((value) => value + 1);
    router.replace(stateUrl("root", "world", "full"), { scroll: false });
  }, [router]);

  const navigate = useCallback(
    (targetId: string, direction?: TransitionDirection) => {
      const nextTraversal = appendTraversal(traversalBase(traversalIds, focusId), targetId);
      writeTraversalMemory(nextTraversal);
      setTransitionDirection(direction ?? inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setTraversalIds((current) => appendTraversal(current, targetId));
      setInspectionId(null);
      router.push(stateUrl(targetId, projection, processScope), { scroll: false });
    },
    [focusId, processScope, projection, router, traversalIds],
  );

  const navigateHome = useCallback(() => {
    const nextTraversal = appendTraversal(traversalBase(traversalIds, focusId), "root");
    writeTraversalMemory(nextTraversal);
    setHeroVisible(false);
    setTransitionDirection("up");
    setTransitionKey((value) => value + 1);
    setFocusId("root");
    setTraversalIds(nextTraversal);
    setProjection("world");
    setProcessScope("full");
    setInspectionId(null);
    router.push(stateUrl("root", "world", "full"), { scroll: false });
  }, [focusId, router, traversalIds]);

  const navigateTraversalPath = useCallback(
    (targetId: string, index: number) => {
      if (targetId === focusId && index === traversalIds.length - 1) return;
      const rewoundTraversal = rewindTraversal(traversalBase(traversalIds, focusId), targetId, index);
      writeTraversalMemory(rewoundTraversal);
      setTransitionDirection(inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setTraversalIds(rewoundTraversal);
      setInspectionId(null);
      router.push(stateUrl(targetId, projection, processScope), { scroll: false });
    },
    [focusId, processScope, projection, router, traversalIds],
  );

  const changeProcessScope = useCallback(
    (nextScope: ProcessScope) => {
      if (nextScope === processScope) return;
      setProcessScope(nextScope);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      router.replace(stateUrl(focusId, projection, nextScope), { scroll: false });
    },
    [focusId, processScope, projection, router],
  );

  const processZoomOut = useCallback(() => {
    if (canProcessZoomOut) changeProcessScope(processScopes[processScopeIndex - 1]);
  }, [canProcessZoomOut, changeProcessScope, processScopeIndex]);

  const processZoomIn = useCallback(() => {
    if (canProcessZoomIn) changeProcessScope(processScopes[processScopeIndex + 1]);
  }, [canProcessZoomIn, changeProcessScope, processScopeIndex]);

  const changeProjection = useCallback(
    (nextProjection: ProjectionMode) => {
      if (nextProjection === projection) return;
      setProjection(nextProjection);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      setInspectionId(null);
      router.push(stateUrl(focusId, nextProjection, processScope), { scroll: false });
    },
    [focusId, processScope, projection, router],
  );

  const openInspection = useCallback((nextInspectionId: string) => setInspectionId(nextInspectionId), []);

  if (heroVisible) {
    return <HeroScreen onEnter={enterLab} />;
  }

  return (
    <div
      className="site-shell"
      data-world-mode={worldMode}
      data-projection={projection}
      data-root-focus={focusId === "root" ? "true" : "false"}
      data-has-siblings={hasSiblings ? "true" : "false"}
      data-show-traversal={showTraversalPath ? "true" : "false"}
    >
      <BoundaryFrame
        visible
        focusNode={focusNode}
        traversalPath={traversalPath}
        siblings={siblings}
        projection={projection}
        processScope={processScope}
        canProcessZoomOut={canProcessZoomOut}
        canProcessZoomIn={canProcessZoomIn}
        onHome={navigateHome}
        onBack={() => router.back()}
        onNavigate={navigate}
        onTraversalPath={navigateTraversalPath}
        onProcessZoomOut={processZoomOut}
        onProcessZoomIn={processZoomIn}
        onProjectionChange={changeProjection}
        onSearch={() => setSearchOpen(true)}
      />

      {projection === "world" ? (
        <WorldView
          node={focusNode}
          transitionDirection={transitionDirection}
          transitionKey={transitionKey}
          onNavigate={navigate}
          onInspect={openInspection}
        />
      ) : projection === "record" ? (
        <RecordView
          focusNode={focusNode}
          transitionDirection={transitionDirection}
          transitionKey={transitionKey}
          onNavigate={navigate}
          onInspect={openInspection}
        />
      ) : projection === "evidence" ? (
        <EvidenceView
          focusNode={focusNode}
          onInspect={openInspection}
          onNavigate={(targetId) => navigate(targetId, "cross")}
        />
      ) : (
        <GestaltView
          focusNode={focusNode}
          scope={processScope}
          onNavigate={(targetId) => navigate(targetId, "cross")}
        />
      )}

      {activeInspection ? <InspectionPanel inspection={activeInspection} onClose={() => setInspectionId(null)} /> : null}
      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigate} /> : null}
    </div>
  );
}

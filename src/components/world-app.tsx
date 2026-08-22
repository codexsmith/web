"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ApparatusPrototypeFrame, ApparatusPrototypeWorld } from "@/components/apparatus-prototype";
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
import { parseUiShell, type UiShellMode } from "@/lib/ui-shell";

type WorldAppProps = {
  initialNodeId: string;
  initialProjection?: ProjectionMode;
  initialProcessScope?: ProcessScope;
  initialHeroVisible?: boolean;
  initialUiShell?: UiShellMode;
};

type TraversalWindow = Window & {
  __bflFocusTraversal?: string[];
  __bflFocusTraversalCursor?: number;
};

type TraversalState = {
  ids: string[];
  cursor: number;
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

function isAdmissibleHierarchyMove(fromId: string, toId: string) {
  if (fromId === toId) return false;
  const from = getNode(fromId);
  const to = getNode(toId);

  if (from.parentId === to.id) return true;
  if (to.parentId === from.id) return true;
  return Boolean(from.parentId && from.parentId === to.parentId);
}

function stateUrl(
  focusId: string,
  projection: ProjectionMode,
  processScope: ProcessScope,
  uiShell: UiShellMode = "cards",
) {
  const focusPath = getPathForNode(focusId);
  const params = new URLSearchParams();
  const publicProjection = projection === "gestalt"
    ? (focusId === "root" ? "timeline" : "process")
    : projection;

  if (focusId === "root") params.set("world", "1");
  if (projection !== defaultProjectionForNode(focusId)) params.set("view", publicProjection);
  if (projection === "gestalt" && processScope !== "full") params.set("scope", processScope);
  if (uiShell === "apparatus") params.set("ui", "apparatus");

  const query = params.toString();
  return query ? `${focusPath}?${query}` : focusPath;
}

function appendTraversal(path: string[], targetId: string) {
  if (path[path.length - 1] === targetId) return path;
  return [...path, targetId];
}

function rewindTraversal(path: string[], targetId: string, targetIndex?: number) {
  if (typeof targetIndex === "number" && path[targetIndex] === targetId) return targetIndex;
  return path.lastIndexOf(targetId);
}

function replaceTraversalTerminal(path: string[], cursor: number, targetId: string): TraversalState {
  const activePath = path.slice(0, Math.max(0, cursor) + 1);
  if (!activePath.length) return { ids: [targetId], cursor: 0 };
  activePath[activePath.length - 1] = targetId;
  return { ids: activePath, cursor: activePath.length - 1 };
}

function normalizeTraversalCursor(path: string[], cursor: number | undefined) {
  if (!path.length) return -1;
  if (typeof cursor !== "number" || Number.isNaN(cursor)) return path.length - 1;
  return Math.min(Math.max(0, cursor), path.length - 1);
}

function readTraversalMemory(): TraversalState {
  if (typeof window === "undefined") return { ids: [], cursor: -1 };
  const traversalWindow = window as TraversalWindow;
  const remembered = traversalWindow.__bflFocusTraversal;
  const ids = Array.isArray(remembered) ? [...remembered] : [];
  return {
    ids,
    cursor: normalizeTraversalCursor(ids, traversalWindow.__bflFocusTraversalCursor),
  };
}

function writeTraversalMemory(path: string[], cursor: number) {
  if (typeof window === "undefined") return;
  const traversalWindow = window as TraversalWindow;
  traversalWindow.__bflFocusTraversal = [...path];
  traversalWindow.__bflFocusTraversalCursor = normalizeTraversalCursor(path, cursor);
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
  const uiShell = parseUiShell(params.get("ui") ?? undefined);
  const heroVisible = node.id === "root" && params.get("world") !== "1";

  return { node, projection, processScope, uiShell, heroVisible };
}

export function WorldApp({
  initialNodeId,
  initialProjection,
  initialProcessScope = "full",
  initialHeroVisible = false,
  initialUiShell = "cards",
}: WorldAppProps) {
  const router = useRouter();
  const resolvedInitialProjection = initialProjection ?? defaultProjectionForNode(initialNodeId);
  const [focusId, setFocusId] = useState(initialNodeId);
  const [projection, setProjection] = useState<ProjectionMode>(resolvedInitialProjection);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
  const [uiShell, setUiShell] = useState<UiShellMode>(initialUiShell);
  const [heroVisible, setHeroVisible] = useState(initialHeroVisible);
  const [traversalIds, setTraversalIds] = useState<string[]>([initialNodeId]);
  const [traversalCursor, setTraversalCursor] = useState(0);
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
  const showTraversalPath = traversalIds.filter((id) => id !== "root").length > 1;
  const canTraceBack = traversalCursor > 0;
  const canTraceForward = traversalCursor >= 0 && traversalCursor < traversalIds.length - 1;
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
    let restored: TraversalState;

    if (!remembered.ids.length) {
      restored = { ids: [initialNodeId], cursor: 0 };
    } else {
      const existingIndex = remembered.ids.lastIndexOf(initialNodeId);
      if (existingIndex >= 0) {
        restored = { ids: remembered.ids, cursor: existingIndex };
      } else {
        const rememberedFocus = remembered.ids[remembered.cursor] ?? remembered.ids[remembered.ids.length - 1];
        const from = getNode(rememberedFocus);
        const to = getNode(initialNodeId);
        restored = from.parentId && from.parentId === to.parentId
          ? replaceTraversalTerminal(remembered.ids, remembered.cursor, initialNodeId)
          : {
              ids: appendTraversal(remembered.ids.slice(0, remembered.cursor + 1), initialNodeId),
              cursor: remembered.cursor + 1,
            };
      }
    }

    writeTraversalMemory(restored.ids, restored.cursor);

    if (
      restored.ids.length === 1 &&
      restored.ids[0] === initialNodeId &&
      restored.cursor === 0
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setTraversalIds(restored.ids);
      setTraversalCursor(restored.cursor);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialNodeId]);

  useEffect(() => {
    const onPopState = () => {
      const next = readBrowserState();
      const remembered = readTraversalMemory();
      const existingIndex = remembered.ids.lastIndexOf(next.node.id);
      let nextTraversal: TraversalState;

      if (existingIndex >= 0) {
        nextTraversal = { ids: remembered.ids, cursor: existingIndex };
      } else if (remembered.ids.length) {
        const rememberedFocus = remembered.ids[remembered.cursor] ?? remembered.ids[remembered.ids.length - 1];
        const from = getNode(rememberedFocus);
        const to = getNode(next.node.id);
        nextTraversal = from.parentId && from.parentId === to.parentId
          ? replaceTraversalTerminal(remembered.ids, remembered.cursor, next.node.id)
          : {
              ids: appendTraversal(remembered.ids.slice(0, remembered.cursor + 1), next.node.id),
              cursor: remembered.cursor + 1,
            };
      } else {
        nextTraversal = { ids: [next.node.id], cursor: 0 };
      }

      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setFocusId(next.node.id);
      setProjection(next.projection);
      setProcessScope(next.processScope);
      setUiShell(next.uiShell);
      setHeroVisible(next.heroVisible);
      setTraversalIds(nextTraversal.ids);
      setTraversalCursor(nextTraversal.cursor);
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
    writeTraversalMemory(rootTraversal, 0);
    setHeroVisible(false);
    setFocusId("root");
    setProjection("world");
    setProcessScope("full");
    setTraversalIds(rootTraversal);
    setTraversalCursor(0);
    setTransitionDirection("none");
    setTransitionKey((value) => value + 1);

    if (uiShell === "apparatus") {
      router.replace(stateUrl("root", "world", "full", uiShell), { scroll: false });
    } else {
      router.replace(stateUrl("root", "world", "full"), { scroll: false });
    }
  }, [router, uiShell]);

  const navigate = useCallback(
    (targetId: string, direction?: TransitionDirection) => {
      if (targetId === focusId) return;

      const activePath = traversalIds.slice(0, traversalCursor + 1);
      let nextTraversal: TraversalState;

      if (traversalCursor === traversalIds.length - 1) {
        nextTraversal = {
          ids: appendTraversal(traversalIds, targetId),
          cursor: traversalIds.length,
        };
        setTraversalIds((current) => appendTraversal(current, targetId));
      } else {
        nextTraversal = {
          ids: appendTraversal(activePath, targetId),
          cursor: activePath.length,
        };
        setTraversalIds(nextTraversal.ids);
      }

      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setTraversalCursor(nextTraversal.cursor);
      setTransitionDirection(direction ?? inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setInspectionId(null);
      router.push(stateUrl(targetId, projection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, traversalCursor, traversalIds, uiShell],
  );

  const navigateLocal = useCallback(
    (targetId: string) => {
      if (!isAdmissibleHierarchyMove(focusId, targetId)) return;

      const activePath = traversalIds.slice(0, traversalCursor + 1);
      const nextIds = appendTraversal(activePath, targetId);
      const nextTraversal = { ids: nextIds, cursor: nextIds.length - 1 };

      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setTraversalIds(nextTraversal.ids);
      setTraversalCursor(nextTraversal.cursor);
      setTransitionDirection(inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setInspectionId(null);
      setSearchOpen(false);
      router.push(stateUrl(targetId, projection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, traversalCursor, traversalIds, uiShell],
  );

  const navigateFromSearch = useCallback(
    (targetId: string) => {
      if (targetId === focusId) {
        setSearchOpen(false);
        return;
      }

      const nextTraversal = { ids: [targetId], cursor: 0 };
      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setTraversalIds(nextTraversal.ids);
      setTraversalCursor(nextTraversal.cursor);
      setTransitionDirection("cross");
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setInspectionId(null);
      setSearchOpen(false);
      router.push(stateUrl(targetId, projection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, uiShell],
  );

  const navigateHome = useCallback(() => {
    const rootTraversal = ["root"];
    writeTraversalMemory(rootTraversal, 0);
    setHeroVisible(false);
    setTransitionDirection("up");
    setTransitionKey((value) => value + 1);
    setFocusId("root");
    setTraversalIds(rootTraversal);
    setTraversalCursor(0);
    setProjection("world");
    setProcessScope("full");
    setInspectionId(null);
    router.push(stateUrl("root", "world", "full", uiShell), { scroll: false });
  }, [router, uiShell]);

  const moveTraversalCursor = useCallback(
    (nextCursor: number) => {
      if (nextCursor < 0 || nextCursor >= traversalIds.length || nextCursor === traversalCursor) return;
      const targetId = traversalIds[nextCursor];
      writeTraversalMemory(traversalIds, nextCursor);
      setTransitionDirection(inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setTraversalCursor(nextCursor);
      setInspectionId(null);
      router.replace(stateUrl(targetId, projection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, traversalCursor, traversalIds, uiShell],
  );

  const navigateTraceBack = useCallback(() => {
    moveTraversalCursor(traversalCursor - 1);
  }, [moveTraversalCursor, traversalCursor]);

  const navigateTraceForward = useCallback(() => {
    moveTraversalCursor(traversalCursor + 1);
  }, [moveTraversalCursor, traversalCursor]);

  const navigateTraversalPath = useCallback(
    (targetId: string, index: number) => {
      const targetIndex = rewindTraversal(traversalIds, targetId, index);
      if (targetIndex < 0) return;
      moveTraversalCursor(targetIndex);
    },
    [moveTraversalCursor, traversalIds],
  );

  const changeProcessScope = useCallback(
    (nextScope: ProcessScope) => {
      if (nextScope === processScope) return;
      setProcessScope(nextScope);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      router.replace(stateUrl(focusId, projection, nextScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, uiShell],
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
      router.push(stateUrl(focusId, nextProjection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projection, router, uiShell],
  );

  const exitPrototype = useCallback(() => {
    setUiShell("cards");
    setTransitionDirection("none");
    setTransitionKey((value) => value + 1);
    router.replace(stateUrl(focusId, projection, processScope, "cards"), { scroll: false });
  }, [focusId, processScope, projection, router]);

  const openInspection = useCallback((nextInspectionId: string) => setInspectionId(nextInspectionId), []);

  if (heroVisible) {
    return <HeroScreen onEnter={enterLab} />;
  }

  const projectionSurface = projection === "world" ? (
    uiShell === "apparatus" ? (
      <ApparatusPrototypeWorld
        node={focusNode}
        onNavigate={(targetId) => navigate(targetId)}
        onInspect={openInspection}
      />
    ) : (
      <WorldView
        node={focusNode}
        transitionDirection={transitionDirection}
        transitionKey={transitionKey}
        onNavigate={navigate}
        onInspect={openInspection}
      />
    )
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
  );

  return (
    <div
      className={`site-shell ${uiShell === "apparatus" ? "site-shell--apparatus-prototype" : ""}`}
      data-world-mode={worldMode}
      data-projection={projection}
      data-ui-renderer={uiShell}
      data-root-focus={focusId === "root" ? "true" : "false"}
      data-has-siblings={hasSiblings ? "true" : "false"}
      data-show-traversal={showTraversalPath ? "true" : "false"}
    >
      {uiShell === "apparatus" ? (
        <ApparatusPrototypeFrame
          focusNode={focusNode}
          traversalPath={traversalPath}
          siblings={siblings}
          projection={projection}
          processScope={processScope}
          canProcessZoomOut={canProcessZoomOut}
          canProcessZoomIn={canProcessZoomIn}
          onHome={navigateHome}
          onBack={navigateTraceBack}
          onNavigate={(targetId) => navigate(targetId)}
          onTraversalPath={navigateTraversalPath}
          onProcessZoomOut={processZoomOut}
          onProcessZoomIn={processZoomIn}
          onProjectionChange={changeProjection}
          onSearch={() => setSearchOpen(true)}
          onExitPrototype={exitPrototype}
        >
          <div className="apparatus-prototype__projection-surface">{projectionSurface}</div>
        </ApparatusPrototypeFrame>
      ) : (
        <>
          <BoundaryFrame
            visible
            focusNode={focusNode}
            traversalPath={traversalPath}
            traversalCursor={traversalCursor}
            siblings={siblings}
            projection={projection}
            processScope={processScope}
            canTraceBack={canTraceBack}
            canTraceForward={canTraceForward}
            canProcessZoomOut={canProcessZoomOut}
            canProcessZoomIn={canProcessZoomIn}
            onHome={navigateHome}
            onBack={navigateTraceBack}
            onForward={navigateTraceForward}
            onLocalNavigate={navigateLocal}
            onProcessZoomOut={processZoomOut}
            onProcessZoomIn={processZoomIn}
            onProjectionChange={changeProjection}
            onSearch={() => setSearchOpen(true)}
          />
          {projectionSurface}
        </>
      )}

      {activeInspection ? <InspectionPanel inspection={activeInspection} onClose={() => setInspectionId(null)} /> : null}
      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigateFromSearch} /> : null}
    </div>
  );
}

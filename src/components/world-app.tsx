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
import { TransitionDirection, WorldView } from "@/components/world-view";
import { hydrateContentNode } from "@/lib/content-projections";
import { getNode, getNodeByPath, getParent, getPathForNode, getSiblings } from "@/lib/content-registry";
import { parseProcessScope, processScopes, type ProcessScope } from "@/lib/bfl-process";
import {
  defaultProjectionForNode,
  normalizeProjectionForNode,
  parseProjection,
  projectionLabels,
  type ProjectionMode,
} from "@/lib/view-projection";
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

type ProjectionTransportNotice = {
  requested: ProjectionMode;
  resolved: ProjectionMode;
  targetLabel: string;
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
  projectionIntent: ProjectionMode,
  processScope: ProcessScope,
  uiShell: UiShellMode = "cards",
) {
  const focusPath = getPathForNode(focusId);
  const params = new URLSearchParams();
  const publicProjection = projectionIntent === "gestalt"
    ? (focusId === "root" ? "timeline" : "process")
    : projectionIntent;

  if (focusId === "root") params.set("world", "1");
  if (projectionIntent !== defaultProjectionForNode(focusId)) params.set("view", publicProjection);
  if (projectionIntent === "gestalt" && processScope !== "full") params.set("scope", processScope);
  if (uiShell === "apparatus") params.set("ui", "apparatus");

  const query = params.toString();
  return query ? `${focusPath}?${query}` : focusPath;
}

function normalizeTraversalCursor(path: string[], cursor: number | undefined) {
  if (!path.length) return -1;
  if (typeof cursor !== "number" || Number.isNaN(cursor)) return path.length - 1;
  return Math.min(Math.max(0, cursor), path.length - 1);
}

function branchTraversal(path: string[], cursor: number, targetId: string): TraversalState {
  const normalizedCursor = normalizeTraversalCursor(path, cursor);
  const activePath = normalizedCursor >= 0 ? path.slice(0, normalizedCursor + 1) : [];

  if (activePath[activePath.length - 1] === targetId) {
    return { ids: activePath, cursor: activePath.length - 1 };
  }

  const ids = [...activePath, targetId];
  return { ids, cursor: ids.length - 1 };
}

function resolveExistingTraversalCursor(path: string[], cursor: number, targetId: string) {
  const normalizedCursor = normalizeTraversalCursor(path, cursor);
  if (normalizedCursor < 0) return -1;
  if (path[normalizedCursor] === targetId) return normalizedCursor;
  if (normalizedCursor > 0 && path[normalizedCursor - 1] === targetId) return normalizedCursor - 1;
  if (normalizedCursor < path.length - 1 && path[normalizedCursor + 1] === targetId) return normalizedCursor + 1;
  return path.lastIndexOf(targetId);
}

function readTraversalMemory(): TraversalState {
  if (typeof window === "undefined") return { ids: [], cursor: -1 };

  let ids: string[] = [];
  let cursor = -1;

  try {
    const stored = sessionStorage.getItem("bfl_traversal_state");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed.ids)) {
        ids = parsed.ids;
        cursor = parsed.cursor;
      }
    }
  } catch {
    // Ignore parse errors
  }

  const traversalWindow = window as TraversalWindow;
  if (!ids.length && Array.isArray(traversalWindow.__bflFocusTraversal)) {
    ids = [...traversalWindow.__bflFocusTraversal];
    cursor = traversalWindow.__bflFocusTraversalCursor ?? -1;
  }

  return {
    ids,
    cursor: normalizeTraversalCursor(ids, cursor),
  };
}

function writeTraversalMemory(path: string[], cursor: number) {
  if (typeof window === "undefined") return;
  const traversalWindow = window as TraversalWindow;
  const normalizedCursor = normalizeTraversalCursor(path, cursor);

  traversalWindow.__bflFocusTraversal = [...path];
  traversalWindow.__bflFocusTraversalCursor = normalizedCursor;

  try {
    sessionStorage.setItem("bfl_traversal_state", JSON.stringify({
      ids: path,
      cursor: normalizedCursor
    }));
  } catch {
    // Ignore storage errors
  }
}

function readBrowserState() {
  const segments = window.location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  const node = getNodeByPath(segments);
  const params = new URLSearchParams(window.location.search);
  const requestedProjection = parseProjection(params.get("view") ?? undefined) ?? defaultProjectionForNode(node.id);
  const projection = normalizeProjectionForNode(node.id, requestedProjection);
  const processScope = parseProcessScope(params.get("scope") ?? undefined) ?? "full";
  const uiShell = parseUiShell(params.get("ui") ?? undefined);
  const heroVisible = node.id === "root" && params.get("world") !== "1";

  return { node, requestedProjection, projection, processScope, uiShell, heroVisible };
}

export function WorldApp({
  initialNodeId,
  initialProjection,
  initialProcessScope = "full",
  initialHeroVisible = false,
  initialUiShell = "cards",
}: WorldAppProps) {
  const router = useRouter();
  const initialProjectionIntent = initialProjection ?? defaultProjectionForNode(initialNodeId);
  const resolvedInitialProjection = normalizeProjectionForNode(initialNodeId, initialProjectionIntent);
  const [focusId, setFocusId] = useState(initialNodeId);
  const [projectionIntent, setProjectionIntent] = useState<ProjectionMode>(initialProjectionIntent);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
  const [uiShell, setUiShell] = useState<UiShellMode>(initialUiShell);
  const [heroVisible, setHeroVisible] = useState(initialHeroVisible);
  const [traversalIds, setTraversalIds] = useState<string[]>([initialNodeId]);
  const [traversalCursor, setTraversalCursor] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("none");
  const [transitionKey, setTransitionKey] = useState(0);
  const [inspectionId, setInspectionId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [projectionTransportNotice, setProjectionTransportNotice] = useState<ProjectionTransportNotice | null>(
    resolvedInitialProjection === initialProjectionIntent
      ? null
      : {
          requested: initialProjectionIntent,
          resolved: resolvedInitialProjection,
          targetLabel: getNode(initialNodeId).label,
        },
  );

  const focusNode = hydrateContentNode(getNode(focusId));
  const renderedProjection = normalizeProjectionForNode(focusId, projectionIntent);
  const parent = getParent(focusId);
  const parentNode = parent ? hydrateContentNode(parent) : undefined;
  const sectionPathSegment = focusNode.path.split("/")[0];
  const sectionThemeId = ["public-interest", "products", "publications", "about", "research"]
    .includes(sectionPathSegment)
    ? sectionPathSegment
    : undefined;
  const traversalPath = useMemo(
    () => traversalIds.map((id) => hydrateContentNode(getNode(id))),
    [traversalIds],
  );
  const siblings = getSiblings(focusId).map(hydrateContentNode);
  const hasSiblings = siblings.some((node) => node.id !== focusId);
  const showTraversalPath = traversalIds.filter((id) => id !== "root").length > 1;
  const canTraceBack = traversalCursor > 0;
  const canTraceForward = traversalCursor >= 0 && traversalCursor < traversalIds.length - 1;
  const worldMode = renderedProjection;
  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = renderedProjection === "gestalt" && processScopeIndex > 0;
  const canProcessZoomIn = renderedProjection === "gestalt" && processScopeIndex < processScopes.length - 1;

  const resolveProjectionTransport = useCallback((targetId: string, requestedProjection: ProjectionMode) => {
    const resolvedProjection = normalizeProjectionForNode(targetId, requestedProjection);
    setProjectionTransportNotice(
      resolvedProjection === requestedProjection
        ? null
        : {
            requested: requestedProjection,
            resolved: resolvedProjection,
            targetLabel: getNode(targetId).label,
          },
    );
    return resolvedProjection;
  }, []);

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
      const existingCursor = resolveExistingTraversalCursor(remembered.ids, remembered.cursor, initialNodeId);
      restored = existingCursor >= 0
        ? { ids: remembered.ids, cursor: existingCursor }
        : branchTraversal(remembered.ids, remembered.cursor, initialNodeId);
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
      let nextTraversal: TraversalState;

      if (remembered.ids.length) {
        const existingCursor = resolveExistingTraversalCursor(remembered.ids, remembered.cursor, next.node.id);
        nextTraversal = existingCursor >= 0
          ? { ids: remembered.ids, cursor: existingCursor }
          : branchTraversal(remembered.ids, remembered.cursor, next.node.id);
      } else {
        nextTraversal = { ids: [next.node.id], cursor: 0 };
      }

      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setFocusId(next.node.id);
      setProjectionIntent(next.requestedProjection);
      setProjectionTransportNotice(
        next.projection === next.requestedProjection
          ? null
          : {
              requested: next.requestedProjection,
              resolved: next.projection,
              targetLabel: next.node.label,
            },
      );
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
    setProjectionIntent("world");
    setProjectionTransportNotice(null);
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

      const nextTraversal = branchTraversal(traversalIds, traversalCursor, targetId);
      resolveProjectionTransport(targetId, projectionIntent);

      writeTraversalMemory(nextTraversal.ids, nextTraversal.cursor);
      setTraversalIds(nextTraversal.ids);
      setTraversalCursor(nextTraversal.cursor);
      setTransitionDirection(direction ?? inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setInspectionId(null);
      router.push(stateUrl(targetId, projectionIntent, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projectionIntent, resolveProjectionTransport, router, traversalCursor, traversalIds, uiShell],
  );

  const navigateLocal = useCallback(
    (targetId: string) => {
      if (!isAdmissibleHierarchyMove(focusId, targetId)) return;
      setSearchOpen(false);
      navigate(targetId);
    },
    [focusId, navigate],
  );

  const navigateFromSearch = useCallback(
    (targetId: string) => {
      if (targetId === focusId) {
        setSearchOpen(false);
        return;
      }

      setSearchOpen(false);
      navigate(targetId, "cross");
    },
    [focusId, navigate],
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
    setProjectionIntent("world");
    setProjectionTransportNotice(null);
    setProcessScope("full");
    setInspectionId(null);
    router.push(stateUrl("root", "world", "full", uiShell), { scroll: false });
  }, [router, uiShell]);

  const moveTraversalCursor = useCallback(
    (nextCursor: number) => {
      if (nextCursor < 0 || nextCursor >= traversalIds.length || nextCursor === traversalCursor) return;
      const targetId = traversalIds[nextCursor];
      resolveProjectionTransport(targetId, projectionIntent);
      writeTraversalMemory(traversalIds, nextCursor);
      setTransitionDirection(inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setTraversalCursor(nextCursor);
      setInspectionId(null);
      router.replace(stateUrl(targetId, projectionIntent, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projectionIntent, resolveProjectionTransport, router, traversalCursor, traversalIds, uiShell],
  );

  const navigateTraceBack = useCallback(() => {
    moveTraversalCursor(traversalCursor - 1);
  }, [moveTraversalCursor, traversalCursor]);

  const navigateTraceForward = useCallback(() => {
    moveTraversalCursor(traversalCursor + 1);
  }, [moveTraversalCursor, traversalCursor]);

  const navigateTraversalPath = useCallback(
    (targetId: string, index: number) => {
      if (traversalIds[index] !== targetId) return;
      moveTraversalCursor(index);
    },
    [moveTraversalCursor, traversalIds],
  );

  const navigateUp = useCallback(() => {
    const nextParent = getParent(focusId);
    if (!nextParent) return;
    setSearchOpen(false);
    navigate(nextParent.id, "up");
  }, [focusId, navigate]);

  const changeProcessScope = useCallback(
    (nextScope: ProcessScope) => {
      if (nextScope === processScope) return;
      setProcessScope(nextScope);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      router.replace(stateUrl(focusId, projectionIntent, nextScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projectionIntent, router, uiShell],
  );

  const processZoomOut = useCallback(() => {
    if (canProcessZoomOut) changeProcessScope(processScopes[processScopeIndex - 1]);
  }, [canProcessZoomOut, changeProcessScope, processScopeIndex]);

  const processZoomIn = useCallback(() => {
    if (canProcessZoomIn) changeProcessScope(processScopes[processScopeIndex + 1]);
  }, [canProcessZoomIn, changeProcessScope, processScopeIndex]);

  const changeProjection = useCallback(
    (nextProjection: ProjectionMode) => {
      if (nextProjection === projectionIntent) return;
      setProjectionIntent(nextProjection);
      resolveProjectionTransport(focusId, nextProjection);
      setTransitionDirection("none");
      setTransitionKey((value) => value + 1);
      setInspectionId(null);
      router.push(stateUrl(focusId, nextProjection, processScope, uiShell), { scroll: false });
    },
    [focusId, processScope, projectionIntent, resolveProjectionTransport, router, uiShell],
  );

  const exitPrototype = useCallback(() => {
    setUiShell("cards");
    setTransitionDirection("none");
    setTransitionKey((value) => value + 1);
    router.replace(stateUrl(focusId, projectionIntent, processScope, "cards"), { scroll: false });
  }, [focusId, processScope, projectionIntent, router]);

  const openInspection = useCallback((nextInspectionId: string) => setInspectionId(nextInspectionId), []);

  if (heroVisible) {
    return <HeroScreen onEnter={enterLab} />;
  }

  const projectionSurface = renderedProjection === "world" ? (
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
  ) : renderedProjection === "evidence" ? (
    <EvidenceView
      focusNode={focusNode}
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
      data-projection={renderedProjection}
      data-projection-intent={projectionIntent}
      data-projection-fallback={renderedProjection === projectionIntent ? "false" : "true"}
      data-ui-renderer={uiShell}
      data-root-focus={focusId === "root" ? "true" : "false"}
      data-section-theme={sectionThemeId}
      data-has-siblings={hasSiblings ? "true" : "false"}
      data-show-traversal={showTraversalPath ? "true" : "false"}
    >
      {uiShell === "apparatus" ? (
        <ApparatusPrototypeFrame
          focusNode={focusNode}
          traversalPath={traversalPath}
          siblings={siblings}
          projection={renderedProjection}
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
            parentNode={parentNode}
            traversalPath={traversalPath}
            traversalCursor={traversalCursor}
            siblings={siblings}
            projection={renderedProjection}
            processScope={processScope}
            canTraceBack={canTraceBack}
            canTraceForward={canTraceForward}
            canProcessZoomOut={canProcessZoomOut}
            canProcessZoomIn={canProcessZoomIn}
            onHome={navigateHome}
            onUp={navigateUp}
            onBack={navigateTraceBack}
            onForward={navigateTraceForward}
            onLocalNavigate={navigateLocal}
            onTraversalPath={navigateTraversalPath}
            onProcessZoomOut={processZoomOut}
            onProcessZoomIn={processZoomIn}
            onProjectionChange={changeProjection}
            onSearch={() => setSearchOpen(true)}
          />
          {projectionSurface}
        </>
      )}

      {projectionTransportNotice ? (
        <aside className="projection-transport-notice" role="status" aria-live="polite" aria-atomic="true">
          <span>Projection boundary</span>
          <strong>
            {projectionLabels[projectionTransportNotice.requested]} unavailable for {projectionTransportNotice.targetLabel}
          </strong>
          <small>
            Showing {projectionLabels[projectionTransportNotice.resolved]} here. {projectionLabels[projectionTransportNotice.requested]} remains preferred and will resume when supported.
          </small>
          <button type="button" onClick={() => setProjectionTransportNotice(null)} aria-label="Dismiss projection boundary notice">
            Dismiss
          </button>
        </aside>
      ) : null}

      {activeInspection ? <InspectionPanel inspection={activeInspection} onClose={() => setInspectionId(null)} /> : null}
      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigateFromSearch} /> : null}
    </div>
  );
}

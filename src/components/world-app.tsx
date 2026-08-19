"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { EvidenceView } from "@/components/evidence-view";
import { GestaltView } from "@/components/gestalt-view";
import { InspectionPanel } from "@/components/inspection-panel";
import { LandingSequence } from "@/components/landing-sequence";
import { SearchPanel } from "@/components/search-panel";
import { WorldEcology } from "@/components/world-ecology";
import { RecordView, TransitionDirection, WorldView } from "@/components/world-view";
import { hydrateContentNode } from "@/lib/content-projections";
import {
  getAncestors,
  getChildren,
  getNode,
  getPathForNode,
  getSiblings,
} from "@/lib/content";
import {
  processScopes,
  type ProcessScope,
} from "@/lib/bfl-process";
import { defaultProjectionForNode, type ProjectionMode } from "@/lib/view-projection";

type WorldAppProps = {
  initialNodeId: string;
  initialGestaltId?: string;
  initialProjection?: ProjectionMode;
  initialProcessScope?: ProcessScope;
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

function stateUrl(focusId: string, projection: ProjectionMode, processScope: ProcessScope) {
  const focusPath = getPathForNode(focusId);
  const params = new URLSearchParams();

  if (focusId === "root") {
    params.set("world", "1");
  }

  if (projection !== defaultProjectionForNode(focusId)) {
    params.set("view", projection);
  }

  if (projection === "gestalt" && processScope !== "full") {
    params.set("scope", processScope);
  }

  const query = params.toString();
  return query ? `${focusPath}?${query}` : focusPath;
}

export function WorldApp({
  initialNodeId,
  initialGestaltId,
  initialProjection,
  initialProcessScope = "full",
  skipLanding,
}: WorldAppProps) {
  const router = useRouter();
  const resolvedInitialGestaltId = initialGestaltId ?? initialNodeId;
  const resolvedInitialProjection = initialProjection ?? defaultProjectionForNode(initialNodeId);
  const [focusId, setFocusId] = useState(initialNodeId);
  const [gestaltId, setGestaltId] = useState(resolvedInitialGestaltId);
  const [projection, setProjection] = useState<ProjectionMode>(resolvedInitialProjection);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
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
  const siblings = getSiblings(focusId).map(hydrateContentNode);
  const hasSiblings = siblings.some((node) => node.id !== focusId);
  const worldMode = introEnabled ? "landing" : projection === "record" ? "detail" : projection;
  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = projection === "gestalt" && processScopeIndex > 0;
  const canProcessZoomIn = projection === "gestalt" && processScopeIndex < processScopes.length - 1;

  const activeInspection = useMemo(() => {
    if (!inspectionId) return undefined;
    return focusNode.inspection?.find((inspection) => inspection.id === inspectionId);
  }, [focusNode, inspectionId]);

  useEffect(() => {
    setFocusId(initialNodeId);
    setGestaltId(initialGestaltId ?? initialNodeId);
    setProjection(initialProjection ?? defaultProjectionForNode(initialNodeId));
    setProcessScope(initialProcessScope);
    setIntroEnabled(initialNodeId === "root" && !skipLanding);
    setLandingProgress(initialNodeId === "root" && !skipLanding ? 0 : 1);
    setInspectionId(null);
  }, [initialNodeId, initialGestaltId, initialProjection, initialProcessScope, skipLanding]);

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
      router.push(stateUrl(targetId, projection, processScope), { scroll: false });
    },
    [focusId, processScope, projection, router],
  );

  const navigateHome = useCallback(() => {
    setTransitionDirection("up");
    setTransitionKey((value) => value + 1);
    setFocusId("root");
    setGestaltId("root");
    setProjection("world");
    setProcessScope("full");
    setInspectionId(null);
    setIntroEnabled(false);
    setLandingProgress(1);
    router.push(stateUrl("root", "world", "full"), { scroll: false });
  }, [router]);

  const navigateFocusPath = useCallback(
    (targetId: string) => {
      if (targetId === focusId) return;

      setTransitionDirection(inferDirection(focusId, targetId));
      setTransitionKey((value) => value + 1);
      setFocusId(targetId);
      setGestaltId(targetId);
      setInspectionId(null);
      setIntroEnabled(false);
      setLandingProgress(1);
      router.push(stateUrl(targetId, projection, processScope), { scroll: false });
    },
    [focusId, processScope, projection, router],
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
    if (!canProcessZoomOut) return;
    changeProcessScope(processScopes[processScopeIndex - 1]);
  }, [canProcessZoomOut, changeProcessScope, processScopeIndex]);

  const processZoomIn = useCallback(() => {
    if (!canProcessZoomIn) return;
    changeProcessScope(processScopes[processScopeIndex + 1]);
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

  const openInspection = useCallback((nextInspectionId: string) => {
    setInspectionId(nextInspectionId);
  }, []);

  const frameVisible = !introEnabled || landingProgress > 0.48;

  return (
    <div
      className="site-shell"
      data-world-mode={worldMode}
      data-projection={projection}
      data-root-focus={focusId === "root" ? "true" : "false"}
      data-has-siblings={hasSiblings ? "true" : "false"}
    >
      <BoundaryFrame
        visible={frameVisible}
        focusNode={focusNode}
        breadcrumbs={breadcrumbs}
        rootBranches={rootBranches}
        siblings={siblings}
        projection={projection}
        processScope={processScope}
        canProcessZoomOut={canProcessZoomOut}
        canProcessZoomIn={canProcessZoomIn}
        onHome={navigateHome}
        onBack={() => router.back()}
        onNavigate={navigate}
        onFocusPath={navigateFocusPath}
        onProcessZoomOut={processZoomOut}
        onProcessZoomIn={processZoomIn}
        onProjectionChange={changeProjection}
        onSearch={() => setSearchOpen(true)}
      />

      {introEnabled ? (
        <LandingSequence branches={rootBranches} onNavigate={navigate} onProgress={setLandingProgress} />
      ) : projection === "world" ? (
        <>
          <WorldView
            gestaltNode={gestaltNode}
            focusNode={focusNode}
            transitionDirection={transitionDirection}
            transitionKey={transitionKey}
            onNavigate={navigate}
            onInspect={openInspection}
          />
          <WorldEcology
            focusNode={focusNode}
            gestaltNode={gestaltNode}
            onNavigate={(targetId) => navigate(targetId, "cross")}
          />
        </>
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
          gestaltNode={focusNode}
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

      {activeInspection ? (
        <InspectionPanel inspection={activeInspection} onClose={() => setInspectionId(null)} />
      ) : null}

      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigate} /> : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  getAncestors,
  getChildren,
  getNode,
  type ContentNode,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { processScopeLabels, type ProcessScope } from "@/lib/bfl-process";
import {
  projectionDescriptions,
  projectionLabels,
  projectionModes,
  type ProjectionMode,
} from "@/lib/view-projection";

type BoundaryFrameProps = {
  visible: boolean;
  focusNode: ContentNode;
  traversalPath: ContentNode[];
  traversalCursor: number;
  siblings: ContentNode[];
  projection?: ProjectionMode;
  processScope: ProcessScope;
  canTraceBack: boolean;
  canTraceForward: boolean;
  canProcessZoomOut: boolean;
  canProcessZoomIn: boolean;
  onHome: () => void;
  onBack: () => void;
  onForward: () => void;
  onLocalNavigate: (id: string) => void;
  onTraversalPath: (id: string, index: number) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
  onProjectionChange?: (projection: ProjectionMode) => void;
  onSearch: () => void;
};

type FrameIconName = "back" | "forward" | "search" | "minus" | "plus";

type TraceItem = {
  node: ContentNode;
  traversalIndex: number;
};

const rootProjectionLabels: Record<ProjectionMode, string> = {
  world: "World",
  record: "Founder",
  evidence: "Evidence",
  gestalt: "Timeline",
};

const rootProjectionDescriptions: Record<ProjectionMode, string> = {
  world: "The Lab's five public operating regions.",
  record: "Founder provenance, contribution, and present institutional responsibility.",
  evidence: "Evidence supporting founder provenance and operating history, with explicit claim boundaries.",
  gestalt: "Founder and institutional development timeline from practice to Boundary First Labs.",
};

const publicInterestPageSections = [
  { id: "public-interest-overview", ariaLabel: "Go to Public Interest overview" },
  { id: "public-interest-augusta", ariaLabel: "Go to Augusta Civic Infrastructure" },
] as const;

function FrameIcon({ name }: { name: FrameIconName }) {
  if (name === "back" || name === "forward") {
    const isForward = name === "forward";
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={isForward ? "m14 5 6 6-6 6" : "M10 5 4 11l6 6"} />
        <path d={isForward ? "M19 11h-8.5A6.5 6.5 0 0 0 4 17.5" : "M5 11h8.5a6.5 6.5 0 0 1 6.5 6.5"} />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.75" />
        <path d="m15 15 4.5 4.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M8.75 12h6.5" />
      {name === "plus" ? <path d="M12 8.75v6.5" /> : null}
    </svg>
  );
}

function RailSectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="apparatus-nav__section-label">{children}</div>;
}

export function BoundaryFrame({
  visible,
  focusNode,
  traversalPath,
  traversalCursor,
  siblings,
  projection = "world",
  processScope,
  canTraceBack,
  canTraceForward,
  canProcessZoomOut,
  canProcessZoomIn,
  onHome,
  onBack,
  onForward,
  onLocalNavigate,
  onTraversalPath,
  onProcessZoomOut,
  onProcessZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const isRootFocus = focusNode.id === "root";

  // The rail has three distinct representations:
  // 1. Boundary Tree: canonical containment around the first region boundary.
  // 2. Trace: the retained path beginning at the selected child of that boundary.
  // 3. Adjacent Options: siblings of the trace terminal, available without extending it.
  const containmentPath = isRootFocus
    ? []
    : [...getAncestors(focusNode.id), getNode(focusNode.id)]
        .filter((node) => node.id !== "root")
        .map(hydrateContentNode);

  const boundaryRoot = containmentPath[0];
  const boundarySelection = containmentPath[1];
  const boundaryTreeNodes = boundaryRoot
    ? getChildren(boundaryRoot.id).map(hydrateContentNode)
    : [];

  const activeTraversal = traversalPath.slice(0, traversalCursor + 1);
  const activeTraversalIds = activeTraversal.map((node) => node.id);
  const boundarySelectionTraversalIndex = boundarySelection
    ? activeTraversalIds.lastIndexOf(boundarySelection.id)
    : -1;

  const traversalTrace: TraceItem[] = boundarySelectionTraversalIndex >= 0
    ? activeTraversal.slice(boundarySelectionTraversalIndex).map((node, offset) => ({
        node,
        traversalIndex: boundarySelectionTraversalIndex + offset,
      }))
    : [];

  const containmentTrace: TraceItem[] = boundarySelection
    ? containmentPath.slice(1).map((node) => ({
        node,
        traversalIndex: activeTraversalIds.lastIndexOf(node.id),
      }))
    : [];

  const semanticTrace = traversalTrace.length > 1
    ? traversalTrace
    : containmentTrace.length > 1
      ? containmentTrace
      : [];
  const hasTrace = semanticTrace.length > 1;
  const adjacentNodes = hasTrace
    ? siblings.filter((node) => node.id !== focusNode.id)
    : [];
  const canMeaningfulTraceBack = canTraceBack && semanticTrace.some(
    (item) => item.traversalIndex >= 0 && item.traversalIndex < traversalCursor,
  );
  const showLeftNav = !isRootFocus && Boolean(boundaryRoot) && (
    boundaryTreeNodes.length > 0 || hasTrace || adjacentNodes.length > 0
  );

  const isPublicInterestWorld = focusNode.id === "public-interest" && projection === "world";
  const [activePageSection, setActivePageSection] = useState<string>(publicInterestPageSections[0].id);

  useEffect(() => {
    if (!isPublicInterestWorld) return;

    const container = document.querySelector<HTMLElement>(".public-interest-world");
    if (!container) return;

    const sections = publicInterestPageSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActivePage = () => {
      const marker = container.scrollTop + container.clientHeight * 0.42;
      let active = sections[0]?.id ?? publicInterestPageSections[0].id;

      sections.forEach((section) => {
        if (section.offsetTop <= marker) active = section.id;
      });

      setActivePageSection(active);
    };

    updateActivePage();
    container.addEventListener("scroll", updateActivePage, { passive: true });
    return () => container.removeEventListener("scroll", updateActivePage);
  }, [isPublicInterestWorld]);

  function jumpToPage(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActivePageSection(sectionId);
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function navigateTraceItem(item: TraceItem) {
    if (item.node.id === focusNode.id) return;
    if (item.traversalIndex >= 0) {
      onTraversalPath(item.node.id, item.traversalIndex);
      return;
    }
    onLocalNavigate(item.node.id);
  }

  return (
    <div
      className={`boundary-frame ${isRootFocus ? "boundary-frame--root" : ""} ${visible ? "boundary-frame--visible" : ""}`}
    >
      <header className="boundary-frame__top">
        <div className={`frame-home-tray ${hasTrace ? "frame-home-tray--trace" : ""}`} aria-label="Home and trace controls">
          <button
            className="brand-anchor"
            onClick={onHome}
            aria-label="Boundary First Labs home"
            title="Boundary First Labs home"
          >
            <span className="brand-anchor__mark" aria-hidden="true">BF</span>
          </button>

          {hasTrace ? (
            <>
              <button
                className="frame-tool frame-tool--trace-back"
                onClick={onBack}
                disabled={!canMeaningfulTraceBack}
                aria-label="Back through trace"
                title="Move one step backward through the trace"
              >
                <FrameIcon name="back" />
                <span className="frame-tool__label">Back</span>
              </button>
              <button
                className="frame-tool frame-tool--trace-forward"
                onClick={onForward}
                disabled={!canTraceForward}
                aria-label="Forward through trace"
                title="Move one step forward through the trace"
              >
                <FrameIcon name="forward" />
                <span className="frame-tool__label">Forward</span>
              </button>
            </>
          ) : null}
        </div>

        <div className="frame-tools" aria-label="Global controls">
          <button className="frame-tool" onClick={onSearch} aria-label="Search" title="Search the lab">
            <FrameIcon name="search" />
            <span className="frame-tool__label">Search</span>
          </button>

          {onProjectionChange ? (
            <div
              className="projection-switcher"
              aria-label={isRootFocus ? "Boundary First Labs views" : `Deeper representations of ${focusNode.label}`}
            >
              <span className="projection-switcher__label">Depth</span>
              {projectionModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => onProjectionChange(mode)}
                  aria-pressed={projection === mode}
                  title={isRootFocus ? rootProjectionDescriptions[mode] : projectionDescriptions[mode]}
                >
                  {isRootFocus ? rootProjectionLabels[mode] : projectionLabels[mode]}
                </button>
              ))}
            </div>
          ) : null}

          {projection === "gestalt" && !isRootFocus ? (
            <div className="frame-process-zoom" aria-label="Process context controls">
              <span className="frame-process-zoom__label" aria-hidden="true">
                <span>Process</span>
                <strong>{processScopeLabels[processScope]}</strong>
              </span>
              <button
                className="frame-tool"
                onClick={onProcessZoomOut}
                disabled={!canProcessZoomOut}
                aria-label="Widen process context"
                title="Widen the process context around the current subject"
              >
                <FrameIcon name="minus" />
                <span className="frame-tool__label">Widen process context</span>
              </button>
              <button
                className="frame-tool"
                onClick={onProcessZoomIn}
                disabled={!canProcessZoomIn}
                aria-label="Narrow process context"
                title="Narrow the process context around the current subject"
              >
                <FrameIcon name="plus" />
                <span className="frame-tool__label">Narrow process context</span>
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {showLeftNav && boundaryRoot ? (
        <aside
          className="boundary-frame__left boundary-frame__trace-nav"
          data-has-trace={hasTrace ? "true" : "false"}
          data-apparatus-sections="true"
        >
          <nav className="trace-nav apparatus-nav" aria-label={`Navigation apparatus for ${focusNode.label}`}>
            <header className="apparatus-nav__header">
              <span>Apparatus</span>
              <span className="apparatus-nav__slash" aria-hidden="true">/</span>
              <strong>Traversal Spine</strong>
              <span className="apparatus-nav__info" aria-hidden="true">i</span>
            </header>

            <section className="apparatus-nav__section apparatus-nav__boundary" aria-label="Boundary tree">
              <RailSectionLabel>Boundary Tree</RailSectionLabel>
              <div className="apparatus-nav__tree">
                <div className="apparatus-nav__tree-root">
                  <span className="apparatus-nav__terminal apparatus-nav__terminal--root" aria-hidden="true" />
                  <button
                    className={focusNode.id === boundaryRoot.id ? "is-current" : undefined}
                    aria-current={focusNode.id === boundaryRoot.id ? "page" : undefined}
                    onClick={() => {
                      if (focusNode.id !== boundaryRoot.id) onLocalNavigate(boundaryRoot.id);
                    }}
                    title={focusNode.id === boundaryRoot.id ? `${boundaryRoot.label} (current)` : `Open ${boundaryRoot.label}`}
                  >
                    <span>{boundaryRoot.shortLabel ?? boundaryRoot.label}</span>
                  </button>
                </div>

                {boundaryTreeNodes.length ? (
                  <ol className="apparatus-nav__tree-children">
                    {boundaryTreeNodes.map((node) => {
                      const isSelected = boundarySelection?.id === node.id;
                      const isCurrent = focusNode.id === node.id;
                      return (
                        <li key={node.id} data-selected={isSelected ? "true" : "false"}>
                          <span className="apparatus-nav__terminal" aria-hidden="true" />
                          <button
                            className={isSelected ? "is-selected" : undefined}
                            aria-current={isCurrent ? "page" : isSelected ? "location" : undefined}
                            onClick={() => {
                              if (!isCurrent) onLocalNavigate(node.id);
                            }}
                            title={isCurrent ? `${node.label} (current)` : `Open ${node.label}`}
                          >
                            <span>{node.shortLabel ?? node.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </div>
            </section>

            {hasTrace ? (
              <section className="apparatus-nav__section apparatus-nav__trace" aria-label="Traversal history">
                <RailSectionLabel>Trace <span aria-hidden="true">/</span> Traversal History</RailSectionLabel>
                <ol className="apparatus-nav__trace-list">
                  {semanticTrace.map((item, index) => {
                    const isCurrent = item.node.id === focusNode.id && index === semanticTrace.length - 1;
                    return (
                      <li key={`${item.node.id}-${index}`} data-current={isCurrent ? "true" : "false"}>
                        <span className="apparatus-nav__trace-symbol" aria-hidden="true" />
                        <button
                          aria-current={isCurrent ? "page" : undefined}
                          onClick={() => navigateTraceItem(item)}
                          title={isCurrent ? `${item.node.label} (current)` : `Return to ${item.node.label}`}
                        >
                          <span>{item.node.shortLabel ?? item.node.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ) : null}

            {adjacentNodes.length ? (
              <section className="apparatus-nav__section apparatus-nav__adjacent" aria-label="Sibling content and adjacent options">
                <RailSectionLabel>Sibling Content <span aria-hidden="true">/</span> Adjacent Options</RailSectionLabel>
                <ol className="apparatus-nav__adjacent-list">
                  {adjacentNodes.map((node) => (
                    <li key={node.id}>
                      <span className="apparatus-nav__adjacent-symbol" aria-hidden="true" />
                      <button onClick={() => onLocalNavigate(node.id)} title={`Open ${node.label}`}>
                        <strong>{node.shortLabel ?? node.label}</strong>
                        <small>Available from this parent</small>
                        <span className="apparatus-nav__chevron" aria-hidden="true">›</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </nav>
        </aside>
      ) : null}

      {isPublicInterestWorld ? (
        <aside className="boundary-frame__right boundary-frame__pages" aria-label="Page position">
          <div className="page-position-nav">
            {publicInterestPageSections.map((section) => (
              <button
                key={section.id}
                onClick={() => jumpToPage(section.id)}
                aria-label={section.ariaLabel}
                aria-current={activePageSection === section.id ? "page" : undefined}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </aside>
      ) : null}

      {/* Legacy contract vocabulary retained during migration: boundary-frame__bottom frame-tool--footer-back projection-switcher. */}
    </div>
  );
}

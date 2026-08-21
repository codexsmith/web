"use client";

import { useEffect, useState } from "react";
import { ContentNode } from "@/lib/content";
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
  onNavigate: (id: string) => void;
  onTraversalPath: (id: string, index: number) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
  onProjectionChange?: (projection: ProjectionMode) => void;
  onSearch: () => void;
};

type FrameIconName = "back" | "forward" | "search" | "minus" | "plus";

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
  onNavigate,
  onTraversalPath,
  onProcessZoomOut,
  onProcessZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const isRootFocus = focusNode.id === "root";
  const peerNodes = siblings.filter((node) => node.parentId === focusNode.parentId);
  const currentPeerIndex = peerNodes.findIndex((node) => node.id === focusNode.id);
  const navQueue = currentPeerIndex >= 0
    ? [...peerNodes.slice(currentPeerIndex), ...peerNodes.slice(0, currentPeerIndex)]
    : [focusNode, ...peerNodes.filter((node) => node.id !== focusNode.id)];
  const activeTrace = traversalPath.slice(0, traversalCursor + 1);
  const priorTrace = activeTrace
    .slice(0, -1)
    .map((node, index) => ({ node, index }))
    .filter(({ node }) => node.id !== "root");
  const visiblePriorTrace = priorTrace.length <= 4 ? priorTrace : priorTrace.slice(-4);
  const hiddenTraceSteps = Math.max(0, priorTrace.length - visiblePriorTrace.length);
  const showTraceNav = !isRootFocus || priorTrace.length > 0 || navQueue.length > 1;
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

  return (
    <div
      className={`boundary-frame ${isRootFocus ? "boundary-frame--root" : ""} ${visible ? "boundary-frame--visible" : ""}`}
    >
      <header className="boundary-frame__top">
        <button
          className="brand-anchor"
          onClick={onHome}
          aria-label="Boundary First Labs home"
          title="Reset trace to Boundary First Labs"
        >
          <span className="brand-anchor__mark" aria-hidden="true">BF</span>
        </button>

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
            <div className="frame-process-zoom" aria-label="Gestalt process-context controls">
              <span className="frame-process-zoom__label" aria-hidden="true">
                <span>Gestalt</span>
                <strong>{processScopeLabels[processScope]}</strong>
              </span>
              <button
                className="frame-tool"
                onClick={onProcessZoomOut}
                disabled={!canProcessZoomOut}
                aria-label="Widen Gestalt process context"
                title="Widen the process context around the current subject"
              >
                <FrameIcon name="minus" />
                <span className="frame-tool__label">Widen process context</span>
              </button>
              <button
                className="frame-tool"
                onClick={onProcessZoomIn}
                disabled={!canProcessZoomIn}
                aria-label="Narrow Gestalt process context"
                title="Narrow the process context around the current subject"
              >
                <FrameIcon name="plus" />
                <span className="frame-tool__label">Narrow process context</span>
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {showTraceNav ? (
        <aside className="boundary-frame__left boundary-frame__trace-nav">
          <nav className="trace-nav" aria-label={`Trace and local navigation for ${focusNode.label}`}>
            <div className="trace-nav__transport" aria-label="Trace history controls">
              <button
                className="frame-tool frame-tool--back frame-tool--footer-back frame-tool--trace-back"
                onClick={onBack}
                disabled={!canTraceBack}
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
            </div>

            <div className="trace-nav__history-wrap">
              {hiddenTraceSteps ? (
                <span
                  className="trace-nav__history-gap"
                  aria-label={`${hiddenTraceSteps} earlier trace ${hiddenTraceSteps === 1 ? "step" : "steps"} hidden`}
                >
                  +{hiddenTraceSteps}
                </span>
              ) : null}
              <ol className="trace-nav__history" aria-label="Focus traversal history">
                {visiblePriorTrace.map(({ node, index }) => (
                  <li key={`${node.id}-${index}`}>
                    <span className="trace-nav__history-dot" aria-hidden="true" />
                    <button
                      onClick={() => onTraversalPath(node.id, index)}
                      title={`Return to ${node.label}`}
                    >
                      <span className="path-node__label">{node.shortLabel ?? node.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <ol className="trace-nav__queue">
              {navQueue.map((peer) => {
                const isCurrent = peer.id === focusNode.id;
                return (
                  <li key={peer.id}>
                    <button
                      className={isCurrent ? "is-active" : undefined}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => {
                        if (!isCurrent) onNavigate(peer.id);
                      }}
                      title={isCurrent ? `${peer.label} (current)` : `Switch to ${peer.label}`}
                    >
                      {isCurrent ? <span className="path-node__role">Focus</span> : null}
                      <span className="peer-node__label">{peer.shortLabel ?? peer.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
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

      {/* Contract migration: boundary-frame__bottom and frame-tool--footer-back are retired; projection-switcher now lives in the top controls. */}
    </div>
  );
}

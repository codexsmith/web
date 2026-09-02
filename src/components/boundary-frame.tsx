"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BfuxIcon, projectionGlyph } from "@/components/bfux-icons";
import { type ContentNode } from "@/lib/content-registry";
import { processScopeLabels, type ProcessScope } from "@/lib/bfl-process";
import {
  projectionDescriptions,
  projectionLabels,
  projectionModesForNode,
  projectionPurposes,
  type ProjectionMode,
} from "@/lib/view-projection";

type BoundaryFrameProps = {
  visible: boolean;
  focusNode: ContentNode;
  parentNode?: ContentNode;
  traversalPath: ContentNode[];
  traversalCursor: number;
  siblings: ContentNode[];
  projection?: ProjectionMode;
  processScope: ProcessScope;
  canTraceBack: boolean;
  canTraceForward: boolean;
  canProcessZoomOut: boolean;
  canProcessZoomIn: boolean;
  surfaceLabel?: string;
  contextControls?: ReactNode;
  onHome: () => void;
  onUp: () => void;
  onBack: () => void;
  onForward: () => void;
  onLocalNavigate: (id: string) => void;
  onTraversalPath?: (id: string, index: number) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
  onProjectionChange?: (projection: ProjectionMode) => void;
  onSearch: () => void;
};

const rootProjectionLabels: Record<ProjectionMode, string> = {
  world: "World",
  evidence: "Evidence",
  gestalt: "Timeline",
};

const rootProjectionPurposes: Record<ProjectionMode, string> = {
  world: "Public regions",
  evidence: "Founder provenance",
  gestalt: "Development history",
};

const rootProjectionDescriptions: Record<ProjectionMode, string> = {
  world: "The Lab's five public operating regions.",
  evidence: "Evidence supporting founder provenance and operating history, with explicit claim boundaries.",
  gestalt: "Founder and institutional development timeline from practice to Boundary First Labs.",
};

function SiblingChoices({
  nodes,
  onNavigate,
}: {
  nodes: ContentNode[];
  onNavigate: (id: string) => void;
}) {
  if (!nodes.length) return null;

  return (
    <ol className="traversal-nav__peer-list" aria-label="Adjacent choices">
      {nodes.map((node) => (
        <li key={node.id}>
          <button onClick={() => onNavigate(node.id)} title={`Open ${node.label}`}>
            <BfuxIcon name="peer" className="traversal-nav__peer-glyph" />
            <span>{node.shortLabel ?? node.label}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function findSharedScrollContainer(sections: HTMLElement[]) {
  let candidate = sections[0]?.parentElement;

  while (candidate) {
    const style = window.getComputedStyle(candidate);
    const scrollable = /(auto|scroll|overlay)/.test(style.overflowY)
      && candidate.scrollHeight > candidate.clientHeight;
    const containsAllSections = sections.every((section) => candidate?.contains(section));

    if (scrollable && containsAllSections) return candidate;
    candidate = candidate.parentElement;
  }

  return undefined;
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
  surfaceLabel,
  contextControls,
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
  const availableProjectionModes = projectionModesForNode(focusNode.id);
  const siblingNodes = siblings.filter((node) => node.id !== focusNode.id);
  const hasTrace = traversalPath.length > 1;
  const activeTrace = traversalPath
    .map((node, index) => ({ node, index }))
    .filter(({ index }) => index <= traversalCursor);
  const displayTrace = activeTrace.filter(({ node, index }) => (
    node.id !== "root" || index !== 0 || index === traversalCursor
  ));
  const showLeftNav = !isRootFocus && siblingNodes.length > 0;
  const traceViewportRef = useRef<HTMLOListElement>(null);
  const localSections = useMemo(
    () => projection === "world" ? focusNode.localSections ?? [] : [],
    [focusNode, projection],
  );
  const showLocalSectionNav = localSections.length > 1;
  const [activeLocalSection, setActiveLocalSection] = useState<string>("");
  const inlineViewControls = isRootFocus ? contextControls : undefined;

  useEffect(() => {
    const viewport = traceViewportRef.current;
    if (!viewport) return;

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollLeft = viewport.scrollWidth;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusNode.id, traversalCursor, traversalPath.length]);

  useEffect(() => {
    if (!showLocalSectionNav) return;

    const sections = localSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const container = findSharedScrollContainer(sections);

    const updateActiveSection = () => {
      const marker = container
        ? container.getBoundingClientRect().top + container.clientHeight * 0.42
        : window.innerHeight * 0.42;
      let active = sections[0]?.id ?? localSections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) active = section.id;
      });

      setActiveLocalSection(active);
    };

    const frame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    if (container) {
      container.addEventListener("scroll", updateActiveSection, { passive: true });
      return () => {
        window.cancelAnimationFrame(frame);
        container.removeEventListener("scroll", updateActiveSection);
        window.removeEventListener("resize", updateActiveSection);
      };
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [localSections, showLocalSectionNav]);

  function jumpToLocalSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveLocalSection(sectionId);
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <div
      className={`boundary-frame ${isRootFocus ? "boundary-frame--root" : ""} ${visible ? "boundary-frame--visible" : ""}`}
    >
      <header className="boundary-frame__top">
        <div className={`frame-home-tray ${hasTrace ? "frame-home-tray--trace" : ""}`} aria-label="Home and traversal history controls">
          <button
            className="brand-anchor"
            onClick={onHome}
            aria-label="Boundary First Labs home"
            title="Boundary First Labs home"
          >
            <span className="brand-anchor__mark" aria-hidden="true">
              <BfuxIcon name="root" />
            </span>
          </button>

          {hasTrace ? (
            <>
              <button
                className="frame-tool frame-tool--trace-back"
                onClick={onBack}
                disabled={!canTraceBack}
                aria-label="Back through traversal history"
                title="Replay the previous traversal state"
              >
                <BfuxIcon name="back" />
                <span className="frame-tool__label">Back</span>
              </button>
              {canTraceForward ? (
                <button
                  className="frame-tool frame-tool--trace-forward"
                  onClick={onForward}
                  aria-label="Forward through traversal history"
                  title="Replay the next traversal state"
                >
                  <BfuxIcon name="forward" />
                  <span className="frame-tool__label">Forward</span>
                </button>
              ) : null}
            </>
          ) : null}
        </div>

        <nav className="frame-trace-path" aria-label="Focus traversal history">
          <ol ref={traceViewportRef}>
            {displayTrace.map(({ node, index }, displayIndex) => {
              const isCurrent = index === traversalCursor;
              const isRootStep = node.id === "root";
              const currentLabel = isRootFocus && surfaceLabel
                ? surfaceLabel
                : node.shortLabel ?? node.label;

              return (
                <li key={`${node.id}-${index}`}>
                  {displayIndex > 0 ? <span className="frame-trace-path__separator" aria-hidden="true">&gt;</span> : null}
                  {isCurrent ? (
                    <span className="frame-trace-path__node frame-trace-path__node--current" aria-current="page">
                      <small className="path-node__role">Focus · You are here</small>
                      <strong>{currentLabel}</strong>
                    </span>
                  ) : isRootStep ? (
                    <span className="frame-trace-path__root-step" title="Lab root traversal step" aria-label="Lab root traversal step">
                      <BfuxIcon name="root" />
                    </span>
                  ) : (
                    <button
                      className="frame-trace-path__node frame-trace-path__node--history"
                      onClick={() => {
                        if (onTraversalPath) onTraversalPath(node.id, index);
                        else onBack();
                      }}
                      title={`Replay ${node.label}`}
                    >
                      {node.shortLabel ?? node.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="frame-tools" aria-label="Global controls">
          <button className="frame-tool frame-tool--inspect" onClick={onSearch} aria-label="Search" title="Inspect and search the lab">
            <BfuxIcon name="inspect" />
            <span className="frame-tool__label">Search</span>
          </button>

          {onProjectionChange || inlineViewControls ? (
            <div
              className={`projection-switcher projection-switcher--legible ${inlineViewControls ? "projection-switcher--machine" : ""}`}
              role="group"
              data-projection={projection}
              aria-label={isRootFocus ? "Boundary First Labs views" : `Representations of ${focusNode.label}`}
            >
              <span className="projection-switcher__label">View</span>
              {inlineViewControls}
              {onProjectionChange ? availableProjectionModes.map((mode) => {
                const label = isRootFocus ? rootProjectionLabels[mode] : projectionLabels[mode];
                const purpose = isRootFocus ? rootProjectionPurposes[mode] : projectionPurposes[mode];
                const description = isRootFocus ? rootProjectionDescriptions[mode] : projectionDescriptions[mode];

                return (
                  <button
                    key={mode}
                    onClick={() => onProjectionChange(mode)}
                    aria-pressed={projection === mode}
                    aria-label={`${label}: ${description}`}
                    title={description}
                    data-projection-mode={mode}
                  >
                    <BfuxIcon name={projectionGlyph(mode)} className="projection-switcher__glyph" />
                    <span className="projection-switcher__copy">
                      <span className="projection-switcher__mode-name">{label}</span>
                      <small className="projection-switcher__mode-purpose">{purpose}</small>
                    </span>
                  </button>
                );
              }) : null}
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
                <BfuxIcon name="widen" />
                <span className="frame-tool__label">Widen process context</span>
              </button>
              <button
                className="frame-tool"
                onClick={onProcessZoomIn}
                disabled={!canProcessZoomIn}
                aria-label="Narrow process context"
                title="Narrow the process context around the current subject"
              >
                <BfuxIcon name="narrow" />
                <span className="frame-tool__label">Narrow process context</span>
              </button>
            </div>
          ) : null}

          {contextControls && !isRootFocus ? <div className="frame-context-controls">{contextControls}</div> : null}
        </div>
      </header>

      {showLeftNav ? (
        <aside
          className="boundary-frame__left boundary-frame__trace-nav boundary-frame__neighborhood-nav"
          data-has-history="false"
          data-apparatus-sections="true"
        >
          <nav className="trace-nav apparatus-nav traversal-nav boundary-neighborhood-nav" aria-label={`Local relational neighborhood for ${focusNode.label}`}>


            <div className="traversal-nav__flow">
              <section className="traversal-nav__next" aria-label="Adjacent nodes">
                <SiblingChoices nodes={siblingNodes} onNavigate={onLocalNavigate} />
              </section>
            </div>
          </nav>
        </aside>
      ) : null}

      {showLocalSectionNav ? (
        <aside
          className="boundary-frame__right boundary-frame__pages"
          aria-label={`Position within ${focusNode.label}`}
        >
          <div className="page-position-nav">
            {localSections.map((section) => (
              <button
                key={section.id}
                onClick={() => jumpToLocalSection(section.id)}
                aria-label={section.ariaLabel ?? `Go to ${section.label} within ${focusNode.label}`}
                aria-current={activeLocalSection === section.id ? "page" : undefined}
                title={section.label}
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

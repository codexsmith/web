"use client";

import { useEffect, useState } from "react";
import {
  getChildren,
  getParent,
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

function MoveGroup({
  direction,
  label,
  nodes,
  onNavigate,
}: {
  direction: "up" | "across" | "down";
  label: string;
  nodes: ContentNode[];
  onNavigate: (id: string) => void;
}) {
  if (!nodes.length) return null;

  return (
    <section className="traversal-nav__move-group" data-direction={direction} aria-label={`${label} navigation`}>
      <div className="traversal-nav__direction" aria-hidden="true">
        <span>{direction === "up" ? "↑" : direction === "across" ? "↔" : "↓"}</span>
        <strong>{label}</strong>
      </div>
      <ol>
        {nodes.map((node) => (
          <li key={node.id}>
            <button onClick={() => onNavigate(node.id)} title={`${label}: ${node.label}`}>
              <span>{node.shortLabel ?? node.label}</span>
              <small>{direction === "up" ? "Containing boundary" : direction === "across" ? "Same boundary" : "Contained region"}</small>
            </button>
          </li>
        ))}
      </ol>
    </section>
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
  onLocalNavigate,
  onProcessZoomOut,
  onProcessZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const isRootFocus = focusNode.id === "root";
  const activeTraversal = traversalPath.slice(0, traversalCursor + 1);
  const history = activeTraversal.slice(0, -1);
  const parent = getParent(focusNode.id);
  const parentNode = parent ? hydrateContentNode(parent) : undefined;
  const siblingNodes = siblings.filter((node) => node.id !== focusNode.id);
  const childNodes = getChildren(focusNode.id).map(hydrateContentNode);
  const hasTrace = activeTraversal.length > 1;
  const showLeftNav = !isRootFocus && (
    history.length > 0 || Boolean(parentNode) || siblingNodes.length > 0 || childNodes.length > 0
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
            <span className="brand-anchor__mark" aria-hidden="true">BF</span>
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
                <FrameIcon name="back" />
                <span className="frame-tool__label">Back</span>
              </button>
              <button
                className="frame-tool frame-tool--trace-forward"
                onClick={onForward}
                disabled={!canTraceForward}
                aria-label="Forward through traversal history"
                title="Replay the next traversal state"
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

      {showLeftNav ? (
        <aside
          className="boundary-frame__left boundary-frame__trace-nav"
          data-has-history={history.length ? "true" : "false"}
          data-apparatus-sections="true"
        >
          <nav className="trace-nav apparatus-nav traversal-nav" aria-label={`Traversal continuity for ${focusNode.label}`}>
            <header className="apparatus-nav__header traversal-nav__header">
              <strong>Traversal</strong>
              <span>Where you have been · where you can go next</span>
            </header>

            <div className="traversal-nav__flow">
              {history.length ? (
                <section className="traversal-nav__history" aria-label="Where you have been">
                  <div className="traversal-nav__section-label">Where you have been</div>
                  <ol>
                    {history.map((node, index) => (
                      <li key={`${node.id}-${index}`}>
                        <span className="traversal-nav__history-terminal" aria-hidden="true" />
                        <div className="traversal-nav__history-node">
                          <span>{node.shortLabel ?? node.label}</span>
                          <small>{String(index + 1).padStart(2, "0")}</small>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <section className="traversal-nav__current" aria-label="Current location">
                <span className="traversal-nav__current-terminal" aria-hidden="true" />
                <div>
                  <small>You are here</small>
                  <strong>{focusNode.shortLabel ?? focusNode.label}</strong>
                </div>
              </section>

              <section className="traversal-nav__next" aria-label="Where you can go next">
                <div className="traversal-nav__section-label">Where you can go next</div>
                <MoveGroup
                  direction="up"
                  label="Up"
                  nodes={parentNode ? [parentNode] : []}
                  onNavigate={onLocalNavigate}
                />
                <MoveGroup
                  direction="across"
                  label="Across"
                  nodes={siblingNodes}
                  onNavigate={onLocalNavigate}
                />
                <MoveGroup
                  direction="down"
                  label="Down"
                  nodes={childNodes}
                  onNavigate={onLocalNavigate}
                />
              </section>
            </div>
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

"use client";

import { ContentNode } from "@/lib/content";
import {
  projectionDescriptions,
  projectionLabels,
  projectionModes,
  type ProjectionMode,
} from "@/lib/view-projection";

type BoundaryFrameProps = {
  visible: boolean;
  focusNode: ContentNode;
  gestaltNode: ContentNode;
  breadcrumbs: ContentNode[];
  rootBranches: ContentNode[];
  canZoomOut: boolean;
  canZoomIn: boolean;
  projection?: ProjectionMode;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onFocusPath: (id: string) => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onProjectionChange?: (projection: ProjectionMode) => void;
  onSearch: () => void;
};

type FrameIconName = "back" | "search" | "minus" | "plus";

function FrameIcon({ name }: { name: FrameIconName }) {
  if (name === "back") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 5 4 11l6 6" />
        <path d="M5 11h8.5a6.5 6.5 0 0 1 6.5 6.5" />
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
  gestaltNode,
  breadcrumbs,
  rootBranches,
  canZoomOut,
  canZoomIn,
  projection = "world",
  onHome,
  onBack,
  onNavigate,
  onFocusPath,
  onZoomOut,
  onZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const focusPath = breadcrumbs.filter((node) => node.id !== "root");
  const showCurrentFocus = focusNode.id !== "root";

  return (
    <div className={`boundary-frame ${visible ? "boundary-frame--visible" : ""}`}>
      <header className="boundary-frame__top">
        <button className="brand-anchor" onClick={onHome} aria-label="Boundary First Labs home">
          <span className="brand-anchor__mark" aria-hidden="true">
            BF
          </span>
          <span className="brand-anchor__copy">
            <span className="brand-anchor__name">Boundary First Labs</span>
            <span className="brand-anchor__mode">Root · knowledge environment</span>
          </span>
        </button>

        <nav className="primary-nav" aria-label="Primary regions">
          {rootBranches.map((branch, index) => {
            const active = breadcrumbs.some((node) => node.id === branch.id) || focusNode.id === branch.id;
            return (
              <button
                key={branch.id}
                className={active ? "is-active" : ""}
                onClick={() => onNavigate(branch.id)}
                aria-current={active ? "page" : undefined}
                title={`Enter ${branch.label}`}
              >
                <span className="primary-nav__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="primary-nav__label">{branch.label}</span>
                <span className="primary-nav__signal" aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        <div className="frame-tools" aria-label="Global controls">
          <button className="frame-tool frame-tool--back" onClick={onBack} aria-label="Back" title="Back through traversal history">
            <FrameIcon name="back" />
            <span className="frame-tool__label">Back</span>
          </button>
          <button className="frame-tool" onClick={onSearch} aria-label="Search" title="Search the lab">
            <FrameIcon name="search" />
            <span className="frame-tool__label">Search</span>
          </button>
          <div className="frame-zoom" aria-label="Gestalt whole controls">
            <span className="frame-zoom__label" aria-hidden="true">
              <span>Whole</span>
              <strong>Gestalt</strong>
            </span>
            <button
              className="frame-tool"
              onClick={onZoomOut}
              disabled={!canZoomOut}
              aria-label="Expand the gestalt whole"
              title="Expand the whole while preserving the current focus"
            >
              <FrameIcon name="minus" />
              <span className="frame-tool__label">Expand whole</span>
            </button>
            <button
              className="frame-tool"
              onClick={onZoomIn}
              disabled={!canZoomIn}
              aria-label="Narrow the gestalt whole"
              title="Narrow the whole toward the current focus"
            >
              <FrameIcon name="plus" />
              <span className="frame-tool__label">Narrow whole</span>
            </button>
          </div>
        </div>
      </header>

      <aside className="boundary-frame__left" aria-label="Current focus ancestry path">
        <div className="path-label">Focus path</div>
        <ol>
          {focusPath.map((node) => (
            <li key={node.id}>
              <span className="path-node__dot" aria-hidden="true" />
              <button
                onClick={() => onFocusPath(node.id)}
                title={`Move focus to ${node.label}; preserve the current whole when possible`}
              >
                <span className="path-node__label">{node.shortLabel ?? node.label}</span>
              </button>
            </li>
          ))}
          {showCurrentFocus ? (
            <li aria-current="page">
              <span className="path-node__dot" aria-hidden="true" />
              <span className="path-node__current">
                <span className="path-node__label">{focusNode.shortLabel ?? focusNode.label}</span>
              </span>
            </li>
          ) : null}
        </ol>
      </aside>

      <footer className="boundary-frame__bottom">
        <span className="frame-status frame-status--focus">
          <strong>Focus</strong>
          <span className="frame-status__value">{focusNode.shortLabel ?? focusNode.label}</span>
        </span>
        <span className="frame-status frame-status--gestalt">
          <strong>Whole</strong>
          <span className="frame-status__value">{gestaltNode.shortLabel ?? gestaltNode.label}</span>
        </span>
        {onProjectionChange ? (
          <div className="projection-switcher" aria-label="View projection">
            <span className="projection-switcher__label">View</span>
            {projectionModes.map((mode) => (
              <button
                key={mode}
                onClick={() => onProjectionChange(mode)}
                aria-pressed={projection === mode}
                title={projectionDescriptions[mode]}
              >
                {projectionLabels[mode]}
              </button>
            ))}
          </div>
        ) : null}
      </footer>
    </div>
  );
}

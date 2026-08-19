"use client";

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
  breadcrumbs: ContentNode[];
  rootBranches: ContentNode[];
  siblings: ContentNode[];
  projection?: ProjectionMode;
  processScope: ProcessScope;
  canProcessZoomOut: boolean;
  canProcessZoomIn: boolean;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onFocusPath: (id: string) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
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
  breadcrumbs,
  rootBranches,
  siblings,
  projection = "world",
  processScope,
  canProcessZoomOut,
  canProcessZoomIn,
  onHome,
  onBack,
  onNavigate,
  onFocusPath,
  onProcessZoomOut,
  onProcessZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const focusPath = breadcrumbs.filter((node) => node.id !== "root");
  const showCurrentFocus = focusNode.id !== "root";
  const isRootFocus = focusNode.id === "root";
  const peerNodes = siblings.filter((node) => node.id !== focusNode.id);

  return (
    <div
      className={`boundary-frame ${isRootFocus ? "boundary-frame--root" : ""} ${visible ? "boundary-frame--visible" : ""}`}
    >
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

        {isRootFocus ? (
          <nav className="primary-nav" aria-label="Primary regions">
            {rootBranches.map((branch, index) => (
              <button key={branch.id} onClick={() => onNavigate(branch.id)} title={`Enter ${branch.label}`}>
                <span className="primary-nav__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="primary-nav__label">{branch.label}</span>
                <span className="primary-nav__signal" aria-hidden="true" />
              </button>
            ))}
          </nav>
        ) : null}

        <div className="frame-tools" aria-label="Global controls">
          <button className="frame-tool frame-tool--back" onClick={onBack} aria-label="Back" title="Back through traversal history">
            <FrameIcon name="back" />
            <span className="frame-tool__label">Back</span>
          </button>
          <button className="frame-tool" onClick={onSearch} aria-label="Search" title="Search the lab">
            <FrameIcon name="search" />
            <span className="frame-tool__label">Search</span>
          </button>
          {projection === "gestalt" ? (
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
                title="Widen the process context around the current focus"
              >
                <FrameIcon name="minus" />
                <span className="frame-tool__label">Widen process context</span>
              </button>
              <button
                className="frame-tool"
                onClick={onProcessZoomIn}
                disabled={!canProcessZoomIn}
                aria-label="Narrow Gestalt process context"
                title="Narrow the process context around the current focus"
              >
                <FrameIcon name="plus" />
                <span className="frame-tool__label">Narrow process context</span>
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <aside className="boundary-frame__left" aria-label="Current focus ancestry path">
        <div className="path-label">Focus path</div>
        <ol>
          {focusPath.map((node) => (
            <li key={node.id}>
              <span className="path-node__dot" aria-hidden="true" />
              <button onClick={() => onFocusPath(node.id)} title={`Move focus to ${node.label}`}>
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

      {peerNodes.length ? (
        <aside className="boundary-frame__right" aria-label={`Sibling navigation for ${focusNode.label}`}>
          <div className="peer-label">Peers</div>
          <ol>
            {peerNodes.map((peer, index) => (
              <li key={peer.id}>
                <button onClick={() => onNavigate(peer.id)} title={`Traverse to sibling ${peer.label}`}>
                  <span className="peer-node__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="peer-node__label">{peer.shortLabel ?? peer.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}

      <footer className="boundary-frame__bottom">
        <span className="frame-status frame-status--focus">
          <strong>Focus</strong>
          <span className="frame-status__value">{focusNode.shortLabel ?? focusNode.label}</span>
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

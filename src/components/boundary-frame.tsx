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
  traversalPath: ContentNode[];
  siblings: ContentNode[];
  projection?: ProjectionMode;
  processScope: ProcessScope;
  canProcessZoomOut: boolean;
  canProcessZoomIn: boolean;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onTraversalPath: (id: string, index: number) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
  onProjectionChange?: (projection: ProjectionMode) => void;
  onSearch: () => void;
};

type FrameIconName = "back" | "search" | "minus" | "plus";

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
  traversalPath,
  siblings,
  projection = "world",
  processScope,
  canProcessZoomOut,
  canProcessZoomIn,
  onHome,
  onBack,
  onNavigate,
  onTraversalPath,
  onProcessZoomOut,
  onProcessZoomIn,
  onProjectionChange,
  onSearch,
}: BoundaryFrameProps) {
  const priorTraversal = traversalPath.slice(0, -1);
  const isRootFocus = focusNode.id === "root";
  const showTraversalPath = !isRootFocus || traversalPath.length > 1;
  const peerNodes = siblings.filter((node) => node.id !== focusNode.id);

  return (
    <div
      className={`boundary-frame ${isRootFocus ? "boundary-frame--root" : ""} ${visible ? "boundary-frame--visible" : ""}`}
    >
      <header className="boundary-frame__top">
        <button className="brand-anchor" onClick={onHome} aria-label="Boundary First Labs home">
          <span className="brand-anchor__mark" aria-hidden="true">BF</span>
          <span className="brand-anchor__copy">
            <span className="brand-anchor__name">Boundary First Labs</span>
          </span>
        </button>

        <div className="frame-tools" aria-label="Global controls">
          <button className="frame-tool" onClick={onSearch} aria-label="Search" title="Search the lab">
            <FrameIcon name="search" />
            <span className="frame-tool__label">Search</span>
          </button>
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

      {showTraversalPath ? (
        <aside className="boundary-frame__left" aria-label="Focus traversal history">
          <div className="path-label">Focus path</div>
          <ol>
            {priorTraversal.map((node, index) => (
              <li key={`${node.id}-${index}`} data-history-step={index + 1}>
                <span className="path-node__dot" aria-hidden="true" />
                <button
                  onClick={() => onTraversalPath(node.id, index)}
                  title={`Return to traversal step ${index + 1}: ${node.label}`}
                >
                  <span className="path-node__step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="path-node__label">{node.shortLabel ?? node.label}</span>
                </button>
              </li>
            ))}
            <li aria-current="page" data-history-step={traversalPath.length}>
              <span className="path-node__dot" aria-hidden="true" />
              <span className="path-node__current">
                <small className="path-node__role">Step {String(traversalPath.length).padStart(2, "0")} · Focus</small>
                <span className="path-node__label">{focusNode.shortLabel ?? focusNode.label}</span>
              </span>
            </li>
          </ol>
        </aside>
      ) : null}

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
        <button
          className="frame-tool frame-tool--back frame-tool--footer-back"
          onClick={onBack}
          aria-label="Back"
          title="Back through browser navigation history"
        >
          <FrameIcon name="back" />
          <span className="frame-tool__label">Back</span>
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
      </footer>
    </div>
  );
}

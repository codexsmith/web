"use client";

import { ContentNode } from "@/lib/content";

type BoundaryFrameProps = {
  visible: boolean;
  focusNode: ContentNode;
  gestaltNode: ContentNode;
  breadcrumbs: ContentNode[];
  rootBranches: ContentNode[];
  canZoomOut: boolean;
  canZoomIn: boolean;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onSearch: () => void;
};

export function BoundaryFrame({
  visible,
  focusNode,
  gestaltNode,
  breadcrumbs,
  rootBranches,
  canZoomOut,
  canZoomIn,
  onHome,
  onBack,
  onNavigate,
  onZoomOut,
  onZoomIn,
  onSearch,
}: BoundaryFrameProps) {
  return (
    <div className={`boundary-frame ${visible ? "boundary-frame--visible" : ""}`}>
      <header className="boundary-frame__top">
        <button className="brand-anchor" onClick={onHome} aria-label="Boundary First Labs home">
          <span className="brand-anchor__mark" aria-hidden="true">
            BF
          </span>
          <span className="brand-anchor__name">Boundary First Labs</span>
        </button>

        <nav className="primary-nav" aria-label="Primary navigation">
          {rootBranches.map((branch) => {
            const active = breadcrumbs.some((node) => node.id === branch.id) || focusNode.id === branch.id;
            return (
              <button
                key={branch.id}
                className={active ? "is-active" : ""}
                onClick={() => onNavigate(branch.id)}
              >
                {branch.label}
              </button>
            );
          })}
        </nav>

        <div className="frame-tools" aria-label="Global controls">
          <button onClick={onBack} aria-label="Back" title="Back">
            Back
          </button>
          <button onClick={onSearch} aria-label="Search" title="Search">
            Search
          </button>
          <span className="tool-divider" aria-hidden="true" />
          <button onClick={onZoomOut} disabled={!canZoomOut} aria-label="Zoom out gestalt" title="Zoom out gestalt">
            -
          </button>
          <button onClick={onZoomIn} disabled={!canZoomIn} aria-label="Zoom in gestalt" title="Zoom in gestalt">
            +
          </button>
        </div>
      </header>

      <aside className="boundary-frame__left" aria-label="Current path">
        <div className="path-label">Path</div>
        <ol>
          {breadcrumbs.map((node) => (
            <li key={node.id}>
              <button onClick={() => onNavigate(node.id)}>{node.shortLabel ?? node.label}</button>
            </li>
          ))}
          <li aria-current="page">{focusNode.shortLabel ?? focusNode.label}</li>
        </ol>
      </aside>

      <footer className="boundary-frame__bottom">
        <span>
          <strong>Focus</strong> {focusNode.shortLabel ?? focusNode.label}
        </span>
        <span>
          <strong>Gestalt</strong> {gestaltNode.shortLabel ?? gestaltNode.label}
        </span>
        <span className="boundary-frame__hint">Click traverses. Zoom changes the whole.</span>
      </footer>
    </div>
  );
}

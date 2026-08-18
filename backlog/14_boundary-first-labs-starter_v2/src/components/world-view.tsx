"use client";

import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getImmediateChildTowardFocus,
  getParent,
  getSiblings,
} from "@/lib/content";

export type TransitionDirection =
  | "none"
  | "up"
  | "down"
  | "left"
  | "right"
  | "cross"
  | "zoom-in"
  | "zoom-out";

type WorldViewProps = {
  gestaltNode: ContentNode;
  focusNode: ContentNode;
  transitionDirection: TransitionDirection;
  transitionKey: number;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

export function WorldView({
  gestaltNode,
  focusNode,
  transitionDirection,
  transitionKey,
  onNavigate,
  onInspect,
}: WorldViewProps) {
  const children = getChildren(gestaltNode.id);
  const parent = getParent(gestaltNode.id);
  const focusRegion = getImmediateChildTowardFocus(gestaltNode.id, focusNode.id);
  const isLeaf = children.length === 0;

  return (
    <main
      key={`${gestaltNode.id}-${transitionKey}`}
      className={`world-viewport world-transition world-transition--${transitionDirection}`}
    >
      {parent ? (
        <button className="direction-control direction-control--up" onClick={() => onNavigate(parent.id, "up")}>
          <span aria-hidden="true">^</span>
          <small>{parent.shortLabel ?? parent.label}</small>
        </button>
      ) : null}

      {isLeaf ? (
        <NodeDetail node={gestaltNode} onNavigate={onNavigate} onInspect={onInspect} />
      ) : (
        <BranchWorld
          gestaltNode={gestaltNode}
          focusNode={focusNode}
          focusRegion={focusRegion}
          children={children}
          onNavigate={onNavigate}
        />
      )}
    </main>
  );
}

type BranchWorldProps = {
  gestaltNode: ContentNode;
  focusNode: ContentNode;
  focusRegion?: ContentNode;
  children: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
};

function BranchWorld({
  gestaltNode,
  focusNode,
  focusRegion,
  children,
  onNavigate,
}: BranchWorldProps) {
  const focusedBelow = focusNode.id !== gestaltNode.id;

  return (
    <section className={`branch-world branch-world--${gestaltNode.kind}`}>
      <header className="world-heading">
        <p className="eyebrow">{gestaltNode.eyebrow}</p>
        <h1>{gestaltNode.label}</h1>
        <p>{gestaltNode.summary}</p>
        {focusedBelow ? (
          <div className="focus-trace">
            <span>Focal object</span>
            <strong>{focusNode.label}</strong>
          </div>
        ) : null}
      </header>

      <div className={`district-grid district-grid--${Math.min(children.length, 6)}`}>
        {children.map((child, index) => {
          const isFocusRegion = focusRegion?.id === child.id || focusNode.id === child.id;
          return (
            <button
              key={child.id}
              className={`district-card ${isFocusRegion ? "district-card--focused" : ""}`}
              data-kind={child.kind}
              onClick={() => onNavigate(child.id, "down")}
            >
              <span className="district-card__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="district-card__kind">{child.eyebrow}</span>
              <strong>{child.label}</strong>
              <p>{child.summary}</p>
              <span className="district-card__action">Enter</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

type NodeDetailProps = {
  node: ContentNode;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

function NodeDetail({ node, onNavigate, onInspect }: NodeDetailProps) {
  const siblings = getSiblings(node.id);
  const siblingIndex = siblings.findIndex((sibling) => sibling.id === node.id);
  const previous = siblingIndex > 0 ? siblings[siblingIndex - 1] : undefined;
  const next = siblingIndex >= 0 && siblingIndex < siblings.length - 1 ? siblings[siblingIndex + 1] : undefined;
  const crossEdges = getCrossEdges(node.id);

  return (
    <section className="node-detail">
      {previous ? (
        <button
          className="direction-control direction-control--left"
          onClick={() => onNavigate(previous.id, "left")}
        >
          <span aria-hidden="true">&lt;</span>
          <small>{previous.shortLabel ?? previous.label}</small>
        </button>
      ) : null}

      {next ? (
        <button
          className="direction-control direction-control--right"
          onClick={() => onNavigate(next.id, "right")}
        >
          <small>{next.shortLabel ?? next.label}</small>
          <span aria-hidden="true">&gt;</span>
        </button>
      ) : null}

      <article className="node-surface">
        <header>
          <p className="eyebrow">{node.eyebrow}</p>
          <h1>{node.label}</h1>
          <p className="node-surface__summary">{node.summary}</p>
        </header>

        {node.body?.length ? (
          <div className="node-surface__body">
            {node.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="node-surface__body node-surface__body--placeholder">
            <p>
              This starter node is structurally complete and ready for production copy, evidence, diagrams,
              sources, and executable examples.
            </p>
          </div>
        )}

        {node.inspection?.length ? (
          <section className="node-section">
            <div className="node-section__label">Inspect through this node</div>
            <div className="inspection-links">
              {node.inspection.map((inspection) => (
                <button key={inspection.id} onClick={() => onInspect(inspection.id)}>
                  <span>Through</span>
                  <strong>{inspection.label}</strong>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {crossEdges.length ? (
          <section className="node-section">
            <div className="node-section__label">Typed connections</div>
            <div className="edge-links">
              {crossEdges.map((edge) => (
                <button key={`${edge.from}-${edge.to}-${edge.type}`} onClick={() => onNavigate(edge.node.id, "cross")}>
                  <span>{edge.label}</span>
                  <strong>{edge.node.label}</strong>
                  <small>{edge.type}</small>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </section>
  );
}

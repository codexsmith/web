"use client";

import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getImmediateChildTowardFocus,
  getParent,
  getSiblings,
} from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";

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
  const renderedGestaltNode = hydrateContentNode(gestaltNode);
  const renderedFocusNode = hydrateContentNode(focusNode);
  const children = getChildren(gestaltNode.id).map(hydrateContentNode);
  const parent = getParent(gestaltNode.id);
  const focusRegion = getImmediateChildTowardFocus(gestaltNode.id, focusNode.id);
  const isLeaf = children.length === 0;

  return (
    <main
      key={`${gestaltNode.id}-${transitionKey}`}
      className={`world-viewport world-transition world-transition--${transitionDirection}`}
    >
      {parent ? (
        <button
          className="direction-control direction-control--up"
          onClick={() => onNavigate(parent.id, "up")}
          title={`Up to ${parent.label}`}
        >
          <span aria-hidden="true">^</span>
          <small>{parent.shortLabel ?? parent.label}</small>
        </button>
      ) : null}

      {isLeaf ? (
        <NodeDetail node={renderedGestaltNode} onNavigate={onNavigate} onInspect={onInspect} />
      ) : (
        <BranchWorld
          gestaltNode={renderedGestaltNode}
          focusNode={renderedFocusNode}
          focusRegion={focusRegion}
          children={children}
          onNavigate={onNavigate}
          onInspect={onInspect}
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
  onInspect: (inspectionId: string) => void;
};

function BranchWorld({
  gestaltNode,
  focusNode,
  focusRegion,
  children,
  onNavigate,
  onInspect,
}: BranchWorldProps) {
  const focusedBelow = focusNode.id !== gestaltNode.id;
  const showGestaltContext = !focusedBelow;
  const inspections = gestaltNode.inspection ?? [];
  const exploratoryInspections = inspections.filter((inspection) =>
    inspection.id.startsWith("exploratory-"),
  );
  const supportingInspections = inspections.filter(
    (inspection) => !inspection.id.startsWith("exploratory-"),
  );

  return (
    <section className={`branch-world branch-world--${gestaltNode.kind}`} data-kind={gestaltNode.kind}>
      <header className="world-heading">
        <p className="eyebrow">{gestaltNode.eyebrow}</p>
        <h1>{gestaltNode.label}</h1>
        <p>{gestaltNode.summary}</p>
        {gestaltNode.body?.length ? <p className="world-heading__context">{gestaltNode.body[0]}</p> : null}
        {focusedBelow ? (
          <div className="focus-trace">
            <span>Focal object</span>
            <strong>{focusNode.label}</strong>
          </div>
        ) : null}
      </header>

      <div className={`district-grid district-grid--${Math.min(children.length, 6)}`} aria-label={`${gestaltNode.label} regions`}>
        {children.map((child, index) => {
          const isFocusRegion = focusRegion?.id === child.id || focusNode.id === child.id;
          return (
            <button
              key={child.id}
              className={`district-card ${isFocusRegion ? "district-card--focused" : ""}`}
              data-kind={child.kind}
              onClick={() => onNavigate(child.id, "down")}
              aria-current={isFocusRegion ? "location" : undefined}
              title={`Enter ${child.label}`}
            >
              <span className="district-card__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="district-card__kind">{child.eyebrow}</span>
              {child.status ? (
                <span className="work-status-chip" data-stage={child.status.stage}>
                  {child.status.label}
                </span>
              ) : null}
              <strong>{child.label}</strong>
              <p>{child.summary}</p>
              <span className="district-card__action">Enter region</span>
            </button>
          );
        })}
      </div>

      {showGestaltContext && gestaltNode.links?.length ? (
        <section className="node-section branch-world__context-section node-section--records">
          <div className="node-section__label">Connected operative surfaces</div>
          <div className="record-links">
            {gestaltNode.links.map((link) => (
              <a href={link.href} key={`${gestaltNode.id}-${link.href}`}>
                <span>{link.eyebrow ?? "Related surface"}</span>
                <strong>{link.label}</strong>
                {link.summary ? <small>{link.summary}</small> : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {showGestaltContext && supportingInspections.length ? (
        <section className="node-section branch-world__context-section node-section--inspection">
          <div className="node-section__label">Supporting research</div>
          <div className="inspection-links">
            {supportingInspections.map((inspection) => (
              <button
                key={inspection.id}
                onClick={() => onInspect(inspection.id)}
                title={`Inspect ${inspection.label} without leaving ${gestaltNode.label}`}
              >
                <span>Through</span>
                <strong>{inspection.label}</strong>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {showGestaltContext && exploratoryInspections.length ? (
        <section className="node-section branch-world__context-section branch-world__exploratory-section node-section--inspection">
          <div className="node-section__label">Exploratory Research</div>
          <p className="branch-world__section-intro">
            Reformulation is a research instrument, not a solution claim. Solved targets calibrate the
            representation; open problems remain reformulations, proof obligations, derivation audits, or
            experiments until their native validation gates are met.
          </p>
          <div className="inspection-links">
            {exploratoryInspections.map((inspection) => (
              <button
                key={inspection.id}
                onClick={() => onInspect(inspection.id)}
                title={`Explore ${inspection.label} without changing location`}
              >
                <span>Explore</span>
                <strong>{inspection.label}</strong>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

type NodeDetailProps = {
  node: ContentNode;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

function NodeDetail({ node, onNavigate, onInspect }: NodeDetailProps) {
  const siblings = getSiblings(node.id).map(hydrateContentNode);
  const siblingIndex = siblings.findIndex((sibling) => sibling.id === node.id);
  const previous = siblingIndex > 0 ? siblings[siblingIndex - 1] : undefined;
  const next = siblingIndex >= 0 && siblingIndex < siblings.length - 1 ? siblings[siblingIndex + 1] : undefined;
  const crossEdges = getCrossEdges(node.id).map((edge) => ({ ...edge, node: hydrateContentNode(edge.node) }));

  return (
    <section className="node-detail">
      {previous ? (
        <button
          className="direction-control direction-control--left"
          onClick={() => onNavigate(previous.id, "left")}
          title={`Previous sibling: ${previous.label}`}
        >
          <span aria-hidden="true">&lt;</span>
          <small>{previous.shortLabel ?? previous.label}</small>
        </button>
      ) : null}

      {next ? (
        <button
          className="direction-control direction-control--right"
          onClick={() => onNavigate(next.id, "right")}
          title={`Next sibling: ${next.label}`}
        >
          <small>{next.shortLabel ?? next.label}</small>
          <span aria-hidden="true">&gt;</span>
        </button>
      ) : null}

      <article className="node-surface" data-kind={node.kind}>
        <header>
          <p className="eyebrow">{node.eyebrow}</p>
          <h1>{node.label}</h1>
          <p className="node-surface__summary">{node.summary}</p>
        </header>

        {node.status ? (
          <aside className="work-status-panel" data-stage={node.status.stage}>
            <div className="work-status-panel__heading">
              <span>Current standing</span>
              <strong>{node.status.label}</strong>
            </div>
            <p>{node.status.detail}</p>
            {node.status.sourceStatus || node.status.provenance ? (
              <div className="work-status-panel__provenance">
                {node.status.sourceStatus ? <span>Source status: {node.status.sourceStatus}</span> : null}
                {node.status.provenance ? <span>Provenance: {node.status.provenance}</span> : null}
              </div>
            ) : null}
          </aside>
        ) : null}

        {node.body?.length ? (
          <div className="node-surface__body">
            {node.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="node-surface__body node-surface__body--placeholder">
            <p>
              This node is intentionally concise. Follow its typed connections or retained records for deeper
              evidence, implementation detail, and provenance.
            </p>
          </div>
        )}

        {node.links?.length ? (
          <section className="node-section node-section--records">
            <div className="node-section__label">Open retained record</div>
            <div className="record-links">
              {node.links.map((link) => (
                <a href={link.href} key={`${node.id}-${link.href}`}>
                  <span>{link.eyebrow ?? "Related record"}</span>
                  <strong>{link.label}</strong>
                  {link.summary ? <small>{link.summary}</small> : null}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {node.inspection?.length ? (
          <section className="node-section node-section--inspection">
            <div className="node-section__label">Inspect through this node</div>
            <div className="inspection-links">
              {node.inspection.map((inspection) => (
                <button
                  key={inspection.id}
                  onClick={() => onInspect(inspection.id)}
                  title={`Inspect ${inspection.label} without leaving ${node.label}`}
                >
                  <span>Through</span>
                  <strong>{inspection.label}</strong>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {crossEdges.length ? (
          <section className="node-section node-section--edges">
            <div className="node-section__label">Typed connections</div>
            <div className="edge-links">
              {crossEdges.map((edge) => (
                <button
                  key={`${edge.from}-${edge.to}-${edge.type}`}
                  data-edge-type={edge.type}
                  onClick={() => onNavigate(edge.node.id, "cross")}
                  title={`${edge.label}: ${edge.node.label}`}
                >
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

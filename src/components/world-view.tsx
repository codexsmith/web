"use client";

import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getParent,
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
  node: ContentNode;
  transitionDirection: TransitionDirection;
  transitionKey: number;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

export function WorldView({
  node,
  transitionDirection,
  transitionKey,
  onNavigate,
  onInspect,
}: WorldViewProps) {
  const renderedNode = hydrateContentNode(node);
  const regions = getChildren(node.id).map(hydrateContentNode);
  const isLeaf = regions.length === 0;

  return (
    <main
      key={`world-${node.id}-${transitionKey}`}
      className={`world-viewport world-transition world-transition--${transitionDirection}`}
    >
      {isLeaf ? (
        <LeafWorld node={renderedNode} onNavigate={onNavigate} />
      ) : (
        <BranchWorld node={renderedNode} regions={regions} onNavigate={onNavigate} onInspect={onInspect} />
      )}
    </main>
  );
}

type RecordViewProps = {
  focusNode: ContentNode;
  transitionDirection: TransitionDirection;
  transitionKey: number;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

export function RecordView({
  focusNode,
  transitionDirection,
  transitionKey,
  onNavigate,
  onInspect,
}: RecordViewProps) {
  const renderedFocusNode = hydrateContentNode(focusNode);

  return (
    <main
      key={`record-${focusNode.id}-${transitionKey}`}
      className={`world-viewport world-transition world-transition--${transitionDirection}`}
    >
      <NodeDetail node={renderedFocusNode} onNavigate={onNavigate} onInspect={onInspect} />
    </main>
  );
}

type LeafWorldProps = {
  node: ContentNode;
  onNavigate: (id: string, direction?: TransitionDirection) => void;
};

function LeafWorld({ node, onNavigate }: LeafWorldProps) {
  const parent = getParent(node.id);
  const renderedParent = parent ? hydrateContentNode(parent) : undefined;
  const relations = getCrossEdges(node.id).map((edge) => ({
    ...edge,
    node: hydrateContentNode(edge.node),
    direction: edge.from === node.id ? "outgoing" as const : "incoming" as const,
  }));

  return (
    <section className="leaf-world" data-node-id={node.id} data-kind={node.kind}>
      <header className="world-heading">
        <p className="eyebrow">World projection · local boundary</p>
        <h1>{node.label}</h1>
        <p>{node.summary}</p>
      </header>

      <div className="leaf-world__field">
        <article className="leaf-world__focus" data-node-id={node.id}>
          <small>{node.eyebrow}</small>
          <strong>{node.label}</strong>
          <p>{node.summary}</p>
        </article>

        <div className="leaf-world__ports" aria-label={`Boundary ports for ${node.label}`}>
          {renderedParent ? (
            <button
              className="leaf-world__port"
              onClick={() => onNavigate(renderedParent.id, "up")}
              title={`Traverse containment to ${renderedParent.label}`}
            >
              <span>Contained by</span>
              <strong>{renderedParent.label}</strong>
              <small>parent boundary</small>
            </button>
          ) : null}

          {relations.map((relation) => (
            <button
              className="leaf-world__port"
              key={`${relation.from}-${relation.to}-${relation.type}`}
              onClick={() => onNavigate(relation.node.id, "cross")}
              data-edge-type={relation.type}
              title={`${relation.label}: ${relation.node.label}`}
            >
              <span>{relation.direction === "outgoing" ? relation.label : `incoming · ${relation.label}`}</span>
              <strong>{relation.node.label}</strong>
              <small>{relation.type}</small>
            </button>
          ))}

          {!renderedParent && !relations.length ? (
            <p className="leaf-world__empty">
              No containment or typed cross-tree relation is declared for this object at the current public boundary.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type BranchWorldProps = {
  node: ContentNode;
  regions: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

function BranchWorld({ node, regions, onNavigate, onInspect }: BranchWorldProps) {
  const inspections = node.inspection ?? [];
  const exploratoryInspections = inspections.filter((inspection) => inspection.id.startsWith("exploratory-"));
  const supportingInspections = inspections.filter((inspection) => !inspection.id.startsWith("exploratory-"));
  const isRoot = node.id === "root";

  return (
    <section
      className={`branch-world branch-world--${node.kind} ${isRoot ? "branch-world--root-world" : ""}`}
      data-kind={node.kind}
      data-world-id={node.id}
      data-gestalt-id={node.id}
    >
      <header className="world-heading">
        <p className="eyebrow">{isRoot ? "Root World · operating environment" : node.eyebrow}</p>
        <h1>{node.label}</h1>
        <p>{node.summary}</p>
        {node.body?.[0] ? <p className="world-heading__context">{node.body[0]}</p> : null}
      </header>

      <div className={`district-grid district-grid--${Math.min(regions.length, 6)}`} aria-label={`${node.label} regions`}>
        {regions.map((child, index) => (
          <button
            key={child.id}
            className="district-card"
            data-kind={child.kind}
            data-node-id={child.id}
            onClick={() => onNavigate(child.id, "down")}
            title={`Enter ${child.label}`}
          >
            <span className="district-card__number">{String(index + 1).padStart(2, "0")}</span>
            <span className="district-card__kind">{child.eyebrow}</span>
            {child.status ? (
              <span className="work-status-chip" data-stage={child.status.stage}>{child.status.label}</span>
            ) : null}
            <strong>{child.label}</strong>
            <p>{child.summary}</p>
            <span className="district-card__action">Enter region</span>
          </button>
        ))}
      </div>

      {node.links?.length ? (
        <section className="node-section branch-world__context-section node-section--records">
          <div className="node-section__label">Connected operative surfaces</div>
          <div className="record-links">
            {node.links.map((link) => (
              <a href={link.href} key={`${node.id}-${link.href}`}>
                <span>{link.eyebrow ?? "Related surface"}</span>
                <strong>{link.label}</strong>
                {link.summary ? <small>{link.summary}</small> : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {supportingInspections.length ? (
        <section className="node-section branch-world__context-section node-section--inspection">
          <div className="node-section__label">Supporting research</div>
          <div className="inspection-links">
            {supportingInspections.map((inspection) => (
              <button key={inspection.id} onClick={() => onInspect(inspection.id)} title={`Inspect ${inspection.label}`}>
                <span>Through</span>
                <strong>{inspection.label}</strong>
                <small>{inspection.summary}</small>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {exploratoryInspections.length ? (
        <section className="node-section branch-world__context-section branch-world__exploratory-section node-section--inspection">
          <div className="node-section__label">Exploratory Research</div>
          <p className="branch-world__section-intro">
            Reformulation is a research instrument, not a solution claim. Solved targets calibrate the representation;
            open problems remain reformulations, proof obligations, derivation audits, or experiments until their native
            validation gates are met.
          </p>
          <div className="inspection-links">
            {exploratoryInspections.map((inspection) => (
              <button key={inspection.id} onClick={() => onInspect(inspection.id)} title={`Explore ${inspection.label}`}>
                <span>Explore</span>
                <strong>{inspection.label}</strong>
                <small>{inspection.summary}</small>
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
  const regions = getChildren(node.id).map(hydrateContentNode);
  const crossEdges = getCrossEdges(node.id).map((edge) => ({ ...edge, node: hydrateContentNode(edge.node) }));

  return (
    <section className="node-detail">
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
            {node.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ) : (
          <div className="node-surface__body node-surface__body--placeholder">
            <p>
              This public record is intentionally concise. Its contained regions, evidence, retained records, and typed
              relationships remain available below rather than being hidden in another view.
            </p>
          </div>
        )}

        {regions.length ? (
          <section className="node-section node-section--children">
            <div className="node-section__label">Contained regions</div>
            <div className="contained-region-links">
              {regions.map((child) => (
                <button key={child.id} onClick={() => onNavigate(child.id, "down")} title={`Open ${child.label}`}>
                  <span>{child.eyebrow}</span>
                  <strong>{child.label}</strong>
                  <small>{child.summary}</small>
                </button>
              ))}
            </div>
          </section>
        ) : null}

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
                <button key={inspection.id} onClick={() => onInspect(inspection.id)} title={`Inspect ${inspection.label}`}>
                  <span>Through</span>
                  <strong>{inspection.label}</strong>
                  <small>{inspection.summary}</small>
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

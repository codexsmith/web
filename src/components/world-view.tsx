"use client";

import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getParent,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { SubjectPane } from "@/components/subject-pane";

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
        <LeafWorld node={renderedNode} onNavigate={onNavigate} onInspect={onInspect} />
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
  onInspect: (inspectionId: string) => void;
};

function LeafWorld({ node, onNavigate, onInspect }: LeafWorldProps) {
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
        <p className="eyebrow">{node.eyebrow}</p>
        <h1>{node.label}</h1>
        <p>{node.summary}</p>
      </header>

      <div className="leaf-world__field">
        <SubjectPane
          node={node}
          onInspect={onInspect}
          onNavigate={(targetId) => onNavigate(targetId, "cross")}
        />

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

const rootRegionOrder = ["public-interest", "products", "publications", "about", "research"];

function BranchWorld({ node, regions, onNavigate, onInspect }: BranchWorldProps) {
  const isRoot = node.id === "root";
  const displayedRegions = isRoot
    ? [...regions].sort((a, b) => {
        const aIndex = rootRegionOrder.indexOf(a.id);
        const bIndex = rootRegionOrder.indexOf(b.id);
        const aOrder = aIndex === -1 ? rootRegionOrder.length : aIndex;
        const bOrder = bIndex === -1 ? rootRegionOrder.length : bIndex;
        return aOrder - bOrder;
      })
    : regions;

  return (
    <section
      className={`branch-world branch-world--${node.kind} ${isRoot ? "branch-world--root-world" : ""}`}
      data-kind={node.kind}
      data-world-id={node.id}
      data-gestalt-id={node.id}
    >
      <header className="world-heading">
        {!isRoot ? <p className="eyebrow">{node.eyebrow}</p> : null}
        <h1>{node.label}</h1>
        <p>{node.summary}</p>
      </header>

      {!isRoot ? (
        <SubjectPane
          node={node}
          onInspect={onInspect}
          onNavigate={(targetId) => onNavigate(targetId, "cross")}
        />
      ) : null}

      <div className={`district-grid district-grid--${Math.min(displayedRegions.length, 6)}`} aria-label={`${node.label} regions`}>
        {displayedRegions.map((child, index) => (
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
            {child.publication ? (
              <span className="work-status-chip publication-status-chip" data-stage={child.publication.stage}>
                {child.publication.label}
              </span>
            ) : child.status ? (
              <span className="work-status-chip" data-stage={child.status.stage}>{child.status.label}</span>
            ) : null}
            <strong>{child.label}</strong>
            <p>{child.summary}</p>
            <span className="district-card__action">Enter region</span>
          </button>
        ))}
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

        {node.publication ? (
          <aside className="publication-status-panel" data-stage={node.publication.stage}>
            <div className="publication-status-panel__heading">
              <span>Publication development</span>
              <strong>{node.publication.label}</strong>
            </div>
            <p>
              Manuscript maturity is tracked independently from the validation standing of the underlying research,
              method, product, or institutional claim.
            </p>
            <dl>
              <div>
                <dt>Document class</dt>
                <dd>{node.publication.documentClass}</dd>
              </div>
              <div>
                <dt>Claim maturity</dt>
                <dd>{node.publication.claimMaturity}</dd>
              </div>
              <div>
                <dt>Audience</dt>
                <dd>{node.publication.audience}</dd>
              </div>
              {node.publication.version ? (
                <div>
                  <dt>Version</dt>
                  <dd>{node.publication.version}</dd>
                </div>
              ) : null}
              <div className="publication-status-panel__gate">
                <dt>Next gate</dt>
                <dd>{node.publication.nextGate}</dd>
              </div>
              <div className="publication-status-panel__source">
                <dt>Source</dt>
                <dd>{node.publication.sourceRef}</dd>
              </div>
            </dl>
          </aside>
        ) : node.status ? (
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
              relationships remain available below.
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
                  {child.publication ? <em>{child.publication.label}</em> : null}
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

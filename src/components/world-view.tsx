"use client";

import Link from "next/link";
import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getParent,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { founderProfile, founderRecordSections } from "@/lib/founder-content";
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
      {renderedNode.id === "public-interest" ? (
        <PublicInterestWorld node={renderedNode} regions={regions} onNavigate={onNavigate} />
      ) : isLeaf ? (
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
      {focusNode.id === "root" ? (
        <FounderRecord />
      ) : (
        <NodeDetail node={renderedFocusNode} onNavigate={onNavigate} onInspect={onInspect} />
      )}
    </main>
  );
}

function FounderRecord() {
  return (
    <section className="node-detail founder-record">
      <article className="node-surface founder-record__surface" data-kind="about">
        <header>
          <p className="eyebrow">Founder record</p>
          <h1>{founderProfile.name}</h1>
          <p className="node-surface__summary">{founderProfile.summary}</p>
        </header>

        <div className="node-surface__body">
          <p>
            <strong>{founderProfile.role}.</strong> {founderProfile.currentPhase}
          </p>
        </div>

        {founderRecordSections.map((section) => (
          <section className="node-section" key={section.label}>
            <div className="node-section__label">{section.label}</div>
            <div className="node-surface__body">
              <p>{section.body}</p>
            </div>
          </section>
        ))}

        <section className="node-section node-section--records">
          <div className="node-section__label">Institutional context</div>
          <div className="record-links">
            <Link href="/about/provenance">
              <span>Origin and lineage</span>
              <strong>Provenance</strong>
              <small>How founder history, work substance, and institutional stewardship are kept distinct.</small>
            </Link>
            <Link href="/about/the-lab">
              <span>Present institution</span>
              <strong>The Lab</strong>
              <small>Current institutional responsibilities, founder concentration risk, and the path toward durable stewardship.</small>
            </Link>
          </div>
        </section>
      </article>
    </section>
  );
}

type PublicInterestWorldProps = {
  node: ContentNode;
  regions: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
};

function PublicInterestWorld({ node, regions, onNavigate }: PublicInterestWorldProps) {
  const mission = regions.find((region) => region.id === "public-mission");
  const principles = regions.find((region) => region.id === "public-principles");
  const aspirations = regions.find((region) => region.id === "public-aspirations");
  const augusta = regions.find((region) => region.id === "augusta-civic");
  const heroRegions = [mission, principles, aspirations].filter((region): region is ContentNode => Boolean(region));

  return (
    <section className="public-interest-world" data-world-id={node.id}>
      <section
        id="public-interest-overview"
        className="public-interest-page public-interest-page--overview"
        data-page-section="overview"
        aria-label="Public Interest overview"
      >
        <header className="public-interest-hero__intro">
          <p className="eyebrow">{node.eyebrow}</p>
          <div className="public-interest-hero__title-row">
            <h1>{node.label}</h1>
            <p>{node.summary}</p>
          </div>
        </header>

        <div className="public-interest-hero__panels" aria-label="Public Interest orientation">
          <article className="public-interest-panel public-interest-panel--glance">
            <span className="public-interest-panel__kind">At a glance</span>
            <strong>Public purpose is part of the engineering boundary.</strong>
            <p>{node.body?.[0] ?? node.summary}</p>
          </article>

          {heroRegions.map((region) => (
            <button
              key={region.id}
              className="public-interest-panel public-interest-panel--link"
              onClick={() => onNavigate(region.id, "down")}
              title={`Open ${region.label}`}
            >
              <span className="public-interest-panel__kind">{region.eyebrow}</span>
              <strong>{region.label}</strong>
              <p>{region.summary}</p>
              <span className="public-interest-panel__action">Open</span>
            </button>
          ))}
        </div>
      </section>

      {augusta ? (
        <section
          id="public-interest-augusta"
          className="public-interest-page public-interest-page--augusta"
          data-page-section="augusta"
          aria-label="Augusta Civic Infrastructure"
        >
          <article className="public-interest-feature">
            <header className="public-interest-feature__header">
              <div>
                <p className="eyebrow">{augusta.eyebrow}</p>
                <h2>{augusta.label}</h2>
              </div>
              {augusta.status ? (
                <span className="work-status-chip" data-stage={augusta.status.stage}>{augusta.status.label}</span>
              ) : null}
            </header>

            <p className="public-interest-feature__deck">{augusta.summary}</p>

            {augusta.body?.length ? (
              <div className="public-interest-feature__body">
                {augusta.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : null}

            <footer className="public-interest-feature__footer">
              <span>Local civic infrastructure · source-grounded · correctable</span>
              <button onClick={() => onNavigate(augusta.id, "down")}>Open project record</button>
            </footer>
          </article>
        </section>
      ) : null}
    </section>
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
        {isRoot ? <h1 className="sr-only">{node.label}</h1> : <h1>{node.label}</h1>}
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
              <div><dt>Document class</dt><dd>{node.publication.documentClass}</dd></div>
              <div><dt>Claim maturity</dt><dd>{node.publication.claimMaturity}</dd></div>
              <div><dt>Audience</dt><dd>{node.publication.audience}</dd></div>
              {node.publication.version ? <div><dt>Version</dt><dd>{node.publication.version}</dd></div> : null}
              <div className="publication-status-panel__gate"><dt>Next gate</dt><dd>{node.publication.nextGate}</dd></div>
              <div className="publication-status-panel__source"><dt>Source</dt><dd>{node.publication.sourceRef}</dd></div>
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

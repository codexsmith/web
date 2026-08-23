"use client";

import type { ReactNode } from "react";
import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getParent,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { getWorldOrientation } from "@/lib/world-orientation";
import { ActionCard, getSubjectActions, SubjectPane } from "@/components/subject-pane";

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
        <PublicInterestWorld
          node={renderedNode}
          regions={regions}
          onNavigate={onNavigate}
          onInspect={onInspect}
        />
      ) : isLeaf ? (
        <LeafWorld node={renderedNode} onNavigate={onNavigate} onInspect={onInspect} />
      ) : (
        <BranchWorld node={renderedNode} regions={regions} onNavigate={onNavigate} onInspect={onInspect} />
      )}
    </main>
  );
}

type WorldHeroProps = {
  node: ContentNode;
  hideTitle?: boolean;
  className?: string;
  titleAreaClassName?: string;
  eyebrow?: ReactNode;
  glance?: ReactNode;
};

function WorldHero({
  node,
  hideTitle = false,
  className,
  titleAreaClassName,
  eyebrow,
  glance,
}: WorldHeroProps) {
  return (
    <header className={["world-hero", className].filter(Boolean).join(" ")}>
      <div className={["world-hero__title-area", titleAreaClassName].filter(Boolean).join(" ")}>
        {eyebrow}
        <h1 className={hideTitle ? "sr-only" : undefined}>{node.label}</h1>
        <p>{node.summary}</p>
      </div>

      {glance}
    </header>
  );
}

type RegionGridProps = {
  node: ContentNode;
  regions: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  variant?: "district" | "orientation";
};

function RegionGrid({ node, regions, onNavigate, variant = "district" }: RegionGridProps) {
  const isOrientation = variant === "orientation";
  const isRoot = node.id === "root";
  const isTopLevelSection = node.parentId === "root";
  const usesBoundaryOrientation = isRoot || isTopLevelSection;

  return (
    <div
      className={[
        isOrientation
          ? "section-region-grid section-region-grid--orientation public-interest-hero__panels"
          : `section-region-grid district-grid district-grid--${Math.min(regions.length, 6)}`,
        isTopLevelSection ? "section-region-grid--concise" : "",
      ].filter(Boolean).join(" ")}
      aria-label={isOrientation ? `${node.label} orientation` : `${node.label} regions`}
    >
      {regions.map((child, index) => {
        const orientation = usesBoundaryOrientation ? getWorldOrientation(child.id) : undefined;

        return (
          <button
            key={child.id}
            className={isOrientation
              ? "section-region-card public-interest-panel public-interest-panel--link"
              : "section-region-card district-card"}
            data-kind={child.kind}
            data-node-id={child.id}
            data-orientation={orientation ? "boundary" : undefined}
            onClick={() => onNavigate(child.id, "down")}
            title={`View ${child.label}`}
          >
            {!isOrientation ? (
              <span className="district-card__number">{String(index + 1).padStart(2, "0")}</span>
            ) : null}
            <span className={isOrientation ? "public-interest-panel__kind" : "district-card__kind"}>
              {child.eyebrow}
            </span>
            {!isOrientation && child.publication ? (
              <span className="work-status-chip publication-status-chip" data-stage={child.publication.stage}>
                {child.publication.label}
              </span>
            ) : !isOrientation && child.status ? (
              <span className="work-status-chip" data-stage={child.status.stage}>{child.status.label}</span>
            ) : null}
            <strong>{child.label}</strong>
            {orientation ? (
              <span className="section-region-card__boundary">{orientation.boundary}</span>
            ) : !isTopLevelSection ? (
              <p>{child.summary}</p>
            ) : null}
            <span className={isOrientation ? "public-interest-panel__action" : "district-card__action"}>
              View
            </span>
          </button>
        );
      })}
    </div>
  );
}

type PublicInterestWorldProps = {
  node: ContentNode;
  regions: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

function PublicInterestWorld({ node, regions, onNavigate, onInspect }: PublicInterestWorldProps) {
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
        <WorldHero
          node={node}
          className="public-interest-hero__intro"
          titleAreaClassName="public-interest-hero__title-area"
          glance={(
            <SubjectPane
              node={node}
              variant="glance"
              glanceHeading="Public purpose is part of the engineering boundary."
            />
          )}
        />

        <RegionGrid node={node} regions={heroRegions} onNavigate={onNavigate} variant="orientation" />
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

      <section
        id="public-interest-context"
        className="public-interest-page public-interest-page--context"
        aria-label="Public Interest supporting context"
      >
        <SupportingContext
          node={node}
          regions={regions}
          onNavigate={onNavigate}
          onInspect={onInspect}
        />
      </section>
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

type SupportingContextProps = {
  node: ContentNode;
  regions: ContentNode[];
  onNavigate: (id: string, direction?: TransitionDirection) => void;
  onInspect: (inspectionId: string) => void;
};

function SupportingContext({ node, regions, onNavigate, onInspect }: SupportingContextProps) {
  const remainingBody = node.body?.slice(1) ?? [];
  const regionIds = new Set(regions.map((region) => region.id));
  const regionPaths = new Set(regions.map((region) => `/${region.path}`));
  const actions = getSubjectActions(node).filter((action) => {
    if (action.kind === "relation") return !regionIds.has(action.nodeId);
    if (action.kind !== "record") return true;

    const actionPath = action.href.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
    return !regionPaths.has(actionPath);
  });
  const links = actions.filter((action) => action.kind !== "inspection");
  const inspections = actions.filter((action) => action.kind === "inspection");
  const primaryLinks = links.slice(0, 4);
  const secondaryLinks = links.slice(4);
  const primaryInspections = inspections.slice(0, 4);
  const secondaryInspections = inspections.slice(4);

  if (actions.length === 0 && remainingBody.length === 0) return null;

  return (
    <section className="branch-world__context-section" aria-label={`Supporting context for ${node.label}`}>
      <header className="branch-world__context-header">
        <span>Supporting context</span>
      </header>

      {primaryLinks.length > 0 ? (
        <section className="branch-world__context-group" aria-label="Related paths">
          <div className="subject-pane__group-label">Related paths</div>
          <div className="subject-pane__action-grid branch-world__context-actions">
            {primaryLinks.map((action) => (
              <ActionCard
                key={action.key}
                action={action}
                onInspect={onInspect}
                onNavigate={(targetId) => onNavigate(targetId, "cross")}
              />
            ))}
          </div>

          {secondaryLinks.length > 0 ? (
            <details className="branch-world__context-disclosure">
              <summary>More related paths · {secondaryLinks.length}</summary>
              <div className="subject-pane__action-grid subject-pane__action-grid--secondary">
                {secondaryLinks.map((action) => (
                  <ActionCard
                    key={action.key}
                    action={action}
                    onInspect={onInspect}
                    onNavigate={(targetId) => onNavigate(targetId, "cross")}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </section>
      ) : null}

      {remainingBody.length > 0 ? (
        <div className="branch-world__context-body">
          {remainingBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {primaryInspections.length > 0 ? (
        <section className="branch-world__context-group" aria-label="Explore further">
          <div className="subject-pane__group-label">Explore further</div>
          <div className="subject-pane__action-grid branch-world__context-actions">
            {primaryInspections.map((action) => (
              <ActionCard
                key={action.key}
                action={action}
                onInspect={onInspect}
                onNavigate={(targetId) => onNavigate(targetId, "cross")}
              />
            ))}
          </div>

          {secondaryInspections.length > 0 ? (
            <details className="branch-world__context-disclosure">
              <summary>More to explore · {secondaryInspections.length}</summary>
              <div className="subject-pane__action-grid subject-pane__action-grid--secondary">
                {secondaryInspections.map((action) => (
                  <ActionCard
                    key={action.key}
                    action={action}
                    onInspect={onInspect}
                    onNavigate={(targetId) => onNavigate(targetId, "cross")}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function BranchWorld({ node, regions, onNavigate, onInspect }: BranchWorldProps) {
  const isRoot = node.id === "root";
  const displayedRegions = regions;

  return (
    <section
      className={`branch-world branch-world--${node.kind} ${isRoot ? "branch-world--root-world" : ""}`}
      data-kind={node.kind}
      data-world-id={node.id}
      data-gestalt-id={node.id}
    >
      <WorldHero
        node={node}
        hideTitle={isRoot}
        eyebrow={!isRoot ? <p className="eyebrow">{node.eyebrow}</p> : null}
        glance={!isRoot ? <SubjectPane node={node} variant="glance" /> : null}
      />

      <RegionGrid node={node} regions={displayedRegions} onNavigate={onNavigate} />

      {!isRoot ? (
        <SupportingContext
          node={node}
          regions={displayedRegions}
          onNavigate={onNavigate}
          onInspect={onInspect}
        />
      ) : null}
    </section>
  );
}

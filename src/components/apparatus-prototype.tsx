"use client";

import type { ReactNode } from "react";
import {
  ContentNode,
  getChildren,
  getCrossEdges,
  getParent,
} from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";
import { processScopeLabels, type ProcessScope } from "@/lib/bfl-process";
import {
  projectionDescriptions,
  projectionLabels,
  projectionModesForNode,
  type ProjectionMode,
} from "@/lib/view-projection";

export type ApparatusPrototypeFrameProps = {
  focusNode: ContentNode;
  traversalPath: ContentNode[];
  siblings: ContentNode[];
  projection: ProjectionMode;
  processScope: ProcessScope;
  canProcessZoomOut: boolean;
  canProcessZoomIn: boolean;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onTraversalPath: (id: string, index: number) => void;
  onProcessZoomOut: () => void;
  onProcessZoomIn: () => void;
  onProjectionChange: (projection: ProjectionMode) => void;
  onSearch: () => void;
  onExitPrototype: () => void;
  children: ReactNode;
};

function TraceSteps({
  traversalPath,
  focusNode,
  onTraversalPath,
}: {
  traversalPath: ContentNode[];
  focusNode: ContentNode;
  onTraversalPath: (id: string, index: number) => void;
}) {
  return (
    <ol className="apparatus-trace__steps">
      {traversalPath.map((node, index) => {
        const current = index === traversalPath.length - 1;
        return (
          <li key={`${node.id}-${index}`} data-current={current ? "true" : "false"}>
            <span className="apparatus-trace__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {current ? (
              <span className="apparatus-trace__current" aria-current="page">
                {focusNode.shortLabel ?? focusNode.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onTraversalPath(node.id, index)}
                title={`Rewind to traversal step ${index + 1}: ${node.label}`}
              >
                {node.shortLabel ?? node.label}
              </button>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function ApparatusPrototypeFrame({
  focusNode,
  traversalPath,
  siblings,
  projection,
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
  onExitPrototype,
  children,
}: ApparatusPrototypeFrameProps) {
  const peers = siblings.filter((node) => node.id !== focusNode.id);
  const availableProjectionModes = projectionModesForNode(focusNode.id);

  return (
    <div className="apparatus-prototype-shell" data-prototype="apparatus" data-projection={projection}>
      <header className="apparatus-prototype__topbar">
        <button type="button" className="apparatus-command apparatus-command--brand" onClick={onHome}>
          <span className="apparatus-command__register">BF</span>
          <span>Boundary First Labs</span>
        </button>

        <div className="apparatus-prototype__prototype-label" role="status">
          <span>APPARATUS</span>
          <strong>bounded prototype</strong>
        </div>

        <div className="apparatus-prototype__global-commands" aria-label="Prototype global controls">
          <button type="button" className="apparatus-command" onClick={onBack}>Back</button>
          <button type="button" className="apparatus-command" onClick={onSearch}>Search</button>
          {projection === "gestalt" ? (
            <div className="apparatus-process-controls" aria-label="Gestalt process context">
              <span>{processScopeLabels[processScope]}</span>
              <button type="button" className="apparatus-command" disabled={!canProcessZoomOut} onClick={onProcessZoomOut}>
                Widen
              </button>
              <button type="button" className="apparatus-command" disabled={!canProcessZoomIn} onClick={onProcessZoomIn}>
                Narrow
              </button>
            </div>
          ) : null}
          <button type="button" className="apparatus-command apparatus-command--exit" onClick={onExitPrototype}>
            Return to Card
          </button>
        </div>
      </header>

      <details className="apparatus-trace apparatus-trace--compact">
        <summary>TRACE · {traversalPath.length}</summary>
        <TraceSteps traversalPath={traversalPath} focusNode={focusNode} onTraversalPath={onTraversalPath} />
      </details>

      <aside className="apparatus-trace apparatus-trace--rail" aria-label="Focus traversal history">
        <div className="apparatus-register-label">TRACE</div>
        <TraceSteps traversalPath={traversalPath} focusNode={focusNode} onTraversalPath={onTraversalPath} />
      </aside>

      <section className="apparatus-prototype__workfield" aria-label={`Apparatus prototype for ${focusNode.label}`}>
        {children}
      </section>

      {peers.length ? (
        <aside className="apparatus-peer-bank" aria-label={`Peers of ${focusNode.label}`}>
          <div className="apparatus-register-label">PEERS · {peers.length}</div>
          <ol>
            {peers.map((peer) => (
              <li key={peer.id}>
                <button type="button" className="apparatus-port" onClick={() => onNavigate(peer.id)}>
                  <span className="apparatus-port__label">Sibling</span>
                  <strong>{peer.shortLabel ?? peer.label}</strong>
                  <span className="apparatus-port__terminal" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </aside>
      ) : (
        <aside className="apparatus-peer-bank apparatus-peer-bank--empty" aria-label="No sibling peers">
          <div className="apparatus-register-label">PEERS · 0</div>
          <p>No sibling boundary at this focus.</p>
        </aside>
      )}

      <footer className="apparatus-depth" aria-label={`Depth controls for ${focusNode.label}`}>
        <span className="apparatus-register-label">DEPTH</span>
        <div className="apparatus-depth__positions">
          {availableProjectionModes.map((mode) => (
            <button
              key={mode}
              type="button"
              className="apparatus-depth__position"
              aria-pressed={projection === mode}
              title={projectionDescriptions[mode]}
              onClick={() => onProjectionChange(mode)}
            >
              {projectionLabels[mode]}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

type ApparatusPrototypeWorldProps = {
  node: ContentNode;
  onNavigate: (id: string) => void;
  onInspect: (inspectionId: string) => void;
};

type LocalRelation = {
  key: string;
  from: ContentNode;
  to: ContentNode;
  label: string;
  type: string;
};

function signalClass(stage?: string) {
  if (!stage) return "unknown";
  if (["shipped", "published"].includes(stage)) return "valid";
  if (["pilot", "review", "launch-candidate", "draft", "planned"].includes(stage)) return "attention";
  if (["developed", "working-public", "active-development"].includes(stage)) return "info";
  return "unknown";
}

function StatusReadout({ node }: { node: ContentNode }) {
  if (node.publication) {
    return (
      <div className="apparatus-state-strip" data-signal={signalClass(node.publication.stage)}>
        <span className="apparatus-state-strip__axis">PUBLICATION</span>
        <span className="apparatus-state-strip__signal" aria-hidden="true" />
        <strong>{node.publication.label}</strong>
      </div>
    );
  }

  if (node.status) {
    return (
      <div className="apparatus-state-strip" data-signal={signalClass(node.status.stage)}>
        <span className="apparatus-state-strip__axis">STATE</span>
        <span className="apparatus-state-strip__signal" aria-hidden="true" />
        <strong>{node.status.label}</strong>
      </div>
    );
  }

  return null;
}

function ModuleFace({
  node,
  onNavigate,
}: {
  node: ContentNode;
  onNavigate: (id: string) => void;
}) {
  return (
    <article className="apparatus-module" data-kind={node.kind}>
      <div className="apparatus-module__type">{node.kind}</div>
      <h3>{node.label}</h3>
      <StatusReadout node={node} />
      <p>{node.summary}</p>
      <button type="button" className="apparatus-port apparatus-port--enter" onClick={() => onNavigate(node.id)}>
        <span className="apparatus-port__label">Enter</span>
        <strong>{node.shortLabel ?? node.label}</strong>
        <span className="apparatus-port__terminal" aria-hidden="true" />
      </button>
    </article>
  );
}

function collectLocalRelations(regions: ContentNode[]): LocalRelation[] {
  const ids = new Set(regions.map((node) => node.id));
  const byId = new Map(regions.map((node) => [node.id, node]));
  const seen = new Set<string>();
  const relations: LocalRelation[] = [];

  for (const region of regions) {
    for (const edge of getCrossEdges(region.id)) {
      if (!ids.has(edge.node.id)) continue;
      const key = [edge.from, edge.to, edge.type].join(":");
      if (seen.has(key)) continue;
      seen.add(key);
      relations.push({
        key,
        from: byId.get(edge.from) ?? region,
        to: byId.get(edge.to) ?? hydrateContentNode(edge.node),
        label: edge.label,
        type: edge.type,
      });
    }
  }

  return relations;
}

function RootApparatus({ node, onNavigate }: { node: ContentNode; onNavigate: (id: string) => void }) {
  const regions = getChildren(node.id).map(hydrateContentNode);

  return (
    <section className="apparatus-world apparatus-world--root">
      <header className="apparatus-backplane__heading">
        <span className="apparatus-register-label">ROOT WORLD · BACKPLANE</span>
        <p>{node.summary}</p>
      </header>

      <div className="apparatus-backplane" aria-label="Boundary First Labs public subsystems">
        {regions.map((region) => (
          <section key={region.id} className="apparatus-bay">
            <span className="apparatus-bay__register">PUBLIC SUBSYSTEM</span>
            <h2>{region.label}</h2>
            <p>{region.summary}</p>
            <button type="button" className="apparatus-port apparatus-port--enter" onClick={() => onNavigate(region.id)}>
              <span className="apparatus-port__label">Enter</span>
              <strong>{region.label}</strong>
              <span className="apparatus-port__terminal" aria-hidden="true" />
            </button>
          </section>
        ))}
      </div>
    </section>
  );
}

function BranchApparatus({ node, onNavigate, onInspect }: ApparatusPrototypeWorldProps) {
  const regions = getChildren(node.id).map(hydrateContentNode);
  const relations = collectLocalRelations(regions);
  const visibleRelations = relations.slice(0, 3);
  const overflowRelations = relations.slice(3);
  const immediateBody = node.body?.[0];

  return (
    <section className="apparatus-world apparatus-world--branch">
      <article className="apparatus-subject-faceplate" aria-current="page">
        <div className="apparatus-module__type">{node.kind} · subject assembly</div>
        <h1>{node.label}</h1>
        <StatusReadout node={node} />
        <p>{immediateBody ?? node.summary}</p>
        {node.inspection?.length ? (
          <details className="apparatus-through">
            <summary>THROUGH · {node.inspection.length}</summary>
            <div className="apparatus-through__well">
              {node.inspection.map((inspection) => (
                <button key={inspection.id} type="button" onClick={() => onInspect(inspection.id)}>
                  <span>{inspection.eyebrow}</span>
                  <strong>{inspection.label}</strong>
                </button>
              ))}
            </div>
          </details>
        ) : null}
      </article>

      <section className="apparatus-module-bay" aria-label={`Contained modules of ${node.label}`}>
        <div className="apparatus-register-label">CONTAINED MODULES · {regions.length}</div>
        <div className="apparatus-module-grid">
          {regions.map((region) => (
            <ModuleFace key={region.id} node={region} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {relations.length ? (
        <section className="apparatus-routing-bay" aria-label={`Local typed relations within ${node.label}`}>
          <div className="apparatus-register-label">LOCAL ROUTING · {relations.length}</div>
          <div className="apparatus-routing-bay__traces">
            {visibleRelations.map((relation) => (
              <div className="apparatus-relation-trace" key={relation.key}>
                <button type="button" onClick={() => onNavigate(relation.from.id)}>{relation.from.shortLabel ?? relation.from.label}</button>
                <span className="apparatus-relation-trace__line" aria-hidden="true" />
                <span className="apparatus-relation-trace__label">{relation.label}</span>
                <span className="apparatus-relation-trace__line" aria-hidden="true" />
                <button type="button" onClick={() => onNavigate(relation.to.id)}>{relation.to.shortLabel ?? relation.to.label}</button>
              </div>
            ))}
          </div>

          {overflowRelations.length ? (
            <details className="apparatus-port-bank">
              <summary>RELATIONS · +{overflowRelations.length} MORE</summary>
              <div>
                {overflowRelations.map((relation) => (
                  <button key={relation.key} type="button" className="apparatus-port" onClick={() => onNavigate(relation.to.id)}>
                    <span className="apparatus-port__label">{relation.label}</span>
                    <strong>{relation.to.label}</strong>
                    <span className="apparatus-port__terminal" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </details>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function LeafApparatus({ node, onNavigate, onInspect }: ApparatusPrototypeWorldProps) {
  const parent = getParent(node.id);
  const renderedParent = parent ? hydrateContentNode(parent) : undefined;
  const relations = getCrossEdges(node.id).map((edge) => ({ ...edge, node: hydrateContentNode(edge.node) }));
  const immediateBody = node.body?.[0] ?? node.summary;

  return (
    <section className="apparatus-world apparatus-world--leaf">
      <article className="apparatus-instrument" aria-current="page">
        <header className="apparatus-instrument__heading">
          <span className="apparatus-register-label">{node.kind.toUpperCase()} · INSTRUMENT</span>
          <h1>{node.label}</h1>
          <p>{node.summary}</p>
        </header>

        <div className="apparatus-instrument__state">
          <StatusReadout node={node} />
          {node.publication ? (
            <>
              <div className="apparatus-state-strip" data-signal="info">
                <span className="apparatus-state-strip__axis">CLAIM</span>
                <span className="apparatus-state-strip__signal" aria-hidden="true" />
                <strong>{node.publication.claimMaturity}</strong>
              </div>
              <div className="apparatus-state-strip" data-signal="unknown">
                <span className="apparatus-state-strip__axis">AUDIENCE</span>
                <span className="apparatus-state-strip__signal" aria-hidden="true" />
                <strong>{node.publication.audience}</strong>
              </div>
            </>
          ) : null}
        </div>

        <div className="apparatus-instrument__context">
          <span className="apparatus-register-label">CONTEXT</span>
          <p>{immediateBody}</p>
        </div>

        {node.publication ? (
          <details className="apparatus-gate">
            <summary>
              <span>GATE · NEXT PUBLICATION GATE</span>
              <strong>WAITING · 1 CONDITION</strong>
            </summary>
            <div className="apparatus-gate__detail">
              <p>{node.publication.nextGate}</p>
              <dl>
                <div>
                  <dt>State preserved</dt>
                  <dd>{node.publication.label}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{node.publication.sourceRef}</dd>
                </div>
              </dl>
            </div>
          </details>
        ) : null}

        <section className="apparatus-instrument__ports" aria-label={`Ports for ${node.label}`}>
          <div className="apparatus-register-label">PORTS</div>
          <div className="apparatus-port-bank__grid">
            {renderedParent ? (
              <button type="button" className="apparatus-port" onClick={() => onNavigate(renderedParent.id)}>
                <span className="apparatus-port__label">Contained by</span>
                <strong>{renderedParent.label}</strong>
                <span className="apparatus-port__terminal" aria-hidden="true" />
              </button>
            ) : null}

            {relations.map((relation) => (
              <button
                type="button"
                className="apparatus-port"
                key={`${relation.from}-${relation.to}-${relation.type}`}
                onClick={() => onNavigate(relation.node.id)}
              >
                <span className="apparatus-port__label">{relation.label}</span>
                <strong>{relation.node.label}</strong>
                <span className="apparatus-port__terminal" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        {node.links?.length ? (
          <section className="apparatus-record-well" aria-label={`Retained records for ${node.label}`}>
            <div className="apparatus-register-label">RECORDS · {node.links.length}</div>
            <div>
              {node.links.map((link) => (
                <a key={link.href} href={link.href}>
                  <span>{link.eyebrow ?? "Record"}</span>
                  <strong>{link.label}</strong>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {node.inspection?.length ? (
          <details className="apparatus-through">
            <summary>THROUGH · {node.inspection.length} RECORDS</summary>
            <div className="apparatus-through__well">
              {node.inspection.map((inspection) => (
                <button key={inspection.id} type="button" onClick={() => onInspect(inspection.id)}>
                  <span>{inspection.eyebrow}</span>
                  <strong>{inspection.label}</strong>
                  <small>{inspection.summary}</small>
                </button>
              ))}
            </div>
          </details>
        ) : null}
      </article>
    </section>
  );
}

export function ApparatusPrototypeWorld(props: ApparatusPrototypeWorldProps) {
  const node = hydrateContentNode(props.node);
  const children = getChildren(node.id);

  if (node.id === "root") return <RootApparatus node={node} onNavigate={props.onNavigate} />;
  if (children.length) return <BranchApparatus {...props} node={node} />;
  return <LeafApparatus {...props} node={node} />;
}

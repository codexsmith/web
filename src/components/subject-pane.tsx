"use client";

import { ContentNode, getChildren, getCrossEdges } from "@/lib/content-registry";
import { hydrateContentNode } from "@/lib/content-projections";

type SubjectPaneProps = {
  node: ContentNode;
  onInspect: (inspectionId: string) => void;
  onNavigate: (id: string) => void;
};

export function SubjectPane({ node, onInspect, onNavigate }: SubjectPaneProps) {
  const body = node.body ?? [];
  const visibleBody = body.slice(0, 2);
  const remainingBody = body.slice(2);
  const records = node.links ?? [];
  const inspections = node.inspection ?? [];
  const isBranch = getChildren(node.id).length > 0;
  const relations = isBranch
    ? getCrossEdges(node.id).map((edge) => ({
        ...edge,
        node: hydrateContentNode(edge.node),
        direction: edge.from === node.id ? "outgoing" as const : "incoming" as const,
      }))
    : [];
  const hasExploratoryInspection = inspections.some((inspection) => inspection.id.startsWith("exploratory-"));

  const hasContent =
    body.length > 0 ||
    Boolean(node.status) ||
    Boolean(node.publication) ||
    records.length > 0 ||
    inspections.length > 0 ||
    relations.length > 0;

  if (!hasContent) return null;

  return (
    <section className="subject-pane" aria-label={`Overview for ${node.label}`}>
      <header className="subject-pane__header">
        <span className="subject-pane__label">Overview</span>
        {node.publication ? (
          <span className="work-status-chip publication-status-chip" data-stage={node.publication.stage}>
            {node.publication.label}
          </span>
        ) : node.status ? (
          <span className="work-status-chip" data-stage={node.status.stage}>{node.status.label}</span>
        ) : null}
      </header>

      {node.publication ? (
        <div className="subject-pane__standing">
          <strong>{node.publication.documentClass}</strong>
          <p>{node.publication.nextGate}</p>
        </div>
      ) : node.status ? (
        <div className="subject-pane__standing">
          <strong>{node.status.label}</strong>
          <p>{node.status.detail}</p>
        </div>
      ) : null}

      {visibleBody.length ? (
        <div className="subject-pane__body">
          {visibleBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {remainingBody.length ? (
            <details className="subject-pane__more">
              <summary>Read more context · {remainingBody.length}</summary>
              <div>
                {remainingBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </details>
          ) : null}
        </div>
      ) : null}

      {records.length || inspections.length || relations.length ? (
        <div className="subject-pane__actions">
          {records.length ? (
            <section className="subject-pane__group" aria-label="Retained records">
              <div className="subject-pane__group-label">Records</div>
              <div className="subject-pane__action-grid">
                {records.map((record) => (
                  <a href={record.href} key={`${node.id}-${record.href}`}>
                    <span>{record.eyebrow ?? "Record"}</span>
                    <strong>{record.label}</strong>
                    {record.summary ? <small>{record.summary}</small> : null}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {inspections.length ? (
            <section className="subject-pane__group" aria-label="Inspectable context">
              <div className="subject-pane__group-label">Inspect</div>
              {hasExploratoryInspection ? (
                <p className="subject-pane__notice">
                  Exploratory reformulations remain calibration, derivation, proof, or experiment obligations until their native validation gates are met.
                </p>
              ) : null}
              <div className="subject-pane__action-grid">
                {inspections.map((inspection) => (
                  <button key={inspection.id} onClick={() => onInspect(inspection.id)}>
                    <span>{inspection.eyebrow ?? "Through"}</span>
                    <strong>{inspection.label}</strong>
                    <small>{inspection.summary}</small>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {relations.length ? (
            <section className="subject-pane__group" aria-label="Typed connections">
              <div className="subject-pane__group-label">Connections</div>
              <div className="subject-pane__action-grid">
                {relations.map((relation) => (
                  <button
                    key={`${relation.from}-${relation.to}-${relation.type}`}
                    onClick={() => onNavigate(relation.node.id)}
                    data-edge-type={relation.type}
                  >
                    <span>{relation.direction === "outgoing" ? relation.label : `incoming · ${relation.label}`}</span>
                    <strong>{relation.node.label}</strong>
                    <small>{relation.type}</small>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

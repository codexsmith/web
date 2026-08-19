"use client";

import { ContentNode, getCrossEdges, getParent } from "@/lib/content";
import { hydrateContentNode } from "@/lib/content-projections";
import { getSemanticEvents } from "@/lib/semantic-events";

type EvidenceViewProps = {
  focusNode: ContentNode;
  onInspect: (inspectionId: string) => void;
  onNavigate: (id: string) => void;
};

function eventDate(effectiveAt: string | undefined, recordedAt: string) {
  return effectiveAt ?? recordedAt;
}

export function EvidenceView({ focusNode, onInspect, onNavigate }: EvidenceViewProps) {
  const inspections = focusNode.inspection ?? [];
  const records = focusNode.links ?? [];
  const parent = getParent(focusNode.id);
  const relations = getCrossEdges(focusNode.id).map((edge) => ({
    ...edge,
    node: hydrateContentNode(edge.node),
    direction: edge.from === focusNode.id ? "outgoing" as const : "incoming" as const,
  }));
  const ledgerEvents = getSemanticEvents(focusNode.id);
  const sourceRefs = Array.from(
    new Set([
      ...inspections
        .map((inspection) => inspection.sourceRef)
        .filter((sourceRef): sourceRef is string => Boolean(sourceRef)),
      ...ledgerEvents.flatMap((event) => event.evidenceRefs),
    ]),
  );

  return (
    <main className="world-viewport evidence-viewport">
      <section className="evidence-view" aria-label={`Evidence and lineage for ${focusNode.label}`}>
        <header className="evidence-view__heading">
          <div>
            <p className="eyebrow">Evidence / lineage projection</p>
            <h1>{focusNode.label}</h1>
            <p>
              What supports, constrains, qualifies, connects, or changes this focal object without changing
              its conceptual location.
            </p>
          </div>
          <dl className="evidence-view__scope">
            <div>
              <dt>Focus</dt>
              <dd>{focusNode.shortLabel ?? focusNode.label}</dd>
            </div>
            <div>
              <dt>Parent boundary</dt>
              <dd>{parent ? parent.shortLabel ?? parent.label : "BFL root"}</dd>
            </div>
            <div>
              <dt>Through views</dt>
              <dd>{inspections.length}</dd>
            </div>
            <div>
              <dt>Source refs</dt>
              <dd>{sourceRefs.length}</dd>
            </div>
            <div>
              <dt>Ledger events</dt>
              <dd>{ledgerEvents.length}</dd>
            </div>
          </dl>
        </header>

        <div className="evidence-view__grid">
          <section className="evidence-compartment evidence-compartment--standing">
            <div className="evidence-compartment__label">Declared standing</div>
            {focusNode.status ? (
              <>
                <strong>{focusNode.status.label}</strong>
                <p>{focusNode.status.detail}</p>
                <dl>
                  <div>
                    <dt>Stage</dt>
                    <dd>{focusNode.status.stage}</dd>
                  </div>
                  <div>
                    <dt>Historical</dt>
                    <dd>{focusNode.status.historical ? "yes" : "no"}</dd>
                  </div>
                  {focusNode.status.sourceStatus ? (
                    <div>
                      <dt>Source status</dt>
                      <dd>{focusNode.status.sourceStatus}</dd>
                    </div>
                  ) : null}
                  {focusNode.status.provenance ? (
                    <div>
                      <dt>Provenance</dt>
                      <dd>{focusNode.status.provenance}</dd>
                    </div>
                  ) : null}
                </dl>
              </>
            ) : (
              <p className="evidence-empty">No lifecycle or delivery standing is declared for this object.</p>
            )}
          </section>

          <section className="evidence-compartment">
            <div className="evidence-compartment__label">Inspectable evidence</div>
            {inspections.length ? (
              <div className="evidence-cards">
                {inspections.map((inspection) => (
                  <button key={inspection.id} onClick={() => onInspect(inspection.id)}>
                    <span>{inspection.eyebrow}</span>
                    <strong>{inspection.label}</strong>
                    <p>{inspection.summary}</p>
                    <small>{inspection.sourceRef ? `Source · ${inspection.sourceRef}` : "Source reference not declared"}</small>
                  </button>
                ))}
              </div>
            ) : (
              <p className="evidence-empty">No Through evidence views are attached to this object yet.</p>
            )}
          </section>

          <section className="evidence-compartment">
            <div className="evidence-compartment__label">Source register</div>
            {sourceRefs.length ? (
              <ul className="evidence-source-list">
                {sourceRefs.map((sourceRef) => (
                  <li key={sourceRef}>{sourceRef}</li>
                ))}
              </ul>
            ) : (
              <p className="evidence-empty">No explicit source references are declared on current inspections or lineage events.</p>
            )}
          </section>

          <section className="evidence-compartment evidence-compartment--ledger">
            <div className="evidence-compartment__label">Semantic lineage</div>
            {ledgerEvents.length ? (
              <div className="evidence-ledger">
                {ledgerEvents.map((event) => (
                  <article key={event.id} data-event-type={event.type}>
                    <header>
                      <span>
                        <small>{event.type.replaceAll("-", " ")}</small>
                        <strong>{event.label}</strong>
                      </span>
                      <time dateTime={event.effectiveAt ?? event.recordedAt}>
                        {eventDate(event.effectiveAt, event.recordedAt)}
                      </time>
                    </header>
                    <p>{event.summary}</p>
                    <dl>
                      <div>
                        <dt>Actor</dt>
                        <dd>{event.actor.label}</dd>
                      </div>
                      <div>
                        <dt>Recorded by</dt>
                        <dd>{event.recordedBy.label}</dd>
                      </div>
                      <div>
                        <dt>Standing effect</dt>
                        <dd>{event.standingEffect}</dd>
                      </div>
                      {event.resultingStage ? (
                        <div>
                          <dt>Resulting stage</dt>
                          <dd>{event.resultingStage}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <div className="evidence-ledger__ceiling">
                      <small>Claim ceiling</small>
                      <p>{event.claimCeiling}</p>
                    </div>
                    {event.evidenceRefs.length ? (
                      <ul>
                        {event.evidenceRefs.map((ref) => (
                          <li key={ref}>{ref}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="evidence-empty">
                No semantic events have been admitted for this object. Current standing should not be read as a reconstructed chronology.
              </p>
            )}
          </section>

          <section className="evidence-compartment">
            <div className="evidence-compartment__label">Retained / public records</div>
            {records.length ? (
              <div className="evidence-records">
                {records.map((record) => (
                  <a href={record.href} key={`${focusNode.id}-${record.href}`}>
                    <span>{record.eyebrow ?? "Record"}</span>
                    <strong>{record.label}</strong>
                    {record.summary ? <p>{record.summary}</p> : null}
                  </a>
                ))}
              </div>
            ) : (
              <p className="evidence-empty">No retained or public records are linked from this object yet.</p>
            )}
          </section>

          <section className="evidence-compartment evidence-compartment--relations">
            <div className="evidence-compartment__label">Typed relations</div>
            {relations.length ? (
              <div className="evidence-relations">
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
            ) : (
              <p className="evidence-empty">No typed cross-tree relations are declared for this object yet.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

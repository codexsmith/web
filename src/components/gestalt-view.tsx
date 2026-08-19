"use client";

import type { ContentNode } from "@/lib/content";
import {
  deriveProcessPlacement,
  getProcessPeers,
  processDisciplines,
  processScopeLabels,
  processStages,
  type ProcessScope,
  visibleProcessStages,
} from "@/lib/bfl-process";
import { hydrateContentNode } from "@/lib/content-projections";

type GestaltViewProps = {
  focusNode: ContentNode;
  scope: ProcessScope;
  onNavigate: (id: string) => void;
};

export function GestaltView({ focusNode, scope, onNavigate }: GestaltViewProps) {
  const placement = deriveProcessPlacement(focusNode);
  const visibleStages = visibleProcessStages(placement, scope);
  const visibleIds = new Set(visibleStages.map((stage) => stage.id));
  const peers = getProcessPeers(focusNode.id, placement.primaryStage).map(hydrateContentNode);
  const primary = processStages.find((stage) => stage.id === placement.primaryStage)!;

  return (
    <main className="world-viewport gestalt-viewport">
      <section className="gestalt-view" aria-label={`Boundary First process placement for ${focusNode.label}`}>
        <header className="gestalt-view__heading">
          <div>
            <p className="eyebrow">Gestalt / process projection</p>
            <h1>{focusNode.label}</h1>
            <p>
              Where this focal object currently sits in the Boundary First operating loop. Gestalt zoom changes
              process context around the object; it does not change the object itself or traverse the content graph.
            </p>
          </div>
          <dl className="gestalt-view__scope">
            <div>
              <dt>Primary placement</dt>
              <dd>{primary.label}</dd>
            </div>
            <div>
              <dt>Zoom</dt>
              <dd>{processScopeLabels[scope]}</dd>
            </div>
            <div>
              <dt>Placement basis</dt>
              <dd>{placement.basis === "declared-and-derived" ? "declared + derived signals" : "derived public signals"}</dd>
            </div>
          </dl>
        </header>

        <section className="gestalt-synthesis" aria-label="Boundary First operating synthesis">
          <div className="gestalt-section-label">Operating synthesis</div>
          <p>
            <strong>Agentic · Lean Startup · Agile · Scientific · Computational · Constructive</strong>
            <span>
              These are overlapping disciplines applied across one repairable loop, not six sequential phases.
            </span>
          </p>
        </section>

        <section className="gestalt-pipeline" aria-label="Boundary First operating loop">
          <div className="gestalt-section-label">Process loop · {processScopeLabels[scope]}</div>
          <ol className="gestalt-pipeline__stages">
            {visibleStages.map((stage) => {
              const active = placement.activeStages.includes(stage.id);
              const primaryStage = placement.primaryStage === stage.id;
              const reasons = placement.reasons[stage.id];
              return (
                <li
                  key={stage.id}
                  className={active ? "is-active" : ""}
                  data-primary={primaryStage ? "true" : "false"}
                  data-stage={stage.id}
                >
                  <span className="gestalt-stage__index">
                    {String(processStages.findIndex((candidate) => candidate.id === stage.id) + 1).padStart(2, "0")}
                  </span>
                  <span className="gestalt-stage__signal" aria-hidden="true" />
                  <div className="gestalt-stage__copy">
                    <small>{primaryStage ? "Primary placement" : active ? "Participating" : "Process stage"}</small>
                    <strong>{stage.label}</strong>
                    <p>{stage.question}</p>
                    {scope === "local" && reasons.length ? (
                      <ul>
                        {reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {scope !== "local" ? (
          <section className="gestalt-discipline-map" aria-label="Operating disciplines across the process loop">
            <div className="gestalt-section-label">Method bands</div>
            <div className="gestalt-discipline-map__grid">
              {processDisciplines.map((discipline) => (
                <article key={discipline.id} data-discipline={discipline.id}>
                  <header>
                    <strong>{discipline.label}</strong>
                    <p>{discipline.role}</p>
                  </header>
                  <div className="gestalt-discipline__stages" aria-label={`${discipline.label} process coverage`}>
                    {processStages.map((stage) => (
                      <span
                        key={stage.id}
                        data-visible={visibleIds.has(stage.id) ? "true" : "false"}
                        data-participates={discipline.stages.includes(stage.id) ? "true" : "false"}
                        data-focus={placement.activeStages.includes(stage.id) ? "true" : "false"}
                        title={`${stage.shortLabel}${discipline.stages.includes(stage.id) ? ` · ${discipline.label} participates` : ""}`}
                      >
                        {stage.shortLabel}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <div className="gestalt-lower-grid">
          <section className="gestalt-placement-notes">
            <div className="gestalt-section-label">Why this placement</div>
            <h2>{primary.label}</h2>
            <p>{primary.output}</p>
            <ul>
              {placement.reasons[placement.primaryStage].map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p className="gestalt-placement-notes__boundary">
              This is a transparent process projection from the public node kind, declared standing, inspections,
              retained records, and semantic events. It is not an independently measured project-management status
              unless the underlying source explicitly records one.
            </p>
          </section>

          <section className="gestalt-process-peers">
            <div className="gestalt-section-label">Process filter · same primary stage</div>
            <h2>Other work near {primary.shortLabel}</h2>
            {peers.length ? (
              <div className="gestalt-process-peers__list">
                {peers.map((peer) => (
                  <button key={peer.id} onClick={() => onNavigate(peer.id)} title={`Traverse to ${peer.label}`}>
                    <span>{peer.eyebrow}</span>
                    <strong>{peer.label}</strong>
                    {peer.status ? <small>{peer.status.label}</small> : <small>{peer.kind}</small>}
                  </button>
                ))}
              </div>
            ) : (
              <p className="gestalt-empty">No other public nodes currently resolve to this primary process stage.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

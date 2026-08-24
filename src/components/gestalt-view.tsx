"use client";

import Link from "next/link";
import type { ContentNode } from "@/lib/content";
import { ProcessCircuit } from "@/components/process-circuit";
import {
  deriveProcessPlacement,
  getProcessPeers,
  processScopeLabels,
  processStages,
  type ProcessScope,
} from "@/lib/bfl-process";
import { hydrateContentNode } from "@/lib/content-projections";
import { founderProfile, founderTimeline } from "@/lib/founder-content";

type GestaltViewProps = {
  focusNode: ContentNode;
  scope: ProcessScope;
  onNavigate: (id: string) => void;
};

export function GestaltView({ focusNode, scope, onNavigate }: GestaltViewProps) {
  if (focusNode.id === "root") {
    return <FounderTimelineView />;
  }

  const placement = deriveProcessPlacement(focusNode);
  const peers = getProcessPeers(focusNode.id, placement.primaryStage).map(hydrateContentNode);
  const primary = processStages.find((stage) => stage.id === placement.primaryStage)!;

  return (
    <main className="world-viewport gestalt-viewport">
      <section className="gestalt-view" data-process-scope={scope} aria-label={`Boundary First process placement for ${focusNode.label}`}>
        <header className="gestalt-view__heading">
          <div>
            <p className="eyebrow">Process projection</p>
            <h1>{focusNode.label}</h1>
            <p>
              Where this focal object currently sits in the Boundary First operating circuit. Process scope changes
              how much of the surrounding control structure is visible; it does not change the object itself or
              traverse the content graph.
            </p>
          </div>
          <dl className="gestalt-view__scope">
            <div>
              <dt>Primary placement</dt>
              <dd>{primary.label}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{processScopeLabels[scope]}</dd>
            </div>
            <div>
              <dt>Placement basis</dt>
              <dd>{placement.basis === "declared-and-derived" ? "declared + derived signals" : "derived public signals"}</dd>
            </div>
          </dl>
        </header>

        <ProcessCircuit placement={placement} scope={scope} />

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

function FounderTimelineView() {
  return (
    <main className="world-viewport gestalt-viewport">
      <section className="gestalt-view founder-timeline-view" aria-label={`Founder timeline for ${founderProfile.name}`}>
        <header className="gestalt-view__heading">
          <div>
            <p className="eyebrow">Founder timeline</p>
            <h1>From practice to Boundary First Labs</h1>
            <p>
              For the Lab itself, this deeper view is more useful as temporal context than as a process-state diagram:
              how the founder’s training, delivery practice, independent inquiry, AI-assisted acceleration, and
              institutionalization accumulated into the present Lab.
            </p>
          </div>
          <dl className="gestalt-view__scope">
            <div>
              <dt>Focus</dt>
              <dd>{founderProfile.name}</dd>
            </div>
            <div>
              <dt>Arc</dt>
              <dd>practice → research → lab</dd>
            </div>
            <div>
              <dt>Current phase</dt>
              <dd>conversion + institutionalization</dd>
            </div>
          </dl>
        </header>

        <section className="gestalt-synthesis" aria-label="Timeline reading rule">
          <div className="gestalt-section-label">Reading rule</div>
          <p>
            <strong>Provenance explains how the work accumulated. It does not certify the claims.</strong>
            <span>
              The timeline is a founder and institutional history. Research, product, and publication evidence remain
              answerable to their own domains and validation paths.
            </span>
          </p>
        </section>

        <section className="gestalt-pipeline founder-timeline" aria-label="Boundary First Labs founder timeline">
          <div className="gestalt-section-label">Development arc</div>
          <ol className="gestalt-pipeline__stages">
            {founderTimeline.map((item, index) => (
              <li key={item.label} className="is-active" data-primary={index === founderTimeline.length - 1 ? "true" : "false"}>
                <span className="gestalt-stage__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="gestalt-stage__signal" aria-hidden="true" />
                <div className="gestalt-stage__copy">
                  <small>{item.period}</small>
                  <strong>{item.label}</strong>
                  <p>{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="gestalt-lower-grid">
          <section className="gestalt-placement-notes">
            <div className="gestalt-section-label">Present institutional task</div>
            <h2>Convert founder-held coherence into shared structure</h2>
            <p>{founderProfile.currentPhase}</p>
            <p className="gestalt-placement-notes__boundary">
              The success condition is not founder indispensability. It is work that other capable people can understand,
              criticize, test, improve, teach, operate, maintain, and steward without erasing where it came from.
            </p>
          </section>

          <section className="gestalt-placement-notes">
            <div className="gestalt-section-label">Continue the institutional record</div>
            <h2>Provenance and the Lab</h2>
            <p>
              The About branch carries the fuller split between origin, work substance, operating method, and present
              institutional responsibility.
            </p>
            <div className="record-links">
              <Link href="/about/provenance">
                <span>Origin and lineage</span>
                <strong>Provenance</strong>
              </Link>
              <Link href="/about/the-lab">
                <span>Present institution</span>
                <strong>The Lab</strong>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

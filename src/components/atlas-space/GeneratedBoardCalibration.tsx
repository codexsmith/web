"use client";

import { useEffect, useState } from "react";
import styles from "./GeneratedBoardCalibration.module.css";
import { labCorpusAuthority } from "./lab-corpus-atlas";
import { corpusDescriptorForLayer } from "./generated-domain-board";
import {
  calibrationCandidatesForLayer,
  hydrateCalibrationDecisions,
  setCalibrationDecision,
  type CalibrationDecision,
  type CalibrationDecisionMap,
} from "./domain-calibration";
import {
  appendCalibrationRecord,
  createCalibrationRecord,
  latestCalibrationDecisions,
  readCalibrationLedger,
  recordsForLayer,
} from "./calibration-records";
import type { AtlasFiber, AtlasLayer } from "./atlas-space-model";

type GeneratedBoardCalibrationProps = {
  layer: AtlasLayer;
  fibers: AtlasFiber[];
  activeFiberId: string;
  onSelectFiber: (fiberId: string) => void;
  onCalibrationChange?: () => void;
};

function decisionLabel(decision: CalibrationDecision) {
  if (decision === "accepted") return "TERMINATED / LIVE";
  if (decision === "rejected") return "REJECTED / OPEN";
  return "PENDING / OPEN";
}

export function GeneratedBoardCalibration({
  layer,
  fibers,
  activeFiberId,
  onSelectFiber,
  onCalibrationChange,
}: GeneratedBoardCalibrationProps) {
  const descriptor = corpusDescriptorForLayer(layer.id);
  const candidates = calibrationCandidatesForLayer(layer.id);
  const [decisions, setDecisions] = useState<CalibrationDecisionMap>({});
  const [recordCount, setRecordCount] = useState(0);
  const [activeCandidateId, setActiveCandidateId] = useState(candidates[0]?.fiberId ?? activeFiberId);

  useEffect(() => {
    const ledger = readCalibrationLedger();
    const hydrated = latestCalibrationDecisions(ledger, layer.id);
    hydrateCalibrationDecisions(layer.id, hydrated);
    setDecisions(hydrated);
    setRecordCount(recordsForLayer(ledger, layer.id).length);
    onCalibrationChange?.();
  }, [layer.id, onCalibrationChange]);

  if (!descriptor?.generated) return null;

  const activeCandidate = candidates.find((candidate) => candidate.fiberId === activeCandidateId);
  const reviewedCount = candidates.filter((candidate) => decisions[candidate.fiberId] && decisions[candidate.fiberId] !== "pending").length;
  const acceptedCount = candidates.filter((candidate) => decisions[candidate.fiberId] === "accepted").length;
  const rejectedCount = candidates.filter((candidate) => decisions[candidate.fiberId] === "rejected").length;
  const activeDecision: CalibrationDecision = activeCandidate ? decisions[activeCandidate.fiberId] ?? "pending" : "pending";
  const evidenceLevel = activeCandidate?.evidenceStrength === "direct" ? 3 : activeCandidate?.evidenceStrength === "strong" ? 2 : activeCandidate ? 1 : 0;

  const decide = (fiberId: string, decision: CalibrationDecision) => {
    const candidate = candidates.find((item) => item.fiberId === fiberId);
    if (!candidate) return;

    setCalibrationDecision(layer.id, fiberId, decision);
    setDecisions((existing) => ({ ...existing, [fiberId]: decision }));
    setActiveCandidateId(fiberId);
    onSelectFiber(fiberId);

    const nextLedger = appendCalibrationRecord(
      createCalibrationRecord({
        layerId: layer.id,
        descriptor,
        candidate,
        decision,
      }),
    );
    setRecordCount(recordsForLayer(nextLedger, layer.id).length);
    onCalibrationChange?.();
  };

  return (
    <section className={styles.panel} data-decision={activeDecision} aria-label={`${descriptor.domainLabel} generated board calibration`}>
      <i className={`${styles.screw} ${styles.screwTl}`} aria-hidden="true" />
      <i className={`${styles.screw} ${styles.screwTr}`} aria-hidden="true" />
      <i className={`${styles.screw} ${styles.screwBl}`} aria-hidden="true" />
      <i className={`${styles.screw} ${styles.screwBr}`} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span>CALIBRATION BENCH / GENERATED BOARD</span>
          <h3>{descriptor.domainLabel}</h3>
          <small>{descriptor.familyCode} / {descriptor.domainCode} / {layer.hardware.rackCode}</small>
        </div>
        <div className={styles.headerMeters}>
          <div><span>LIVE</span><strong>{acceptedCount}</strong><i className={styles.liveLamp} /></div>
          <div><span>REJECTED</span><strong>{rejectedCount}</strong><i className={styles.rejectLamp} /></div>
          <div><span>REVIEWED</span><strong>{reviewedCount}/{candidates.length}</strong><i /></div>
          <div><span>LEDGER</span><strong>{recordCount}</strong><i /></div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.scopeBay}>
          <span className={styles.moduleLabel}>MAPPING STATE</span>
          <div className={styles.scope} data-decision={activeDecision} aria-hidden="true">
            <i className={styles.scopeRingA} />
            <i className={styles.scopeRingB} />
            <i className={styles.scopeRingC} />
            <b />
          </div>
          <div className={styles.scopeReadout}>
            <span>PORT</span>
            <strong>{activeCandidate?.fiberId.toUpperCase() ?? "NO CANDIDATE"}</strong>
            <small>{decisionLabel(activeDecision)}</small>
          </div>
          <div className={styles.signalRows}>
            <div><span>EVIDENCE</span><div>{[1, 2, 3].map((level) => <i key={level} data-on={level <= evidenceLevel} />)}</div></div>
            <div><span>SOURCE</span><strong>CURRENT</strong><i className={styles.statusLamp} /></div>
            <div><span>SCHEMA</span><strong>LEDGER V1</strong><i className={styles.statusLamp} /></div>
          </div>
        </aside>

        <main className={styles.evidenceBay}>
          <div className={styles.bayHeader}>
            <span>EVIDENCE REVIEW</span>
            <strong>{activeCandidate?.localLabel ?? "NO CALIBRATION SET"}</strong>
            <small>{activeCandidate ? `${activeCandidate.evidenceStrength.toUpperCase()} / ${activeCandidate.evidenceLocation}` : "NO SOURCE-BACKED CANDIDATE INSTALLED"}</small>
          </div>

          {activeCandidate ? (
            <>
              <div className={styles.evidenceScope} aria-hidden="true">
                <span className={styles.evidenceBaseline} />
                <i /><i /><i /><i /><i /><i /><i />
              </div>
              <div className={styles.evidenceGrid}>
                <div className={styles.evidenceCell}>
                  <span>LOCAL FORM</span>
                  <p>{activeCandidate.localNote}</p>
                </div>
                <div className={styles.evidenceCell}>
                  <span>SOURCE SUPPORT</span>
                  <p>{activeCandidate.evidenceSummary}</p>
                </div>
              </div>
              <div className={styles.sourceStrip}>
                <div><span>LOCATION</span><strong>{activeCandidate.evidenceLocation}</strong></div>
                <div><span>SOURCE SHA</span><strong>{activeCandidate.sourceSha.slice(0, 12)}</strong></div>
              </div>
              <div className={styles.decisionBank}>
                <button type="button" data-kind="accept" data-active={activeDecision === "accepted"} onClick={() => decide(activeCandidate.fiberId, "accepted")}>
                  <i /> <span>ACCEPT</span><small>TERMINATE PORT</small>
                </button>
                <button type="button" data-kind="pending" data-active={activeDecision === "pending"} onClick={() => decide(activeCandidate.fiberId, "pending")}>
                  <i /> <span>PENDING</span><small>LEAVE OPEN</small>
                </button>
                <button type="button" data-kind="reject" data-active={activeDecision === "rejected"} onClick={() => decide(activeCandidate.fiberId, "rejected")}>
                  <i /> <span>REJECT</span><small>OPEN CIRCUIT</small>
                </button>
              </div>
            </>
          ) : (
            <div className={styles.noCandidates}>
              <strong>NO CALIBRATION SET INSTALLED</strong>
              <p>This board has corpus identity, but no reviewed candidate mapping dataset has been attached.</p>
            </div>
          )}
        </main>

        <aside className={styles.portBay}>
          <span className={styles.moduleLabel}>CORRESPONDENCE PATCH BAY</span>
          {fibers.map((fiber, index) => {
            const candidate = candidates.find((item) => item.fiberId === fiber.id);
            const decision = decisions[fiber.id] ?? "pending";
            const isActive = fiber.id === activeFiberId || fiber.id === activeCandidateId;
            return (
              <button
                key={fiber.id}
                type="button"
                aria-pressed={isActive}
                data-decision={candidate ? decision : "unmapped"}
                className={isActive ? styles.portActive : ""}
                onClick={() => {
                  onSelectFiber(fiber.id);
                  setActiveCandidateId(fiber.id);
                }}
              >
                <span className={styles.portJack}><i /></span>
                <span className={styles.portCode}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.portName}><strong>{fiber.label}</strong><small>{candidate ? decisionLabel(decision) : "NO EVIDENCE CANDIDATE"}</small></span>
                <b className={styles.portLamp} />
              </button>
            );
          })}
          <div className={styles.patchLegend}>
            <span><i data-kind="accepted" /> LIVE</span>
            <span><i data-kind="pending" /> OPEN</span>
            <span><i data-kind="rejected" /> REJECTED</span>
          </div>
        </aside>
      </div>

      <div className={styles.provenanceRail}>
        <div><span>CORPUS</span><strong>{labCorpusAuthority.repository}</strong></div>
        <div><span>DOMAIN PATH</span><strong>{descriptor.domainSourcePath}</strong></div>
        <div><span>ATLAS FP</span><strong>{labCorpusAuthority.corpusFingerprint.slice(0, 12)}</strong></div>
        <div><span>RULE</span><strong>ACCEPTED MAPPING ≠ CLAIM VALIDATION</strong></div>
      </div>
    </section>
  );
}

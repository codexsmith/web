"use client";

import { useState } from "react";
import styles from "./GeneratedBoardCalibration.module.css";
import { labCorpusAuthority } from "./lab-corpus-atlas";
import { corpusDescriptorForLayer } from "./generated-domain-board";
import {
  calibrationCandidatesForLayer,
  calibrationDecisionsForLayer,
  setCalibrationDecision,
  type CalibrationDecision,
  type CalibrationDecisionMap,
} from "./domain-calibration";
import type { AtlasFiber, AtlasLayer } from "./atlas-space-model";

type GeneratedBoardCalibrationProps = {
  layer: AtlasLayer;
  fibers: AtlasFiber[];
  activeFiberId: string;
  onSelectFiber: (fiberId: string) => void;
};

export function GeneratedBoardCalibration({
  layer,
  fibers,
  activeFiberId,
  onSelectFiber,
}: GeneratedBoardCalibrationProps) {
  const descriptor = corpusDescriptorForLayer(layer.id);
  const candidates = calibrationCandidatesForLayer(layer.id);
  const [decisions, setDecisions] = useState<CalibrationDecisionMap>(() => ({ ...calibrationDecisionsForLayer(layer.id) }));
  const [activeCandidateId, setActiveCandidateId] = useState(candidates[0]?.fiberId ?? activeFiberId);

  if (!descriptor?.generated) return null;

  const activeCandidate = candidates.find((candidate) => candidate.fiberId === activeCandidateId);
  const reviewedCount = candidates.filter((candidate) => decisions[candidate.fiberId] && decisions[candidate.fiberId] !== "pending").length;
  const acceptedCount = candidates.filter((candidate) => decisions[candidate.fiberId] === "accepted").length;

  const decide = (fiberId: string, decision: CalibrationDecision) => {
    setCalibrationDecision(layer.id, fiberId, decision);
    setDecisions((existing) => ({ ...existing, [fiberId]: decision }));
    setActiveCandidateId(fiberId);
    onSelectFiber(fiberId);
  };

  return (
    <section className={styles.panel} aria-label={`${descriptor.domainLabel} generated board calibration`}>
      <header className={styles.header}>
        <div>
          <span>GENERATED BOARD / CALIBRATION BENCH</span>
          <h3>{descriptor.domainLabel}</h3>
          <p>Candidate ports are mined from reviewed corpus text. Acceptance means the local mapping is faithfully represented by the cited source; it does not validate the source theory itself.</p>
        </div>
        <div className={styles.identity}>
          <strong>{descriptor.domainCode}</strong>
          <small>{acceptedCount} LIVE / {reviewedCount} REVIEWED / {candidates.length} CANDIDATES</small>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.blankField}>
          <span className={styles.fieldLabel}>EVIDENCE REVIEW BAY</span>
          {activeCandidate ? (
            <div className={styles.evidenceCard}>
              <span>{activeCandidate.evidenceStrength.toUpperCase()} EVIDENCE / {activeCandidate.fiberId.toUpperCase()}</span>
              <strong>{activeCandidate.localLabel}</strong>
              <p>{activeCandidate.localNote}</p>
              <div className={styles.evidenceBlock}>
                <small>SOURCE EVIDENCE</small>
                <p>{activeCandidate.evidenceSummary}</p>
                <b>{activeCandidate.evidenceLocation}</b>
                <code>{activeCandidate.sourcePath}</code>
              </div>
              <div className={styles.decisionBank}>
                <button type="button" data-active={decisions[activeCandidate.fiberId] === "accepted"} onClick={() => decide(activeCandidate.fiberId, "accepted")}>ACCEPT TERMINATION</button>
                <button type="button" data-active={decisions[activeCandidate.fiberId] === "rejected"} onClick={() => decide(activeCandidate.fiberId, "rejected")}>REJECT MAPPING</button>
                <button type="button" data-active={!decisions[activeCandidate.fiberId] || decisions[activeCandidate.fiberId] === "pending"} onClick={() => decide(activeCandidate.fiberId, "pending")}>RETURN TO PENDING</button>
              </div>
              <small className={styles.reviewRule}>ACCEPTED MAPPING ≠ CLAIM VALIDATION</small>
            </div>
          ) : (
            <div className={styles.noCandidates}>
              <strong>NO CALIBRATION SET INSTALLED</strong>
              <p>This domain has corpus identity but no reviewed candidate mapping dataset yet.</p>
            </div>
          )}
          <div className={styles.registrationMarks} aria-hidden="true"><i /><i /><i /><i /></div>
        </div>

        <aside className={styles.portBay}>
          <span>CALIBRATION PORT BAY</span>
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
                <i />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{fiber.label}</strong>
                <small>
                  {!candidate
                    ? "NO EVIDENCE CANDIDATE"
                    : decision === "accepted"
                      ? "TERMINATED / LIVE"
                      : decision === "rejected"
                        ? "REJECTED / OPEN CIRCUIT"
                        : "PENDING REVIEW / UNTERMINATED"}
                </small>
              </button>
            );
          })}
        </aside>
      </div>

      <div className={styles.provenance}>
        <span>CORPUS SOURCE</span>
        <strong>{descriptor.domainSourcePath}</strong>
        <small>{labCorpusAuthority.repository} / {labCorpusAuthority.corpusFingerprint.slice(0, 12)}</small>
      </div>

      <footer className={styles.footer}>
        <span>FABRICATED IDENTITY ≠ CALIBRATED SEMANTICS</span>
        <strong>REVIEW → DISTINGUISH → MAP → TEST → TERMINATE</strong>
      </footer>
    </section>
  );
}

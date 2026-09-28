"use client";

import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { AppliedWorkSyntheticReviewSequence } from "../AppliedWorkSyntheticReviewSequence";
import { formatOrdinal } from "../institutionalFormat";
import { appliedWorkOutputs, systemsArchitectureReviewDemo } from "../content/appliedWork";
import styles from "../styles/AppliedWork.module.css";

const appliedWorkEvidenceOrder = ["synthetic-review", "deliverables"] as const;

function SyntheticReviewSummary() {
  return (
    <div
      className={styles.appliedWorkReflowSummary}
      data-applied-reflow-summary="synthetic-review"
    >
      <span className={styles.appliedWorkReflowEyebrow}>
        {systemsArchitectureReviewDemo.eyebrow}
      </span>
      <h2>See exactly what a Systems / Architecture Review is doing.</h2>
      <p>
        Start with the represented state, reconstruct the hidden lifecycle, then follow the
        defect to a bounded repair.
      </p>

      <div className={styles.appliedWorkReflowStatePreview} aria-hidden="true">
        <div>
          <small>VISIBLE</small>
          {systemsArchitectureReviewDemo.coarseStates.map((state) => (
            <strong key={state}>{state}</strong>
          ))}
        </div>
        <span>→</span>
        <div>
          <small>RECONSTRUCTED</small>
          {systemsArchitectureReviewDemo.reconstructedStates.slice(0, 4).map((state) => (
            <strong key={state}>{state}</strong>
          ))}
          <em>+{systemsArchitectureReviewDemo.reconstructedStates.length - 4} more</em>
        </div>
      </div>

      <span className={styles.appliedWorkReflowCue}>
        Select to inspect the review <span aria-hidden="true">→</span>
      </span>
    </div>
  );
}

function DeliverablesSummary() {
  return (
    <div
      className={styles.appliedWorkReflowSummary}
      data-applied-reflow-summary="deliverables"
    >
      <span className={styles.appliedWorkReflowEyebrow}>WHAT YOU SHOULD GET</span>
      <h2>The work should leave behind artifacts, not just conversation.</h2>
      <p>
        The exact package depends on the engagement, but the result should make the problem
        clearer, the decision easier, or the system more operable after BFL is gone.
      </p>

      <div className={styles.appliedWorkReflowArtifactPreview} aria-hidden="true">
        {appliedWorkOutputs.slice(0, 4).map((output) => (
          <strong key={output.title}>{output.title}</strong>
        ))}
        <span>+{appliedWorkOutputs.length - 4} more durable outputs</span>
      </div>

      <span className={styles.appliedWorkReflowCue}>
        Select to inspect the deliverables <span aria-hidden="true">→</span>
      </span>
    </div>
  );
}

export function AppliedWorkEvidenceReflow() {
  return (
    <section
      className={styles.appliedWorkEvidenceReflowSection}
      aria-label="Applied work review example and deliverables"
    >
      <ReflowField
        className={styles.appliedWorkEvidenceReflowGrid}
        ariaLabel="Choose the synthetic review example or engagement deliverables to inspect"
        layoutMode="split-focus"
        itemOrder={appliedWorkEvidenceOrder}
        animatePeers
      >
        <ReflowFieldItem
          id="synthetic-review"
          label="Synthetic Review Example"
          className={styles.appliedWorkReflowCard}
          dataTone="review"
          summary={<SyntheticReviewSummary />}
          detail={
            <div
              className={styles.appliedWorkReflowDetail}
              data-reflow-stop-toggle
            >
              <h2 className={styles.appliedWorkReflowDetailTitle}>
                See exactly what a Systems / Architecture Review is doing.
              </h2>
              <AppliedWorkSyntheticReviewSequence />
            </div>
          }
        />

        <ReflowFieldItem
          id="deliverables"
          label="What You Should Get"
          className={styles.appliedWorkReflowCard}
          dataTone="deliverables"
          summary={<DeliverablesSummary />}
          detail={
            <div
              className={styles.appliedWorkReflowDetail}
              data-reflow-stop-toggle
            >
              <h2 className={styles.appliedWorkReflowDetailTitle}>
                The work should leave behind artifacts, not just conversation.
              </h2>
              <div className={styles.appliedWorkReflowDetailLead}>
                <p>
                  The exact deliverables depend on the engagement, but the output should make the
                  problem clearer, the decision easier, or the system more operable after BFL is gone.
                </p>
              </div>

              <div className={styles.appliedOutputGrid}>
                {appliedWorkOutputs.map((output, index) => (
                  <article key={output.title}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{output.title}</strong>
                    <p>{output.description}</p>
                  </article>
                ))}
              </div>
            </div>
          }
        />
      </ReflowField>
    </section>
  );
}

"use client";

import styles from "./GeneratedBoardCalibration.module.css";
import { labCorpusAuthority } from "./lab-corpus-atlas";
import { corpusDescriptorForLayer } from "./generated-domain-board";
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
  if (!descriptor?.generated) return null;

  return (
    <section className={styles.panel} aria-label={`${descriptor.domainLabel} generated board calibration`}>
      <header className={styles.header}>
        <div>
          <span>GENERATED BOARD / UNCALIBRATED</span>
          <h3>{descriptor.domainLabel}</h3>
          <p>Hardware identity was fabricated from canonical corpus metadata. No semantic correspondence ports have been inferred.</p>
        </div>
        <div className={styles.identity}>
          <strong>{descriptor.domainCode}</strong>
          <small>{descriptor.familyCode} / {descriptor.familyLabel}</small>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.blankField}>
          <span className={styles.fieldLabel}>LOCAL CHART BAY</span>
          <strong>NO CALIBRATED CHART INSTALLED</strong>
          <p>A domain-local chart must be derived from reviewed corpus material before any local region, transition, or cross-atlas termination is asserted.</p>
          <div className={styles.registrationMarks} aria-hidden="true"><i /><i /><i /><i /></div>
        </div>

        <aside className={styles.portBay}>
          <span>PROVISIONAL PORT BAY</span>
          {fibers.map((fiber, index) => (
            <button
              key={fiber.id}
              type="button"
              aria-pressed={fiber.id === activeFiberId}
              className={fiber.id === activeFiberId ? styles.portActive : ""}
              onClick={() => onSelectFiber(fiber.id)}
            >
              <i />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{fiber.label}</strong>
              <small>UNTERMINATED / CALIBRATION REQUIRED</small>
            </button>
          ))}
        </aside>
      </div>

      <div className={styles.provenance}>
        <span>CORPUS SOURCE</span>
        <strong>{descriptor.domainSourcePath}</strong>
        <small>{labCorpusAuthority.repository} / {labCorpusAuthority.corpusFingerprint.slice(0, 12)}</small>
      </div>

      <footer className={styles.footer}>
        <span>FABRICATED IDENTITY ≠ CALIBRATED SEMANTICS</span>
        <strong>NEXT: REVIEW → DISTINGUISH → MAP → TEST → TERMINATE PORTS</strong>
      </footer>
    </section>
  );
}

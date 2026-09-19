import type { ReactNode } from "react";
import styles from "./visual-mathematics-workstation.module.css";

export function VisualMathSpecimenFrame({
  controls,
  chamber,
  telemetry,
  transport,
  inspection,
}: {
  controls: ReactNode;
  chamber: ReactNode;
  telemetry: ReactNode;
  transport?: ReactNode;
  inspection?: ReactNode;
}) {
  return (
    <div className={styles.specimenFrame}>
      <aside className={`${styles.panel} ${styles.controlsPanel}`} aria-label="Specimen controls">
        {controls}
      </aside>
      <section className={styles.chamberStack} aria-label="Specimen chamber">
        <div className={`${styles.panel} ${styles.chamber}`}>{chamber}</div>
        {transport ? <div className={`${styles.panel} ${styles.transport}`}>{transport}</div> : null}
      </section>
      <aside className={`${styles.panel} ${styles.telemetryPanel}`} aria-label="Specimen telemetry">
        {telemetry}
      </aside>
      {inspection ? <section className={`${styles.panel} ${styles.inspectionBay}`}>{inspection}</section> : null}
    </div>
  );
}

export function VisualMathPanelHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.panelHeading}>
      <div>
        <small>{eyebrow}</small>
        <strong>{title}</strong>
      </div>
      {action}
    </div>
  );
}

export function VisualMathMetric({ label, value, detail }: { label: string; value: ReactNode; detail?: ReactNode }) {
  return (
    <article className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <small>{detail}</small> : null}
    </article>
  );
}

export function VisualMathConstructionPath({
  stages,
  selectedStage,
  onSelect,
}: {
  stages: Array<{ id: string; label: string; operation?: string; detail: string }>;
  selectedStage?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <ol className={styles.constructionPath} aria-label="Representation construction path">
      {stages.map((stage, index) => (
        <li key={stage.id} data-selected={selectedStage === stage.id ? "true" : "false"}>
          <button type="button" disabled={!onSelect} onClick={() => onSelect?.(stage.id)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage.label}</strong>
            {stage.operation ? <em>{stage.operation}</em> : null}
          </button>
          {index < stages.length - 1 ? <i aria-hidden="true">→</i> : null}
        </li>
      ))}
    </ol>
  );
}

export function VisualMathRange({
  label,
  value,
  min,
  max,
  step,
  output,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  output?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.rangeField}>
      <span><b>{label}</b><output>{output ?? value}</output></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

import {
  Boxes,
  CircleDot,
  Database,
  FileJson2,
  Files,
  Grid3X3,
  Info,
  Network,
  type LucideIcon,
} from "lucide-react";
import styles from "./styles/LabSnapshotRow.module.css";

export type LabSnapshotIcon =
  | "files"
  | "storage"
  | "surfaces"
  | "active"
  | "classes"
  | "machine"
  | "semantic";

export type LabSnapshotMetric = {
  value: string;
  label: string;
  icon: LabSnapshotIcon;
  detail?: string;
};

export type LabSnapshotRowProps = {
  label?: string;
  status?: string;
  metrics: readonly LabSnapshotMetric[];
  updated?: string;
  note?: string;
  ariaLabel?: string;
};

const icons: Record<LabSnapshotIcon, LucideIcon> = {
  files: Files,
  storage: Database,
  surfaces: Grid3X3,
  active: CircleDot,
  classes: Boxes,
  machine: FileJson2,
  semantic: Network,
};

export function LabSnapshotRow({
  label = "Lab snapshot",
  status,
  metrics,
  updated,
  note,
  ariaLabel = "Boundary First Labs snapshot",
}: LabSnapshotRowProps) {
  return (
    <section className={styles.snapshot} aria-label={ariaLabel}>
      <div className={styles.identity}>
        <span className={styles.label}>{label}</span>
        {status ? <span className={styles.status}>{status}</span> : null}
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.metrics}>
        {metrics.map((metric) => {
          const Icon = icons[metric.icon];

          return (
            <div
              className={styles.pill}
              key={`${metric.value}-${metric.label}`}
              title={metric.detail}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <strong>{metric.value}</strong>
              {metric.label ? <span>{metric.label}</span> : null}
            </div>
          );
        })}
      </div>

      {(updated || note) ? (
        <>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.meta}>
            {updated ? (
              <span className={styles.updated}>
                <small>Updated</small>
                <strong>{updated}</strong>
              </span>
            ) : null}
            {note ? (
              <span className={styles.info} title={note} aria-label={note}>
                <Info aria-hidden="true" />
              </span>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}

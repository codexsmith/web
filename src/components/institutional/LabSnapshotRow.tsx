"use client";

import { useId, useState } from "react";
import {
  Boxes,
  ChevronDown,
  CircleDot,
  Database,
  FileJson2,
  Files,
  Grid3X3,
  Info,
  Network,
  X,
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

export type LabSnapshotBreakdownItem = {
  value: string;
  label: string;
  detail?: string;
  code?: string;
  tags?: readonly string[];
};

export type LabSnapshotBreakdown = {
  title: string;
  intro: string;
  items: readonly LabSnapshotBreakdownItem[];
  variant?: "grid" | "flow" | "single-row" | "split-tags" | "corpus-split" | "taxonomy";
  note?: string;
  source?: string;
};

export type LabSnapshotMetric = {
  id: string;
  value: string;
  label: string;
  icon: LabSnapshotIcon;
  detail?: string;
  breakdown?: LabSnapshotBreakdown;
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
  const [openMetricId, setOpenMetricId] = useState<string | null>(null);
  const panelId = useId();
  const openMetric = metrics.find((metric) => metric.id === openMetricId);
  const breakdown = openMetric?.breakdown;

  return (
    <section
      className={styles.snapshot}
      aria-label={ariaLabel}
      data-expanded={breakdown ? "true" : "false"}
    >
      <div className={styles.snapshotRow}>
        <div className={styles.identity}>
          <span className={styles.label}>{label}</span>
          {status ? <span className={styles.status}>{status}</span> : null}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.metrics}>
          {metrics.map((metric) => {
            const Icon = icons[metric.icon];
            const expandable = Boolean(metric.breakdown);
            const expanded = openMetricId === metric.id;
            const contents = (
              <>
                <Icon className={styles.icon} aria-hidden="true" />
                <strong>{metric.value}</strong>
                {metric.label ? <span>{metric.label}</span> : null}
                {expandable ? (
                  <ChevronDown className={styles.chevron} aria-hidden="true" />
                ) : null}
              </>
            );

            return expandable ? (
              <button
                type="button"
                className={styles.pill}
                data-expandable="true"
                data-expanded={expanded ? "true" : "false"}
                key={metric.id}
                title={metric.detail}
                aria-expanded={expanded}
                aria-controls={`${panelId}-breakdown`}
                onClick={() => setOpenMetricId(expanded ? null : metric.id)}
              >
                {contents}
              </button>
            ) : (
              <div
                className={styles.pill}
                key={metric.id}
                title={metric.detail}
              >
                {contents}
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
      </div>

      {breakdown && openMetric ? (
        <div
          className={styles.breakdownPanel}
          id={`${panelId}-breakdown`}
          data-variant={breakdown.variant ?? "grid"}
          aria-live="polite"
        >
          <header className={styles.breakdownHeader}>
            <div>
              <span>SNAPSHOT BREAKDOWN · {openMetric.value} {openMetric.label}</span>
              <h3>{breakdown.title}</h3>
              <p>{breakdown.intro}</p>
            </div>
            <button
              type="button"
              className={styles.closeBreakdown}
              aria-label={`Close ${openMetric.label} breakdown`}
              onClick={() => setOpenMetricId(null)}
            >
              <X aria-hidden="true" />
            </button>
          </header>

          <div className={styles.breakdownGrid}>
            {breakdown.items.map((item) => (
              <article className={styles.breakdownItem} key={item.label}>
                <strong>{item.value}</strong>
                <div>
                  <span>{item.label}</span>
                  {item.detail ? <p>{item.detail}</p> : null}
                  {item.tags?.length ? (
                    <div className={styles.breakdownTags} aria-label={`${item.label} examples`}>
                      {item.tags.map((tag) => (
                        <span className={styles.breakdownTag} key={tag}>{tag}</span>
                      ))}
                    </div>
                  ) : null}
                  {item.code ? <code>{item.code}</code> : null}
                </div>
              </article>
            ))}
          </div>

          {(breakdown.note || breakdown.source) ? (
            <footer className={styles.breakdownFooter}>
              {breakdown.note ? <p>{breakdown.note}</p> : null}
              {breakdown.source ? <span>{breakdown.source}</span> : null}
            </footer>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

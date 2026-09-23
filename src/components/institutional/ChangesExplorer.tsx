"use client";

import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { recentChanges, type PublicChange } from "./content/changes";
import styles from "./styles/TemporalReflow.module.css";

function ChangeSummary({ change }: { change: PublicChange }) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTopline}>
        <span>{change.scope}</span>
        <small>{change.date}</small>
      </div>
      <h2>{change.title}</h2>
      <p className={styles.summaryDescription}>{change.consequence}</p>
      <strong className={styles.inspectCue}>
        Inspect delta <span aria-hidden="true">↗</span>
      </strong>
    </div>
  );
}

function ChangeDetail({ change }: { change: PublicChange }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detailGrid}>
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>CHANGE SUMMARY</span>
          <p>{change.summary}</p>
        </div>
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>REPOSITORY</span>
          <strong>{change.sourceRepository}</strong>
        </div>
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>REVISION</span>
          <strong>{change.sourceRevision}</strong>
        </div>
      </div>

      <div className={styles.detailLinks}>
        <a href={change.sourceHref} target="_blank" rel="noreferrer">
          Inspect source revision <span aria-hidden="true">→</span>
        </a>
        {change.surfaceHref ? (
          <Link href={change.surfaceHref}>
            Open affected surface <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function ChangesExplorer() {
  const itemOrder = recentChanges.map((change) => change.id);

  return (
    <ReflowField
      className={styles.field}
      ariaLabel="Recent material changes to Boundary First Labs"
      layoutMode="focus-stage"
      itemOrder={itemOrder}
      restLayout="rectangle"
    >
      {recentChanges.map((change) => (
        <ReflowFieldItem
          id={change.id}
          label={change.title}
          className={styles.item}
          dataTone={change.scope}
          key={change.id}
          summary={<ChangeSummary change={change} />}
          detail={<ChangeDetail change={change} />}
        />
      ))}
    </ReflowField>
  );
}

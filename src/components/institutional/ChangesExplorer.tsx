"use client";

import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import {
  historicalChanges,
  recentChanges,
  type PublicChange,
} from "./content/changes";
import styles from "./styles/TemporalReflow.module.css";

function ChangeSummary({ change }: { change: PublicChange }) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTopline}>
        <span>{change.scope}</span>
        <small>{change.date} · {change.sourceRevision.slice(0, 7)}</small>
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
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>SOURCE COMMIT</span>
          <strong>{change.sourceLabel}</strong>
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
          Inspect source commit <span aria-hidden="true">→</span>
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

function ChangeField({
  changes,
  ariaLabel,
}: {
  changes: readonly PublicChange[];
  ariaLabel: string;
}) {
  return (
    <ReflowField
      className={styles.field}
      ariaLabel={ariaLabel}
      layoutMode="focus-stage"
      itemOrder={changes.map((change) => change.id)}
      restLayout="rectangle"
    >
      {changes.map((change) => (
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

export function ChangesExplorer() {
  return (
    <div className={styles.archive}>
      <section className={styles.archiveGroup} aria-labelledby="changes-current-window">
        <header className={styles.archiveHeader}>
          <span>CURRENT WINDOW</span>
          <strong id="changes-current-window">Canonical changes from the latest repository state.</strong>
          <p>
            These are recent material transitions selected from current main in the Lab and
            web repositories. The compact Home and Now surfaces draw from this same window.
          </p>
        </header>
        <ChangeField
          changes={recentChanges}
          ariaLabel="Current material changes to Boundary First Labs"
        />
      </section>

      <section className={styles.archiveGroup} aria-labelledby="changes-earlier-milestones">
        <header className={styles.archiveHeader}>
          <span>EARLIER MILESTONES</span>
          <strong id="changes-earlier-milestones">Backfilled from canonical GitHub history.</strong>
          <p>
            Earlier merges are included when they created a durable research object,
            institutional capability, public surface, canonical route, or provenance boundary.
            This remains a curated state-transition archive, not a mirror of the commit log.
          </p>
        </header>
        <ChangeField
          changes={historicalChanges}
          ariaLabel="Earlier material changes to Boundary First Labs"
        />
      </section>
    </div>
  );
}

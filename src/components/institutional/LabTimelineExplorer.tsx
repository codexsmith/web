"use client";

import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { labTimelineEvents, type PublicTimelineEvent } from "./content/publicState";
import styles from "./styles/TemporalReflow.module.css";

function EventSummary({ event }: { event: PublicTimelineEvent }) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTopline}>
        <span>{event.category}</span>
        <small>{event.period}</small>
      </div>
      <h2>{event.title}</h2>
      <p className={styles.summaryDescription}>{event.summary}</p>
      <strong className={styles.inspectCue}>
        Inspect milestone <span aria-hidden="true">↗</span>
      </strong>
    </div>
  );
}

function EventDetail({ event }: { event: PublicTimelineEvent }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detailGrid}>
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>DURABLE EVENT</span>
          <strong>{event.id}</strong>
        </div>
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>SOURCE EVENT</span>
          <strong>{event.sourceEventId}</strong>
        </div>
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>EVIDENCE POSTURE</span>
          <strong>{event.epistemicStatus}</strong>
        </div>
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>AFFECTED SYSTEMS</span>
          <strong>{event.affectedSystems.join(" · ")}</strong>
        </div>
      </div>

      {event.unresolved ? (
        <div className={styles.detailOpen}>
          <span className={styles.detailLabel}>OPEN PROVENANCE</span>
          <p>{event.unresolved}</p>
        </div>
      ) : null}
    </div>
  );
}

export function LabTimelineExplorer() {
  const itemOrder = labTimelineEvents.map((event) => event.id);

  return (
    <ReflowField
      className={styles.field}
      ariaLabel="Boundary First Labs historical milestones"
      layoutMode="focus-stage"
      itemOrder={itemOrder}
      restLayout="rectangle"
    >
      {labTimelineEvents.map((event) => (
        <ReflowFieldItem
          id={event.id}
          label={event.title}
          className={styles.item}
          dataTone={event.category}
          key={event.id}
          summary={<EventSummary event={event} />}
          detail={<EventDetail event={event} />}
        />
      ))}
    </ReflowField>
  );
}

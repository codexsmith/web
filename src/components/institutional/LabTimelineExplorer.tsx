"use client";

import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { labTimelineEvents, type PublicTimelineEvent } from "./content/publicState";
import styles from "./styles/TemporalReflow.module.css";

const eventNarratives: Record<string, { before: string; after: string }> = {
  "EVENT-TIMELINE-001": {
    before:
      "The fascination of watching a ball curve in flight.",
    after:
      "That curiosity became a concrete Magnus-effect experiment: a physical question turned into something that could be modeled, built, observed, and tested.",
  },
  "EVENT-TIMELINE-002": {
    before:
      "Software delivery existed, but process and state were not yet represented as explicit method objects in the admitted lineage.",
    after:
      "Documented process-first design artifacts made workflow, representation, and system behavior things to design directly rather than leave implicit in code.",
  },
  "EVENT-TIMELINE-003": {
    before:
      "Agile was part of practical software delivery and consulting work.",
    after:
      "It became an explicit delivery architecture for sequencing work, feedback, inspection, and closure in the founder's method lineage.",
  },
  "EVENT-TIMELINE-004": {
    before:
      "Independent research already existed as accumulated work, but not as a dedicated laboratory environment.",
    after:
      "By 2019–2021 it had a room-scale physical workbench that made sustained research more persistent, organized, and separable from ordinary software work.",
  },
  "EVENT-TIMELINE-005": {
    before:
      "Research, software, experiments, methods, and product ideas existed as accumulated founder work across projects and repositories.",
    after:
      "Boundary First Labs gave that body of work an explicit institutional identity with durable research lanes, registries, operating machinery, products, publications, and a public accountability surface.",
  },
};

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
        See before / after <span aria-hidden="true">↗</span>
      </strong>
    </div>
  );
}

function EventDetail({ event }: { event: PublicTimelineEvent }) {
  const narrative = eventNarratives[event.id] ?? {
    before: event.summary,
    after: "This milestone became part of the durable institutional timeline.",
  };

  return (
    <div className={[styles.detail, styles.timelineDetail].join(" ")}>
      <div className={styles.timelineDetailTopline}>
        <span>{event.category}</span>
        <small>{event.period}</small>
      </div>
      <h2>{event.title}</h2>
      <p className={styles.timelineNarrative}>
        <strong>Before:</strong> {narrative.before}{" "}
        <strong>After:</strong> {narrative.after}
      </p>
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

"use client";

import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { nowPriorityLanes } from "./content/now";
import styles from "./styles/TemporalReflow.module.css";

type Lane = (typeof nowPriorityLanes)[number];

function LaneSummary({ lane }: { lane: Lane }) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTopline}>
        <span>{lane.status}</span>
        <small>LANE {lane.code}</small>
      </div>
      <h2>{lane.title}</h2>
      <p className={styles.summaryDescription}>{lane.description}</p>
      <strong className={styles.inspectCue}>
        Inspect lane <span aria-hidden="true">↗</span>
      </strong>
    </div>
  );
}

function LaneDetail({ lane }: { lane: Lane }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detailGrid}>
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>WORK IN THIS LANE</span>
          <ul>
            {lane.work.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className={[styles.detailBlock, styles.detailWide].join(" ")}>
          <span className={styles.detailLabel}>CLOSURE CONDITION</span>
          <p>{lane.closure}</p>
        </div>
      </div>
    </div>
  );
}

export function NowPriorityExplorer() {
  const itemOrder = nowPriorityLanes.map((lane) => lane.code);

  return (
    <ReflowField
      className={styles.field}
      ariaLabel="Current Boundary First Labs priority lanes"
      layoutMode="focus-stage"
      itemOrder={itemOrder}
      restLayout="rectangle"
    >
      {nowPriorityLanes.map((lane) => (
        <ReflowFieldItem
          id={lane.code}
          label={lane.title}
          className={styles.item}
          dataTone={lane.tone}
          key={lane.code}
          summary={<LaneSummary lane={lane} />}
          detail={<LaneDetail lane={lane} />}
        />
      ))}
    </ReflowField>
  );
}

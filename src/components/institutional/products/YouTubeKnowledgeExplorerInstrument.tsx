"use client";

import { useMemo, useState } from "react";
import {
  explorerModes,
  type ExplorerModeId,
} from "../content/youtubeKnowledgeExplorer";
import styles from "../styles/YouTubeKnowledgeExplorer.module.css";

const segments = [
  {
    id: "seg-01",
    time: "06:18",
    title: "Start with the source",
    text: "A long video becomes easier to use when the source identity, timestamps, and transcript stay together.",
    concepts: ["source", "provenance"],
  },
  {
    id: "seg-02",
    time: "18:42",
    title: "Structure without replacement",
    text: "An outline should make the source easier to navigate without pretending the outline is the source itself.",
    concepts: ["outline", "navigation"],
  },
  {
    id: "seg-03",
    time: "34:12",
    title: "Search should return evidence",
    text: "Search should return a matching transcript segment and a timestamp, not merely a detached answer.",
    concepts: ["search", "evidence", "timestamp"],
  },
  {
    id: "seg-04",
    time: "41:08",
    title: "Concepts remain linked",
    text: "Concepts can organize recurring ideas so long as each concept keeps its connection to supporting segments.",
    concepts: ["concepts", "evidence"],
  },
  {
    id: "seg-05",
    time: "58:27",
    title: "Answers need admissibility",
    text: "An answered claim should cite evidence that actually exists in the currently loaded exploration.",
    concepts: ["answers", "admissibility"],
  },
];

const modeSegments: Record<ExplorerModeId, string[]> = {
  outline: ["seg-01", "seg-02", "seg-03", "seg-04", "seg-05"],
  search: ["seg-03", "seg-04"],
  concepts: ["seg-01", "seg-03", "seg-04", "seg-05"],
  ask: ["seg-03", "seg-05"],
  trace: ["seg-01", "seg-03", "seg-05"],
};

export function YouTubeKnowledgeExplorerInstrument() {
  const [activeMode, setActiveMode] = useState<ExplorerModeId>("search");
  const [activeSegmentId, setActiveSegmentId] = useState("seg-03");

  const mode = explorerModes.find((item) => item.id === activeMode) ?? explorerModes[0];
  const activeIds = useMemo(() => new Set(modeSegments[activeMode]), [activeMode]);
  const activeSegment = segments.find((item) => item.id === activeSegmentId) ?? segments[0];

  function chooseMode(modeId: ExplorerModeId) {
    setActiveMode(modeId);
    const first = modeSegments[modeId][0];
    if (first) setActiveSegmentId(first);
  }

  return (
    <div className={styles.explorerInstrument}>
      <div className={styles.explorerInstrumentTopline}>
        <div>
          <span>ILLUSTRATIVE SOURCE · 1:07:14</span>
          <strong>One long video. Multiple lawful projections.</strong>
        </div>
        <span className={styles.explorerInstrumentLamp} aria-hidden="true" />
      </div>

      <div className={styles.explorerModeControls} aria-label="YouTube Knowledge Explorer modes">
        {explorerModes.map((item) => (
          <button
            aria-pressed={item.id === activeMode}
            key={item.id}
            onClick={() => chooseMode(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.explorerStage}>
        <div className={styles.explorerSource}>
          <div className={styles.explorerVideo}>
            <div className={styles.explorerVideoMark} aria-hidden="true">
              <span>▶</span>
            </div>

            <div className={styles.explorerVideoCopy}>
              <small>SYNTHETIC PRODUCT DEMO</small>
              <strong>Making a long source navigable without losing the source</strong>
              <span>{activeSegment.time} · {activeSegment.title}</span>
            </div>

            <div className={styles.explorerTimeline} aria-label="Illustrative source timeline">
              <i />
              {segments.map((segment, index) => (
                <button
                  aria-label={`Jump to ${segment.time}: ${segment.title}`}
                  aria-pressed={segment.id === activeSegmentId}
                  key={segment.id}
                  onClick={() => setActiveSegmentId(segment.id)}
                  style={{ left: `${10 + index * 19}%` }}
                  type="button"
                >
                  <span>{segment.time}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.explorerTranscript}>
            <div className={styles.explorerTranscriptHeader}>
              <span>TIMESTAMPED EVIDENCE</span>
              <strong>{segments.length} demo segments</strong>
            </div>

            <div className={styles.explorerTranscriptList}>
              {segments.map((segment) => (
                <button
                  className={[
                    activeIds.has(segment.id) ? styles.explorerSegmentRelevant : "",
                    segment.id === activeSegmentId ? styles.explorerSegmentSelected : "",
                  ].filter(Boolean).join(" ")}
                  key={segment.id}
                  onClick={() => setActiveSegmentId(segment.id)}
                  type="button"
                >
                  <span>{segment.time}</span>
                  <p>{segment.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.explorerReadout}>
          <p>{mode.kicker}</p>
          <h2>{mode.title}</h2>
          <span>{mode.description}</span>

          {activeMode === "outline" ? (
            <ol className={styles.explorerMiniOutline}>
              {segments.map((segment, index) => (
                <li key={segment.id}>
                  <span>0{index + 1}</span>
                  <button onClick={() => setActiveSegmentId(segment.id)} type="button">
                    {segment.title}
                  </button>
                </li>
              ))}
            </ol>
          ) : null}

          {activeMode === "search" ? (
            <div className={styles.explorerSearchDemo}>
              <span>SEARCH</span>
              <strong>evidence + source</strong>
              <small>2 matching transcript moments</small>
            </div>
          ) : null}

          {activeMode === "concepts" ? (
            <div className={styles.explorerConceptDemo}>
              {["source", "evidence", "timestamp", "concepts", "admissibility"].map((concept) => (
                <span key={concept}>{concept}</span>
              ))}
            </div>
          ) : null}

          {activeMode === "ask" ? (
            <div className={styles.explorerAnswerDemo}>
              <span>ANSWER FROM SOURCE EVIDENCE</span>
              <p>
                The source argues that navigation layers should preserve direct references back to timestamped transcript evidence.
              </p>
              <div>
                <button onClick={() => setActiveSegmentId("seg-03")} type="button">Evidence 34:12</button>
                <button onClick={() => setActiveSegmentId("seg-05")} type="button">Evidence 58:27</button>
              </div>
            </div>
          ) : null}

          {activeMode === "trace" ? (
            <div className={styles.explorerTraceDemo}>
              <span>VIDEO</span><i>→</i>
              <span>TRANSCRIPT</span><i>→</i>
              <span>SEGMENT</span><i>→</i>
              <span>CLAIM</span><i>→</i>
              <span>TIMESTAMP</span>
            </div>
          ) : null}

          <blockquote>{mode.question}</blockquote>
          <small>
            Synthetic demonstration only. No external video, creator, or factual source claim is represented here.
          </small>
        </aside>
      </div>
    </div>
  );
}

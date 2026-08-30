"use client";

import { useMemo, useState } from "react";
import timelineSource from "@/content/lab-machine-timeline.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-timeline.css";

export type TimelineProjectionMode =
  | "institutional-timeline"
  | "lineage"
  | "state-reconstruction"
  | "convergence-map";

const timelineProjectionModes: TimelineProjectionMode[] = [
  "institutional-timeline",
  "lineage",
  "state-reconstruction",
  "convergence-map",
];

export function isTimelineProjectionMode(value: string): value is TimelineProjectionMode {
  return timelineProjectionModes.includes(value as TimelineProjectionMode);
}

type TimelineTrack = {
  id: string;
  label: string;
  description: string;
  coverage: "seeded" | "pending";
};

type TimelineSnapshot = {
  id: string;
  label: string;
  shortLabel: string;
  cutoff: number;
  note: string;
};

type TimelineEvent = {
  id: string;
  track: string;
  relatedTracks: string[];
  snapshotId: string;
  sortKey: number;
  date: string;
  title: string;
  summary: string;
  consequence: string;
  status: string;
  evidence: string[];
  sourceRef: string;
  lineage: string[];
};

type TimelineData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  provenanceNote: string;
  tracks: TimelineTrack[];
  snapshots: TimelineSnapshot[];
  lineages: Array<{ id: string; label: string }>;
  events: TimelineEvent[];
};

const timeline = timelineSource as TimelineData;

const modeLabels: Record<TimelineProjectionMode, { label: string; description: string }> = {
  "institutional-timeline": {
    label: "Whole Lab",
    description: "Parallel institutional tracks showing how research, method, theory, publication, people, and infrastructure co-develop.",
  },
  lineage: {
    label: "Idea Lineage",
    description: "Follow one conceptual lineage across subsystem boundaries instead of reading chronology as a single list.",
  },
  "state-reconstruction": {
    label: "Lab at Time T",
    description: "Reconstruct the latest known state of each institutional track at a selected checkpoint.",
  },
  "convergence-map": {
    label: "Convergences",
    description: "Show events that join previously separate tracks or force a transfer between institutional subsystems.",
  },
};

export function LabMachineTimelineProjection({
  initialMode = "institutional-timeline",
  onBack,
  onClose,
}: {
  initialMode?: TimelineProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<TimelineProjectionMode>(initialMode);
  const [snapshotIndex, setSnapshotIndex] = useState(timeline.snapshots.length - 1);
  const [trackFilter, setTrackFilter] = useState("all");
  const [lineageFilter, setLineageFilter] = useState(timeline.lineages[0]?.id ?? "all");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const snapshot = timeline.snapshots[snapshotIndex];
  const snapshotIndexById = useMemo(
    () => new Map(timeline.snapshots.map((item, index) => [item.id, index])),
    [],
  );

  const eventsAtSnapshot = useMemo(() => {
    let events = timeline.events.filter((event) => event.sortKey <= snapshot.cutoff);

    if (trackFilter !== "all") {
      events = events.filter(
        (event) => event.track === trackFilter || event.relatedTracks.includes(trackFilter),
      );
    }

    if (mode === "lineage") {
      events = events.filter((event) => event.lineage.includes(lineageFilter));
    }

    if (mode === "convergence-map") {
      events = events.filter((event) => event.relatedTracks.length > 0);
    }

    if (mode === "state-reconstruction") {
      const latestByTrack = new Map<string, TimelineEvent>();
      for (const event of events) {
        const existing = latestByTrack.get(event.track);
        if (!existing || event.sortKey > existing.sortKey) latestByTrack.set(event.track, event);
      }
      events = [...latestByTrack.values()];
    }

    return events;
  }, [lineageFilter, mode, snapshot.cutoff, trackFilter]);

  const visibleEventIds = new Set(eventsAtSnapshot.map((event) => event.id));
  const selectedEvent = timeline.events.find((event) => event.id === selectedEventId && visibleEventIds.has(event.id)) ?? null;
  const activeTracks = new Set(eventsAtSnapshot.flatMap((event) => [event.track, ...event.relatedTracks]));

  return (
    <LabMachineProjectionShell
      subsystem="Timeline"
      projection={modeLabels[mode].label}
      eyebrow="TEMPORAL PROJECTION · INSTITUTIONAL STATE"
      title="The Lab Through Time"
      description={modeLabels[mode].description}
      status={`${eventsAtSnapshot.length} EVENTS · ${activeTracks.size} ACTIVE TRACKS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-timeline">
        <section className="bf-timeline__controls" aria-label="Timeline projection controls">
          <div className="bf-timeline__mode-bank">
            <small>PROJECTION MODE</small>
            <div>
              {timelineProjectionModes.map((candidate) => (
                <button
                  type="button"
                  key={candidate}
                  aria-pressed={mode === candidate}
                  onClick={() => {
                    setMode(candidate);
                    setSelectedEventId(null);
                  }}
                >
                  {modeLabels[candidate].label}
                </button>
              ))}
            </div>
          </div>

          <div className="bf-timeline__snapshot-control">
            <div>
              <small>STATE CHECKPOINT</small>
              <strong>{snapshot.label}</strong>
              <span>{snapshot.note}</span>
            </div>
            <input
              type="range"
              min={0}
              max={timeline.snapshots.length - 1}
              step={1}
              value={snapshotIndex}
              aria-label="Timeline state checkpoint"
              onChange={(event) => {
                setSnapshotIndex(Number(event.target.value));
                setSelectedEventId(null);
              }}
            />
            <div className="bf-timeline__ticks" aria-hidden="true">
              {timeline.snapshots.map((item, index) => (
                <span key={item.id} data-current={index === snapshotIndex ? "true" : "false"}>{item.shortLabel}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="bf-timeline__filters" aria-label="Timeline filters">
          <div>
            <small>TRACK</small>
            <button type="button" aria-pressed={trackFilter === "all"} onClick={() => setTrackFilter("all")}>ALL</button>
            {timeline.tracks.map((track) => (
              <button
                type="button"
                key={track.id}
                aria-pressed={trackFilter === track.id}
                data-coverage={track.coverage}
                onClick={() => setTrackFilter(track.id)}
              >
                {track.label}
              </button>
            ))}
          </div>

          {mode === "lineage" ? (
            <div>
              <small>LINEAGE</small>
              {timeline.lineages.map((lineage) => (
                <button
                  type="button"
                  key={lineage.id}
                  aria-pressed={lineageFilter === lineage.id}
                  onClick={() => setLineageFilter(lineage.id)}
                >
                  {lineage.label}
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <section className="bf-timeline__state-readout" aria-label="Institutional state reconstruction">
          <div><small>TIME</small><strong>{snapshot.label}</strong></div>
          <div><small>VISIBLE EVENTS</small><strong>{eventsAtSnapshot.length}</strong></div>
          <div><small>ACTIVE TRACKS</small><strong>{activeTracks.size}</strong></div>
          <p>{timeline.provenanceNote}</p>
        </section>

        <div className="bf-timeline__viewport">
          <div className="bf-timeline__axis" aria-hidden="true">
            <span />
            {timeline.snapshots.map((item, index) => (
              <strong key={item.id} data-future={index > snapshotIndex ? "true" : "false"}>{item.shortLabel}</strong>
            ))}
          </div>

          {timeline.tracks.map((track) => {
            const trackEvents = eventsAtSnapshot.filter((event) => event.track === track.id);
            const trackVisible = trackFilter === "all" || trackFilter === track.id || trackEvents.length > 0;
            if (!trackVisible) return null;

            return (
              <section className="bf-timeline__lane" key={track.id} data-coverage={track.coverage}>
                <header>
                  <span>{track.coverage === "pending" ? "○" : "●"}</span>
                  <strong>{track.label}</strong>
                  <small>{track.description}</small>
                </header>
                <div className="bf-timeline__lane-grid">
                  {timeline.snapshots.map((item, index) => <i key={item.id} data-future={index > snapshotIndex ? "true" : "false"} />)}
                  {trackEvents.map((event) => {
                    const column = (snapshotIndexById.get(event.snapshotId) ?? 0) + 1;
                    return (
                      <button
                        type="button"
                        key={event.id}
                        className="bf-timeline-event"
                        data-selected={selectedEventId === event.id ? "true" : "false"}
                        data-convergence={event.relatedTracks.length ? "true" : "false"}
                        style={{ gridColumn: column }}
                        onClick={() => setSelectedEventId(event.id)}
                      >
                        <small>{event.date}</small>
                        <strong>{event.title}</strong>
                        {event.relatedTracks.length ? <span>{event.relatedTracks.length} CROSS-LINK{event.relatedTracks.length > 1 ? "S" : ""}</span> : null}
                      </button>
                    );
                  })}
                  {trackEvents.length === 0 ? (
                    <p>{track.coverage === "pending" ? "Chronology not yet imported for this track." : "No event is visible under the current projection."}</p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="bf-timeline__inspection" aria-live="polite">
          {selectedEvent ? (
            <>
              <header>
                <div><small>INSPECT EVENT</small><strong>{selectedEvent.date}</strong></div>
                <button type="button" onClick={() => setSelectedEventId(null)}>CLEAR</button>
              </header>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.summary}</p>
              <dl>
                <div><dt>CONSEQUENCE</dt><dd>{selectedEvent.consequence}</dd></div>
                <div><dt>STATUS</dt><dd>{selectedEvent.status}</dd></div>
                <div><dt>EVIDENCE</dt><dd>{selectedEvent.evidence.join(" · ")}</dd></div>
                <div><dt>SOURCE</dt><dd>{selectedEvent.sourceRef}</dd></div>
                <div><dt>RELATED TRACKS</dt><dd>{selectedEvent.relatedTracks.length ? selectedEvent.relatedTracks.join(" · ") : "none recorded"}</dd></div>
              </dl>
            </>
          ) : (
            <>
              <small>THROUGH · EVENT INSPECTION</small>
              <h3>Select a milestone.</h3>
              <p>Events retain their status, evidence class, source reference, and cross-track consequences instead of becoming a smooth retrospective story.</p>
            </>
          )}
        </aside>
      </div>
    </LabMachineProjectionShell>
  );
}

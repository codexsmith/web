"use client";

import { useMemo, useState } from "react";
import { HopfFiberCanvas, HOPF_FIBER_SAMPLES, HOPF_MAX_FIBERS } from "./HopfFiberCanvas";
import { getVisualMathSpecimen } from "./specimen-definitions";
import { buildVisualMathRecord, saveVisualMathRecord } from "./recording";
import type { VisualMathCommand } from "./specimen-types";
import {
  VisualMathConstructionPath,
  VisualMathMetric,
  VisualMathPanelHeading,
  VisualMathRange,
  VisualMathSpecimenFrame,
} from "./VisualMathSpecimenFrame";
import styles from "./visual-mathematics-workstation.module.css";

const definition = getVisualMathSpecimen("hopf");

export function HopfSpecimen({ active, command }: { active: boolean; command: VisualMathCommand }) {
  const [playing, setPlaying] = useState(true);
  const [phase, setPhase] = useState(0.18);
  const [fiberPhase, setFiberPhase] = useState(0);
  const [cameraOffset, setCameraOffset] = useState(0);
  const [fiberLimit, setFiberLimit] = useState(HOPF_MAX_FIBERS);
  const [selectedStage, setSelectedStage] = useState("fiber");
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");

  const stateUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("specimen", "hopf");
    url.searchParams.set("hopf_phase", phase.toFixed(3));
    url.searchParams.set("hopf_fiber_phase", fiberPhase.toFixed(3));
    url.searchParams.set("hopf_camera", String(cameraOffset));
    url.searchParams.set("hopf_fibers", String(fiberLimit));
    url.searchParams.set("hopf_play", playing ? "1" : "0");
    return url.toString();
  };

  const preview = useMemo(() => ({
    schema_version: "bfl_visual_math_record_v0.1",
    specimen_id: definition.id,
    specimen_version: definition.version,
    claim_status: definition.status,
    implementation: definition.implementation,
    state: {
      base_space: "S2",
      fiber: "S1",
      total_space: "S3",
      fiber_phase_turns: Number(fiberPhase.toFixed(3)),
      sampled_fibers: fiberLimit,
      samples_per_fiber: HOPF_FIBER_SAMPLES,
    },
    presentation: {
      animation: playing,
      manual_phase_turns: Number(phase.toFixed(3)),
      camera_offset_deg: cameraOffset,
      visible_projection: "stereographic -> R3",
    },
    provenance: definition.provenance,
  }), [cameraOffset, fiberLimit, fiberPhase, phase, playing]);

  const reset = () => {
    setPlaying(true);
    setPhase(0.18);
    setFiberPhase(0);
    setCameraOffset(0);
    setFiberLimit(HOPF_MAX_FIBERS);
    setSelectedStage("fiber");
    setNotice("");
  };

  const saveRecord = () => {
    const record = buildVisualMathRecord({
      definition,
      state: preview.state,
      presentation: preview.presentation,
      stateUrl: stateUrl(),
      note: note.trim(),
    });
    saveVisualMathRecord(record);
    setNotice(`Recorded ${record.specimen_id} at ${new Date(record.captured_at).toLocaleTimeString()}.`);
  };

  const copyStateLink = async () => {
    try {
      await window.navigator.clipboard.writeText(stateUrl());
      setNotice("Hopf specimen state link copied.");
    } catch {
      setNotice("Clipboard access is unavailable in this browser.");
    }
  };

  const selectedStageDefinition = definition.construction.find((stage) => stage.id === selectedStage) ?? definition.construction[0];

  const inspection = command === "record" ? (
    <div className={styles.inspectionGrid}>
      <div>
        <span className={styles.inspectionLabel}>RECORD · REPRODUCIBLE SPECIMEN STATE</span>
        <h3>Preserve the representation, not only the picture.</h3>
        <p>The record carries the classical specimen identity, current operational controls, projection settings, implementation version, construction path, and provenance.</p>
        <label className={styles.noteField}>
          <span>RECORD NOTE</span>
          <textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="What are you inspecting in this state?" />
        </label>
        <div className={styles.inspectionActions}>
          <button type="button" className={styles.primaryButton} onClick={saveRecord}>SAVE BROWSER RECORD</button>
          <button type="button" className={styles.secondaryButton} onClick={() => void copyStateLink()}>COPY STATE LINK</button>
        </div>
        {notice ? <p aria-live="polite">{notice}</p> : null}
      </div>
      <pre>{JSON.stringify(preview, null, 2)}</pre>
    </div>
  ) : command === "explain" ? (
    <div>
      <span className={styles.inspectionLabel}>OPEN THE HOOD · REPRESENTATION PATH</span>
      <h3>{selectedStageDefinition.label}</h3>
      <p>{selectedStageDefinition.detail}</p>
      <VisualMathConstructionPath stages={definition.construction} selectedStage={selectedStage} onSelect={setSelectedStage} />
      <p><strong>Claim boundary.</strong> {definition.claimBoundary}</p>
    </div>
  ) : undefined;

  return (
    <VisualMathSpecimenFrame
      controls={(
        <>
          <VisualMathPanelHeading eyebrow="INPUT RACK" title="Hopf controls" action={<button type="button" onClick={reset}>RESET</button>} />
          <div className={styles.controlGroup}>
            <header><span>FIBER ACTION</span><i /></header>
            <VisualMathRange label="Fiber phase" min={0} max={1} step={0.005} value={fiberPhase} output={`${fiberPhase.toFixed(3)} turn`} onChange={setFiberPhase} />
            <VisualMathRange label="Visible fibers" min={5} max={HOPF_MAX_FIBERS} step={1} value={fiberLimit} output={`${fiberLimit} / ${HOPF_MAX_FIBERS}`} onChange={setFiberLimit} />
          </div>
          <div className={styles.controlGroup}>
            <header><span>PRESENTATION</span><i /></header>
            <VisualMathRange label="Manual phase" min={0} max={1} step={0.005} value={phase} output={`${phase.toFixed(3)} turn`} onChange={(value) => { setPlaying(false); setPhase(value); }} />
            <VisualMathRange label="Camera offset" min={-180} max={180} step={1} value={cameraOffset} output={`${cameraOffset}°`} onChange={setCameraOffset} />
            <button type="button" className={styles.primaryButton} onClick={() => setPlaying((value) => !value)}>{playing ? "PAUSE MOTION" : "RESUME MOTION"}</button>
          </div>
        </>
      )}
      chamber={(
        <>
          <HopfFiberCanvas
            animate={active && playing}
            phase={phase}
            fiberPhase={fiberPhase}
            cameraOffsetDeg={cameraOffset}
            fiberLimit={fiberLimit}
          />
          <span className={styles.chamberBadge}>HOPF FIBRATION · S³ → S²</span>
          <span className={`${styles.chamberBadge} ${styles.chamberBadgeRight}`}>{command === "explain" ? selectedStageDefinition.label : playing ? "LIVE CONSTRUCTION" : `PHASE ${phase.toFixed(3)}`}</span>
        </>
      )}
      transport={(
        <>
          <button type="button" className={styles.secondaryButton} onClick={() => setPlaying((value) => !value)}>{playing ? "Ⅱ" : "▶"}</button>
          <input type="range" min={0} max={1} step={0.005} value={phase} onChange={(event) => { setPlaying(false); setPhase(Number(event.target.value)); }} aria-label="Hopf construction phase" />
          <output>{playing ? "AUTO" : phase.toFixed(3)}</output>
          <label><span>FIBER PHASE</span><input type="range" min={0} max={1} step={0.005} value={fiberPhase} onChange={(event) => setFiberPhase(Number(event.target.value))} /></label>
        </>
      )}
      telemetry={(
        <>
          <VisualMathPanelHeading eyebrow="OBSERVABLES" title="Structure telemetry" />
          <div className={styles.metricGrid}>
            <VisualMathMetric label="BASE" value="S²" />
            <VisualMathMetric label="FIBER" value="S¹" />
            <VisualMathMetric label="TOTAL" value="S³" />
            <VisualMathMetric label="VISIBLE" value="R³" detail="stereographic" />
            <VisualMathMetric label="FIBERS" value={fiberLimit} detail={`of ${HOPF_MAX_FIBERS} sampled`} />
            <VisualMathMetric label="SAMPLES" value={HOPF_FIBER_SAMPLES} detail="per fiber" />
          </div>
          <dl className={styles.definitionList}>
            <div><dt>Status</dt><dd>{definition.statusLabel}</dd></div>
            <div><dt>Action</dt><dd>circle phase</dd></div>
            <div><dt>Projection</dt><dd>S³ → R³</dd></div>
            <div><dt>Renderer</dt><dd>shared canvas</dd></div>
          </dl>
          <div className={styles.claimCard}><small>CLAIM BOUNDARY</small><p>{definition.claimBoundary}</p></div>
        </>
      )}
      inspection={inspection}
    />
  );
}

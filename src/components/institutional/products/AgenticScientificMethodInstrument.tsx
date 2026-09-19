"use client";

import { useMemo, useState } from "react";
import {
  asmPhases,
  type AsmPhaseId,
} from "../content/agenticScientificMethod";
import styles from "../styles/AgenticScientificMethod.module.css";

const phaseGroups = [
  ["orient", "declare", "bind", "map", "constrain"],
  ["generate", "select", "act", "trace", "compare"],
  ["diagnose", "repair", "close", "preserve"],
] as const;

export function AgenticScientificMethodInstrument() {
  const [activePhaseId, setActivePhaseId] = useState<AsmPhaseId>("compare");

  const phase = asmPhases.find((item) => item.id === activePhaseId) ?? asmPhases[0];
  const phaseIndex = asmPhases.findIndex((item) => item.id === phase.id);
  const previous = phaseIndex > 0 ? asmPhases[phaseIndex - 1] : null;
  const next = phaseIndex < asmPhases.length - 1 ? asmPhases[phaseIndex + 1] : null;
  const progress = useMemo(
    () => Math.round(((phaseIndex + 1) / asmPhases.length) * 100),
    [phaseIndex],
  );

  return (
    <div className={styles.asmInstrument}>
      <div className={styles.asmInstrumentTopline}>
        <div>
          <span>INQUIRY MACHINE · CONTROLLED TRANSITION VIEW</span>
          <strong>Scientific work as inspectable state change.</strong>
        </div>
        <span className={styles.asmInstrumentLamp} aria-hidden="true" />
      </div>

      <div className={styles.asmProgress} aria-label={`Inquiry progress: ${progress}% through the displayed lifecycle`}>
        <i style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.asmPhaseGroups}>
        {phaseGroups.map((group, groupIndex) => (
          <div className={styles.asmPhaseGroup} key={groupIndex}>
            {group.map((phaseId) => {
              const item = asmPhases.find((candidate) => candidate.id === phaseId);
              if (!item) return null;
              const index = asmPhases.findIndex((candidate) => candidate.id === phaseId);
              return (
                <button
                  aria-pressed={item.id === activePhaseId}
                  data-complete={index < phaseIndex ? "true" : "false"}
                  key={item.id}
                  onClick={() => setActivePhaseId(item.id)}
                  type="button"
                >
                  <span>{String(index).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.asmStateWindow}>
        <div className={styles.asmStateHeader}>
          <span>{String(phaseIndex).padStart(2, "0")} · {phase.label.toUpperCase()}</span>
          <strong>{phase.role}</strong>
        </div>

        <div className={styles.asmStateBody}>
          <div>
            <small>OPERATIONAL QUESTION</small>
            <blockquote>{phase.question}</blockquote>
          </div>

          <div className={styles.asmArtifactReadout}>
            <small>DURABLE ARTIFACT</small>
            <strong>{phase.artifact}</strong>
          </div>
        </div>

        <div className={styles.asmTransitionRail}>
          <div>
            <span>FROM</span>
            <strong>{previous ? previous.label : "Inquiry trigger"}</strong>
          </div>
          <i aria-hidden="true">→</i>
          <div data-active="true">
            <span>CURRENT</span>
            <strong>{phase.label}</strong>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>TO</span>
            <strong>{next ? next.label : "Reopen when conditions change"}</strong>
          </div>
        </div>
      </div>

      <div className={styles.asmInstrumentRule}>
        <span>CONTROL RULE</span>
        <strong>Capability is not authority, and authority is not evidence.</strong>
      </div>
    </div>
  );
}

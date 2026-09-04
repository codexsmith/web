"use client";

import { BAYES_SUBPHASES, TRACE_STAGES, type SemanticLabFrame } from "./semantic-trace";
import s from "./representation-lab-semantic-trace.module.css";

export function SemanticTraceBus({ frame }: { frame: SemanticLabFrame }) {
  return (
    <section className={s.wrapper} aria-label="Semantic causal trace">
      <div className={s.bus}>
        {TRACE_STAGES.map((stage, index) => {
          const active = frame.phase === stage;
          return (
            <div key={stage} className={active ? s.stageActive : s.stage} aria-current={active ? "step" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </div>
          );
        })}
      </div>

      <div className={s.readout}>
        <span>ACTIVE SEMANTIC OPERATION</span>
        <strong>{frame.semanticLabel}</strong>
        <small>This is an operation label, not a percentage-through-animation estimate.</small>
      </div>

      {frame.subphase ? (
        <div className={s.subcycle} aria-label={`Bayesian filter cycle ${frame.cycle ?? 1}`}>
          <div className={s.subcycleLabel}>
            <span>BAYES FILTER CYCLE</span>
            <strong>{String(frame.cycle ?? 1).padStart(2, "0")}</strong>
          </div>
          <div className={s.subcycleRail}>
            {BAYES_SUBPHASES.map((subphase, index) => {
              const active = frame.subphase === subphase;
              return (
                <div key={subphase} className={active ? s.subphaseActive : s.subphase} aria-current={active ? "step" : undefined}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{subphase}</strong>
                  <small>{subphase === "PREDICT" ? "transition prior" : subphase === "OBSERVE" ? "receive evidence" : "likelihood × prior"}</small>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}

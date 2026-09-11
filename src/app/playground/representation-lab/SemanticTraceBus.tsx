"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BAYES_SUBPHASES, TRACE_STAGES, type SemanticLabFrame } from "./semantic-trace";
import s from "./representation-lab-semantic-trace.module.css";

function findLabeledParent(root: ParentNode, label: string) {
  return Array.from(root.querySelectorAll<HTMLElement>("span"))
    .find((element) => element.textContent?.trim() === label)
    ?.parentElement ?? null;
}

export function SemanticTraceBus({ frame }: { frame: SemanticLabFrame }) {
  const [resultHost, setResultHost] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState("KEEP RUNNING");

  useEffect(() => {
    const apparatus = document.querySelector<HTMLElement>('section[aria-label="Representation laboratory apparatus"]');
    if (!apparatus) return;

    const resultPanel = findLabeledParent(apparatus, "RESULT SO FAR");
    const statusCell = findLabeledParent(apparatus, "DEMO STATUS");
    const ledger = statusCell?.parentElement ?? null;
    const statusValue = statusCell?.querySelector<HTMLElement>("strong")?.textContent?.trim();

    if (resultPanel) setResultHost(resultPanel);
    if (statusValue) setStatus(statusValue);

    if (ledger) {
      ledger.dataset.traceSummaryMoved = "true";
      ledger.style.display = "none";
    }

    return () => {
      if (ledger) {
        delete ledger.dataset.traceSummaryMoved;
        ledger.style.removeProperty("display");
      }
    };
  }, [frame.phase, frame.semanticLabel, frame.sourceFrame]);

  return (
    <>
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

      {resultHost ? createPortal(
        <div className={s.resultMeta} aria-live="polite">
          <div className={s.resultMetaRow}>
            <span>NOW</span>
            <strong>{frame.semanticLabel}</strong>
          </div>
          <div className={s.resultMetaRow}>
            <span>STATUS</span>
            <strong data-state={status === "DEMO COMPLETE" ? "complete" : status.includes("MISSING") ? "defect" : "running"}>
              {status}
            </strong>
          </div>
        </div>,
        resultHost,
        "representation-lab-result-meta",
      ) : null}
    </>
  );
}

"use client";

// DEPRECATED: retained for visual-history/reference only.
// Replaced by RepresentationLabBillboardCard + RepresentationLabBillboardCardMount.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./RepresentationLabBillboardMount.deprecated.module.css";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';

export function DeprecatedRepresentationLabBillboardMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const findHost = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setHost((current) => (current === next ? current : next));
    };

    const scheduleFind = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(findHost);
    };

    scheduleFind();

    const observer = new MutationObserver(scheduleFind);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-skin", "data-resolution"],
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!host) return null;

  return createPortal(
    <a
      className={styles.billboard}
      href="/playground/representation-lab"
      aria-label="Open Same World, Different Reasoner, an interactive Boundary First introduction"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <span className={styles.hardware} aria-hidden="true">
        <i /><i />
      </span>

      <span className={styles.signal} aria-hidden="true">
        <i />
      </span>

      <span className={styles.copy}>
        <span className={styles.eyebrow}>PLAYGROUND · INTERACTIVE INTRO · 3 MIN</span>
        <strong>Same World, Different Reasoner</strong>
        <small>Change the question. Change the method. Watch the model change.</small>
      </span>

      <span className={styles.action}>
        <small>START HERE</small>
        <strong>ENTER LAB <b>→</b></strong>
      </span>
    </a>,
    host,
    "deprecated-representation-lab-billboard",
  );
}
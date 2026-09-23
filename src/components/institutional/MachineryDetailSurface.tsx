"use client";

import Link from "next/link";
import { useState } from "react";
import { RegistrarArchitectureDiagram, type RegistrarArchitectureVariant } from "./RegistrarArchitectureDiagram";
import styles from "./styles/MachineryDetailSurface.module.css";

const tabs: readonly { id: RegistrarArchitectureVariant; label: string }[] = [
  { id: "registrar-overview", label: "Organization" },
  { id: "core-relationships", label: "Relationships" },
  { id: "public-projection", label: "Public projection" },
];

export function MachineryDetailSurface() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<RegistrarArchitectureVariant>("registrar-overview");

  return (
    <section className={styles.shell} aria-labelledby="machinery-detail-title">
      <div className={styles.triggerRow}>
        <div>
          <span>HOW THE LAB IS ORGANIZED</span>
          <strong id="machinery-detail-title">The numbers sit on top of a working institutional machine.</strong>
        </div>
        <button type="button" aria-expanded={expanded} aria-controls="machinery-detail-panel" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Hide the machinery" : "View the machinery"} <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      </div>

      {expanded ? (
        <div className={styles.panel} id="machinery-detail-panel">
          <div className={styles.intro}>
            <p>The Lab Snapshot is a dated readout of corpus scale and control surfaces. Beneath it is a registrar architecture that keeps research lanes, experiments, publications, products, machinery, events, evidence, and public projections addressable without turning the website into a second source of truth.</p>
            <p>Important objects receive stable identities, local owners, explicit status, typed relations, and bounded routes into public surfaces so the work is easier to inspect, hand off, correct, and continue.</p>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Machinery architecture views">
            {tabs.map((tab, i) => (
              <button type="button" role="tab" aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1} onClick={() => setActive(tab.id)} key={tab.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>{tab.label}
              </button>
            ))}
          </div>
          <div className={styles.diagramPanel} role="tabpanel">
            <RegistrarArchitectureDiagram variant={active} compact />
          </div>
          <nav className={styles.actions} aria-label="Machinery detail routes">
            <Link href="/research">Explore Research <span aria-hidden="true">→</span></Link>
            <Link href="/apparatus">Explore Apparatus <span aria-hidden="true">→</span></Link>
            <Link href="/open-lab">Open Lab <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      ) : null}
    </section>
  );
}

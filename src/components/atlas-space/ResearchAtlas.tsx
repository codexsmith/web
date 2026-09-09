"use client";

import type { ContentNode } from "@/lib/content-registry";
import { getChildren } from "@/lib/content-registry";
import { defaultAtlasSpaceModel, type AtlasConnectorKind } from "./atlas-space-model";
import styles from "./ResearchAtlas.module.css";

type ResearchAtlasProps = {
  regions: ContentNode[];
};

const researchRegionOrder = [
  "software",
  "applied-testbeds",
  "foundations",
  "formal-theory",
] as const;

function connectorCode(kind: AtlasConnectorKind) {
  if (kind === "through") return "THR";
  if (kind === "keyed") return "KEY";
  return "TST";
}

export function ResearchAtlas({ regions }: ResearchAtlasProps) {
  const position = new Map(researchRegionOrder.map((id, index) => [id, index]));
  const orderedRegions = [...regions].sort((a, b) => {
    const aIndex = position.get(a.id as (typeof researchRegionOrder)[number]) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = position.get(b.id as (typeof researchRegionOrder)[number]) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });

  return (
    <aside className={styles.root} aria-label="Research atlas">
      <div className={styles.topline}>
        <div>
          <span>RESEARCH ATLAS / PUBLIC PROJECTION</span>
          <strong>PRACTICE ⇄ FORMALIZATION</strong>
        </div>
        <b>{String(orderedRegions.length).padStart(2, "0")} REGIONS</b>
      </div>

      <div className={styles.field}>
        <i className={styles.spine} aria-hidden="true" />
        <ol className={styles.regions}>
          {orderedRegions.map((region, index) => {
            const childCount = getChildren(region.id).length;

            return (
              <li key={region.id} className={styles.region}>
                <a href={`/${region.path}`} title={region.summary}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.identity}>
                    <small>{region.eyebrow}</small>
                    <strong>{region.label}</strong>
                  </span>
                  <span className={styles.count}>{childCount} objects</span>
                  <span className={styles.enter} aria-hidden="true">→</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.fiberRail} aria-label="Working correspondence channels">
        <span className={styles.fiberLabel}>CORRESPONDENCE CHANNELS</span>
        <div className={styles.fibers}>
          {defaultAtlasSpaceModel.fibers.map((fiber) => (
            <span
              key={fiber.id}
              className={styles.fiber}
              data-connector={fiber.connectorKind}
              title={fiber.statement}
            >
              <i>{connectorCode(fiber.connectorKind)}</i>
              <strong>{fiber.label}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.footnote}>
        <span>CURATED ORIENTATION / CANONICAL SIBLINGS</span>
        <strong>CORRESPONDENCE ≠ IDENTITY</strong>
      </div>
    </aside>
  );
}

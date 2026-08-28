"use client";

import { useMemo } from "react";
import styles from "./LocalAtlasChart.module.css";
import { GeneratedBoardCalibration } from "./GeneratedBoardCalibration";
import {
  recursiveAtlasRoots,
  resolveRecursiveAtlasPath,
  type RecursiveAtlasPath,
} from "./local-atlas-recursion";
import { corpusMountForLayer, labCorpusAuthority } from "./lab-corpus-atlas";
import type { AtlasFiber, AtlasLayer } from "./atlas-space-model";

type LocalAtlasChartProps = {
  layer: AtlasLayer;
  fibers: AtlasFiber[];
  activeFiberId: string;
  path?: RecursiveAtlasPath;
  onPathChange?: (path: RecursiveAtlasPath) => void;
  onSelectFiber: (fiberId: string) => void;
  onCalibrationChange?: () => void;
};

export function LocalAtlasChart({
  layer,
  fibers,
  activeFiberId,
  path = [],
  onPathChange,
  onSelectFiber,
  onCalibrationChange,
}: LocalAtlasChartProps) {
  const root = recursiveAtlasRoots[layer.id];
  const resolved = resolveRecursiveAtlasPath(layer.id, path);
  const stack = resolved.frames;
  const current = stack.at(-1)?.chart;
  const mount = corpusMountForLayer(layer.id);
  const fiberById = useMemo(() => new Map(fibers.map((fiber) => [fiber.id, fiber])), [fibers]);

  if (!root || !current) {
    return (
      <GeneratedBoardCalibration
        layer={layer}
        fibers={fibers}
        activeFiberId={activeFiberId}
        onSelectFiber={onSelectFiber}
        onCalibrationChange={onCalibrationChange}
      />
    );
  }

  const nodeById = new Map(current.nodes.map((node) => [node.id, node]));
  const updatePath = (nextPath: RecursiveAtlasPath) => onPathChange?.(resolveRecursiveAtlasPath(layer.id, nextPath).path);

  return (
    <section className={styles.chart} aria-label={`${layer.label} recursive local atlas chart`}>
      <header className={styles.header}>
        <div className={styles.headerIdentity}>
          <span className={styles.rackCode}>{mount?.domainCode ?? layer.hardware.rackCode}</span>
          <h3>{current.label}</h3>
          <p>{current.note}</p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.registry}>{mount ? `${mount.familyLabel} / ${mount.domainLabel}` : current.registry}</span>
          <span className={styles.depthReadout}>DEPTH {String(stack.length).padStart(2, "0")}</span>
        </div>
      </header>

      <nav className={styles.breadcrumbs} aria-label="Atlas chart path">
        <button type="button" onClick={() => updatePath([])}>{mount?.domainLabel ?? layer.label}</button>
        {stack.map((frame, index) => (
          <span key={`${frame.chart.id}-${index}`}>
            <i aria-hidden="true">/</i>
            <button type="button" onClick={() => updatePath(resolved.path.slice(0, index))}>
              {frame.viaLabel ?? frame.chart.label}
            </button>
          </span>
        ))}
      </nav>

      {mount ? (
        <aside className={styles.corpusMount} aria-label={`${mount.domainLabel} corpus mount`}>
          <div className={styles.corpusMountHead}>
            <span>CORPUS MOUNT / CANONICAL LIBRARY TOPOLOGY</span>
            <strong>{mount.familyLabel} → {mount.domainLabel}</strong>
            <small>{mount.domainSourcePath}</small>
          </div>
          <div className={styles.corpusInventory}>
            {mount.inventory.map((item) => (
              <div key={item.sourcePath} className={styles.corpusInventoryItem}>
                <span>{item.kind.toUpperCase()}</span>
                <strong>{item.label}</strong>
                <small>{item.sourcePath}</small>
              </div>
            ))}
          </div>
          <div className={styles.corpusAuthority}>
            <span>LIBRARY ATLAS {labCorpusAuthority.generatedAt.slice(0, 10)}</span>
            <span>FP {labCorpusAuthority.corpusFingerprint.slice(0, 12)}</span>
            <span>CORPUS EXISTENCE ≠ PUBLICATION OR VALIDATION</span>
          </div>
        </aside>
      ) : null}

      <div className={styles.field}>
        <svg className={styles.traces} viewBox="0 0 1000 560" aria-hidden="true">
          {current.edges.map((edge) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x * 10} y1={from.y * 5.6} x2={to.x * 10} y2={to.y * 5.6} />;
          })}
        </svg>

        {current.nodes.map((node) => {
          const fiber = node.fiberId ? fiberById.get(node.fiberId) : undefined;
          const active = Boolean(node.fiberId && node.fiberId === activeFiberId);
          const drillable = Boolean(node.child);
          return (
            <button
              key={node.id}
              type="button"
              className={`${styles.region} ${active ? styles.regionActive : ""} ${drillable ? styles.regionDrillable : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => {
                if (node.fiberId) onSelectFiber(node.fiberId);
                if (node.child) updatePath([...resolved.path, node.id]);
              }}
            >
              <span className={styles.regionCode}>{node.code}</span>
              <strong>{node.label}</strong>
              <small>{node.note}</small>
              <span className={styles.portRow}>
                {fiber ? <><i className={styles.port} /><span>{fiber.connectorKind.toUpperCase()} / BACKPLANE</span></> : <><i className={`${styles.port} ${styles.portLocal}`} /><span>LOCAL / INTERNAL</span></>}
              </span>
              {drillable ? <span className={styles.drillCue}>OPEN SUBCHART →</span> : null}
            </button>
          );
        })}

        <div className={styles.chartLegend}>
          <span><i className={styles.legendPort} /> cross-atlas port</span>
          <span><i className={styles.legendTrace} /> conceptual transition</span>
          <span><i className={styles.legendDrill} /> recursive subchart</span>
        </div>
      </div>

      <footer className={styles.chartFooter}>
        <span>PATH: {layer.hardware.rackCode} / {stack.map((frame) => frame.viaLabel ?? frame.chart.label).join(" / ")}</span>
        {resolved.path.length > 0 ? <button type="button" onClick={() => updatePath(resolved.path.slice(0, -1))}>← UP ONE LEVEL</button> : <span>ROOT LOCAL CHART</span>}
      </footer>
    </section>
  );
}

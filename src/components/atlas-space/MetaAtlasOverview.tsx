"use client";

import styles from "./MetaAtlasOverview.module.css";
import { metaPositionFor } from "./meta-atlas-layout";
import { corpusMountForLayer, labCorpusAuthority } from "./lab-corpus-atlas";
import type { AtlasFiber, AtlasLayer, AtlasSpaceModel } from "./atlas-space-model";

type MetaAtlasOverviewProps = {
  model: AtlasSpaceModel;
  activeLayerId: string;
  activeFiberId: string;
  onSelectLayer: (layerId: string) => void;
  onSelectFiber: (fiberId: string) => void;
  onEnterFamily: (layerId: string) => void;
};

function pathToHub(position: { x: number; y: number }, index: number) {
  const hubY = 46 + index * 3;
  const elbowX = position.x < 50 ? 42 : 58;
  return `M ${position.x} ${position.y} L ${elbowX} ${position.y} L ${elbowX} ${hubY} L 50 ${hubY}`;
}

function connectorCode(fiber: AtlasFiber) {
  if (fiber.connectorKind === "through") return "THR";
  if (fiber.connectorKind === "keyed") return "KEY";
  return "TST";
}

function localAnchor(layer: AtlasLayer, fiberId: string) {
  return layer.anchors.find((anchor) => anchor.fiberId === fiberId);
}

export function MetaAtlasOverview({
  model,
  activeLayerId,
  activeFiberId,
  onSelectLayer,
  onSelectFiber,
  onEnterFamily,
}: MetaAtlasOverviewProps) {
  const activeFiber = model.fibers.find((fiber) => fiber.id === activeFiberId) ?? model.fibers[0];
  const activeLayer = model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];

  if (!activeFiber || !activeLayer) return null;

  return (
    <section className={styles.root} aria-label="Meta atlas overview">
      <header className={styles.header}>
        <div>
          <span className={styles.overline}>META-ATLAS / CANONICAL DOMAIN FAMILIES</span>
          <h3>Boundary First Library domain field</h3>
          <p>Canonical corpus families are shown as the outer atlas. Open a family to inspect all of its mapped child domains before descending into a mounted board.</p>
        </div>
        <div className={styles.readout}>
          <span>ACTIVE FIBER</span>
          <strong>{activeFiber.label}</strong>
          <small>{connectorCode(activeFiber)} / {activeFiber.relationKind.toUpperCase()}</small>
        </div>
      </header>

      <div className={styles.field}>
        <svg className={styles.harness} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="46" y="26" width="8" height="48" rx="1.2" className={styles.hubHousing} />
          {model.layers.map((layer, index) => {
            const position = metaPositionFor(index, model.layers.length);
            return (
              <g key={`${activeFiber.id}-${layer.id}`}>
                <path d={pathToHub(position, index)} className={styles.harnessSleeve} />
                <path d={pathToHub(position, index)} className={`${styles.harnessLine} ${activeFiber.connectorKind === "test" ? styles.harnessTest : ""}`} />
                <circle cx={position.x} cy={position.y} r="0.75" className={styles.terminal} />
              </g>
            );
          })}
        </svg>

        <div className={styles.fiberRail} aria-label="Meta-atlas fiber selector">
          <span className={styles.railLabel}>CORRESPONDENCE SPINE</span>
          {model.fibers.map((fiber, index) => (
            <button
              type="button"
              key={fiber.id}
              aria-pressed={fiber.id === activeFiber.id}
              className={`${styles.fiberChannel} ${fiber.id === activeFiber.id ? styles.fiberChannelActive : ""}`}
              onClick={() => onSelectFiber(fiber.id)}
            >
              <span className={styles.fiberCode}>{connectorCode(fiber)}-{String(index + 1).padStart(2, "0")}</span>
              <strong>{fiber.label}</strong>
              <i />
            </button>
          ))}
          <span className={styles.railFoot}>CORRESPONDENCE ≠ IDENTITY</span>
        </div>

        {model.layers.map((layer, index) => {
          const position = metaPositionFor(index, model.layers.length);
          const anchor = localAnchor(layer, activeFiber.id);
          const mount = corpusMountForLayer(layer.id);
          const isActive = layer.id === activeLayer.id;

          return (
            <article
              key={layer.id}
              className={`${styles.domain} ${isActive ? styles.domainActive : ""}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => onSelectLayer(layer.id)}
            >
              <div className={styles.domainTopline}>
                <span>{mount?.familyCode ?? layer.hardware.rackCode}</span>
                <i aria-hidden="true" />
                <span>CORPUS FAMILY</span>
              </div>
              <div className={styles.domainIdentity}>
                <span className={styles.domainMark}>{layer.hardware.mark}</span>
                <div>
                  <h4>{mount?.familyLabel ?? layer.label}</h4>
                  <small>{mount ? `${mount.domainCode} / CURRENT MOUNT: ${mount.domainLabel}` : layer.hardware.registry}</small>
                </div>
              </div>
              <div className={styles.localProjection}>
                <span>{mount ? `${mount.domainLabel.toUpperCase()} / CURRENT LOCAL FORM OF` : "LOCAL FORM OF"}</span>
                <strong>{activeFiber.label}</strong>
                <p>{anchor?.label ?? "No local termination represented"}</p>
              </div>
              <div className={styles.domainActions}>
                <span>{mount ? "OPEN CANONICAL CHILD-DOMAIN ATLAS" : anchor ? `${connectorCode(activeFiber)} PORT TERMINATED` : "UNMAPPED"}</span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEnterFamily(layer.id);
                  }}
                >
                  OPEN FAMILY ATLAS →
                </button>
              </div>
            </article>
          );
        })}

        <div className={styles.metaNote}>
          <span>EMPIRICAL MOUNT / {labCorpusAuthority.generatedAt.slice(0, 10)}</span>
          <strong>Formal · Natural · Engineered · Linguistic</strong>
          <p>Topology follows the generated Boundary First Library Atlas. Family membership, mounted-board availability, publication status, and claim validity remain separate facts.</p>
        </div>
      </div>
    </section>
  );
}

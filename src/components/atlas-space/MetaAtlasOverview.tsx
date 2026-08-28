"use client";

import styles from "./MetaAtlasOverview.module.css";
import type { AtlasFiber, AtlasLayer, AtlasSpaceModel } from "./atlas-space-model";

type MetaAtlasOverviewProps = {
  model: AtlasSpaceModel;
  activeLayerId: string;
  activeFiberId: string;
  onSelectLayer: (layerId: string) => void;
  onSelectFiber: (fiberId: string) => void;
  onEnterStack: (layerId: string) => void;
};

type DomainPosition = {
  x: number;
  y: number;
};

const POSITIONS: DomainPosition[] = [
  { x: 23, y: 24 },
  { x: 77, y: 24 },
  { x: 23, y: 74 },
  { x: 77, y: 74 },
];

function positionFor(index: number, total: number): DomainPosition {
  if (total <= POSITIONS.length) return POSITIONS[index] ?? { x: 50, y: 50 };
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * 34,
    y: 50 + Math.sin(angle) * 34,
  };
}

function pathToHub(position: DomainPosition, index: number) {
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
  onEnterStack,
}: MetaAtlasOverviewProps) {
  const activeFiber = model.fibers.find((fiber) => fiber.id === activeFiberId) ?? model.fibers[0];
  const activeLayer = model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];

  if (!activeFiber || !activeLayer) return null;

  return (
    <section className={styles.root} aria-label="Meta atlas overview">
      <header className={styles.header}>
        <div>
          <span className={styles.overline}>META-ATLAS / DOMAIN FIELD</span>
          <h3>Cross-domain representational atlas</h3>
          <p>Hold one structural question fixed while the domain representation changes around it.</p>
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
            const position = positionFor(index, model.layers.length);
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
          const position = positionFor(index, model.layers.length);
          const anchor = localAnchor(layer, activeFiber.id);
          const isActive = layer.id === activeLayer.id;

          return (
            <article
              key={layer.id}
              className={`${styles.domain} ${isActive ? styles.domainActive : ""}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => onSelectLayer(layer.id)}
            >
              <div className={styles.domainTopline}>
                <span>{layer.hardware.rackCode}</span>
                <i aria-hidden="true" />
                <span>{layer.kicker}</span>
              </div>
              <div className={styles.domainIdentity}>
                <span className={styles.domainMark}>{layer.hardware.mark}</span>
                <div>
                  <h4>{layer.label}</h4>
                  <small>{layer.hardware.registry}</small>
                </div>
              </div>
              <div className={styles.localProjection}>
                <span>LOCAL FORM OF</span>
                <strong>{activeFiber.label}</strong>
                <p>{anchor?.label ?? "No local termination represented"}</p>
              </div>
              <div className={styles.domainActions}>
                <span>{anchor ? `${connectorCode(activeFiber)} PORT TERMINATED` : "UNMAPPED"}</span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEnterStack(layer.id);
                  }}
                >
                  ENTER STACK →
                </button>
              </div>
            </article>
          );
        })}

        <div className={styles.metaNote}>
          <span>VIEW LAW</span>
          <strong>One fiber, many local charts.</strong>
          <p>Zooming outward changes the representational scale. It does not collapse the domains into one vocabulary.</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AtlasSpace } from "./AtlasSpace";
import { MetaAtlasOverview } from "./MetaAtlasOverview";
import { defaultAtlasSpaceModel } from "./atlas-space-model";
import { metaPositionFor } from "./meta-atlas-layout";
import styles from "./AtlasSpaceNavigator.module.css";

type NavigatorMode = "meta" | "stack";
type TransitionDirection = "descend" | "ascend";

type ScaleTransition = {
  direction: TransitionDirection;
  layerId: string;
  fiberId: string;
};

const TRANSITION_MS = 560;

function connectorCode(kind: "through" | "keyed" | "test") {
  if (kind === "through") return "THR";
  if (kind === "keyed") return "KEY";
  return "TST";
}

export function AtlasSpaceNavigator() {
  const model = defaultAtlasSpaceModel;
  const [mode, setMode] = useState<NavigatorMode>("meta");
  const [activeLayerId, setActiveLayerId] = useState(model.layers[0]?.id ?? "");
  const [activeFiberId, setActiveFiberId] = useState(model.fibers[0]?.id ?? "");
  const [transition, setTransition] = useState<ScaleTransition | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeLayer = model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];
  const activeFiber = model.fibers.find((fiber) => fiber.id === activeFiberId) ?? model.fibers[0];
  const activeLayerIndex = Math.max(0, model.layers.findIndex((layer) => layer.id === activeLayerId));
  const activeMetaPosition = useMemo(
    () => metaPositionFor(activeLayerIndex, model.layers.length),
    [activeLayerIndex, model.layers.length],
  );

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (!activeLayer || !activeFiber) return null;

  const scheduleTransition = (next: ScaleTransition) => {
    if (transition) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setTransition(next);
    timerRef.current = setTimeout(() => {
      setMode(next.direction === "descend" ? "stack" : "meta");
      setTransition(null);
      timerRef.current = null;
    }, TRANSITION_MS);
  };

  const enterStack = (layerId: string) => {
    if (transition) return;
    setActiveLayerId(layerId);
    scheduleTransition({ direction: "descend", layerId, fiberId: activeFiberId });
  };

  const zoomOut = () => {
    if (transition) return;
    scheduleTransition({ direction: "ascend", layerId: activeLayer.id, fiberId: activeFiber.id });
  };

  const transitionFiber = transition
    ? model.fibers.find((fiber) => fiber.id === transition.fiberId) ?? activeFiber
    : activeFiber;
  const transitionAnchor = activeLayer.anchors.find((anchor) => anchor.fiberId === transitionFiber.id);

  const transitionStyle = {
    "--meta-x": `${activeMetaPosition.x}%`,
    "--meta-y": `${activeMetaPosition.y}%`,
  } as CSSProperties;

  return (
    <section
      className={styles.navigator}
      data-mode={mode}
      data-transition={transition?.direction ?? "idle"}
      aria-busy={Boolean(transition)}
    >
      <div className={styles.depthRail} aria-label="Atlas scale navigation">
        <div className={styles.scaleIdentity}>
          <span>REPRESENTATIONAL SCALE</span>
          <strong>
            {transition
              ? transition.direction === "descend"
                ? `PROJECTING ${activeLayer.hardware.rackCode} / ${transitionFiber.label} → STACK`
                : `PROJECTING ${activeLayer.hardware.rackCode} / ${transitionFiber.label} → META`
              : mode === "meta"
                ? `META-ATLAS / ${activeFiber.label}`
                : `DOMAIN STACK / ${activeLayer.hardware.rackCode} / ${activeFiber.label}`}
          </strong>
        </div>

        <div className={styles.scaleTrack} aria-hidden="true">
          <i className={mode === "meta" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i className={mode === "stack" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i />
          <span />
          <i />
          {transition ? <b className={`${styles.scaleCarriage} ${transition.direction === "descend" ? styles.scaleCarriageDown : styles.scaleCarriageUp}`} /> : null}
        </div>

        <div className={styles.scaleLabels} aria-hidden="true">
          <span>META</span>
          <span>STACK</span>
          <span>LOCAL</span>
          <span>SUBCHART</span>
        </div>

        <div className={styles.scaleActions}>
          {mode === "stack" ? (
            <button type="button" onClick={zoomOut} disabled={Boolean(transition)}>
              ← ZOOM OUT TO META
            </button>
          ) : transition ? (
            <span>PROJECTION IN MOTION</span>
          ) : (
            <span>SELECT DOMAIN TO DESCEND</span>
          )}
        </div>
      </div>

      <div className={styles.stage}>
        {mode === "meta" ? (
          <MetaAtlasOverview
            model={model}
            activeLayerId={activeLayerId}
            activeFiberId={activeFiberId}
            onSelectLayer={setActiveLayerId}
            onSelectFiber={setActiveFiberId}
            onEnterStack={enterStack}
          />
        ) : (
          <AtlasSpace
            key={`${activeLayerId}-${transition?.direction === "descend" ? transition.fiberId : "mounted"}`}
            model={model}
            initialLayerId={activeLayerId}
            initialFiberId={activeFiberId}
            onActiveLayerChange={setActiveLayerId}
            onActiveFiberChange={setActiveFiberId}
          />
        )}

        {transition ? (
          <div
            className={`${styles.projectionBridge} ${transition.direction === "descend" ? styles.projectionBridgeDescend : styles.projectionBridgeAscend}`}
            style={transitionStyle}
            aria-hidden="true"
          >
            <div className={styles.bridgeCard}>
              <div className={styles.bridgeTopline}>
                <span>{activeLayer.hardware.rackCode}</span>
                <i />
                <span>{activeLayer.kicker}</span>
              </div>
              <div className={styles.bridgeIdentity}>
                <span>{activeLayer.hardware.mark}</span>
                <div>
                  <strong>{activeLayer.label}</strong>
                  <small>{activeLayer.hardware.registry}</small>
                </div>
              </div>
              <div className={styles.bridgeFiberReadout}>
                <span className={styles.bridgeFiberLamp} />
                <div>
                  <small>CONSERVed correspondence channel</small>
                  <strong>{transitionFiber.label}</strong>
                  <span>{connectorCode(transitionFiber.connectorKind)} / {transitionAnchor?.label ?? "UNMAPPED LOCAL PORT"}</span>
                </div>
              </div>
              <div className={styles.bridgeProjectionReadout}>
                <span>{transition.direction === "descend" ? "PROMOTING DOMAIN REGION" : "COLLAPSING DOMAIN BOARD"}</span>
                <strong>{transition.direction === "descend" ? "META → STACK" : "STACK → META"}</strong>
              </div>
              <div className={styles.bridgeEdgeConnector}>
                {model.fibers.map((fiber) => (
                  <i key={fiber.id} className={fiber.id === transitionFiber.id ? styles.bridgeEdgeContactActive : ""} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <footer className={styles.navigatorFooter}>
        <span>BF-ATLAS / SCALE BUS 0.7</span>
        <strong>META ⇄ STACK → EXTRACT → INSPECT → DRILL</strong>
        <span>OBJECT + CORRESPONDENCE STATE CONSERVED ACROSS PROJECTION</span>
      </footer>
    </section>
  );
}
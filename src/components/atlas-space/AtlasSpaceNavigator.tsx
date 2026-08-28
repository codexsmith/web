"use client";

import { useState } from "react";
import { AtlasSpace } from "./AtlasSpace";
import { MetaAtlasOverview } from "./MetaAtlasOverview";
import { defaultAtlasSpaceModel } from "./atlas-space-model";
import styles from "./AtlasSpaceNavigator.module.css";

type NavigatorMode = "meta" | "stack";

export function AtlasSpaceNavigator() {
  const model = defaultAtlasSpaceModel;
  const [mode, setMode] = useState<NavigatorMode>("meta");
  const [activeLayerId, setActiveLayerId] = useState(model.layers[0]?.id ?? "");
  const [activeFiberId, setActiveFiberId] = useState(model.fibers[0]?.id ?? "");

  const activeLayer = model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];

  if (!activeLayer) return null;

  return (
    <section className={styles.navigator} data-mode={mode}>
      <div className={styles.depthRail} aria-label="Atlas scale navigation">
        <div className={styles.scaleIdentity}>
          <span>REPRESENTATIONAL SCALE</span>
          <strong>{mode === "meta" ? "META-ATLAS" : `DOMAIN STACK / ${activeLayer.hardware.rackCode}`}</strong>
        </div>

        <div className={styles.scaleTrack} aria-hidden="true">
          <i className={mode === "meta" ? styles.scalePointActive : ""} />
          <span />
          <i className={mode === "stack" ? styles.scalePointActive : ""} />
          <span />
          <i />
          <span />
          <i />
        </div>

        <div className={styles.scaleLabels} aria-hidden="true">
          <span>META</span>
          <span>STACK</span>
          <span>LOCAL</span>
          <span>SUBCHART</span>
        </div>

        <div className={styles.scaleActions}>
          {mode === "stack" ? (
            <button type="button" onClick={() => setMode("meta")}>
              ← ZOOM OUT TO META
            </button>
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
            onEnterStack={(layerId) => {
              setActiveLayerId(layerId);
              setMode("stack");
            }}
          />
        ) : (
          <AtlasSpace
            key={activeLayerId}
            model={model}
            initialLayerId={activeLayerId}
          />
        )}
      </div>

      <footer className={styles.navigatorFooter}>
        <span>BF-ATLAS / SCALE BUS 0.5</span>
        <strong>META → STACK → EXTRACT → INSPECT → DRILL</strong>
        <span>ZOOM CHANGES REPRESENTATION, NOT MEMBERSHIP</span>
      </footer>
    </section>
  );
}

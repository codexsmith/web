"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AtlasSpace, type AtlasNavigationDepth } from "./AtlasSpace";
import { FamilyDomainAtlas } from "./FamilyDomainAtlas";
import { MetaAtlasOverview } from "./MetaAtlasOverview";
import { defaultAtlasSpaceModel, type AtlasLayer, type AtlasSpaceModel } from "./atlas-space-model";
import {
  atlasCorpusFamilies,
  corpusFamilyForLayer,
  corpusMountForLayer,
  type AtlasCorpusDomain,
  type AtlasCorpusFamily,
} from "./lab-corpus-atlas";
import {
  corpusDescriptorForLayer,
  generateDomainBoardShell,
  generatedLayerIdForDomain,
} from "./generated-domain-board";
import {
  recursiveAtlasPathLabels,
  type RecursiveAtlasPath,
} from "./local-atlas-recursion";
import styles from "./AtlasSpaceNavigator.module.css";
import familyScaleStyles from "./AtlasSpaceFamilyScale.module.css";

type NavigatorMode = "meta" | "family" | "stack";
type TransitionDirection = "descend" | "ascend";

type ScaleTransition = {
  direction: TransitionDirection;
  layerId: string;
  fiberId: string;
  chartPath: RecursiveAtlasPath;
  navigationDepth: AtlasNavigationDepth;
};

const TRANSITION_MS = 560;

function connectorCode(kind: "through" | "keyed" | "test") {
  if (kind === "through") return "THR";
  if (kind === "keyed") return "KEY";
  return "TST";
}

export function AtlasSpaceNavigator() {
  const baseModel = defaultAtlasSpaceModel;
  const [mode, setMode] = useState<NavigatorMode>("meta");
  const [generatedLayers, setGeneratedLayers] = useState<Record<string, AtlasLayer>>({});
  const [activeLayerId, setActiveLayerId] = useState(baseModel.layers[0]?.id ?? "");
  const [activeFiberId, setActiveFiberId] = useState(baseModel.fibers[0]?.id ?? "");
  const [activeFamilyId, setActiveFamilyId] = useState(corpusFamilyForLayer(baseModel.layers[0]?.id ?? "")?.id ?? atlasCorpusFamilies[0]?.id ?? "");
  const [activeDomainIds, setActiveDomainIds] = useState<Record<string, string>>({});
  const [chartPaths, setChartPaths] = useState<Record<string, RecursiveAtlasPath>>({});
  const [navigationDepths, setNavigationDepths] = useState<Record<string, AtlasNavigationDepth>>({});
  const [transition, setTransition] = useState<ScaleTransition | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rackModel: AtlasSpaceModel = useMemo(() => ({
    ...baseModel,
    layers: [...baseModel.layers, ...Object.values(generatedLayers)],
  }), [baseModel, generatedLayers]);

  const activeLayer = rackModel.layers.find((layer) => layer.id === activeLayerId) ?? rackModel.layers[0];
  const activeFiber = rackModel.fibers.find((fiber) => fiber.id === activeFiberId) ?? rackModel.fibers[0];
  const activeDescriptor = activeLayer ? corpusDescriptorForLayer(activeLayer.id) : undefined;
  const activeFamily = atlasCorpusFamilies.find((family) => family.id === activeFamilyId) ?? atlasCorpusFamilies[0];
  const activeChartPath = chartPaths[activeLayerId] ?? [];
  const activeNavigationDepth = navigationDepths[activeLayerId] ?? "stack";
  const activePathLabels = recursiveAtlasPathLabels(activeLayerId, activeChartPath);
  const activeDomainId = activeFamily
    ? activeDomainIds[activeFamily.id] ?? activeDescriptor?.domainId ?? activeFamily.domains[0]?.id
    : undefined;

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (!activeLayer || !activeFiber || !activeFamily) return null;

  const scheduleTransition = (next: ScaleTransition) => {
    if (transition) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setTransition(next);
    timerRef.current = setTimeout(() => {
      setMode(next.direction === "descend" ? "stack" : "family");
      setTransition(null);
      timerRef.current = null;
    }, TRANSITION_MS);
  };

  const registerDescriptor = (layerId: string) => {
    const descriptor = corpusDescriptorForLayer(layerId);
    if (!descriptor) return;
    setActiveFamilyId(descriptor.familyId);
    setActiveDomainIds((existing) => ({ ...existing, [descriptor.familyId]: descriptor.domainId }));
  };

  const enterFamily = (layerId: string) => {
    if (transition) return;
    const mount = corpusMountForLayer(layerId);
    if (!mount) return;
    setActiveLayerId(layerId);
    setActiveFamilyId(mount.familyId);
    setActiveDomainIds((existing) => ({ ...existing, [mount.familyId]: existing[mount.familyId] ?? mount.domainId }));
    setMode("family");
  };

  const enterStack = (layerId: string) => {
    if (transition) return;
    registerDescriptor(layerId);
    setActiveLayerId(layerId);
    scheduleTransition({
      direction: "descend",
      layerId,
      fiberId: activeFiberId,
      chartPath: chartPaths[layerId] ?? [],
      navigationDepth: navigationDepths[layerId] ?? "stack",
    });
  };

  const fabricateDomain = (family: AtlasCorpusFamily, domain: AtlasCorpusDomain) => {
    if (transition) return;
    if (domain.mountedLayerId) {
      enterStack(domain.mountedLayerId);
      return;
    }

    const generatedId = generatedLayerIdForDomain(family.id, domain.id);
    const generatedLayer = generatedLayers[generatedId] ?? generateDomainBoardShell(family, domain);
    if (!generatedLayers[generatedId]) {
      setGeneratedLayers((existing) => ({ ...existing, [generatedId]: generatedLayer }));
    }

    setActiveFamilyId(family.id);
    setActiveDomainIds((existing) => ({ ...existing, [family.id]: domain.id }));
    setActiveLayerId(generatedId);
    scheduleTransition({
      direction: "descend",
      layerId: generatedId,
      fiberId: activeFiberId,
      chartPath: chartPaths[generatedId] ?? [],
      navigationDepth: navigationDepths[generatedId] ?? "stack",
    });
  };

  const zoomOutToFamily = () => {
    if (transition) return;
    registerDescriptor(activeLayer.id);
    scheduleTransition({
      direction: "ascend",
      layerId: activeLayer.id,
      fiberId: activeFiber.id,
      chartPath: activeChartPath,
      navigationDepth: activeNavigationDepth,
    });
  };

  const zoomOutToMeta = () => {
    if (transition) return;
    setMode("meta");
  };

  const transitionFiber = transition
    ? rackModel.fibers.find((fiber) => fiber.id === transition.fiberId) ?? activeFiber
    : activeFiber;
  const transitionLayer = transition
    ? rackModel.layers.find((layer) => layer.id === transition.layerId) ?? activeLayer
    : activeLayer;
  const transitionAnchor = transitionLayer.anchors.find((anchor) => anchor.fiberId === transitionFiber.id);
  const transitionPathLabels = transition
    ? recursiveAtlasPathLabels(transition.layerId, transition.chartPath)
    : activePathLabels;
  const transitionDescriptor = corpusDescriptorForLayer(transitionLayer.id);

  const transitionStyle = {
    "--meta-x": "50%",
    "--meta-y": "50%",
  } as CSSProperties;

  const railDepth = mode === "meta" ? "meta" : mode === "family" ? "family" : activeNavigationDepth;
  const generatedDomainIds = activeFamily.domains
    .filter((domain) => Boolean(generatedLayers[generatedLayerIdForDomain(activeFamily.id, domain.id)]))
    .map((domain) => domain.id);

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
                ? `PROJECTING ${transitionDescriptor?.domainCode ?? transitionLayer.hardware.rackCode} / ${transitionFiber.label} / ${transition.navigationDepth.toUpperCase()} → STACK`
                : `PROJECTING ${transitionDescriptor?.domainCode ?? transitionLayer.hardware.rackCode} / ${transitionFiber.label} / ${transition.navigationDepth.toUpperCase()} → FAMILY`
              : mode === "meta"
                ? `META-ATLAS / ${activeFiber.label}`
                : mode === "family"
                  ? `DOMAIN ATLAS / ${activeFamily.code} / ${activeFamily.label}`
                  : `${activeNavigationDepth.toUpperCase()} / ${activeLayer.hardware.rackCode} / ${activeFiber.label}`}
          </strong>
        </div>

        <div className={`${styles.scaleTrack} ${familyScaleStyles.scaleTrackFive}`} aria-hidden="true">
          <i className={railDepth === "meta" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i className={railDepth === "family" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i className={railDepth === "stack" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i className={railDepth === "local" && !transition ? styles.scalePointActive : ""} />
          <span />
          <i className={railDepth === "subchart" && !transition ? styles.scalePointActive : ""} />
          {transition ? <b className={`${styles.scaleCarriage} ${familyScaleStyles.familyCarriage} ${transition.direction === "descend" ? familyScaleStyles.familyCarriageDown : familyScaleStyles.familyCarriageUp}`} /> : null}
        </div>

        <div className={`${styles.scaleLabels} ${familyScaleStyles.scaleLabelsFive}`} aria-hidden="true">
          <span>META</span>
          <span>FAMILY</span>
          <span>STACK</span>
          <span>LOCAL</span>
          <span>SUBCHART</span>
        </div>

        <div className={styles.scaleActions}>
          {mode === "stack" ? (
            <button type="button" onClick={zoomOutToFamily} disabled={Boolean(transition)}>
              ← ZOOM OUT TO FAMILY
            </button>
          ) : mode === "family" ? (
            <button type="button" onClick={zoomOutToMeta} disabled={Boolean(transition)}>
              ← ZOOM OUT TO META
            </button>
          ) : transition ? (
            <span>PROJECTION IN MOTION</span>
          ) : (
            <span>SELECT FAMILY TO DESCEND</span>
          )}
        </div>
      </div>

      <div className={styles.stage}>
        {mode === "meta" ? (
          <MetaAtlasOverview
            model={baseModel}
            activeLayerId={baseModel.layers.some((layer) => layer.id === activeLayerId) ? activeLayerId : baseModel.layers.find((layer) => corpusMountForLayer(layer.id)?.familyId === activeFamilyId)?.id ?? baseModel.layers[0]?.id ?? ""}
            activeFiberId={activeFiberId}
            onSelectLayer={setActiveLayerId}
            onSelectFiber={setActiveFiberId}
            onEnterFamily={enterFamily}
          />
        ) : mode === "family" ? (
          <FamilyDomainAtlas
            family={activeFamily}
            activeDomainId={activeDomainId}
            generatedDomainIds={generatedDomainIds}
            onSelectDomain={(domainId) => setActiveDomainIds((existing) => ({ ...existing, [activeFamily.id]: domainId }))}
            onEnterMountedDomain={enterStack}
            onFabricateDomain={fabricateDomain}
            onReturnMeta={zoomOutToMeta}
          />
        ) : (
          <AtlasSpace
            key={`${activeLayerId}-${transition?.direction === "descend" ? transition.fiberId : "mounted"}`}
            model={rackModel}
            initialLayerId={activeLayerId}
            initialFiberId={activeFiberId}
            initialChartPaths={chartPaths}
            initialNavigationDepth={activeNavigationDepth}
            onActiveLayerChange={(layerId) => {
              setActiveLayerId(layerId);
              registerDescriptor(layerId);
            }}
            onActiveFiberChange={setActiveFiberId}
            onChartPathChange={(layerId, path) => {
              setChartPaths((existing) => ({ ...existing, [layerId]: path }));
              setNavigationDepths((existing) => ({ ...existing, [layerId]: path.length > 0 ? "subchart" : existing[layerId] === "stack" ? "stack" : "local" }));
            }}
            onNavigationDepthChange={(depth) => {
              setNavigationDepths((existing) => ({ ...existing, [activeLayerId]: depth }));
            }}
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
                <span>{transitionDescriptor?.domainCode ?? transitionLayer.hardware.rackCode}</span>
                <i />
                <span>{transitionDescriptor?.generated ? "GENERATED / UNCALIBRATED" : transitionDescriptor?.familyLabel ?? transitionLayer.kicker}</span>
              </div>
              <div className={styles.bridgeIdentity}>
                <span>{transitionLayer.hardware.mark}</span>
                <div>
                  <strong>{transitionDescriptor?.domainLabel ?? transitionLayer.label}</strong>
                  <small>{transitionLayer.hardware.registry}</small>
                </div>
              </div>
              <div className={styles.bridgeFiberReadout}>
                <span className={styles.bridgeFiberLamp} />
                <div>
                  <small>{transitionDescriptor?.generated ? "UNCALIBRATED CORRESPONDENCE CHANNEL" : "CONSERVED CORRESPONDENCE CHANNEL"}</small>
                  <strong>{transitionFiber.label}</strong>
                  <span>{transitionAnchor ? `${connectorCode(transitionFiber.connectorKind)} / ${transitionAnchor.label}` : "NO LOCAL PORT / CALIBRATION REQUIRED"}</span>
                </div>
              </div>
              <div className={styles.bridgePathReadout}>
                <small>CONSERVED NAVIGATION POSITION</small>
                <strong>{transition.navigationDepth.toUpperCase()}</strong>
                <span>{transitionPathLabels.length ? transitionPathLabels.join(" / ") : "DOMAIN ROOT / NO DEEP PATH"}</span>
              </div>
              <div className={styles.bridgeProjectionReadout}>
                <span>{transition.direction === "descend" ? "PROMOTING DOMAIN BOARD" : "RETURNING DOMAIN BOARD TO FAMILY ATLAS"}</span>
                <strong>{transition.direction === "descend" ? "FAMILY → STACK" : "STACK → FAMILY"}</strong>
              </div>
              <div className={styles.bridgeEdgeConnector}>
                {rackModel.fibers.map((fiber) => (
                  <i key={fiber.id} className={fiber.id === transitionFiber.id && Boolean(transitionAnchor) ? styles.bridgeEdgeContactActive : ""} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <footer className={styles.navigatorFooter}>
        <span>BF-ATLAS / SCALE BUS 1.0</span>
        <strong>META ⇄ FAMILY ⇄ STACK ⇄ LOCAL ⇄ SUBCHART</strong>
        <span>GENERATED SHELLS PRESERVE PROVENANCE; SEMANTIC PORTS REQUIRE CALIBRATION</span>
      </footer>
    </section>
  );
}

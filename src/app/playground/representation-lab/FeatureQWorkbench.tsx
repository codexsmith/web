"use client";

import {
  FEATURE_DEFINITIONS,
  FEATURE_PRESETS,
  featureResolutionLabel,
  nextFeatureResolution,
  type FeatureConfig,
  type FeatureQResult,
  type QCarrier,
} from "./feature-q";
import s from "./representation-lab-feature-q.module.css";

const ACTION_LABELS = { N: "north", S: "south", E: "east", W: "west", STOP: "stop" } as const;

function sameConfig(left: FeatureConfig, right: FeatureConfig) {
  return FEATURE_DEFINITIONS.every((definition) => left[definition.id] === right[definition.id]);
}

export function FeatureQWorkbench({
  carrier,
  onCarrierChange,
  config,
  onConfigChange,
  result,
}: {
  carrier: QCarrier;
  onCarrierChange: (carrier: QCarrier) => void;
  config: FeatureConfig;
  onConfigChange: (config: FeatureConfig) => void;
  result: FeatureQResult;
}) {
  const featureMode = carrier === "features";
  const activePreset = FEATURE_PRESETS.find((preset) => sameConfig(preset.config, config));

  return (
    <section className={s.workbench} aria-label="Feature based action-value representation">
      <div className={s.header}>
        <div>
          <span>FEATURE PROJECTION · APPROXIMATE Q</span>
          <strong>Forget state identity. Preserve only distinctions that support action.</strong>
          <p>The transition and reward model stay fixed. This rig changes how state-action pairs are represented before learning.</p>
        </div>
        <div className={s.status} data-mode={carrier}>
          <span>Q CARRIER</span>
          <strong>{featureMode ? `${result.parameters} WEIGHTS` : `${result.referenceEntries} TABLE ENTRIES`}</strong>
        </div>
      </div>

      <div className={s.carrierRail} role="group" aria-label="Q representation carrier">
        <button type="button" aria-pressed={carrier === "tabular"} onClick={() => onCarrierChange("tabular")}>
          <span>TABULAR Q*</span><small>state-action identity retained</small>
        </button>
        <button type="button" aria-pressed={featureMode} onClick={() => onCarrierChange("features")}>
          <span>FEATURE Q</span><small>Q(s,a) = w · f(s,a)</small>
        </button>
      </div>

      <div className={s.presets} aria-label="Feature projection presets">
        <span>PROJECTION PRESETS</span>
        <div>
          {FEATURE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePreset?.id === preset.id}
              onClick={() => {
                onConfigChange({ ...preset.config });
                onCarrierChange("features");
              }}
            >
              <strong>{preset.label}</strong>
              <small>{preset.detail}</small>
            </button>
          ))}
        </div>
      </div>

      <div className={s.featureBank} data-active={featureMode ? "true" : "false"}>
        <div className={s.bankLabel}>
          <span>FEATURE BOUNDARY</span>
          <strong>Click a distinction to move it: full → coarse → forgotten.</strong>
        </div>
        <div className={s.featureGrid}>
          {FEATURE_DEFINITIONS.map((feature) => {
            const resolution = config[feature.id];
            return (
              <button
                key={feature.id}
                type="button"
                data-resolution={resolution}
                aria-pressed={resolution !== "off"}
                disabled={!featureMode}
                onClick={() => onConfigChange({
                  ...config,
                  [feature.id]: nextFeatureResolution(feature, resolution),
                })}
              >
                <span>{feature.label}</span>
                <strong>{featureResolutionLabel(resolution)}</strong>
                <small>{feature.detail}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className={s.metrics}>
        <article>
          <span>POLICY AGREEMENT</span>
          <strong>{featureMode ? `${(result.policyAgreement * 100).toFixed(1)}%` : "100.0%"}</strong>
          <small>Greedy action agreement with the tabular reference across represented states.</small>
        </article>
        <article>
          <span>HAZARD-ZONE AGREEMENT</span>
          <strong>{featureMode ? `${(result.hazardZoneAgreement * 100).toFixed(1)}%` : "100.0%"}</strong>
          <small>Agreement within four graph steps of the hazard, where forgetting becomes consequential.</small>
        </article>
        <article>
          <span>Q DEFECT</span>
          <strong>{featureMode ? result.meanAbsoluteQDefect.toFixed(2) : "0.00"}</strong>
          <small>Mean absolute action-value error against converged tabular Q*.</small>
        </article>
        <article>
          <span>PARAMETER CARRIER</span>
          <strong>{featureMode ? `${result.parameters} / ${result.referenceEntries}` : `${result.referenceEntries} / ${result.referenceEntries}`}</strong>
          <small>{featureMode ? "Learned weights versus explicit state-action entries." : "Reference keeps one value for every state-action identity."}</small>
        </article>
      </div>

      <div className={s.aliasRack}>
        <div className={s.aliasMetrics}>
          <div><span>FEATURE SIGNATURES</span><strong>{featureMode ? result.uniqueSignatures : result.referenceEntries}</strong><small>distinct represented state-action forms</small></div>
          <div><span>LARGEST ALIAS CLASS</span><strong>{featureMode ? result.largestAliasClass : 1}</strong><small>identities collapsed to one feature vector</small></div>
          <div data-defect={featureMode && result.conflictedAliasClasses > 0 ? "true" : "false"}><span>CONSEQUENTIAL COLLISIONS</span><strong>{featureMode ? result.conflictedAliasClasses : 0}</strong><small>alias classes hiding &gt; 0.5 Q* separation</small></div>
          <div data-defect={featureMode && result.hazardMistakes > 0 ? "true" : "false"}><span>HAZARD MISTAKES</span><strong>{featureMode ? result.hazardMistakes : 0}</strong><small>greedy actions entering hazard when Q* would not</small></div>
        </div>

        <div className={s.witness} data-state={featureMode && result.aliasWitness ? "defect" : "clear"}>
          <span>ALIAS WITNESS</span>
          {featureMode && result.aliasWitness ? (
            <>
              <strong>Same feature vector. Different consequence.</strong>
              <div>
                <code>({result.aliasWitness.left.point[0]},{result.aliasWitness.left.point[1]}) · {result.aliasWitness.left.action} → Q* {result.aliasWitness.left.q.toFixed(2)}</code>
                <code>({result.aliasWitness.right.point[0]},{result.aliasWitness.right.point[1]}) · {result.aliasWitness.right.action} → Q* {result.aliasWitness.right.q.toFixed(2)}</code>
              </div>
              <p>The projection identifies these state-action pairs even though their reference values differ by {result.aliasWitness.exactGap.toFixed(2)}.</p>
            </>
          ) : (
            <>
              <strong>{featureMode ? "NO HIGH-GAP COLLISION" : "TABULAR IDENTITY PRESERVED"}</strong>
              <p>{featureMode ? "The current feature projection aliases some identities, but no alias class exceeds the configured consequential-gap threshold." : "Every state-action pair retains its own address in the reference carrier."}</p>
            </>
          )}
        </div>
      </div>

      <div className={s.lowerRack}>
        <div className={s.weights}>
          <span>LEARNED WEIGHTS · {result.trainingEpisodes} SEEDED EPISODES</span>
          <div>
            {result.weights.map((weight) => (
              <div key={weight.id}>
                <small>{weight.label}</small>
                <code>{weight.value >= 0 ? "+" : ""}{weight.value.toFixed(3)}</code>
              </div>
            ))}
          </div>
        </div>
        <div className={s.startDecision}>
          <span>WORLD-01 · START DECISION</span>
          <strong>{featureMode ? ACTION_LABELS[result.startAction] : ACTION_LABELS[result.referenceStartAction]}</strong>
          <small>reference: {ACTION_LABELS[result.referenceStartAction]}{featureMode && result.startAction !== result.referenceStartAction ? " · projection diverges here" : " · projection agrees here"}</small>
        </div>
      </div>

      <div className={s.note}>
        <span>ADMISSIBLE FORGETTING TEST</span>
        <p>Compression is not scored by size alone. Forgetting is admissible only relative to the downstream consequence: fewer distinctions are useful when they preserve the action-relevant structure, and defective when they merge cases that demand materially different values or actions.</p>
      </div>
    </section>
  );
}

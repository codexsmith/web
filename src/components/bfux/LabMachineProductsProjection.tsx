"use client";

import { useMemo, useState } from "react";
import productSource from "@/content/lab-machine-products.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-products.css";

export type ProductProjectionMode =
  | "experimental-portfolio"
  | "method-to-product"
  | "validation-matrix"
  | "transfer-map";

const productProjectionModes: ProductProjectionMode[] = [
  "experimental-portfolio",
  "method-to-product",
  "validation-matrix",
  "transfer-map",
];

export function isProductProjectionMode(value: string): value is ProductProjectionMode {
  return productProjectionModes.includes(value as ProductProjectionMode);
}

type MethodDefinition = {
  id: string;
  label: string;
  description: string;
};

type ProductExperiment = {
  id: string;
  label: string;
  shortLabel: string;
  kind: "product" | "standard" | "research-testbed" | "service" | "historical-proof";
  status: string;
  posture: string;
  sourceRef: string;
  testEnvironment: string;
  whySelected: string;
  proposition: string;
  methods: string[];
  validation: string[];
  failureSignals: string[];
  transferTargets: string[];
  claimBoundary: string;
};

type ProductProjectionData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  coverageNote: string;
  methods: MethodDefinition[];
  experiments: ProductExperiment[];
};

const productData = productSource as ProductProjectionData;

const modeLabels: Record<ProductProjectionMode, { label: string; description: string }> = {
  "experimental-portfolio": {
    label: "Experimental Portfolio",
    description: "Read selected products as test environments: why each was chosen, what proposition it exercises, and what the Lab is trying to learn from it.",
  },
  "method-to-product": {
    label: "Method → Product",
    description: "Trace reusable Lab methods into the products, standards, pilots, and historical systems that exercise them.",
  },
  "validation-matrix": {
    label: "What We Are Testing",
    description: "Compare proposition, evidence target, failure condition, and current claim posture without mistaking a working artifact for validation.",
  },
  "transfer-map": {
    label: "Lessons That Transfer",
    description: "Inspect which results are intended to leave the originating domain and become reusable methods, diagnostics, representations, or institutional capabilities.",
  },
};

const kindLabels: Record<ProductExperiment["kind"], string> = {
  product: "Product",
  standard: "Standard",
  "research-testbed": "Research testbed",
  service: "Pilot service",
  "historical-proof": "Historical proof",
};

export function LabMachineProductsProjection({
  initialMode = "experimental-portfolio",
  onBack,
  onClose,
}: {
  initialMode?: ProductProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<ProductProjectionMode>(initialMode);
  const [kindFilter, setKindFilter] = useState<ProductExperiment["kind"] | "all">("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(productData.experiments[0]?.id ?? null);

  const visibleExperiments = useMemo(() => productData.experiments.filter((experiment) => {
    if (kindFilter !== "all" && experiment.kind !== kindFilter) return false;
    if (methodFilter !== "all" && !experiment.methods.includes(methodFilter)) return false;
    return true;
  }), [kindFilter, methodFilter]);

  const selectedExperiment = productData.experiments.find((experiment) => experiment.id === selectedExperimentId) ?? null;
  const selectedVisible = selectedExperiment && visibleExperiments.some((experiment) => experiment.id === selectedExperiment.id)
    ? selectedExperiment
    : visibleExperiments[0] ?? null;

  const activeMethodCount = new Set(visibleExperiments.flatMap((experiment) => experiment.methods)).size;

  return (
    <LabMachineProjectionShell
      subsystem="Products"
      projection={modeLabels[mode].label}
      eyebrow="PRODUCT PROJECTION · EXPERIMENTAL EMBODIMENT"
      title="Why the Lab Builds These Things"
      description={modeLabels[mode].description}
      status={`${visibleExperiments.length} ENVIRONMENTS · ${activeMethodCount} METHODS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-products-projection">
        <section className="bf-products-projection__controls" aria-label="Product projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>
              {productProjectionModes.map((candidate) => (
                <button
                  type="button"
                  key={candidate}
                  aria-pressed={mode === candidate}
                  onClick={() => setMode(candidate)}
                >
                  {modeLabels[candidate].label}
                </button>
              ))}
            </span>
          </div>
          <p>{productData.coverageNote}</p>
        </section>

        <section className="bf-products-projection__filters" aria-label="Product experiment filters">
          <div>
            <small>OBJECT TYPE</small>
            <button type="button" aria-pressed={kindFilter === "all"} onClick={() => setKindFilter("all")}>ALL</button>
            {(Object.keys(kindLabels) as ProductExperiment["kind"][]).map((kind) => (
              <button type="button" key={kind} aria-pressed={kindFilter === kind} onClick={() => setKindFilter(kind)}>{kindLabels[kind]}</button>
            ))}
          </div>
          <div>
            <small>METHOD</small>
            <button type="button" aria-pressed={methodFilter === "all"} onClick={() => setMethodFilter("all")}>ALL</button>
            {productData.methods.map((method) => (
              <button type="button" key={method.id} aria-pressed={methodFilter === method.id} onClick={() => setMethodFilter(method.id)}>{method.label}</button>
            ))}
          </div>
        </section>

        <section className="bf-products-projection__readout" aria-label="Product program readout">
          <div><small>VISIBLE</small><strong>{visibleExperiments.length}</strong></div>
          <div><small>METHODS IN PLAY</small><strong>{activeMethodCount}</strong></div>
          <div><small>PROGRAM POSTURE</small><strong>TEST, MEASURE, TRANSFER</strong></div>
          <p>Product status and product usefulness are not validation claims. Each environment retains an explicit claim boundary.</p>
        </section>

        {mode === "experimental-portfolio" ? (
          <ExperimentalPortfolio experiments={visibleExperiments} selectedId={selectedVisible?.id ?? null} onSelect={setSelectedExperimentId} />
        ) : null}
        {mode === "method-to-product" ? (
          <MethodToProduct experiments={visibleExperiments} methods={productData.methods} onSelect={setSelectedExperimentId} />
        ) : null}
        {mode === "validation-matrix" ? (
          <ValidationMatrix experiments={visibleExperiments} onSelect={setSelectedExperimentId} />
        ) : null}
        {mode === "transfer-map" ? (
          <TransferMap experiments={visibleExperiments} methods={productData.methods} onSelect={setSelectedExperimentId} />
        ) : null}

        <ExperimentInspection experiment={selectedVisible} methods={productData.methods} />
      </div>
    </LabMachineProjectionShell>
  );
}

function ExperimentalPortfolio({
  experiments,
  selectedId,
  onSelect,
}: {
  experiments: ProductExperiment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-product-portfolio" aria-label="Experimental portfolio">
      {experiments.map((experiment, index) => (
        <button
          type="button"
          key={experiment.id}
          className="bf-product-experiment-card"
          data-selected={selectedId === experiment.id ? "true" : "false"}
          onClick={() => onSelect(experiment.id)}
        >
          <header><span>{String(index + 1).padStart(2, "0")}</span><small>{kindLabels[experiment.kind]}</small></header>
          <strong>{experiment.label}</strong>
          <em>{experiment.status}</em>
          <p>{experiment.whySelected}</p>
          <dl>
            <div><dt>TEST ENVIRONMENT</dt><dd>{experiment.testEnvironment}</dd></div>
            <div><dt>PROPOSITION</dt><dd>{experiment.proposition}</dd></div>
          </dl>
        </button>
      ))}
    </section>
  );
}

function MethodToProduct({
  experiments,
  methods,
  onSelect,
}: {
  experiments: ProductExperiment[];
  methods: MethodDefinition[];
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-product-method-map" aria-label="Method to product map">
      {methods.map((method) => {
        const linked = experiments.filter((experiment) => experiment.methods.includes(method.id));
        if (!linked.length) return null;
        return (
          <article key={method.id}>
            <header><small>METHOD</small><strong>{method.label}</strong><p>{method.description}</p></header>
            <span className="bf-product-method-map__bus" aria-hidden="true">→</span>
            <div>
              {linked.map((experiment) => (
                <button type="button" key={experiment.id} onClick={() => onSelect(experiment.id)}>
                  <small>{kindLabels[experiment.kind]}</small>
                  <strong>{experiment.shortLabel}</strong>
                  <span>{experiment.posture}</span>
                </button>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function ValidationMatrix({ experiments, onSelect }: { experiments: ProductExperiment[]; onSelect: (id: string) => void }) {
  return (
    <div className="bf-product-validation-matrix" role="region" aria-label="Product validation matrix" tabIndex={0}>
      <table>
        <thead><tr><th>Environment</th><th>Proposition</th><th>Evidence sought</th><th>Failure / falsification signal</th><th>Posture</th></tr></thead>
        <tbody>
          {experiments.map((experiment) => (
            <tr key={experiment.id} onClick={() => onSelect(experiment.id)}>
              <th scope="row"><button type="button" onClick={() => onSelect(experiment.id)}>{experiment.shortLabel}</button></th>
              <td>{experiment.proposition}</td>
              <td><ul>{experiment.validation.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></td>
              <td><ul>{experiment.failureSignals.slice(0, 2).map((item) => <li key={item}>{item}</li>)}</ul></td>
              <td><strong>{experiment.status}</strong><small>{experiment.posture}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransferMap({
  experiments,
  methods,
  onSelect,
}: {
  experiments: ProductExperiment[];
  methods: MethodDefinition[];
  onSelect: (id: string) => void;
}) {
  const methodById = new Map(methods.map((method) => [method.id, method.label]));
  return (
    <section className="bf-product-transfer-map" aria-label="Product transfer map">
      {experiments.map((experiment) => (
        <button type="button" key={experiment.id} onClick={() => onSelect(experiment.id)}>
          <div><small>ORIGIN ENVIRONMENT</small><strong>{experiment.shortLabel}</strong><span>{experiment.testEnvironment}</span></div>
          <b aria-hidden="true">→</b>
          <div><small>METHODS EXERCISED</small>{experiment.methods.map((method) => <span key={method}>{methodById.get(method) ?? method}</span>)}</div>
          <b aria-hidden="true">→</b>
          <div><small>TRANSFER TARGETS</small>{experiment.transferTargets.map((target) => <span key={target}>{target}</span>)}</div>
        </button>
      ))}
    </section>
  );
}

function ExperimentInspection({ experiment, methods }: { experiment: ProductExperiment | null; methods: MethodDefinition[] }) {
  if (!experiment) {
    return <aside className="bf-product-inspection"><small>THROUGH · EXPERIMENT INSPECTION</small><h3>No environment matches the current filter.</h3></aside>;
  }
  const methodById = new Map(methods.map((method) => [method.id, method.label]));
  return (
    <aside className="bf-product-inspection" aria-live="polite">
      <header>
        <div><small>THROUGH · EXPERIMENT INSPECTION</small><h3>{experiment.label}</h3></div>
        <span>{experiment.status}</span>
      </header>
      <p>{experiment.whySelected}</p>
      <div className="bf-product-inspection__grid">
        <section><small>PROPOSITION UNDER TEST</small><p>{experiment.proposition}</p></section>
        <section><small>METHODS EXERCISED</small><ul>{experiment.methods.map((method) => <li key={method}>{methodById.get(method) ?? method}</li>)}</ul></section>
        <section><small>VALIDATION SIGNALS</small><ul>{experiment.validation.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>FAILURE SIGNALS</small><ul>{experiment.failureSignals.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>TRANSFER TARGETS</small><ul>{experiment.transferTargets.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>CLAIM BOUNDARY</small><p>{experiment.claimBoundary}</p></section>
      </div>
      <footer><small>SOURCE SURFACE</small><span>{experiment.sourceRef}</span></footer>
    </aside>
  );
}

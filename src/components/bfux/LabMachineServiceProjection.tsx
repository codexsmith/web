"use client";

import { useMemo, useState } from "react";
import serviceSource from "@/content/lab-machine-service.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-service.css";

export type ServiceProjectionMode = "distribution-map";

export function isServiceProjectionMode(value: string): value is ServiceProjectionMode {
  return value === "distribution-map";
}

type ContractItem = { id: string; label: string; question: string; failure: string };
type Carrier = { id: string; label: string; status: string; role: string };
type Package = {
  id: string;
  label: string;
  source: string;
  standing: string;
  carrierIds: string[];
  input: string;
  packaging: string[];
  interfaces: string[];
  audience: string;
  semanticPayload: string[];
  reuseWitness: string[];
  feedbackPath: string;
  claimBoundary: string;
  sourceRef: string;
};
type OpenPort = { id: string; label: string; status: string; requiredBeforeActivation: string[]; note: string };
type ServiceData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  transportContract: ContractItem[];
  carriers: Carrier[];
  packages: Package[];
  openPorts: OpenPort[];
  distributionRule: string;
};

const service = serviceSource as ServiceData;

export function LabMachineServiceProjection({
  initialMode = "distribution-map",
  onBack,
  onClose,
}: {
  initialMode?: ServiceProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode] = useState<ServiceProjectionMode>(initialMode);
  const [selectedPackageId, setSelectedPackageId] = useState(service.packages[0]?.id ?? "");
  const [selectedPortId, setSelectedPortId] = useState(service.openPorts[0]?.id ?? "");
  const [inspection, setInspection] = useState<"package" | "port">("package");

  const carrierById = useMemo(() => new Map(service.carriers.map((carrier) => [carrier.id, carrier])), []);
  const selectedPackage = service.packages.find((item) => item.id === selectedPackageId) ?? service.packages[0];
  const selectedPort = service.openPorts.find((item) => item.id === selectedPortId) ?? service.openPorts[0];
  const activeCarriers = service.carriers.filter((carrier) => service.packages.some((item) => item.carrierIds.includes(carrier.id)));

  return (
    <LabMachineProjectionShell
      subsystem="Service Bus"
      projection="Distribution Map"
      eyebrow="DISTRIBUTION PROJECTION · PACKAGE / INTERFACE / REUSE"
      title="How Useful Work Travels"
      description="Trace capability from its governed source through a reusable carrier and public interface into another person's context without silently losing meaning, evidence, or repairability."
      status={`${service.packages.length} ACTIVE PACKAGES · ${activeCarriers.length} OCCUPIED CARRIERS · ${service.openPorts.length} OPEN / PARTIAL PORTS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-service" data-mode={mode}>
        <section className="bf-service__controls" aria-label="Service Bus posture">
          <div><small>PROJECTION MODE</small><span><button type="button" aria-pressed="true">Distribution Map</button></span></div>
          <p>{service.posture}</p>
        </section>

        <section className="bf-service__contract" aria-label="Semantic transport contract">
          <header><small>SEMANTIC TRANSPORT CONTRACT</small><strong>Copying is not distribution.</strong><p>{service.distributionRule}</p></header>
          <div>{service.transportContract.map((item, index) => (
            <article key={item.id}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item.label}</strong><p>{item.question}</p><span>FAILURE · {item.failure}</span></article>
          ))}</div>
        </section>

        <section className="bf-service__bus" aria-label="Distribution bus">
          <header><small>SERVICE BUS</small><strong>Governed capability → carrier → public interface → external use → feedback</strong></header>
          <div className="bf-service__bus-rail">
            <span><small>01</small><b>CAPABILITY</b></span><i aria-hidden="true">━</i><span><small>02</small><b>PACKAGE</b></span><i aria-hidden="true">━</i><span><small>03</small><b>INTERFACE</b></span><i aria-hidden="true">━</i><span><small>04</small><b>EXTERNAL CONTEXT</b></span><i aria-hidden="true">━</i><span><small>05</small><b>WITNESS / FEEDBACK</b></span>
          </div>
          <div className="bf-service__carrier-bank">
            {service.carriers.map((carrier) => <article key={carrier.id} data-active={activeCarriers.some((item) => item.id === carrier.id) ? "true" : "false"}><small>{carrier.status}</small><strong>{carrier.label}</strong><p>{carrier.role}</p></article>)}
          </div>
        </section>

        <section className="bf-service__packages" aria-label="Active distribution packages">
          <header><small>OCCUPIED LINES</small><strong>Source-backed packages already carrying Lab capability outward</strong></header>
          <div>{service.packages.map((item) => (
            <button key={item.id} type="button" data-selected={inspection === "package" && item.id === selectedPackage.id ? "true" : "false"} onClick={() => { setSelectedPackageId(item.id); setInspection("package"); }}>
              <small>{item.source}</small><strong>{item.label}</strong><span>{item.standing}</span>
              <div>{item.carrierIds.map((carrierId) => <em key={carrierId}>{carrierById.get(carrierId)?.label ?? carrierId}</em>)}</div>
              <p>{item.audience}</p>
            </button>
          ))}</div>
        </section>

        <section className="bf-service__ports" aria-label="Open distribution ports">
          <header><small>OPEN / PARTIAL PORTS</small><strong>Named carrier shapes are not automatically supported services.</strong></header>
          <div>{service.openPorts.map((port) => (
            <button key={port.id} type="button" data-selected={inspection === "port" && port.id === selectedPort.id ? "true" : "false"} onClick={() => { setSelectedPortId(port.id); setInspection("port"); }}>
              <span aria-hidden="true">◌</span><small>{port.status}</small><strong>{port.label}</strong><p>{port.note}</p>
            </button>
          ))}</div>
        </section>

        {inspection === "package" ? <PackageInspection item={selectedPackage} carrierById={carrierById} /> : <PortInspection port={selectedPort} />}
      </div>
    </LabMachineProjectionShell>
  );
}

function PackageInspection({ item, carrierById }: { item: Package; carrierById: Map<string, Carrier> }) {
  return (
    <aside className="bf-service-inspection">
      <header><small>INSPECT · DISTRIBUTION PACKAGE</small><h3>{item.label}</h3><span>{item.standing}</span></header>
      <p>{item.input}</p>
      <div className="bf-service-inspection__route">
        <section><small>SOURCE</small><strong>{item.source}</strong></section><b aria-hidden="true">→</b>
        <section><small>CARRIERS</small><strong>{item.carrierIds.map((id) => carrierById.get(id)?.label ?? id).join(" · ")}</strong></section><b aria-hidden="true">→</b>
        <section><small>AUDIENCE</small><strong>{item.audience}</strong></section><b aria-hidden="true">↶</b>
        <section><small>FEEDBACK</small><strong>{item.feedbackPath}</strong></section>
      </div>
      <div className="bf-service-inspection__grid">
        <section><small>PACKAGED AS</small><ul>{item.packaging.map((value) => <li key={value}>{value}</li>)}</ul></section>
        <section><small>INTERFACES</small><ul>{item.interfaces.map((value) => <li key={value}>{value}</li>)}</ul></section>
        <section><small>SEMANTIC PAYLOAD</small><ul>{item.semanticPayload.map((value) => <li key={value}>{value}</li>)}</ul></section>
        <section><small>REUSE WITNESS</small><ul>{item.reuseWitness.map((value) => <li key={value}>{value}</li>)}</ul></section>
        <section className="bf-service-inspection__wide"><small>CLAIM BOUNDARY</small><p>{item.claimBoundary}</p></section>
        <section className="bf-service-inspection__wide"><small>SOURCE SURFACE</small><p>{item.sourceRef}</p></section>
      </div>
    </aside>
  );
}

function PortInspection({ port }: { port: OpenPort }) {
  return (
    <aside className="bf-service-inspection">
      <header><small>INSPECT · DISTRIBUTION PORT</small><h3>{port.label}</h3><span>{port.status}</span></header>
      <p>{port.note}</p>
      <div className="bf-service-inspection__grid">
        <section className="bf-service-inspection__wide"><small>REQUIRED BEFORE ACTIVATION</small><ol>{port.requiredBeforeActivation.map((value) => <li key={value}>{value}</li>)}</ol></section>
        <section className="bf-service-inspection__wide"><small>BOUNDARY</small><p>A named transport shape becomes an occupied Service Bus line only when there is a source-backed package, a maintained interface contract, a reuse witness, and a correction path.</p></section>
      </div>
    </aside>
  );
}

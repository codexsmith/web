import { labSnapshot } from "@/lib/lab-snapshot";

export function LabSnapshot() {
  return (
    <section className="lab-snapshot" aria-label="Boundary First Labs corpus snapshot">
      <header className="lab-snapshot__header">
        <span className="lab-snapshot__register">LAB SNAPSHOT</span>
        <h2>Corpus &amp; control plane</h2>
        <p>Static public projection of the machinery behind the site.</p>
      </header>

      <div className="lab-snapshot__metrics">
        {labSnapshot.metrics.map((metric) => (
          <div className="lab-snapshot__metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
          </div>
        ))}
      </div>

      <footer className="lab-snapshot__meta">
        <span>STATIC · {labSnapshot.snapshotDate}</span>
        <small>Sources measured {labSnapshot.sourceWindow}</small>
        <p>{labSnapshot.note}</p>
      </footer>
    </section>
  );
}

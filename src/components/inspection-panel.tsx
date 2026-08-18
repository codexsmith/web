"use client";

import type { Inspection } from "@/lib/content";

type InspectionPanelProps = {
  inspection: Inspection;
  onClose: () => void;
};

export function InspectionPanel({ inspection, onClose }: InspectionPanelProps) {
  return (
    <div className="inspection-layer" role="dialog" aria-modal="true" aria-labelledby="inspection-title">
      <button className="inspection-layer__backdrop" onClick={onClose} aria-label="Close inspection" />
      <section className="inspection-panel">
        <div className="inspection-panel__rail">
          <span>Through</span>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="inspection-panel__content">
          <p className="eyebrow">{inspection.eyebrow}</p>
          <h2 id="inspection-title">{inspection.label}</h2>
          <p className="lede">{inspection.summary}</p>
          <ul>
            {inspection.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

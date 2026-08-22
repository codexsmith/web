"use client";

import { useState } from "react";
import { BoundaryFirstWaveLogo } from "./BoundaryFirstWaveLogo";

export function LogoPlayground() {
  const [boundary, setBoundary] = useState("#1A254B");
  const [field, setField] = useState("#4E7376");
  const [depth, setDepth] = useState("#304B5E");
  const [witness, setWitness] = useState("#1A254B");
  const [spark, setSpark] = useState("#1A254B");

  const controls = [
    ["Boundary", boundary, setBoundary],
    ["Field", field, setField],
    ["Depth", depth, setDepth],
    ["Witness", witness, setWitness],
    ["Spark", spark, setSpark],
  ] as const;

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 720 }}>
      <BoundaryFirstWaveLogo
        boundary={boundary}
        field={field}
        depth={depth}
        witness={witness}
        spark={spark}
        style={{ width: "min(100%, 520px)" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {controls.map(([label, value, setter]) => (
          <label key={label} style={{ display: "grid", gap: 6 }}>
            <span>{label}</span>
            <input
              type="color"
              value={value}
              onChange={(event) => setter(event.target.value)}
            />
            <code>{value}</code>
          </label>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, type DragEvent } from "react";
import "./bfux-parts-box.css";

type PartFamily = "connector" | "tube" | "panel";
type PartKind =
  | "single"
  | "multi"
  | "plex"
  | "extended"
  | "port"
  | "tube"
  | "elbow"
  | "module"
  | "module-wide";

type PartDefinition = {
  id: string;
  family: PartFamily;
  kind: PartKind;
  label: string;
  detail: string;
};

const partGroups: Array<{ label: string; parts: PartDefinition[] }> = [
  {
    label: "CONNECTORS",
    parts: [
      { id: "connector.single", family: "connector", kind: "single", label: "SINGLE", detail: "one contact" },
      { id: "connector.multi", family: "connector", kind: "multi", label: "MULTI", detail: "contact bank" },
      { id: "connector.plex", family: "connector", kind: "plex", label: "PLEX", detail: "six-contact bank" },
      { id: "connector.extended", family: "connector", kind: "extended", label: "EXTENDED", detail: "rail + neck" },
      { id: "connector.port", family: "connector", kind: "port", label: "PORT", detail: "single jack" },
    ],
  },
  {
    label: "TUBES",
    parts: [
      { id: "tube.straight", family: "tube", kind: "tube", label: "TUBE", detail: "straight run" },
      { id: "tube.elbow", family: "tube", kind: "elbow", label: "ELBOW", detail: "90° run" },
    ],
  },
  {
    label: "PANELS",
    parts: [
      { id: "panel.module", family: "panel", kind: "module", label: "MODULE", detail: "instrument panel" },
      { id: "panel.module-wide", family: "panel", kind: "module-wide", label: "WIDE MODULE", detail: "wide instrument panel" },
    ],
  },
];

function Contacts({ count }: { count: number }) {
  return <>{Array.from({ length: count }, (_, index) => <i key={index} />)}</>;
}

function PartPreview({ kind }: { kind: PartKind }) {
  if (kind === "single") {
    return <span className="bfux-part-glyph bfux-part-glyph--single"><span className="bfux-part-bank"><Contacts count={1} /></span></span>;
  }
  if (kind === "multi") {
    return <span className="bfux-part-glyph bfux-part-glyph--multi"><span className="bfux-part-bank"><Contacts count={4} /></span></span>;
  }
  if (kind === "plex") {
    return <span className="bfux-part-glyph bfux-part-glyph--plex"><span className="bfux-part-bank"><Contacts count={6} /></span></span>;
  }
  if (kind === "extended") {
    return (
      <span className="bfux-part-glyph bfux-part-glyph--extended">
        <span className="bfux-part-rail"><Contacts count={5} /></span>
        <span className="bfux-part-neck"><i /></span>
      </span>
    );
  }
  if (kind === "port") {
    return <span className="bfux-part-glyph bfux-part-glyph--port"><i /></span>;
  }
  if (kind === "tube") {
    return <span className="bfux-part-glyph bfux-part-glyph--tube"><i /><b /></span>;
  }
  if (kind === "elbow") {
    return <span className="bfux-part-glyph bfux-part-glyph--elbow"><i /><b /></span>;
  }
  if (kind === "module-wide") {
    return (
      <span className="bfux-part-glyph bfux-part-glyph--module bfux-part-glyph--module-wide">
        <i /><i /><i /><i /><b />
      </span>
    );
  }
  return (
    <span className="bfux-part-glyph bfux-part-glyph--module">
      <i /><i /><i /><i /><b />
    </span>
  );
}

export function BfuxPartsBox() {
  const [selected, setSelected] = useState("connector.single");

  const beginDrag = (event: DragEvent<HTMLButtonElement>, part: PartDefinition) => {
    const payload = JSON.stringify({
      schema: "bfux.part/v1",
      id: part.id,
      family: part.family,
      label: part.label,
    });

    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/x-bfux-part", payload);
    event.dataTransfer.setData("text/plain", part.id);
    setSelected(part.id);
  };

  return (
    <details className="bfux-parts-box" open>
      <summary>
        <span>PARTS BOX</span>
        <small>LIVE MACHINE PRIMITIVES · DRAG-READY</small>
      </summary>

      <div className="bfux-parts-box__body">
        {partGroups.map((group) => (
          <section className="bfux-parts-box__group" key={group.label}>
            <header>{group.label}</header>
            <div className="bfux-parts-box__grid">
              {group.parts.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  draggable
                  data-selected={selected === part.id ? "true" : undefined}
                  data-family={part.family}
                  onClick={() => setSelected(part.id)}
                  onDragStart={(event) => beginDrag(event, part)}
                  title={`${part.label} · ${part.detail}`}
                >
                  <PartPreview kind={part.kind} />
                  <span className="bfux-parts-box__label">
                    <b>{part.label}</b>
                    <small>{part.detail}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <div className="bfux-parts-box__selection">
          <span>SELECTED</span>
          <code>{selected}</code>
          <small>PART PAYLOAD READY</small>
        </div>
      </div>
    </details>
  );
}

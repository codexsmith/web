"use client";
import { useEffect, useRef } from "react";
import { mountPublicInstruments } from "./publicInstrumentRuntime";
import { instrumentMarkup } from "./content/publicInstrumentMarkup";

// Markup is generated from fixed, escaped editorial data. No user-supplied HTML.
export function PublicInstrumentControls() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { if (root.current) return mountPublicInstruments(root.current); }, []);
  return <div ref={root} data-instrument-collection dangerouslySetInnerHTML={{ __html: instrumentMarkup }} />;
}

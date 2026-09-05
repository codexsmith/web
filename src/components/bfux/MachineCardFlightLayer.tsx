"use client";

import { useEffect, useState, type CSSProperties } from "react";

const machineCardFlightEvent = "bfl:machine-card-flight";
const machineCardFlightDuration = 840;

type MachineCardFlight = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  tone: string;
};

export function startMachineCardFlight(source: HTMLElement) {
  const rect = source.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return false;

  window.dispatchEvent(new CustomEvent(machineCardFlightEvent, {
    detail: {
      id: window.performance.now(),
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      tone: source.dataset.tone ?? "slate",
    } satisfies MachineCardFlight,
  }));
  return true;
}

export function MachineCardFlightLayer() {
  const [flight, setFlight] = useState<MachineCardFlight | null>(null);

  useEffect(() => {
    const startFlight = (event: Event) => {
      setFlight((event as CustomEvent<MachineCardFlight>).detail);
    };

    window.addEventListener(machineCardFlightEvent, startFlight);
    return () => window.removeEventListener(machineCardFlightEvent, startFlight);
  }, []);

  useEffect(() => {
    if (!flight) return;
    const timer = window.setTimeout(() => setFlight(null), machineCardFlightDuration);
    return () => window.clearTimeout(timer);
  }, [flight]);

  if (!flight) return null;

  return (
    <div
      key={flight.id}
      className="bf-machine-card-flight"
      data-tone={flight.tone}
      style={{
        "--card-flight-left": `${flight.left}px`,
        "--card-flight-top": `${flight.top}px`,
        "--card-flight-width": `${flight.width}px`,
        "--card-flight-height": `${flight.height}px`,
      } as CSSProperties}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </div>
  );
}

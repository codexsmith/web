"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { labMachineRevealEvent } from "./LabMachine";
import { RepresentationLabBillboardCard } from "./RepresentationLabBillboardCard";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';

export function RepresentationLabBillboardCardMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const findHost = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setHost((current) => (current === next ? current : next));
    };

    const scheduleFind = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(findHost);
    };

    scheduleFind();

    const observer = new MutationObserver(scheduleFind);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-skin", "data-resolution"],
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!host) return;

    let firstFrame = 0;
    let secondFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    const machine = host.closest<HTMLElement>('.bf-machine[data-skin="physical"]');

    function scheduleReveal() {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(revealBillboard);
      });
    }

    function revealBillboard() {
      const billboard = host.querySelector<HTMLElement>(billboardSelector);
      if (!billboard) return;

      // LabMachine already knows how to pan a revealed node into the visible
      // instrument viewport. Reuse that contract so the new card participates
      // in initial framing instead of being treated as decorative overflow.
      billboard.dispatchEvent(new CustomEvent(labMachineRevealEvent, { bubbles: true }));

      if (!resizeObserver) {
        resizeObserver = new ResizeObserver(scheduleReveal);
        resizeObserver.observe(billboard);
      }
    }

    scheduleReveal();

    const machineObserver = new MutationObserver(scheduleReveal);
    if (machine) {
      machineObserver.observe(machine, {
        attributes: true,
        attributeFilter: ["data-resolution", "data-skin"],
      });
    }
    window.addEventListener("resize", scheduleReveal);

    return () => {
      machineObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleReveal);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [host]);

  if (!host) return null;

  return createPortal(
    <RepresentationLabBillboardCard />,
    host,
    "representation-lab-billboard-card",
  );
}
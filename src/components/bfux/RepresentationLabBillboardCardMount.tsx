"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RepresentationLabBillboardCard } from "./RepresentationLabBillboardCard";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';

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

  if (!host) return null;

  return createPortal(
    <RepresentationLabBillboardCard />,
    host,
    "representation-lab-billboard-card",
  );
}
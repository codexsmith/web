"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { labMachineRevealEvent } from "./LabMachine";
import { RepresentationLabBillboardCard } from "./RepresentationLabBillboardCard";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const productsSelector = '.bf-machine-node[data-node-id="products"]';
const desktopProjectionQuery = "(min-width: 1025px)";
const billboardGap = 8;

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

    function alignBillboardToProducts() {
      const billboard = host.querySelector<HTMLElement>(billboardSelector);
      const products = host.querySelector<HTMLElement>(productsSelector);
      if (!billboard || !products) return billboard;

      if (!window.matchMedia(desktopProjectionQuery).matches) {
        billboard.style.removeProperty("left");
        billboard.style.removeProperty("top");
        return billboard;
      }

      const hostRect = host.getBoundingClientRect();
      const productsRect = products.getBoundingClientRect();
      const scaleX = host.offsetWidth > 0 ? hostRect.width / host.offsetWidth : 1;
      const scaleY = host.offsetHeight > 0 ? hostRect.height / host.offsetHeight : scaleX;
      const productCenterX = (productsRect.left - hostRect.left + productsRect.width / 2) / scaleX;
      const productTop = (productsRect.top - hostRect.top) / scaleY;
      const left = productCenterX - billboard.offsetWidth / 2;
      const top = productTop - billboard.offsetHeight - billboardGap;

      // These two coordinates are the only runtime override. Width, height,
      // content layout, and every other card remain owned by their CSS.
      billboard.style.setProperty("left", `${left}px`, "important");
      billboard.style.setProperty("top", `${top}px`, "important");
      billboard.dataset.billboardAnchor = "products-above";

      return billboard;
    }

    function settleBillboard() {
      const billboard = alignBillboardToProducts();
      if (!billboard) return;

      // Request containment only after the billboard is in its final position,
      // so on-load framing includes the actual Products-anchored card.
      billboard.dispatchEvent(new CustomEvent(labMachineRevealEvent, { bubbles: true }));

      if (!resizeObserver) {
        const products = host.querySelector<HTMLElement>(productsSelector);
        resizeObserver = new ResizeObserver(scheduleSettle);
        resizeObserver.observe(billboard);
        if (products) resizeObserver.observe(products);
      }
    }

    function scheduleSettle() {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(settleBillboard);
      });
    }

    scheduleSettle();

    const machineObserver = new MutationObserver(scheduleSettle);
    if (machine) {
      machineObserver.observe(machine, {
        attributes: true,
        attributeFilter: ["data-resolution", "data-skin"],
      });
    }
    window.addEventListener("resize", scheduleSettle);

    return () => {
      machineObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleSettle);
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

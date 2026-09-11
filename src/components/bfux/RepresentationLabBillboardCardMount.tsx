"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { labMachineRevealEvent } from "./LabMachine";
import { RepresentationLabBillboardCard } from "./RepresentationLabBillboardCard";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const productsSelector = '.bf-machine-node[data-node-id="products"]';
const desktopProjectionQuery = "(min-width: 1025px)";
const layoutTuningEvent = "bfux-layout-tuning";

export function RepresentationLabBillboardCardMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const findHost = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setHost((current) => (current === next ? current : next));
    };

    const scheduleFind = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(findHost);
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
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!host) return;
    const currentHost = host;
    const machine = currentHost.closest<HTMLElement>('.bf-machine[data-skin="physical"]');
    let lastResolution = machine?.dataset.resolution ?? "";
    let frameOne = 0;
    let frameTwo = 0;
    let revealFrame = 0;
    let revealAfterAlign = true;

    const align = () => {
      const billboard = currentHost.querySelector<HTMLElement>(billboardSelector);
      const products = currentHost.querySelector<HTMLElement>(productsSelector);
      if (!billboard || !products) return;

      if (!matchMedia(desktopProjectionQuery).matches) {
        billboard.style.removeProperty("left");
        billboard.style.removeProperty("top");
        delete billboard.dataset.billboardAnchor;
        return;
      }

      const hostRect = currentHost.getBoundingClientRect();
      const billboardRect = billboard.getBoundingClientRect();
      const productsRect = products.getBoundingClientRect();
      const billboardShellRect = billboard.querySelector<HTMLElement>(".bf-machine-node__shell")?.getBoundingClientRect();
      const productsShellRect = products.querySelector<HTMLElement>(".bf-machine-node__shell")?.getBoundingClientRect();
      const scaleX = currentHost.offsetWidth > 0 ? hostRect.width / currentHost.offsetWidth : 1;
      const scaleY = currentHost.offsetHeight > 0 ? hostRect.height / currentHost.offsetHeight : scaleX;
      const productCenterX = (productsRect.left - hostRect.left + productsRect.width / 2) / scaleX;
      const productTop = ((productsShellRect?.top ?? productsRect.top) - hostRect.top) / scaleY;
      const billboardBottomOffset = ((billboardShellRect?.bottom ?? billboardRect.bottom) - billboardRect.top) / scaleY;
      const gapY = Number.parseFloat(getComputedStyle(billboard).getPropertyValue("--billboard-gap-y")) || 0;
      const left = productCenterX - billboard.offsetWidth / 2;
      const top = productTop - billboardBottomOffset - gapY;

      billboard.style.setProperty("left", `${left}px`, "important");
      billboard.style.setProperty("top", `${top}px`, "important");
      billboard.dataset.billboardAnchor = "products-above";

      if (revealAfterAlign) {
        revealAfterAlign = false;
        cancelAnimationFrame(revealFrame);
        revealFrame = requestAnimationFrame(() => {
          billboard.dispatchEvent(new CustomEvent(labMachineRevealEvent, { bubbles: true }));
        });
      }
    };

    const scheduleAlign = (reveal = false) => {
      revealAfterAlign = revealAfterAlign || reveal;
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      frameOne = requestAnimationFrame(() => {
        frameTwo = requestAnimationFrame(align);
      });
    };

    scheduleAlign(true);

    const resizeObserver = new ResizeObserver(() => scheduleAlign(false));
    const observeCurrentGeometry = () => {
      resizeObserver.disconnect();
      const billboard = currentHost.querySelector<HTMLElement>(billboardSelector);
      const products = currentHost.querySelector<HTMLElement>(productsSelector);
      if (billboard) resizeObserver.observe(billboard);
      if (products) resizeObserver.observe(products);
    };
    observeCurrentGeometry();

    const machineObserver = new MutationObserver(() => {
      const nextResolution = machine?.dataset.resolution ?? "";
      const resolutionChanged = nextResolution !== lastResolution;
      lastResolution = nextResolution;
      observeCurrentGeometry();
      scheduleAlign(resolutionChanged);
    });

    if (machine) {
      machineObserver.observe(machine, {
        attributes: true,
        attributeFilter: ["data-resolution", "data-skin"],
      });
    }

    const handleResize = () => scheduleAlign(false);
    const handleTuning = () => scheduleAlign(false);
    window.addEventListener("resize", handleResize);
    currentHost.addEventListener(layoutTuningEvent, handleTuning);

    return () => {
      resizeObserver.disconnect();
      machineObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      currentHost.removeEventListener(layoutTuningEvent, handleTuning);
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      cancelAnimationFrame(revealFrame);
    };
  }, [host]);

  if (!host) return null;

  return createPortal(
    <RepresentationLabBillboardCard />,
    host,
    "representation-lab-billboard-card",
  );
}

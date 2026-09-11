"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { labMachineRevealEvent } from "./LabMachine";
import { RepresentationLabBillboardCard } from "./RepresentationLabBillboardCard";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const billboardSelector = '.bf-machine-node--billboard[data-node-id="representation-lab"]';
const productsSelector = '.bf-machine-node[data-node-id="products"]';
const desktopProjectionQuery = "(min-width: 1025px)";

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
    const currentHost = host;

    let firstFrame = 0;
    let secondFrame = 0;
    let revealFrameOne = 0;
    let revealFrameTwo = 0;
    let pendingReveal = false;
    let productsObserver: ResizeObserver | null = null;
    const machine = currentHost.closest<HTMLElement>('.bf-machine[data-skin="physical"]');
    let lastResolution = machine?.dataset.resolution ?? "";

    function alignBillboardToProducts() {
      const billboard = currentHost.querySelector<HTMLElement>(billboardSelector);
      const products = currentHost.querySelector<HTMLElement>(productsSelector);
      if (!billboard || !products) return billboard;

      if (!window.matchMedia(desktopProjectionQuery).matches) {
        billboard.style.removeProperty("left");
        billboard.style.removeProperty("top");
        delete billboard.dataset.billboardAnchor;
        return billboard;
      }

      const hostRect = currentHost.getBoundingClientRect();
      const billboardRect = billboard.getBoundingClientRect();
      const productsRect = products.getBoundingClientRect();
      const billboardShellRect = billboard
        .querySelector<HTMLElement>(".bf-machine-node__shell")
        ?.getBoundingClientRect();
      const productsShellRect = products
        .querySelector<HTMLElement>(".bf-machine-node__shell")
        ?.getBoundingClientRect();
      const scaleX = currentHost.offsetWidth > 0 ? hostRect.width / currentHost.offsetWidth : 1;
      const scaleY = currentHost.offsetHeight > 0 ? hostRect.height / currentHost.offsetHeight : scaleX;
      const productCenterX = (productsRect.left - hostRect.left + productsRect.width / 2) / scaleX;
      const productTop = ((productsShellRect?.top ?? productsRect.top) - hostRect.top) / scaleY;
      const billboardBottomOffset = (
        (billboardShellRect?.bottom ?? billboardRect.bottom) - billboardRect.top
      ) / scaleY;
      const left = productCenterX - billboard.offsetWidth / 2;
      const top = productTop - billboardBottomOffset;

      billboard.style.setProperty("left", `${left}px`, "important");
      billboard.style.setProperty("top", `${top}px`, "important");
      billboard.dataset.billboardAnchor = "products-above";

      return billboard;
    }

    function requestOneShotReveal(billboard: HTMLElement) {
      window.cancelAnimationFrame(revealFrameOne);
      window.cancelAnimationFrame(revealFrameTwo);

      // LabMachine's own resolution containment also settles over two frames.
      // Wait for that pass to finish, then reveal this extra top-deck card once.
      // Repeating this event while auto-pan is still moving causes additive pan
      // deltas and was the source of the runaway "scrolling upward" behavior.
      revealFrameOne = window.requestAnimationFrame(() => {
        revealFrameTwo = window.requestAnimationFrame(() => {
          billboard.dispatchEvent(new CustomEvent(labMachineRevealEvent, { bubbles: true }));
        });
      });
    }

    function settleBillboard() {
      const billboard = alignBillboardToProducts();
      if (!billboard) return;

      if (pendingReveal) {
        pendingReveal = false;
        requestOneShotReveal(billboard);
      }

      // Products may change physical size as the machine projection settles.
      // Re-align to that geometry, but never turn a resize into another reveal.
      if (!productsObserver) {
        const products = currentHost.querySelector<HTMLElement>(productsSelector);
        if (products) {
          productsObserver = new ResizeObserver(() => scheduleSettle(false));
          productsObserver.observe(products);
        }
      }
    }

    function scheduleSettle(reveal = false) {
      pendingReveal = pendingReveal || reveal;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(settleBillboard);
      });
    }

    // Initial mount: align first, then ask the machine to include the billboard
    // in its visible framing exactly once.
    scheduleSettle(true);

    const machineObserver = new MutationObserver(() => {
      const nextResolution = machine?.dataset.resolution ?? "";
      const resolutionChanged = nextResolution !== lastResolution;
      lastResolution = nextResolution;
      scheduleSettle(resolutionChanged);
    });

    if (machine) {
      machineObserver.observe(machine, {
        attributes: true,
        attributeFilter: ["data-resolution", "data-skin"],
      });
    }

    // Browser resizing should keep the card attached to Products, but must not
    // repeatedly auto-pan the whole machine underneath the user's pointer.
    const handleResize = () => scheduleSettle(false);
    window.addEventListener("resize", handleResize);

    return () => {
      machineObserver.disconnect();
      productsObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.cancelAnimationFrame(revealFrameOne);
      window.cancelAnimationFrame(revealFrameTwo);
    };
  }, [host]);

  if (!host) return null;

  return createPortal(
    <RepresentationLabBillboardCard />,
    host,
    "representation-lab-billboard-card",
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

type ProductAccordionMode = "mobile" | "desktop";

type ProductAccordionTarget = {
  key: string;
  label: string;
  element: HTMLElement;
  header: HTMLElement;
  content: HTMLElement;
  contentId: string;
  desktopDefaultOpen: boolean;
};

const mobileBreakpoint = "(max-width: 760px)";
const desktopOpenGroups = new Set([
  "software-systems",
  "methods-standards-services",
]);

function sameTargets(left: ProductAccordionTarget[], right: ProductAccordionTarget[]) {
  return left.length === right.length && left.every((target, index) => {
    const other = right[index];
    return Boolean(other)
      && target.key === other.key
      && target.element === other.element
      && target.header === other.header
      && target.content === other.content
      && target.desktopDefaultOpen === other.desktopDefaultOpen;
  });
}

function discoverTargets(): ProductAccordionTarget[] {
  const world = document.querySelector<HTMLElement>(
    '.products-world[data-world-id="products"]',
  );
  if (!world) return [];

  const groups = Array.from(
    world.querySelectorAll<HTMLElement>(
      '.product-catalog-group[data-catalog-group]',
    ),
  ).flatMap<ProductAccordionTarget>((element) => {
    const key = element.dataset.catalogGroup;
    const header = element.querySelector<HTMLElement>(
      ':scope > .product-catalog-group__header',
    );
    const content = element.querySelector<HTMLElement>(
      ':scope > .product-catalog-grid',
    );
    const label = header?.querySelector<HTMLElement>("h2")?.textContent?.trim();
    if (!key || !header || !content || !label) return [];

    const contentId = `products-accordion-${key}`;
    content.id = contentId;

    return [{
      key,
      label,
      element,
      header,
      content,
      contentId,
      desktopDefaultOpen: desktopOpenGroups.has(key),
    }];
  });

  const lifecycle = world.querySelector<HTMLElement>(
    ':scope > .products-world__lifecycle',
  );
  const lifecycleHeader = lifecycle?.querySelector<HTMLElement>(
    ':scope > .products-world__lifecycle-header',
  );
  const lifecycleContent = lifecycle?.querySelector<HTMLElement>(
    ':scope > .section-region-grid',
  );

  if (lifecycle && lifecycleHeader && lifecycleContent) {
    const contentId = "products-accordion-lifecycle";
    lifecycleContent.id = contentId;
    groups.push({
      key: "lifecycle",
      label: "Lifecycle views",
      element: lifecycle,
      header: lifecycleHeader,
      content: lifecycleContent,
      contentId,
      desktopDefaultOpen: false,
    });
  }

  return groups;
}

export function ProductCatalogAccordionController() {
  const [mode, setMode] = useState<ProductAccordionMode>("mobile");
  const [targets, setTargets] = useState<ProductAccordionTarget[]>([]);
  const [openByKey, setOpenByKey] = useState<Record<string, boolean>>({});
  const scanFrame = useRef(0);

  useEffect(() => {
    const media = window.matchMedia(mobileBreakpoint);
    const syncMode = () => setMode(media.matches ? "mobile" : "desktop");

    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    const scan = () => {
      scanFrame.current = 0;
      const next = discoverTargets();
      setTargets((current) => sameTargets(current, next) ? current : next);
    };

    const scheduleScan = () => {
      if (scanFrame.current !== 0) return;
      scanFrame.current = window.requestAnimationFrame(scan);
    };

    const observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, { childList: true, subtree: true });
    scheduleScan();

    return () => {
      observer.disconnect();
      if (scanFrame.current !== 0) window.cancelAnimationFrame(scanFrame.current);
    };
  }, []);

  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    for (const target of targets) {
      defaults[target.key] = mode === "desktop" ? target.desktopDefaultOpen : false;
    }
    setOpenByKey(defaults);
  }, [mode, targets]);

  useEffect(() => {
    for (const target of targets) {
      target.element.dataset.productAccordion = "true";
      target.element.dataset.productAccordionMode = mode;
      target.element.dataset.productAccordionOpen = openByKey[target.key] ? "true" : "false";
    }

    return () => {
      for (const target of targets) {
        delete target.element.dataset.productAccordion;
        delete target.element.dataset.productAccordionMode;
        delete target.element.dataset.productAccordionOpen;
      }
    };
  }, [mode, openByKey, targets]);

  return (
    <>
      {targets.map((target) => {
        const open = Boolean(openByKey[target.key]);
        return createPortal(
          <button
            className="product-accordion-toggle"
            type="button"
            data-open={open ? "true" : "false"}
            aria-expanded={open}
            aria-controls={target.contentId}
            aria-label={`${open ? "Collapse" : "Expand"} ${target.label}`}
            title={`${open ? "Collapse" : "Expand"} ${target.label}`}
            onClick={() => setOpenByKey((current) => ({
              ...current,
              [target.key]: !open,
            }))}
          >
            <ChevronDown aria-hidden="true" />
          </button>,
          target.header,
          target.key,
        );
      })}
    </>
  );
}

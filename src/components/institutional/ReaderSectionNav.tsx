"use client";

import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from "react";
import type { ReaderSectionEntry } from "./content/readerSectionNavigation";
import styles from "./styles/DoctrineFrontDoor.module.css";

/** Page-local section identity is authored by the page, never inferred from scroll pixels. */
export function ReaderSectionNav({ sections }: { sections: readonly ReaderSectionEntry[] }) {
  const rail = useRef<HTMLElement>(null);
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const pending = useRef<string | null>(null);
  const [active, setActive] = useState(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = rail.current, trigger = summary.current;
    const main = node?.closest("main");
    const header = main?.parentElement?.querySelector<HTMLElement>("header[data-header-compact]");
    if (!node || !trigger || !main || !header) return;
    const targets = sections.map(item => document.getElementById(item.id));
    if (targets.some(target => !target || !main.contains(target))) return;
    // Existing instrument heading anchors are server-rendered. Make them focusable
    // for native fragment traversal without introducing them into the Tab order.
    const addedFocus = targets.filter(target => target && !target.hasAttribute("tabindex") && target.tagName !== "SUMMARY");
    addedFocus.forEach(target => target!.setAttribute("tabindex", "-1"));
    let frame = 0;
    let aligned: { id: string; edge: number; documentTop: number; scroll: number } | null = null;
    const destinationFromHash = () => targets.find(target => target && `#${target.id}` === window.location.hash);
    pending.current = destinationFromHash()?.id ?? null;
    const update = () => {
      frame = 0;
      const primary = header.getBoundingClientRect();
      const primaryHeight = Math.ceil(primary.height);
      const style = getComputedStyle(node);
      const stickyLocal = style.getPropertyValue("--reader-local-sticky").trim() !== "0";
      const localHeight = stickyLocal ? Math.ceil(trigger.getBoundingClientRect().height +
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)) : 0;
      main.style.setProperty("--reader-primary-rail-height", `${primaryHeight}px`);
      main.style.setProperty("--reader-section-rail-height", `${localHeight}px`);
      node.style.setProperty("--reader-primary-rail-height", `${primaryHeight}px`);
      setReady(true);

      // One measured reading edge governs fragment placement and current identity.
      // The 10px clearance is the same as the native fragment scroll margin.
      const edge = primaryHeight + localHeight;
      const destination = destinationFromHash();
      let requestedIndex = -1;
      if (destination && destination.id === pending.current) {
        const documentTop = destination.getBoundingClientRect().top + window.scrollY;
        if (aligned?.id === destination.id &&
            Math.abs(aligned.edge - edge) <= 1 &&
            Math.abs(aligned.documentTop - documentTop) <= 1 &&
            Math.abs(aligned.scroll - window.scrollY) > 2) {
          // Independent scrolling (including assistive navigation) ends alignment.
          pending.current = null;
          aligned = null;
        } else {
          const scroller = document.scrollingElement;
          const maximum = Math.max(0, (scroller?.scrollHeight ?? 0) - innerHeight);
          const goal = Math.max(0, Math.min(maximum, documentTop - edge - 10));
          // A shrinking header can leave a destination too LOW as well as too high.
          if (Math.abs(window.scrollY - goal) > 1) {
            window.scrollTo({ top: goal, behavior: "instant" });
          }
          aligned = { id: destination.id, edge, documentTop, scroll: window.scrollY };
          const rect = destination.getBoundingClientRect();
          if (rect.top >= edge - 1 && rect.top < innerHeight) {
            requestedIndex = targets.indexOf(destination);
          }
        }
      }
      let current = -1;
      for (let i = 0; i < targets.length; i++) {
        if (targets[i]!.getBoundingClientRect().top <= edge + 14) current = i;
      }
      // At a bounded document end the requested section may be visible without
      // being able to reach the reading edge. Preserve its explicit location.
      setActive(requestedIndex >= 0 ? requestedIndex : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopAlignment = () => { pending.current = null; aligned = null; };
    const onHashChange = () => {
      aligned = null;
      pending.current = destinationFromHash()?.id ?? null;
      schedule();
    };
    const outside = (event: PointerEvent) => {
      if (details.current?.open && event.target instanceof Node && !node.contains(event.target)) details.current.open = false;
      stopAlignment();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(header);
    observer.observe(trigger);
    observer.observe(main);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", stopAlignment, { passive: true });
    window.addEventListener("touchstart", stopAlignment, { passive: true });
    window.addEventListener("keydown", stopAlignment);
    document.addEventListener("pointerdown", outside);
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", stopAlignment);
      window.removeEventListener("touchstart", stopAlignment);
      window.removeEventListener("keydown", stopAlignment);
      document.removeEventListener("pointerdown", outside);
      main.style.removeProperty("--reader-primary-rail-height");
      main.style.removeProperty("--reader-section-rail-height");
      node.style.removeProperty("--reader-primary-rail-height");
      addedFocus.forEach(target => target!.removeAttribute("tabindex"));
      pending.current = null;
    };
  }, [sections]);

  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target || !rail.current?.closest("main")?.contains(target)) return;
    // Retain native fragment/history behavior; close only this local menu.
    pending.current = id;
    if (details.current) details.current.open = false;
    target.focus({ preventScroll: true });
  };
  const escape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && details.current?.open) {
      event.preventDefault();
      event.stopPropagation();
      details.current.open = false;
      summary.current?.focus();
    }
  };

  if (sections.length < 2) return null;
  return <nav ref={rail} className={styles.sectionNav} data-reader-section-nav data-section-nav-ready={ready ? "true" : "false"} aria-label="On this page" onKeyDown={escape}>
    <details ref={details}>
      <summary ref={summary}>
        <span data-section-nav-prompt>On this page</span>
        <span className={styles.sectionNavCurrent} data-section-nav-label>{active >= 0 ? sections[active]?.label : "Choose a section"}</span>
        <span className={styles.sectionNavCount} data-section-nav-count>{active >= 0 ? `${active + 1} / ${sections.length}` : `${sections.length} sections`}</span>
      </summary>
      <ul>{sections.map((item, index) => <li key={item.id}><a href={`#${item.id}`} aria-current={index === active ? "location" : undefined} onClick={event => jump(event, item.id)}>{item.label}</a></li>)}</ul>
    </details>
  </nav>;
}

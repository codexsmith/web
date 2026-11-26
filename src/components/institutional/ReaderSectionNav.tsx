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
    let first = true;
    const update = () => {
      frame = 0;
      const primary = header.getBoundingClientRect();
      const primaryHeight = Math.ceil(primary.height);
      const localHeight = Math.ceil(trigger.getBoundingClientRect().height);
      main.style.setProperty("--reader-primary-rail-height", `${primaryHeight}px`);
      main.style.setProperty("--reader-section-rail-height", `${localHeight}px`);
      node.style.setProperty("--reader-primary-rail-height", `${primaryHeight}px`);
      setReady(true);
      const line = Math.max(0, primary.bottom) + localHeight + 14;
      let current = -1;
      for (let i = 0; i < targets.length; i++) {
        if (targets[i]!.getBoundingClientRect().top <= line) current = i;
      }
      setActive(current);
      if (first) {
        first = false;
        const initial = targets.find(target => target && `#${target.id}` === window.location.hash);
        if (initial) initial.scrollIntoView({ block: "start", behavior: "instant" });
      }
      const destination = targets.find(target => target?.id === pending.current);
      // A compacting or expanding primary rail may change the fragment offset.
      // Correct obstruction only during an explicit section-navigation action.
      if (destination && window.location.hash === `#${destination.id}` &&
          destination.getBoundingClientRect().top < line - 6) {
        window.scrollBy({ top: destination.getBoundingClientRect().top - line, behavior: "instant" });
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopAlignment = () => { pending.current = null; };
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
    window.addEventListener("hashchange", schedule);
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
      window.removeEventListener("hashchange", schedule);
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
        <span>On this page</span>
        <span className={styles.sectionNavCurrent}>{active >= 0 ? sections[active]?.label : "Choose a section"}</span>
        <span className={styles.sectionNavCount}>{active >= 0 ? `${active + 1} / ${sections.length}` : `${sections.length} sections`}</span>
      </summary>
      <ul>{sections.map((item, index) => <li key={item.id}><a href={`#${item.id}`} aria-current={index === active ? "location" : undefined} onClick={event => jump(event, item.id)}>{item.label}</a></li>)}</ul>
    </details>
  </nav>;
}

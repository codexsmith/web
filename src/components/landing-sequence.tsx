"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import type { ContentNode } from "@/lib/content";

type LandingSequenceProps = {
  branches: ContentNode[];
  onNavigate: (id: string) => void;
  onProgress: (progress: number) => void;
};

type LandingStyle = CSSProperties & {
  "--landing-progress": number;
  "--world-progress": number;
  "--hero-exit-progress": number;
  "--logo-progress": number;
};

type LandingGeometry = {
  start: number;
  distance: number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function LandingSequence({ branches, onNavigate, onProgress }: LandingSequenceProps) {
  const sequenceRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const geometryRef = useRef<LandingGeometry | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const measureGeometry = useCallback((): LandingGeometry => {
    const sequence = sequenceRef.current;
    const sticky = stickyRef.current;

    if (!sequence || !sticky) {
      return { start: 0, distance: 1 };
    }

    const start = sequence.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(sequence.scrollHeight - sticky.offsetHeight, 1);
    return { start, distance };
  }, []);

  const updateProgress = useCallback(() => {
    const geometry = measureGeometry();
    geometryRef.current = geometry;
    const next = clamp((window.scrollY - geometry.start) / geometry.distance);
    progressRef.current = next;
    setProgress((current) => (Math.abs(current - next) > 0.0005 ? next : current));
    onProgress(next);
  }, [measureGeometry, onProgress]);

  useEffect(() => {
    const scheduleScrollUpdate = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateProgress();
      });
    };

    const preserveProgressAcrossResize = () => {
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }

      const preservedProgress = progressRef.current;
      const previousGeometry = geometryRef.current;

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        const nextGeometry = measureGeometry();
        const geometryChanged =
          !previousGeometry ||
          Math.abs(nextGeometry.distance - previousGeometry.distance) > 1 ||
          Math.abs(nextGeometry.start - previousGeometry.start) > 1;

        if (geometryChanged && previousGeometry) {
          window.scrollTo({
            top: nextGeometry.start + preservedProgress * nextGeometry.distance,
            behavior: "auto",
          });
        }

        geometryRef.current = nextGeometry;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", preserveProgressAcrossResize);

    const observer = new ResizeObserver(preserveProgressAcrossResize);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    if (stickyRef.current) observer.observe(stickyRef.current);

    return () => {
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", preserveProgressAcrossResize);
      observer.disconnect();
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
      if (resizeFrameRef.current !== null) window.cancelAnimationFrame(resizeFrameRef.current);
    };
  }, [measureGeometry, updateProgress]);

  const heroExitProgress = clamp((progress - 0.08) / 0.42);
  const worldProgress = clamp((progress - 0.14) / 0.66);
  const logoProgress = clamp((progress - 0.18) / 0.82);
  const heroInteractive = progress < 0.48;
  const worldInteractive = worldProgress >= 0.42;

  const style: LandingStyle = {
    "--landing-progress": progress,
    "--world-progress": worldProgress,
    "--hero-exit-progress": heroExitProgress,
    "--logo-progress": logoProgress,
  };

  const enterWorld = () => {
    const geometry = measureGeometry();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: geometry.start + geometry.distance,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <main
      ref={sequenceRef}
      className="landing-sequence"
      data-phase={progress < 0.18 ? "hero" : worldProgress < 0.42 ? "transition" : "world"}
      style={style}
    >
      <div ref={stickyRef} className="landing-sticky">
        <section
          className="hero-state"
          data-interactive={heroInteractive ? "true" : "false"}
          aria-label="Boundary First Labs introduction"
          aria-hidden={!heroInteractive}
        >
          <div className="hero-state__copy">
            <p className="eyebrow">Software research and engineering lab</p>
            <h1>Software for difficult systems.</h1>
            <p className="hero-state__lede">
              Products, public-interest work, and research for domains where representation, boundaries,
              state, and responsibility matter.
            </p>
            <div className="hero-state__actions">
              <button className="button button--primary" onClick={enterWorld} tabIndex={heroInteractive ? 0 : -1}>
                Explore the lab
              </button>
              <button className="button" onClick={() => onNavigate("products")} tabIndex={heroInteractive ? 0 : -1}>
                View products
              </button>
            </div>
          </div>

          <button
            className="hero-logo"
            onClick={enterWorld}
            aria-label="Enter Boundary First Labs"
            tabIndex={heroInteractive ? 0 : -1}
          >
            <span>BF</span>
          </button>

          <div className="hero-state__scroll" aria-hidden="true">
            <span>Scroll to enter</span>
            <i />
          </div>
        </section>

        <section
          className="landing-world"
          data-interactive={worldInteractive ? "true" : "false"}
          aria-label="Boundary First Labs world"
          aria-hidden={worldProgress < 0.26}
        >
          <div className="landing-world__field" />
          <div className="landing-world__title">
            <p>Boundary First Labs</p>
            <span>Root world</span>
          </div>
          <div className="landing-world__districts">
            {branches.map((branch, index) => (
              <button
                key={branch.id}
                className={`world-district world-district--${index + 1}`}
                onClick={() => onNavigate(branch.id)}
                tabIndex={worldInteractive ? 0 : -1}
              >
                <span className="world-district__index">0{index + 1}</span>
                <strong>{branch.label}</strong>
                <small>{branch.eyebrow}</small>
              </button>
            ))}
          </div>
          <div className="landing-world__handoff" aria-hidden="true">
            <strong>Root world available</strong>
            <span>Choose a region or keep scrolling to resolve the whole.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

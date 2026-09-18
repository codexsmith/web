"use client";

import { useEffect, useRef } from "react";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { publicationStrip } from "../content/publications";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const AUTO_SCROLL_PX_PER_SECOND = 11;

export function PublicationStripSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const cycleWidthRef = useRef(0);

  const measureAndCenter = () => {
    const track = trackRef.current;
    if (!track) return;

    const firstCopy = track.querySelector<HTMLElement>(
      '[data-carousel-copy="0"][data-carousel-card="true"]',
    );
    const middleCopy = track.querySelector<HTMLElement>(
      '[data-carousel-copy="1"][data-carousel-card="true"]',
    );

    if (!firstCopy || !middleCopy) return;

    const cycleWidth = middleCopy.offsetLeft - firstCopy.offsetLeft;
    if (cycleWidth <= 0) return;

    cycleWidthRef.current = cycleWidth;
    track.scrollLeft = cycleWidth;
  };

  const normalizeLoopPosition = () => {
    const track = trackRef.current;
    const cycleWidth = cycleWidthRef.current;
    if (!track || cycleWidth <= 0) return;

    if (track.scrollLeft >= cycleWidth * 2) {
      track.scrollLeft -= cycleWidth;
    } else if (track.scrollLeft <= cycleWidth * 0.5) {
      track.scrollLeft += cycleWidth;
    }
  };

  const stepCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    normalizeLoopPosition();

    const cards = track.querySelectorAll<HTMLElement>('[data-carousel-card="true"]');
    const step =
      cards.length > 1
        ? Math.abs(cards[1].offsetLeft - cards[0].offsetLeft)
        : track.clientWidth * 0.8;

    track.scrollBy({
      left: direction * step,
      behavior: reducedMotionRef.current ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
    };

    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);

    measureAndCenter();

    const resizeObserver = new ResizeObserver(() => {
      const previousCycle = cycleWidthRef.current;
      const normalizedProgress =
        previousCycle > 0 ? (track.scrollLeft % previousCycle) / previousCycle : 0;

      const firstCopy = track.querySelector<HTMLElement>(
        '[data-carousel-copy="0"][data-carousel-card="true"]',
      );
      const middleCopy = track.querySelector<HTMLElement>(
        '[data-carousel-copy="1"][data-carousel-card="true"]',
      );

      if (!firstCopy || !middleCopy) return;

      const nextCycle = middleCopy.offsetLeft - firstCopy.offsetLeft;
      if (nextCycle <= 0) return;

      cycleWidthRef.current = nextCycle;
      track.scrollLeft = nextCycle + normalizedProgress * nextCycle;
    });

    resizeObserver.observe(track);

    let animationFrame = 0;
    let previousTime = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - previousTime, 64);
      previousTime = now;

      if (!pausedRef.current && !reducedMotionRef.current) {
        track.scrollLeft += (AUTO_SCROLL_PX_PER_SECOND * elapsed) / 1000;
        normalizeLoopPosition();
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  const loopingPublications = [0, 1, 2].flatMap((copy) =>
    publicationStrip.map((publication, index) => ({
      publication,
      index,
      copy,
    })),
  );

  return (
    <section className={styles.publicationStrip}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>MORE FROM THE PUBLICATION FIELD</>}
        title={<>Follow the machinery across established domains.</>}
        note={<>Computer science leads this supporting layer, followed by mathematics and physics calibrations. Selection is editorial; stage and readiness remain source-governed.</>}
      />

      <div
        ref={frameRef}
        className={styles.publicationCarouselFrame}
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            pausedRef.current = false;
          }
        }}
      >
        <button
          type="button"
          className={[styles.publicationCarouselControl, styles.publicationCarouselPrev].join(" ")}
          aria-label="Previous publication"
          onClick={() => stepCarousel(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          ref={trackRef}
          className={styles.publicationStripTrack}
          role="list"
          aria-label="Supporting publication selections"
          tabIndex={0}
          onScroll={normalizeLoopPosition}
        >
          {loopingPublications.map(({ publication, index, copy }) => (
            <article
              className={styles.publicationStripCard}
              data-tone={publication.tone}
              data-carousel-card="true"
              data-carousel-copy={copy}
              role="listitem"
              aria-hidden={copy === 1 ? undefined : true}
              key={`${copy}-${publication.id}`}
            >
              <div className={styles.publicationStripTopline}>
                <span>{publication.discipline}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <p className={styles.publicationStripDomain}>{publication.domain}</p>
              <h3>{publication.title}</h3>
              <p className={styles.publicationStripSummary}>{publication.summary}</p>

              <div className={styles.publicationStripState}>
                <span>STAGE {publication.stage}</span>
                <span>READINESS {publication.readiness}</span>
              </div>

              <div className={styles.publicationStripSignals}>
                {publication.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>

              <code className={styles.publicationStripSource}>{publication.sourceRef}</code>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={[styles.publicationCarouselControl, styles.publicationCarouselNext].join(" ")}
          aria-label="Next publication"
          onClick={() => stepCarousel(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <p className={styles.publicationStripHint}>
        Moves continuously · hover or focus to pause · use the full-height controls to step.
      </p>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProvenanceStillSequence } from "./content/publicState";
import styles from "./styles/LabThroughTime.module.css";

export function ProvenanceStillCarousel({
  sequence,
  role,
  period,
}: {
  sequence: ProvenanceStillSequence;
  role: string;
  period: string;
}) {
  const [active, setActive] = useState(0);
  const frame = sequence.frames[active];
  const last = sequence.frames.length - 1;

  const previous = () => setActive((index) => (index === 0 ? last : index - 1));
  const next = () => setActive((index) => (index === last ? 0 : index + 1));

  return (
    <div className={styles.provenanceCarousel}>
      <div className={styles.provenanceCarouselViewport}>
        <Image
          src={frame.imageSrc}
          alt={frame.alt}
          fill
          sizes="(max-width: 900px) 100vw, 66vw"
          priority={active === 0}
        />

        <div className={styles.provenanceMediaTag}>
          <span>{role}</span>
          <small>{period}</small>
        </div>

        <div className={styles.provenanceCarouselFrameId}>
          <span>VIDEO STILL</span>
          <strong>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(sequence.frames.length).padStart(2, "0")}
          </strong>
        </div>

        <button
          className={styles.provenanceCarouselPrevious}
          type="button"
          onClick={previous}
          aria-label="Previous research-room video still"
        >
          ←
        </button>
        <button
          className={styles.provenanceCarouselNext}
          type="button"
          onClick={next}
          aria-label="Next research-room video still"
        >
          →
        </button>
      </div>

      <div className={styles.provenanceCarouselRail}>
        <div className={styles.provenanceCarouselDots} aria-label="Research-room video stills">
          {sequence.frames.map((item, index) => (
            <button
              key={item.sha256}
              type="button"
              data-active={index === active ? "true" : undefined}
              aria-label={`Show research-room video still ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <code title={frame.sha256}>SHA-256 {frame.sha256.slice(0, 12)}…</code>
      </div>

      <p className={styles.provenanceCarouselNote}>{sequence.note}</p>
    </div>
  );
}

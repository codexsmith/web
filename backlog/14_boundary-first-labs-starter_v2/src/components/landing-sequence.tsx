"use client";

import { CSSProperties, useEffect, useState } from "react";
import type { ContentNode } from "@/lib/content";

type LandingSequenceProps = {
  branches: ContentNode[];
  onNavigate: (id: string) => void;
  onProgress: (progress: number) => void;
};

type LandingStyle = CSSProperties & {
  "--landing-progress": number;
  "--world-progress": number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function LandingSequence({ branches, onNavigate, onProgress }: LandingSequenceProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const distance = Math.max(window.innerHeight * 1.15, 1);
      const next = clamp(window.scrollY / distance);
      setProgress(next);
      onProgress(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onProgress]);

  const worldProgress = clamp((progress - 0.34) / 0.66);
  const style: LandingStyle = {
    "--landing-progress": progress,
    "--world-progress": worldProgress,
  };

  const enterWorld = () => {
    window.scrollTo({ top: window.innerHeight * 1.15, behavior: "smooth" });
  };

  return (
    <main className="landing-sequence" style={style}>
      <div className="landing-sticky">
        <section className="hero-state" aria-label="Boundary First Labs introduction">
          <div className="hero-state__copy">
            <p className="eyebrow">Software research and engineering lab</p>
            <h1>Software for difficult systems.</h1>
            <p className="hero-state__lede">
              Products, public-interest work, and research for domains where representation, boundaries,
              state, and responsibility matter.
            </p>
            <div className="hero-state__actions">
              <button className="button button--primary" onClick={enterWorld}>
                Explore the lab
              </button>
              <button className="button" onClick={() => onNavigate("products")}>
                View products
              </button>
            </div>
          </div>

          <button className="hero-logo" onClick={enterWorld} aria-label="Enter Boundary First Labs">
            <span>BF</span>
          </button>

          <div className="hero-state__scroll" aria-hidden="true">
            <span>Scroll to enter</span>
            <i />
          </div>
        </section>

        <section
          className="landing-world"
          aria-label="Boundary First Labs world"
          aria-hidden={worldProgress < 0.55}
          style={{ pointerEvents: worldProgress > 0.58 ? "auto" : "none" }}
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
                tabIndex={worldProgress > 0.72 ? 0 : -1}
              >
                <span className="world-district__index">0{index + 1}</span>
                <strong>{branch.label}</strong>
                <small>{branch.eyebrow}</small>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

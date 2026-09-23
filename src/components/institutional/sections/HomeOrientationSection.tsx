import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { AudienceJourneyGrid } from "../AudienceJourneyGrid";
import { formatOrdinal } from "../institutionalFormat";
import styles from "../styles/InstitutionalFoundation.module.css";
import {
  capabilityStrip,
  methodSteps,
  practiceLineage,
  stewardshipFacets,
} from "../content/home";
import { homeAudienceJourneys } from "../content/audiences";

const homeOrientationOrder = [
  "choose-path",
  "approach",
  "operating-braid",
  "stewardship",
] as const;

const homeOrientationSummaries = {
  "choose-path": {
    eyebrow: "CHOOSE YOUR OWN PATH",
    title: "Start with why you came.",
    tone: "entry",
  },
  approach: {
    eyebrow: "OUR APPROACH",
    title: "What the Lab does.",
    tone: "method",
  },
  "operating-braid": {
    eyebrow: "OPERATING BRAID",
    title: "Three lineages become one method.",
    tone: "braid",
  },
  stewardship: {
    eyebrow: "STEWARDSHIP",
    title: "What succeeds still has to be cared for.",
    tone: "stewardship",
  },
} as const;

function HomeOrientationMiniature({
  id,
}: {
  id: (typeof homeOrientationOrder)[number];
}) {
  if (id === "choose-path") {
    return (
      <div
        className={[styles.homeOrientationMiniature, styles.homeOrientationMosaic].join(" ")}
        aria-hidden="true"
      >
        <span data-kind="people">
          <svg viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="2.6" />
            <circle cx="16.5" cy="9" r="2.1" />
            <path d="M4.8 18c.5-3 2-4.6 4.5-4.6s4 1.6 4.5 4.6M13.6 14.2c.8-.7 1.8-1 2.9-1 2.1 0 3.4 1.4 3.8 4.1" />
          </svg>
        </span>
        <span data-kind="book">
          <svg viewBox="0 0 24 24">
            <path d="M4.5 6.2c2.7-.8 5-.4 7 1.1v11.1c-1.9-1.4-4.2-1.8-7-1zM19.5 6.2c-2.7-.8-5-.4-7 1.1v11.1c1.9-1.4 4.2-1.8 7-1z" />
          </svg>
        </span>
        <span data-kind="idea">
          <svg viewBox="0 0 24 24">
            <path d="M8.2 10.1a3.8 3.8 0 1 1 7.6 0c0 1.7-.8 2.7-1.8 3.8-.7.7-1 1.4-1 2.1h-2c0-.7-.3-1.4-1-2.1-1-1.1-1.8-2.1-1.8-3.8zM10.1 19h3.8" />
          </svg>
          <i>→</i>
        </span>
        <span data-kind="growth">
          <svg viewBox="0 0 24 24">
            <path d="M12 19v-7M12 14c-4.1-.2-6.1-2.2-6.3-6.1 4 .2 6 2.2 6.3 6.1zM12 11.5c.3-3.8 2.2-5.7 5.8-5.8-.1 3.7-2 5.6-5.8 5.8z" />
          </svg>
        </span>
        <span data-kind="evidence">
          <svg viewBox="0 0 24 24">
            <path d="M5 18h3V12H5zM10.5 18h3V8h-3zM16 18h3V4.5h-3z" />
          </svg>
        </span>
        <span data-kind="document">
          <svg viewBox="0 0 24 24">
            <path d="M6.5 3.8h7l4 4v12.4h-11zM13.5 3.8v4h4M9 12h6M9 15.5h5" />
          </svg>
        </span>
        <span data-kind="compass">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="7.3" />
            <path d="m14.8 8.5-1.7 4.2-4 2 1.7-4.2z" />
          </svg>
        </span>
      </div>
    );
  }

  if (id === "approach") {
    return (
      <div
        className={[styles.homeOrientationMiniature, styles.homeOrientationStack].join(" ")}
        aria-hidden="true"
      >
        {["Explore", "Synthesize", "Build", "Transfer"].map((label) => (
          <span key={label}>
            <em>{label}</em>
            <i>→</i>
          </span>
        ))}
      </div>
    );
  }

  if (id === "operating-braid") {
    return (
      <div
        className={[styles.homeOrientationMiniature, styles.homeOrientationBraidMini].join(" ")}
        aria-hidden="true"
      >
        <div className={styles.homeOrientationBraidIcons}>
          <span data-stream="lean">
            <svg viewBox="0 0 24 24">
              <path d="M7 7h8.5M15.5 7l-2.5-2.5M15.5 7 13 9.5M17 17H8.5M8.5 17 11 14.5M8.5 17 11 19.5" />
            </svg>
          </span>
          <span data-stream="science">
            <svg viewBox="0 0 24 24">
              <path d="M9 4h6M10 4v5l-4 7.5A2.4 2.4 0 0 0 8.1 20h7.8a2.4 2.4 0 0 0 2.1-3.5L14 9V4M8.7 15h6.6" />
            </svg>
          </span>
          <span data-stream="agentic">
            <svg viewBox="0 0 24 24">
              <circle cx="7" cy="7" r="2" />
              <circle cx="17" cy="7" r="2" />
              <circle cx="12" cy="17" r="2" />
              <path d="M8.8 8.2 11 15M15.2 8.2 13 15M9 7h6" />
            </svg>
          </span>
        </div>
        <svg
          className={styles.homeOrientationBraidFlow}
          viewBox="0 0 120 96"
          preserveAspectRatio="none"
        >
          <path data-stream="lean" d="M0 18 C 42 18, 48 47, 88 48" />
          <path data-stream="science" d="M0 48 C 42 48, 52 48, 88 48" />
          <path data-stream="agentic" d="M0 78 C 42 78, 48 49, 88 48" />
          <path className={styles.homeOrientationBraidTrunk} d="M87 48 H105" />
          <path className={styles.homeOrientationBraidArrow} d="M102 38 L119 48 L102 58 Z" />
        </svg>
        <strong>
          <svg viewBox="0 0 24 24">
            <path d="M6 4.5h9l3 3v12H6zM15 4.5v3h3M9 11h6M9 14h6M9 17h4" />
          </svg>
        </strong>
      </div>
    );
  }

  return (
    <div
      className={[styles.homeOrientationMiniature, styles.homeOrientationStewardMini].join(" ")}
      aria-hidden="true"
    >
      <span data-kind="intellectual">
        <svg viewBox="0 0 24 24">
          <path d="M12 4.2c2.2 1.6 4.6 2.2 6.4 2.4-.2 5.8-2.2 9.9-6.4 12.5-4.2-2.6-6.2-6.7-6.4-12.5 1.8-.2 4.2-.8 6.4-2.4z" />
        </svg>
      </span>
      <span data-kind="humanist">
        <svg viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16.5" cy="9" r="2.1" />
          <path d="M4.8 18c.5-3 2-4.6 4.5-4.6s4 1.6 4.5 4.6M13.7 14.1c.8-.6 1.7-.9 2.8-.9 2.2 0 3.5 1.4 3.9 4.2" />
        </svg>
      </span>
      <span data-kind="ecological">
        <svg viewBox="0 0 24 24">
          <path d="M12 19v-7M12 14c-4.1-.2-6.1-2.2-6.3-6.1 4 .2 6 2.2 6.3 6.1zM12 11.5c.3-3.8 2.2-5.7 5.8-5.8-.1 3.7-2 5.6-5.8 5.8z" />
        </svg>
      </span>
    </div>
  );
}

function HomeOrientationSummary({
  id,
}: {
  id: (typeof homeOrientationOrder)[number];
}) {
  const summary = homeOrientationSummaries[id];

  return (
    <div className={styles.homeOrientationSummary} id={id}>
      <div className={styles.homeOrientationSummaryCopy}>
        <span>{summary.eyebrow}</span>
        <h3>{summary.title}</h3>
        {id === "choose-path" ? (
          <Link
            className={styles.homeOrientationSummaryAction}
            href="/start"
            data-reflow-stop-toggle
          >
            Open all audience paths
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
      <HomeOrientationMiniature id={id} />
    </div>
  );
}

export function HomeOrientationSection() {
  return (
    <section className={styles.homeOrientationSection} aria-label="Homepage orientation">
      <ReflowField
        className={styles.homeOrientationGrid}
        ariaLabel="Choose a homepage section to inspect"
        layoutMode="focus-stage"
        itemOrder={homeOrientationOrder}
        animatePeers
      >
        <ReflowFieldItem
          id="choose-path"
          label="Choose Your Own Path"
          className={styles.homeOrientationCard}
          dataTone={homeOrientationSummaries["choose-path"].tone}
          summary={<HomeOrientationSummary id="choose-path" />}
          detail={
            <div className={styles.homeOrientationDetail}>
              <div className={styles.homeOrientationAudienceDetail}>
                <AudienceJourneyGrid journeys={homeAudienceJourneys} compact />
              </div>
            </div>
          }
        />

        <ReflowFieldItem
          id="approach"
          label="Our Approach"
          className={styles.homeOrientationCard}
          dataTone={homeOrientationSummaries.approach.tone}
          summary={<HomeOrientationSummary id="approach" />}
          detail={
            <div className={styles.homeOrientationDetail}>
              <div className={styles.methodSection}>
                <div className={styles.sectionLead}>
                  <p>
                    We make complex systems easier to understand, test, improve, and explain.
                    The basic move is simple: show the structure, track what changes, follow the
                    change, and find where it breaks.
                  </p>
                </div>

                <div className={styles.methodWorkbench}>
                  <p className={styles.workbenchLabel}>WHAT WE PRODUCE</p>
                  <div className={styles.capabilityStrip} aria-label="What the Lab produces and supports">
                    {capabilityStrip.map(([index, label]) => (
                      <div className={styles.capability} key={label}>
                        <span>{index}</span>
                        <strong>{label}</strong>
                      </div>
                    ))}
                  </div>

                  <p className={styles.workbenchLabel}>HOW WE WORK</p>
                  <div className={styles.methodGrid}>
                    {methodSteps.map(([index, plainTitle, formalTitle, description]) => (
                      <article className={styles.methodStep} key={formalTitle}>
                        <span>{index}</span>
                        <h3>{plainTitle}</h3>
                        <p className={styles.methodFormal}>{formalTitle}</p>
                        <p>{description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <ReflowFieldItem
          id="operating-braid"
          label="Operating Braid"
          className={styles.homeOrientationCard}
          dataTone={homeOrientationSummaries["operating-braid"].tone}
          summary={<HomeOrientationSummary id="operating-braid" />}
          detail={
            <div className={styles.homeOrientationDetail}>
              <div className={styles.practiceLineage}>
                <div className={styles.practiceLineageLead}>
                  <p>
                    The braid is recursive: make work visible, formulate a discriminating question,
                    let agents search or act, then inspect the resulting state before the next move.
                    Boundary First supplies the shared state model, admissibility boundaries, and
                    handoff discipline that let those loops compose.
                  </p>
                </div>

                <div
                  className={styles.practiceLineageGrid}
                  aria-label="Lean–Agile, scientific method, and agentic reasoning converge into Boundary First"
                >
                  <div className={styles.practiceLineageInputs}>
                    {practiceLineage.slice(0, 3).map((item, index) => (
                      <article key={item.label}>
                        <span className={styles.practiceLineageOrdinal}>{formatOrdinal(index)}</span>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>

                  <div className={styles.practiceLineageMerge} aria-hidden="true">
                    <span>⇒</span>
                  </div>

                  <article className={styles.practiceLineageOutput}>
                    <span className={styles.practiceLineageOrdinal}>{formatOrdinal(3)}</span>
                    <h3>{practiceLineage[3].label}</h3>
                    <p>{practiceLineage[3].description}</p>
                  </article>
                </div>
              </div>
            </div>
          }
        />

        <ReflowFieldItem
          id="stewardship"
          label="Stewardship"
          className={styles.homeOrientationCard}
          dataTone={homeOrientationSummaries.stewardship.tone}
          summary={<HomeOrientationSummary id="stewardship" />}
          detail={
            <div className={styles.homeOrientationDetail}>
              <div className={styles.stewardshipBand}>
                <div className={styles.stewardshipBandLead}>
                  <p>
                    Boundary First Labs treats stewardship as a concrete engineering and
                    institutional obligation: <strong>tend</strong> what is shared, <strong>maintain</strong> what others depend
                    on, <strong>repair</strong> what has been neglected, <strong>cultivate</strong> future capacity, and <strong>refuse</strong>
                    success that works only by pushing its costs outside the frame.
                  </p>
                </div>

                <div className={styles.stewardshipBandGrid}>
                  {stewardshipFacets.map((facet) => (
                    <article key={facet.label}>
                      <h3>{facet.label}</h3>
                      <p>{facet.title}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </ReflowField>
    </section>
  );
}

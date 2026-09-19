import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { AudienceJourneyGrid } from "../AudienceJourneyGrid";
import { InstitutionalSectionLead } from "../InstitutionalPrimitives";
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
    description:
      "Find the right front door for research, engineering, funding, collaboration, critique, or orientation.",
    tone: "entry",
  },
  approach: {
    eyebrow: "OUR APPROACH",
    title: "What the Lab does.",
    description:
      "See what the Lab produces and the four-step working method behind it.",
    tone: "method",
  },
  "operating-braid": {
    eyebrow: "OPERATING BRAID",
    title: "Three lineages become one method.",
    description:
      "Lean–Agile, scientific method, and agentic reasoning converge through state-based reasoning.",
    tone: "braid",
  },
  stewardship: {
    eyebrow: "STEWARDSHIP",
    title: "What succeeds still has to be cared for.",
    description:
      "See the obligations that keep knowledge, capability, and wider consequences inside the frame.",
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
        {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
      </div>
    );
  }

  if (id === "approach") {
    return (
      <div
        className={[styles.homeOrientationMiniature, styles.homeOrientationStack].join(" ")}
        aria-hidden="true"
      >
        <span /><span /><span /><span /><span />
      </div>
    );
  }

  if (id === "operating-braid") {
    return (
      <div
        className={[styles.homeOrientationMiniature, styles.homeOrientationBraidMini].join(" ")}
        aria-hidden="true"
      >
        <div><span /><span /><span /></div>
        <i>→</i>
        <strong />
      </div>
    );
  }

  return (
    <div
      className={[styles.homeOrientationMiniature, styles.homeOrientationStewardMini].join(" ")}
      aria-hidden="true"
    >
      <span>I</span>
      <span>H</span>
      <span>E</span>
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
        <p>{summary.description}</p>
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
              <div className={styles.audienceEntrySection}>
                <div className={styles.audienceEntryLead}>
                  <p className={styles.sectionIndex}>CHOOSE YOUR OWN PATH</p>
                  <h2>Start with why you came, not with the Lab&apos;s org chart.</h2>
                  <p>
                    The same institution looks different depending on whether you came to evaluate
                    research, solve an engineering problem, fund work, collaborate, commission applied
                    work, challenge a claim, or simply understand what this place is.
                  </p>
                  <Link className={styles.audienceEntryLink} href="/v3/start">
                    Open all audience paths
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

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
                <InstitutionalSectionLead
                  styles={styles}
                  eyebrow={<>OUR APPROACH</>}
                  title={<>What the Lab does</>}
                  description={<>We make complex systems easier to understand, test, improve, and explain. The basic move is simple: show the structure, track what changes, follow the change, and find where it breaks.</>}
                />

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
                  <p className={styles.sectionIndex}>OPERATING BRAID</p>
                  <h2>Three practical lineages braid into one recursive method.</h2>
                  <p>
                    Lean–Agile, scientific method, and agentic reasoning connect through
                    state-based reasoning to create Boundary First.
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
                  <p className={styles.sectionIndex}>STEWARDSHIP</p>
                  <h2>What succeeds still has to be cared for.</h2>
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

import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import styles from "./styles/InstitutionalFoundation.module.css";
import { InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { LabSnapshotRow } from "./LabSnapshotRow";
import { RecentChangesStrip } from "./RecentChangesStrip";
import { AudienceJourneyGrid } from "./AudienceJourneyGrid";

import {
  capabilityStrip,
  featuredWork,
  homeInstitutionalFrontDoors,
  homeNowSnapshot,
  methodSteps,
  postureCommitments,
  practiceLineage,
  stewardshipFacets,
} from "./content/home";
import { homeLabSnapshot } from "./content/labSnapshot";
import { homeRecentChanges } from "./content/changes";
import { homeAudienceJourneys } from "./content/audiences";
export function InstitutionalHomePage() {
  return (
    <InstitutionalPageShell>
        <section className={styles.hero} data-institutional-hero>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Practice-born. Research-backed. Formally generalized.</p>
            <h1>Systematizing knowledge for science, engineering, and public reasoning.</h1>
            <p className={styles.lead}>
              Boundary First Labs is an applied systems research laboratory studying how complex systems are represented, transformed, tested, and improved.
            </p>
            <p className={styles.bodyCopy}>
              We build research, methods, products, and operational tools for making consequential systems more legible, reasoning more inspectable, and useful capability easier to transfer.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="#featured-work">
                See Featured Work
                <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryAction} href="/v3/research">
                Read the Research
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className={styles.heroVisual}>
            <img
              className={styles.heroGraphic}
              src="/institutional/pie-manifold-hero.jpg"
              alt="Boundary First Labs manifold study: a geometric field illustrating representation, curvature, and structured transformation."
            />
          </aside>
        </section>

        <LabSnapshotRow {...homeLabSnapshot} />

        <RecentChangesStrip changes={homeRecentChanges} compact />

        <section className={styles.audienceEntrySection}>
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
        </section>

        <section className={styles.methodSection}>
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
        </section>

        <section className={styles.practiceLineage}>
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
        </section>

        <section className={styles.stewardshipBand}>
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
        </section>

        <section className={styles.featuredSection} id="featured-work">
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FEATURED WORK</>}
            title={<>Things we are building, testing, and publishing.</>}
            note={<>Concrete examples first. The labels simply tell you what kind of work each one is.</>}
            />

          <div className={styles.featuredGrid}>
            {featuredWork.map((item, index) => {
              const content = (
                <>
                  <div className={styles.featuredVisual} data-variant={index + 1} aria-hidden="true">
                    <span>{formatOrdinal(index)}</span>
                  </div>
                  <div className={styles.featuredCopy}>
                    <span className={styles.featuredTag}>{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className={styles.featuredArrow} aria-hidden="true">→</span>
                </>
              );

              return item.href ? (
                <Link className={styles.featuredCard} href={item.href} key={item.title}>
                  {content}
                </Link>
              ) : null;
            })}
          </div>
        </section>

        <section className={styles.inMotionSection}>
          <div className={styles.inMotionLead}>
            <p className={styles.sectionIndex}>THE LAB IN MOTION</p>
            <h2>See the current state. Choose a way in.</h2>
            <p>
              The public site should not stop at describing what Boundary First Labs is.
              It should also show what is active now and how an outside person or institution
              can enter the work without having to understand the entire Lab first.
            </p>
          </div>

          <div className={styles.inMotionGrid}>
            <Link className={styles.nowSnapshot} href={homeNowSnapshot.href}>
              <div className={styles.nowSnapshotTopline}>
                <span>{homeNowSnapshot.eyebrow}</span>
                <strong>{homeNowSnapshot.status}</strong>
              </div>

              <h3>{homeNowSnapshot.title}</h3>
              <p>{homeNowSnapshot.description}</p>

              <blockquote>{homeNowSnapshot.thesis}</blockquote>

              <div className={styles.nowLaneGrid} aria-label="Current Lab priority lanes">
                {homeNowSnapshot.lanes.map((lane, index) => (
                  <span key={lane}>
                    <i>{formatOrdinal(index)}</i>
                    {lane}
                  </span>
                ))}
              </div>

              <strong className={styles.inMotionCta}>
                Open Now / Roadmap
                <span aria-hidden="true">→</span>
              </strong>
            </Link>

            <div className={styles.frontDoorStack}>
              {homeInstitutionalFrontDoors.map((door) => (
                <Link
                  className={styles.frontDoorCard}
                  data-front-door-tone={door.tone}
                  href={door.href}
                  key={door.eyebrow}
                >
                  <div>
                    <span>{door.eyebrow}</span>
                    <small>{door.note}</small>
                  </div>
                  <h3>{door.title}</h3>
                  <p>{door.description}</p>
                  <strong>
                    {door.cta}
                    <span aria-hidden="true">→</span>
                  </strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.posture}>
          <div className={styles.postureIntro}>
            <div className={styles.postureTitle}>
              <p className={styles.sectionIndex}>OUR STANCE</p>
              <h2>Working posture</h2>
            </div>

            <p className={styles.postureLead}>
              Sober, inspectable, and criticism-friendly. The Lab is built to absorb
              counterexamples, revise its machinery, preserve human agency, and leave
              useful capability behind.
            </p>

            <blockquote>“Better systems for a more legible world.”</blockquote>
          </div>

          <div className={styles.postureGrid}>
            {postureCommitments.map((commitment) => (
              <article
                className={styles.postureCard}
                data-posture-tone={commitment.tone}
                key={commitment.title}
              >
                <p className={styles.postureEyebrow}>{commitment.eyebrow}</p>
                <h3>{commitment.title}</h3>
                <p>{commitment.description}</p>
                <Link href={commitment.href}>
                  {commitment.linkLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </InstitutionalPageShell>
  );
}

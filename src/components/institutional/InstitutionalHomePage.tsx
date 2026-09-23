import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import styles from "./styles/InstitutionalFoundation.module.css";
import { InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { LabSnapshotRow } from "./LabSnapshotRow";
import { RecentChangesStrip } from "./RecentChangesStrip";

import {
  featuredWork,
  homeInstitutionalFrontDoors,
  homeNowSnapshot,
  postureCommitments,
} from "./content/home";
import { homeLabSnapshot } from "./content/labSnapshot";
import { homeRecentChanges } from "./content/changes";
import { HomeOrientationSection } from "./sections/HomeOrientationSection";
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
              <Link className={styles.secondaryAction} href="/research">
                Read the Research
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className={styles.heroVisual}>
            <img
              className={styles.heroGraphic}
              src="/institutional/lab-scene-hero.jpg"
              alt="Boundary First Labs workspace scene: a desk with books, a robot arm, and a whiteboard illustrating 'Smaller Abstractions, Brighter Tomorrows'."
            />
          </aside>
        </section>

        <LabSnapshotRow {...homeLabSnapshot} />

        <RecentChangesStrip changes={homeRecentChanges} compact />

        <HomeOrientationSection />

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
          </div>

          <div className={styles.inMotionGrid}>
            <Link className={styles.nowSnapshot} href={homeNowSnapshot.href}>
              <div className={styles.nowSnapshotTopline}>
                <span>{homeNowSnapshot.eyebrow}</span>
                <strong>{homeNowSnapshot.status}</strong>
              </div>

              <h3>{homeNowSnapshot.title}</h3>
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

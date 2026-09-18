import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import styles from "./styles/InstitutionalFoundation.module.css";
import { InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { capabilityStrip, methodSteps, featuredWork, postureCommitments } from "./content/home";
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

        <section className={styles.featuredSection} id="featured-work">
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FEATURED WORK</>}
            title={<>Things we are building, testing, and publishing.</>}
            note={<>Concrete examples first. The labels simply tell you what kind of work each one is.</>}
            />

          <div className={styles.featuredGrid}>
            {featuredWork.map((item, index) => (
              <article className={styles.featuredCard} key={item.title}>
                <div className={styles.featuredVisual} data-variant={index + 1} aria-hidden="true">
                  <span>{formatOrdinal(index)}</span>
                </div>
                <div className={styles.featuredCopy}>
                  <span className={styles.featuredTag}>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={styles.featuredArrow} aria-hidden="true">→</span>
              </article>
            ))}
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

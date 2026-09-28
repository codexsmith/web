"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { systemsArchitectureReviewDemo } from "./content/appliedWork";
import styles from "./styles/AppliedWork.module.css";

type DemoStep = 1 | 2 | 3 | 4;

export function AppliedWorkSyntheticReviewSequence() {
  const [activeStep, setActiveStep] = useState<DemoStep>(1);
  const stepOneRef = useRef<HTMLElement | null>(null);
  const stepTwoRef = useRef<HTMLElement | null>(null);
  const stepThreeRef = useRef<HTMLElement | null>(null);
  const stepFourRef = useRef<HTMLElement | null>(null);

  const isOpen = (step: DemoStep) => step <= activeStep;

  const getStepElement = (step: DemoStep) => {
    if (step === 1) return stepOneRef.current;
    if (step === 2) return stepTwoRef.current;
    if (step === 3) return stepThreeRef.current;
    return stepFourRef.current;
  };

  const revealStep = (step: DemoStep) => {
    setActiveStep((current) => Math.max(current, step) as DemoStep);

    window.requestAnimationFrame(() => {
      const target = getStepElement(step);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      target?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      target?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <div className={styles.appliedDemoSetup} aria-label="Synthetic review setup">
        {systemsArchitectureReviewDemo.setup.map((item, index) => (
          <article key={item.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.label}</strong>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.appliedDemoSequence} aria-label="Synthetic review walkthrough">
        <section
          ref={stepOneRef}
          tabIndex={-1}
          className={styles.appliedDemoPanel}
          data-demo-tone="red"
          data-open={isOpen(1)}
        >
          <button
            type="button"
            className={styles.appliedDemoPanelHeader}
            aria-expanded={isOpen(1)}
            aria-controls="applied-demo-step-1"
            onClick={() => revealStep(1)}
          >
            <span>01 / REPRESENTATION GAP</span>
          </button>

          <div
            id="applied-demo-step-1"
            className={styles.appliedDemoPanelBody}
            aria-hidden={!isOpen(1)}
          >
            <div className={styles.appliedDemoPanelBodyInner}>
              <h3>{systemsArchitectureReviewDemo.title}</h3>
              <p>{systemsArchitectureReviewDemo.summary}</p>
              <blockquote>{systemsArchitectureReviewDemo.question}</blockquote>

              <div className={styles.appliedDemoStateCompare}>
                <div>
                  <small>CURRENT SYSTEM VIEW</small>
                  {systemsArchitectureReviewDemo.coarseStates.map((state) => (
                    <strong key={state}>{state}</strong>
                  ))}
                </div>
                <div>
                  <small>ACTUAL PAYMENT LIFECYCLE</small>
                  {systemsArchitectureReviewDemo.reconstructedStates.map((state) => (
                    <span key={state}>{state}</span>
                  ))}
                </div>
              </div>

              <div className={styles.appliedDemoNext}>
                <p>The visible status model is simple, but it hides transitions that matter.</p>
                <button type="button" onClick={() => revealStep(2)}>
                  See the actual payment lifecycle <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={stepTwoRef}
          tabIndex={-1}
          className={styles.appliedDemoPanel}
          data-demo-tone="green"
          data-open={isOpen(2)}
        >
          <button
            type="button"
            className={styles.appliedDemoPanelHeader}
            aria-expanded={isOpen(2)}
            aria-controls="applied-demo-step-2"
            onClick={() => revealStep(2)}
          >
            <span>02 / ACTUAL PAYMENT LIFECYCLE</span>
          </button>

          <div
            id="applied-demo-step-2"
            className={styles.appliedDemoPanelBody}
            aria-hidden={!isOpen(2)}
          >
            <div className={styles.appliedDemoPanelBodyInner}>
              <h3>The business process contains more state than the public status exposes.</h3>
              <p>{systemsArchitectureReviewDemo.setup[1].copy}</p>

              <div className={styles.appliedDemoLifecycle} aria-label="Reconstructed payment lifecycle">
                {systemsArchitectureReviewDemo.reconstructedStates.map((state, index) => (
                  <article key={state}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{state}</strong>
                  </article>
                ))}
              </div>

              <div className={styles.appliedDemoNext}>
                <p>Once the hidden lifecycle is reconstructed, the failure mode becomes easier to name.</p>
                <button type="button" onClick={() => revealStep(3)}>
                  See what breaks when states collapse <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={stepThreeRef}
          tabIndex={-1}
          className={styles.appliedDemoPanel}
          data-demo-tone="blue"
          data-open={isOpen(3)}
        >
          <button
            type="button"
            className={styles.appliedDemoPanelHeader}
            aria-expanded={isOpen(3)}
            aria-controls="applied-demo-step-3"
            onClick={() => revealStep(3)}
          >
            <span>03 / WHAT BREAKS WHEN STATES COLLAPSE</span>
          </button>

          <div
            id="applied-demo-step-3"
            className={styles.appliedDemoPanelBody}
            aria-hidden={!isOpen(3)}
          >
            <div className={styles.appliedDemoPanelBodyInner}>
              <h3>Collapsed states become operational defects.</h3>
              <div className={styles.appliedDemoDefectsGrid}>
                {systemsArchitectureReviewDemo.defectClasses.map((defect) => (
                  <article key={defect.title}>
                    <strong>{defect.title}</strong>
                    <p>{defect.description}</p>
                  </article>
                ))}
              </div>

              <div className={styles.appliedDemoNext}>
                <p>These defects change authority, auditability, retry behavior, and operational trust.</p>
                <button type="button" onClick={() => revealStep(4)}>
                  See how the representation gets repaired <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={stepFourRef}
          tabIndex={-1}
          className={styles.appliedDemoPanel}
          data-demo-tone="yellow"
          data-open={isOpen(4)}
        >
          <button
            type="button"
            className={styles.appliedDemoPanelHeader}
            aria-expanded={isOpen(4)}
            aria-controls="applied-demo-step-4"
            onClick={() => revealStep(4)}
          >
            <span>04 / REPAIR THE REPRESENTATION</span>
          </button>

          <div
            id="applied-demo-step-4"
            className={styles.appliedDemoPanelBody}
            aria-hidden={!isOpen(4)}
          >
            <div className={styles.appliedDemoPanelBodyInner}>
              <h3>Repair the representation before scaling the change.</h3>
              <ol className={styles.appliedDemoRepairList}>
                {systemsArchitectureReviewDemo.repairPath.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <div className={styles.appliedDemoNext}>
                <p>A review should end with named repairs, bounded options, and handoff-ready artifacts.</p>
                <Link href="/contact?type=applied-work&source=systems-architecture-demo">
                  Bring a system to review <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.appliedDemoFooter}>
        <div>
          <span>WHAT THE REVIEW LEAVES BEHIND</span>
          <div className={styles.appliedDemoDeliverables}>
            {systemsArchitectureReviewDemo.deliverables.map((deliverable) => (
              <strong key={deliverable}>{deliverable}</strong>
            ))}
          </div>
        </div>
        <div>
          <span>CLAIM CEILING</span>
          <p>{systemsArchitectureReviewDemo.claim}</p>
        </div>
      </div>
    </>
  );
}

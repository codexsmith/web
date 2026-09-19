import Link from "next/link";
import { ProductExperienceShell } from "./ProductExperienceShell";
import { AgenticScientificMethodInstrument } from "./AgenticScientificMethodInstrument";
import {
  agenticScientificMethodNav,
  agenticScientificMethodProduct,
  asmArtifacts,
  asmClaimFirewall,
  asmContributions,
  asmDefectLocations,
  asmRoles,
  asmValidationLevels,
} from "../content/agenticScientificMethod";
import styles from "../styles/AgenticScientificMethod.module.css";

export function AgenticScientificMethodExperience() {
  return (
    <ProductExperienceShell
      actions={[
        { href: "#method", label: "Enter the method" },
        {
          href: "/v3/contact?type=collaboration&source=agentic-scientific-method",
          label: "Discuss a pilot",
          kind: "secondary",
        },
      ]}
      heroVisual={<AgenticScientificMethodInstrument />}
      navItems={agenticScientificMethodNav}
      product={agenticScientificMethodProduct}
    >
      <section className={styles.asmMethodSection} id="method">
        <div className={styles.asmMethodLead}>
          <p>THE METHOD</p>
          <h2>Scientific method, with the hidden operations opened up.</h2>
          <span>
            “Form a hypothesis” hides a lot of machinery. What is the goal? What counts as
            the system? Which states matter? Which actions are allowed? Which alternative
            models exist? What observation would distinguish them? Who may change the test?
            What happens when the representation and the world disagree?
          </span>
        </div>

        <blockquote className={styles.asmCanonicalCompression}>
          Bind. Map. Select. Act. Trace. Compare. Diagnose. Repair. Close. Preserve.
        </blockquote>

        <div className={styles.asmContributionGrid}>
          {asmContributions.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1} · {item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.asmKernelRail}>
          <span>BOUND</span>
          <i>→</i>
          <span>LOAD</span>
          <i>→</i>
          <span>TRACE</span>
          <i>→</i>
          <span>TEST</span>
          <i>→</i>
          <span>REPAIR</span>
          <i>→</i>
          <span>CLOSE</span>
        </div>
      </section>

      <section className={styles.asmCorrespondenceSection} id="correspondence">
        <div className={styles.asmCorrespondenceLead}>
          <p>THE SCIENTIFIC OBJECT</p>
          <h2>Put the representation and the observation side by side.</h2>
          <span>
            An ASM inquiry works over two coupled spaces. One describes what the current
            representation says is possible, necessary, impossible, expected, prohibited, or
            unknown. The other contains what was actually observed under declared conditions.
          </span>
        </div>

        <div className={styles.asmTwinSpaces}>
          <article data-space="represented">
            <div className={styles.asmSpaceTopline}>
              <span>REPRESENTED STATE SPACE</span>
              <strong>MODEL</strong>
            </div>

            <div className={styles.asmStateMap}>
              <div data-state="start">S0</div>
              <i>→</i>
              <div>S1</div>
              <i>→</i>
              <div data-state="expected">S2</div>
              <i>→</i>
              <div>S3</div>
            </div>

            <p>
              States, relations, transitions, constraints, invariants, uncertainty, and
              predicted consequences declared before the outcome is known.
            </p>
          </article>

          <div className={styles.asmCompareMachine}>
            <span>CORRESPONDENCE</span>
            <i />
            <strong>COMPARE</strong>
            <i />
            <span>MISMATCH?</span>
          </div>

          <article data-space="observed">
            <div className={styles.asmSpaceTopline}>
              <span>OBSERVED STATE SPACE</span>
              <strong>TRACE</strong>
            </div>

            <div className={styles.asmStateMap}>
              <div data-state="start">O0</div>
              <i>→</i>
              <div>O1</div>
              <i>→</i>
              <div data-state="defect">O?</div>
              <i>→</i>
              <div>O3</div>
            </div>

            <p>
              Raw and transformed traces, measurements, annotations, and registered
              consequences—kept distinct from the interpretation later placed on them.
            </p>
          </article>
        </div>

        <div className={styles.asmDefectWorkbench}>
          <div>
            <span>DEFECT LOCALIZATION</span>
            <h3>A mismatch does not tell you what failed.</h3>
            <p>
              It may be the hypothesis. It may also be the boundary, instrument, action,
              correspondence rule, or closure criterion. ASM treats localization as a
              separate scientific task before repair begins.
            </p>
          </div>

          <div className={styles.asmDefectGrid}>
            {asmDefectLocations.map((location, index) => (
              <span key={location}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {location}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.asmAuthoritySection} id="authority">
        <div className={styles.asmAuthorityLead}>
          <div>
            <p>AUTHORITY + MULTI-AGENT WORK</p>
            <h2>Separate who can do the work from who can authorize the consequence.</h2>
          </div>
          <blockquote>
            Capability is not authority, and authority is not evidence.
          </blockquote>
        </div>

        <div className={styles.asmRoleStack}>
          {asmRoles.map(([role, description], index) => (
            <article key={role}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{role}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.asmPromotionGate}>
          <div>
            <span>GENERATOR</span>
            <strong>Propose</strong>
          </div>
          <i>→</i>
          <div>
            <span>EXECUTOR</span>
            <strong>Run</strong>
          </div>
          <i>→</i>
          <div>
            <span>OBSERVER</span>
            <strong>Record</strong>
          </div>
          <i>→</i>
          <div>
            <span>FALSIFIER</span>
            <strong>Attack</strong>
          </div>
          <i>→</i>
          <div>
            <span>CRITIC</span>
            <strong>Audit</strong>
          </div>
          <i>→</i>
          <div data-final="true">
            <span>HUMAN AUTHORITY</span>
            <strong>Promote / withhold</strong>
          </div>
        </div>

        <p className={styles.asmAuthorityNote}>
          A critic can find the work sound enough for the next review state without becoming
          the authority that turns it into a public claim, canonical replacement, deployment,
          or other consequence-bearing transition.
        </p>
      </section>

      <section className={styles.asmMemorySection} id="memory">
        <div className={styles.asmMemoryLead}>
          <p>DURABLE SCIENTIFIC MEMORY</p>
          <h2>No consequential transition should depend only on chat memory.</h2>
          <span>
            Each phase emits an inspectable artifact. The point is not paperwork for its own
            sake. It is to let another person reconstruct what was believed, what was tested,
            what changed, who authorized it, and where the next repair must begin.
          </span>
        </div>

        <div className={styles.asmArtifactLedger}>
          {asmArtifacts.map(([title, description], index) => (
            <article key={title}>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i aria-hidden="true" />
              </div>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.asmSelfHost}>
          <div className={styles.asmSelfHostMark} aria-hidden="true">↻</div>
          <div>
            <span>FIRST OPERATIONAL RUN · SELF-HOSTING</span>
            <h3>Use the method to criticize and repair the method.</h3>
            <p>
              The first bounded ASM run applies the constructor, memory, critic, and repair
              machinery to its own specification: stabilize sources, extract claims, compare
              prior art, run an independent critic, preserve defects, repair v0.1, and promote
              only what survives.
            </p>
          </div>
          <div className={styles.asmSelfHostRule}>
            <span>NON-NEGOTIABLE</span>
            <strong>No self-approval.</strong>
          </div>
        </div>
      </section>

      <section className={styles.asmValidationSection} id="validation">
        <div className={styles.asmValidationLead}>
          <div>
            <p>VALIDATION LADDER</p>
            <h2>The immediate test is usefulness, not universality.</h2>
          </div>
          <blockquote>
            Does the protocol improve bounded inquiry compared with the baseline practice?
          </blockquote>
        </div>

        <div className={styles.asmValidationLadder}>
          {asmValidationLevels.map(([level, title, description]) => (
            <article key={level}>
              <span>{level}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.asmValidationBottom}>
          <article className={styles.asmProductState}>
            <span>CURRENT PRODUCT STATE</span>
            <strong>Research product with a candidate executable specification.</strong>
            <p>
              The operational suite, governance contracts, Theory Transformation work, and
              machine-readable transition model provide substantial internal machinery.
              That is implementation evidence. It is not yet an executed and externally
              validated scientific research machine.
            </p>
            <div>
              <small>Operational protocol exists</small>
              <small>Authority state machine exists</small>
              <small>Self-hosting run defined</small>
              <small>Internal benchmark portfolio defined</small>
              <small>External pilot still needed</small>
              <small>Formal / cross-domain validation still needed</small>
            </div>
          </article>

          <aside className={styles.asmClaimFirewall}>
            <span>CLAIM FIREWALL</span>
            <strong>What this page does not promote.</strong>
            {asmClaimFirewall.map((claim) => (
              <p key={claim}>{claim}</p>
            ))}
          </aside>
        </div>

        <div className={styles.asmClose}>
          <div>
            <span>NEXT CONTACT WITH REALITY</span>
            <h2>Give the method a bounded inquiry, a baseline, an independent critic, and someone else’s hands.</h2>
          </div>

          <div>
            <Link href="/v3/contact?type=collaboration&source=agentic-scientific-method">
              Discuss an ASM pilot or benchmark <span aria-hidden="true">→</span>
            </Link>
            <Link href="/v3/research">
              Explore the research program <span aria-hidden="true">→</span>
            </Link>
            <Link href="/v3/ai-governance">
              See the AI Governance boundary <span aria-hidden="true">→</span>
            </Link>
            <Link href="/v3/products">
              Back to Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </ProductExperienceShell>
  );
}

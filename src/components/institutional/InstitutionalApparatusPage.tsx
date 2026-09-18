import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Apparatus.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { instruments, apparatusPath, publicExposure, designQuestions } from "./content/apparatus";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalApparatusPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.apparatusPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.apparatusHero}
          eyebrow={<>APPARATUS</>}
          title={<>Operational tools for knowledge infrastructure.</>}
          lead={<>Research creates more structure than a paper can hold.</>}
          support={<>Boundary First Labs builds apparatus for preserving, inspecting, and
              transferring questions, experiments, claims, evidence, provenance,
              criticism, defects, authority, repair, and forward state.</>}
          >
          <blockquote className={styles.apparatusThesis}>
            <span>DESIGN POSTURE</span>
            Legible by humans. Executable by machines. Repairable under critique.
            Transferable without hidden dependence.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.apparatusWhy}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>WHY APPARATUS MATTERS</>}
            title={<>Good ideas can fail because their machinery is opaque.</>}
            description={<>Apparatus makes claims, evidence, experiments, sources, failures,
              authority, and handoff state easier to inspect instead of leaving them in
              memory, prose, or disconnected folders.</>}
            />

          <div className={styles.apparatusQuestions}>
            {[
              "What are we actually investigating?",
              "What have we tried?",
              "What is being claimed?",
              "What supports that claim?",
              "Which source owns the current meaning?",
              "What failed?",
              "What changed afterward?",
              "What is safe to publish?",
              "Who can make the next authority-bearing decision?",
              "Who owns correction and maintenance?",
            ].map((question, index) => (
              <div className={styles.apparatusQuestionPlate} key={question}>
                <span>{formatOrdinal(index)}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.apparatusFederation}>
          <div>
            <p className={styles.sectionIndex}>FEDERATED ARCHITECTURE</p>
            <h2>No universal research database.</h2>
            <p>
              Different instruments own different kinds of state. Discovery,
              registration, validation, publication, execution, and promotion are
              intentionally separate authority boundaries.
            </p>
          </div>

          <div className={styles.authorityFirewall}>
            <code>visibility ≠ authority</code>
            <code>validation ≠ truth</code>
            <code>registration ≠ promotion</code>
            <code>publication ≠ closure</code>
            <code>capability ≠ permission</code>
            <code>transfer ≠ abandonment</code>
          </div>
        </section>

        <section className={styles.instrumentBench}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>INSTRUMENT BENCH</>}
            title={<>Different tools. Explicit authority ceilings.</>}
            note={<>The apparatus is a federation of instruments, not one fictional master database.</>}
            />

          <div className={styles.instrumentGrid}>
            {instruments.map((instrument) => (
              <article
                className={styles.instrumentCard}
                data-instrument-tone={instrument.tone}
                key={instrument.title}
              >
                <div className={styles.instrumentTopline}>
                  <span className={styles.instrumentCode}>{instrument.code}</span>
                  <span className={styles.instrumentVerb}>{instrument.verb}</span>
                </div>

                <div className={styles.instrumentStatus}>{instrument.status}</div>
                <h3>{instrument.title}</h3>
                <blockquote>{instrument.question}</blockquote>
                <p className={styles.instrumentSummary}>{instrument.summary}</p>

                <div className={styles.instrumentDetailGrid}>
                  <div>
                    <span>OBSERVES / CONTROLS</span>
                    <p>{instrument.observes}</p>
                  </div>
                  <div>
                    <span>PREVENTS</span>
                    <p>{instrument.prevents}</p>
                  </div>
                  <div className={styles.instrumentAuthority}>
                    <span>AUTHORITY</span>
                    <p>{instrument.authority}</p>
                  </div>
                  <div className={styles.instrumentNoAuthority}>
                    <span>DOES NOT HAVE AUTHORITY TO</span>
                    <p>{instrument.noAuthority}</p>
                  </div>
                </div>

                <div className={styles.instrumentHandoff}>
                  <span>HANDOFF / STEWARDSHIP</span>
                  {instrument.handoff}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.apparatusPathSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>HOW IT WORKS TOGETHER</>}
            title={<>A simplified research path.</>}
            note={<>No box silently inherits the authority of the next one.</>}
            />

          <div className={styles.apparatusPath}>
            {apparatusPath.map(([index, title, description]) => (
              <div className={styles.apparatusPathStep} key={title}>
                <span>{index}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className={styles.apparatusSurround}>
            <div>
              <span>AROUND THE PATH</span>
              <strong>Registry Registrar</strong>
              <p>Which institutional state surfaces exist?</p>
            </div>
            <div>
              <span>AROUND THE PATH</span>
              <strong>Lab Machinery Registry</strong>
              <p>Which operational capabilities exist?</p>
            </div>
            <div>
              <span>ACROSS THE PATH</span>
              <strong>Steward / authority / correction path</strong>
              <p>Who may act, repair, stop, and remain responsible through transfer?</p>
            </div>
          </div>
        </section>

        <section className={styles.humanGateSection}>
          <div>
            <p className={styles.sectionIndex}>HUMAN GATES</p>
            <h2>Human gates are not anti-automation.</h2>
            <p>
              Search, indexing, comparison, extraction, transformation, checking,
              routing, synthesis, and bounded execution can be automated aggressively.
              The gate appears where an operation changes authority, public claim state,
              irreversible consequence, or stewardship.
            </p>
          </div>
          <blockquote>
            Automation may extend capability without silently absorbing responsibility.
          </blockquote>
        </section>

        <section className={styles.paperProjectionSection}>
          <div>
            <p className={styles.sectionIndex}>PUBLICATION MODEL</p>
            <h2>A paper is one view of the machine.</h2>
            <p>
              The readable article can remain the public front door while surrounding
              apparatus preserves the state needed to inspect, challenge, revise, and
              continue the work.
            </p>
          </div>

          <div className={styles.paperProjectionRail}>
            {[
              "Claim",
              "Source",
              "Dependency",
              "Experiment",
              "Evidence",
              "Criticism",
              "Defect",
              "Repair",
              "Status",
              "Revision",
              "Publication",
              "Successor use",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className={styles.publicExposureSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PUBLIC EXPOSURE</>}
            title={<>Inspectability needs boundaries too.</>}
            note={<>Transparency is not indiscriminate disclosure. Stewardship requires both
              legibility and boundary discipline.</>}
            />

          <div className={styles.exposureGrid}>
            {publicExposure.map((group) => (
              <article
                className={styles.exposureCard}
                data-exposure-tone={group.tone}
                key={group.title}
              >
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.apparatusDesignQuestions}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>DESIGN POSTURE</>}
            title={<>Every instrument should answer six questions quickly.</>}
            />
          <div className={styles.designQuestionGrid}>
            {designQuestions.map((question, index) => (
              <div className={styles.designQuestionPlate} key={question}>
                <span>{formatOrdinal(index)}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.instrumentTrust}>
          <div>
            <p className={styles.sectionIndex}>TRUST PRINCIPLE</p>
            <h2>No instrument is allowed to promote itself.</h2>
            <p>
              A validator cannot declare a theory true because its schema passed. A registry
              cannot promote an object because it indexed it. A generated page cannot become
              source authority because it is public. A complete packet cannot establish the
              truth of its contents merely because it is complete.
            </p>
          </div>

          <div>
            <p className={styles.sectionIndex}>STEWARDSHIP PRINCIPLE</p>
            <h2>Launch is not closure.</h2>
            <p>
              Every durable artifact needs an owner, a correction path, and a transfer,
              succession, migration, retirement, or maintenance story.
            </p>
          </div>
        </section>

        <section className={styles.apparatusClose}>
          <p className={styles.sectionIndex}>CLOSING TEST</p>
          <h2>Research becomes durable when its state can survive transfer.</h2>
          <p>
            The apparatus preserves more than conclusions. It preserves questions,
            sources, experiments, defects, criticism, repair, authority, and forward
            state—leaving the next person with more capability and less hidden dependence.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}

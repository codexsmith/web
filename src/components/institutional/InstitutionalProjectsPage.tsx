import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Projects.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { projectGrammar, projects, capabilityOutcomes } from "./content/projects";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalProjectsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.projectsPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.projectsHero}
          eyebrow={<>PROJECTS</>}
          title={<>Theory should travel.</>}
          lead={<>A method becomes more interesting when it survives outside the environment
              in which it was developed.</>}
          support={<>Projects put ideas, representations, instruments, and workflows under
              different kinds of pressure in bounded real systems.</>}
          >
          <blockquote className={styles.projectHeroQuestion}>
            <span>PROJECT QUESTION</span>
            What happened — or what are we preparing to test — when the Lab&apos;s
            machinery encountered an actual bounded system?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.transferEvidence}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>TRANSFER EVIDENCE</>}
            title={<>Deployment is another experiment.</>}
            description={<>Projects are not a victory lap. They are places where usefulness, burden,
              ambiguity, failure, marketability, agency, maintenance, and transfer become
              visible.</>}
            />

          <div className={styles.deploymentLoop}>
            <span>Research</span>
            <span>Instrument</span>
            <span>Project</span>
            <span>Use / test / failure</span>
            <span>Human &amp; system consequence</span>
            <span>Revised research / product state</span>
          </div>
        </section>

        <section className={styles.projectGrammarSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PROJECT-PAGE GRAMMAR</>}
            title={<>Ten questions keep a project honest.</>}
            note={<>Describe the native domain before translating it into Boundary First language.</>}
            />

          <div className={styles.projectGrammarGrid}>
            {projectGrammar.map(([index, title, description]) => (
              <article className={styles.projectGrammarPlate} key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.featuredProjectsRoute}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FEATURED PROJECTS</>}
            title={<>Five different places for the machinery to succeed, bend, or fail.</>}
            note={<>Status comes from the source object. These projects do not share one lifecycle.</>}
            />

          <div className={styles.projectCaseGrid}>
            {projects.map((project) => (
              <article
                className={styles.projectCaseCard}
                data-project-tone={project.tone}
                key={project.title}
              >
                <div className={styles.projectCaseTopline}>
                  <span className={styles.projectCaseCode}>{project.code}</span>
                  <span className={styles.projectNativeStatus}>{project.status}</span>
                </div>

                <p className={styles.projectCaseType}>{project.type}</p>
                <h3>{project.title}</h3>

                <div className={styles.projectCaseFacts}>
                  <div>
                    <span>NATIVE DOMAIN</span>
                    <strong>{project.domain}</strong>
                  </div>
                  <div>
                    <span>PRIMARY STRESS</span>
                    <strong>{project.stress}</strong>
                  </div>
                </div>

                <blockquote>{project.question}</blockquote>

                <div className={styles.projectCaseResult}>
                  <span>WHAT EXISTS / CURRENT RESULT</span>
                  <p>{project.result}</p>
                </div>

                <div className={styles.projectConsequenceGrid}>
                  <div>
                    <span>AGENCY</span>
                    <p>{project.agency}</p>
                  </div>
                  <div>
                    <span>STEWARDSHIP</span>
                    <p>{project.stewardship}</p>
                  </div>
                </div>

                <div className={styles.projectTransferSignal}>
                  <span>TRANSFER SIGNAL</span>
                  {project.transfer}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.projectNativeStatusRule}>
          <div>
            <p className={styles.sectionIndex}>STATUS RULE</p>
            <h2>Normalize the display. Preserve the meaning.</h2>
            <p>
              A Product, Research Scaffold, Civic Case, and Experiment may all have status,
              but they do not move through the same lifecycle.
            </p>
          </div>

          <div className={styles.nativeStatusExamples}>
            <div>
              <span>PRODUCT</span>
              <code>active_build</code>
              <code>research_product</code>
              <code>pilot</code>
              <code>released</code>
            </div>
            <div>
              <span>RESEARCH / APPLIED SCAFFOLD</span>
              <code>exploration</code>
              <code>working model</code>
              <code>benchmark plan</code>
              <code>experimented</code>
            </div>
            <div>
              <span>CIVIC CASE</span>
              <code>candidate</code>
              <code>research active</code>
              <code>promoted / not promoted</code>
            </div>
          </div>
        </section>

        <section className={styles.projectFirewall}>
          <p className={styles.sectionIndex}>PERMANENT FIREWALL</p>
          <h2>Products are not research results.</h2>
          <div className={styles.firewallEquations}>
            <code>research maturity ≠ product maturity</code>
            <code>scientific evidence ≠ product validation</code>
            <code>product adoption ≠ theory validation</code>
            <code>feature / wedge ≠ durable Product identity</code>
            <code>intended agency benefit ≠ demonstrated human outcome</code>
            <code>technical handoff ≠ successful stewardship transfer</code>
          </div>
        </section>

        <section className={styles.capabilityTransfer}>
          <div>
            <p className={styles.sectionIndex}>CAPABILITY TRANSFER</p>
            <h2>What can someone else do after BFL leaves?</h2>
            <p>
              Permanent dependence on Boundary First Labs is not the default success
              condition.
            </p>
          </div>

          <div className={styles.capabilityOutcomeGrid}>
            {capabilityOutcomes.map((outcome, index) => (
              <div className={styles.capabilityOutcome} key={outcome}>
                <span>{formatOrdinal(index)}</span>
                <strong>{outcome}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projectsClose}>
          <p className={styles.sectionIndex}>CLOSING TEST</p>
          <h2>
            Research becomes more credible when it has somewhere to fail.
          </h2>
          <p>
            Sometimes the machinery becomes a paper, product, benchmark, or better
            instrument. Sometimes the domain forces a repair. Sometimes established
            practice wins. All of those outcomes are useful when evidence, status, and
            consequence remain visible.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}

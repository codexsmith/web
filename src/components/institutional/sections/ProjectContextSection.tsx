import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Projects.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  capabilityOutcomes,
  projectGrammar,
} from "../content/projects";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const projectContextOrder = [
  "transfer-evidence",
  "project-page-grammar",
  "status-rule",
  "permanent-firewall",
  "capability-transfer",
] as const;

function ProjectContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.projectContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProjectContextCard({
  id,
  label,
  eyebrow,
  title,
  description,
  className,
  tone,
  children,
}: {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  className: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <ReflowFieldItem
      id={id}
      label={label}
      className={[styles.projectContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ProjectContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function ProjectContextSection() {
  return (
    <section className={styles.projectContext}>
      <div className={styles.projectContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW TO READ A PROJECT</>}
          title={<>A project should show more than a polished outcome.</>}
          note={<>These sections explain how the Lab separates a project's domain, result, status, evidence, responsibility, and handoff.</>}
        />

        <ReflowField
          className={styles.projectContextGrid}
          ariaLabel="Project transfer and stewardship context"
          layoutMode="focus-stage"
          itemOrder={projectContextOrder}
        >
          <ProjectContextCard
            id="transfer-evidence"
            label="Reality Test"
            eyebrow="REALITY TEST"
            title="Putting work into use creates new evidence."
            description="Usefulness, burden, ambiguity, failure, maintenance, and handoff become visible when the work meets a real system."
            className={styles.projectContextTransfer}
            tone="transfer"
          >
            <div className={styles.projectContextDetail}>
              <p>
                Projects are not a victory lap. They are places where usefulness, burden,
                ambiguity, failure, marketability, agency, maintenance, and transfer become
                visible.
              </p>
              <div className={styles.deploymentLoop}>
                <span>Research</span>
                <span>Tool / method</span>
                <span>Project</span>
                <span>Use / test / failure</span>
                <span>What happened</span>
                <span>Update the research or product</span>
              </div>
            </div>
          </ProjectContextCard>

          <ProjectContextCard
            id="project-page-grammar"
            label="Ten Project Questions"
            eyebrow="TEN PROJECT QUESTIONS"
            title="A consistent set of questions keeps a project honest."
            description="Start with the real domain, problem, intervention, and result before introducing Boundary First interpretation."
            className={styles.projectContextGrammar}
            tone="grammar"
          >
            <div className={styles.projectGrammarGrid}>
              {projectGrammar.map(([index, title, description]) => (
                <article className={styles.projectGrammarPlate} key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </ProjectContextCard>

          <ProjectContextCard
            id="status-rule"
            label="Status"
            eyebrow="STATUS"
            title="Different kinds of work need different status language."
            description="A product, research program, civic case, and experiment can all show status without pretending they move through the same lifecycle."
            className={styles.projectContextStatus}
            tone="status"
          >
            <div className={styles.projectStatusDetail}>
              <p>
                A Product, Research Scaffold, Civic Case, and Experiment may all have status,
                but they do not move through the same lifecycle.
              </p>
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
            </div>
          </ProjectContextCard>

          <ProjectContextCard
            id="permanent-firewall"
            label="Keep Claims Separate"
            eyebrow="KEEP CLAIMS SEPARATE"
            title="A useful product does not prove a theory."
            description="Research maturity, product maturity, adoption, scientific evidence, human benefit, and successful handoff remain different claims."
            className={styles.projectContextFirewall}
            tone="firewall"
          >
            <div className={styles.projectFirewallDetail}>
              <div className={styles.firewallEquations}>
                <code>research maturity ≠ product maturity</code>
                <code>scientific evidence ≠ product validation</code>
                <code>product adoption ≠ theory validation</code>
                <code>feature / wedge ≠ durable Product identity</code>
                <code>intended agency benefit ≠ demonstrated human outcome</code>
                <code>technical handoff ≠ successful stewardship transfer</code>
              </div>
            </div>
          </ProjectContextCard>

          <ProjectContextCard
            id="capability-transfer"
            label="Handoff"
            eyebrow="HANDOFF"
            title="What can someone else do after BFL steps away?"
            description="A strong project should leave behind useful knowledge, tools, documentation, or operating capability rather than permanent dependence on the Lab."
            className={styles.projectContextCapability}
            tone="capability"
          >
            <div className={styles.projectCapabilityDetail}>
              <p>
                Permanent dependence on Boundary First Labs is not the default success
                condition.
              </p>
              <div className={styles.capabilityOutcomeGrid}>
                {capabilityOutcomes.map((outcome, index) => (
                  <div className={styles.capabilityOutcome} key={outcome}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{outcome}</strong>
                  </div>
                ))}
              </div>
            </div>
          </ProjectContextCard>
        </ReflowField>
      </div>
    </section>
  );
}

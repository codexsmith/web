import type { ReactNode } from "react";
import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/About.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  representations,
  recurringFailures,
  oldMachinery,
  recurringStructures,
  methodCycle,
  agencyRoutes,
  capabilityOutputs,
  stewardshipFacets,
  stewardshipQuestions,
  labInstruments,
} from "../content/about";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const representationOrder = [
  "knowledge-infrastructure",
  "representation-consequences",
  "recurring-problem",
  "old-machinery",
  "method-development",
] as const;

const agencyOrder = [
  "human-agency",
  "constructive-humanism",
  "stewardship",
] as const;

const institutionOrder = [
  "why-a-lab",
  "criticism-friendly",
  "collaboration",
  "public-good",
] as const;

function AboutContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.aboutContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function AboutContextCard({
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
      className={[styles.aboutContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <AboutContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

function AboutGroupHeader({
  index,
  group,
  title,
  description,
}: {
  index: string;
  group: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.aboutGroupHeader}>
      <span className={styles.aboutGroupIndex}>{index}</span>
      <div>
        <p>{group}</p>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

export function AboutReflowGroups() {
  return (
    <>
      <section className={styles.aboutGroup} data-about-group="representation">
        <AboutGroupHeader
          index="01"
          group="REPRESENTATION + METHOD"
          title="How the Lab understands complex systems."
          description="Representations, recurring failure shapes, mature machinery, and the method used to compare and formalize them."
        />

        <ReflowField
          className={[styles.aboutGroupGrid, styles.aboutRepresentationGrid].join(" ")}
          ariaLabel="Representation and method"
          layoutMode="focus-stage"
          itemOrder={representationOrder}
        >
          <AboutContextCard
            id="knowledge-infrastructure"
            label="Knowledge Is Infrastructure"
            eyebrow="KNOWLEDGE IS INFRASTRUCTURE"
            title="Complex reasoning depends on representations."
            description="Representations make difficult systems manageable and determine what a system can distinguish, store, transform, and act upon."
            className={styles.aboutContextKnowledge}
            tone="representation"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                Representations make difficult systems manageable. They also determine what
                a system can see, distinguish, store, transform, and sometimes act upon.
              </p>
              <div className={styles.representationGrid}>
                {representations.map(([title, description], index) => (
                  <div className={styles.representationPlate} key={title}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="representation-consequences"
            label="Representation Has Consequences"
            eyebrow="REPRESENTATION HAS CONSEQUENCES"
            title="A useful category is never the whole person."
            description="Abstractions may be necessary, but consequential systems should not confuse the category with the person it represents."
            className={styles.aboutContextConsequences}
            tone="human"
          >
            <div className={styles.aboutContextSplit}>
              <p>
                A person may enter a system as a patient, student, employee, citizen,
                customer, applicant, account, demographic category, diagnosis, or case.
                Those abstractions may be necessary. They are not the whole person.
              </p>
              <blockquote>
                No human being is exhausted by the category through which an institution
                encounters them.
              </blockquote>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="recurring-problem"
            label="The Recurring Problem"
            eyebrow="THE RECURRING PROBLEM"
            title="Many hard systems failures have the same shape."
            description="The representation and the reality it stands for have drifted apart."
            className={styles.aboutContextProblem}
            tone="problem"
          >
            <div className={styles.recurringFailureGrid}>
              {recurringFailures.map(([title, description], index) => (
                <article className={styles.recurringFailureCard} key={title}>
                  <span>{formatOrdinal(index)}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="old-machinery"
            label="Old Machinery, Re-understood"
            eyebrow="OLD MACHINERY, RE-UNDERSTOOD"
            title="Start with what already works."
            description="Put mature machinery beside mature machinery and separate recurring structure from superficial analogy."
            className={styles.aboutContextMachinery}
            tone="machinery"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                Boundary First does not begin by assuming established disciplines need to be
                replaced. It puts mature machinery beside mature machinery and asks which
                recurring structures are genuinely useful—and which similarities are only analogy.
              </p>
              <div className={styles.oldMachineryWorkbench}>
                <div className={styles.oldMachineryList}>
                  <span>WORKING MACHINERY</span>
                  {oldMachinery.map((item) => <strong key={item}>{item}</strong>)}
                </div>
                <div className={styles.recurringStructureList}>
                  <span>RECURRING STRUCTURES</span>
                  {recurringStructures.map((item) => <strong key={item}>{item}</strong>)}
                </div>
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="method-development"
            label="How the Method Developed"
            eyebrow="HOW THE METHOD DEVELOPED"
            title="Practice first. Then comparison, formalization, and test."
            description="Systematize before speculating; make the pattern precise enough to fail."
            className={styles.aboutContextMethod}
            tone="method"
          >
            <>
              <div className={styles.aboutCycleRail}>
                {methodCycle.map(([index, title, description]) => (
                  <div className={styles.aboutCycleStep} key={title}>
                    <span>{index}</span>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>

              <div className={styles.aboutMethodOrigins}>
                <article>
                  <span>PRACTICE-BORN</span>
                  <h3>Repair the representation.</h3>
                  <p>
                    In software, data, organizations, and public systems, deeper failures
                    often came from an incomplete state model, collapsed distinction, hidden
                    condition, or abstraction that had reached its limit.
                  </p>
                </article>
                <article>
                  <span>LEAN–AGILE LINEAGE</span>
                  <h3>Make state visible and shorten the path to evidence.</h3>
                  <p>
                    Agile, Lean, Kanban, and Lean Startup were practiced in consulting,
                    product, and delivery work before Boundary First was formalized. They
                    contributed visible work state, bounded work in progress, empirical
                    feedback, capacity awareness, small increments, and adaptation under
                    changing conditions.
                  </p>
                </article>
                <article>
                  <span>SCIENTIFIC METHOD</span>
                  <h3>Reality gets a veto.</h3>
                  <p>
                    Questions, hypotheses, controls, measurement, comparison, null results,
                    falsification, replication, and explicit uncertainty constrain what the
                    Lab is allowed to conclude from a useful idea or a successful run.
                  </p>
                </article>
                <article>
                  <span>AGENTIC REASONING</span>
                  <h3>Search the problem space without surrendering authority.</h3>
                  <p>
                    Agents can decompose questions, explore alternatives, select tools,
                    compare representations, synthesize evidence, criticize candidates, and
                    propose repairs. Generated fluency and technical execution remain
                    subordinate to evidence, verification, and human promotion gates.
                  </p>
                </article>
                <article>
                  <span>FORMALLY GENERALIZED</span>
                  <h3>Make the pattern precise enough to fail.</h3>
                  <p>
                    A useful generalization should recover the cases it came from, expose
                    consequential distinctions, produce operational consequences, and become
                    implementable or testable where possible.
                  </p>
                </article>
              </div>
            </>
          </AboutContextCard>
        </ReflowField>
      </section>

      <section className={styles.aboutGroup} data-about-group="agency">
        <AboutGroupHeader
          index="02"
          group="AGENCY + STEWARDSHIP"
          title="What the machinery should preserve for people."
          description="Agency, repair, capability transfer, responsibility, and the obligations created by consequential systems."
        />

        <ReflowField
          className={[styles.aboutGroupGrid, styles.aboutAgencyGrid].join(" ")}
          ariaLabel="Agency and stewardship"
          layoutMode="focus-stage"
          itemOrder={agencyOrder}
        >
          <AboutContextCard
            id="human-agency"
            label="Agency Is Not Autonomy Alone"
            eyebrow="AGENCY IS NOT AUTONOMY ALONE"
            title="Humans are agents too."
            description="Consequential systems should preserve the capacity to understand, choose, refuse, contest, revise, and repair."
            className={styles.aboutContextAgency}
            tone="agency"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                Agency includes the capacity to perceive, distinguish, reason, choose,
                refuse, create, revise, and repair. Consequential systems should not erase
                those capacities unnecessarily.
              </p>
              <div className={styles.agencyRouteGrid}>
                {agencyRoutes.map((route, index) => (
                  <div className={styles.agencyRoutePlate} key={route}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{route}</strong>
                  </div>
                ))}
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="constructive-humanism"
            label="Constructive Humanism"
            eyebrow="CONSTRUCTIVE HUMANISM"
            title="Critique matters. Repair matters more."
            description="Ask what representation, instrument, process, or institution would leave people more capable afterward."
            className={styles.aboutContextHumanism}
            tone="humanism"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                The question is not only what is wrong with a system. It is what
                representation, instrument, process, or institution would leave people more
                capable afterward.
              </p>
              <div className={styles.capabilityOutputGrid}>
                {capabilityOutputs.map((output, index) => (
                  <div className={styles.capabilityOutputPlate} key={output}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{output}</strong>
                  </div>
                ))}
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="stewardship"
            label="Stewardship"
            eyebrow="STEWARDSHIP"
            title="Stewardship spans knowledge, people, and the conditions they depend on."
            description="Intellectual, humanist, and ecological stewardship make consequence chains visible beyond launch, publication, or local optimization."
            className={styles.aboutContextStewardship}
            tone="stewardship"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                If people depend on something the Lab builds, launch is not closure.
                Maintenance, correction, provenance, migration, retirement, repair, and
                transfer become part of the engineering problem.
              </p>
              <div className={styles.aboutStewardshipModes}>
                {stewardshipFacets.map((facet) => (
                  <article key={facet.label}>
                    <span>{facet.label}</span>
                    <h3>{facet.title}</h3>
                    <p>{facet.description}</p>
                  </article>
                ))}
              </div>

              <div className={styles.aboutStewardshipGrid}>
                {stewardshipQuestions.map((question, index) => (
                  <div className={styles.aboutStewardshipPlate} key={question}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{question}</strong>
                  </div>
                ))}
              </div>

              <Link className={styles.aboutGovernanceBridge} href="/v3/ai-governance">
                AI makes this agency question operational: inspect the Lab&apos;s AI governance doctrine
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </AboutContextCard>
        </ReflowField>
      </section>

      <section className={styles.aboutGroup} data-about-group="institution">
        <AboutGroupHeader
          index="03"
          group="INSTITUTIONAL PRACTICE"
          title="How Boundary First Labs should behave as an institution."
          description="Apparatus, criticism, collaboration, public-interest work, and the discipline required to remain answerable."
        />

        <ReflowField
          className={[styles.aboutGroupGrid, styles.aboutInstitutionGrid].join(" ")}
          ariaLabel="Institutional practice"
          layoutMode="focus-stage"
          itemOrder={institutionOrder}
        >
          <AboutContextCard
            id="why-a-lab"
            label="Why a Lab?"
            eyebrow="WHY A LAB?"
            title="Because ideas need apparatus."
            description="A laboratory turns questions into inspectable, improvable, transferable operational objects."
            className={styles.aboutContextWhyLab}
            tone="lab"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                A laboratory is an environment where questions become operational. Boundary
                First Labs applies that posture to reasoning systems: make difficult ideas
                inspectable enough to improve and transferable enough that they do not remain
                trapped inside one person&apos;s head.
              </p>
              <div className={styles.labInstrumentRail}>
                {labInstruments.map((instrument, index) => (
                  <div key={instrument}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{instrument}</strong>
                  </div>
                ))}
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="criticism-friendly"
            label="Criticism-Friendly Institution"
            eyebrow="CRITICISM-FRIENDLY INSTITUTION"
            title="Some of our ideas will be wrong."
            description="Claims need states, assumptions need visibility, and criticism must be able to change something."
            className={styles.aboutContextCriticism}
            tone="criticism"
          >
            <div className={styles.aboutContextSplit}>
              <p>
                Claims should have states. Assumptions should be visible. Experiments and
                counterexamples should remain attached. Revision should be normal. A criticism
                mechanism that cannot change anything is only theater.
              </p>
              <blockquote>What we ask of systems, we must ask of ourselves.</blockquote>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="collaboration"
            label="Collaboration Without Absorption"
            eyebrow="COLLABORATION WITHOUT ABSORPTION"
            title="The smallest lawful relationship that lets the work meet strong reality."
            description="BFL should not recreate authority, lived knowledge, infrastructure, distribution, capital, or stewardship merely to keep work inside the Lab."
            className={styles.aboutContextCollaboration}
            tone="collaboration"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                Collaboration may mean review, co-development, data access, a pilot,
                licensing, publication, sponsorship, or transfer.
              </p>
              <div className={styles.collaborationQuestions}>
                <blockquote>
                  What does BFL contribute that the collaborator does not already have?
                </blockquote>
                <blockquote>
                  What does the collaborator contribute that BFL cannot or should not reproduce?
                </blockquote>
              </div>
            </div>
          </AboutContextCard>

          <AboutContextCard
            id="public-good"
            label="Public Good"
            eyebrow="PUBLIC GOOD"
            title="Institutions run on representations too."
            description="Forms, records, categories, rules, databases, metrics, interfaces, and workflows determine what institutions can see and do."
            className={styles.aboutContextPublicGood}
            tone="public"
          >
            <div className={styles.aboutContextDetail}>
              <p>
                A missing distinction can become a broken process; a lossy handoff can become
                information that never reaches the institution that needs it.
              </p>
              <p>
                That is why public-interest systems belong inside the Lab&apos;s scope. The same
                machinery used to inspect technical and scientific systems can help institutions
                become more legible and more answerable to the people who depend on them.
              </p>
            </div>
          </AboutContextCard>
        </ReflowField>
      </section>
    </>
  );
}

import { InstitutionalFooter, InstitutionalHeader } from "./InstitutionalChrome";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

const participationContracts = [
  {
    code: "01",
    title: "Inspect a System",
    subtitle: "Bring public machinery that deserves inspection.",
    type: "PUBLIC_INFRASTRUCTURE_NOMINATION",
    tone: "public",
    description:
      "Nominate a civic, institutional, service, data, software, or infrastructure system that is consequential but difficult to understand, reconcile, contest, or repair.",
    ordinaryLanguage: [
      "What system or process is involved?",
      "Where does it operate?",
      "Who depends on it?",
      "What seems to fail, disappear, contradict, or remain unexplained?",
      "What public evidence exists?",
      "Why does it matter?",
    ],
    possibleOutcomes:
      "Bounded systems analysis, public explainer, consequence map, data review, process reconstruction, interface audit, research packet, prototype, or referral.",
    boundary:
      "Submission would not guarantee investigation, publication, advocacy, representation, or remediation.",
  },
  {
    code: "02",
    title: "Critique Our Work",
    subtitle: "If we are wrong, show us where.",
    type: "BFL_CRITIQUE",
    tone: "critique",
    description:
      "Report factual, mathematical, logical, implementation, accessibility, evidence, prior-art, overclaim, or stewardship defects in the Lab's work or behavior.",
    ordinaryLanguage: [
      "What object are you criticizing?",
      "What exact claim, passage, behavior, or implementation is at issue?",
      "What kind of defect is it?",
      "What evidence or counterexample supports the criticism?",
      "What consequence follows if the criticism is right?",
      "Would you want a public response?",
    ],
    possibleOutcomes:
      "Triage, reproduction, acceptance, partial acceptance, reasoned dispute, incorporation, rejection with reasons, or unresolved status.",
    boundary:
      "Disagreement should be able to change institutional state when the evidence warrants it; it is not a customer-support performance.",
  },
  {
    code: "03",
    title: "Work With Us",
    subtitle: "Collaboration without absorption.",
    type: "COLLABORATION_INQUIRY",
    tone: "collaboration",
    description:
      "Explore a bounded relationship when another person or organization has expertise, infrastructure, lived knowledge, implementation capacity, data, distribution, capital, or stewardship the work genuinely requires.",
    ordinaryLanguage: [
      "What does your team know, own, operate, or steward?",
      "What problem or opportunity are you working on?",
      "What does BFL contribute that you do not already have?",
      "What do you contribute that BFL cannot or should not reproduce?",
      "What is the smallest useful relationship?",
      "What publication, confidentiality, attribution, or transfer boundary matters?",
    ],
    possibleOutcomes:
      "Expert review, replication, advisory participation, a small joint experiment, co-development, data/infrastructure access, pilot, publication, licensing, sponsorship, investment, distribution, or stewardship transfer.",
    boundary:
      "Collaboration is not sought merely to make the Lab look larger or more legitimate.",
  },
  {
    code: "04",
    title: "Bring Us Your Work",
    subtitle: "You do not need to know what category it belongs in first.",
    type: "WORK_HISTORY_GOALS_INTAKE",
    tone: "intake",
    description:
      "Bring completed work, unusual experience, technical artifacts, evidence, stubborn systems failures, cross-disciplinary projects, or a question you cannot yet formulate cleanly.",
    ordinaryLanguage: [
      "Who are you or what is the organization?",
      "What have you already done?",
      "What are you working on now?",
      "What evidence or artifacts exist?",
      "What repeatedly fails or remains illegible?",
      "What are you trying to make possible?",
      "What do you know is missing?",
      "What do you not yet know how to ask?",
    ],
    possibleOutcomes:
      "Archive, resource routing, clarifying questions, bounded critique, method scaffolding, technical review, introduction, small experiment, or formal collaboration.",
    boundary:
      "No intake would create an entitlement to funding, collaboration, endorsement, publication, or internal access.",
  },
] as const;

const stewardshipGates = [
  "Privacy and retention",
  "Confidential-material boundaries",
  "Personally identifying information handling",
  "Moderation and abuse controls",
  "Consent before publication",
  "Contributor credit",
  "Conflict-of-interest disclosure",
  "Response-capacity language",
  "Security boundaries",
  "Reliance boundaries where relevant",
  "Public-record implications",
  "Internal access-control rules",
] as const;

const sharedEnvelope = [
  "submission_id",
  "submission_type",
  "submitter_type",
  "contact mode",
  "public / private preference",
  "summary",
  "artifacts / links",
  "claimed facts and provenance",
  "requested outcome",
  "privacy / safety flags",
  "consent / publication permissions",
  "routing state",
  "response state",
] as const;

const capabilityOutcomes = [
  "Clearer system models",
  "Improved internal documentation",
  "Reusable tools",
  "A better dataset",
  "A maintained process",
  "New analytical skill",
  "Research infrastructure",
  "A public artifact",
  "A relationship with a better long-term steward",
] as const;

export function InstitutionalOpenLabPage() {
  return (
    <div className={styles.page}>
      <InstitutionalHeader />

      <main className={styles.openLabPage}>
        <section className={styles.openLabHero}>
          <div>
            <p className={styles.eyebrow}>OPEN LAB</p>
            <h1>A research institution should have a permeable boundary.</h1>
            <p className={styles.routeLead}>
              Boundary First Labs should not be a one-way publishing machine.
            </p>
            <p className={styles.routeSupport}>
              The public should be able to bring consequential systems, criticism,
              expertise, collaboration, and unusual work to the Lab without first
              learning the Lab&apos;s internal vocabulary.
            </p>
          </div>

          <blockquote className={styles.openLabThesis}>
            <span>FOUR PUBLIC CONTRACTS</span>
            We inspect public systems.<br />
            Inspect us.<br />
            Build with us.<br />
            Bring us what does not fit.
          </blockquote>
        </section>

        <section className={styles.openLabAvailability}>
          <div className={styles.openLabAvailabilitySignal} aria-hidden="true" />
          <div>
            <span>INTAKE STATUS</span>
            <h2>Participation contracts designed. Submission pipeline not yet live.</h2>
            <p>
              Privacy, retention, security, moderation, consent, and response-capacity
              rules must be defined before the site invites people to send material.
              Please do not submit sensitive information through ad hoc channels in the
              meantime.
            </p>
          </div>
        </section>

        <section className={styles.openLabContracts}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>PUBLIC PARTICIPATION</p>
              <h2>Four routes. Four different relationships.</h2>
            </div>
            <span>
              Shared infrastructure may route them later, but the public contracts stay distinct.
            </span>
          </div>

          <div className={styles.openLabContractGrid}>
            {participationContracts.map((contract) => (
              <article
                className={styles.openLabContractCard}
                data-open-lab-tone={contract.tone}
                key={contract.title}
              >
                <div className={styles.openLabContractTopline}>
                  <span className={styles.openLabContractCode}>{contract.code}</span>
                  <code>{contract.type}</code>
                </div>

                <h3>{contract.title}</h3>
                <p className={styles.openLabContractSubtitle}>{contract.subtitle}</p>
                <p className={styles.openLabContractDescription}>{contract.description}</p>

                <div className={styles.openLabOrdinaryLanguage}>
                  <span>WHAT WE WOULD ASK IN ORDINARY LANGUAGE</span>
                  <ul>
                    {contract.ordinaryLanguage.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className={styles.openLabOutcome}>
                  <span>POSSIBLE ROUTING / OUTCOME</span>
                  <p>{contract.possibleOutcomes}</p>
                </div>

                <div className={styles.openLabBoundary}>
                  <span>BOUNDARY</span>
                  <p>{contract.boundary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.openLabAgency}>
          <div>
            <p className={styles.sectionIndex}>AGENCY IN BOTH DIRECTIONS</p>
            <h2>Permeability with governance.</h2>
            <p>
              The Lab may inspect a public system, and the public may inspect the Lab.
              A collaborator may reject BFL&apos;s framing. A critic may expose a missing
              distinction. A community may know consequences the public record does not
              represent adequately.
            </p>
          </div>

          <blockquote>
            The institution should be able to receive information without pretending every
            submission is correct, actionable, or within scope.
          </blockquote>
        </section>

        <section className={styles.openLabStewardship}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>STEWARDSHIP BEGINS AT COLLECTION</p>
            <h2>Intake creates obligations before it creates opportunities.</h2>
            <p>
              The site should not invite disclosure merely because a form can technically
              accept it. These controls must exist before public submission goes live.
            </p>
          </div>

          <div className={styles.openLabGateGrid}>
            {stewardshipGates.map((gate, index) => (
              <div className={styles.openLabGatePlate} key={gate}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{gate}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.openLabInfrastructure}>
          <div>
            <p className={styles.sectionIndex}>SHARED INFRASTRUCTURE, DISTINCT CONTRACTS</p>
            <h2>One envelope can route four typed intents.</h2>
            <p>
              A future backend may share identity, consent, provenance, privacy, and routing
              machinery while preserving what kind of relationship the person actually
              requested.
            </p>
          </div>

          <div className={styles.openLabEnvelope}>
            <span>COMMON ENVELOPE — CANDIDATE</span>
            <div>
              {sharedEnvelope.map((field) => <code key={field}>{field}</code>)}
            </div>
          </div>
        </section>

        <section className={styles.openLabInterfaceRule}>
          <div>
            <p className={styles.sectionIndex}>HUMANIST INTERFACE RULE</p>
            <h2>The institution owns the burden of routing.</h2>
            <p>
              People should not need to translate themselves into research lanes,
              registries, critique objects, evidence-source types, or product categories
              before the Lab is willing to understand what they are trying to say.
            </p>
          </div>

          <div className={styles.openLabTranslation}>
            <span>PUBLIC LANGUAGE</span>
            <strong>What happened? What do you have? What keeps failing? What are you trying to do?</strong>
            <span>INTERNAL ROUTING — LATER</span>
            <strong>Research lane · critique object · collaboration record · project candidate · evidence source · civic case</strong>
          </div>
        </section>

        <section className={styles.openLabCapability}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>CAPABILITY, NOT DEPENDENCE</p>
            <h2>Useful work should leave something behind.</h2>
            <p>
              When BFL does work with a person or institution, the preferred outcome is
              increased durable capability rather than manufactured dependency on the Lab.
            </p>
          </div>

          <div className={styles.openLabCapabilityGrid}>
            {capabilityOutcomes.map((outcome, index) => (
              <div className={styles.openLabCapabilityPlate} key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{outcome}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.openLabClose}>
          <p className={styles.sectionIndex}>INSTITUTIONAL PROMISE</p>
          <h2>
            Make the boundary permeable enough that valuable observations, criticism,
            people, and work can enter—without forcing them into the wrong category first.
          </h2>
          <p>
            Open Lab is the designed public boundary of the institution. The contracts are
            now legible; the submission machinery should only become active when its
            stewardship controls are ready.
          </p>
        </section>
      </main>

      <InstitutionalFooter />
    </div>
  );
}

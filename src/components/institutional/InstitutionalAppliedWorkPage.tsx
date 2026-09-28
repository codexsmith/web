import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AppliedWork.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  appliedWorkAudiences,
  appliedWorkBoundaries,
  appliedWorkFamilies,
  appliedWorkGoodFit,
  appliedWorkOutputs,
  appliedWorkProcess,
  systemsArchitectureReviewDemo,
} from "./content/appliedWork";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

type AppliedAudienceId = (typeof appliedWorkAudiences)[number]["id"];

const appliedFitProblemAnchors = [
  { x: 150, y: 150 },
  { x: 450, y: 150 },
  { x: 750, y: 150 },
  { x: 1050, y: 150 },
  { x: 300, y: 314 },
  { x: 650, y: 314 },
  { x: 1000, y: 314 },
] as const;

const appliedFitAudienceAnchors = [100, 300, 500, 700, 900, 1100] as const;

function buildAppliedFitRelationPath(
  problemIndex: number,
  audienceIndex: number,
  relationIndex: number,
  relationCount: number,
) {
  const source = appliedFitProblemAnchors[problemIndex];
  const targetX = appliedFitAudienceAnchors[audienceIndex];
  const targetY = 512;
  const sourceOffset = (relationIndex - (relationCount - 1) / 2) * 18;
  const sourceX = source.x + sourceOffset;
  const firstControlY = source.y + (source.y < 200 ? 132 : 72) + relationIndex * 8;
  const secondControlY = targetY - 92 - ((problemIndex + relationIndex) % 3) * 16;

  return `M ${sourceX} ${source.y} C ${sourceX} ${firstControlY}, ${targetX} ${secondControlY}, ${targetX} ${targetY}`;
}

function AppliedAudienceIcon({ kind }: { kind: AppliedAudienceId }) {
  const common = {
    viewBox: "0 0 28 28",
    role: "presentation" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "engineering":
      return (
        <svg {...common}>
          <path d="m9 7-5 7 5 7M19 7l5 7-5 7M16.5 5 11.5 23" />
        </svg>
      );
    case "founders":
      return (
        <svg {...common}>
          <circle cx="14" cy="9" r="3" />
          <circle cx="7.5" cy="11" r="2.3" />
          <circle cx="20.5" cy="11" r="2.3" />
          <path d="M8 22c.5-4.2 2.5-6.3 6-6.3s5.5 2.1 6 6.3M2.8 21c.4-3.3 2-5 4.7-5M25.2 21c-.4-3.3-2-5-4.7-5" />
        </svg>
      );
    case "research":
      return (
        <svg {...common}>
          <path d="M6 4.5h11l4 4v9" />
          <path d="M17 4.5v4h4M6 4.5v19h9" />
          <circle cx="18.5" cy="18.5" r="4" />
          <path d="m21.5 21.5 3 3" />
        </svg>
      );
    case "public-interest":
      return (
        <svg {...common}>
          <path d="m4 10 10-5 10 5M6 11h16M7.5 11v10M12 11v10M16 11v10M20.5 11v10M4 23h20" />
        </svg>
      );
    case "institutions":
      return (
        <svg {...common}>
          <rect x="11" y="4" width="6" height="5" rx="1" />
          <rect x="3" y="19" width="6" height="5" rx="1" />
          <rect x="11" y="19" width="6" height="5" rx="1" />
          <rect x="19" y="19" width="6" height="5" rx="1" />
          <path d="M14 9v5M6 19v-5h16v5M14 14v5" />
        </svg>
      );
    case "ai":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="18" height="14" rx="3" />
          <path d="M14 4v4M11 4h6M9 15h.01M19 15h.01M10 19h8" />
          <path d="M5 13H3M25 13h-2" />
        </svg>
      );
  }
}

export function InstitutionalAppliedWorkPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.appliedWorkPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.appliedWorkHero}
        eyebrow={<>CONSULTING / APPLIED WORK</>}
        title={<>Consulting for difficult systems.</>}
        lead={
          <>
            Systems / Architecture Review. Agency / AI Governance Audit. Knowledge /
            Representation Infrastructure Diagnostic.
          </>
        }
        support={
          <>
            Bring a system, workflow, decision, or failure that is expensive to misunderstand.
            We start with the buyer&apos;s problem, leave behind durable artifacts, and introduce
            deeper machinery only where the diagnosis justifies it.
          </>
        }
        childLinks={institutionalChildRoutes.appliedWork}
      >
        <aside className={styles.appliedWorkStatus}>
          <span>CONSULTING AVAILABILITY</span>
          <strong>Currently prioritizing bounded Systems / Architecture Reviews, with governance and knowledge-infrastructure diagnostics available where the problem calls for them.</strong>
          <p>
            The work draws on prior professional experience in software engineering,
            architecture, consulting, Lean–Agile delivery, startup iteration, and systems
            diagnosis. BFL-specific client case studies are still being built.
          </p>
          <Link
            className={styles.appliedWorkHeroCta}
            href="/contact?type=applied-work&source=applied-work-hero"
          >
            Start a consulting conversation <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.appliedFitSection}>
        <header className={styles.appliedFitHeader}>
          <h2>WHEN TO CALL</h2>
          <p>Good consulting starts with a problem you can already feel.</p>
        </header>

        <h3 className={styles.appliedFitSubhead}>Common problem patterns</h3>

        <div className={styles.appliedFitMap}>
          <svg
            className={styles.appliedFitRelations}
            viewBox="0 0 1200 606"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {appliedWorkGoodFit.flatMap((signal, problemIndex) =>
              signal.audiences.map((audienceId, relationIndex) => {
                const audienceIndex = appliedWorkAudiences.findIndex(
                  (audience) => audience.id === audienceId,
                );
                const audience = appliedWorkAudiences[audienceIndex];

                return (
                  <path
                    data-tone={audience.tone}
                    d={buildAppliedFitRelationPath(
                      problemIndex,
                      audienceIndex,
                      relationIndex,
                      signal.audiences.length,
                    )}
                    key={`${problemIndex}-${audienceId}`}
                  />
                );
              }),
            )}
          </svg>

          {appliedWorkGoodFit.map((signal, index) => (
            <article
              className={styles.appliedFitProblem}
              data-problem={index + 1}
              data-tone={signal.tone}
              key={signal.copy}
            >
              <span className={styles.appliedFitNumber}>{formatOrdinal(index)}</span>
              <p>{signal.copy}</p>

              <div className={styles.appliedFitPorts} aria-hidden="true">
                {signal.audiences.map((audienceId) => {
                  const audience = appliedWorkAudiences.find(
                    (candidate) => candidate.id === audienceId,
                  );

                  return audience ? (
                    <span data-tone={audience.tone} key={audience.id} />
                  ) : null;
                })}
              </div>

              <div className={styles.appliedFitRelationLabels}>
                {signal.audiences.map((audienceId) => {
                  const audience = appliedWorkAudiences.find(
                    (candidate) => candidate.id === audienceId,
                  );

                  return audience ? (
                    <span data-tone={audience.tone} key={audience.id}>
                      {audience.label}
                    </span>
                  ) : null;
                })}
              </div>
            </article>
          ))}

          <div className={styles.appliedAudienceNodes}>
            {appliedWorkAudiences.map((audience) => (
              <article
                className={styles.appliedAudienceNode}
                data-tone={audience.tone}
                key={audience.id}
              >
                <span className={styles.appliedAudiencePort} aria-hidden="true" />
                <span className={styles.appliedAudienceMark} aria-hidden="true">
                  <AppliedAudienceIcon kind={audience.id} />
                </span>
                <strong>{audience.label}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.appliedServicesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>SERVICES</>}
          title={<>Three offers. Nine bounded engagement shapes.</>}
          note={<>Choose the buyer problem first. The inner cards show concrete ways the work can begin.</>}
        />

        <div className={styles.appliedServiceStack}>
          {appliedWorkFamilies.map((family) => (
            <article
              className={styles.appliedServiceFamily}
              data-applied-tone={family.tone}
              key={family.code}
            >
              <header>
                <span>{family.code}</span>
                <div>
                  <h3>{family.title}</h3>
                  <p>{family.description}</p>
                </div>
              </header>

              <div className={styles.appliedOfferGrid}>
                {family.offers.map((offer) => (
                  <div key={offer.title}>
                    <strong>{offer.title}</strong>
                    <p>{offer.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedDemoSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>{systemsArchitectureReviewDemo.eyebrow}</>}
          title={<>See the first review shape before you buy one.</>}
          note={<>Synthetic example, not a customer case.</>}
        />

        <div className={styles.appliedDemoFrame}>
          <article className={styles.appliedDemoLead}>
            <span>01 / PROBLEM</span>
            <h3>{systemsArchitectureReviewDemo.title}</h3>
            <p>{systemsArchitectureReviewDemo.summary}</p>
            <blockquote>{systemsArchitectureReviewDemo.question}</blockquote>

            <div className={styles.appliedDemoStateCompare}>
              <div>
                <small>COARSE STATUS</small>
                {systemsArchitectureReviewDemo.coarseStates.map((state) => (
                  <strong key={state}>{state}</strong>
                ))}
              </div>
              <div>
                <small>RECONSTRUCTED LIFECYCLE</small>
                {systemsArchitectureReviewDemo.reconstructedStates.map((state) => (
                  <span key={state}>{state}</span>
                ))}
              </div>
            </div>
          </article>

          <div className={styles.appliedDemoAnalysis}>
            <div className={styles.appliedDemoDefects}>
              <span>02 / CONSEQUENTIAL DEFECTS</span>
              <div>
                {systemsArchitectureReviewDemo.defectClasses.map((defect) => (
                  <article key={defect.title}>
                    <strong>{defect.title}</strong>
                    <p>{defect.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.appliedDemoRepair}>
              <span>03 / REPAIR PATH</span>
              <ol>
                {systemsArchitectureReviewDemo.repairPath.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
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
          <Link
            className={styles.appliedDemoCta}
            href="/contact?type=applied-work&source=systems-architecture-demo"
          >
            Bring a system to review <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.appliedOutputsSection}>
        <div className={styles.appliedOutputsLead}>
          <p className={styles.sectionIndex}>WHAT YOU SHOULD GET</p>
          <h2>The work should leave behind artifacts, not just conversation.</h2>
          <p>
            The exact deliverables depend on the engagement, but the output should make the
            problem clearer, the decision easier, or the system more operable after BFL is gone.
          </p>
        </div>

        <div className={styles.appliedOutputGrid}>
          {appliedWorkOutputs.map((output, index) => (
            <article key={output.title}>
              <span>{formatOrdinal(index)}</span>
              <strong>{output.title}</strong>
              <p>{output.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW AN ENGAGEMENT STARTS</>}
          title={<>Start with the smallest piece of work that can change the next decision.</>}
          note={<>Pricing and duration belong after the problem and deliverable are bounded, not before.</>}
        />

        <div className={styles.appliedProcessRail}>
          {appliedWorkProcess.map(([title, description], index) => (
            <article key={title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedBoundariesSection}>
        <div className={styles.appliedBoundariesLead}>
          <p className={styles.sectionIndex}>CONSULTING PRINCIPLES</p>
          <h2>Useful consulting should reduce ambiguity without manufacturing certainty.</h2>
          <p>
            Boundary First Labs is most useful when the engagement can make state,
            responsibility, assumptions, evidence, and repair more explicit.
          </p>
        </div>

        <div className={styles.appliedBoundaryGrid}>
          {appliedWorkBoundaries.map((boundary) => (
            <article key={boundary.label}>
              <span>{boundary.label}</span>
              <p>{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedWorkClose}>
        <p className={styles.sectionIndex}>A GOOD FIRST ENGAGEMENT</p>
        <h2>Bring one system that is expensive to misunderstand.</h2>
        <p>
          A useful first step may be a review, workshop, diagnostic, prototype, or bounded
          pilot. If the work creates evidence and the next problem becomes clearer, the
          relationship can grow from there.
        </p>

        <nav className={styles.appliedWorkCloseLinks} aria-label="Applied work next steps">
          <Link href="/contact?type=applied-work&source=applied-work">Start a consulting conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/collaboration">Explore collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">See applied projects <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">See the funding model <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}

import {
  epistemicChainGaps,
  epistemicChainProjection,
  epistemicChainStats,
  epistemicClaims,
  epistemicEvidenceArtifacts,
} from "../content/epistemicChains";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Evidence.module.css";
import { composeCssModules } from "../styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const artifactByRef = new Map(
  epistemicEvidenceArtifacts.map((artifact) => [artifact.ref, artifact]),
);

function stateLabel(status: string) {
  return status.replaceAll("_", " ");
}

export function EpistemicChainSection() {
  return (
    <section className={styles.epistemicChainSection}>
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>INSPECTABLE EPISTEMIC CHAIN</>}
        title={<>Follow one publication from bounded claims to the artifacts it actually cites.</>}
        note={
          <>
            This is not an inferred graph. It is a direct projection of PUB-001&apos;s
            source-owned claim/evidence map. Missing cross-registry relations stay missing.
          </>
        }
      />

      <div className={styles.chainSourceBand}>
        <div>
          <span>PUBLICATION</span>
          <strong>{epistemicChainProjection.publicationId}</strong>
          <p>{epistemicChainProjection.publicationTitle}</p>
        </div>
        <div>
          <span>CLAIM / EVIDENCE MAP</span>
          <strong>{epistemicChainProjection.claimEvidenceMap.artifactId}</strong>
          <a
            href={epistemicChainProjection.claimEvidenceMap.href}
            target="_blank"
            rel="noreferrer"
          >
            Inspect pinned source <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        <div>
          <span>PINNED LAB REVISION</span>
          <strong>{epistemicChainProjection.sourceRevision.slice(0, 12)}</strong>
          <p>{epistemicChainProjection.sourceRevisionDate}</p>
        </div>
      </div>

      <div className={styles.chainAuthority}>
        <span>AUTHORITY CEILING</span>
        <p>{epistemicChainProjection.authority}</p>
      </div>

      <div className={styles.chainStats} aria-label="Epistemic chain counts">
        <div>
          <span>CLAIMS</span>
          <strong>{epistemicChainStats.claims}</strong>
        </div>
        <div>
          <span>WITH ARTIFACT LINKS</span>
          <strong>{epistemicChainStats.supportedClaims}</strong>
        </div>
        <div>
          <span>EVIDENCE ARTIFACTS</span>
          <strong>{epistemicChainStats.evidenceArtifacts}</strong>
        </div>
        <div>
          <span>DECLARED EDGES</span>
          <strong>{epistemicChainStats.declaredClaimArtifactEdges}</strong>
        </div>
      </div>

      <div className={styles.chainLifecycle}>
        <div className={styles.chainLifecycleLead}>
          <span>PUBLICATION CONTROL</span>
          <h3>{epistemicChainProjection.lifecycle.researchQuestion}</h3>
          <p>{epistemicChainProjection.lifecycle.claimCeiling}</p>
        </div>
        <div>
          <span>CLAIM-MAP STATE</span>
          <strong>{epistemicChainProjection.claimEvidenceMap.publicationState}</strong>
          <small>
            Independent review:{" "}
            {epistemicChainProjection.claimEvidenceMap.independentReviewCompleted
              ? "complete"
              : "not complete"}
          </small>
        </div>
        <div>
          <span>LIFECYCLE STATE</span>
          <strong>{epistemicChainProjection.lifecycle.currentState}</strong>
          <small>Source discrepancy intentionally retained.</small>
        </div>
      </div>

      <div className={styles.chainFlowHeader} aria-hidden="true">
        <span>PUBLICATION</span>
        <i>-&gt;</i>
        <span>CLAIM</span>
        <i>-&gt;</i>
        <span>EVIDENCE ARTIFACT</span>
      </div>

      <div className={styles.chainClaimStack}>
        {epistemicClaims.map((claim) => (
          <article className={styles.chainClaimCard} key={claim.id}>
            <div className={styles.chainClaimIdentity}>
              <span>{claim.id}</span>
              <strong>{stateLabel(claim.status)}</strong>
            </div>
            <h3>{claim.claim}</h3>

            {claim.artifacts.length ? (
              <div className={styles.chainArtifactLinks}>
                {claim.artifacts.map((ref) => {
                  const artifact = artifactByRef.get(ref);
                  return artifact ? (
                    <a
                      href={artifact.sourceHref}
                      key={ref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>EVIDENCE ARTIFACT</span>
                      <code>{ref}</code>
                    </a>
                  ) : null;
                })}
              </div>
            ) : (
              <div className={styles.chainNoArtifact}>
                <span>NO ARTIFACT EDGE DECLARED</span>
                <p>
                  This is preserved as a negative/unsupported claim-state record rather than
                  being silently attached to neighboring evidence.
                </p>
              </div>
            )}

            {claim.sources.length ? (
              <div className={styles.chainLiteratureRefs}>
                <span>LITERATURE SOURCE IDS</span>
                <p>{claim.sources.join(" · ")}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className={styles.chainGapSection}>
        <div>
          <span>CHAIN COVERAGE</span>
          <h3>The gaps are part of the epistemic record.</h3>
          <p>
            The target institutional shape is broader than this one publication-local map.
            We only draw an edge when an owning source declares it.
          </p>
        </div>
        <div className={styles.chainGapGrid}>
          {epistemicChainGaps.map((gap) => (
            <article key={gap.id}>
              <span>{gap.label}</span>
              <strong>{gap.state}</strong>
              <p>{gap.note}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.chainGateGrid}>
        <article>
          <span>REQUIRED EVIDENCE</span>
          <ul>
            {epistemicChainProjection.lifecycle.requiredEvidence.map((item) => (
              <li key={item}>{stateLabel(item)}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>OPEN PUBLICATION GATES</span>
          <ul>
            {epistemicChainProjection.lifecycle.openGates.map((item) => (
              <li key={item}>{stateLabel(item)}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>EXPLICIT NONCLAIMS</span>
          <ul>
            {epistemicChainProjection.lifecycle.nonclaims.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

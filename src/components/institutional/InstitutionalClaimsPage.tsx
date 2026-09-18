import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { LabObjectIdentity } from "./LabObjectIdentity";
import { claimProjection, claimRecords } from "./content/claims";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Claims.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

function validationLabel(value: boolean | null) {
  if (value === true) return "REQUIRED";
  if (value === false) return "NOT REQUIRED";
  return "NOT DECLARED";
}

function noveltyLabel(value: boolean | null) {
  if (value === true) return "CLAIMED";
  if (value === false) return "NOT CLAIMED";
  return "NOT DECLARED";
}

export function InstitutionalClaimsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.claimsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.claimsHero}
        eyebrow={<>CLAIMS</>}
        title={<>What is the Lab actually asserting?</>}
        lead={
          <>
            Claims are not prose emphasis. They are bounded research objects with identity,
            status, validation posture, provenance, and an authority ceiling.
          </>
        }
        support={
          <>
            This first public cohort is intentionally narrow: the owner-local Information
            Mechanics Claim Ledger already has durable IM-C* identities and is admitted by
            the Lab Registry Registrar. No Lab-global claim namespace is inferred.
          </>
        }
        childLinks={institutionalChildRoutes.claims}
      >
        <div className={styles.sourcePanel}>
          <span>SOURCE-BOUND CLAIM SNAPSHOT</span>
          <strong>{claimRecords.length} owner-local IM-C* claims</strong>
          <p>
            Ledger: {claimProjection.ledgerStatus} · Registrar: {claimProjection.registrarStatus}
          </p>
          <dl>
            <div>
              <dt>OWNER</dt>
              <dd>{claimProjection.authorityOwner}</dd>
            </div>
            <div>
              <dt>LAB REVISION</dt>
              <dd>{claimProjection.sourceRevision.slice(0, 12)}</dd>
            </div>
          </dl>
          <a href={claimProjection.sourceHref} target="_blank" rel="noreferrer">
            Inspect canonical claim ledger <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>AUTHORITY CEILING</span>
        <strong>{claimProjection.authority}</strong>
        <p>
          Registrar admission says this claim ledger exists and identifies its owner. It does
          not make any row true, proved, novel, publication-ready, or authoritative outside
          Information Mechanics.
        </p>
      </section>

      <section className={styles.claimCatalog}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>INFORMATION MECHANICS CLAIM LEDGER</>}
          title={<>Status stays native. Missing fields stay missing.</>}
          note={
            <>
              Validation and novelty are rendered independently from claim status. Evidence
              notes remain support annotations unless a durable Evidence object is explicitly
              identified.
            </>
          }
        />

        <div className={styles.claimStack}>
          {claimRecords.map((claim) => (
            <article
              className={styles.claimCard}
              id={"claim-" + claim.id.toLowerCase()}
              key={claim.id}
            >
              <LabObjectIdentity
                kind="claim"
                identifier={claim.id}
                identifierLabel="CLAIM"
                status={claim.status}
                statusLabel="STATUS"
                secondary={claimProjection.ownerResearch.title}
                secondaryLabel="OWNER PROGRAM"
              />

              <div className={styles.claimStatement}>
                <span>CLAIM STATEMENT</span>
                <h2>{claim.claim}</h2>
              </div>

              <div className={styles.claimStateGrid}>
                <div data-state={claim.requiresValidation === true ? "open" : "neutral"}>
                  <span>VALIDATION</span>
                  <strong>{validationLabel(claim.requiresValidation)}</strong>
                </div>
                <div>
                  <span>NOVELTY CLAIM</span>
                  <strong>{noveltyLabel(claim.noveltyClaim)}</strong>
                </div>
                <div>
                  <span>OWNER RESEARCH</span>
                  <strong>{claimProjection.ownerResearch.code}</strong>
                  <p>{claimProjection.ownerResearch.title}</p>
                </div>
              </div>

              <div className={styles.claimEvidenceGrid}>
                <div>
                  <span>EVIDENCE / SUPPORT NOTES</span>
                  {claim.evidence.length ? (
                    <ul>
                      {claim.evidence.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : (
                    <p>No evidence annotation is declared on this ledger row.</p>
                  )}
                </div>
                <div>
                  <span>SOURCE LOCATOR</span>
                  {claim.source ? (
                    <code>{claim.source}</code>
                  ) : (
                    <p>No source locator is declared on this ledger row.</p>
                  )}
                </div>
              </div>

              <div className={styles.claimFirewall}>
                <span>DO NOT INFER</span>
                <p>
                  Claim registration and status are research-control state. They are not truth,
                  theorem proof, novelty, publication promotion, or cross-domain authority.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.claimClose}>
        <span>CURRENT PUBLIC BOUNDARY</span>
        <h2>One owner-local ledger is better than a fictional universal claim database.</h2>
        <p>
          Other Lab packages contain claim ledgers, theorem registers, and evidence surfaces.
          They should join this public graph only when their identity, authority, and
          relationships are explicit enough to project without flattening local semantics.
        </p>
      </section>
    </InstitutionalPageShell>
  );
}

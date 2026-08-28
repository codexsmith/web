"use client";

import styles from "./FamilyDomainAtlas.module.css";
import { labCorpusAuthority, type AtlasCorpusFamily } from "./lab-corpus-atlas";

type FamilyDomainAtlasProps = {
  family: AtlasCorpusFamily;
  activeDomainId?: string;
  onSelectDomain: (domainId: string) => void;
  onEnterMountedDomain: (layerId: string) => void;
  onReturnMeta: () => void;
};

export function FamilyDomainAtlas({
  family,
  activeDomainId,
  onSelectDomain,
  onEnterMountedDomain,
  onReturnMeta,
}: FamilyDomainAtlasProps) {
  const activeDomain = family.domains.find((domain) => domain.id === activeDomainId) ?? family.domains[0];

  return (
    <section className={styles.root} aria-label={`${family.label} domain atlas`}>
      <header className={styles.header}>
        <div>
          <span className={styles.overline}>DOMAIN ATLAS / {family.code}</span>
          <h3>{family.label}</h3>
          <p>Canonical child domains from the Boundary First Library. Board availability is shown separately from corpus membership.</p>
        </div>
        <button type="button" onClick={onReturnMeta}>← RETURN TO META</button>
      </header>

      <div className={styles.instrument}>
        <aside className={styles.familyPlate}>
          <span>FAMILY REGISTRY</span>
          <strong>{family.code}</strong>
          <p>{family.sourcePath}</p>
          <small>{family.domains.length} canonical child objects</small>
        </aside>

        <div className={styles.domainField}>
          <div className={styles.bus} aria-hidden="true"><i /></div>
          {family.domains.map((domain, index) => {
            const active = domain.id === activeDomain?.id;
            return (
              <button
                type="button"
                key={domain.id}
                className={`${styles.domainCard} ${active ? styles.domainCardActive : ""}`}
                onClick={() => onSelectDomain(domain.id)}
              >
                <span className={styles.sequence}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.domainCode}>{domain.code}</span>
                <strong>{domain.label}</strong>
                <small>{domain.kind.toUpperCase()}</small>
                <p>{domain.sourcePath}</p>
                <span className={`${styles.mountState} ${domain.mountedLayerId ? styles.mountReady : styles.mountPending}`}>
                  {domain.mountedLayerId ? "BOARD MOUNTED" : "CORPUS MAPPED / BOARD NOT YET MOUNTED"}
                </span>
              </button>
            );
          })}
        </div>

        <aside className={styles.inspector}>
          <span>SELECTED DOMAIN</span>
          <strong>{activeDomain?.label ?? "—"}</strong>
          <small>{activeDomain?.code ?? "NO DOMAIN"}</small>
          <p>{activeDomain ? `${family.sourcePath}/${activeDomain.sourcePath}` : ""}</p>
          {activeDomain?.mountedLayerId ? (
            <button type="button" onClick={() => onEnterMountedDomain(activeDomain.mountedLayerId!)}>
              ENTER MOUNTED BOARD →
            </button>
          ) : (
            <div className={styles.unmountedNotice}>
              <b>VISIBLE, NOT FABRICATED</b>
              <span>This corpus domain exists in the canonical atlas but does not yet have a dedicated interactive board.</span>
            </div>
          )}
        </aside>
      </div>

      <footer className={styles.footer}>
        <span>{labCorpusAuthority.repository}</span>
        <strong>CORPUS MEMBERSHIP ≠ UI IMPLEMENTATION</strong>
        <span>FINGERPRINT {labCorpusAuthority.corpusFingerprint.slice(0, 12)}</span>
      </footer>
    </section>
  );
}

"use client";

import styles from "./FamilyDomainAtlas.module.css";
import { labCorpusAuthority, type AtlasCorpusDomain, type AtlasCorpusFamily } from "./lab-corpus-atlas";

type FamilyDomainAtlasProps = {
  family: AtlasCorpusFamily;
  activeDomainId?: string;
  generatedDomainIds?: string[];
  onSelectDomain: (domainId: string) => void;
  onEnterMountedDomain: (layerId: string) => void;
  onFabricateDomain: (family: AtlasCorpusFamily, domain: AtlasCorpusDomain) => void;
  onReturnMeta: () => void;
};

export function FamilyDomainAtlas({
  family,
  activeDomainId,
  generatedDomainIds = [],
  onSelectDomain,
  onEnterMountedDomain,
  onFabricateDomain,
  onReturnMeta,
}: FamilyDomainAtlasProps) {
  const activeDomain = family.domains.find((domain) => domain.id === activeDomainId) ?? family.domains[0];
  const generated = Boolean(activeDomain && generatedDomainIds.includes(activeDomain.id));

  return (
    <section className={styles.root} aria-label={`${family.label} domain atlas`}>
      <header className={styles.header}>
        <div>
          <span className={styles.overline}>DOMAIN ATLAS / {family.code}</span>
          <h3>{family.label}</h3>
          <p>Canonical child domains from the Boundary First Library. Corpus membership, calibrated boards, and generated shells are represented separately.</p>
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
            const generatedShell = generatedDomainIds.includes(domain.id);
            const state = domain.mountedLayerId
              ? "CALIBRATED BOARD MOUNTED"
              : generatedShell
                ? "GENERATED / UNCALIBRATED BOARD"
                : "CORPUS MAPPED / BOARD NOT YET FABRICATED";

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
                <span className={`${styles.mountState} ${domain.mountedLayerId ? styles.mountReady : generatedShell ? styles.mountGenerated : styles.mountPending}`}>
                  {state}
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
              ENTER CALIBRATED BOARD →
            </button>
          ) : generated && activeDomain ? (
            <>
              <div className={styles.generatedNotice}>
                <b>GENERATED / UNCALIBRATED</b>
                <span>The board shell has corpus identity and provenance, but no inferred correspondence ports or domain-local semantics.</span>
              </div>
              <button type="button" onClick={() => onFabricateDomain(family, activeDomain)}>
                ENTER GENERATED BOARD →
              </button>
            </>
          ) : activeDomain ? (
            <div className={styles.unmountedNotice}>
              <b>CORPUS MAPPED / NOT FABRICATED</b>
              <span>Fabricate a provisional hardware shell from corpus metadata. No semantic wiring will be inferred.</span>
              <button type="button" onClick={() => onFabricateDomain(family, activeDomain)}>
                FABRICATE PROVISIONAL BOARD →
              </button>
            </div>
          ) : null}
        </aside>
      </div>

      <footer className={styles.footer}>
        <span>{labCorpusAuthority.repository}</span>
        <strong>CORPUS MEMBERSHIP ≠ CALIBRATION ≠ UI FABRICATION</strong>
        <span>FINGERPRINT {labCorpusAuthority.corpusFingerprint.slice(0, 12)}</span>
      </footer>
    </section>
  );
}

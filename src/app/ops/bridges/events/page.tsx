import type { Metadata } from "next";
import Link from "next/link";
import { hasBridgeOpsSession } from "@/lib/bridge-ops-auth";
import {
  getBridgeOpsConfiguration,
  loadBridgeOpsManifest,
} from "@/lib/bridge-ops-store";
import { logoutBridgeOpsAction } from "../actions";
import styles from "../bridge-ops.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bridge Event Ledger",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function compactDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("en-US", { timeZone: "America/New_York" });
}

export default async function BridgeEventsPage() {
  const configuration = getBridgeOpsConfiguration();
  const authenticated = configuration.configured && (await hasBridgeOpsSession());

  if (!configuration.configured || !authenticated) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
              <h1 className={styles.title}>Bridge event ledger</h1>
              <p className={styles.subhead}>
                Operator authentication is required before provenance records can be inspected.
              </p>
            </div>
          </header>
          <div className={styles.error}>Open and authenticate the Bridge control surface first.</div>
          <div className={styles.actions}>
            <Link className={styles.button} href="/ops/bridges">Return to control surface</Link>
          </div>
        </div>
      </main>
    );
  }

  let snapshot;
  try {
    snapshot = await loadBridgeOpsManifest();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load Bridge event ledger";
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
              <h1 className={styles.title}>Bridge event ledger</h1>
            </div>
          </header>
          <div className={styles.error}>{message}</div>
          <div className={styles.actions}>
            <Link className={styles.button} href="/ops/bridges">Return to control surface</Link>
          </div>
        </div>
      </main>
    );
  }

  const events = [...snapshot.events].reverse().slice(0, 100);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
            <h1 className={styles.title}>Bridge event ledger</h1>
            <p className={styles.subhead}>
              Append-only provenance from {snapshot.repository}@{snapshot.branch}. Each event is committed atomically with the manifest transition it records.
            </p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.button} href="/ops/bridges">Control surface</Link>
            <form action={logoutBridgeOpsAction}>
              <button className={styles.button} type="submit">Lock</button>
            </form>
          </div>
        </header>

        <section className={styles.summary} aria-label="Bridge event ledger summary">
          <div className={styles.stat}>
            <span className={styles.statValue}>{snapshot.events.length}</span>
            <span className={styles.statLabel}>Recorded events</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{snapshot.parentCommit.slice(0, 8)}</span>
            <span className={styles.statLabel}>Current head</span>
          </div>
        </section>

        {events.length === 0 ? (
          <section className={styles.locked}>
            The ledger is initialized and empty. The next successful Bridge operation will create the first event.
          </section>
        ) : (
          <section className={styles.grid}>
            {events.map((event) => (
              <article className={styles.card} key={event.eventId}>
                <header className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>{event.bridgeId}</h2>
                    <div className={styles.slug}>{event.operation} · {compactDate(event.occurredAt)}</div>
                  </div>
                  <div className={styles.badges}>
                    <span className={styles.badge}>{event.from.lifecycle} → {event.to.lifecycle}</span>
                    <span className={styles.badge}>{event.actor}</span>
                  </div>
                </header>

                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <div>Visibility: <strong>{event.from.visibility} → {event.to.visibility}</strong></div>
                    <div>Relationship: <strong>{event.from.relationshipStatus ?? "—"} → {event.to.relationshipStatus ?? "—"}</strong></div>
                    <div>Owner: <strong>{event.evidence.owner ?? "—"}</strong></div>
                    <div>Last contact: <strong>{event.evidence.lastContactAt ? compactDate(event.evidence.lastContactAt) : "—"}</strong></div>
                    <div>Next action: <strong>{event.evidence.nextAction ?? "—"}</strong></div>
                    <div>Closure reason: <strong>{event.evidence.closureReason ?? "—"}</strong></div>
                    <div>Event ID: <strong>{event.eventId}</strong></div>
                    <div>Parent commit: <strong>{event.parentCommit.slice(0, 12)}</strong></div>
                    <div>Commit binding: <strong>{event.commit}</strong></div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        <p className={styles.footerNote}>
          commit=self means the event is bound to the Git commit that contains the ledger line. The exact resulting SHA is obtained from repository history; storing it inside the same event would create a self-referential hash dependency.
        </p>
      </div>
    </main>
  );
}

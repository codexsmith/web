import type { Metadata } from "next";
import { hasBridgeOpsSession } from "@/lib/bridge-ops-auth";
import {
  getBridgeOpsConfiguration,
  loadBridgeOpsManifest,
} from "@/lib/bridge-ops-store";
import { deriveBridgeQueueItem } from "@/lib/bridge-work-queue";
import type { BridgeLifecycleStage } from "@/lib/bridge-governance";
import {
  loginBridgeOpsAction,
  logoutBridgeOpsAction,
  mutateBridgeAction,
} from "./actions";
import styles from "./bridge-ops.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bridge Operations",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type SearchParams = Promise<{
  notice?: string;
  error?: string;
}>;

const lifecycleActions: Record<
  BridgeLifecycleStage,
  Array<{ value: string; label: string; danger?: boolean }>
> = {
  draft: [
    { value: "ready", label: "Mark ready" },
    { value: "decline", label: "Close / decline", danger: true },
  ],
  ready: [
    { value: "sent", label: "Mark sent" },
    { value: "decline", label: "Close / decline", danger: true },
  ],
  sent: [
    { value: "response", label: "Record response" },
    { value: "contact", label: "Record contact" },
    { value: "decline", label: "Close / decline", danger: true },
  ],
  discussion: [
    { value: "contact", label: "Record contact" },
    { value: "scope", label: "Scope collaboration" },
    { value: "decline", label: "Close / decline", danger: true },
  ],
  scoped: [
    { value: "activate", label: "Activate" },
    { value: "decline", label: "Close / decline", danger: true },
  ],
  active: [{ value: "archive", label: "Archive", danger: true }],
  declined: [{ value: "reopen", label: "Reopen as draft" }],
  historical: [],
};

function compactDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US", { timeZone: "America/New_York" });
}

export default async function BridgeOpsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const configuration = getBridgeOpsConfiguration();
  const authenticated = configuration.configured && (await hasBridgeOpsSession());

  if (!configuration.configured) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
              <h1 className={styles.title}>Bridge control surface</h1>
              <p className={styles.subhead}>
                This route fails closed until its server-only operator credentials are configured.
              </p>
            </div>
          </header>
          <section className={styles.locked}>
            Missing environment variables: {configuration.missing.join(", ")}. Repository target is {configuration.repository} on {configuration.branch}.
          </section>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
              <h1 className={styles.title}>Bridge control surface</h1>
              <p className={styles.subhead}>
                Governed operator access. This route is excluded from public discovery and requires a server-configured password.
              </p>
            </div>
          </header>
          {params.error ? <div className={styles.error}>{params.error}</div> : null}
          <form action={loginBridgeOpsAction} className={styles.login}>
            <div className={styles.field}>
              <label htmlFor="password">Operator password</label>
              <input className={styles.input} id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            <div className={styles.actions}>
              <button className={styles.button} type="submit">Open control surface</button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  let snapshot;
  try {
    snapshot = await loadBridgeOpsManifest();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load Bridge manifest";
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
              <h1 className={styles.title}>Bridge control surface</h1>
            </div>
            <form action={logoutBridgeOpsAction}><button className={styles.button} type="submit">Lock</button></form>
          </header>
          <div className={styles.error}>{message}</div>
        </div>
      </main>
    );
  }

  const bridgeEntries = snapshot.manifest.pages.filter((entry) => entry.collection === "bridge");
  const queueItems = bridgeEntries.map((entry) => deriveBridgeQueueItem(entry));
  const staleCount = queueItems.filter((item) => item.stale).length;
  const activeCount = queueItems.filter((item) => item.lifecycle === "active").length;
  const awaitingCount = queueItems.filter((item) => item.queue === "awaiting-response").length;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Boundary First Labs · Internal operations</p>
            <h1 className={styles.title}>Bridge control surface</h1>
            <p className={styles.subhead}>
              Live projection of {snapshot.repository}@{snapshot.branch}. Every transition re-fetches the current manifest and commits against its exact GitHub blob SHA.
            </p>
          </div>
          <form action={logoutBridgeOpsAction}>
            <button className={styles.button} type="submit">Lock</button>
          </form>
        </header>

        {params.notice ? <div className={styles.notice}>{params.notice}</div> : null}
        {params.error ? <div className={styles.error}>{params.error}</div> : null}

        <section className={styles.summary} aria-label="Bridge queue summary">
          <div className={styles.stat}><span className={styles.statValue}>{queueItems.length}</span><span className={styles.statLabel}>Governed bridges</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{awaitingCount}</span><span className={styles.statLabel}>Awaiting response</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{activeCount}</span><span className={styles.statLabel}>Active work</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{staleCount}</span><span className={styles.statLabel}>Stale / overdue</span></div>
        </section>

        <section className={styles.grid}>
          {bridgeEntries.map((entry) => {
            const queue = deriveBridgeQueueItem(entry);
            const operations = entry.bridgeOperations;
            const actions = lifecycleActions[queue.lifecycle];
            const visibilityAction =
              (queue.lifecycle === "active" || queue.lifecycle === "historical")
                ? entry.visibility === "public"
                  ? { value: "unpublish", label: "Return to unlisted" }
                  : { value: "publish", label: "Publish" }
                : null;

            return (
              <article key={entry.id} className={`${styles.card} ${queue.stale ? styles.stale : ""}`}>
                <header className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>{entry.id}</h2>
                    <div className={styles.slug}>/{entry.slug}</div>
                  </div>
                  <div className={styles.badges}>
                    <span className={styles.badge}>{queue.lifecycle}</span>
                    <span className={styles.badge}>{queue.queue}</span>
                    <span className={styles.badge}>{entry.visibility}</span>
                    {queue.stale ? <span className={styles.badge}>stale</span> : null}
                  </div>
                </header>

                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <div>Relationship: <strong>{entry.relationshipStatus ?? "—"}</strong></div>
                    <div>Owner: <strong>{operations?.owner ?? "—"}</strong></div>
                    <div>Changed: <strong>{compactDate(operations?.lifecycleChangedAt)}</strong></div>
                    <div>Last contact: <strong>{compactDate(operations?.lastContactAt)}</strong></div>
                    <div>Next action: <strong>{operations?.nextAction ?? "—"}</strong></div>
                    <div>Due: <strong>{compactDate(operations?.nextActionAt)}</strong></div>
                  </div>
                  {queue.staleReason ? <div className={styles.error}>{queue.staleReason}</div> : null}

                  <form action={mutateBridgeAction}>
                    <input type="hidden" name="id" value={entry.id} />
                    <div className={styles.formGrid}>
                      <div className={styles.compactField}>
                        <label htmlFor={`${entry.id}-owner`}>Owner</label>
                        <input className={styles.input} id={`${entry.id}-owner`} name="owner" defaultValue={operations?.owner ?? ""} placeholder="Required when scoped" />
                      </div>
                      <div className={styles.compactField}>
                        <label htmlFor={`${entry.id}-next-at`}>Next action at</label>
                        <input className={styles.input} id={`${entry.id}-next-at`} name="nextActionAt" defaultValue={operations?.nextActionAt ?? ""} placeholder="ISO date-time with offset" />
                      </div>
                      <div className={`${styles.compactField} ${styles.wide}`}>
                        <label htmlFor={`${entry.id}-next`}>Next action</label>
                        <input className={styles.input} id={`${entry.id}-next`} name="nextAction" defaultValue={operations?.nextAction ?? ""} placeholder="Concrete next action" />
                      </div>
                      <div className={`${styles.compactField} ${styles.wide}`}>
                        <label htmlFor={`${entry.id}-reason`}>Closure reason</label>
                        <input className={styles.input} id={`${entry.id}-reason`} name="reason" placeholder="Required for decline/archive" />
                      </div>
                    </div>
                    <div className={styles.actions}>
                      {actions.map((action) => (
                        <button
                          className={`${styles.actionButton} ${action.danger ? styles.danger : ""}`}
                          key={action.value}
                          name="operation"
                          type="submit"
                          value={action.value}
                        >
                          {action.label}
                        </button>
                      ))}
                      {visibilityAction ? (
                        <button className={styles.actionButton} name="operation" type="submit" value={visibilityAction.value}>
                          {visibilityAction.label}
                        </button>
                      ) : null}
                    </div>
                  </form>
                </div>
              </article>
            );
          })}
        </section>

        <p className={styles.footerNote}>
          The operator surface does not mutate the deployment filesystem. It commits the canonical manifest to GitHub, preserving repository history as the operational audit trail; the normal deployment pipeline then reconciles the public runtime.
        </p>
      </div>
    </main>
  );
}

import {
  getBridgeLifecycle,
  type BridgeLifecycleStage,
} from "@/lib/bridge-governance";
import {
  productLandingManifest,
  type ProductLandingEntry,
} from "@/lib/product-landing-routing";

export type BridgeQueueKind =
  | "drafting"
  | "ready-to-send"
  | "awaiting-response"
  | "follow-up"
  | "scoped-handoff"
  | "active-work"
  | "closed";

export type BridgeQueueItem = {
  id: string;
  slug: string;
  lifecycle: BridgeLifecycleStage;
  queue: BridgeQueueKind;
  owner?: string;
  nextAction?: string;
  nextActionAt?: string;
  stale: boolean;
  staleReason?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const staleAfterDays: Partial<Record<BridgeLifecycleStage, number>> = {
  ready: 14,
  sent: 14,
  discussion: 10,
  scoped: 14,
  active: 30,
};

const bridgeEntries = productLandingManifest.pages.filter(
  (entry) => entry.collection === "bridge",
);

function queueForLifecycle(lifecycle: BridgeLifecycleStage): BridgeQueueKind {
  switch (lifecycle) {
    case "draft":
      return "drafting";
    case "ready":
      return "ready-to-send";
    case "sent":
      return "awaiting-response";
    case "discussion":
      return "follow-up";
    case "scoped":
      return "scoped-handoff";
    case "active":
      return "active-work";
    case "declined":
    case "historical":
      return "closed";
  }
}

function activityTimestamp(item: {
  lifecycle: BridgeLifecycleStage;
  lifecycleChangedAt?: string;
  lastContactAt?: string;
}): string | undefined {
  if (item.lifecycle === "sent" || item.lifecycle === "discussion") {
    return item.lastContactAt ?? item.lifecycleChangedAt;
  }
  return item.lifecycleChangedAt ?? item.lastContactAt;
}

export function deriveBridgeQueueItem(
  entry: ProductLandingEntry,
  now = new Date(),
): BridgeQueueItem {
  if (entry.collection !== "bridge") {
    throw new Error(`Landing ${entry.id} is not a bridge record`);
  }

  const lifecycle = getBridgeLifecycle(entry.status);
  if (!lifecycle) {
    throw new Error(`Bridge ${entry.id} has unsupported lifecycle ${entry.status}`);
  }

  const operations = entry.bridgeOperations;
  const thresholdDays = staleAfterDays[lifecycle];
  const timestamp = activityTimestamp({
    lifecycle,
    lifecycleChangedAt: operations?.lifecycleChangedAt,
    lastContactAt: operations?.lastContactAt,
  });

  let stale = false;
  let staleReason: string | undefined;

  if (thresholdDays && timestamp) {
    const ageMs = now.getTime() - Date.parse(timestamp);
    stale = ageMs > thresholdDays * DAY_MS;
    if (stale) {
      staleReason = `${lifecycle} bridge has had no recorded lifecycle/contact activity for more than ${thresholdDays} days`;
    }
  }

  if (operations?.nextActionAt && Date.parse(operations.nextActionAt) < now.getTime()) {
    stale = true;
    staleReason = "next action is overdue";
  }

  return {
    id: entry.id,
    slug: entry.slug,
    lifecycle,
    queue: queueForLifecycle(lifecycle),
    owner: operations?.owner,
    nextAction: operations?.nextAction,
    nextActionAt: operations?.nextActionAt,
    stale,
    staleReason,
  };
}

export function getBridgeWorkQueue(now = new Date()): BridgeQueueItem[] {
  return bridgeEntries.map((entry) => deriveBridgeQueueItem(entry, now));
}

export function getBridgeQueue(
  queue: BridgeQueueKind,
  now = new Date(),
): BridgeQueueItem[] {
  return getBridgeWorkQueue(now).filter((item) => item.queue === queue);
}

export function getStaleBridgeQueue(now = new Date()): BridgeQueueItem[] {
  return getBridgeWorkQueue(now).filter((item) => item.stale);
}

export function getBridgeQueueSummary(now = new Date()) {
  const items = getBridgeWorkQueue(now);
  const counts = Object.fromEntries(
    ([
      "drafting",
      "ready-to-send",
      "awaiting-response",
      "follow-up",
      "scoped-handoff",
      "active-work",
      "closed",
    ] as BridgeQueueKind[]).map((queue) => [
      queue,
      items.filter((item) => item.queue === queue).length,
    ]),
  ) as Record<BridgeQueueKind, number>;

  return {
    total: items.length,
    stale: items.filter((item) => item.stale).length,
    counts,
  };
}

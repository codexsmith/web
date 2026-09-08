# Task: Pick Up, Harden, and Polish the Bridge Governance + Operations System Locally

**Status:** handoff / local implementation + hardening  
**Date:** 2026-08-28  
**Baseline branch:** `main`  
**Baseline commit:** `003732bdac821ed51456f15a2707cc5a86444c2f`  
**Primary surfaces:** `/about/bridges`, `/bridge/*`, `/ops/bridges`, `/ops/bridges/events`

## Goal

Pick up the Bridge system that was developed directly in the web repository, run it through the full local browser/toolchain/security loop, refine the operator experience, add missing contracts and tests, and return it through a normal reviewable branch/PR.

This is not a request to redesign Bridges from scratch.

A substantial first implementation already exists. The local task is to make that implementation **boring, coherent, testable, secure enough for its intended use, and merge-quality**.

The core architectural idea to preserve is:

> **Canonical Lab object -> governed Bridge interface -> lifecycle transition -> operational queue -> provenance event -> Git commit**

with three intentionally independent governance dimensions:

```text
Lifecycle            Visibility          Relationship status
---------            ----------          -------------------
draft                private             exploratory-no-affiliation
ready                unlisted            target-class-no-affiliation
sent                 public              scoped-collaboration
discussion                               active-collaboration
scoped                                   historical-collaboration
active                                   historical-project-no-current-affiliation
declined                                 declined-no-current-affiliation
historical
```

Do not collapse these dimensions during cleanup.

---

## What exists now

### 1. Public Bridge ontology and World projection

`src/lib/bridge-system.ts`

The public site now has a generic `/about/bridges` institutional node with public Bridge classes:

- Collaborator Probes
- Research Validation
- Operational Pilots
- Historical Standing

Individual named Bridge targets remain governed by the landing-page manifest and are not automatically exposed through the public World graph.

Canonical source objects may carry generic typed graph relations such as:

```text
Schemathematics
  -- has research validation interface -->
Research Validation
```

without disclosing which unlisted recipient-specific brief produced that relation.

The public graph relation type is:

```text
interfaces-with
```

and source/class pairs are deduplicated so the graph does not leak recipient multiplicity.

### 2. Governed Bridge landing pages

`src/content/product-landing-pages/manifest.json`  
`src/lib/product-landing-routing.ts`  
`src/components/product-landing/ProductLandingRenderer.tsx`

The existing `/bridge/*` recipient/institution/target-class pages remain manifest-backed direct-link surfaces.

Routing policy distinguishes:

```text
public + public-candidate
unlisted + unlisted-only
private + hold
```

and Bridge governance imposes stronger relationship/lifecycle rules before public visibility is permitted.

### 3. Lifecycle state machine

`src/lib/bridge-governance.ts`

Current lifecycle:

```text
draft
  -> ready
  -> sent
  -> discussion
  -> scoped
  -> active
  -> historical
```

with decline exits from pre-active states and:

```text
declined -> draft
```

as an explicit reopen path.

Important invariant:

> **Lifecycle is not visibility, and lifecycle is not relationship authority.**

For example:

- `sent` does not imply public;
- `discussion` does not imply affiliation;
- `active` requires `active-collaboration` but may remain unlisted;
- public visibility requires its own explicit promotion operation.

### 4. Operational metadata contract

Bridge records may carry:

```ts
bridgeOperations: {
  owner?: string;
  lifecycleChangedAt?: string;
  lastContactAt?: string;
  nextAction?: string;
  nextActionAt?: string;
  closureReason?: string;
}
```

The validator increasingly requires these fields as the lifecycle becomes operationally meaningful.

Examples:

- every non-draft state requires `lifecycleChangedAt`;
- `sent` / `discussion` require contact evidence;
- `scoped` / `active` require an owner;
- `declined` / `historical` require a closure reason;
- closed states cannot retain a next action.

### 5. Derived work queue

`src/lib/bridge-work-queue.ts`

The queue is a projection, not a source of truth.

Current buckets:

```text
drafting
ready-to-send
awaiting-response
follow-up
scoped-handoff
active-work
closed
```

Staleness is separate from queue state.

Current default stale thresholds are approximately:

- ready: 14 days
- sent: 14 days
- discussion: 10 days
- scoped: 14 days
- active: 30 days

An overdue `nextActionAt` also marks an item stale.

### 6. Transactional transition constructors

`src/lib/bridge-transitions.ts`

Lifecycle changes are intended to be made through transition helpers rather than raw manifest edits.

Current operations include:

```text
markBridgeReady
markBridgeSent
recordBridgeResponse
recordBridgeContact
scopeBridge
activateBridge
declineBridge
archiveBridge
reopenBridge
publishBridge
unpublishBridge
```

Each helper constructs a complete next state and re-runs governance validation.

Visibility operations remain separate from relationship/lifecycle operations on purpose.

### 7. Internal operator surface

`src/app/ops/bridges/page.tsx`  
`src/app/ops/bridges/actions.ts`  
`src/app/ops/bridges/bridge-ops.module.css`  
`src/lib/bridge-ops-auth.ts`  
`src/lib/bridge-ops-store.ts`

A first internal control surface exists at:

```text
/ops/bridges
```

It is:

- absent from the public World graph;
- marked noindex/nofollow;
- environment-gated;
- authenticated through a server-configured password and HttpOnly signed cookie;
- backed by server-side GitHub access;
- designed to fail closed if required configuration is absent.

The page renders the live GitHub manifest rather than trusting the deployed bundle.

The operator can see lifecycle, queue, visibility, relationship status, owner, timestamps, next action, and stale state, then invoke only operations that make sense for the current lifecycle.

### 8. GitHub-backed persistence

The deployment filesystem is intentionally **not** treated as persistence.

Operator writes target GitHub directly.

The current store uses the Git Data API to:

1. read the current branch head;
2. read the current manifest and event ledger;
3. build the new manifest and event ledger;
4. create blobs;
5. create one tree;
6. create one commit;
7. advance the branch ref only if the operation still descends from the head that was read.

This is intended to prevent two operator actions from silently overwriting each other.

### 9. Append-only event ledger

`src/lib/bridge-event-ledger.ts`  
`src/content/bridge-ops/events.jsonl`

Each successful operator mutation is intended to append one JSON Lines event in the **same Git commit** as the manifest transition.

Current event shape includes:

```text
schemaVersion
eventId
bridgeId
operation
occurredAt
actor
source
commit = "self"
parentCommit
from
to
evidence
```

`commit: "self"` is deliberate. A Git commit cannot contain its own final SHA without creating a self-referential hash problem. `parentCommit` plus repository history identifies the containing commit unambiguously.

The ledger is currently empty because no provenance was fabricated for the pre-ledger implementation history.

### 10. Event inspection surface

A first authenticated event viewer exists at:

```text
/ops/bridges/events
```

It renders recent events newest-first with before/after state and operational evidence.

---

## Environment contract

`.env.example` now documents the operator configuration:

```text
BFL_BRIDGE_OPS_PASSWORD=
BFL_BRIDGE_GITHUB_TOKEN=
BFL_BRIDGE_GITHUB_REPOSITORY=codexsmith/web
BFL_BRIDGE_GITHUB_BRANCH=main
BFL_BRIDGE_OPS_ACTOR=local-operator
```

Real values must remain server-only.

For local development, **do not point the first mutation tests at `main`**. Create a disposable branch and set:

```text
BFL_BRIDGE_GITHUB_BRANCH=<test branch>
```

until the transaction and event semantics have been verified end-to-end.

---

## Local pickup sequence

Start from current `main` and create a dedicated hardening branch:

```bash
git checkout main
git pull
git checkout -b bridge-ops-hardening
npm install
```

Read repository `AGENTS.md` before making framework-level changes.

Then run the baseline before editing:

```bash
npm run lint
npm run typecheck
npm run build
npm run contracts:check
```

If that baseline is not clean, record the failures before changing code so Bridge-specific defects are distinguishable from unrelated repository state.

### Safe functional-test setup

Create a remote disposable branch for GitHub-backed mutation testing.

Configure a local `.env.local` with:

```text
BFL_BRIDGE_OPS_PASSWORD=<local test password>
BFL_BRIDGE_GITHUB_TOKEN=<fine-grained token>
BFL_BRIDGE_GITHUB_REPOSITORY=codexsmith/web
BFL_BRIDGE_GITHUB_BRANCH=<disposable remote branch>
BFL_BRIDGE_OPS_ACTOR=<your local operator label>
```

Use the narrowest GitHub token permissions that still permit the required contents/Git Data write path.

Never commit the real token or password.

Run:

```bash
npm run dev
```

and inspect:

```text
http://localhost:3000/ops/bridges
http://localhost:3000/ops/bridges/events
```

---

## Required hardening pass

### A. Prove every legal transition in the browser

Exercise at least one Bridge through a complete disposable lifecycle:

```text
draft
-> ready
-> sent
-> discussion
-> scoped
-> active
-> historical
```

Also test:

```text
draft -> declined -> draft
```

and:

```text
active -> publish -> unpublish
```

Verify after every operation that:

- the manifest record is valid;
- exactly one event was appended;
- manifest and ledger changed in the same commit;
- the operator UI reflects the new GitHub state without relying on deployment completion;
- invalid actions fail without changing either file.

### B. Test optimistic concurrency deliberately

Open two operator sessions or otherwise simulate two mutations based on the same branch head.

Expected behavior:

> One may succeed; the stale operation must fail cleanly rather than overwrite the first commit.

Verify the branch-ref update behavior against the actual GitHub API rather than assuming `force: false` alone provides every desired race guarantee.

If necessary, strengthen the transaction boundary.

### C. Add contract tests for governance

The current implementation has executable validators but needs a systematic local/CI test matrix.

At minimum cover:

- every legal lifecycle edge;
- every illegal lifecycle edge;
- visibility/routing tuples;
- lifecycle/relationship tuples;
- required operational metadata by lifecycle;
- closure behavior;
- publish/unpublish constraints;
- `reopen` resetting operational state correctly;
- source/class Bridge graph deduplication;
- unlisted target names never leaking into public graph navigation.

Prefer table-driven tests where possible.

### D. Add ledger validation, not just JSON parsing

`parseBridgeEventLedger()` currently establishes syntactic JSON-lines parsing but should be hardened into actual schema validation.

Check:

- supported `schemaVersion`;
- supported operation;
- valid timestamp;
- valid before/after governance states;
- stable `bridgeId`;
- unique `eventId`;
- non-empty actor;
- expected source;
- parent-commit shape;
- evidence/state consistency.

Malformed ledger content should fail closed with a useful operator error.

### E. Define and enforce append-only semantics

JSONL is append-only **by convention**, but Git can rewrite the file.

Add a contract or transaction check proving that an operator mutation transforms the ledger only as:

```text
newLedger = oldLedger + exactlyOneValidEvent
```

No earlier event may be modified, removed, reordered, or silently regenerated by the operator path.

Consider a CI contract that compares ledger prefix continuity between commits/PRs.

### F. Resolve the ledger genesis / reconstruction boundary

The ledger was introduced after the Bridge manifest already existed, so the event stream currently has no genesis events for the ten existing records.

Decide explicitly between approaches such as:

1. **Baseline event** — add a non-transition `baseline`/`observed` event type that records initial governed state.
2. **Ledger epoch** — declare a repository commit as epoch zero and reconstruct only changes after that point.
3. **Synthetic import events** — generate clearly labeled migration events, never pretending they were historical operator activity.

Do not silently invent past transition history.

The chosen model should make historical reconstruction mathematically unambiguous.

### G. Add manifest/ledger coherence checking

Once genesis semantics are defined, add a reducer that can replay events for a Bridge and recover its latest governed state.

Then assert:

```text
replay(ledger, bridgeId).latestState == manifest[bridgeId].governedState
```

This is the strongest payoff of the ledger design: current mutable state becomes independently checkable against executable history.

### H. Security review the operator boundary

The current surface is a first internal implementation, not a finished security product.

Review at minimum:

- brute-force exposure of the password form;
- session-cookie lifetime and rotation;
- CSRF / Server Action origin behavior;
- whether production should additionally require Vercel protection, VPN, access proxy, IP allowlisting, or another external identity boundary;
- whether the operator password should remain the long-term authentication mechanism;
- minimum GitHub token permissions;
- secret leakage through errors/logging;
- whether GitHub API failure details should be sanitized before display;
- rate limiting for authentication and mutations;
- auditability of actor identity if more than one operator is ever supported.

A useful posture is:

> **No amount of `noindex` makes an operator route private. Authentication and network/access boundaries do.**

Do not expose the production operator route merely because it is absent from public navigation.

### I. Operator UX refinement

The first control panel is intentionally functional rather than polished.

Refine it into the Boundary First apparatus family while preserving information density and operational clarity.

Priorities:

- queue-first grouping rather than one long undifferentiated card list;
- obvious stale/overdue state;
- stronger visual distinction between lifecycle transition, contact update, closure, and visibility operations;
- confirmation for destructive/relationship-significant actions;
- clear pending state during Server Action submission;
- success state that exposes resulting commit identity;
- direct path from `/ops/bridges` to `/ops/bridges/events` and back;
- event filtering by Bridge and operation;
- mobile behavior sufficient for emergency inspection, even if primary operation remains desktop-first;
- keyboard and focus behavior;
- clear locked/configuration-error states.

Do not make the operator UI look like the public Bridge pages. It is machinery, not outreach collateral.

### J. Better failure semantics

Explicitly test and refine messages for:

- invalid transition;
- stale branch head / concurrency collision;
- expired/invalid session;
- missing environment variables;
- GitHub authentication failure;
- GitHub permission failure;
- malformed manifest;
- malformed ledger;
- unavailable GitHub API;
- invalid operator input;
- no-op transition attempt.

Operator failures should preserve both manifest and ledger unchanged.

---

## Public/private boundary checks

This system crosses an important representational boundary.

The public site may truthfully expose:

```text
"Schemathematics has a research-validation interface."
```

without exposing:

```text
"A particular institution/person has received or discussed this proposal."
```

Preserve these invariants during local cleanup:

- recipient-specific unlisted Bridges do not automatically become public World nodes;
- public graph edges point to generic Bridge classes, not hidden targets;
- public source/class edges do not reveal how many hidden recipients exist behind them;
- operational timestamps, owners, next actions, event history, and outreach status remain outside public discovery;
- lifecycle advancement does not automatically change visibility;
- active relationship state does not automatically imply endorsement;
- historical work never silently implies a current relationship.

Add automated leakage checks if practical.

---

## Likely useful extraction/refactor opportunities

Only after the behavior is proven locally, consider whether these deserve clearer boundaries:

- `bridge-governance.ts` — pure legality/invariants;
- `bridge-transitions.ts` — pure state constructors;
- `bridge-work-queue.ts` — pure operational projection;
- `bridge-event-ledger.ts` — event schema/reducer/validation;
- `bridge-ops-store.ts` — GitHub persistence adapter;
- `bridge-ops-auth.ts` — operator authentication boundary;
- `/ops/bridges/*` — UI and Server Actions.

The current separation is directionally correct. Refactor only where local tests reveal coupling or unclear responsibility.

---

## Analytics are a follow-on, not the first hardening task

Once event replay and coherence checks are trustworthy, the ledger can support derived metrics such as:

- time in lifecycle stage;
- time from sent to response;
- stale duration;
- conversion by Bridge class;
- decline/closure rates;
- scope-to-active conversion;
- active-to-historical duration;
- public-promotion frequency;
- operator activity;
- reconstruction of system state at any event boundary.

Do not build dashboards over unvalidated event history first.

The order should be:

```text
valid events
-> append-only guarantee
-> replay
-> manifest coherence
-> metrics
-> visualization / automation
```

---

## Agent-safe automation boundary

This machinery was intentionally shaped so an agent could eventually act on stale queues or next actions without receiving unrestricted mutation authority.

Do **not** add autonomous mutation in this local pass.

First prove that a human operator transition is:

- explicit;
- bounded;
- validated;
- attributable;
- atomic with provenance;
- reversible where doctrine permits;
- reconstructable afterward.

Future agents should invoke the same transition boundary rather than editing the manifest directly.

---

## Local acceptance criteria

This work item is ready to merge when all of the following are true:

- `npm run lint` passes;
- `npm run typecheck` passes;
- `npm run build` passes;
- `npm run contracts:check` passes;
- preferably `npm run verify` passes;
- `/about/bridges` and existing `/bridge/*` routing remain intact;
- `/ops/bridges` fails closed without configuration;
- authenticated operator flow works locally against a disposable remote branch;
- every legal lifecycle transition has an automated test;
- representative illegal transitions have automated tests;
- a successful operation changes manifest + ledger in one Git commit;
- stale concurrent mutation cannot overwrite a newer operation;
- event ledger parsing performs schema validation;
- append-only semantics are enforced, not merely documented;
- ledger genesis semantics are explicit;
- event replay can be compared against current manifest state, or a clearly scoped follow-up is recorded if replay is intentionally deferred;
- no private Bridge target or operator metadata leaks into public discovery surfaces;
- authentication/security assumptions are documented and appropriate for the actual deployment boundary;
- operator UI has been inspected in a real browser and refined enough to be safely usable;
- a normal branch + PR captures the local hardening changes for review.

---

## Suggested PR shape

Keep the hardening PR legible.

A good decomposition is:

1. tests/contracts + ledger validation/replay;
2. persistence/concurrency fixes discovered by the tests;
3. security-boundary changes;
4. operator UX polish;
5. documentation/environment updates.

If the diff becomes large, split operator visual polish from governance/persistence correctness rather than mixing aesthetic changes into the critical state-machine review.

---

## Handoff summary

A working Bridge architecture now exists across public ontology, governed direct-link outreach surfaces, lifecycle state, operational queueing, controlled transitions, an internal operator panel, GitHub-backed persistence, and an append-only event-ledger design.

The next local job is **not to add more conceptual machinery**.

It is to make the current machinery earn trust:

> render it, exercise it, race it, break it, validate its event history, prove its public/private boundary, tighten its security assumptions, polish the operator surface, and merge the hardened result through an ordinary reviewable PR.

# 20 — Bridge Governance + Operations Hardening Progress

**Parent work item:** `backlog/20_bridge_governance_ops_local_pickup.md`  
**Checkpoint date:** 2026-09-06  
**Status:** correctness + provenance + core security are CI-gated; browser mutation, real concurrency, and operator UX remain local  
**Work stream:** Bridge governance / operations

## Purpose

This checkpoint records what has actually been implemented since the original item-20 handoff so the remaining local pass does not repeat completed work or treat unverified browser/GitHub behavior as proven.

The architectural invariant remains:

```text
canonical Bridge record
-> governance validator
-> legal transition
-> operational queue
-> append-only provenance event
-> Git commit
-> replay/coherence check
```

Lifecycle, visibility, and relationship status remain independently governed dimensions.

---

## Implemented and CI-gated

### C. Governance + transition behavior + public/private leakage contracts

The Bridge contract layer now has both static/structural checks and executable behavior checks.

```text
scripts/check_bridge_transition_behavior.mjs
scripts/check_bridge_governance_contracts.mjs
```

The executable behavior harness transpiles the real `bridge-governance.ts` and `bridge-transitions.ts` source with the repository's installed TypeScript compiler, then exercises the actual transition functions with Node assertions.

It proves, at code level:

```text
draft -> ready -> sent -> discussion -> scoped -> active -> historical
```

plus:

```text
draft -> declined -> draft
active -> publish -> unpublish
historical -> publish
```

and representative invalid operations including:

- draft -> sent;
- draft -> scoped;
- draft -> active;
- active -> declined;
- historical -> draft;
- publish before active/historical;
- publish when already public;
- unpublish when not public;
- contact outside sent/discussion;
- incomplete next-action metadata;
- empty scoped owner.

The behavior contract also proves two key non-equivalences:

- activation does **not** publish;
- contact updates do **not** advance lifecycle.

The independent governance checker additionally protects:

- exact lifecycle transition topology;
- lifecycle/relationship tuples;
- visibility/routing tuples;
- lifecycle-dependent operational metadata;
- closure requirements;
- publish/unpublish guards;
- reopen reset behavior;
- generic Bridge-class graph projection;
- source/class edge deduplication;
- absence of recipient-specific ids/slugs as public edge targets or labels;
- public discoverability remaining an explicit `public + public-candidate` state.

Still required locally:

- perform the same transitions through the real operator UI against a disposable remote branch;
- inspect rendered public navigation in a browser.

### D. Ledger schema validation

`src/lib/bridge-event-ledger.ts` now validates event structure and meaning rather than merely parsing JSON Lines.

Validated properties include:

- schema version;
- unique event id;
- Bridge id;
- supported operation;
- ISO timestamp;
- non-empty actor;
- expected source;
- `commit: "self"` convention;
- parent Git SHA shape;
- governance-valid `from` and `to` states;
- operational metadata validity;
- evidence consistency with resulting state;
- operation-specific transition semantics.

Malformed or semantically invalid event history fails closed.

### E. Append-only ledger semantics

The operator transaction requires:

```text
newLedger = oldLedger + exactlyOneValidEvent
```

Runtime enforcement includes:

- old ledger must be an exact prefix of new ledger;
- exactly one event must be added;
- duplicate event ids are rejected;
- the complete resulting ledger must parse and validate before Git blobs are created.

Independent checker:

```text
scripts/check_bridge_ledger_contracts.mjs
```

validates the repository's current ledger/replay/coherence state.

A repository-history/PR-prefix checker could add a further historical gate later, but the operator mutation path itself is append-only by construction.

### F. Ledger genesis boundary

Chosen model:

> **Explicit ledger epoch, not fabricated historical transition events.**

Canonical genesis file:

```text
src/content/bridge-ops/epoch.json
```

The epoch snapshots the governed state of the ten pre-ledger Bridge records.

Semantics:

- epoch is genesis state, not an operator event;
- no pre-ledger outreach activity is invented;
- `commit: "self"` avoids self-referential Git hashing;
- `parentCommit` anchors the epoch to repository state immediately before creation;
- `manifestVersion` is historical metadata, not a lock on future manifest versions.

Future Bridges do not mutate the epoch. A special `register` event exists for post-epoch Bridge creation, and the ordinary operator mutation form explicitly excludes `register`.

### G. Replay + manifest coherence

The ledger can reconstruct current governed state from:

```text
epoch + ordered events
```

Replay rejects:

- events before the epoch;
- duplicate event ids;
- unknown Bridge references;
- discontinuous `from` states;
- duplicate registration;
- invalid transition semantics.

Required invariant:

```text
replay(epoch, ledger) == current Bridge governed state in manifest
```

`src/lib/bridge-ops-store.ts` enforces this:

1. when the operator surface loads;
2. against candidate manifest + appended event before any write blobs are created.

A malformed or incoherent history therefore blocks operation rather than becoming a later audit observation.

### H. Core operator security boundary

Implemented and protected by:

```text
scripts/check_bridge_ops_security_contracts.mjs
```

Current application-level protections:

- HMAC-signed session cookie;
- timing-safe password/signature comparison;
- signed issued-at timestamp;
- server-side 12-hour expiry;
- future-issued session rejection;
- `HttpOnly`;
- `SameSite=Strict`;
- `Secure` in production;
- cookie path `/ops/bridges`;
- high cookie priority;
- path-correct logout by expiring the same cookie tuple;
- locked/unconfigured surface does not reveal env names, repository, or branch;
- raw GitHub error bodies are never reflected into operator UI;
- GitHub failures use sanitized status-class messages;
- stale-head guard before transaction construction;
- non-forced Git ref update;
- mutation Server Action requires an authenticated operator session;
- ordinary mutation surface cannot emit `register`;
- `/ops/bridges` and `/ops/bridges/events` remain `noindex`, `nofollow`, `nocache`.

Still open / intentionally not faked with process-local serverless state:

- durable brute-force/rate-limit boundary;
- outer production access decision (Vercel protection, identity-aware proxy, VPN, IP boundary, or equivalent);
- multi-operator identity model;
- live Server Action CSRF/origin verification;
- minimum-permission GitHub token verification against a disposable branch.

Security posture:

> `noindex` is not privacy. The application password is one boundary; intentional production exposure should have an appropriate outer access boundary too.

### J. Failure semantics

Improved:

- stale head has a specific refresh/retry error;
- GitHub auth, permission, missing-resource, validation, rate-limit, and upstream availability errors are categorized without exposing arbitrary upstream payloads;
- invalid transitions fail before writes;
- malformed manifest/epoch/ledger/coherence state fails closed;
- publish/unpublish no-op requests fail explicitly.

The full browser error matrix remains local work.

---

## Bridge-specific CI gate

A dedicated script now exists:

```text
npm run bridge:contracts
```

which runs:

```text
check_bridge_transition_behavior.mjs
check_bridge_governance_contracts.mjs
check_bridge_ledger_contracts.mjs
check_bridge_ops_security_contracts.mjs
```

The production build now begins with:

```text
npm run bridge:contracts && next build
```

so Vercel executes the Bridge contracts on every non-ignored application build.

### Verified Vercel run

Commit:

```text
4c92ba0100ff43821407ecf3680360cf085f0474
```

Vercel build output reported:

```text
Bridge transition behavior contracts passed.
Bridge governance contracts passed: 10 governed Bridges, 0 public.
Bridge ledger contracts passed: 10 Bridges, 0 events.
Bridge ops security contracts passed.
```

Then:

```text
Next.js compiled successfully
TypeScript finished successfully
101/101 static pages generated
/ops/bridges          dynamic server route
/ops/bridges/events   dynamic server route
Build Completed
Deployment completed
```

This is the first checkpoint where the Bridge contract stack is not only present in the repository but demonstrably executed by the deployment pipeline.

### Unrelated global contract drift discovered and kept outside item 20

An earlier attempt to gate `next build` on the repository-wide `contracts:check` exposed pre-existing v2 contract drift in `scripts/check_v2_contracts.mjs`: it still references the retired optional catch-all route

```text
src/app/[[...slug]]/page.tsx
```

while the current application uses:

```text
src/app/[...slug]/page.tsx
src/app/page.tsx
```

and the older root/hero assumptions have also changed.

That is real repository debt, but it is **not a Bridge governance concern**. Item 20 therefore uses the dedicated `bridge:contracts` build gate rather than silently absorbing a broader v2 contract-rewrite work stream.

The global `contracts:check` remains available to surface that debt during the larger local verification pass.

---

## Vercel schema feedback already incorporated

The first build after making `BridgeEventRecord.from` nullable failed because the event viewer assumed every event had a prior state.

That failure was correct: post-epoch `register` uses:

```text
from = null
```

The viewer was repaired to render registration as:

```text
∅ -> draft
```

rather than weakening the event model. The corrected viewer subsequently built cleanly.

---

## Remaining high-value local work

### A. Real operator lifecycle exercise — OPEN

Use a disposable remote branch, never initial mutation testing on `main`.

Exercise through the browser:

```text
draft
-> ready
-> sent
-> discussion
-> scoped
-> active
-> historical
```

Also:

```text
draft -> declined -> draft
active -> publish -> unpublish
```

For every action prove:

- manifest validity;
- exactly one appended event;
- manifest + ledger land in one commit;
- event `from` equals prior replay state;
- event `to` equals resulting manifest state;
- operator reflects committed GitHub state;
- invalid operations change neither control file.

The transition functions themselves now have executable CI coverage; this remaining item is specifically the **browser + Server Action + GitHub transaction** path.

### B. Deliberate real GitHub concurrency race — OPEN

Use two stale snapshots against the same disposable branch.

Required result:

> at most one stale-head mutation may advance the branch; the other must fail without overwriting the first event/state transition.

Static inspection and unit-like behavior contracts do not substitute for this real API race.

### H. Production outer access boundary — OPEN

Before intentionally exposing `/ops/bridges` as an operational production surface, choose and document an outer access boundary.

Candidates:

- Vercel Deployment Protection / team authentication;
- identity-aware access proxy;
- VPN/private network boundary;
- restrictive IP allowlist where operationally appropriate.

Do not simulate durable distributed rate limiting with a process-local serverless counter.

### I. Operator UX refinement — OPEN

Still needed locally:

- queue-first grouping;
- stronger stale/overdue treatment;
- visual distinction between transition, contact, closure, and visibility operations;
- confirmation for destructive/relationship-significant actions;
- pending/submission state;
- success state with resulting commit identity;
- obvious control-surface <-> event-ledger navigation;
- event filtering by Bridge and operation;
- keyboard/focus review;
- useful mobile inspection behavior;
- real-browser review of locked, configured, error, empty-ledger, and populated-ledger states.

It should remain machinery, not public outreach collateral.

---

## Updated completion map

| Original item | State | Notes |
|---|---|---|
| A. Browser lifecycle proof | OPEN | Transition functions pass CI; browser/Server Action/GitHub path still needs disposable branch |
| B. Optimistic concurrency race | OPEN | Must exercise real GitHub ref behavior |
| C. Governance contracts | IMPLEMENTED + CI-GATED | Includes executable transition behavior and public leakage contracts |
| D. Ledger schema validation | IMPLEMENTED + CI-GATED | Runtime + independent checker |
| E. Append-only semantics | IMPLEMENTED FOR OPERATOR PATH + CI-GATED | Prefix + exactly-one-event enforced before write |
| F. Genesis boundary | IMPLEMENTED | Explicit immutable epoch model |
| G. Replay/coherence | IMPLEMENTED + CI-GATED | Fail-closed load + candidate pre-write check |
| H. Security review | PARTIAL / HARDENED + CI-GATED | App boundary protected; outer access/rate-limit/multi-operator questions remain |
| I. Operator UX | OPEN | Local visual/interaction pass |
| J. Failure semantics | PARTIAL / HARDENED | Core categories implemented; browser error matrix remains |
| Public/private leakage | IMPLEMENTED + CI-GATED | Generic class projection + no recipient edge target leakage |
| Analytics | DEFERRED CORRECTLY | Wait for real event history and completed local hardening |
| Agent mutation | DEFERRED CORRECTLY | Human operator boundary must be proven first |

---

## Resume point

Do **not** add more lifecycle or provenance abstractions next.

The next trustworthy move is local execution:

```text
latest main
-> disposable remote branch
-> npm run bridge:contracts
-> npm run typecheck
-> authenticated browser exercise
-> full lifecycle
-> deliberate stale-head race
-> inspect Git commits + ledger replay
-> UX/failure polish discovered by use
-> production access-boundary decision
-> normal PR
```

The machinery is now substantially constrained and continuously checked. The remaining question is operational: whether the real browser + Server Action + GitHub + deployment chain behaves exactly as the model requires under success, invalid input, and concurrency.

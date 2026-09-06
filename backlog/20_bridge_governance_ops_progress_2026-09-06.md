# 20 — Bridge Governance + Operations Hardening Progress

**Parent work item:** `backlog/20_bridge_governance_ops_local_pickup.md`  
**Checkpoint date:** 2026-09-06  
**Status:** correctness + provenance + security hardening substantially implemented; destructive/browser/concurrency verification remains local  
**Work stream:** Bridge governance / operations

## Purpose of this checkpoint

This file records what has actually been implemented since the original item-20 handoff so the remaining local pass does not repeat completed work or accidentally treat unverified behavior as proven.

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

Lifecycle, visibility, and relationship status remain independent governed dimensions.

---

## Implemented since the original handoff

### C. Governance + public/private leakage contracts — substantially implemented

New contract checker:

```text
scripts/check_bridge_governance_contracts.mjs
```

It independently checks:

- the lifecycle transition map;
- lifecycle/relationship tuples;
- visibility/routing tuples;
- lifecycle-dependent operational metadata;
- closed-state requirements;
- publish/unpublish guards;
- reopen reset behavior;
- generic Bridge-class graph projection;
- source/class edge deduplication;
- the absence of recipient-specific Bridge ids/slugs as public edge targets or labels;
- public discoverability remaining an explicit `public + public-candidate` state.

The checker is part of `npm run contracts:check`.

Still required locally:

- exercise representative illegal transitions against the actual operator UI;
- verify public navigation and rendered pages in a browser, not only by static contract.

### D. Ledger schema validation — implemented

`src/lib/bridge-event-ledger.ts` now performs runtime validation rather than JSON parsing alone.

Validated event properties include:

- schema version;
- unique event id;
- Bridge id;
- supported operation;
- ISO timestamp;
- non-empty actor;
- expected source;
- `commit: "self"` binding convention;
- parent Git SHA shape;
- governance-valid `from` and `to` states;
- operational metadata validity;
- evidence consistency with the resulting state;
- operation-specific transition semantics.

Malformed or semantically invalid event history fails closed.

### E. Append-only ledger semantics — implemented in the operator transaction path

The operator path now requires:

```text
newLedger = oldLedger + exactlyOneValidEvent
```

Runtime checks enforce:

- old ledger is an exact prefix of new ledger;
- exactly one new event is added;
- duplicate event ids are rejected;
- the full resulting ledger parses and validates before any Git blobs are created.

Independent CI checker:

```text
scripts/check_bridge_ledger_contracts.mjs
```

also validates the current repository ledger and coherence state.

A future PR-to-PR historical prefix checker could add another repository-history layer, but the mutation path itself is now append-only by construction.

### F. Ledger genesis boundary — resolved with an explicit epoch

Chosen model:

> **Ledger epoch, not fabricated historical transition events.**

New canonical file:

```text
src/content/bridge-ops/epoch.json
```

The epoch snapshots the governed state of the ten existing Bridge records when event-history enforcement began.

Important semantics:

- the epoch is genesis state, not an operator event;
- no pre-ledger outreach history is invented;
- `commit: "self"` avoids self-referential Git hashing;
- `parentCommit` anchors the epoch to the repository state immediately before its creation;
- `manifestVersion` is historical metadata, not a permanent lock on future manifest versions.

Future Bridges do **not** mutate the epoch. The ledger schema now supports a special `register` event for post-epoch Bridge creation.

The ordinary operator mutation form explicitly excludes `register`; a future creation workflow must use a separately governed registration path.

### G. Ledger replay + manifest coherence — implemented and fail-closed

New replay machinery can reconstruct the current governed state from:

```text
epoch + ordered events
```

It rejects:

- events before the epoch;
- duplicate event ids;
- unknown Bridge references;
- discontinuous `from` states;
- duplicate registration;
- invalid transition semantics.

The resulting state map is compared against the current manifest.

Required invariant:

```text
replay(epoch, ledger) == current Bridge governed state in manifest
```

`src/lib/bridge-ops-store.ts` enforces this in two places:

1. when the operator surface loads;
2. against the candidate manifest + appended event before write blobs are created.

Therefore a malformed or incoherent history blocks operation rather than becoming a later audit observation.

### H. Operator security boundary — partially hardened and now contract-protected

Implemented:

- HMAC-signed session cookie;
- timing-safe password/signature comparison;
- explicit issued-at timestamp inside the signed session envelope;
- server-side 12-hour expiry validation;
- rejection of future-issued session values;
- `HttpOnly`;
- `SameSite=Strict`;
- `Secure` in production;
- path scoped to `/ops/bridges`;
- high cookie priority;
- path-correct logout by expiring the same cookie tuple;
- locked/unconfigured UI no longer reveals missing environment-variable names, repository target, or branch target;
- raw GitHub error response bodies are no longer reflected into operator UI errors;
- GitHub failures use sanitized status-class messages;
- stale-head check remains explicit before transaction construction;
- branch ref update remains non-forced;
- ordinary mutation Server Action is session-gated;
- ordinary operator mutations cannot emit the special `register` event;
- `/ops/bridges` and `/ops/bridges/events` remain `noindex`, `nofollow`, and `nocache`.

New contract checker:

```text
scripts/check_bridge_ops_security_contracts.mjs
```

It is part of `npm run contracts:check`.

Still open / deliberately not faked with process-local machinery:

- brute-force/rate-limit protection suitable for a distributed Vercel deployment;
- external access boundary decision (Vercel Deployment Protection, access proxy, VPN, IP allowlist, or equivalent);
- long-term replacement of the single shared operator password if multiple operators are introduced;
- stronger actor identity binding if multiple human operators are supported;
- live CSRF/origin behavior verification against the deployed Server Action surface;
- minimum-permission GitHub token verification against a disposable branch.

Security posture to preserve:

> `noindex` is not privacy. The application password is one boundary; production exposure should have an appropriate external access boundary as well.

### J. Failure semantics — partially improved

Implemented:

- stale head has a specific refresh/retry error;
- GitHub authentication, permission, missing-resource, validation, rate-limit, and upstream-availability failures are categorized without exposing arbitrary upstream payloads;
- invalid transition and invalid manifest/ledger errors fail before write;
- publish/unpublish no-op requests are rejected explicitly;
- malformed ledger/epoch/coherence state blocks the operator surface.

Still requires browser/disposable-branch verification for the full error matrix.

---

## Vercel build feedback already incorporated

The first build after making `BridgeEventRecord.from` nullable failed because the event viewer assumed every event had a prior state.

That failure was valid: the new post-epoch `register` event has:

```text
from = null
```

The viewer was corrected to render registration as:

```text
∅ -> draft
```

and the corrected event-viewer commit was confirmed green on Vercel.

This is evidence that the schema change propagated through the rendering boundary rather than being weakened to preserve old assumptions.

At this checkpoint, the newest security-contract build may still be in flight; do not infer green status from this document. Check the latest commit status before merge-quality signoff.

---

## Remaining high-value local work

### A. Full lifecycle exercise — OPEN

Use a disposable remote branch, never initial mutation testing on `main`.

Exercise:

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
- operator reflects the committed GitHub state;
- invalid operations do not change either control file.

### B. Deliberate concurrency race — OPEN

Use two stale snapshots against the same disposable branch.

Required result:

> at most one stale-head mutation may advance the branch; the other must fail without overwriting the first event/state transition.

Do not consider static `force: false` inspection sufficient. Exercise the real GitHub behavior.

### I. Operator UX refinement — OPEN

Still needed locally:

- queue-first grouping;
- clearer stale/overdue treatment;
- clearer operation classes (transition / contact / closure / visibility);
- confirmation for destructive or relationship-significant operations;
- pending/submission state;
- success state with resulting commit identity;
- obvious navigation between control surface and event ledger;
- event filtering by Bridge / operation;
- keyboard/focus review;
- useful mobile inspection behavior;
- real-browser review of locked, configured, error, empty-ledger, and populated-ledger states.

Do not turn this into a public marketing aesthetic. It is machinery.

### H. Production access boundary decision — OPEN

Before intentionally exposing `/ops/bridges` in production, choose and document the outer access boundary.

Candidates include:

- Vercel Deployment Protection / team authentication;
- identity-aware access proxy;
- VPN/private network boundary;
- restrictive IP allowlist where operationally appropriate.

The correct choice depends on how and where the operator surface is intended to be used. Do not simulate durable distributed rate limiting with an in-memory serverless counter.

---

## Current contract surface

`npm run contracts:check` now includes:

```text
check_bridge_governance_contracts.mjs
check_bridge_ledger_contracts.mjs
check_bridge_ops_security_contracts.mjs
```

Together these protect:

```text
governance legality
+ public/private projection firewall
+ ledger schema
+ epoch/replay/coherence
+ append-only mutation semantics
+ core operator security invariants
```

They complement rather than replace the required browser and real-GitHub race tests.

---

## Updated completion map

| Original item | State | Notes |
|---|---|---|
| A. Browser lifecycle proof | OPEN | Requires disposable remote branch + real browser |
| B. Optimistic concurrency race | OPEN | Must exercise real GitHub ref behavior |
| C. Governance contracts | SUBSTANTIALLY IMPLEMENTED | Independent CI contract + leakage checks; browser confirmation remains |
| D. Ledger schema validation | IMPLEMENTED | Runtime + CI validation |
| E. Append-only semantics | IMPLEMENTED FOR OPERATOR PATH | Prefix + exactly-one-event enforced before write |
| F. Genesis boundary | IMPLEMENTED | Explicit immutable epoch model |
| G. Replay/coherence | IMPLEMENTED | Fail-closed load + pre-write candidate check |
| H. Security review | PARTIAL / HARDENED | App boundary hardened; production outer access/rate-limit decision remains |
| I. Operator UX | OPEN | Local visual/interaction pass |
| J. Failure semantics | PARTIAL / HARDENED | Core categories implemented; browser error matrix remains |
| Public/private leakage | CONTRACT-PROTECTED | Generic class projection + no recipient edge target leakage |
| Analytics | DEFERRED CORRECTLY | Do not begin until real event history exists and local hardening completes |
| Agent mutation | DEFERRED CORRECTLY | Human operator boundary must be proven first |

---

## Resume point

Do **not** add more lifecycle/provenance concepts next.

The next trustworthy move is local execution:

```text
latest main
-> disposable remote branch
-> npm run verify
-> authenticated browser exercise
-> full lifecycle
-> deliberate stale-head race
-> inspect Git commits + ledger replay
-> UX/failure polish discovered by use
-> security/access-boundary decision
-> normal PR
```

The machinery is now substantially more constrained than when item 20 was written. The remaining question is no longer whether the model can describe trustworthy operation; it is whether the real browser + GitHub + deployment system behaves exactly as the model requires.

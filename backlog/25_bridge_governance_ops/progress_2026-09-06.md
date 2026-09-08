# 20 — Bridge Governance + Operations Hardening Progress

**Parent work item:** `backlog/20_bridge_governance_ops_local_pickup.md`  
**Checkpoint date:** 2026-09-06  
**Status:** correctness + provenance + core application security are CI-gated; browser mutation, real concurrency, production outer-access verification, and UX polish remain local  
**Work stream:** Bridge governance / operations

## Current invariant

```text
canonical Bridge record
-> governance validator
-> legal transition
-> operational queue
-> append-only provenance event
-> atomic Git commit
-> epoch + ledger replay
-> manifest coherence check
```

Lifecycle, visibility, and relationship status remain independently governed dimensions.

---

## Implemented since the original item-20 handoff

### C. Governance + executable transition contracts — IMPLEMENTED / CI-GATED

New checks:

```text
scripts/check_bridge_transition_behavior.mjs
scripts/check_bridge_governance_contracts.mjs
```

The behavior checker transpiles the real `bridge-governance.ts` and `bridge-transitions.ts` source with the installed TypeScript compiler and executes the transition functions with Node assertions.

Covered legal behavior includes:

```text
draft -> ready -> sent -> discussion -> scoped -> active -> historical

draft -> declined -> draft
active -> publish -> unpublish
historical -> publish
```

Representative invalid operations are also exercised, including illegal lifecycle jumps, contact outside sent/discussion, publish/unpublish no-ops, incomplete next-action metadata, and missing scoped ownership.

Key non-equivalences are executable contracts:

- activation does not publish;
- contact does not advance lifecycle;
- lifecycle transitions do not silently change visibility.

The governance checker independently protects:

- exact lifecycle topology;
- lifecycle/relationship tuples;
- visibility/routing tuples;
- operational metadata requirements;
- closure behavior;
- reopen reset semantics;
- generic Bridge-class graph projection;
- source/class deduplication;
- absence of recipient-specific ids/slugs as public graph edge targets or labels.

### D. Ledger schema validation — IMPLEMENTED / CI-GATED

`src/lib/bridge-event-ledger.ts` now validates event structure and semantics:

- schema version;
- unique event id;
- Bridge id;
- supported operation;
- ISO timestamp;
- non-empty actor;
- expected source;
- `commit: "self"` convention;
- parent Git SHA shape;
- governance-valid before/after states;
- operational metadata;
- evidence consistency;
- operation-specific transition semantics.

Malformed or semantically invalid history fails closed.

### E. Append-only ledger semantics — IMPLEMENTED FOR OPERATOR PATH / CI-GATED

The operator transaction requires:

```text
newLedger = oldLedger + exactlyOneValidEvent
```

Runtime enforcement requires exact prefix continuity, exactly one appended event, unique event ids, and a valid resulting ledger before any Git blobs are created.

Independent checker:

```text
scripts/check_bridge_ledger_contracts.mjs
```

### F. Ledger genesis boundary — IMPLEMENTED

Chosen model:

> **Explicit ledger epoch, not fabricated historical transition events.**

Canonical genesis file:

```text
src/content/bridge-ops/epoch.json
```

It snapshots the governed state of the ten pre-ledger Bridge records.

Semantics:

- epoch is genesis state, not an operator event;
- no pre-ledger outreach history is invented;
- `commit: "self"` avoids self-referential Git hashing;
- `parentCommit` anchors the epoch to prior repository state;
- `manifestVersion` is historical metadata, not a permanent version lock.

Future Bridges use a separately governed `register` event rather than mutating the epoch. The ordinary operator mutation surface explicitly excludes `register`.

### G. Replay + manifest coherence — IMPLEMENTED / CI-GATED

Current governed state is reconstructible from:

```text
epoch + ordered events
```

Replay rejects events before epoch, duplicate ids, unknown Bridge references, discontinuous `from` states, duplicate registration, and invalid transition semantics.

Required invariant:

```text
replay(epoch, ledger) == current Bridge governed state in manifest
```

`src/lib/bridge-ops-store.ts` enforces this both when the operator surface loads and against candidate manifest + appended event before write blobs are created.

### H. Core application security — HARDENED / CI-GATED; OUTER BOUNDARY STILL OPEN

New checker:

```text
scripts/check_bridge_ops_security_contracts.mjs
```

Application-level protections now include:

- HMAC-signed session cookie;
- timing-safe password/signature comparison;
- signed issued-at timestamp;
- server-side 12-hour expiry;
- future-issued-session rejection;
- `HttpOnly`;
- `SameSite=Strict`;
- `Secure` in production;
- path `/ops/bridges`;
- high cookie priority;
- path-correct logout;
- locked/unconfigured UI does not expose env names, repository, or branch;
- raw GitHub response bodies are not reflected into UI errors;
- sanitized GitHub error categories;
- explicit stale-head guard;
- non-forced Git ref update;
- session-gated mutation Server Action;
- ordinary mutation path cannot emit `register`;
- both ops routes remain `noindex`, `nofollow`, `nocache`.

Still open:

- durable brute-force/rate-limit boundary;
- production outer-access decision/verification;
- multi-operator identity model;
- live Server Action CSRF/origin verification;
- minimum-permission GitHub token verification on a disposable branch.

Do not fake durable distributed rate limiting with process-local serverless state.

### J. Failure semantics — PARTIAL / HARDENED

Implemented categories include stale head, GitHub auth/permission/not-found/validation/rate-limit/upstream failures, invalid transition, malformed manifest/epoch/ledger/coherence, and explicit visibility no-op failures.

The full browser error matrix remains local work.

---

## Bridge-specific deployment gate

Dedicated contract command:

```text
npm run bridge:contracts
```

runs:

```text
check_bridge_transition_behavior.mjs
check_bridge_governance_contracts.mjs
check_bridge_ledger_contracts.mjs
check_bridge_ops_security_contracts.mjs
```

The application build begins with:

```text
npm run bridge:contracts && next build
```

so Vercel executes the Bridge contract stack before compiling the application.

### Verified Vercel run

Commit:

```text
4c92ba0100ff43821407ecf3680360cf085f0474
```

Build output:

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
Build Completed
Deployment completed
```

Vercel deployment state was observed as `READY`.

---

## Runtime access-boundary observations

### Direct deployment URL

The direct Vercel deployment URL returned a Vercel SSO/Deployment Protection redirect rather than exposing the application directly.

Observed response properties included:

```text
302 Found
Vercel SSO redirect
x-robots-tag: noindex
```

This demonstrates an outer access boundary on the direct deployment URL.

### Production application routes

Using Vercel's authenticated deployment-fetch mechanism, both production paths were inspected:

```text
/ops/bridges
/ops/bridges/events
```

Current app-level behavior is fail-closed because production Bridge operator configuration is absent.

`/ops/bridges` rendered only:

```text
This route fails closed until its server-side operator boundary is configured.
Operator configuration is unavailable. No operational state is exposed.
```

and returned private/no-store cache semantics plus `noindex, nofollow, nocache` metadata.

`/ops/bridges/events` rendered only the authentication boundary and no event data.

Important limitation:

> Vercel's authenticated/share fetch can bypass deployment protection for inspection, so this observation does **not** prove whether the production custom domain has an independent outer access boundary.

Therefore the production access setting still must be checked explicitly **before enabling Bridge operator secrets in production**. Current safety depends on the application failing closed while unconfigured.

---

## Unrelated repository contract drift discovered

An attempt to gate `next build` on the entire repository-wide `contracts:check` exposed pre-existing v2 contract drift in `scripts/check_v2_contracts.mjs`.

It still references the retired optional catch-all route:

```text
src/app/[[...slug]]/page.tsx
```

while the current application has:

```text
src/app/[...slug]/page.tsx
src/app/page.tsx
```

and the older root/hero assumptions have also changed.

That is real repository debt, but it is not Bridge governance work. Item 20 therefore uses the dedicated `bridge:contracts` build gate rather than silently absorbing a separate v2-contract rewrite.

The broader `contracts:check` remains useful locally because it continues to expose that debt.

---

## Remaining local work

### A. Real operator lifecycle exercise — OPEN

Use a disposable remote branch, not `main`.

Exercise through the actual browser/Server Action path:

```text
draft
-> ready
-> sent
-> discussion
-> scoped
-> active
-> historical

draft -> declined -> draft
active -> publish -> unpublish
```

For every operation prove:

- manifest validity;
- exactly one event appended;
- manifest + ledger in one commit;
- event `from` equals prior replay state;
- event `to` equals resulting manifest state;
- UI reflects the GitHub commit;
- invalid operations mutate neither control file.

Transition functions themselves now pass executable CI; this remaining item is specifically the integrated browser + Server Action + GitHub transaction path.

### B. Real optimistic-concurrency race — OPEN

Use two stale snapshots against the same disposable branch.

Required result:

> at most one stale-head operation advances the branch; the other fails without overwriting the first transition/event.

### H. Production outer access boundary — OPEN

Before configuring production Bridge secrets, inspect and choose the actual custom-domain protection posture.

Possible outer boundaries:

- Vercel Deployment Protection/team authentication;
- identity-aware access proxy;
- VPN/private network;
- restrictive IP allowlist where appropriate.

### I. Operator UX — OPEN

Remaining local polish:

- queue-first grouping;
- clearer stale/overdue state;
- visual distinction between transition/contact/closure/visibility actions;
- confirmations for destructive/relationship-significant actions;
- pending state;
- success state with commit identity;
- obvious control-surface <-> event-ledger navigation;
- event filters;
- keyboard/focus review;
- useful mobile inspection;
- browser review of locked, configured, error, empty-ledger, and populated-ledger states.

Keep it machinery, not outreach collateral.

---

## Completion map

| Original item | State | Notes |
|---|---|---|
| A. Browser lifecycle proof | OPEN | Function behavior passes CI; integrated path requires disposable branch |
| B. Optimistic concurrency race | OPEN | Must exercise real GitHub behavior |
| C. Governance contracts | IMPLEMENTED + CI-GATED | Includes executable transition behavior + leakage contracts |
| D. Ledger schema validation | IMPLEMENTED + CI-GATED | Runtime + independent checker |
| E. Append-only semantics | IMPLEMENTED FOR OPERATOR PATH + CI-GATED | Exact prefix + one event before write |
| F. Genesis boundary | IMPLEMENTED | Explicit epoch |
| G. Replay/coherence | IMPLEMENTED + CI-GATED | Load-time + candidate pre-write fail-closed checks |
| H. Security | PARTIAL / HARDENED + CI-GATED | App boundary proven; production outer boundary still open |
| I. Operator UX | OPEN | Local browser/interaction pass |
| J. Failure semantics | PARTIAL / HARDENED | Browser matrix remains |
| Public/private leakage | IMPLEMENTED + CI-GATED | Generic class projection only |
| Analytics | DEFERRED CORRECTLY | Wait for real history + local hardening |
| Agent mutation | DEFERRED CORRECTLY | Human operator chain must be proven first |

---

## Resume point

Do not add more lifecycle/provenance abstractions next.

```text
latest main
-> disposable remote branch
-> npm run bridge:contracts
-> npm run typecheck
-> configure local/test operator secrets
-> authenticated browser exercise
-> full lifecycle
-> deliberate stale-head race
-> inspect commits + ledger replay
-> UX/failure polish discovered by use
-> verify production custom-domain access boundary
-> normal PR
```

The model and its guards are now continuously executable. The remaining question is operational: whether the real browser + Server Action + GitHub chain behaves exactly as required under success, invalid input, and concurrency.

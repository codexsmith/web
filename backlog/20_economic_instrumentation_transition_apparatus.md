# Task: Polish and Merge Economic Instrumentation Transition Apparatus

**Status:** backlog / local polish + integration candidate  
**Date:** 2026-08-27  
**Working branch:** `agent/economic-instrumentation`  
**Pull request:** `#45` — Add economic instrumentation console  
**Route:** `/economic-instrumentation`  

## Goal

Take the current economic-instrumentation prototype through a local verification, interaction-polish, evidence-review, and merge pass without weakening its epistemic boundaries.

The branch now contains a **composed operator surface**, not a stack of explanatory cards. Treat the existing implementation as the concrete starting point to render, inspect, refine, and merge.

The core product proposition is:

> **The ledger is not the system. The city stays put while the representation changes.**

The interface should operate as a Boundary First civilizational systems instrument: measurement planes, system layers, temporal evidence frames, semantic scenario boundaries, and calibrated executable transitions are alternate lawful projections over the same represented city.

## Visual grammar reference

The current Boundary First Labs **Lab Machine** UI is the visual-grammar reference for this route, not the content model to reproduce.

Use this physical grammar:

```text
bounded chassis
-> inset instrument bay
-> typed port / connector
-> signal trace / bus
-> state lamp
-> quantitative readout
-> operator key / switch bank
-> evidence / claim plate
```

The economic route now implements that grammar structurally through:

```text
src/components/product-landing/EconomicInstrumentationApparatus.tsx
src/app/economic-instrumentation/economic-apparatus.module.css
```

This is no longer just a route-level dark theme. The composition has been rebuilt around:

```text
NAMEPLATE
  -> compact route identity + current frame / plane / object readouts

TEMPORAL RAIL
  -> T0-T5 as one segmented operating rail

CONTROL DECK
  -> measurement-plane bank
  -> system-layer bank

SYSTEM BED
  -> Augusta schematic surface as the dominant visual object
  -> bounded system modules with ports
  -> traces / consequence paths
  -> current projection/evidence state

INSPECTOR RACK
  -> selected bounded object
  -> attached instruments as compact readouts
  -> detailed prose/provenance behind inspection disclosures

SCENARIO SWITCHBOARD
  -> five three-position operator banks
  -> baseline / intervention / stress
  -> compact compiled-state counters

CALIBRATED TRANSITION BAYS
  -> water additive-boundary-ratio
  -> road additive-stock
  -> replacement/backlog stock-flow family shown as locked until a source-bound baseline exists
```

The default screen should therefore communicate **state and operation before explanation**. Long descriptions, provenance, claim boundaries, and unresolved-variable inventories remain available through explicit `inspect` disclosures instead of filling the primary visual field.

Do **not** copy the Lab Machine screen's People / Products / Publications / Research content structure into this route. The economic content model remains its own system.

Do not modify the site's existing global top and bottom navigation frames as part of this work item. The visual task is the content field between them.

## Current implementation

The branch currently adds:

- an unlinked `/economic-instrumentation` route;
- a dedicated `EconomicInstrumentationApparatus` operator surface;
- Augusta-Richmond County system topology and schematic spatial orientation;
- independent measurement-plane and system-layer control banks;
- temporal frames `T0` through `T5` on a compact rail;
- source-bound, interpretive, open, seeded, and no-signal evidence states;
- selectable system modules rendered as bounded instrument objects with ports;
- a selected-object inspector rack with compact attached instrument readouts;
- a semantic scenario switchboard for maintenance, replacement, load/capacity, institutional continuity, and household burden transfer;
- scenario-to-map coupling that highlights declared affected objects and consequence paths without mutating observed values;
- a reusable calibrated-transition kernel;
- a calibrated-transition registry keyed to system objects;
- a Highland Avenue water `additive-boundary-ratio` transition;
- an Augusta roadway resurfacing `additive-stock` transition;
- a replacement/backlog `stock-flow-balance` transition family and contract factory;
- a visible locked replacement/backlog bay that refuses execution until a legitimate source-bound backlog baseline and closure rule exist.

## Calibrated transition families

### 1. Additive boundary ratio

```text
rho_1 = (Q_0 + deltaQ) / C_design
```

Source-bound baseline:

- Highland Avenue reported average daily flow: approximately `24 MGD`;
- Highland Avenue reported design capacity: `60 MGD`.

Claim boundary:

- plant-level average-flow / reported-design-capacity arithmetic only;
- not system-wide utilization, operational reserve, peak sufficiency, reliability, or a forecast of future capacity.

### 2. Additive stock

```text
M_1 = M_0 + deltaM
```

Source-bound baseline:

- Augusta Engineering reports `119.60 road miles` resurfaced across `477 roads` under the Sales Tax Program resurfacing contracts.

Claim boundary:

- cumulative maintenance output only;
- not citywide pavement condition;
- not percent of network treated;
- not remaining backlog;
- no compatible total-network denominator or citywide condition series is synthesized.

### 3. Stock-flow balance / replacement backlog

```text
B_(t+1) = B_t + A_t - R_t
```

where:

- `B_t` = source-bound backlog stock at the start of a declared period;
- `A_t` = newly admitted work during the period;
- `R_t` = verified resolved work during the period;
- `B_(t+1)` = next-period backlog on the same accounting basis.

Critical rules:

- blank is not zero;
- both `A_t` and `R_t` must be explicitly declared before execution;
- all quantities must use the same unit and inclusion criteria;
- resolved work must obey an explicit closure rule;
- a negative arithmetic result is exposed as `balance-constraint-crossed`, not silently clamped to zero;
- reduction in backlog stock does not by itself prove improved condition, reliability, access, avoided failure, or lower lifecycle cost.

The generic constructor is in:

`src/lib/replacement-backlog-transition.ts`

Do **not** register an Augusta replacement/backlog transition until a source-bound backlog baseline exists on a coherent accounting basis.

## Primary local work sequence

1. Check out `agent/economic-instrumentation` and inspect `AGENTS.md` before modifying code.
2. Install dependencies if needed.
3. Read the locally installed Next.js documentation required by `AGENTS.md` for any touched Next.js conventions.
4. Run:

```bash
npm run verify
```

5. Fix all lint, typecheck, contract, build, or runtime defects without weakening typed transition contracts.
6. Run the app locally and inspect:

```text
http://localhost:3000/economic-instrumentation
```

7. Inspect the default composition before opening any disclosures. It should read as an operator instrument rather than a document or admin dashboard.
8. Inspect desktop, laptop, tablet, and compact/mobile widths.
9. Check especially:
   - system-bed proportions;
   - overlap/collision among system modules;
   - legibility of routes, zones, traces, and node labels;
   - inspector-rack width and density;
   - temporal-rail truncation;
   - control-bank labels;
   - scenario three-way switch usability;
   - calibration readout density;
   - disclosure positioning and overflow.
10. Exercise each executable transition with blank, zero, positive, invalid/negative, and boundary-crossing inputs where applicable.
11. Confirm Reset clears semantic scenario and calibrated-transition inputs.
12. Confirm water or road numeric input moves the representation into the scenario frame without implying forecast state.
13. Inspect `T0`-`T5`; historical frames must withhold current observations rather than backcast them.
14. Confirm scenario highlighting means declared scenario membership, not predicted propagation or improvement.
15. Refine visual physicality against the Lab Machine grammar without changing the global nav frames.
16. Keep long prose subordinate to operation; prefer inspection/disclosure over always-visible paragraphs.
17. Re-run `npm run verify` after polish.
18. Keep the PR collapsed to one coherent commit before merge.
19. Merge only after local verification and PR checks are green.

## Replacement/backlog calibration target

Find the first defensible source-bound backlog dataset containing:

- baseline stock `B_t`;
- stable unit;
- explicit inclusion criteria;
- identifiable period boundary;
- newly admitted work or source detail sufficient to calculate it;
- resolved/completed work under an explicit closure definition;
- provenance distinguishing authorized, funded, scheduled, started, and completed work.

Candidate domains include roadway resurfacing/pavement treatment, water capital replacement, utility asset replacement, facility capital renewal, school facility maintenance, or another Augusta public-works inventory with explicit work state.

Do not force the existing `119.60 resurfaced miles` cumulative-output stock into `B_t`; it is not a backlog baseline.

## Files to inspect first

```text
src/app/economic-instrumentation/page.tsx
src/app/economic-instrumentation/economic-apparatus.module.css
src/components/product-landing/EconomicInstrumentationApparatus.tsx
src/components/product-landing/AugustaScenarioContext.tsx
src/lib/economic-instrumentation.ts
src/lib/augusta-economic-cross-section.ts
src/lib/augusta-spatial-grammar.ts
src/lib/augusta-surface-instrumentation.ts
src/lib/augusta-temporal-state.ts
src/lib/augusta-scenario-transitions.ts
src/lib/calibrated-transition.ts
src/lib/calibrated-transition-registry.ts
src/lib/augusta-water-calibration.ts
src/lib/augusta-transport-calibration.ts
src/lib/replacement-backlog-transition.ts
```

The older `AugustaEconomicCrossSection`, `AugustaScenarioWorkbench`, and `AugustaTransportCalibrationPanel` components remain on the branch for comparison/refactoring history but the route now renders `EconomicInstrumentationApparatus` directly.

## Epistemic invariants to preserve

1. **Unknown / unobserved is never rendered as zero.**
2. **Scenario input is never mislabeled as forecast data.**
3. **A derived arithmetic quantity is labeled as derived, not observed.**
4. **Compatible units are necessary but not sufficient for physical-model validity.**
5. **Design capacity is not operational reserve.**
6. **Cumulative treatment output is not condition or network coverage.**
7. **Backlog closure requires a declared closure rule.**
8. **Transaction/accounting closure is not consequence closure.**
9. **Historical frames do not silently backcast present measurements.**
10. **Map geometry remains schematic until authoritative GIS geometry replaces it.**
11. **Scenario graph membership does not mean predicted causal propagation.**
12. **Registry membership means discoverable executable contract at a stated maturity, not decision-ready simulation.**

## Acceptance test

The work item is ready to merge when a local reviewer can answer, primarily from the operating surface:

- What frame am I in?
- What measurement plane is active?
- What system layer is active?
- What bounded object is selected?
- Which signals are observed, open, interpretive, or absent?
- Which relations are structural versus scenario-highlighted?
- What switches changed the scenario boundary?
- Which numeric transforms actually executed?
- Why is Highland water arithmetic not a capacity forecast?
- Why is resurfaced mileage not pavement-health improvement?
- Why is the replacement/backlog bay currently interlocked?
- Can unobserved quantities remain visibly unresolved rather than collapsing to zero?
- Does the content field visibly belong to the same BFL apparatus family as the Lab Machine without copying its content layout?
- Does `npm run verify` pass locally?
- Is PR `#45` green, coherent, and still one commit before merge?

If those answers are clear, the apparatus has crossed from a research prototype into a locally verified integration candidate.

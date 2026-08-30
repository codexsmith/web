# Local Agent Guide — Lab Machine Recovery and Integration

**Repository:** `codexsmith/web`  
**Working branch:** `prototype/lab-machine-second-layer-content`  
**Purpose:** give the local coding agent enough context to recover the intended Lab Machine overview, preserve the second-layer pages already built, and wire those pages to the correct physical blocks without repeating the UI drift that occurred in the remote session.

---

## 0. Read this first

The most important correction is conceptual:

> **The physical Lab Machine overview is the navigation surface. The subsystem pages are the destinations behind its physical blocks.**

We accidentally blurred three separate things during the remote prototype work:

1. the canonical physical Lab Machine overview;
2. the subsystem detail/projection pages behind each block; and
3. later traversal/carrier experiments that tried to make the overview itself behave like a stateful inspection application.

Those are not the same layer.

The user wants the original physical overview back, visually unchanged except for lawful click/keyboard hit areas on the existing blocks. Clicking a block should open the corresponding subsystem page. The overview itself should **not** gain a second visual language, extra inline detail UI, object-carrier state, traversal decorations, selection overlays, or new geometry as a side effect of making the blocks clickable.

The screenshot supplied in the conversation is the visual authority. When source history and current runtime disagree with the screenshot, first recover the historical component/style checkpoint that produced the screenshot rather than styling the current implementation until it looks approximately similar.

---

## 1. Current repository state

The active branch is:

```text
prototype/lab-machine-second-layer-content
```

The latest recovery commit from the remote session is:

```text
ec60c7368012b610313d69a5bb3fa230204a2852
fix(bfux): restore original Lab Machine renderer
```

That commit restored `LabMachine.tsx` and `lab-machine-model.ts` from the branch merge base and then added only an optional `onOpenNode(nodeId)` interaction hook.

However, **the runtime screenshot after that recovery was still not the intended UI**. That means the merge-base renderer is not automatically the correct visual checkpoint, or the surrounding route/shell is still altering the composition. Do not assume `ec60c7` has solved the visual problem merely because it restored old source.

### Important history

The merge base of `prototype/lab-machine-second-layer-content` is:

```text
31197e76f8480b62f2e7aaf5062fc46fa87db087
refactor(bfux): use production card skin in physical machine
```

That is also the current head of:

```text
prototype/lab-machine-code-object
```

The second-layer branch is therefore a descendant of `31197e76`.

But there is a crucial visual transition immediately before that base:

```text
d40db3cd0ff9f9ec32bbce539fe733a566a78c7a
fix(bfux): correct physical mount inset shorthand
```

At `d40db3`, `LabMachine.tsx` imports:

```ts
import "./lab-machine.css";
import "./lab-machine-physical.css";
import "./lab-machine-reference-cards.css";
import "./lab-machine-mass.css";
```

Then the next important commit is:

```text
7f9dee450cb38eae5d5efd2b8a55c3c50eb13828
style(bfux): port production card language into physical machine
```

That commit explicitly introduced `lab-machine-main-card-port.css`, whose stated purpose was to **replace the experimental material stack** with the flatter production-card material language: neutral matte gunmetal, shallow hierarchy, recessed boundary register, restrained semantic accents.

The current wrong runtime screenshot strongly resembles that later production-card treatment: large neutral cards with prominent boundary wells. The user's desired screenshot instead has a richer, denser, more instrument-like physical construction with stronger subsystem-specific color, mounting mass, and compact control-module proportions.

### Therefore: first local hypothesis to test

The strongest source-history candidate for the desired screenshot is the **pre-production-card checkpoint around `d40db3`**, not `31197e76`.

Do not take this as proven until rendered locally. Test it.

Useful commands:

```bash
git show d40db3cd0ff9f9ec32bbce539fe733a566a78c7a:src/components/bfux/LabMachine.tsx

git show d40db3cd0ff9f9ec32bbce539fe733a566a78c7a:src/components/bfux/lab-machine-reference-cards.css

git show d40db3cd0ff9f9ec32bbce539fe733a566a78c7a:src/components/bfux/lab-machine-mass.css

git show 7f9dee450cb38eae5d5efd2b8a55c3c50eb13828 -- src/components/bfux/LabMachine.tsx src/components/bfux/lab-machine-main-card-port.css
```

The goal is to identify the exact historical visual checkpoint matching the supplied screenshot and restore **that complete stack as a unit**.

---

## 2. What the canonical overview is supposed to do

The overview should answer:

> What are the major operating boundaries of Boundary First Labs, and how are they related?

It is a physical systems diagram / instrument cluster, not a conventional card dashboard.

The twelve subsystem objects are:

- Research
- Products
- Publications
- Applications
- Method
- Pipeline
- Governance
- About
- People
- Timeline
- Service Bus
- Public Value

The overview includes graph-derived cables/ports and a physical legend. Those communicate institutional structure. They are not merely decoration.

### What clicking a subsystem means

A click means exactly:

> **Open this subsystem's page.**

It does **not** mean:

- select the block and expand an inline inspector below the board;
- begin a graph traversal session;
- bind a governed object;
- mutate cable highlighting;
- change card geometry;
- turn the entire board into a new router-specific renderer;
- open a second competing overview implementation.

Keyboard behavior should be equivalent to clicking:

- `Enter`
- `Space`

A whole physical module may be the hit target as long as its existing internal controls do not later require independent pointer semantics.

---

## 3. The pages behind the blocks already exist

A substantial amount of second-layer work was completed on this branch. **Do not discard it just because the overview UI drifted.**

Dedicated components currently exist for:

| Lab Machine block | Specialized component | Default mode used during routing prototype |
| --- | --- | --- |
| Research | `LabMachineResearchProjection.tsx` | `program-map` |
| Products | `LabMachineProductsProjection.tsx` | `experimental-portfolio` |
| Applications | `LabMachineApplicationsProjection.tsx` | `domain-map` |
| Service Bus | `LabMachineServiceProjection.tsx` | `distribution-map` |
| Public Value | `LabMachinePublicValueProjection.tsx` | `capability-map` |
| People | `LabMachinePeopleProjection.tsx` | `participation-network` |
| Method | `LabMachineMethodProjection.tsx` | `method-stack` |
| Pipeline | `LabMachinePipelineProjection.tsx` | `flow-map` |
| Governance | `LabMachineGovernanceProjection.tsx` | `authority-map` |
| About | `LabMachineAboutProjection.tsx` | `institutional-profile` |
| Timeline | `LabMachineTimelineProjection.tsx` | `institutional-timeline` |
| Publications | **No dedicated specialized component yet** | generic second-layer detail currently available |

Associated content lives in `src/content/lab-machine-*.json` and the generic institutional contract lives in:

```text
src/content/lab-machine-second-layer.json
```

The subsystem page work is useful and should survive the recovery.

### Publications gap

Publications is the one intentionally incomplete specialized page.

Its declared modes are already known:

```text
publication-map   -> Publication Program
maturity-board    -> Maturity
claim-provenance  -> Claim Provenance
```

Framing question:

> When is research ready to become a public claim?

Institutional takeaway:

> Publishing is a governed boundary crossing: research becomes public without losing its provenance or uncertainty.

Do not invent publication/review status while completing it.

---

## 4. Current route architecture — treat as provisional

At the time of handoff, `/world` is no longer the original simple preview route. It currently goes through:

```text
src/app/world/page.tsx
  -> src/components/bfux/LabMachineWorld.tsx
      -> BoundaryFrame
      -> LabMachine or subsystem projection
```

`LabMachineWorld.tsx` was introduced during the cleanup attempt. It keeps a root `BoundaryFrame`, switches World / Evidence / Timeline projections, and uses a `section` query parameter to swap the central workfield from the overview into a subsystem projection.

This may be a reasonable final architecture, but **it is not sacred**. The user has explicitly said the page still looks wrong.

The local agent should determine whether the mismatch is caused by:

1. the wrong historical Lab Machine material stack;
2. global/site-shell CSS affecting the restored machine;
3. `BoundaryFrame`/`world-viewport` sizing or overflow behavior;
4. route composition introducing constraints the original visual did not have;
5. some combination of the above.

### Do not debug by piling more CSS overrides on top

There was already one failed spacing pass in `world-machine-preview.css`. That stylesheet was later removed. Do not repeat that pattern.

Recover the correct renderer/style composition first. Then make the smallest routing integration necessary.

---

## 5. Target page composition

The desired experience is conceptually:

```text
+---------------------------------------------------------------+
| Existing Boundary First top navigation / traversal frame      |
+---------------------------------------------------------------+
|                                                               |
|             CANONICAL PHYSICAL LAB MACHINE                    |
|                                                               |
|   [People] [Products] [Publications] ...                       |
|       \        |          /                                   |
|              [Research]                                       |
|          [Pipeline][Method][Timeline] ...                      |
|                                                               |
|             cables / ports / apparatus                        |
|                                                               |
+---------------------------------------------------------------+
| Lab Machine physical legend / visual grammar                  |
+---------------------------------------------------------------+
```

When a block is activated:

```text
+---------------------------------------------------------------+
| Same Boundary First frame / orientation context               |
+---------------------------------------------------------------+
|                                                               |
|            SPECIALIZED SUBSYSTEM PAGE                         |
|                                                               |
|            e.g. Research Program Map                          |
|                                                               |
+---------------------------------------------------------------+
```

Back/close should return to the **same canonical Lab Machine overview**, not to a second comparison page or another renderer family.

The overview is the table of contents. The subsystem pages are the chapters.

---

## 6. Visual authority and visual grammar

Use the user-supplied screenshot as the primary visual target.

Do not reinterpret it as a generic design mood board. It is the actual interface family we are trying to preserve.

Key qualities:

- dark blue-black machine/workbench background;
- subtle grid / scanline structure;
- discrete physical modules rather than web cards;
- visible mechanical mounting, seams, frames, screws, connector logic;
- subsystem-specific colors as signal channels;
- serif subsystem labels;
- narrow mono machine labels/status text;
- cables and ports are physically plausible and semantically meaningful;
- information dense, but not text-wall dense;
- compact instrument readouts rather than large prose panels;
- precise and maintained, not distressed/grimy;
- every physical metaphor should communicate an operational distinction.

The older visual grammar note is here:

```text
backlog/17_lab_machine_governed_object_registry_v0_1/visual_grammar_v0_1.md
```

Read it, but the screenshot wins if there is ambiguity.

### Historical style clue

The pre-`7f9dee` files `lab-machine-reference-cards.css` and `lab-machine-mass.css` are especially important because they explicitly encode:

- thick tinted cast housings;
- visible layered shells;
- stronger subsystem-specific tones;
- physical fasteners;
- bolted icon cartridges;
- recessed instrument wells;
- separate heavy readout trays;
- through-wall connectors;
- role-dependent mechanical mass.

Those qualities are much closer to the desired screenshot than the later `lab-machine-main-card-port.css` philosophy, which intentionally flattened the modules toward production web cards.

---

## 7. Files to inspect first locally

### Canonical overview renderer candidates

```text
src/components/bfux/LabMachine.tsx
src/components/bfux/lab-machine-model.ts
src/components/bfux/lab-machine.css
src/components/bfux/lab-machine-physical.css
src/components/bfux/lab-machine-main-card-port.css
```

Historical candidates to recover from git:

```text
src/components/bfux/lab-machine-reference-cards.css
src/components/bfux/lab-machine-mass.css
```

At `d40db3`, those two historical files were active imports in `LabMachine.tsx`.

### Current world integration

```text
src/app/world/page.tsx
src/components/bfux/LabMachineWorld.tsx
src/components/boundary-frame.tsx
```

### Specialized subsystem pages

```text
src/components/bfux/LabMachineResearchProjection.tsx
src/components/bfux/LabMachineProductsProjection.tsx
src/components/bfux/LabMachineApplicationsProjection.tsx
src/components/bfux/LabMachineServiceProjection.tsx
src/components/bfux/LabMachinePublicValueProjection.tsx
src/components/bfux/LabMachinePeopleProjection.tsx
src/components/bfux/LabMachineMethodProjection.tsx
src/components/bfux/LabMachinePipelineProjection.tsx
src/components/bfux/LabMachineGovernanceProjection.tsx
src/components/bfux/LabMachineAboutProjection.tsx
src/components/bfux/LabMachineTimelineProjection.tsx
src/components/bfux/LabMachineDetailPanel.tsx
src/components/bfux/LabMachineProjectionShell.tsx
```

### Experimental machinery — preserve source, but do not automatically wire into overview

```text
src/components/bfux/LabMachineNavigationContext.tsx
src/components/bfux/LabMachineObjectCarrier.tsx
src/components/bfux/LabMachineRelationRail.tsx
src/components/bfux/lab-machine-selection.css
src/components/bfux/lab-machine-traversal.css
src/components/bfux/lab-machine-object-carrier.css
```

These were useful experiments and may belong inside deeper subsystem/object-inspection flows, but they are **not required to make the overview blocks clickable**.

---

## 8. Exact semantic graph to preserve during visual recovery

The branch-base graph contains 12 relations:

```text
Method       -> Research      structures
Pipeline     -> Research      moves work
About        -> Research      identifies
Research     -> Products      develops
Research     -> Publications  publishes
Research     -> Applications  applies
People       -> Research      participate
Governance   -> Research      constrains
Timeline     -> Research      records
Applications -> Service Bus   disseminates
Service Bus  -> Public Value  delivers
Public Value -> People        serves
```

A later experimental edge:

```text
Products -> Applications  transfers into
```

was added during traversal/carrier work. It was removed again in the latest restoration.

Do not silently re-add it to make cable routing or object routes convenient. If it returns, it should be a deliberate ontology decision.

### Cable warning

The physical cable path arrays are index-coupled to `labMachineEdges` ordering.

Changing graph order or edge count can silently bind a semantic relation to the wrong SVG cable.

Do not reorder edges casually during the recovery pass.

Longer term, cable geometry should be keyed by semantic edge ID rather than array index.

---

## 9. Minimal interaction contract for the overview

The desired implementation can be extremely small.

Conceptually:

```ts
<LabMachine
  skin="physical"
  onOpenNode={(nodeId) => openSubsystem(nodeId)}
/>
```

Each physical `Node` should remain the same markup and styling as the recovered historical renderer, with only:

```ts
role="button"
tabIndex={0}
onClick={() => onOpen(node.id)}
onKeyDown={Enter/Space -> onOpen(node.id)}
```

or a semantically equivalent wrapper that does not alter layout.

Do not add a nested visible button if that changes the module's geometry.

### Routing can be query-state or route-state

The current prototype uses:

```text
/world?skin=physical&section=research
```

That is acceptable if it preserves the page composition.

A nested route would also be acceptable if it is structurally cleaner, but do not create a separate Lab Machine overview UI merely to support routing.

The click behavior should be boring. That is a feature.

---

## 10. Known remote-session mistakes to avoid

### Mistake 1 — treating the screenshot as only visual grammar

For part of the session, the screenshot was treated as a general style reference rather than the actual overview being targeted. That led to new UI structures that were visually related but architecturally wrong.

**Correction:** the screenshot is the overview target.

### Mistake 2 — making the overview a stateful inspector

`LabMachine.tsx` accumulated selected-node state, traversal state, visited/adjacent highlighting, governed-object route state, and inline detail rendering.

Those features may be useful elsewhere, but they changed what a block click meant and made simple routing hard to reason about.

**Correction:** overview click = navigate/open subsystem.

### Mistake 3 — adding a competing route shell

A separate comparison/preview shell was introduced around `/world`, with apparatus/physical/both controls. That was useful during renderer prototyping but is not the intended public interaction.

**Correction:** one canonical physical overview.

### Mistake 4 — trying to repair spacing in the wrapper

A later CSS pass changed absolute node geometry from `world-machine-preview.css` rather than recovering the intended component/style stack.

**Correction:** fix the correct source layer, not an outer override.

### Mistake 5 — restoring the merge base without checking visual history

The remote recovery restored `31197e76`, but that commit is already *after* the explicit production-card visual conversion at `7f9dee`.

**Correction:** inspect the pre-`7f9dee` checkpoint, especially `d40db3`, against the screenshot.

---

## 11. Suggested local recovery sequence

1. **Do not start by editing.** Run the branch as-is and capture the current `/world?skin=physical` screenshot for comparison.
2. Check `AGENTS.md` and read the relevant local Next.js docs under `node_modules/next/dist/docs/` before framework-sensitive routing changes.
3. Create a temporary local worktree/branch or use `git show` to render/inspect the Lab Machine at `d40db3`.
4. Compare the following visual checkpoints directly:
   - `d40db3` — reference-card + mass stack;
   - `7f9dee` — production-card port introduced;
   - `31197e76` — second-layer branch base;
   - current branch head.
5. Identify the checkpoint that actually matches the user's screenshot. Do not infer solely from filenames.
6. Restore the matching **component + imported CSS stack together**. Avoid mixing half of one era with half of another.
7. Verify the overview in isolation before embedding it in the current `LabMachineWorld` shell.
8. Add only the `onOpenNode`/hit-area behavior.
9. Wire node IDs to the already-built specialized components.
10. Confirm Back/Close returns to the same overview.
11. Only after that, decide whether `LabMachineWorld.tsx` remains useful or should be simplified/replaced.
12. Leave traversal/carrier machinery disconnected from the root overview unless there is a new explicit design decision to use it.
13. Complete Publications only after the overview recovery is stable; do not mix that missing feature into this visual repair.
14. Run the full local verification suite.

---

## 12. Validation checklist

### Build / static checks

Run:

```bash
npm run verify
```

Do not claim success without it.

### Visual checks

At minimum inspect:

```text
http://localhost:3000/world?skin=physical
```

Compare directly to the user screenshot for:

- module positions;
- module sizes;
- physical depth/mass;
- status panel position;
- Research prominence;
- compactness of smaller modules;
- subsystem colors;
- cable positions;
- card text density;
- icon plate sizing;
- bottom legend;
- interaction with the top Boundary First frame;
- horizontal overflow;
- viewport clipping.

### Interaction checks

For every subsystem block:

- click opens the correct subsystem page;
- Enter opens it;
- Space opens it;
- focus ring is visible but does not change layout;
- browser Back behaves sensibly;
- page Back/Close returns to overview;
- no inline detail panel also opens underneath the board;
- no stale selected state remains when returning.

### Responsive checks

Test at least:

- wide desktop;
- normal laptop width;
- narrow desktop/tablet;
- mobile.

The physical machine may legitimately use horizontal overflow at some widths, but it should not accidentally zoom/crop due to an outer shell constraint.

### Accessibility checks

- keyboard reachability;
- visible focus;
- no duplicate nested interactive controls;
- reduced motion;
- high contrast / forced colors where practical;
- labels remain meaningful to screen readers.

---

## 13. What to preserve from the second-layer work

Even if the overview is reset to an older visual checkpoint, preserve the semantic/content work that was added on this branch:

- generic subsystem institutional contracts;
- specialized Research projection;
- specialized Products projection;
- specialized Method projection;
- specialized Pipeline projection;
- specialized Governance projection;
- specialized About projection;
- specialized People projection;
- specialized Applications projection;
- specialized Service Bus projection;
- specialized Public Value projection;
- specialized Timeline projection;
- governed-object registry source data;
- claim boundaries and evidence safeguards;
- visual grammar documentation.

The error was primarily **composition and interaction placement**, not that those deeper pages should not exist.

---

## 14. Governed-object work: current status

The branch also contains a larger experiment in carrying one governed object through multiple institutional projections.

Current seed objects include:

- Agency + Representation Audit
- Boundary First UX
- Software Before Code
- Augusta CityWatch
- Boundary First Weather

This machinery is documented in the sibling `README.md` in this backlog item.

Important warning: that README describes the richer traversal/carrier prototype as it existed before the recent overview rollback. It is still valuable architectural documentation, but it is **not a literal description of the currently wired root overview**.

Do not delete the governed-object work during visual recovery. Just keep it decoupled until the overview is stable.

Long-term distinction to preserve:

```text
Traverse relation != Project object
```

A semantic graph edge and an object's appearance in another subsystem are different operations.

---

## 15. Evidence / claim safeguards that must survive

Do not weaken these while polishing UI:

- People: do not invent collaborators, partners, reviewers, funders, or endorsements.
- CityWatch: do not imply current Augusta-Richmond County affiliation/collaboration/deployment.
- Weather: do not claim forecast improvement or external validation.
- BFUX: proposed conformance levels remain proposed.
- Public Value E1: reachable capability is not evidence of adoption, comprehension, impact, independent reuse, or durable capacity.
- Publications: publication is not peer review, correctness, endorsement, or authority.
- Missing mappings should remain visibly missing rather than inferred for visual completeness.

---

## 16. Definition of done for this immediate pickup

The immediate recovery task is done when all of the following are true:

1. `/world?skin=physical` visually matches the intended historical/screenshot Lab Machine composition closely enough that the user recognizes it as the same UI.
2. No new overview renderer exists alongside it.
3. Every original physical subsystem block is a click/keyboard hit target.
4. Each hit target opens the corresponding second-layer page already built on this branch.
5. Back/Close returns to the same physical overview.
6. The overview itself does not display the second-layer detail panel inline.
7. The overview does not automatically load governed-object carrier state.
8. The original semantic graph/cables remain intact unless a separate ontology change is explicitly approved.
9. `npm run verify` passes.
10. A local screenshot comparison has been performed against the user's reference image.

After that, the next independent tasks are:

- specialized Publications page;
- deeper object-carrier integration;
- graph geometry hardening;
- responsive/accessibility polish;
- merge/rebase/squash strategy.

---

## 17. Short version for the agent

If you only retain five facts, retain these:

1. **Recover the screenshot UI; do not redesign it.**
2. **Test `d40db3` before assuming `31197e76` is the correct visual baseline.** `7f9dee` explicitly changed the material language in the direction of the current wrong screenshot.
3. **Make the existing physical blocks clickable; do not make the overview itself a detail/traversal app.**
4. **Keep all the specialized subsystem pages already built.** Route the blocks into them.
5. **Validate locally with `npm run verify` and screenshot comparison before further abstraction work.**

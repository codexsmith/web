# Implementation and design-history log

This is a compact chronology of the BF-UX website pass preserved in this folder. It records why each significant change appeared, including the useful failures that exposed the final interaction invariant.

## 1. Apparatus morphology exploration

The pass began by pushing the interface toward a full-screen industrial apparatus language: matte gunmetal, bounded frames, compact technical registers, serif subject titles, violet operator state, and restrained machine-state accents.

Early work was applied to the separate Apparatus prototype. That exposed an important implementation fact: the production `/?world=1` path was still using the **Card renderer**. The visual direction was useful, but changes scoped only to Apparatus were not visible in the active public shell.

Notable early commits:

- `1510f25b3781247bfd4e0830765817e05ccb1fa3` — sleek Apparatus refinement.
- `016c1d290ec532bef99227550adf12ecb3ceb30e` — Apparatus World root composition.

### Lesson

A visual prototype and the active production projection must not be conflated. The design was moved into the active Card renderer rather than changing the routing contract merely to expose the prototype.

## 2. Production Card root control board

The root World was translated into the apparatus grammar in the active Card renderer.

The five canonical regions became the primary machine assemblies:

- Public Interest;
- Products;
- Publications;
- About;
- Research.

The design used the generated root-apparatus concept as a morphology reference but deliberately omitted illustrative metrics and dead controls that were not backed by real application state.

Notable commit:

- `05b006028ab3b21f60cd94da3153cf7e61798810` — refine Card World root control board.

## 3. Secondary World control board

Secondary branch and leaf pages were brought into the same visual system while preserving the existing content model.

`SubjectPane` remained the progressive-disclosure mechanism:

- At a glance;
- current standing / immediate context;
- Continue from here;
- More context;
- More paths.

Notable commit:

- `5715f86658d1b8a2da295dd5c9f63c9fc18b7a53` — refine secondary World control board.

## 4. Local navigation instrument

The existing sibling menu was made more explicitly structural: chassis, trace-like spine, terminals, compact inset controls, and active violet focus.

Notable commits:

- `503834af64c6c422c18296b16845d2ebb22ee1cf` — local navigation instrument morphology.
- `bc0a852d7efea27e5c28a178df49991d339052b6` — load the refinement.

At this stage the design still treated the problem primarily as visual hierarchy.

## 5. Boundary Tree / Trace / Adjacent Options experiment

The generated apparatus mockup showed three apparently useful navigation projections:

1. Boundary Tree;
2. Traversal History;
3. Sibling / Adjacent Options.

The implementation separated them semantically. This was logically accurate, but the resulting rail was too complicated and disjointed. It made sense to someone who already knew the model, but did not communicate the model by itself.

### Lesson

Correctly decomposed data can still create incorrect UX if implementation distinctions are exposed as separate user concepts.

## 6. Unified recursive traversal tree

The three sections were recombined into one nested structure. The current route became the highlighted branch through the containment tree, while sibling branches remained visible around it.

Notable commits from this phase include:

- `dec0f08500ca8e4d9d7aeb6a6dd0184e02f537d0` — unify navigation into one recursive tree.
- `049899b5abbe0e5dbe0d056d8da463e6c4c80d42` — unify visual morphology.

This was closer, but still retained a site-map assumption: if the hierarchy was visible, it was tempting to make arbitrary known nodes navigable.

## 7. The traversal invariant becomes explicit

The design question was reframed:

> The nav has two functions: tell the user where they have been, and tell the user where they can go next.

The purpose is to avoid discontinuous navigation. Ordinary movement should remain local to the current bound rather than exposing the entire address space.

This yielded the canonical formulation:

> **Navigation is graph traversal, not address selection.**

The abstract local neighborhood was expressed as parent / siblings / children, while Back / Forward remained a temporal replay channel.

The implementation was updated so local structural moves append to traversal history instead of rewriting it, while Search establishes a new traversal context.

A representative implementation head from this phase was:

- `f242f2dee25122864bf993cb57a28df773dd106e`.

The BF-UX doctrine was also preserved separately in the Boundary First Labs repository; this website packet records the concrete web projection.

## 8. Rail simplification: remove Up and Down

The next refinement recognized duplicated affordances:

- **Up** was already represented by the realized trace and temporal Back behavior.
- **Down** duplicated the child actions already rendered on the page.

The rail was therefore reduced to:

1. traversal history;
2. current focus;
3. same-level alternatives.

The words/arrows `Up`, `Across`, and `Down` disappeared. Peer buttons no longer need the user to learn a navigation taxonomy.

Notable commits:

- `af033bab0ea9287a579a000875076df785b259bc` — simplify traversal component.
- `8fbdbf4892a294ef2ec92cc1cd3abdb219c07d90` — simplify traversal morphology and bounded history.

## 9. Bounded, auto-following trace history

Long traversal histories were pushing the rest of the rail off-screen.

The history became its own bounded viewport. When traversal advances, the viewport follows the newest entries. This preserves history without allowing history length to dominate current choices.

The rail itself subsequently became content-sized rather than a full-height wall.

## 10. Small-screen editorial projection

The phone layout was reconsidered as a separate representation rather than a compressed desktop board.

At small widths the content now behaves more like a newspaper:

- title / masthead;
- deck;
- lead context;
- sections beneath;
- reduced card chrome;
- compact navigation furniture.

The invariant stays the same while the geometry changes.

## 11. Landing-page BF-UX threshold

The landing page was updated to feel like the threshold of the same machine rather than a separate marketing site.

Its semantics remain intentionally narrow:

- one institutional identity;
- one proposition: `Software for difficult systems.`;
- one transition: `Enter the lab`;
- an Outside → Boundary → Inside register;
- a representation loop used as an instrument rather than decorative art.

Notable commits:

- `00732a0ecc75d2e3521874259fd73873235dc6cf` — strengthen landing structure.
- `569f5d2f69c7c28ccafacda78b668db1c1d87f33` — BF-UX visual refinement.
- `b0ca8cc2eb31c07bd4efd1f28e844a30f8777bde` — load landing refinement.

## 12. Secondary World top-first correction

A Products screenshot exposed a remaining layout error. The branch title was still living in a narrow vertical column, while the region field occupied a tall right column.

The correct desktop interpretation is **top-first**, not simply vertical:

- title across the complete working width;
- subject / At-a-glance beneath-left;
- contained regions beneath-right.

At the same time the traversal rail stopped stretching to the bottom of the viewport when its content was short.

Notable commits:

- `4f7a83521386097af7cd8d9fb5d75572d16dc5ba` — desktop spatial-flow correction.
- `05d71e39a6a74424b5d8a27e15fa6afd7117831e` — load the refinement.

## 13. Remove explanatory chrome

Once the rail structure had stabilized, repeated labels became noise.

Removed:

- `Where you have been · nearby choices`;
- `Where you have been`;
- `Where you can go next`.

Retained:

- `Traversal`;
- semantic ARIA labels for assistive technology.

Notable commit:

- `2b3b736a451f3819e25abc010d50ef7361b5954f`.

## 14. Narrow rail and unify internal coordinates

A final screenshot showed that reducing the outer rail width was not enough. The trace spine, current focus card, and sibling controls each carried their own indentation, effectively charging the interface twice for hierarchy.

The final refinement in this archived pass:

- reduces desktop `--frame-left` to `clamp(196px, 15vw, 232px)`;
- tightens header and flow padding;
- moves the trace spine close to the chassis edge;
- aligns history, current focus, and peer controls to one compact content column;
- avoids a permanently reserved scrollbar gutter.

Notable commits:

- `e630a5236629d96094336997e186e0fab1c9bc32` — tighten traversal rail width.
- `ce04350bad2dd28546a3500754ac3d73a95af2c5` — tighten traversal rail geometry.

## Result of the pass

The visual form became simpler as the underlying interaction model became more rigorous.

The rail no longer attempts to explain every navigation concept. It embodies one continuity object:

```text
history
  │
current
  │
peers
```

The page itself owns descent into contained material.

That is the strongest result of this pass: the interface increasingly communicates the system by **constraining and arranging interaction**, rather than by adding labels that describe the system after the fact.

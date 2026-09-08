# Composable Patchbay and Physical Grammar v0.1

**Status:** Proposed companion specification  
**Date:** 2026-08-25  
**Parent:** [Boundary First Labs Playground, Satire, Audio & Interactive UX v0.1](./README.md)  
**Related interaction pass:** [Pass 15 — Interaction Memory & Sandbox UX](../15_bfl_interaction_memory_sandbox_ux_v0_1/)  
**Related runtime posture:** [PlayHTML Runtime Posture v0.1](../15_bfl_interaction_memory_sandbox_ux_v0_1/playhtml_runtime_posture_v0_1.md)

## 1. Decision

The Playground should include a first-class **composable patchbay sandbox** for playful browser-native construction.

The interaction model is a hybrid of:

- modular synthesizer;
- Lego / Lego Technic;
- industrial control panel;
- patch bay;
- circuit bench;
- node editor;
- collaborative whiteboard;
- Rube Goldberg machine.

The important distinction from an ordinary node editor is that the user should not primarily manipulate programming abstractions. They should manipulate **bounded objects, ports, channels, transforms, controls, observables, panels, and assemblies**.

A useful public shorthand is:

> **Patch the web together.**

The sandbox is explicitly allowed to be silly. Its machinery should nevertheless be structurally rigorous enough to demonstrate Boundary First UX and representation-agnostic transformation in executable form.

## 2. Product thesis

A webpage, simulation, music generator, shader, calculator, API, shared PlayHTML element, timer, visualization, or other digital object can be treated as a bounded component with an interface.

The sandbox exposes those interfaces as a tactile grammar.

Instead of requiring a user to think:

> Instantiate a transformation node and bind its output schema.

The environment should allow the user to think:

> That plug looks like it should fit over there.

This turns formal interface semantics into an explorable physical metaphor.

The deeper thesis is:

```text
bounded objects
+ typed observables
+ admissible transformations
+ shared state
+ multiple projections
= composable web
```

## 3. Boundary capsule

Every composable object should admit a normalized conceptual representation such as:

```text
C = (R, S, I, O, T, P)
```

where:

- `R` = current representation / projection;
- `S` = state;
- `I` = admissible inputs;
- `O` = observable outputs;
- `T` = available transformations;
- `P` = permissions / capabilities.

This is not necessarily the literal runtime type. It is the design contract used to keep components representation-agnostic.

A wire should not mean:

```text
DOM element A -> DOM element B
```

It should mean approximately:

```text
observable output contract
-> transformation
-> admissible input contract
```

That distinction is central to the feature.

## 4. Physical Boundary First UX grammar

The Playground should make the existing physical / industrial Boundary First UX language semantic rather than decorative.

| Physical grammar | Boundary meaning |
| --- | --- |
| chassis / box | bounded object |
| port / jack | admissible interface |
| cable / pipe | transport channel |
| patch panel | composable interface surface |
| access panel | inspect internals or change representation |
| valve | constrain or gate flow |
| adapter | representation transformation |
| meter / gauge | observable state |
| fuse / breaker | admissibility, safety, or invariant constraint |
| junction | fan-in / fan-out |
| bus | shared channel |
| terminal block | explicit named binding |
| window | projection into otherwise opaque state |
| seal | inaccessible boundary |
| trace | provenance / interaction history |
| wear marks | accumulated interaction history |

The visual metaphor must continue to carry real information when simplified for production UI.

A pipe has ports because something can cross its boundary. A meter observes without necessarily controlling. A valve changes admissibility. An access panel reveals another projection of the same object. A sealed chassis advertises opacity.

## 5. Small universal piece families

Prefer a small grammar over a giant catalogue of bespoke component classes.

Initial universal families:

1. **Containers** — hold state or machinery.
2. **Ports** — admit or emit values, events, streams, or references.
3. **Channels** — transport between ports.
4. **Transforms** — change representation, units, range, or schema.
5. **Controls** — change behavior or admissibility.
6. **Observables** — expose state without requiring mutation.
7. **Assemblies** — saved compositions that become new components.

Everything else should specialize these objects.

## 6. Ports and typed patching

A component might expose:

```text
GENERATIVE MUSIC

in:
  tempo       number
  notes       midi[]
  intensity   0..1
  trigger     event

out:
  beat        event
  amplitude   0..1
  note        midi
  status      text
```

A cellular automaton might expose:

```text
CELLULAR AUTOMATON

in:
  seed        integer
  step        event
  density     0..1

out:
  population  integer
  image       bitmap
  entropy     number
  boundary    event
```

A user can then construct:

```text
cellular.population
        |
        v
     normalize
        |
        v
music.tempo

cellular.boundary
        |
        +------------> music.trigger
```

The UI should make direct compatibility obvious and make non-direct compatibility discoverable through adapters.

## 7. Adapters as tactile type transformations

If two ports do not directly fit, the environment may offer an adapter.

Example:

```text
[TEMPERATURE]
      o
      |
      v
[adapter]
Celsius -> normalized scalar
      |
      v
      o
[SYNTH FILTER]
```

Adapters should make important transformation properties legible:

- exact versus lossy;
- reversible versus irreversible;
- unit conversion;
- range mapping;
- schema mapping;
- event-to-value or value-to-event conversion;
- buffering / sampling;
- aggregation / splitting;
- uncertainty or inference.

A lossy conversion can look like a reducer. An inferred conversion can look provisional. An invariant violation can trip a breaker. The physical grammar should make formal consequences visible.

## 8. Patch envelope

Transported values should have a normalized envelope sufficient for inspection, conversion, provenance, and safe composition.

Candidate fields:

```text
value
kind / type
schema
units
timestamp
source
provenance
permissions
representation
confidence / uncertainty (when applicable)
```

Example:

```json
{
  "type": "scalar",
  "value": 0.72,
  "units": "normalized",
  "source": "life.population",
  "representation": "number"
}
```

This should not be overbuilt before prototypes establish what is necessary. The important requirement is that values retain enough semantic identity to support admissible transformation rather than becoming untyped wires.

## 9. Ask: "What can this become?"

A signature Boundary First UX interaction should be transformation discovery.

The user grabs an output such as:

```text
population
```

and asks, explicitly or implicitly:

> **What can this become?**

The environment can expose reachable representations:

```text
NUMBER
|- tempo
|- pitch
|- opacity
|- hue
|- rotation
|- scale
|- probability
|- coordinate
`- text
```

This moves the interaction model beyond socket matching.

The user is traversing an **admissible representation space**.

## 10. One composition, many projections

The canonical object is the composition, not any one rendering of it.

The same machine should be projectable as multiple interfaces.

### Patch cables

```text
[ MUSIC ] --beat--o--------o--step-- [ LIFE ]
```

### Recipe

```text
Whenever MUSIC emits a beat,
advance LIFE by one generation.

Map LIFE.population from [0,1000]
onto MUSIC.tempo from [60,180].
```

### Table

| Source | Observable | Transform | Target | Input |
| --- | --- | --- | --- | --- |
| Music | beat | identity | Life | step |
| Life | population | normalize | Music | tempo |

### Code

```js
wire(life.population)
  .map(normalize(0, 1000))
  .to(music.tempo)
```

### Rube Goldberg projection

```text
note
  -> marble falls
  -> gear rotates
  -> automaton advances
  -> palette changes
  -> chord changes
```

These are projections of one underlying structure. Changing one valid projection should update the same underlying object rather than forking unrelated representations.

## 11. Access panels and representation switching

A component chassis can expose an access panel containing alternate projections:

```text
REPRESENTATION

(*) Controls
( ) Graph
( ) State
( ) JSON
( ) Code
( ) Trace
( ) Raw
```

The chassis remains the same bounded object while the faceplate changes.

This makes an important Boundary First proposition executable:

```text
object != representation of object
```

The Playground should use this aggressively because it can teach the design language through play rather than documentation.

## 12. Recursive assembly: composition -> closure -> new object

A successful composition should be closable into a reusable module.

Example internal assembly:

```text
clock
-> modulo
-> note mapper
-> synth
```

The user selects the assembly and chooses **MAKE MODULE**.

It becomes:

```text
+-----------------+
| CLOCK MELODY    |
|                 |
| speed o         |
|         o audio |
+-----------------+
```

The internal composition remains inspectable through its access panel, but a new outer boundary now defines a composable object.

This is the recursive UX kernel:

```text
composition
-> closure
-> new object
-> composition
-> closure
-> ...
```

The Lego metaphor is therefore structural, not merely visual: assemblies become new bricks.

## 13. Opaque, cooperative, and native integrations

Arbitrary third-party webpages cannot be assumed to expose controllable internals. The sandbox should make this boundary explicit rather than pretending the browser security model does not exist.

Use a three-level posture:

### Level 0 — Opaque

```text
arbitrary iframe / external object
```

- view/embed only when framing policy permits;
- internals remain sealed;
- no claim that BFL can inspect or control cross-origin state.

### Level 1 — Cooperative

```text
external website <-> declared message interface
```

- explicit `postMessage`-style adapter or comparable cooperative bridge;
- named ports;
- declared schema and capability contract;
- explicit origin validation.

### Level 2 — Native

```text
BFL / compatible component / PlayHTML-aware object
```

- normalized state contract;
- ports;
- transforms;
- traces;
- representation switching;
- richer shared-state semantics.

The restriction is philosophically useful:

> **A boundary stays opaque unless the thing on the other side deliberately exposes an interface.**

## 14. PlayHTML role

PlayHTML is useful as collaboration and lived-in-web machinery, not as the complete semantic model.

Candidate division of responsibility:

```text
PLAYHTML
|- multiplayer presence
|- persistent/shared spatial state
|- collaborative manipulation
|- shared events
`- "this thing is alive"

BOUNDARY FIRST UX
|- object identity
|- boundary semantics
|- ports and contracts
|- admissibility
|- transformations
|- representation switching
|- provenance
`- composition semantics

PATCHBAY
`- playful composition of the two
```

The system should remain capable of replacing or self-hosting runtime infrastructure later. Provider/runtime identifiers should not become the canonical identity of a Playground object.

## 15. Play examples

The sandbox should ship with a few intentionally memorable example machines.

### Collaborative Theremin

```text
visitor X position -> pitch
visitor Y position -> filter
visitor count      -> harmony voices
visitor distance   -> reverb
```

### Conway Orchestra

```text
Game of Life
-> population
-> mapper
-> MIDI / synthesis
-> visualization
```

### Extremely Unnecessary Clock

```text
clock
-> pendulum
-> marble
-> dominoes
-> cellular automaton
-> calculator
-> seven-segment display
-> current time
```

### Internet Rain Machine

```text
shared cursor movement
-> particle velocity
-> rain intensity
-> drum density
-> visual distortion
```

The examples should demonstrate the grammar, not merely entertain.

## 16. Interaction and accessibility requirements

The Playground may be visually expressive, but the interaction contract remains serious.

- Primary composition must work by click/tap without hover-only controls.
- Dragging should have a keyboard/non-drag alternative for essential actions.
- Ports must have readable names and machine-readable contracts.
- Connections must not rely on color alone.
- Motion respects reduced-motion preferences.
- Audio never autoplays as a navigation requirement.
- A composition should have a textual or tabular projection where practical.
- Invalid connections should explain why they are invalid.
- Adapter insertion should be reversible.
- Users should be able to inspect what data/state crosses a boundary.
- Shared state must remain distinct from canonical research state.

## 17. Visual posture

The Playground is the place where the Boundary First physical grammar can be exaggerated enough to be learned.

Possible treatments:

- patch cords with slight sag;
- pipes with visible direction/flow;
- opening service panels;
- terminal blocks;
- blinking activity indicators;
- meters and gauges;
- wear patterns showing interaction history;
- temporary jumper wires for provisional/inferred connections;
- cables visibly leaving a chassis for external dependencies.

The serious BFL product surfaces can use a restrained descendant of this grammar.

A useful rule:

> **The Playground gets to show the grammar with the casing removed.**

## 18. Suggested implementation slices

### Slice A — local patchboard

- 4–6 native toy components;
- typed ports;
- cable creation/removal;
- scalar/event transforms;
- live meters;
- no remote iframes required.

### Slice B — alternate projections

- patchboard view;
- table/recipe view;
- trace view;
- access-panel representation switching.

### Slice C — recursive modules

- select assembly;
- define exposed ports;
- close as module;
- reopen internals;
- compose module into another machine.

### Slice D — collaboration

- shared cursor/presence;
- shared component placement/state;
- collaborative patch editing;
- provenance for participant actions.

### Slice E — cooperative external adapters

- one intentionally compatible embedded/web component;
- explicit message contract;
- origin validation;
- visible sealed-versus-open boundary treatment.

Do not begin with arbitrary-web automation. Prove the object/port/transform grammar locally first.

## 19. Acceptance criteria

- A visitor can create a machine without writing code.
- Components visibly communicate boundedness and interface surfaces.
- Inputs and outputs are semantically typed rather than anonymous sockets.
- At least one incompatible connection can be made admissible through an explicit adapter.
- Users can inspect the value/event crossing a connection.
- One composition can be viewed through at least two materially different projections.
- An assembly can be closed into a new reusable module with exposed ports.
- The closed module can be reopened without losing its internal structure.
- Opaque external objects are visibly distinct from cooperative/native objects.
- Collaborative state does not silently mutate canonical BFL research objects.
- The system remains useful without PlayHTML or any one third-party runtime provider being canonical.
- Keyboard/touch users can complete the primary patching workflow.

## 20. Non-goals

This specification does not authorize:

- bypassing browser same-origin or framing protections;
- scraping/manipulating arbitrary third-party iframe internals as if they were native components;
- hiding data transformations behind visually cute wires;
- making a generic Node-RED clone;
- treating the graph view as the only canonical interface;
- coupling component identity to DOM structure;
- coupling canonical objects to a single multiplayer provider;
- making play dependent on audio, animation, pointer drag, or high-end hardware;
- treating every possible conversion as admissible;
- obscuring lossy, inferred, uncertain, or unsafe transformations.

## 21. Design statement

The Playground should allow a visitor to learn Boundary First UX almost accidentally:

```text
ports connect things
pipes carry things
adapters change things
gauges show things
panels reveal things
switches constrain things
assemblies become things
```

The result is not only a playground feature. It is a compact executable demonstration of the larger Boundary First claim that systems become easier to reason about when their boundaries, admissible interfaces, transformations, and projections are made explicit.

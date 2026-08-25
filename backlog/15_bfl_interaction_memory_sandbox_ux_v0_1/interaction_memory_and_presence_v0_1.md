# Interaction Memory and Presence v0.1

## Purpose

Define how the Boundary First Labs website can become visibly inhabited without becoming a social network or surveillance surface.

The central idea is that interaction leaves bounded, legible traces in the interface. Those traces operate at three timescales: personal history, collective history, and live presence.

## Core distinction

```text
structure + state + agency + history
```

These must remain separate visual channels.

- Structure belongs to the industrial material/chassis.
- State belongs to the machine-state palette.
- Current agency belongs to the interaction/accent layer.
- History belongs to wear, polish, scoring, crosshatch, and accumulated material texture.

This preserves the existing visual grammar while adding temporal depth.

## Personal history

Personal wear represents the user's own accumulated relationship with an object.

It should not be a literal click counter. Candidate signals include:

- distinct visits;
- repeated returns over time;
- amount of the object meaningfully exposed in viewport;
- expansion of evidence, derivations, notes, or references;
- transfer to sandbox;
- annotation;
- related-object traversal;
- interaction with experiments or figures.

Candidate visual progression:

```text
first meaningful encounter -> single fine score
repeated encounter          -> additional machining marks
deep use                    -> crosshatch / denser local wear
long-term familiarity       -> settled worn finish
```

Wear should be subtle enough that a new user sees a clean apparatus while a returning user sees a machine that increasingly reflects their own history.

## Collective history

Collective wear represents accumulated anonymous use across visitors.

Examples:

- a frequently traversed relation becomes slightly polished;
- a common research path becomes a visible desire path;
- a heavily inspected section gains material wear in its rail or marker;
- commonly used controls become burnished at contact points;
- rarely traversed regions remain comparatively untouched.

Collective wear is navigational evidence, not quality ranking.

Do not map collective traffic directly onto publication importance, evidence strength, or epistemic maturity.

## Live presence

Live presence should expose current activity at the level of meaningful objects and domains.

Preferred representations:

```text
paper                    2 here
section                   1 here
experiment                active
shared board              3 participants
claim / node              being inspected
```

Avoid default collaborative cursor clouds on ordinary reading surfaces.

Presence should answer useful questions:

- Is anyone else here?
- Where in this object is current activity concentrated?
- Is this experiment being manipulated?
- Is this board actively shared?

It should not answer invasive questions by default:

- Who exactly read this?
- How long did a named individual stay?
- What was their entire path?
- Where are they geographically?

## Section awareness

Paper-section presence can be derived from viewport visibility rather than cursor position.

A browser observer can classify a section as currently exposed when a meaningful portion of it is visible. The UX language should therefore say things like:

- `1 here`
- `someone is viewing this section`

and should not say:

- `someone is reading this section`
- `someone understands this section`

The system reports observable interaction state, not inferred cognition.

## Social translucence

The default public posture should be anonymous and coarse.

Good defaults:

- occupancy counts;
- section-level presence;
- aggregate historical wear;
- human/machine type distinction where needed;
- explicit opt-in identity in collaborative rooms.

The goal is to create awareness and a sense that the Lab is inhabited while preserving a strong privacy boundary.

## Desire paths

The research graph can develop visible historical paths.

Example:

```text
[Paper A] ---- [Paper B]
    
     ======== [Paper C]
```

The emphasized path should look materially used rather than algorithmically promoted.

Desired semantics:

> many people have passed this way

Avoid semantics such as:

> recommended
> trending
> top content

This allows social navigation without importing engagement-maximization mechanics.

## Encounter states

A small set of restrained live interactions may be useful:

- `another operator is here` when two visitors reach the same deep object;
- a faint remote-inspection tick on a graph node;
- a temporary path ghost showing current traversal through a relation;
- explicit `follow` behavior only inside shared/collaborative contexts;
- machine-agent presence represented with a distinct type marker rather than masquerading as a human.

## Wear storage

Personal wear requires first-party application state rather than CSS `:visited` styling because rich visual changes should not depend on restricted browser history selectors.

Potential storage tiers:

- local anonymous device/browser state;
- synced account state later;
- aggregate anonymous server-side counters for collective wear;
- ephemeral presence state for current occupancy.

The implementation must keep these layers independently erasable and independently governable.

## Visual constraints

Wear should primarily affect:

- microtexture;
- edge polish;
- local crosshatch/scoring;
- machining density;
- subtle roughness/finish changes;
- route thickness or polish.

Wear should generally not affect:

- semantic status color;
- typography meaning;
- destructive/valid/warning signals;
- canonical object type.

## Accessibility

Wear is supplemental information.

Any functional meaning carried by history or presence must have a non-texture alternative such as:

- label;
- count;
- accessible description;
- history panel;
- route metadata.

Do not rely on low-contrast texture, color, or animation alone.

Reduced-motion mode should preserve state without pulses or path animation.

Forced-colors/high-contrast mode should retain occupancy and history through structural markers rather than subtle material effects.

## Acceptance criteria

- Personal, collective, and live layers are distinguishable.
- Presence is meaningful at object/domain level rather than raw pointer level on normal reading surfaces.
- No history layer implies epistemic quality or popularity ranking.
- Public presence is anonymous/coarse by default.
- Wear is supplemental to accessible textual/structural cues.
- Machine and human presence can be visibly typed.
- The system never claims cognitive attention from mere viewport visibility.
- Visual history remains compatible with the existing industrial material grammar.

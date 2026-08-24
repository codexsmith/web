# Boundary-First Chess Practitioner Decision-Board Contract

## Purpose

Boundary-First Chess is a practitioner doctrine rendered inside the canonical Boundary First world. The third-layer surface is a decision instrument for reading a position before committing to calculation, not a replacement chess client, engine, opening database, or claim of a new chess theory.

The representation must preserve the concrete rules and facts of chess while making state constraints, reachable continuations, pressure, responsibility, defects, and repair easier to inspect.

## Core invariant

> A practitioner decision surface must make it easier to connect a candidate action to the future state it creates without allowing the explanatory vocabulary to outrank the domain's established truth conditions.

## Representation laws

### 1. Position precedes move score

A candidate move is not represented as an isolated value. The surface must keep visible the constraints and future state admitted by the move, including king safety, reachability, pressure, continuation, and repair/conversion burden.

### 2. Legality is necessary, not sufficient

Legal moves remain bounded by tactical and strategic consequences. The interface must distinguish what is legally available from what remains viable after the opponent's strongest reply.

### 3. Calculation remains authoritative for concrete lines

Boundary-First vocabulary may direct attention and structure explanation, but it does not replace calculation, tablebases, engine analysis, or established chess facts.

### 4. Commitment is progressive

The five passes remain ordered:

1. Bound the position.
2. Map reachable pressure.
3. Generate candidate transitions.
4. Preserve continuation.
5. Convert or repair.

A later pass must not erase an earlier failed constraint.

### 5. Consequence is reply-aware

A candidate move must be represented together with the opponent's strongest relevant answer. Apparent gain cannot be promoted merely because the first transition looks favorable.

### 6. The worked example remains illustrative

The material-win / overloaded-defender pattern is a constructed teaching example. It may demonstrate the doctrine's reading method, but it is not an engine-validated benchmark position and cannot be presented as empirical proof.

### 7. Established chess remains the external witness

The terminal validation condition is agreement with the actual position as understood through established chess analysis. Boundary-First terminology cannot override board facts.

### 8. Teaching claims require evidence

Explanatory fit to familiar motifs does not establish better candidate selection, rating improvement, tournament performance, coaching superiority, or pedagogical transfer. Comparative performance claims require controlled evidence.

### 9. Existing concepts are not renamed into novelty

If established tactical, positional, endgame, or coaching concepts already explain a position sufficiently, the Boundary-First representation must acknowledge that rather than claiming necessity.

### 10. Responsive projection preserves decision order

Desktop may use a spatial board-like instrument. Compact projections must preserve the same semantic order as a readable sequence rather than shrinking the apparatus into illegible tiles.

## Required surface regions

The specialized Chess surface must expose:

- doctrine standing and return-to-object control;
- the state-transition definition and decision rule;
- six position-lens dimensions;
- a current-state / reachable-futures core;
- the five ordered commitment passes and their outputs;
- the worked material-gain consequence trace;
- the constructed-example / non-benchmark boundary;
- validation targets;
- established chess analysis as the external truth condition;
- current built evidence;
- safe present claims;
- not-yet-established claims.

## Non-goals

This surface does not claim to provide:

- a playable chess board;
- legal move generation;
- engine evaluation;
- opening-book authority;
- tablebase truth;
- tournament preparation;
- rating prediction;
- superiority over established coaching systems.

## Accessibility

Meaning must not depend on board color, accent color, hover, animation, or spatial arrangement alone. Forced-colors and compact layouts must preserve stage labels, consequence order, standing, and external validation conditions.

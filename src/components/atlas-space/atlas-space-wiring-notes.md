# Atlas Space wiring pass

The layered atlas is modeled as a rack of local chart boards connected through a typed rear backplane rather than by arbitrary point-to-point graph edges.

Routing contract:

1. A local concept terminates at a front-side jack on its atlas board.
2. A board trace carries that channel to a numbered edge contact.
3. The edge contact joins one standardized rear-backplane channel.
4. The same channel may terminate on corresponding local concepts on other boards.
5. Connector geometry communicates routing semantics:
   - THR: continuous structural through-channel.
   - KEY: keyed / gated correspondence whose admissibility matters.
   - TST: removable diagnostic jumper for provisional correspondence.
6. A backplane channel is a correspondence claim, never an identity claim.

The visual hierarchy should remain machine-like but sparse: internal traces are subdued, the selected channel is strongly illuminated, and the backplane makes the cross-layer topology legible without cable spaghetti.

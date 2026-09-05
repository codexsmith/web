# Lab Machine interaction structure

The physical Lab Machine has five explicit DOM/CSS layers:

- `viewport` — `.bf-machine__board`; fixed machine field and owner of pointer gestures.
- `pan-surface` — `.bf-machine__pan-surface`; paint-free hit surface covering the visible desktop field.
- `apparatus` — `.bf-machine__apparatus`; the only layer translated when the machine is repositioned.
- `node` — `.bf-machine-node`; semantic/clickable objects that move with the apparatus.
- `context` — status/legend readouts that do not participate in apparatus motion.

`lab-machine-structure.css` owns pointer, touch, selection, transform-layer, and decorative hit-target behavior. Visual composition files should not add new drag/pointer semantics.

Homepage auto-fit may choose the fixed `--world-machine-u` ruler once when the machine first mounts. It must not add a persistent scale transform or viewport-relative ruler: browser zoom owns whole-instrument scaling after initialization, and `.bf-machine__apparatus` owns the only interaction transform.

Pointer gestures belong to the fixed viewport. Empty space and machine nodes both begin a possible pan; movement beyond the drag threshold translates only the apparatus and suppresses the resulting click. An unmoved node click retains its normal navigation behavior, while buttons, links, and form controls remain dedicated interaction targets.

An apparatus attachment may request a one-time reveal after changing size. The viewport responds by panning only far enough to place that attachment between the fixed frame and legend; this never changes the machine ruler or introduces an autofit transform.

Resolution changes run the same containment rule against the apparatus itself. Horizontal and vertical corrections are applied together as one straight translation: right overflow becomes right-aligned, left overflow becomes left-aligned, and the corresponding top/bottom rule keeps the machine between the fixed frame and legend.

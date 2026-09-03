# Lab Machine interaction structure

The physical Lab Machine has four explicit DOM/CSS layers:

- `viewport` — `.bf-machine__board`; fixed machine field and future pan gesture surface.
- `apparatus` — `.bf-machine__apparatus`; the only layer translated when the machine is repositioned.
- `node` — `.bf-machine-node`; semantic/clickable objects that move with the apparatus.
- `context` — status/legend readouts that do not participate in apparatus motion.

`lab-machine-structure.css` owns pointer, touch, selection, transform-layer, and decorative hit-target behavior. Visual composition files should not add new drag/pointer semantics.

The current pointer implementation intentionally remains on the apparatus until the next gesture pass. The next drag implementation should attach to the fixed viewport, distinguish click from pan by movement threshold, translate only the apparatus, and preserve node clicks rather than excluding node subtrees from the gesture surface.

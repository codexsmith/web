import fs from "node:fs";

const files = {
  circuit: fs.readFileSync("src/components/process-circuit.tsx", "utf8"),
  gestalt: fs.readFileSync("src/components/gestalt-view.tsx", "utf8"),
  css: fs.readFileSync("src/app/p6-process-circuit.css", "utf8"),
  lensCss: fs.readFileSync("src/app/p6-lens-board-refinement.css", "utf8"),
  traversalCss: fs.readFileSync("src/app/p6-traversal-shelf-refinement.css", "utf8"),
  layout: fs.readFileSync("src/app/layout.tsx", "utf8"),
  spec: fs.readFileSync("docs/p6-process-projection-spec.md", "utf8"),
  shelfSpec: fs.readFileSync("docs/p6-traversal-shelf-contract.md", "utf8"),
};

const failures = [];
function expect(condition, message) {
  if (!condition) failures.push(message);
}

expect(files.gestalt.includes('import { ProcessCircuit } from "@/components/process-circuit"'), "GestaltView must use the dedicated ProcessCircuit projection");
expect(files.gestalt.includes("<ProcessCircuit placement={placement} scope={scope} />"), "Non-root process projection must render ProcessCircuit");
expect(files.layout.includes('import "./p6-process-circuit.css";'), "P6 process CSS must load after prior projection layers");
expect(files.layout.includes('import "./p6-lens-board-refinement.css";'), "Operating-lens refinement must load after the core P6 process circuit");
expect(files.layout.includes('import "./p6-traversal-shelf-refinement.css";'), "Traversal-shelf refinement must load after prior frame and P6 layers");

for (const zone of ["frame", "operate", "answer"]) {
  expect(files.circuit.includes(`id: "${zone}"`), `Process circuit must retain ${zone} zone`);
}

for (const stage of [
  "intake",
  "boundary",
  "representation",
  "hypothesis",
  "construction",
  "execution",
  "validation",
  "repair",
]) {
  expect(files.circuit.includes(`"${stage}"`), `Process circuit must place ${stage} inside a functional zone`);
}

expect(files.circuit.includes('stageById.get("promotion")'), "Promotion must be handled as a dedicated continuation dock");
expect(files.circuit.includes("<StewardshipDock"), "Promotion must render through StewardshipDock rather than an equal stage tile");
expect(files.circuit.includes("<ReturnRail />"), "Full/repair process context must expose a return path");
expect(files.circuit.includes("Method overlays · not process stages"), "Operating disciplines must remain explicitly typed as overlays");
expect(files.circuit.includes("processDisciplines.map"), "All six operating disciplines must remain represented");
expect(files.circuit.includes("visibleProcessStages(placement, scope)"), "Existing process scope semantics must drive the circuit");
expect(files.circuit.includes('<ol className="process-zone__stages">'), "Process stages must retain ordered-list semantics");

expect(files.circuit.includes('role="table"'), "Operating lenses must render through an explicit matrix/table semantic surface");
expect(files.circuit.includes('role="columnheader"'), "Operating-lens stage positions must have explicit column headers");
expect(files.circuit.includes('role="rowheader"'), "Each operating lens must retain explicit row identity");
expect(files.circuit.includes('participates ? "Applies" : "—"'), "Lens participation must use a visible binary semantic state rather than anonymous marks");
expect(!files.circuit.includes("process-lens__coverage"), "Anonymous pill coverage strips must not return");

for (const label of ["Intake", "Boundary", "Representation", "Hypothesis", "Construction", "Execution", "Validation", "Repair", "Promotion"]) {
  expect(files.circuit.includes(`${label}`), `Operating-lens axis must expose the full stage word ${label}`);
}
expect(files.circuit.includes("Current object ·"), "Current object placement must be stated separately from lens participation");
expect(files.lensCss.includes(".process-lens-axis__stage strong"), "Wide process lenses must expose a readable labeled stage axis");
expect(files.lensCss.includes("@media (max-width: 1180px)"), "Lens matrix must recompose before full stage words become cramped");
expect(files.lensCss.includes('.process-lens__cell[data-participates="true"]'), "Compact process lenses must retain explicit participation cells");
expect(files.lensCss.includes(".process-lens__cell-stage"), "Compact process lenses must repeat the full stage word inside each participating cell");

expect(files.css.includes("grid-column: 1 / 10"), "Desktop Frame zone must have deliberate spatial geometry");
expect(files.css.includes("grid-column: 10 / 13"), "Desktop Make & Operate rail must be structurally distinct");
expect(files.css.includes("grid-column: 4 / 10"), "Desktop Answer & Repair zone must be structurally distinct");
expect(files.css.includes("grid-column: 1 / 4"), "Desktop Stewardship dock must be structurally distinct");
expect(files.css.includes("@media (max-width: 1180px)"), "Process circuit must define a tablet recomposition");
expect(files.css.includes("@media (max-width: 820px)"), "Process circuit must define a compact zone recomposition");
expect(files.css.includes("@media (max-width: 560px)"), "Process circuit must define a mobile stepper projection");
expect(files.css.includes("@media (forced-colors: active)"), "Process circuit must preserve forced-colors semantics");
expect(files.lensCss.includes("@media (forced-colors: active)"), "Operating-lens matrix must preserve forced-colors semantics");

expect(files.traversalCss.includes("--trace-nav-shelf: 48px"), "Compact traversal shelf must remain within the 48px budget");
expect(files.traversalCss.includes(".traversal-nav__history"), "Traversal refinement must explicitly retire history from the horizontal shelf");
expect(files.traversalCss.includes(".traversal-nav__header"), "Traversal refinement must explicitly retire the redundant horizontal TRAVERSAL header");
expect(files.traversalCss.includes("@media (min-width: 981px) and (max-height: 560px)"), "Wide-but-shallow viewports must recompose the side rail into a shelf");
expect(files.traversalCss.includes("top: calc(var(--frame-top) + var(--trace-nav-shelf))"), "Content must begin immediately below the traversal shelf");

expect(files.spec.includes("repairable operating circuit"), "P6 process projection spec must record the governing circuit invariant");
expect(files.spec.includes("Promotion is not rendered as a ninth equal pipeline tile"), "Spec must forbid promotion from collapsing back into equal pipeline morphology");
expect(files.spec.includes("Mobile is a zone-grouped vertical stepper"), "Spec must record the compact recomposition law");
expect(files.shelfSpec.includes("single row"), "Traversal shelf contract must record the one-row invariant");
expect(files.shelfSpec.includes("history is not repeated inside the horizontal shelf") || files.shelfSpec.includes("Traversal history is not repeated inside the horizontal shelf"), "Traversal shelf contract must keep history transport in the top frame");
expect(files.shelfSpec.includes("wide-but-shallow"), "Traversal shelf contract must cover shallow landscape projection");

if (failures.length) {
  console.error("P6 process circuit contract failures:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("P6 process circuit contracts passed.");

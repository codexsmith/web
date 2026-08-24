import fs from "node:fs";

const files = {
  circuit: fs.readFileSync("src/components/process-circuit.tsx", "utf8"),
  gestalt: fs.readFileSync("src/components/gestalt-view.tsx", "utf8"),
  css: fs.readFileSync("src/app/p6-process-circuit.css", "utf8"),
  layout: fs.readFileSync("src/app/layout.tsx", "utf8"),
  spec: fs.readFileSync("docs/p6-process-projection-spec.md", "utf8"),
};

const failures = [];
function expect(condition, message) {
  if (!condition) failures.push(message);
}

expect(files.gestalt.includes('import { ProcessCircuit } from "@/components/process-circuit"'), "GestaltView must use the dedicated ProcessCircuit projection");
expect(files.gestalt.includes("<ProcessCircuit placement={placement} scope={scope} />"), "Non-root process projection must render ProcessCircuit");
expect(files.layout.includes('import "./p6-process-circuit.css";'), "P6 process CSS must load after prior projection layers");

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

expect(files.css.includes("grid-column: 1 / 10"), "Desktop Frame zone must have deliberate spatial geometry");
expect(files.css.includes("grid-column: 10 / 13"), "Desktop Make & Operate rail must be structurally distinct");
expect(files.css.includes("grid-column: 4 / 10"), "Desktop Answer & Repair zone must be structurally distinct");
expect(files.css.includes("grid-column: 1 / 4"), "Desktop Stewardship dock must be structurally distinct");
expect(files.css.includes("@media (max-width: 1180px)"), "Process circuit must define a tablet recomposition");
expect(files.css.includes("@media (max-width: 820px)"), "Process circuit must define a compact zone recomposition");
expect(files.css.includes("@media (max-width: 560px)"), "Process circuit must define a mobile stepper projection");
expect(files.css.includes("@media (forced-colors: active)"), "Process circuit must preserve forced-colors semantics");

expect(files.spec.includes("repairable operating circuit"), "P6 process projection spec must record the governing circuit invariant");
expect(files.spec.includes("Promotion is not rendered as a ninth equal pipeline tile"), "Spec must forbid promotion from collapsing back into equal pipeline morphology");
expect(files.spec.includes("Mobile is a zone-grouped vertical stepper"), "Spec must record the compact recomposition law");

if (failures.length) {
  console.error("P6 process circuit contract failures:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("P6 process circuit contracts passed.");

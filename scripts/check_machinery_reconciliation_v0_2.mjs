import fs from "node:fs";

function read(path) { return fs.readFileSync(path, "utf8"); }
function requireText(source, value, message) {
  if (!source.includes(value)) throw new Error(message + ": " + value);
}

const snapshot = read("src/components/institutional/content/labSnapshot.ts");
const machinery = read("src/components/institutional/content/machinery.ts");
const snapshotCss = read("src/components/institutional/styles/LabSnapshotRow.module.css");
const home = read("src/components/institutional/InstitutionalHomePage.tsx");
const research = read("src/components/institutional/InstitutionalResearchPage.tsx");
const apparatus = read("src/components/institutional/InstitutionalApparatusPage.tsx");
const openLab = read("src/components/institutional/InstitutionalOpenLabPage.tsx");
const diagram = read("src/components/institutional/RegistrarArchitectureDiagram.tsx");

requireText(snapshot, 'value: "8"', "Snapshot must expose eight stable machines");
requireText(snapshot, 'label: "stable machines"', "Snapshot must label maturity correctly");
requireText(snapshot, 'value: "40"', "Snapshot must disclose machinery families");
requireText(snapshot, 'value: "12"', "Snapshot must disclose registered machines");
requireText(snapshot, 'label: "operating functions"', "Snapshot must preserve operating-function semantics");
if (snapshot.includes("core machines")) throw new Error("Snapshot must not collapse stable maturity into 'core machines'");

const machineIds = machinery.match(/"machineId":/g) ?? [];
if (machineIds.length !== 12) throw new Error("Expected 12 projected machinery records, found " + machineIds.length);
requireText(machinery, "BFL-MACH-AGENT-CONTROL", "Agent Control must be projected");
requireText(machinery, "BFL-MACH-ARCHITECTURE-OBSERVATORY", "Architecture Observatory must be projected");
requireText(machinery, '"sourceStatus": "human_reviewed_reconciliation_v0_2"', "Projection must identify v0.2 source status");
requireText(snapshotCss, "repeat(8, minmax(180px, 1fr))", "Stable machine rail must support eight cards");
requireText(home, "<MachineryDetailSurface />", "Home must expose progressive machinery detail");
requireText(research, 'variant="research-lane"', "Research must reuse Research Lane anatomy");
requireText(apparatus, 'variant="apparatus-stack"', "Apparatus must reuse apparatus layer stack");
requireText(openLab, 'variant="public-projection"', "Open Lab must reuse public projection pipeline");

for (const variant of ["registrar-overview","core-relationships","public-projection","research-lane","apparatus-stack"]) {
  requireText(diagram, '"' + variant + '"', "Missing architecture diagram variant");
}

console.log("machinery reconciliation v0.2 contracts: pass");

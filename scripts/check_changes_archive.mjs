import fs from "node:fs";

function read(path) { return fs.readFileSync(path, "utf8"); }
function requireText(source, value, message) {
  if (!source.includes(value)) throw new Error(message + ": " + value);
}

const changes = read("src/components/institutional/content/changes.ts");
const explorer = read("src/components/institutional/ChangesExplorer.tsx");
const page = read("src/components/institutional/InstitutionalChangesPage.tsx");
const strip = read("src/components/institutional/RecentChangesStrip.tsx");

requireText(changes, 'generatedDate: "2026-09-23"', "Changes projection must carry the archive build date");
requireText(changes, 'webRevision: "0944f1352f12cc1a9a2ec395feb5172217474aee"', "Changes projection must bind the canonical web head");
requireText(changes, 'labRevision: "f5b8b063349bdf92fb8f5f138df52fcf4482b0ee"', "Changes projection must bind the canonical Lab head");
requireText(changes, "export const historicalChanges", "What Changed must preserve an earlier milestone archive");
requireText(changes, "export const allChanges", "What Changed must expose the combined archive");
requireText(changes, 'sourceLabel: "Initial temporal state and Lab Through Time surfaces"', "Temporal launch must retain exact commit provenance");
requireText(changes, 'sourceLabel: "Promote canonical Lab Timeline Register"', "Timeline registry milestone must retain exact commit provenance");
requireText(changes, 'sourceRevision: "32b5b832344121fd7e18c00ed4b484e183f28fef"', "Archive must reach the first public architecture milestone");
requireText(changes, 'sourceRevision: "38d1b012fcc56b8fb2119a3a819a19d2c7c7255f"', "Archive must retain Paper Mine launch history");

requireText(explorer, "CURRENT WINDOW", "Explorer must distinguish current deltas");
requireText(explorer, "EARLIER MILESTONES", "Explorer must expose historical backfill");
requireText(explorer, "change.sourceLabel", "Explorer must show the source commit subject");
requireText(explorer, "change.sourceRevision.slice(0, 7)", "Explorer cards must expose commit identity");
requireText(page, "allChanges.length", "Hero count must describe the complete curated archive");
requireText(strip, 'href="/changes"', "Recent changes strip must use the canonical archive route");
if (strip.includes('/v3/changes')) throw new Error("Recent changes strip must not restore the legacy /v3/changes route");

console.log("changes archive contracts: pass");

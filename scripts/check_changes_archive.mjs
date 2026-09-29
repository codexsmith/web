import fs from "node:fs";

function read(path) { return fs.readFileSync(path, "utf8"); }
function requireText(source, value, message) {
  if (!source.includes(value)) throw new Error(message + ": " + value);
}

const changes = read("src/components/institutional/content/changes.ts");
const explorer = read("src/components/institutional/ChangesExplorer.tsx");
const page = read("src/components/institutional/InstitutionalChangesPage.tsx");
const strip = read("src/components/institutional/RecentChangesStrip.tsx");
const now = read("src/components/institutional/content/now.ts");
const nowPage = read("src/components/institutional/InstitutionalNowPage.tsx");
const institutionalReadme = read("src/components/institutional/README.md");

requireText(changes, 'generatedDate: "2026-09-28"', "Changes projection must carry the archive build date");
requireText(changes, 'webRevision: "e30f35f0fb9cf62f4dc70556e2df6d97c34286e5"', "Changes projection must bind the canonical web head");
requireText(changes, 'labRevision: "2040584c19c8202215bdb83e46d1df05df37dafe"', "Changes projection must bind the canonical Lab head");
requireText(changes, "export const historicalChanges", "What Changed must preserve an earlier milestone archive");
requireText(changes, "export const allChanges", "What Changed must expose the combined archive");
requireText(changes, 'sourceLabel: "Initial temporal state and Lab Through Time surfaces"', "Temporal launch must retain exact commit provenance");
requireText(changes, 'sourceLabel: "Promote canonical Lab Timeline Register"', "Timeline registry milestone must retain exact commit provenance");
requireText(changes, 'sourceRevision: "32b5b832344121fd7e18c00ed4b484e183f28fef"', "Archive must reach the first public architecture milestone");
requireText(changes, 'sourceRevision: "38d1b012fcc56b8fb2119a3a819a19d2c7c7255f"', "Archive must retain Paper Mine launch history");
requireText(changes, 'sourceRevision: "989e3737b1d5d748c1976779664023999a2d8c87"', "Current window must include the completed registry census/control-plane integration");
requireText(changes, 'sourceLabel: "Observatory: institutional dependency impact Run 004"', "Current window must retain Observatory Run 004 provenance");
requireText(changes, 'sourceLabel: "Merge PR #103: clear Website v3 release QA findings"', "Current window must retain the latest canonical web release-QA merge");
requireText(changes, 'sourceLabel: "Integrate ReductionAssessmentProfile v0.1 live gate"', "Current window must retain the live reduction-assessment gate");
requireText(changes, 'sourceLabel: "Paperize IM04 Observation, Identifiability, and Bounded Warrant"', "Current window must retain the IM04 paperization milestone");
requireText(changes, 'sourceLabel: "Observatory: execute minimum institution Run 001"', "Archive must retain the minimum executable institution milestone");

requireText(explorer, "CURRENT WINDOW", "Explorer must distinguish current deltas");
requireText(explorer, "EARLIER MILESTONES", "Explorer must expose historical backfill");
requireText(explorer, "change.sourceLabel", "Explorer must show the source commit subject");
requireText(explorer, "change.sourceRevision.slice(0, 7)", "Explorer cards must expose commit identity");
requireText(page, "allChanges.length", "Hero count must describe the complete curated archive");
requireText(strip, 'href="/changes"', "Recent changes strip must use the canonical archive route");
if (strip.includes('/v3/changes')) throw new Error("Recent changes strip must not restore the legacy /v3/changes route");

requireText(now, 'title: "Close the public and commercial interface"', "Now must expose the current public/commercial closure lane");
requireText(now, 'title: "Turn four funding lanes into outside evidence"', "Now must expose the four-lane externalization program");
requireText(now, 'title: "Audit the population behind the Registrar"', "Now must expose the post-census registry population audit");
requireText(now, 'title: "Run the research benchmarks that can falsify the stack"', "Now must keep falsifiable research benchmarking in the current cycle");
requireText(now, 'title: "Turn mature research into reviewable publication objects"', "Now must expose publication conversion as a current lane");
requireText(now, 'title: "Make the executable institution transferable"', "Now must expose transfer beyond founder memory as a roadmap lane");
requireText(now, "Experiment → Research Lane completeness", "Now must preserve the Experiment-to-Research-Lane completeness invariant");
requireText(nowPage, "Six priority lanes, each with a closure condition.", "Now page must preserve bounded six-lane public compression");
requireText(institutionalReadme, "Temporal surface maintenance — Now / What Changed", "Institutional architecture docs must preserve temporal maintenance guidance");
requireText(institutionalReadme, "manual, source-bound projections", "Temporal maintenance guidance must state the current manual projection boundary");
requireText(institutionalReadme, "Do not publish branch-local work as completed state.", "What Changed maintenance must reject branch-local completion claims");

console.log("temporal state/archive contracts: pass");

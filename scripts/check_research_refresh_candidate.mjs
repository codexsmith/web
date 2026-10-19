import fs from "node:fs";
import assert from "node:assert/strict";
const path = "src/generated/lab-public-state/research-refresh-candidate.json";
const data = JSON.parse(fs.readFileSync(path,"utf8"));
assert.equal(data.projectionStatus,"candidate_editorial_review_not_released");
assert.equal(data.publicationApproval,"pending");
assert.match(data.sourceRevision,/^[a-f0-9]{40}$/);
assert.equal(new Set(data.items.map(i=>i.id)).size,data.items.length);
for(const item of data.items){
  assert.match(item.sourceRevision,/^[a-f0-9]{40}$/);
  for(const key of ["id","sourceId","date","scope","title","status","summary","limitation","surfaceHref"])assert.ok(item[key],key+" missing");
  assert.match(item.surfaceHref,/^\/(?!\/)/);
  assert.ok(!("sourceHref" in item),"Private source link must not be exported");
  assert.ok(!("sourcePath" in item),"Private source path must not be exported");
  assert.ok(!/github\.com\/codexsmith\/boundary-first-labs/.test(JSON.stringify(item)));
}
const page=fs.readFileSync("src/components/institutional/InstitutionalResearchPage.tsx","utf8");
assert.ok(page.includes("<ResearchRefreshPreview />"));
console.log("Source-governed research refresh candidate: pass");

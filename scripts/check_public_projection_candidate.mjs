import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert/strict";

const root = "src/generated/lab-public-state/candidates/";
const read = file => JSON.parse(fs.readFileSync(file,"utf8"));
const manifest = read(root + "PROJECTION_MANIFEST.json");
assert.equal(manifest.schemaVersion,"bfl.public.projection-manifest.candidate.v0.1");
assert.equal(manifest.projectionStatus,"candidate_editorial_review_not_released");
assert.equal(manifest.review.publicationApproval,"pending");
assert.equal(manifest.review.sourceOwnerReview,"pending");
assert.equal(manifest.review.privacyReview,"pending");
assert.equal(manifest.review.approvedBy,null);
assert.equal(manifest.generatedBy.automatedLabFeed,false);
assert.match(manifest.sourceRevision,/^[0-9a-f]{40}$/);
assert.match(manifest.webBaseRevision,/^[0-9a-f]{40}$/);
assert.match(manifest.cutoffDate,/^\d{4}-\d{2}-\d{2}$/);

const exactPaths = {
 research:"src/generated/lab-public-state/research-refresh-candidate.json",
 now:root + "PUBLIC_NOW.json",
 changes:root + "PUBLIC_CHANGES.json",
};
assert.deepEqual(new Set(manifest.projections.map(p=>p.role)),new Set(Object.keys(exactPaths)));
const payload = {};
for(const record of manifest.projections){
  assert.equal(record.path,exactPaths[record.role],"Disallowed projection path or role");
  const raw = fs.readFileSync(record.path);
  const gitBlobSha1 = crypto.createHash("sha1").update(Buffer.from("blob " + raw.length + "\0")).update(raw).digest("hex");
  assert.equal(gitBlobSha1,record.gitBlobSha1,record.role + " changed without review-manifest update");
  const doc = JSON.parse(raw.toString("utf8"));
  assert.equal(doc.projectionStatus,manifest.projectionStatus);
  assert.equal(doc.publicationApproval,"pending");
  assert.equal(doc.sourceRevision,manifest.sourceRevision);
  assert.equal(doc.cutoffDate,manifest.cutoffDate);
  const items = doc.items || doc.lanes || doc.events;
  assert.ok(Array.isArray(items)&&items.length>0);
  assert.deepEqual(items.map(i=>i.id),record.itemIds,"Manifest inventory mismatch");
  assert.equal(new Set(items.map(i=>i.id)).size,items.length,"Duplicate projection item ID");
  payload[record.role]=doc;
}

const sourceMap = new Map(manifest.sourceRecords.map(s=>[s.sourceId,s]));
assert.equal(sourceMap.size,manifest.sourceRecords.length,"Duplicate source authority IDs");
for(const s of manifest.sourceRecords){
  assert.match(s.sourceRevision,/^[0-9a-f]{40}$/);
  assert.ok(["codexsmith/web","codexsmith/boundary-first-labs"].includes(s.sourceRepository));
  assert.ok(s.claimCeiling.length>24);
  assert.ok(!("sourcePath" in s),"Web manifest cannot store Lab private source paths");
}

const jsons=manifest.projections.map(p=>fs.readFileSync(p.path,"utf8"));
for(const text of [...jsons,JSON.stringify(manifest)]){
  assert.ok(!/https?:\/\/github\.com\/codexsmith\/boundary-first-labs(?:\/|\b)/i.test(text),"No clickable private Lab URLs");
  assert.ok(!/organized_library_curated\/|privateSourcePath|sourcePath|"rawSource"|"sourceHref"/.test(text),"No private source paths/raw text or public pseudo-source links");
}
const researchIds = new Set(payload.research.items.map(item=>item.id));
for (const item of payload.research.items){
  assert.ok(item.limitation.length>30);
  assert.ok(!("sourceHref" in item)&&!("sourcePath" in item));
  assert.match(item.surfaceHref,/^\/(?!\/)/);
}
function checkSource(item,sourceId,repo){
  const evidence=sourceMap.get(sourceId);
  assert.ok(evidence,"Missing source authority: "+sourceId);
  assert.equal(item.sourceRevision,evidence.sourceRevision);
  if(repo)assert.equal(item.sourceRepository,evidence.sourceRepository);
}
for(const item of payload.research.items)checkSource(item,item.sourceId);
for(const lane of payload.now.lanes){
  assert.ok(["NOW","NEXT","LATER"].includes(lane.priority));
  assert.ok(lane.summary.length>35 && lane.closureCriterion.length>35 && lane.work.length>35);
  assert.match(lane.publicHref,/^\/(?!\/)/);
  checkSource(lane,lane.sourceId);
  for(const id of lane.relatedResearchIds)assert.ok(researchIds.has(id));
}
for(const event of payload.changes.events){
  assert.equal(event.sourceState,"canonical_at_cutoff");
  assert.ok(event.date<=manifest.cutoffDate,"Do not publish future events as completed");
  assert.ok(event.change.length>35&&event.claimCeiling.length>35);
  assert.match(event.publicHref,/^\/(?!\/)/);
  checkSource(event,event.sourceId,event.sourceRepository);
  if(event.relatedResearchId!==null)assert.ok(researchIds.has(event.relatedResearchId));
}
const eventDates=payload.changes.events.map(e=>e.date);
assert.deepEqual(eventDates,[...eventDates].sort().reverse(),"Changes must be in descending order");

for(const [page,view] of [
  ["src/components/institutional/InstitutionalNowPage.tsx","now"],
  ["src/components/institutional/InstitutionalChangesPage.tsx","changes"],
  ["src/components/institutional/InstitutionalObservatoryPage.tsx","observatory"]
]){
 const body=fs.readFileSync(page,"utf8");
 assert.ok(body.includes('<PublicStateReviewPreview view="'+view+'" />'),"Missing "+view+" projection reader");
}
const shared=fs.readFileSync("src/components/institutional/PublicStateReviewPreview.tsx","utf8");
for(const role of ["now","changes","observatory"])assert.ok(shared.includes('view === "'+role+'"'));
assert.ok(shared.includes("publicationApproval"),"Public candidate must expose its approval ceiling");
assert.ok(shared.includes("changesProjection.generatedDate"),"Preview must disclose older reviewed archive separately");
console.log("Source-governed candidate Now / Changes / Observatory projections: pass (no publication authority granted).");

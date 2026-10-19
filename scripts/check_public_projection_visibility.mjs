import fs from "node:fs";
import assert from "node:assert/strict";
const gate=fs.readFileSync("src/components/institutional/content/publicProjectionRelease.ts","utf8");
assert.match(gate,/process\.env\.NODE_ENV === "development"/);
assert.match(gate,/process\.env\.BFL_ENABLE_CANDIDATE_PUBLIC_PROJECTIONS === "1"/);
assert.match(gate,/r\.sourceOwnerReview === "approved"/);
assert.match(gate,/r\.editorialClaimReview === "approved"/);
assert.match(gate,/r\.privacyReview === "approved"/);
assert.match(gate,/r\.releaseReview === "approved"/);
assert.match(gate,/r\.publicationApproval === "approved"/);
for(const file of ["src/components/institutional/ResearchRefreshPreview.tsx","src/components/institutional/PublicStateReviewPreview.tsx"]){
 assert.ok(fs.readFileSync(file,"utf8").includes("if (!mayRenderPublicStateProjection()) return null;"));
}
const manifest=JSON.parse(fs.readFileSync("src/generated/lab-public-state/candidates/PROJECTION_MANIFEST.json","utf8"));
assert.equal(manifest.review.publicationApproval,"pending");
assert.equal(manifest.handoff.mode,"candidate");
console.log("Candidate publication boundary: no production rendering; explicit local development opt-in only.");

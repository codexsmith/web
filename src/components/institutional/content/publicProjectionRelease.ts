import manifest from "@/generated/lab-public-state/candidates/PROJECTION_MANIFEST.json";
export function mayRenderPublicStateProjection(): boolean {
  const r = manifest.review;
  const approved = manifest.projectionStatus === "approved_source_governed_projection" &&
    manifest.handoff?.mode === "approved" &&
    r.publicationApproval === "approved" &&
    r.sourceOwnerReview === "approved" &&
    r.editorialClaimReview === "approved" &&
    r.privacyReview === "approved" &&
    r.releaseReview === "approved" &&
    typeof r.approvedBy === "string" && !!r.approvedBy &&
    typeof manifest.handoff.approvedContentSha256 === "string" &&
    manifest.handoff.approvedContentSha256 === manifest.handoff.inputDigestSha256;
  const candidate = process.env.NODE_ENV === "development" &&
    process.env.BFL_ENABLE_CANDIDATE_PUBLIC_PROJECTIONS === "1" &&
    manifest.projectionStatus === "candidate_editorial_review_not_released" &&
    r.publicationApproval === "pending" &&
    manifest.handoff?.mode === "candidate";
  return approved || candidate;
}

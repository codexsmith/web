import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";

const args=process.argv.slice(2);
function option(flag){const i=args.indexOf(flag); return i<0?null:args[i+1]??(()=>{throw new Error("Missing argument: "+flag);})();}
const src=option("--from");
if(!src)throw new Error("Usage: node scripts/import_public_projection.mjs --from <Lab-export-dir> --check|--write [--allow-candidate]");
const write=args.includes("--write"),check=args.includes("--check"),allowCandidate=args.includes("--allow-candidate");
if(write===check)throw new Error("Choose exactly one of --write or --check");
const allowed={
research:"src/generated/lab-public-state/research-refresh-candidate.json",
now:"src/generated/lab-public-state/candidates/PUBLIC_NOW.json",
changes:"src/generated/lab-public-state/candidates/PUBLIC_CHANGES.json"
};
const manifestPath="src/generated/lab-public-state/candidates/PROJECTION_MANIFEST.json";
const sourceRoot=path.resolve(src);
const gitBlob=v=>crypto.createHash("sha1").update("blob "+v.length+"\0").update(v).digest("hex");
const restrictedText=txt=>/organized_library_curated\/|privateSourcePath|"sourcePath"|"sourceHref"|"rawSource"|github\.com\/codexsmith\/boundary-first-labs|file:\/\/|(?:ghp_|ghs_|sk-proj-)/i.test(txt);
const from=(relative)=>{
 const full=path.resolve(sourceRoot,relative);
 if(!full.startsWith(sourceRoot+path.sep))throw new Error("Path traversal");
 let cursor=sourceRoot;for(const part of path.relative(sourceRoot,full).split(path.sep)){cursor=path.join(cursor,part);if(fs.lstatSync(cursor).isSymbolicLink())throw new Error("Symlink input not permitted: "+relative);}
 const buf=fs.readFileSync(full);
 if(buf.length>120000)throw new Error("Export file too large");
 return buf;
};
const manifestBuffer=from(manifestPath);
const manifest=JSON.parse(manifestBuffer.toString("utf8"));
if(manifest.handoff?.protocol!=="bfl.lab-to-web.handoff.v0.1"||manifest.generatedBy?.method!=="lab_owned_deterministic_compiler")throw new Error("Unrecognized Lab exporter; refuse arbitrary web JSON");
if(manifest.handoff.mode!=="candidate"&&manifest.handoff.mode!=="approved")throw new Error("Unrecognized handoff mode");
if(manifest.handoff.mode==="candidate"&&!allowCandidate)throw new Error("Candidate export is not publication-approved; --allow-candidate only for draft preview");
if(manifest.handoff.mode==="approved"){
 if(manifest.projectionStatus!=="approved_source_governed_projection"||manifest.review?.publicationApproval!=="approved"||manifest.handoff.approvedContentSha256!==manifest.handoff.inputDigestSha256)throw new Error("Approved export lacks matching digest/approval");
}else{
 if(manifest.projectionStatus!=="candidate_editorial_review_not_released"||manifest.review?.publicationApproval!=="pending"||manifest.handoff.approvedContentSha256!==null)throw new Error("Candidate status mismatch");
}
if(!/^[a-f0-9]{64}$/.test(manifest.handoff.inputDigestSha256))throw new Error("Missing verified Lab SHA-256 input digest");
if(!/^[a-f0-9]{40}$/.test(manifest.sourceRevision))throw new Error("Invalid Lab revision");
assert.deepEqual(new Set(manifest.projections?.map(x=>x.role)),new Set(Object.keys(allowed)));
const payload={};
const writes=[];
for(const p of manifest.projections){
 if(p.path!==allowed[p.role])throw new Error("Output allowlist violation: "+p.path);
 const buf=from(p.path);
 if(gitBlob(buf)!==p.gitBlobSha1)throw new Error("Exported blob mismatch: "+p.role);
 const text=buf.toString("utf8");
 if(restrictedText(text))throw new Error("Unsafe private content in "+p.role);
 const data=JSON.parse(text);
 if(data.sourceRevision!==manifest.sourceRevision||data.projectionStatus!==manifest.projectionStatus)throw new Error("Cross-view revision/status mismatch");
 const items=data.items||data.lanes||data.events;
 assert.deepEqual(items.map(i=>i.id),p.itemIds);
 payload[p.role]=data;
 writes.push([p.path,buf]);
}
if(restrictedText(manifestBuffer.toString("utf8")))throw new Error("Private paths detected in exported manifest");
const canonical={cutoffDate:manifest.cutoffDate,sourceRevision:manifest.sourceRevision,webBaseRevision:manifest.webBaseRevision,projections:payload,sourceRecords:manifest.sourceRecords};
const digest=crypto.createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
// In approved mode the original candidate inputs were approved by digest; the exported approved payloads differ in status.
if(manifest.handoff.mode==="candidate"&&digest!==manifest.handoff.inputDigestSha256)throw new Error("Lab input digest mismatch");
if(manifest.handoff.mode==="approved"){
 const candidate=Object.fromEntries(Object.entries(payload).map(([role,value])=>[role,{...value,projectionStatus:"candidate_editorial_review_not_released",publicationApproval:"pending"}]));
 const original={...canonical,projections:candidate};
 const candidateDigest=crypto.createHash("sha256").update(JSON.stringify(original)).digest("hex");
 if(candidateDigest!==manifest.handoff.inputDigestSha256)throw new Error("Approved digest mismatch");
}
writes.push([manifestPath,manifestBuffer]);
for(const [filename,buf] of writes){
 const output=path.resolve(process.cwd(),filename);
 if(!output.startsWith(process.cwd()+path.sep))throw new Error("Local path traversal");
 if(check){if(!fs.existsSync(output)||!fs.readFileSync(output).equals(buf))throw new Error("Web output drift "+filename);}
 else{fs.mkdirSync(path.dirname(output),{recursive:true});if(fs.existsSync(output)&&fs.lstatSync(output).isSymbolicLink())throw new Error("Refuse destination symlink");fs.writeFileSync(output,buf);}
}
console.log(JSON.stringify({mode:manifest.handoff.mode,sourceRevision:manifest.sourceRevision,approval:manifest.review.publicationApproval,inputDigestSha256:manifest.handoff.inputDigestSha256,files:writes.map(([p])=>p),checked:check,written:write}));

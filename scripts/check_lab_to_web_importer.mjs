import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const temp=fs.mkdtempSync(path.join(os.tmpdir(),"bfl-web-import-"));
const files=[
"src/generated/lab-public-state/research-refresh-candidate.json",
"src/generated/lab-public-state/candidates/PUBLIC_NOW.json",
"src/generated/lab-public-state/candidates/PUBLIC_CHANGES.json",
"src/generated/lab-public-state/candidates/PROJECTION_MANIFEST.json",
];
const run=(args,shouldPass)=> {
 try{
  const out=execFileSync(process.execPath,["scripts/import_public_projection.mjs","--from",temp,...args],{encoding:"utf8",stdio:["ignore","pipe","pipe"]});
  if(!shouldPass)throw new Error("Unexpected successful import: "+args.join(" "));
  return JSON.parse(out.trim());
 }catch(e){
  if(shouldPass)throw e;
  if(String(e.message).startsWith("Unexpected successful import"))throw e;
  assert.ok(e.status!==0,"A rejected input must exit nonzero");
  return null;
 }
};
try{
 for(const rel of files){const dst=path.join(temp,rel);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(rel,dst);}
 const valid=run(["--check","--allow-candidate"],true);
 assert.equal(valid.approval,"pending");
 assert.equal(valid.checked,true);
 assert.equal(valid.files.length,4);
 run(["--check"],false);
 run(["--write"],false);
 run(["--write","--allow-candidate"],true);
 run(["--check","--allow-candidate"],true);
 const candidate=path.join(temp,files[1]);fs.appendFileSync(candidate," ");
 run(["--check","--allow-candidate"],false);
 fs.copyFileSync(files[1],candidate);
 const manifestPath=path.join(temp,files[3]);
 const original=fs.readFileSync(manifestPath);
 const m=JSON.parse(original.toString("utf8"));
 m.review.publicationApproval="approved";
 fs.writeFileSync(manifestPath,JSON.stringify(m,null,2)+"\n");
 run(["--check","--allow-candidate"],false);
 fs.writeFileSync(manifestPath,original);
 console.log("Lab-to-web importer replay and rejection checks: pass");
}finally{fs.rmSync(temp,{recursive:true,force:true});}

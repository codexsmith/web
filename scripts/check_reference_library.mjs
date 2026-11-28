import assert from "node:assert/strict";
import fs from "node:fs";
import { referenceLibrary as works } from "../src/components/institutional/content/referenceLibrary.ts";
import { catalogFacets, filterReferences, initialCatalogFilters as initial } from "../src/components/institutional/referenceCatalogModel.ts";
import { institutionalPublicationEntries, suspendedPublicationRoutes, suspendedPublicationDestination } from "../src/lib/site-publication.ts";
import { sectionNavRoutes } from "../src/components/institutional/content/readerSectionNavigation.ts";
assert.equal(works.length,56);
assert.equal(new Set(works.map(w=>w.id)).size,56);
const allowed = new Set(["id","authors","title","year","type","disciplines","source","sourceLabel","links","editionNote"]);
for (const w of works) {
  assert.ok(Object.keys(w).every(k=>allowed.has(k)),w.id);
  assert.ok(w.id && w.title && w.year && w.authors.length && w.disciplines.length);
  assert.equal(w.sourceLabel,"Source / bibliographic record");
  for(const u of [w.source,...w.links.map(x=>x.url)]){
    const url = new URL(u);
    assert.equal(url.protocol,"https:");assert.ok(!url.username&&!url.password);
    assert.ok(!/chatgpt\.com|codexsmith\/boundary-first-labs(?:\/|$)/i.test(u));
  }
}
// Transfer witness against the recovered metadata-only v0.25 native-reader source.
const compact=works.map(w=>[w.id,w.authors,w.title,w.year,w.type,w.disciplines,w.source,w.links.map(l=>[l.label,l.url]),w.editionNote??null]);
let hash=2166136261;for(const c of JSON.stringify(compact))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
assert.equal(hash.toString(16),"30bf99ee","bibliographic projection transfer witness");
assert.equal(filterReferences(works,initial).length,56);
const select=f=>filterReferences(works,{...initial,...f});
assert.deepEqual(select({query:"grothendieck 1957"}).map(w=>w.id),["grothendieck-tohoku"]);
assert.deepEqual(select({query:"oystein ore"}).map(w=>w.id),["ore-galois"]);
assert.equal(select({query:"not-in-the-catalog-7129"}).length,0);
assert.ok(catalogFacets(works).authors.includes("Alexandre Grothendieck"));
assert.ok(select({discipline:"Mathematics"}).every(w=>w.disciplines.includes("Mathematics")));
assert.deepEqual(select({author:"Alexandre Grothendieck"}).map(w=>w.id),["grothendieck-tohoku"]);
assert.equal(select({author:"Alexandre Grothendieck",discipline:"Physics"}).length,0);
const g=select({author:"Alexandre Grothendieck"})[0];
assert.ok(g.links.some(l=>l.url.endsWith("1178244839"))&&g.links.some(l=>l.url.endsWith("1178244774")));
const before=works.map(w=>w.id).join("|");
for(const sort of ["year","title"])assert.equal(select({sort}).length,56);
assert.equal(works.map(w=>w.id).join("|"),before);
const root="src/components/institutional/";
for(const file of ["ReferenceCatalog.tsx","ReferenceLibraryPage.tsx"]){
  const code=fs.readFileSync(root+file,"utf8");
  assert.ok(!/\b(fetch|localStorage|sessionStorage|XMLHttpRequest|WebSocket|sendBeacon|dangerouslySetInnerHTML)\b/.test(code));
}
const entry=institutionalPublicationEntries.find(x=>x.href==="/observatory/reference-library");
assert.equal(entry?.tier,"supporting");assert.equal(entry?.parent,"/observatory");
assert.ok(sectionNavRoutes.includes("/observatory/reference-library"));
assert.deepEqual(suspendedPublicationRoutes,["/research/paper-mine","/v3/research/paper-mine"]);
assert.equal(suspendedPublicationDestination,"/observatory");
console.log("PASS: 56 metadata-only records, source transfer, local filters, both Tohoku parts, scoped route and unchanged suspension");

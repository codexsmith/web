// Source contracts complement the rendered DOM and navigation checks.
import fs from "node:fs";
const read = p => fs.readFileSync(p, "utf8");
const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const check = (test, message) => { if (!test) throw Error(`Doctrine front-door contract: ${message}`); };
const root = "src/components/institutional";
const model = read(`${root}/content/doctrineFrontDoor.ts`);
const content = JSON.parse(model.match(/export const doctrineFrontDoor = (\{[\s\S]+\}) as const;/)?.[1] ?? "null");
const doctrineNames = ["Consequential Systems", "AI Governance", "Constructive Human Agency"];
const doctrineRoutes = ["/consequential-systems", "/ai-governance", "/constructive-human-agency"];
const routes = ["/codexware", "/observatory", "/work-with-us"];
const labels = ["Codexware", "Observatory", "Work With Us"];
check(content && equal(content.doctrines.map(d => d.name), doctrineNames), "three separate canonical doctrines in order");
check(equal(content.doctrines.map(d => `/${d.slug}`), doctrineRoutes), "canonical doctrine slugs");
check(equal(content.navigation.map(n => n.label), labels), "content navigation order");
check(equal(content.navigation.map(n => `/${n.slug}`), routes), "content navigation destinations");
const registry = read(`${root}/institutionalRoutes.ts`);
const primary = registry.match(/export const institutionalRoutes = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
const entries = [...primary.matchAll(/\{ label: "([^"]+)", href: "([^"]+)" \}/g)];
check(equal(entries.map(m => m[1]), labels) && equal(entries.map(m => m[2]), routes), "exact primary navigation registry");
const footer = registry.split("export const institutionalFooterGroups = [")[1] ?? "";
for (const route of [...routes, ...doctrineRoutes, "/digital-native-institution", "/evidence-and-trust"]) check(footer.includes(`href: "${route}"`), `footer route ${route}`);
const site = read("src/lib/site-release.ts");
const admitted = new Set([...site.matchAll(/"(\/[^"\n]*)"/g)].map(m => m[1]));
for (const path of ["/", ...routes, ...doctrineRoutes, "/digital-native-institution", "/evidence-and-trust"]) {
  check(admitted.has(path), `public inventory ${path}`);
  const file = path === "/" ? "src/app/page.tsx" : `src/app/v3${path}/page.tsx`;
  check(read(file).includes(`canonical: "${path}"`), `canonical metadata ${path}`);
}
const linksIn = x => typeof x === "object" && x !== null ? Object.entries(x).flatMap(([k,v]) => k === "href" ? [v] : linksIn(v)) : [];
for (const path of linksIn(content)) check(admitted.has(path), `all content routes admitted: ${path}`);
const front = read(`${root}/DoctrineFrontDoor.tsx`);
check((front.match(/data-doctrine-links=\{context\}/g) ?? []).length === 1, "single reusable closing-section definition");
for (const [name, context] of [["DoctrineHomePage", "home"], ["CodexwareIntroductionPage", "codexware"], ["WorkWithUsPage", "work-with-us"], ["DigitalNativeInstitutionPage", "digital-native-institution"]]) {
  const body = front.split(`export function ${name}(`)[1]?.split("export function ")[0] ?? "";
  check(new RegExp(`<DoctrineLinksSection context="${context}"\\s*/>\\s*</div>\\s*</InstitutionalPageShell>`).test(body), `${name} ends with its shared doctrine section`);
}
for (const [name, context, modelKey] of [["DoctrineHomePage", "home", "homeIntro"], ["WorkWithUsPage", "work-with-us", "workIntro"]]) {
  const body = front.split(`export function ${name}(`)[1]?.split("export function ")[0] ?? "";
  check(body.includes(`<DigitalNativeInstitutionLink context="${context}" />`), `${name} exposes the institution page`);
  check(content.digitalNativeInstitution[modelKey].href === "/digital-native-institution", `${name} links to canonical institution page`);
}
check(front.includes('data-institution-link={context}') && front.includes('href={copy.href}'), "one reusable contextual institution entry");
check(/<DoctrineLinksSection exclude=\{slug\}\s*\/>\s*<\/div>\s*<\/InstitutionalPageShell>/.test(front), "systems and agency pages end with related doctrines");
const observatoryPage = read(`${root}/InstitutionalObservatoryPage.tsx`);
check(/<DoctrineLinksSection context="observatory"\s*\/>\s*<\/div>\s*<\/div>\s*<\/InstitutionalPageShell>/.test(observatoryPage), "observatory ends with shared doctrine section");
check(observatoryPage.includes('data-observatory-exhibit="public"') && observatoryPage.includes('observatoryExhibit as exhibit'), "observatory renders curated exhibition model");
check(!/ArchitectureProjectionSection|observatoryLensGroups|institutionalChildRoutes|observatoryRoles|LabCommandPalette/.test(observatoryPage), "observatory must not render legacy inspection surfaces in its body");
const exhibit = content.observatory;
for (const [key,count] of [["foundations",5],["architecture",5],["research",5],["method",4],["evidence",7]]) {
  check(exhibit[key].length === count && exhibit[key].every(item => item.title && item.body), `observatory ${key} exhibit completeness`);
}
for (const key of ["foundations","architecture","research","method","evidence","demonstration","release"]) check(observatoryPage.includes(`data-observatory-section="${key}"`), `observatory renders ${key}`);
check(exhibit.exhibit.cases.length === 2 && exhibit.exhibit.eyebrow.includes("fictional") && exhibit.exhibit.limit.includes("invented teaching example"), "observatory example explicitly illustrative");
check(equal(exhibit.links.map(item => item.href), ["/digital-native-institution", "/codexware", "/work-with-us"]), "observatory exhibit links restricted to public institutional destinations");
check(exhibit.releaseNote.includes("does not announce a new scientific result"), "observatory claim ceiling explicit");
check(!/github\.com|chatgpt\.com|PRIVATE_EDITORIAL_SOURCE_CROSSWALK|BFL-MACH-|chatgpt_conversation_url/.test(JSON.stringify(exhibit)), "observatory projection contains no private locator or machinery ID markers");
check(read("src/app/v3/ai-governance/page.tsx").includes('<DoctrineLandingPage slug="ai-governance" />'), "AI Governance uses canonical shared doctrine renderer");
check(!footer.includes('href: "/lab-overview"') && !admitted.has("/lab-overview"), "do not create a second legacy homepage");
check(read("src/app/page.tsx").includes("<DoctrineHomePage />"), "root mounts new institutional introduction");
check(read(`${root}/content/observatory.ts`).includes("observatoryExhibit = doctrineFrontDoor.observatory"), "Observatory uses shared curated content model");
const work = content.workWithUs;
check(equal(work.groups.map(g => g.id), ["commission", "collaborate", "support", "participate"]), "Work With Us exposes all four participation groups in order");
check(equal(work.groups.flatMap(g => g.cards.map(c => c.id)), ["systems", "governance-review", "paper-review", "research", "public-service", "partnerships", "education", "funding", "open-lab", "media"]), "Work With Us exposes all ten engagement paths");
check(work.groups.flatMap(g => g.cards).every(c => c.status && c.label && c.href), "each engagement path declares status and destination");
check(work.groups.flatMap(g => g.cards).find(c => c.id === "paper-review")?.status === "Pilot inquiry", "paper auditing is explicitly a pilot inquiry");
check(equal(work.know.cards.map(c => c.id), ["founder", "method", "independence", "principles"]), "institutional context links are complete");
check(work.engagement.steps.length === 4 && work.engagement.outputs && work.engagement.limits, "engagement stages, outputs and limits are explicit");
check(work.contact.href === "/contact" && work.contact.privacy, "contact uses admitted route and safe initial inquiry guidance");
const workBody = front.split("export function WorkWithUsPage(")[1]?.split("export function ")[0] ?? "";
check(workBody.includes("work.groups.map") && workBody.includes("group.cards.map") && workBody.includes("work.know.cards.map"), "engagement cards are rendered from the shared content model");
for (const section of ["engagement", "know", "contact"]) check(workBody.includes(`data-work-section="${section}"`), `Work With Us renders ${section}`);
check(workBody.includes("href={PUBLIC_CONTACT_MAILTO}") && workBody.includes("PUBLIC_CONTACT_EMAIL"), "direct contact uses canonical public contact constants");
check(content.codexware.status.toLowerCase().includes("development"), "Codexware clearly in development");
const commitments = content.codexware.commitments;
check(equal(commitments?.items.map(item=>item.title), ["Procedurally verifiable opt-in", "Action traceability", "Bounded capability", "External non-execution", "Non-interference by construction"]), "five Codexware governance requirements");
check(commitments.items[3].body.includes("Independent external execution is outside their authority"), "no external execution authority for appliances");
check(commitments.note.includes("not assurances of current implementation") && commitments.note.includes("threat model"), "implementation-specific assurance boundary");
check(front.includes("data-codexware-commitments") && front.includes("data-deployment-limit"), "render governance requirements and limitations");

check(!/github\.com\/codexsmith\/boundary-first-labs\/blob|chatgpt_conversation_url|PRIVATE_EDITORIAL_SOURCE_CROSSWALK/.test(model), "no private provenance embedded in public content");
const guides = content.engagementGuides;
const guideRoutes = ["/work-with-us/professional-services", "/work-with-us/paper-auditing", "/work-with-us/public-service", "/work-with-us/funding"];
check(equal(guides.map(g => `/${g.slug}`), guideRoutes), "four canonical engagement guides in order");
for (const guide of guides) {
  const route = `/${guide.slug}`;
  check(admitted.has(route), `guide route admitted: ${route}`);
  const page = read(`src/app/v3${route}/page.tsx`);
  check(page.includes(`canonical: "${route}"`) && page.includes(`<EngagementGuidePage slug="${guide.slug}" />`), `canonical guide and renderer: ${route}`);
  check(guide.offers.length === 3 && guide.sections.length === 4 && guide.status && guide.ask && guide.example && guide.subject && guide.links.length >= 2, `complete engagement guide: ${route}`);
  check(content.doctrineContexts[guide.slug], `guide doctrine context: ${route}`);
}
const cardDestinations = {"systems": "/work-with-us/professional-services", "governance-review": "/work-with-us/professional-services", "paper-review": "/work-with-us/paper-auditing", "public-service": "/work-with-us/public-service", "funding": "/work-with-us/funding", "independence": "/work-with-us/funding"};
const allCards = [...work.groups.flatMap(g=>g.cards), ...work.know.cards];
for (const [id, href] of Object.entries(cardDestinations)) check(allCards.find(c => c.id === id)?.href === href, `canonical engagement guide link: ${id}`);
check(guides[1].status.includes("no charge") && guides[1].support.includes("not a released") && guides[1].sections.some(s=>s.body.includes("not withheld")), "paper audit pilot scope and independence");
check(guides[3].status.includes("No financing round") && guides[3].sections.some(s=>s.body.includes("not an operational or perpetual pricing guarantee")), "funding inquiry and product claim ceiling");
const guideBody = front.split("export function EngagementGuidePage(")[1] ?? "";
check(guideBody.includes('data-engagement-guide={slug}') && guideBody.includes('href="/work-with-us"') && guideBody.includes('href="/contact"'), "guide renderer, return link and contact");
for (const marker of ["offers", "method", "status", "example", "contact"]) check(guideBody.includes(`data-guide-${marker}`), `guide renderer exposes ${marker}`);
check(/<DoctrineLinksSection context=\{slug\}\s*\/>\s*<\/div>\s*<\/InstitutionalPageShell>/.test(guideBody), "guide ends with shared doctrine section");
const portfolio = content.appliedProducts;
check(portfolio.href === "/work-with-us/funding" && portfolio.anchorId === "reader-example" && admitted.has(portfolio.href), "applied product pathway uses the admitted funding route and stable section anchor");
check(equal(portfolio.items.map(item => item.id), ["weather", "chess", "sports", "integrations"]) && portfolio.items.every(item => item.status && item.body) && portfolio.intro.includes("not available products"), "four applied product directions with explicit maturity boundaries");
check(content.codexware.lead.includes("flagship software application and computational platform") && content.home.paths[0].tagline === "Flagship application", "Codexware identity precedes purpose");
check(front.includes('data-applied-product-pathway="home"') && observatoryPage.includes('data-applied-product-pathway="observatory"') && front.includes('data-applied-product-portfolio') && front.includes('id="reader-example"'), "homepage and Observatory pathways resolve to the rendered funding portfolio");
const periodHeadings = (node, trail = []) => Object.entries(node ?? {}).flatMap(([key, value]) => typeof value === "string" && /(title|heading)$/i.test(key) && /\.$/.test(value) && [...trail,key].join(".") !== "home.title" ? [[...trail,key].join(".")] : value && typeof value === "object" ? periodHeadings(value, [...trail,key]) : []);
check(periodHeadings(content).length === 0, "reader headings omit terminal periods except the institutional slogan");
console.log("Doctrine front-door and engagement-guide source contracts passed.");

const exhibitRoutes = ["/observatory/intellectual-lineage", "/observatory/research-architecture", "/observatory/computational-inquiry", "/observatory/demonstrations"];
const publicReferenceUrls = ["https://github.com/codexsmith/boundary-first-labs-public/blob/main/INTELLECTUAL_PROVENANCE.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/PUBLICATION_POLICY.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/method/README.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/research/README.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/theory/README.md"];
check(equal(content.observatoryExhibits.map(e => `/${e.slug}`), exhibitRoutes), "four canonical Observatory exhibits in order");
check(observatoryPage.includes('data-observatory-gallery') && observatoryPage.includes('doctrineFrontDoor.observatoryExhibits.map'), "gallery must render all public exhibits from the shared model");
for (const entry of content.observatoryExhibits) {
  const route = `/${entry.slug}`;
  check(admitted.has(route) && content.doctrineContexts[entry.slug], `exhibit route and doctrine context: ${route}`);
  const page = read(`src/app/v3${route}/page.tsx`);
  check(page.includes(`canonical: "${route}"`) && page.includes(`<PublicObservatoryExhibitPage slug="${entry.slug}" />`), `canonical exhibit renderer: ${route}`);
  check(entry.sections.length >= 3 && entry.cards.length >= 3 && entry.limit && entry.support, `exhibit must declare content and scope: ${route}`);
  check(entry.sources.length === 2 && entry.sources.every(s => publicReferenceUrls.includes(s.sourceUrl)), `exhibit references must use reviewed public addresses: ${route}`);
  check(!/chatgpt\.com|boundary-first-labs\/blob|BFL-MACH-|chatgpt_conversation_url|PRIVATE_EDITORIAL_SOURCE_CROSSWALK/.test(JSON.stringify(entry)), `no private source markers: ${route}`);
}
const exhibitRenderer = read(`${root}/PublicObservatoryExhibitPage.tsx`);
check(exhibitRenderer.includes("data-exhibit-limit") && exhibitRenderer.includes('href="/observatory"'), "exhibit scope and return link");
check(/<DoctrineLinksSection context=\{slug\}\s*\/>\s*<\/div>\s*<\/InstitutionalPageShell>/.test(exhibitRenderer), "exhibit concludes with the doctrines");
check(!/<(?:form|iframe|embed|object|button|input|textarea|select)\b|ArchitectureProjectionSection|LabCommandPalette/.test(exhibitRenderer), "exhibit must be a static reader, not a workbench");
console.log("Public Observatory exhibit source contracts passed.");

// Identity hierarchy: the institutional tagline is not a historical lineage slogan.
const identitySource = read("src/lib/institutional-identity.ts");
const identity = JSON.parse(identitySource.match(/export const institutionalIdentity = (\{[\s\S]+\}) as const;/)?.[1] ?? "null");
check(identity && equal(content.identity, identity), "shared institutional identity matches editorial source");
check(identity.tagline === "Trace what follows. Design for repair." && identity.descriptor === "Research and engineering for consequential systems." && identity.mission === "We study the boundaries where systems become real.", "current institutional identity wording");
check(content.home.title === identity.tagline && content.home.lead === identity.mission && content.home.identityLine === identity.descriptor, "homepage identity hierarchy");
check(!/practice-born\.\s*research-backed\.\s*formally generalized\./i.test(model + front + observatoryPage + exhibitRenderer), "superseded slogan must not appear in active candidate");
check(front.includes('data-institutional-tagline="home">{institutionalIdentity.tagline}') && front.includes('data-institutional-descriptor>{institutionalIdentity.descriptor}'), "homepage renders shared identity");
check(content.maintenance.body.includes("Trace consequences, repair defects, and maintain the systems upon which people depend."), "maintenance is explicit in institutional purpose");
for (const name of ["InstitutionalChrome.tsx", "InstitutionalHomePage.tsx", "InstitutionalAboutPage.tsx"]) {
  const text = read(`${root}/${name}`);
  check(text.includes("institutionalIdentity") && !/practice-born\.\s*research-backed\.\s*formally generalized\./i.test(text), `legacy public identity synchronized: ${name}`);
}
check(read(`${root}/InstitutionalChrome.tsx`).includes('data-institutional-tagline="footer">{institutionalIdentity.tagline}'), "shared footer renders current identity");
console.log("Institutional identity contracts passed.");

// Codexware examples and economic research motivation are editorial, not product activation.
const economic = content.economicMaintenance;
const economicRoute = "/codexware/economic-maintenance";
check(content.codexware.examples.items.length === 5 && content.codexware.examples.items.every(x => x.id && x.question && x.body), "five Codexware example paths");
check(content.codexware.examples.limit.includes("not promise functionality") && content.codexware.examples.href === economicRoute, "example status and canonical child");
check(admitted.has(economicRoute) && content.doctrineContexts[economic.slug], "economic route and doctrine context");
check(economic.topics.length === 8 && economic.cases.length === 10 && economic.method.length === 6, "economic research questions, cases, method completeness");
check(economic.cases.every(x => x.limit && ["Research question", "Constructed teaching example"].includes(x.status)), "economic cases have limited status and evidence ceilings");
check(economic.status.includes("require source-vintage, methodology and specialist review"), "economic research release ceiling");
check(front.includes("data-codexware-examples") && front.includes("data-example-limit"), "Codexware examples renderer");
const economicRenderer = read(`${root}/CodexwareEconomicMaintenancePage.tsx`);
check(read("src/app/v3/codexware/economic-maintenance/page.tsx").includes('canonical: "/codexware/economic-maintenance"'), "economic canonical metadata");
check(/<DoctrineLinksSection context="codexware\/economic-maintenance"\s*\/>\s*<\/div>\s*<\/InstitutionalPageShell>/.test(economicRenderer), "economic page closes with doctrines");
check(!/<(?:form|iframe|embed|object|button|input|textarea|select)/.test(economicRenderer), "economic page is editorial only");
console.log("Codexware economic motivation contracts passed.");

// Pass 14: page-level editorial integration, not prototype release.
const civic = content.civicRecord;
const civicRoute = "/codexware/civic-record";
check(admitted.has(civicRoute) && content.doctrineContexts[civic.slug], "Civic Record canonical route and doctrine context");
check(content.codexware.civicIntro.href === civicRoute && content.codexware.civicIntro.status.includes("Not publicly available"), "Civic Record entry and private status");
check(civic.status.includes("no public release") && civic.status.includes("no public release, approved real-data intake") && civic.status.includes("reviews remain outstanding"), "Civic Record release and intake limits");
check(civic.cases.length === 3 && civic.caseNote.includes("Fictional intended-use") && civic.commitments.length === 4 && civic.boundaries.length === 3, "Civic Record examples and boundaries");
check(civic.commitments[3].body.includes("without required AI, an external account, a subscription, payment or research participation"), "Civic Record independent free core requirement");
check(civic.boundaryHeading === "Documentation is not submission" && civic.boundaries[1].body.includes("does not autonomously"), "Civic Record non-execution boundary");
check(read("src/app/v3/codexware/civic-record/page.tsx").includes('canonical: "/codexware/civic-record"'), "Civic Record canonical metadata");
const civicRenderer = read(`${root}/CodexwareCivicRecordPage.tsx`);
check(civicRenderer.includes('data-civic-status') && civicRenderer.includes('data-civic-case-limit') && civicRenderer.includes('context="codexware/civic-record"'), "Civic Record renders limitations and doctrines");
check(!/<(?:form|iframe|embed|object|button|input|textarea|select)\b/.test(civicRenderer), "Civic Record reader must not intake records");
check(equal(content.home.paths.map(x=>x.href), routes) && front.includes("data-home-entry-paths"), "homepage exposes exactly three entry cards");
check(content.observatoryExhibits[1].cards.length === 7 && content.observatoryExhibits[1].cards.some(x=>x.title==="Representational Systematics"), "research directions remain curated");
console.log("Pass 14 copy bank integration contracts passed.");

// Pass 15: public teaching instruments; no private data or live authority.
const instruments = content.instruments;
check(admitted.has("/observatory/instruments") && content.doctrineContexts["observatory/instruments"], "instruments route and doctrine context");
check(read("src/app/v3/observatory/instruments/page.tsx").includes('canonical: "/observatory/instruments"'), "instrument canonical metadata");
check(equal(instruments.exhibits.map(x=>x.id), ["sufficiency","civic","classification","paper","repair","authority"]), "six distinct launch exhibits");
check(instruments.exhibits.every(x=>Object.keys(x.evidence).length===5 && Object.values(x.evidence).every(Boolean)), "each exhibit declares evidence and unresolved obligations");
check(instruments.exhibits.filter(x=>x.status==="Interactive teaching model").length===3, "three interactive teaching models, not released products");
check(instruments.boundary.includes("No personal records, uploads, account access, stored data, remote computation or external execution"), "teaching-only scope");
check(Object.keys(content.instrumentLinks).length===14 && Object.values(content.instrumentLinks).every(x=>x.href==="/observatory/instruments"), "contextual instrument entry routes");
check(read(`${root}/PublicInstrumentCollection.tsx`).includes('<DoctrineLinksSection context="observatory/instruments" />'), "instrument page closes with doctrines");
check(observatoryPage.includes('<InstrumentCollectionLink context="observatory" />'), "observatory exposes instrument collection");
const runtime = read(`${root}/publicInstrumentRuntime.ts`);
check(!/\b(fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage|sendBeacon|indexedDB)\b/.test(runtime), "runtime must not access network or persistence");
check(runtime.includes('modify: false, send: false, transact: false, expand: false'), "fictional policy keeps four operations denied");
console.log("Pass 15 instrument contracts passed.");

const stewardship = content.digitalNativeInstitution.stewardship;
check(equal(stewardship?.values.map(x=>x.title), ["No consequence without representation", "Responsibility follows consequence", "Our roots must balance our branches", "Truth above authority", "Agency, not dependency"]), "five institutional Charter values");
check(equal(stewardship?.limits.map(x=>x.id), ["domains","judgment","authority","repair","inquiry","access","sufficiency"]), "seven declared institutional non-goals");
check(stewardship.note.includes("do not constitute a new charter"), "stewardship claim ceiling");
const institutionRenderer = read(`${root}/DoctrineFrontDoor.tsx`);
for (const attr of ["data-stewardship-values", "data-charter-value", "data-institutional-nongoals", "data-institutional-limit", "data-stewardship-limit"]) check(institutionRenderer.includes(attr), `institutional renderer missing ${attr}`);

check(equal(Object.keys(content.audiencePaths), ["codexware","observatory","work-with-us"]), "audience paths belong to three primary pages");
for(const [key, value] of Object.entries(content.audiencePaths)) {
  check(value.cards.length === ({codexware:2,observatory:3,"work-with-us":5})[key] && value.cards.every(c=>c.question && c.body && c.links.length===2 && c.links.every(l=>admitted.has(l.href))), "audience path completeness and destinations");
  check((key === "observatory" ? observatoryPage : front).includes(`<AudiencePathways context="${key}" />`), "audience panel mounted");
}
check(content.contactDraft.categories.length===10 && content.contactDraft.notice.includes("does not send, upload or save"), "draft privacy and categories");
check(!/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/.test(read(`${root}/inquiryDraftRuntime.ts`)), "inquiry composer has no submission or persistence path");

// Pass 18: separate evidence types, maturity dimensions and public correction boundary.
const trust=content.trustCenter;
check(trust && equal(trust.evidenceTypes.map(x=>x.id),["testimony","dated-source","digest","deduction","computation","reproduction","checker","proof","empirical","review","authorization"]) && trust.evidenceTypes.every(x=>x.establishes && x.limit),"eleven typed evidence categories and limits");
check(equal(trust.statusDimensions.map(x=>x.id),["source","formulation","experiment","replay","external","publication"]) && trust.statusIntro.includes("not the status of a named project"),"illustrative status dimensions");
check(trust.credibility.length===6 && trust.lineage.length===6 && trust.method.length===4 && trust.aiCycle.length===6 && trust.aiLimits.length===3 && trust.assurance.length===4,"trust content completeness");
check(trust.lineageLimit.includes("not independent validation") && trust.aiIntro.includes("not a substitute for scientific evidence or human responsibility"),"lineage and computational assistance limits");
check(trust.example.limit.includes("does not establish a general classification theorem") && trust.example.domain && trust.example.procedure && trust.example.observation && trust.example.establishes,"public evidence card scope");
check(equal(trust.publication.sources.map(s=>s.sourceUrl),["https://github.com/codexsmith/boundary-first-labs-public/blob/main/INTELLECTUAL_PROVENANCE.md","https://github.com/codexsmith/boundary-first-labs-public/blob/main/PUBLICATION_POLICY.md"]),"trust references use reviewed public policies");
check(trust.product.body.includes("no public release or approved real-data intake") && trust.correction.links.some(x=>x.href==="/contact") && trust.correction.notice.includes("sensitive personal records"),"product and correction limits");
check(content.trustLinks.length===9 && content.trustLinks.every(x=>x.href==="/evidence-and-trust" && x.context in content.doctrineContexts),"trust contextual entry routes");
const trustRenderer=read(`${root}/EvidenceTrustPage.tsx`);
check(trustRenderer.includes('<DoctrineLinksSection context="evidence-and-trust" />') && !/<(?:form|iframe|embed|object|button|input|textarea|select)\b/.test(trustRenderer),"trust read-only renderer and closure");
console.log("Pass 18 trust contracts passed.");

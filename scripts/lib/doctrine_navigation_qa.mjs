// Browser acceptance checks shared by the release harness. No new dependencies.
import { sectionNavRoutes } from "../../src/components/institutional/content/readerSectionNavigation.ts";
const guideRoutes = ["/work-with-us/professional-services", "/work-with-us/paper-auditing", "/work-with-us/public-service", "/work-with-us/funding"];
const exhibitRoutes = ["/observatory/intellectual-lineage", "/observatory/research-architecture", "/observatory/computational-inquiry", "/observatory/demonstrations"];
const principal = { "/evidence-and-trust": "evidence-and-trust", "/observatory/instruments": "observatory/instruments", "/codexware/civic-record": "codexware/civic-record", "/codexware/economic-maintenance": "codexware/economic-maintenance", ...Object.fromEntries(exhibitRoutes.map(route => [route, route.slice(1)])), ...Object.fromEntries(guideRoutes.map(route => [route, route.slice(1)])), "/digital-native-institution": "digital-native-institution", "/": "home", "/codexware": "codexware", "/observatory": "observatory", "/work-with-us": "work-with-us" };
const doctrines = ["/consequential-systems", "/ai-governance", "/constructive-human-agency"];
const navRoutes = ["/codexware", "/observatory", "/work-with-us"];
const navLabels = ["Codexware", "Observatory", "Work With Us"];
export function closingIssues({ route, context, expectedLinks, navRoutes, navLabels, sectionNavExpected }, doc = document) {
  const issues = [];
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const main = doc.querySelector("main#institutional-main");
  const header = doc.querySelector("header nav[aria-label='Boundary First Labs']");
  const currentTagline = "Trace what follows. Design for repair.";
  const rails = main?.querySelectorAll("[data-reader-section-nav]") ?? [];
  if (typeof sectionNavExpected === "boolean" && rails.length !== (sectionNavExpected ? 1 : 0)) issues.push("page-local navigation must be explicitly admitted on long readers only");
  if (rails.length === 1) {
    const rail = rails[0], hero = main.querySelector("[data-institutional-hero]");
    const links = Array.from(rail.querySelectorAll("a[href]"));
    const ids = links.map(a => a.getAttribute("href"));
    const targets = ids.map(href => href?.startsWith("#") ? doc.getElementById(href.slice(1)) : null);
    const closingTargets = Array.from(main.querySelectorAll("[data-trust-link] h2, [data-doctrine-links] > h2")).map(heading => "#" + heading.id);
    if (!same(ids.slice(-closingTargets.length), closingTargets)) issues.push("section navigation must cover every rendered closing section in its declared order");
    if (hero?.nextElementSibling !== rail || rail.tagName !== "NAV" || rail.getAttribute("aria-label") !== "On this page" ||
        links.length < 2 || new Set(ids).size !== ids.length || targets.some(t => !t || !main.contains(t) || rail.contains(t)) ||
        targets.some((t, i) => i > 0 && !(targets[i-1]?.compareDocumentPosition(t) & 4)) ||
        links.some(a => !a.textContent.trim())) issues.push("section navigation must preserve unique same-page destinations in document order immediately after the hero");
  }
  const bodyLinks = () => Array.from(main?.querySelectorAll("a") ?? []).filter(a => !a.closest("[data-reader-section-nav]"));
  if (doc.querySelector('footer [data-institutional-tagline="footer"]')?.textContent.trim() !== currentTagline) issues.push("shared footer institutional tagline mismatch");
  if (/practice-born\.\s*research-backed\.\s*formally generalized\./i.test(main?.textContent ?? "")) issues.push("superseded institutional slogan in active content");
  if (route === "/") {
    if (main?.querySelector('h1[data-institutional-tagline="home"]')?.textContent.trim() !== currentTagline) issues.push("homepage institutional tagline mismatch");
    if (main?.querySelector('[data-institutional-descriptor]')?.textContent.trim() !== "Research and engineering for consequential systems.") issues.push("homepage institutional descriptor mismatch");
    if (!main?.textContent.includes("Trace consequences, repair defects, and maintain the systems upon which people depend.")) issues.push("homepage maintenance discipline missing");
  }
  const links = Array.from(header?.querySelectorAll("a") ?? []);
  if (!same(links.map(a => a.getAttribute("href")), navRoutes)) issues.push("primary navigation must contain exactly Codexware, Observatory, Work With Us in that order");
  if (!same(links.map(a => a.textContent.trim()), navLabels)) issues.push("primary navigation labels differ from the agreed labels");
  if (!doc.querySelector('header a[aria-label="Boundary First Labs home"][href="/"]')) issues.push("brand does not link home");
  const active = links.filter(a => a.getAttribute("aria-current") === "page").map(a => a.getAttribute("href"));
  const expectedActive = navRoutes.includes(route) ? [route] : route.startsWith("/codexware/") ? ["/codexware"] : route.startsWith("/work-with-us/") ? ["/work-with-us"] : route.startsWith("/observatory/") ? ["/observatory"] : [];
  if (!same(active, expectedActive)) issues.push(`unexpected active primary navigation: ${active.join(", ")}`);
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical || new URL(canonical.href, doc.baseURI).pathname !== route) issues.push(`canonical metadata does not resolve to ${route}`);
  if (route === "/" || route === "/work-with-us") {
    const entry = main?.querySelectorAll(`[data-institution-link="${context}"] a[href="/digital-native-institution"]`) ?? [];
    if (entry.length !== 1 || !entry[0]?.getBoundingClientRect().height) issues.push("one visible contextual link to the digital-native institution is required");
  }
  if (route === "/digital-native-institution") {
    const panel = main?.querySelector('[data-stewardship-values]');
    const headings = ["No consequence without representation", "Responsibility follows consequence", "Our roots must balance our branches", "Truth above authority", "Agency, not dependency"];
    if (!same(Array.from(panel?.querySelectorAll('[data-charter-value] h3') ?? []).map(h=>h.textContent.trim()), headings)) issues.push("five Charter values required in declared order");
    const limits = main?.querySelector('[data-institutional-nongoals]');
    if (!same(Array.from(limits?.querySelectorAll('[data-institutional-limit]') ?? []).map(e=>e.getAttribute('data-institutional-limit')), ['domains','judgment','authority','repair','inquiry','access','sufficiency'])) issues.push("seven institutional non-goals required");
    if (!limits?.querySelector('[data-stewardship-limit]')?.textContent.includes('do not constitute a new charter')) issues.push("stewardship scope limitation missing");
    if (!main?.textContent.includes('An institution must be capable of repairing itself.') || !main?.textContent.includes('Build institutions that can survive their founders.')) issues.push("self-repair and succession commitments missing");
    if (panel?.querySelector('form,input,button,iframe,select,textarea') || limits?.querySelector('form,input,button,iframe,select,textarea')) issues.push("stewardship remains editorial");
  }
  if (route === "/codexware") {
    const panels = main?.querySelectorAll('[data-codexware-commitments]') ?? [];
    const expected = ["Procedurally verifiable opt-in", "Action traceability", "Bounded capability", "External non-execution", "Non-interference by construction"];
    const panel = panels[0];
    if (panels.length !== 1 || !same(Array.from(panel?.querySelectorAll('article h3') ?? []).map(h => h.textContent.trim()), expected)) issues.push("Codexware requires five governance requirements");
    if (!panel?.textContent.includes("Independent external execution is outside their authority")) issues.push("Codexware non-execution boundary missing");
    if (!panel?.querySelector('[data-deployment-limit]')?.textContent.includes("not assurances of current implementation")) issues.push("Codexware implementation-specific limitation missing");
    if (!panel?.querySelector('a[href="/ai-governance"]') || !panel?.querySelector('a[href="/constructive-human-agency"]')) issues.push("Codexware governance and agency cross-links missing");
    if (panel?.querySelector("form,iframe,embed,object,input,textarea,button,select")) issues.push("Codexware commitments must remain editorial");
  }
  if (route === "/codexware") {
    const examples = main?.querySelector('[data-codexware-examples]');
    if (examples?.querySelectorAll('[data-codexware-example]').length !== 5 || !examples?.querySelector('a[href="/codexware/economic-maintenance"]')) issues.push("Codexware five examples and economic link required");
    if (!examples?.querySelector('[data-example-limit]')?.textContent.includes('not promise functionality') || examples?.querySelector('button,form,input,select,textarea,iframe,embed,object')) issues.push("Codexware examples must be bounded editorial content");
  }
  if (route === "/") {
    if (!same(Array.from(main?.querySelectorAll('[data-home-entry-paths] a') ?? []).map(a=>a.getAttribute('href')), navRoutes)) issues.push("homepage three entry cards required");
  }
  if (route === "/codexware") {
    if (!main?.querySelector('[data-civic-record-entry] a[href="/codexware/civic-record"]') || !main?.querySelector('[data-civic-record-entry]')?.textContent.toLowerCase().includes('not publicly available')) issues.push("Civic Record entry and private status required");
  }
  if (route === "/codexware/civic-record") {
    if (!main?.querySelector('[data-civic-status]')?.textContent.includes('no public release, approved real-data intake') || !main?.querySelector('[data-civic-case-limit]')?.textContent.includes('Fictional intended-use')) issues.push("Civic Record release and example limits required");
    if (main?.querySelectorAll('[data-civic-case]').length !== 3 || main?.querySelectorAll('[data-civic-commitments] article').length !== 4 || main?.querySelectorAll('[data-civic-boundary] article').length !== 3) issues.push("Civic Record content incomplete");
    if (!main?.querySelector('[data-civic-boundary]')?.textContent.includes('Documentation is not submission.') || !main?.querySelector('a[href="/codexware"]') || main?.querySelector('form,button,input,select,textarea,iframe,embed,object')) issues.push("Civic Record boundary, return and editorial-only surface required");
  }
  if (route === "/codexware/economic-maintenance") {
    if (main?.querySelectorAll('[data-economic-topics] article').length !== 8 || main?.querySelectorAll('[data-economic-cases] article').length !== 10 || main?.querySelectorAll('[data-economic-method] li').length !== 6) issues.push("economic topic, case and method completeness");
    if (!main?.querySelector('[data-economic-status]')?.textContent.includes('require source-vintage, methodology and specialist review')) issues.push("economic research status required");
    if (Array.from(main?.querySelectorAll('[data-economic-case]') ?? []).some(a => !['Research question','Constructed teaching example'].includes(a.querySelector('[data-case-status]')?.textContent.trim()) || !a.querySelector('[data-case-limit]')?.textContent.trim())) issues.push("economic case status and limitations required");
    if (!main?.querySelector('a[href="/codexware"]') || main?.querySelector('form,button,input,select,textarea,iframe,embed,object')) issues.push("economic page must return to Codexware and stay editorial");
  }
  if (route === "/" || route === "/observatory") {
    const pathway = main?.querySelector(`[data-applied-product-pathway="${route === "/" ? "home" : "observatory"}"]`);
    if (!pathway?.textContent.includes("Boundary First Weather") || !pathway?.textContent.includes("Boundary First Chess") || pathway.querySelectorAll('a[href="/work-with-us/funding#reader-example"]').length !== 1) issues.push("applied product pathway must identify Weather and Chess and resolve to the funding section");
  }
  if (route === "/work-with-us/funding") {
    const portfolio = main?.querySelector('[data-guide-example] [data-applied-product-portfolio]');
    if (!same(Array.from(portfolio?.querySelectorAll('[data-applied-product]') ?? []).map(el => el.getAttribute("data-applied-product")), ["weather","chess","sports","integrations"]) || !portfolio?.textContent.includes("not available products")) issues.push("funding section requires four explicitly bounded applied product directions");
    if (!main?.querySelector('[data-guide-example] > #reader-example')) issues.push("funding product destination must retain its section anchor");
  }
  if (route === "/codexware" && !main?.querySelector('[data-institutional-hero]')?.textContent.includes("flagship software application and computational platform")) issues.push("Codexware identity must be explicit at the masthead");
  const audienceRoutes = {"/codexware": ["/codexware/civic-record", "/observatory/instruments", "/codexware/economic-maintenance", "/observatory/instruments"], "/observatory": ["/observatory/research-architecture", "/observatory/instruments", "/observatory/computational-inquiry", "/observatory/research-architecture", "/observatory/instruments", "/observatory/demonstrations"], "/work-with-us": ["/work-with-us/professional-services", "/observatory/instruments", "/work-with-us/public-service", "/codexware/economic-maintenance", "/ai-governance", "/work-with-us/professional-services", "/work-with-us/paper-auditing", "/observatory/instruments", "/work-with-us/funding", "/digital-native-institution"]};
  if (route in audienceRoutes) {
    const panel = main?.querySelectorAll(`[data-audience-paths="${route.slice(1)}"]`) ?? [];
    const expected = audienceRoutes[route];
    if (panel.length !== 1 || panel[0]?.querySelectorAll('[data-audience-card]').length !== expected.length / 2 || !same(Array.from(panel[0]?.querySelectorAll('a') ?? []).map(a => a.getAttribute('href')), expected)) issues.push('audience paths missing or wrong destination');
    if (panel[0]?.querySelector('form,input,button,select,textarea,iframe,object,embed')) issues.push('audience paths must be editorial navigation');
  }
  if (route === "/observatory") {
    const exhibit = main?.querySelectorAll('[data-observatory-exhibit="public"]') ?? [];
    if (exhibit.length !== 1) issues.push("observatory requires exactly one public exhibition");
    const sections = Array.from(exhibit[0]?.querySelectorAll("[data-observatory-section]") ?? []);
    if (!same(sections.map(s => s.getAttribute("data-observatory-section")), ["foundations", "architecture", "research", "method", "evidence", "demonstration", "release"])) issues.push("observatory exhibition sections missing, duplicated or out of order");
    const expected = { foundations: ["article",5], architecture:["ol li",5], research:["article",5], method:["ol li",4], evidence:["article",7], demonstration:["article",2] };
    for (const [name,[selector,count]] of Object.entries(expected)) if (exhibit[0]?.querySelectorAll(`[data-observatory-section="${name}"] ${selector}`).length !== count) issues.push(`observatory ${name} exhibit incomplete`);
    const demo = exhibit[0]?.querySelector('[data-observatory-section="demonstration"]');
    if (!demo?.textContent.includes("fictional records") || !demo?.textContent.includes("invented teaching example")) issues.push("observatory example must be explicitly fictional");
    const allowed = ["/observatory/intellectual-lineage", "/observatory/research-architecture", "/observatory/computational-inquiry", "/observatory/demonstrations", "/work-with-us/funding#reader-example", "/digital-native-institution", "/codexware", "/work-with-us", "/observatory/instruments", "/evidence-and-trust"];
    if (!same(Array.from(exhibit[0]?.querySelectorAll("[data-exhibit-card] a") ?? []).map(a=>a.getAttribute("href")), allowed.slice(0,4))) issues.push("public Observatory gallery must expose four exhibits in order");
    const nonDoctrineLinks = bodyLinks().filter(a => !a.closest("[data-doctrine-links], [data-audience-paths]"));
    if (!same(nonDoctrineLinks.map(a => a.getAttribute("href")), allowed)) issues.push("observatory body exposes unapproved link or misses public destination");
    if (exhibit[0]?.querySelector("form,iframe,embed,object,input,textarea,button,select")) issues.push("observatory must be a read-only exhibition");
    if (!exhibit[0]?.querySelector('[data-observatory-section="release"]')?.textContent.includes("does not announce a new scientific result")) issues.push("observatory release claim ceiling missing");
  }
  if (route.startsWith("/observatory/") && route !== "/observatory/instruments") {
    if (main?.querySelectorAll("[data-exhibit-limit]").length !== 1 || !main?.querySelector("[data-exhibit-limit]")?.textContent.trim()) issues.push("exhibit requires explicit scope and limitations");
    if ((main?.querySelectorAll("[data-exhibit-body] article").length ?? 0) < 3 || (main?.querySelectorAll("[data-exhibit-comparison] article").length ?? 0) < 3) issues.push("exhibit content is incomplete");
    const refs = Array.from(main?.querySelectorAll("[data-exhibit-references] a[href^='https:']") ?? []).map(a=>a.getAttribute("href"));
    const allowedReferences = ["https://github.com/codexsmith/boundary-first-labs-public/blob/main/INTELLECTUAL_PROVENANCE.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/PUBLICATION_POLICY.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/method/README.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/research/README.md", "https://github.com/codexsmith/boundary-first-labs-public/blob/main/theory/README.md"];
    if (refs.length !== 2 || refs.some(href => !allowedReferences.includes(href))) issues.push("exhibit references must use reviewed public addresses");
    const links = bodyLinks().filter(a=>!a.closest("[data-doctrine-links]")).map(a=>a.getAttribute("href"));
    if (links.filter(href=>href === "/observatory").length !== 2 || links.some(href=>href !== "/observatory" && !allowedReferences.includes(href) && !(["/observatory/demonstrations", "/observatory/research-architecture"].includes(route) && href === "/observatory/instruments"))) issues.push("exhibit requires two return links and no unapproved links");
    if (main?.querySelector("form,iframe,embed,object,input,textarea,button,select")) issues.push("exhibit must remain a static reader");
  }
  const instrumentEntryRoutes = ["/observatory", "/codexware", "/codexware/civic-record", "/codexware/economic-maintenance", "/work-with-us", "/work-with-us/paper-auditing", "/work-with-us/professional-services", "/work-with-us/public-service", "/observatory/demonstrations", "/observatory/research-architecture", "/digital-native-institution", "/ai-governance", "/consequential-systems", "/constructive-human-agency"];
  if (instrumentEntryRoutes.includes(route)) {
    if (main?.querySelectorAll(`[data-instrument-link="${route.slice(1)}"] a[href="/observatory/instruments"]`).length !== 1) issues.push("missing contextual instruments link");
  }
  if (route === "/observatory/instruments") {
    const collection=main?.querySelector('[data-instrument-collection]');
    if (!collection || !same(Array.from(collection.querySelectorAll('[data-instrument-id]')).map(e=>e.getAttribute('data-instrument-id')), ['sufficiency','civic','classification','paper','repair','authority'])) issues.push("six curated instruments required");
    if (collection?.querySelectorAll('[data-instrument-evidence] dt').length !== 30 || collection?.querySelectorAll('[data-instrument-evidence] dd').length !== 30) issues.push("each instrument requires five evidence and limitation fields");
    if (collection?.querySelectorAll('input[type=radio]').length !== 2 || collection?.querySelectorAll('input[type=range]').length !== 3 || collection?.querySelectorAll('input[type=checkbox]').length !== 3 || collection?.querySelectorAll('input').length !== 8 || collection?.querySelectorAll('button').length !== 2 || collection?.querySelector('form,iframe,embed,object,textarea,input[type=file]')) issues.push("only fixed fictional instrument controls permitted");
    if (!collection?.textContent.includes('No personal records, uploads, account access, stored data, remote computation or external execution') || !collection?.textContent.includes('not a live security boundary')) issues.push("instrument scope and evidence ceiling required");
    if (Array.from(collection?.querySelectorAll('a') ?? []).some(a=>!['/observatory','/observatory/research-architecture','/observatory/demonstrations','/observatory/computational-inquiry','/codexware','/codexware/civic-record','/codexware/economic-maintenance','/work-with-us','/work-with-us/professional-services','/work-with-us/paper-auditing','/work-with-us/public-service','/ai-governance'].includes(a.getAttribute('href')))) issues.push("instrument contains unapproved destination");
    if (['modify','send','transact','expand'].some(k=>collection?.querySelector(`[data-operation="${k}"]`)?.textContent.trim()!=="Denied")) issues.push("external execution and original mutation must remain denied");
  }
  if (route === "/work-with-us") {
    const groups = Array.from(main?.querySelectorAll("[data-work-group]") ?? []);
    if (!same(groups.map(g => g.getAttribute("data-work-group")), ["commission", "collaborate", "support", "participate"])) issues.push("Work With Us must expose four engagement groups in order");
    const expectedPaths = {systems:"/work-with-us/professional-services", "governance-review":"/work-with-us/professional-services", "paper-review":"/work-with-us/paper-auditing", research:"/contact", "public-service":"/work-with-us/public-service", partnerships:"/contact", education:"/contact", funding:"/work-with-us/funding", "open-lab":"/contact", media:"/contact", founder:"/observatory/intellectual-lineage", method:"/observatory/computational-inquiry", independence:"/work-with-us/funding", principles:"/digital-native-institution"};
    const cards = Array.from(main?.querySelectorAll("[data-work-path]") ?? []);
    if (!same(cards.map(c => c.getAttribute("data-work-path")), Object.keys(expectedPaths))) issues.push("Work With Us engagement or institutional context cards are missing, duplicated or out of order");
    for (const card of cards) {
      const id = card.getAttribute("data-work-path");
      const links = card.querySelectorAll("a");
      const href = links[0]?.getAttribute("href");
      if (links.length !== 1 || !links[0]?.getBoundingClientRect().height || href !== expectedPaths[id]) issues.push(`Work With Us card ${id} lacks its canonical visible link`);
    }
    if (main?.querySelectorAll('[data-work-section="engagement"] ol li').length !== 4) issues.push("Work With Us must expose four engagement stages");
    const contact = main?.querySelector('[data-work-section="contact"]');
    if (!contact?.querySelector('a[href="/contact"]') || !contact?.querySelector('a[href="mailto:admin@boundaryfirstlabs.com"]')) issues.push("Work With Us requires contact route and direct public email");
  }
  if (route.startsWith("/work-with-us/")) {
    const guide = main?.querySelector(`[data-engagement-guide="${route.slice(1)}"]`);
    if (!guide) issues.push("engagement guide renderer missing");
    if (guide?.querySelectorAll('[data-guide-offers] article').length !== 3) issues.push("engagement guide must expose three offer areas");
    if (guide?.querySelectorAll('[data-guide-method] > div > article').length !== 4) issues.push("engagement guide must expose four substantive method sections");
    for (const marker of ["status", "example", "contact"]) if (!guide?.querySelector(`[data-guide-${marker}]`)) issues.push(`engagement guide lacks ${marker}`);
    if (!guide?.querySelector('[data-guide-contact] a[href="/contact"]') || !guide?.querySelector('[data-guide-contact] a[href^="mailto:admin@boundaryfirstlabs.com?subject="]') || !guide?.querySelector('a[href="/work-with-us"]')) issues.push("engagement guide requires contact and return paths");
  }
  const trustRoutes = ["/codexware", "/codexware/civic-record", "/codexware/economic-maintenance", "/observatory", "/observatory/instruments", "/work-with-us", "/work-with-us/paper-auditing", "/digital-native-institution", "/ai-governance", "/consequential-systems", "/constructive-human-agency"];
  if (trustRoutes.includes(route)) {
    const panel = main?.querySelectorAll('[data-trust-link]') ?? [];
    if (panel.length !== 1 || panel[0].querySelectorAll('a[href="/evidence-and-trust"]').length !== 1) issues.push("contextual trust link missing or incorrect");
  }
  if (route === "/evidence-and-trust") {
    const sections = Array.from(main?.querySelectorAll('[data-trust-section]') ?? []);
    const ids = sections.map(s=>s.getAttribute('data-trust-section'));
    if (!same(ids,['credibility','lineage','method','ai','evidence','example','status','product','publication','correction'])) issues.push("trust section completeness");
    if (!same(Array.from(main?.querySelectorAll('[data-evidence-type]') ?? []).map(x=>x.getAttribute('data-evidence-type')),['testimony','dated-source','digest','deduction','computation','reproduction','checker','proof','empirical','review','authorization']) || main?.querySelectorAll('[data-evidence-type-limit]').length!==11) issues.push("typed evidence and limits required");
    if (main?.querySelectorAll('[data-status-dimension]').length!==6 || !main?.querySelector('[data-status-illustrative]')?.textContent.includes('not the status of a named project')) issues.push("six illustrative status dimensions required");
    if (!main?.querySelector('[data-lineage-limit]')?.textContent.includes('not independent validation') || !main?.querySelector('[data-trust-section="ai"]')?.textContent.includes('not a substitute for scientific evidence or human responsibility')) issues.push("founder and AI evidence ceiling required");
    if (main?.querySelectorAll('[data-public-evidence-card] dt').length!==6 || !main?.querySelector('[data-public-evidence-card]')?.textContent.includes('does not establish a general classification theorem')) issues.push("public evidence card limits required");
    const refs = Array.from(main?.querySelectorAll('[data-trust-references] a') ?? []).map(a=>a.getAttribute('href'));
    if (!same(refs,["https://github.com/codexsmith/boundary-first-labs-public/blob/main/INTELLECTUAL_PROVENANCE.md","https://github.com/codexsmith/boundary-first-labs-public/blob/main/PUBLICATION_POLICY.md"])) issues.push("trust references must be public policies");
    if (!main?.querySelector('[data-trust-section="correction"] a[href="/contact"]') || !main?.querySelector('[data-trust-section="product"]')?.textContent.includes('no public release or approved real-data intake')) issues.push("correction and product boundary required");
    if (main?.querySelector('form,iframe,embed,object,input,textarea,button,select')) issues.push("trust page must be read-only");
    if (!doc.querySelector('footer a[href="/evidence-and-trust"]')) issues.push("footer trust entry required");
    const allowed = ['/','/observatory/instruments','/codexware','/codexware/civic-record','/ai-governance','/contact','/work-with-us','/digital-native-institution','/observatory','/observatory/intellectual-lineage','/consequential-systems','/constructive-human-agency',...refs];
    if (bodyLinks().some(a=>!allowed.includes(a.getAttribute('href')))) issues.push("unapproved trust destination");
  }
  if (!context) return issues;
  const panels = main?.querySelectorAll("[data-doctrine-links]") ?? [];
  if (panels.length !== 1) { issues.push(`expected one doctrine closing section, found ${panels.length}`); return issues; }
  const panel = panels[0];
  if (panel.getAttribute("data-doctrine-links") !== context) issues.push(`incorrect doctrine context: ${panel.getAttribute("data-doctrine-links")}`);
  if (!same(Array.from(panel.querySelectorAll("a")).map(a => a.getAttribute("href")), expectedLinks)) issues.push("doctrine links are missing, duplicated or not canonical");
  if (!panel.getBoundingClientRect().height || panel.hidden) issues.push("doctrine closing section is not rendered");
  for (let node = panel; node && node !== main; node = node.parentElement) {
    for (let sibling = node.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
      if (!sibling.matches("script,style,template,[hidden]") && sibling.getBoundingClientRect().height > 0) {
        issues.push("doctrine closing section must be the final visible content before the general footer");
        break;
      }
    }
  }
  // The search dialog has its own footer. Select the shared site footer explicitly.
  const footers = doc.querySelectorAll("footer[data-institutional-footer]");
  const footer = footers[0];
  // DOCUMENT_POSITION_FOLLOWING = 4; avoid a global Node reference in unit tests.
  if (footers.length !== 1 || !footer?.getBoundingClientRect().height || !(panel.compareDocumentPosition(footer) & 4)) issues.push("general footer must follow the doctrine closing section");
  return issues;
}
export async function doctrineNavigationIssues(page, route) {
  const context = principal[route] || (doctrines.includes(route) ? "related" : null);
  if (!context) return [];
  const expectedLinks = doctrines.filter(d => d !== route);
  // Playwright serializes this self-contained function into the browser.
  return page.evaluate(closingIssues, { route, context, expectedLinks, navRoutes, navLabels, sectionNavExpected: sectionNavRoutes.includes(route) });
}
// Client navigation can commit the URL before Next has replaced route metadata.
// Require the real destination canonical link rather than sampling the old head.
async function waitForDestinationMetadata(page, route) {
  await page.waitForFunction((expected) => {
    const canonical = document.querySelector('link[rel="canonical"]');
    return canonical && new URL(canonical.href, document.baseURI).pathname === expected;
  }, route, { timeout: 10000 });
}

export async function verifyDoctrineTraversals(browser, base, viewport) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const issues = [];
  try {
    for (const source of ["/", "/codexware", "/observatory", "/work-with-us", "/codexware/civic-record", "/work-with-us/paper-auditing"]) {
      try {
        const response = await page.goto(`${base}${source}`, {waitUntil:"domcontentloaded"});
        if (!response?.ok()) throw Error(`source HTTP ${response?.status()}`);
        const link = page.locator(source==="/" ? 'footer a[href="/evidence-and-trust"]' : 'main [data-trust-link] a[href="/evidence-and-trust"]');
        await link.click(); await page.waitForURL(url=>url.pathname==="/evidence-and-trust");
        await waitForDestinationMetadata(page, "/evidence-and-trust");
         const failures=await doctrineNavigationIssues(page,"/evidence-and-trust");
        if(failures.length)throw Error(failures.join("; "));
        await page.goBack(); await page.waitForURL(url=>url.pathname===source); await link.waitFor({state:"visible"});
      }catch(error){issues.push(`${source} -> /evidence-and-trust -> ${source}: ${String(error)}`);}
    }
    for (const source of ["/", "/work-with-us"]) {
      try {
        const response = await page.goto(`${base}${source}`, { waitUntil: "domcontentloaded" });
        if (!response?.ok()) throw Error(`source HTTP ${response?.status()}`);
        const link = page.locator('main [data-institution-link] a[href="/digital-native-institution"]');
        await link.click();
        await page.waitForURL(url => url.pathname === "/digital-native-institution");
        await page.locator("main h1").waitFor({ state: "visible" });
        await waitForDestinationMetadata(page, "/digital-native-institution");
         const failures = await doctrineNavigationIssues(page, "/digital-native-institution");
        if (failures.length) throw Error(failures.join("; "));
        await page.goBack();
        await page.waitForURL(url => url.pathname === source);
        await link.waitFor({ state: "visible" });
      } catch (error) { issues.push(`${source} -> /digital-native-institution -> ${source}: ${String(error)}`); }
    }
    for (const dest of exhibitRoutes) {
      try {
        const response = await page.goto(`${base}/observatory`, { waitUntil: "domcontentloaded" });
        if (!response?.ok()) throw Error(`source HTTP ${response?.status()}`);
        await page.locator(`main [data-exhibit-card] a[href="${dest}"]`).click();
        await page.waitForURL(url => url.pathname === dest);
        await waitForDestinationMetadata(page, dest);
         const failures = await doctrineNavigationIssues(page, dest);
        if (failures.length) throw Error(failures.join("; "));
        await page.goBack();
        await page.waitForURL(url => url.pathname === "/observatory");
      } catch (error) { issues.push(`/observatory -> ${dest} -> /observatory: ${String(error)}`); }
    }
    for (const dest of guideRoutes) {
      try {
        const response = await page.goto(`${base}/work-with-us`, { waitUntil: "domcontentloaded" });
        if (!response?.ok()) throw Error(`source HTTP ${response?.status()}`);
        await page.locator(`main [data-work-path] a[href="${dest}"]`).first().click();
        await page.waitForURL(url => url.pathname === dest);
        await waitForDestinationMetadata(page, dest);
         const failures = await doctrineNavigationIssues(page, dest);
        if (failures.length) throw Error(failures.join("; "));
        await page.goBack();
        await page.waitForURL(url => url.pathname === "/work-with-us");
      } catch (error) { issues.push(`/work-with-us -> ${dest} -> /work-with-us: ${String(error)}`); }
    }
    for (const source of [...Object.keys(principal), ...doctrines]) {
      for (const dest of doctrines.filter(d => d !== source)) {
        try {
          const response = await page.goto(`${base}${source}`, { waitUntil: "domcontentloaded" });
          if (!response?.ok()) throw Error(`source HTTP ${response?.status()}`);
          const link = page.locator(`main [data-doctrine-links] a[href="${dest}"]`);
          await link.click();
          await page.waitForURL(url => url.pathname === dest);
          await page.locator("main h1").waitFor({ state: "visible" });
          await waitForDestinationMetadata(page, dest);
         const failures = await doctrineNavigationIssues(page, dest);
          if (failures.length) throw Error(failures.join("; "));
          await page.goBack();
          await page.waitForURL(url => url.pathname === source);
          await page.locator(`main [data-doctrine-links] a[href="${dest}"]`).waitFor({ state: "visible" });
        } catch (error) {
          issues.push(`${source} -> ${dest} -> ${source}: ${String(error)}`);
        }
      }
    }
  } finally { await context.close(); }
  return issues;
}

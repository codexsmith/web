// Behavioral witnesses derived from docs/boundary-first-ux-conformance-contract.md.
// This is not a certification score. Test actual reader state rather than visual resemblance.
import assert from "node:assert/strict";
import path from "node:path";
import { doctrineFrontDoor } from "../../src/components/institutional/content/doctrineFrontDoor.ts";

const focusWitness = async locator => locator.evaluate(async element => {
  // Inspect the painted focus state after layout; still require both actual
  // DOM focus and the full visible outline, without retries or relaxed bounds.
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const style = getComputedStyle(element);
  const active = document.activeElement;
  const rect = element.getBoundingClientRect();
  const transparent = color => !color || color === "transparent" || /^rgba\([^)]*,\s*0(?:\.0+)?\)$/.test(color);
  const outline = style.outlineStyle !== "none" && style.outlineStyle !== "hidden" &&
    parseFloat(style.outlineWidth) >= 2 && !transparent(style.outlineColor);
  return {
    tag: element.tagName, id: element.id,
    activeTag: active?.tagName, activeId: active?.id,
    hasFocus: active === element, focusVisible: element.matches(":focus-visible"),
    outline: {style: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor, offset: style.outlineOffset},
    boxShadow: style.boxShadow, forcedColors: matchMedia("(forced-colors: active)").matches,
    rect: [rect.x, rect.y, rect.width, rect.height],
    inViewport: rect.width > 0 && rect.height > 0 && rect.right > 0 &&
      rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight,
    passes: active === element && outline && rect.width > 0 && rect.height > 0,
  };
});
const fit = async page => assert.ok(await page.evaluate(() =>
  Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= window.innerWidth + 1
), "expanded or interactive representation exceeds the viewport");
const textIs = async (page, selector, expected) => {
  await page.waitForFunction(({selector, expected}) => document.querySelector(selector)?.textContent.trim() === expected,
    {selector, expected}, {timeout: 5000});
};
const open = async (page, base, route) => {
  const response = await page.goto(base + route, {waitUntil: "load"});
  assert.ok(response?.ok(), route + " is not available");
  await page.evaluate(() => document.fonts.ready);
  // Establish keyboard modality via a real keyboard event before targeted focus.
  await page.keyboard.press("Tab");
};
async function key(locator, keyName) {
  await locator.focus();
  await locator.press(keyName);
}
// Test the actual solid-color text substrate, rather than token names.
// Computed Chromium sRGB colors are expected here; reject transparency
// or an unsupported serialization rather than assuming a contrast ratio.
const contrastWitness = locator => locator.evaluate(node => {
  const channels = color => {
    const match = color.match(/^rgba?\(([^)]+)\)$/);
    if (!match) return null;
    const values = match[1].split(",").map(Number);
    return values.length === 3 || (values.length === 4 && values[3] === 1) ? values.slice(0, 3) : null;
  };
  const luminance = values => values.map(x => x / 255).map(x =>
    x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4
  ).reduce((sum, x, i) => sum + x * [.2126, .7152, .0722][i], 0);
  const style = getComputedStyle(node);
  const bg = channels(style.backgroundColor);
  const checks = [...node.querySelectorAll("strong,span")].filter(el => el.childElementCount === 0).map(el => {
    const color = getComputedStyle(el).color;
    const fg = channels(color);
    if (!fg || !bg) return {color, ratio: 0};
    const values = [luminance(fg), luminance(bg)].sort((a,b) => b-a);
    return {color, ratio: (values[0] + .05) / (values[1] + .05)};
  });
  return {background: style.backgroundColor, image: style.backgroundImage,
    forcedColorAdjust: style.forcedColorAdjust, checks};
});
async function checkNameplateContrast(locator) {
  assert.ok(await locator.isVisible());
  const witness = await contrastWitness(locator);
  assert.ok(witness.image === "none" && witness.forcedColorAdjust === "auto" &&
    witness.checks.length > 0 && witness.checks.every(item => item.ratio >= 4.5),
    "nameplate text contrast must preserve reading and system-color choice: " + JSON.stringify(witness));
}
export async function verifyReaderUx(browser, base, mode, reviewDir) {
  const results = [];
  const context = await browser.newContext({
    viewport: mode.viewport, reducedMotion: "reduce", forcedColors: mode.forcedColors ?? "none",
  });
  const page = await context.newPage();
  const modeSlug = mode.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  async function scenario(label, run) {
    const issues = [];
    const focusSamples = [];
    const captures = [];
    // A missing focus ring remains a blocking issue, but must not prevent the
    // remaining model transitions and privacy obligations from being exercised.
    const checkFocus = async (locator, name) => {
      await locator.scrollIntoViewIfNeeded();
      const sample = await focusWitness(locator);
      focusSamples.push({name, ...sample});
      if (!sample.passes || !sample.inViewport) {
        issues.push(name + ": focus obligation failed: " + JSON.stringify(sample));
      }
    };
    const capture = async (name, locator) => {
      if (!reviewDir) return;
      if (locator) await locator.scrollIntoViewIfNeeded();
      const file = modeSlug + "--" + name + ".png";
      await page.screenshot({path: path.join(reviewDir, file), fullPage: false, animations: "disabled"});
      captures.push(file);
    };
    try { await run(checkFocus, capture); }
    catch (error) { issues.push(String(error)); }
    results.push({name: "BFUX reader: " + label + " @ " + mode.name, issues, focusSamples, captures});
  }
  try {
    await scenario("orientation and reversible reader disclosure", async (checkFocus, capture) => {
      await open(page, base, "/");
      const wordmark = page.locator("header [data-institutional-wordmark]");
      assert.ok(await wordmark.isVisible(), "institutional wordmark must remain visible on arrival");
      assert.equal(await wordmark.innerText(), "Boundary First Labs");
      if (mode.forcedColors === "active") {
        assert.ok(await page.evaluate(() => matchMedia("(forced-colors: active)").matches), "forced-colors emulation is required");
        const rail = await page.locator("header[data-header-compact]").evaluate(node => {
          const style = getComputedStyle(node);
          const color = style.backgroundColor;
          const opaque = color.startsWith("rgb(") || (color.startsWith("rgba(") && Number(color.slice(5, -1).split(",").at(-1)) === 1);
          return { color, image: style.backgroundImage, opaque };
        });
        assert.ok(rail.opaque && rail.image === "none", "forced-color sticky rail must have an opaque system-color background: " + JSON.stringify(rail));
      }
      await fit(page);
      const paths = page.locator("main [data-home-entry-paths]");
      assert.equal(await paths.locator("h2").innerText(), "Three ways into the Lab");
      assert.deepEqual(await paths.locator("a").evaluateAll(nodes => nodes.map(a => a.getAttribute("href"))),
        ["/codexware", "/observatory", "/work-with-us"]);
      // Decorative symbols must follow route identity, not become a parallel
      // navigation system or independent accessible controls.
      const checkGlyphs = async (region, expected) => {
        const entries = await region.locator("a").evaluateAll(links => links.map(link => {
          const marks = [...link.querySelectorAll("[data-reader-glyph]")];
          const mark = marks[0];
          const rect = mark?.getBoundingClientRect();
          return {
            href: link.getAttribute("href"),
            glyph: mark?.getAttribute("data-reader-glyph"),
            decorative: marks.length === 1 && mark.getAttribute("aria-hidden") === "true" &&
              mark.getAttribute("focusable") === "false",
            visible: !!rect && rect.width > 0 && rect.height > 0,
            title: link.querySelector("h3")?.textContent.trim(),
          };
        }));
        assert.deepEqual(entries.map(({href,glyph}) => [href,glyph]), expected);
        assert.ok(entries.every(entry => entry.decorative && entry.visible && entry.title),
          "reader glyphs preserve written labels and decorative semantics");
      };
      await checkGlyphs(paths, [
        ["/codexware", "operation"], ["/observatory", "observation"], ["/work-with-us", "collaboration"],
      ]);
      await capture("home-entry-paths", paths);
      const origin = page.locator('[data-reader-heritage="origin"]');
      assert.equal(await origin.locator("h2").textContent(), doctrineFrontDoor.history.title);
      assert.equal(await origin.locator("p").last().textContent(), doctrineFrontDoor.history.body);
      assert.ok(await origin.locator('a[href="/observatory/intellectual-lineage"]').isVisible());
      const purpose = page.locator('[data-reader-heritage="purpose"]');
      assert.ok(await purpose.isVisible());
      assert.equal(await purpose.textContent(), doctrineFrontDoor.mission.humanPurpose,
        "human purpose remains the existing authored text");
      await capture("heritage-purpose", purpose);
      const doctrines = page.locator('main [data-doctrine-links="home"]');
      await checkGlyphs(doctrines, [
        ["/consequential-systems", "consequence"], ["/ai-governance", "governance"],
        ["/constructive-human-agency", "agency"],
      ]);
      await capture("doctrine-glyphs", doctrines);
      await open(page, base, "/observatory");
      const details = page.locator("main [data-reader-detail]");
      assert.equal(await details.count(), 4);
      for (const name of ["foundations", "architecture", "method", "evidence"]) {
        const item = page.locator(`[data-reader-detail="${name}"]`);
        const summary = item.locator("summary");
        const original = await item.locator("h3").allTextContents();
        assert.ok(original.length > 0);
        assert.equal(await item.getAttribute("open"), null);
        await key(summary, "Enter");
        assert.notEqual(await item.getAttribute("open"), null);
        assert.ok(await item.locator("h3").first().isVisible());
        assert.deepEqual(await item.locator("h3").allTextContents(), original);
        await checkFocus(summary, name + " disclosure");
        if (name === "foundations") await capture("observatory-disclosure", summary);
        await fit(page);
        await key(summary, "Space");
        assert.equal(await item.getAttribute("open"), null);
        assert.deepEqual(await item.locator("h3").allTextContents(), original);
      }
    });
    await scenario("masthead engraving containment and projection", async (_checkFocus, capture) => {
      const cases = [
        ["/", "boundary"],
        ["/codexware", "operation"],
        ["/observatory", "observation"],
        ["/work-with-us", "collaboration"],
      ];
      for (const [route, kind] of cases) {
        await open(page, base, route);
        const hero = page.locator("main [data-institutional-hero]");
        const mark = hero.locator(`[data-reader-masthead="${kind}"]`);
        assert.equal(await mark.count(), 1);
        assert.equal(await mark.getAttribute("aria-hidden"), "true");
        assert.equal(await mark.getAttribute("focusable"), "false");
        const wide = mode.viewport.width >= 1280 && mode.forcedColors !== "active";
        assert.equal(await mark.isVisible(), wide, "ornament must yield in compact and forced-color projections");
        if (wide) {
          const witness = await mark.evaluate(node => {
            const parent = node.parentElement;
            const area = node.getBoundingClientRect();
            const frame = parent.getBoundingClientRect();
            const contains = area.width > 0 && area.height > 0 &&
              area.left >= frame.left && area.right <= frame.right + 1 &&
              area.top >= frame.top && area.bottom <= frame.bottom;
            const overlaps = rect => rect.width > 0 && rect.height > 0 &&
              rect.left < area.right && rect.right > area.left &&
              rect.top < area.bottom && rect.bottom > area.top;
            const collisions = [];
            const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
            for (let text = walker.nextNode(); text; text = walker.nextNode()) {
              if (node.contains(text) || !text.textContent.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(text);
              if ([...range.getClientRects()].some(overlaps)) collisions.push(text.textContent.trim());
            }
            for (const control of parent.querySelectorAll("a,button,input,select,textarea,summary")) {
              if (overlaps(control.getBoundingClientRect())) collisions.push("interactive region");
            }
            return {
              contains, collisions,
              pointerEvents: getComputedStyle(node).pointerEvents,
              position: getComputedStyle(node).position,
            };
          });
          assert.ok(witness.contains && witness.collisions.length === 0 &&
            witness.pointerEvents === "none" && witness.position === "absolute",
            "masthead ornament must occupy only unclaimed reading space: " + JSON.stringify(witness));
        }
        assert.equal(await hero.locator("h1").count(), 1);
        await fit(page);
        await capture("masthead-" + kind, hero);
      }
    });
    await scenario("title-first compact heading metadata", async (_checkFocus, capture) => {
      const samples = ["/", "/observatory", "/codexware", "/work-with-us", "/constructive-human-agency",
        "/digital-native-institution", "/evidence-and-trust", "/observatory/intellectual-lineage",
        "/observatory/instruments", "/codexware/civic-record", "/codexware/economic-maintenance",
        "/work-with-us/paper-auditing", "/contact"];
      for (const route of samples) {
        await open(page, base, route);
        const rows = page.locator("main [data-reader-heading-meta]");
        assert.ok(await rows.count() > 0, "reader must contain heading metadata: " + route);
        const hero = page.locator("main [data-institutional-hero]");
        assert.equal(await hero.locator(":scope > h1 + [data-reader-heading-meta]").count(), 1,
          "title precedes hero metadata in document order");
        for (const row of await rows.all()) {
          const witness = await row.evaluate(node => {
            const parent = node.previousElementSibling;
            const bounds = node.getBoundingClientRect();
            const title = parent?.getBoundingClientRect();
            const items = [...node.children].map(el => {
              const rect = el.getBoundingClientRect();
              return {text: el.textContent.trim(), top: rect.top, bottom: rect.bottom,
                left: rect.left, right: rect.right, width: rect.width, height: rect.height};
            });
            const style = getComputedStyle(node);
            return {
              heading: parent?.tagName,
              follows: !!title && bounds.top >= title.bottom - 1,
              layout: style.display,
              wrap: style.flexWrap,
              bounded: items.every(x => x.text && x.height > 0 && x.width > 0 &&
                x.left >= bounds.left - 1 && x.right <= bounds.right + 1 &&
                x.top >= bounds.top - 1 && x.bottom <= bounds.bottom + 1),
              nonoverlap: items.length < 2 || items[1].top >= items[0].bottom - 1 || items[1].left >= items[0].right - 1,
              items,
            };
          });
          assert.ok(["H1","H2"].includes(witness.heading) && witness.follows &&
            witness.layout === "flex" && witness.wrap === "wrap" && witness.bounded && witness.nonoverlap,
            "heading metadata remains below its title, legible and naturally wrapping: " + JSON.stringify(witness));
        }
        if (route === "/observatory") {
          const meta = hero.locator(":scope > [data-reader-heading-meta]");
          assert.deepEqual(await meta.locator(":scope > p").allTextContents(),
            [doctrineFrontDoor.observatory.eyebrow, doctrineFrontDoor.observatory.tagline]);
          const sameLine = await meta.evaluate(node => {
            const [a,b] = [...node.children].map(el => el.getBoundingClientRect());
            return b.left >= a.right && b.top < a.bottom && a.top < b.bottom;
          });
          if (mode.viewport.width >= 1280) assert.ok(sameLine,
            "short Observatory hero metadata shares a single line when there is room");
          if (mode.viewport.width <= 390) assert.ok(!sameLine,
            "compact Observatory metadata wraps instead of forcing overflow");
          await capture("title-first-observatory-hero", hero);
          await capture("title-first-observatory-section", page.locator('[data-audience-paths="observatory"] h2'));
          const panel = page.locator('[data-audience-paths="observatory"]');
          assert.equal(await panel.locator("[data-audience-intro], [data-reader-heading-meta]").count(), 0,
            "Observatory audience heading should not repeat its invitation or hero scope");
          assert.equal(await panel.locator(":scope > h2").textContent(), doctrineFrontDoor.audiencePaths.observatory.title);
          const cards = panel.locator("[data-audience-card]");
          assert.equal(await cards.count(), doctrineFrontDoor.audiencePaths.observatory.cards.length);
          for (const [index, card] of (await cards.all()).entries()) {
            const model = doctrineFrontDoor.audiencePaths.observatory.cards[index];
            const witness = await card.evaluate(node => {
              const [title, label, description, actions] = node.children;
              const type = el => {
                const style = getComputedStyle(el);
                return {size: parseFloat(style.fontSize), weight: parseFloat(style.fontWeight),
                  line: parseFloat(style.lineHeight), family: style.fontFamily};
              };
              const gap = (a,b) => b.getBoundingClientRect().top - a.getBoundingClientRect().bottom;
              const style = getComputedStyle(node);
              const panel = node.closest("[data-audience-paths]");
              const sectionStyle = getComputedStyle(panel);
              const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
              return {
                heading: title.tagName, title: title.textContent.trim(),
                label: label.textContent.trim(), description: description.textContent.trim(),
                titleType: type(title), labelType: type(label), bodyType: type(description),
                actionType: type(actions.querySelector("a")), rootSize,
                targets: [...actions.querySelectorAll("a")].map(a => ({
                  height: a.getBoundingClientRect().height,
                  decoration: getComputedStyle(a).textDecorationLine,
                  href: a.getAttribute("href"),
                })),
                titleGap: gap(title,label), bodyGap: gap(description,actions),
                panelPadding: parseFloat(style.paddingTop),
                sectionPadding: parseFloat(sectionStyle.paddingTop),
              };
            });
            assert.deepEqual([witness.heading, witness.title, witness.label, witness.description],
              ["H3", model.question, model.audience, model.body]);
            assert.deepEqual(witness.targets.map(t=>t.href), model.links.map(l=>l.href));
            assert.ok(witness.titleType.size >= witness.bodyType.size * 1.49 &&
              witness.labelType.size <= witness.bodyType.size * .8 &&
              witness.bodyType.size >= witness.rootSize &&
              witness.titleType.weight >= 600 && witness.actionType.weight >= 600 &&
              witness.bodyType.line >= witness.bodyType.size * 1.5 &&
              witness.targets.every(t=>t.height >= 24 && t.decoration.includes("underline")),
              "typographic roles must be distinctly readable without smaller body copy or targets: " + JSON.stringify(witness));
            assert.ok(witness.titleGap >= 0 && witness.titleGap <= 7 &&
              witness.bodyGap >= 0 && witness.bodyGap <= 13 &&
              witness.panelPadding >= 16 && witness.panelPadding <= 20 &&
              witness.sectionPadding >= 20 && witness.sectionPadding <= 36,
              "related text and actions must use the bounded spacing hierarchy: " + JSON.stringify(witness));
          }
          await capture("type-and-space-observatory-card", cards.first());
        }
        await fit(page);
      }
    });
    await scenario("editorial chapter sequence and caption identity", async (_checkFocus, capture) => {
      // Chapter ordinals are presentation-local. Check the canonical editorial
      // text, not just the presence or sequentiality of the decoration.
      const samples = [
        ["/consequential-systems", doctrineFrontDoor.doctrines.find(item => item.slug === "consequential-systems").sections],
        ["/ai-governance", doctrineFrontDoor.doctrines.find(item => item.slug === "ai-governance").sections],
        ["/constructive-human-agency", doctrineFrontDoor.doctrines.find(item => item.slug === "constructive-human-agency").sections],
        ["/digital-native-institution", doctrineFrontDoor.digitalNativeInstitution.sections],
        ["/work-with-us/paper-auditing", doctrineFrontDoor.engagementGuides.find(item => item.slug === "work-with-us/paper-auditing").sections],
        ["/observatory/intellectual-lineage", doctrineFrontDoor.observatoryExhibits.find(item => item.slug === "observatory/intellectual-lineage").sections],
        ["/observatory/demonstrations", doctrineFrontDoor.observatoryExhibits.find(item => item.slug === "observatory/demonstrations").sections],
      ];
      const normalize = text => text.trim().replace(/\s+/g, " ");
      for (const [route, sections] of samples) {
        await open(page, base, route);
        const chapters = page.locator("main [data-reader-chapter]");
        const witnesses = await chapters.evaluateAll(nodes => nodes.map(node => {
          const marker = node.querySelector("[data-reader-chapter-ordinal]");
          const rect = marker?.getBoundingClientRect();
          return {
            number: Number(node.getAttribute("data-reader-chapter")),
            ordinal: marker?.textContent.trim(),
            redundant: marker?.getAttribute("aria-hidden") === "true",
            visible: !!rect && rect.width > 0 && rect.height > 0,
            title: node.querySelector(":scope > h2")?.textContent.trim(),
            body: node.querySelector(":scope > p")?.textContent.trim(),
          };
        }));
        assert.equal(witnesses.length, sections.length);
        for (const [index, witness] of witnesses.entries()) {
          assert.equal(witness.number, index + 1);
          assert.equal(witness.ordinal, String(index + 1).padStart(2, "0"));
          assert.ok(witness.redundant && witness.visible, "chapter ordinals must be visible but redundant");
          assert.equal(normalize(witness.title), normalize(sections[index].title), "chapter heading identity must survive editorial numbering");
          assert.equal(normalize(witness.body), normalize(sections[index].body), "chapter body must remain unchanged");
        }
        await fit(page);
        if (route === "/consequential-systems") await capture("editorial-chapters", chapters.first());
        if (route === "/digital-native-institution") {
          const principle = page.locator('[data-reader-heritage="stewardship"]');
          assert.ok(await principle.isVisible());
          assert.equal(normalize(await principle.textContent()), normalize(doctrineFrontDoor.digitalNativeInstitution.principle));
          await capture("heritage-stewardship", principle);
        }
        if (route === "/observatory/intellectual-lineage") {
          const lineage = doctrineFrontDoor.observatoryExhibits.find(item => item.slug === "observatory/intellectual-lineage");
          const scope = page.locator('[data-reader-heritage="lineage-exhibit"] [data-exhibit-limit]');
          assert.ok(await scope.isVisible());
          assert.equal(normalize(await scope.locator("p").last().textContent()), normalize(lineage.limit));
          await capture("heritage-intellectual-lineage", scope);
        }
        if (route === "/observatory/demonstrations") {
          const figures = page.locator("main [data-reader-scientific-figure]");
          const captions = await figures.evaluateAll(nodes => nodes.map(node => ({
            number: Number(node.getAttribute("data-reader-figure-number")),
            caption: node.querySelector("figcaption")?.textContent.replace(/\s+/g, " ").trim(),
          })));
          assert.deepEqual(captions.map(item => item.number), [1,2,3]);
          for (const [index, item] of captions.entries()) {
            assert.ok(item.caption.startsWith("Figure " + String(index + 1).padStart(2, "0")),
              "scientific figure caption must preserve page-local numbering");
          }
          await capture("editorial-caption", figures.first());
        }
      }
    });
    await scenario("scientific illustration fidelity and accessible projection", async (_checkFocus, capture) => {
      await open(page, base, "/observatory/demonstrations");
      const figures = page.locator("main [data-reader-scientific-figure]");
      assert.deepEqual(await figures.evaluateAll(nodes => nodes.map(node => node.getAttribute("data-reader-scientific-figure"))),
        ["geometry", "inventory", "outcome"]);
      for (const figure of await figures.all()) {
        const svg = figure.locator('svg[role="img"][focusable="false"]');
        assert.equal(await svg.count(), 1);
        assert.ok(await svg.isVisible());
        assert.ok((await svg.getAttribute("aria-label"))?.trim());
        assert.ok((await figure.locator("figcaption").innerText()).trim());
        await checkNameplateContrast(figure.locator("[data-science-caption-band]"));
        assert.equal(await figure.locator("button,a,input,select,textarea,[tabindex]").count(), 0);
        assert.ok(await svg.evaluate(node => {
          const bounds = node.getBoundingClientRect();
          const width = node.viewBox.baseVal.width;
          return bounds.width > 0 && width === 320 &&
            [...node.querySelectorAll("text")].every(text => {
              const box = text.getBBox();
              return box.x >= -1 && box.x + box.width <= width + 1;
            });
        }), "scientific labels must remain inside their viewBox");
      }
      const rectangles = await page.locator("[data-figure-rectangle]").evaluateAll(nodes => nodes.map(node => {
        const rect = node.querySelector("rect");
        return {
          width: Number(node.getAttribute("data-width")),
          height: Number(node.getAttribute("data-height")),
          area: Number(node.getAttribute("data-area")),
          perimeter: Number(node.getAttribute("data-perimeter")),
          drawnWidth: Number(rect.getAttribute("width")),
          drawnHeight: Number(rect.getAttribute("height")),
        };
      }));
      assert.deepEqual(rectangles, [
        {width:6,height:2,area:12,perimeter:16,drawnWidth:84,drawnHeight:28},
        {width:4,height:3,area:12,perimeter:14,drawnWidth:56,drawnHeight:42},
      ], "equal-area rectangles must preserve the same length scale");
      const inventory = await page.locator("[data-figure-inventory]").evaluateAll(nodes => nodes.map(node => ({
        total: node.querySelectorAll("[data-figure-stock]").length,
        reserved: node.querySelectorAll('[data-figure-stock="reserved"]').length,
        available: node.querySelectorAll('[data-figure-stock="available"]').length,
        crossed: node.querySelectorAll('[data-figure-stock="reserved"] path').length,
      })));
      assert.deepEqual(inventory, [
        {total:10,reserved:0,available:10,crossed:0},
        {total:10,reserved:7,available:3,crossed:7},
      ], "inventory cells and non-color-only reservation markers must match the fictional example");
      assert.equal(await page.locator('[data-figure-observation="Complete"]').count(), 1);
      for (const kind of ["geometry", "inventory", "outcome"]) {
        await capture("science-" + kind, page.locator(`[data-reader-scientific-figure="${kind}"]`));
      }
      await fit(page);
      await open(page, base, "/observatory");
      const overview = page.locator('[data-observatory-section="demonstration"] [data-reader-scientific-figure="outcome"]');
      assert.equal(await overview.count(), 1);
      assert.ok(await overview.isVisible());
      assert.equal(await overview.locator('[data-figure-observation="Complete"]').count(), 1);
      assert.equal(await overview.getAttribute("data-reader-figure-number"), "1", "reused figure numbering belongs to the local reader");
      await fit(page);
    });
    await scenario("bounded reader density and preserved engagement paths", async (checkFocus, capture) => {
      await open(page, base, "/evidence-and-trust");
      const details = page.locator("main [data-trust-detail]");
      assert.equal(await details.count(), 6);
      assert.equal(await page.locator("main [data-evidence-type]").count(), 11);
      assert.equal(await page.locator("main [data-status-dimension]").count(), 6);
      const compactHeight = await page.locator("main").evaluate(node => node.scrollHeight);
      await capture("trust-compact", page.locator("[data-trust-section=credibility]"));
      for (const id of ["credibility", "lineage", "method", "ai", "evidence", "status"]) {
        const detail = page.locator(`[data-trust-detail="${id}"]`);
        const summary = detail.locator("summary");
        const original = await detail.locator("h3").allTextContents();
        assert.ok(original.length > 0);
        assert.equal(await detail.getAttribute("open"), null);
        await key(summary, "Enter");
        assert.notEqual(await detail.getAttribute("open"), null);
        assert.ok(await detail.locator("h3").first().isVisible());
        assert.deepEqual(await detail.locator("h3").allTextContents(), original);
        await checkFocus(summary, "trust " + id);
        await fit(page);
        if (id === "evidence") await capture("trust-evidence-expanded", summary);
        if (id === "lineage") {
          const stages = await detail.locator("ol > li").evaluateAll(nodes => nodes.map(node => ({
            title: node.querySelector("h3").textContent.trim(),
            body: node.querySelector("p").textContent.trim(),
          })));
          assert.deepEqual(stages, doctrineFrontDoor.trustCenter.lineage,
            "heritage rendering must preserve the founder-attributed ordered account");
          assert.ok(await page.locator("[data-lineage-limit]").isVisible());
          assert.equal(await page.locator("[data-lineage-limit]").textContent(), doctrineFrontDoor.trustCenter.lineageLimit);
          await capture("heritage-lineage", detail.locator("ol > li").first());
        }
        assert.ok(await page.locator("main").evaluate(node => node.scrollHeight) > compactHeight);
        await key(summary, "Space");
        assert.equal(await detail.getAttribute("open"), null);
        assert.deepEqual(await detail.locator("h3").allTextContents(), original);
      }
      assert.ok(await page.locator("[data-lineage-limit]").isVisible());
      assert.ok(await page.locator("[data-status-illustrative]").isVisible());
      assert.ok(await page.locator("[data-public-evidence-card]").isVisible());
      assert.ok(await page.locator('[data-trust-section="correction"] a[href="/contact"]').isVisible());
      await open(page, base, "/work-with-us");
      assert.equal(await page.locator("main [data-work-path]").count(), 14);
      for (const link of await page.locator("main [data-work-path] a").all()) assert.ok(await link.isVisible(), "engagement destination cannot be hidden by disclosure");
      const engagement = page.locator("[data-engagement-detail]");
      const summary = engagement.locator("summary");
      assert.equal(await engagement.getAttribute("open"), null);
      await key(summary, "Enter");
      assert.equal(await engagement.locator("li:visible").count(), 4);
      await checkFocus(summary, "engagement stages");
      await fit(page);
      await key(summary, "Space");
      assert.equal(await engagement.getAttribute("open"), null);
      await capture("work-paths-compact", page.locator('[data-work-group="commission"]'));
    });
    await scenario("semantic collection syntax and scope preservation", async (_checkFocus, capture) => {
      const checkCollection = async (collection, role, expected) => {
        assert.equal(await collection.count(), 1);
        const witness = await collection.evaluate((node, role) => {
          const frame = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          const rects = [...node.children].map(el => {
            const box = el.getBoundingClientRect(), css = getComputedStyle(el);
            return {x:box.x,y:box.y,right:box.right,bottom:box.bottom,width:box.width,height:box.height,
              borderTop:parseFloat(css.borderTopWidth),borderBottom:parseFloat(css.borderBottomWidth),
              borderLeft:parseFloat(css.borderLeftWidth),borderRight:parseFloat(css.borderRightWidth),
              shadow:css.boxShadow, links:[...el.querySelectorAll("a")].map(a=>({href:a.getAttribute("href"),height:a.getBoundingClientRect().height}))};
          });
          const strip = ["reference","directory","comparison","sequence"].includes(role);
          return {
            role:node.getAttribute("data-reader-collection"), display:style.display,
            columns:style.gridTemplateColumns.split(/\s+/).filter(Boolean).length,
            count:rects.length, bounded:rects.every(r=>r.width>0&&r.height>0&&r.x>=frame.left-1&&r.right<=frame.right+1&&r.y>=frame.top-1&&r.bottom<=frame.bottom+1),
            strips:!strip||rects.every(r=>r.borderTop===0&&r.borderLeft===0&&r.borderRight===0&&r.borderBottom>=1&&r.shadow==="none"),
            ordered:!strip||rects.every((r,i)=>i===0||r.y>=rects[i-1].bottom-1),
            targets:rects.flatMap(r=>r.links),
          };
        }, role);
        assert.ok(witness.role===role&&witness.count===expected&&witness.display==="grid"&&witness.bounded&&witness.strips&&witness.ordered,
          "collection role determines containment and row/peer structure: "+JSON.stringify(witness));
        assert.ok(witness.targets.every(t=>t.height>=24),"collection actions retain visible usable targets");
        return witness;
      };
      const normalize = s => s.trim().replace(/\s+/g," ");
      await open(page, base, "/");
      const gateways=page.locator('[data-home-entry-paths] [data-reader-collection="gateway"]');
      const primary=await checkCollection(gateways,"gateway",3);
      assert.deepEqual(primary.targets.map(t=>t.href),doctrineFrontDoor.home.paths.map(x=>x.href));
      await open(page, base, "/observatory");
      const paths=await checkCollection(page.locator('[data-audience-paths="observatory"] [data-reader-collection="pathways"]'),"pathways",3);
      assert.equal(paths.columns,mode.viewport.width>=1200?3:1,"peer pathways recompose by available reading width");
      const gallery=page.locator('[data-observatory-gallery] [data-reader-collection="directory"]');
      const exhibits=await checkCollection(gallery,"directory",4);
      assert.deepEqual(exhibits.targets.map(t=>t.href),doctrineFrontDoor.observatoryExhibits.map(x=>"/"+x.slug));
      const directions=page.locator('[data-observatory-section="research"] [data-reader-collection="reference"]');
      await checkCollection(directions,"reference",doctrineFrontDoor.observatory.research.length);
      assert.deepEqual(await directions.locator("article h3").allTextContents(),doctrineFrontDoor.observatory.research.map(x=>x.title));
      assert.equal(await directions.locator("a,button,input,select,textarea,[tabindex]").count(),0,"reference material is not an invented interactive destination");
      await capture("collection-reference-directory",directions);
      await fit(page);
      await open(page,base,"/work-with-us");
      for(const group of doctrineFrontDoor.workWithUs.groups){
        const directory=page.locator(`[data-work-group="${group.id}"] [data-reader-collection="directory"]`);
        const observed=await checkCollection(directory,"directory",group.cards.length);
        assert.deepEqual(observed.targets.map(t=>t.href),group.cards.map(x=>x.href));
        const rows=await directory.locator(":scope > article").evaluateAll(nodes=>nodes.map(n=>({
          title:n.querySelector("h3").textContent.trim(),
          status:n.querySelector("[data-reader-path-identity] p").textContent.trim(),
          body:n.querySelector("[data-reader-path-content] p").textContent.trim()
        })));
        assert.deepEqual(rows,group.cards.map(x=>({title:x.title,status:x.status,body:x.body})));
      }
      const engagement=page.locator("[data-engagement-detail]");
      await key(engagement.locator("summary"),"Enter");
      const sequence=engagement.locator('[data-reader-collection="sequence"]');
      await checkCollection(sequence,"sequence",4);
      assert.deepEqual(await sequence.locator("li h3").allTextContents(),doctrineFrontDoor.workWithUs.engagement.steps.map(x=>x.title));
      await capture("collection-work-directory",page.locator('[data-work-group="commission"] [data-reader-collection="directory"]'));
      await fit(page);
      await open(page,base,"/evidence-and-trust");
      const detail=page.locator('[data-trust-detail="evidence"]');
      await key(detail.locator("summary"),"Enter");
      const comparison=detail.locator('[data-reader-collection="comparison"]');
      await checkCollection(comparison,"comparison",11);
      const rows=await comparison.locator(":scope > article").evaluateAll(nodes=>nodes.map(n=>{
        const [heading,positive,negative]=n.children;
        const a=heading.getBoundingClientRect(),b=positive.getBoundingClientRect(),c=negative.getBoundingClientRect();
        return {id:n.getAttribute("data-evidence-type"),title:heading.textContent,
          establishes:positive.textContent,limit:negative.textContent,
          parallel:a.right<=b.left+1&&b.right<=c.left+1&&b.top<c.bottom&&c.top<b.bottom,
          stacked:b.top>=a.bottom-1&&c.top>=b.bottom-1};
      }));
      const model=doctrineFrontDoor.trustCenter.evidenceTypes;
      assert.deepEqual(rows.map(r=>[r.id,normalize(r.title),normalize(r.establishes),normalize(r.limit)]),
        model.map(r=>[r.id,normalize(r.title),normalize("Can establish: "+r.establishes),normalize("Does not establish: "+r.limit)]),
        "evidence comparison must retain both the positive and negative claim boundary in each row");
      assert.ok(rows.every(r=>mode.viewport.width>=1200?r.parallel:r.stacked),
        "evidence comparisons are parallel only when wide enough, otherwise complete stacked rows");
      assert.equal(await comparison.locator("a,button,input,select,textarea,[tabindex]").count(),0);
      await capture("collection-evidence-comparison",comparison.locator("article").first());
      await fit(page);
      await open(page,base,"/codexware/civic-record");
      const cases=page.locator('[data-civic-cases] [data-reader-collection="cases"]');
      await checkCollection(cases,"cases",3);
      assert.equal(await cases.locator("[data-civic-case]").count(),3);
      assert.ok(await page.locator("[data-civic-case-limit]").isVisible());
      assert.equal(await page.locator("[data-civic-case-limit]").textContent(),doctrineFrontDoor.civicRecord.caseNote);
      await fit(page);
    });
    await scenario("observation and mathematical projection parity", async (checkFocus, capture) => {
      await open(page, base, "/observatory/instruments");
      await page.locator('[data-instrument-collection][data-bfux-ready="true"]').waitFor();
      const faces = page.locator("[data-instrument-face]");
      assert.deepEqual(await faces.evaluateAll(nodes => nodes.map(node => node.getAttribute("data-instrument-face"))),
        ["sufficiency", "repair", "authority"]);
      for (const face of await faces.all()) {
        await checkNameplateContrast(face);
        // innerText includes CSS text-transform; verify both the canonical
        // written label and the visible rendered label without requiring case parity.
        const scope = face.locator("span");
        assert.equal(await scope.count(), 1);
        assert.ok(await scope.isVisible());
        assert.equal((await scope.textContent()).trim(), "Local teaching model");
        assert.equal((await scope.innerText()).trim().toLowerCase(), "local teaching model",
          "instrument scope remains visible independently of letter case");
        assert.equal(await face.locator("a,button,input,[tabindex]").count(), 0);
      }
      await capture("instrument-nameplate", faces.first());
      const amount = page.locator('input[name="bfl-observation"][value="amount"]');
      const status = page.locator('input[name="bfl-observation"][value="status"]');
      await textIs(page, "[data-suff-title]", "Insufficient representation");
      const observationResult = page.locator('[data-model-result="observation"]');
      assert.equal(await observationResult.getAttribute("data-model-state"), "collision");
      await key(amount, "ArrowRight");
      assert.ok(await status.isChecked(), "radio selection must work by keyboard");
      await textIs(page, '[data-observed="a"]', "$100 · paid");
      await textIs(page, '[data-observed="b"]', "$100 · unpaid");
      await textIs(page, "[data-suff-title]", "Sufficient in this two-state model");
      assert.equal(await observationResult.getAttribute("data-model-state"), "distinguished");
      await capture("instrument-observed-readouts", page.locator('[data-instrument-id="sufficiency"] [data-demo-grid]'));
      const summary = page.locator('[data-instrument-id="sufficiency"] details summary');
      await key(summary, "Enter");
      await textIs(page, "[data-suff-formula]", "ker(O) ⊆ ker(K)");
      assert.ok(await page.locator("[data-suff-formula]").isVisible());
      await checkFocus(summary, "mathematical disclosure");
      await capture("observation-math", summary);
      await fit(page);
      await key(status, "ArrowLeft");
      await textIs(page, "[data-suff-formula]", "ker(O) ⊄ ker(K)");
      await textIs(page, "[data-suff-title]", "Insufficient representation");
      assert.equal(await observationResult.getAttribute("data-model-state"), "collision");
      await key(summary, "Space");
    });
    await scenario("repair state and all eight authority states", async (checkFocus, capture) => {
      await open(page, base, "/observatory/instruments");
      await page.locator('[data-instrument-collection][data-bfux-ready="true"]').waitFor();
      const resources = page.locator('[data-repair="resources"]');
      const repairResult = page.locator('[data-model-result="repair"]');
      const gauge = async (percent, state) => {
        await textIs(page, "[data-repair-coverage]", Math.round(percent * 10) / 10 + "%");
        assert.equal(await repairResult.getAttribute("data-model-state"), state);
        const witness = await page.locator("[data-demo-meter]").evaluate(async node => {
          // Observe the settled rendered geometry, not an integer-rounded
          // clientWidth or the previous slider event's layout.
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          const bar = node.querySelector("[data-repair-meter]");
          const trackStyle = getComputedStyle(node);
          const barStyle = getComputedStyle(bar);
          const track = node.getBoundingClientRect();
          const fill = bar.getBoundingClientRect();
          const left = Number.parseFloat(trackStyle.borderLeftWidth) || 0;
          const right = Number.parseFloat(trackStyle.borderRightWidth) || 0;
          return {
            track: track.width - left - right,
            bar: fill.width,
            offset: fill.left - track.left - left,
            style: Number.parseFloat(bar.style.width),
            hidden: node.getAttribute("aria-hidden"),
            transition: barStyle.transitionDuration,
            animation: barStyle.animationName,
            position: barStyle.position,
            padding: [trackStyle.paddingLeft, trackStyle.paddingRight],
          };
        });
        assert.ok(witness.track > 0 && witness.hidden === "true" &&
          witness.position === "absolute" && witness.padding.every(value => value === "0px") &&
          witness.transition.split(",").every(value => Number.parseFloat(value) === 0) &&
          witness.animation === "none",
          "repair gauge must be an unanimated, unpadded state projection: " + JSON.stringify(witness));
        assert.ok(Math.abs(witness.style - percent) < .001 &&
          Math.abs(witness.bar - witness.track * percent / 100) <= 1.0 &&
          Math.abs(witness.offset) <= 1.0,
          "repair gauge geometry and numeric readout must agree: " + JSON.stringify({percent, ...witness}));
      };
      for (const control of await page.locator("[data-repair-channel]").all()) {
        const input = control.locator('input[type="range"]');
        const limits = await control.locator("[data-repair-scale] span").allTextContents();
        assert.deepEqual(limits, ["$" + Number(await input.getAttribute("min")).toLocaleString("en-US"),
          "$" + Number(await input.getAttribute("max")).toLocaleString("en-US")],
          "engraved scale endpoints must match native control bounds");
      }
      await textIs(page, "[data-repair-gap]", "$1,100");
      await gauge(45, "unfunded");
      await capture("instrument-repair-initial", page.locator("[data-repair-gauge]"));
      await key(resources, "End");
      await textIs(page, "[data-repair-gap]", "$0");
      await textIs(page, "[data-repair-title]", "Repair is accessible under these conditions.");
      await gauge(100, "accessible");
      assert.equal(await resources.getAttribute("aria-valuetext"), "$5,000");
      await checkFocus(resources, "repair resources slider");
      await capture("repair-accessible", resources);
      await key(resources, "Home");
      await textIs(page, "[data-repair-gap]", "$2,000");
      await textIs(page, "[data-repair-title]", "Restoration remains inaccessible.");
      await gauge(0, "unfunded");
      await key(page.locator('[data-reset="repair"]'), "Enter");
      await textIs(page, "[data-repair-gap]", "$1,100");
      await gauge(45, "unfunded");
      // A non-integral fraction distinguishes the displayed rounded value
      // from the physical fill, which retains the actual model fraction.
      await key(page.locator('[data-repair="cost"]'), "ArrowRight");
      await textIs(page, "[data-repair-gap]", "$1,200");
      await gauge(100 * 900 / 2100, "unfunded");
      await key(page.locator('[data-reset="repair"]'), "Enter");
      await gauge(45, "unfunded");
      for (let bits = 0; bits < 8; bits++) {
        const flags = [Boolean(bits & 1), Boolean(bits & 2), Boolean(bits & 4)];
        for (const [i, op] of ["read", "analyze", "draft"].entries()) {
          const control = page.locator(`[data-policy="${op}"]`);
          if (await control.isChecked() !== flags[i]) await key(control, "Space");
          assert.equal(await control.isChecked(), flags[i]);
        }
        const effective = [flags[0], flags[0] && flags[1], flags.every(Boolean)];
        for (const [i, op] of ["read", "analyze", "draft"].entries()) {
          await textIs(page, `[data-operation="${op}"]`, effective[i] ? "Permitted in model" : "Denied");
          assert.equal(await page.locator(`[data-operation="${op}"]`).getAttribute("data-effective-state"), effective[i] ? "permitted" : "denied",
            "effective visual state must derive from effective authority, not selected flags");
        }
        for (const op of ["modify", "send", "transact", "expand"]) {
          await textIs(page, `[data-operation="${op}"]`, "Denied");
          const row = page.locator(`[data-operation="${op}"]`);
          assert.equal(await row.getAttribute("data-effective-state"), "denied");
          assert.equal(await row.getAttribute("data-fixed-denial"), "true");
        }
        const detail = await page.locator("[data-policy-detail]").innerText();
        if (flags[1] && !effective[1]) assert.ok(detail.includes("Analysis is selected but blocked"));
        if (flags[2] && !effective[2]) assert.ok(detail.includes("Drafting is selected but blocked"));
      }
      await capture("authority-bounded", page.locator("[data-policy-detail]"));
      await capture("instrument-effective-authority", page.locator("[data-policy-results]"));
      await key(page.locator('[data-reset="authority"]'), "Enter");
      await textIs(page, '[data-operation="read"]', "Permitted in model");
      await textIs(page, '[data-operation="analyze"]', "Permitted in model");
      await textIs(page, '[data-operation="draft"]', "Denied");
      await fit(page);
    });
    await scenario("local draft boundary and explicit copy", async (checkFocus, capture) => {
      await open(page, base, "/contact");
      await page.locator('[data-inquiry-composer][data-bfux-ready="true"]').waitFor();
      const direct = page.locator('[data-direct-contact] a[href^="mailto:"]');
      assert.ok(await direct.isVisible(), "direct email must precede optional composition");
      const disclosure = page.locator("[data-draft-disclosure]");
      const summary = disclosure.locator("summary");
      assert.equal(await disclosure.getAttribute("open"), null);
      assert.equal(await page.locator("[data-draft-message]").isVisible(), false);
      await capture("contact-direct", direct);
      await key(summary, "Enter");
      assert.ok(await page.locator("[data-draft-message]").isVisible());
      await checkFocus(summary, "optional draft disclosure");
      const marker = "BFL synthetic UX witness only 694271";
      const sent = [];
      const observe = request => {
        if (request.url().includes(encodeURIComponent(marker)) || request.url().includes(marker) ||
          request.postData()?.includes(marker) || !["GET", "HEAD", "OPTIONS"].includes(request.method())) {
          sent.push(request.method() + " " + new URL(request.url()).pathname);
        }
      };
      page.on("request", observe);
      try {
        const message = page.locator("[data-draft-message]");
        const output = page.locator("[data-draft-output]");
        const copy = page.locator("[data-draft-copy]");
        assert.ok(await copy.isDisabled());
        assert.equal(await output.inputValue(), "");
        await page.locator("[data-draft-category]").selectOption("paper");
        await message.fill(marker);
        await page.waitForFunction(value => document.querySelector("[data-draft-output]")?.value.includes(value), marker);
        assert.ok((await output.inputValue()).includes("Technical paper audit"));
        assert.ok(await copy.isEnabled());
        assert.equal(await output.getAttribute("readonly"), "");
        const prepared = await output.inputValue();
        await key(summary, "Space");
        assert.equal(await disclosure.getAttribute("open"), null);
        await key(summary, "Enter");
        assert.equal(await message.inputValue(), marker);
        assert.equal(await output.inputValue(), prepared, "closing a local representation must not erase the draft");
        await context.grantPermissions(["clipboard-read", "clipboard-write"], {origin: base});
        await key(copy, "Enter");
        await textIs(page, "[data-draft-status]", "Draft copied. Nothing was sent.");
        assert.ok((await page.evaluate(() => navigator.clipboard.readText())).includes(marker));
        // Avoid leaving synthetic witness text in the shared CI clipboard.
        await page.evaluate(() => navigator.clipboard.writeText(""));
        await key(page.locator("[data-draft-clear]"), "Enter");
        assert.equal(await message.inputValue(), "");
        assert.equal(await output.inputValue(), "");
        assert.ok(await copy.isDisabled());
        await textIs(page, "[data-draft-status]", "Draft cleared.");
        await checkFocus(message, "focus restored after clearing draft");
        await capture("inquiry-cleared", message);
        assert.equal(await page.evaluate(value => [localStorage, sessionStorage].some(store =>
          Object.keys(store).some(key => key.includes(value) || (store.getItem(key) ?? "").includes(value))), marker), false);
        assert.deepEqual(sent, [], "local preparation or copy initiated a network write");
        assert.ok(await page.locator('main a[href^="mailto:"]').first().isVisible());
        await fit(page);
      } finally { page.off("request", observe); }
    });
  } finally { await context.close(); }
  return results;
}

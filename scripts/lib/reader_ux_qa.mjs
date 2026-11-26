// Behavioral witnesses derived from docs/boundary-first-ux-conformance-contract.md.
// This is not a certification score. Test actual reader state rather than visual resemblance.
import assert from "node:assert/strict";

const visibleFocus = async locator => locator.evaluate(element => {
  const s = getComputedStyle(element);
  return document.activeElement === element && s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2;
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
};
async function key(locator, keyName) {
  await locator.focus();
  await locator.press(keyName);
}
export async function verifyReaderUx(browser, base, mode) {
  const results = [];
  const context = await browser.newContext({
    viewport: mode.viewport, reducedMotion: "reduce", forcedColors: mode.forcedColors ?? "none",
  });
  const page = await context.newPage();
  async function scenario(label, run) {
    const issues = [];
    try { await run(); }
    catch (error) { issues.push(String(error)); }
    results.push({name: "BFUX reader: " + label + " @ " + mode.name, issues});
  }
  try {
    await scenario("orientation and reversible reader disclosure", async () => {
      await open(page, base, "/");
      const paths = page.locator("main [data-home-entry-paths]");
      assert.equal(await paths.locator("h2").innerText(), "Three ways into the Lab");
      assert.deepEqual(await paths.locator("a").evaluateAll(nodes => nodes.map(a => a.getAttribute("href"))),
        ["/codexware", "/observatory", "/work-with-us"]);
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
        assert.ok(await visibleFocus(summary), "keyboard focus is not visible on disclosure");
        await fit(page);
        await key(summary, "Space");
        assert.equal(await item.getAttribute("open"), null);
        assert.deepEqual(await item.locator("h3").allTextContents(), original);
      }
    });
    await scenario("observation and mathematical projection parity", async () => {
      await open(page, base, "/observatory/instruments");
      await page.locator('[data-instrument-collection][data-bfux-ready="true"]').waitFor();
      const amount = page.locator('input[name="bfl-observation"][value="amount"]');
      const status = page.locator('input[name="bfl-observation"][value="status"]');
      await textIs(page, "[data-suff-title]", "Insufficient representation");
      await key(amount, "ArrowRight");
      assert.ok(await status.isChecked(), "radio selection must work by keyboard");
      await textIs(page, '[data-observed="a"]', "$100 · paid");
      await textIs(page, '[data-observed="b"]', "$100 · unpaid");
      await textIs(page, "[data-suff-title]", "Sufficient in this two-state model");
      const summary = page.locator('[data-instrument-id="sufficiency"] details summary');
      await key(summary, "Enter");
      await textIs(page, "[data-suff-formula]", "ker(O) ⊆ ker(K)");
      assert.ok(await page.locator("[data-suff-formula]").isVisible());
      assert.ok(await visibleFocus(summary));
      await fit(page);
      await key(status, "ArrowLeft");
      await textIs(page, "[data-suff-formula]", "ker(O) ⊄ ker(K)");
      await textIs(page, "[data-suff-title]", "Insufficient representation");
      await key(summary, "Space");
    });
    await scenario("repair state and all eight authority states", async () => {
      await open(page, base, "/observatory/instruments");
      await page.locator('[data-instrument-collection][data-bfux-ready="true"]').waitFor();
      const resources = page.locator('[data-repair="resources"]');
      await textIs(page, "[data-repair-gap]", "$1,100");
      await key(resources, "End");
      await textIs(page, "[data-repair-gap]", "$0");
      await textIs(page, "[data-repair-title]", "Repair is accessible under these conditions.");
      assert.equal(await resources.getAttribute("aria-valuetext"), "$5,000");
      assert.ok(await visibleFocus(resources));
      await key(resources, "Home");
      await textIs(page, "[data-repair-gap]", "$2,000");
      await textIs(page, "[data-repair-title]", "Restoration remains inaccessible.");
      await key(page.locator('[data-reset="repair"]'), "Enter");
      await textIs(page, "[data-repair-gap]", "$1,100");
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
        }
        for (const op of ["modify", "send", "transact", "expand"]) await textIs(page, `[data-operation="${op}"]`, "Denied");
        const detail = await page.locator("[data-policy-detail]").innerText();
        if (flags[1] && !effective[1]) assert.ok(detail.includes("Analysis is selected but blocked"));
        if (flags[2] && !effective[2]) assert.ok(detail.includes("Drafting is selected but blocked"));
      }
      await key(page.locator('[data-reset="authority"]'), "Enter");
      await textIs(page, '[data-operation="read"]', "Permitted in model");
      await textIs(page, '[data-operation="analyze"]', "Permitted in model");
      await textIs(page, '[data-operation="draft"]', "Denied");
      await fit(page);
    });
    await scenario("local draft boundary and explicit copy", async () => {
      await open(page, base, "/contact");
      await page.locator('[data-inquiry-composer][data-bfux-ready="true"]').waitFor();
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
        assert.ok(await visibleFocus(message));
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

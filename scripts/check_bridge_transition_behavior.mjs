import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "bfl-bridge-transition-contracts-"));

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function transpile(source, fileName) {
  return ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
}

function expectThrow(fn, fragment) {
  assert.throws(fn, (error) => {
    assert.ok(error instanceof Error);
    assert.match(error.message, fragment);
    return true;
  });
}

try {
  const governanceSource = read("src/lib/bridge-governance.ts");
  const transitionSource = read("src/lib/bridge-transitions.ts").replace(
    'from "@/lib/bridge-governance"',
    'from "./bridge-governance"',
  );

  fs.writeFileSync(
    path.join(tempDir, "bridge-governance.js"),
    transpile(governanceSource, "bridge-governance.ts"),
  );
  fs.writeFileSync(
    path.join(tempDir, "bridge-transitions.js"),
    transpile(transitionSource, "bridge-transitions.ts"),
  );

  const transitions = require(path.join(tempDir, "bridge-transitions.js"));

  const base = {
    id: "contract-test-bridge",
    slug: "bridge/contract-test",
    pageType: "collaboration-bridge",
    visibility: "unlisted",
    status: "draft",
    collection: "bridge",
    routingEligibility: "unlisted-only",
    relationshipStatus: "exploratory-no-affiliation",
    file: "contract-test.json",
  };

  const T1 = "2026-09-06T16:10:00.000Z";
  const T2 = "2026-09-06T16:20:00.000Z";
  const T3 = "2026-09-06T16:30:00.000Z";
  const T4 = "2026-09-06T16:40:00.000Z";
  const T5 = "2026-09-06T16:50:00.000Z";
  const T6 = "2026-09-06T17:00:00.000Z";
  const T7 = "2026-09-06T17:10:00.000Z";
  const D1 = "2026-09-07T16:10:00.000Z";
  const D2 = "2026-09-07T16:20:00.000Z";
  const D3 = "2026-09-07T16:30:00.000Z";
  const D4 = "2026-09-07T16:40:00.000Z";
  const D5 = "2026-09-07T16:50:00.000Z";

  const ready = transitions.markBridgeReady(
    base,
    { nextAction: "send brief", nextActionAt: D1 },
    { at: T1 },
  );
  assert.equal(ready.status, "ready");
  assert.equal(ready.visibility, "unlisted");
  assert.equal(ready.relationshipStatus, "exploratory-no-affiliation");
  assert.equal(ready.bridgeOperations.lifecycleChangedAt, T1);

  const sent = transitions.markBridgeSent(
    ready,
    { nextAction: "follow up", nextActionAt: D2 },
    { at: T2 },
  );
  assert.equal(sent.status, "sent");
  assert.equal(sent.bridgeOperations.lifecycleChangedAt, T2);
  assert.equal(sent.bridgeOperations.lastContactAt, T2);

  const discussion = transitions.recordBridgeResponse(
    sent,
    { nextAction: "scope call", nextActionAt: D3 },
    { at: T3 },
  );
  assert.equal(discussion.status, "discussion");
  assert.equal(discussion.bridgeOperations.lifecycleChangedAt, T3);
  assert.equal(discussion.bridgeOperations.lastContactAt, T3);

  const contacted = transitions.recordBridgeContact(
    discussion,
    { nextAction: "prepare scope", nextActionAt: D4 },
    { at: T4 },
  );
  assert.equal(contacted.status, "discussion");
  assert.equal(contacted.bridgeOperations.lifecycleChangedAt, T3);
  assert.equal(contacted.bridgeOperations.lastContactAt, T4);

  const scoped = transitions.scopeBridge(
    contacted,
    { owner: "contract-operator", nextAction: "start pilot", nextActionAt: D5 },
    { at: T5 },
  );
  assert.equal(scoped.status, "scoped");
  assert.equal(scoped.relationshipStatus, "scoped-collaboration");
  assert.equal(scoped.bridgeOperations.owner, "contract-operator");

  const active = transitions.activateBridge(scoped, {}, { at: T6 });
  assert.equal(active.status, "active");
  assert.equal(active.relationshipStatus, "active-collaboration");
  assert.equal(active.visibility, "unlisted", "activation must not publish implicitly");
  assert.equal(active.bridgeOperations.owner, "contract-operator");

  const published = transitions.publishBridge(active);
  assert.equal(published.visibility, "public");
  assert.equal(published.routingEligibility, "public-candidate");
  assert.equal(published.status, "active");

  const unpublished = transitions.unpublishBridge(published);
  assert.equal(unpublished.visibility, "unlisted");
  assert.equal(unpublished.routingEligibility, "unlisted-only");
  assert.equal(unpublished.status, "active");

  const historical = transitions.archiveBridge(
    unpublished,
    { reason: "bounded collaboration completed" },
    { at: T7 },
  );
  assert.equal(historical.status, "historical");
  assert.equal(historical.relationshipStatus, "historical-collaboration");
  assert.equal(historical.bridgeOperations.closureReason, "bounded collaboration completed");
  assert.equal(historical.bridgeOperations.nextAction, undefined);
  assert.equal(historical.bridgeOperations.nextActionAt, undefined);

  const publicHistorical = transitions.publishBridge(historical);
  assert.equal(publicHistorical.visibility, "public");
  assert.equal(publicHistorical.status, "historical");

  const declined = transitions.declineBridge(
    base,
    { reason: "not a fit" },
    { at: T1 },
  );
  assert.equal(declined.status, "declined");
  assert.equal(declined.relationshipStatus, "declined-no-current-affiliation");
  assert.equal(declined.bridgeOperations.closureReason, "not a fit");

  const reopened = transitions.reopenBridge(declined);
  assert.equal(reopened.status, "draft");
  assert.equal(reopened.visibility, "unlisted");
  assert.equal(reopened.routingEligibility, "unlisted-only");
  assert.equal(reopened.relationshipStatus, "exploratory-no-affiliation");
  assert.equal(reopened.bridgeOperations, undefined);

  const targetClass = {
    ...base,
    id: "target-class-contract-test",
    relationshipStatus: "target-class-no-affiliation",
  };
  assert.equal(
    transitions.markBridgeReady(targetClass, {}, { at: T1 }).relationshipStatus,
    "target-class-no-affiliation",
  );

  const historicalStanding = {
    ...base,
    id: "historical-standing-contract-test",
    relationshipStatus: "historical-project-no-current-affiliation",
  };
  assert.equal(
    transitions.markBridgeReady(historicalStanding, {}, { at: T1 }).relationshipStatus,
    "historical-project-no-current-affiliation",
  );

  expectThrow(
    () => transitions.markBridgeSent(base, {}, { at: T1 }),
    /cannot transition draft -> sent/,
  );
  expectThrow(() => transitions.publishBridge(base), /can only become public/);
  expectThrow(() => transitions.unpublishBridge(base), /is not public/);
  expectThrow(() => transitions.publishBridge(published), /already public/);
  expectThrow(
    () => transitions.recordBridgeContact(base, {}, { at: T1 }),
    /contact can only be recorded/,
  );
  expectThrow(
    () => transitions.scopeBridge(base, { owner: "operator" }, { at: T1 }),
    /cannot transition draft -> scoped/,
  );
  expectThrow(
    () => transitions.activateBridge(base, { owner: "operator" }, { at: T1 }),
    /cannot transition draft -> active/,
  );
  expectThrow(
    () => transitions.declineBridge(active, { reason: "invalid" }, { at: T7 }),
    /cannot transition active -> declined/,
  );
  expectThrow(
    () => transitions.reopenBridge(historical),
    /cannot transition historical -> draft/,
  );
  expectThrow(
    () => transitions.markBridgeReady(base, { nextAction: "missing date" }, { at: T1 }),
    /nextAction requires nextActionAt/,
  );
  expectThrow(
    () => transitions.scopeBridge(contacted, { owner: "" }, { at: T5 }),
    /requires bridgeOperations.owner/,
  );

  console.log("Bridge transition behavior contracts passed.");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

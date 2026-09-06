import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

function requireAbsent(source, pattern, message) {
  if (pattern.test(source)) throw new Error(message);
}

const auth = read("src/lib/bridge-ops-auth.ts");
const store = read("src/lib/bridge-ops-store.ts");
const page = read("src/app/ops/bridges/page.tsx");
const eventsPage = read("src/app/ops/bridges/events/page.tsx");
const actions = read("src/app/ops/bridges/actions.ts");
const packageJson = read("package.json");

requireMatch(
  auth,
  /import \{ createHmac, timingSafeEqual \} from "node:crypto"/,
  "Bridge ops auth must use HMAC signing and timing-safe comparison.",
);
requireMatch(
  auth,
  /const COOKIE_PATH = "\/ops\/bridges"/,
  "Bridge ops session cookie must remain scoped to /ops/bridges.",
);
requireMatch(
  auth,
  /const SESSION_TTL_SECONDS = 60 \* 60 \* 12/,
  "Bridge ops session must have an explicit bounded server-side TTL.",
);
requireMatch(
  auth,
  /const ageMs = nowMs - issuedAtMs[\s\S]*ageMs < 0[\s\S]*ageMs > SESSION_TTL_SECONDS \* 1000/,
  "Bridge ops session verification must reject future-issued and expired sessions.",
);
requireMatch(
  auth,
  /httpOnly:\s*true/,
  "Bridge ops session cookie must remain HttpOnly.",
);
requireMatch(
  auth,
  /sameSite:\s*"strict"/,
  "Bridge ops session cookie must remain SameSite=Strict.",
);
requireMatch(
  auth,
  /secure:\s*process\.env\.NODE_ENV === "production"/,
  "Bridge ops session cookie must be Secure in production.",
);
requireMatch(
  auth,
  /priority:\s*"high"/,
  "Bridge ops session cookie should retain high cookie priority.",
);
requireMatch(
  auth,
  /cookieStore\.set\(COOKIE_NAME, "", \{[\s\S]*\.\.\.cookieOptions\(\)[\s\S]*maxAge:\s*0/,
  "Bridge ops logout must expire the same path-scoped cookie rather than relying on a generic delete.",
);
requireMatch(
  auth,
  /safeEqual\(suppliedSignature, sessionSignature\(secret, issuedAt\)\)/,
  "Bridge ops session signature verification must remain timing-safe.",
);

requireAbsent(
  store,
  /response\.text\(\)/,
  "Bridge ops GitHub failures must not reflect arbitrary upstream response bodies into operator errors.",
);
requireMatch(
  store,
  /case 401:[\s\S]*authentication failed[\s\S]*case 403:[\s\S]*access was denied[\s\S]*case 404:/,
  "Bridge ops store must retain sanitized status-specific GitHub failure semantics.",
);
requireMatch(
  store,
  /if \(currentRef\.object\.sha !== snapshot\.parentCommit\)[\s\S]*Refresh the control surface and retry/,
  "Bridge ops writes must retain the explicit stale-head concurrency guard.",
);
requireMatch(
  store,
  /body:\s*JSON\.stringify\(\{ sha: commit\.sha, force: false \}\)/,
  "Bridge ops Git ref updates must remain non-forced.",
);

for (const surface of [page, eventsPage]) {
  requireMatch(
    surface,
    /robots:\s*\{[\s\S]*index:\s*false[\s\S]*follow:\s*false[\s\S]*nocache:\s*true/,
    "Every Bridge ops surface must remain noindex, nofollow, and nocache.",
  );
}

requireAbsent(
  page,
  /configuration\.missing\.join/,
  "Locked Bridge ops UI must not disclose missing environment-variable names.",
);
requireAbsent(
  page,
  /Repository target is \{configuration\.repository\}/,
  "Locked Bridge ops UI must not disclose its repository target.",
);
requireAbsent(
  page,
  /on \{configuration\.branch\}/,
  "Locked Bridge ops UI must not disclose its branch target.",
);
requireMatch(
  page,
  /Operator configuration is unavailable\. No operational state is exposed\./,
  "Unconfigured Bridge ops route must fail closed with a generic message.",
);

requireMatch(
  actions,
  /type BridgeMutationOperation = Exclude<BridgeEventOperation, "register">/,
  "Ordinary Bridge operator mutations must exclude the special register event.",
);
requireMatch(
  actions,
  /operation !== "register"/,
  "Bridge operator action allow-list must explicitly remove register.",
);
requireMatch(
  actions,
  /export async function mutateBridgeAction\(formData: FormData\) \{[\s\S]*?await requireSession\(\);/,
  "Bridge mutation Server Action must remain session-gated.",
);

requireMatch(
  packageJson,
  /node scripts\/check_bridge_ops_security_contracts\.mjs/,
  "contracts:check must run the Bridge ops security contract checker.",
);

console.log("Bridge ops security contracts passed.");

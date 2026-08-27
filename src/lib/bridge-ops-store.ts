import type { ProductLandingManifest } from "@/lib/product-landing-routing";
import {
  appendBridgeEventLedger,
  parseBridgeEventLedger,
  type BridgeEventRecord,
} from "@/lib/bridge-event-ledger";

const MANIFEST_PATH = "src/content/product-landing-pages/manifest.json";
const LEDGER_PATH = "src/content/bridge-ops/events.jsonl";
const DEFAULT_REPOSITORY = "codexsmith/web";
const DEFAULT_BRANCH = "main";

type GitHubContentsResponse = {
  content: string;
  encoding: "base64";
  sha: string;
};

type GitHubRefResponse = {
  object: { sha: string };
};

type GitHubCommitResponse = {
  sha: string;
  tree: { sha: string };
};

type GitHubBlobResponse = {
  sha: string;
};

type GitHubTreeResponse = {
  sha: string;
};

export type BridgeOpsManifestSnapshot = {
  manifest: ProductLandingManifest;
  manifestSha: string;
  ledgerContent: string;
  ledgerSha: string;
  events: BridgeEventRecord[];
  repository: string;
  branch: string;
  parentCommit: string;
  parentTree: string;
};

export type BridgeOpsConfiguration = {
  configured: boolean;
  missing: string[];
  repository: string;
  branch: string;
};

function getRepository() {
  return process.env.BFL_BRIDGE_GITHUB_REPOSITORY?.trim() || DEFAULT_REPOSITORY;
}

function getBranch() {
  return process.env.BFL_BRIDGE_GITHUB_BRANCH?.trim() || DEFAULT_BRANCH;
}

function getToken() {
  return process.env.BFL_BRIDGE_GITHUB_TOKEN?.trim();
}

function apiBase(repository: string) {
  return `https://api.github.com/repos/${repository}`;
}

export function getBridgeOpsConfiguration(): BridgeOpsConfiguration {
  const missing: string[] = [];
  if (!process.env.BFL_BRIDGE_OPS_PASSWORD?.trim()) {
    missing.push("BFL_BRIDGE_OPS_PASSWORD");
  }
  if (!getToken()) {
    missing.push("BFL_BRIDGE_GITHUB_TOKEN");
  }

  return {
    configured: missing.length === 0,
    missing,
    repository: getRepository(),
    branch: getBranch(),
  };
}

function requireToken() {
  const token = getToken();
  if (!token) {
    throw new Error("Bridge ops GitHub token is not configured");
  }
  return token;
}

function headers(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubJson<T>(
  url: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...headers(token),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `GitHub request failed (${response.status} ${response.statusText}): ${detail.slice(0, 500)}`,
    );
  }

  return (await response.json()) as T;
}

function decodeContents(payload: GitHubContentsResponse, label: string) {
  if (payload.encoding !== "base64" || !payload.content || !payload.sha) {
    throw new Error(`GitHub returned an unsupported ${label} payload`);
  }
  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8");
}

export async function loadBridgeOpsManifest(): Promise<BridgeOpsManifestSnapshot> {
  const token = requireToken();
  const repository = getRepository();
  const branch = getBranch();
  const base = apiBase(repository);

  const [manifestPayload, ledgerPayload, refPayload] = await Promise.all([
    githubJson<GitHubContentsResponse>(
      `${base}/contents/${MANIFEST_PATH}?ref=${encodeURIComponent(branch)}`,
      token,
    ),
    githubJson<GitHubContentsResponse>(
      `${base}/contents/${LEDGER_PATH}?ref=${encodeURIComponent(branch)}`,
      token,
    ),
    githubJson<GitHubRefResponse>(
      `${base}/git/ref/heads/${encodeURIComponent(branch)}`,
      token,
    ),
  ]);

  const parentCommit = refPayload.object.sha;
  const commitPayload = await githubJson<GitHubCommitResponse>(
    `${base}/git/commits/${parentCommit}`,
    token,
  );

  const manifestContent = decodeContents(manifestPayload, "Bridge manifest");
  const ledgerContent = decodeContents(ledgerPayload, "Bridge event ledger");
  const manifest = JSON.parse(manifestContent) as ProductLandingManifest;
  const events = parseBridgeEventLedger(ledgerContent);

  return {
    manifest,
    manifestSha: manifestPayload.sha,
    ledgerContent,
    ledgerSha: ledgerPayload.sha,
    events,
    repository,
    branch,
    parentCommit,
    parentTree: commitPayload.tree.sha,
  };
}

async function createBlob(
  base: string,
  token: string,
  content: string,
): Promise<string> {
  const payload = await githubJson<GitHubBlobResponse>(`${base}/git/blobs`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, encoding: "utf-8" }),
  });
  return payload.sha;
}

export async function commitBridgeOpsTransaction(
  snapshot: BridgeOpsManifestSnapshot,
  manifest: ProductLandingManifest,
  event: BridgeEventRecord,
  message: string,
): Promise<{ commitSha: string }> {
  const token = requireToken();
  const base = apiBase(snapshot.repository);

  const currentRef = await githubJson<GitHubRefResponse>(
    `${base}/git/ref/heads/${encodeURIComponent(snapshot.branch)}`,
    token,
  );
  if (currentRef.object.sha !== snapshot.parentCommit) {
    throw new Error(
      "Bridge operations changed in GitHub after this action began. Refresh the control surface and retry.",
    );
  }

  const manifestContent = `${JSON.stringify(manifest, null, 2)}\n`;
  const ledgerContent = appendBridgeEventLedger(snapshot.ledgerContent, event);

  const [manifestBlob, ledgerBlob] = await Promise.all([
    createBlob(base, token, manifestContent),
    createBlob(base, token, ledgerContent),
  ]);

  const tree = await githubJson<GitHubTreeResponse>(`${base}/git/trees`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      base_tree: snapshot.parentTree,
      tree: [
        {
          path: MANIFEST_PATH,
          mode: "100644",
          type: "blob",
          sha: manifestBlob,
        },
        {
          path: LEDGER_PATH,
          mode: "100644",
          type: "blob",
          sha: ledgerBlob,
        },
      ],
    }),
  });

  const commit = await githubJson<GitHubCommitResponse>(`${base}/git/commits`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [snapshot.parentCommit],
    }),
  });

  await githubJson<GitHubRefResponse>(
    `${base}/git/refs/heads/${encodeURIComponent(snapshot.branch)}`,
    token,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sha: commit.sha, force: false }),
    },
  );

  return { commitSha: commit.sha };
}

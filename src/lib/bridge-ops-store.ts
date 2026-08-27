import type { ProductLandingManifest } from "@/lib/product-landing-routing";

const MANIFEST_PATH = "src/content/product-landing-pages/manifest.json";
const DEFAULT_REPOSITORY = "codexsmith/web";
const DEFAULT_BRANCH = "main";

type GitHubContentsResponse = {
  content: string;
  encoding: "base64";
  sha: string;
};

type GitHubUpdateResponse = {
  commit?: { sha?: string };
  content?: { sha?: string };
};

export type BridgeOpsManifestSnapshot = {
  manifest: ProductLandingManifest;
  sha: string;
  repository: string;
  branch: string;
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

function apiUrl(repository: string, branch: string) {
  return `https://api.github.com/repos/${repository}/contents/${MANIFEST_PATH}?ref=${encodeURIComponent(branch)}`;
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

export async function loadBridgeOpsManifest(): Promise<BridgeOpsManifestSnapshot> {
  const token = requireToken();
  const repository = getRepository();
  const branch = getBranch();

  const response = await fetch(apiUrl(repository, branch), {
    headers: headers(token),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load Bridge manifest from GitHub (${response.status} ${response.statusText})`,
    );
  }

  const payload = (await response.json()) as GitHubContentsResponse;
  if (payload.encoding !== "base64" || !payload.content || !payload.sha) {
    throw new Error("GitHub returned an unsupported Bridge manifest payload");
  }

  const decoded = Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString(
    "utf8",
  );
  const manifest = JSON.parse(decoded) as ProductLandingManifest;

  return { manifest, sha: payload.sha, repository, branch };
}

export async function commitBridgeOpsManifest(
  snapshot: BridgeOpsManifestSnapshot,
  manifest: ProductLandingManifest,
  message: string,
): Promise<{ commitSha?: string; contentSha?: string }> {
  const token = requireToken();
  const body = {
    message,
    content: Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, "utf8").toString(
      "base64",
    ),
    sha: snapshot.sha,
    branch: snapshot.branch,
  };

  const response = await fetch(
    `https://api.github.com/repos/${snapshot.repository}/contents/${MANIFEST_PATH}`,
    {
      method: "PUT",
      headers: {
        ...headers(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Unable to commit Bridge manifest (${response.status} ${response.statusText}): ${detail.slice(0, 500)}`,
    );
  }

  const payload = (await response.json()) as GitHubUpdateResponse;
  return {
    commitSha: payload.commit?.sha,
    contentSha: payload.content?.sha,
  };
}

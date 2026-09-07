import snapshot from "@/content/research-log.json";

export type ResearchLogEntry = {
  entry_id: string;
  occurred_at: string;
  published_at: string;
  title: string;
  summary: string;
  section: string;
  activity_class: string;
  status_label: string;
  claim_ceiling: string;
  tags: string[];
  source_event_count: number;
};

export type ResearchLogSnapshot = {
  schema_version: string;
  generated_at: string;
  title: string;
  description: string;
  authority_note: string;
  entries: ResearchLogEntry[];
};

const typedSnapshot = snapshot as ResearchLogSnapshot;

export const researchLog: ResearchLogSnapshot = {
  ...typedSnapshot,
  entries: [...typedSnapshot.entries].sort(
    (left, right) =>
      new Date(right.occurred_at).getTime() - new Date(left.occurred_at).getTime(),
  ),
};

const DEFAULT_SITE_URL = "https://boundaryfirstlabs.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

export function researchLogEntryUrl(entry: ResearchLogEntry) {
  return `${siteUrl()}/research/log#${encodeURIComponent(entry.entry_id)}`;
}

export function buildResearchLogRss() {
  const base = siteUrl();
  const channelUrl = `${base}/research/log`;
  const feedUrl = `${base}/research/log/rss.xml`;
  const lastBuildDate = new Date(
    researchLog.entries.reduce(
      (latest, entry) =>
        new Date(entry.published_at).getTime() > new Date(latest).getTime()
          ? entry.published_at
          : latest,
      researchLog.generated_at,
    ),
  ).toUTCString();

  const items = researchLog.entries
    .map((entry) => {
      const itemUrl = researchLogEntryUrl(entry);
      const description = [
        entry.summary,
        `Status: ${entry.status_label}.`,
        `Claim ceiling: ${entry.claim_ceiling}`,
      ].join("\n\n");
      const categories = entry.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return [
        "<item>",
        `<title>${escapeXml(entry.title)}</title>`,
        `<link>${escapeXml(itemUrl)}</link>`,
        `<guid isPermaLink="true">${escapeXml(itemUrl)}</guid>`,
        `<pubDate>${new Date(entry.published_at).toUTCString()}</pubDate>`,
        `<description>${escapeXml(description)}</description>`,
        `<category>${escapeXml(entry.section)}</category>`,
        categories,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(researchLog.title)}</title>`,
    `<link>${escapeXml(channelUrl)}</link>`,
    `<description>${escapeXml(researchLog.description)}</description>`,
    "<language>en-us</language>",
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}

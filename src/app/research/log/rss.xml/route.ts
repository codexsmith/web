import { buildResearchLogRss } from "@/lib/research-log";

export async function GET() {
  return new Response(buildResearchLogRss(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import { WorldApp } from "@/components/world-app";
import { getNodeByPath } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ world?: string | string[] }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams]);
  const node = getNodeByPath(slug);
  const skipLanding = query.world === "1";

  return <WorldApp initialNodeId={node.id} skipLanding={skipLanding} />;
}

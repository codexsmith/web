import { notFound } from "next/navigation";
import { AudienceRouteOutlet } from "@/components/audience/AudienceRouteOutlet";
import { audienceDataset } from "@/lib/audience/data";
import { audienceRouteConfig } from "@/lib/audience/config";
import { resolveSelection } from "@/lib/audience/resolve";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{ depth?: string }>;
};

export function generateStaticParams() {
  const params: Array<{ path?: string[] }> = [{ path: undefined }];
  for (const intent of audienceDataset.intents) {
    params.push({ path: [intent.slug] });
    for (const audienceId of intent.audienceIds) {
      const audience = audienceDataset.audiences.find((item) => item.id === audienceId);
      if (!audience) continue;
      params.push({ path: [intent.slug, audience.slug] });
      for (const doorwayId of audience.doorwayIds) {
        const doorway = audienceDataset.doorways.find((item) => item.id === doorwayId);
        if (doorway) params.push({ path: [intent.slug, audience.slug, doorway.slug] });
      }
    }
  }
  return params;
}

export default async function AudiencePage({ params, searchParams }: PageProps) {
  const [{ path }, { depth }] = await Promise.all([params, searchParams]);
  const selection = resolveSelection(audienceDataset, path, depth, audienceRouteConfig);

  if (path?.[0] && !selection.intent) notFound();
  if (path?.[1] && !selection.audience) notFound();
  if (path?.[2] && !selection.doorway) notFound();
  if (selection.intent && selection.audience && !selection.intent.audienceIds.includes(selection.audience.id)) notFound();
  if (selection.audience && selection.doorway && !selection.audience.doorwayIds.includes(selection.doorway.id)) notFound();

  return <AudienceRouteOutlet dataset={audienceDataset} config={audienceRouteConfig} selection={selection} />;
}

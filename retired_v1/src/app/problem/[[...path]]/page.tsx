import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CyoaExperience } from "@/components/cyoa/CyoaExperience";
import {
  cyoaStaticParams,
  resolveCyoaRoutePath,
  resolveCyoaPath,
} from "@/lib/cyoa";

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Problem-first entrance",
    description: "Start with a familiar problem and follow it to a useful Boundary First concept.",
    alternates: { canonical: "/problem" },
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return cyoaStaticParams();
}

export default async function ProblemPage({
  params,
}: PageProps<"/problem/[[...path]]">) {
  const { path = [] } = await params;
  const route = resolveCyoaRoutePath(path);
  if (route.kind === "invalid") notFound();

  const { onramp, choice } = resolveCyoaPath(route.contentPath);
  return <CyoaExperience onramp={onramp} choice={choice} />;
}

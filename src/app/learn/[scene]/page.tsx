import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidedSequenceV2 } from "@/components/guided-sequence-v2";
import introConfig from "@/content/introductory_experience_v0_5.json";

const steps = introConfig.experiences[0].steps;

export const dynamicParams = false;

export function generateStaticParams() {
  return steps.slice(1).map((step) => ({ scene: step.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/[scene]">): Promise<Metadata> {
  const { scene } = await params;
  const step = steps.find((candidate) => candidate.id === scene);
  if (!step) return {};

  return {
    title: `${step.title} · Guided Introduction`,
    description: step.summary,
    alternates: { canonical: `/learn/${step.id}` },
  };
}

export default async function LearnScenePage({
  params,
}: PageProps<"/learn/[scene]">) {
  const { scene } = await params;
  const initialScene = steps.findIndex((candidate) => candidate.id === scene);
  if (initialScene <= 0) notFound();

  return <GuidedSequenceV2 initialScene={initialScene} />;
}

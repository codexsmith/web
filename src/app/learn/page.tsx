import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GuidedSequenceV2 } from "@/components/guided-sequence-v2";
import introConfig from "@/content/introductory_experience_v0_5.json";

export const metadata: Metadata = {
  title: "Guided Introduction",
  description:
    "A guided introduction to Boundary First, from displaced consequence through repair and the research Atlas.",
  alternates: {
    canonical: "/learn",
  },
};

function parseInitialScene(value: string | string[] | undefined) {
  const sceneValue = Array.isArray(value) ? value[0] : value;
  const scene = Number(sceneValue);
  return Number.isInteger(scene) &&
    scene >= 0 &&
    scene < introConfig.experiences[0].steps.length
    ? scene
    : 0;
}

export default async function LearnPage({ searchParams }: PageProps<"/learn">) {
  const params = await searchParams;
  const initialScene = parseInitialScene(params.scene);
  if (params.scene !== undefined && initialScene > 0) {
    redirect(`/learn/${introConfig.experiences[0].steps[initialScene].id}`);
  }
  return <GuidedSequenceV2 initialScene={0} />;
}

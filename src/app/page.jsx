import { GuidedSequence } from "@/components/guided-sequence";
import { GuidedSequenceV2 } from "@/components/guided-sequence-v2";
import { SplashEntranceHome } from "@/components/entrance/SplashEntranceHome";
import { phase12Launch } from "@/lib/phase12-launch";

export const metadata = {
  title: "Boundary First Labs",
  description: phase12Launch.identity.compactStatement,
  alternates: {
    canonical: "/",
  },
};

function parseInitialScene(value) {
  const sceneValue = Array.isArray(value) ? value[0] : value;
  const scene = Number(sceneValue);
  return Number.isInteger(scene) && scene >= 0 ? scene : 0;
}

export default async function Home({ searchParams }) {
  const params = await searchParams;

  // Preserve old scene links while the guided sequence moves to /learn.
  if (params?.scene !== undefined || params?.version) {
    const initialScene = parseInitialScene(params?.scene);
    return params?.version === "v1" ? (
      <GuidedSequence initialScene={initialScene} />
    ) : (
      <GuidedSequenceV2 initialScene={initialScene} />
    );
  }

  return <SplashEntranceHome />;
}

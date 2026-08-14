import { GraphProvider } from "@/app/context/GraphContext";
import { GuidedSequence } from "@/components/guided-sequence";
import { GuidedSequenceV2 } from "@/components/guided-sequence-v2";
import { InstitutionalVestibuleHome } from "@/components/entrance/InstitutionalVestibuleHome";
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

  // Preserve old scene links while the guided sequence remains available on /learn.
  if (params?.scene !== undefined || params?.version) {
    const initialScene = parseInitialScene(params?.scene);
    return params?.version === "v1" ? (
      <GraphProvider><GuidedSequence initialScene={initialScene} /></GraphProvider>
    ) : (
      <GraphProvider><GuidedSequenceV2 initialScene={initialScene} /></GraphProvider>
    );
  }

  return <InstitutionalVestibuleHome />;
}

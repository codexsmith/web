import Link from "next/link";
import { LabMachine } from "@/components/bfux/LabMachine";

export const metadata = {
  title: "World · Lab Machine preview",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ skin?: string | string[]; schematic?: string | string[] }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WorldPreview({ searchParams }: Props) {
  const query = await searchParams;
  const requested = one(query.skin);
  const mode = requested === "apparatus" || requested === "both" ? requested : "physical";
  const schematic = one(query.schematic) === "1";
  const q = (skin: "apparatus" | "physical" | "both", show = schematic) =>
    `/world?skin=${skin}${show ? "&schematic=1" : ""}`;

  return (
    <main className="world-machine-preview">
      <header className="world-machine-preview__toolbar">
        <div>
          <small>WORLD · RENDERER PROTOTYPE</small>
          <strong>Lab Machine comparison surface</strong>
        </div>
        <nav>
          <Link href="/?world=1">Cards</Link>
          <Link href={q("apparatus")}>Apparatus</Link>
          <Link href={q("physical")}>Physical</Link>
          <Link href={q("both")}>Both</Link>
          <Link href={q(mode, !schematic)}>{schematic ? "Hide schematic" : "Show schematic"}</Link>
        </nav>
      </header>

      {mode === "both" ? (
        <div className="world-machine-preview__compare">
          <section>
            <h2>Apparatus skin</h2>
            <LabMachine skin="apparatus" showSchematic={schematic} />
          </section>
          <section>
            <h2>Physical skin</h2>
            <LabMachine skin="physical" showSchematic={schematic} />
          </section>
        </div>
      ) : (
        <LabMachine skin={mode} showSchematic={schematic} />
      )}
    </main>
  );
}

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CircleDot,
  Globe2,
  Microscope,
  ScanSearch,
} from "lucide-react";

const apparatusGreen = "#355f3f";

const disciplines = [
  {
    label: "Method",
    body: "Boundary First Scientific Method and Representational Mechanics.",
    icon: CircleDot,
  },
  {
    label: "Research",
    body: "Foundational work in Boundary Theory, Schemathematics, and more.",
    icon: ScanSearch,
  },
  {
    label: "Products",
    body: "Tools and systems that turn theory into practical infrastructure.",
    icon: Boxes,
  },
  {
    label: "Public interest",
    body: "Projects that increase capacity, agency, and accessibility.",
    icon: Globe2,
  },
] as const;

function Screw({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-2.5 w-2.5 rounded-full border border-[#9d998f] bg-[linear-gradient(145deg,#f8f5ed,#aaa69b)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55),0_1px_2px_rgba(38,42,36,0.16)] ${className}`}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#747268]" />
    </span>
  );
}

function InsetPanel({
  children,
  className = "",
  labelledBy,
}: {
  children?: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`relative rounded-[1.15rem] border border-[#bcb7aa] bg-[#f1ece1] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(112,107,95,0.08),0_4px_12px_rgba(59,55,45,0.05)] ${className}`}
    >
      <Screw className="left-3 top-3" />
      <Screw className="right-3 top-3" />
      <Screw className="bottom-3 left-3" />
      <Screw className="bottom-3 right-3" />
      {children}
    </section>
  );
}

function StatusPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-12 items-center justify-center rounded-lg border border-[#c5c0b4] bg-[#eee9de] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${className}`}
    >
      {children}
    </div>
  );
}

function Handle({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute top-[16.5%] hidden h-[57%] w-8 xl:block ${
        side === "left" ? "left-5" : "right-5"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 h-[88%] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8d8c84] bg-[linear-gradient(90deg,#77776f_0%,#f8f7f1_24%,#b8b7ae_52%,#f7f5ee_75%,#77776f_100%)] shadow-[1px_2px_5px_rgba(50,50,45,0.2)]" />
      <div className="absolute left-1/2 top-1 h-7 w-7 -translate-x-1/2 rounded-full border border-[#9d998f] bg-[radial-gradient(circle_at_38%_30%,#faf8f0,#b2afa5_60%,#77766f)] shadow-sm" />
      <div className="absolute bottom-1 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-[#9d998f] bg-[radial-gradient(circle_at_38%_30%,#faf8f0,#b2afa5_60%,#77766f)] shadow-sm" />
    </div>
  );
}

function RepresentationInstrument() {
  return (
    <div className="relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[0.95rem] border border-[#cbc6ba] bg-[#eee9de]">
      <div className="flex min-h-20 items-center gap-4 border-b border-[#cbc6ba] px-7 sm:px-10">
        <p
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: apparatusGreen }}
        >
          Instrument —
        </p>
        <h2
          className="font-serif text-2xl font-medium tracking-[-0.025em] text-[#2a2c28]"
          id="apparatus-representation-loop"
        >
          Representation loop
        </h2>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-8 py-10 sm:px-12"
        style={{
          backgroundImage:
            "linear-gradient(rgba(58,73,62,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(58,73,62,0.055) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="relative aspect-square w-full max-w-[31rem]">
          <div className="absolute inset-[13%] rounded-full border border-[#b8b4a9]" />
          <div
            className="absolute inset-[18%] rounded-full border"
            style={{ borderColor: apparatusGreen }}
          />
          <div className="absolute inset-[27%] rounded-full border border-[#b8b4a9]" />
          <div className="absolute inset-[35%] rounded-full border border-[#c5c0b5]" />

          <div
            aria-hidden="true"
            className="absolute bottom-[18%] left-1/2 top-[18%] w-px -translate-x-1/2"
            style={{ backgroundColor: apparatusGreen }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2"
            style={{ backgroundColor: apparatusGreen }}
          />

          <div className="absolute left-1/2 top-1/2 grid h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#84917d] bg-[radial-gradient(circle,#f6f4e9_0%,#dbe4cd_42%,#a5ba8e_72%,#6f8a68_100%)] shadow-[0_0_22px_rgba(86,122,70,0.25)]">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_3px_rgba(93,129,78,0.28)]"
              style={{ backgroundColor: apparatusGreen }}
            />
            <span className="sr-only">Representation loop center</span>
          </div>

          <InstrumentNode className="left-1/2 top-[4%] -translate-x-1/2" label="Model" />
          <InstrumentNode
            className="left-1/2 top-[25%] -translate-x-1/2"
            label="Representation"
            wide
          />
          <InstrumentNode className="left-[1%] top-1/2 -translate-y-1/2" label="Observe" />
          <InstrumentNode className="right-[1%] top-1/2 -translate-y-1/2" label="Act" />
          <InstrumentNode className="bottom-[4%] left-1/2 -translate-x-1/2" label="Evidence" />

          <Dot className="left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2" />
          <Dot className="left-[18%] top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Dot className="right-[18%] top-1/2 translate-x-1/2 -translate-y-1/2" />
          <Dot className="bottom-[18%] left-1/2 -translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}

function Dot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 rounded-full ${className}`}
      style={{ backgroundColor: apparatusGreen }}
    />
  );
}

function InstrumentNode({
  className,
  label,
  wide = false,
}: {
  className: string;
  label: string;
  wide?: boolean;
}) {
  return (
    <span
      className={`absolute z-10 grid min-h-10 place-items-center rounded-md border border-[#c6c0b4] bg-[#f4f0e7] px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#292d29] shadow-[0_3px_7px_rgba(53,50,43,0.12)] ${
        wide ? "min-w-36" : "min-w-28"
      } ${className}`}
    >
      {label}
    </span>
  );
}

export function ApparatusLandingHome({
  enterHref = "/software",
}: {
  enterHref?: string;
}) {
  const apparatusStyle = {
    "--apparatus-green": apparatusGreen,
  } as CSSProperties;

  return (
    <main
      className="min-h-screen bg-[#ddd8cd] p-2 text-[#292c28] sm:p-3"
      style={apparatusStyle}
    >
      <div className="relative mx-auto min-h-[calc(100vh-1rem)] max-w-[112rem] overflow-hidden rounded-[1.65rem] border border-[#a9a498] bg-[#ebe6db] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.75),0_8px_30px_rgba(48,45,38,0.12)] sm:min-h-[calc(100vh-1.5rem)]">
        <header className="grid min-h-[6.6rem] items-center gap-3 border-b border-[#c5c0b5] px-5 py-4 sm:px-8 lg:grid-cols-[minmax(18rem,1.15fr)_minmax(12rem,0.72fr)_minmax(17rem,0.9fr)_minmax(18rem,1fr)] lg:px-10 xl:px-14">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[32%] border border-[#a9a498] bg-[#eee9df] font-serif text-3xl text-[#292c28] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              BF
            </div>
            <div>
              <p className="font-mono text-base font-semibold uppercase tracking-[0.1em] sm:text-lg">
                Boundary First Labs
              </p>
              <p
                className="mt-0.5 font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: apparatusGreen }}
              >
                Public entry
              </p>
            </div>
          </div>

          <StatusPlate>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
              System status
            </span>
            <span
              aria-hidden="true"
              className="mx-3 h-2 w-2 rounded-full shadow-[0_0_0_2px_rgba(53,95,63,0.12)]"
              style={{ backgroundColor: apparatusGreen }}
            />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
              Nominal
            </span>
          </StatusPlate>

          <StatusPlate>
            <span className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
              Representation is the control.
            </span>
          </StatusPlate>

          <div className="flex items-center justify-end gap-4 px-2 text-right">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#716f67]">
              Increase capacity. Remove unnecessary abstractions.
            </span>
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 rounded-full border-2 border-[#f0ece2] shadow-[0_0_0_1px_rgba(53,95,63,0.55)]"
              style={{ backgroundColor: apparatusGreen }}
            />
          </div>
        </header>

        <Handle side="left" />
        <Handle side="right" />

        <div className="px-4 py-5 sm:px-7 sm:py-7 xl:px-[7.4rem] xl:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.17fr_0.93fr] xl:gap-6">
            <InsetPanel className="min-h-[39rem] px-8 py-12 sm:px-12 lg:px-14 lg:py-14" labelledBy="apparatus-purpose-heading">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  <span style={{ color: apparatusGreen }}>01</span>
                  <span aria-hidden="true" className="h-px w-6" style={{ backgroundColor: apparatusGreen }} />
                  <span style={{ color: apparatusGreen }}>Our purpose</span>
                </div>

                <h1
                  className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[0.91] tracking-[-0.045em] text-[#292c28] sm:text-6xl lg:text-[4.5rem]"
                  id="apparatus-purpose-heading"
                >
                  Software for
                  <br />
                  difficult systems.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-[#3d413c] sm:text-lg sm:leading-8">
                  We build software, methods, and public-interest work for wicked problems—especially where hidden assumptions become operational consequences.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-4">
                  {disciplines.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label}>
                        <Icon aria-hidden="true" className="h-8 w-8 stroke-[1.45]" style={{ color: apparatusGreen }} />
                        <h2
                          className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={{ color: apparatusGreen }}
                        >
                          {item.label}
                        </h2>
                        <p className="mt-2 text-[11px] leading-[1.55] text-[#454842] sm:text-xs">
                          {item.body}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <Link
                  className="group mt-auto flex min-h-[4.7rem] items-center justify-between rounded-lg border border-[#c6c0b4] bg-[#f4f0e7] shadow-[0_4px_10px_rgba(54,50,43,0.08)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(54,50,43,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--apparatus-green)]"
                  href={enterHref}
                >
                  <span className="flex min-w-0 items-center self-stretch">
                    <span aria-hidden="true" className="h-full w-1.5 rounded-l-lg" style={{ backgroundColor: apparatusGreen }} />
                    <span className="px-5 sm:px-7">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.1em] text-[#77746c]">
                        Entry // World
                      </span>
                      <span
                        className="mt-1 block font-mono text-sm font-semibold uppercase tracking-[0.08em] sm:text-base"
                        style={{ color: apparatusGreen }}
                      >
                        Enter the lab
                      </span>
                    </span>
                  </span>
                  <span className="mr-4 grid h-12 w-14 place-items-center rounded-md border border-[#d0cabf] bg-[#eee9df] sm:mr-6">
                    <ArrowRight
                      aria-hidden="true"
                      className="h-6 w-6 transition-transform group-hover:translate-x-1"
                      style={{ color: apparatusGreen }}
                    />
                  </span>
                </Link>
              </div>
            </InsetPanel>

            <InsetPanel className="min-h-[39rem] p-2.5" labelledBy="apparatus-representation-loop">
              <RepresentationInstrument />
            </InsetPanel>
          </div>

          <InsetPanel
            aria-label="Reserved apparatus panel"
            className="mt-5 min-h-[9rem] sm:min-h-[10.5rem] xl:mt-6"
          />
        </div>
      </div>
    </main>
  );
}

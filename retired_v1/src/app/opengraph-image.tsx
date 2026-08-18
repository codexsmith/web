import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Boundary First Labs — stewardship, research, and repair at the Cosmic Shore.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoSvg = await readFile(
    join(process.cwd(), "public", "boundary-first-wave-logo.svg"),
    "utf8",
  );
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(
    logoSvg
      .replace(/\sstyle="[^"]*"/, "")
      .replaceAll('fill="var(--bf-boundary)"', 'fill="#F8F3E8"')
      .replaceAll('fill="var(--bf-field)"', 'fill="#82AEB1"')
      .replaceAll('fill="var(--bf-field-mid)"', 'fill="#688E93"')
      .replaceAll('fill="var(--bf-depth)"', 'fill="#527C80"')
      .replaceAll('fill="var(--bf-witness)"', 'fill="#C8A24A"')
      .replaceAll('fill="var(--bf-spark)"', 'fill="#C8A24A"'),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#07172C",
          color: "#F8F3E8",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "70px 76px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            bottom: 20,
            border: "2px solid #3B686E",
            left: 20,
            opacity: 0.8,
            position: "absolute",
            right: 20,
            top: 20,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            width: "58%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#82AEB1",
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.19em",
                textTransform: "uppercase",
              }}
            >
              Cosmic Shore · Public-interest research
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "serif",
                fontSize: 82,
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 0.92,
                marginTop: 38,
              }}
            >
              <span>Boundary First</span>
              <span>Labs</span>
            </div>
          </div>

          <div
            style={{
              borderLeft: "4px solid #3B686E",
              display: "flex",
              flexDirection: "column",
              fontSize: 24,
              lineHeight: 1.35,
              maxWidth: 560,
              paddingLeft: 22,
            }}
          >
            Stewarding knowledge, systems, and the conditions of a livable
            future.
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            position: "absolute",
            right: 42,
            top: 0,
            width: "45%",
          }}
        >
          <div
            style={{
              background: "rgba(59,104,110,0.14)",
              borderRadius: "999px",
              filter: "blur(28px)",
              height: 290,
              position: "absolute",
              width: 290,
            }}
          />
          {/* next/image is not supported inside ImageResponse. */}
          <img
            alt=""
            height={410}
            src={logoSrc}
            width={530}
          />
        </div>
      </div>
    ),
    size,
  );
}

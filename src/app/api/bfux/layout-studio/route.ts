import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import {
  bfuxAuthoredLayoutSourceMarker,
  bfuxAuthoredLayoutSourcePath,
} from "@/components/bfux/bfux-layout-compiler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { ok: false, error: "LOCAL_DEV_ONLY" },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null) as {
    schema?: string;
    source?: string;
  } | null;

  if (
    !body ||
    body.schema !== "bfux.layout-source/v1" ||
    typeof body.source !== "string" ||
    !body.source.startsWith(bfuxAuthoredLayoutSourceMarker) ||
    !body.source.includes('schema: "bfux.machine-layout/v1"') && !body.source.includes('"schema": "bfux.machine-layout/v1"') ||
    body.source.length > 200_000
  ) {
    return NextResponse.json(
      { ok: false, error: "INVALID_LAYOUT_SOURCE" },
      { status: 400 },
    );
  }

  await writeFile(join(process.cwd(), bfuxAuthoredLayoutSourcePath), body.source, "utf8");

  return NextResponse.json({
    ok: true,
    path: bfuxAuthoredLayoutSourcePath,
  });
}

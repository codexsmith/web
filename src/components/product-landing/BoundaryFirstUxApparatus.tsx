'use client';

import { ArrowDownToLine, ArrowUpFromLine, Eye, RotateCw, Wrench } from "lucide-react";

type ResolutionLevel = "system" | "project" | "pump";

const resolutionIndex: Record<ResolutionLevel, number> = { system: 0, project: 1, pump: 2 };

export function ResolutionApparatus({
  level,
  label,
  ports,
  onResolveIn,
  onResolveOut,
}: {
  level: ResolutionLevel;
  label: string;
  ports
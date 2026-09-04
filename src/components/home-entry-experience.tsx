"use client";

import { useRouter } from "next/navigation";
import { HeroScreen } from "@/components/hero-screen";

export function HomeEntryExperience() {
  const router = useRouter();

  return <HeroScreen onEnter={() => router.push("/")} />;
}

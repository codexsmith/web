import type { Metadata } from "next";
import { InstitutionalOpenLabPage } from "@/components/institutional/InstitutionalOpenLabPage";
import {
  isOpenLabSubmissionType,
  participationContracts,
  type OpenLabSubmissionType,
} from "@/components/institutional/content/openLab";
import { readOpenLabIntakeConfig } from "@/lib/open-lab-intake";

export const metadata: Metadata = {
  title: "Open Lab · Boundary First Labs",
  description:
    "The public participation boundary for critique, collaboration, public-system inspection, and unusual work at Boundary First Labs.",
  alternates: { canonical: "/v3/open-lab" },
};

type OpenLabSearchParams = {
  type?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<OpenLabSearchParams>;
}) {
  const params = await searchParams;
  const requestedType = first(params.type) ?? "";
  const fallbackType: OpenLabSubmissionType = participationContracts[0].type;
  const initialType = isOpenLabSubmissionType(requestedType)
    ? requestedType
    : fallbackType;
  const intakeConfig = readOpenLabIntakeConfig();

  return (
    <InstitutionalOpenLabPage
      initialType={initialType}
      intakeConfig={intakeConfig}
    />
  );
}

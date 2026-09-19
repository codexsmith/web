import "server-only";

import {
  OPEN_LAB_INTAKE_SCHEMA,
  openLabSourceProjection,
  type OpenLabRuntimeConfig,
} from "@/components/institutional/content/openLab";

const GOVERNANCE_ACK = `reviewed:${openLabSourceProjection.sourceRevision}`;

function cleanEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

function parseRetentionDays(value: string | undefined) {
  const cleaned = cleanEnv(value);
  if (!/^\d+$/.test(cleaned)) return null;
  const days = Number(cleaned);
  return Number.isSafeInteger(days) && days > 0 ? days : null;
}

export function readOpenLabIntakeConfig(): OpenLabRuntimeConfig {
  const receiver = cleanEnv(process.env.BFL_OPEN_LAB_WEBHOOK_URL);
  const token = cleanEnv(process.env.BFL_OPEN_LAB_WEBHOOK_TOKEN);
  const policyVersion = cleanEnv(process.env.BFL_OPEN_LAB_POLICY_VERSION);
  const retentionDays = parseRetentionDays(process.env.BFL_OPEN_LAB_RETENTION_DAYS);
  const governanceAck = cleanEnv(process.env.BFL_OPEN_LAB_GOVERNANCE_ACK);

  const gates = [
    {
      id: "receiver",
      label: "Dedicated receiver",
      ready: Boolean(receiver),
      detail: receiver
        ? "A dedicated Open Lab receiver is configured."
        : "No dedicated Open Lab receiver is configured.",
    },
    {
      id: "authenticated-receiver",
      label: "Authenticated handoff",
      ready: Boolean(token),
      detail: token
        ? "Server-to-receiver authentication is configured."
        : "A receiver token is required before public intake can activate.",
    },
    {
      id: "policy-version",
      label: "Policy version",
      ready: Boolean(policyVersion),
      detail: policyVersion
        ? `Collection policy ${policyVersion} is declared for this deployment.`
        : "No collection/privacy policy version is declared.",
    },
    {
      id: "retention",
      label: "Retention window",
      ready: retentionDays !== null,
      detail:
        retentionDays !== null
          ? `The deployment declares a ${retentionDays}-day intake retention window.`
          : "No positive integer retention window is declared.",
    },
    {
      id: "source-review",
      label: "Source-review acknowledgement",
      ready: governanceAck === GOVERNANCE_ACK,
      detail:
        governanceAck === GOVERNANCE_ACK
          ? "The deployment explicitly acknowledges review of the pinned Open Lab source revision."
          : "Activation requires an explicit review acknowledgement for the pinned source revision.",
    },
  ] as const;

  return {
    enabled: gates.every((gate) => gate.ready),
    schema: OPEN_LAB_INTAKE_SCHEMA,
    policyVersion: policyVersion || null,
    retentionDays,
    sourceRevision: openLabSourceProjection.sourceRevision,
    gates,
  };
}

export function readOpenLabServerConfig() {
  const publicConfig = readOpenLabIntakeConfig();
  return {
    publicConfig,
    receiver: cleanEnv(process.env.BFL_OPEN_LAB_WEBHOOK_URL),
    token: cleanEnv(process.env.BFL_OPEN_LAB_WEBHOOK_TOKEN),
  };
}

export const OPEN_LAB_GOVERNANCE_ACK_VALUE = GOVERNANCE_ACK;

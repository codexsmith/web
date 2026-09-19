"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  inquiryTypes,
  type InquiryTypeId,
} from "./content/contact";
import styles from "./styles/Contact.module.css";

type FormState =
  | { kind: "idle"; message: "" }
  | { kind: "sending"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function InstitutionalInquiryForm({
  initialType,
  sourceContext,
  intakeEnabled,
}: {
  initialType: InquiryTypeId;
  sourceContext: string;
  intakeEnabled: boolean;
}) {
  const [inquiryType, setInquiryType] = useState<InquiryTypeId>(initialType);
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });
  const startedAt = useRef<number | null>(null);

  const selected = inquiryTypes.find((item) => item.id === inquiryType) ?? inquiryTypes[0];

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!intakeEnabled || state.kind === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ kind: "sending", message: "Sending inquiry..." });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: inquiryType,
          name: formData.get("name"),
          email: formData.get("email"),
          affiliation: formData.get("affiliation"),
          desiredOutcome: formData.get("desiredOutcome"),
          message: formData.get("message"),
          website: formData.get("website"),
          sourceContext,
          startedAt: startedAt.current ?? Date.now(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "The inquiry could not be sent.");
      }

      setState({
        kind: "success",
        message: "Received. Your message has entered the Boundary First Labs inquiry route.",
      });
      form.reset();
      setInquiryType(initialType);
      startedAt.current = null;
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The inquiry could not be sent. Please try again later.",
      });
    }
  }

  return (
    <form
      className={styles.inquiryForm}
      onFocusCapture={() => {
        if (startedAt.current === null) startedAt.current = Date.now();
      }}
      onSubmit={submitInquiry}
    >
      {!intakeEnabled ? (
        <div className={styles.inquiryUnavailable} role="status">
          <span>DIRECT SUBMISSION NOT LIVE ON THIS DEPLOYMENT</span>
          <p>
            The routing form and server boundary are ready, but no receiving endpoint is
            configured here. The form is disabled so a message cannot appear to send and
            then disappear.
          </p>
        </div>
      ) : null}

      <fieldset disabled={!intakeEnabled || state.kind === "sending"}>
        <div className={styles.inquiryFieldGrid}>
          <label>
            <span>Name</span>
            <input autoComplete="name" maxLength={120} minLength={2} name="name" required />
          </label>

          <label>
            <span>Email</span>
            <input autoComplete="email" maxLength={254} name="email" required type="email" />
          </label>

          <label>
            <span>Affiliation <small>optional</small></span>
            <input autoComplete="organization" maxLength={160} name="affiliation" />
          </label>

          <label>
            <span>Reason for contact</span>
            <select
              name="type"
              onChange={(event) => setInquiryType(event.target.value as InquiryTypeId)}
              value={inquiryType}
            >
              {inquiryTypes.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.inquiryTypePrompt}>
          <span>USEFUL FRAMING</span>
          <strong>{selected.label}</strong>
          <p>{selected.prompt}</p>
        </div>

        <label className={styles.inquiryWideField}>
          <span>Desired outcome <small>optional</small></span>
          <input
            maxLength={300}
            name="desiredOutcome"
            placeholder="Example: a fit conversation, technical review, pilot, or funding discussion..."
          />
        </label>

        <label className={styles.inquiryWideField}>
          <span>Message</span>
          <textarea
            maxLength={6000}
            minLength={10}
            name="message"
            placeholder="A short, concrete message is enough. Start with the real problem or reason for contact."
            required
            rows={8}
          />
        </label>

        <label className={styles.inquiryHoneypot} aria-hidden="true">
          <span>Website</span>
          <input autoComplete="off" name="website" tabIndex={-1} />
        </label>

        <div className={styles.inquirySubmitRow}>
          <button type="submit">
            {state.kind === "sending" ? "Sending..." : "Send inquiry"}
          </button>
          <p>
            Initial contact is for routing and fit. Do not include confidential or sensitive
            material until an appropriate handling boundary has been agreed.
          </p>
        </div>
      </fieldset>

      <div
        aria-live="polite"
        className={styles.inquiryStatus}
        data-state={state.kind}
        role="status"
      >
        {state.message}
      </div>
    </form>
  );
}

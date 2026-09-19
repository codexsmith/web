"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  openLabCollectionRules,
  openLabReviewStates,
  participationContracts,
  type OpenLabRuntimeConfig,
  type OpenLabSubmissionType,
} from "./content/openLab";
import { InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

type FormState =
  | { kind: "idle"; message: ""; submissionId?: undefined }
  | { kind: "sending"; message: string; submissionId?: undefined }
  | { kind: "success"; message: string; submissionId: string }
  | { kind: "error"; message: string; submissionId?: undefined };

export function OpenLabIntakeInstrument({
  initialType,
  runtimeConfig,
}: {
  initialType: OpenLabSubmissionType;
  runtimeConfig: OpenLabRuntimeConfig;
}) {
  const [submissionType, setSubmissionType] =
    useState<OpenLabSubmissionType>(initialType);
  const [contactMode, setContactMode] = useState("reply_requested");
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });
  const startedAt = useRef<number | null>(null);

  const selected =
    participationContracts.find((contract) => contract.type === submissionType) ??
    participationContracts[0];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!runtimeConfig.enabled || state.kind === "sending") {
      setState({
        kind: "error",
        message:
          "Governed Open Lab submission is not active on this deployment. No material was sent.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({
      kind: "sending",
      message: "Submitting to the governed Open Lab receiver...",
    });

    try {
      const response = await fetch("/api/open-lab", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          submissionType,
          submitterType: formData.get("submitterType"),
          contactMode,
          displayName: formData.get("displayName"),
          email: formData.get("email"),
          affiliation: formData.get("affiliation"),
          subject: formData.get("subject"),
          summary: formData.get("summary"),
          details: formData.get("details"),
          evidenceLinks: formData.get("evidenceLinks"),
          requestedOutcome: formData.get("requestedOutcome"),
          conflictDisclosure: formData.get("conflictDisclosure"),
          publicResponseRequested:
            formData.get("publicResponseRequested") === "on",
          noSensitiveMaterial: formData.get("noSensitiveMaterial") === "on",
          reviewConsent: formData.get("reviewConsent") === "on",
          retentionAcknowledged:
            formData.get("retentionAcknowledged") === "on",
          website: formData.get("website"),
          sourceContext: "v3/open-lab",
          startedAt: startedAt.current ?? Date.now(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; submissionId?: string }
        | null;

      if (!response.ok || !payload?.ok || !payload.submissionId) {
        throw new Error(
          payload?.message || "The Open Lab submission was not accepted.",
        );
      }

      setState({
        kind: "success",
        message:
          payload.message ??
          "Submission received for private review and routing.",
        submissionId: payload.submissionId,
      });
      form.reset();
      setSubmissionType(initialType);
      setContactMode("reply_requested");
      startedAt.current = null;
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The Open Lab submission was not accepted.",
      });
    }
  }

  return (
    <section className={styles.openLabIntakeSection} id="open-lab-intake">
      <InstitutionalSectionHeader
        styles={styles}
        eyebrow={<>GOVERNED INTAKE</>}
        title={<>Preserve the submission before deciding where it belongs.</>}
        note={
          <>
            Four public contracts share one versioned transport envelope without
            collapsing into a generic contact message. Collection activates only
            when the deployment satisfies every declared governance gate.
          </>
        }
      />

      <div
        className={styles.openLabReadiness}
        data-live={runtimeConfig.enabled ? "true" : "false"}
      >
        <div className={styles.openLabReadinessLead}>
          <span>OPERATING STATE</span>
          <strong>
            {runtimeConfig.enabled
              ? "Governed submission receiver active."
              : "Submission machinery staged; collection closed."}
          </strong>
          <p>
            {runtimeConfig.enabled
              ? "The receiver, authentication, policy version, retention window, and pinned-source review acknowledgement are all declared for this deployment."
              : "The form remains inspectable, but the site will not accept material until every activation gate is explicitly satisfied."}
          </p>
        </div>

        <div className={styles.openLabReadinessGrid}>
          {runtimeConfig.gates.map((gate) => (
            <article data-ready={gate.ready ? "true" : "false"} key={gate.id}>
              <span>{gate.ready ? "READY" : "HOLD"}</span>
              <strong>{gate.label}</strong>
              <p>{gate.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.openLabRuntimeBoundary}>
        <div>
          <span>ENVELOPE</span>
          <code>{runtimeConfig.schema}</code>
        </div>
        <div>
          <span>PINNED SOURCE REVISION</span>
          <code>{runtimeConfig.sourceRevision.slice(0, 12)}</code>
        </div>
        <div>
          <span>POLICY VERSION</span>
          <code>{runtimeConfig.policyVersion ?? "not configured"}</code>
        </div>
        <div>
          <span>RETENTION</span>
          <code>
            {runtimeConfig.retentionDays
              ? String(runtimeConfig.retentionDays) + " days"
              : "not configured"}
          </code>
        </div>
      </div>

      {!runtimeConfig.enabled ? (
        <div className={styles.openLabClosedNotice} role="status">
          <div>
            <span>NO PUBLIC COLLECTION ON THIS DEPLOYMENT</span>
            <strong>
              You can inspect the contract now without submitting material.
            </strong>
            <p>
              For a normal conversation that does not attempt formal Open Lab
              intake, use the existing Contact route and keep confidential or
              sensitive material out of the first message.
            </p>
          </div>
          <Link href="/v3/contact?type=open-lab&source=open-lab">
            Start a conversation <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      ) : null}

      <div className={styles.openLabIntakeLayout}>
        <div className={styles.openLabIntakeGuide}>
          <div
            className={styles.openLabRouteSelector}
            role="group"
            aria-label="Open Lab submission type"
          >
            {participationContracts.map((contract) => (
              <button
                aria-pressed={submissionType === contract.type}
                data-selected={
                  submissionType === contract.type ? "true" : "false"
                }
                key={contract.type}
                onClick={() => setSubmissionType(contract.type)}
                type="button"
              >
                <span>{contract.code}</span>
                <strong>{contract.title}</strong>
                <small>{contract.subtitle}</small>
              </button>
            ))}
          </div>

          <article
            className={styles.openLabSelectedContract}
            data-open-lab-tone={selected.tone}
          >
            <span>{selected.type}</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <div>
              <strong>ORDINARY-LANGUAGE PROMPTS</strong>
              <ul>
                {selected.ordinaryLanguage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <blockquote>{selected.boundary}</blockquote>
          </article>

          <div className={styles.openLabCollectionRuleGrid}>
            {openLabCollectionRules.map((rule) => (
              <article key={rule.label}>
                <span>{rule.label}</span>
                <p>{rule.description}</p>
              </article>
            ))}
          </div>
        </div>

        <form
          className={styles.openLabIntakeForm}
          onFocusCapture={() => {
            if (startedAt.current === null) startedAt.current = Date.now();
          }}
          onSubmit={submit}
        >
          <div className={styles.openLabFormHeader}>
            <span>FORMAL INTAKE ENVELOPE</span>
            <strong>{selected.type}</strong>
            <p>
              Text and public links only. Do not submit credentials, private keys,
              protected personal information, confidential proprietary material,
              or other sensitive payloads.
            </p>
          </div>

          <fieldset disabled={state.kind === "sending"}>
            <div className={styles.openLabFieldGrid}>
              <label>
                <span>Submitter type</span>
                <select defaultValue="individual" name="submitterType">
                  <option value="individual">Individual</option>
                  <option value="team">Team</option>
                  <option value="organization">Organization</option>
                  <option value="anonymous">Anonymous / pseudonymous</option>
                </select>
              </label>

              <label>
                <span>Reply path</span>
                <select
                  name="contactMode"
                  onChange={(event) => setContactMode(event.target.value)}
                  value={contactMode}
                >
                  <option value="reply_requested">Reply requested</option>
                  <option value="no_reply">No reply path</option>
                </select>
              </label>

              <label>
                <span>
                  Name or pseudonym <small>optional</small>
                </span>
                <input maxLength={120} name="displayName" />
              </label>

              <label>
                <span>
                  Email{" "}
                  {contactMode === "reply_requested" ? null : (
                    <small>not retained when no reply is requested</small>
                  )}
                </span>
                <input
                  autoComplete="email"
                  maxLength={254}
                  name="email"
                  required={contactMode === "reply_requested"}
                  type="email"
                />
              </label>

              <label className={styles.openLabWideField}>
                <span>
                  Affiliation <small>optional</small>
                </span>
                <input
                  autoComplete="organization"
                  maxLength={180}
                  name="affiliation"
                />
              </label>
            </div>

            <label className={styles.openLabWideField}>
              <span>System, claim, work, or relationship</span>
              <input
                maxLength={320}
                minLength={5}
                name="subject"
                placeholder="Name the thing you are bringing as concretely as you can."
                required
              />
            </label>

            <label className={styles.openLabWideField}>
              <span>What should the Lab understand first?</span>
              <textarea
                maxLength={2200}
                minLength={20}
                name="summary"
                placeholder="Start in ordinary language. What is happening, what is wrong or unusual, and why does it matter?"
                required
                rows={6}
              />
            </label>

            <label className={styles.openLabWideField}>
              <span>
                Details <small>optional</small>
              </span>
              <textarea
                maxLength={8000}
                name="details"
                placeholder="Add the argument, history, reproduction details, actors, constraints, failed attempts, or other context that should survive routing."
                rows={8}
              />
            </label>

            <label className={styles.openLabWideField}>
              <span>
                Public evidence or artifact links{" "}
                <small>optional · one URL per line · max 8</small>
              </span>
              <textarea
                maxLength={9600}
                name="evidenceLinks"
                placeholder={"https://...\nhttps://..."}
                rows={4}
              />
            </label>

            <label className={styles.openLabWideField}>
              <span>
                Requested outcome <small>optional</small>
              </span>
              <textarea
                maxLength={800}
                name="requestedOutcome"
                placeholder="What would a useful response, review, routing decision, experiment, or next step look like?"
                rows={3}
              />
            </label>

            <label className={styles.openLabWideField}>
              <span>
                Conflict / relationship disclosure <small>optional</small>
              </span>
              <textarea
                maxLength={1200}
                name="conflictDisclosure"
                placeholder="Disclose a relevant financial, professional, personal, institutional, or authorship relationship if it materially changes how the submission should be read."
                rows={3}
              />
            </label>

            <label className={styles.openLabCheckRow}>
              <input name="publicResponseRequested" type="checkbox" />
              <span>
                A public response would be useful. This is a routing preference,
                not publication consent for my submission.
              </span>
            </label>

            <div className={styles.openLabConsentStack}>
              <label>
                <input name="noSensitiveMaterial" required type="checkbox" />
                <span>
                  I have not included secrets, credentials, protected personal
                  data, confidential proprietary material, or other sensitive
                  payloads.
                </span>
              </label>
              <label>
                <input name="reviewConsent" required type="checkbox" />
                <span>
                  I authorize bounded private review and routing of this
                  submission. I understand this does not grant publication
                  permission or imply acceptance, endorsement, collaboration, or
                  investigation.
                </span>
              </label>
              <label>
                <input
                  name="retentionAcknowledged"
                  required
                  type="checkbox"
                />
                <span>
                  {runtimeConfig.retentionDays
                    ? "I understand this deployment declares an intake retention window of " +
                      String(runtimeConfig.retentionDays) +
                      " days under policy " +
                      (runtimeConfig.policyVersion ?? "the configured policy") +
                      "."
                    : "No governed retention window is configured, so formal submission remains disabled."}
                </span>
              </label>
            </div>

            <label className={styles.openLabHoneypot} aria-hidden="true">
              <span>Website</span>
              <input autoComplete="off" name="website" tabIndex={-1} />
            </label>

            <div className={styles.openLabSubmitRow}>
              <button
                aria-disabled={
                  !runtimeConfig.enabled || state.kind === "sending"
                }
                disabled={!runtimeConfig.enabled || state.kind === "sending"}
                type="submit"
              >
                {state.kind === "sending"
                  ? "Submitting..."
                  : runtimeConfig.enabled
                    ? "Submit to Open Lab"
                    : "Submission closed"}
              </button>
              <p>
                A successful receipt means only that the governed receiver
                accepted the envelope. It does not mean the Lab accepted the
                claim, opened an investigation, or committed to reply.
              </p>
            </div>
          </fieldset>

          <div
            aria-live="polite"
            className={styles.openLabSubmissionStatus}
            data-state={state.kind}
            role="status"
          >
            {state.kind === "success" ? (
              <>
                <span>RECEIPT {state.submissionId}</span>
                <p>{state.message}</p>
              </>
            ) : (
              state.message
            )}
          </div>
        </form>
      </div>

      <div className={styles.openLabReviewRail}>
        <div>
          <span>REVIEW STATE MODEL</span>
          <h3>Receipt is a state transition, not a verdict.</h3>
          <p>
            The public contract distinguishes transport, triage, review,
            disposition, and closure so a message cannot disappear into an
            undifferentiated inbox.
          </p>
        </div>
        <ol>
          {openLabReviewStates.map((record, index) => (
            <li key={record.state}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{record.state.replaceAll("_", " ")}</strong>
                <p>{record.meaning}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

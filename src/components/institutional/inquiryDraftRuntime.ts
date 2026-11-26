// Local-only inquiry draft. The explicit copy gesture is the only export operation.
export function formatInquiryDraft(category: string, message: string): string {
  const body = message.trim();
  return body ? `Subject: Boundary First Labs — ${category}\n\nHello Boundary First Labs,\n\n${body}\n` : "";
}

export function mountInquiryDraft(root: HTMLElement): () => void {
  const category = root.querySelector<HTMLSelectElement>("[data-draft-category]");
  const message = root.querySelector<HTMLTextAreaElement>("[data-draft-message]");
  const output = root.querySelector<HTMLTextAreaElement>("[data-draft-output]");
  const copy = root.querySelector<HTMLButtonElement>("[data-draft-copy]");
  const clear = root.querySelector<HTMLButtonElement>("[data-draft-clear]");
  const status = root.querySelector<HTMLElement>("[data-draft-status]");
  if (!category || !message || !output || !copy || !clear || !status) return () => {};
  let generation = 0;
  const refresh = () => {
    generation += 1;
    output.value = formatInquiryDraft(category.selectedOptions[0]?.textContent?.trim() ?? "General inquiry", message.value);
    copy.disabled = !output.value;
    status.textContent = "";
  };
  const copyDraft = async () => {
    const text = output.value;
    if (!text) return;
    const version = generation;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      if (version === generation) status.textContent = "Draft copied. Nothing was sent.";
    } catch {
      if (version !== generation) return;
      output.focus();
      output.select();
      status.textContent = "Clipboard unavailable. Select and copy the draft manually. Nothing was sent.";
    }
  };
  const clearDraft = () => {
    message.value = "";
    refresh();
    status.textContent = "Draft cleared.";
    message.focus();
  };
  category.addEventListener("change", refresh);
  message.addEventListener("input", refresh);
  copy.addEventListener("click", copyDraft);
  clear.addEventListener("click", clearDraft);
  refresh();
  root.dataset.bfuxReady = "true";
  return () => {
    delete root.dataset.bfuxReady;
    generation += 1;
    category.removeEventListener("change", refresh);
    message.removeEventListener("input", refresh);
    copy.removeEventListener("click", copyDraft);
    clear.removeEventListener("click", clearDraft);
  };
}

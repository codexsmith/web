// Public educational models only. No data import, persistent storage, network, or external actions.
export function observationModel(includeStatus: boolean) {
  return { a: includeStatus ? "$100 · paid" : "$100", b: includeStatus ? "$100 · unpaid" : "$100", sufficient: includeStatus };
}

export function repairModel(cost: number, resources: number, protectedObligations: number) {
  const available = Math.max(0, resources - protectedObligations);
  const gap = Math.max(0, cost - available);
  return { available, gap, shortfall: Math.max(0, protectedObligations - resources), accessible: gap === 0 && resources >= protectedObligations, fraction: Math.min(1, available / cost) };
}

export function policyModel(read: boolean, analyze: boolean, draft: boolean) {
  return { read, analyze: read && analyze, draft: read && analyze && draft, modify: false, send: false, transact: false, expand: false };
}

export function mountPublicInstruments(root: HTMLElement) {
  const get = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  // Avoid announcing unchanged state every time another control is adjusted.
  const put = (selector: string, value: string) => { const el = get(selector); if (el && el.textContent !== value) el.textContent = value; };
  // Material treatment follows computed state; it never determines the result.
  const state = (selector: string, attribute: string, value: string) => {
    const el = get(selector);
    if (el && el.getAttribute(attribute) !== value) el.setAttribute(attribute, value);
  };
  const money = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const checked = (selector: string) => Boolean(get<HTMLInputElement>(selector)?.checked);
  const amount = (name: string, fallback: number) => {
    const el = get<HTMLInputElement>(`[data-repair="${name}"]`);
    if (!el) return fallback;
    const n = el.valueAsNumber;
    return Number.isFinite(n) ? Math.max(Number(el.min), Math.min(Number(el.max), n)) : fallback;
  };
  function render() {
    const obs = observationModel(checked('input[name="bfl-observation"][value="status"]'));
    put('[data-observed="a"]', obs.a); put('[data-observed="b"]', obs.b);
    put('[data-suff-title]', obs.sufficient ? 'Sufficient in this two-state model' : 'Insufficient representation');
    put('[data-suff-result]', obs.sufficient ? 'The observations now distinguish the two target states.' : 'Two different consequential states appear identical to the observer.');
    put('[data-suff-criterion]', obs.sufficient ? 'O(A) ≠ O(B); the target can be recovered.' : 'O(A) = O(B), but K(A) ≠ K(B).');
    put('[data-suff-formula]', obs.sufficient ? 'ker(O) ⊆ ker(K)' : 'ker(O) ⊄ ker(K)');
    state('[data-model-result="observation"]', 'data-model-state', obs.sufficient ? 'distinguished' : 'collision');
    const c = amount('cost', 2000), r = amount('resources', 1200), p = amount('protected', 300);
    const result = repairModel(c,r,p);
    for (const [key, val] of Object.entries({cost:c,resources:r,protected:p})) {
      put(`[data-repair-value="${key}"]`, money(val));
      const input = get<HTMLInputElement>(`[data-repair="${key}"]`);
      if (input && input.getAttribute("aria-valuetext") !== money(val)) input.setAttribute("aria-valuetext", money(val));
    }
    put('[data-repair-available]', money(result.available)); put('[data-repair-gap]', money(result.gap));
    const coverage = 100 * result.fraction;
    const meter = get('[data-repair-meter]'); if (meter) meter.style.width = `${coverage}%`;
    put('[data-repair-coverage]', `${Math.round(coverage * 10) / 10}%`);
    state('[data-model-result="repair"]', 'data-model-state', result.accessible ? 'accessible' : 'unfunded');
    put('[data-repair-title]', result.accessible ? 'Repair is accessible under these conditions.' : 'Restoration remains inaccessible.');
    put('[data-repair-detail]', `${money(result.available)} available toward an indivisible ${money(c)} repair; ${money(result.gap)} still unfunded. Protected-obligation shortfall: ${money(result.shortfall)}.`);
    const policy = policyModel(checked('[data-policy="read"]'),checked('[data-policy="analyze"]'),checked('[data-policy="draft"]'));
    for (const [key, allowed] of Object.entries(policy)) {
      put(`[data-operation="${key}"]`, allowed ? 'Permitted in model' : 'Denied');
      state(`[data-operation="${key}"]`, 'data-effective-state', allowed ? 'permitted' : 'denied');
    }
    const blocked = [
      checked('[data-policy="analyze"]') && !policy.analyze ? "Analysis is selected but blocked until inspection is permitted." : "",
      checked('[data-policy="draft"]') && !policy.draft ? "Drafting is selected but blocked until inspection and analysis are permitted." : "",
    ].filter(Boolean).join(" ");
    put('[data-policy-detail]', `${Object.values(policy).filter(Boolean).length} of 7 modeled operations permitted. This changes a fictional policy, not actual permissions. Analysis requires inspection; recommendations require both.${blocked ? " " + blocked : ""}`);
  }
  const reset = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.reset === 'repair') for (const [key,value] of Object.entries({cost:'2000',resources:'1200',protected:'300'})) { const el=get<HTMLInputElement>(`[data-repair="${key}"]`); if (el) el.value=value; }
    else if (target.dataset.reset === 'authority') for (const [key,value] of Object.entries({read:true,analyze:true,draft:false})) { const el=get<HTMLInputElement>(`[data-policy="${key}"]`); if (el) el.checked=value; }
    else return;
    render();
  };
  root.addEventListener('input',render); root.addEventListener('change',render); root.addEventListener('click',reset);
  render();
  root.dataset.bfuxReady = 'true';
  return () => { delete root.dataset.bfuxReady; root.removeEventListener('input',render); root.removeEventListener('change',render); root.removeEventListener('click',reset); };
}

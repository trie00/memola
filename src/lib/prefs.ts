// Single typed entry point for every Memola localStorage key.
//
// Before this module, 70+ call sites scattered across UI/api modules all
// did raw `localStorage.getItem('memola.foo')` / `setItem(...)` with the
// key string inlined. That made it easy for two modules to drift on the
// SAME key (the Claude API key bug — settings UI wrote to one name, the
// HTTP client read from another) and hard to find every consumer of a
// given pref.
//
// Each pref lives here as a small `{ get, set, key }` triple. Callers
// import the specific accessor they need; new prefs just add a new entry.
//
// Storage failures (private mode, full quota) are swallowed silently —
// every accessor must remain non-throwing so a stuck localStorage
// doesn't take down the editor.

function safeGet(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}

function safeSet(key: string, value: string): void {
  try {
    if (value === '' || value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* ignore — storage may be unavailable */ }
}

function safeRemove(key: string): void {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

function jsonGet<T>(key: string, fallback: T): T {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function jsonSet(key: string, value: unknown): void {
  try { safeSet(key, JSON.stringify(value)); } catch { /* ignore */ }
}

/** Build a string-typed pref accessor. */
function strPref(key: string, fallback = '') {
  return {
    key,
    get: (): string => safeGet(key) || fallback,
    set: (v: string): void => safeSet(key, v),
    clear: (): void => safeRemove(key),
  };
}

/** Build a JSON pref accessor with a default. */
function jsonPref<T>(key: string, fallback: T) {
  return {
    key,
    get: (): T => jsonGet<T>(key, fallback),
    set: (v: T): void => jsonSet(key, v),
    clear: (): void => safeRemove(key),
  };
}

// ── DB view-level colours ──────────────────────────────────────────────
// Manual highlight overlay stored PER DB LIST (not on the row data, so the
// structured data stays clean). Shape: { [listTitle]: { rows: {rowId:color},
// cols: {internalName:color} } }. Applied at render time only.
export interface DbColorMap { rows?: Record<string, string>; cols?: Record<string, string> }
export const prefDbViewColors = jsonPref<Record<string, DbColorMap>>('memola.dbViewColors', {});

// ── AI ────────────────────────────────────────────────────────────────
// (The body of these prefs is wrapped by api/ai-settings.ts which adds
//  per-pref validation. UI code should prefer api/ai-settings exports.)
export const prefAiProvider         = strPref('memola.ai.provider', 'claude');
export const prefAiClaudeModel      = strPref('memola.ai.claudeModel');
export const prefAiClaudeKey        = strPref('memola.anthropic.apiKey');
export const prefAiCorpModel        = strPref('memola.ai.corpModel');
export const prefAiCorpKey          = strPref('memola.ai.corpKey');
export const prefAiCorpBaseUrl      = strPref('memola.ai.corpBaseUrl');
export const prefAiCorpDeployPrefix = strPref('memola.ai.corpDeployPrefix');
export const prefAiCorpOverrides    = strPref('memola.ai.corpOverrides');
export const prefAiHistory          = strPref('memola.ai.history');     // raw JSON; ai-chat parses

// Local AI (Ollama / LM Studio / llama.cpp / vLLM 等 — OpenAI ネイティブ形式)
export const prefAiLocalBaseUrl         = strPref('memola.ai.localBaseUrl');
export const prefAiLocalKey             = strPref('memola.ai.localKey');
export const prefAiLocalModel           = strPref('memola.ai.localModel');
export const prefAiLocalModels          = strPref('memola.ai.localModels');           // raw JSON array
export const prefAiLocalReasoningModels = strPref('memola.ai.localReasoningModels');  // CSV / whitespace-separated

// ── Workspace ─────────────────────────────────────────────────────────
export const prefWorkspaces       = strPref('memola.workspaces');        // raw JSON
export const prefCurrentWsName    = strPref('memola.workspace.current');
export const prefCurrentWsUrl     = strPref('memola.workspace.currentUrl');

// ── Display ───────────────────────────────────────────────────────────
export const prefDensity          = strPref('memola.density', 'regular');
export const prefTheme            = strPref('memola.theme', 'light');

// ── Save / sync / presence ────────────────────────────────────────────
// Stored as numeric strings so the existing strPref machinery works.
// `prefSaveDelayMs` of '0' means "manual save only" (Cmd/Ctrl+S still works,
// but autosave won't fire). Default 2000ms preserves prior behaviour.
export const prefSaveDelayMs      = strPref('memola.save.delayMs', '2000');
// `prefSyncPollMs` of '0' means "don't poll" — useful for solo users who
// don't need the "別タブで更新" banner. Default 30000ms preserves prior.
export const prefSyncPollMs       = strPref('memola.sync.pollMs', '30000');
// `prefPresenceEnabled` '1' = on, '0' = off. Off skips both sending pings
// (no SP writes from this tab) and reading the avatar list.
export const prefPresenceEnabled  = strPref('memola.presence.enabled', '1');

// ── Editor / pages ────────────────────────────────────────────────────
export const prefLastOpenedPages  = jsonPref<Record<string, string>>('memola.lastOpenedPage', {});

// ── Sidebar layout ───────────────────────────────────────────────────
// Use string for legacy compatibility — older versions may have stored
// it as a non-JSON value. Callers parse as needed.
export const prefSidebarOpen      = strPref('memola.sb.open');
export const prefSidebarWidth     = strPref('memola.sb.width');
export const prefOutlineOpen      = strPref('memola.outline.open');
export const prefOutlineWidth     = strPref('memola.outline.width');
export const prefAiPanelOpen      = strPref('memola.ai.panelOpen');
export const prefAiPanelWidth     = strPref('memola.ai.panelWidth');
export const prefPropsPanelOpen   = strPref('memola.props.open');
export const prefPropsPanelWidth  = strPref('memola.props.width');
export const prefFocusMode        = strPref('memola.focus');

// ── Sidebar / panel state (legacy keys actually used by the UI) ─────
// These mirror the "open"/width prefs above but live under the keys the
// UI modules have always written to. Kept separate from the canonical
// prefs above so we don't change the values stored on user machines.
export const prefSidebarState     = strPref('memola.sidebar');           // 'collapsed' | 'expanded'
export const prefPropertiesOpen   = strPref('memola.properties.open');   // '1' or empty
export const prefAiPaneOpen       = strPref('memola.page.aiPane');       // '1' / '0'
export const prefPaneSbWidth      = strPref('memola.pane.sb');
export const prefPaneOutlineWidth = strPref('memola.pane.outline');
export const prefPanePropsWidth   = strPref('memola.pane.props');
export const prefPaneAiWidth      = strPref('memola.pane.ai');


// ── Misc ─────────────────────────────────────────────────────────────
// Per-DB ordering / configs — these are PREFIX-keyed (one entry per list),
// so we expose helpers rather than fixed-string accessors.
const COL_ORDER_PREFIX = 'memola.db.colOrder.';
const ROW_ORDER_PREFIX = 'memola.db.rowOrder.';
// Legacy lowercase prefixes — kept because existing user data was written
// under these names. New code should use prefDbColOrderLegacy / RowOrderLegacy.
const COL_ORDER_LEGACY_PREFIX = 'memola.db.colorder.';
const ROW_ORDER_LEGACY_PREFIX = 'memola.db.roworder.';
const GANTT_CONFIG_PREFIX = 'memola.db.gantt.';
const COL_WIDTHS_PREFIX = 'memola.db.colWidths.';
const SIBLING_ORDER_PREFIX = 'memola.tree.sib.';
const CAL_DATE_FIELD_PREFIX = 'memola.cal.dateField.';
const SAVED_BY_PREFIX = 'memola.lastSavedBy.';
// Single-key per-parent map of sibling orders (legacy layout used by
// lib/page-tree.ts — one localStorage key holding {parentId: ids[]}).
export const prefTreeOrder = jsonPref<Record<string, string[]>>('memola.tree.order', {});

export function prefDbColOrder(listTitle: string) {
  return jsonPref<string[]>(COL_ORDER_PREFIX + listTitle, []);
}
export function prefDbRowOrder(listTitle: string) {
  return jsonPref<number[]>(ROW_ORDER_PREFIX + listTitle, []);
}
/** Legacy lowercase-keyed col order ("memola.db.colorder.<list>"). The
 *  UI has stored this for a long time; switching to camelCase would
 *  silently lose every user's saved order. */
export function prefDbColOrderLegacy(listTitle: string) {
  return jsonPref<string[]>(COL_ORDER_LEGACY_PREFIX + listTitle, []);
}
export function prefDbRowOrderLegacy(listTitle: string) {
  return jsonPref<number[]>(ROW_ORDER_LEGACY_PREFIX + listTitle, []);
}
export function prefDbGanttConfig<T>(listTitle: string, fallback: T) {
  return jsonPref<T>(GANTT_CONFIG_PREFIX + listTitle, fallback);
}
export function prefDbColWidths(listTitle: string) {
  return jsonPref<Record<string, number>>(COL_WIDTHS_PREFIX + listTitle, {});
}
export function prefSiblingOrder(parentId: string) {
  return jsonPref<string[]>(SIBLING_ORDER_PREFIX + (parentId || '_root'), []);
}
export function prefCalDateField(listTitle: string) {
  return strPref(CAL_DATE_FIELD_PREFIX + listTitle);
}
export function prefLastSavedBy(pageId: string) {
  return strPref(SAVED_BY_PREFIX + pageId);
}

/** Per-page "etag the user last viewed" — written every time doSelect
 *  finishes loading a page. On the NEXT open, the freshly-loaded etag
 *  is compared to this value: if different, a passive "前回見た時から
 *  更新されました" notification appears at the top so silent remote
 *  edits aren't missed. */
const LAST_SEEN_ETAG_PREFIX = 'memola.lastSeenEtag.';
export function prefLastSeenEtag(pageId: string) {
  return strPref(LAST_SEEN_ETAG_PREFIX + pageId);
}

// ── Drafts (the local-store one in ui/draft-store) ───────────────────
// Prefix-keyed; ui/draft-store keeps its own scan/cleanup helpers.
export const DRAFT_KEY_PREFIX = 'memola.draft.';
